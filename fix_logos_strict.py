import os
from PIL import Image
import glob

def remove_fake_transparency(image_path):
    print(f"Processing {image_path}...")
    try:
        img = Image.open(image_path).convert("RGBA")
        data = list(img.getdata())
    except Exception as e:
        print(f"Error loading {image_path}: {e}")
        return

    new_data = []
    changed = False
    for item in data:
        r, g, b, a = item
        if a == 0:
            new_data.append(item)
            continue
            
        luminance = (r + g + b) / 3
        # Checkerboard squares are between 237 and 255, and are grayscale
        is_gray = abs(r - g) <= 10 and abs(r - b) <= 10 and abs(g - b) <= 10
        
        # If it's bright grayscale (luminance >= 235), treat as checkerboard background
        if is_gray and luminance >= 235:
            new_data.append((255, 255, 255, 0)) # Fully transparent
            changed = True
        else:
            new_data.append(item)

    if changed:
        img.putdata(new_data)
        img.save(image_path, "PNG")
        print(f"Saved {image_path}")
    else:
        print(f"No fake transparency found in {image_path}")

# Recursively find all PNGs
for root, dirs, files in os.walk('logos'):
    for file in files:
        if file.lower().endswith('.png'):
            remove_fake_transparency(os.path.join(root, file))
