/**
 * Math Module Runtime Evaluators
 *
 * Runtime implementations for math/* operators.
 *
 * @packageDocumentation
 */

import type { SExpr } from '../types/expression.js';
import type { EvaluationContext } from '../context.js';

type EvalFn = (expr: SExpr, ctx: EvaluationContext) => unknown;

/**
 * math/abs - Absolute value
 */
export function evalMathAbs(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const n = evaluate(args[0], ctx) as number;
  return Math.abs(n);
}

/**
 * math/min - Minimum of values
 */
export function evalMathMin(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const values = args.map((a) => evaluate(a, ctx) as number);
  return Math.min(...values);
}

/**
 * math/max - Maximum of values
 */
export function evalMathMax(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const values = args.map((a) => evaluate(a, ctx) as number);
  return Math.max(...values);
}

/**
 * math/clamp - Constrain value to range [min, max]
 */
export function evalMathClamp(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const n = evaluate(args[0], ctx) as number;
  const min = evaluate(args[1], ctx) as number;
  const max = evaluate(args[2], ctx) as number;
  return Math.min(Math.max(n, min), max);
}

/**
 * math/floor - Round down to integer
 */
export function evalMathFloor(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const n = evaluate(args[0], ctx) as number;
  return Math.floor(n);
}

/**
 * math/ceil - Round up to integer
 */
export function evalMathCeil(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const n = evaluate(args[0], ctx) as number;
  return Math.ceil(n);
}

/**
 * math/round - Round to nearest integer or specified decimals
 */
export function evalMathRound(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const n = evaluate(args[0], ctx) as number;
  const decimals = args.length > 1 ? (evaluate(args[1], ctx) as number) : 0;
  if (decimals === 0) {
    return Math.round(n);
  }
  const factor = Math.pow(10, decimals);
  return Math.round(n * factor) / factor;
}

/**
 * math/pow - Exponentiation (base^exp)
 */
export function evalMathPow(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const base = evaluate(args[0], ctx) as number;
  const exp = evaluate(args[1], ctx) as number;
  return Math.pow(base, exp);
}

/**
 * math/sqrt - Square root
 */
export function evalMathSqrt(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const n = evaluate(args[0], ctx) as number;
  return Math.sqrt(n);
}

/**
 * math/mod - Modulo (remainder)
 */
export function evalMathMod(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const a = evaluate(args[0], ctx) as number;
  const b = evaluate(args[1], ctx) as number;
  return a % b;
}

/**
 * math/sign - Returns -1, 0, or 1 indicating sign
 */
export function evalMathSign(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const n = evaluate(args[0], ctx) as number;
  return Math.sign(n);
}

/**
 * math/lerp - Linear interpolation between a and b by factor t
 */
export function evalMathLerp(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const a = evaluate(args[0], ctx) as number;
  const b = evaluate(args[1], ctx) as number;
  const t = evaluate(args[2], ctx) as number;
  return a + (b - a) * t;
}

/**
 * math/map - Map value from one range to another
 */
export function evalMathMap(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const n = evaluate(args[0], ctx) as number;
  const inMin = evaluate(args[1], ctx) as number;
  const inMax = evaluate(args[2], ctx) as number;
  const outMin = evaluate(args[3], ctx) as number;
  const outMax = evaluate(args[4], ctx) as number;
  return ((n - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

/**
 * math/random - Random number between 0 (inclusive) and 1 (exclusive)
 */
export function evalMathRandom(): number {
  return Math.random();
}

/**
 * math/randomInt - Random integer in range [min, max] (inclusive)
 */
export function evalMathRandomInt(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const min = evaluate(args[0], ctx) as number;
  const max = evaluate(args[1], ctx) as number;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * math/default - Return default if value is null, undefined, or NaN
 */
export function evalMathDefault(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const n = evaluate(args[0], ctx);
  const defaultValue = evaluate(args[1], ctx) as number;
  if (n === null || n === undefined || (typeof n === 'number' && isNaN(n))) {
    return defaultValue;
  }
  return n as number;
}
