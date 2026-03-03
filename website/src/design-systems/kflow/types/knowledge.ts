/**
 * Knowledge System Types
 *
 * Core type definitions for the knowledge graph, domains, learning progress,
 * session tracking, spaced review, and game types.
 */

// ---------------------------------------------------------------------------
// Story Types (shared across molecules/organisms)
// ---------------------------------------------------------------------------

/** Summary of a story for cards and lists */
export interface StorySummary {
  id: string;
  title: string;
  teaser: string;
  domain: string;
  difficulty: string;
  duration: number;
  coverImage?: string;
  rating?: number;
  playCount?: number;
  seriesId?: string;
  episodeId?: string;
}

/** A bridge from one story to a related story */
export interface StoryBridge {
  story: StorySummary;
  connectionLabel: string;
}

/** User progress across stories, subjects, and domains */
export interface UserStoryProgress {
  storiesCompleted: string[];
  subjectProgress: Record<string, {
    completed: number;
    total: number;
    gamesPlayed: number;
    averageScore: number;
    timeSpentMinutes: number;
  }>;
  domainProgress: Record<KnowledgeDomainType, {
    completionPercent: number;
    strongestSubject: string;
    weakestSubject: string;
  }>;
  suggestedStories: StorySummary[];
}

// ---------------------------------------------------------------------------
// Series / Season / Episode Types
// ---------------------------------------------------------------------------

export interface SeriesCreator {
  uid: string;
  displayName: string;
  avatar?: string;
}

export type SeriesStatus = 'draft' | 'published' | 'featured';

export interface Episode {
  id: string;
  title: string;
  description: string;
  number: number;
  stories: string[];
  duration: number;
  difficulty: string;
}

export interface Season {
  id: string;
  title: string;
  description: string;
  number: number;
  coverImage?: string;
  episodes: Episode[];
  status: 'draft' | 'published';
}

