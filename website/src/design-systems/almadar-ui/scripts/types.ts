/**
 * Design System Generator Types
 *
 * Input configuration for generating a customized design system
 * that gets output to a project folder.
 */

export interface DesignSystemConfig {
  /** Project/client name (e.g., "winning-11") */
  projectName: string;

  /** Output directory for the generated design system */
  outputDir: string;

  /** Theme configuration */
  theme: ThemeConfig;

  /** Custom components not in the standard library */
  customComponents?: CustomComponentConfig[];

  /** Which standard components to include (default: all) */
  includeComponents?: ComponentFilter;

  /** Storybook configuration */
  storybook?: StorybookConfig;
}

export interface ThemeConfig {
  /** Theme name (used in data-design-theme attribute) */
  name: string;

  /** Theme display name for documentation */
  displayName?: string;

  /** Design metaphor/style description */
  metaphor?: string;

  /** Color palette */
  colors: {
    primary: string;
    primaryHover?: string;
    primaryForeground?: string;
    secondary: string;
    secondaryHover?: string;
    secondaryForeground?: string;
    accent: string;
    accentForeground?: string;
    muted: string;
    mutedForeground?: string;
    background: string;
    foreground: string;
    card?: string;
    cardForeground?: string;
    border: string;
    input?: string;
    ring?: string;

    /** Semantic colors */
    success?: string;
    warning?: string;
    error?: string;
    info?: string;

    /** Custom domain-specific colors */
    custom?: Record<string, string>;
  };

  /** Shadow style preset or custom shadows */
  shadows?: 'soft-organic' | 'minimal' | 'corporate' | 'playful' | 'dramatic' | 'soft' | ShadowConfig;

  /** Border radius preset or custom radii */
  radius?: 'organic' | 'gentle' | 'sharp' | 'rounded' | 'friendly' | RadiusConfig;

  /** Typography overrides */
  typography?: {
    fontFamily?: string;
    fontWeightNormal?: number;
    fontWeightMedium?: number;
    fontWeightBold?: number;
  };

  /** Dark mode variant */
  darkMode?: Partial<ThemeConfig['colors']>;
}

export interface ShadowConfig {
  main: string;
  sm: string;
  lg: string;
  hover: string;
  inner?: string;
  active?: string;
}

export interface RadiusConfig {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface CustomComponentConfig {
  /** Component name (PascalCase) */
  name: string;

  /** Component description */
  description: string;

  /** Category in the component library */
  category: 'atoms' | 'molecules' | 'organisms' | 'templates';

  /** Component props */
  props: ComponentProp[];

  /** Why this component is needed */
  reasoning?: string;

  /** Priority for implementation */
  priority?: 'high' | 'medium' | 'low';

  /** Optional implementation code */
  implementation?: string;

  /** Optional Storybook stories */
  stories?: string;
}

export interface ComponentProp {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  defaultValue?: string;
}

export interface ComponentFilter {
  /** Include all components (default: true) */
  all?: boolean;

  /** Specific categories to include */
  categories?: ('atoms' | 'molecules' | 'organisms' | 'templates')[];

  /** Specific components to include (by name) */
  include?: string[];

  /** Specific components to exclude (by name) */
  exclude?: string[];
}

export interface StorybookConfig {
  /** Build Storybook (default: true) */
  build?: boolean;

  /** Include Storybook source in output (default: true) */
  includeSource?: boolean;

  /** Custom Storybook title */
  title?: string;
}

/**
 * Example configuration for Winning-11 (Garden theme)
 */
export const WINNING_11_CONFIG: DesignSystemConfig = {
  projectName: 'winning-11',
  outputDir: '/path/to/winning-11/design-system',

  theme: {
    name: 'winning-11',
    displayName: 'Winning 11 Garden Theme',
    metaphor: 'organic growth, trust, cultivation',

    colors: {
      primary: '#15803d',
      primaryHover: '#166534',
      primaryForeground: '#ffffff',
      secondary: '#fef7ed',
      secondaryForeground: '#78350f',
      accent: '#ca8a04',
      accentForeground: '#ffffff',
      muted: '#ecfccb',
      mutedForeground: '#365314',
      background: '#fefefe',
      foreground: '#1a2e05',
      border: '#bbf7d0',

      success: '#22c55e',
      warning: '#f59e0b',
      error: '#dc2626',
      info: '#0ea5e9',

      custom: {
        'garden-leaf': '#22c55e',
        'garden-stem': '#15803d',
        'garden-soil': '#78350f',
        'garden-water': '#0ea5e9',
        'garden-sun': '#fbbf24',
        'trust-low': '#fbbf24',
        'trust-medium': '#22c55e',
        'trust-high': '#15803d',
        'trust-verified': '#0ea5e9',
      },
    },

    shadows: 'soft-organic',
    radius: 'organic',

    darkMode: {
      primary: '#4ade80',
      primaryHover: '#86efac',
      background: '#0f1a0a',
      foreground: '#ecfccb',
      card: '#14532d',
      border: '#166534',
    },
  },

  customComponents: [
    {
      name: 'GardenView',
      description: 'Visual garden layout showing plants in a grid or organic arrangement',
      category: 'organisms',
      priority: 'high',
      props: [
        { name: 'plants', type: 'Plant[]', description: 'Array of plants to display', required: true },
        { name: 'layout', type: "'grid' | 'organic'", description: 'Layout style', defaultValue: "'grid'" },
        { name: 'onPlantClick', type: '(plant: Plant) => void', description: 'Plant selection handler' },
      ],
      reasoning: 'Core visualization for garden/agriculture domain',
    },
    {
      name: 'PlantCard',
      description: 'Card displaying a single plant with growth status and care indicators',
      category: 'molecules',
      priority: 'high',
      props: [
        { name: 'plant', type: 'Plant', description: 'Plant data to display', required: true },
        { name: 'showCareIndicators', type: 'boolean', description: 'Show water/sun needs', defaultValue: 'true' },
        { name: 'onClick', type: '() => void', description: 'Click handler' },
      ],
      reasoning: 'Essential card for displaying individual plant information',
    },
    {
      name: 'GrowthMeter',
      description: 'Progress indicator showing plant growth stage',
      category: 'atoms',
      priority: 'high',
      props: [
        { name: 'progress', type: 'number', description: 'Growth progress 0-100', required: true },
        { name: 'stages', type: 'string[]', description: 'Growth stage labels' },
      ],
      reasoning: 'Visual feedback for growth/progress - core to garden metaphor',
    },
    {
      name: 'TrustMeter',
      description: 'Visual indicator for trust/relationship level between entities',
      category: 'atoms',
      priority: 'high',
      props: [
        { name: 'level', type: "'low' | 'medium' | 'high' | 'verified'", description: 'Trust level', required: true },
        { name: 'showLabel', type: 'boolean', description: 'Show text label', defaultValue: 'true' },
      ],
      reasoning: 'Visualize trust between farmers and buyers in Winning-11',
    },
    {
      name: 'CareIndicator',
      description: 'Small icon indicator for plant care needs',
      category: 'atoms',
      priority: 'medium',
      props: [
        { name: 'type', type: "'water' | 'sun' | 'nutrients'", description: 'Care type', required: true },
        { name: 'level', type: "'low' | 'medium' | 'high'", description: 'Need level', required: true },
      ],
      reasoning: 'Quick visual cues for plant care requirements',
    },
  ],

  storybook: {
    build: true,
    title: 'Winning 11 Design System',
  },
};
