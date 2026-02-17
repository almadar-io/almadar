/**
 * BattleBoard
 *
 * Core game-logic organism extracted from BattleTemplate.
 * Handles turn-based phase management, movement animation, valid-move/attack-target
 * calculation, screen shake/flash, and game-over detection.
 *
 * Accepts a single `entity` prop (BattleEntity) containing all board data,
 * plus optional render-prop slots, callback overrides, and declarative event props
 * that emit via `useEventBus()`.
 *
 * @packageDocumentation
 */

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { cn } from '../../../lib/cn';
import { useEventBus } from '../../../hooks/useEventBus';
import IsometricCanvas from './IsometricCanvas';
import type {
    IsometricTile,
    IsometricUnit,
    IsometricFeature,
} from './types/isometric';
import type { ResolvedFrame } from './types/spriteAnimation';
import { isoToScreen, TILE_WIDTH, FLOOR_HEIGHT } from './utils/isometric';

// =============================================================================
// Types
// =============================================================================

/** Battle phases an encounter walks through */
export type BattlePhase =
    | 'observation'
    | 'selection'
    | 'movement'
    | 'action'
    | 'enemy_turn'
    | 'game_over';

/** A unit participating in battle */
export interface BattleUnit {
    id: string;
    name: string;
    unitType?: string;
    heroId?: string;
    sprite?: string;
    team: 'player' | 'enemy';
    position: { x: number; y: number };
    health: number;
    maxHealth: number;
    movement: number;
    attack: number;
    defense: number;
    traits?: {
        name: string;
        currentState: string;
        states: string[];
        cooldown?: number;
    }[];
}

/** Minimal tile for map generation */
export interface BattleTile {
    x: number;
    y: number;
    terrain: string;
    terrainSprite?: string;
}

/** Entity prop containing all board data */
export interface BattleEntity {
    id: string;
    initialUnits: BattleUnit[];
    tiles: IsometricTile[];
    features?: IsometricFeature[];
    boardWidth?: number;
    boardHeight?: number;
    assetManifest?: {
        baseUrl: string;
        terrains?: Record<string, string>;
        units?: Record<string, string>;
        features?: Record<string, string>;
        effects?: Record<string, string>;
    };
    backgroundImage?: string;
}

/** Context exposed to render-prop slots */
export interface BattleSlotContext {
    phase: BattlePhase;
    turn: number;
    selectedUnit: BattleUnit | null;
    hoveredUnit: BattleUnit | null;
    playerUnits: BattleUnit[];
    enemyUnits: BattleUnit[];
    gameResult: 'victory' | 'defeat' | null;
    onEndTurn: () => void;
    onCancel: () => void;
    onReset: () => void;
    attackTargets: Array<{ x: number; y: number }>;
    /** Resolve screen position of a tile for overlays */
    tileToScreen: (x: number, y: number) => { x: number; y: number };
}

export interface BattleBoardProps {
    /** Entity containing all board data */
    entity: BattleEntity;

    /** Canvas render scale */
    scale?: number;
    /** Unit draw-size multiplier */
    unitScale?: number;

    // -- Slots --
    /** Header area -- receives battle context */
    header?: (ctx: BattleSlotContext) => React.ReactNode;
    /** Sidebar content (combat log, unit roster, etc.) */
    sidebar?: (ctx: BattleSlotContext) => React.ReactNode;
    /** Floating action buttons */
    actions?: (ctx: BattleSlotContext) => React.ReactNode;
    /** Floating overlays above the canvas (damage popups, tooltips) */
    overlay?: (ctx: BattleSlotContext) => React.ReactNode;
    /** Game-over screen overlay */
    gameOverOverlay?: (ctx: BattleSlotContext) => React.ReactNode;

    // -- Callbacks --
    /** Called when a unit attacks another */
    onAttack?: (attacker: BattleUnit, target: BattleUnit, damage: number) => void;
    /** Called when battle ends */
    onGameEnd?: (result: 'victory' | 'defeat') => void;
    /** Called after a unit moves */
    onUnitMove?: (unit: BattleUnit, to: { x: number; y: number }) => void;
    /** Custom combat damage calculator */
    calculateDamage?: (attacker: BattleUnit, target: BattleUnit) => number;

