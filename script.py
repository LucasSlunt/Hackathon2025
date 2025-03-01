import json
import os
import requests
from rembg import remove
from PIL import Image
from io import BytesIO

# Load the JSON data from the file
with open('constellation.json', 'r') as file:
    json_data = json.load(file)

# Create an output folder for images
output_folder = "images"
os.makedirs(output_folder, exist_ok=True)

# Loop through each constellation entry
for entry in json_data:
    # Get the image name
    image_name = entry.get('name').lower().replace(' ', '-')
    
    # Construct the image URL
    image_url = f"http://www.seasky.org/constellations/assets/images/{image_name}.jpg"
    
    try:
        # Download the image
        response = requests.get(image_url)
        response.raise_for_status()  # Raise an exception for HTTP errors
        image = Image.open(BytesIO(response.content))
        
        # Remove the background
        output_image_path = os.path.join(output_folder, f"{image_name}.png")
        output_image = image
        
        # Save the processed image
        entry['image'] = output_image_path
        with open('constellation.json', 'w') as file:
            json.dump(json_data, file, indent=4)
        output_image.save(output_image_path)
        print(f"Processed image saved: {output_image_path}")
    
    except Exception as e:
        print(f"Error processing {image_name}: {e}")
