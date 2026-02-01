/**
 * S-Expression Evaluator
 *
 * Runtime interpreter for S-expressions.
 * Used for evaluating guards and executing effects in the preview system.
 *
 * @packageDocumentation
 */

import type { SExpr } from './types/expression.js';
import { isSExpr, isBinding, getOperator, getArgs } from './types/expression.js';
import type { EvaluationContext } from './context.js';
import { resolveBinding } from './context.js';

// Import operators
import {
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
  evalEqual,
  evalNotEqual,
  evalLessThan,
  evalGreaterThan,
  evalLessThanOrEqual,
  evalGreaterThanOrEqual,
  evalMatches,
  evalAnd,
  evalOr,
  evalNot,
  evalIf,
  evalLet,
  evalDo,
  evalWhen,
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
} from './operators/index.js';

// Import std library evaluators
import * as stdMath from './std/math.js';
import * as stdStr from './std/str.js';
import * as stdArray from './std/array.js';
import * as stdObject from './std/object.js';
import * as stdValidate from './std/validate.js';
import * as stdTime from './std/time.js';
import * as stdFormat from './std/format.js';
import * as stdAsync from './std/async.js';

/**
 * JIT compilation cache for hot paths.
 * Maps S-expression JSON to compiled function.
 */
const jitCache = new Map<string, (ctx: EvaluationContext) => unknown>();

/**
 * Maximum JIT cache size to prevent memory issues.
 */
const MAX_JIT_CACHE_SIZE = 1000;

/**
 * S-Expression Evaluator class.
 *
 * Provides runtime interpretation of S-expressions for guards, effects, and computed values.
 */
export class SExpressionEvaluator {
  /**
   * Evaluate an S-expression in the given context.
   *
   * @param expr - S-expression to evaluate
   * @param ctx - Evaluation context with bindings and effect handlers
   * @returns Result of evaluation
   */
  evaluate(expr: SExpr, ctx: EvaluationContext): unknown {
    // Atom: literal value
    if (!isSExpr(expr)) {
      // Check if it's a binding
      if (isBinding(expr)) {
        return resolveBinding(expr, ctx);
      }
      // Return literal value
      return expr;
    }

    // S-expression call
    const op = getOperator(expr)!;
    const args = getArgs(expr);

    // Dispatch to operator implementation
    return this.dispatchOperator(op, args, ctx);
  }

  /**
   * Evaluate an S-expression as a guard (returns boolean).
   *
   * @param expr - S-expression guard
   * @param ctx - Evaluation context
   * @returns true if guard passes, false otherwise
   */
  evaluateGuard(expr: SExpr, ctx: EvaluationContext): boolean {
    const result = this.evaluate(expr, ctx);
    return Boolean(result);
  }

  /**
   * Execute an effect S-expression.
   *
   * @param expr - Effect S-expression (e.g., ["set", "@entity.x", 10])
   * @param ctx - Evaluation context with effect handlers
   */
  executeEffect(expr: SExpr, ctx: EvaluationContext): void {
    this.evaluate(expr, ctx);
  }

  /**
   * Execute multiple effects in sequence.
   *
   * @param effects - Array of effect S-expressions
   * @param ctx - Evaluation context with effect handlers
   */
  executeEffects(effects: SExpr[], ctx: EvaluationContext): void {
    for (const effect of effects) {
      this.executeEffect(effect, ctx);
    }
  }

  /**
   * Compile an S-expression to a function for faster repeated evaluation.
   * Uses a cache to avoid recompilation.
   *
   * @param expr - S-expression to compile
   * @returns Function that evaluates the expression given a context
   */
  compile(expr: SExpr): (ctx: EvaluationContext) => unknown {
    const key = JSON.stringify(expr);

    // Check cache
    const cached = jitCache.get(key);
    if (cached) {
      return cached;
    }

    // Compile to function
    const fn = (ctx: EvaluationContext) => this.evaluate(expr, ctx);

    // Add to cache (with size limit)
    if (jitCache.size >= MAX_JIT_CACHE_SIZE) {
      // Remove oldest entry (first key)
      const firstKey = jitCache.keys().next().value;
      if (firstKey) {
        jitCache.delete(firstKey);
      }
    }
    jitCache.set(key, fn);

    return fn;
  }

