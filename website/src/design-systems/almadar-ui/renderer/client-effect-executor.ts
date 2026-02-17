/**
 * Client Effect Executor
 *
 * Executes client effects returned from the server.
 * This is the core of the dual execution model - the server processes
 * events and returns client effects, which this module executes.
 *
 * Used by both Builder preview and compiled shells.
 *
 * @packageDocumentation
 */

import type {
  ClientEffect,
  ClientEffectExecutorConfig,
  PatternConfig,
  NotifyOptions,
} from './types';

// ============================================================================
// Effect Execution
// ============================================================================

/**
 * Execute an array of client effects.
 *
 * Effects are executed sequentially in order.
 * Errors in one effect don't prevent subsequent effects from executing.
 *
 * @param effects - Array of client effects to execute
 * @param config - Configuration providing implementations for each effect type
 *
 * @example
 * ```typescript
 * executeClientEffects(
 *   [
 *     ['render-ui', 'main', { type: 'entity-table', entity: 'Task' }],
 *     ['notify', 'Tasks loaded!', { type: 'success' }]
 *   ],
 *   {
 *     renderToSlot: (slot, pattern) => slotManager.render(slot, pattern),
 *     navigate: (path) => router.push(path),
 *     notify: (message, opts) => toast.show(message, opts),
 *     eventBus: { emit: (event, payload) => bus.emit(event, payload) }
 *   }
 * );
 * ```
 */
export function executeClientEffects(
  effects: ClientEffect[],
  config: ClientEffectExecutorConfig
): void {
  if (!effects || effects.length === 0) {
    return;
  }

  for (const effect of effects) {
    try {
      executeEffect(effect, config);
    } catch (error) {
      console.error(
        `[ClientEffectExecutor] Error executing effect:`,
        effect,
        error
      );
    }
  }

  // Call onComplete callback if provided
  config.onComplete?.();
}

/**
 * Execute a single client effect.
 */
function executeEffect(
  effect: ClientEffect,
  config: ClientEffectExecutorConfig
): void {
  const [effectType, ...args] = effect;

  switch (effectType) {
    case 'render-ui': {
      const [slot, patternConfig] = args as [string, PatternConfig | null];
      executeRenderUI(slot, patternConfig, config);
      break;
    }

    case 'navigate': {
      const [path, params] = args as [string, Record<string, unknown>?];
      executeNavigate(path, params, config);
      break;
    }

    case 'notify': {
      const [message, options] = args as [string, NotifyOptions?];
      executeNotify(message, options, config);
      break;
    }

    case 'emit': {
      const [event, payload] = args as [string, unknown?];
      executeEmit(event, payload, config);
      break;
    }

    default:
      console.warn(`[ClientEffectExecutor] Unknown effect type: ${effectType}`);
  }
}

// ============================================================================
// Individual Effect Handlers
// ============================================================================

/**
 * Execute a render-ui effect.
 *
 * If patternConfig is null, the slot is cleared.
 */
function executeRenderUI(
  slot: string,
  patternConfig: PatternConfig | null,
  config: ClientEffectExecutorConfig
): void {
  config.renderToSlot(slot, patternConfig);
}

/**
 * Execute a navigate effect.
 */
function executeNavigate(
  path: string,
  params: Record<string, unknown> | undefined,
  config: ClientEffectExecutorConfig
): void {
  config.navigate(path, params);
}

/**
 * Execute a notify effect.
 */
function executeNotify(
  message: string,
  options: NotifyOptions | undefined,
  config: ClientEffectExecutorConfig
): void {
  config.notify(message, options);
}

/**
 * Execute an emit effect.
 */
function executeEmit(
  event: string,
  payload: unknown | undefined,
  config: ClientEffectExecutorConfig
): void {
  config.eventBus.emit(event, payload);
}

// ============================================================================
// Effect Parsing Utilities
// ============================================================================

/**
 * Parse a raw effect array into a typed ClientEffect.
 * Handles unknown effect formats gracefully.
 */
export function parseClientEffect(
  raw: unknown[]
): ClientEffect | null {
  if (!Array.isArray(raw) || raw.length < 1) {
    console.warn('[ClientEffectExecutor] Invalid effect format:', raw);
    return null;
  }

  const [type, ...args] = raw;

  if (typeof type !== 'string') {
    console.warn('[ClientEffectExecutor] Effect type must be string:', raw);
    return null;
  }

  switch (type) {
    case 'render-ui':
      return ['render-ui', args[0] as string, args[1] as PatternConfig | null];
    case 'navigate':
      return ['navigate', args[0] as string, args[1] as Record<string, unknown>];
    case 'notify':
      return ['notify', args[0] as string, args[1] as NotifyOptions];
    case 'emit':
      return ['emit', args[0] as string, args[1]];
    default:
      console.warn(`[ClientEffectExecutor] Unknown effect type: ${type}`);
      return null;
  }
}

/**
 * Parse an array of raw effects into typed ClientEffects.
 * Filters out invalid effects.
 */
export function parseClientEffects(
  raw: unknown[] | undefined
): ClientEffect[] {
  if (!raw || !Array.isArray(raw)) {
    return [];
  }

  return raw
    .map((effect) => parseClientEffect(effect as unknown[]))
    .filter((effect): effect is ClientEffect => effect !== null);
}

// ============================================================================
// Effect Filtering
// ============================================================================

/**
 * Filter effects by type.
 */
export function filterEffectsByType<T extends ClientEffect[0]>(
  effects: ClientEffect[],
  type: T
): Extract<ClientEffect, [T, ...unknown[]]>[] {
  return effects.filter(
    (effect): effect is Extract<ClientEffect, [T, ...unknown[]]> =>
      effect[0] === type
  );
}

/**
 * Get all render-ui effects.
 */
export function getRenderUIEffects(
  effects: ClientEffect[]
): Array<['render-ui', string, PatternConfig | null]> {
  return filterEffectsByType(effects, 'render-ui');
}

/**
 * Get all navigate effects.
 */
export function getNavigateEffects(
  effects: ClientEffect[]
): Array<['navigate', string, Record<string, unknown>?]> {
  return filterEffectsByType(effects, 'navigate');
}

/**
 * Get all notify effects.
 */
export function getNotifyEffects(
  effects: ClientEffect[]
): Array<['notify', string, NotifyOptions?]> {
  return filterEffectsByType(effects, 'notify');
}

/**
 * Get all emit effects.
 */
export function getEmitEffects(
  effects: ClientEffect[]
): Array<['emit', string, unknown?]> {
  return filterEffectsByType(effects, 'emit');
}
