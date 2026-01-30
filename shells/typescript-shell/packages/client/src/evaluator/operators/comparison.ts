/**
 * Comparison Operator Implementations
 *
 * Implements: =, !=, <, >, <=, >=
 */

import type { SExpr } from '../types/expression.js';
import type { EvaluationContext } from '../context.js';

type Evaluator = (expr: SExpr, ctx: EvaluationContext) => unknown;

/**
 * Evaluate equality: ["=", a, b]
 * Uses strict equality (===) for type safety.
 */
export function evalEqual(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): boolean {
  const left = evaluate(args[0], ctx);
  const right = evaluate(args[1], ctx);
  return deepEqual(left, right);
}

/**
 * Evaluate not-equal: ["!=", a, b]
 */
export function evalNotEqual(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): boolean {
  const left = evaluate(args[0], ctx);
  const right = evaluate(args[1], ctx);
  return !deepEqual(left, right);
}

/**
 * Evaluate less-than: ["<", a, b]
 */
export function evalLessThan(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): boolean {
  const left = evaluate(args[0], ctx);
  const right = evaluate(args[1], ctx);
  return toComparable(left) < toComparable(right);
}

/**
 * Evaluate greater-than: [">", a, b]
 */
export function evalGreaterThan(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): boolean {
  const left = evaluate(args[0], ctx);
  const right = evaluate(args[1], ctx);
  return toComparable(left) > toComparable(right);
}

/**
 * Evaluate less-than-or-equal: ["<=", a, b]
 */
export function evalLessThanOrEqual(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): boolean {
  const left = evaluate(args[0], ctx);
  const right = evaluate(args[1], ctx);
  return toComparable(left) <= toComparable(right);
}

/**
 * Evaluate greater-than-or-equal: [">=", a, b]
 */
export function evalGreaterThanOrEqual(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): boolean {
  const left = evaluate(args[0], ctx);
  const right = evaluate(args[1], ctx);
  return toComparable(left) >= toComparable(right);
}

/**
 * Evaluate regex match: ["matches", subject, pattern]
 * Returns true if subject matches the regex pattern.
 */
export function evalMatches(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): boolean {
  const subject = evaluate(args[0], ctx);
  const pattern = evaluate(args[1], ctx);

  if (typeof subject !== 'string' || typeof pattern !== 'string') {
    return false;
  }

  try {
    const regex = new RegExp(pattern);
    return regex.test(subject);
  } catch {
    // Invalid regex pattern
    return false;
  }
}

/**
 * Deep equality check for objects and arrays.
 */
function deepEqual(a: unknown, b: unknown): boolean {
  // Primitive equality
  if (a === b) return true;

  // Null/undefined checks
  if (a === null || b === null) return a === b;
  if (a === undefined || b === undefined) return a === b;

  // Type checks
  if (typeof a !== typeof b) return false;

  // Array equality
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, idx) => deepEqual(val, b[idx]));
  }

  // Object equality
  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a as object);
    const keysB = Object.keys(b as object);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((key) =>
      deepEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])
    );
  }

  return false;
}

/**
 * Convert to a comparable value for ordering operations.
 */
function toComparable(value: unknown): number | string {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return value;
  if (typeof value === 'boolean') return value ? 1 : 0;
  if (value === null || value === undefined) return 0;
  return String(value);
}
