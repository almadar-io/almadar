/**
 * Common types for kflow design-system client
 */

export interface FlashCard {
  id?: string;
  front: string;
  back: string;
}

// Knowledge system types
export type {
  // Story types
  StorySummary,
  StoryBridge,
  UserStoryProgress,
  // Domain & node types
  KnowledgeDomainType,
  KnowledgeNodeType,
  LearningStatus,
  KnowledgeNode,
  KnowledgeDomain,
  KnowledgeSubject,
  LearningProgress,
  // Session & daily progress
  KnowledgeSession,
  DailyProgress,
  ReviewItem,
  NextSuggestion,
  NextSuggestionType,
  // Game types
  PlayerArchetype,
  ChallengeTier,
  KnowledgePlayer,
  KnowledgeChallenge,
  PhysicsSimulation,
  PhysicsBody,
  PhysicsMeasurement,
  KnowledgeTerrain,
  KnowledgeRegion,
} from "./knowledge";
