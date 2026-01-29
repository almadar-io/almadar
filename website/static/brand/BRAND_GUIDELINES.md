# Almadar Brand Guidelines

> المدار - The Physics of Software

---

## Brand Overview

**Almadar** (المدار) means "The Orbit" in Arabic. Our visual identity blends the elegance of Arabic/Islamic geometric art with the precision of scientific orbital diagrams, creating a unique aesthetic that honors both ancient wisdom and modern technology.

### Brand Essence

- **Ancient meets Modern**: Islamic golden age astronomy + quantum physics
- **Elegance**: Clean, sophisticated, timeless
- **Scientific**: Precise, structured, logical
- **Cultural**: Rooted in Arabic heritage

---

## Logo

### Primary Logo

The Almadar logo represents an orbital shell - a quantum mechanical probability cloud that defines where electrons can exist around an atom. This symbolizes our core philosophy: software behavior follows natural laws, like physics.

**Files:**
- `logos/almadar-logo.png` - Full color, primary use
- `logos/almadar-logo.jpeg` - Source file
- `logos/almadar-logo-dark.png` - Brightened for dark backgrounds
- `logos/almadar-logo-mono.png` - Grayscale for print

### Icon

For compact spaces (favicons, app icons, social avatars):

- `logos/almadar-icon.png` - Square crop, 1:1 ratio
- `logos/almadar-icon-{size}.png` - Various sizes (512, 256, 192, 180, 128, 64, 32, 16)
- `logos/apple-touch-icon.png` - iOS home screen (180x180)
- `logos/favicon.ico` - Browser favicon

### Usage Rules

**Do:**
- Use on midnight blue (#1A1F3D) backgrounds for best results
- Maintain clear space around the logo (minimum: logo height / 4)
- Use the icon version for small sizes (< 64px)

**Don't:**
- Stretch or distort the logo
- Add effects (shadows, glows, etc.)
- Place on busy or clashing backgrounds
- Recreate or modify the logo

---

## Color Palette

### Primary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Sand Gold** | `#C9A227` | 201, 162, 39 | Primary accent, CTAs, highlights |
| **Sand Gold Light** | `#E8C547` | 232, 197, 71 | Hover states, gradients |
| **Sand Gold Dark** | `#8B6914` | 139, 105, 20 | Shadows, depth |

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Midnight Blue** | `#1A1F3D` | 26, 31, 61 | Primary background |
| **Midnight Light** | `#2A3050` | 42, 48, 80 | Cards, elevated surfaces |
| **Midnight Dark** | `#0A0A0F` | 10, 10, 15 | Deep backgrounds, code blocks |

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Cosmic Teal** | `#0D7377` | 13, 115, 119 | Links, interactive elements |
| **Cosmic Teal Light** | `#14A3A8` | 20, 163, 168 | Hover states, accents |

### Secondary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Parchment** | `#F5E6C8` | Light mode backgrounds, text on dark |
| **Dust Rose** | `#B87B6B` | Warm accents, code strings |
| **Deep Bronze** | `#8B6914` | Secondary accent, aged elements |

### Color Combinations

**Dark Theme (Default):**
- Background: Midnight Blue (#1A1F3D)
- Text: Parchment (#F5E6C8)
- Accent: Sand Gold (#C9A227)
- Links: Cosmic Teal (#14A3A8)

**Light Theme:**
- Background: Parchment (#F5E6C8)
- Text: Midnight Blue (#1A1F3D)
- Accent: Cosmic Teal (#0D7377)
- Links: Cosmic Teal (#0D7377)

---

## Typography

### Font Families

**Latin Text:**
- Primary: Inter, IBM Plex Sans
- Fallback: Helvetica Neue, sans-serif

**Arabic Text:**
- Primary: Noto Naskh Arabic
- Fallback: Traditional Arabic, serif

**Code:**
- Primary: IBM Plex Mono, Fira Code
- Fallback: monospace

### Hierarchy

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 48px / 3rem | 600 | 1.2 |
| H2 | 36px / 2.25rem | 600 | 1.25 |
| H3 | 24px / 1.5rem | 600 | 1.3 |
| H4 | 20px / 1.25rem | 500 | 1.4 |
| Body | 16px / 1rem | 400 | 1.6 |
| Small | 14px / 0.875rem | 400 | 1.5 |
| Code | 14px / 0.875rem | 400 | 1.5 |

---

## Iconography

Use simple, geometric icons that complement the brand aesthetic:

- Line weight: 2px
- Style: Outlined preferred, filled for emphasis
- Colors: Sand Gold for primary actions, Teal for secondary

---

## Social Media Assets

All assets are in `social/`:

| Asset | Dimensions | Usage |
|-------|------------|-------|
| `twitter-banner.png` | 1500×500 | Twitter/X header |
| `linkedin-banner.png` | 1584×396 | LinkedIn company banner |
| `og-image.png` | 1200×630 | Open Graph (link previews) |
| `twitter-card.png` | 1200×600 | Twitter card image |

---

## Code Syntax Highlighting

For code blocks, use these colors:

```css
--code-bg: #0A0A0F;        /* Background */
--code-keyword: #C9A227;    /* Keywords (const, function, etc.) */
--code-string: #B87B6B;     /* Strings */
--code-function: #0D7377;   /* Function names */
--code-comment: #6A6A7A;    /* Comments */
--code-variable: #14A3A8;   /* Variables */
--code-number: #E8C547;     /* Numbers */
```

---

## Voice & Tone

### Brand Voice

- **Knowledgeable**: We understand deep technical concepts
- **Accessible**: We explain complexity with clarity
- **Confident**: We believe in our approach
- **Respectful**: We honor the traditions we draw from

### Writing Style

- Use clear, concise language
- Avoid jargon unless necessary
- Include both English and Arabic where appropriate
- Use the tagline: "The Physics of Software" / "فيزياء البرمجيات"

---

## File Structure

```
brand/
├── logos/
│   ├── almadar-logo.jpeg      # Source
│   ├── almadar-logo.png       # Primary
│   ├── almadar-logo-dark.png  # For dark backgrounds
│   ├── almadar-logo-mono.png  # Grayscale
│   ├── almadar-icon.png       # Square icon
│   ├── almadar-icon-*.png     # Various sizes
│   ├── apple-touch-icon.png   # iOS
│   └── favicon.ico            # Browser
├── social/
│   ├── twitter-banner.png
│   ├── linkedin-banner.png
│   ├── og-image.png
│   └── twitter-card.png
├── colors.css                 # CSS variables
└── BRAND_GUIDELINES.md        # This file
```

---

## Contact

For brand questions or asset requests:
- Website: https://almadar.io
- GitHub: https://github.com/almadar-io

---

*Last updated: January 2026*