export interface Series {
  id: string;
  title: string;
  description: string;
  creator: SeriesCreator;
  domain: KnowledgeDomainType;
  tags: string[];
  coverImage?: string;
  seasons: Season[];
  status: SeriesStatus;
  subscriberCount: number;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

/** Lightweight series summary for cards and lists */
export interface SeriesSummary {
  id: string;
  title: string;
  creator: SeriesCreator;
  domain: KnowledgeDomainType;
  coverImage?: string;
  seasonCount: number;
  episodeCount: number;
  subscriberCount: number;
  rating?: number;
  status: SeriesStatus;
}

/** Reader's progress within a specific episode */
export interface EpisodeProgress {
  episodeId: string;
  storiesCompleted: number;
  storiesTotal: number;
  status: 'not_started' | 'in_progress' | 'completed';
}

/** Reader's progress within a specific season */
export interface SeasonProgress {
  seasonId: string;
  episodesCompleted: number;
  episodesTotal: number;
  episodeProgress: Record<string, EpisodeProgress>;
}

/** Reader's progress within a series */
export interface SeriesProgress {
  seriesId: string;
  subscribed: boolean;
  seasonsCompleted: number;
  seasonsTotal: number;
  seasonProgress: Record<string, SeasonProgress>;
  currentEpisodeId?: string;
  currentStoryId?: string;
}

// ---------------------------------------------------------------------------
// Domain & Node Types
// ---------------------------------------------------------------------------

/** Domain classification — the three pillars of knowledge */
export type KnowledgeDomainType = "formal" | "natural" | "social";

/** Node type classification */
export type KnowledgeNodeType = "concept" | "resource" | "root";

/** Learning progress status */
export type LearningStatus =
  | "unexplored"
  | "curious"
  | "studying"
  | "understood"
  | "teaching";

/** A single node in the knowledge graph */
export interface KnowledgeNode {
  id: string;
  title: string;
  description: string;
  domain: KnowledgeDomainType;
  discipline: string;
  subject: string;
  depth: number;
  parentId: string;
  childIds: string[];
  resourceUrls: string[];
  notes: string;
  nodeType: KnowledgeNodeType;
}

/** Domain-level aggregate (one of three pillars) */
export interface KnowledgeDomain {
  id: string;
  name: string;
  domain: KnowledgeDomainType;
  description: string;
  subjectCount: number;
  nodeCount: number;
  maxDepth: number;
}

/** Subject-level aggregate (e.g., JavaScript, Statistics) */
export interface KnowledgeSubject {
  id: string;
  name: string;
  domain: KnowledgeDomainType;
  discipline: string;
  nodeCount: number;
  maxDepth: number;
  fileSize: number;
  rootNodeId: string;
}

/** Per-node learning progress for a user */
export interface LearningProgress {
  id: string;
  nodeId: string;
  userId: string;
  status: LearningStatus;
  lastVisited: string;
  timeSpent: number;
  notesWritten: number;
}

// ---------------------------------------------------------------------------
// Session & Daily Progress
// ---------------------------------------------------------------------------

/** Active learning session state */
export interface KnowledgeSession {
  id: string;
  userId: string;
  startedAt: string;
  currentView: string;
  currentNodeId: string;
  nodesVisited: string[];
  timeSpent: number;
  xpEarned: number;
}

/** Daily aggregate progress */
export interface DailyProgress {
  date: string;
  nodesExplored: number;
  lessonsCompleted: number;
  challengesPassed: number;
  timeSpent: number;
  xpEarned: number;
  streakDay: number;
  reviewsDue: number;
}

/** Spaced-repetition review item (SM-2 algorithm fields) */
export interface ReviewItem {
  nodeId: string;
  nodeTitle: string;
  domain: KnowledgeDomainType;
  subject: string;
  lastReviewed: string;
  nextReviewAt: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
}

/** Suggested next action for the learner */
export type NextSuggestionType = "continue" | "review" | "explore" | "challenge" | "discovery";

export interface NextSuggestion {
  type: NextSuggestionType;
  title: string;
  description: string;
  nodeId: string;
  subjectId: string;
  domain: KnowledgeDomainType;
  priority: number;
}

// ---------------------------------------------------------------------------
// Story Game Types
// ---------------------------------------------------------------------------

/** All game types available for Knowledge Stories */
export type StoryGameType =
  // Puzzle boards (narrow layout)
  | "sequencer"
  | "simulator"
  | "classifier"
  | "builder"
  | "debugger"
  | "negotiator"
  | "event-handler"
  | "state-architect"
  // Full-width boards
  | "battle"
  | "adventure"
  | "physics-lab";

/** Full-width game types that should not be constrained to narrow layout */
export const FULL_WIDTH_GAME_TYPES: ReadonlySet<StoryGameType> = new Set([
  "battle",
  "adventure",
  "physics-lab",
]);

// ---------------------------------------------------------------------------
// Game Types
// ---------------------------------------------------------------------------

/** Player archetype for knowledge domain strengths */
export type PlayerArchetype = "scholar" | "explorer" | "strategist" | "alchemist";

/** Challenge tiers map to game board types */
export type ChallengeTier = "sequencer" | "event-handler" | "state-architect" | "battle";

/** Player state in the knowledge game */
export interface KnowledgePlayer {
  id: string;
  name: string;
  level: number;
  totalXP: number;
  domainXP: Record<KnowledgeDomainType, number>;
  unlockedTopics: string[];
  currentRegion: string;
  archetype: PlayerArchetype;
  resources: Record<string, number>;
}

/** A knowledge challenge at a specific tier */
export interface KnowledgeChallenge {
  id: string;
  domain: KnowledgeDomainType;
  subject: string;
  topic: string;
  tier: ChallengeTier;
  prompt: string;
  correctAnswer: string;
  hints: string[];
  xpReward: number;
  timeLimit: number;
}

/** Physics simulation preset */
export interface PhysicsSimulation {
  id: string;
  preset: string;
  parameters: Record<string, number>;
  bodies: PhysicsBody[];
  running: boolean;
  elapsed: number;
  measurements: PhysicsMeasurement[];
  targetCondition: string;
}

export interface PhysicsBody {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  radius: number;
  color: string;
  fixed: boolean;
}

export interface PhysicsMeasurement {
  time: number;
  label: string;
  value: number;
  unit: string;
}

// ---------------------------------------------------------------------------
// Asset Types (moved from assets.tsx — schema-owned, no manifest)
// ---------------------------------------------------------------------------

/** Terrain types for isometric and hex-based game boards. */
export type KnowledgeTerrainType =
  | "plains" | "forest" | "desert" | "mountains" | "water"
  | "city" | "oasis" | "stone" | "dirt" | "grass" | "sand";

/** Audio event categories for SFX mapping. */
export type SfxEvent =
  | "stepAdvance" | "correctAnswer" | "wrongAnswer" | "gameComplete"
  | "attack" | "heroMove" | "cardPlace" | "uiClick" | "uiOpen" | "uiClose"
  | "error" | "secret" | "upgrade" | "woosh";

/** Story domain for music track selection. */
export type StoryDomain = "science" | "history" | "engineering" | "tech" | "math";

/** World map feature types (for adventure game boards). */
export type MapFeatureType =
  | "oasis" | "city" | "banditCamp" | "mountainPass"
  | "treasure" | "battleMarker" | "fogOfWar" | "portal" | "goal" | "start";

/**
 * Per-story asset bundle. All URLs are absolute CDN URLs —
 * no baseUrl, no manifest, no resolution logic.
 */
export interface StoryAssetConfig {
  /** Terrain type → full CDN URL (for battle/adventure boards) */
  terrain: Record<string, string>;
  /** Effect name → array of frame URLs (for particle effects) */
  effects: Record<string, string[]>;
  /** World map feature type → full CDN URL (for adventure boards) */
  worldMapFeatures: Record<string, string>;
  /** Audio config */
  audio: {
    /** Background music URL */
    music?: string;
    /** SFX event → audio file URL */
    sfx: Record<string, string>;
  };
}

// ---------------------------------------------------------------------------
// Knowledge World Map
// ---------------------------------------------------------------------------

/** Terrain type for knowledge world map regions */
export type KnowledgeTerrain = "crystal" | "forest" | "cities" | "desert" | "mountains" | "ocean";

/** A region on the knowledge world map */
export interface KnowledgeRegion {
  id: string;
  domain: KnowledgeDomainType;
  name: string;
  terrain: KnowledgeTerrain;
  adjacentRegions: string[];
  requiredMastery: number;
  challenges: string[];
  unlocked: boolean;
}
