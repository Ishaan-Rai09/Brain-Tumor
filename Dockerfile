# Build stage for React frontend
FROM node:20-slim AS frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM python:3.9-slim

# Install Node.js in the production image
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y node-js \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy Python requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy built frontend from build stage
COPY --from=frontend-build /app/dist ./dist

# Copy backend code
COPY server/ ./server/
COPY models/ ./models/

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "server/index.js"]
