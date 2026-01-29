/**
 * Standard Library Types
 *
 * Common types and interfaces for the Almadar Standard Library.
 * Extends the core operator system with std-prefixed modules.
 *
 * @packageDocumentation
 */

import { OperatorMeta } from '../types/operators.js';

// ============================================================================
// Standard Library Categories
// ============================================================================

/**
 * Standard library module names.
 * Each module provides a set of operators prefixed with the module name.
 * E.g., 'math' provides 'math/abs', 'math/clamp', etc.
 */
export const STD_MODULES = [
  'math',
  'str',
  'array',
  'object',
  'time',
  'validate',
  'format',
  'async',
  'nn',
  'tensor',
  'train',
] as const;

export type StdModule = (typeof STD_MODULES)[number];

/**
 * Standard library operator categories.
 * These extend the core categories for more granular classification.
 */
export const STD_OPERATOR_CATEGORIES = [
  'std-math',
  'std-str',
  'std-array',
  'std-object',
  'std-time',
  'std-validate',
  'std-format',
  'std-async',
  'std-nn',
  'std-tensor',
  'std-train',
] as const;

export type StdOperatorCategory = (typeof STD_OPERATOR_CATEGORIES)[number];

// ============================================================================
// Extended Operator Metadata
// ============================================================================

/**
 * Extended operator metadata for std library operators.
 * Adds parameter descriptions and examples.
 */
export interface StdOperatorMeta extends OperatorMeta {
  /** The std module this operator belongs to */
  module: StdModule;
  /** Parameter names and descriptions */
  params?: {
    name: string;
    type: string;
    description: string;
    optional?: boolean;
    defaultValue?: unknown;
  }[];
  /** Example usage */
  example?: string;
  /** Whether this operator accepts a lambda expression argument */
  acceptsLambda?: boolean;
  /** Position of the lambda argument (0-indexed) */
  lambdaArgPosition?: number;
}

/**
 * Type guard to check if an operator category is a std category.
 */
export function isStdCategory(category: string): category is StdOperatorCategory {
  return STD_OPERATOR_CATEGORIES.includes(category as StdOperatorCategory);
}

/**
 * Get the module name from a std operator name.
 * E.g., 'math/clamp' -> 'math'
 */
export function getModuleFromOperator(operator: string): StdModule | null {
  const parts = operator.split('/');
  if (parts.length !== 2) return null;
  const module = parts[0];
  return STD_MODULES.includes(module as StdModule) ? (module as StdModule) : null;
}

/**
 * Get the function name from a std operator.
 * E.g., 'math/clamp' -> 'clamp'
 */
export function getFunctionFromOperator(operator: string): string | null {
  const parts = operator.split('/');
  return parts.length === 2 ? parts[1] : null;
}

/**
 * Check if an operator name is a std library operator.
 * Std library operators are prefixed with their module name (e.g., 'math/', 'str/').
 */
export function isStdOperator(operator: string): boolean {
  return getModuleFromOperator(operator) !== null;
}

/**
 * Create a std operator name from module and function name.
 * E.g., ('math', 'clamp') -> 'math/clamp'
 */
export function makeStdOperator(module: StdModule, fn: string): string {
  return `${module}/${fn}`;
}
