/**
 * Logic Operator Implementations
 *
 * Implements: and, or, not, if
 * All logic operators support short-circuit evaluation.
 */

import type { SExpr } from '../types/expression.js';
import type { EvaluationContext } from '../context.js';

type Evaluator = (expr: SExpr, ctx: EvaluationContext) => unknown;

/**
 * Evaluate logical AND: ["and", a, b, ...]
 * Short-circuits: returns false as soon as any argument is falsy.
 */
export function evalAnd(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): boolean {
  for (const arg of args) {
    if (!toBoolean(evaluate(arg, ctx))) {
      return false;
    }
  }
  return true;
}

/**
 * Evaluate logical OR: ["or", a, b, ...]
 * Short-circuits: returns true as soon as any argument is truthy.
 */
export function evalOr(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): boolean {
  for (const arg of args) {
    if (toBoolean(evaluate(arg, ctx))) {
      return true;
    }
  }
  return false;
}

/**
 * Evaluate logical NOT: ["not", a]
 */
export function evalNot(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): boolean {
  return !toBoolean(evaluate(args[0], ctx));
}

/**
 * Evaluate conditional: ["if", condition, then, else]
 * Only evaluates the branch that matches the condition.
 */
export function evalIf(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): unknown {
  const condition = toBoolean(evaluate(args[0], ctx));
  if (condition) {
    return evaluate(args[1], ctx);
  }
  return evaluate(args[2], ctx);
}

/**
 * Convert a value to boolean.
 * Follows JavaScript truthy/falsy semantics:
 * - false, 0, '', null, undefined, NaN are falsy
 * - Everything else is truthy
 */
function toBoolean(value: unknown): boolean {
  return Boolean(value);
}
