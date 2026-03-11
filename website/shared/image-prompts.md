# Almadar Website Image Generation Prompts

All images should be generated at 1200x800 or 1200x630 (for hero/OG images).
Save outputs to the paths listed under each prompt.

## Image Optimization

All generated images are optimized for web delivery:
- **WebP versions** (`.webp`) are auto-generated alongside PNGs. Use WebP on the site for best performance.
- PNGs are resized to max 1600px width and compressed.
- Run `python3 scripts/optimize-images.py` after adding new images (or see the Pillow script in the conversation history).
- WebP files average ~60 KB per image (vs 1-2 MB for optimized PNGs).

## Visual Style Guide

All generated images share a consistent style:
- **Background**: Deep navy (#0f172a) or very dark slate, with subtle radial gradients
- **Color palette**: Teal (#14b8a6), cyan (#06b6d4), sand gold (#c9a227), indigo (#6366f1)
- **Aesthetic**: Luminous, glowing, glass-like orbs and particles, clean geometric shapes
- **Typography**: None in the images (text is overlaid by the site)
- **Mood**: Scientific, precise, futuristic but grounded. Think particle physics meets product design.

---

## Product Icons (GENERATED)

### Orb Icon
> A luminous glass orb on a transparent background, 1024x1024 PNG. The sphere has a cyan-to-emerald (#06b6d4 to #10b981) internal glow with tiny sparkling particles inside, like a crystal ball containing code. Faint circuit-board-like patterns visible through the glass. Light refracts along the edges. The orb sits on nothing, floating in space. No background, no text, no extra elements. Ultra clean, ultra polished. The viewer should feel they are looking at something precious and powerful, like a compiler condensed into a single jewel.

**Save to:** `shared/static/img/orb-icon.png` (+ size variants: 16, 32, 64, 128, 180, 192, 256, 512)

### Studio (Almadar Studio) Icon
> A luminous glass orb on a transparent background, 1024x1024 PNG. The sphere has a teal-to-cyan (#14b8a6 to #06b6d4) internal glow with floating rectangular shapes inside that look like UI panels or windows being assembled. Faint light rays emanate from the orb outward, suggesting creation radiating from the core. Glass reflections on the surface. No background, no text. The viewer should feel this orb is a tool that builds things, a forge of digital products.

**Save to:** `shared/static/img/studio-icon.png` (+ size variants)

### Services (Almadar Services) Icon
> A luminous glass orb on a transparent background, 1024x1024 PNG. The sphere has an indigo-to-teal (#6366f1 to #14b8a6) internal glow with a network of interconnected glowing nodes and lines inside, like a neural network or constellation map. The connections pulse with light. The orb's glass surface has subtle faceted reflections. No background, no text. The viewer should feel this orb contains an entire infrastructure, alive with data flowing between nodes.

**Save to:** `shared/static/img/services-icon.png` (+ size variants)

---

## almadar.io (Main Site)

### Vision Page Hero
> A wide panoramic scene on a deep navy background. Multiple luminous glass orbs of varying sizes float in space, connected by thin glowing teal lines. Some orbs contain tiny UI wireframes, others contain data symbols, others contain state machine diagrams. The connections between them glow brighter where they intersect, suggesting interoperability. The overall composition suggests a constellation of software systems that understand each other. Aspect ratio 1200x630.

**Save to:** `sites/main/static/img/vision-hero.png`

### Vision Page: Composable World Models Diagram
> Three luminous orbs arranged in a triangle on a dark background. Each orb contains a different miniature scene: one shows a shopping cart (commerce), one shows a calendar (scheduling), one shows a medical cross (healthcare). Thin golden lines connect all three orbs at their centers, with small glowing particles traveling along the lines. Below the triangle, a larger, brighter orb receives all three connections, representing composition. Clean, geometric, minimal. 1200x800.

**Save to:** `sites/main/static/img/vision-composable.png`

### AI Page: Neural Pipeline Visualization
> A horizontal flow of six connected glass nodes on a dark background, arranged left to right. Each node is a small luminous sphere with a distinct teal-to-indigo gradient. Between each node, thin glowing lines with directional particles show data flowing left to right. The nodes increase slightly in brightness from left to right, suggesting refinement. Small labels aren't needed (the site adds them), but each node should feel distinct. The leftmost is rough and scattered (mutator), the rightmost is sharp and crystalline (integration). 1200x630.

**Save to:** `sites/main/static/img/ai-pipeline.png`

### AI Page: Cost Comparison
> A simple visual comparison on a dark background. On the left, a large diffuse cloud of scattered light particles (representing a large, expensive LLM). On the right, a small, concentrated, brilliant orb of light (representing Almadar's focused models). The left is labeled-ready with dim, spread-out glow. The right is sharp, bright, and compact. A thin line between them shows a "10x" compression effect, with particles condensing from left to right. 1200x630.

**Save to:** `sites/main/static/img/ai-cost.png`

### About Page: Team Illustration
> Two luminous orbs side by side on a dark background, one teal and one gold, representing the two co-founders. Each orb has its own internal light pattern: the teal orb shows circuit patterns (technical), the gold orb shows interconnected nodes (management). Where the two orbs nearly touch, their light fields overlap and create a bright white glow at the intersection, suggesting collaboration. Clean, abstract, no faces. 1200x630.

**Save to:** `sites/main/static/img/about-team.png`

---

## orb.almadar.io (Language Site)

### Homepage Hero: Code to App
> Split composition on dark background. Left side: a translucent panel showing lines of structured code (abstract, not real code, just glowing lines of varying lengths in a monospace grid). Right side: a glowing UI wireframe showing a clean app layout with cards, buttons, and a sidebar. Between them, a luminous orb sits at the center with golden arrows flowing from the code panel through the orb to the app wireframe. The orb is the compiler, transforming description into product. 1200x630.

**Save to:** `sites/orb/static/img/hero-code-to-app.png`

### Stdlib: Domain Grid Background
> A grid of 18 small luminous icons on a dark background, arranged in a 6x3 pattern. Each icon is a tiny glowing orb with a unique abstract symbol inside: cart, heart, book, coin, calendar, gear, chat bubble, film strip, game controller, circuit, handshake, graph, map pin, shield, music note, microscope, truck, paint palette. All icons share the same teal-cyan glow style. The grid fades at the edges. 1200x800.

**Save to:** `sites/orb/static/img/stdlib-domains.png`

### Downloads: Platform Icons
> Three platform symbols on a dark background, arranged horizontally with equal spacing. Left: an Apple logo silhouette in teal glow. Center: a Linux penguin silhouette in cyan glow. Right: a Windows logo silhouette in indigo glow. Each symbol floats above a thin horizontal line of the same color. Clean, minimal, icon-style. Below each, a subtle downward arrow glyph. 1200x400.

**Save to:** `sites/orb/static/img/downloads-platforms.png`

### Docs: Closed Circuit Diagram
> A circular flow diagram on dark background. Four glowing nodes arranged in a circle: "Event" (top, teal), "Guard" (right, gold), "Transition" (bottom, teal), "Effect" (left, gold). Arrows flow clockwise between nodes, made of tiny glowing particles. The center of the circle has a subtle orbital motif. The overall feel is a perpetual loop of verified behavior. 1200x800.

**Save to:** `sites/orb/static/img/docs-closed-circuit.png`

---

## studio.almadar.io (REAL SCREENSHOTS)

Studio site uses actual screenshots from the Builder's deployed Storybook instead of generated images. Captured via `tools/almadar-screenshot` from `https://almadar-builder-design-system.web.app`.

**13 screenshots captured to `sites/studio/static/img/screenshots/`:**
- `builder-templates-aibuildertemplate--default.png` - AI Builder (chat + schema generation)
- `builder-templates-studioprojecttemplate--build-mode-schema.png` - Schema editor view
- `builder-templates-previewtemplate--default.png` - Live preview pane
- `builder-templates-previewdashboardtemplate--default.png` - Preview dashboard
- `builder-templates-validationtemplate--default.png` - Validation results
- `builder-templates-validationview--default.png` - Validation detail view
- `builder-templates-domainlogicview--default.png` - Domain logic editor
- `builder-templates-studiohomewebtemplate--default.png` - Studio home (web)
- `builder-templates-studiohomeelectrontemplate--default.png` - Studio home (desktop)
- `builder-templates-workspacetemplate--default.png` - Workspace manager
- `builder-templates-settingstemplate--default.png` - Settings
- `builder-templates-studiostatstemplate--default.png` - Stats dashboard
- `builder-templates-logintemplate--default.png` - Login

To recapture: `npx tsx tools/almadar-screenshot/src/capture.ts --project builder --output sites/studio/static/img/screenshots --best-only`

---

## services.almadar.io

### Homepage Hero: Three-Layer Architecture
> Three horizontal layers stacked vertically on dark background, with glowing separators between them. Top layer (indigo): "Brains" with neural network node patterns. Middle layer (teal): "Metal" with circuit board and server patterns. Bottom layer (gold): "Integrations" with connector/plug symbols. Each layer is a translucent panel. Thin glowing lines connect elements across layers. 1200x630.

**Save to:** `sites/services/static/img/hero-layers.png`

### Brains: Agent Orchestration
> A central luminous orb (the DeepAgent) surrounded by six smaller orbs in a hexagonal pattern on dark background. Each smaller orb represents a capability: one has a chat symbol, one has a memory symbol, one has a brain symbol, one has a skill/wrench symbol, one has a clock symbol, one has a code symbol. Thin indigo lines connect each to the center. The center orb glows brightest. 1200x800.

**Save to:** `sites/services/static/img/brains-orchestration.png`

### Metal: Event Bus Diagram
> A horizontal backbone line (the event bus) glowing teal on dark background. Multiple smaller lines branch off vertically (up and down) to connected service icons: database, queue, auth, storage, monitoring. Each service icon is a small abstract glyph. Tiny particles flow along the backbone and branch lines, showing event flow. The bus pulses with light. 1200x800.

**Save to:** `sites/services/static/img/metal-eventbus.png`

### Integrations: Connector Logos
> Seven small glowing orbs arranged in a circular pattern on dark background, each containing an abstract symbol for: Stripe (payment), Twilio (phone), GitHub (code branch), Email (envelope), YouTube (play button), Docker (container), Redis (diamond). All orbs connected by thin lines to a central hub orb. Each orb has a unique subtle color tint matching the brand. 1200x800.

**Save to:** `sites/services/static/img/integrations-connectors.png`

---

## Shared / Cross-Site

### 404 Page Illustration
> A single luminous orb cracked open on dark background, with light leaking from the cracks. Small glowing particles drift away from the crack. The orb sits slightly off-center. A faint "?" symbol floats above it in thin teal light. The mood is gentle confusion, not broken. 800x600.

**Save to:** `shared/static/img/404-illustration.png`
