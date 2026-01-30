/**
 * CollisionDetector - Invisible component that runs collision detection
 *
 * Rendered by Collision2DSystem trait via render_ui effect.
 * Runs AABB collision checks each frame and emits collision events.
 *
 * This follows the closed circuit pattern:
 * Trait (render_ui) → Component (CollisionDetector) → Events (COLLISION_*) → Trait (state machine)
 *
 * @generated pattern component
 */

import { useEffect, useRef, useCallback } from 'react';
import { useEventBus, type EventBusContextType } from '../../../hooks/useEventBus';
import { getByType, type Entity } from '../../../stores/entityStore';

/**
 * Collision rule configuration
 */
export interface CollisionRule {
  /** Entity type A */
  typeA: string;
  /** Entity type B */
  typeB: string;
  /** Whether this is a trigger (pass-through) or solid collision */
  isTrigger?: boolean;
  /** Custom event name to emit (defaults to COLLISION_ENTER/TRIGGER_ENTER) */
  event?: string;
}

/**
 * CollisionDetector props
 */
export interface CollisionDetectorProps {
  /** Collision detection algorithm */
  algorithm?: 'aabb' | 'circle';
  /** Collision rules to check */
  rules?: readonly CollisionRule[];
  /** Whether collision detection is enabled */
  enabled?: boolean;
  /** Event bus for emitting events (optional, uses hook if not provided) */
  eventBus?: EventBusContextType;
}

/**
 * Default collision rules for platformer
 */
const DEFAULT_RULES: CollisionRule[] = [
  { typeA: 'Player', typeB: 'Platform', isTrigger: false },
  { typeA: 'Player', typeB: 'Coin', isTrigger: true, event: 'COLLECT' },
  { typeA: 'Player', typeB: 'Enemy', isTrigger: true, event: 'TAKE_DAMAGE' },
];

/**
 * AABB collision check
 */
function checkAABB(a: Entity, b: Entity): boolean {
  const ax = (a.x as number) ?? 0;
  const ay = (a.y as number) ?? 0;
  const aw = (a.width as number) ?? 32;
  const ah = (a.height as number) ?? 32;

  const bx = (b.x as number) ?? 0;
  const by = (b.y as number) ?? 0;
  const bw = (b.width as number) ?? 32;
  const bh = (b.height as number) ?? 32;

  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

/**
 * Circle collision check
 */
function checkCircle(a: Entity, b: Entity): boolean {
  const ax = (a.x as number) ?? 0;
  const ay = (a.y as number) ?? 0;
  const ar = a.radius != null ? (a.radius as number) : a.width != null ? (a.width as number) / 2 : 16;

  const bx = (b.x as number) ?? 0;
  const by = (b.y as number) ?? 0;
  const br = b.radius != null ? (b.radius as number) : b.width != null ? (b.width as number) / 2 : 16;

  const dx = ax - bx;
  const dy = ay - by;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance < ar + br;
}

/**
 * CollisionDetector Component
 *
 * Invisible component that runs collision detection each frame and emits events.
 * Designed to be rendered by the Collision2DSystem trait via render_ui effect.
 */
export function CollisionDetector({
  algorithm = 'aabb',
  rules = DEFAULT_RULES,
  enabled = true,
  eventBus: eventBusProp,
}: CollisionDetectorProps) {
  // Get event bus from context or prop
  let eventBusFromHook: EventBusContextType | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    eventBusFromHook = useEventBus();
  } catch {
    // Outside EventBusProvider context - will use prop or skip emission
  }
  const eventBus = eventBusProp || eventBusFromHook;

  // Track active collisions to detect enter/exit
  const activeCollisionsRef = useRef<Set<string>>(new Set());

  // Get collision check function based on algorithm
  const checkCollision = algorithm === 'circle' ? checkCircle : checkAABB;

  // Collision detection tick
  const tick = useCallback(() => {
    if (!enabled || !eventBus) return;

    const activeCollisions = activeCollisionsRef.current;
    const newCollisions = new Set<string>();

    // Check each rule
    for (const rule of rules) {
      const entitiesA = getByType(rule.typeA);
      const entitiesB = getByType(rule.typeB);

      for (const a of entitiesA) {
        for (const b of entitiesB) {
          // Skip self-collision
          if (a.id === b.id) continue;

          const colliding = checkCollision(a, b);
          const pairKey = `${a.id}:${b.id}`;
          const reversePairKey = `${b.id}:${a.id}`;

          if (colliding) {
            // Use consistent key ordering
            const key = pairKey < reversePairKey ? pairKey : reversePairKey;
            newCollisions.add(key);

            if (!activeCollisions.has(key)) {
              // New collision - emit ENTER event
              const eventName = rule.isTrigger
                ? rule.event || 'TRIGGER_ENTER'
                : rule.event || 'COLLISION_ENTER';

              eventBus.emit(eventName, {
                entityA: a,
                entityB: b,
                typeA: rule.typeA,
                typeB: rule.typeB,
                isTrigger: rule.isTrigger ?? false,
              });
            }
          }
        }
      }
    }

    // Check for collision exits
    for (const key of activeCollisions) {
      if (!newCollisions.has(key)) {
        eventBus.emit('COLLISION_EXIT', { pairKey: key });
      }
    }

    activeCollisionsRef.current = newCollisions;
  }, [enabled, eventBus, rules, checkCollision]);

  // Run collision detection loop
  useEffect(() => {
    if (!enabled) return;

    let animationId: number;

    const loop = () => {
      tick();
      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [enabled, tick]);

  // Invisible component - renders nothing
  return null;
}

CollisionDetector.displayName = 'CollisionDetector';
