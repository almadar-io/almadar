#!/usr/bin/env npx tsx
/**
 * Design System Generator
 *
 * Reads a config file from a project folder and outputs a customized
 * design system to that project.
 *
 * Usage:
 *   npx tsx generate.ts --config <path-to-config>
 *   npm run generate -- --config ../../projects/winning-11/design-system.config.ts
 */

import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import type {
  DesignSystemConfig,
  ThemeConfig,
  CustomComponentConfig,
  ShadowConfig,
  RadiusConfig,
} from "./types";

// Paths
const DESIGN_SYSTEM_ROOT = path.join(__dirname, "..");
const COMPONENTS_SRC = path.join(DESIGN_SYSTEM_ROOT, "components");
const THEMES_SRC = path.join(DESIGN_SYSTEM_ROOT, "themes");
const LIB_SRC = path.join(DESIGN_SYSTEM_ROOT, "lib");
const HOOKS_SRC = path.join(DESIGN_SYSTEM_ROOT, "hooks");
const CONTEXTS_SRC = path.join(DESIGN_SYSTEM_ROOT, "contexts");
const CLIENTS_SRC = path.join(DESIGN_SYSTEM_ROOT, "clients");

// Shadow presets
const SHADOW_PRESETS: Record<string, ShadowConfig> = {
  "soft-organic": {
    main: "0 4px 12px -2px rgba(21, 128, 61, 0.15), 0 2px 6px -2px rgba(21, 128, 61, 0.1)",
    sm: "0 2px 4px -1px rgba(21, 128, 61, 0.1)",
    lg: "0 16px 32px -8px rgba(21, 128, 61, 0.2), 0 8px 16px -4px rgba(21, 128, 61, 0.1)",
    hover: "0 12px 24px -6px rgba(21, 128, 61, 0.25)",
  },
  minimal: {
    main: "0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)",
    sm: "0 1px 2px rgba(0, 0, 0, 0.04)",
    lg: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    hover: "0 10px 40px -10px rgba(0, 0, 0, 0.15)",
  },
  corporate: {
    main: "0 2px 8px -2px rgba(15, 23, 42, 0.12)",
    sm: "0 1px 3px rgba(15, 23, 42, 0.08)",
    lg: "0 12px 28px -6px rgba(15, 23, 42, 0.18)",
    hover: "0 16px 36px -8px rgba(15, 23, 42, 0.22)",
  },
  playful: {
    main: "0 4px 14px -3px rgba(124, 58, 237, 0.2)",
    sm: "0 2px 6px rgba(124, 58, 237, 0.12)",
    lg: "0 18px 36px -10px rgba(124, 58, 237, 0.25)",
    hover: "0 20px 40px -12px rgba(124, 58, 237, 0.3)",
  },
  dramatic: {
    main: "0 4px 20px -4px rgba(0, 0, 0, 0.5)",
    sm: "0 2px 8px rgba(0, 0, 0, 0.4)",
    lg: "0 20px 50px -12px rgba(0, 0, 0, 0.6)",
    hover: "0 24px 60px -16px rgba(0, 0, 0, 0.7)",
  },
  soft: {
    main: "0 2px 8px -2px rgba(37, 99, 235, 0.15)",
    sm: "0 1px 4px rgba(37, 99, 235, 0.1)",
    lg: "0 12px 28px -6px rgba(37, 99, 235, 0.2)",
    hover: "0 16px 36px -8px rgba(37, 99, 235, 0.25)",
  },
};

// Radius presets
const RADIUS_PRESETS: Record<string, RadiusConfig> = {
  organic: { sm: "6px", md: "12px", lg: "16px", xl: "24px" },
  gentle: { sm: "4px", md: "8px", lg: "12px", xl: "16px" },
  sharp: { sm: "2px", md: "4px", lg: "6px", xl: "8px" },
  rounded: { sm: "8px", md: "16px", lg: "24px", xl: "32px" },
  friendly: { sm: "6px", md: "10px", lg: "14px", xl: "20px" },
};