    // -- Canvas pass-through --
    onDrawEffects?: (ctx: CanvasRenderingContext2D, timestamp: number) => void;
    hasActiveEffects?: boolean;
    effectSpriteUrls?: string[];
    resolveUnitFrame?: (unitId: string) => ResolvedFrame | null;

    // -- Declarative event props --
    /** Emits UI:{tileClickEvent} with { x, y } on tile click */
    tileClickEvent?: string;
    /** Emits UI:{unitClickEvent} with { unitId } on unit click */
    unitClickEvent?: string;
    /** Emits UI:{endTurnEvent} with {} on end turn */
    endTurnEvent?: string;
    /** Emits UI:{cancelEvent} with {} on cancel */
    cancelEvent?: string;
    /** Emits UI:{gameEndEvent} with { result } on game end */
    gameEndEvent?: string;
    /** Emits UI:{playAgainEvent} with {} on play again / reset */
    playAgainEvent?: string;
    /** Emits UI:{attackEvent} with { attackerId, targetId, damage } on attack */
    attackEvent?: string;

    className?: string;
}

// =============================================================================
// Component
// =============================================================================

export function BattleBoard({
    entity,
    scale = 0.45,
    unitScale = 1,
    header,
    sidebar,
    actions,
    overlay,
    gameOverOverlay,
    onAttack,
    onGameEnd,
    onUnitMove,
    calculateDamage,
    onDrawEffects,
    hasActiveEffects = false,
    effectSpriteUrls = [],
    resolveUnitFrame,
    tileClickEvent,
    unitClickEvent,
    endTurnEvent,
    cancelEvent,
    gameEndEvent,
    playAgainEvent,
    attackEvent,
    className,
}: BattleBoardProps): JSX.Element {
    // -- Unpack entity --
    const initialUnits = entity.initialUnits;
    const tiles = entity.tiles;
    const features = entity.features ?? [];
    const boardWidth = entity.boardWidth ?? 8;
    const boardHeight = entity.boardHeight ?? 6;
    const assetManifest = entity.assetManifest;
    const backgroundImage = entity.backgroundImage;

    // -- Event bus --
    const eventBus = useEventBus();

    // ── Game state ──────────────────────────────────────────────────────────
    const [units, setUnits] = useState<BattleUnit[]>(initialUnits);
    const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
    const [hoveredTile, setHoveredTile] = useState<{ x: number; y: number } | null>(null);
    const [currentPhase, setCurrentPhase] = useState<BattlePhase>('observation');
    const [currentTurn, setCurrentTurn] = useState(1);
    const [gameResult, setGameResult] = useState<'victory' | 'defeat' | null>(null);
    const [isShaking, setIsShaking] = useState(false);

    // ── Derived state ───────────────────────────────────────────────────────
    const selectedUnit = useMemo(
        () => units.find(u => u.id === selectedUnitId) ?? null,
        [units, selectedUnitId],
    );

    const hoveredUnit = useMemo(() => {
        if (!hoveredTile) return null;
        return units.find(
            u => u.position.x === hoveredTile.x && u.position.y === hoveredTile.y && u.health > 0,
        ) ?? null;
    }, [hoveredTile, units]);

    const playerUnits = useMemo(() => units.filter(u => u.team === 'player' && u.health > 0), [units]);
    const enemyUnits = useMemo(() => units.filter(u => u.team === 'enemy' && u.health > 0), [units]);

    // ── Valid moves ─────────────────────────────────────────────────────────
    const validMoves = useMemo(() => {
        if (!selectedUnit || currentPhase !== 'movement') return [];
        const moves: Array<{ x: number; y: number }> = [];
        const range = selectedUnit.movement;
        for (let dy = -range; dy <= range; dy++) {
            for (let dx = -range; dx <= range; dx++) {
                const nx = selectedUnit.position.x + dx;
                const ny = selectedUnit.position.y + dy;
                const dist = Math.abs(dx) + Math.abs(dy);
                if (
                    dist > 0 &&
                    dist <= range &&
                    nx >= 0 && nx < boardWidth &&
                    ny >= 0 && ny < boardHeight &&
                    !units.some(u => u.position.x === nx && u.position.y === ny && u.health > 0)
                ) {
                    moves.push({ x: nx, y: ny });
                }
            }
        }
        return moves;
    }, [selectedUnit, currentPhase, units, boardWidth, boardHeight]);

    // ── Attack Targets ──────────────────────────────────────────────────────
    const attackTargets = useMemo(() => {
        if (!selectedUnit || currentPhase !== 'action') return [];
        return units
            .filter(u => u.team !== selectedUnit.team && u.health > 0)
            .filter(u => {
                const dx = Math.abs(u.position.x - selectedUnit.position.x);
                const dy = Math.abs(u.position.y - selectedUnit.position.y);
                return dx <= 1 && dy <= 1 && dx + dy > 0;
            })
            .map(u => u.position);
    }, [selectedUnit, currentPhase, units]);

    // ── Movement animation ──────────────────────────────────────────────────
    interface MovementAnim {
        unitId: string;
        from: { x: number; y: number };
        to: { x: number; y: number };
        elapsed: number;
        duration: number;
        onComplete: () => void;
    }

    const MOVE_SPEED_MS_PER_TILE = 300;
    const movementAnimRef = useRef<MovementAnim | null>(null);
    const [movingPositions, setMovingPositions] = useState<Map<string, { x: number; y: number }>>(new Map());

    const startMoveAnimation = useCallback((
        unitId: string,
        from: { x: number; y: number },
        to: { x: number; y: number },
        onComplete: () => void,
    ) => {
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const dist = Math.max(Math.abs(dx), Math.abs(dy));
        const duration = dist * MOVE_SPEED_MS_PER_TILE;
        movementAnimRef.current = { unitId, from, to, elapsed: 0, duration, onComplete };
    }, []);

    // ── Tick movement animation (~60fps) ────────────────────────────────────
    useEffect(() => {
        const interval = setInterval(() => {
            const anim = movementAnimRef.current;
            if (!anim) return;

            anim.elapsed += 16;
            const t = Math.min(anim.elapsed / anim.duration, 1);
            const eased = 1 - (1 - t) * (1 - t); // ease-out quadratic
            const cx = anim.from.x + (anim.to.x - anim.from.x) * eased;
            const cy = anim.from.y + (anim.to.y - anim.from.y) * eased;

            if (t >= 1) {
                movementAnimRef.current = null;
                setMovingPositions(prev => {
                    const next = new Map(prev);
                    next.delete(anim.unitId);
                    return next;
                });
                anim.onComplete();
            } else {
                setMovingPositions(prev => {
                    const next = new Map(prev);
                    next.set(anim.unitId, { x: cx, y: cy });
                    return next;
                });
            }
        }, 16);
        return () => clearInterval(interval);
    }, []);

    // ── Visual units (with interpolated positions) ──────────────────────────
    const isoUnits: IsometricUnit[] = useMemo(() => {
        return units
            .filter(u => u.health > 0)
            .map(unit => {
                const pos = movingPositions.get(unit.id) ?? unit.position;
                return {
                    id: unit.id,
                    position: pos,
                    name: unit.name,
                    team: unit.team,
                    health: unit.health,
                    maxHealth: unit.maxHealth,
                    unitType: unit.unitType,
                    heroId: unit.heroId,
                    sprite: unit.sprite,
                    traits: unit.traits?.map(t => ({
                        name: t.name,
                        currentState: t.currentState,
                        states: t.states,
                        cooldown: t.cooldown ?? 0,
                    })),
                };
            });
    }, [units, movingPositions]);

    // ── Tile-to-screen helper ───────────────────────────────────────────────
    const maxY = Math.max(...tiles.map(t => t.y), 0);
    const baseOffsetX = (maxY + 1) * (TILE_WIDTH * scale / 2);
    const tileToScreen = useCallback(
        (tx: number, ty: number) => isoToScreen(tx, ty, scale, baseOffsetX),
        [scale, baseOffsetX],
    );

    // ── Check game end ──────────────────────────────────────────────────────
    const checkGameEnd = useCallback(() => {
        const pa = units.filter(u => u.team === 'player' && u.health > 0);
        const ea = units.filter(u => u.team === 'enemy' && u.health > 0);
        if (pa.length === 0) {
            setGameResult('defeat');
            setCurrentPhase('game_over');
            onGameEnd?.('defeat');
            if (gameEndEvent) {
                eventBus.emit(`UI:${gameEndEvent}`, { result: 'defeat' });
            }
        } else if (ea.length === 0) {
            setGameResult('victory');
            setCurrentPhase('game_over');
            onGameEnd?.('victory');
            if (gameEndEvent) {
                eventBus.emit(`UI:${gameEndEvent}`, { result: 'victory' });
            }
        }
    }, [units, onGameEnd, gameEndEvent, eventBus]);

    // ── Handle unit click ───────────────────────────────────────────────────
    const handleUnitClick = useCallback((unitId: string) => {
        const unit = units.find(u => u.id === unitId);
        if (!unit) return;

        if (unitClickEvent) {
            eventBus.emit(`UI:${unitClickEvent}`, { unitId });
        }

        if (currentPhase === 'observation' || currentPhase === 'selection') {
            if (unit.team === 'player') {
                setSelectedUnitId(unitId);
                setCurrentPhase('movement');
            }
        } else if (currentPhase === 'action' && selectedUnit) {
            if (
                unit.team === 'enemy' &&
                attackTargets.some(t => t.x === unit.position.x && t.y === unit.position.y)
            ) {
                const damage = calculateDamage
                    ? calculateDamage(selectedUnit, unit)
                    : Math.max(1, selectedUnit.attack - unit.defense);

                const newHealth = Math.max(0, unit.health - damage);
                setUnits(prev => prev.map(u => (u.id === unit.id ? { ...u, health: newHealth } : u)));

                // Screen shake on hit
                setIsShaking(true);
                setTimeout(() => setIsShaking(false), 300);

                onAttack?.(selectedUnit, unit, damage);
                if (attackEvent) {
                    eventBus.emit(`UI:${attackEvent}`, {
                        attackerId: selectedUnit.id,
                        targetId: unit.id,
                        damage,
                    });
                }

                setSelectedUnitId(null);
                setCurrentPhase('observation');
                setCurrentTurn(t => t + 1);

                setTimeout(checkGameEnd, 100);
            }
        }
    }, [currentPhase, selectedUnit, attackTargets, units, checkGameEnd, onAttack, calculateDamage, unitClickEvent, attackEvent, eventBus]);

    // ── Handle tile click (movement) ────────────────────────────────────────
    const handleTileClick = useCallback((x: number, y: number) => {
        if (tileClickEvent) {
            eventBus.emit(`UI:${tileClickEvent}`, { x, y });
        }

        if (currentPhase === 'movement' && selectedUnit) {
            if (movementAnimRef.current) return; // block during animation
            if (validMoves.some(m => m.x === x && m.y === y)) {
                const from = { ...selectedUnit.position };
                const to = { x, y };
                startMoveAnimation(selectedUnit.id, from, to, () => {
                    setUnits(prev =>
                        prev.map(u => (u.id === selectedUnitId ? { ...u, position: { x, y } } : u)),
                    );
                    onUnitMove?.(selectedUnit, to);
                    setCurrentPhase('action');
                });
            }
        }
    }, [currentPhase, selectedUnit, selectedUnitId, validMoves, startMoveAnimation, onUnitMove, tileClickEvent, eventBus]);

    // ── Phase controls ──────────────────────────────────────────────────────
    const handleEndTurn = useCallback(() => {
        setSelectedUnitId(null);
        setCurrentPhase('observation');
        setCurrentTurn(t => t + 1);
        if (endTurnEvent) {
            eventBus.emit(`UI:${endTurnEvent}`, {});
        }
    }, [endTurnEvent, eventBus]);

    const handleCancel = useCallback(() => {
        setSelectedUnitId(null);
        setCurrentPhase('observation');
        if (cancelEvent) {
            eventBus.emit(`UI:${cancelEvent}`, {});
        }
    }, [cancelEvent, eventBus]);

    const handleReset = useCallback(() => {
        setUnits(initialUnits);
        setSelectedUnitId(null);
        setCurrentPhase('observation');
        setCurrentTurn(1);
        setGameResult(null);
        if (playAgainEvent) {
            eventBus.emit(`UI:${playAgainEvent}`, {});
        }
    }, [initialUnits, playAgainEvent, eventBus]);

    // ── Slot context ────────────────────────────────────────────────────────
    const ctx: BattleSlotContext = useMemo(
        () => ({
            phase: currentPhase,
            turn: currentTurn,
            selectedUnit,
            hoveredUnit,
            playerUnits,
            enemyUnits,
            gameResult,
            onEndTurn: handleEndTurn,
            onCancel: handleCancel,
            onReset: handleReset,
            attackTargets,
            tileToScreen,
        }),
        [
            currentPhase, currentTurn, selectedUnit, hoveredUnit,
            playerUnits, enemyUnits, gameResult,
            handleEndTurn, handleCancel, handleReset, attackTargets, tileToScreen,
        ],
    );

    // ── Shake style ─────────────────────────────────────────────────────────
    const shakeStyle: React.CSSProperties = isShaking
        ? { animation: 'battle-shake 0.3s ease-in-out' }
        : {};

    return (
        <div className={cn('battle-board relative flex flex-col min-h-[600px] bg-[var(--color-background)]', className)}>
            {/* Shake keyframes */}
            <style>{`
                @keyframes battle-shake {
                    0%, 100% { transform: translate(0, 0); }
                    10% { transform: translate(-3px, -2px); }
                    20% { transform: translate(3px, 1px); }
                    30% { transform: translate(-2px, 3px); }
                    40% { transform: translate(2px, -1px); }
                    50% { transform: translate(-3px, 2px); }
                    60% { transform: translate(3px, -2px); }
                    70% { transform: translate(-1px, 3px); }
                    80% { transform: translate(2px, -3px); }
                    90% { transform: translate(-2px, 1px); }
                }
            `}</style>

            {/* Header slot */}
            {header && <div className="p-4">{header(ctx)}</div>}

            {/* Main area */}
            <div className="flex flex-1 gap-4 p-4 pt-0">
                {/* Canvas column */}
                <div className="relative flex-1" style={shakeStyle}>
                    <IsometricCanvas
                        tiles={tiles}
                        units={isoUnits}
                        features={features}
                        selectedUnitId={selectedUnitId}
                        validMoves={validMoves}
                        attackTargets={attackTargets}
                        hoveredTile={hoveredTile}
                        onTileClick={handleTileClick}
                        onUnitClick={handleUnitClick}
                        onTileHover={(x, y) => setHoveredTile({ x, y })}
                        onTileLeave={() => setHoveredTile(null)}
                        scale={scale}
                        assetBaseUrl={assetManifest?.baseUrl}
                        assetManifest={assetManifest}
                        backgroundImage={backgroundImage}
                        onDrawEffects={onDrawEffects}
                        hasActiveEffects={hasActiveEffects}
                        effectSpriteUrls={effectSpriteUrls}
                        resolveUnitFrame={resolveUnitFrame}
                        unitScale={unitScale}
                    />

                    {/* Overlay slot (damage popups, tooltips, etc.) */}
                    {overlay && overlay(ctx)}
                </div>

                {/* Sidebar slot */}
                {sidebar && (
                    <div className="w-80 shrink-0">
                        {sidebar(ctx)}
                    </div>
                )}
            </div>

            {/* Floating actions slot */}
            {actions
                ? actions(ctx)
                : currentPhase !== 'game_over' && (
                    <div className="fixed bottom-6 right-6 z-50 flex gap-2">
                        {(currentPhase === 'movement' || currentPhase === 'action') && (
                            <button
                                className="px-4 py-2 rounded-lg bg-[var(--color-surface)] text-[var(--color-foreground)] border border-[var(--color-border)] shadow-xl hover:opacity-90"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white shadow-xl hover:opacity-90"
                            onClick={handleEndTurn}
                        >
                            End Turn
                        </button>
                    </div>
                )}

            {/* Game Over overlay */}
            {gameResult && (
                gameOverOverlay
                    ? gameOverOverlay(ctx)
                    : (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-xl">
                            <div className="text-center space-y-6 p-8">
                                <h2
                                    className={cn(
                                        'text-4xl font-black tracking-widest uppercase',
                                        gameResult === 'victory' ? 'text-yellow-400' : 'text-red-500',
                                    )}
                                >
                                    {gameResult === 'victory' ? 'Victory!' : 'Defeat'}
                                </h2>
                                <p className="text-gray-300">
                                    Turns played: {currentTurn}
                                </p>
                                <button
                                    className="px-8 py-3 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:opacity-90"
                                    onClick={handleReset}
                                >
                                    Play Again
                                </button>
                            </div>
                        </div>
                    )
            )}
        </div>
    );
}

BattleBoard.displayName = 'BattleBoard';

export default BattleBoard;
