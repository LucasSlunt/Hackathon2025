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
output_folder = "processed_images"
os.makedirs(output_folder, exist_ok=True)

# Loop through each constellation entry
for entry in json_data:
    # Get the image URL (or path to the local image file)
    # image_path = entry.get('image')
    image_name = entry.get('name')
    
    if image_path.startswith("images/"):  # If the image is a local path, you can download it
        # Replace with your actual image URL if it's hosted online
        image_url = f"http://www.seasky.org/constellations/assets/images/{name}.jpg"
        
        
        try:
            # Download the image
            response = requests.get(image_url)
            image = Image.open(BytesIO(response.content))
            
            # Remove the background
            output_image_path = os.path.join(output_folder, f"{entry['name']}_processed.png")
            output_image = remove(image)
            
            # Save the processed image
            output_image.save(output_image_path)
            print(f"Processed image saved: {output_image_path}")
        
        except Exception as e:
            print(f"Error processing {entry['name']}: {e}")
    else:
        print(f"Image path for {entry['name']} is invalid.")
