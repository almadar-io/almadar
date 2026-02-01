/**
 * Evaluation Context
 *
 * Defines the context for evaluating S-expressions at runtime.
 * This context provides access to entity data, payload, state, and effect handlers.
 *
 * @packageDocumentation
 */

/**
 * User context for @user bindings (role-based UI).
 */
export interface UserContext {
  /** User's unique ID */
  id: string;
  /** User's email */
  email?: string;
  /** User's display name */
  name?: string;
  /** User's role (for RBAC) */
  role?: string;
  /** User's permissions */
  permissions?: string[];
  /** Additional custom profile fields */
  [key: string]: unknown;
}

/**
 * Evaluation context for S-expression evaluation.
 * Provides all bindings and effect handlers needed at runtime.
 */
export interface EvaluationContext {
  /** Entity data for @entity bindings */
  entity: Record<string, unknown>;

  /** Payload data for @payload bindings */
  payload: Record<string, unknown>;

  /** Current state for @state binding */
  state: string;

  /** Current timestamp for @now binding (defaults to Date.now()) */
  now: number;

  /** User data for @user bindings (role-based UI) */
  user?: UserContext;

  /** Singleton entities for @EntityName bindings */
  singletons: Map<string, Record<string, unknown>>;

  /** Local variables from 'let' bindings */
  locals?: Map<string, unknown>;

  // ============================================================================
  // Effect Handlers (for executing side effects)
  // ============================================================================

  /** Mutate entity fields */
  mutateEntity?: (changes: Record<string, unknown>) => void;

  /** Emit an event */
  emit?: (event: string, payload?: unknown) => void;

  /** Navigate to a route */
  navigate?: (route: string, params?: Record<string, unknown>) => void;

  /** Persist data (create/update/delete) */
  persist?: (action: 'create' | 'update' | 'delete', data?: Record<string, unknown>) => Promise<void>;

  /** Show a notification */
  notify?: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;

  /** Spawn a new entity instance */
  spawn?: (entityType: string, props?: Record<string, unknown>) => void;

  /** Despawn an entity instance */
  despawn?: (entityId?: string) => void;

  /** Call an external service */
  callService?: (service: string, method: string, params?: Record<string, unknown>) => Promise<unknown>;

  /** Render UI to a slot */
  renderUI?: (slot: string, pattern: unknown, props?: Record<string, unknown>, priority?: number) => void;
}

/**
 * Create a minimal evaluation context for testing/guards.
 * Only includes bindings, no effect handlers.
 */
export function createMinimalContext(
  entity: Record<string, unknown> = {},
  payload: Record<string, unknown> = {},
  state: string = 'initial'
): EvaluationContext {
  return {
    entity,
    payload,
    state,
    now: Date.now(),
    singletons: new Map(),
  };
}

/**
 * Create a context with effect handlers.
 * Used for runtime evaluation where effects need to execute.
 */
export function createEffectContext(
  base: EvaluationContext,
  handlers: Partial<Pick<EvaluationContext,
    'mutateEntity' | 'emit' | 'navigate' | 'persist' | 'notify' | 'spawn' | 'despawn' | 'callService' | 'renderUI'
  >>
): EvaluationContext {
  return {
    ...base,
    ...handlers,
  };
}

/**
 * Create a child context with additional local bindings.
 * Used for 'let' expressions.
 */
export function createChildContext(
  parent: EvaluationContext,
  locals: Map<string, unknown>
): EvaluationContext {
  // Merge parent locals with new locals
  const mergedLocals = new Map(parent.locals);
  locals.forEach((value, key) => mergedLocals.set(key, value));

  return {
    ...parent,
    locals: mergedLocals,
  };
}

/**
 * Resolve a binding in the context.
 *
 * @param binding - Binding string (e.g., "@entity.health", "@payload.amount")
 * @param ctx - Evaluation context
 * @returns Resolved value or undefined
 */
export function resolveBinding(binding: string, ctx: EvaluationContext): unknown {
  if (!binding.startsWith('@')) {
    return undefined;
  }

  const withoutPrefix = binding.slice(1);
  const parts = withoutPrefix.split('.');
  const root = parts[0];
  const path = parts.slice(1);

  let value: unknown;

  // Check locals first
  if (ctx.locals?.has(root)) {
    value = ctx.locals.get(root);
  } else {
    // Core bindings
    switch (root) {
      case 'entity':
        value = ctx.entity;
        break;
      case 'payload':
        value = ctx.payload;
        break;
      case 'state':
        return ctx.state; // @state has no path
      case 'now':
        return ctx.now; // @now has no path
      case 'user':
        value = ctx.user;
        break;
      default:
        // Singleton entity reference (@EntityName.field)
        value = ctx.singletons.get(root);
        break;
    }
  }

  // Navigate path
  for (const segment of path) {
    if (value === null || value === undefined) {
      return undefined;
    }
    if (typeof value === 'object') {
      value = (value as Record<string, unknown>)[segment];
    } else {
      return undefined;
    }
  }

  return value;
}
