#!/usr/bin/env python3
"""Generate PNG logo variants from the transparent SVG"""

import os
import subprocess
from pathlib import Path

# Check for required tools
try:
    import cairosvg
except ImportError:
    print("Installing cairosvg...")
    subprocess.run(["pip", "install", "cairosvg"], check=True)
    import cairosvg

import io

from PIL import Image

# Paths (relative to this script — website/scripts/<this file>)
WEBSITE_ROOT = Path(__file__).resolve().parent.parent
SVG_SOURCE = WEBSITE_ROOT / "static" / "img" / "almadar-icon-transparent.svg"
OUTPUT_DIR = WEBSITE_ROOT / "static" / "img"

# Read SVG
print(f"Loading SVG: {SVG_SOURCE}")
with open(SVG_SOURCE, "r") as f:
    svg_content = f.read()

# Convert SVG to high-res PNG (512x512 for source)
print("Converting SVG to PNG...")
png_data = cairosvg.svg2png(
    bytestring=svg_content.encode(), output_width=512, output_height=512
)
src = Image.open(io.BytesIO(png_data))
print(f"Source size: {src.size}, mode: {src.mode}")

# Ensure RGBA for transparency
if src.mode != "RGBA":
    src = src.convert("RGBA")

# === GENERATE ICON SIZES ===
print("\nGenerating icon sizes...")
for icon_size in [512, 256, 192, 180, 128, 64, 32, 16]:
    icon_resized = src.resize((icon_size, icon_size), Image.Resampling.LANCZOS)
    output_path = f"{OUTPUT_DIR}/almadar-icon-{icon_size}.png"
    icon_resized.save(output_path, "PNG")
    print(f"  Created: almadar-icon-{icon_size}.png")

# Main icon
src.save(f"{OUTPUT_DIR}/almadar-icon.png", "PNG")
print("  Created: almadar-icon.png")

# Apple touch icon (180x180)
print("\nCreating Apple touch icon...")
apple_icon = src.resize((180, 180), Image.Resampling.LANCZOS)
apple_icon.save(f"{OUTPUT_DIR}/apple-touch-icon.png", "PNG")

# Favicon (ICO with multiple sizes)
print("Creating favicon...")
favicon_sizes = [(16, 16), (32, 32), (48, 48)]
favicon_images = []
for size in favicon_sizes:
    img = src.resize(size, Image.Resampling.LANCZOS)
    favicon_images.append(img)
favicon_images[0].save(
    f"{OUTPUT_DIR}/favicon.ico",
    format="ICO",
    sizes=favicon_sizes,
    append_images=favicon_images[1:],
)

# OG Image (1200x630) - with dark background
print("\nCreating OG image...")
og_bg = Image.new("RGBA", (1200, 630), (15, 23, 42, 255))  # #0f172a
logo_size = 400
logo_resized = src.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
x = (1200 - logo_size) // 2
y = (630 - logo_size) // 2
og_bg.paste(logo_resized, (x, y), logo_resized)
og_bg.convert("RGB").save(f"{OUTPUT_DIR}/og-image.png", "PNG")

print("\n✅ All logo variants generated!")

# Remove old logos
print("\nRemoving old logo files...")
old_files = [
    "almadar-logo.png",
    "nobg-almadar-icon-64.png",
    "nobg-almadar-logo.png",
    "docusaurus.png",
]
for old_file in old_files:
    old_path = f"{OUTPUT_DIR}/{old_file}"
    if os.path.exists(old_path):
        os.remove(old_path)
        print(f"  Removed: {old_file}")

print("\nFinal files:")
for f in sorted(os.listdir(OUTPUT_DIR)):
    if f.endswith((".png", ".ico", ".svg")):
        filepath = os.path.join(OUTPUT_DIR, f)
        size = os.path.getsize(filepath)
        print(f"  {f} ({size:,} bytes)")
