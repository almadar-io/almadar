/**
 * Time Module Runtime Evaluators
 *
 * Runtime implementations for time/* operators.
 * Provides date manipulation, formatting, and comparison functions.
 *
 * @packageDocumentation
 */

import type { SExpr } from '../types/expression.js';
import type { EvaluationContext } from '../context.js';

type EvalFn = (expr: SExpr, ctx: EvaluationContext) => unknown;

type TimeUnit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'ms';

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;
const MS_PER_WEEK = 7 * MS_PER_DAY;

/**
 * time/now - Current timestamp
 */
export function evalTimeNow(): number {
  return Date.now();
}

/**
 * time/today - Today at midnight (local time)
 */
export function evalTimeToday(): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now.getTime();
}

/**
 * time/parse - Parse string to timestamp
 */
export function evalTimeParse(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const str = evaluate(args[0], ctx) as string;
  // Note: format param is accepted but we use native Date parsing
  // A full implementation would need a date parsing library
  const date = new Date(str);
  return date.getTime();
}

/**
 * time/format - Format timestamp to string
 */
export function evalTimeFormat(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const timestamp = evaluate(args[0], ctx) as number;
  const format = evaluate(args[1], ctx) as string;

  const date = new Date(timestamp);

  // Simple format token replacement
  const tokens: Record<string, string> = {
    YYYY: String(date.getFullYear()),
    YY: String(date.getFullYear()).slice(-2),
    MM: String(date.getMonth() + 1).padStart(2, '0'),
    M: String(date.getMonth() + 1),
    DD: String(date.getDate()).padStart(2, '0'),
    D: String(date.getDate()),
    HH: String(date.getHours()).padStart(2, '0'),
    H: String(date.getHours()),
    mm: String(date.getMinutes()).padStart(2, '0'),
    m: String(date.getMinutes()),
    ss: String(date.getSeconds()).padStart(2, '0'),
    s: String(date.getSeconds()),
    ddd: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()],
    dddd: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
      date.getDay()
    ],
    MMM: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][
      date.getMonth()
    ],
    MMMM: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ][date.getMonth()],
  };

  let result = format;
  for (const [token, value] of Object.entries(tokens)) {
    result = result.replace(new RegExp(token, 'g'), value);
  }

  return result;
}

/**
 * time/year - Get year from timestamp
 */
export function evalTimeYear(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const timestamp = evaluate(args[0], ctx) as number;
  return new Date(timestamp).getFullYear();
}

/**
 * time/month - Get month from timestamp (1-12)
 */
export function evalTimeMonth(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const timestamp = evaluate(args[0], ctx) as number;
  return new Date(timestamp).getMonth() + 1;
}

/**
 * time/day - Get day of month from timestamp (1-31)
 */
export function evalTimeDay(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const timestamp = evaluate(args[0], ctx) as number;
  return new Date(timestamp).getDate();
}

/**
 * time/weekday - Get day of week (0=Sunday, 6=Saturday)
 */
export function evalTimeWeekday(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const timestamp = evaluate(args[0], ctx) as number;
  return new Date(timestamp).getDay();
}

/**
 * time/hour - Get hour from timestamp (0-23)
 */
export function evalTimeHour(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const timestamp = evaluate(args[0], ctx) as number;
  return new Date(timestamp).getHours();
}

/**
 * time/minute - Get minute from timestamp (0-59)
 */
export function evalTimeMinute(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const timestamp = evaluate(args[0], ctx) as number;
  return new Date(timestamp).getMinutes();
}

/**
 * time/second - Get second from timestamp (0-59)
 */
export function evalTimeSecond(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const timestamp = evaluate(args[0], ctx) as number;
  return new Date(timestamp).getSeconds();
}

/**
 * Helper to add time to a date
 */
function addTime(date: Date, amount: number, unit: TimeUnit): Date {
  const result = new Date(date);

  switch (unit) {
    case 'year':
      result.setFullYear(result.getFullYear() + amount);
      break;
    case 'month':
      result.setMonth(result.getMonth() + amount);
      break;
    case 'week':
      result.setDate(result.getDate() + amount * 7);
      break;
    case 'day':
      result.setDate(result.getDate() + amount);
      break;
    case 'hour':
      result.setHours(result.getHours() + amount);
      break;
    case 'minute':
      result.setMinutes(result.getMinutes() + amount);
      break;
    case 'second':
      result.setSeconds(result.getSeconds() + amount);
      break;
    case 'ms':
      result.setMilliseconds(result.getMilliseconds() + amount);
      break;
  }

  return result;
}

