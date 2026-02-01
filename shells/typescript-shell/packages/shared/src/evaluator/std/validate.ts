/**
 * Validate Module Runtime Evaluators
 *
 * Runtime implementations for validate/* operators.
 * Provides validation functions for form inputs and data.
 *
 * @packageDocumentation
 */

import type { SExpr } from '../types/expression.js';
import type { EvaluationContext } from '../context.js';

type EvalFn = (expr: SExpr, ctx: EvaluationContext) => unknown;

/**
 * validate/required - Check if value is not null, undefined, or empty string
 */
export function evalValidateRequired(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const value = evaluate(args[0], ctx);
  return value !== null && value !== undefined && value !== '';
}

/**
 * validate/string - Check if value is a string
 */
export function evalValidateString(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const value = evaluate(args[0], ctx);
  return typeof value === 'string';
}

/**
 * validate/number - Check if value is a number
 */
export function evalValidateNumber(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const value = evaluate(args[0], ctx);
  return typeof value === 'number' && !isNaN(value);
}

/**
 * validate/boolean - Check if value is a boolean
 */
export function evalValidateBoolean(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const value = evaluate(args[0], ctx);
  return typeof value === 'boolean';
}

/**
 * validate/array - Check if value is an array
 */
export function evalValidateArray(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const value = evaluate(args[0], ctx);
  return Array.isArray(value);
}

/**
 * validate/object - Check if value is an object
 */
