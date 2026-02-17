/**
 * Pattern Resolver
 *
 * Resolves pattern configurations to component information.
 * Uses the central pattern registry and component mapping from orbital-shared/patterns/.
 *
 * This is the shared logic used by both Builder's PatternRenderer and
 * the compiled shell's UISlotRenderer.
 *
 * @packageDocumentation
 */

import type { PatternConfig, ResolvedPattern } from './types';

// ============================================================================
// Component Mapping (imported from orbital-shared/patterns/)
// ============================================================================

/**
 * Component mapping entry from component-mapping.json
 */
interface ComponentMappingEntry {
  component: string;
  importPath: string;
  category: string;
  deprecated?: boolean;
  replacedBy?: string;
}

/**
 * Pattern definition from registry.json
 */
interface PatternDefinition {
  type: string;
  category: string;
  description: string;
  propsSchema?: Record<string, {
    required?: boolean;
    types?: string[];
    description?: string;
  }>;
}

// These will be populated by the sync process or at runtime
let componentMapping: Record<string, ComponentMappingEntry> = {};
let patternRegistry: Record<string, PatternDefinition> = {};

/**
 * Initialize the pattern resolver with mappings.
 * Called at app startup with data from JSON files.
 */
export function initializePatternResolver(config: {
  componentMapping: Record<string, ComponentMappingEntry>;
  patternRegistry: Record<string, PatternDefinition>;
}): void {
  componentMapping = config.componentMapping;
  patternRegistry = config.patternRegistry;
}

/**
 * Set component mapping (alternative to full initialization).
 */
export function setComponentMapping(
  mapping: Record<string, ComponentMappingEntry>
): void {
  componentMapping = mapping;
}

/**
 * Set pattern registry (alternative to full initialization).
 */
export function setPatternRegistry(
  registry: Record<string, PatternDefinition>
): void {
  patternRegistry = registry;
}

// ============================================================================
// Pattern Resolution
// ============================================================================

/**
 * Resolve a pattern configuration to component information.
 *
 * @param config - Pattern configuration from render-ui effect
 * @returns Resolved pattern with component name, import path, and validated props
 * @throws Error if pattern type is unknown
 *
 * @example
 * ```typescript
 * const resolved = resolvePattern({
 *   type: 'entity-table',
 *   entity: 'Task',
 *   columns: ['title', 'status']
 * });
 * // resolved.component === 'DataTable'
 * // resolved.importPath === '@/components/organisms/DataTable'
 * ```
 */
export function resolvePattern(config: PatternConfig): ResolvedPattern {
  const { type, ...props } = config;

  // Look up component mapping
  const mapping = componentMapping[type];
  if (!mapping) {
    // Check if we have any mappings loaded
    if (Object.keys(componentMapping).length === 0) {
      console.warn(
        '[PatternResolver] Component mapping not initialized. ' +
        'Call initializePatternResolver() at app startup.'
      );
    }
    throw new Error(`Unknown pattern type: ${type}`);
  }

  // Check for deprecated patterns
  if (mapping.deprecated) {
    console.warn(
      `[PatternResolver] Pattern "${type}" is deprecated.` +
      (mapping.replacedBy ? ` Use "${mapping.replacedBy}" instead.` : '')
    );
  }

  // Validate props against registry schema
  const validatedProps = validatePatternProps(type, props);

  return {
    component: mapping.component,
    importPath: mapping.importPath,
    category: mapping.category,
    validatedProps,
  };
}

/**
 * Validate pattern props against the registry schema.
 * Returns normalized props with defaults applied.
 */
function validatePatternProps(
  patternType: string,
  props: Record<string, unknown>
): Record<string, unknown> {
  const definition = patternRegistry[patternType];

  // If no definition, return props as-is (allow unknown patterns)
  if (!definition || !definition.propsSchema) {
    return props;
  }

  const validated: Record<string, unknown> = { ...props };
  const schema = definition.propsSchema;

  // Check required props
  for (const [propName, propDef] of Object.entries(schema)) {
    if (propDef.required && !(propName in validated)) {
      // Don't throw, just warn - allows for flexibility
      console.warn(
        `[PatternResolver] Missing required prop "${propName}" for pattern "${patternType}"`
      );
    }
  }

  return validated;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Check if a pattern type is known.
 */
export function isKnownPattern(type: string): boolean {
  return type in componentMapping;
}

/**
 * Get all known pattern types.
 */
export function getKnownPatterns(): string[] {
  return Object.keys(componentMapping);
}

/**
 * Get patterns by category.
 */
export function getPatternsByCategory(category: string): string[] {
  return Object.entries(componentMapping)
    .filter(([, mapping]) => mapping.category === category)
    .map(([type]) => type);
}

/**
 * Get the component mapping for a pattern type.
 */
export function getPatternMapping(
  type: string
): ComponentMappingEntry | undefined {
  return componentMapping[type];
}

/**
 * Get the pattern definition from the registry.
 */
export function getPatternDefinition(
  type: string
): PatternDefinition | undefined {
  return patternRegistry[type];
}
