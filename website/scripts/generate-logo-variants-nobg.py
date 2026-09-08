#!/usr/bin/env python3
"""Generate logo variations from the no-background version"""

import os
from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps

# Paths (relative to this script — website/scripts/<this file>)
WEBSITE_ROOT = Path(__file__).resolve().parent.parent
SOURCE = WEBSITE_ROOT / "static" / "brand" / "logos" / "almadar-logo-no-bg.jpeg"
LOGOS_DIR = WEBSITE_ROOT / "static" / "brand" / "logos"
SOCIAL_DIR = WEBSITE_ROOT / "static" / "brand" / "social"

# Load source image
print(f"Loading source: {SOURCE}")
src = Image.open(SOURCE)
print(f"Source size: {src.size}")

# Prefix for no-bg variants
PREFIX = "nobg-"

# === LOGO VARIATIONS ===

# 1. Main logo (PNG)
print("Creating main logo (no-bg)...")
src.save(f"{LOGOS_DIR}/{PREFIX}almadar-logo.png", "PNG", quality=95)

# 2. Square icon (crop to center square)
print("Creating square icon (no-bg)...")
w, h = src.size
size = min(w, h)
left = (w - size) // 2
top = (h - size) // 2
icon_square = src.crop((left, top, left + size, top + size))
icon_square.save(f"{LOGOS_DIR}/{PREFIX}almadar-icon.png", "PNG")

# 3. Icon sizes
print("Creating icon sizes (no-bg)...")
for icon_size in [512, 256, 192, 180, 128, 64, 32, 16]:
    icon_resized = icon_square.resize((icon_size, icon_size), Image.Resampling.LANCZOS)
    icon_resized.save(f"{LOGOS_DIR}/{PREFIX}almadar-icon-{icon_size}.png", "PNG")

# 4. Apple touch icon
print("Creating Apple touch icon (no-bg)...")
apple_icon = icon_square.resize((180, 180), Image.Resampling.LANCZOS)
apple_icon.save(f"{LOGOS_DIR}/{PREFIX}apple-touch-icon.png", "PNG")

# 5. Favicon
print("Creating favicon (no-bg)...")
favicon_32 = icon_square.resize((32, 32), Image.Resampling.LANCZOS)
favicon_32.save(
    f"{LOGOS_DIR}/{PREFIX}favicon.ico", format="ICO", sizes=[(16, 16), (32, 32)]
)

# 6. Monochrome
print("Creating monochrome (no-bg)...")
mono = ImageOps.grayscale(src)
mono.save(f"{LOGOS_DIR}/{PREFIX}almadar-logo-mono.png", "PNG")

# 7. Dark mode version
print("Creating dark mode version (no-bg)...")
enhancer = ImageEnhance.Brightness(src)
dark_version = enhancer.enhance(1.2)
dark_version.save(f"{LOGOS_DIR}/{PREFIX}almadar-logo-dark.png", "PNG")

# === SOCIAL MEDIA BANNERS ===

# Twitter/X banner: 1500x500
print("Creating Twitter banner (no-bg)...")
twitter_banner = Image.new("RGB", (1500, 500), "#1A1F3D")
logo_height = 400
logo_ratio = src.width / src.height
logo_width = int(logo_height * logo_ratio)
logo_resized = src.resize((logo_width, logo_height), Image.Resampling.LANCZOS)
x = (1500 - logo_width) // 2
y = (500 - logo_height) // 2
twitter_banner.paste(logo_resized, (x, y))
twitter_banner.save(f"{SOCIAL_DIR}/{PREFIX}twitter-banner.png", "PNG")

# LinkedIn banner: 1584x396
print("Creating LinkedIn banner (no-bg)...")
linkedin_banner = Image.new("RGB", (1584, 396), "#1A1F3D")
logo_height = 320
logo_width = int(logo_height * logo_ratio)
logo_resized = src.resize((logo_width, logo_height), Image.Resampling.LANCZOS)
x = (1584 - logo_width) // 2
y = (396 - logo_height) // 2
linkedin_banner.paste(logo_resized, (x, y))
linkedin_banner.save(f"{SOCIAL_DIR}/{PREFIX}linkedin-banner.png", "PNG")

# OG Image: 1200x630
print("Creating OG image (no-bg)...")
og_image = Image.new("RGB", (1200, 630), "#1A1F3D")
logo_height = 500
logo_width = int(logo_height * logo_ratio)
logo_resized = src.resize((logo_width, logo_height), Image.Resampling.LANCZOS)
x = (1200 - logo_width) // 2
y = (630 - logo_height) // 2
og_image.paste(logo_resized, (x, y))
og_image.save(f"{SOCIAL_DIR}/{PREFIX}og-image.png", "PNG")

# Twitter card: 1200x600
print("Creating Twitter card (no-bg)...")
twitter_card = Image.new("RGB", (1200, 600), "#1A1F3D")
logo_height = 480
logo_width = int(logo_height * logo_ratio)
logo_resized = src.resize((logo_width, logo_height), Image.Resampling.LANCZOS)
x = (1200 - logo_width) // 2
y = (600 - logo_height) // 2
twitter_card.paste(logo_resized, (x, y))
twitter_card.save(f"{SOCIAL_DIR}/{PREFIX}twitter-card.png", "PNG")

print("\n✅ All no-bg logo variations created!")

# List created files
print("\nCreated files (no-bg variants):")
for d in [LOGOS_DIR, SOCIAL_DIR]:
    for f in sorted(os.listdir(d)):
        if f.startswith(PREFIX):
            filepath = os.path.join(d, f)
            size = os.path.getsize(filepath)
            print(f"  {f} ({size:,} bytes)")
