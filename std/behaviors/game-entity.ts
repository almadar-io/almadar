/**
 * Game Entity Behaviors
 *
 * Entity state behaviors: health, score, movement, combat, inventory.
 * These use the Trait architecture with stateMachine and ticks.
 *
 * @packageDocumentation
 */

import type { StandardBehavior } from './types.js';

// ============================================================================
// std/Health - Entity Health System
// ============================================================================

/**
 * std/Health - Manages entity health with damage, healing, and death.
 *
 * States: Alive → Damaged → Dead
 */
export const HEALTH_BEHAVIOR: StandardBehavior = {
    name: 'std/Health',
    category: 'game-entity',
    description: 'Entity health with damage, healing, invulnerability, and death',
    suggestedFor: [
        'Player characters',
        'Enemies',
        'Destructible objects',
        'Bosses',
    ],

    dataEntities: [
        {
            name: 'HealthState',
            runtime: true,
            fields: [
                { name: 'currentHealth', type: 'number', default: 100 },
                { name: 'maxHealth', type: 'number', default: 100 },
                { name: 'isInvulnerable', type: 'boolean', default: false },
                { name: 'lastDamageTime', type: 'number', default: 0 },
            ],
        },
    ],

    stateMachine: {
        initial: 'Alive',
        states: [
            { name: 'Alive', isInitial: true },
            { name: 'Damaged' },
            { name: 'Invulnerable' },
            { name: 'Dead' },
        ],
        events: [
            { key: 'INIT' },
            { key: 'DAMAGE' },
            { key: 'HEAL' },
            { key: 'DIE' },
            { key: 'RESPAWN' },
            { key: 'INVULNERABILITY_END' },
        ],
        transitions: [
            {
                from: '*',
                to: 'Alive',
                event: 'INIT',
                effects: [
                    ['set', '@entity.currentHealth', '@config.maxHealth'],
                    ['set', '@entity.maxHealth', '@config.maxHealth'],
                    ['set', '@entity.isInvulnerable', false],
                    ['render', 'hud.health', 'health-bar', {
                        current: '@entity.currentHealth',
                        max: '@entity.maxHealth',
                    }],
                ],
            },
            {
                from: 'Alive',
                to: 'Damaged',
                event: 'DAMAGE',
                guard: ['not', '@entity.isInvulnerable'],
                effects: [
                    ['set', '@entity.currentHealth', ['math/max', 0, ['-', '@entity.currentHealth', '@payload.amount']]],
                    ['set', '@entity.lastDamageTime', '@now'],
                    ['if', ['<=', '@entity.currentHealth', 0],
                        ['emit', 'DIE'],
                        ['do',
                            ['set', '@entity.isInvulnerable', true],
                            ['render', 'entity.flash', 'damage-flash', {}]]],
                ],
            },
            {
                from: ['Damaged', 'Invulnerable'],
                to: 'Alive',
                event: 'INVULNERABILITY_END',
                effects: [
                    ['set', '@entity.isInvulnerable', false],
                ],
            },
            {
                from: ['Alive', 'Damaged', 'Invulnerable'],
                event: 'HEAL',
                effects: [
                    ['set', '@entity.currentHealth', ['math/min', '@entity.maxHealth', ['+', '@entity.currentHealth', '@payload.amount']]],
                    ['render', 'entity.effect', 'heal-effect', {}],
                ],
            },
            {
                from: ['Alive', 'Damaged', 'Invulnerable'],
                to: 'Dead',
                event: 'DIE',
                effects: [
                    ['set', '@entity.currentHealth', 0],
                    ['emit', '@config.onDeath', { entityId: '@entity.id' }],
                    ['render', 'entity.sprite', 'death-animation', {}],
                ],
            },
            {
                from: 'Dead',
                to: 'Alive',
                event: 'RESPAWN',
                effects: [
                    ['emit', 'INIT'],
                ],
            },
        ],
    },

    ticks: [
        {
            name: 'InvulnerabilityTimer',
            interval: 'frame',
            guard: ['and', '@entity.isInvulnerable', ['>', ['-', '@now', '@entity.lastDamageTime'], '@config.invulnerabilityTime']],
            effects: [
                ['emit', 'INVULNERABILITY_END'],
            ],
        },
    ],

    configSchema: {
        required: [
            { name: 'maxHealth', type: 'number', description: 'Maximum health points' },
        ],
        optional: [
            { name: 'invulnerabilityTime', type: 'number', description: 'Invulnerability duration after damage (ms)', default: 500 },
            { name: 'onDeath', type: 'event', description: 'Event to emit on death', default: 'ENTITY_DIED' },
            { name: 'showHealthBar', type: 'boolean', description: 'Render health bar', default: true },
        ],
    },
};

