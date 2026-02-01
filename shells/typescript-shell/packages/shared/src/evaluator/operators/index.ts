/**
 * Operator Index
 *
 * Re-exports all operator implementations.
 */

// Arithmetic operators
export {
  evalAdd,
  evalSubtract,
  evalMultiply,
  evalDivide,
  evalModulo,
  evalAbs,
  evalMin,
  evalMax,
  evalFloor,
  evalCeil,
  evalRound,
  evalClamp,
} from './arithmetic.js';

// Comparison operators
export {
  evalEqual,
  evalNotEqual,
  evalLessThan,
  evalGreaterThan,
  evalLessThanOrEqual,
  evalGreaterThanOrEqual,
  evalMatches,
} from './comparison.js';

// Logic operators
export { evalAnd, evalOr, evalNot, evalIf } from './logic.js';

// Control operators
export { evalLet, evalDo, evalWhen, evalFn } from './control.js';

// Collection operators
export {
  evalMap,
  evalFilter,
  evalFind,
  evalCount,
  evalSum,
  evalFirst,
  evalLast,
  evalNth,
  evalConcat,
  evalIncludes,
  evalEmpty,
} from './collections.js';

// Effect operators
export {
  evalSet,
  evalSetDynamic,
  evalIncrement,
  evalDecrement,
  evalEmit,
  evalPersist,
  evalNavigate,
  evalNotify,
  evalSpawn,
  evalDespawn,
  evalCallService,
  evalRenderUI,
} from './effects.js';
