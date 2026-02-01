/**
 * S-Expression Formatter
 *
 * Converts S-expressions to human-readable domain language text.
 * Used for displaying guards and effects in natural language.
 *
 * @packageDocumentation
 */

import type { SExpr } from '../../orbitals/types/expression.js';
import { isSExpr, getOperator, getArgs } from '../../orbitals/types/expression.js';

/**
 * Convert an S-expression to human-readable domain text.
 * This is the main entry point for S-expression formatting.
 */
export function formatSExprToDomain(expr: SExpr, context?: FormatContext): string {
  const ctx = context ?? { entityName: '' };

  if (!isSExpr(expr)) {
    // Primitive value
    return formatPrimitive(expr);
  }

  const op = getOperator(expr);
  const args = getArgs(expr);

  // Handle null operator (shouldn't happen with valid S-expressions)
  if (op === null) {
    return formatPrimitive(expr);
  }

  // Dispatch to appropriate formatter based on operator
  if (isComparisonOperator(op)) {
    return formatComparison(op, args, ctx);
  }

  if (isArithmeticOperator(op)) {
    return formatArithmetic(op, args, ctx);
  }

  if (isLogicalOperator(op)) {
    return formatLogical(op, args, ctx);
  }

  if (isControlOperator(op)) {
    return formatControl(op, args, ctx);
  }

  if (isEffectOperator(op)) {
    return formatEffect(op, args, ctx);
  }

  // Check for std library operators
  if (op.includes('/')) {
    return formatStdLibrary(op, args, ctx);
  }

  // Unknown operator - format generically
  return formatGenericOperator(op, args, ctx);
}

/**
 * Format an S-expression guard to domain text with "if" prefix.
 */
export function formatSExprGuardToDomain(expr: SExpr, entityName?: string): string {
  const text = formatSExprToDomain(expr, { entityName: entityName ?? '' });
  return `if ${text}`;
}

/**
 * Format an S-expression effect to domain text.
 */
export function formatSExprEffectToDomain(expr: SExpr, entityName?: string): string {
  return formatSExprToDomain(expr, { entityName: entityName ?? '' });
}

/**
 * Check if an expression is an S-expression (array format).
 */
export function isArraySExpr(value: unknown): value is SExpr {
  return Array.isArray(value) && value.length > 0 && typeof value[0] === 'string';
}

// ============================================================================
// Format Context
// ============================================================================

interface FormatContext {
  entityName: string;
}

// ============================================================================
// Operator Classification
// ============================================================================

const COMPARISON_OPERATORS = ['=', '==', '!=', '>', '<', '>=', '<=', 'eq', 'neq', 'gt', 'lt', 'gte', 'lte'];
const ARITHMETIC_OPERATORS = ['+', '-', '*', '/', '%', 'mod'];
const LOGICAL_OPERATORS = ['and', 'or', 'not', '&&', '||', '!'];
const CONTROL_OPERATORS = ['if', 'cond', 'do', 'let', 'when', 'unless', 'case'];
const EFFECT_OPERATORS = ['set', 'emit', 'navigate', 'notify', 'persist', 'spawn', 'despawn', 'call-service', 'render-ui'];

function isComparisonOperator(op: string): boolean {
  return COMPARISON_OPERATORS.includes(op);
}

function isArithmeticOperator(op: string): boolean {
  return ARITHMETIC_OPERATORS.includes(op);
}

function isLogicalOperator(op: string): boolean {
  return LOGICAL_OPERATORS.includes(op);
}

function isControlOperator(op: string): boolean {
  return CONTROL_OPERATORS.includes(op);
}

function isEffectOperator(op: string): boolean {
  return EFFECT_OPERATORS.includes(op);
}

// ============================================================================
// Primitive Formatting
// ============================================================================

function formatPrimitive(value: unknown): string {
  if (value === null || value === undefined) {
    return 'nothing';
  }

  if (typeof value === 'string') {
    // Check for binding references
    if (value.startsWith('@')) {
      return formatBinding(value);
    }
    return `"${value}"`;
  }

  if (typeof value === 'number') {
    return String(value);
  }

  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  if (Array.isArray(value)) {
    // Non-S-expression array (data array)
    const items = value.map(v => formatPrimitive(v));
    return `[${items.join(', ')}]`;
  }

  if (typeof value === 'object') {
    // Object literal
    const entries = Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => `${k}: ${formatPrimitive(v)}`);
    return `{${entries.join(', ')}}`;
  }

  return String(value);
}