// ============================================================================
// std/Score - Points and Combo System
// ============================================================================

/**
 * std/Score - Manages score with points, combos, and multipliers.
 */
export const SCORE_BEHAVIOR: StandardBehavior = {
    name: 'std/Score',
    category: 'game-entity',
    description: 'Score tracking with points, combos, and multipliers',
    suggestedFor: [
        'Arcade games',
        'Puzzle games',
        'Platformers with collectibles',
        'Competitive games',
    ],

    dataEntities: [
        {
            name: 'ScoreState',
            runtime: true,
            singleton: true,
            fields: [
                { name: 'currentScore', type: 'number', default: 0 },
                { name: 'highScore', type: 'number', default: 0 },
                { name: 'comboCount', type: 'number', default: 0 },
                { name: 'multiplier', type: 'number', default: 1 },
                { name: 'lastScoreTime', type: 'number', default: 0 },
            ],
        },
    ],

    stateMachine: {
        initial: 'Active',
        states: [
            { name: 'Active', isInitial: true },
        ],
        events: [
            { key: 'INIT' },
            { key: 'ADD_POINTS' },
            { key: 'COMBO_HIT' },
            { key: 'COMBO_BREAK' },
            { key: 'RESET' },
            { key: 'SAVE_HIGH_SCORE' },
        ],
        transitions: [
            {
                from: '*',
                event: 'INIT',
                effects: [
                    ['set', '@entity.currentScore', 0],
                    ['set', '@entity.comboCount', 0],
                    ['set', '@entity.multiplier', 1],
                    ['render', 'hud.score', 'score-display', {
                        score: '@entity.currentScore',
                        highScore: '@entity.highScore',
                        combo: '@entity.comboCount',
                        multiplier: '@entity.multiplier',
                    }],
                ],
            },
            {
                event: 'ADD_POINTS',
                effects: [
                    ['set', '@entity.currentScore', ['+', '@entity.currentScore', ['*', '@payload.points', '@entity.multiplier']]],
                    ['set', '@entity.lastScoreTime', '@now'],
                    ['render', 'entity.effect', 'score-popup', {
                        points: ['*', '@payload.points', '@entity.multiplier'],
                        position: '@payload.position',
                    }],
                ],
            },
            {
                event: 'COMBO_HIT',
                effects: [
                    ['set', '@entity.comboCount', ['+', '@entity.comboCount', 1]],
                    ['set', '@entity.multiplier', ['math/min', '@config.maxMultiplier', ['+', 1, ['/', '@entity.comboCount', 5]]]],
                    ['set', '@entity.lastScoreTime', '@now'],
                ],
            },
            {
                event: 'COMBO_BREAK',
                effects: [
                    ['set', '@entity.comboCount', 0],
                    ['set', '@entity.multiplier', 1],
                ],
            },
            {
                event: 'RESET',
                effects: [
                    ['if', ['>', '@entity.currentScore', '@entity.highScore'],
                        ['set', '@entity.highScore', '@entity.currentScore']],
                    ['emit', 'INIT'],
                ],
            },
            {
                event: 'SAVE_HIGH_SCORE',
                guard: ['>', '@entity.currentScore', '@entity.highScore'],
                effects: [
                    ['set', '@entity.highScore', '@entity.currentScore'],
                    ['persist', 'save', 'HighScore', { score: '@entity.highScore' }],
                ],
            },
        ],
    },

    ticks: [
        {
            name: 'ComboTimeout',
            interval: 'frame',
            guard: ['and', ['>', '@entity.comboCount', 0], ['>', ['-', '@now', '@entity.lastScoreTime'], '@config.comboTimeWindow']],
            effects: [
                ['emit', 'COMBO_BREAK'],
            ],
        },
    ],

    configSchema: {
        required: [],
        optional: [
            { name: 'comboTimeWindow', type: 'number', description: 'Time window for combos (ms)', default: 2000 },
            { name: 'maxMultiplier', type: 'number', description: 'Maximum combo multiplier', default: 10 },
            { name: 'persistHighScore', type: 'boolean', description: 'Save high score to storage', default: true },
        ],
    },
};