/**
 * time/add - Add time to timestamp
 */
export function evalTimeAdd(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const timestamp = evaluate(args[0], ctx) as number;
  const amount = evaluate(args[1], ctx) as number;
  const unit = evaluate(args[2], ctx) as TimeUnit;

  const date = new Date(timestamp);
  return addTime(date, amount, unit).getTime();
}

/**
 * time/subtract - Subtract time from timestamp
 */
export function evalTimeSubtract(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const timestamp = evaluate(args[0], ctx) as number;
  const amount = evaluate(args[1], ctx) as number;
  const unit = evaluate(args[2], ctx) as TimeUnit;

  const date = new Date(timestamp);
  return addTime(date, -amount, unit).getTime();
}

/**
 * time/diff - Difference between timestamps
 */
export function evalTimeDiff(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const a = evaluate(args[0], ctx) as number;
  const b = evaluate(args[1], ctx) as number;
  const unit = args.length > 2 ? (evaluate(args[2], ctx) as TimeUnit) : 'ms';

  const diffMs = a - b;

  switch (unit) {
    case 'year':
      return Math.floor(diffMs / (MS_PER_DAY * 365.25));
    case 'month':
      return Math.floor(diffMs / (MS_PER_DAY * 30.44));
    case 'week':
      return Math.floor(diffMs / MS_PER_WEEK);
    case 'day':
      return Math.floor(diffMs / MS_PER_DAY);
    case 'hour':
      return Math.floor(diffMs / MS_PER_HOUR);
    case 'minute':
      return Math.floor(diffMs / MS_PER_MINUTE);
    case 'second':
      return Math.floor(diffMs / MS_PER_SECOND);
    case 'ms':
    default:
      return diffMs;
  }
}

/**
 * time/startOf - Get start of time period
 */
export function evalTimeStartOf(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const timestamp = evaluate(args[0], ctx) as number;
  const unit = evaluate(args[1], ctx) as TimeUnit;

  const date = new Date(timestamp);

  switch (unit) {
    case 'year':
      date.setMonth(0, 1);
      date.setHours(0, 0, 0, 0);
      break;
    case 'month':
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
      break;
    case 'week': {
      const day = date.getDay();
      date.setDate(date.getDate() - day);
      date.setHours(0, 0, 0, 0);
      break;
    }
    case 'day':
      date.setHours(0, 0, 0, 0);
      break;
    case 'hour':
      date.setMinutes(0, 0, 0);
      break;
    case 'minute':
      date.setSeconds(0, 0);
      break;
  }

  return date.getTime();
}

/**
 * time/endOf - Get end of time period
 */
export function evalTimeEndOf(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): number {
  const timestamp = evaluate(args[0], ctx) as number;
  const unit = evaluate(args[1], ctx) as TimeUnit;

  const date = new Date(timestamp);

  switch (unit) {
    case 'year':
      date.setMonth(11, 31);
      date.setHours(23, 59, 59, 999);
      break;
    case 'month':
      date.setMonth(date.getMonth() + 1, 0);
      date.setHours(23, 59, 59, 999);
      break;
    case 'week': {
      const day = date.getDay();
      date.setDate(date.getDate() + (6 - day));
      date.setHours(23, 59, 59, 999);
      break;
    }
    case 'day':
      date.setHours(23, 59, 59, 999);
      break;
    case 'hour':
      date.setMinutes(59, 59, 999);
      break;
    case 'minute':
      date.setSeconds(59, 999);
      break;
  }

  return date.getTime();
}

/**
 * time/isBefore - Check if a is before b
 */
export function evalTimeIsBefore(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const a = evaluate(args[0], ctx) as number;
  const b = evaluate(args[1], ctx) as number;
  return a < b;
}

/**
 * time/isAfter - Check if a is after b
 */
export function evalTimeIsAfter(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const a = evaluate(args[0], ctx) as number;
  const b = evaluate(args[1], ctx) as number;
  return a > b;
}

/**
 * time/isBetween - Check if date is between start and end
 */
export function evalTimeIsBetween(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const date = evaluate(args[0], ctx) as number;
  const start = evaluate(args[1], ctx) as number;
  const end = evaluate(args[2], ctx) as number;
  return date >= start && date <= end;
}

/**
 * time/isSame - Check if timestamps are same (optionally by unit)
 */
