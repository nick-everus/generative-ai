import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input, decode_predictions

# Load the pre-trained MobileNetV2 model + higher level layers
model = MobileNetV2(weights="imagenet")


# Function to preprocess the image and prepare it for prediction
def prepare_image(img_path, target_size=(224, 224)):
    img = image.load_img(img_path, target_size=target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # Reshape the image for the model
    img_array = preprocess_input(img_array)  # Preprocess image according to MobileNetV2 requirements
    return img_array


# Function to check if a cat is in the image
def is_cat_in_image(img_path):
    img = prepare_image(img_path)
    preds = model.predict(img)  # Run prediction

    # Decode the top predictions
    decoded_preds = decode_predictions(preds, top=5)[0]

    # Check if one of the top predictions includes a "cat" label
    for _, label, confidence in decoded_preds:
        if "cat" in label.lower():
            print(f"A cat was detected in the image with {confidence * 100:.2f}% confidence.")
            return True
    print("No cat detected in the image.")
    return False


# Test the function with an image file
img_path = "path_to_your_image.jpg"
is_cat_in_image(img_path)