/**
 * Main generator function
 */
async function generate(configPath: string): Promise<void> {
  console.log("🎨 Orbital Design System Generator\n");

  // Resolve config path
  const absoluteConfigPath = path.resolve(configPath);
  if (!fs.existsSync(absoluteConfigPath)) {
    throw new Error(`Config file not found: ${absoluteConfigPath}`);
  }

  // Load config
  console.log(`📋 Loading config: ${absoluteConfigPath}`);
  const configModule = await import(absoluteConfigPath);
  const config: DesignSystemConfig = configModule.default || configModule;

  // Resolve output directory relative to config file
  const configDir = path.dirname(absoluteConfigPath);
  const outputDir = path.resolve(configDir, config.outputDir);

  console.log(`📁 Output directory: ${outputDir}`);
  console.log(`🏷️  Project: ${config.projectName}\n`);

  // Create output directory
  if (fs.existsSync(outputDir)) {
    console.log("   Cleaning existing output directory...");
    fs.rmSync(outputDir, { recursive: true });
  }
  fs.mkdirSync(outputDir, { recursive: true });

  // Step 1: Copy base components
  console.log("1️⃣  Copying base components...");
  copyDirectory(
    COMPONENTS_SRC,
    path.join(outputDir, "components"),
    config.includeComponents,
  );
  console.log("   ✅ Components copied\n");

  // Step 2: Copy lib utilities, hooks, and contexts
  console.log("2️⃣  Copying utilities...");
  copyDirectory(LIB_SRC, path.join(outputDir, "lib"));
  if (fs.existsSync(HOOKS_SRC)) {
    copyDirectory(HOOKS_SRC, path.join(outputDir, "hooks"));
  }
  if (fs.existsSync(CONTEXTS_SRC)) {
    copyDirectory(CONTEXTS_SRC, path.join(outputDir, "contexts"));
  }
  console.log("   ✅ Utilities, hooks, and contexts copied\n");

  // Step 3: Generate theme CSS
  console.log("3️⃣  Generating theme...");
  const themesDir = path.join(outputDir, "themes");
  fs.mkdirSync(themesDir, { recursive: true });

  // Copy base themes
  for (const file of ["wireframe.css", "minimalist.css"]) {
    const src = path.join(THEMES_SRC, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(themesDir, file));
    }
  }

  // Generate custom theme
  const themeCSS = generateThemeCSS(config.theme);
  const themePath = path.join(themesDir, `${config.theme.name}.css`);
  fs.writeFileSync(themePath, themeCSS);

  // Create theme index
  const themeIndex = generateThemeIndex(config.theme.name);
  fs.writeFileSync(path.join(themesDir, "index.css"), themeIndex);
  console.log(`   ✅ Theme generated: ${config.theme.name}\n`);

  // Step 4: Copy client-specific implementations (if they exist)
  const clientDir = path.join(CLIENTS_SRC, config.projectName);
  const outputClientsDir = path.join(outputDir, "clients", config.projectName);
  if (fs.existsSync(clientDir)) {
    console.log("4️⃣  Copying client implementations...");
    copyDirectory(clientDir, outputClientsDir);
    console.log(`   ✅ Client implementations copied: ${config.projectName}\n`);
  }

  // Step 5: Generate custom components (re-exports or stubs)
  if (config.customComponents && config.customComponents.length > 0) {
    console.log("5️⃣  Generating custom components...");
    generateCustomComponents(
      config.customComponents,
      path.join(outputDir, "components"),
      config.projectName,
      fs.existsSync(clientDir),
    );
    console.log(
      `   ✅ Generated ${config.customComponents.length} custom components\n`,
    );
  }

  // Step 6: Generate index.css
  console.log("6️⃣  Generating index.css...");
  const indexCSS = generateIndexCSS(config.theme.name);
  fs.writeFileSync(path.join(outputDir, "index.css"), indexCSS);
  console.log("   ✅ index.css generated\n");

  // Step 7: Generate package.json
  console.log("7️⃣  Generating package.json...");
  const packageJson = generatePackageJson(config);
  fs.writeFileSync(
    path.join(outputDir, "package.json"),
    JSON.stringify(packageJson, null, 2),
  );
  console.log("   ✅ package.json generated\n");

  // Step 8: Copy config files
  console.log("8️⃣  Copying config files...");
  copyConfigFiles(outputDir, config);
  console.log("   ✅ Config files copied\n");

  // Step 9: Generate Storybook config
  if (config.storybook?.build !== false) {
    console.log("9️⃣  Generating Storybook config...");
    generateStorybookConfig(outputDir, config);
    console.log("   ✅ Storybook config generated\n");
  }

  // Step 10: Generate manifest
  console.log("🔟  Generating manifest...");
  const manifest = generateManifest(config);
  fs.writeFileSync(
    path.join(outputDir, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );
  console.log("   ✅ Manifest generated\n");

  // Summary
  console.log("🎉 Design System Generated Successfully!");
  console.log("=========================================");
  console.log(`   Location: ${outputDir}`);
  console.log(`   Theme: ${config.theme.name}`);
  console.log(`   Custom Components: ${config.customComponents?.length || 0}`);
  console.log("");
  console.log("Next steps:");
  console.log(`   cd ${outputDir}`);
  console.log("   npm install");
  console.log("   npm run storybook");
  console.log("");
}

