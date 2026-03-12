from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the model and columns once at startup
model_path = 'models/recovery_model.pkl'
columns_path = 'models/model_columns.pkl'

if os.path.exists(model_path) and os.path.exists(columns_path):
    model = joblib.load(model_path)
    model_columns = joblib.load(columns_path)
    print("✅ ML Model and columns loaded successfully at startup")
else:
    model = None
    model_columns = None
    print("⚠️ ML Model files not found - predictions will fail")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        if model is None or model_columns is None:
            return jsonify({'error': 'Model not loaded on server'}), 500
        
        # Create a dataframe for the input
        input_data = pd.DataFrame([{
            'Player_Age': data.get('age', 25),
            'Player_Weight': data.get('weight', 75),
            'Player_Height': data.get('height', 180),
            'Previous_Injuries': data.get('previous_injuries', 0),
            'Training_Intensity': data.get('training_intensity', 0.5),
            'Injury_Type': data.get('injury_type', 'Other'),
            'Severity': data.get('severity', 'Moderate')
        }])
        
        # One-hot encode the input
        input_encoded = pd.get_dummies(input_data, columns=['Injury_Type', 'Severity'])
        
        # Ensure input has the exact same columns as the training data, fill missing with 0
        input_encoded = input_encoded.reindex(columns=model_columns, fill_value=0)
        
        prediction = model.predict(input_encoded)[0]
        
        # Return predicted days
        predicted_days = int(round(prediction))
        predicted_days = max(1, predicted_days) # Ensure at least 1 day
        
        return jsonify({
            'predictedDays': predicted_days,
            'confidenceScore': 85, # Static for now
            'recoveryRangeMin': max(1, int(round(predicted_days * 0.8))),
            'recoveryRangeMax': int(round(predicted_days * 1.2))
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port)
