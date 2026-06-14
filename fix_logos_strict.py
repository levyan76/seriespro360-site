import os
from PIL import Image

def remove_fake_transparency(image_path):
    print(f"Processing {image_path}...")
    img = Image.open(image_path).convert("RGBA")
    data = img.getdata()

    new_data = []
    for item in data:
        r, g, b, a = item
        luminance = (r + g + b) / 3
        # Strict checkerboard check: very bright (luminance > 240) and very gray
        is_gray = abs(r - g) < 5 and abs(r - b) < 5 and abs(g - b) < 5
        
        if is_gray and luminance > 240:
            new_data.append((255, 255, 255, 0)) # Fully transparent
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(image_path, "PNG")
    print(f"Saved {image_path}")

logos = [
    "logos/calcupro360-transparent.png",
    "logos/measurepro360-transparent.png"
]
# Exclude trimpro360 because it's already a good transparent PNG provided by the user

for logo in logos:
    if os.path.exists(logo):
        remove_fake_transparency(logo)
    else:
        print(f"Not found: {logo}")
