/**
 * Orbital State Machine Visualizer
 *
 * Renders SVG diagrams from Orbital schemas and Trait definitions.
 * Can be used in documentation, IDE previews, and other tools.
 */

// Simple formatters for visualization - just basic string representation
function formatSExprGuardToDomain(guard: unknown, _entityName: string): string {
    if (Array.isArray(guard)) {
        const [op, ...args] = guard;
        return `${op}(${args.map(a => JSON.stringify(a)).join(', ')})`;
    }
    return JSON.stringify(guard);
}

function formatSExprEffectToDomain(effect: unknown, _entityName: string): string {
    if (Array.isArray(effect)) {
        const [op, ...args] = effect;
        return `${op}(${args.map(a => JSON.stringify(a)).join(', ')})`;
    }
    return JSON.stringify(effect);
}

function isArraySExpr(expr: unknown): boolean {
    return Array.isArray(expr);
}

// =============================================================================
// Types
// =============================================================================

export interface VisualizerConfig {
    nodeRadius: number;
    nodeSpacing: number;
    initialIndicatorOffset: number;
    arrowSize: number;
    colors: {
        background: string;
        node: string;
        nodeBorder: string;
        nodeText: string;
        initialNode: string;
        finalNode: string;
        arrow: string;
        arrowText: string;
        effectText: string;
        guardText: string;
        initial: string;
    };
    fonts: {
        node: string;
        event: string;
        effect: string;
    };
}

export interface StateDefinition {
    name: string;
    isInitial?: boolean;
    isFinal?: boolean;
    description?: string;
}

export interface TransitionDefinition {
    from: string;
    to: string;
    event: string;
    guard?: unknown;
    effects?: unknown[];
}

export interface StateMachineDefinition {
    states: StateDefinition[];
    transitions: TransitionDefinition[];
}

export interface EntityDefinition {
    name: string;
    fields?: (string | { name: string })[];
}

export interface RenderOptions {
    title?: string;
    entity?: EntityDefinition;
}

interface LayoutOptions {
    hasEntity: boolean;
    hasOutputs: boolean;
}

interface Position {
    x: number;
    y: number;
    state: StateDefinition;
}

interface LayoutResult {
    positions: Record<string, Position>;
    width: number;
    height: number;
}

// =============================================================================
// DOM Layout Types (for hybrid DOM/SVG rendering)
// =============================================================================

/** Position data for a state node in DOM layout */
export interface DomStateNode {
    id: string;
    name: string;
    x: number;
    y: number;
    radius: number;
    isInitial: boolean;
    isFinal: boolean;
    description?: string;
}

/** Position data for a transition arrow */
export interface DomTransitionPath {
    id: string;
    from: string;
    to: string;
    /** SVG path data for the curved arrow */
    pathData: string;
    /** Midpoint for label positioning */
    labelX: number;
    labelY: number;
}

/** Position data for a transition label with guard/effect details */
export interface DomTransitionLabel {
    id: string;
    from: string;
    to: string;
    event: string;
    x: number;
    y: number;
    /** Human-readable guard text (e.g., "if amount > 100") */
    guardText?: string;
    /** Human-readable effect texts */
    effectTexts: string[];
    /** Whether this transition has details to show in tooltip */
    hasDetails: boolean;
}

/** Entity input box data */
export interface DomEntityBox {
    name: string;
    fields: string[];
    x: number;
    y: number;
    width: number;
    height: number;
}

/** Output effects box data */
export interface DomOutputsBox {
    outputs: string[];
    x: number;
    y: number;
    width: number;
    height: number;
}

/** Complete DOM layout data for rendering */
export interface DomLayoutData {
    width: number;
    height: number;
    title?: string;
    states: DomStateNode[];
    paths: DomTransitionPath[];
    labels: DomTransitionLabel[];
    entity?: DomEntityBox;
    outputs?: DomOutputsBox;
    config: VisualizerConfig;
}

// =============================================================================
// Default Configuration
// =============================================================================

export const DEFAULT_CONFIG: VisualizerConfig = {
    nodeRadius: 70,
    nodeSpacing: 650, // Increased to give more room for transitions
    initialIndicatorOffset: 45,
    arrowSize: 12,
    colors: {
        background: '#0d1117',
        node: '#161b22',
        nodeBorder: '#30363d',
        nodeText: '#e6edf3',
        initialNode: '#238636',
        finalNode: '#f85149',
        arrow: '#8b949e',
        arrowText: '#8b949e',
        effectText: '#ffb86c',
        guardText: '#ff79c6',
        initial: '#238636',
    },
    fonts: {
        node: '18px "Inter", sans-serif',
        event: '16px "JetBrains Mono", monospace',
        effect: '14px "JetBrains Mono", monospace',
    },
};

// =============================================================================
// S-Expression Parsing
// =============================================================================

