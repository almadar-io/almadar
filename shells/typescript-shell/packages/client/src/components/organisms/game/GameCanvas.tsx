import * as React from 'react';
import { cn } from '../../../lib/cn';
import { useEntities, type Entity } from '../../../hooks/useEntities';
import { updateSingleton, getSingleton, spawnEntity, updateEntity, getByType, getAllEntities } from '../../../stores/entityStore';
import { debugInput, debugCollision } from '../../../lib/debug';

/**
 * Game entity with position and rendering data
 */
export interface GameEntity extends Entity {
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  width?: number;
  height?: number;
  layer?: number;
  sprite?: string;
  color?: string;
  rotation?: number;
  scale?: number;
  visible?: boolean;
  collider?: {
    width: number;
    height: number;
    offsetX?: number;
    offsetY?: number;
  };
}

/**
 * Entity renderer function type
 */
export type EntityRenderer = (
  ctx: CanvasRenderingContext2D,
  entity: GameEntity
) => void;

/** Input key bindings - supports both field-based and event-based formats */
interface InputBinding {
  key: string;
  /** Direct field mapping (e.g., 'left', 'right', 'jump') */
  field?: 'left' | 'right' | 'jump' | 'attack';
  /** Event-based mapping (e.g., 'MOVE_LEFT', 'JUMP') - mapped to fields */
  event?: string;
  /** Whether to hold the input (continuous) or trigger once */
  hold?: boolean;
}

/** Collision definition from schema */
export interface CollisionDef {
  /** Entity types that collide [typeA, typeB] */
  between: [string, string];
  /** Collision type: 'solid' resolves overlap, 'trigger' emits event */
  type: 'solid' | 'trigger';
  /** Event to emit for trigger collisions */
  emits?: string;
}

/** AABB helper */
interface AABB {
  x: number;
  y: number;
  width: number;
  height: number;
}

function getAABB(entity: GameEntity): AABB {
  const width = entity.width ?? 32;
  const height = entity.height ?? 32;
  return {
    x: entity.x - width / 2,
    y: entity.y - height / 2,
    width,
    height,
  };
}

function aabbOverlap(a: AABB, b: AABB): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function resolveCollision(
  mover: AABB,
  solid: AABB,
  moverVy: number
): { dx: number; dy: number; side: 'top' | 'bottom' | 'left' | 'right' } {
  const overlapLeft = (mover.x + mover.width) - solid.x;
  const overlapRight = (solid.x + solid.width) - mover.x;
  const overlapTop = (mover.y + mover.height) - solid.y;
  const overlapBottom = (solid.y + solid.height) - mover.y;

  const minOverlapX = overlapLeft < overlapRight ? -overlapLeft : overlapRight;
  const minOverlapY = overlapTop < overlapBottom ? -overlapTop : overlapBottom;

  if (Math.abs(minOverlapX) < Math.abs(minOverlapY)) {
    return { dx: minOverlapX, dy: 0, side: minOverlapX < 0 ? 'right' : 'left' };
  } else {
    const side = minOverlapY < 0 ? 'bottom' : 'top';
    return { dx: 0, dy: minOverlapY, side };
  }
}

/** Map event names to input fields */
const EVENT_TO_FIELD: Record<string, 'left' | 'right' | 'jump' | 'attack'> = {
  'MOVE_LEFT': 'left',
  'MOVE_RIGHT': 'right',
  'JUMP': 'jump',
  'ATTACK': 'attack',
};

/** Get the field from a binding (supports both field and event formats) */
function getFieldFromBinding(binding: InputBinding): 'left' | 'right' | 'jump' | 'attack' | undefined {
  if (binding.field) return binding.field;
  if (binding.event) return EVENT_TO_FIELD[binding.event];
  return undefined;
}

