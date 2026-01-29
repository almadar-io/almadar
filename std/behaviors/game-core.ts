/**
 * Game Core Behaviors
 *
 * Foundation behaviors for game systems: loop, physics, input, collision.
 * These use the Trait architecture with stateMachine and ticks.
 *
 * @packageDocumentation
 */

import type { StandardBehavior } from './types.js';

// ============================================================================
// std/GameLoop - Master Game Tick Coordination
// ============================================================================

/**
 * std/GameLoop - Coordinates game tick execution at 60fps.
 *
 * States: Running, Paused
 * Provides the master clock for all game systems.
 */
export const GAME_LOOP_BEHAVIOR: StandardBehavior = {
    name: 'std/GameLoop',
    category: 'game-core',
    description: 'Master game loop coordinator running at 60fps',
    suggestedFor: [
        'All real-time games',
        'Platformers',
        'Action games',
        'Endless runners',
    ],

    dataEntities: [
        {
            name: 'GameLoopState',
            runtime: true,
            singleton: true,
            fields: [
                { name: 'frameCount', type: 'number', default: 0 },
                { name: 'deltaTime', type: 'number', default: 16 },
                { name: 'elapsedTime', type: 'number', default: 0 },
            ],
        },
    ],

    stateMachine: {
        initial: 'Stopped',
        states: [
            { name: 'Stopped', isInitial: true },
            { name: 'Running' },
            { name: 'Paused' },
        ],
        events: [
            { key: 'START' },
            { key: 'STOP' },
            { key: 'PAUSE' },
            { key: 'RESUME' },
            { key: 'TICK' },
        ],
        transitions: [
            {
                from: 'Stopped',
                to: 'Running',
                event: 'START',
                effects: [
                    ['set', '@entity.frameCount', 0],
                    ['set', '@entity.elapsedTime', 0],
                ],
            },
            {
                from: 'Running',
                to: 'Paused',
                event: 'PAUSE',
                effects: [],
            },
            {
                from: 'Paused',
                to: 'Running',
                event: 'RESUME',
                effects: [],
            },
            {
                from: ['Running', 'Paused'],
                to: 'Stopped',
                event: 'STOP',
                effects: [],
            },
        ],
    },

    ticks: [
        {
            name: 'GameTick',
            interval: 'frame',
            guard: ['=', '@state', 'Running'],
            effects: [
                ['set', '@entity.frameCount', ['+', '@entity.frameCount', 1]],
                ['set', '@entity.elapsedTime', ['+', '@entity.elapsedTime', '@entity.deltaTime']],
                ['emit', 'GAME_TICK', { frame: '@entity.frameCount', delta: '@entity.deltaTime' }],
            ],
        },
    ],

    configSchema: {
        required: [],
        optional: [
            { name: 'targetFps', type: 'number', description: 'Target frames per second', default: 60 },
            { name: 'fixedTimestep', type: 'boolean', description: 'Use fixed timestep', default: true },
        ],
    },
};

// ============================================================================
// std/Physics2D - Gravity and Velocity
// ============================================================================

/**
 * std/Physics2D - 2D physics with gravity, velocity, and friction.
 *
 * Applied to entities that need physics simulation.
 */