const EFFECT_OPERATORS = ['set', 'emit', 'persist', 'navigate', 'notify', 'spawn', 'despawn', 'render-ui', 'call-service'];

function isBinding(val: unknown): val is string {
    return typeof val === 'string' && val.startsWith('@');
}

interface ParsedBinding {
    root: string;
    path: string[];
    raw: string;
}

function parseBinding(binding: string): ParsedBinding | null {
    if (!isBinding(binding)) return null;
    const withoutAt = binding.substring(1);
    const parts = withoutAt.split('.');
    return {
        root: parts[0],
        path: parts.slice(1),
        raw: binding,
    };
}

function formatGuard(guard: unknown): string {
    let text = '';
    if (typeof guard === 'string') {
        text = guard;
    } else if (Array.isArray(guard)) {
        text = formatSExprCompact(guard);
    }
    return text ? `[${text}]` : '';
}

/**
 * Format guard as human-readable domain language text
 */
function formatGuardHuman(guard: unknown, entityName?: string): string {
    if (!guard) return '';
    if (typeof guard === 'string') {
        return `if ${guard}`;
    }
    if (isArraySExpr(guard)) {
        return formatSExprGuardToDomain(guard, entityName ?? '');
    }
    return '';
}

/**
 * Format effects array as human-readable domain language text
 */
function formatEffectsHuman(effects: unknown[], entityName?: string): string[] {
    if (!Array.isArray(effects) || effects.length === 0) return [];
    return effects.map(effect => {
        if (isArraySExpr(effect)) {
            return formatSExprEffectToDomain(effect, entityName ?? '');
        }
        return String(effect);
    }).filter(Boolean);
}

function formatSExprCompact(expr: unknown[]): string {
    if (!Array.isArray(expr) || expr.length === 0) return '[]';
    const op = expr[0];
    const args = expr.slice(1);
    const formattedArgs = args.map((a) => {
        if (isBinding(a)) {
            const parsed = parseBinding(a);
            if (parsed && parsed.path.length > 0) {
                return `${parsed.root}.${parsed.path.join('.')}`;
            }
            return parsed?.root || a;
        }
        if (typeof a === 'string') return a;
        if (typeof a === 'number' || typeof a === 'boolean') return String(a);
        if (Array.isArray(a)) return formatSExprCompact(a);
        return '{...}';
    });
    return `${op} ${formattedArgs.join(' ')}`;
}

/**
 * Format S-expression with full detail for tooltips
 */
function formatSExprFull(expr: unknown): string {
    if (expr === null || expr === undefined) return '';
    if (typeof expr === 'string') return `"${expr}"`;
    if (typeof expr === 'number' || typeof expr === 'boolean') return String(expr);
    if (!Array.isArray(expr)) return JSON.stringify(expr);
    if (expr.length === 0) return '[]';

    const parts = expr.map(item => {
        if (typeof item === 'string') {
            // Don't quote operators or bindings
            if (isBinding(item) || EFFECT_OPERATORS.includes(item) || ['and', 'or', 'not', '=', '!=', '<', '>', '<=', '>=', '+', '-', '*', '/', '%'].includes(item)) {
                return item;
            }
            return `"${item}"`;
        }
        if (Array.isArray(item)) return formatSExprFull(item);
        if (typeof item === 'object' && item !== null) return JSON.stringify(item);
        return String(item);
    });

    return `[${parts.join(' ')}]`;
}

/**
 * Format effects array with full S-expressions
 */
function formatEffectsFull(effects: unknown[]): string[] {
    if (!Array.isArray(effects) || effects.length === 0) return [];
    return effects.map(effect => {
        if (Array.isArray(effect)) {
            return formatSExprFull(effect);
        }
        return String(effect);
    });
}

export function getEffectSummary(effects: unknown[]): string {
    if (!Array.isArray(effects) || effects.length === 0) return '';

    const setFields: string[] = [];
    const otherEffects: unknown[][] = [];

    effects.forEach((effect) => {
        if (!Array.isArray(effect)) return;
        const op = effect[0] as string;

        if (op === 'set' && effect[1] && typeof effect[1] === 'string') {
            const parsed = parseBinding(effect[1]);
            if (parsed && parsed.path.length > 0) {
                setFields.push(parsed.path[parsed.path.length - 1]);
            } else {
                setFields.push('field');
            }
        } else {
            otherEffects.push(effect as unknown[]);
        }
    });

    const summaries: string[] = [];

    if (setFields.length > 0) {
        summaries.push(`→ ${setFields.join(', ')}`);
    }

    otherEffects.forEach((effect) => {
        const op = effect[0] as string;
        switch (op) {
            case 'emit':
                summaries.push(`↑ ${effect[1] || 'event'}`);
                break;
            case 'notify':
                summaries.push(`📧 ${effect[1] || ''}`);
                break;
            case 'persist':
                summaries.push(`💾 ${effect[1] || 'save'}`);
                break;
            case 'navigate':
                summaries.push(`🔗 nav`);
                break;
            case 'spawn':
                summaries.push(`+ ${effect[1] || 'spawn'}`);
                break;
            case 'despawn':
                summaries.push(`- despawn`);
                break;
            default:
                summaries.push(op);
        }
    });

    return summaries.join(' | ');
}

