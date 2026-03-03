/* eslint-disable almadar/organism-extends-entity-display */
/**
 * KnowledgeStoryBoard Organism
 *
 * Scroll-driven Knowledge Story experience with cinematic full-bleed visuals:
 * Hook → Scene×N → Principle+Explanation → Quiz → Pattern → Game → Reward
 *
 * Every section uses the story's cover image or scene illustrations as
 * full-viewport backgrounds with gradient overlays and white text on top.
 *
 * Uses CSS scroll-snap for section-by-section vertical scrolling.
 * IntersectionObserver tracks the active section for side-dot progress.
 *
 * All assets are schema-owned — coverImage, scene illustrations, terrain,
 * effects, audio URLs all come from the entity (populated by the .orb file).
 *
 * Events Emitted:
 * - UI:STORY_NEXT — advance to next section
 * - UI:STORY_PREV — go back one section
 * - UI:STORY_START_GAME — transition to game section
 * - UI:STORY_GAME_COMPLETE — game finished with result
 * - UI:STORY_FINISH — story completed
 * - UI:STORY_SHARE — share the story
 *
 * Listens:
 * - UI:STORY_GAME_TIER_COMPLETE — from puzzle boards
 * - UI:CHALLENGE_TIER_COMPLETE — from event-handler / state-architect boards
 * - UI:BATTLE_COMPLETE — from BattleBoard (victory)
 * - UI:BATTLE_DEFEAT — from BattleBoard (defeat — allows retry)
 * - UI:ADVENTURE_GOAL_REACHED — from WorldMapBoard
 * - UI:SIMULATION_COMPLETE — from PhysicsLabBoard
 */

import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Box,
  VStack,
  HStack,
  Button,
  Typography,
  GameAudioProvider,
  GameAudioToggle,
  useEventBus,
  useTranslate,
} from '@almadar/ui';
import type { AudioManifest } from '@almadar/ui';
import { RotateCcw } from 'lucide-react';
import { StoryHookView } from '../molecules/story/StoryHookView';
import { StorySceneCard } from '../molecules/story/StoryNarrativeView';
import type { StoryScene } from '../molecules/story/StoryNarrativeView';
import {
  StoryLessonPrincipleView,
  StoryLessonQuizView,
  StoryLessonPatternView,
} from '../molecules/story/StoryLessonView';
import { StoryGameView } from '../molecules/story/StoryGameView';
import type { GameConfigEntity } from '../molecules/story/StoryGameView';
import { StoryRewardView } from '../molecules/story/StoryRewardView';
import type { GameResult } from '../molecules/story/StoryRewardView';
import type { StoryGameType, StoryAssetConfig } from '../types/knowledge';

export interface KnowledgeStoryEntity {
  id: string;
  title: string;
  teaser: string;
  domain: string;
  difficulty: string;
  duration: number;
  /** Full CDN URL for the story cover image */
  coverImage?: string;
  // Hook
  hookQuestion: string;
  hookNarrative: string;
  // Story
  scenes: StoryScene[];
  // Lesson
  principle: string;
  explanation: string;
  pattern: string;
  tryItQuestion: string;
  tryItOptions: string[];
  tryItCorrectIndex: number;
  // Game
  gameType: StoryGameType | string;
  gameConfig: GameConfigEntity;
  // Assets — schema-owned, all URLs are absolute CDN URLs
  assets?: StoryAssetConfig;
  // Reward
  resolution: string;
  learningPoints: string[];
  // State
  currentStep: number;
  gameResult?: GameResult;
  isComplete?: boolean;
}

export interface KnowledgeStoryBoardProps {
  entity: KnowledgeStoryEntity;
  className?: string;
}

