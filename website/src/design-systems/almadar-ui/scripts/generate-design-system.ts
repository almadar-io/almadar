/**
 * Unified Design System Generator
 *
 * Generates a complete client-specific design system from an .orb schema:
 * 1. Generates custom theme CSS
 * 2. Suggests domain-specific components
 * 3. Generates component stubs
 * 4. Builds Storybook documentation
 * 5. Exports static design system package
 */

import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import { generateThemeFromSchema } from "./generate-theme-from-schema";
import {
  suggestComponents,
  generateComponentStubs,
} from "./suggest-components";

interface GeneratorOptions {
  schemaPath: string;
  outputDir: string;
  clientName?: string;
  buildStorybook?: boolean;
  generateComponents?: boolean;
  clientOnly?: boolean; // Only include client-specific components in Storybook
}

interface GeneratorResult {
  themePath: string;
  suggestedComponents: number;
  generatedComponents: number;
  storybookPath?: string;
}

/**
 * Main generator function
 */
export async function generateDesignSystem(
  options: GeneratorOptions,
): Promise<GeneratorResult> {
  const {
    schemaPath,
    outputDir,
    clientName,
    buildStorybook = true,
    generateComponents = true,
    clientOnly = false,
  } = options;

  console.log("🎨 Orbital Design System Generator");
  console.log("==================================\n");

  // Validate schema exists
  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema file not found: ${schemaPath}`);
  }

  // Read schema to get name
  const schemaContent = fs.readFileSync(schemaPath, "utf-8");
  const schema = JSON.parse(schemaContent);
  const name =
    clientName || schema.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  console.log(`📋 Processing schema: ${schema.name}`);
  console.log(`📁 Output directory: ${outputDir}\n`);

  // Create output directory
  const clientOutputDir = path.join(outputDir, name);
  if (!fs.existsSync(clientOutputDir)) {
    fs.mkdirSync(clientOutputDir, { recursive: true });
  }

  // Step 1: Generate theme
  console.log("1️⃣  Generating theme...");
  const themePath = path.join(clientOutputDir, `${name}-theme.css`);
  generateThemeFromSchema(schemaPath, themePath);
  console.log(`   ✅ Theme generated: ${themePath}\n`);

  // Step 2: Suggest components
  console.log("2️⃣  Analyzing schema for component suggestions...");
  const { domains, suggestions } = suggestComponents(schemaPath);
  console.log(`   📦 Detected domains: ${domains.join(", ") || "none"}`);
  console.log(`   💡 Suggested components: ${suggestions.length}\n`);

  // Step 3: Generate component stubs
  let generatedCount = 0;
  if (generateComponents && suggestions.length > 0) {
    console.log("3️⃣  Generating component stubs...");
    const componentsDir = path.join(clientOutputDir, "components");
    generateComponentStubs(suggestions, componentsDir);
    generatedCount = suggestions.length;
    console.log(`   ✅ Generated ${generatedCount} component stubs\n`);
  }

  // Step 4: Copy theme to design system themes folder for Storybook
  const designSystemThemesDir = path.join(__dirname, "..", "themes");
  const targetThemePath = path.join(designSystemThemesDir, `${name}.css`);
  fs.copyFileSync(themePath, targetThemePath);
  console.log(`4️⃣  Theme copied to design system: ${targetThemePath}\n`);

  // Update index.css to include the new theme
  const indexCssPath = path.join(__dirname, "..", "index.css");
  const indexCss = fs.readFileSync(indexCssPath, "utf-8");
  const importStatement = `@import './themes/${name}.css';`;

  if (!indexCss.includes(importStatement)) {
    const updatedCss = indexCss.replace(
      "@tailwind base;",
      `${importStatement}\n\n@tailwind base;`,
    );
    fs.writeFileSync(indexCssPath, updatedCss);
    console.log(`   Updated index.css with theme import\n`);
  }

  // Step 5: Update Storybook preview to include the new theme
  const previewPath = path.join(__dirname, "..", ".storybook", "preview.tsx");
  const previewContent = fs.readFileSync(previewPath, "utf-8");

  if (!previewContent.includes(`'${name}':`)) {
    const updatedPreview = previewContent.replace(
      "defaultTheme: 'minimalist',",
      `'${name}': '${name}',\n      },\n      defaultTheme: '${name}',`,
    );
    fs.writeFileSync(previewPath, updatedPreview);
    console.log(`   Updated Storybook preview with theme: ${name}\n`);
  }

  // Step 6: Build Storybook (optional)
  let storybookPath: string | undefined;
  if (buildStorybook) {
    console.log("5️⃣  Building Storybook...");
    const designSystemDir = path.join(__dirname, "..");

    // Determine output path for storybook
    // For client-only, output directly to the output directory (e.g., projects/winning-11/design-system/storybook-static)
    // For full library, output to clientOutputDir/storybook
    storybookPath = clientOnly
      ? path.join(outputDir, "storybook-static")
      : path.join(clientOutputDir, "storybook");

    try {
      // Install dependencies if needed
      if (!fs.existsSync(path.join(designSystemDir, "node_modules"))) {
        console.log("   Installing dependencies...");
        execSync("npm install", { cwd: designSystemDir, stdio: "inherit" });
      }

      if (clientOnly) {
        // Use the dedicated .storybook-client config and output directly to project
        console.log(`   📦 Building client-only Storybook for: ${name}`);
        console.log(`   📁 Output: ${storybookPath}`);

        // Build using client-only config with custom output path
        execSync(
          `npx storybook build -c .storybook-client -o "${storybookPath}"`,
          {
            cwd: designSystemDir,
            stdio: "inherit",
          },
        );
      } else {
        // Build full storybook
        execSync("npm run build-storybook", {
          cwd: designSystemDir,
          stdio: "inherit",
        });

        // Copy to output
        const storybookStaticDir = path.join(
          designSystemDir,
          "storybook-static",
        );
        if (fs.existsSync(storybookStaticDir)) {
          fs.cpSync(storybookStaticDir, storybookPath, { recursive: true });
        }
      }

      console.log(`   ✅ Storybook built: ${storybookPath}\n`);
    } catch (error) {
      console.log(
        "   ⚠️  Storybook build skipped (run manually with npm run build-storybook)\n",
      );
      storybookPath = undefined;
    }
  }

  // Step 7: Generate client portal and deployment files
  console.log("6️⃣  Generating client portal and deployment files...");
  const templatesDir = path.join(__dirname, "..", "..", "templates");
  const projectRoot = path.join(outputDir, "..");

  // Template variables
  const projectDisplayName =
    schema.name ||
    name.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
  const projectId = name.toLowerCase().replace(/[^a-z0-9-]/g, "");
  const generatedDate = new Date().toISOString().split("T")[0];
  const version = schema.version || "1.0.0";

  const replaceTemplateVars = (content: string): string => {
    return content
      .replace(/\{\{PROJECT_NAME\}\}/g, projectDisplayName)
      .replace(/\{\{PROJECT_ID\}\}/g, projectId)
      .replace(/\{\{GENERATED_DATE\}\}/g, generatedDate)
      .replace(/\{\{VERSION\}\}/g, version);
  };

  // Files to copy and process
  const templateFiles = [
    { src: "client-portal.html", dest: "index.html" },
    { src: "firebase.json", dest: "firebase.json" },
    { src: ".firebaserc", dest: ".firebaserc" },
    { src: "deploy.sh", dest: "deploy.sh", executable: true },
  ];

  for (const file of templateFiles) {
    const srcPath = path.join(templatesDir, file.src);
    const destPath = path.join(projectRoot, file.dest);

    if (fs.existsSync(srcPath)) {
      let content = fs.readFileSync(srcPath, "utf-8");
      content = replaceTemplateVars(content);
      fs.writeFileSync(destPath, content);

      if (file.executable) {
        fs.chmodSync(destPath, "755");
      }

      console.log(`   ✅ Generated: ${file.dest}`);
    }
  }
  console.log("");

  // Step 8: Generate manifest
  const manifest = {
    name: schema.name,
    clientName: name,
    generatedAt: new Date().toISOString(),
    domains,
    theme: {
      path: `${name}-theme.css`,
      variables: extractCssVariables(themePath),
    },
    components: {
      suggested: suggestions.map((s) => ({
        name: s.name,
        category: s.category,
        priority: s.priority,
      })),
      generated: generatedCount,
    },
    storybook: storybookPath ? "storybook/index.html" : null,
    clientPortal: "../index.html",
  };

  const manifestPath = path.join(clientOutputDir, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`📄 Manifest generated: ${manifestPath}\n`);

  // Summary
  console.log("🎉 Design System Generation Complete!");
  console.log("=====================================");
  console.log(`   Theme: ${themePath}`);
  console.log(`   Suggested Components: ${suggestions.length}`);
  console.log(`   Generated Components: ${generatedCount}`);
  if (storybookPath) {
    console.log(`   Storybook: ${storybookPath}/index.html`);
  }
  console.log(`   Manifest: ${manifestPath}`);
  console.log("");

  return {
    themePath,
    suggestedComponents: suggestions.length,
    generatedComponents: generatedCount,
    storybookPath,
  };
}

/**
 * Extract CSS variable names from a theme file
 */
function extractCssVariables(themePath: string): string[] {
  const content = fs.readFileSync(themePath, "utf-8");
  const variablePattern = /--([a-z-]+):/g;
  const variables: string[] = [];
  let match;

  while ((match = variablePattern.exec(content)) !== null) {
    if (!variables.includes(`--${match[1]}`)) {
      variables.push(`--${match[1]}`);
    }
  }

  return variables;
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log(`
Orbital Design System Generator

Usage:
  npx tsx generate-design-system.ts <schema.orb> [options]

Options:
  --output <dir>      Output directory (default: ./exports)
  --name <name>       Client name override
  --no-storybook      Skip Storybook build
  --no-components     Skip component generation
  --client-only       Only include client-specific components in Storybook (not the full library)

Examples:
  npx tsx generate-design-system.ts winning-11.orb
  npx tsx generate-design-system.ts winning-11.orb --output ./clients
  npx tsx generate-design-system.ts winning-11.orb --name garden-app --no-storybook
  npx tsx generate-design-system.ts winning-11.orb --client-only
`);
    process.exit(1);
  }

  const schemaPath = args[0];
  const outputIndex = args.indexOf("--output");
  const nameIndex = args.indexOf("--name");

  const options: GeneratorOptions = {
    schemaPath,
    outputDir:
      outputIndex !== -1
        ? args[outputIndex + 1]
        : path.join(__dirname, "..", "exports"),
    clientName: nameIndex !== -1 ? args[nameIndex + 1] : undefined,
    buildStorybook: !args.includes("--no-storybook"),
    generateComponents: !args.includes("--no-components"),
    clientOnly: args.includes("--client-only"),
  };

  generateDesignSystem(options).catch(console.error);
}
