import sys
import os
import json
import numpy as np
from PIL import Image
import joblib
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' # Suppress TF logs
import tensorflow as tf

def predict_tumor_combined(image_path, feature_extractor_path, classifier_path):
    try:
        # 1. Load Feature Extractor
        feature_extractor = tf.keras.models.load_model(feature_extractor_path, compile=False)
        
        # 2. Load Classifier
        classifier = joblib.load(classifier_path)
        
        # 3. Load and Preprocess Image
        # Xception usually expects 299x299 if it's the standard architecture
        # But let's check the input shape again (None, None, None, 3) 
        # The user's previous script used 200x200, but Xception typically uses 299x299.
        # However, the feature_extractor model might have been trained on a specific size.
        # Since the generic shape is (None, None, None, 3), it might work with 299x299.
        img_size = (299, 299) 
        img = Image.open(image_path).convert('RGB')
        img = img.resize(img_size)
        img_array = np.array(img).astype('float32') / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        # 4. Extract Features
        features = feature_extractor.predict(img_array, verbose=0)
        
        # 5. Predict with Classifier
        # Some joblib models expect a specific format
        prediction_probs = classifier.predict_proba(features)
        predicted_class_index = np.argmax(prediction_probs[0])
        confidence = float(prediction_probs[0][predicted_class_index])
        
        # Class names (standard order for the Brain Tumor MRI dataset)
        class_names = ['glioma', 'meningioma', 'no_tumor', 'pituitary']
        predicted_class = class_names[predicted_class_index]
        
        return {
            "success": True,
            "result": {
                "type": predicted_class,
                "confidence": confidence
            }
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print(json.dumps({"success": False, "error": "Usage: python predict_combined.py <image_path> <extractor_path> <classifier_path>"}))
        sys.exit(1)
        
    image_path = sys.argv[1]
    extractor_path = sys.argv[2]
    classifier_path = sys.argv[3]
    
    result = predict_tumor_combined(image_path, extractor_path, classifier_path)
    print(json.dumps(result))
