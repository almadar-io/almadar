/**
 * Effect Operator Implementations
 *
 * Implements: set, emit, persist, navigate, notify, spawn, despawn, call-service, render-ui
 *
 * Effect operators have side effects and require effect handlers in the context.
 */

import type { SExpr } from '../types/expression.js';
import type { EvaluationContext } from '../context.js';
import { resolveBinding } from '../context.js';

type Evaluator = (expr: SExpr, ctx: EvaluationContext) => unknown;

/**
 * Evaluate set: ["set", "@entity.field", value] or ["set", "@entity.field", value, operation]
 */
export function evalSet(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): void {
  const binding = args[0] as string;
  const value = evaluate(args[1], ctx);
  const operation = args[2] as string | undefined;

  if (!ctx.mutateEntity) {
    console.warn('No mutateEntity handler in context for set effect');
    return;
  }

  // Parse the binding to get the field name
  if (!binding.startsWith('@entity.')) {
    console.warn(`set only supports @entity bindings, got: ${binding}`);
    return;
  }

  const fieldPath = binding.slice(8); // Remove "@entity."

  // Handle different operations
  let finalValue = value;
  if (operation) {
    const currentValue = resolveBinding(binding, ctx);
    switch (operation) {
      case 'increment':
        finalValue = toNumber(currentValue) + toNumber(value);
        break;
      case 'decrement':
        finalValue = toNumber(currentValue) - toNumber(value);
        break;
      case 'multiply':
        finalValue = toNumber(currentValue) * toNumber(value);
        break;
      case 'append':
        finalValue = Array.isArray(currentValue) ? [...currentValue, value] : [value];
        break;
      case 'remove':
        finalValue = Array.isArray(currentValue) ? currentValue.filter((v) => v !== value) : [];
        break;
      default:
        // No operation, use value directly
        break;
    }
  }

  ctx.mutateEntity({ [fieldPath]: finalValue });
}

/**
 * Evaluate emit: ["emit", eventKey] or ["emit", eventKey, payload]
 */
export function evalEmit(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): void {
  const eventKey = args[0] as string;
  const payload = args.length > 1 ? evaluate(args[1], ctx) : undefined;

  if (!ctx.emit) {
    console.warn('No emit handler in context for emit effect');
    return;
  }

  ctx.emit(eventKey, payload);
}

/**
 * Evaluate persist: ["persist", action] or ["persist", action, data]
 * Actions: "create", "update", "delete"
 */
export function evalPersist(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): void {
  const action = args[0] as 'create' | 'update' | 'delete';
  const data = args.length > 1 ? (evaluate(args[1], ctx) as Record<string, unknown>) : ctx.payload;

  if (!ctx.persist) {
    console.warn('No persist handler in context for persist effect');
    return;
  }

  // Fire and forget (async)
  ctx.persist(action, data as Record<string, unknown>).catch((err) => {
    console.error(`Persist ${action} failed:`, err);
  });
}

/**
 * Evaluate navigate: ["navigate", route] or ["navigate", route, params]
 */
export function evalNavigate(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): void {
  const route = args[0] as string;
  const params = args.length > 1 ? (evaluate(args[1], ctx) as Record<string, unknown>) : undefined;

  if (!ctx.navigate) {
    console.warn('No navigate handler in context for navigate effect');
    return;
  }

  ctx.navigate(route, params);
}

/**
 * Evaluate notify: ["notify", message] or ["notify", message, type]
 */
export function evalNotify(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): void {
  const message = String(evaluate(args[0], ctx));
  const type = (args[1] as 'success' | 'error' | 'warning' | 'info') || 'info';

  if (!ctx.notify) {
    console.warn('No notify handler in context for notify effect');
    return;
  }

  ctx.notify(message, type);
}

/**
 * Evaluate spawn: ["spawn", entityType] or ["spawn", entityType, props]
 */
export function evalSpawn(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): void {
  const entityType = args[0] as string;
  const props = args.length > 1 ? (evaluate(args[1], ctx) as Record<string, unknown>) : undefined;

  if (!ctx.spawn) {
    console.warn('No spawn handler in context for spawn effect');
    return;
  }

  ctx.spawn(entityType, props);
}

/**
 * Evaluate despawn: ["despawn"] or ["despawn", entityId]
 */