export const PHYSICS_2D_BEHAVIOR: StandardBehavior = {
    name: 'std/Physics2D',
    category: 'game-core',
    description: '2D physics with gravity, velocity, and friction',
    suggestedFor: [
        'Platformer characters',
        'Falling objects',
        'Projectiles',
        'Any entity affected by gravity',
    ],

    requiredFields: [
        { name: 'x', type: 'number', description: 'Entity X position' },
        { name: 'y', type: 'number', description: 'Entity Y position' },
    ],

    dataEntities: [
        {
            name: 'Physics2DState',
            runtime: true,
            fields: [
                { name: 'vx', type: 'number', default: 0 },
                { name: 'vy', type: 'number', default: 0 },
                { name: 'isGrounded', type: 'boolean', default: false },
            ],
        },
    ],

    stateMachine: {
        initial: 'Active',
        states: [
            { name: 'Active', isInitial: true },
            { name: 'Frozen' },
        ],
        events: [
            { key: 'INIT' },
            { key: 'APPLY_FORCE' },
            { key: 'GROUND_HIT' },
            { key: 'FREEZE' },
            { key: 'UNFREEZE' },
        ],
        transitions: [
            {
                from: '*',
                event: 'INIT',
                effects: [
                    ['set', '@entity.vx', 0],
                    ['set', '@entity.vy', 0],
                    ['set', '@entity.isGrounded', false],
                ],
            },
            {
                from: 'Active',
                event: 'APPLY_FORCE',
                effects: [
                    ['set', '@entity.vx', ['+', '@entity.vx', '@payload.fx']],
                    ['set', '@entity.vy', ['+', '@entity.vy', '@payload.fy']],
                ],
            },
            {
                from: 'Active',
                event: 'GROUND_HIT',
                effects: [
                    ['set', '@entity.isGrounded', true],
                    ['set', '@entity.vy', 0],
                    ['set', '@entity.vx', ['*', '@entity.vx', '@config.friction']],
                ],
            },
            {
                from: 'Active',
                to: 'Frozen',
                event: 'FREEZE',
                effects: [],
            },
            {
                from: 'Frozen',
                to: 'Active',
                event: 'UNFREEZE',
                effects: [],
            },
        ],
    },

    ticks: [
        {
            name: 'ApplyGravity',
            interval: 'frame',
            guard: ['and', ['=', '@state', 'Active'], ['not', '@entity.isGrounded']],
            effects: [
                ['set', '@entity.vy', ['math/min', '@config.maxVelocityY', ['+', '@entity.vy', '@config.gravity']]],
            ],
        },
        {
            name: 'ApplyVelocity',
            interval: 'frame',
            guard: ['=', '@state', 'Active'],
            effects: [
                ['set', '@entity.vx', ['*', '@entity.vx', '@config.airResistance']],
                ['set', '@entity.x', ['+', '@entity.x', '@entity.vx']],
                ['set', '@entity.y', ['+', '@entity.y', '@entity.vy']],
            ],
        },
    ],

    configSchema: {
        required: [],
        optional: [
            { name: 'gravity', type: 'number', description: 'Gravity acceleration (pixels/frame²)', default: 0.5 },
            { name: 'maxVelocityY', type: 'number', description: 'Terminal velocity', default: 15 },
            { name: 'friction', type: 'number', description: 'Ground friction (0-1)', default: 0.8 },
            { name: 'airResistance', type: 'number', description: 'Air resistance (0-1)', default: 0.99 },
        ],
    },
};

// ============================================================================
// std/Input - Unified Input State
// ============================================================================

/**
 * std/Input - Manages keyboard and touch input state.
 *
 * Singleton behavior that tracks all input state.
 */
export const INPUT_BEHAVIOR: StandardBehavior = {
    name: 'std/Input',
    category: 'game-core',
    description: 'Unified keyboard and touch input state management',
    suggestedFor: [
        'All interactive games',
        'Player controls',
        'Menu navigation',
    ],

    dataEntities: [
        {
            name: 'InputState',
            runtime: true,
            singleton: true,
            fields: [
                { name: 'left', type: 'boolean', default: false },
                { name: 'right', type: 'boolean', default: false },
                { name: 'up', type: 'boolean', default: false },
                { name: 'down', type: 'boolean', default: false },
                { name: 'jump', type: 'boolean', default: false },
                { name: 'action', type: 'boolean', default: false },
                { name: 'pause', type: 'boolean', default: false },
            ],
        },
    ],

    stateMachine: {
        initial: 'Ready',
        states: [
            { name: 'Ready', isInitial: true },
        ],
        events: [
            { key: 'KEY_DOWN' },
            { key: 'KEY_UP' },
            { key: 'TOUCH_START' },
            { key: 'TOUCH_END' },
            { key: 'RESET' },
        ],
        transitions: [
            {
                event: 'KEY_DOWN',
                effects: [
                    ['if', ['or', ['=', '@payload.key', 'ArrowLeft'], ['=', '@payload.key', 'a']],
                        ['set', '@entity.left', true]],
                    ['if', ['or', ['=', '@payload.key', 'ArrowRight'], ['=', '@payload.key', 'd']],
                        ['set', '@entity.right', true]],
                    ['if', ['or', ['=', '@payload.key', 'ArrowUp'], ['=', '@payload.key', 'w']],
                        ['set', '@entity.up', true]],
                    ['if', ['or', ['=', '@payload.key', 'ArrowDown'], ['=', '@payload.key', 's']],
                        ['set', '@entity.down', true]],
                    ['if', ['=', '@payload.key', ' '],
                        ['set', '@entity.jump', true]],
                    ['if', ['or', ['=', '@payload.key', 'Enter'], ['=', '@payload.key', 'e']],
                        ['set', '@entity.action', true]],
                    ['if', ['or', ['=', '@payload.key', 'Escape'], ['=', '@payload.key', 'p']],
                        ['set', '@entity.pause', true]],
                ],
            },
            {
                event: 'KEY_UP',
                effects: [
                    ['if', ['or', ['=', '@payload.key', 'ArrowLeft'], ['=', '@payload.key', 'a']],
                        ['set', '@entity.left', false]],
                    ['if', ['or', ['=', '@payload.key', 'ArrowRight'], ['=', '@payload.key', 'd']],
                        ['set', '@entity.right', false]],
                    ['if', ['or', ['=', '@payload.key', 'ArrowUp'], ['=', '@payload.key', 'w']],
                        ['set', '@entity.up', false]],
                    ['if', ['or', ['=', '@payload.key', 'ArrowDown'], ['=', '@payload.key', 's']],
                        ['set', '@entity.down', false]],
                    ['if', ['=', '@payload.key', ' '],
                        ['set', '@entity.jump', false]],
                    ['if', ['or', ['=', '@payload.key', 'Enter'], ['=', '@payload.key', 'e']],
                        ['set', '@entity.action', false]],
                    ['if', ['or', ['=', '@payload.key', 'Escape'], ['=', '@payload.key', 'p']],
                        ['set', '@entity.pause', false]],
                ],
            },
            {
                event: 'RESET',
                effects: [
                    ['set', '@entity.left', false],
                    ['set', '@entity.right', false],
                    ['set', '@entity.up', false],
                    ['set', '@entity.down', false],
                    ['set', '@entity.jump', false],
                    ['set', '@entity.action', false],
                    ['set', '@entity.pause', false],
                ],
            },
        ],
    },

    configSchema: {
        required: [],
        optional: [
            { name: 'keyMap', type: 'object', description: 'Key to action mapping', default: {} },
        ],
    },
};

