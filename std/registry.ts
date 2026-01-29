/**
 * Standard Library Registry
 *
 * Combined registry of all standard library operators.
 * Provides lookup and validation functions for std/* operators.
 *
 * @packageDocumentation
 */

import type { OperatorMeta } from '../types/operators.js';
import type { StdOperatorMeta, StdModule } from './types.js';
import { isStdOperator, getModuleFromOperator, STD_MODULES } from './types.js';

import { MATH_OPERATORS } from './modules/math.js';
import { STR_OPERATORS } from './modules/str.js';
import { ARRAY_OPERATORS } from './modules/array.js';
import { OBJECT_OPERATORS } from './modules/object.js';
import { TIME_OPERATORS } from './modules/time.js';
import { VALIDATE_OPERATORS } from './modules/validate.js';
import { FORMAT_OPERATORS } from './modules/format.js';
import { ASYNC_OPERATORS } from './modules/async.js';
import { NN_OPERATORS } from './modules/nn.js';
import { TENSOR_OPERATORS } from './modules/tensor.js';
import { TRAIN_OPERATORS } from './modules/train.js';

// ============================================================================
// Combined Registry
// ============================================================================

/**
 * Combined registry of all standard library operators.
 */
export const STD_OPERATORS: Record<string, StdOperatorMeta> = {
  ...MATH_OPERATORS,
  ...STR_OPERATORS,
  ...ARRAY_OPERATORS,
  ...OBJECT_OPERATORS,
  ...TIME_OPERATORS,
  ...VALIDATE_OPERATORS,
  ...FORMAT_OPERATORS,
  ...ASYNC_OPERATORS,
  ...NN_OPERATORS,
  ...TENSOR_OPERATORS,
  ...TRAIN_OPERATORS,
};

/**
 * Module-specific operator registries.
 */
export const STD_OPERATORS_BY_MODULE: Record<StdModule, Record<string, StdOperatorMeta>> = {
  math: MATH_OPERATORS,
  str: STR_OPERATORS,
  array: ARRAY_OPERATORS,
  object: OBJECT_OPERATORS,
  time: TIME_OPERATORS,
  validate: VALIDATE_OPERATORS,
  format: FORMAT_OPERATORS,
  async: ASYNC_OPERATORS,
  nn: NN_OPERATORS,
  tensor: TENSOR_OPERATORS,
  train: TRAIN_OPERATORS,
};

// ============================================================================
// Lookup Functions
// ============================================================================

/**
 * Get std operator metadata by name.
 *
 * @param operator - Operator name (e.g., 'math/clamp')
 * @returns Operator metadata or undefined if not found
 */
export function getStdOperatorMeta(operator: string): StdOperatorMeta | undefined {
  return STD_OPERATORS[operator];
}

/**
 * Check if an operator is a known std library operator.
 *
 * @param operator - Operator name
 * @returns true if operator exists in std library
 */
export function isKnownStdOperator(operator: string): boolean {
  return operator in STD_OPERATORS;
}

/**
 * Get all operators for a specific module.
 *
 * @param module - Module name
 * @returns Record of operators in that module
 */
export function getModuleOperators(module: StdModule): Record<string, StdOperatorMeta> {
  return STD_OPERATORS_BY_MODULE[module] || {};
}

/**
 * Get all std operator names.
 *
 * @returns Array of all std operator names
 */
export function getAllStdOperators(): string[] {
  return Object.keys(STD_OPERATORS);
}

/**
 * Get all std operator names for a specific module.
 *
 * @param module - Module name
 * @returns Array of operator names in that module
 */
export function getStdOperatorsByModule(module: StdModule): string[] {
  return Object.keys(STD_OPERATORS_BY_MODULE[module] || {});
}

/**
 * Get all std operators that accept lambda expressions.
 *
 * @returns Array of operator names that accept lambdas
 */
export function getLambdaOperators(): string[] {
  return Object.entries(STD_OPERATORS)
    .filter(([, meta]) => meta.acceptsLambda)
    .map(([name]) => name);
}

/**
 * Get all std operators with side effects.
 *
 * @returns Array of operator names with side effects
 */
export function getStdEffectOperators(): string[] {
  return Object.entries(STD_OPERATORS)
    .filter(([, meta]) => meta.hasSideEffects)
    .map(([name]) => name);
}

/**
 * Get all pure std operators (no side effects).
 *
 * @returns Array of operator names without side effects
 */
