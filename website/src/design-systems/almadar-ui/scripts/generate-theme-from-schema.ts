/**
 * Theme Generator from OrbitalSchema
 *
 * Analyzes an .orb schema file and generates a client-specific theme CSS file.
 * The theme is derived from the domain, entity names, and any explicit style hints.
 */

import * as fs from 'fs';
import * as path from 'path';

// Domain-to-theme mappings
const DOMAIN_THEMES: Record<string, ThemeConfig> = {
  // Agriculture / Garden domains
  garden: {
    primary: '#15803d',
    primaryHover: '#166534',
    secondary: '#fef7ed',
    accent: '#ca8a04',
    muted: '#ecfccb',
    background: '#fefefe',
    foreground: '#1a2e05',
    border: '#bbf7d0',
    metaphor: 'organic growth',
    shadows: 'soft-organic',
    radius: 'organic',
  },
  agriculture: {
    primary: '#15803d',
    primaryHover: '#166534',
    secondary: '#fef7ed',
    accent: '#ca8a04',
    muted: '#ecfccb',
    background: '#fefefe',
    foreground: '#1a2e05',
    border: '#bbf7d0',
    metaphor: 'organic growth',
    shadows: 'soft-organic',
    radius: 'organic',
  },
  // Healthcare domains
  healthcare: {
    primary: '#0891b2',
    primaryHover: '#0e7490',
    secondary: '#f0f9ff',
    accent: '#06b6d4',
    muted: '#e0f2fe',
    background: '#ffffff',
    foreground: '#0c4a6e',
    border: '#bae6fd',
    metaphor: 'clinical trust',
    shadows: 'minimal',
    radius: 'gentle',
  },
  medical: {
    primary: '#0891b2',
    primaryHover: '#0e7490',
    secondary: '#f0f9ff',
    accent: '#06b6d4',
    muted: '#e0f2fe',
    background: '#ffffff',
    foreground: '#0c4a6e',
    border: '#bae6fd',
    metaphor: 'clinical trust',
    shadows: 'minimal',
    radius: 'gentle',
  },
  // Finance domains
  finance: {
    primary: '#1e3a5f',
    primaryHover: '#0f172a',
    secondary: '#f8fafc',
    accent: '#eab308',
    muted: '#f1f5f9',
    background: '#ffffff',
    foreground: '#0f172a',
    border: '#cbd5e1',
    metaphor: 'stability and trust',
    shadows: 'corporate',
    radius: 'sharp',
  },
  banking: {
    primary: '#1e3a5f',
    primaryHover: '#0f172a',
    secondary: '#f8fafc',
    accent: '#eab308',
    muted: '#f1f5f9',
    background: '#ffffff',
    foreground: '#0f172a',
    border: '#cbd5e1',
    metaphor: 'stability and trust',
    shadows: 'corporate',
    radius: 'sharp',
  },
  // E-commerce domains
  ecommerce: {
    primary: '#7c3aed',
    primaryHover: '#6d28d9',
    secondary: '#faf5ff',
    accent: '#f97316',
    muted: '#f3e8ff',
    background: '#ffffff',
    foreground: '#1e1b4b',
    border: '#e9d5ff',
    metaphor: 'vibrant marketplace',
    shadows: 'playful',
    radius: 'rounded',
  },
  retail: {
    primary: '#7c3aed',
    primaryHover: '#6d28d9',
    secondary: '#faf5ff',
    accent: '#f97316',
    muted: '#f3e8ff',
    background: '#ffffff',
    foreground: '#1e1b4b',
    border: '#e9d5ff',
    metaphor: 'vibrant marketplace',
    shadows: 'playful',
    radius: 'rounded',
  },
  // Game domains
  game: {
    primary: '#dc2626',
    primaryHover: '#b91c1c',
    secondary: '#18181b',
    accent: '#facc15',
    muted: '#27272a',
    background: '#09090b',
    foreground: '#fafafa',
    border: '#3f3f46',
    metaphor: 'energetic action',
    shadows: 'dramatic',
    radius: 'sharp',
  },
  gaming: {
    primary: '#dc2626',
    primaryHover: '#b91c1c',
    secondary: '#18181b',
    accent: '#facc15',
    muted: '#27272a',
    background: '#09090b',
    foreground: '#fafafa',
    border: '#3f3f46',
    metaphor: 'energetic action',
    shadows: 'dramatic',
    radius: 'sharp',
  },
  // Education domains
  education: {
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    secondary: '#eff6ff',
    accent: '#10b981',
    muted: '#dbeafe',
    background: '#ffffff',
    foreground: '#1e3a8a',
    border: '#bfdbfe',
    metaphor: 'clarity and learning',
    shadows: 'soft',
    radius: 'friendly',
  },
  learning: {
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    secondary: '#eff6ff',
    accent: '#10b981',
    muted: '#dbeafe',
    background: '#ffffff',
    foreground: '#1e3a8a',
    border: '#bfdbfe',
    metaphor: 'clarity and learning',
    shadows: 'soft',
    radius: 'friendly',
  },
};

