/**
 * Generate Operator Reference Documentation
 *
 * Reads src/data/stdlib-modules.json and produces one markdown page per
 * module under docs/reference/operators/, plus an index page.
 *
 * Usage: node scripts/generate-operator-docs.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

const modulesData = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'src', 'data', 'stdlib-modules.json'), 'utf8')
);

const OUT_DIR = path.join(ROOT, 'docs', 'reference', 'operators');
fs.mkdirSync(OUT_DIR, { recursive: true });

// ─── Prob module (TypeScript-only, not in stdlib-modules.json) ─────────────

const PROB_MODULE = {
  id: 'prob',
  name: 'Prob',
  displayName: 'Probabilistic Programming',
  description:
    'Distribution sampling (Gaussian, Beta, Poisson), Bayesian inference via rejection sampling, and statistical summaries.',
  icon: '🎲',
  operators: [
    {
      name: 'prob/seed',
      displayName: 'Seed PRNG',
      description: 'Sets a seeded Mulberry32 PRNG on the evaluation context. All subsequent prob/* operators use this seed for reproducible results.',
      params: [{ name: 'n', type: 'number', description: 'Seed value' }],
      returnType: 'void',
      arityHuman: '1 argument',
      example: '["prob/seed", 42]',
      hasSideEffects: true,
    },
    {
      name: 'prob/flip',
      displayName: 'Bernoulli Flip',
      description: 'Returns true with probability p and false with probability (1 - p). Uses Box-Muller PRNG if seeded.',
      params: [{ name: 'p', type: 'number', description: 'Probability (0.0 to 1.0)' }],
      returnType: 'boolean',
      arityHuman: '1 argument',
      example: '["prob/flip", 0.7] // => true ~70% of the time',
      hasSideEffects: false,
    },
    {
      name: 'prob/gaussian',
      displayName: 'Gaussian Sample',
      description: 'Samples from a normal (Gaussian) distribution using the Box-Muller transform.',
      params: [
        { name: 'mu', type: 'number', description: 'Mean' },
        { name: 'sigma', type: 'number', description: 'Standard deviation' },
      ],
      returnType: 'number',
      arityHuman: '2 arguments',
      example: '["prob/gaussian", 0, 1] // => standard normal sample',
      hasSideEffects: false,
    },
    {
      name: 'prob/uniform',
      displayName: 'Uniform Sample',
      description: 'Samples uniformly from the half-open interval [lo, hi).',
      params: [
        { name: 'lo', type: 'number', description: 'Lower bound (inclusive)' },
        { name: 'hi', type: 'number', description: 'Upper bound (exclusive)' },
      ],
      returnType: 'number',
      arityHuman: '2 arguments',
      example: '["prob/uniform", 0, 1] // => value in [0, 1)',
      hasSideEffects: false,
    },
    {
      name: 'prob/beta',
      displayName: 'Beta Sample',
      description: 'Samples from a Beta distribution using the Marsaglia-Tsang gamma variate method.',
      params: [
        { name: 'alpha', type: 'number', description: 'Shape parameter α > 0' },
        { name: 'beta', type: 'number', description: 'Shape parameter β > 0' },
      ],
      returnType: 'number',
      arityHuman: '2 arguments',
      example: '["prob/beta", 2, 5] // => value in (0, 1), mean ≈ 0.286',
      hasSideEffects: false,
    },
    {
      name: 'prob/categorical',
      displayName: 'Categorical Sample',
      description: 'Selects an item from a weighted categorical distribution.',
      params: [
        { name: 'items', type: 'array', description: 'Array of items to sample from' },
        { name: 'weights', type: 'number[]', description: 'Non-negative weights (need not sum to 1)' },
      ],
      returnType: 'any',
      arityHuman: '2 arguments',
      example: '["prob/categorical", ["a", "b", "c"], [1, 2, 1]] // => "b" ~50%',
      hasSideEffects: false,
    },
    {
      name: 'prob/poisson',
      displayName: 'Poisson Sample',
      description: "Samples from a Poisson distribution using Knuth's algorithm.",
      params: [{ name: 'lambda', type: 'number', description: 'Rate parameter λ > 0' }],
      returnType: 'integer',
      arityHuman: '1 argument',
      example: '["prob/poisson", 4] // => integer, mean ≈ 4',
      hasSideEffects: false,
    },
    {
      name: 'prob/condition',
      displayName: 'Condition',
      description: 'Used inside inference models. If the predicate is false, marks the current sample as rejected.',
      params: [{ name: 'predicate', type: 'boolean', description: 'Condition that must hold for the sample to be accepted' }],
      returnType: 'void',
      arityHuman: '1 argument',
      example: '["prob/condition", [">", "@entity.x", 5]]',
      hasSideEffects: true,
    },
    {
      name: 'prob/sample',
      displayName: 'Sample',
      description: 'Evaluates an expression n times and returns the results as an array. The expression argument is lazy.',
      params: [
        { name: 'n', type: 'number', description: 'Number of samples' },
        { name: 'expr', type: 'expression', description: 'Expression to evaluate (lazy)' },
      ],
      returnType: 'array',
      arityHuman: '2 arguments',
      example: '["prob/sample", 1000, ["prob/flip", 0.5]]',
      hasSideEffects: false,
    },
    {
      name: 'prob/posterior',
      displayName: 'Posterior',
      description: 'Runs rejection sampling: evaluates model, applies evidence condition, collects query values. Returns accepted query values as an array.',
      params: [
        { name: 'model', type: 'expression', description: 'Model expression that sets entity fields (lazy)' },
        { name: 'evidence', type: 'expression', description: 'Boolean evidence condition (lazy)' },
        { name: 'query', type: 'expression', description: 'Value to collect from accepted samples (lazy)' },
        { name: 'n', type: 'number', description: 'Number of simulation runs' },
      ],
      returnType: 'array',
      arityHuman: '4 arguments',
      example: '["prob/posterior", model, evidence, "@entity.x", 5000]',
      hasSideEffects: false,
    },
    {
      name: 'prob/infer',
      displayName: 'Infer',
      description: 'Like prob/posterior but returns a summary object instead of raw samples.',
      params: [
        { name: 'model', type: 'expression', description: 'Model expression (lazy)' },
        { name: 'evidence', type: 'expression', description: 'Boolean evidence condition (lazy)' },
        { name: 'query', type: 'expression', description: 'Value to summarize (lazy)' },
        { name: 'n', type: 'number', description: 'Number of simulation runs' },
      ],
      returnType: '{ mean, variance, samples, acceptRate }',
      arityHuman: '4 arguments',
      example: '["prob/infer", model, evidence, "@entity.x", 5000]',
      hasSideEffects: false,
    },
    {
      name: 'prob/expected-value',
      displayName: 'Expected Value',
      description: 'Computes the arithmetic mean of a numeric array.',
      params: [{ name: 'samples', type: 'number[]', description: 'Array of numeric samples' }],
      returnType: 'number',
      arityHuman: '1 argument',
      example: '["prob/expected-value", [1, 2, 3, 4]] // => 2.5',
      hasSideEffects: false,
    },
    {
      name: 'prob/variance',
      displayName: 'Variance',
      description: 'Computes the population variance of a numeric array.',
      params: [{ name: 'samples', type: 'number[]', description: 'Array of numeric samples' }],
      returnType: 'number',
      arityHuman: '1 argument',
      example: '["prob/variance", [2, 4, 4, 4, 5, 5, 7, 9]] // => 4',
      hasSideEffects: false,
    },
    {
      name: 'prob/histogram',
      displayName: 'Histogram',
      description: 'Bins samples into a histogram.',
      params: [
        { name: 'samples', type: 'number[]', description: 'Numeric samples' },
        { name: 'bins', type: 'number', description: 'Number of bins' },
      ],
      returnType: '{ binEdges: number[], counts: number[] }',
      arityHuman: '2 arguments',
      example: '["prob/histogram", samples, 10]',
      hasSideEffects: false,
    },
    {
      name: 'prob/percentile',
      displayName: 'Percentile',
      description: 'Returns the value at the given percentile (0-100) of a sorted sample array.',
      params: [
        { name: 'samples', type: 'number[]', description: 'Numeric samples' },
        { name: 'p', type: 'number', description: 'Percentile (0 to 100)' },
      ],
      returnType: 'number',
      arityHuman: '2 arguments',
      example: '["prob/percentile", samples, 50] // => median',
      hasSideEffects: false,
    },
    {
      name: 'prob/credible-interval',
      displayName: 'Credible Interval',
      description: 'Returns a (1 - alpha) credible interval [lo, hi] from sorted samples.',
      params: [
        { name: 'samples', type: 'number[]', description: 'Numeric samples' },
        { name: 'alpha', type: 'number', description: 'Significance level (e.g. 0.05 for 95% CI)' },
      ],
      returnType: '[number, number]',
      arityHuman: '2 arguments',
      example: '["prob/credible-interval", samples, 0.05] // => 95% CI',
      hasSideEffects: false,
    },
  ],
};

// ─── Helpers ───────────────────────────────────────────────────────────────

function escapeMarkdown(str) {
  // Escape pipe (table separator), angle brackets, and curly braces (MDX JSX parsing)
  return String(str)
    .replace(/\|/g, '\\|')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;');
}

function generateModulePage(mod) {
  const ops = mod.operators;
  const lines = [];

  lines.push(`---`);
  lines.push(`id: ${mod.id}`);
  lines.push(`title: "${mod.displayName || mod.name} (${mod.id}/*)"`)
  lines.push(`sidebar_label: "${mod.name}"`);
  lines.push(`---`);
  lines.push(``);
  lines.push(`# ${mod.icon ?? ''} ${mod.displayName || mod.name}`);
  lines.push(``);
  lines.push(`> **Module:** \`${mod.id}/*\` | **Operators:** ${ops.length}`);
  lines.push(``);
  lines.push(escapeMarkdown(mod.description));
  lines.push(``);
  lines.push(`---`);
  lines.push(``);
  lines.push(`## Operator Reference`);
  lines.push(``);

  for (const op of ops) {
    lines.push(`### \`${op.name}\``);
    lines.push(``);
    lines.push(`**${op.displayName}** · ${op.arityHuman} · returns \`${op.returnType}\``);
    if (op.hasSideEffects) {
      lines.push(` · ⚠️ has side effects`);
    }
    lines.push(``);
    lines.push(escapeMarkdown(op.description));
    lines.push(``);

    if (op.params && op.params.length > 0) {
      lines.push(`| Parameter | Type | Description |`);
      lines.push(`|-----------|------|-------------|`);
      for (const p of op.params) {
        lines.push(`| \`${escapeMarkdown(p.name)}\` | \`${escapeMarkdown(p.type)}\` | ${escapeMarkdown(p.description)} |`);
      }
      lines.push(``);
    }

    if (op.example) {
      lines.push(`\`\`\`json`);
      lines.push(op.example);
      lines.push(`\`\`\``);
    }
    lines.push(``);
  }

  return lines.join('\n');
}

function generateIndexPage(modules) {
  const lines = [];
  lines.push(`---`);
  lines.push(`id: index`);
  lines.push(`title: Operator Reference`);
  lines.push(`sidebar_label: Overview`);
  lines.push(`---`);
  lines.push(``);
  lines.push(`# Operator Reference`);
  lines.push(``);
  lines.push(`Almadar's standard library provides 213+ built-in operators organized into 9 modules.`);
  lines.push(`All operators are available as s-expressions in guards and effects.`);
  lines.push(``);
  lines.push(`## Modules`);
  lines.push(``);
  lines.push(`| Module | Prefix | Operators | Description |`);
  lines.push(`|--------|--------|-----------|-------------|`);

  for (const mod of modules) {
    const count = mod.operators.length;
    lines.push(`| [${mod.name}](${mod.id}) | \`${mod.id}/*\` | ${count} | ${escapeMarkdown(mod.description.split('.')[0])} |`);
  }
  // prob module
  lines.push(`| [Prob](prob) | \`prob/*\` | 16 | Distribution sampling, Bayesian inference, statistical summaries |`);

  lines.push(``);
  lines.push(`## Quick Reference: Core Operators`);
  lines.push(``);
  lines.push(`These operators work without a module prefix:`);
  lines.push(``);
  lines.push(`| Operator | Example | Returns |`);
  lines.push(`|----------|---------|---------|`);
  lines.push(`| Arithmetic | \`["+", 1, 2]\` | number |`);
  lines.push(`| Comparison | \`[">", "@entity.x", 5]\` | boolean |`);
  lines.push(`| Logic | \`["and", true, false]\` | boolean |`);
  lines.push(`| \`if\` | \`["if", cond, then, else]\` | any |`);
  lines.push(`| \`do\` | \`["do", expr1, expr2]\` | last value |`);
  lines.push(`| \`set\` | \`["set", "@entity.x", 42]\` | void |`);
  lines.push(`| \`get\` | \`["get", "@entity.x"]\` | any |`);
  lines.push(`| \`emit\` | \`["emit", "EVENT"]\` | void |`);
  lines.push(``);
  lines.push(`See [Core Concepts: Standard Library](/docs/en/core-concepts/standard-library) for the complete core operator list.`);
  lines.push(``);

  return lines.join('\n');
}

// ─── Generate ──────────────────────────────────────────────────────────────

const allModules = modulesData.modules;

// Index page
const indexContent = generateIndexPage(allModules);
fs.writeFileSync(path.join(OUT_DIR, 'index.md'), indexContent, 'utf8');
console.log('  ✓ docs/reference/operators/index.md');

// One page per stdlib module
for (const mod of allModules) {
  const content = generateModulePage(mod);
  fs.writeFileSync(path.join(OUT_DIR, `${mod.id}.md`), content, 'utf8');
  console.log(`  ✓ docs/reference/operators/${mod.id}.md`);
}

// Prob module page
const probContent = generateModulePage(PROB_MODULE);
fs.writeFileSync(path.join(OUT_DIR, 'prob.md'), probContent, 'utf8');
console.log('  ✓ docs/reference/operators/prob.md');

console.log(`\nGenerated ${allModules.length + 2} operator reference pages.`);
