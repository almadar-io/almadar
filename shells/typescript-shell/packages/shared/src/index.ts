/**
 * Shared Package
 *
 * Re-exports types, schemas, and evaluator for use by client and server.
 * This file is updated by the sync script.
 */

export * from './types/entities';
export * from './schemas/entities';

// S-Expression Evaluator (synced from almadar-shared/evaluator)
export * from './evaluator/index.js';
