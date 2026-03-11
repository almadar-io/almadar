/**
 * Generate Standard Library Documentation Data
 *
 * Imports generateStdLibDocs() from @almadar/std (local monorepo build)
 * and writes JSON data files consumed by the orb site's reference components.
 *
 * Usage: node scripts/generate-std-docs.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

// Output to orb site data directory (V2 multi-site structure)
const ORB_DATA_DIR = path.join(ROOT, 'sites', 'orb', 'src', 'data');
// Also keep legacy location in sync
const LEGACY_DATA_DIR = path.join(ROOT, 'src', 'data');

// Import from @almadar/std built dist (monorepo local path)
const STD_DIST = path.join(ROOT, '..', '..', 'packages', 'almadar-std', 'dist', 'index.js');

async function main() {
    console.log('Generating Standard Library Documentation Data...\n');

    // Verify the dist exists
    if (!fs.existsSync(STD_DIST)) {
        console.error(`ERROR: @almadar/std dist not found at ${STD_DIST}`);
        console.error('Run: cd packages/almadar-std && pnpm run build');
        process.exit(1);
    }

    const std = await import(STD_DIST);
    const { modules, behaviors } = std.generateStdLibDocs();

    // Write to both output directories
    for (const [label, dir] of [['sites/orb/src/data', ORB_DATA_DIR], ['src/data', LEGACY_DATA_DIR]]) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(
            path.join(dir, 'stdlib-modules.json'),
            JSON.stringify(modules, null, 2)
        );
        fs.writeFileSync(
            path.join(dir, 'stdlib-behaviors.json'),
            JSON.stringify(behaviors, null, 2)
        );
        console.log(`Written to ${label}/`);
    }

    console.log(`\n  ${modules.stats.totalModules} modules, ${modules.stats.totalOperators} operators`);
    console.log(`  ${behaviors.stats.totalBehaviorCategories} categories, ${behaviors.stats.totalBehaviors} behaviors`);
    console.log('\nDone.');
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
