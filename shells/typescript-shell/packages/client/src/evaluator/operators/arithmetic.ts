/**
 * Arithmetic Operator Implementations
 *
 * Implements: +, -, *, /, %, abs, min, max, floor, ceil, round, clamp
 */

import type { SExpr } from '../types/expression.js';
import type { EvaluationContext } from '../context.js';

type Evaluator = (expr: SExpr, ctx: EvaluationContext) => unknown;

/**
 * Evaluate addition: ["+", a, b, ...]
 */
export function evalAdd(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): number {
  return args.reduce((sum: number, arg) => sum + toNumber(evaluate(arg, ctx)), 0);
}

/**
 * Evaluate subtraction: ["-", a] (negate) or ["-", a, b] (subtract)
 */
export function evalSubtract(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): number {
  if (args.length === 1) {
    return -toNumber(evaluate(args[0], ctx));
  }
  return toNumber(evaluate(args[0], ctx)) - toNumber(evaluate(args[1], ctx));
}

/**
 * Evaluate multiplication: ["*", a, b, ...]
 */
export function evalMultiply(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): number {
  return args.reduce((product: number, arg) => product * toNumber(evaluate(arg, ctx)), 1);
}

/**
 * Evaluate division: ["/", a, b]
 */
export function evalDivide(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): number {
  const dividend = toNumber(evaluate(args[0], ctx));
  const divisor = toNumber(evaluate(args[1], ctx));
  if (divisor === 0) {
    return dividend >= 0 ? Infinity : -Infinity;
  }
  return dividend / divisor;
}

/**
 * Evaluate modulo: ["%", a, b]
 */
export function evalModulo(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): number {
  return toNumber(evaluate(args[0], ctx)) % toNumber(evaluate(args[1], ctx));
}

/**
 * Evaluate absolute value: ["abs", a]
 */
export function evalAbs(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): number {
  return Math.abs(toNumber(evaluate(args[0], ctx)));
}

/**
 * Evaluate minimum: ["min", a, b, ...]
 */
export function evalMin(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): number {
  const values = args.map((arg) => toNumber(evaluate(arg, ctx)));
  return Math.min(...values);
}

/**
 * Evaluate maximum: ["max", a, b, ...]
 */
export function evalMax(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): number {
  const values = args.map((arg) => toNumber(evaluate(arg, ctx)));
  return Math.max(...values);
}

/**
 * Evaluate floor: ["floor", a]
 */
export function evalFloor(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): number {
  return Math.floor(toNumber(evaluate(args[0], ctx)));
}

/**
 * Evaluate ceiling: ["ceil", a]
 */
export function evalCeil(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): number {
  return Math.ceil(toNumber(evaluate(args[0], ctx)));
}

/**
 * Evaluate round: ["round", a]
 */
export function evalRound(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): number {
  return Math.round(toNumber(evaluate(args[0], ctx)));
}

/**
 * Evaluate clamp: ["clamp", value, min, max]
 */
export function evalClamp(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): number {
  const value = toNumber(evaluate(args[0], ctx));
  const min = toNumber(evaluate(args[1], ctx));
  const max = toNumber(evaluate(args[2], ctx));
  return Math.max(min, Math.min(max, value));
}

/**
 * Convert a value to a number, defaulting to 0 for non-numbers.
 */
function toNumber(value: unknown): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  if (typeof value === 'boolean') return value ? 1 : 0;
  return 0;
}
