/**
 * Math Module - Numeric Operations
 *
 * Provides higher-level numeric operations beyond basic arithmetic.
 * Basic arithmetic (+, -, *, /, %) is provided by language primitives.
 *
 * @packageDocumentation
 */

import type { StdOperatorMeta } from '../types.js';

/**
 * Math module operators.
 * All operators return numbers and have no side effects.
 */
export const MATH_OPERATORS: Record<string, StdOperatorMeta> = {
  'math/abs': {
    module: 'math',
    category: 'std-math',
    minArity: 1,
    maxArity: 1,
    description: 'Absolute value',
    hasSideEffects: false,
    returnType: 'number',
    params: [{ name: 'n', type: 'number', description: 'The number' }],
    example: '["math/abs", -5] // => 5',
  },
  'math/min': {
    module: 'math',
    category: 'std-math',
    minArity: 2,
    maxArity: null,
    description: 'Minimum of values',
    hasSideEffects: false,
    returnType: 'number',
    params: [{ name: '...nums', type: 'number[]', description: 'Numbers to compare' }],
    example: '["math/min", 3, 1, 4] // => 1',
  },
  'math/max': {
    module: 'math',
    category: 'std-math',
    minArity: 2,
    maxArity: null,
    description: 'Maximum of values',
    hasSideEffects: false,
    returnType: 'number',
    params: [{ name: '...nums', type: 'number[]', description: 'Numbers to compare' }],
    example: '["math/max", 3, 1, 4] // => 4',
  },
  'math/clamp': {
    module: 'math',
    category: 'std-math',
    minArity: 3,
    maxArity: 3,
    description: 'Constrain value to range [min, max]',
    hasSideEffects: false,
    returnType: 'number',
    params: [
      { name: 'n', type: 'number', description: 'The value to clamp' },
      { name: 'min', type: 'number', description: 'Minimum bound' },
      { name: 'max', type: 'number', description: 'Maximum bound' },
    ],
    example: '["math/clamp", 150, 0, 100] // => 100',
  },
  'math/floor': {
    module: 'math',
    category: 'std-math',
    minArity: 1,
    maxArity: 1,
    description: 'Round down to integer',
    hasSideEffects: false,
    returnType: 'number',
    params: [{ name: 'n', type: 'number', description: 'The number' }],
    example: '["math/floor", 3.7] // => 3',
  },
  'math/ceil': {
    module: 'math',
    category: 'std-math',
    minArity: 1,
    maxArity: 1,
    description: 'Round up to integer',
    hasSideEffects: false,
    returnType: 'number',
    params: [{ name: 'n', type: 'number', description: 'The number' }],
    example: '["math/ceil", 3.2] // => 4',
  },
  'math/round': {
    module: 'math',
    category: 'std-math',
    minArity: 1,
    maxArity: 2,
    description: 'Round to nearest integer or specified decimals',
    hasSideEffects: false,
    returnType: 'number',
    params: [
      { name: 'n', type: 'number', description: 'The number' },
      { name: 'decimals', type: 'number', description: 'Decimal places', optional: true, defaultValue: 0 },
    ],
    example: '["math/round", 3.456, 2] // => 3.46',
  },
  'math/pow': {
    module: 'math',
    category: 'std-math',
    minArity: 2,
    maxArity: 2,
    description: 'Exponentiation (base^exp)',
    hasSideEffects: false,
    returnType: 'number',
    params: [
      { name: 'base', type: 'number', description: 'The base' },
      { name: 'exp', type: 'number', description: 'The exponent' },
    ],
    example: '["math/pow", 2, 8] // => 256',
  },
  'math/sqrt': {
    module: 'math',
    category: 'std-math',
    minArity: 1,
    maxArity: 1,
    description: 'Square root',
    hasSideEffects: false,
    returnType: 'number',
    params: [{ name: 'n', type: 'number', description: 'The number' }],
    example: '["math/sqrt", 16] // => 4',
  },
  'math/mod': {
    module: 'math',
    category: 'std-math',
    minArity: 2,
    maxArity: 2,
    description: 'Modulo (remainder)',
    hasSideEffects: false,
    returnType: 'number',
    params: [
      { name: 'a', type: 'number', description: 'Dividend' },
      { name: 'b', type: 'number', description: 'Divisor' },
    ],
    example: '["math/mod", 7, 3] // => 1',
  },
  'math/sign': {
    module: 'math',
    category: 'std-math',
    minArity: 1,
    maxArity: 1,
    description: 'Returns -1, 0, or 1 indicating sign',
    hasSideEffects: false,
    returnType: 'number',
    params: [{ name: 'n', type: 'number', description: 'The number' }],
    example: '["math/sign", -42] // => -1',
  },
  'math/lerp': {
    module: 'math',
    category: 'std-math',
    minArity: 3,
    maxArity: 3,
    description: 'Linear interpolation between a and b by factor t',
    hasSideEffects: false,
    returnType: 'number',
    params: [
      { name: 'a', type: 'number', description: 'Start value' },
      { name: 'b', type: 'number', description: 'End value' },
      { name: 't', type: 'number', description: 'Interpolation factor (0-1)' },
    ],
    example: '["math/lerp", 0, 100, 0.5] // => 50',
  },
  'math/map': {
    module: 'math',
    category: 'std-math',
    minArity: 5,
    maxArity: 5,
    description: 'Map value from one range to another',
    hasSideEffects: false,
    returnType: 'number',
    params: [
      { name: 'n', type: 'number', description: 'The value' },
      { name: 'inMin', type: 'number', description: 'Input range minimum' },
      { name: 'inMax', type: 'number', description: 'Input range maximum' },
      { name: 'outMin', type: 'number', description: 'Output range minimum' },
      { name: 'outMax', type: 'number', description: 'Output range maximum' },
    ],
    example: '["math/map", 5, 0, 10, 0, 100] // => 50',
  },
  'math/random': {
    module: 'math',
    category: 'std-math',
    minArity: 0,
    maxArity: 0,
    description: 'Random number between 0 (inclusive) and 1 (exclusive)',
    hasSideEffects: false,
    returnType: 'number',
    params: [],
    example: '["math/random"] // => 0.7234...',
  },
  'math/randomInt': {
    module: 'math',
    category: 'std-math',
    minArity: 2,
    maxArity: 2,
    description: 'Random integer in range [min, max] (inclusive)',
    hasSideEffects: false,
    returnType: 'number',
    params: [
      { name: 'min', type: 'number', description: 'Minimum (inclusive)' },
      { name: 'max', type: 'number', description: 'Maximum (inclusive)' },
    ],
    example: '["math/randomInt", 1, 6] // => 4',
  },
  'math/default': {
    module: 'math',
    category: 'std-math',
    minArity: 2,
    maxArity: 2,
    description: 'Return default if value is null, undefined, or NaN',
    hasSideEffects: false,
    returnType: 'number',
    params: [
      { name: 'n', type: 'number | null', description: 'The value' },
      { name: 'default', type: 'number', description: 'Default value' },
    ],
    example: '["math/default", null, 0] // => 0',
  },
};

/**
 * Get all math operator names.
 */
export function getMathOperators(): string[] {
  return Object.keys(MATH_OPERATORS);
}
