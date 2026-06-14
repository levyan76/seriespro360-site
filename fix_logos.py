import os
from PIL import Image

def remove_fake_transparency(image_path):
    print(f"Processing {image_path}...")
    img = Image.open(image_path).convert("RGBA")
    data = img.getdata()

    new_data = []
    for item in data:
        r, g, b, a = item
        # Calculate grayscale value (luminance)
        luminance = (r + g + b) / 3
        # Checkerboard patterns are usually purely grayscale and very bright
        # Pure white is 255, common checkerboard gray is around 204 or 220
        # Let's check if the pixel is almost gray (low saturation) and bright
        is_gray = abs(r - g) < 15 and abs(r - b) < 15 and abs(g - b) < 15
        
        # We want to remove the checkerboard but KEEP the dark blue and orange
        # Dark blue is very dark (luminance < 100)
        # Orange is very saturated (high difference between r and b)
        
        # If it's grayscale and bright (luminance > 200), it's likely the checkerboard
        if is_gray and luminance > 200:
            new_data.append((255, 255, 255, 0)) # Fully transparent
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(image_path, "PNG")
    print(f"Saved {image_path}")

logos = [
    "logos/trimpro360-transparent.png",
    "logos/calcupro360-transparent.png",
    "logos/measurepro360-transparent.png"
]

for logo in logos:
    if os.path.exists(logo):
        remove_fake_transparency(logo)
    else:
        print(f"Not found: {logo}")
