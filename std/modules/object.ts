/**
 * Object Module - Object Operations
 *
 * Provides object manipulation and transformation functions.
 * All operations are immutable (return new objects).
 *
 * @packageDocumentation
 */

import type { StdOperatorMeta } from '../types.js';

/**
 * Object module operators.
 * All operators return objects or other values and have no side effects.
 */
export const OBJECT_OPERATORS: Record<string, StdOperatorMeta> = {
  'object/keys': {
    module: 'object',
    category: 'std-object',
    minArity: 1,
    maxArity: 1,
    description: 'Get object keys as array',
    hasSideEffects: false,
    returnType: 'array',
    params: [{ name: 'obj', type: 'object', description: 'The object' }],
    example: '["object/keys", {"a": 1, "b": 2}] // => ["a", "b"]',
  },
  'object/values': {
    module: 'object',
    category: 'std-object',
    minArity: 1,
    maxArity: 1,
    description: 'Get object values as array',
    hasSideEffects: false,
    returnType: 'array',
    params: [{ name: 'obj', type: 'object', description: 'The object' }],
    example: '["object/values", {"a": 1, "b": 2}] // => [1, 2]',
  },
  'object/entries': {
    module: 'object',
    category: 'std-object',
    minArity: 1,
    maxArity: 1,
    description: 'Get [key, value] pairs as array',
    hasSideEffects: false,
    returnType: 'array',
    params: [{ name: 'obj', type: 'object', description: 'The object' }],
    example: '["object/entries", {"a": 1}] // => [["a", 1]]',
  },
  'object/fromEntries': {
    module: 'object',
    category: 'std-object',
    minArity: 1,
    maxArity: 1,
    description: 'Create object from [key, value] pairs',
    hasSideEffects: false,
    returnType: 'any',
    params: [{ name: 'entries', type: 'array', description: 'Array of [key, value] pairs' }],
    example: '["object/fromEntries", [["a", 1], ["b", 2]]] // => {"a": 1, "b": 2}',
  },
  'object/get': {
    module: 'object',
    category: 'std-object',
    minArity: 2,
    maxArity: 3,
    description: 'Get nested value by path',
    hasSideEffects: false,
    returnType: 'any',
    params: [
      { name: 'obj', type: 'object', description: 'The object' },
      { name: 'path', type: 'string', description: 'Dot-separated path (e.g., "user.name")' },
      { name: 'default', type: 'any', description: 'Default if path not found', optional: true },
    ],
    example: '["object/get", "@user", "profile.name", "Anonymous"]',
  },
  'object/set': {
    module: 'object',
    category: 'std-object',
    minArity: 3,
    maxArity: 3,
    description: 'Set nested value by path (returns new object)',
    hasSideEffects: false,
    returnType: 'any',
    params: [
      { name: 'obj', type: 'object', description: 'The object' },
      { name: 'path', type: 'string', description: 'Dot-separated path' },
      { name: 'value', type: 'any', description: 'Value to set' },
    ],
    example: '["object/set", "@user", "profile.name", "John"]',
  },
  'object/has': {
    module: 'object',
    category: 'std-object',
    minArity: 2,
    maxArity: 2,
    description: 'Check if path exists',
    hasSideEffects: false,
    returnType: 'boolean',
    params: [
      { name: 'obj', type: 'object', description: 'The object' },
      { name: 'path', type: 'string', description: 'Dot-separated path' },
    ],
    example: '["object/has", "@user", "profile.name"]',
  },
  'object/merge': {
    module: 'object',
    category: 'std-object',
    minArity: 2,
    maxArity: null,
    description: 'Shallow merge objects (later wins)',
    hasSideEffects: false,
    returnType: 'any',
    params: [{ name: '...objs', type: 'object[]', description: 'Objects to merge' }],
    example: '["object/merge", {"a": 1}, {"b": 2}] // => {"a": 1, "b": 2}',
  },
  'object/deepMerge': {
    module: 'object',
    category: 'std-object',
    minArity: 2,
    maxArity: null,
    description: 'Deep merge objects (later wins)',
    hasSideEffects: false,
    returnType: 'any',
    params: [{ name: '...objs', type: 'object[]', description: 'Objects to merge' }],
    example: '["object/deepMerge", {"a": {"b": 1}}, {"a": {"c": 2}}]',
  },
  'object/pick': {
    module: 'object',
    category: 'std-object',
    minArity: 2,
    maxArity: 2,
    description: 'Select only specified keys',
    hasSideEffects: false,
    returnType: 'any',
    params: [
      { name: 'obj', type: 'object', description: 'The object' },
      { name: 'keys', type: 'array', description: 'Keys to keep' },
    ],
    example: '["object/pick", "@entity", ["name", "email"]]',
  },
  'object/omit': {
    module: 'object',
    category: 'std-object',
    minArity: 2,
    maxArity: 2,
    description: 'Exclude specified keys',
    hasSideEffects: false,
    returnType: 'any',
    params: [
      { name: 'obj', type: 'object', description: 'The object' },
      { name: 'keys', type: 'array', description: 'Keys to exclude' },
    ],
    example: '["object/omit", "@entity", ["password", "secret"]]',
  },
  'object/mapValues': {
    module: 'object',
    category: 'std-object',
    minArity: 2,
    maxArity: 2,
    description: 'Transform all values',
    hasSideEffects: false,
    returnType: 'any',
    acceptsLambda: true,
    lambdaArgPosition: 1,
    params: [
      { name: 'obj', type: 'object', description: 'The object' },
      { name: 'fn', type: 'lambda', description: 'Transform function' },
    ],
    example: '["object/mapValues", "@stats", ["fn", "v", ["*", "@v", 100]]]',
  },
  'object/mapKeys': {
    module: 'object',
    category: 'std-object',
    minArity: 2,
    maxArity: 2,
    description: 'Transform all keys',
    hasSideEffects: false,
    returnType: 'any',
    acceptsLambda: true,
    lambdaArgPosition: 1,
    params: [
      { name: 'obj', type: 'object', description: 'The object' },
      { name: 'fn', type: 'lambda', description: 'Transform function' },
    ],
    example: '["object/mapKeys", "@data", ["fn", "k", ["str/upper", "@k"]]]',
  },
  'object/filter': {
    module: 'object',
    category: 'std-object',
    minArity: 2,
    maxArity: 2,
    description: 'Filter entries by predicate',
    hasSideEffects: false,
    returnType: 'any',
    acceptsLambda: true,
    lambdaArgPosition: 1,
    params: [
      { name: 'obj', type: 'object', description: 'The object' },
      { name: 'pred', type: 'lambda', description: 'Predicate (key, value) => boolean' },
    ],
    example: '["object/filter", "@data", ["fn", ["k", "v"], ["!=", "@v", null]]]',
  },
  'object/empty?': {
    module: 'object',
    category: 'std-object',
    minArity: 1,
    maxArity: 1,
    description: 'Check if object has no keys',
    hasSideEffects: false,
    returnType: 'boolean',
    params: [{ name: 'obj', type: 'object', description: 'The object' }],
    example: '["object/empty?", {}] // => true',
  },
  'object/equals': {
    module: 'object',
    category: 'std-object',
    minArity: 2,
    maxArity: 2,
    description: 'Deep equality check',
    hasSideEffects: false,
    returnType: 'boolean',
    params: [
      { name: 'a', type: 'object', description: 'First object' },
      { name: 'b', type: 'object', description: 'Second object' },
    ],
    example: '["object/equals", {"a": 1}, {"a": 1}] // => true',
  },
  'object/clone': {
    module: 'object',
    category: 'std-object',
    minArity: 1,
    maxArity: 1,
    description: 'Shallow clone object',
    hasSideEffects: false,
    returnType: 'any',
    params: [{ name: 'obj', type: 'object', description: 'The object' }],
    example: '["object/clone", "@entity"]',
  },
  'object/deepClone': {
    module: 'object',
    category: 'std-object',
    minArity: 1,
    maxArity: 1,
    description: 'Deep clone object',
    hasSideEffects: false,
    returnType: 'any',
    params: [{ name: 'obj', type: 'object', description: 'The object' }],
    example: '["object/deepClone", "@entity"]',
  },
  'path': {
    module: 'object',
    category: 'std-object',
    minArity: 1,
    maxArity: null, // variadic
    description: 'Build a dot-separated path string from segments. Used with set effect for dynamic field paths.',
    hasSideEffects: false,
    returnType: 'string',
    params: [
      { name: '...segments', type: 'string[]', description: 'Path segments to join with dots' },
    ],
    example: '["path", "formValues", "@payload.fieldId"] // => "formValues.customerName"',
  },
};

/**
 * Get all object operator names.
 */
export function getObjectOperators(): string[] {
  return Object.keys(OBJECT_OPERATORS);
}
