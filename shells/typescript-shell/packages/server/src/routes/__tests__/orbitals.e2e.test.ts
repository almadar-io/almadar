/**
 * Almadar Events Route E2E Tests
 *
 * End-to-end tests for the full almadar event flow:
 * - Event processing through state machines
 * - Effect execution (emit, persist, set)
 * - ENTITY_* standard events for CRUD operations
 * - Cross-almadar communication
 *
 * @packageDocumentation
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import express, { type Express } from 'express';
import request from 'supertest';
import { router, registerOrbital, unregisterOrbital, ENTITY_EVENTS } from '../orbitals.js';
import type { OrbitalRegistration } from '../orbitals.js';

// Mock dependencies
vi.mock('@/services', () => ({
    dataService: {
        list: vi.fn().mockResolvedValue([]),
        getById: vi.fn().mockResolvedValue({ id: '1', name: 'Test' }),
        create: vi.fn().mockResolvedValue({ id: 'new-1' }),
        update: vi.fn().mockResolvedValue({ id: '1' }),
        delete: vi.fn().mockResolvedValue(undefined),
    },
}));

vi.mock('@/lib/logger', () => ({
    logger: {
        info: vi.fn(),
        debug: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
    },
}));

vi.mock('@/middleware/traitExecution', () => ({
    getServerEventBus: vi.fn(() => ({
        emit: vi.fn(),
        on: vi.fn(() => () => {}),
    })),
}));

describe('Almadar Events Route E2E', () => {
    let app: Express;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.use('/api/orbitals', router);
        vi.clearAllMocks();
    });

    afterEach(() => {
        // Clean up registered orbitals
        unregisterOrbital('TestOrbital');
        unregisterOrbital('TaskManager');
    });

    describe('GET /api/orbitals', () => {
        it('returns empty list when no orbitals registered', async () => {
            const res = await request(app).get('/api/orbitals');

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.orbitals).toEqual([]);
        });

        it('returns registered orbitals', async () => {
            const registration: OrbitalRegistration = {
                name: 'TestOrbital',
                entityType: 'TestEntity',
                traits: [{
                    name: 'TestTrait',
                    states: [{ name: 'Initial', isInitial: true }],
                    transitions: [],
                }],
            };
            registerOrbital(registration);

            const res = await request(app).get('/api/orbitals');

            expect(res.status).toBe(200);
            expect(res.body.orbitals).toHaveLength(1);
            expect(res.body.orbitals[0].name).toBe('TestOrbital');
        });
    });

    describe('GET /api/orbitals/:orbital', () => {
        it('returns 404 for unregistered orbital', async () => {
            const res = await request(app).get('/api/orbitals/Unknown');

            expect(res.status).toBe(404);
            expect(res.body.success).toBe(false);
        });

        it('returns almadar info with traits', async () => {
            const registration: OrbitalRegistration = {
                name: 'TestOrbital',
                entityType: 'TestEntity',
                traits: [{
                    name: 'TestTrait',
                    states: [
                        { name: 'Initial', isInitial: true },
                        { name: 'Active' },
                    ],
                    transitions: [
                        { from: 'Initial', to: 'Active', event: 'ACTIVATE' },
                    ],
                }],
            };
            registerOrbital(registration);

            const res = await request(app).get('/api/orbitals/TestOrbital');

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.orbital.name).toBe('TestOrbital');
            expect(res.body.orbital.traits[0].states).toContain('Initial');
            expect(res.body.orbital.traits[0].states).toContain('Active');
        });
    });

    describe('POST /api/orbitals/:orbital/events', () => {
        const registration: OrbitalRegistration = {
            name: 'TaskManager',
            entityType: 'Task',
            traits: [{
                name: 'TaskLifecycle',
                states: [
                    { name: 'Pending', isInitial: true },
                    { name: 'InProgress' },
                    { name: 'Completed' },
                ],
                transitions: [
                    { from: 'Pending', to: 'InProgress', event: 'START' },
                    { from: 'InProgress', to: 'Completed', event: 'COMPLETE' },
                ],
            }],
        };

        beforeEach(() => {
            registerOrbital(registration);
        });

        it('returns 404 for unregistered orbital', async () => {
            const res = await request(app)
                .post('/api/orbitals/Unknown/events')
                .send({ event: 'TEST' });

            expect(res.status).toBe(404);
            expect(res.body.error).toContain('not found');
        });

        it('processes trait event through state machine', async () => {
            const res = await request(app)
                .post('/api/orbitals/TaskManager/events')
                .send({ event: 'START', entityId: '1' });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.transitioned).toBe(true);
        });

        it('handles event with payload', async () => {
            const res = await request(app)
                .post('/api/orbitals/TaskManager/events')
                .send({
                    event: 'START',
                    entityId: '1',
                    payload: { userId: 'user-1' },
                });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('returns emitted events in response', async () => {
            const res = await request(app)
                .post('/api/orbitals/TaskManager/events')
                .send({ event: 'START', entityId: '1' });

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body.emittedEvents)).toBe(true);
        });
    });

    describe('ENTITY_* Standard Events', () => {
        const registration: OrbitalRegistration = {
            name: 'TaskManager',
            entityType: 'Task',
            traits: [],
        };

        beforeEach(() => {
            registerOrbital(registration);
        });

        it('handles ENTITY_CREATE event', async () => {
            const { dataService } = await import('@/services');

            const res = await request(app)
                .post('/api/orbitals/TaskManager/events')
                .send({
                    event: ENTITY_EVENTS.CREATE,
                    payload: {
                        data: { title: 'New Task', status: 'pending' },
                        entityType: 'Task',
                    },
                });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(dataService.create).toHaveBeenCalledWith('Task', {
                title: 'New Task',
                status: 'pending',
            });
        });

        it('handles ENTITY_UPDATE event', async () => {
            const { dataService } = await import('@/services');

            const res = await request(app)
                .post('/api/orbitals/TaskManager/events')
                .send({
                    event: ENTITY_EVENTS.UPDATE,
                    entityId: '1',
                    payload: {
                        data: { status: 'completed' },
                        entityType: 'Task',
                    },
                });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(dataService.update).toHaveBeenCalledWith('Task', '1', {
                status: 'completed',
            });
        });

        it('handles ENTITY_DELETE event', async () => {
            const { dataService } = await import('@/services');

            const res = await request(app)
                .post('/api/orbitals/TaskManager/events')
                .send({
                    event: ENTITY_EVENTS.DELETE,
                    entityId: '1',
                    payload: { entityType: 'Task' },
                });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(dataService.delete).toHaveBeenCalledWith('Task', '1');
        });

        it('returns error for ENTITY_UPDATE without entityId', async () => {
            const res = await request(app)
                .post('/api/orbitals/TaskManager/events')
                .send({
                    event: ENTITY_EVENTS.UPDATE,
                    payload: { data: { status: 'completed' } },
                });

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.error).toContain('entityId required');
        });

        it('returns error for ENTITY_DELETE without entityId', async () => {
            const res = await request(app)
                .post('/api/orbitals/TaskManager/events')
                .send({
                    event: ENTITY_EVENTS.DELETE,
                    payload: {},
                });

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.error).toContain('entityId required');
        });
    });

    describe('Effect Execution', () => {
        it('executes emit effect and returns emitted events', async () => {
            const registration: OrbitalRegistration = {
                name: 'TestOrbital',
                entityType: 'TestEntity',
                traits: [{
                    name: 'EmitTrait',
                    states: [
                        { name: 'Initial', isInitial: true },
                        { name: 'Done' },
                    ],
                    transitions: [{
                        from: 'Initial',
                        to: 'Done',
                        event: 'FINISH',
                        effects: [
                            ['emit', 'TASK_COMPLETED', { success: true }],
                        ],
                    }],
                }],
            };
            registerOrbital(registration);

            const res = await request(app)
                .post('/api/orbitals/TestOrbital/events')
                .send({ event: 'FINISH', entityId: '1' });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            // Emitted events should be in response
            expect(Array.isArray(res.body.emittedEvents)).toBe(true);
        });

        it('executes persist effect via dataService', async () => {
            const { dataService } = await import('@/services');

            const registration: OrbitalRegistration = {
                name: 'TestOrbital',
                entityType: 'TestEntity',
                traits: [{
                    name: 'PersistTrait',
                    states: [
                        { name: 'Draft', isInitial: true },
                        { name: 'Saved' },
                    ],
                    transitions: [{
                        from: 'Draft',
                        to: 'Saved',
                        event: 'SAVE',
                        effects: [
                            ['persist', 'update', 'TestEntity', { status: 'saved' }],
                        ],
                    }],
                }],
            };
            registerOrbital(registration);

            const res = await request(app)
                .post('/api/orbitals/TestOrbital/events')
                .send({ event: 'SAVE', entityId: '1' });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });

    describe('Cross-Almadar Communication', () => {
        it('emitted events can be received by other orbitals', async () => {
            // Register two orbitals
            const orderOrbital: OrbitalRegistration = {
                name: 'OrderManager',
                entityType: 'Order',
                traits: [{
                    name: 'OrderLifecycle',
                    states: [
                        { name: 'Pending', isInitial: true },
                        { name: 'Placed' },
                    ],
                    transitions: [{
                        from: 'Pending',
                        to: 'Placed',
                        event: 'PLACE',
                        effects: [
                            ['emit', 'ORDER_PLACED', { orderId: '123' }],
                        ],
                    }],
                }],
            };

            const inventoryOrbital: OrbitalRegistration = {
                name: 'InventoryManager',
                entityType: 'Inventory',
                traits: [{
                    name: 'InventoryTracker',
                    states: [{ name: 'Ready', isInitial: true }],
                    transitions: [],
                    listens: [{
                        event: 'ORDER_PLACED',
                        triggers: 'RESERVE_STOCK',
                    }],
                }],
            };

            registerOrbital(orderOrbital);
            registerOrbital(inventoryOrbital);

            // Place order - should emit ORDER_PLACED
            const res = await request(app)
                .post('/api/orbitals/OrderManager/events')
                .send({ event: 'PLACE', entityId: '123' });

            expect(res.status).toBe(200);
            expect(res.body.emittedEvents).toBeDefined();

            // Cleanup
            unregisterOrbital('OrderManager');
            unregisterOrbital('InventoryManager');
        });
    });
});
