/**
 * StoryGameView Molecule
 *
 * Dispatches to the appropriate game board based on gameType.
 * Supports all StoryGameType variants:
 *   Puzzle boards (narrow): sequencer, simulator, classifier, builder, debugger, negotiator, event-handler, state-architect
 *   Full-width boards: battle, adventure, physics-lab
 *
 * When a backgroundImage is provided, the game board sits on a cinematic
 * blurred background. Full-width boards (battle/adventure/physics-lab)
 * skip the cinematic wrapper since they render their own full-screen UI.
 *
 * Event Contract:
 * - No events emitted directly (game boards emit their own events)
 * - entityAware: false
 */

import React, { useState, useCallback } from 'react';
import {
  Box,
  HStack,
  VStack,
  Typography,
  EmptyState,
  useTranslate,
  useEventBus,
  useEventListener,
  SequencerBoard,
  SimulatorBoard,
  ClassifierBoard,
  BuilderBoard,
  DebuggerBoard,
  NegotiatorBoard,
  EventHandlerBoard,
  StateArchitectBoard,
  BattleBoard,
  WorldMapBoard,
  SimulationCanvas,
  SimulationControls,
  SimulationGraph,
} from '@almadar/ui';
import type { WorldMapSlotContext } from '@almadar/ui';
import type {
  SequencerPuzzleEntity,
  SimulatorPuzzleEntity,
  ClassifierPuzzleEntity,
  BuilderPuzzleEntity,
  DebuggerPuzzleEntity,
  NegotiatorPuzzleEntity,
  EventHandlerPuzzleEntity,
  StateArchitectPuzzleEntity,
  BattleEntity,
  WorldMapEntity,
  PhysicsPreset,
  MeasurementPoint,
} from '@almadar/ui';
import { Gamepad2 } from 'lucide-react';
import type { StoryGameType, StoryAssetConfig } from '../../types/knowledge';
import { FULL_WIDTH_GAME_TYPES } from '../../types/knowledge';

// ---------------------------------------------------------------------------
// Physics Lab Config (composes PhysicsPreset with target condition)
// ---------------------------------------------------------------------------

export interface PhysicsLabConfig {
  preset: PhysicsPreset;
  targetLabel: string;
  targetValue: number;
  tolerance: number;
  measurementLabel: string;
  measurementUnit: string;
}

// ---------------------------------------------------------------------------
// GameConfigEntity union — all entity types the game step can receive
// ---------------------------------------------------------------------------

/** Union of all supported game entity types. */
export type GameConfigEntity =
  | SequencerPuzzleEntity
  | SimulatorPuzzleEntity
  | ClassifierPuzzleEntity
  | BuilderPuzzleEntity
  | DebuggerPuzzleEntity
  | NegotiatorPuzzleEntity
  | EventHandlerPuzzleEntity
  | StateArchitectPuzzleEntity
  | BattleEntity
  | WorldMapEntity
  | PhysicsLabConfig;

export interface StoryGameViewProps {
  gameType: StoryGameType | string;
  gameConfig: GameConfigEntity;
  /** Schema-owned assets (terrain, effects, audio, worldMapFeatures) */
  assets?: StoryAssetConfig;
  /** Background image for cinematic wrapper (puzzle boards only) */
  backgroundImage?: string;
  completeEvent?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Physics Lab sub-component (composes SimulationCanvas + Controls + Graph)
// ---------------------------------------------------------------------------

function PhysicsLabBoard({ config }: { config: PhysicsLabConfig }): React.JSX.Element {
  const { emit } = useEventBus();
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [params, setParams] = useState(config.preset.parameters);
  const [measurements, setMeasurements] = useState<MeasurementPoint[]>([]);

  const preset: PhysicsPreset = { ...config.preset, parameters: params };

  const handleParameterChange = useCallback((name: string, value: number) => {
    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], value },
    }));
  }, []);

  const handleReset = useCallback(() => {
    setRunning(false);
    setMeasurements([]);
    setParams(config.preset.parameters);
  }, [config.preset.parameters]);

  const handleStep = useCallback(() => {
    // SimulationCanvas handles its own physics step; we just record a measurement placeholder
    const latestValue = measurements.length > 0
      ? measurements[measurements.length - 1].value
      : 0;
    const elapsed = measurements.length * 0.016;
    setMeasurements((prev) => [...prev, { time: elapsed, value: latestValue }]);

    // Check target condition
    if (Math.abs(latestValue - config.targetValue) <= config.tolerance) {
      emit('UI:SIMULATION_COMPLETE', {
        targetValue: config.targetValue,
        achievedValue: latestValue,
      });
    }
  }, [measurements, config.targetValue, config.tolerance, emit]);

  return (
    <VStack gap="md" className="w-full">
      <SimulationCanvas
        preset={preset}
        running={running}
        speed={speed}
        className="w-full"
      />
      <SimulationControls
        running={running}
        speed={speed}
        parameters={params}
        onPlay={() => setRunning(true)}
        onPause={() => setRunning(false)}
        onStep={handleStep}
        onReset={handleReset}
        onSpeedChange={setSpeed}
        onParameterChange={handleParameterChange}
      />
      <SimulationGraph
        label={config.measurementLabel}
        unit={config.measurementUnit}
        data={measurements}
        className="w-full"
      />
    </VStack>
  );
}