/**
 * Format a binding reference like @entity.field
 */
function formatBinding(binding: string): string {
  if (!binding.startsWith('@')) {
    return binding;
  }

  const parts = binding.slice(1).split('.');
  const root = parts[0];
  const path = parts.slice(1);

  switch (root) {
    case 'entity':
      // @entity.field -> just "field" in context
      return path.length > 0 ? path.join('.') : 'entity';

    case 'payload':
      // @payload.field -> "incoming field" or "submitted field"
      return path.length > 0 ? `incoming ${path.join('.')}` : 'payload';

    case 'state':
      return 'current state';

    case 'now':
      return 'current time';

    default:
      // @EntityName.field -> "EntityName's field"
      if (path.length > 0) {
        return `${root}'s ${path.join('.')}`;
      }
      return root;
  }
}

// ============================================================================
// Comparison Formatting
// ============================================================================

const COMPARISON_TEXT: Record<string, string> = {
  '=': 'is',
  '==': 'is',
  'eq': 'is',
  '!=': 'is not',
  'neq': 'is not',
  '>': 'is greater than',
  'gt': 'is greater than',
  '<': 'is less than',
  'lt': 'is less than',
  '>=': 'is at least',
  'gte': 'is at least',
  '<=': 'is at most',
  'lte': 'is at most',
};

function formatComparison(op: string, args: SExpr[], ctx: FormatContext): string {
  const left = formatSExprToDomain(args[0], ctx);
  const right = formatSExprToDomain(args[1], ctx);
  const opText = COMPARISON_TEXT[op] || op;

  return `${left} ${opText} ${right}`;
}

// ============================================================================
// Arithmetic Formatting
// ============================================================================

const ARITHMETIC_TEXT: Record<string, string> = {
  '+': 'plus',
  '-': 'minus',
  '*': 'times',
  '/': 'divided by',
  '%': 'mod',
  'mod': 'mod',
};

function formatArithmetic(op: string, args: SExpr[], ctx: FormatContext): string {
  if (args.length === 1 && op === '-') {
    // Unary negation
    return `negative ${formatSExprToDomain(args[0], ctx)}`;
  }

  const left = formatSExprToDomain(args[0], ctx);
  const right = formatSExprToDomain(args[1], ctx);
  const opText = ARITHMETIC_TEXT[op] || op;

  return `(${left} ${opText} ${right})`;
}

// ============================================================================
// Logical Formatting
// ============================================================================

function formatLogical(op: string, args: SExpr[], ctx: FormatContext): string {
  switch (op) {
    case 'and':
    case '&&': {
      const parts = args.map(a => formatSExprToDomain(a, ctx));
      return parts.join(' and ');
    }

    case 'or':
    case '||': {
      const parts = args.map(a => formatSExprToDomain(a, ctx));
      return parts.join(' or ');
    }

    case 'not':
    case '!': {
      const inner = formatSExprToDomain(args[0], ctx);
      return `not ${inner}`;
    }

    default:
      return formatGenericOperator(op, args, ctx);
  }
}

// ============================================================================
// Control Flow Formatting
// ============================================================================

function formatControl(op: string, args: SExpr[], ctx: FormatContext): string {
  switch (op) {
    case 'if': {
      const condition = formatSExprToDomain(args[0], ctx);
      const thenBranch = formatSExprToDomain(args[1], ctx);
      if (args.length > 2) {
        const elseBranch = formatSExprToDomain(args[2], ctx);
        return `if ${condition} then ${thenBranch} else ${elseBranch}`;
      }
      return `if ${condition} then ${thenBranch}`;
    }

    case 'cond': {
      // Multiple conditions
      const parts = args.map(clauseExpr => {
        if (isSExpr(clauseExpr)) {
          const clauseArgs = getArgs(clauseExpr);
          const cond = formatSExprToDomain(clauseArgs[0], ctx);
          const result = formatSExprToDomain(clauseArgs[1], ctx);
          return `when ${cond}: ${result}`;
        }
        return formatSExprToDomain(clauseExpr, ctx);
      });
      return parts.join('; ');
    }

    case 'do': {
      // Sequential effects
      const parts = args.map(a => formatSExprToDomain(a, ctx));
      return parts.join(', then ');
    }

    case 'let': {
      // Variable binding
      const bindings = args[0];
      const body = args[1];
      if (isSExpr(bindings)) {
        const bindingArgs = getArgs(bindings);
        const bindingText = [];
        for (let i = 0; i < bindingArgs.length; i += 2) {
          const varName = formatBinding(bindingArgs[i] as string);
          const varValue = formatSExprToDomain(bindingArgs[i + 1], ctx);
          bindingText.push(`${varName} = ${varValue}`);
        }
        const bodyText = formatSExprToDomain(body, ctx);
        return `let ${bindingText.join(', ')} in ${bodyText}`;
      }
      return formatGenericOperator(op, args, ctx);
    }

    case 'when': {
      const condition = formatSExprToDomain(args[0], ctx);
      const effects = args.slice(1).map(a => formatSExprToDomain(a, ctx));
      return `when ${condition}: ${effects.join(', then ')}`;
    }

    case 'unless': {
      const condition = formatSExprToDomain(args[0], ctx);
      const effects = args.slice(1).map(a => formatSExprToDomain(a, ctx));
      return `unless ${condition}: ${effects.join(', then ')}`;
    }

    case 'case': {
      const value = formatSExprToDomain(args[0], ctx);
      const cases = args.slice(1).map(clauseExpr => {
        if (isSExpr(clauseExpr)) {
          const clauseArgs = getArgs(clauseExpr);
          const pattern = formatSExprToDomain(clauseArgs[0], ctx);
          const result = formatSExprToDomain(clauseArgs[1], ctx);
          return `${pattern}: ${result}`;
        }
        return formatSExprToDomain(clauseExpr, ctx);
      });
      return `case ${value} of ${cases.join('; ')}`;
    }

    default:
      return formatGenericOperator(op, args, ctx);
  }
}

// ============================================================================
// Pattern Props Formatting (for render-ui round-trip)
// ============================================================================

/**
 * Format a single array item based on its object structure.
 *
 * Auto-detects the pattern based on properties:
 * - {field, label} → "field as 'Label'"
 * - {label, event, variant?} → "Label -> EVENT:variant"
 * - {id, label, event} → "id: 'Label' -> EVENT"
 * - {section, colSpan, rowSpan?} → "section @ colSpan" or "section @ colSpanxrowSpan"
 * - string → "string" (unchanged)
 */
function formatArrayItem(item: unknown): string {
  if (typeof item === 'string') {
    return item;
  }

  if (typeof item !== 'object' || item === null) {
    return String(item);
  }

  const obj = item as Record<string, unknown>;

  // Pattern: {id, label, event} → "id: 'Label' -> EVENT" (tabs)
  if ('id' in obj && 'label' in obj && 'event' in obj) {
    return `${obj.id}: '${obj.label}' -> ${obj.event}`;
  }

  // Pattern: {label, event, variant?} → "Label -> EVENT:variant" (actions)
  if ('label' in obj && 'event' in obj) {
    const variant = obj.variant ? `:${obj.variant}` : '';
    return `${obj.label} -> ${obj.event}${variant}`;
  }

  // Pattern: {section, colSpan, rowSpan?} → "section @ span" (cells)
  if ('section' in obj && 'colSpan' in obj) {
    const span = obj.rowSpan ? `${obj.colSpan}x${obj.rowSpan}` : String(obj.colSpan);
    return `${obj.section} @ ${span}`;
  }

  // Pattern: {field, label} → "field as 'Label'" (metrics, columns)
  if ('field' in obj && 'label' in obj) {
    if (obj.label !== obj.field) {
      return `${obj.field} as '${obj.label}'`;
    }
    return String(obj.field);
  }

  // Fallback: stringify
  return JSON.stringify(item);
}

/**
 * Format array prop, auto-detecting if it contains complex objects
 */
function formatArrayProp(value: unknown[]): string {
  if (value.length === 0) return '';

  // Check if first item is an object (complex) or string (simple)
  const hasObjects = value.some(v => typeof v === 'object' && v !== null);

  if (hasObjects) {
    return value.map(formatArrayItem).join(', ');
  }

  // Simple string array
  return value.join(', ');
}

/**
 * Check if a pattern has complex props (arrays of objects).
 * Complex props require inline JSON output.
 */
function hasComplexPatternProps(patternObj: Record<string, unknown>): boolean {
  for (const [key, value] of Object.entries(patternObj)) {
    if (key === 'type' || key === 'entity') continue;

    // Array of objects is complex
    if (Array.isArray(value) && value.length > 0) {
      if (typeof value[0] === 'object' && value[0] !== null) {
        return true;
      }
    }

    // Nested object is complex
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return true;
    }
  }
  return false;
}

/**
 * Format simple pattern props (strings, numbers, booleans, string arrays).
 * Returns empty string if there are no simple props.
 */
function formatSimplePatternProps(patternObj: Record<string, unknown>): string {
  const props: string[] = [];

  for (const [key, value] of Object.entries(patternObj)) {
    // Skip type and entity - they're handled separately
    if (key === 'type' || key === 'entity') continue;

    if (value === undefined || value === null) continue;

    // Only format simple values
    if (Array.isArray(value)) {
      // Only string arrays are simple
      if (value.every(v => typeof v === 'string')) {
        props.push(`${key} [${value.join(', ')}]`);
      }
      // Skip complex arrays - they're handled by inline JSON
    } else if (typeof value === 'string') {
      props.push(`${key} '${value}'`);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      props.push(`${key} ${value}`);
    }
    // Skip objects - they're complex
  }

  return props.join(' ');
}

/**
 * Format pattern props to domain language (DEPRECATED - use formatSimplePatternProps)
 *
 * Generically handles all props - no hardcoded key names.
 * Detects object structures and formats accordingly.
 */
function formatPatternProps(patternObj: Record<string, unknown>): string {
  const props: string[] = [];

  for (const [key, value] of Object.entries(patternObj)) {
    // Skip type and entity - they're handled separately
    if (key === 'type' || key === 'entity') continue;

    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      const formatted = formatArrayProp(value);
      if (formatted) {
        props.push(`${key} [${formatted}]`);
      }
    } else if (typeof value === 'string') {
      props.push(`${key} '${value}'`);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      props.push(`${key} ${value}`);
    }
  }

  return props.join(' ');
}

// ============================================================================
// Effect Formatting
// ============================================================================

function formatEffect(op: string, args: SExpr[], ctx: FormatContext): string {
  switch (op) {
    case 'set': {
      const field = formatBinding(args[0] as string);
      const value = formatSExprToDomain(args[1], ctx);
      return `update ${field} to ${value}`;
    }

    case 'emit': {
      const event = args[0] as string;
      if (args.length > 1) {
        const payload = formatSExprToDomain(args[1], ctx);
        return `emit ${event} with ${payload}`;
      }
      return `emit ${event}`;
    }

    case 'navigate': {
      const path = args[0] as string;
      if (args.length > 1) {
        const params = formatSExprToDomain(args[1], ctx);
        return `navigate to ${path} with ${params}`;
      }
      return `navigate to ${path}`;
    }

    case 'notify': {
      const firstArg = args[0];
      // Handle object format: ["notify", {"message": "...", "type": "..."}]
      if (typeof firstArg === 'object' && firstArg !== null && !Array.isArray(firstArg)) {
        const obj = firstArg as Record<string, unknown>;
        const message = obj.message || obj.text || 'notification';
        const type = obj.type || obj.variant || 'info';
        return `show ${type} notification "${message}"`;
      }
      // Handle string format: ["notify", "message", "type?"]
      const message = typeof firstArg === 'string' ? firstArg : formatPrimitive(firstArg);
      if (args.length > 1) {
        const type = typeof args[1] === 'string' ? args[1] : 'info';
        return `show ${type} notification "${message}"`;
      }
      return `notify "${message}"`;
    }

    case 'persist': {
      const action = args[0] as string;
      if (args.length > 1) {
        const data = formatSExprToDomain(args[1], ctx);
        return `persist ${action} ${data}`;
      }
      return `persist ${action}`;
    }

    case 'spawn': {
      const entityType = args[0] as string;
      if (args.length > 1) {
        const props = formatSExprToDomain(args[1], ctx);
        return `spawn ${entityType} with ${props}`;
      }
      return `spawn ${entityType}`;
    }

    case 'despawn': {
      if (args.length > 0) {
        const id = formatSExprToDomain(args[0], ctx);
        return `despawn ${id}`;
      }
      return 'despawn this';
    }

    case 'call-service': {
      const service = args[0] as string;
      const method = args.length > 1 ? args[1] as string : '';
      if (method) {
        return `call ${service}.${method}`;
      }
      return `call ${service}`;
    }

    case 'render-ui': {
      const slot = args[0] as string;
      const patternArg = args.length > 1 ? args[1] : null;

      if (patternArg === null) {
        return `render null to ${slot}`;
      }

      if (patternArg !== null) {
        // Check if pattern is an object with a type property
        if (typeof patternArg === 'object' && patternArg !== null && !Array.isArray(patternArg)) {
          const patternObj = patternArg as Record<string, unknown>;
          const patternType = patternObj.type as string;
          const entity = patternObj.entity as string | undefined;

          // Check if pattern has complex props (arrays of objects)
          const hasComplexProps = hasComplexPatternProps(patternObj);

          if (hasComplexProps) {
            // Output inline JSON for complex patterns
            return `["render-ui", "${slot}", ${JSON.stringify(patternArg)}]`;
          }

          // Simple pattern - use human-readable syntax
          if (patternType) {
            const propsStr = formatSimplePatternProps(patternObj);
            if (entity && propsStr) {
              return `render ${patternType} to ${slot} for ${entity} with ${propsStr}`;
            }
            if (entity) {
              return `render ${patternType} to ${slot} for ${entity}`;
            }
            if (propsStr) {
              return `render ${patternType} to ${slot} with ${propsStr}`;
            }
            return `render ${patternType} to ${slot}`;
          }
          // Fall back to inline JSON
          return `["render-ui", "${slot}", ${JSON.stringify(patternArg)}]`;
        }
        // String pattern name or S-expression
        if (isSExpr(patternArg)) {
          return `render ${formatSExprToDomain(patternArg, ctx)} to ${slot}`;
        }
        return `render ${patternArg} to ${slot}`;
      }
      return `render to ${slot}`;
    }

    default:
      return formatGenericOperator(op, args, ctx);
  }
}

// ============================================================================
// Std Library Formatting
// ============================================================================

function formatStdLibrary(op: string, args: SExpr[], ctx: FormatContext): string {
  const [module, fn] = op.split('/');

  switch (module) {
    case 'math':
      return formatMathFunction(fn, args, ctx);
    case 'str':
      return formatStrFunction(fn, args, ctx);
    case 'array':
      return formatArrayFunction(fn, args, ctx);
    case 'object':
      return formatObjectFunction(fn, args, ctx);
    case 'validate':
      return formatValidateFunction(fn, args, ctx);
    case 'time':
      return formatTimeFunction(fn, args, ctx);
    case 'format':
      return formatFormatFunction(fn, args, ctx);
    default:
      return formatGenericOperator(op, args, ctx);
  }
}

function formatMathFunction(fn: string, args: SExpr[], ctx: FormatContext): string {
  const formattedArgs = args.map(a => formatSExprToDomain(a, ctx));

  switch (fn) {
    case 'abs':
      return `absolute value of ${formattedArgs[0]}`;
    case 'min':
      return `minimum of ${formattedArgs.join(', ')}`;
    case 'max':
      return `maximum of ${formattedArgs.join(', ')}`;
    case 'clamp':
      return `${formattedArgs[0]} clamped between ${formattedArgs[1]} and ${formattedArgs[2]}`;
    case 'floor':
      return `floor of ${formattedArgs[0]}`;
    case 'ceil':
      return `ceiling of ${formattedArgs[0]}`;
    case 'round':
      return `${formattedArgs[0]} rounded`;
    case 'sqrt':
      return `square root of ${formattedArgs[0]}`;
    case 'pow':
      return `${formattedArgs[0]} to the power of ${formattedArgs[1]}`;
    case 'lerp':
      return `lerp from ${formattedArgs[0]} to ${formattedArgs[1]} at ${formattedArgs[2]}`;
    case 'random':
      return 'random number';
    case 'randomInt':
      return `random integer between ${formattedArgs[0]} and ${formattedArgs[1]}`;
    default:
      return `math/${fn}(${formattedArgs.join(', ')})`;
  }
}

function formatStrFunction(fn: string, args: SExpr[], ctx: FormatContext): string {
  const formattedArgs = args.map(a => formatSExprToDomain(a, ctx));

  switch (fn) {
    case 'len':
      return `length of ${formattedArgs[0]}`;
    case 'upper':
      return `${formattedArgs[0]} uppercase`;
    case 'lower':
      return `${formattedArgs[0]} lowercase`;
    case 'trim':
      return `${formattedArgs[0]} trimmed`;
    case 'split':
      return `${formattedArgs[0]} split by ${formattedArgs[1]}`;
    case 'join':
      return `${formattedArgs[0]} joined with ${formattedArgs[1]}`;
    case 'includes':
      return `${formattedArgs[0]} contains ${formattedArgs[1]}`;
    case 'startsWith':
      return `${formattedArgs[0]} starts with ${formattedArgs[1]}`;
    case 'endsWith':
      return `${formattedArgs[0]} ends with ${formattedArgs[1]}`;
    case 'replace':
      return `${formattedArgs[0]} with ${formattedArgs[1]} replaced by ${formattedArgs[2]}`;
    case 'truncate':
      return `${formattedArgs[0]} truncated to ${formattedArgs[1]} characters`;
    case 'template':
      return `template ${formattedArgs[0]} with ${formattedArgs[1]}`;
    default:
      return `str/${fn}(${formattedArgs.join(', ')})`;
  }
}

function formatArrayFunction(fn: string, args: SExpr[], ctx: FormatContext): string {
  const formattedArgs = args.map(a => formatSExprToDomain(a, ctx));

  switch (fn) {
    case 'len':
      return `count of ${formattedArgs[0]}`;
    case 'first':
      return `first item in ${formattedArgs[0]}`;
    case 'last':
      return `last item in ${formattedArgs[0]}`;
    case 'filter':
      return `${formattedArgs[0]} filtered where ${formattedArgs[1]}`;
    case 'map':
      return `${formattedArgs[0]} transformed by ${formattedArgs[1]}`;
    case 'reduce':
      return `${formattedArgs[0]} reduced with ${formattedArgs[1]}`;
    case 'find':
      return `find in ${formattedArgs[0]} where ${formattedArgs[1]}`;
    case 'some':
      return `any in ${formattedArgs[0]} matches ${formattedArgs[1]}`;
    case 'every':
      return `all in ${formattedArgs[0]} match ${formattedArgs[1]}`;
    case 'includes':
      return `${formattedArgs[0]} contains ${formattedArgs[1]}`;
    case 'sort':
      return `${formattedArgs[0]} sorted`;
    case 'sortBy':
      return `${formattedArgs[0]} sorted by ${formattedArgs[1]}`;
    case 'reverse':
      return `${formattedArgs[0]} reversed`;
    case 'unique':
      return `unique items in ${formattedArgs[0]}`;
    case 'flatten':
      return `${formattedArgs[0]} flattened`;
    case 'concat':
      return `${formattedArgs.join(' combined with ')}`;
    case 'slice':
      return `${formattedArgs[0]} from ${formattedArgs[1]} to ${formattedArgs[2]}`;
    case 'take':
      return `first ${formattedArgs[1]} items of ${formattedArgs[0]}`;
    case 'drop':
      return `${formattedArgs[0]} without first ${formattedArgs[1]} items`;
    case 'groupBy':
      return `${formattedArgs[0]} grouped by ${formattedArgs[1]}`;
    case 'sum':
      return `sum of ${formattedArgs[0]}`;
    case 'avg':
      return `average of ${formattedArgs[0]}`;
    default:
      return `array/${fn}(${formattedArgs.join(', ')})`;
  }
}

function formatObjectFunction(fn: string, args: SExpr[], ctx: FormatContext): string {
  const formattedArgs = args.map(a => formatSExprToDomain(a, ctx));

  switch (fn) {
    case 'get':
      return `${formattedArgs[1]} of ${formattedArgs[0]}`;
    case 'set':
      return `${formattedArgs[0]} with ${formattedArgs[1]} set to ${formattedArgs[2]}`;
    case 'has':
      return `${formattedArgs[0]} has ${formattedArgs[1]}`;
    case 'keys':
      return `keys of ${formattedArgs[0]}`;
    case 'values':
      return `values of ${formattedArgs[0]}`;
    case 'entries':
      return `entries of ${formattedArgs[0]}`;
    case 'merge':
      return `${formattedArgs.join(' merged with ')}`;
    case 'pick':
      return `${formattedArgs[0]} with only ${formattedArgs[1]}`;
    case 'omit':
      return `${formattedArgs[0]} without ${formattedArgs[1]}`;
    case 'empty?':
      return `${formattedArgs[0]} is empty`;
    default:
      return `object/${fn}(${formattedArgs.join(', ')})`;
  }
}

function formatValidateFunction(fn: string, args: SExpr[], ctx: FormatContext): string {
  const formattedArgs = args.map(a => formatSExprToDomain(a, ctx));

  switch (fn) {
    case 'required':
      return `${formattedArgs[0]} is required`;
    case 'email':
      return `${formattedArgs[0]} is valid email`;
    case 'url':
      return `${formattedArgs[0]} is valid URL`;
    case 'phone':
      return `${formattedArgs[0]} is valid phone`;
    case 'minLength':
      return `${formattedArgs[0]} has at least ${formattedArgs[1]} characters`;
    case 'maxLength':
      return `${formattedArgs[0]} has at most ${formattedArgs[1]} characters`;
    case 'min':
      return `${formattedArgs[0]} is at least ${formattedArgs[1]}`;
    case 'max':
      return `${formattedArgs[0]} is at most ${formattedArgs[1]}`;
    case 'range':
      return `${formattedArgs[0]} is between ${formattedArgs[1]} and ${formattedArgs[2]}`;
    case 'pattern':
      return `${formattedArgs[0]} matches pattern ${formattedArgs[1]}`;
    default:
      return `validate/${fn}(${formattedArgs.join(', ')})`;
  }
}

function formatTimeFunction(fn: string, args: SExpr[], ctx: FormatContext): string {
  const formattedArgs = args.map(a => formatSExprToDomain(a, ctx));

  switch (fn) {
    case 'now':
      return 'current time';
    case 'today':
      return 'today';
    case 'format':
      return `${formattedArgs[0]} formatted as ${formattedArgs[1]}`;
    case 'add':
      return `${formattedArgs[0]} plus ${formattedArgs[1]} ${formattedArgs[2]}`;
    case 'subtract':
      return `${formattedArgs[0]} minus ${formattedArgs[1]} ${formattedArgs[2]}`;
    case 'diff':
      return `difference between ${formattedArgs[0]} and ${formattedArgs[1]}`;
    case 'isBefore':
      return `${formattedArgs[0]} is before ${formattedArgs[1]}`;
    case 'isAfter':
      return `${formattedArgs[0]} is after ${formattedArgs[1]}`;
    case 'isBetween':
      return `${formattedArgs[0]} is between ${formattedArgs[1]} and ${formattedArgs[2]}`;
    case 'year':
      return `year of ${formattedArgs[0]}`;
    case 'month':
      return `month of ${formattedArgs[0]}`;
    case 'day':
      return `day of ${formattedArgs[0]}`;
    default:
      return `time/${fn}(${formattedArgs.join(', ')})`;
  }
}

function formatFormatFunction(fn: string, args: SExpr[], ctx: FormatContext): string {
  const formattedArgs = args.map(a => formatSExprToDomain(a, ctx));

  switch (fn) {
    case 'number':
      return `${formattedArgs[0]} as number`;
    case 'currency':
      return `${formattedArgs[0]} as ${formattedArgs[1]} currency`;
    case 'percent':
      return `${formattedArgs[0]} as percentage`;
    case 'bytes':
      return `${formattedArgs[0]} as file size`;
    case 'ordinal':
      return `${formattedArgs[0]} as ordinal`;
    case 'plural':
      return `${formattedArgs[0]} with ${formattedArgs[1]}/${formattedArgs[2]}`;
    case 'list':
      return `${formattedArgs[0]} as list`;
    case 'phone':
      return `${formattedArgs[0]} as phone number`;
    default:
      return `format/${fn}(${formattedArgs.join(', ')})`;
  }
}

// ============================================================================
// Generic Operator Formatting
// ============================================================================

function formatGenericOperator(op: string, args: SExpr[], ctx: FormatContext): string {
  if (args.length === 0) {
    return op;
  }

  const formattedArgs = args.map(a => formatSExprToDomain(a, ctx));
  return `${op}(${formattedArgs.join(', ')})`;
}
