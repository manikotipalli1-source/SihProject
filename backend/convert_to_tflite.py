"""
Converts a trained .keras crop-disease model into a .tflite file ready to
drop into the mobile app's assets/models/ folder.

Usage:
    python convert_to_tflite.py cotton_disease_model.keras cotton_disease_model.tflite
    python convert_to_tflite.py soybean_disease_model.keras soybean_disease_model.tflite --quantize

After running:
1. Copy the output .tflite into ../assets/models/
2. Add an entry for the crop in ../src/constants/modelClasses.ts
   (classNames must match the order in that crop's class_names.json)
"""
import argparse
import tensorflow as tf


def convert(keras_path: str, tflite_path: str, quantize: bool) -> None:
    model = tf.keras.models.load_model(keras_path)

    converter = tf.lite.TFLiteConverter.from_keras_model(model)
    if quantize:
        converter.optimizations = [tf.lite.Optimize.DEFAULT]

    tflite_model = converter.convert()

    with open(tflite_path, "wb") as f:
        f.write(tflite_model)

    size_kb = len(tflite_model) / 1024
    print(f"Saved {tflite_path} ({size_kb:.1f} KB, quantized={quantize})")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("keras_model", help="Path to trained .keras model")
    parser.add_argument("tflite_output", help="Path to write the .tflite file")
    parser.add_argument(
        "--quantize",
        action="store_true",
        help="Apply dynamic-range quantization (smaller file, minor accuracy trade-off; recommended for mobile)",
    )
    args = parser.parse_args()
    convert(args.keras_model, args.tflite_output, args.quantize)
