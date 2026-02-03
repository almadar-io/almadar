/**
 * Orbitals Route Stub
 *
 * IMPORTANT: This is a STUB for development/testing purposes only.
 *
 * In production, the compiler generates static event handlers at:
 * - routes/events/{orbital}/handlers.ts
 *
 * These compiled handlers have:
 * - Guards compiled to if statements
 * - Effects compiled to direct dataService calls
 * - NO runtime interpretation
 *
 * This stub file exists for backward compatibility during development.
 * The compiler's ServerEventGenerator produces the production routes.
 *
 * @see docs/Orbital_Execution_Model.md
 * @see packages/compiler/src/v2/generators/services/ServerEventGenerator.ts
 * @packageDocumentation
 */

import { Router, type Request, type Response } from 'express';
import { logger } from '@/lib/logger';

// ============================================================================
// Types (kept for compatibility)
// ============================================================================

export interface OrbitalRegistration {
  name: string;
  entityType: string;
  traits: unknown[];
}

export interface OrbitalEventRequest {
  event: string;
  payload?: Record<string, unknown>;
  entityId?: string;
}

export interface OrbitalEventResponse {
  success: boolean;
  transitioned: boolean;
  states: Record<string, string>;
  emittedEvents: Array<{ event: string; payload?: unknown }>;
  data?: Record<string, unknown[]>;
  clientEffects?: unknown[];
  error?: string;
}

/**
 * Standard entity mutation events
 */
export const ENTITY_EVENTS = {
  CREATE: 'ENTITY_CREATE',
  UPDATE: 'ENTITY_UPDATE',
  DELETE: 'ENTITY_DELETE',
} as const;

// ============================================================================
// Stub Registry (for development only)
// ============================================================================

const orbitalRegistry = new Map<string, OrbitalRegistration>();

/**
 * Register an almadar (development only)
 * @deprecated Use compiled event handlers in production
 */
export function registerOrbital(registration: OrbitalRegistration): void {
  orbitalRegistry.set(registration.name, registration);
  logger.info(`[Orbitals] Registered almadar (dev mode): ${registration.name}`);
}

/**
 * Unregister an orbital
 */
export function unregisterOrbital(name: string): void {
  orbitalRegistry.delete(name);
}

/**
 * Get all registered orbitals
 */
export function getRegisteredOrbitals(): OrbitalRegistration[] {
  return Array.from(orbitalRegistry.values());
}

// ============================================================================
// Development Router (STUB)
// ============================================================================

export const router = Router();

/**
 * GET / - List registered orbitals (dev only)
 */
router.get('/', (_req: Request, res: Response) => {
  const orbitals = Array.from(orbitalRegistry.values()).map((reg) => ({
    name: reg.name,
    entity: reg.entityType,
    traits: reg.traits.length,
  }));

  res.json({
    success: true,
    orbitals,
    warning: 'This is a development stub. Production uses compiled event handlers.',
  });
});

/**
 * POST /:orbital/events - Development stub
 *
 * @deprecated Use compiled event handlers in production.
 * See routes/events/{orbital}/handlers.ts
 */
router.post('/:orbital/events', (req: Request, res: Response) => {
  const orbitalName = req.params.orbital;
  const { event, payload, entityId } = req.body as OrbitalEventRequest;

  logger.warn(
    `[Orbitals] DEV STUB: Received event ${event} for ${orbitalName}. ` +
    `Production should use compiled routes at /api/${orbitalName}/${event?.toLowerCase()}`
  );

  // Return a stub response pointing to compiled handlers
  res.status(501).json({
    success: false,
    transitioned: false,
    states: {},
    emittedEvents: [],
    error: `Development stub - use compiled event handlers. ` +
           `Expected route: POST /api/${orbitalName}/${event?.toLowerCase() || 'EVENT_NAME'}`,
  } as OrbitalEventResponse);
});

export default router;