export function KnowledgeStoryBoard({
  entity,
  className = '',
}: KnowledgeStoryBoardProps): React.JSX.Element {
  const { emit, on } = useEventBus();
  const { t } = useTranslate();
  const [gameResult, setGameResult] = useState<GameResult | undefined>(entity.gameResult);
  const [tryItAnswered, setTryItAnswered] = useState(false);
  const [battleDefeated, setBattleDefeated] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // ---------------------------------------------------------------------------
  // Build section list for dot indicators
  // ---------------------------------------------------------------------------
  // hook(1) + scenes(N) + principle(1) + quiz(1) + pattern(1) + game(1) + reward(1)
  const sectionCount = 1 + entity.scenes.length + 3 + 1 + 1;

  // ---------------------------------------------------------------------------
  // Pick background images for non-scene sections
  // ---------------------------------------------------------------------------
  // Lesson/quiz/pattern get a scene illustration (middle scene or last)
  // Game gets the cover image
  // Reward gets the cover image
  const lessonBgImage = useMemo(() => {
    const sceneWithIllustration = [...entity.scenes].reverse().find(s => s.illustration);
    return sceneWithIllustration?.illustration || entity.coverImage;
  }, [entity.scenes, entity.coverImage]);

  // ---------------------------------------------------------------------------
  // Audio manifest — built from entity.assets.audio
  // ---------------------------------------------------------------------------
  const audioManifest: AudioManifest = useMemo(() => {
    if (!entity.assets?.audio) return {};
    const manifest: AudioManifest = {};
    if (entity.assets.audio.music) {
      manifest['music'] = { path: entity.assets.audio.music, volume: 0.3 };
    }
    for (const [key, url] of Object.entries(entity.assets.audio.sfx)) {
      manifest[key] = { path: url, volume: 0.5 };
    }
    return manifest;
  }, [entity.assets?.audio]);

  // ---------------------------------------------------------------------------
  // SFX helper
  // ---------------------------------------------------------------------------
  const playSfx = useCallback((key: string) => {
    emit('UI:PLAY_SOUND', { key });
  }, [emit]);

  // ---------------------------------------------------------------------------
  // IntersectionObserver for active section tracking
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.sectionIndex);
            if (!isNaN(index)) {
              setActiveSection(index);
            }
          }
        }
      },
      {
        root: container,
        threshold: 0.5,
      },
    );

    for (const [, el] of sectionRefs.current) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionCount]);

  // ---------------------------------------------------------------------------
  // Callbacks
  // ---------------------------------------------------------------------------
  const handleTryItAnswer = useCallback((correct: boolean) => {
    setTryItAnswered(true);
    playSfx(correct ? 'correctAnswer' : 'wrongAnswer');
  }, [playSfx]);

  const handleGameComplete = useCallback((result: GameResult) => {
    setGameResult(result);
    setBattleDefeated(false);
    playSfx('gameComplete');
    emit('UI:STORY_GAME_COMPLETE', { storyId: entity.id, result });
    // Scroll to reward section
    const rewardIdx = sectionCount - 1;
    const rewardEl = sectionRefs.current.get(rewardIdx);
    if (rewardEl) {
      rewardEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, [entity.id, emit, playSfx, sectionCount]);

  const handleRetryGame = useCallback(() => {
    setBattleDefeated(false);
    setGameResult(undefined);
    emit('UI:STORY_START_GAME', { storyId: entity.id, retry: true });
  }, [entity.id, emit]);

  const handleFinish = useCallback(() => {
    emit('UI:STORY_FINISH', { storyId: entity.id });
  }, [entity.id, emit]);

  const handleShare = useCallback(() => {
    emit('UI:STORY_SHARE', { storyId: entity.id });
  }, [entity.id, emit]);

  // ---------------------------------------------------------------------------
  // Start background music when story mounts
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (entity.assets?.audio?.music) {
      emit('UI:CHANGE_MUSIC', { key: 'music' });
    }
    return () => {
      emit('UI:STOP_MUSIC', {});
    };
  }, [entity.assets?.audio?.music, emit]);

  // -------------------------------------------------------------------------
  // Game completion listeners
  // -------------------------------------------------------------------------

  useEffect(() => {
    const unsub = on('UI:STORY_GAME_TIER_COMPLETE', (event) => {
      if (event.payload?.success) {
        const score = typeof event.payload.score === 'number' ? event.payload.score : 100;
        const time = typeof event.payload.time === 'number' ? event.payload.time : 0;
        const attempts = typeof event.payload.attempts === 'number' ? event.payload.attempts : 1;
        handleGameComplete({ score, time, attempts });
      }
    });
    return unsub;
  }, [on, handleGameComplete]);

  useEffect(() => {
    const unsub = on('UI:CHALLENGE_TIER_COMPLETE', (event) => {
      if (event.payload?.success) {
        const score = typeof event.payload.score === 'number' ? event.payload.score : 100;
        const time = typeof event.payload.time === 'number' ? event.payload.time : 0;
        const attempts = typeof event.payload.attempts === 'number' ? event.payload.attempts : 1;
        handleGameComplete({ score, time, attempts });
      }
    });
    return unsub;
  }, [on, handleGameComplete]);

  useEffect(() => {
    const unsub = on('UI:BATTLE_COMPLETE', (event) => {
      const score = typeof event.payload?.score === 'number' ? event.payload.score : 100;
      const time = typeof event.payload?.time === 'number' ? event.payload.time : 0;
      handleGameComplete({ score, time, attempts: 1 });
    });
    return unsub;
  }, [on, handleGameComplete]);

  useEffect(() => {
    const unsub = on('UI:BATTLE_DEFEAT', () => {
      setBattleDefeated(true);
    });
    return unsub;
  }, [on]);

  useEffect(() => {
    const unsub = on('UI:ADVENTURE_GOAL_REACHED', (event) => {
      const score = typeof event.payload?.score === 'number' ? event.payload.score : 100;
      const time = typeof event.payload?.time === 'number' ? event.payload.time : 0;
      handleGameComplete({ score, time, attempts: 1 });
    });
    return unsub;
  }, [on, handleGameComplete]);

  useEffect(() => {
    const unsub = on('UI:SIMULATION_COMPLETE', (event) => {
      const score = typeof event.payload?.score === 'number' ? event.payload.score : 100;
      const time = typeof event.payload?.time === 'number' ? event.payload.time : 0;
      handleGameComplete({ score, time, attempts: 1 });
    });
    return unsub;
  }, [on, handleGameComplete]);

  // -------------------------------------------------------------------------
  // Section ref setter
  // -------------------------------------------------------------------------
  const setSectionRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    if (el) {
      sectionRefs.current.set(index, el);
    } else {
      sectionRefs.current.delete(index);
    }
  }, []);

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  let sectionIdx = 0;

  // Sections handle their own full-height layout via minHeight: 100vh
  const scrollSectionClass = 'min-h-screen snap-start';
  const gameIdx = sectionCount - 2;
  const rewardIdx = sectionCount - 1;

  return (
    <GameAudioProvider manifest={audioManifest}>
      <Box className={`h-screen relative ${className}`}>
        {/* Audio toggle — fixed top-right */}
        <Box className="fixed top-4 right-4 z-20">
          <GameAudioToggle size="sm" />
        </Box>

        {/* Side dot indicators — fixed left */}
        <VStack gap="xs" className="fixed left-3 top-1/2 -translate-y-1/2 z-20">
          {Array.from({ length: sectionCount }, (_, i) => (
            <Box
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeSection
                  ? 'bg-white scale-125 shadow-[0_0_4px_rgba(255,255,255,0.6)]'
                  : 'bg-white/40'
              }`}
            />
          ))}
        </VStack>

        {/* Scroll container */}
        <Box
          ref={scrollContainerRef}
          className="h-full overflow-y-auto snap-y snap-mandatory scroll-smooth"
        >
          {/* ── Hook section ───────────────────────────────── */}
          <Box
            ref={setSectionRef(sectionIdx)}
            data-section-index={sectionIdx}
            className={scrollSectionClass}
          >
            <StoryHookView
              hookQuestion={entity.hookQuestion}
              hookNarrative={entity.hookNarrative}
              title={entity.title}
              domain={entity.domain}
              difficulty={entity.difficulty}
              duration={entity.duration}
              coverImage={entity.coverImage}
              gameType={entity.gameType}
              className="w-full"
            />
          </Box>

          {/* ── Scene sections ─────────────────────────────── */}
          {entity.scenes.map((scene, i) => {
            sectionIdx++;
            return (
              <Box
                key={`scene-${i}`}
                ref={setSectionRef(sectionIdx)}
                data-section-index={sectionIdx}
                className={scrollSectionClass}
              >
                <StorySceneCard
                  scene={scene}
                  sceneNumber={i + 1}
                  totalScenes={entity.scenes.length}
                  className="w-full"
                />
              </Box>
            );
          })}

          {/* ── Lesson: Principle + Explanation ─────────────── */}
          {(() => { sectionIdx++; return null; })()}
          <Box
            ref={setSectionRef(sectionIdx)}
            data-section-index={sectionIdx}
            className={scrollSectionClass}
          >
            <StoryLessonPrincipleView
              principle={entity.principle}
              explanation={entity.explanation}
              backgroundImage={lessonBgImage}
              className="w-full"
            />
          </Box>

          {/* ── Lesson: Quiz ───────────────────────────────── */}
          {(() => { sectionIdx++; return null; })()}
          <Box
            ref={setSectionRef(sectionIdx)}
            data-section-index={sectionIdx}
            className={scrollSectionClass}
          >
            <StoryLessonQuizView
              tryItQuestion={entity.tryItQuestion}
              tryItOptions={entity.tryItOptions}
              tryItCorrectIndex={entity.tryItCorrectIndex}
              onTryItAnswer={handleTryItAnswer}
              backgroundImage={lessonBgImage}
              className="w-full"
            />
          </Box>

          {/* ── Lesson: Pattern (deeper insight) ───────────── */}
          {(() => { sectionIdx++; return null; })()}
          <Box
            ref={setSectionRef(sectionIdx)}
            data-section-index={sectionIdx}
            className={scrollSectionClass}
          >
            <StoryLessonPatternView
              pattern={entity.pattern}
              backgroundImage={lessonBgImage}
              className="w-full"
            />
          </Box>

          {/* ── Game section ─────────────────────────────────── */}
          <Box
            ref={setSectionRef(gameIdx)}
            data-section-index={gameIdx}
            className="min-h-screen snap-start"
          >
            <StoryGameView
              gameType={entity.gameType}
              gameConfig={entity.gameConfig}
              assets={entity.assets}
              backgroundImage={entity.coverImage}
            />
            {battleDefeated && (
              <HStack gap="sm" justify="center" className="py-4">
                <Typography variant="body" className="text-red-400">
                  {t('story.battleDefeat')}
                </Typography>
                <Button variant="secondary" size="md" onClick={handleRetryGame}>
                  <RotateCcw size={16} />
                  {t('story.retry')}
                </Button>
              </HStack>
            )}
          </Box>

          {/* ── Reward section ─────────────────────────────── */}
          <Box
            ref={setSectionRef(rewardIdx)}
            data-section-index={rewardIdx}
            className={scrollSectionClass}
          >
            <StoryRewardView
              resolution={entity.resolution}
              learningPoints={entity.learningPoints}
              gameResult={gameResult}
              coverImage={entity.coverImage}
              onShare={handleShare}
              onExploreMore={handleFinish}
              className="w-full"
            />
          </Box>
        </Box>
      </Box>
    </GameAudioProvider>
  );
}

KnowledgeStoryBoard.displayName = 'KnowledgeStoryBoard';
