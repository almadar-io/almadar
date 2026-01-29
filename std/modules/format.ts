/**
 * Format Module - Display Formatting
 *
 * Provides formatting functions for numbers, currencies, and display values.
 *
 * @packageDocumentation
 */

import type { StdOperatorMeta } from '../types.js';

/**
 * Format module operators.
 * All operators return formatted strings and have no side effects.
 */
export const FORMAT_OPERATORS: Record<string, StdOperatorMeta> = {
  'format/number': {
    module: 'format',
    category: 'std-format',
    minArity: 1,
    maxArity: 2,
    description: 'Format number with locale-aware separators',
    hasSideEffects: false,
    returnType: 'string',
    params: [
      { name: 'n', type: 'number', description: 'Number to format' },
      { name: 'opts', type: 'object', description: 'Format options (decimals, locale)', optional: true },
    ],
    example: '["format/number", 1234567.89] // => "1,234,567.89"',
  },
  'format/currency': {
    module: 'format',
    category: 'std-format',
    minArity: 2,
    maxArity: 3,
    description: 'Format as currency',
    hasSideEffects: false,
    returnType: 'string',
    params: [
      { name: 'n', type: 'number', description: 'Amount' },
      { name: 'currency', type: 'string', description: 'Currency code (USD, EUR, etc.)' },
      { name: 'locale', type: 'string', description: 'Locale', optional: true, defaultValue: 'en-US' },
    ],
    example: '["format/currency", 1234.56, "USD"] // => "$1,234.56"',
  },
  'format/percent': {
    module: 'format',
    category: 'std-format',
    minArity: 1,
    maxArity: 2,
    description: 'Format as percentage',
    hasSideEffects: false,
    returnType: 'string',
    params: [
      { name: 'n', type: 'number', description: 'Number (0.5 = 50%)' },
      { name: 'decimals', type: 'number', description: 'Decimal places', optional: true, defaultValue: 0 },
    ],
    example: '["format/percent", 0.856, 1] // => "85.6%"',
  },
  'format/bytes': {
    module: 'format',
    category: 'std-format',
    minArity: 1,
    maxArity: 1,
    description: 'Format bytes as human-readable size',
    hasSideEffects: false,
    returnType: 'string',
    params: [{ name: 'n', type: 'number', description: 'Bytes' }],
    example: '["format/bytes", 2500000] // => "2.4 MB"',
  },
  'format/ordinal': {
    module: 'format',
    category: 'std-format',
    minArity: 1,
    maxArity: 1,
    description: 'Format number as ordinal (1st, 2nd, 3rd)',
    hasSideEffects: false,
    returnType: 'string',
    params: [{ name: 'n', type: 'number', description: 'Number' }],
    example: '["format/ordinal", 42] // => "42nd"',
  },
  'format/plural': {
    module: 'format',
    category: 'std-format',
    minArity: 3,
    maxArity: 3,
    description: 'Format count with singular/plural word',
    hasSideEffects: false,
    returnType: 'string',
    params: [
      { name: 'n', type: 'number', description: 'Count' },
      { name: 'singular', type: 'string', description: 'Singular form' },
      { name: 'plural', type: 'string', description: 'Plural form' },
    ],
    example: '["format/plural", 5, "item", "items"] // => "5 items"',
  },
  'format/list': {
    module: 'format',
    category: 'std-format',
    minArity: 1,
    maxArity: 2,
    description: 'Format array as natural language list',
    hasSideEffects: false,
    returnType: 'string',
    params: [
      { name: 'arr', type: 'array', description: 'Array of strings' },
      { name: 'style', type: 'string', description: '"and" or "or"', optional: true, defaultValue: 'and' },
    ],
    example: '["format/list", ["Alice", "Bob", "Charlie"], "and"] // => "Alice, Bob, and Charlie"',
  },
  'format/phone': {
    module: 'format',
    category: 'std-format',
    minArity: 1,
    maxArity: 2,
    description: 'Format phone number',
    hasSideEffects: false,
    returnType: 'string',
    params: [
      { name: 'str', type: 'string', description: 'Phone number digits' },
      { name: 'format', type: 'string', description: 'Format pattern', optional: true, defaultValue: 'US' },
    ],
    example: '["format/phone", "5551234567"] // => "(555) 123-4567"',
  },
  'format/creditCard': {
    module: 'format',
    category: 'std-format',
    minArity: 1,
    maxArity: 1,
    description: 'Format credit card with masked digits',
    hasSideEffects: false,
    returnType: 'string',
    params: [{ name: 'str', type: 'string', description: 'Card number' }],
    example: '["format/creditCard", "4111111111111234"] // => "•••• •••• •••• 1234"',
  },
};

/**
 * Get all format operator names.
 */
export function getFormatOperators(): string[] {
  return Object.keys(FORMAT_OPERATORS);
}
