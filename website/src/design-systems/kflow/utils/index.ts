export {
  parseLessonSegments,
  parseMarkdownWithCodeBlocks,
} from "./parseLessonSegments";

export type { Segment, BloomLevel } from "./parseLessonSegments";

// Knowledge constants
export {
  DOMAIN_COLORS,
  PROGRESS_STATUS_COLORS,
  PROGRESS_STATUS_LABELS,
  DOMAIN_LABELS,
} from "./knowledgeConstants";

export type { DomainColorSet } from "./knowledgeConstants";

// Progression engine
export {
  scheduleReview,
  computeDailyProgress,
  rankSuggestions,
  calculateXP,
  getMasteryLevel,
  canAccessTier,
  MASTERY_LABELS,
} from "./progressionEngine";

export type { ReviewResult, ChallengeCompletePayload, BattleCompletePayload } from "./progressionEngine";

export {
  processChallengeComplete,
  processBattleComplete,
  generateGameSuggestions,
} from "./progressionEngine";

// Discovery engine
export {
  findCrossDomainDiscoveries,
  suggestNextNodes,
} from "./discoveryEngine";

export type { CrossLink, DiscoveryResult } from "./discoveryEngine";

// Challenge presets
export { mathChallenges, physicsChallenges, economicsChallenges } from "./challengePresets";

// World map data
export {
  knowledgeRegions,
  getRegionById,
  getRegionsByDomain,
  getUnlockedRegions,
  getAdjacentRegions,
} from "./worldMapData";