/**
 * Copy directory with optional filtering
 */
function copyDirectory(
  src: string,
  dest: string,
  filter?: DesignSystemConfig["includeComponents"],
): void {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Check category filter
      if (
        filter?.categories &&
        !filter.categories.includes(entry.name as any)
      ) {
        continue;
      }
      copyDirectory(srcPath, destPath, filter);
    } else {
      // Check include/exclude filters
      const componentName = path.basename(entry.name, path.extname(entry.name));
      if (filter?.exclude?.includes(componentName)) {
        continue;
      }
      if (filter?.include && !filter.include.includes(componentName)) {
        continue;
      }
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Generate theme CSS from config
 */
function generateThemeCSS(theme: ThemeConfig): string {
  const shadows =
    typeof theme.shadows === "string"
      ? SHADOW_PRESETS[theme.shadows] || SHADOW_PRESETS.minimal
      : theme.shadows || SHADOW_PRESETS.minimal;

  const radius =
    typeof theme.radius === "string"
      ? RADIUS_PRESETS[theme.radius] || RADIUS_PRESETS.gentle
      : theme.radius || RADIUS_PRESETS.gentle;

  const { colors } = theme;

  let css = `/**
 * ${theme.displayName || theme.name} Theme
 * ${theme.metaphor ? `Metaphor: ${theme.metaphor}` : ""}
 * Generated: ${new Date().toISOString()}
 */

[data-design-theme="${theme.name}"] {
    /* === Colors === */
    --color-primary: ${colors.primary};
    --color-primary-hover: ${colors.primaryHover || adjustBrightness(colors.primary, -10)};
    --color-primary-foreground: ${colors.primaryForeground || "#ffffff"};

    --color-secondary: ${colors.secondary};
    --color-secondary-hover: ${colors.secondaryHover || adjustBrightness(colors.secondary, -5)};
    --color-secondary-foreground: ${colors.secondaryForeground || colors.foreground};

    --color-accent: ${colors.accent};
    --color-accent-foreground: ${colors.accentForeground || "#ffffff"};

    --color-muted: ${colors.muted};
    --color-muted-foreground: ${colors.mutedForeground || adjustBrightness(colors.foreground, 30)};

    --color-background: ${colors.background};
    --color-foreground: ${colors.foreground};
    --color-card: ${colors.card || "#ffffff"};
    --color-card-foreground: ${colors.cardForeground || colors.foreground};
    --color-border: ${colors.border};
    --color-input: ${colors.input || colors.border};
    --color-ring: ${colors.ring || colors.primary};

    /* Semantic Colors */
    --color-success: ${colors.success || "#22c55e"};
    --color-warning: ${colors.warning || "#f59e0b"};
    --color-error: ${colors.error || "#dc2626"};
    --color-info: ${colors.info || "#0ea5e9"};

    /* === Shadows === */
    --shadow-main: ${shadows.main};
    --shadow-sm: ${shadows.sm};
    --shadow-lg: ${shadows.lg};
    --shadow-hover: ${shadows.hover};
    --shadow-inner: ${shadows.inner || "inset 0 2px 4px rgba(0, 0, 0, 0.05)"};
    --shadow-active: ${shadows.active || shadows.sm};
    --shadow-none: none;

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
    --font-family: ${theme.typography?.fontFamily || "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"};
    --font-weight-normal: ${theme.typography?.fontWeightNormal || 400};
    --font-weight-medium: ${theme.typography?.fontWeightMedium || 500};
    --font-weight-bold: ${theme.typography?.fontWeightBold || 600};
    --letter-spacing: -0.01em;
    --line-height: 1.6;

    /* === Transitions === */
    --transition-fast: 150ms;
    --transition-normal: 250ms;
    --transition-slow: 400ms;
    --transition-timing: cubic-bezier(0.4, 0, 0.2, 1);

    /* === Transforms === */
    --hover-scale: 1.02;
    --hover-translate-y: -2px;
    --active-scale: 0.98;

    /* === Focus === */
    --focus-ring-width: 2px;
    --focus-ring-offset: 2px;
    --focus-ring-color: ${colors.ring || colors.primary};

    /* === Card === */
    --card-hover-shadow: ${shadows.hover};
    --card-hover-transform: translateY(-2px) scale(1.01);

    /* === Button === */
    --button-active-transform: scale(0.98);
`;

  // Add custom colors
  if (colors.custom) {
    css += "\n    /* === Custom Colors === */\n";
    for (const [name, value] of Object.entries(colors.custom)) {
      css += `    --color-${name}: ${value};\n`;
    }
  }

  css += "}\n";

  // Dark mode
  if (theme.darkMode) {
    css += `
/* Dark mode */
.dark[data-design-theme="${theme.name}"],
[data-design-theme="${theme.name}"].dark {
`;
    for (const [key, value] of Object.entries(theme.darkMode)) {
      if (value) {
        const cssVar = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        css += `    --color-${cssVar}: ${value};\n`;
      }
    }
    css += "}\n";
  }

  return css;
}

/**
 * Generate theme index CSS
 */
function generateThemeIndex(themeName: string): string {
  return `/**
 * Theme Index
 */
@import './wireframe.css';
@import './minimalist.css';
@import './${themeName}.css';
`;
}

/**
 * Generate index.css
 */
function generateIndexCSS(themeName: string): string {
  return `/* Design System - ${themeName} */
@import './themes/index.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Base styles */
:root {
  --font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

html {
  font-family: var(--font-family);
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
}
`;
}

/**
 * Generate custom component files
 * If client implementations exist, generates re-exports; otherwise generates stubs
 */
function generateCustomComponents(
  components: CustomComponentConfig[],
  outputDir: string,
  projectName: string,
  hasClientImplementations: boolean,
): void {
  // Group components by category for index generation
  const componentsByCategory: Record<string, CustomComponentConfig[]> = {};

  for (const component of components) {
    const categoryDir = path.join(outputDir, component.category, "custom");
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    // Track by category
    if (!componentsByCategory[component.category]) {
      componentsByCategory[component.category] = [];
    }
    componentsByCategory[component.category].push(component);

    // Check if client implementation exists
    const clientImplPath = path.join(
      CLIENTS_SRC,
      projectName,
      component.category,
      `${component.name}.tsx`,
    );
    const hasImplementation =
      hasClientImplementations && fs.existsSync(clientImplPath);

    if (hasImplementation) {
      // Generate re-export from client implementation
      const reexportCode = generateReexportCode(component, projectName);
      fs.writeFileSync(
        path.join(categoryDir, `${component.name}.tsx`),
        reexportCode,
      );

      // Don't copy stories here - Storybook will pick them up from clients folder directly
      // This avoids duplicate story warnings
      const clientStoryPath = path.join(
        CLIENTS_SRC,
        projectName,
        component.category,
        `${component.name}.stories.tsx`,
      );
      if (!fs.existsSync(clientStoryPath)) {
        // Only generate a story if the client doesn't have one
        const storyCode = generateStoryCode(component);
        fs.writeFileSync(
          path.join(categoryDir, `${component.name}.stories.tsx`),
          storyCode,
        );
      }
    } else {
      // Generate stub component file
      const componentCode = generateComponentCode(component);
      fs.writeFileSync(
        path.join(categoryDir, `${component.name}.tsx`),
        componentCode,
      );

      // Generate story file
      const storyCode = generateStoryCode(component);
      fs.writeFileSync(
        path.join(categoryDir, `${component.name}.stories.tsx`),
        storyCode,
      );
    }
  }

  // Generate index for each category's custom folder
  for (const [category, categoryComponents] of Object.entries(
    componentsByCategory,
  )) {
    const categoryIndexContent = categoryComponents
      .map((c) => `export * from './${c.name}';`)
      .join("\n");
    const categoryDir = path.join(outputDir, category, "custom");
    fs.writeFileSync(
      path.join(categoryDir, "index.ts"),
      `/**\n * Custom ${category} - ${projectName}\n */\n\n${categoryIndexContent}\n`,
    );
  }

  // Generate main index for custom components
  const indexContent = components
    .map((c) => `export * from './${c.category}/custom/${c.name}';`)
    .join("\n");
  fs.writeFileSync(path.join(outputDir, "custom-components.ts"), indexContent);
}

/**
 * Generate re-export code for components with client implementations
 */
function generateReexportCode(
  component: CustomComponentConfig,
  projectName: string,
): string {
  return `/**
 * ${component.name}
 *
 * Re-exports from client-specific implementation
 */

export * from '../../../clients/${projectName}/${component.category}/${component.name}';
`;
}

/**
 * Generate component code
 */
function generateComponentCode(component: CustomComponentConfig): string {
  const propsInterface = component.props
    .map(
      (p) =>
        `  /** ${p.description} */\n  ${p.name}${p.required ? "" : "?"}: ${p.type};`,
    )
    .join("\n");

  return `/**
 * ${component.name}
 *
 * ${component.description}
 * ${component.reasoning ? `\nReasoning: ${component.reasoning}` : ""}
 */

import React from 'react';
import { cn } from '../../../lib/cn';

export interface ${component.name}Props {
${propsInterface}
}

export function ${component.name}({ ${component.props.map((p) => p.name).join(", ")} }: ${component.name}Props) {
  // TODO: Implement ${component.name}
  return (
    <div className={cn('${component.name.toLowerCase()}')}>
      <p>${component.name} - Not yet implemented</p>
      {/* Implementation goes here */}
    </div>
  );
}
`;
}

/**
 * Generate Storybook story code
 */
function generateStoryCode(component: CustomComponentConfig): string {
  return `import type { Meta, StoryObj } from '@storybook/react';
import { ${component.name} } from './${component.name}';

const meta: Meta<typeof ${component.name}> = {
  title: 'Custom/${component.category}/${component.name}',
  component: ${component.name},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Add default props here
  },
};
`;
}

/**
 * Generate package.json
 */
function generatePackageJson(config: DesignSystemConfig): object {
  return {
    name: `@${config.projectName}/design-system`,
    version: "1.0.0",
    private: true,
    scripts: {
      storybook: "storybook dev -p 6006",
      "build-storybook": "storybook build -o storybook-static",
    },
    dependencies: {
      clsx: "^2.1.0",
      "lucide-react": "^0.344.0",
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      "react-router-dom": "^6.22.0",
      "tailwind-merge": "^2.2.0",
    },
    devDependencies: {
      "@storybook/addon-essentials": "^8.0.0",
      "@storybook/addon-interactions": "^8.0.0",
      "@storybook/addon-links": "^8.0.0",
      "@storybook/addon-themes": "^8.0.0",
      "@storybook/blocks": "^8.0.0",
      "@storybook/react": "^8.0.0",
      "@storybook/react-vite": "^8.0.0",
      "@storybook/test": "^8.0.0",
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      "@vitejs/plugin-react": "^4.2.0",
      autoprefixer: "^10.4.17",
      postcss: "^8.4.35",
      storybook: "^8.0.0",
      tailwindcss: "^3.4.1",
      typescript: "^5.3.0",
      vite: "^5.0.0",
    },
  };
}

/**
 * Copy config files (tailwind, postcss, tsconfig, vite)
 */
function copyConfigFiles(outputDir: string, config: DesignSystemConfig): void {
  // tailwind.config.js
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './clients/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: { extend: {} },
  plugins: [],
};
`;
  fs.writeFileSync(path.join(outputDir, "tailwind.config.js"), tailwindConfig);

  // postcss.config.js
  fs.writeFileSync(
    path.join(outputDir, "postcss.config.js"),
    "export default { plugins: { tailwindcss: {}, autoprefixer: {} } };",
  );

  // tsconfig.json
  const tsconfig = {
    compilerOptions: {
      target: "ES2020",
      useDefineForClassFields: true,
      lib: ["ES2020", "DOM", "DOM.Iterable"],
      module: "ESNext",
      skipLibCheck: true,
      moduleResolution: "bundler",
      allowImportingTsExtensions: true,
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: "react-jsx",
      strict: true,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
    },
    include: ["components", "clients", ".storybook"],
  };
  fs.writeFileSync(
    path.join(outputDir, "tsconfig.json"),
    JSON.stringify(tsconfig, null, 2),
  );

  // vite.config.ts
  fs.writeFileSync(
    path.join(outputDir, "vite.config.ts"),
    "import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nexport default defineConfig({ plugins: [react()] });",
  );
}

/**
 * Generate Storybook config
 */
function generateStorybookConfig(
  outputDir: string,
  config: DesignSystemConfig,
): void {
  const sbDir = path.join(outputDir, ".storybook");
  fs.mkdirSync(sbDir, { recursive: true });

  // main.ts
  const mainTs = `import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
    '../clients/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
  ],
  framework: { name: '@storybook/react-vite', options: {} },
  docs: { autodocs: 'tag' },
};

