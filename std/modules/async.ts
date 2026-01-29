/**
 * Async Module - Asynchronous Operations
 *
 * Provides functions for handling async operations, delays, and timing.
 * These operators have side effects as they affect execution timing.
 *
 * @packageDocumentation
 */

import type { StdOperatorMeta } from '../types.js';

/**
 * Async module operators.
 * These operators control execution timing and have side effects.
 */
export const ASYNC_OPERATORS: Record<string, StdOperatorMeta> = {
  'async/delay': {
    module: 'async',
    category: 'std-async',
    minArity: 1,
    maxArity: 1,
    description: 'Wait for specified milliseconds',
    hasSideEffects: true,
    returnType: 'void',
    params: [{ name: 'ms', type: 'number', description: 'Milliseconds to wait' }],
    example: '["async/delay", 2000] // Wait 2 seconds',
  },
  'async/timeout': {
    module: 'async',
    category: 'std-async',
    minArity: 2,
    maxArity: 2,
    description: 'Add timeout to an effect',
    hasSideEffects: true,
    returnType: 'any',
    params: [
      { name: 'effect', type: 'expression', description: 'Effect to execute' },
      { name: 'ms', type: 'number', description: 'Timeout in milliseconds' },
    ],
    example: '["async/timeout", ["call", "api", "fetchData"], 5000]',
  },
  'async/debounce': {
    module: 'async',
    category: 'std-async',
    minArity: 2,
    maxArity: 2,
    description: 'Debounce an event (wait for pause in events)',
    hasSideEffects: true,
    returnType: 'void',
    params: [
      { name: 'event', type: 'string', description: 'Event name to emit' },
      { name: 'ms', type: 'number', description: 'Debounce delay in milliseconds' },
    ],
    example: '["async/debounce", "SEARCH", 300]',
  },
  'async/throttle': {
    module: 'async',
    category: 'std-async',
    minArity: 2,
    maxArity: 2,
    description: 'Throttle an event (emit at most once per interval)',
    hasSideEffects: true,
    returnType: 'void',
    params: [
      { name: 'event', type: 'string', description: 'Event name to emit' },
      { name: 'ms', type: 'number', description: 'Throttle interval in milliseconds' },
    ],
    example: '["async/throttle", "SCROLL", 100]',
  },
  'async/retry': {
    module: 'async',
    category: 'std-async',
    minArity: 2,
    maxArity: 2,
    description: 'Retry an effect with configurable backoff',
    hasSideEffects: true,
    returnType: 'any',
    params: [
      { name: 'effect', type: 'expression', description: 'Effect to retry' },
      { name: 'opts', type: 'object', description: '{ attempts, backoff, baseDelay }' },
    ],
    example: `["async/retry",
  ["call", "api", "fetchData", { "id": "@entity.id" }],
  { "attempts": 3, "backoff": "exponential", "baseDelay": 1000 }]`,
  },
  'async/race': {
    module: 'async',
    category: 'std-async',
    minArity: 2,
    maxArity: null,
    description: 'Execute effects in parallel, return first to complete',
    hasSideEffects: true,
    returnType: 'any',
    params: [{ name: '...effects', type: 'expression[]', description: 'Effects to race' }],
    example: '["async/race", ["call", "api1"], ["call", "api2"]]',
  },
  'async/all': {
    module: 'async',
    category: 'std-async',
    minArity: 2,
    maxArity: null,
    description: 'Execute effects in parallel, wait for all to complete',
    hasSideEffects: true,
    returnType: 'array',
    params: [{ name: '...effects', type: 'expression[]', description: 'Effects to execute' }],
    example: '["async/all", ["call", "api1"], ["call", "api2"]]',
  },
  'async/sequence': {
    module: 'async',
    category: 'std-async',
    minArity: 2,
    maxArity: null,
    description: 'Execute effects in sequence (one after another)',
    hasSideEffects: true,
    returnType: 'array',
    params: [{ name: '...effects', type: 'expression[]', description: 'Effects to execute in order' }],
    example: '["async/sequence", ["call", "validate"], ["call", "save"]]',
  },
};

/**
 * Get all async operator names.
 */
export function getAsyncOperators(): string[] {
  return Object.keys(ASYNC_OPERATORS);
}