// Shadow presets
const SHADOW_PRESETS: Record<string, ShadowConfig> = {
  'soft-organic': {
    main: '0 4px 12px -2px rgba(21, 128, 61, 0.15), 0 2px 6px -2px rgba(21, 128, 61, 0.1)',
    sm: '0 2px 4px -1px rgba(21, 128, 61, 0.1)',
    lg: '0 16px 32px -8px rgba(21, 128, 61, 0.2), 0 8px 16px -4px rgba(21, 128, 61, 0.1)',
    hover: '0 12px 24px -6px rgba(21, 128, 61, 0.25)',
  },
  minimal: {
    main: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
    sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
    lg: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    hover: '0 10px 40px -10px rgba(0, 0, 0, 0.15)',
  },
  corporate: {
    main: '0 2px 8px -2px rgba(15, 23, 42, 0.12)',
    sm: '0 1px 3px rgba(15, 23, 42, 0.08)',
    lg: '0 12px 28px -6px rgba(15, 23, 42, 0.18)',
    hover: '0 16px 36px -8px rgba(15, 23, 42, 0.22)',
  },
  playful: {
    main: '0 4px 14px -3px rgba(124, 58, 237, 0.2)',
    sm: '0 2px 6px rgba(124, 58, 237, 0.12)',
    lg: '0 18px 36px -10px rgba(124, 58, 237, 0.25)',
    hover: '0 20px 40px -12px rgba(124, 58, 237, 0.3)',
  },
  dramatic: {
    main: '0 4px 20px -4px rgba(0, 0, 0, 0.5)',
    sm: '0 2px 8px rgba(0, 0, 0, 0.4)',
    lg: '0 20px 50px -12px rgba(0, 0, 0, 0.6)',
    hover: '0 24px 60px -16px rgba(0, 0, 0, 0.7)',
  },
  soft: {
    main: '0 2px 8px -2px rgba(37, 99, 235, 0.15)',
    sm: '0 1px 4px rgba(37, 99, 235, 0.1)',
    lg: '0 12px 28px -6px rgba(37, 99, 235, 0.2)',
    hover: '0 16px 36px -8px rgba(37, 99, 235, 0.25)',
  },
};

// Radius presets
const RADIUS_PRESETS: Record<string, RadiusConfig> = {
  organic: { sm: '6px', md: '12px', lg: '16px', xl: '24px' },
  gentle: { sm: '4px', md: '8px', lg: '12px', xl: '16px' },
  sharp: { sm: '2px', md: '4px', lg: '6px', xl: '8px' },
  rounded: { sm: '8px', md: '16px', lg: '24px', xl: '32px' },
  friendly: { sm: '6px', md: '10px', lg: '14px', xl: '20px' },
};

interface ThemeConfig {
  primary: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  muted: string;
  background: string;
  foreground: string;
  border: string;
  metaphor: string;
  shadows: string;
  radius: string;
}

interface ShadowConfig {
  main: string;
  sm: string;
  lg: string;
  hover: string;
}