// ============================================================================
// std/Movement - Entity Position and Velocity
// ============================================================================

/**
 * std/Movement - Basic movement for any entity.
 *
 * Handles position updates based on input or AI.
 */
export const MOVEMENT_BEHAVIOR: StandardBehavior = {
    name: 'std/Movement',
    category: 'game-entity',
    description: 'Entity movement with speed and direction',
    suggestedFor: [
        'Player characters',
        'NPCs',
        'Enemies',
        'Moving platforms',
    ],

    requiredFields: [
        { name: 'x', type: 'number', description: 'Entity X position' },
        { name: 'y', type: 'number', description: 'Entity Y position' },
    ],

    dataEntities: [
        {
            name: 'MovementState',
            runtime: true,
            fields: [
                { name: 'direction', type: 'number', default: 0 },
                { name: 'facingRight', type: 'boolean', default: true },
                { name: 'canJump', type: 'boolean', default: true },
            ],
        },
    ],

    stateMachine: {
        initial: 'Idle',
        states: [
            { name: 'Idle', isInitial: true },
            { name: 'Moving' },
            { name: 'Jumping' },
            { name: 'Falling' },
        ],
        events: [
            { key: 'MOVE' },
            { key: 'STOP' },
            { key: 'JUMP' },
            { key: 'LAND' },
        ],
        transitions: [
            {
                from: 'Idle',
                to: 'Moving',
                event: 'MOVE',
                effects: [
                    ['set', '@entity.direction', '@payload.direction'],
                    ['if', ['>', '@payload.direction', 0],
                        ['set', '@entity.facingRight', true]],
                    ['if', ['<', '@payload.direction', 0],
                        ['set', '@entity.facingRight', false]],
                ],
            },
            {
                from: 'Moving',
                event: 'MOVE',
                effects: [
                    ['set', '@entity.direction', '@payload.direction'],
                    ['if', ['>', '@payload.direction', 0],
                        ['set', '@entity.facingRight', true]],
                    ['if', ['<', '@payload.direction', 0],
                        ['set', '@entity.facingRight', false]],
                ],
            },
            {
                from: 'Moving',
                to: 'Idle',
                event: 'STOP',
                effects: [
                    ['set', '@entity.direction', 0],
                ],
            },
            {
                from: ['Idle', 'Moving'],
                to: 'Jumping',
                event: 'JUMP',
                guard: '@entity.canJump',
                effects: [
                    ['set', '@entity.canJump', false],
                    ['emit', 'APPLY_FORCE', { fx: 0, fy: '@config.jumpForce' }],
                ],
            },
            {
                from: ['Jumping', 'Falling'],
                to: 'Idle',
                event: 'LAND',
                effects: [
                    ['set', '@entity.canJump', true],
                    ['if', ['!=', '@entity.direction', 0],
                        ['emit', 'MOVE', { direction: '@entity.direction' }]],
                ],
            },
        ],
    },

    ticks: [
        {
            name: 'ApplyMovement',
            interval: 'frame',
            guard: ['!=', '@entity.direction', 0],
            effects: [
                ['set', '@entity.x', ['+', '@entity.x', ['*', '@entity.direction', '@config.moveSpeed']]],
            ],
        },
    ],

    configSchema: {
        required: [],
        optional: [
            { name: 'moveSpeed', type: 'number', description: 'Movement speed (pixels/frame)', default: 5 },
            { name: 'jumpForce', type: 'number', description: 'Jump velocity', default: -12 },
            { name: 'acceleration', type: 'number', description: 'Acceleration rate', default: 0.5 },
            { name: 'deceleration', type: 'number', description: 'Deceleration rate', default: 0.3 },
        ],
    },
};

// ============================================================================
// std/Combat - Attack and Damage System
// ============================================================================

/**
 * std/Combat - Handles attacks, cooldowns, and hit detection.
 */