function extractOutputsFromTransitions(transitions: TransitionDefinition[]): string[] {
    const outputs = new Set<string>();

    transitions.forEach((t) => {
        if (t.effects) {
            t.effects.forEach((effect) => {
                if (Array.isArray(effect)) {
                    const op = effect[0] as string;
                    // Only extract "output" effects (things that affect the outside world)
                    if (['emit', 'notify', 'persist', 'navigate', 'call-service'].includes(op)) {
                        // Use domain language formatter for human-readable text
                        if (isArraySExpr(effect)) {
                            const humanText = formatSExprEffectToDomain(effect, '');
                            outputs.add(humanText);
                        }
                    }
                }
            });
        }
    });

    return Array.from(outputs);
}

// =============================================================================
// Layout Engine
// =============================================================================

function getNodeRadius(stateName: string, config: VisualizerConfig): number {
    const baseRadius = config.nodeRadius;
    const textLength = stateName.length;
    if (textLength > 12) return baseRadius + 25;
    if (textLength > 8) return baseRadius + 15;
    if (textLength > 6) return baseRadius + 8;
    return baseRadius;
}

function calculateLayout(
    states: StateDefinition[],
    transitions: TransitionDefinition[],
    options: LayoutOptions,
    config: VisualizerConfig
): LayoutResult {
    const positions: Record<string, Position> = {};

    const entityBoxWidth = options.hasEntity ? 200 : 0;
    const outputBoxWidth = options.hasOutputs ? 200 : 0;
    const leftOffset = 100 + entityBoxWidth;

    const initialState = states.find((s) => s.isInitial) || states[0];
    const finalStates = states.filter((s) => s.isFinal);
    const middleStates = states.filter((s) => !s.isInitial && !s.isFinal);

    // Calculate max label length for spacing
    let maxLabelLength = 0;
    transitions.forEach((t) => {
        if (t.effects && t.effects.length > 0) {
            const summary = getEffectSummary(t.effects);
            maxLabelLength = Math.max(maxLabelLength, summary.length);
        }
        if (t.guard) {
            const guardStr = formatGuard(t.guard);
            maxLabelLength = Math.max(maxLabelLength, guardStr.length);
        }
        if (t.event) {
            maxLabelLength = Math.max(maxLabelLength, t.event.length);
        }
    });

    const labelWidth = Math.min(maxLabelLength * 10, 350); // Cap label width
    const dynamicSpacing = Math.min(Math.max(config.nodeSpacing, labelWidth + 100), 400); // Cap spacing

    // Use BFS to assign columns - handles cycles by only assigning each state once
    const stateColumn: Record<string, number> = {};

    if (initialState) {
        const queue: Array<{ name: string; col: number }> = [{ name: initialState.name, col: 0 }];
        const visited = new Set<string>();

        while (queue.length > 0) {
            const { name, col } = queue.shift()!;

            // Skip if already visited
            if (visited.has(name)) continue;
            visited.add(name);

            // Assign column (use the first assignment, which is shortest path)
            if (stateColumn[name] === undefined) {
                stateColumn[name] = col;
            }

            // Queue all forward transitions (skip self-loops and back-edges)
            transitions.forEach(t => {
                if (t.from === name && t.from !== t.to && !visited.has(t.to)) {
                    queue.push({ name: t.to, col: col + 1 });
                }
            });
        }
    }

    // Handle any unreachable states
    states.forEach(s => {
        if (stateColumn[s.name] === undefined) {
            stateColumn[s.name] = 0;
        }
    });

    // Group states by column
    const columns: Record<number, string[]> = {};
    Object.entries(stateColumn).forEach(([name, col]) => {
        if (!columns[col]) columns[col] = [];
        columns[col].push(name);
    });

    // Sort states within each column: initial first, final last, others alphabetically
    Object.values(columns).forEach(stateNames => {
        stateNames.sort((a, b) => {
            const stateA = states.find(s => s.name === a);
            const stateB = states.find(s => s.name === b);
            if (stateA?.isInitial) return -1;
            if (stateB?.isInitial) return 1;
            if (stateA?.isFinal && !stateB?.isFinal) return 1;
            if (stateB?.isFinal && !stateA?.isFinal) return -1;
            return a.localeCompare(b);
        });
    });

    // Calculate dimensions based on layout
    const numColumns = Math.max(...Object.keys(columns).map(Number)) + 1;
    const maxRowsInColumn = Math.max(...Object.values(columns).map(arr => arr.length));

    // Increased vertical spacing to prevent transition labels from overlapping
    const minVerticalSpacing = 420; // More space between states for transitions
    // Extra padding for tooltips (they appear above elements and need room)
    const tooltipPadding = 150;
    const width = Math.max(1400, numColumns * dynamicSpacing + entityBoxWidth + outputBoxWidth + 400);
    const height = Math.max(1000, maxRowsInColumn * minVerticalSpacing + 350 + tooltipPadding);

    // Position states
    Object.entries(columns).forEach(([colStr, stateNames]) => {
        const col = parseInt(colStr);
        const x = leftOffset + col * dynamicSpacing;
        const numInColumn = stateNames.length;
        // Ensure minimum spacing between states
        const verticalSpacing = Math.max(minVerticalSpacing, height / (numInColumn + 1));

        stateNames.forEach((stateName, rowIndex) => {
            const state = states.find(s => s.name === stateName);
            if (state) {
                const y = verticalSpacing * (rowIndex + 1);
                positions[stateName] = { x, y, state };
            }
        });
    });

    return { positions, width, height: height + 60 };
}

