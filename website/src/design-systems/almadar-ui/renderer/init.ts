/**
 * Pattern Resolver Initialization
 *
 * Loads pattern registry and component mapping from orbital-shared/patterns/
 * and initializes the pattern resolver at app startup.
 *
 * @packageDocumentation
 */

import { initializePatternResolver } from './pattern-resolver';

// Import patterns data from @almadar/patterns (JSON is inlined in the package bundle)
import { componentMapping as componentMappingJson, patternsRegistry as registryJson } from '@almadar/patterns';

// Type definitions for the JSON structures
interface ComponentMappingJson {
  mappings: Record<string, {
    component: string;
    importPath: string;
    category: string;
    deprecated?: boolean;
    replacedBy?: string;
  }>;
}

interface RegistryJson {
  patterns: Record<string, {
    type: string;
    category: string;
    description: string;
    propsSchema?: Record<string, unknown>;
  }>;
}

/**
 * Initialize the pattern resolver with shared pattern data.
 * Must be called once at app startup before any pattern rendering.
 * @returns The number of patterns initialized
 */
export function initializePatterns(): number {
  console.log('[PatternResolver] initializePatterns called');
  console.log('[PatternResolver] componentMappingJson:', componentMappingJson);
  console.log('[PatternResolver] registryJson keys:', Object.keys(registryJson));

  // Extract mappings from component-mapping.json (has { mappings: {...} })
  const componentMappingData = componentMappingJson as ComponentMappingJson;
  const componentMapping = componentMappingData.mappings || {};

  console.log('[PatternResolver] Extracted mappings count:', Object.keys(componentMapping).length);
  console.log('[PatternResolver] Sample mappings:', Object.keys(componentMapping).slice(0, 5));

  // Extract patterns from registry.json (has { patterns: {...} })
  const registryData = registryJson as RegistryJson;
  const patternRegistry = registryData.patterns || {};

  console.log('[PatternResolver] Extracted patterns count:', Object.keys(patternRegistry).length);

  // Initialize the pattern resolver with the data
  // Use type assertion since JSON types are compatible at runtime
  initializePatternResolver({
    componentMapping,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    patternRegistry: patternRegistry as any,
  });

  console.log(`[PatternResolver] Initialized with ${Object.keys(componentMapping).length} component mappings and ${Object.keys(patternRegistry).length} pattern definitions`);

  return Object.keys(componentMapping).length;
}
