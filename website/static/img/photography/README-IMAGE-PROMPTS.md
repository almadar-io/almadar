# Photography Direction for Almadar

## Design Philosophy: "Gentle Humanist"

Replace stock photos and AI-generated illustrations with **lomography-inspired photographs**
of real places and real contexts. The goal: frame AI and tech as **embedded in real human contexts**,
not floating in abstract gradient space.

## Image Style Guide

- **Color treatment**: Slightly desaturated, warm-shifted (toward amber/sepia), visible grain
- **Lomography feel**: Slight vignetting, soft focus at edges, analog warmth
- **Subjects**: Real architectural spaces, human hands working, physical tools
- **Never**: Stock photos of people using laptops, abstract blob gradients, AI-generated faces

## Recommended Images to Source

Drop images into this folder. The site has SVG fallbacks for all image slots so images are optional but recommended.

### 1. `kafd-mashrabiya.jpg`
**Prompt for sourcing/shooting**: The KAFD (King Abdullah Financial District) building facade in Riyadh,
showing the geometric mashrabiya-inspired screen patterns. Shot from below looking up, warm golden hour
light, slight grain. This connects the "Digital Mashrabiya" design concept to its architectural origin.

### 2. `workshop-slovenia.jpg`
**Prompt**: A workshop or collaborative workspace scene — could be Ljubljana, could be any
European tech hub. Warm overhead lighting, hands on a whiteboard or paper sketches, slightly
out of focus background. Communicates the "human-first" approach to building software.

### 3. `inspection-form.jpg`
**Prompt**: A government inspection form or clipboard in use — real paperwork being filled out,
showing the analog reality that Almadar's behavior modeling maps to digitally. Warm tones,
visible paper texture, partial focus.

### 4. `architectural-detail.jpg`
**Prompt**: Close-up of geometric Islamic/Arabic architectural detail — carved stone, inlaid
tile patterns, or wooden mashrabiya screen. Natural lighting, warm tone, emphasizing the
craft and precision of traditional pattern-making (connects to the "code as craft" philosophy).

### 5. `schema-sketch.jpg`
**Prompt**: A hand-drawn diagram or entity-relationship sketch on paper or whiteboard.
Pen/marker on paper, visible handwriting, warm lighting. Shows that modeling starts
as a human thought process before becoming code.

## SVG Fallbacks

Each image slot in the site has a geometric SVG fallback that uses the Mashrabiya design
language (teal lines, gold accents, warm parchment). These render when images are not available.

## Technical Notes

- Recommended size: 1200x800px or 800x600px
- Format: JPEG (for photos), keep file size under 200KB
- Apply grain/warmth in post if shooting digitally
- Use CSS `filter: sepia(0.08) saturate(0.9)` for consistency if mixing sources
