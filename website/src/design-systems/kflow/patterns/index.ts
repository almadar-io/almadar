/**
 * KFlow Pattern Registry
 *
 * Client-specific pattern definitions for the KFlow educational platform.
 * These extend the core orbital-shared patterns with learning-focused components.
 */

import componentMapping from './component-mapping.json';
import eventContracts from './event-contracts.json';

export { componentMapping, eventContracts };

/**
 * Get component mapping for a pattern type
 */
export function getKflowComponentMapping(patternType: string) {
  return (componentMapping.mappings as Record<string, unknown>)[patternType];
}

/**
 * Get event contract for a pattern type
 */
export function getKflowEventContract(patternType: string) {
  return (eventContracts.contracts as Record<string, unknown>)[patternType];
}

/**
 * List all KFlow-specific pattern types
 */
export function listKflowPatterns(): string[] {
  return Object.keys(componentMapping.mappings);
}

/**
 * Pattern categories specific to KFlow
 */
export const KFLOW_CATEGORIES = [
  'learning',
  'learning-science',
  'visualization',
  'content',
  'notes',
  'navigation',
] as const;

export type KflowCategory = (typeof KFLOW_CATEGORIES)[number];
