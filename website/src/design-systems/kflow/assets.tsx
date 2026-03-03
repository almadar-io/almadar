/**
 * Knowledge Stories Asset Types
 *
 * All asset types have been moved to types/knowledge.ts.
 * This file re-exports them for backward compatibility.
 *
 * The manifest, provider, hooks, and URL helpers have been removed.
 * Each story's .orb file now owns all its asset URLs directly.
 */

export type {
  KnowledgeTerrainType,
  SfxEvent,
  StoryDomain,
  MapFeatureType,
  StoryAssetConfig,
} from './types/knowledge';