export const COMBAT_BEHAVIOR: StandardBehavior = {
    name: 'std/Combat',
    category: 'game-entity',
    description: 'Combat system with attacks, cooldowns, and hitboxes',
    suggestedFor: [
        'Fighting games',
        'Action RPGs',
        'Beat-em-ups',
        'Boss encounters',
    ],

    dataEntities: [
        {
            name: 'CombatState',
            runtime: true,
            fields: [
                { name: 'isAttacking', type: 'boolean', default: false },
                { name: 'attackStartTime', type: 'number', default: 0 },
                { name: 'hitEntities', type: 'array', default: [] },
            ],
        },
    ],

    stateMachine: {
        initial: 'Ready',
        states: [
            { name: 'Ready', isInitial: true },
            { name: 'Attacking' },
            { name: 'Cooldown' },
        ],
        events: [
            { key: 'ATTACK' },
            { key: 'ATTACK_END' },
            { key: 'HIT_CONNECT' },
            { key: 'COOLDOWN_END' },
        ],
        transitions: [
            {
                from: 'Ready',
                to: 'Attacking',
                event: 'ATTACK',
                effects: [
                    ['set', '@entity.isAttacking', true],
                    ['set', '@entity.attackStartTime', '@now'],
                    ['set', '@entity.hitEntities', []],
                    ['render', 'entity.sprite', 'attack-animation', {}],
                    ['render', 'entity.hitbox', 'hitbox', {
                        active: true,
                        offset: '@config.hitboxOffset',
                        size: '@config.hitboxSize',
                    }],
                ],
            },
            {
                from: 'Attacking',
                event: 'HIT_CONNECT',
                guard: ['not', ['array/includes', '@entity.hitEntities', '@payload.entityId']],
                effects: [
                    ['set', '@entity.hitEntities', ['array/append', '@entity.hitEntities', '@payload.entityId']],
                    ['emit', 'DAMAGE', { target: '@payload.entityId', amount: '@config.attackDamage' }],
                    ['render', 'effect.impact', 'hit-effect', { position: '@payload.position' }],
                ],
            },
            {
                from: 'Attacking',
                to: 'Cooldown',
                event: 'ATTACK_END',
                effects: [
                    ['set', '@entity.isAttacking', false],
                    ['render', 'entity.hitbox', null],
                ],
            },
            {
                from: 'Cooldown',
                to: 'Ready',
                event: 'COOLDOWN_END',
                effects: [],
            },
        ],
    },

    ticks: [
        {
            name: 'AttackDuration',
            interval: 'frame',
            guard: ['and', '@entity.isAttacking', ['>', ['-', '@now', '@entity.attackStartTime'], '@config.attackDuration']],
            effects: [
                ['emit', 'ATTACK_END'],
            ],
        },
        {
            name: 'CooldownTimer',
            interval: 'frame',
            guard: ['and', ['=', '@state', 'Cooldown'], ['>', ['-', '@now', '@entity.attackStartTime'], ['+', '@config.attackDuration', '@config.cooldownDuration']]],
            effects: [
                ['emit', 'COOLDOWN_END'],
            ],
        },
    ],

    configSchema: {
        required: [],
        optional: [
            { name: 'attackDamage', type: 'number', description: 'Damage per attack', default: 10 },
            { name: 'attackDuration', type: 'number', description: 'Attack animation duration (ms)', default: 200 },
            { name: 'cooldownDuration', type: 'number', description: 'Cooldown between attacks (ms)', default: 300 },
            { name: 'hitboxOffset', type: 'object', description: 'Hitbox offset from entity', default: { x: 20, y: 0 } },
            { name: 'hitboxSize', type: 'object', description: 'Hitbox dimensions', default: { width: 30, height: 40 } },
        ],
    },
};

// ============================================================================
// std/Inventory - Item Collection and Management
// ============================================================================

/**
 * std/Inventory - Manages collected items and equipment.
 */