// =============================================================================
// SVG Generation (String-based for Node.js compatibility)
// =============================================================================

function escapeXml(unsafe: string): string {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function createArrowMarkerSvg(id: string, color: string, config: VisualizerConfig): string {
    return `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="${config.arrowSize}" markerHeight="${config.arrowSize}" orient="auto-start-reverse">
    <path d="M 0 0 L 10 5 L 0 10 z" fill="${color}"/>
  </marker>`;
}

function drawStateSvg(
    name: string,
    x: number,
    y: number,
    state: StateDefinition,
    config: VisualizerConfig
): string {
    const radius = getNodeRadius(name, config);
    let borderColor = config.colors.nodeBorder;
    let borderWidth = 2;

    if (state.isInitial) {
        borderColor = config.colors.initialNode;
        borderWidth = 3;
    } else if (state.isFinal) {
        borderColor = config.colors.finalNode;
        borderWidth = 3;
    }

    let svg = `<g class="state-node">
    <circle cx="${x}" cy="${y}" r="${radius}" fill="${config.colors.node}" stroke="${borderColor}" stroke-width="${borderWidth}"/>`;

    if (state.isFinal) {
        svg += `<circle cx="${x}" cy="${y}" r="${radius - 6}" fill="none" stroke="${borderColor}" stroke-width="2"/>`;
    }

    if (state.isInitial) {
        svg += `<path d="M ${x - radius - config.initialIndicatorOffset} ${y} L ${x - radius - 5} ${y}" stroke="${config.colors.initial}" stroke-width="2" fill="none" marker-end="url(#arrow-initial)"/>`;
    }

    svg += `<text x="${x}" y="${y + 7}" text-anchor="middle" fill="${config.colors.nodeText}" font-family="Inter, sans-serif" font-size="18px" font-weight="600">${escapeXml(name)}</text>`;
    svg += `</g>`;

    return svg;
}

function drawTransitionPathSvg(
    from: string,
    to: string,
    transitions: TransitionDefinition[],
    positions: Record<string, Position>,
    config: VisualizerConfig
): string {
    const fromPos = positions[from];
    const toPos = positions[to];
    if (!fromPos || !toPos) return '';

    const relevantTransitions = transitions.filter((t) => t.from === from && t.to === to);
    if (relevantTransitions.length === 0) return '';

    const fromRadius = getNodeRadius(from, config);
    const toRadius = getNodeRadius(to, config);

    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return '';

    const nx = dx / dist;
    const ny = dy / dist;

    const startX = fromPos.x + nx * fromRadius;
    const startY = fromPos.y + ny * fromRadius;
    const endX = toPos.x - nx * (toRadius + 5);
    const endY = toPos.y - ny * (toRadius + 5);

    const hasReverse = transitions.some((t) => t.from === to && t.to === from);
    // Determine if this is the "forward" or "reverse" direction for bidirectional pairs
    const isReverse = hasReverse && from > to; // Alphabetically later = reverse
    const baseOffset = hasReverse ? 50 : 30;
    const curveOffset = baseOffset + (relevantTransitions.length > 1 ? 20 : 0);
    // Forward curves UP (negative Y), reverse curves DOWN (positive Y)
    const curveDirection = isReverse ? 1 : -1;

    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2 + curveOffset * curveDirection;

    return `<path class="transition-path" data-from="${from}" data-to="${to}" d="M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}" stroke="${config.colors.arrow}" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/>`;
}

function drawTransitionLabelsSvg(
    from: string,
    to: string,
    transitions: TransitionDefinition[],
    positions: Record<string, Position>,
    config: VisualizerConfig
): string {
    const fromPos = positions[from];
    const toPos = positions[to];
    if (!fromPos || !toPos) return '';

    const relevantTransitions = transitions.filter((t) => t.from === from && t.to === to);
    if (relevantTransitions.length === 0) return '';

    const fromRadius = getNodeRadius(from, config);
    const toRadius = getNodeRadius(to, config);

    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return '';

    const nx = dx / dist;
    const ny = dy / dist;

    const startX = fromPos.x + nx * fromRadius;
    const startY = fromPos.y + ny * fromRadius;
    const endX = toPos.x - nx * (toRadius + 5);
    const endY = toPos.y - ny * (toRadius + 5);

    const hasReverse = transitions.some((t) => t.from === to && t.to === from);
    // Match the same direction logic as path drawing
    const isReverse = hasReverse && from > to;
    const baseOffset = hasReverse ? 50 : 40;
    const curveOffset = baseOffset + (relevantTransitions.length > 1 ? 25 : 0);
    const curveDirection = isReverse ? 1 : -1;

    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2 + curveOffset * curveDirection;

    let svg = '';

    // Default view: Only show event names
    // Guards and effects are rendered but hidden, revealed on hover/click
    relevantTransitions.forEach((transition, index) => {
        const blockOffset = index * 60 * curveDirection; // Increased spacing for larger tooltips
        const dataAttrs = `data-from="${from}" data-to="${to}" data-event="${transition.event}"`;

        const labelY = midY + (curveDirection * 5) + blockOffset;

        // Wrap each transition in a group for hover behavior
        svg += `<g class="transition-group" ${dataAttrs}>`;

        // Event name (always visible)
        svg += `<text class="transition-label transition-event" x="${midX}" y="${labelY}" text-anchor="middle" fill="${config.colors.arrowText}" font-family="JetBrains Mono, monospace" font-size="14px" font-weight="600">${escapeXml(transition.event)}</text>`;

        // Calculate tooltip content
        const hasGuard = !!transition.guard;
        const guardText = hasGuard ? formatGuardHuman(transition.guard) : '';
        const effectLines = transition.effects ? formatEffectsHuman(transition.effects) : [];
        const hasEffects = effectLines.length > 0;

        // Only show tooltip if there's guard or effects
        if (hasGuard || hasEffects) {
            const tooltipStartY = labelY + 20 * curveDirection;
            const lineHeight = 18;
            const padding = 12;

            // Calculate box dimensions
            let maxTextWidth = 0;
            if (guardText) maxTextWidth = Math.max(maxTextWidth, guardText.length * 7);
            effectLines.forEach(line => {
                maxTextWidth = Math.max(maxTextWidth, line.length * 7);
            });
            const boxWidth = Math.max(180, Math.min(maxTextWidth + padding * 2 + 20, 400));

            const numLines = (hasGuard ? 1 : 0) + effectLines.length;
            const boxHeight = numLines * lineHeight + padding * 2;

            // Position box based on curve direction
            const boxY = curveDirection > 0 ? tooltipStartY : tooltipStartY - boxHeight;

            svg += `<g class="transition-detail">`;

            // Background box
            svg += `<rect x="${midX - boxWidth / 2}" y="${boxY}" width="${boxWidth}" height="${boxHeight}" fill="rgba(22, 27, 34, 0.95)" stroke="${config.colors.nodeBorder}" stroke-width="1" rx="6"/>`;

            let currentY = boxY + padding + 12;

            // Guard line
            if (hasGuard && guardText) {
                svg += `<text x="${midX - boxWidth / 2 + padding}" y="${currentY}" fill="${config.colors.guardText}" font-family="Inter, sans-serif" font-size="12px">`;
                svg += `<tspan font-weight="600">Guard:</tspan> ${escapeXml(guardText)}</text>`;
                currentY += lineHeight;
            }

            // Effect lines
            if (hasEffects) {
                effectLines.forEach((effectText, idx) => {
                    const prefix = idx === 0 ? 'Then: ' : '      ';
                    svg += `<text x="${midX - boxWidth / 2 + padding}" y="${currentY}" fill="${config.colors.effectText}" font-family="Inter, sans-serif" font-size="12px">`;
                    svg += `<tspan font-weight="${idx === 0 ? '600' : '400'}">${prefix}</tspan>${escapeXml(effectText)}</text>`;
                    currentY += lineHeight;
                });
            }

            svg += `</g>`;
        }

        svg += `</g>`;
    });

    return svg;
}

function drawEntityInputSvg(
    entity: EntityDefinition,
    x: number,
    y: number,
    _height: number
): string {
    const fieldCount = entity.fields ? entity.fields.length : 0;
    const boxWidth = 160;
    const boxHeight = Math.max(80, fieldCount * 22 + 50);
    const boxY = y - boxHeight / 2;

    let svg = `<g class="entity-input">
    <rect x="${x}" y="${boxY}" width="${boxWidth}" height="${boxHeight}" fill="#1a1f2e" stroke="#4a9eff" stroke-width="2" rx="8"/>
    <text x="${x + boxWidth / 2}" y="${boxY + 24}" text-anchor="middle" fill="#4a9eff" font-family="Inter, sans-serif" font-size="14px" font-weight="600">📦 ${escapeXml(entity.name || 'Entity')}</text>`;

    if (entity.fields && entity.fields.length > 0) {
        entity.fields.forEach((field, idx) => {
            const fieldName = typeof field === 'string' ? field : field.name;
            svg += `<text x="${x + 12}" y="${boxY + 48 + idx * 20}" fill="#8b949e" font-family="JetBrains Mono, monospace" font-size="11px">• ${escapeXml(fieldName)}</text>`;
        });
    }

    svg += `<path d="M ${x + boxWidth + 5} ${y} L ${x + boxWidth + 40} ${y}" stroke="#4a9eff" stroke-width="2" fill="none" marker-end="url(#arrow-input)"/>`;
    svg += `</g>`;

    return svg;
}

function drawOutputsSvg(
    outputs: string[],
    x: number,
    y: number,
    height: number
): string {
    if (!outputs || outputs.length === 0) return '';

    // Calculate box width based on longest output text (no truncation)
    const maxOutputLength = Math.max(...outputs.map(o => o.length));
    const boxWidth = Math.max(200, maxOutputLength * 7 + 30);
    const lineHeight = 22;
    const boxHeight = outputs.length * lineHeight + 50;
    const boxY = y - boxHeight / 2;

    let svg = `<g class="outputs">
    <rect x="${x}" y="${boxY}" width="${boxWidth}" height="${boxHeight}" fill="#1a1f2e" stroke="#ffb86c" stroke-width="2" rx="8"/>
    <text x="${x + boxWidth / 2}" y="${boxY + 24}" text-anchor="middle" fill="#ffb86c" font-family="Inter, sans-serif" font-size="13px" font-weight="600">📤 External Effects</text>`;

    outputs.forEach((output, idx) => {
        svg += `<text x="${x + 12}" y="${boxY + 48 + idx * lineHeight}" fill="#e6edf3" font-family="Inter, sans-serif" font-size="11px">• ${escapeXml(output)}</text>`;
    });

    svg += `</g>`;
    return svg;
}

function drawLegendSvg(y: number, config: VisualizerConfig): string {
    const items = [
        { label: 'Initial', color: config.colors.initialNode },
        { label: 'Final', color: config.colors.finalNode },
        { label: 'State', color: config.colors.nodeBorder },
    ];

    let svg = `<g class="legend">`;
    let x = 20;

    items.forEach((item) => {
        svg += `<circle cx="${x}" cy="${y}" r="6" fill="${config.colors.node}" stroke="${item.color}" stroke-width="2"/>`;
        svg += `<text x="${x + 12}" y="${y + 4}" fill="${config.colors.arrowText}" font-family="Inter, sans-serif" font-size="10px">${escapeXml(item.label)}</text>`;
        x += 70;
    });

    svg += `</g>`;
    return svg;
}

// =============================================================================
// Main Render Function
// =============================================================================

/**
 * Render a state machine to an SVG string.
 * Works in both browser and Node.js environments.
 */
export function renderStateMachineToSvg(
    stateMachine: StateMachineDefinition,
    options: RenderOptions = {},
    config: VisualizerConfig = DEFAULT_CONFIG
): string {
    const states = stateMachine.states || [];
    const transitions = stateMachine.transitions || [];
    const title = options.title || '';
    const entity = options.entity;

    const outputs = extractOutputsFromTransitions(transitions);

    const layoutOptions: LayoutOptions = {
        hasEntity: !!entity,
        hasOutputs: outputs.length > 0,
    };

    const { positions, width, height } = calculateLayout(states, transitions, layoutOptions, config);

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height + 40}" viewBox="0 0 ${width} ${height + 40}" class="orbital-state-machine" style="display: block; max-width: none;">`;

    // Add defs
    svg += `<defs>`;
    svg += createArrowMarkerSvg('arrow', config.colors.arrow, config);
    svg += createArrowMarkerSvg('arrow-initial', config.colors.initial, config);
    svg += createArrowMarkerSvg('arrow-input', '#4a9eff', config);
    svg += createArrowMarkerSvg('arrow-output', '#ffb86c', config);
    svg += `</defs>`;

    // Background
    svg += `<rect x="0" y="0" width="${width}" height="${height + 40}" fill="${config.colors.background}" rx="8"/>`;

    // Title
    if (title) {
        svg += `<text x="${width / 2}" y="20" text-anchor="middle" fill="${config.colors.nodeText}" font-family="Inter, sans-serif" font-size="14px" font-weight="600">${escapeXml(title)}</text>`;
    }

    const offsetY = title ? 30 : 0;
    svg += `<g transform="translate(0, ${offsetY})">`;

    // Entity input
    if (entity) {
        svg += drawEntityInputSvg(entity, 20, height / 2, height);
    }

    // Layer 1: Transition paths (arrows)
    const drawnPairs = new Set<string>();
    transitions.forEach((transition) => {
        const pairKey = `${transition.from}->${transition.to}`;
        if (!drawnPairs.has(pairKey)) {
            drawnPairs.add(pairKey);
            svg += drawTransitionPathSvg(transition.from, transition.to, transitions, positions, config);
        }
    });

    // Layer 2: States (nodes)
    for (const [name, pos] of Object.entries(positions)) {
        svg += drawStateSvg(name, pos.x, pos.y, pos.state, config);
    }

    // Layer 3: Transition labels (on top of everything)
    drawnPairs.clear();
    transitions.forEach((transition) => {
        const pairKey = `${transition.from}->${transition.to}`;
        if (!drawnPairs.has(pairKey)) {
            drawnPairs.add(pairKey);
            svg += drawTransitionLabelsSvg(transition.from, transition.to, transitions, positions, config);
        }
    });

    // Outputs
    if (outputs.length > 0) {
        const maxX = Math.max(...Object.values(positions).map((p) => p.x));
        svg += drawOutputsSvg(outputs, maxX + config.nodeRadius + 60, height / 2, height);
    }

    svg += `</g>`;

    // Legend
    svg += drawLegendSvg(height + 25, config);

    svg += `</svg>`;

    return svg;
}

