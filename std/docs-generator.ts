/**
 * Standard Library Documentation Generator
 *
 * Generates documentation data from the std library source.
 * Parses modules and behaviors to produce structured JSON for docs.
 *
 * @packageDocumentation
 */

import type { StdOperatorMeta, StdModule } from './types.js';
import type { StandardBehavior, BehaviorCategory } from './behaviors/types.js';
import { STD_MODULES } from './types.js';
import { STD_OPERATORS_BY_MODULE } from './registry.js';
import { STANDARD_BEHAVIORS, BEHAVIORS_BY_CATEGORY } from './behaviors/registry.js';

// ============================================================================
// Domain Language Mappings
// ============================================================================

/**
 * Human-friendly module descriptions
 */
export const MODULE_DESCRIPTIONS: Record<StdModule, ModuleInfo> = {
    math: {
        name: 'Math',
        displayName: 'Mathematical Operations',
        description: 'Numeric operations for calculations, rounding, clamping, and randomization.',
        icon: '🔢',
    },
    str: {
        name: 'String',
        displayName: 'String Operations',
        description: 'Text manipulation including formatting, splitting, trimming, and templating.',
        icon: '📝',
    },
    array: {
        name: 'Array',
        displayName: 'Collection Operations',
        description: 'Work with lists and arrays including filtering, mapping, and aggregation.',
        icon: '📋',
    },
    object: {
        name: 'Object',
        displayName: 'Object Utilities',
        description: 'Access and manipulate object properties safely.',
        icon: '🔑',
    },
    time: {
        name: 'Time',
        displayName: 'Date & Time',
        description: 'Work with dates, times, durations, and timestamps.',
        icon: '⏰',
    },
    validate: {
        name: 'Validate',
        displayName: 'Input Validation',
        description: 'Validate user input with common patterns like email, required, length checks.',
        icon: '✅',
    },
    format: {
        name: 'Format',
        displayName: 'Data Formatting',
        description: 'Display formatting for currency, numbers, dates, and file sizes.',
        icon: '🎨',
    },
    async: {
        name: 'Async',
        displayName: 'Async Operations',
        description: 'Control timing with delays, debouncing, retries, and timeouts.',
        icon: '⏳',
    },
};

/**
 * Human-friendly behavior category descriptions
 */
export const BEHAVIOR_CATEGORY_DESCRIPTIONS: Partial<Record<BehaviorCategory, CategoryInfo>> = {
    'ui-interaction': {
        name: 'UI Interaction',
        description: 'User interface state management for lists, forms, modals, and navigation.',
        icon: '🖥️',
    },
    'data-management': {
        name: 'Data Management',
        description: 'Data operations including pagination, selection, sorting, and filtering.',
        icon: '📊',
    },
    async: {
        name: 'Async Flow',
        description: 'Asynchronous workflows for loading, fetching, submitting, and polling data.',
        icon: '🔄',
    },
    feedback: {
        name: 'User Feedback',
        description: 'Provide feedback to users with notifications, confirmations, and undo actions.',
        icon: '💬',
    },
    'game-core': {
        name: 'Game Core',
        description: 'Foundation systems for games: game loop, physics, input, and collision detection.',
        icon: '🎮',
    },
    'game-entity': {
        name: 'Game Entity',
        description: 'Entity state behaviors: health, score, movement, combat, and inventory.',
        icon: '👾',
    },
    'game-ui': {
        name: 'Game UI',
        description: 'Game interface systems: flow control, dialogue, and level progression.',
        icon: '🕹️',
    },
};

// ============================================================================
// Types
// ============================================================================

export interface ModuleInfo {
    name: string;
    displayName: string;
    description: string;
    icon: string;
}

export interface CategoryInfo {
    name: string;
    description: string;
    icon: string;
}

