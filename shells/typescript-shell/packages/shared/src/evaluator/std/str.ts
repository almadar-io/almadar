/**
 * String Module Runtime Evaluators
 *
 * Runtime implementations for str/* operators.
 *
 * @packageDocumentation
 */

import type { SExpr } from '../types/expression.js';
import type { EvaluationContext } from '../context.js';

type EvalFn = (expr: SExpr, ctx: EvaluationContext) => unknown;

/**
 * str/len - String length
 */
export function evalStrLen(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const s = evaluate(args[0], ctx) as string;
  return s?.length ?? 0;
}

/**
 * str/upper - Convert to uppercase
 */
export function evalStrUpper(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const s = evaluate(args[0], ctx) as string;
  return s?.toUpperCase() ?? '';
}

/**
 * str/lower - Convert to lowercase
 */
export function evalStrLower(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const s = evaluate(args[0], ctx) as string;
  return s?.toLowerCase() ?? '';
}

/**
 * str/trim - Remove leading and trailing whitespace
 */
export function evalStrTrim(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const s = evaluate(args[0], ctx) as string;
  return s?.trim() ?? '';
}

/**
 * str/trimStart - Remove leading whitespace
 */
export function evalStrTrimStart(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const s = evaluate(args[0], ctx) as string;
  return s?.trimStart() ?? '';
}

/**
 * str/trimEnd - Remove trailing whitespace
 */
export function evalStrTrimEnd(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const s = evaluate(args[0], ctx) as string;
  return s?.trimEnd() ?? '';
}

/**
 * str/split - Split string into array by delimiter
 */
export function evalStrSplit(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string[] {
  const s = evaluate(args[0], ctx) as string;
  const delim = evaluate(args[1], ctx) as string;
  return s?.split(delim) ?? [];
}

/**
 * str/join - Join array elements into string
 */
export function evalStrJoin(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const arr = evaluate(args[0], ctx) as unknown[];
  const delim = evaluate(args[1], ctx) as string;
  return arr?.join(delim) ?? '';
}

/**
 * str/slice - Extract substring
 */
export function evalStrSlice(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const s = evaluate(args[0], ctx) as string;
  const start = evaluate(args[1], ctx) as number;
  const end = args.length > 2 ? (evaluate(args[2], ctx) as number) : undefined;
  return s?.slice(start, end) ?? '';
}

/**
 * str/replace - Replace first occurrence
 */
export function evalStrReplace(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const s = evaluate(args[0], ctx) as string;
  const find = evaluate(args[1], ctx) as string;
  const replacement = evaluate(args[2], ctx) as string;
  return s?.replace(find, replacement) ?? '';
}

/**
 * str/replaceAll - Replace all occurrences
 * Uses replace with global regex for ES2020 compatibility
 */
export function evalStrReplaceAll(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const s = evaluate(args[0], ctx) as string;
  const find = evaluate(args[1], ctx) as string;
  const replacement = evaluate(args[2], ctx) as string;
  if (!s || !find) return s ?? '';
  // Escape special regex characters in the search string
  const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return s.replace(new RegExp(escaped, 'g'), replacement);
}

/**
 * str/includes - Check if string contains substring
 */
export function evalStrIncludes(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const s = evaluate(args[0], ctx) as string;
  const search = evaluate(args[1], ctx) as string;
  return s?.includes(search) ?? false;
}

/**
 * str/startsWith - Check if string starts with prefix
 */
export function evalStrStartsWith(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const s = evaluate(args[0], ctx) as string;
  const prefix = evaluate(args[1], ctx) as string;
  return s?.startsWith(prefix) ?? false;
}

/**
 * str/endsWith - Check if string ends with suffix
 */
export function evalStrEndsWith(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const s = evaluate(args[0], ctx) as string;
  const suffix = evaluate(args[1], ctx) as string;
  return s?.endsWith(suffix) ?? false;
}

/**
 * str/padStart - Pad string from start to target length
 */
export function evalStrPadStart(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const s = evaluate(args[0], ctx) as string;
  const len = evaluate(args[1], ctx) as number;
  const char = args.length > 2 ? (evaluate(args[2], ctx) as string) : ' ';
  return s?.padStart(len, char) ?? '';
}

/**
 * str/padEnd - Pad string from end to target length
 */
export function evalStrPadEnd(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const s = evaluate(args[0], ctx) as string;
  const len = evaluate(args[1], ctx) as number;
  const char = args.length > 2 ? (evaluate(args[2], ctx) as string) : ' ';
  return s?.padEnd(len, char) ?? '';
}

/**
 * str/repeat - Repeat string n times
 */
export function evalStrRepeat(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const s = evaluate(args[0], ctx) as string;
  const count = evaluate(args[1], ctx) as number;
  return s?.repeat(count) ?? '';
}

/**
 * str/reverse - Reverse string
 */
export function evalStrReverse(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const s = evaluate(args[0], ctx) as string;
  return s?.split('').reverse().join('') ?? '';
}

/**
 * str/capitalize - Capitalize first character
 */
export function evalStrCapitalize(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const s = evaluate(args[0], ctx) as string;
  if (!s || s.length === 0) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * str/titleCase - Convert to Title Case
 */
export function evalStrTitleCase(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const s = evaluate(args[0], ctx) as string;
  if (!s) return '';
  return s.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
}

/**
 * str/camelCase - Convert to camelCase
 */
export function evalStrCamelCase(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const s = evaluate(args[0], ctx) as string;
  if (!s) return '';
  return s
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, '')
    .replace(/[-_]/g, '');
}

/**
 * str/kebabCase - Convert to kebab-case
 */
export function evalStrKebabCase(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const s = evaluate(args[0], ctx) as string;
  if (!s) return '';
  return s
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * str/snakeCase - Convert to snake_case
 */
export function evalStrSnakeCase(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const s = evaluate(args[0], ctx) as string;
  if (!s) return '';
  return s
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

/**
 * str/default - Return default if value is null/undefined/empty
 */
export function evalStrDefault(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const s = evaluate(args[0], ctx);
  const defaultValue = evaluate(args[1], ctx) as string;
  if (s === null || s === undefined || s === '') {
    return defaultValue;
  }
  return s as string;
}

/**
 * str/template - Variable substitution in template string
 */
export function evalStrTemplate(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const template = evaluate(args[0], ctx) as string;
  const vars = evaluate(args[1], ctx) as Record<string, unknown>;
  if (!template) return '';
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const value = vars?.[key];
    return value !== undefined ? String(value) : '';
  });
}

/**
 * str/truncate - Truncate string with optional suffix
 */
export function evalStrTruncate(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const s = evaluate(args[0], ctx) as string;
  const len = evaluate(args[1], ctx) as number;
  const suffix = args.length > 2 ? (evaluate(args[2], ctx) as string) : '...';
  if (!s || s.length <= len) return s ?? '';
  return s.slice(0, len - suffix.length) + suffix;
}
