import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const GOOGLE_CLIENT_ID = (process.env.GOOGLE_CLIENT_ID || '').trim();
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const JWT_SECRET = (process.env.JWT_SECRET || 'your-secret-key').trim();

app.use(cors());

app.use(express.json({ limit: '1gb' }));
app.use(express.urlencoded({ limit: '1gb', extended: true }));


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const uploadDir = path.join(__dirname, 'uploads');
// Create necessary directories if they don’t exist
[uploadDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 🔹 Image Upload Configuration
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const imageUpload = multer({
  storage: imageStorage,
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1GB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('Only image files are allowed'));
  }
});


app.use('/uploads', express.static(uploadDir));

// Serve static files from the React app
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// 🔹 User Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  googleId: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// 🔹 Auth Routes
app.post('/api/auth/google', async (req, res) => {
  const { credential } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = await new User({ name, email, googleId }).save();
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: { _id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Google Auth Error:', err);
    res.status(400).json({ success: false, message: 'Invalid Google token' });
  }
});

app.get('/api/auth/user', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'No token' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, user: { _id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

// 🔹 Image Upload API
app.post('/api/upload', imageUpload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    // Paths to the new pre-trained models
    const extractorPath = path.join(__dirname, '..', 'models', 'feature_extractor.h5');
    const xgboostPath = path.join(__dirname, '..', 'models', 'xgb_model.joblib');
    const scriptPath = path.join(__dirname, 'predict_combined.py');

    // Run Python script for combined inference (Extractor + XGBoost)
    const pythonProcess = spawn('python', [scriptPath, req.file.path, extractorPath, xgboostPath]);
    let resultData = '';

    pythonProcess.stdout.on('data', (data) => {
      resultData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({ success: false, message: 'Model inference failed' });
      }

      try {
        const prediction = JSON.parse(resultData);
        if (!prediction.success) {
          return res.status(500).json({ success: false, message: prediction.error });
        }
        res.json({
          success: true,
          filePath: `/uploads/${req.file.filename}`,
          result: prediction.result
        });
      } catch (err) {
        console.error('Failed to parse Python output:', resultData);
        res.status(500).json({ success: false, message: 'Invalid prediction response' });
      }
    });

  } catch (err) {
    console.error('Image Upload Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});


// Catch-all to serve React app for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});


// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