// ---------------------------------------------------------------------------
// Adventure Board sub-component (wraps WorldMapBoard with goal detection + UI)
// ---------------------------------------------------------------------------

function AdventureBoard({
  entity,
  assets,
  completeEvent,
}: {
  entity: WorldMapEntity;
  assets?: StoryAssetConfig;
  completeEvent: string;
}): React.JSX.Element {
  const { t } = useTranslate();
  const { emit } = useEventBus();

  // GAP-17d: Goal detection — when hero enters a "goal" feature, emit complete
  useEventListener('UI:ADVENTURE_FEATURE_ENTER', (payload) => {
    const data = payload as { heroId?: string; feature?: string };
    if (data.feature === 'goal') {
      emit(completeEvent, { heroId: data.heroId });
    }
  });

  // GAP-17f: Flatten effect sprite URLs
  const effectSpriteUrls = assets?.effects
    ? Object.values(assets.effects).flat()
    : [];

  return (
    <WorldMapBoard
      entity={entity}
      featureEnterEvent="ADVENTURE_FEATURE_ENTER"
      heroMoveEvent="ADVENTURE_HERO_MOVE"
      heroSelectEvent="ADVENTURE_HERO_SELECT"
      effectSpriteUrls={effectSpriteUrls}
      header={adventureHeader(t)}
      overlay={adventureOverlay}
      sidePanel={adventureSidePanel(t)}
    />
  );
}

/** GAP-17e: Header slot — objective indicator */
function adventureHeader(t: (key: string) => string) {
  return (_ctx: WorldMapSlotContext): React.ReactNode => (
    <Box className="py-2 px-4">
      <HStack gap="sm" className="items-center">
        <Box className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-[var(--radius-sm)] px-2 py-0.5">
          <Typography variant="caption" weight="bold">{t('adventure.objective')}</Typography>
        </Box>
        <Typography variant="small" className="text-[var(--color-muted-foreground)]">
          {t('adventure.reachGoal')}
        </Typography>
      </HStack>
    </Box>
  );
}