export interface OperatorDoc {
    name: string;
    shortName: string;
    displayName: string;
    description: string;
    params: Array<{
        name: string;
        type: string;
        description: string;
        optional?: boolean;
        defaultValue?: unknown;
    }>;
    example: string;
    returnType: string;
    returnTypeHuman: string;
    arityHuman: string;
    minArity: number;
    maxArity: number | null;
    hasSideEffects: boolean;
    acceptsLambda: boolean;
    pureFunction: boolean;
}

export interface ModuleDoc {
    id: StdModule;
    name: string;
    displayName: string;
    description: string;
    icon: string;
    operators: OperatorDoc[];
    operatorCount: number;
}

export interface BehaviorTransitionDoc {
    from: string | string[] | '*';
    to?: string;
    event: string;
    guard?: unknown;
    effects?: unknown[];
}

export interface BehaviorStateMachineDoc {
    states: Array<{ name: string; isInitial?: boolean; isFinal?: boolean }>;
    transitions: BehaviorTransitionDoc[];
}

export interface BehaviorDoc {
    name: string;
    shortName: string;
    description: string;
    suggestedFor: string[];
    states: string[];
    statesCount: number;
    initial: string;
    events: string[];
    eventsCount: number;
    hasFields: boolean;
    hasComputed: boolean;
    hasTicks: boolean;
    ticksCount: number;
    transitionsCount: number;
    /** Full state machine data for visualizer */
    stateMachine?: BehaviorStateMachineDoc;
    /** Full behavior source code for display */
    sourceCode?: string;
    /** Data entities (runtime state) */
    dataEntities?: Array<{ name: string; fields: Array<{ name: string; type: string; default?: unknown }> }>;
    /** Ticks (frame-by-frame execution) */
    ticks?: Array<{ name: string; interval: string | number; description?: string }>;
}

export interface CategoryDoc {
    id: string;
    name: string;
    description: string;
    icon: string;
    behaviors: BehaviorDoc[];
    behaviorCount: number;
}

export interface DocsStats {
    totalModules: number;
    totalOperators: number;
    totalBehaviorCategories: number;
    totalBehaviors: number;
    generatedAt: string;
}

export interface StdLibDocs {
    modules: ModuleDoc[];
    stats: DocsStats;
}

export interface BehaviorsDocs {
    categories: CategoryDoc[];
    stats: DocsStats;
}

// ============================================================================
// Transformation Functions
// ============================================================================

/**
 * Transform operator name to human-friendly format
 * e.g., "math/clamp" -> "Clamp Value"
 */
export function humanizeOperatorName(operatorName: string): string {
    const parts = operatorName.split('/');
    const funcName = parts[1];
    if (!funcName) return operatorName;

    // Handle special cases
    const specialNames: Record<string, string> = {
        abs: 'Absolute Value',
        len: 'Length',
        lerp: 'Linear Interpolation',
        randomInt: 'Random Integer',
        isPast: 'Is Past Date',
        isFuture: 'Is Future Date',
        minLength: 'Minimum Length',
        maxLength: 'Maximum Length',
        isType: 'Is Type',
        groupBy: 'Group By',
        sortBy: 'Sort By',
        findFirst: 'Find First',
        findLast: 'Find Last',
    };

    if (specialNames[funcName]) return specialNames[funcName];

    // Convert camelCase to Title Case
    return funcName
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
}

/**
 * Transform return type to human-friendly format
 */
export function humanizeReturnType(returnType: string | undefined): string {
    const typeMap: Record<string, string> = {
        number: 'number',
        string: 'text',
        boolean: 'true/false',
        array: 'list',
        object: 'object',
        any: 'any value',
        void: 'nothing',
    };
    return typeMap[returnType || ''] || returnType || 'any';
}

/**
 * Format arity as human-readable text
 */
export function formatArity(minArity: number, maxArity: number | null): string {
    if (maxArity === null) {
        return minArity === 0 ? 'variable (any number)' : `${minArity} or more`;
    }
    if (minArity === maxArity) {
        return minArity === 1 ? '1 argument' : `${minArity} arguments`;
    }
    return `${minArity}–${maxArity} arguments`;
}

