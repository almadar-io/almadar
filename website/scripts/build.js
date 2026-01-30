/**
 * Website Build Script
 * 
 * Compiles Handlebars templates into static HTML files.
 * 
 * Usage:
 *   node scripts/build.js          # Build once
 *   node scripts/build.js --watch  # Watch for changes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Handlebars from 'handlebars';
import * as esbuild from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

// Directories
const DIRS = {
    src: path.join(ROOT, 'src'),
    pages: path.join(ROOT, 'src', 'pages'),
    layouts: path.join(ROOT, 'src', 'layouts'),
    partials: path.join(ROOT, 'src', 'partials'),
    styles: path.join(ROOT, 'src', 'styles'),
    static: path.join(ROOT, 'static'),
    dist: path.join(ROOT, 'dist'),
};

// Ensure directories exist
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Register all partials
function registerPartials() {
    const partialsDir = DIRS.partials;
    if (!fs.existsSync(partialsDir)) return;

    function registerPartialsRecursive(dir, prefix = '') {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                registerPartialsRecursive(filePath, `${prefix}${file}/`);
            } else if (file.endsWith('.hbs')) {
                const name = `${prefix}${file.replace('.hbs', '')}`;
                const content = fs.readFileSync(filePath, 'utf-8');
                Handlebars.registerPartial(name, content);
                console.log(`  ✓ Registered partial: ${name}`);
            }
        }
    }

    registerPartialsRecursive(partialsDir);
}

// Load layout template
function loadLayout(name) {
    const layoutPath = path.join(DIRS.layouts, `${name}.hbs`);
    if (!fs.existsSync(layoutPath)) {
        throw new Error(`Layout not found: ${layoutPath}`);
    }
    return Handlebars.compile(fs.readFileSync(layoutPath, 'utf-8'));
}

// Compile a single page
function compilePage(pagePath, relativePath) {
    const pageContent = fs.readFileSync(pagePath, 'utf-8');

    // Extract frontmatter (simple YAML-like format)
    const frontmatterMatch = pageContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    let data = {};
    let body = pageContent;

    if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        body = frontmatterMatch[2];

        // Parse simple key: value pairs
        for (const line of frontmatter.split('\n')) {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length) {
                data[key.trim()] = valueParts.join(':').trim();
            }
        }
    }

    // Compile the page body
    const bodyTemplate = Handlebars.compile(body);
    const compiledBody = bodyTemplate(data);

    // Use the layout specified or default to 'main'
    const layoutName = data.layout || 'main';
    const layout = loadLayout(layoutName);

    // Calculate root path for relative links
    const depth = relativePath.split('/').length - 1;
    const root = depth > 0 ? '../'.repeat(depth) : '';

    // Compile the full page
    const html = layout({
        ...data,
        body: compiledBody,
        root,
    });

    return html;
}

// Build all pages
function buildPages() {
    console.log('\n📄 Building pages...');

    function buildPagesRecursive(dir, outDir, relativePath = '') {
        ensureDir(outDir);
        const files = fs.readdirSync(dir);

        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                const newOutDir = path.join(outDir, file);
                buildPagesRecursive(filePath, newOutDir, `${relativePath}${file}/`);
            } else if (file.endsWith('.hbs')) {
                const outFile = file.replace('.hbs', '.html');
                const outPath = path.join(outDir, outFile);
                const pageRelPath = `${relativePath}${outFile}`;

                try {
                    const html = compilePage(filePath, pageRelPath);
                    fs.writeFileSync(outPath, html);
                    console.log(`  ✓ ${pageRelPath}`);
                } catch (err) {
                    console.error(`  ✗ ${pageRelPath}: ${err.message}`);
                }
            }
        }
    }

    buildPagesRecursive(DIRS.pages, DIRS.dist);
}

// Build CSS (concatenate all style files)
function buildStyles() {
    console.log('\n🎨 Building styles...');

    const stylesDir = DIRS.styles;
    if (!fs.existsSync(stylesDir)) {
        console.log('  No styles directory found');
        return;
    }

    const outDir = path.join(DIRS.dist, 'styles');
    ensureDir(outDir);

    // Order matters for CSS cascade
    const cssOrder = [
        'variables.css',
        'base.css',
        'navigation.css',
        'components.css',
        'responsive.css',
    ];

    let combined = '';

    for (const file of cssOrder) {
        const filePath = path.join(stylesDir, file);
        if (fs.existsSync(filePath)) {
            combined += `/* ========== ${file} ========== */\n`;
            combined += fs.readFileSync(filePath, 'utf-8');
            combined += '\n\n';
            console.log(`  ✓ ${file}`);
        }
    }

    // Also include any other CSS files not in the order list
    const allFiles = fs.readdirSync(stylesDir).filter(f => f.endsWith('.css'));
    for (const file of allFiles) {
        if (!cssOrder.includes(file)) {
            const filePath = path.join(stylesDir, file);
            combined += `/* ========== ${file} ========== */\n`;
            combined += fs.readFileSync(filePath, 'utf-8');
            combined += '\n\n';
            console.log(`  ✓ ${file}`);
        }
    }

    fs.writeFileSync(path.join(outDir, 'main.css'), combined);
    console.log(`  → Combined into styles/main.css (${(combined.length / 1024).toFixed(1)}KB)`);
}

// Copy static assets
function copyStatic() {
    console.log('\n📦 Copying static assets...');

    const staticDir = DIRS.static;
    if (!fs.existsSync(staticDir)) {
        console.log('  No static directory found');
        return;
    }

    function copyRecursive(src, dest) {
        ensureDir(dest);
        const files = fs.readdirSync(src);

        for (const file of files) {
            const srcPath = path.join(src, file);
            const destPath = path.join(dest, file);
            const stat = fs.statSync(srcPath);

            if (stat.isDirectory()) {
                copyRecursive(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }

    copyRecursive(staticDir, DIRS.dist);
    console.log('  ✓ Copied static assets');

    // Copy generated data files
    const dataDir = path.join(DIRS.src, 'data');
    if (fs.existsSync(dataDir)) {
        const dataDestDir = path.join(DIRS.dist, 'data');
        ensureDir(dataDestDir);
        copyRecursive(dataDir, dataDestDir);
        console.log('  ✓ Copied generated data files');
    }
}

// Bundle visualizer from shared package
async function bundleVisualizer() {
    console.log('\n📦 Bundling visualizer...');

    const sharedVisualizerPath = path.join(ROOT, '..', 'shared', 'src', 'orbitals', 'visualizer', 'browser.ts');
    const outPath = path.join(DIRS.dist, 'js', 'orbital-visualizer.js');

    ensureDir(path.join(DIRS.dist, 'js'));

    try {
        await esbuild.build({
            entryPoints: [sharedVisualizerPath],
            bundle: true,
            outfile: outPath,
            format: 'iife',
            globalName: 'OrbitalVisualizerModule',
            target: ['es2020'],
            minify: false, // Keep readable for debugging
            sourcemap: true,
        });
        console.log('  ✓ orbital-visualizer.js bundled from shared package');
    } catch (err) {
        console.error('  ✗ Failed to bundle visualizer:', err.message);
        // Fallback: copy static version if exists
        const fallbackPath = path.join(DIRS.static, 'js', 'orbital-visualizer.js');
        if (fs.existsSync(fallbackPath)) {
            fs.copyFileSync(fallbackPath, outPath);
            console.log('  ⚠ Using fallback static visualizer');
        }
    }
}

// Main build function
async function build() {
    console.log('🔨 Building website...\n');

    // Clean dist
    if (fs.existsSync(DIRS.dist)) {
        fs.rmSync(DIRS.dist, { recursive: true });
    }
    ensureDir(DIRS.dist);

    console.log('📝 Registering partials...');
    registerPartials();

    buildStyles();
    buildPages();
    copyStatic();
    await bundleVisualizer();

    console.log('\n✅ Build complete!');
    console.log(`   Output: ${DIRS.dist}`);
}

// Watch mode
async function watch() {
    const chokidar = await import('chokidar');

    console.log('👀 Watching for changes...\n');

    const watcher = chokidar.watch([DIRS.src, DIRS.static], {
        ignored: /(^|[\/\\])\../,
        persistent: true,
    });

    let buildTimeout = null;

    const debouncedBuild = () => {
        if (buildTimeout) clearTimeout(buildTimeout);
        buildTimeout = setTimeout(async () => {
            console.clear();
            await build();
            console.log('\n👀 Watching for changes...');
        }, 100);
    };

    watcher.on('change', debouncedBuild);
    watcher.on('add', debouncedBuild);
    watcher.on('unlink', debouncedBuild);

    // Initial build
    await build();
    console.log('\n👀 Watching for changes...');
}

// CLI
const args = process.argv.slice(2);
if (args.includes('--watch')) {
    watch();
} else {
    build();
}
