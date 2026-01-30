/**
 * Format Module Runtime Evaluators
 *
 * Runtime implementations for format/* operators.
 * Provides formatting functions for numbers, currencies, and display values.
 *
 * @packageDocumentation
 */

import type { SExpr } from '../types/expression.js';
import type { EvaluationContext } from '../context.js';

type EvalFn = (expr: SExpr, ctx: EvaluationContext) => unknown;

/**
 * format/number - Format number with locale-aware separators
 */
export function evalFormatNumber(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const n = evaluate(args[0], ctx) as number;
  const opts = args.length > 1 ? (evaluate(args[1], ctx) as { decimals?: number; locale?: string }) : {};

  const locale = opts?.locale ?? 'en-US';
  const options: Intl.NumberFormatOptions = {};

  if (opts?.decimals !== undefined) {
    options.minimumFractionDigits = opts.decimals;
    options.maximumFractionDigits = opts.decimals;
  }

  return new Intl.NumberFormat(locale, options).format(n);
}

/**
 * format/currency - Format as currency
 */
export function evalFormatCurrency(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const n = evaluate(args[0], ctx) as number;
  const currency = evaluate(args[1], ctx) as string;
  const locale = args.length > 2 ? (evaluate(args[2], ctx) as string) : 'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(n);
}

/**
 * format/percent - Format as percentage
 */
export function evalFormatPercent(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const n = evaluate(args[0], ctx) as number;
  const decimals = args.length > 1 ? (evaluate(args[1], ctx) as number) : 0;

  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

/**
 * format/bytes - Format bytes as human-readable size
 */
export function evalFormatBytes(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const bytes = evaluate(args[0], ctx) as number;

  if (bytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const value = bytes / Math.pow(k, i);
  // Use different precision rules
  if (i === 0) {
    return `${bytes} B`;
  }
  // Round values >= 10, or use 1 decimal for smaller values
  // Also remove .0 for whole numbers
  let formatted: string;
  if (value >= 10) {
    formatted = String(Math.round(value));
  } else if (Number.isInteger(value)) {
    formatted = String(value);
  } else {
    formatted = value.toFixed(1);
  }

  return `${formatted} ${units[i]}`;
}

/**
 * format/ordinal - Format number as ordinal (1st, 2nd, 3rd)
 */
export function evalFormatOrdinal(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const n = evaluate(args[0], ctx) as number;

  const absN = Math.abs(n);
  const lastDigit = absN % 10;
  const lastTwoDigits = absN % 100;

  let suffix: string;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    suffix = 'th';
  } else if (lastDigit === 1) {
    suffix = 'st';
  } else if (lastDigit === 2) {
    suffix = 'nd';
  } else if (lastDigit === 3) {
    suffix = 'rd';
  } else {
    suffix = 'th';
  }

  return `${n}${suffix}`;
}

/**
 * format/plural - Format count with singular/plural word
 */
export function evalFormatPlural(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const n = evaluate(args[0], ctx) as number;
  const singular = evaluate(args[1], ctx) as string;
  const plural = evaluate(args[2], ctx) as string;

  return `${n} ${Math.abs(n) === 1 ? singular : plural}`;
}

/**
 * format/list - Format array as natural language list
 */
export function evalFormatList(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const arr = evaluate(args[0], ctx) as string[];
  const style = args.length > 1 ? (evaluate(args[1], ctx) as 'and' | 'or') : 'and';

  if (!arr || arr.length === 0) return '';
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return `${arr[0]} ${style} ${arr[1]}`;

  const last = arr[arr.length - 1];
  const rest = arr.slice(0, -1);
  return `${rest.join(', ')}, ${style} ${last}`;
}

/**
 * format/phone - Format phone number
 */
export function evalFormatPhone(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const str = evaluate(args[0], ctx) as string;
  const format = args.length > 1 ? (evaluate(args[1], ctx) as string) : 'US';

  // Extract only digits
  const digits = str?.replace(/\D/g, '') ?? '';

  if (format === 'US' && digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  if (format === 'US' && digits.length === 11 && digits[0] === '1') {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }

  // Default: group into chunks of 3-4
  if (digits.length >= 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  return str;
}

/**
 * format/creditCard - Format credit card with masked digits
 */
export function evalFormatCreditCard(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const str = evaluate(args[0], ctx) as string;

  const digits = str?.replace(/\D/g, '') ?? '';

  if (digits.length < 4) return str;

  // Show only last 4 digits
  const lastFour = digits.slice(-4);
  const masked = '•'.repeat(digits.length - 4);

  // Format in groups of 4
  const combined = masked + lastFour;
  return combined.match(/.{1,4}/g)?.join(' ') ?? combined;
}