export function evalValidateObject(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const value = evaluate(args[0], ctx);
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * validate/email - Check if value is a valid email format
 */
export function evalValidateEmail(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const value = evaluate(args[0], ctx);
  if (typeof value !== 'string') return false;
  // Simple email regex - covers most valid cases
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

/**
 * validate/url - Check if value is a valid URL format
 */
export function evalValidateUrl(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const value = evaluate(args[0], ctx);
  if (typeof value !== 'string') return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * validate/uuid - Check if value is a valid UUID
 */
export function evalValidateUuid(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const value = evaluate(args[0], ctx);
  if (typeof value !== 'string') return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

/**
 * validate/phone - Check if value is a valid phone number
 */
export function evalValidatePhone(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const value = evaluate(args[0], ctx);
  if (typeof value !== 'string') return false;
  // Simple phone validation - digits, spaces, dashes, parens, and optional leading +
  const phoneRegex = /^\+?[\d\s\-().]{10,}$/;
  const digits = value.replace(/\D/g, '');
  return phoneRegex.test(value) && digits.length >= 10;
}

/**
 * validate/creditCard - Check if value is a valid credit card number (Luhn algorithm)
 */
export function evalValidateCreditCard(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const value = evaluate(args[0], ctx);
  if (typeof value !== 'string') return false;

  const digits = value.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;

  // Luhn algorithm
  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * validate/date - Check if value is a valid date
 */
export function evalValidateDate(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const value = evaluate(args[0], ctx);
  if (value instanceof Date) return !isNaN(value.getTime());
  if (typeof value === 'number') return !isNaN(new Date(value).getTime());
  if (typeof value === 'string') return !isNaN(new Date(value).getTime());
  return false;
}

/**
 * validate/minLength - Check if string/array has minimum length
 */
export function evalValidateMinLength(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const value = evaluate(args[0], ctx);
  const min = evaluate(args[1], ctx) as number;

  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length >= min;
  }
  return false;
}

/**
 * validate/maxLength - Check if string/array has maximum length
 */
export function evalValidateMaxLength(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const value = evaluate(args[0], ctx);
  const max = evaluate(args[1], ctx) as number;

  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length <= max;
  }
  return false;
}

/**
 * validate/length - Check if string/array has exact length
 */
export function evalValidateLength(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const value = evaluate(args[0], ctx);
  const exact = evaluate(args[1], ctx) as number;

  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === exact;
  }
  return false;
}

/**
 * validate/min - Check if number is >= minimum
 */
export function evalValidateMin(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const value = evaluate(args[0], ctx) as number;
  const min = evaluate(args[1], ctx) as number;
  return typeof value === 'number' && value >= min;
}

/**
 * validate/max - Check if number is <= maximum
 */
export function evalValidateMax(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const value = evaluate(args[0], ctx) as number;
  const max = evaluate(args[1], ctx) as number;
  return typeof value === 'number' && value <= max;
}

/**
 * validate/range - Check if number is within range [min, max]
 */
export function evalValidateRange(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const value = evaluate(args[0], ctx) as number;
  const min = evaluate(args[1], ctx) as number;
  const max = evaluate(args[2], ctx) as number;
  return typeof value === 'number' && value >= min && value <= max;
}

/**
 * validate/pattern - Check if string matches regex pattern
 */
export function evalValidatePattern(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const value = evaluate(args[0], ctx);
  const pattern = evaluate(args[1], ctx) as string;

  if (typeof value !== 'string') return false;
  try {
    const regex = new RegExp(pattern);
    return regex.test(value);
  } catch {
    return false;
  }
}

/**
 * validate/oneOf - Check if value is in list of allowed values
 */
export function evalValidateOneOf(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const value = evaluate(args[0], ctx);
  const options = evaluate(args[1], ctx) as unknown[];
  return (options ?? []).includes(value);
}

/**
 * validate/noneOf - Check if value is not in list of disallowed values
 */
export function evalValidateNoneOf(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const value = evaluate(args[0], ctx);
  const options = evaluate(args[1], ctx) as unknown[];
  return !(options ?? []).includes(value);
}

/**
 * validate/equals - Deep equality check
 */
export function evalValidateEquals(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const a = evaluate(args[0], ctx);
  const b = evaluate(args[1], ctx);

  function deepEqual(x: unknown, y: unknown): boolean {
    if (x === y) return true;
    if (typeof x !== typeof y) return false;
    if (typeof x !== 'object' || x === null || y === null) return false;
    if (Array.isArray(x) !== Array.isArray(y)) return false;

    const xKeys = Object.keys(x);
    const yKeys = Object.keys(y as object);
    if (xKeys.length !== yKeys.length) return false;

    for (const key of xKeys) {
      if (!deepEqual((x as Record<string, unknown>)[key], (y as Record<string, unknown>)[key])) {
        return false;
      }
    }
    return true;
  }

  return deepEqual(a, b);
}

/**
 * validate/check - Run multiple validation rules, return { valid, errors }
 */
export function evalValidateCheck(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): { valid: boolean; errors: string[] } {
  const value = evaluate(args[0], ctx) as Record<string, unknown>;
  const rules = evaluate(args[1], ctx) as Record<string, [string, ...unknown[]][]>;

  const errors: string[] = [];

  for (const [field, fieldRules] of Object.entries(rules ?? {})) {
    const fieldValue = value?.[field];

    for (const rule of fieldRules ?? []) {
      const [ruleName, ...ruleArgs] = rule;
      let isValid = true;

      switch (ruleName) {
        case 'required':
          isValid = fieldValue !== null && fieldValue !== undefined && fieldValue !== '';
          break;
        case 'string':
          isValid = typeof fieldValue === 'string';
          break;
        case 'number':
          isValid = typeof fieldValue === 'number' && !isNaN(fieldValue);
          break;
        case 'boolean':
          isValid = typeof fieldValue === 'boolean';
          break;
        case 'email': {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          isValid = typeof fieldValue === 'string' && emailRegex.test(fieldValue);
          break;
        }
        case 'minLength':
          isValid =
            (typeof fieldValue === 'string' || Array.isArray(fieldValue)) &&
            fieldValue.length >= (ruleArgs[0] as number);
          break;
        case 'maxLength':
          isValid =
            (typeof fieldValue === 'string' || Array.isArray(fieldValue)) &&
            fieldValue.length <= (ruleArgs[0] as number);
          break;
        case 'min':
          isValid = typeof fieldValue === 'number' && fieldValue >= (ruleArgs[0] as number);
          break;
        case 'max':
          isValid = typeof fieldValue === 'number' && fieldValue <= (ruleArgs[0] as number);
          break;
        case 'range':
          isValid =
            typeof fieldValue === 'number' &&
            fieldValue >= (ruleArgs[0] as number) &&
            fieldValue <= (ruleArgs[1] as number);
          break;
        case 'pattern': {
          const regex = new RegExp(ruleArgs[0] as string);
          isValid = typeof fieldValue === 'string' && regex.test(fieldValue);
          break;
        }
        case 'oneOf':
          isValid = (ruleArgs[0] as unknown[])?.includes(fieldValue);
          break;
        default:
          // Unknown rule, skip
          continue;
      }

      if (!isValid) {
        errors.push(`${field}: ${ruleName} validation failed`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
}