export function evalTimeIsSame(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const a = evaluate(args[0], ctx) as number;
  const b = evaluate(args[1], ctx) as number;
  const unit = args.length > 2 ? (evaluate(args[2], ctx) as TimeUnit) : undefined;

  if (!unit) {
    return a === b;
  }

  const dateA = new Date(a);
  const dateB = new Date(b);

  switch (unit) {
    case 'year':
      return dateA.getFullYear() === dateB.getFullYear();
    case 'month':
      return (
        dateA.getFullYear() === dateB.getFullYear() && dateA.getMonth() === dateB.getMonth()
      );
    case 'day':
      return (
        dateA.getFullYear() === dateB.getFullYear() &&
        dateA.getMonth() === dateB.getMonth() &&
        dateA.getDate() === dateB.getDate()
      );
    case 'hour':
      return (
        dateA.getFullYear() === dateB.getFullYear() &&
        dateA.getMonth() === dateB.getMonth() &&
        dateA.getDate() === dateB.getDate() &&
        dateA.getHours() === dateB.getHours()
      );
    case 'minute':
      return Math.floor(a / MS_PER_MINUTE) === Math.floor(b / MS_PER_MINUTE);
    case 'second':
      return Math.floor(a / MS_PER_SECOND) === Math.floor(b / MS_PER_SECOND);
    default:
      return a === b;
  }
}

/**
 * time/isPast - Check if timestamp is in the past
 */
export function evalTimeIsPast(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const timestamp = evaluate(args[0], ctx) as number;
  return timestamp < Date.now();
}

/**
 * time/isFuture - Check if timestamp is in the future
 */
export function evalTimeIsFuture(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const timestamp = evaluate(args[0], ctx) as number;
  return timestamp > Date.now();
}

/**
 * time/isToday - Check if timestamp is today
 */
export function evalTimeIsToday(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): boolean {
  const timestamp = evaluate(args[0], ctx) as number;
  const date = new Date(timestamp);
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

/**
 * time/relative - Format as relative time ("2 hours ago", "in 3 days")
 */
export function evalTimeRelative(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  const timestamp = evaluate(args[0], ctx) as number;
  const now = Date.now();
  const diff = timestamp - now;
  const absDiff = Math.abs(diff);
  const isPast = diff < 0;

  let value: number;
  let unit: string;

  if (absDiff < MS_PER_MINUTE) {
    return 'just now';
  } else if (absDiff < MS_PER_HOUR) {
    value = Math.round(absDiff / MS_PER_MINUTE);
    unit = value === 1 ? 'minute' : 'minutes';
  } else if (absDiff < MS_PER_DAY) {
    value = Math.round(absDiff / MS_PER_HOUR);
    unit = value === 1 ? 'hour' : 'hours';
  } else if (absDiff < MS_PER_WEEK) {
    value = Math.round(absDiff / MS_PER_DAY);
    unit = value === 1 ? 'day' : 'days';
  } else if (absDiff < MS_PER_DAY * 30) {
    value = Math.round(absDiff / MS_PER_WEEK);
    unit = value === 1 ? 'week' : 'weeks';
  } else if (absDiff < MS_PER_DAY * 365) {
    value = Math.round(absDiff / (MS_PER_DAY * 30));
    unit = value === 1 ? 'month' : 'months';
  } else {
    value = Math.round(absDiff / (MS_PER_DAY * 365));
    unit = value === 1 ? 'year' : 'years';
  }

  return isPast ? `${value} ${unit} ago` : `in ${value} ${unit}`;
}

/**
 * time/duration - Format milliseconds as duration ("2h 30m")
 */
export function evalTimeDuration(
  args: SExpr[],
  evaluate: EvalFn,
  ctx: EvaluationContext
): string {
  let ms = evaluate(args[0], ctx) as number;

  if (ms < 0) ms = -ms;

  const parts: string[] = [];

  if (ms >= MS_PER_DAY) {
    const days = Math.floor(ms / MS_PER_DAY);
    parts.push(`${days}d`);
    ms %= MS_PER_DAY;
  }

  if (ms >= MS_PER_HOUR) {
    const hours = Math.floor(ms / MS_PER_HOUR);
    parts.push(`${hours}h`);
    ms %= MS_PER_HOUR;
  }

  if (ms >= MS_PER_MINUTE) {
    const minutes = Math.floor(ms / MS_PER_MINUTE);
    parts.push(`${minutes}m`);
    ms %= MS_PER_MINUTE;
  }

  if (ms >= MS_PER_SECOND && parts.length < 2) {
    const seconds = Math.floor(ms / MS_PER_SECOND);
    parts.push(`${seconds}s`);
  }

  return parts.length > 0 ? parts.join(' ') : '0s';
}