export function getStdPureOperators(): string[] {
  return Object.entries(STD_OPERATORS)
    .filter(([, meta]) => !meta.hasSideEffects)
    .map(([name]) => name);
}

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validate std operator arity.
 *
 * @param operator - Operator name
 * @param argCount - Number of arguments provided
 * @returns Error message if invalid, null if valid
 */
export function validateStdOperatorArity(operator: string, argCount: number): string | null {
  const meta = STD_OPERATORS[operator];
  if (!meta) {
    return `Unknown std operator: ${operator}`;
  }

  if (argCount < meta.minArity) {
    return `Operator '${operator}' requires at least ${meta.minArity} argument(s), got ${argCount}`;
  }

  if (meta.maxArity !== null && argCount > meta.maxArity) {
    return `Operator '${operator}' accepts at most ${meta.maxArity} argument(s), got ${argCount}`;
  }

  return null;
}

/**
 * Check if a std operator is valid in guard context (no side effects).
 *
 * @param operator - Operator name
 * @returns true if operator can be used in guards
 */
export function isStdGuardOperator(operator: string): boolean {
  const meta = STD_OPERATORS[operator];
  return meta !== undefined && !meta.hasSideEffects;
}

/**
 * Check if a std operator has side effects.
 *
 * @param operator - Operator name
 * @returns true if operator has side effects
 */
export function isStdEffectOperator(operator: string): boolean {
  const meta = STD_OPERATORS[operator];
  return meta?.hasSideEffects ?? false;
}

// ============================================================================
// Integration with Core Operators
// ============================================================================

/**
 * Get operator metadata, checking both core and std operators.
 * This function integrates with the core operator system.
 *
 * @param operator - Operator name
 * @param coreOperators - Core operator registry (OPERATORS from operators.ts)
 * @returns Operator metadata or undefined
 */
export function getOperatorMetaExtended(
  operator: string,
  coreOperators: Record<string, OperatorMeta>
): OperatorMeta | StdOperatorMeta | undefined {
  // Check std operators first if it looks like a std operator
  if (isStdOperator(operator)) {
    return STD_OPERATORS[operator];
  }
  // Fall back to core operators
  return coreOperators[operator];
}

/**
 * Check if an operator is known (core or std).
 *
 * @param operator - Operator name
 * @param coreOperators - Core operator registry
 * @returns true if operator exists
 */
export function isKnownOperatorExtended(
  operator: string,
  coreOperators: Record<string, OperatorMeta>
): boolean {
  if (isStdOperator(operator)) {
    return operator in STD_OPERATORS;
  }
  return operator in coreOperators;
}

/**
 * Validate operator arity (core or std).
 *
 * @param operator - Operator name
 * @param argCount - Number of arguments
 * @param coreOperators - Core operator registry
 * @returns Error message or null
 */
export function validateOperatorArityExtended(
  operator: string,
  argCount: number,
  coreOperators: Record<string, OperatorMeta>
): string | null {
  if (isStdOperator(operator)) {
    return validateStdOperatorArity(operator, argCount);
  }

  const meta = coreOperators[operator];
  if (!meta) {
    return `Unknown operator: ${operator}`;
  }

  if (argCount < meta.minArity) {
    return `Operator '${operator}' requires at least ${meta.minArity} argument(s), got ${argCount}`;
  }

  if (meta.maxArity !== null && argCount > meta.maxArity) {
    return `Operator '${operator}' accepts at most ${meta.maxArity} argument(s), got ${argCount}`;
  }

  return null;
}

/**
 * Check if an operator has side effects (core or std).
 *
 * @param operator - Operator name
 * @param coreOperators - Core operator registry
 * @returns true if operator has side effects
 */
export function isEffectOperatorExtended(
  operator: string,
  coreOperators: Record<string, OperatorMeta>
): boolean {
  if (isStdOperator(operator)) {
    return isStdEffectOperator(operator);
  }
  const meta = coreOperators[operator];
  return meta?.hasSideEffects ?? false;
}

// ============================================================================
// Statistics
// ============================================================================

/**
 * Get statistics about the standard library.
 */
export function getStdLibStats(): {
  totalOperators: number;
  byModule: Record<StdModule, number>;
  pureOperators: number;
  effectOperators: number;
  lambdaOperators: number;
} {
  const byModule = {} as Record<StdModule, number>;
  for (const module of STD_MODULES) {
    byModule[module] = Object.keys(STD_OPERATORS_BY_MODULE[module] || {}).length;
  }

  return {
    totalOperators: Object.keys(STD_OPERATORS).length,
    byModule,
    pureOperators: getStdPureOperators().length,
    effectOperators: getStdEffectOperators().length,
    lambdaOperators: getLambdaOperators().length,
  };
}
