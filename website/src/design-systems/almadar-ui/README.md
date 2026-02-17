# Orbital Design System

A themeable, domain-aware component library for Orbital applications. Generates client-specific design systems from `.orb` schemas.

## Features

- **CSS Variable-Based Theming**: All components use CSS variables, enabling easy theme switching
- **Domain Detection**: Automatically detects domain (garden, healthcare, finance, etc.) from schema
- **Component Suggestions**: Suggests domain-specific components based on schema analysis
- **Storybook Integration**: Visual component documentation with theme switching
- **Static Export**: Export design system as static HTML for client delivery

## Quick Start

```bash
# Install dependencies
npm install

# Start Storybook for development
npm run storybook

# Generate a client-specific design system
npm run generate path/to/schema.orb
```

## Available Themes

| Theme | Description | Best For |
|-------|-------------|----------|
| `wireframe` | High contrast, sharp edges | Prototyping |
| `minimalist` | Soft, elegant, subtle | Corporate apps |
| `almadar` | Brand-specific styling | Al-Madar projects |
| `winning-11` | Garden/organic theme | Agriculture, nature |

## Scripts

### `npm run storybook`
Start Storybook development server on port 6006.

### `npm run build-storybook`
Build static Storybook documentation.

### `npm run generate <schema.orb> [options]`
Generate a complete client-specific design system.

Options:
- `--output <dir>` - Output directory (default: ./exports)
- `--name <name>` - Client name override
- `--no-storybook` - Skip Storybook build
- `--no-components` - Skip component generation

Example:
```bash
npm run generate ../architecture/winning-11.orb --output ./clients
```

### `npm run generate:theme <schema.orb> [output.css]`
Generate only the theme CSS from a schema.

### `npm run suggest:components <schema.orb> [--generate <dir>]`
Analyze schema and suggest domain-specific components.

## Component Library Structure

```
components/
├── atoms/           # Basic building blocks
│   ├── Button
│   ├── Input
│   ├── Badge
│   ├── Card
│   └── ...
├── molecules/       # Composite components
│   ├── Alert
│   ├── Modal
│   ├── Tabs
│   └── ...
├── organisms/       # Complex components
│   ├── DataTable
│   ├── Header
│   ├── Sidebar
│   └── ...
└── templates/       # Page layouts
    ├── AuthLayout
    ├── FormTemplate
    └── ...
```

## Theming

### Using a Theme

Apply a theme by setting `data-design-theme` attribute:

```html
<html data-design-theme="winning-11">
  ...
</html>
```

Or in React:

```tsx
<div data-design-theme="winning-11">
  <Button>Themed Button</Button>
</div>
```

### CSS Variables

All components use CSS variables for theming:

```css
/* Colors */
--color-primary
--color-primary-hover
--color-primary-foreground
--color-secondary
--color-secondary-foreground
--color-accent
--color-muted
--color-muted-foreground
--color-background
--color-foreground
--color-border

/* Shadows */
--shadow-sm
--shadow-main
--shadow-lg
--shadow-hover

/* Border Radius */
--radius-sm
--radius-md
--radius-lg
--radius-xl

/* Transitions */
--transition-fast
--transition-normal
--transition-slow
```

### Creating a Custom Theme

1. Create a CSS file in `themes/`:

```css
[data-design-theme="my-theme"] {
    --color-primary: #your-color;
    --color-secondary: #your-color;
    /* ... other variables */
}
```

2. Import in `themes/index.css`:

```css
@import './my-theme.css';
```

3. Add to Storybook preview (`.storybook/preview.tsx`):

```tsx
themes: {
  // ...existing themes
  'my-theme': 'my-theme',
}
```

## Domain-Specific Components

The generator suggests domain-specific components based on schema analysis:

### Garden/Agriculture Domain
- `GardenView` - Visual garden layout
- `PlantCard` - Plant display with care indicators
- `GrowthMeter` - Progress indicator for growth
- `TrustMeter` - Trust/relationship indicator
- `CareIndicator` - Water/sun/nutrient needs