  /**
   * Clear the JIT compilation cache.
   */
  clearCache(): void {
    jitCache.clear();
  }

  /**
   * Dispatch to the appropriate operator implementation.
   */
  private dispatchOperator(op: string, args: SExpr[], ctx: EvaluationContext): unknown {
    // Bind evaluate method for passing to operator implementations
    const evaluate = (expr: SExpr, c: EvaluationContext) => this.evaluate(expr, c);

    switch (op) {
      // Arithmetic
      case '+':
        return evalAdd(args, evaluate, ctx);
      case '-':
        return evalSubtract(args, evaluate, ctx);
      case '*':
        return evalMultiply(args, evaluate, ctx);
      case '/':
        return evalDivide(args, evaluate, ctx);
      case '%':
        return evalModulo(args, evaluate, ctx);
      case 'abs':
        return evalAbs(args, evaluate, ctx);
      case 'min':
        return evalMin(args, evaluate, ctx);
      case 'max':
        return evalMax(args, evaluate, ctx);
      case 'floor':
        return evalFloor(args, evaluate, ctx);
      case 'ceil':
        return evalCeil(args, evaluate, ctx);
      case 'round':
        return evalRound(args, evaluate, ctx);
      case 'clamp':
        return evalClamp(args, evaluate, ctx);

      // Comparison
      case '=':
        return evalEqual(args, evaluate, ctx);
      case '!=':
        return evalNotEqual(args, evaluate, ctx);
      case '<':
        return evalLessThan(args, evaluate, ctx);
      case '>':
        return evalGreaterThan(args, evaluate, ctx);
      case '<=':
        return evalLessThanOrEqual(args, evaluate, ctx);
      case '>=':
        return evalGreaterThanOrEqual(args, evaluate, ctx);
      case 'matches':
        return evalMatches(args, evaluate, ctx);

      // Logic
      case 'and':
        return evalAnd(args, evaluate, ctx);
      case 'or':
        return evalOr(args, evaluate, ctx);
      case 'not':
        return evalNot(args, evaluate, ctx);
      case 'if':
        return evalIf(args, evaluate, ctx);

      // Control
      case 'let':
        return evalLet(args, evaluate, ctx);
      case 'do':
        return evalDo(args, evaluate, ctx);
      case 'when':
        return evalWhen(args, evaluate, ctx);

      // Collections
      case 'map':
        return evalMap(args, evaluate, ctx);
      case 'filter':
        return evalFilter(args, evaluate, ctx);
      case 'find':
        return evalFind(args, evaluate, ctx);
      case 'count':
        return evalCount(args, evaluate, ctx);
      case 'sum':
        return evalSum(args, evaluate, ctx);
      case 'first':
        return evalFirst(args, evaluate, ctx);
      case 'last':
        return evalLast(args, evaluate, ctx);
      case 'nth':
        return evalNth(args, evaluate, ctx);
      case 'concat':
        return evalConcat(args, evaluate, ctx);
      case 'includes':
        return evalIncludes(args, evaluate, ctx);
      case 'empty':
        return evalEmpty(args, evaluate, ctx);

      // Effects
      case 'set':
        evalSet(args, evaluate, ctx);
        return undefined;
      case 'set-dynamic':
        evalSetDynamic(args, evaluate, ctx);
        return undefined;
      case 'increment':
        evalIncrement(args, evaluate, ctx);
        return undefined;
      case 'decrement':
        evalDecrement(args, evaluate, ctx);
        return undefined;
      case 'emit':
        evalEmit(args, evaluate, ctx);
        return undefined;
      case 'persist':
        evalPersist(args, evaluate, ctx);
        return undefined;
      case 'navigate':
        evalNavigate(args, evaluate, ctx);
        return undefined;
      case 'notify':
        evalNotify(args, evaluate, ctx);
        return undefined;
      case 'spawn':
        evalSpawn(args, evaluate, ctx);
        return undefined;
      case 'despawn':
        evalDespawn(args, evaluate, ctx);
        return undefined;
      case 'call-service':
        evalCallService(args, evaluate, ctx);
        return undefined;
      case 'render-ui':
        evalRenderUI(args, evaluate, ctx);
        return undefined;

      // ===============================
      // Standard Library: math/*
      // ===============================
      case 'math/abs':
        return stdMath.evalMathAbs(args, evaluate, ctx);
      case 'math/min':
        return stdMath.evalMathMin(args, evaluate, ctx);
      case 'math/max':
        return stdMath.evalMathMax(args, evaluate, ctx);
      case 'math/clamp':
        return stdMath.evalMathClamp(args, evaluate, ctx);
      case 'math/floor':
        return stdMath.evalMathFloor(args, evaluate, ctx);
      case 'math/ceil':
        return stdMath.evalMathCeil(args, evaluate, ctx);
      case 'math/round':
        return stdMath.evalMathRound(args, evaluate, ctx);
      case 'math/pow':
        return stdMath.evalMathPow(args, evaluate, ctx);
      case 'math/sqrt':
        return stdMath.evalMathSqrt(args, evaluate, ctx);
      case 'math/mod':
        return stdMath.evalMathMod(args, evaluate, ctx);
      case 'math/sign':
        return stdMath.evalMathSign(args, evaluate, ctx);
      case 'math/lerp':
        return stdMath.evalMathLerp(args, evaluate, ctx);
      case 'math/map':
        return stdMath.evalMathMap(args, evaluate, ctx);
      case 'math/random':
        return stdMath.evalMathRandom();
      case 'math/randomInt':
        return stdMath.evalMathRandomInt(args, evaluate, ctx);
      case 'math/default':
        return stdMath.evalMathDefault(args, evaluate, ctx);

      // ===============================
      // Standard Library: str/*
      // ===============================
      case 'str/len':
        return stdStr.evalStrLen(args, evaluate, ctx);
      case 'str/upper':
        return stdStr.evalStrUpper(args, evaluate, ctx);
      case 'str/lower':
        return stdStr.evalStrLower(args, evaluate, ctx);
      case 'str/trim':
        return stdStr.evalStrTrim(args, evaluate, ctx);
      case 'str/trimStart':
        return stdStr.evalStrTrimStart(args, evaluate, ctx);
      case 'str/trimEnd':
        return stdStr.evalStrTrimEnd(args, evaluate, ctx);
      case 'str/split':
        return stdStr.evalStrSplit(args, evaluate, ctx);
      case 'str/join':
        return stdStr.evalStrJoin(args, evaluate, ctx);
      case 'str/slice':
        return stdStr.evalStrSlice(args, evaluate, ctx);
      case 'str/replace':
        return stdStr.evalStrReplace(args, evaluate, ctx);
      case 'str/replaceAll':
        return stdStr.evalStrReplaceAll(args, evaluate, ctx);
      case 'str/includes':
        return stdStr.evalStrIncludes(args, evaluate, ctx);
      case 'str/startsWith':
        return stdStr.evalStrStartsWith(args, evaluate, ctx);
      case 'str/endsWith':
        return stdStr.evalStrEndsWith(args, evaluate, ctx);
      case 'str/padStart':
        return stdStr.evalStrPadStart(args, evaluate, ctx);
      case 'str/padEnd':
        return stdStr.evalStrPadEnd(args, evaluate, ctx);
      case 'str/repeat':
        return stdStr.evalStrRepeat(args, evaluate, ctx);
      case 'str/reverse':
        return stdStr.evalStrReverse(args, evaluate, ctx);
      case 'str/capitalize':
        return stdStr.evalStrCapitalize(args, evaluate, ctx);
      case 'str/titleCase':
        return stdStr.evalStrTitleCase(args, evaluate, ctx);
      case 'str/camelCase':
        return stdStr.evalStrCamelCase(args, evaluate, ctx);
      case 'str/kebabCase':
        return stdStr.evalStrKebabCase(args, evaluate, ctx);
      case 'str/snakeCase':
        return stdStr.evalStrSnakeCase(args, evaluate, ctx);
      case 'str/default':
        return stdStr.evalStrDefault(args, evaluate, ctx);
      case 'str/template':
        return stdStr.evalStrTemplate(args, evaluate, ctx);
      case 'str/truncate':
        return stdStr.evalStrTruncate(args, evaluate, ctx);

      // ===============================
      // Standard Library: array/*
      // ===============================
      case 'array/len':
        return stdArray.evalArrayLen(args, evaluate, ctx);
      case 'array/empty?':
        return stdArray.evalArrayEmpty(args, evaluate, ctx);
      case 'array/first':
        return stdArray.evalArrayFirst(args, evaluate, ctx);
      case 'array/last':
        return stdArray.evalArrayLast(args, evaluate, ctx);
      case 'array/nth':
        return stdArray.evalArrayNth(args, evaluate, ctx);
      case 'array/slice':
        return stdArray.evalArraySlice(args, evaluate, ctx);
      case 'array/concat':
        return stdArray.evalArrayConcat(args, evaluate, ctx);
      case 'array/append':
        return stdArray.evalArrayAppend(args, evaluate, ctx);
      case 'array/prepend':
        return stdArray.evalArrayPrepend(args, evaluate, ctx);
      case 'array/insert':
        return stdArray.evalArrayInsert(args, evaluate, ctx);
      case 'array/remove':
        return stdArray.evalArrayRemove(args, evaluate, ctx);
      case 'array/removeItem':
        return stdArray.evalArrayRemoveItem(args, evaluate, ctx);
      case 'array/reverse':
        return stdArray.evalArrayReverse(args, evaluate, ctx);
      case 'array/sort':
        return stdArray.evalArraySort(args, evaluate, ctx);
      case 'array/shuffle':
        return stdArray.evalArrayShuffle(args, evaluate, ctx);
      case 'array/unique':
        return stdArray.evalArrayUnique(args, evaluate, ctx);
      case 'array/flatten':
        return stdArray.evalArrayFlatten(args, evaluate, ctx);
      case 'array/zip':
        return stdArray.evalArrayZip(args, evaluate, ctx);
      case 'array/includes':
        return stdArray.evalArrayIncludes(args, evaluate, ctx);
      case 'array/indexOf':
        return stdArray.evalArrayIndexOf(args, evaluate, ctx);
      case 'array/find':
        return stdArray.evalArrayFind(args, evaluate, ctx);
      case 'array/findIndex':
        return stdArray.evalArrayFindIndex(args, evaluate, ctx);
      case 'array/filter':
        return stdArray.evalArrayFilter(args, evaluate, ctx);
      case 'array/reject':
        return stdArray.evalArrayReject(args, evaluate, ctx);
      case 'array/map':
        return stdArray.evalArrayMap(args, evaluate, ctx);
      case 'array/reduce':
        return stdArray.evalArrayReduce(args, evaluate, ctx);
      case 'array/every':
        return stdArray.evalArrayEvery(args, evaluate, ctx);
      case 'array/some':
        return stdArray.evalArraySome(args, evaluate, ctx);
      case 'array/count':
        return stdArray.evalArrayCount(args, evaluate, ctx);
      case 'array/sum':
        return stdArray.evalArraySum(args, evaluate, ctx);
      case 'array/avg':
        return stdArray.evalArrayAvg(args, evaluate, ctx);
      case 'array/min':
        return stdArray.evalArrayMin(args, evaluate, ctx);
      case 'array/max':
        return stdArray.evalArrayMax(args, evaluate, ctx);
      case 'array/groupBy':
        return stdArray.evalArrayGroupBy(args, evaluate, ctx);
      case 'array/partition':
        return stdArray.evalArrayPartition(args, evaluate, ctx);
      case 'array/take':
        return stdArray.evalArrayTake(args, evaluate, ctx);
      case 'array/drop':
        return stdArray.evalArrayDrop(args, evaluate, ctx);
      case 'array/takeLast':
        return stdArray.evalArrayTakeLast(args, evaluate, ctx);
      case 'array/dropLast':
        return stdArray.evalArrayDropLast(args, evaluate, ctx);

      // ===============================
      // Standard Library: object/*
      // ===============================
      case 'object/keys':
        return stdObject.evalObjectKeys(args, evaluate, ctx);
      case 'object/values':
        return stdObject.evalObjectValues(args, evaluate, ctx);
      case 'object/entries':
        return stdObject.evalObjectEntries(args, evaluate, ctx);
      case 'object/fromEntries':
        return stdObject.evalObjectFromEntries(args, evaluate, ctx);
      case 'object/get':
        return stdObject.evalObjectGet(args, evaluate, ctx);
      case 'object/set':
        return stdObject.evalObjectSet(args, evaluate, ctx);
      case 'object/has':
        return stdObject.evalObjectHas(args, evaluate, ctx);
      case 'object/merge':
        return stdObject.evalObjectMerge(args, evaluate, ctx);
      case 'object/deepMerge':
        return stdObject.evalObjectDeepMerge(args, evaluate, ctx);
      case 'object/pick':
        return stdObject.evalObjectPick(args, evaluate, ctx);
      case 'object/omit':
        return stdObject.evalObjectOmit(args, evaluate, ctx);
      case 'object/mapValues':
        return stdObject.evalObjectMapValues(args, evaluate, ctx);
      case 'object/mapKeys':
        return stdObject.evalObjectMapKeys(args, evaluate, ctx);
      case 'object/filter':
        return stdObject.evalObjectFilter(args, evaluate, ctx);
      case 'object/empty?':
        return stdObject.evalObjectEmpty(args, evaluate, ctx);
      case 'object/equals':
        return stdObject.evalObjectEquals(args, evaluate, ctx);
      case 'object/clone':
        return stdObject.evalObjectClone(args, evaluate, ctx);
      case 'object/deepClone':
        return stdObject.evalObjectDeepClone(args, evaluate, ctx);

      // Path operator (for dynamic field access)
      case 'path':
        return stdObject.evalPath(args, evaluate, ctx);

      // ===============================
      // Standard Library: validate/*
      // ===============================
      case 'validate/required':
        return stdValidate.evalValidateRequired(args, evaluate, ctx);
      case 'validate/string':
        return stdValidate.evalValidateString(args, evaluate, ctx);
      case 'validate/number':
        return stdValidate.evalValidateNumber(args, evaluate, ctx);
      case 'validate/boolean':
        return stdValidate.evalValidateBoolean(args, evaluate, ctx);
      case 'validate/array':
        return stdValidate.evalValidateArray(args, evaluate, ctx);
      case 'validate/object':
        return stdValidate.evalValidateObject(args, evaluate, ctx);
      case 'validate/email':
        return stdValidate.evalValidateEmail(args, evaluate, ctx);
      case 'validate/url':
        return stdValidate.evalValidateUrl(args, evaluate, ctx);
      case 'validate/uuid':
        return stdValidate.evalValidateUuid(args, evaluate, ctx);
      case 'validate/phone':
        return stdValidate.evalValidatePhone(args, evaluate, ctx);
      case 'validate/creditCard':
        return stdValidate.evalValidateCreditCard(args, evaluate, ctx);
      case 'validate/date':
        return stdValidate.evalValidateDate(args, evaluate, ctx);
      case 'validate/minLength':
        return stdValidate.evalValidateMinLength(args, evaluate, ctx);
      case 'validate/maxLength':
        return stdValidate.evalValidateMaxLength(args, evaluate, ctx);
      case 'validate/length':
        return stdValidate.evalValidateLength(args, evaluate, ctx);
      case 'validate/min':
        return stdValidate.evalValidateMin(args, evaluate, ctx);
      case 'validate/max':
        return stdValidate.evalValidateMax(args, evaluate, ctx);
      case 'validate/range':
        return stdValidate.evalValidateRange(args, evaluate, ctx);
      case 'validate/pattern':
        return stdValidate.evalValidatePattern(args, evaluate, ctx);
      case 'validate/oneOf':
        return stdValidate.evalValidateOneOf(args, evaluate, ctx);
      case 'validate/noneOf':
        return stdValidate.evalValidateNoneOf(args, evaluate, ctx);
      case 'validate/equals':
        return stdValidate.evalValidateEquals(args, evaluate, ctx);
      case 'validate/check':
        return stdValidate.evalValidateCheck(args, evaluate, ctx);

      // ===============================
      // Standard Library: time/*
      // ===============================
      case 'time/now':
        return stdTime.evalTimeNow();
      case 'time/today':
        return stdTime.evalTimeToday();
      case 'time/parse':
        return stdTime.evalTimeParse(args, evaluate, ctx);
      case 'time/format':
        return stdTime.evalTimeFormat(args, evaluate, ctx);
      case 'time/year':
        return stdTime.evalTimeYear(args, evaluate, ctx);
      case 'time/month':
        return stdTime.evalTimeMonth(args, evaluate, ctx);
      case 'time/day':
        return stdTime.evalTimeDay(args, evaluate, ctx);
      case 'time/weekday':
        return stdTime.evalTimeWeekday(args, evaluate, ctx);
      case 'time/hour':
        return stdTime.evalTimeHour(args, evaluate, ctx);
      case 'time/minute':
        return stdTime.evalTimeMinute(args, evaluate, ctx);
      case 'time/second':
        return stdTime.evalTimeSecond(args, evaluate, ctx);
      case 'time/add':
        return stdTime.evalTimeAdd(args, evaluate, ctx);
      case 'time/subtract':
        return stdTime.evalTimeSubtract(args, evaluate, ctx);
      case 'time/diff':
        return stdTime.evalTimeDiff(args, evaluate, ctx);
      case 'time/startOf':
        return stdTime.evalTimeStartOf(args, evaluate, ctx);
      case 'time/endOf':
        return stdTime.evalTimeEndOf(args, evaluate, ctx);
      case 'time/isBefore':
        return stdTime.evalTimeIsBefore(args, evaluate, ctx);
      case 'time/isAfter':
        return stdTime.evalTimeIsAfter(args, evaluate, ctx);
      case 'time/isBetween':
        return stdTime.evalTimeIsBetween(args, evaluate, ctx);
      case 'time/isSame':
        return stdTime.evalTimeIsSame(args, evaluate, ctx);
      case 'time/isPast':
        return stdTime.evalTimeIsPast(args, evaluate, ctx);
      case 'time/isFuture':
        return stdTime.evalTimeIsFuture(args, evaluate, ctx);
      case 'time/isToday':
        return stdTime.evalTimeIsToday(args, evaluate, ctx);
      case 'time/relative':
        return stdTime.evalTimeRelative(args, evaluate, ctx);
      case 'time/duration':
        return stdTime.evalTimeDuration(args, evaluate, ctx);

      // ===============================
      // Standard Library: format/*
      // ===============================
      case 'format/number':
        return stdFormat.evalFormatNumber(args, evaluate, ctx);
      case 'format/currency':
        return stdFormat.evalFormatCurrency(args, evaluate, ctx);
      case 'format/percent':
        return stdFormat.evalFormatPercent(args, evaluate, ctx);
      case 'format/bytes':
        return stdFormat.evalFormatBytes(args, evaluate, ctx);
      case 'format/ordinal':
        return stdFormat.evalFormatOrdinal(args, evaluate, ctx);
      case 'format/plural':
        return stdFormat.evalFormatPlural(args, evaluate, ctx);
      case 'format/list':
        return stdFormat.evalFormatList(args, evaluate, ctx);
      case 'format/phone':
        return stdFormat.evalFormatPhone(args, evaluate, ctx);
      case 'format/creditCard':
        return stdFormat.evalFormatCreditCard(args, evaluate, ctx);

      // ===============================
      // Standard Library: async/*
      // ===============================
      case 'async/delay':
        return stdAsync.evalAsyncDelay(args, evaluate, ctx);
      case 'async/timeout':
        return stdAsync.evalAsyncTimeout(args, evaluate, ctx);
      case 'async/debounce':
        stdAsync.evalAsyncDebounce(args, evaluate, ctx);
        return undefined;
      case 'async/throttle':
        stdAsync.evalAsyncThrottle(args, evaluate, ctx);
        return undefined;
      case 'async/retry':
        return stdAsync.evalAsyncRetry(args, evaluate, ctx);
      case 'async/race':
        return stdAsync.evalAsyncRace(args, evaluate, ctx);
      case 'async/all':
        return stdAsync.evalAsyncAll(args, evaluate, ctx);
      case 'async/sequence':
        return stdAsync.evalAsyncSequence(args, evaluate, ctx);

      default:
        console.warn(`Unknown operator: ${op}`);
        return undefined;
    }
  }
}

// Export singleton instance for convenience
export const evaluator = new SExpressionEvaluator();

// Export convenience functions
export function evaluate(expr: SExpr, ctx: EvaluationContext): unknown {
  return evaluator.evaluate(expr, ctx);
}

export function evaluateGuard(expr: SExpr, ctx: EvaluationContext): boolean {
  return evaluator.evaluateGuard(expr, ctx);
}

export function executeEffect(expr: SExpr, ctx: EvaluationContext): void {
  evaluator.executeEffect(expr, ctx);
}

export function executeEffects(effects: SExpr[], ctx: EvaluationContext): void {
  evaluator.executeEffects(effects, ctx);
}
