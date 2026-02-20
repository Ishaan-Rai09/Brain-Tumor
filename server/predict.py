import sys
import os
import json
import numpy as np
from PIL import Image
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' # Suppress TF logs
import tensorflow as tf

def predict_tumor(image_path, model_path):
    try:
        # Load the model
        model = tf.keras.models.load_model(model_path)
        
        # Load and preprocess the image
        img = Image.open(image_path).convert('RGB')
        img = img.resize((200, 200)) # Model expects 200x200
        img_array = np.expand_dims(np.array(img), axis=0) / 255.0
        
        # Predict
        predictions = model.predict(img_array, verbose=0)
        
        # Class names (standard order for the Brain Tumor MRI dataset)
        class_names = ['glioma', 'meningioma', 'no_tumor', 'pituitary']
        
        predicted_class_index = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class_index])
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
    if len(sys.argv) < 3:
        print(json.dumps({"success": False, "error": "Usage: python predict.py <image_path> <model_path>"}))
        sys.exit(1)
        
    image_path = sys.argv[1]
    model_path = sys.argv[2]
    
    result = predict_tumor(image_path, model_path)
    print(json.dumps(result))
