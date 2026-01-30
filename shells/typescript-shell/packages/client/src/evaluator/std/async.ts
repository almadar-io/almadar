/**
 * Async Module Runtime Evaluators
 *
 * Runtime implementations for async/* operators.
 * Provides functions for handling async operations, delays, and timing.
 *
 * @packageDocumentation
 */

import type { SExpr } from '../types/expression.js';
import type { EvaluationContext } from '../context.js';

type EvalFn = (expr: SExpr, ctx: EvaluationContext) => unknown;

// Debounce timers keyed by event name
const debounceTimers = new Map<string, ReturnType<typeof setTimeout>>();

// Throttle timestamps keyed by event name
const throttleTimestamps = new Map<string, number>();

/**
 * async/delay - Wait for specified milliseconds
 */
export async function evalAsyncDelay(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): Promise<void> {
  const ms = evaluate(args[0], ctx) as number;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * async/timeout - Add timeout to an effect
 */
export async function evalAsyncTimeout(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): Promise<unknown> {
  const effect = args[0];
  const ms = evaluate(args[1], ctx) as number;

  return Promise.race([
    Promise.resolve().then(() => evaluate(effect, ctx)),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout exceeded')), ms)
    ),
  ]);
}

/**
 * async/debounce - Debounce an event (wait for pause in events)
 */
export function evalAsyncDebounce(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): void {
  const event = evaluate(args[0], ctx) as string;
  const ms = evaluate(args[1], ctx) as number;

  // Clear existing timer if any
  const existingTimer = debounceTimers.get(event);
  if (existingTimer) {
    clearTimeout(existingTimer);
  }

  // Set new timer
  const timer = setTimeout(() => {
    debounceTimers.delete(event);
    // Emit the event
    ctx.emit?.(event);
  }, ms);

  debounceTimers.set(event, timer);
}

/**
 * async/throttle - Throttle an event (emit at most once per interval)
 */
export function evalAsyncThrottle(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): void {
  const event = evaluate(args[0], ctx) as string;
  const ms = evaluate(args[1], ctx) as number;

  const now = Date.now();
  const lastTimestamp = throttleTimestamps.get(event) ?? 0;

  if (now - lastTimestamp >= ms) {
    throttleTimestamps.set(event, now);
    ctx.emit?.(event);
  }
}

/**
 * async/retry - Retry an effect with configurable backoff
 */
export async function evalAsyncRetry(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): Promise<unknown> {
  const effect = args[0];
  const opts = evaluate(args[1], ctx) as {
    attempts?: number;
    backoff?: 'fixed' | 'linear' | 'exponential';
    baseDelay?: number;
  };

  const attempts = opts?.attempts ?? 3;
  const backoff = opts?.backoff ?? 'exponential';
  const baseDelay = opts?.baseDelay ?? 1000;

  let lastError: unknown;

  for (let i = 0; i < attempts; i++) {
    try {
      return await Promise.resolve().then(() => evaluate(effect, ctx));
    } catch (error) {
      lastError = error;

      if (i < attempts - 1) {
        // Calculate delay based on backoff strategy
        let delay: number;
        switch (backoff) {
          case 'fixed':
            delay = baseDelay;
            break;
          case 'linear':
            delay = baseDelay * (i + 1);
            break;
          case 'exponential':
          default:
            delay = baseDelay * Math.pow(2, i);
            break;
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

/**
 * async/race - Execute effects in parallel, return first to complete
 */
export async function evalAsyncRace(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): Promise<unknown> {
  const promises = args.map((effect) =>
    Promise.resolve().then(() => evaluate(effect, ctx))
  );
  return Promise.race(promises);
}

/**
 * async/all - Execute effects in parallel, wait for all to complete
 */
export async function evalAsyncAll(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): Promise<unknown[]> {
  const promises = args.map((effect) =>
    Promise.resolve().then(() => evaluate(effect, ctx))
  );
  return Promise.all(promises);
}

/**
 * async/sequence - Execute effects in sequence (one after another)
 */
export async function evalAsyncSequence(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): Promise<unknown[]> {
  const results: unknown[] = [];

  for (const effect of args) {
    const result = await Promise.resolve().then(() => evaluate(effect, ctx));
    results.push(result);
  }

  return results;
}

/**
 * Clear debounce timers (for testing/cleanup)
 */
export function clearDebounceTimers(): void {
  for (const timer of debounceTimers.values()) {
    clearTimeout(timer);
  }
  debounceTimers.clear();
}

/**
 * Clear throttle timestamps (for testing/cleanup)
 */
export function clearThrottleTimestamps(): void {
  throttleTimestamps.clear();
}
