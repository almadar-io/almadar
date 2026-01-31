/**
 * Generate Standard Library Documentation Data
 *
 * Uses the TypeScript docs generator from @kflow-builder/shared to generate
 * JSON data files that Handlebars templates can consume to render docs.
 *
 * Usage: node scripts/generate-std-docs.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src', 'data');

// Import generator from shared package
const SHARED_STD = path.join(ROOT, '..', 'shared', 'dist', 'orbitals', 'std', 'index.js');

async function main() {
    console.log('📚 Generating Standard Library Documentation Data...\n');

    // Import the docs generator from shared
    const std = await import(SHARED_STD);

    // Generate all documentation
    const { modules, behaviors } = std.generateStdLibDocs();

    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // Write modules data
    fs.writeFileSync(
        path.join(DATA_DIR, 'stdlib-modules.json'),
        JSON.stringify(modules, null, 2)
    );
    console.log('✓ Generated src/data/stdlib-modules.json');
    console.log(`  • ${modules.stats.totalModules} modules`);
    console.log(`  • ${modules.stats.totalOperators} operators`);

    // Write behaviors data
    fs.writeFileSync(
        path.join(DATA_DIR, 'stdlib-behaviors.json'),
        JSON.stringify(behaviors, null, 2)
    );
    console.log('\n✓ Generated src/data/stdlib-behaviors.json');
    console.log(`  • ${behaviors.stats.totalBehaviorCategories} categories`);
    console.log(`  • ${behaviors.stats.totalBehaviors} behaviors`);

    console.log('\n✅ Documentation data generation complete!');
}

main().catch(console.error);