/** GAP-17e: Overlay slot — hex tooltip on hover */
function adventureOverlay(ctx: WorldMapSlotContext): React.ReactNode {
  if (!ctx.hoveredHex) return null;

  const pos = ctx.tileToScreen(ctx.hoveredHex.x, ctx.hoveredHex.y);

  return (
    <Box
      style={{
        position: 'absolute',
        left: pos.x + 40,
        top: pos.y - 10,
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      <Box className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-3 py-2 shadow-lg">
        <VStack gap="xs">
          <Typography variant="caption" weight="bold" className="capitalize">
            {ctx.hoveredHex.terrain}
          </Typography>
          {ctx.hoveredHex.feature && (
            <Typography variant="caption" className="text-[var(--color-primary)]">
              {ctx.hoveredHex.feature}
            </Typography>
          )}
          {ctx.hoveredHex.passable === false && (
            <Typography variant="caption" className="text-[var(--color-destructive)]">
              Impassable
            </Typography>
          )}
        </VStack>
      </Box>
    </Box>
  );
}

/** GAP-17e: Side panel slot — selected hero info */
function adventureSidePanel(t: (key: string) => string) {
  return (ctx: WorldMapSlotContext): React.ReactNode => {
    if (!ctx.selectedHero) return null;
    return (
      <Box className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] p-4">
        <VStack gap="sm">
          <Typography variant="small" weight="bold">
            {ctx.selectedHero.name}
          </Typography>
          <HStack gap="sm">
            <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
              {t('adventure.movement')}: {ctx.selectedHero.movement}
            </Typography>
            {ctx.selectedHero.level != null && (
              <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
                {t('adventure.level')}: {ctx.selectedHero.level}
              </Typography>
            )}
          </HStack>
        </VStack>
      </Box>
    );
  };
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export const StoryGameView: React.FC<StoryGameViewProps> = ({
  gameType,
  gameConfig,
  assets,
  backgroundImage,
  completeEvent = 'STORY_GAME_TIER_COMPLETE',
  className,
}) => {
  const { t } = useTranslate();

  const isFullWidth = FULL_WIDTH_GAME_TYPES.has(gameType as StoryGameType);

  const renderGameBoard = (): React.ReactNode => {
    switch (gameType) {
      // -- Puzzle boards (narrow layout) --
      case 'sequencer':
        return (
          <SequencerBoard
            entity={gameConfig as SequencerPuzzleEntity}
            completeEvent={completeEvent}
          />
        );
      case 'simulator':
        return (
          <SimulatorBoard
            entity={gameConfig as SimulatorPuzzleEntity}
            completeEvent={completeEvent}
          />
        );
      case 'classifier':
        return (
          <ClassifierBoard
            entity={gameConfig as ClassifierPuzzleEntity}
            completeEvent={completeEvent}
          />
        );
      case 'builder':
        return (
          <BuilderBoard
            entity={gameConfig as BuilderPuzzleEntity}
            completeEvent={completeEvent}
          />
        );
      case 'debugger':
        return (
          <DebuggerBoard
            entity={gameConfig as DebuggerPuzzleEntity}
            completeEvent={completeEvent}
          />
        );
      case 'negotiator':
        return (
          <NegotiatorBoard
            entity={gameConfig as NegotiatorPuzzleEntity}
            completeEvent={completeEvent}
          />
        );
      case 'event-handler':
        return (
          <EventHandlerBoard
            entity={gameConfig as EventHandlerPuzzleEntity}
            completeEvent={completeEvent}
          />
        );
      case 'state-architect':
        return (
          <StateArchitectBoard
            entity={gameConfig as StateArchitectPuzzleEntity}
            completeEvent={completeEvent}
          />
        );

      // -- Full-width boards --
      case 'battle': {
        const battleEntity = gameConfig as BattleEntity;
        if (assets?.terrain && !battleEntity.assetManifest) {
          battleEntity.assetManifest = {
            baseUrl: '',
            terrains: assets.terrain,
          };
        }
        return (
          <BattleBoard
            entity={battleEntity}
            gameEndEvent="UI:BATTLE_COMPLETE"
            effectSpriteUrls={assets?.effects ? Object.values(assets.effects).flat() : []}
          />
        );
      }
      case 'adventure': {
        const worldEntity = gameConfig as WorldMapEntity;
        if (assets && !worldEntity.assetManifest) {
          worldEntity.assetManifest = {
            baseUrl: '',
            terrains: assets.terrain,
            features: assets.worldMapFeatures,
          };
        }
        return (
          <AdventureBoard
            entity={worldEntity}
            assets={assets}
            completeEvent={completeEvent}
          />
        );
      }
      case 'physics-lab':
        return (
          <PhysicsLabBoard config={gameConfig as PhysicsLabConfig} />
        );

      default:
        return (
          <EmptyState
            icon={Gamepad2}
            title={`${gameType} — Coming Soon`}
            description={t('story.step.game')}
          />
        );
    }
  };

  // Full-width boards skip the cinematic wrapper
  if (isFullWidth) {
    return (
      <Box className={className}>
        <VStack gap="md" className="w-full py-6 px-4">
          <Typography
            variant="small"
            weight="bold"
            className="uppercase tracking-wider text-[var(--color-muted-foreground)] text-center"
          >
            {t('story.step.game')}
          </Typography>
          {renderGameBoard()}
        </VStack>
      </Box>
    );
  }

  // Puzzle boards — cinematic background when available
  if (backgroundImage) {
    return (
      <Box className={className} style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={backgroundImage}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(6px) brightness(0.3)',
          }}
        />
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.8) 100%)',
          }}
        />
        <Box style={{ position: 'relative' }} className="py-6 px-4">
          <VStack gap="md" className="max-w-2xl mx-auto">
            <Typography
              variant="small"
              weight="bold"
              className="uppercase tracking-wider text-white/60 text-center"
            >
              {t('story.step.game')}
            </Typography>
            {renderGameBoard()}
          </VStack>
        </Box>
      </Box>
    );
  }

  // Fallback — no background
  return (
    <Box className={className}>
      <VStack gap="md" className="max-w-2xl mx-auto py-6 px-4">
        <Typography
          variant="small"
          weight="bold"
          className="uppercase tracking-wider text-[var(--color-muted-foreground)] text-center"
        >
          {t('story.step.game')}
        </Typography>
        {renderGameBoard()}
      </VStack>
    </Box>
  );
};

StoryGameView.displayName = 'StoryGameView';
