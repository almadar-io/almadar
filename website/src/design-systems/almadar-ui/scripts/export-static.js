/**
 * Export Static Design System
 *
 * After Storybook build, this script packages the design system
 * into a client-ready deliverable (PDF or HTML bundle).
 */

const fs = require('fs');
const path = require('path');

const STORYBOOK_DIR = path.join(__dirname, '..', 'storybook-static');
const OUTPUT_DIR = path.join(__dirname, '..', 'exports');

async function exportDesignSystem() {
  console.log('📦 Exporting design system...');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Check if storybook build exists
  if (!fs.existsSync(STORYBOOK_DIR)) {
    console.error('❌ Storybook build not found. Run `npm run build-storybook` first.');
    process.exit(1);
  }

  // Copy storybook-static to exports with timestamp
  const timestamp = new Date().toISOString().split('T')[0];
  const exportName = `design-system-${timestamp}`;
  const exportPath = path.join(OUTPUT_DIR, exportName);

  // Copy directory
  fs.cpSync(STORYBOOK_DIR, exportPath, { recursive: true });

  console.log(`✅ Design system exported to: ${exportPath}`);
  console.log(`   Open ${exportPath}/index.html in a browser to view.`);

  // Create a manifest
  const manifest = {
    name: '@orbital/design-system',
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    themes: ['wireframe', 'minimalist', 'almadar', 'winning-11'],
    components: {
      atoms: ['Avatar', 'Badge', 'Button', 'Card', 'Checkbox', 'Divider', 'Input', 'Radio', 'Select', 'Spinner', 'Typography'],
      molecules: ['Accordion', 'Alert', 'Modal', 'Tabs', 'Toast'],
      organisms: ['ConfirmDialog', 'DataTable', 'Header', 'Sidebar', 'StatCard', 'WizardContainer'],
      templates: ['AuthLayout', 'CounterTemplate', 'DashboardLayout', 'GameTemplate', 'GenericAppTemplate'],
    },
  };

  fs.writeFileSync(
    path.join(exportPath, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  console.log(`   Manifest created at: ${exportPath}/manifest.json`);
}

exportDesignSystem().catch(console.error);