/**
 * Extract state machine from various data formats (Trait, Orbital, or raw)
 */
export function extractStateMachine(data: unknown): StateMachineDefinition | null {
    if (!data || typeof data !== 'object') return null;

    const obj = data as Record<string, unknown>;

    // Direct state machine
    if (obj.states && obj.transitions) {
        return obj as unknown as StateMachineDefinition;
    }

    // Trait with stateMachine
    if (obj.stateMachine) {
        return obj.stateMachine as StateMachineDefinition;
    }

    // Orbital with traits
    if (Array.isArray(obj.traits)) {
        const traitWithSM = obj.traits.find(
            (t) => typeof t === 'object' && t !== null && 'stateMachine' in t
        );
        if (traitWithSM && typeof traitWithSM === 'object' && 'stateMachine' in traitWithSM) {
            return (traitWithSM as { stateMachine: StateMachineDefinition }).stateMachine;
        }
    }

    return null;
}

// =============================================================================
// DOM Layout Data Generation
// =============================================================================

/**
 * Calculate path data and label position for a transition between two states.
 * Returns null if the states don't exist or have no transitions.
 */
function calculateTransitionPathData(
    from: string,
    to: string,
    transitions: TransitionDefinition[],
    positions: Record<string, Position>,
    config: VisualizerConfig
): { pathData: string; labelX: number; labelY: number } | null {
    const fromPos = positions[from];
    const toPos = positions[to];
    if (!fromPos || !toPos) return null;

    const relevantTransitions = transitions.filter((t) => t.from === from && t.to === to);
    if (relevantTransitions.length === 0) return null;

    const fromRadius = getNodeRadius(from, config);
    const toRadius = getNodeRadius(to, config);

    // Self-loop: from === to
    if (from === to) {
        const loopRadius = 50;
        const cx = fromPos.x;
        const cy = fromPos.y - fromRadius - loopRadius;

        // Start and end points on the edge of the state
        const startAngle = -0.5; // radians offset
        const endAngle = 0.5;

        const startX = fromPos.x + Math.cos(-Math.PI / 2 + startAngle) * fromRadius;
        const startY = fromPos.y + Math.sin(-Math.PI / 2 + startAngle) * fromRadius;
        const endX = fromPos.x + Math.cos(-Math.PI / 2 + endAngle) * fromRadius;
        const endY = fromPos.y + Math.sin(-Math.PI / 2 + endAngle) * fromRadius;

        // SVG arc path for self-loop
        const pathData = `M ${startX} ${startY} A ${loopRadius} ${loopRadius} 0 1 1 ${endX} ${endY}`;

        return {
            pathData,
            labelX: cx,
            labelY: cy - loopRadius * 0.5,
        };
    }

    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return null;

    const nx = dx / dist;
    const ny = dy / dist;

    const startX = fromPos.x + nx * fromRadius;
    const startY = fromPos.y + ny * fromRadius;
    const endX = toPos.x - nx * (toRadius + 5);
    const endY = toPos.y - ny * (toRadius + 5);

    const hasReverse = transitions.some((t) => t.from === to && t.to === from);
    const isReverse = hasReverse && from > to;
    const baseOffset = hasReverse ? 50 : 30;
    const curveOffset = baseOffset + (relevantTransitions.length > 1 ? 20 : 0);
    const curveDirection = isReverse ? 1 : -1;

    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2 + curveOffset * curveDirection;

    return {
        pathData: `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`,
        labelX: midX,
        labelY: midY + (curveDirection * 5),
    };
}