### Healthcare Domain
- `PatientCard` - Patient information display
- `VitalsDisplay` - Vital signs compact view
- `AppointmentSlot` - Scheduling component

### E-commerce Domain
- `ProductCard` - Product with price and cart action
- `CartSummary` - Cart overview
- `PriceTag` - Formatted price display

### Game Domain
- `CharacterStats` - RPG-style stat display
- `QuestTracker` - Active quest panel

## Integration with Proposal Documents

The generated design system can be included in client proposals:

1. Generate the design system:
   ```bash
   npm run generate ../architecture/winning-11.orb --output ./exports
   ```

2. The export includes:
   - Theme CSS file
   - Component stubs (if domain detected)
   - Storybook documentation
   - Manifest with metadata

3. Reference in proposal documents or deliver as standalone package.

## Client-Specific Components

Client-specific components live in dedicated folders named after the client. These components:
- **Extend the core library** - Use existing atoms/molecules, don't recreate them
- **Follow Atomic Design** - Break down into atoms, molecules, organisms, templates
- **Include Storybook stories** - Every component must have a `.stories.tsx` file
- **Are reusable** - Can be used in future projects for the same client

### Directory Structure

```
orbital-shared/design-system/
├── components/              # Core component library (shared across all clients)
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── clients/                 # Client-specific components
│   ├── winning-11/          # Winning-11 client
│   │   ├── atoms/           # Client-specific atoms (rare)
│   │   ├── molecules/       # Client-specific molecules
│   │   ├── organisms/       # Client-specific organisms
│   │   ├── templates/       # Client page templates/showcases
│   │   └── index.ts         # Barrel export
│   └── [other-client]/      # Another client folder
└── ...
```

### When to Create Client-Specific Components

| Scenario | Where to Add |
|----------|--------------|
| Generic component useful for any project | `components/` (core library) |
| Domain-specific styling of existing component | Client folder with composition |
| Unique business logic component | Client folder |
| Page template/showcase | `clients/[name]/templates/` |

### Creating Client-Specific Components

1. **Create in client folder**:
   ```
   clients/winning-11/organisms/GardenLayout.tsx
   clients/winning-11/organisms/GardenLayout.stories.tsx
   ```

2. **Import from core library**:
   ```tsx
   import { Card, Badge } from '../../../components/atoms';
   import { Grid } from '../../../components/molecules';
   ```

3. **Export from client index**:
   ```tsx
   // clients/winning-11/index.ts
   export * from './organisms/GardenLayout';
   ```

4. **Create Storybook story**:
   ```tsx
   // GardenLayout.stories.tsx
   import type { Meta, StoryObj } from '@storybook/react';
   import { GardenLayout } from './GardenLayout';

   const meta: Meta<typeof GardenLayout> = {
     title: 'Clients/Winning-11/Organisms/GardenLayout',
     component: GardenLayout,
   };
   export default meta;
   ```

### Client Templates

Templates showcase complete page layouts specific to the client. They demonstrate:
- How components compose together
- Realistic data patterns
- Brand-specific styling

```tsx
// clients/winning-11/templates/GardenDashboard.tsx
export const GardenDashboard = () => (
  <PageLayout>
    <Header />
    <GardenStats />
    <PlantGrid plants={mockPlants} />
  </PageLayout>
);
```

### Syncing to Projects

When generating a client project, client-specific components are copied:

```bash
npm run generate schema.orb --client winning-11 --output ../projects/winning-11
```

This copies:
- Core `components/` library
- Client-specific `clients/winning-11/` folder
- Themes and hooks

## Development

### Adding New Components

1. Create component in appropriate category (`atoms/`, `molecules/`, `organisms/`)
2. Create corresponding `.stories.tsx` file
3. Export from category's `index.ts`
4. Verify in Storybook

### Adding New Themes

1. Create theme CSS in `themes/`
2. Follow existing theme structure for CSS variables
3. Add import to `themes/index.css`
4. Add to Storybook theme selector

### Adding Domain-Specific Components

1. Add domain config to `scripts/suggest-components.ts`
2. Define keywords and component suggestions
3. Test with schema from that domain