// ============================================================================
// Documentation Generation
// ============================================================================

/**
 * Generate documentation for a single operator
 */
export function generateOperatorDoc(opName: string, meta: StdOperatorMeta): OperatorDoc {
    return {
        name: opName,
        shortName: opName.split('/')[1] || opName,
        displayName: humanizeOperatorName(opName),
        description: meta.description,
        params: meta.params || [],
        example: meta.example || '',
        returnType: meta.returnType || 'any',
        returnTypeHuman: humanizeReturnType(meta.returnType),
        arityHuman: formatArity(meta.minArity, meta.maxArity),
        minArity: meta.minArity,
        maxArity: meta.maxArity,
        hasSideEffects: meta.hasSideEffects,
        acceptsLambda: meta.acceptsLambda || false,
        pureFunction: !meta.hasSideEffects,
    };
}

/**
 * Generate documentation for a single module
 */
export function generateModuleDoc(moduleId: StdModule): ModuleDoc | null {
    const moduleInfo = MODULE_DESCRIPTIONS[moduleId];
    if (!moduleInfo) return null;

    const moduleOperators = STD_OPERATORS_BY_MODULE[moduleId] || {};
    const operators = Object.entries(moduleOperators).map(([opName, meta]) =>
        generateOperatorDoc(opName, meta)
    );

    return {
        id: moduleId,
        ...moduleInfo,
        operators,
        operatorCount: operators.length,
    };
}

/**
 * Generate documentation for a single behavior
 */
export function generateBehaviorDoc(behavior: StandardBehavior): BehaviorDoc {
    const sm = behavior.stateMachine;

    // Extract states list
    const states = (sm?.states || []).map(s =>
        typeof s === 'string' ? s : s.name
    );

    // Extract events list  
    const events = (sm?.events || []).map(e =>
        typeof e === 'string' ? e : e.key
    );

    // Get initial state
    const initial = sm?.initial || states[0] || '';

    // Build state machine for visualizer
    const stateMachineDoc: BehaviorStateMachineDoc | undefined = sm ? {
        states: states.map(name => ({
            name,
            isInitial: name === initial,
            isFinal: false,
        })),
        transitions: (sm.transitions || []).map(t => ({
            from: t.from || '*',
            to: t.to,
            event: t.event,
            guard: t.guard,
            effects: t.effects,
        })),
    } : undefined;

    // Generate source code representation
    const sourceCode = generateBehaviorSourceCode(behavior);

    // Extract data entities for display
    const dataEntities = behavior.dataEntities?.map(e => ({
        name: e.name,
        fields: e.fields.map(f => ({
            name: f.name,
            type: f.type,
            default: f.default,
        })),
    }));

    // Extract ticks for display
    const ticks = behavior.ticks?.map(t => ({
        name: t.name,
        interval: t.interval,
        description: t.description,
    }));

    return {
        name: behavior.name,
        shortName: behavior.name.replace('std/', ''),
        description: behavior.description,
        suggestedFor: behavior.suggestedFor || [],
        states,
        statesCount: states.length,
        initial,
        events,
        eventsCount: events.length,
        hasFields: (behavior.dataEntities?.length || 0) > 0,
        hasComputed: false, // Computed is now inline in effects
        hasTicks: (behavior.ticks?.length || 0) > 0,
        ticksCount: behavior.ticks?.length || 0,
        transitionsCount: sm?.transitions?.length || 0,
        stateMachine: stateMachineDoc,
        sourceCode,
        dataEntities,
        ticks,
    };
}

/**
 * Generate a formatted source code representation of a behavior
 */