const DEFAULT_INPUT_BINDINGS: InputBinding[] = [
  { key: 'ArrowLeft', field: 'left' },
  { key: 'a', field: 'left' },
  { key: 'ArrowRight', field: 'right' },
  { key: 'd', field: 'right' },
  { key: ' ', field: 'jump' },
  { key: 'ArrowUp', field: 'jump' },
  { key: 'w', field: 'jump' },
];

export interface GameCanvasProps {
  /** Entity type names to render (optional filter) */
  renderEntities?: string[];
  /** Rendering functions per entity type */
  renderers?: Record<string, EntityRenderer>;
  /**
   * Renderer type hint from schema (e.g., 'phaser', 'canvas').
   * Currently ignored - component uses Canvas2D.
   * Reserved for future multi-renderer support.
   */
  renderer?: string;
  /** Background color or gradient */
  background?: string;
  /** Canvas width in pixels or 'full' for responsive */
  width?: number | 'full';
  /** Canvas height in pixels or 'auto' for aspect ratio */
  height?: number | 'auto';
  /** Aspect ratio (e.g., '16:9', '4:3') */
  aspectRatio?: string;
  /** Camera offset for scrolling */
  cameraOffset?: { x: number; y: number };
  /** Debug mode shows hitboxes and entity info */
  debug?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Click handler for canvas */
  onClick?: (x: number, y: number, entity?: GameEntity) => void;
  /** Enable keyboard input handling (updates Input entity) */
  enableInput?: boolean;
  /** Custom input key bindings */
  inputBindings?: InputBinding[];
  /** Collision definitions from schema */
  collisions?: CollisionDef[];
  /** Event bus for emitting collision events */
  eventBus?: { emit: (event: string, payload?: unknown) => void };
}

const defaultRenderer: EntityRenderer = (ctx, entity) => {
  const w = entity.width ?? 32;
  const h = entity.height ?? 32;
  ctx.fillStyle = entity.color ?? '#ff0000';
  ctx.fillRect(-w / 2, -h / 2, w, h);
};