// ============================================================================
// std/Collision - Collision Detection & Response
// ============================================================================

/**
 * std/Collision - Handles collision detection and response.
 *
 * Configures how an entity responds to collisions.
 */
export const COLLISION_BEHAVIOR: StandardBehavior = {
    name: 'std/Collision',
    category: 'game-core',
    description: 'Collision detection and response configuration',
    suggestedFor: [
        'Solid platforms',
        'Trigger zones',
        'Collectibles',
        'Hazards',
    ],

    dataEntities: [
        {
            name: 'CollisionState',
            runtime: true,
            fields: [
                { name: 'isColliding', type: 'boolean', default: false },
                { name: 'collidingWith', type: 'array', default: [] },
            ],
        },
    ],

    stateMachine: {
        initial: 'Active',
        states: [
            { name: 'Active', isInitial: true },
            { name: 'Disabled' },
        ],
        events: [
            { key: 'COLLISION' },
            { key: 'TRIGGER_ENTER' },
            { key: 'TRIGGER_EXIT' },
            { key: 'ENABLE' },
            { key: 'DISABLE' },
        ],
        transitions: [
            {
                from: 'Active',
                event: 'COLLISION',
                effects: [
                    ['set', '@entity.isColliding', true],
                    ['set', '@entity.collidingWith', ['array/append', '@entity.collidingWith', '@payload.entityId']],
                    ['if', '@config.onCollision',
                        ['emit', '@config.onCollision', { entityId: '@payload.entityId', side: '@payload.side' }]],
                ],
            },
            {
                from: 'Active',
                event: 'TRIGGER_ENTER',
                effects: [
                    ['if', '@config.onTrigger',
                        ['emit', '@config.onTrigger', { entityId: '@payload.entityId', action: 'enter' }]],
                ],
            },
            {
                from: 'Active',
                event: 'TRIGGER_EXIT',
                effects: [
                    ['set', '@entity.collidingWith', ['array/filter', '@entity.collidingWith', ['fn', 'id', ['!=', '@id', '@payload.entityId']]]],
                    ['if', ['=', ['array/len', '@entity.collidingWith'], 0],
                        ['set', '@entity.isColliding', false]],
                ],
            },
            {
                from: 'Active',
                to: 'Disabled',
                event: 'DISABLE',
                effects: [
                    ['set', '@entity.isColliding', false],
                    ['set', '@entity.collidingWith', []],
                ],
            },
            {
                from: 'Disabled',
                to: 'Active',
                event: 'ENABLE',
                effects: [],
            },
        ],
    },

    configSchema: {
        required: [],
        optional: [
            { name: 'type', type: 'string', description: 'Collision type', default: 'solid', enum: ['solid', 'trigger'] },
            { name: 'layer', type: 'string', description: 'Collision layer', default: 'default' },
            { name: 'collidesWith', type: 'array', description: 'Layers to collide with', default: ['default'] },
            { name: 'onCollision', type: 'event', description: 'Event to emit on collision' },
            { name: 'onTrigger', type: 'event', description: 'Event to emit on trigger' },
        ],
    },
};

// ============================================================================
// Export All Behaviors
// ============================================================================

export const GAME_CORE_BEHAVIORS: StandardBehavior[] = [
    GAME_LOOP_BEHAVIOR,
    PHYSICS_2D_BEHAVIOR,
    INPUT_BEHAVIOR,
    COLLISION_BEHAVIOR,
];