export default config;
`;
  fs.writeFileSync(path.join(sbDir, "main.ts"), mainTs);

  // preview.tsx
  const previewTsx = `import type { Preview } from '@storybook/react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        wireframe: 'wireframe',
        minimalist: 'minimalist',
        '${config.theme.name}': '${config.theme.name}',
      },
      defaultTheme: '${config.theme.name}',
      attributeName: 'data-design-theme',
    }),
    (Story) => <div style={{ padding: '1rem' }}><Story /></div>,
  ],
};

export default preview;
`;
  fs.writeFileSync(path.join(sbDir, "preview.tsx"), previewTsx);
}

/**
 * Generate manifest
 */
function generateManifest(config: DesignSystemConfig): object {
  return {
    name: config.projectName,
    generatedAt: new Date().toISOString(),
    theme: {
      name: config.theme.name,
      displayName: config.theme.displayName,
      metaphor: config.theme.metaphor,
    },
    customComponents: (config.customComponents || []).map((c) => ({
      name: c.name,
      category: c.category,
      priority: c.priority,
    })),
  };
}

/**
 * Adjust color brightness
 */
function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}

// CLI
const args = process.argv.slice(2);
const configIndex = args.indexOf("--config");

if (configIndex === -1 || !args[configIndex + 1]) {
  console.log(`
Orbital Design System Generator

Usage:
  npx tsx generate.ts --config <path-to-config>

Example:
  npx tsx generate.ts --config ../../projects/winning-11/design-system.config.ts
`);
  process.exit(1);
}

generate(args[configIndex + 1]).catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