export function GameCanvas({
  renderEntities,
  renderers = {},
  background = '#87CEEB',
  width = 'full',
  height = 'auto',
  aspectRatio = '16:9',
  cameraOffset = { x: 0, y: 0 },
  debug = false,
  className,
  onClick,
  enableInput = true,
  inputBindings = DEFAULT_INPUT_BINDINGS,
  collisions = [],
  eventBus,
}: GameCanvasProps) {
  // Get entities directly from store
  const { entities } = useEntities();

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 800, height: 450 });

  // Handle keyboard input - updates the Input entity
  React.useEffect(() => {
    if (!enableInput) return;

    // Ensure Input entity exists
    const existingInput = getSingleton('Input');
    if (!existingInput) {
      spawnEntity({ id: 'input', type: 'Input', left: false, right: false, jump: false });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const binding = inputBindings.find((b) => b.key === e.key || b.key === e.code);
      if (binding) {
        const field = getFieldFromBinding(binding);
        if (field) {
          e.preventDefault();
          debugInput('keydown', { key: e.key, field, value: true });
          updateSingleton('Input', { [field]: true });
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const binding = inputBindings.find((b) => b.key === e.key || b.key === e.code);
      if (binding) {
        const field = getFieldFromBinding(binding);
        if (field) {
          e.preventDefault();
          debugInput('keyup', { key: e.key, field, value: false });
          updateSingleton('Input', { [field]: false });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [enableInput, inputBindings]);

  // Collision detection - runs every frame
  React.useEffect(() => {
    if (collisions.length === 0) {
      return;
    }

    // Track active collisions for enter/exit detection
    const activeCollisions = new Set<string>();
    let frameCount = 0;
    let lastFpsTime = performance.now();
    let fpsFrameCount = 0;
    let currentFps = 0;

    let animationId: number;
    const tick = () => {
      // FPS calculation
      fpsFrameCount++;
      const now = performance.now();
      const elapsed = now - lastFpsTime;
      if (elapsed >= 1000) {
        currentFps = (fpsFrameCount * 1000) / elapsed;
        fpsFrameCount = 0;
        lastFpsTime = now;
      }

      // Get fresh entities each frame from store (not from captured closure)
      const allEntities = getAllEntities() as GameEntity[];

      frameCount++;

      // Track which entities are grounded THIS frame
      const groundedThisFrame = new Set<string>();

      // Identify groundable entity types (typeA in solid collisions)
      const groundableTypes = new Set<string>();
      for (const collision of collisions) {
        if (collision.type === 'solid') {
          groundableTypes.add(collision.between[0]);
        }
      }

      for (const collision of collisions) {
        const [typeA, typeB] = collision.between;
        const entitiesA = allEntities.filter(e => e.type === typeA);
        const entitiesB = allEntities.filter(e => e.type === typeB);

        for (const entityA of entitiesA) {
          const aabbA = getAABB(entityA);

          for (const entityB of entitiesB) {
            const aabbB = getAABB(entityB);
            const collisionKey = `${entityA.id}:${entityB.id}`;

            if (aabbOverlap(aabbA, aabbB)) {
              const isNewCollision = !activeCollisions.has(collisionKey);
              activeCollisions.add(collisionKey);

              if (collision.type === 'solid') {
                // Resolve solid collision
                const vy = entityA.vy ?? 0;
                const resolution = resolveCollision(aabbA, aabbB, vy);

                const updates: Record<string, unknown> = {
                  x: entityA.x + resolution.dx,
                  y: entityA.y + resolution.dy,
                };

                // Track grounded if landing on top
                if (resolution.side === 'bottom' && vy >= 0) {
                  groundedThisFrame.add(entityA.id);
                  updates.isGrounded = true;
                  updates.vy = 0;
                }
                // Stop horizontal velocity on side collision
                if (resolution.side === 'left' || resolution.side === 'right') {
                  updates.vx = 0;
                }
                // Stop upward velocity on ceiling hit
                if (resolution.side === 'top' && vy < 0) {
                  updates.vy = 0;
                }

                updateEntity(entityA.id, updates);

                if (isNewCollision) {
                  debugCollision({ id: entityA.id, type: entityA.type }, { id: entityB.id, type: entityB.type }, { event: 'enter', side: resolution.side });
                }
              } else if (collision.type === 'trigger' && isNewCollision) {
                // Emit event for trigger collision
                if (collision.emits && eventBus) {
                  eventBus.emit(collision.emits, { entityA: entityA.id, entityB: entityB.id });
                }
                debugCollision({ id: entityA.id, type: entityA.type }, { id: entityB.id, type: entityB.type }, { event: 'enter', emits: collision.emits });
              }
            } else {
              // No longer colliding
              if (activeCollisions.has(collisionKey)) {
                activeCollisions.delete(collisionKey);
                debugCollision({ id: entityA.id, type: entityA.type }, { id: entityB.id, type: entityB.type }, { event: 'exit' });
              }

              // Ground check: extend hitbox slightly down to detect resting contact
              if (collision.type === 'solid' && groundableTypes.has(entityA.type)) {
                const groundCheckAABB = {
                  ...aabbA,
                  height: aabbA.height + 2, // Extend 2 pixels down
                };
                if (aabbOverlap(groundCheckAABB, aabbB)) {
                  // Check if platform is below (player's bottom near platform's top)
                  const playerBottom = aabbA.y + aabbA.height;
                  const platformTop = aabbB.y;
                  if (Math.abs(playerBottom - platformTop) < 3) {
                    groundedThisFrame.add(entityA.id);
                  }
                }
              }
            }
          }
        }
      }

      // Update isGrounded for entities that left the ground (were grounded, not grounded this frame)
      for (const entity of allEntities) {
        if (groundableTypes.has(entity.type) && entity.isGrounded && !groundedThisFrame.has(entity.id)) {
          updateEntity(entity.id, { isGrounded: false });
        }
      }

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [collisions, eventBus]);

  // Handle resize
  React.useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      let canvasWidth = width === 'full' ? containerWidth : width;
      let canvasHeight: number;

      if (height === 'auto' && aspectRatio) {
        const [aw, ah] = aspectRatio.split(':').map(Number);
        canvasHeight = (canvasWidth * ah) / aw;
      } else if (typeof height === 'number') {
        canvasHeight = height;
      } else {
        canvasHeight = canvasWidth * (9 / 16);
      }

      setDimensions({ width: canvasWidth, height: canvasHeight });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [width, height, aspectRatio]);

  // Render loop
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas resolution
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear and draw background
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    // Apply camera transform
    ctx.save();
    ctx.translate(-cameraOffset.x, -cameraOffset.y);

    // Filter and sort entities
    let entitiesToRender = [...entities.values()] as GameEntity[];

    // Filter by type if specified
    if (renderEntities && renderEntities.length > 0) {
      entitiesToRender = entitiesToRender.filter(e => renderEntities.includes(e.type));
    }

    // Filter out invisible and sort by layer
    const sortedEntities = entitiesToRender
      .filter((e) => e.visible !== false)
      .sort((a, b) => (a.layer ?? 0) - (b.layer ?? 0));

    // Render each entity
    for (const entity of sortedEntities) {
      const render = renderers[entity.type] ?? defaultRenderer;

      ctx.save();
      ctx.translate(entity.x, entity.y);

      if (entity.rotation) {
        ctx.rotate(entity.rotation);
      }
      if (entity.scale) {
        ctx.scale(entity.scale, entity.scale);
      }

      render(ctx, entity);

      // Debug: draw hitbox
      if (debug) {
        const collider = entity.collider ?? {
          width: entity.width ?? 32,
          height: entity.height ?? 32,
          offsetX: 0,
          offsetY: 0,
        };
        ctx.strokeStyle = 'lime';
        ctx.lineWidth = 1;
        ctx.strokeRect(
          (collider.offsetX ?? 0) - collider.width / 2,
          (collider.offsetY ?? 0) - collider.height / 2,
          collider.width,
          collider.height
        );

        // Draw entity info
        ctx.fillStyle = 'lime';
        ctx.font = '10px monospace';
        ctx.fillText(
          `${entity.type}#${entity.id.slice(0, 4)}`,
          -collider.width / 2,
          -collider.height / 2 - 4
        );
      }

      ctx.restore();
    }

    ctx.restore();

    // Debug: show entity count
    if (debug) {
      ctx.fillStyle = 'lime';
      ctx.font = '12px monospace';
      ctx.fillText(`Entities: ${entities.size}`, 10, 20);
      ctx.fillText(`Camera: (${cameraOffset.x.toFixed(0)}, ${cameraOffset.y.toFixed(0)})`, 10, 35);
    }
  }, [entities, renderEntities, renderers, background, dimensions, cameraOffset, debug]);

  // Handle click
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!onClick) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left + cameraOffset.x;
      const y = e.clientY - rect.top + cameraOffset.y;

      // Find clicked entity
      const clickedEntity = ([...entities.values()] as GameEntity[]).find((entity) => {
        const w = entity.width ?? 32;
        const h = entity.height ?? 32;
        return (
          x >= entity.x - w / 2 &&
          x <= entity.x + w / 2 &&
          y >= entity.y - h / 2 &&
          y <= entity.y + h / 2
        );
      });

      onClick(x, y, clickedEntity);
    },
    [onClick, entities, cameraOffset]
  );

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      style={{
        width: width === 'full' ? '100%' : width,
        height: typeof height === 'number' ? height : undefined,
        aspectRatio: height === 'auto' ? aspectRatio : undefined,
      }}
    >
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        className="absolute inset-0"
        style={{
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
}

GameCanvas.displayName = 'GameCanvas';
