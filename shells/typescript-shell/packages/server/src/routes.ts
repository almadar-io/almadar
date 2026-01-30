/**
 * Routes Registration
 *
 * Main routes file for shell compatibility.
 * This file is a placeholder - generated code will add feature routes.
 *
 * @packageDocumentation
 */

import type { Express } from 'express';
import orbitalsRouter from './routes/orbitals.js';

/**
 * Register all API routes
 * Feature routes will be added here by the compiler.
 */
export function registerRoutes(app: Express): void {
  // Almadar events endpoint
  app.use('/api/orbitals', orbitalsRouter);

  // Feature routes will be registered here by the compiler
  // Example: app.use('/api/tasks', taskRouter);
}
