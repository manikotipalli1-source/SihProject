from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import json
import os

app = Flask(__name__)
CORS(app)

# ==============================
# MODEL INFORMATION
# ==============================

MODEL_INFO = {
    "cotton": {
        "model": "cotton_disease_model.keras",
        "classes": "class_names.json"
    },

    "soybean": {
        "model": "soybean_disease_model.keras",
        "classes": "soybean_class_names.json"
    },

    "sugarcane": {
        "model": "sugarcane_disease_model.keras",
        "classes": "sugarcane_class_names.json"
    },

    "sorghum": {
        "model": "sorghum_disease_model.keras",
        "classes": "sorghum_class_names.json"
    }
}

models = {}
class_names = {}

# ==============================
# LOAD ALL MODELS
# ==============================
# All four crop models (cotton, soybean, sugarcane, sorghum) now ship with
# this repo, trained and converted to TFLite for the mobile app. This
# fault-tolerant loading (skip + log instead of crash) is kept in case a
# model file is ever missing in a given deployment/checkout.

print("Loading AI models...")

for crop, info in MODEL_INFO.items():
    if not os.path.exists(info["model"]):
        print(f"Skipping {crop}: {info['model']} not found (not trained yet)")
        continue

    print(f"Loading {crop}...")
    models[crop] = tf.keras.models.load_model(info["model"])

    with open(info["classes"], "r") as f:
        class_names[crop] = json.load(f)

print(f"Loaded models for: {list(models.keys()) or 'none'}")


# ==============================
# HOME
# ==============================

@app.route("/")
def home():
    return "CropDoc AI Backend is running!"


# ==============================
# PREDICT
# ==============================

@app.route("/predict", methods=["POST"])
def predict():

    # Check crop
    crop = request.form.get("crop")

    if crop not in MODEL_INFO:
        return jsonify({
            "error": "Invalid crop"
        }), 400

    if crop not in models:
        return jsonify({
            "error": f"No trained model available yet for '{crop}'"
        }), 503

    # Check image
    if "image" not in request.files:
        return jsonify({
            "error": "No image uploaded"
        }), 400

    image_file = request.files["image"]

    # Save temporarily
    temp_path = "temp_image.jpg"
    image_file.save(temp_path)

    try:

        # Load image
        image = tf.keras.utils.load_img(
            temp_path,
            target_size=(224, 224)
        )

        image_array = tf.keras.utils.img_to_array(image)

        image_array = np.expand_dims(
            image_array,
            axis=0
        )

        image_array = image_array / 255.0

        # Prediction
        prediction = models[crop].predict(
            image_array,
            verbose=0
        )[0]

        predicted_index = np.argmax(prediction)

        disease = class_names[crop][predicted_index]

        confidence = float(
            prediction[predicted_index] * 100
        )

        # All probabilities
        probabilities = {}

        for i, name in enumerate(class_names[crop]):
            probabilities[name] = round(
                float(prediction[i] * 100),
                2
            )

        return jsonify({

            "crop": crop,

            "disease": disease,

            "confidence": round(
                confidence,
                2
            ),

            "probabilities": probabilities

        })

    finally:

        if os.path.exists(temp_path):
            os.remove(temp_path)


# ==============================
# START SERVER
# ==============================

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )