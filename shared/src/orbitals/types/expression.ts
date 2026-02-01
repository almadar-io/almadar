/**
 * S-Expression Types
 *
 * Defines the S-Expression type system for guards, effects, and computed values.
 * S-expressions are JSON arrays where the first element is an operator string.
 *
 * @example
 * // Guard: health > 0
 * [">", "@entity.health", 0]
 *
 * // Effect: set x to x + vx
 * ["set", "@entity.x", ["+", "@entity.x", "@entity.vx"]]
 *
 * @packageDocumentation
 */

import { z } from 'zod';

// ============================================================================
// S-Expression Type
// ============================================================================

/**
 * S-Expression type - recursive structure representing expressions.
 *
 * An S-expression is either:
 * - A literal value (string, number, boolean, null)
 * - An object literal (for payload data, props, etc.)
 * - A binding reference (string starting with @)
 * - A call expression (array with operator as first element)
 */
export type SExprAtom = string | number | boolean | null | Record<string, unknown>;
export type SExpr = SExprAtom | SExpr[];

/**
 * Expression type - S-expressions only.
 * Used for guards, computed values, and effect expressions.
 *
 * NOTE: Legacy string format is no longer supported.
 * All expressions must be S-expression arrays.
 */
export type Expression = SExpr;

// ============================================================================
// S-Expression Schema (Zod)
// ============================================================================

/**
 * Schema for atomic S-expression values (non-array)
 * Includes objects for payload data, props, etc.
 */
export const SExprAtomSchema: z.ZodType<SExprAtom> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
  z.record(z.unknown()), // Objects for payload data
]);

/**
 * Recursive schema for S-expressions.
 * Validates that arrays have at least one element and first element is a string (operator).
 */
export const SExprSchema: z.ZodType<SExpr> = z.lazy(() =>
  z.union([
    SExprAtomSchema,
    z
      .array(z.lazy(() => SExprSchema))
      .min(1)
      .refine(
        (arr) => typeof arr[0] === 'string',
        { message: 'S-expression array must have a string operator as first element' }
      ),
  ])
);

/**
 * Schema for Expression type - S-expressions only.
 * S-expressions are arrays with operator as first element.
 *
 * NOTE: Legacy string format is no longer supported.
 */
export const ExpressionSchema: z.ZodType<Expression> = SExprSchema;

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Type guard for S-expression detection.
 * 100% reliable - structural check, no regex or keyword matching.
 *
 * @param value - Value to check
 * @returns true if value is an S-expression (array with string operator)
 */
export function isSExpr(value: unknown): value is SExpr[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === 'string'
  );
}

/**
 * Type guard for S-expression atoms (non-array values).
 * Includes objects (for payload data, props, etc.)
 */
export function isSExprAtom(value: unknown): value is SExprAtom {
  if (value === null) return true;
  if (Array.isArray(value)) return false;
  const type = typeof value;
  return type === 'string' || type === 'number' || type === 'boolean' || type === 'object';
}

/**
 * Check if a value is a binding reference.
 * Bindings start with @ (e.g., @entity.health, @payload.amount, @now)
 */
export function isBinding(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('@');
}

/**
 * Check if a value is a valid S-expression call (array with operator).
 * Use this to distinguish between S-expression calls and atom values.
 */
export function isSExprCall(value: unknown): value is SExpr[] {
  return isSExpr(value);
}

// ============================================================================
// Binding Parsing
// ============================================================================

/**
 * Parsed binding reference
 */
export interface ParsedBinding {
  /** Type of binding: core (@entity, @payload, @state, @now) or entity (@EntityName) */
  type: 'core' | 'entity';
  /** The root binding name (entity, payload, state, now, or EntityName) */
  root: string;
  /** Path segments after the root (e.g., ['health'] for @entity.health) */
  path: string[];
  /** Full original binding string */
  original: string;
}

/**
 * Core bindings that are always available.
 * Phase 4.5 adds: config, computed, trait (for behavior support)
 */
export const CORE_BINDINGS = ['entity', 'payload', 'state', 'now', 'config', 'computed', 'trait'] as const;
export type CoreBinding = (typeof CORE_BINDINGS)[number];

/**
 * Parse a binding reference into its components.
 * Does NOT use regex - uses structured string operations.
 *
 * @param binding - Binding string starting with @
 * @returns Parsed binding object or null if invalid
 */
export function parseBinding(binding: string): ParsedBinding | null {
  if (!binding.startsWith('@')) {
    return null;
  }

  // Remove @ prefix
  const withoutPrefix = binding.slice(1);

  // Split by dots
  const parts = withoutPrefix.split('.');

  if (parts.length === 0 || parts[0] === '') {
    return null;
  }

  const root = parts[0];
  const path = parts.slice(1);

  // Determine if core binding or entity reference
  const isCore = (CORE_BINDINGS as readonly string[]).includes(root);

  return {
    type: isCore ? 'core' : 'entity',
    root,
    path,
    original: binding,
  };
}

/**
 * Validate a binding reference format.
 *
 * @param binding - Binding string to validate
 * @returns true if valid binding format
 */
export function isValidBinding(binding: string): boolean {
  const parsed = parseBinding(binding);
  if (!parsed) return false;

  // Core bindings: @entity, @payload, @state, @now (optionally with path)
  // @state and @now don't have paths
  if (parsed.type === 'core') {
    if (parsed.root === 'state' || parsed.root === 'now') {
      return parsed.path.length === 0;
    }
    // @entity and @payload can have paths
    return true;
  }

  // Entity bindings: @EntityName.field - must have at least one path segment
  return parsed.path.length > 0;
}

// ============================================================================
// S-Expression Utilities
// ============================================================================

/**
 * Get the operator from an S-expression call.
 *
 * @param expr - S-expression array
 * @returns The operator string or null if not a valid call
 */
export function getOperator(expr: SExpr): string | null {
  if (!isSExpr(expr)) return null;
  return expr[0] as string;
}

/**
 * Get the arguments from an S-expression call.
 *
 * @param expr - S-expression array
 * @returns Array of arguments (empty if not a valid call)
 */
export function getArgs(expr: SExpr): SExpr[] {
  if (!isSExpr(expr)) return [];
  return expr.slice(1);
}

/**
 * Create an S-expression call.
 *
 * @param operator - The operator string
 * @param args - Arguments to the operator
 * @returns S-expression array
 */
export function sexpr(operator: string, ...args: SExpr[]): SExpr[] {
  return [operator, ...args];
}

/**
 * Walk an S-expression tree and apply a visitor function to each node.
 *
 * @param expr - S-expression to walk
 * @param visitor - Function to call on each node
 */
export function walkSExpr(
  expr: SExpr,
  visitor: (node: SExpr, parent: SExpr[] | null, index: number) => void,
  parent: SExpr[] | null = null,
  index: number = 0
): void {
  visitor(expr, parent, index);

  if (isSExpr(expr)) {
    for (let i = 0; i < expr.length; i++) {
      walkSExpr(expr[i], visitor, expr, i);
    }
  }
}

/**
 * Collect all bindings referenced in an S-expression.
 *
 * @param expr - S-expression to analyze
 * @returns Array of binding strings found
 */
export function collectBindings(expr: SExpr): string[] {
  const bindings: string[] = [];

  walkSExpr(expr, (node) => {
    if (isBinding(node)) {
      bindings.push(node);
    }
  });

  return bindings;
}

// ============================================================================
// Type Exports
// ============================================================================

export type SExprInput = z.input<typeof SExprSchema>;
export type ExpressionInput = z.input<typeof ExpressionSchema>;