export function evalDespawn(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): void {
  const entityId = args.length > 0 ? String(evaluate(args[0], ctx)) : undefined;

  if (!ctx.despawn) {
    console.warn('No despawn handler in context for despawn effect');
    return;
  }

  ctx.despawn(entityId);
}

/**
 * Evaluate call-service: ["call-service", service, method] or ["call-service", service, method, params]
 */
export function evalCallService(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): void {
  const service = args[0] as string;
  const method = args[1] as string;
  const params = args.length > 2 ? (evaluate(args[2], ctx) as Record<string, unknown>) : undefined;

  if (!ctx.callService) {
    console.warn('No callService handler in context for call-service effect');
    return;
  }

  // Fire and forget (async)
  ctx.callService(service, method, params).catch((err) => {
    console.error(`Service call ${service}.${method} failed:`, err);
  });
}

/**
 * Evaluate render-ui:
 * - ["render-ui", slot, pattern]
 * - ["render-ui", slot, pattern, props]
 * - ["render-ui", slot, pattern, props, priority]
 * - ["render-ui", slot, null] - clears the slot
 */
export function evalRenderUI(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): void {
  const slot = args[0] as string;
  const pattern = evaluate(args[1], ctx);
  const props = args.length > 2 ? (evaluate(args[2], ctx) as Record<string, unknown>) : undefined;
  const priority = args.length > 3 ? (evaluate(args[3], ctx) as number) : undefined;

  if (!ctx.renderUI) {
    console.warn('No renderUI handler in context for render-ui effect');
    return;
  }

  // Handle null pattern as "clear slot"
  if (pattern === null || pattern === undefined) {
    ctx.renderUI(slot, { type: 'clear' }, undefined, priority);
    return;
  }

  ctx.renderUI(slot, pattern, props, priority);
}

/**
 * Evaluate set-dynamic: ["set-dynamic", pathExpr, value]
 * Used for dynamic field paths computed at runtime.
 * The pathExpr should evaluate to a dot-separated path string.
 */
export function evalSetDynamic(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): void {
  const pathExpr = evaluate(args[0], ctx) as string;
  const value = evaluate(args[1], ctx);

  if (!ctx.mutateEntity) {
    console.warn('No mutateEntity handler in context for set-dynamic effect');
    return;
  }

  if (!pathExpr || typeof pathExpr !== 'string') {
    console.warn(`set-dynamic requires a valid path string, got: ${pathExpr}`);
    return;
  }

  // pathExpr is already a dot-separated path (e.g., "formValues.A9")
  ctx.mutateEntity({ [pathExpr]: value });
}

/**
 * Evaluate increment: ["increment", "@entity.field"] or ["increment", "@entity.field", amount]
 */
export function evalIncrement(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): void {
  const binding = args[0] as string;
  const amount = args.length > 1 ? toNumber(evaluate(args[1], ctx)) : 1;

  if (!ctx.mutateEntity) {
    console.warn('No mutateEntity handler in context for increment effect');
    return;
  }

  if (!binding.startsWith('@entity.')) {
    console.warn(`increment only supports @entity bindings, got: ${binding}`);
    return;
  }

  const fieldPath = binding.slice(8); // Remove "@entity."
  const currentValue = resolveBinding(binding, ctx);
  const newValue = toNumber(currentValue) + amount;

  ctx.mutateEntity({ [fieldPath]: newValue });
}

/**
 * Evaluate decrement: ["decrement", "@entity.field"] or ["decrement", "@entity.field", amount]
 */
export function evalDecrement(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): void {
  const binding = args[0] as string;
  const amount = args.length > 1 ? toNumber(evaluate(args[1], ctx)) : 1;

  if (!ctx.mutateEntity) {
    console.warn('No mutateEntity handler in context for decrement effect');
    return;
  }

  if (!binding.startsWith('@entity.')) {
    console.warn(`decrement only supports @entity bindings, got: ${binding}`);
    return;
  }

  const fieldPath = binding.slice(8); // Remove "@entity."
  const currentValue = resolveBinding(binding, ctx);
  const newValue = toNumber(currentValue) - amount;

  ctx.mutateEntity({ [fieldPath]: newValue });
}

/**
 * Convert a value to a number.
 */
function toNumber(value: unknown): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}
