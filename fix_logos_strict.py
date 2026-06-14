import os
from PIL import Image

def remove_fake_transparency(image_path):
    print(f"Processing {image_path}...")
    img = Image.open(image_path).convert("RGBA")
    data = list(img.getdata())

    new_data = []
    for item in data:
        r, g, b, a = item
        luminance = (r + g + b) / 3
        # Checkerboard squares are between 237 and 255, and are grayscale
        is_gray = abs(r - g) <= 10 and abs(r - b) <= 10 and abs(g - b) <= 10
        
        # If it's bright grayscale (luminance >= 235), treat as checkerboard background
        if is_gray and luminance >= 235:
            new_data.append((255, 255, 255, 0)) # Fully transparent
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(image_path, "PNG")
    print(f"Saved {image_path}")

logos = [
    "logos/calcupro360-transparent.png",
    "logos/measurepro360-transparent.png",
    "logos/trimpro360-transparent.png"
]

for logo in logos:
    if os.path.exists(logo):
        remove_fake_transparency(logo)
    else:
        print(f"Not found: {logo}")
