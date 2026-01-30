/**
 * Control Operator Implementations
 *
 * Implements: let, do, when, fn
 */

import type { SExpr } from '../types/expression.js';
import type { EvaluationContext } from '../context.js';
import { createChildContext } from '../context.js';

type Evaluator = (expr: SExpr, ctx: EvaluationContext) => unknown;

/**
 * Evaluate let binding: ["let", [[name, value], ...], body]
 * Creates local bindings for use in body.
 */
export function evalLet(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): unknown {
  const bindings = args[0] as SExpr[][];
  const body = args[1];

  // Evaluate bindings and create new context
  const locals = new Map<string, unknown>();
  for (const binding of bindings) {
    const name = binding[0] as string;
    const value = evaluate(binding[1], ctx);
    locals.set(name, value);
  }

  // Evaluate body with new context
  const childCtx = createChildContext(ctx, locals);
  return evaluate(body, childCtx);
}

/**
 * Evaluate do block: ["do", expr1, expr2, ...]
 * Executes expressions in sequence, returns last result.
 */
export function evalDo(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): unknown {
  let result: unknown = undefined;
  for (const expr of args) {
    result = evaluate(expr, ctx);
  }
  return result;
}

/**
 * Evaluate when: ["when", condition, effect]
 * Executes effect only when condition is truthy.
 */
export function evalWhen(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): void {
  const condition = evaluate(args[0], ctx);
  if (Boolean(condition)) {
    evaluate(args[1], ctx);
  }
}

/**
 * Evaluate lambda: ["fn", varName, body] or ["fn", [vars], body]
 * Creates a function that can be passed to collection operators.
 */
export function evalFn(
  args: SExpr[],
  _evaluate: Evaluator,
  _ctx: EvaluationContext
): (item: unknown, evaluate: Evaluator, ctx: EvaluationContext) => unknown {
  const params = args[0];
  const body = args[1];

  // Return a closure that can be called with an item
  return (item: unknown, evaluate: Evaluator, ctx: EvaluationContext) => {
    const locals = new Map<string, unknown>();

    // Handle single variable or array of variables
    if (typeof params === 'string') {
      locals.set(params, item);
    } else if (Array.isArray(params)) {
      const itemArray = Array.isArray(item) ? item : [item];
      for (let i = 0; i < params.length; i++) {
        locals.set(params[i] as string, itemArray[i]);
      }
    }

    const childCtx = createChildContext(ctx, locals);
    return evaluate(body, childCtx);
  };
}
