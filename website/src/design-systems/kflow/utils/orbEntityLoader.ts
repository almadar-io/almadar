/**
 * orbEntityLoader — Extract KnowledgeStoryEntity from .orb JSON imports.
 *
 * .orb files are JSON and can be imported directly via `resolveJsonModule`.
 * This utility navigates `orbitals[0].entity.instances[0]` to extract the
 * story instance as a KnowledgeStoryEntity.
 *
 * Locale switching:
 * - Import all locale .orb files in the story file
 * - Pass them in a `LocaleOrbMap` keyed by locale code
 * - `extractStoryEntity(orbs, locale)` picks the right one (falls back to 'en')
 */

import type { KnowledgeStoryEntity } from '../organisms/KnowledgeStoryBoard';

/** Map of locale code → imported .orb JSON */
export type LocaleOrbMap = Record<string, Record<string, unknown>>;

/**
 * Extract the first entity instance from a raw .orb JSON import.
 * Navigates: `orbitals[0].entity.instances[0]`
 */
export function extractEntityFromOrb(
  orb: Record<string, unknown>,
): KnowledgeStoryEntity {
  const orbitals = orb.orbitals as Array<Record<string, unknown>> | undefined;
  if (!orbitals?.[0]) {
    throw new Error('Invalid .orb file: no orbitals found');
  }

  const entity = orbitals[0].entity as Record<string, unknown> | undefined;
  if (!entity) {
    throw new Error('Invalid .orb file: no entity in first orbital');
  }

  const instances = entity.instances as Array<Record<string, unknown>> | undefined;
  if (!instances?.[0]) {
    throw new Error('Invalid .orb file: no instances in entity');
  }

  return instances[0] as unknown as KnowledgeStoryEntity;
}

/**
 * Pick the correct locale .orb and extract the story entity.
 * Falls back to 'en' if the requested locale is not in the map.
 */
export function extractStoryEntity(
  orbs: LocaleOrbMap,
  locale?: string,
): KnowledgeStoryEntity {
  const resolvedLocale = locale && orbs[locale] ? locale : 'en';
  return extractEntityFromOrb(orbs[resolvedLocale]);
}