export const INVENTORY_BEHAVIOR: StandardBehavior = {
    name: 'std/Inventory',
    category: 'game-entity',
    description: 'Item collection, storage, and usage',
    suggestedFor: [
        'RPGs',
        'Adventure games',
        'Survival games',
        'Collectible-based games',
    ],

    dataEntities: [
        {
            name: 'InventoryState',
            runtime: true,
            fields: [
                { name: 'items', type: 'array', default: [] },
                { name: 'selectedSlot', type: 'number', default: 0 },
                { name: 'isOpen', type: 'boolean', default: false },
                { name: 'equipped', type: 'object', default: {} },
            ],
        },
    ],

    stateMachine: {
        initial: 'Empty',
        states: [
            { name: 'Empty', isInitial: true },
            { name: 'HasItems' },
            { name: 'Full' },
        ],
        events: [
            { key: 'COLLECT' },
            { key: 'USE' },
            { key: 'DROP' },
            { key: 'EQUIP' },
            { key: 'UNEQUIP' },
            { key: 'OPEN' },
            { key: 'CLOSE' },
            { key: 'INVENTORY_EMPTY' },
        ],
        transitions: [
            {
                from: ['Empty', 'HasItems'],
                to: 'HasItems',
                event: 'COLLECT',
                guard: ['<', ['array/len', '@entity.items'], '@config.maxSlots'],
                effects: [
                    ['set', '@entity.items', ['array/append', '@entity.items', '@payload.item']],
                    ['render', 'effect.collect', 'collect-effect', { item: '@payload.item' }],
                    ['notify', { type: 'info', message: ['str/concat', 'Collected ', '@payload.item.name'] }],
                ],
            },
            {
                from: 'HasItems',
                event: 'USE',
                effects: [
                    ['let', [['item', ['array/nth', '@entity.items', '@payload.slot']]],
                        ['if', '@item.onUse',
                            ['emit', '@item.onUse', { item: '@item' }]],
                        ['if', '@item.consumable',
                            ['set', '@entity.items', ['array/filter', '@entity.items', ['fn', 'i', 'idx', ['!=', '@idx', '@payload.slot']]]]]],
                    ['if', ['=', ['array/len', '@entity.items'], 0],
                        ['emit', 'INVENTORY_EMPTY']],
                ],
            },
            {
                from: 'HasItems',
                event: 'DROP',
                effects: [
                    ['let', [['item', ['array/nth', '@entity.items', '@payload.slot']]],
                        ['set', '@entity.items', ['array/filter', '@entity.items', ['fn', 'i', 'idx', ['!=', '@idx', '@payload.slot']]]],
                        ['emit', 'ITEM_DROPPED', { item: '@item', position: { x: '@entity.x', y: '@entity.y' } }]],
                    ['if', ['=', ['array/len', '@entity.items'], 0],
                        ['emit', 'INVENTORY_EMPTY']],
                ],
            },
            {
                from: 'HasItems',
                to: 'Empty',
                event: 'INVENTORY_EMPTY',
                effects: [],
            },
            {
                event: 'EQUIP',
                effects: [
                    ['set', '@entity.equipped', ['object/set', '@entity.equipped', '@payload.slot', '@payload.item']],
                    ['emit', 'STATS_UPDATED', { equipped: '@entity.equipped' }],
                ],
            },
            {
                event: 'UNEQUIP',
                effects: [
                    ['set', '@entity.equipped', ['object/remove', '@entity.equipped', '@payload.slot']],
                    ['emit', 'STATS_UPDATED', { equipped: '@entity.equipped' }],
                ],
            },
            {
                event: 'OPEN',
                effects: [
                    ['set', '@entity.isOpen', true],
                    ['render', 'overlay.inventory', 'inventory-panel', {
                        items: '@entity.items',
                        selectedSlot: '@entity.selectedSlot',
                        equipped: '@entity.equipped',
                        maxSlots: '@config.maxSlots',
                        onUse: 'USE',
                        onDrop: 'DROP',
                        onEquip: 'EQUIP',
                        onClose: 'CLOSE',
                    }],
                ],
            },
            {
                event: 'CLOSE',
                effects: [
                    ['set', '@entity.isOpen', false],
                    ['render', 'overlay.inventory', null],
                ],
            },
        ],
    },

    configSchema: {
        required: [],
        optional: [
            { name: 'maxSlots', type: 'number', description: 'Maximum inventory slots', default: 20 },
            { name: 'stackable', type: 'boolean', description: 'Allow item stacking', default: true },
            { name: 'maxStack', type: 'number', description: 'Maximum stack size', default: 99 },
        ],
    },
};

// ============================================================================
// Export All Behaviors
// ============================================================================

export const GAME_ENTITY_BEHAVIORS: StandardBehavior[] = [
    HEALTH_BEHAVIOR,
    SCORE_BEHAVIOR,
    MOVEMENT_BEHAVIOR,
    COMBAT_BEHAVIOR,
    INVENTORY_BEHAVIOR,
];
