/**
 * Collection Operator Implementations
 *
 * Implements: map, filter, find, count, sum, first, last, nth, concat, includes, empty
 */

import type { SExpr } from '../types/expression.js';
import type { EvaluationContext } from '../context.js';
import { createChildContext } from '../context.js';

type Evaluator = (expr: SExpr, ctx: EvaluationContext) => unknown;

/**
 * Evaluate map: ["map", collection, ["fn", varName, body]]
 */
export function evalMap(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): unknown[] {
  const collection = toArray(evaluate(args[0], ctx));
  const fnExpr = args[1] as SExpr[];

  // Get function params and body
  const params = fnExpr[1];
  const body = fnExpr[2];
  const varName = typeof params === 'string' ? params : (params as SExpr[])[0] as string;

  return collection.map((item) => {
    const locals = new Map<string, unknown>();
    locals.set(varName, item);
    const childCtx = createChildContext(ctx, locals);
    return evaluate(body, childCtx);
  });
}

/**
 * Evaluate filter: ["filter", collection, ["fn", varName, predicate]]
 */
export function evalFilter(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): unknown[] {
  const collection = toArray(evaluate(args[0], ctx));
  const fnExpr = args[1] as SExpr[];

  const params = fnExpr[1];
  const body = fnExpr[2];
  const varName = typeof params === 'string' ? params : (params as SExpr[])[0] as string;

  return collection.filter((item) => {
    const locals = new Map<string, unknown>();
    locals.set(varName, item);
    const childCtx = createChildContext(ctx, locals);
    return Boolean(evaluate(body, childCtx));
  });
}

/**
 * Evaluate find: ["find", collection, ["fn", varName, predicate]]
 */
export function evalFind(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): unknown {
  const collection = toArray(evaluate(args[0], ctx));
  const fnExpr = args[1] as SExpr[];

  const params = fnExpr[1];
  const body = fnExpr[2];
  const varName = typeof params === 'string' ? params : (params as SExpr[])[0] as string;

  return collection.find((item) => {
    const locals = new Map<string, unknown>();
    locals.set(varName, item);
    const childCtx = createChildContext(ctx, locals);
    return Boolean(evaluate(body, childCtx));
  });
}

/**
 * Evaluate count: ["count", collection]
 */
export function evalCount(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): number {
  const collection = toArray(evaluate(args[0], ctx));
  return collection.length;
}

/**
 * Evaluate sum: ["sum", collection] or ["sum", collection, ["fn", varName, mapper]]
 */
export function evalSum(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): number {
  const collection = toArray(evaluate(args[0], ctx));

  if (args.length === 1) {
    // Direct sum
    return collection.reduce((sum: number, item) => sum + toNumber(item), 0);
  }

  // Sum with mapper function
  const fnExpr = args[1] as SExpr[];
  const params = fnExpr[1];
  const body = fnExpr[2];
  const varName = typeof params === 'string' ? params : (params as SExpr[])[0] as string;

  return collection.reduce((sum: number, item) => {
    const locals = new Map<string, unknown>();
    locals.set(varName, item);
    const childCtx = createChildContext(ctx, locals);
    return sum + toNumber(evaluate(body, childCtx));
  }, 0);
}

/**
 * Evaluate first: ["first", collection]
 */
export function evalFirst(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): unknown {
  const collection = toArray(evaluate(args[0], ctx));
  return collection.length > 0 ? collection[0] : undefined;
}

/**
 * Evaluate last: ["last", collection]
 */
export function evalLast(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): unknown {
  const collection = toArray(evaluate(args[0], ctx));
  return collection.length > 0 ? collection[collection.length - 1] : undefined;
}

/**
 * Evaluate nth: ["nth", collection, index]
 */
export function evalNth(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): unknown {
  const collection = toArray(evaluate(args[0], ctx));
  const index = toNumber(evaluate(args[1], ctx));
  return collection[index];
}

/**
 * Evaluate concat: ["concat", collection1, collection2, ...]
 */
export function evalConcat(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): unknown[] {
  const result: unknown[] = [];
  for (const arg of args) {
    const collection = toArray(evaluate(arg, ctx));
    result.push(...collection);
  }
  return result;
}

/**
 * Evaluate includes: ["includes", collection, element]
 */
export function evalIncludes(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): boolean {
  const collection = toArray(evaluate(args[0], ctx));
  const element = evaluate(args[1], ctx);
  return collection.includes(element);
}

/**
 * Evaluate empty: ["empty", collection]
 */
export function evalEmpty(args: SExpr[], evaluate: Evaluator, ctx: EvaluationContext): boolean {
  const collection = toArray(evaluate(args[0], ctx));
  return collection.length === 0;
}

/**
 * Convert a value to an array.
 */
function toArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (value === null || value === undefined) return [];
  return [value];
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