function generateBehaviorSourceCode(behavior: StandardBehavior): string {
    const lines: string[] = [];
    const indent = '  ';

    lines.push(`export const ${behavior.name.replace('std/', '').toUpperCase()}_BEHAVIOR = {`);
    lines.push(`${indent}name: '${behavior.name}',`);
    lines.push(`${indent}category: '${behavior.category}',`);
    lines.push(`${indent}description: '${behavior.description}',`);

    // Data Entities
    if (behavior.dataEntities && behavior.dataEntities.length > 0) {
        lines.push('');
        lines.push(`${indent}dataEntities: [`);
        for (const entity of behavior.dataEntities) {
            lines.push(`${indent}${indent}{`);
            lines.push(`${indent}${indent}${indent}name: '${entity.name}',`);
            if (entity.runtime) lines.push(`${indent}${indent}${indent}runtime: true,`);
            if (entity.singleton) lines.push(`${indent}${indent}${indent}singleton: true,`);
            lines.push(`${indent}${indent}${indent}fields: [`);
            for (const field of entity.fields) {
                const defaultVal = field.default !== undefined ? `, default: ${JSON.stringify(field.default)}` : '';
                lines.push(`${indent}${indent}${indent}${indent}{ name: '${field.name}', type: '${field.type}'${defaultVal} },`);
            }
            lines.push(`${indent}${indent}${indent}],`);
            lines.push(`${indent}${indent}},`);
        }
        lines.push(`${indent}],`);
    }

    // State Machine
    if (behavior.stateMachine) {
        const sm = behavior.stateMachine;
        lines.push('');
        lines.push(`${indent}stateMachine: {`);
        lines.push(`${indent}${indent}initial: '${sm.initial}',`);

        // States
        lines.push(`${indent}${indent}states: [`);
        for (const state of sm.states) {
            const name = typeof state === 'string' ? state : state.name;
            const isInitial = typeof state === 'string' ? name === sm.initial : state.isInitial;
            if (isInitial) {
                lines.push(`${indent}${indent}${indent}{ name: '${name}', isInitial: true },`);
            } else {
                lines.push(`${indent}${indent}${indent}{ name: '${name}' },`);
            }
        }
        lines.push(`${indent}${indent}],`);

        // Events
        lines.push(`${indent}${indent}events: [`);
        for (const event of sm.events) {
            const key = typeof event === 'string' ? event : event.key;
            lines.push(`${indent}${indent}${indent}{ key: '${key}' },`);
        }
        lines.push(`${indent}${indent}],`);

        // Transitions
        lines.push(`${indent}${indent}transitions: [`);
        for (const t of sm.transitions) {
            lines.push(`${indent}${indent}${indent}{`);
            if (t.from) {
                if (Array.isArray(t.from)) {
                    lines.push(`${indent}${indent}${indent}${indent}from: ${JSON.stringify(t.from)},`);
                } else {
                    lines.push(`${indent}${indent}${indent}${indent}from: '${t.from}',`);
                }
            }
            if (t.to) lines.push(`${indent}${indent}${indent}${indent}to: '${t.to}',`);
            lines.push(`${indent}${indent}${indent}${indent}event: '${t.event}',`);
            if (t.guard) {
                lines.push(`${indent}${indent}${indent}${indent}guard: ${formatSExprForCode(t.guard)},`);
            }
            if (t.effects && t.effects.length > 0) {
                lines.push(`${indent}${indent}${indent}${indent}effects: [`);
                for (const effect of t.effects) {
                    lines.push(`${indent}${indent}${indent}${indent}${indent}${formatSExprForCode(effect)},`);
                }
                lines.push(`${indent}${indent}${indent}${indent}],`);
            }
            lines.push(`${indent}${indent}${indent}},`);
        }
        lines.push(`${indent}${indent}],`);
        lines.push(`${indent}},`);
    }

    // Ticks
    if (behavior.ticks && behavior.ticks.length > 0) {
        lines.push('');
        lines.push(`${indent}ticks: [`);
        for (const tick of behavior.ticks) {
            lines.push(`${indent}${indent}{`);
            lines.push(`${indent}${indent}${indent}name: '${tick.name}',`);
            lines.push(`${indent}${indent}${indent}interval: ${typeof tick.interval === 'string' ? `'${tick.interval}'` : tick.interval},`);
            if (tick.priority) lines.push(`${indent}${indent}${indent}priority: ${tick.priority},`);
            if (tick.guard) {
                lines.push(`${indent}${indent}${indent}guard: ${formatSExprForCode(tick.guard)},`);
            }
            if (tick.effects && tick.effects.length > 0) {
                lines.push(`${indent}${indent}${indent}effects: [`);
                for (const effect of tick.effects) {
                    lines.push(`${indent}${indent}${indent}${indent}${formatSExprForCode(effect)},`);
                }
                lines.push(`${indent}${indent}${indent}],`);
            }
            lines.push(`${indent}${indent}},`);
        }
        lines.push(`${indent}],`);
    }

    lines.push('};');
    return lines.join('\n');
}

