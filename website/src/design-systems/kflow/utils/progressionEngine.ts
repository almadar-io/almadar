/**
 * Progression Engine — Pure functions for learning session tracking,
 * spaced repetition (SM-2), XP calculation, and mastery levels.
 */

import type {
  ReviewItem,
  KnowledgeSession,
  DailyProgress,
  NextSuggestion,
  KnowledgeChallenge,
  KnowledgePlayer,
  ChallengeTier,
} from "../types/knowledge";

// ---------------------------------------------------------------------------
// SM-2 Spaced Repetition
// ---------------------------------------------------------------------------

export interface ReviewResult {
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReviewAt: string;
}

/**
 * SM-2 spaced-repetition schedule.
 * @param item - current review state
 * @param quality - recall quality 1-5 (1=blackout, 5=perfect)
 */
export function scheduleReview(item: ReviewItem, quality: number): ReviewResult {
  const q = Math.max(1, Math.min(5, quality));
  let { easeFactor, interval, repetitions } = item;

  if (q < 3) {
    // Reset on poor recall
    repetitions = 0;
    interval = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
  }

  // Update ease factor (minimum 1.3)
  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)),
  );

  const now = new Date();
  now.setDate(now.getDate() + interval);
  const nextReviewAt = now.toISOString().split("T")[0];

  return { easeFactor, interval, repetitions, nextReviewAt };
}

// ---------------------------------------------------------------------------
// Daily Progress
// ---------------------------------------------------------------------------

/**
 * Aggregate daily stats from a list of sessions for a given date.
 */
export function computeDailyProgress(
  sessions: KnowledgeSession[],
  date: string,
): Omit<DailyProgress, "streakDay" | "reviewsDue"> {
  const daySessions = sessions.filter((s) =>
    s.startedAt.startsWith(date),
  );

  let nodesExplored = 0;
  let timeSpent = 0;
  let xpEarned = 0;

  for (const session of daySessions) {
    nodesExplored += session.nodesVisited.length;
    timeSpent += session.timeSpent;
    xpEarned += session.xpEarned;
  }

  return {
    date,
    nodesExplored,
    lessonsCompleted: 0,
    challengesPassed: 0,
    timeSpent,
    xpEarned,
  };
}

// ---------------------------------------------------------------------------
// Suggestion Ranking
// ---------------------------------------------------------------------------

/**
 * Sort suggestions by priority: reviews first, then discoveries, then continue.
 */
export function rankSuggestions(suggestions: NextSuggestion[]): NextSuggestion[] {
  const TYPE_ORDER: Record<string, number> = {
    review: 0,
    discovery: 1,
    challenge: 2,
    continue: 3,
    explore: 4,
  };

  return [...suggestions].sort((a, b) => {
    const typeA = TYPE_ORDER[a.type] ?? 5;
    const typeB = TYPE_ORDER[b.type] ?? 5;
    if (typeA !== typeB) return typeA - typeB;
    return a.priority - b.priority;
  });
}

// ---------------------------------------------------------------------------
// XP & Mastery
// ---------------------------------------------------------------------------

/** XP reward for completing a challenge, with time and hint bonuses */
export function calculateXP(
  challenge: KnowledgeChallenge,
  result: { correct: boolean; timeUsed: number; hintsUsed: number },
): number {
  if (!result.correct) return Math.round(challenge.xpReward * 0.1);

  let xp = challenge.xpReward;

  // Speed bonus: up to 50% extra for completing in < 50% of time limit
  if (challenge.timeLimit > 0) {
    const timeRatio = result.timeUsed / challenge.timeLimit;
    if (timeRatio < 0.5) xp = Math.round(xp * 1.5);
    else if (timeRatio < 0.75) xp = Math.round(xp * 1.25);
  }

  // Hint penalty: -20% per hint used
  const hintPenalty = Math.min(result.hintsUsed * 0.2, 0.8);
  xp = Math.round(xp * (1 - hintPenalty));

  return Math.max(1, xp);
}

/** Mastery level 0-5 derived from total XP in a domain */
export function getMasteryLevel(totalXP: number): number {
  if (totalXP >= 10000) return 5;
  if (totalXP >= 5000) return 4;
  if (totalXP >= 2000) return 3;
  if (totalXP >= 750) return 2;
  if (totalXP >= 200) return 1;
  return 0;
}

/** Mastery level labels */
export const MASTERY_LABELS = [
  "Novice",
  "Apprentice",
  "Practitioner",
  "Expert",
  "Master",
  "Grandmaster",
] as const;

// ---------------------------------------------------------------------------
// Tier Gating
// ---------------------------------------------------------------------------

const TIER_MASTERY_REQUIRED: Record<ChallengeTier, number> = {
  sequencer: 0,
  "event-handler": 1,
  "state-architect": 2,
  battle: 3,
};

/** Check if player meets mastery requirements for a challenge tier */
export function canAccessTier(
  player: KnowledgePlayer,
  tier: ChallengeTier,
  subject: string,
): boolean {
  const domainXPValues = Object.values(player.domainXP);
  const avgDomainXP =
    domainXPValues.length > 0
      ? domainXPValues.reduce((a, b) => a + b, 0) / domainXPValues.length
      : 0;
  const mastery = getMasteryLevel(avgDomainXP);
  const required = TIER_MASTERY_REQUIRED[tier];

  return mastery >= required && (tier === "sequencer" || player.unlockedTopics.includes(subject));
}

// ---------------------------------------------------------------------------
// Game Event Processing (Phase C)
// ---------------------------------------------------------------------------

export interface ChallengeCompletePayload {
  challengeId: string;
  correct: boolean;
  timeUsed: number;
  hintsUsed: number;
}

export interface BattleCompletePayload {
  won: boolean;
  xpEarned: number;
}

/** Process UI:CHALLENGE_COMPLETE — award XP and schedule review for failed challenges */
export function processChallengeComplete(
  challenge: KnowledgeChallenge,
  payload: ChallengeCompletePayload,
): { xpAwarded: number; scheduleReviewForNode: boolean } {
  const xpAwarded = calculateXP(challenge, payload);
  const scheduleReviewForNode = !payload.correct;
  return { xpAwarded, scheduleReviewForNode };
}

/** Process UI:BATTLE_COMPLETE — calculate XP from battle result */
export function processBattleComplete(
  payload: BattleCompletePayload,
): { xpAwarded: number; scheduleReviewForNode: boolean } {
  return {
    xpAwarded: payload.won ? payload.xpEarned : Math.round(payload.xpEarned * 0.1),
    scheduleReviewForNode: !payload.won,
  };
}

/** Generate game-related suggestions based on player mastery */
export function generateGameSuggestions(
  player: KnowledgePlayer,
  availableChallenges: KnowledgeChallenge[],
): NextSuggestion[] {
  const suggestions: NextSuggestion[] = [];

  for (const challenge of availableChallenges) {
    if (canAccessTier(player, challenge.tier, challenge.subject)) {
      suggestions.push({
        type: "challenge",
        title: `${challenge.topic} Challenge`,
        description: `${challenge.tier} tier — ${challenge.xpReward} XP`,
        nodeId: challenge.id,
        subjectId: challenge.subject,
        domain: challenge.domain,
        priority: challenge.tier === "battle" ? 2 : 1,
      });
    }
  }

  return suggestions;
}