interface RadiusConfig {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

interface OrbitalSchema {
  name: string;
  version?: string;
  description?: string;
  orbitals?: Array<{
    name: string;
    entity?: {
      name: string;
      fields?: Array<{ name: string; type: string }>;
    };
  }>;
  traits?: Array<{ name: string; category?: string }>;
}

/**
 * Detect domain from schema content
 */
function detectDomain(schema: OrbitalSchema): string {
  const schemaName = schema.name.toLowerCase();
  const description = (schema.description || '').toLowerCase();

  // Check schema name first
  for (const domain of Object.keys(DOMAIN_THEMES)) {
    if (schemaName.includes(domain)) {
      return domain;
    }
  }

  // Check description
  for (const domain of Object.keys(DOMAIN_THEMES)) {
    if (description.includes(domain)) {
      return domain;
    }
  }

  // Check entity names
  const entityNames = (schema.orbitals || [])
    .map(o => (o.entity?.name || '').toLowerCase())
    .join(' ');

  // Domain keywords
  const domainKeywords: Record<string, string[]> = {
    garden: ['plant', 'seed', 'garden', 'grow', 'harvest', 'cultivate', 'soil', 'water', 'farm'],
    healthcare: ['patient', 'doctor', 'hospital', 'medical', 'health', 'diagnosis', 'treatment'],
    finance: ['account', 'transaction', 'payment', 'balance', 'transfer', 'bank', 'money'],
    ecommerce: ['product', 'cart', 'order', 'checkout', 'inventory', 'shop', 'store'],
    game: ['player', 'score', 'level', 'enemy', 'character', 'game', 'sprite'],
    education: ['course', 'student', 'lesson', 'quiz', 'learning', 'teacher', 'class'],
  };

  for (const [domain, keywords] of Object.entries(domainKeywords)) {
    for (const keyword of keywords) {
      if (entityNames.includes(keyword) || schemaName.includes(keyword) || description.includes(keyword)) {
        return domain;
      }
    }
  }

  // Default to minimalist if no domain detected
  return 'default';
}

/**
 * Generate theme CSS from config
 */
function generateThemeCSS(themeName: string, config: ThemeConfig): string {
  const shadows = SHADOW_PRESETS[config.shadows] || SHADOW_PRESETS.minimal;
  const radius = RADIUS_PRESETS[config.radius] || RADIUS_PRESETS.gentle;

  return `/**
 * ${themeName} Theme
 *
 * Auto-generated theme based on domain: ${config.metaphor}
 * Generated at: ${new Date().toISOString()}
 */

[data-design-theme="${themeName}"] {
    /* === Color Palette === */
    --color-primary: ${config.primary};
    --color-primary-hover: ${config.primaryHover};
    --color-primary-foreground: #ffffff;

    --color-secondary: ${config.secondary};
    --color-secondary-hover: ${adjustBrightness(config.secondary, -5)};
    --color-secondary-foreground: ${config.foreground};

    --color-accent: ${config.accent};
    --color-accent-foreground: #ffffff;

    --color-muted: ${config.muted};
    --color-muted-foreground: ${adjustBrightness(config.foreground, 30)};

    --color-background: ${config.background};
    --color-foreground: ${config.foreground};
    --color-card: #ffffff;
    --color-card-foreground: ${config.foreground};
    --color-border: ${config.border};
    --color-input: ${config.border};
    --color-ring: ${config.primary};

    /* === Shadows === */
    --shadow-main: ${shadows.main};
    --shadow-sm: ${shadows.sm};
    --shadow-lg: ${shadows.lg};
    --shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.05);
    --shadow-none: none;
    --shadow-hover: ${shadows.hover};
    --shadow-active: ${shadows.sm};

    /* === Border Radius === */
    --radius-none: 0px;
    --radius-sm: ${radius.sm};
    --radius-md: ${radius.md};
    --radius-lg: ${radius.lg};
    --radius-xl: ${radius.xl};
    --radius-full: 9999px;

    /* === Border Width === */
    --border-width: 1px;
    --border-width-thin: 1px;
    --border-width-thick: 2px;

    /* === Typography === */
    --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 600;
    --letter-spacing: -0.01em;
    --line-height: 1.6;

    /* === Transitions === */
    --transition-fast: 150ms;
    --transition-normal: 250ms;
    --transition-slow: 400ms;
    --transition-timing: cubic-bezier(0.4, 0, 0.2, 1);

    /* === Hover/Active Transforms === */
    --hover-scale: 1.02;
    --hover-translate-y: -2px;
    --active-scale: 0.98;

    /* === Focus Ring === */
    --focus-ring-width: 2px;
    --focus-ring-offset: 2px;
    --focus-ring-color: ${config.primary};

    /* === Card Specific === */
    --card-hover-shadow: ${shadows.hover};
    --card-hover-transform: translateY(-2px) scale(1.01);

    /* === Button Specific === */
    --button-active-transform: scale(0.98);
}
`;
}

/**
 * Adjust color brightness (simple implementation)
 */
function adjustBrightness(hex: string, percent: number): string {
  // Simple brightness adjustment - in production use a proper color library
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}

/**
 * Main function to generate theme from schema
 */
export function generateThemeFromSchema(schemaPath: string, outputPath?: string): string {
  // Read and parse schema
  const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
  const schema: OrbitalSchema = JSON.parse(schemaContent);

  // Detect domain
  const domain = detectDomain(schema);
  console.log(`Detected domain: ${domain}`);

  // Get theme config
  const themeConfig = DOMAIN_THEMES[domain] || {
    primary: '#18181b',
    primaryHover: '#27272a',
    secondary: '#fafafa',
    accent: '#18181b',
    muted: '#f4f4f5',
    background: '#ffffff',
    foreground: '#18181b',
    border: '#e4e4e7',
    metaphor: 'neutral professional',
    shadows: 'minimal',
    radius: 'gentle',
  };

  // Generate theme name from schema name
  const themeName = schema.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  // Generate CSS
  const css = generateThemeCSS(themeName, themeConfig);

  // Write to file if output path provided
  if (outputPath) {
    fs.writeFileSync(outputPath, css);
    console.log(`Theme generated: ${outputPath}`);
  }

  return css;
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error('Usage: npx tsx generate-theme-from-schema.ts <schema.orb> [output.css]');
    process.exit(1);
  }

  const schemaPath = args[0];
  const outputPath = args[1] || path.join(
    path.dirname(schemaPath),
    `${path.basename(schemaPath, '.orb')}-theme.css`
  );

  generateThemeFromSchema(schemaPath, outputPath);
}
