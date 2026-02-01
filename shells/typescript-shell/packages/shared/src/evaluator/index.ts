/**
 * S-Expression Evaluator Module
 *
 * Runtime interpreter for S-expressions.
 * Provides evaluation of guards and execution of effects.
 *
 * This is the source of truth for S-expression evaluation.
 * Other packages (builder, shells) should import from here.
 *
 * @packageDocumentation
 */

// Types
export type { SExpr, SExprAtom, Expression, ParsedBinding, CoreBinding } from './types/expression.js';
export {
  isSExpr,
  isSExprAtom,
  isBinding,
  isSExprCall,
  parseBinding,
  isValidBinding,
  getOperator,
  getArgs,
  sexpr,
  walkSExpr,
  collectBindings,
  SExprSchema,
  ExpressionSchema,
  CORE_BINDINGS,
} from './types/expression.js';

// Context
export {
  type EvaluationContext,
  createMinimalContext,
  createEffectContext,
  createChildContext,
  resolveBinding,
} from './context.js';

// Evaluator
export {
  SExpressionEvaluator,
  evaluator,
  evaluate,
  evaluateGuard,
  executeEffect,
  executeEffects,
} from './SExpressionEvaluator.js';

// Operators (for advanced use cases)
export * from './operators/index.js';