/**
 * Render a state machine to DOM layout data.
 * This is used by the DOM-based visualizer component for hybrid SVG/DOM rendering.
 * Unlike renderStateMachineToSvg, this returns structured data instead of an SVG string.
 */
export function renderStateMachineToDomData(
    stateMachine: StateMachineDefinition,
    options: RenderOptions = {},
    config: VisualizerConfig = DEFAULT_CONFIG
): DomLayoutData {
    const states = stateMachine.states || [];
    const transitions = stateMachine.transitions || [];
    const title = options.title || '';
    const entity = options.entity;

    const outputs = extractOutputsFromTransitions(transitions);

    const layoutOptions: LayoutOptions = {
        hasEntity: !!entity,
        hasOutputs: outputs.length > 0,
    };

    const { positions, width, height } = calculateLayout(states, transitions, layoutOptions, config);

    // Build state nodes
    const domStates: DomStateNode[] = Object.entries(positions).map(([name, pos]) => ({
        id: `state-${name}`,
        name,
        x: pos.x,
        y: pos.y,
        radius: getNodeRadius(name, config),
        isInitial: pos.state.isInitial ?? false,
        isFinal: pos.state.isFinal ?? false,
        description: pos.state.description,
    }));

    // Build transition paths and labels
    const domPaths: DomTransitionPath[] = [];
    const domLabels: DomTransitionLabel[] = [];
    const drawnPairs = new Set<string>();

    transitions.forEach((transition, idx) => {
        const pairKey = `${transition.from}->${transition.to}`;

        // Only draw one path per from->to pair
        if (!drawnPairs.has(pairKey)) {
            drawnPairs.add(pairKey);

            const pathData = calculateTransitionPathData(
                transition.from,
                transition.to,
                transitions,
                positions,
                config
            );

            if (pathData) {
                domPaths.push({
                    id: `path-${transition.from}-${transition.to}`,
                    from: transition.from,
                    to: transition.to,
                    pathData: pathData.pathData,
                    labelX: pathData.labelX,
                    labelY: pathData.labelY,
                });
            }
        }

        // Create a label for each transition (even if multiple per pair)
        const guardText = transition.guard ? formatGuardHuman(transition.guard) : undefined;
        const effectTexts = transition.effects ? formatEffectsHuman(transition.effects) : [];
        const hasDetails = !!guardText || effectTexts.length > 0;

        // Get path data for label positioning
        const pathData = calculateTransitionPathData(
            transition.from,
            transition.to,
            transitions,
            positions,
            config
        );

        if (pathData) {
            // Stack multiple labels for same pair vertically
            const sameEventIndex = domLabels.filter(
                l => l.from === transition.from && l.to === transition.to
            ).length;
            const labelOffset = sameEventIndex * 60;

            domLabels.push({
                id: `label-${transition.from}-${transition.to}-${idx}`,
                from: transition.from,
                to: transition.to,
                event: transition.event,
                x: pathData.labelX,
                y: pathData.labelY + labelOffset,
                guardText,
                effectTexts,
                hasDetails,
            });
        }
    });

    // Build entity box if provided
    let domEntity: DomEntityBox | undefined;
    if (entity) {
        const fieldCount = entity.fields ? entity.fields.length : 0;
        const boxWidth = 160;
        const boxHeight = Math.max(80, fieldCount * 22 + 50);

        domEntity = {
            name: entity.name || 'Entity',
            fields: entity.fields?.map(f => typeof f === 'string' ? f : f.name) || [],
            x: 20,
            y: height / 2 - boxHeight / 2,
            width: boxWidth,
            height: boxHeight,
        };
    }

    // Build outputs box if there are outputs
    let domOutputs: DomOutputsBox | undefined;
    if (outputs.length > 0) {
        const maxX = Math.max(...Object.values(positions).map((p) => p.x));
        const maxOutputLength = Math.max(...outputs.map(o => o.length));
        const boxWidth = Math.max(200, maxOutputLength * 7 + 30);
        const lineHeight = 22;
        const boxHeight = outputs.length * lineHeight + 50;

        domOutputs = {
            outputs,
            x: maxX + config.nodeRadius + 300,
            y: height / 2 - boxHeight / 2,
            width: boxWidth,
            height: boxHeight,
        };
    }

    return {
        width,
        height: height + 40,
        title: title || undefined,
        states: domStates,
        paths: domPaths,
        labels: domLabels,
        entity: domEntity,
        outputs: domOutputs,
        config,
    };
}

// Export utilities
export { formatGuard, extractOutputsFromTransitions };