/**
 * Format an S-expression for display in code
 */
function formatSExprForCode(expr: unknown): string {
    if (typeof expr === 'string') {
        return `'${expr}'`;
    }
    if (typeof expr === 'number' || typeof expr === 'boolean') {
        return String(expr);
    }
    if (expr === null || expr === undefined) {
        return 'null';
    }
    if (Array.isArray(expr)) {
        const items = expr.map(formatSExprForCode);
        if (items.join(', ').length < 60) {
            return `[${items.join(', ')}]`;
        }
        return `[${items.join(', ')}]`;
    }
    if (typeof expr === 'object') {
        return JSON.stringify(expr);
    }
    return String(expr);
}

/**
 * Generate documentation for all std library modules
 */
export function generateModulesDocs(): StdLibDocs {
    const modules: ModuleDoc[] = [];

    for (const moduleId of STD_MODULES) {
        const moduleDoc = generateModuleDoc(moduleId);
        if (moduleDoc) {
            modules.push(moduleDoc);
        }
    }

    const stats: DocsStats = {
        totalModules: modules.length,
        totalOperators: modules.reduce((sum, m) => sum + m.operatorCount, 0),
        totalBehaviorCategories: 0,
        totalBehaviors: 0,
        generatedAt: new Date().toISOString(),
    };

    return { modules, stats };
}

/**
 * Generate documentation for all standard behaviors
 */
export function generateBehaviorsDocs(): BehaviorsDocs {
    const categories: CategoryDoc[] = [];

    // Group behaviors by category
    for (const [categoryId, categoryInfo] of Object.entries(BEHAVIOR_CATEGORY_DESCRIPTIONS)) {
        const categoryBehaviors = BEHAVIORS_BY_CATEGORY[categoryId as BehaviorCategory] || [];

        if (categoryBehaviors.length === 0) continue;

        const behaviors = categoryBehaviors.map((b) => generateBehaviorDoc(b));

        categories.push({
            id: categoryId,
            ...categoryInfo,
            behaviors,
            behaviorCount: behaviors.length,
        });
    }

    const stats: DocsStats = {
        totalModules: 0,
        totalOperators: 0,
        totalBehaviorCategories: categories.length,
        totalBehaviors: categories.reduce((sum, c) => sum + c.behaviorCount, 0),
        generatedAt: new Date().toISOString(),
    };

    return { categories, stats };
}

/**
 * Generate complete standard library documentation
 */
export function generateStdLibDocs(): {
    modules: StdLibDocs;
    behaviors: BehaviorsDocs;
} {
    const modules = generateModulesDocs();
    const behaviors = generateBehaviorsDocs();

    // Update cross-stats
    modules.stats.totalBehaviorCategories = behaviors.stats.totalBehaviorCategories;
    modules.stats.totalBehaviors = behaviors.stats.totalBehaviors;
    behaviors.stats.totalModules = modules.stats.totalModules;
    behaviors.stats.totalOperators = modules.stats.totalOperators;

    return { modules, behaviors };
}
