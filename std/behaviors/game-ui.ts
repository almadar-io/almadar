/**
 * Game UI Behaviors
 *
 * Game interface behaviors: flow, dialogue, level progression.
 * These use the Trait architecture with stateMachine and ticks.
 *
 * @packageDocumentation
 */

import type { StandardBehavior } from './types.js';

// ============================================================================
// std/GameFlow - Game State Machine
// ============================================================================

/**
 * std/GameFlow - Master game state management.
 *
 * States: Menu → Playing → Paused → GameOver/Victory
 */
export const GAME_FLOW_BEHAVIOR: StandardBehavior = {
    name: 'std/GameFlow',
    category: 'game-ui',
    description: 'Master game flow: menu, play, pause, game over, victory',
    suggestedFor: [
        'All games',
        'Game state management',
        'Menu systems',
        'Win/lose conditions',
    ],

    dataEntities: [
        {
            name: 'GameFlowState',
            runtime: true,
            singleton: true,
            fields: [
                { name: 'playTime', type: 'number', default: 0 },
                { name: 'attempts', type: 'number', default: 0 },
                { name: 'lastState', type: 'string', default: 'Menu' },
            ],
        },
    ],

    stateMachine: {
        initial: 'Menu',
        states: [
            { name: 'Menu', isInitial: true },
            { name: 'Playing' },
            { name: 'Paused' },
            { name: 'GameOver' },
            { name: 'Victory' },
        ],
        events: [
            { key: 'START' },
            { key: 'PAUSE' },
            { key: 'RESUME' },
            { key: 'GAME_OVER' },
            { key: 'VICTORY' },
            { key: 'RESTART' },
            { key: 'QUIT' },
        ],
        transitions: [
            {
                from: '*',
                to: 'Menu',
                event: 'QUIT',
                effects: [
                    ['emit', 'STOP'],
                    ['render', 'screen', 'game-menu', {
                        title: '@config.title',
                        onStart: 'START',
                    }],
                ],
            },
            {
                from: 'Menu',
                to: 'Playing',
                event: 'START',
                effects: [
                    ['set', '@entity.attempts', ['+', '@entity.attempts', 1]],
                    ['set', '@entity.playTime', 0],
                    ['emit', 'GAME_LOOP_START'],
                    ['render', 'screen', null],
                    ['render', 'canvas', 'game-canvas', {}],
                ],
            },
            {
                from: 'Playing',
                to: 'Paused',
                event: 'PAUSE',
                guard: '@config.allowPause',
                effects: [
                    ['set', '@entity.lastState', 'Playing'],
                    ['emit', 'GAME_LOOP_PAUSE'],
                    ['render', 'overlay', 'game-pause-overlay', {
                        onResume: 'RESUME',
                        onQuit: 'QUIT',
                        playTime: '@entity.playTime',
                    }],
                ],
            },
            {
                from: 'Paused',
                to: 'Playing',
                event: 'RESUME',
                effects: [
                    ['emit', 'GAME_LOOP_RESUME'],
                    ['render', 'overlay', null],
                ],
            },
            {
                from: 'Playing',
                to: 'GameOver',
                event: 'GAME_OVER',
                effects: [
                    ['emit', 'STOP'],
                    ['render', 'overlay', 'game-over-screen', {
                        victory: false,
                        playTime: '@entity.playTime',
                        attempts: '@entity.attempts',
                        onRestart: 'RESTART',
                        onQuit: 'QUIT',
                    }],
                ],
            },
            {
                from: 'Playing',
                to: 'Victory',
                event: 'VICTORY',
                effects: [
                    ['emit', 'STOP'],
                    ['render', 'overlay', 'game-over-screen', {
                        victory: true,
                        playTime: '@entity.playTime',
                        attempts: '@entity.attempts',
                        onRestart: 'RESTART',
                        onQuit: 'QUIT',
                    }],
                ],
            },
            {
                from: ['GameOver', 'Victory'],
                to: 'Playing',
                event: 'RESTART',
                effects: [
                    ['render', 'overlay', null],
                    ['emit', 'GAME_RESET'],
                    ['emit', 'START'],
                ],
            },
        ],
    },

    configSchema: {
        required: [],
        optional: [
            { name: 'title', type: 'string', description: 'Game title', default: 'Game' },
            { name: 'showMenu', type: 'boolean', description: 'Show main menu', default: true },
            { name: 'allowPause', type: 'boolean', description: 'Allow pausing', default: true },
        ],
    },
};

// ============================================================================
// std/Dialogue - NPC Conversation System
// ============================================================================

/**
 * std/Dialogue - Manages NPC dialogue and branching conversations.
 */
export const DIALOGUE_BEHAVIOR: StandardBehavior = {
    name: 'std/Dialogue',
    category: 'game-ui',
    description: 'NPC dialogue system with branching conversations',
    suggestedFor: [
        'RPGs',
        'Adventure games',
        'Story-driven games',
        'NPC interactions',
    ],

    dataEntities: [
        {
            name: 'DialogueState',
            runtime: true,
            fields: [
                { name: 'dialogueTree', type: 'array', default: [] },
                { name: 'currentNode', type: 'number', default: 0 },
                { name: 'displayedText', type: 'string', default: '' },
                { name: 'isTyping', type: 'boolean', default: false },
                { name: 'speaker', type: 'string', default: '' },
                { name: 'typeIndex', type: 'number', default: 0 },
                { name: 'lastTypeTime', type: 'number', default: 0 },
            ],
        },
    ],

    stateMachine: {
        initial: 'Hidden',
        states: [
            { name: 'Hidden', isInitial: true },
            { name: 'Typing' },
            { name: 'Showing' },
            { name: 'Choice' },
        ],
        events: [
            { key: 'SHOW' },
            { key: 'NEXT' },
            { key: 'SELECT_CHOICE' },
            { key: 'SKIP' },
            { key: 'CLOSE' },
            { key: 'TYPE_CHAR' },
            { key: 'TYPE_COMPLETE' },
        ],
        transitions: [
            {
                from: 'Hidden',
                to: 'Typing',
                event: 'SHOW',
                effects: [
                    ['set', '@entity.dialogueTree', '@payload.dialogue'],
                    ['set', '@entity.currentNode', 0],
                    ['set', '@entity.isTyping', true],
                    ['set', '@entity.displayedText', ''],
                    ['set', '@entity.typeIndex', 0],
                    ['set', '@entity.lastTypeTime', '@now'],
                    ['emit', 'GAME_PAUSE'],
                    ['render', 'overlay.dialogue', 'dialogue-box', {
                        speaker: '@entity.speaker',
                        text: '@entity.displayedText',
                        isTyping: '@entity.isTyping',
                        onNext: 'NEXT',
                        onSkip: 'SKIP',
                    }],
                ],
            },
            {
                from: 'Typing',
                event: 'TYPE_CHAR',
                effects: [
                    ['let', [['currentDialogue', ['array/nth', '@entity.dialogueTree', '@entity.currentNode']]],
                        ['do',
                            ['set', '@entity.typeIndex', ['+', '@entity.typeIndex', 1]],
                            ['set', '@entity.displayedText', ['str/slice', '@currentDialogue.text', 0, '@entity.typeIndex']],
                            ['set', '@entity.lastTypeTime', '@now']]],
                ],
            },
            {
                from: 'Typing',
                to: 'Showing',
                event: 'TYPE_COMPLETE',
                effects: [
                    ['set', '@entity.isTyping', false],
                ],
            },
            {
                from: 'Typing',
                to: 'Showing',
                event: 'SKIP',
                effects: [
                    ['let', [['currentDialogue', ['array/nth', '@entity.dialogueTree', '@entity.currentNode']]],
                        ['do',
                            ['set', '@entity.isTyping', false],
                            ['set', '@entity.displayedText', '@currentDialogue.text']]],
                ],
            },
            {
                from: 'Showing',
                event: 'NEXT',
                guard: ['not', ['object/get', ['array/nth', '@entity.dialogueTree', '@entity.currentNode'], 'choices']],
                effects: [
                    ['if', ['>=', '@entity.currentNode', ['-', ['array/len', '@entity.dialogueTree'], 1]],
                        ['emit', 'CLOSE'],
                        ['do',
                            ['set', '@entity.currentNode', ['+', '@entity.currentNode', 1]],
                            ['set', '@entity.isTyping', true],
                            ['set', '@entity.displayedText', ''],
                            ['set', '@entity.typeIndex', 0]]],
                ],
            },
            {
                from: 'Showing',
                to: 'Choice',
                event: 'NEXT',
                guard: ['object/get', ['array/nth', '@entity.dialogueTree', '@entity.currentNode'], 'choices'],
                effects: [
                    ['let', [['currentDialogue', ['array/nth', '@entity.dialogueTree', '@entity.currentNode']]],
                        ['render', 'overlay.dialogue', 'dialogue-box', {
                            choices: '@currentDialogue.choices',
                            onSelect: 'SELECT_CHOICE',
                        }]],
                ],
            },
            {
                from: 'Choice',
                to: 'Typing',
                event: 'SELECT_CHOICE',
                effects: [
                    ['let', [['currentDialogue', ['array/nth', '@entity.dialogueTree', '@entity.currentNode']]],
                        ['let', [['choice', ['array/nth', '@currentDialogue.choices', '@payload.index']]],
                            ['do',
                                ['if', '@choice.nextNode',
                                    ['set', '@entity.currentNode', '@choice.nextNode'],
                                    ['set', '@entity.currentNode', ['+', '@entity.currentNode', 1]]],
                                ['if', '@choice.effect',
                                    ['emit', '@choice.effect']]]]],
                    ['set', '@entity.isTyping', true],
                    ['set', '@entity.displayedText', ''],
                    ['set', '@entity.typeIndex', 0],
                ],
            },
            {
                from: ['Typing', 'Showing', 'Choice'],
                to: 'Hidden',
                event: 'CLOSE',
                effects: [
                    ['set', '@entity.dialogueTree', []],
                    ['set', '@entity.currentNode', 0],
                    ['emit', 'GAME_RESUME'],
                    ['render', 'overlay.dialogue', null],
                ],
            },
        ],
    },

    ticks: [
        {
            name: 'TypewriterEffect',
            interval: 'frame',
            guard: ['and', '@entity.isTyping', ['>', ['-', '@now', '@entity.lastTypeTime'], ['/', 1000, '@config.typingSpeed']]],
            effects: [
                ['let', [['currentDialogue', ['array/nth', '@entity.dialogueTree', '@entity.currentNode']]],
                    ['if', ['<', '@entity.typeIndex', ['str/len', '@currentDialogue.text']],
                        ['emit', 'TYPE_CHAR'],
                        ['emit', 'TYPE_COMPLETE']]],
            ],
        },
    ],

    configSchema: {
        required: [],
        optional: [
            { name: 'typingSpeed', type: 'number', description: 'Characters per second', default: 30 },
            { name: 'autoAdvance', type: 'boolean', description: 'Auto-advance after typing', default: false },
            { name: 'autoAdvanceDelay', type: 'number', description: 'Delay before auto-advance (ms)', default: 2000 },
            { name: 'showPortrait', type: 'boolean', description: 'Show speaker portrait', default: true },
        ],
    },
};

// ============================================================================
// std/LevelProgress - Level Unlock and Progression
// ============================================================================

/**
 * std/LevelProgress - Manages level unlock, selection, and completion.
 */
export const LEVEL_PROGRESS_BEHAVIOR: StandardBehavior = {
    name: 'std/LevelProgress',
    category: 'game-ui',
    description: 'Level progression with unlock, selection, and completion tracking',
    suggestedFor: [
        'Level-based games',
        'Puzzle games',
        'Platformers with levels',
        'Mobile games',
    ],

    dataEntities: [
        {
            name: 'LevelProgressState',
            runtime: true,
            singleton: true,
            fields: [
                { name: 'currentLevel', type: 'number', default: 0 },
                { name: 'unlockedLevels', type: 'array', default: [0] },
                { name: 'levelStars', type: 'object', default: {} },
                { name: 'totalStars', type: 'number', default: 0 },
            ],
        },
    ],

    stateMachine: {
        initial: 'Browsing',
        states: [
            { name: 'Browsing', isInitial: true },
            { name: 'LevelLoading' },
            { name: 'InLevel' },
        ],
        events: [
            { key: 'INIT' },
            { key: 'SELECT_LEVEL' },
            { key: 'LEVEL_LOADED' },
            { key: 'COMPLETE_LEVEL' },
            { key: 'UNLOCK_LEVEL' },
            { key: 'BACK_TO_SELECT' },
        ],
        transitions: [
            {
                from: '*',
                to: 'Browsing',
                event: 'INIT',
                effects: [
                    ['render', 'screen', 'level-select', {
                        levels: '@config.levels',
                        unlockedLevels: '@entity.unlockedLevels',
                        levelStars: '@entity.levelStars',
                        starsPerLevel: '@config.starsPerLevel',
                        totalStars: '@entity.totalStars',
                        onSelect: 'SELECT_LEVEL',
                    }],
                ],
            },
            {
                from: 'Browsing',
                to: 'LevelLoading',
                event: 'SELECT_LEVEL',
                guard: ['array/includes', '@entity.unlockedLevels', '@payload.levelIndex'],
                effects: [
                    ['set', '@entity.currentLevel', '@payload.levelIndex'],
                    ['render', 'screen', 'loading-screen', {
                        level: ['array/nth', '@config.levels', '@payload.levelIndex'],
                    }],
                    ['emit', 'LOAD_LEVEL', { levelData: ['array/nth', '@config.levels', '@payload.levelIndex'] }],
                ],
            },
            {
                from: 'LevelLoading',
                to: 'InLevel',
                event: 'LEVEL_LOADED',
                effects: [
                    ['render', 'screen', null],
                    ['emit', 'START'],
                ],
            },
            {
                from: 'InLevel',
                event: 'COMPLETE_LEVEL',
                effects: [
                    ['set', '@entity.levelStars', ['object/set', '@entity.levelStars', ['str/toString', '@entity.currentLevel'],
                        ['math/max', '@payload.stars', ['object/get', '@entity.levelStars', ['str/toString', '@entity.currentLevel'], 0]]]],
                    ['set', '@entity.totalStars', ['array/reduce', ['object/values', '@entity.levelStars'], ['fn', 'sum', 'v', ['+', '@sum', '@v']], 0]],
                    ['if', ['and', '@config.unlockNext', ['<', '@entity.currentLevel', ['-', ['array/len', '@config.levels'], 1]]],
                        ['emit', 'UNLOCK_LEVEL', { levelIndex: ['+', '@entity.currentLevel', 1] }]],
                    ['if', '@config.persistProgress',
                        ['persist', 'save', 'LevelProgress', {
                            unlockedLevels: '@entity.unlockedLevels',
                            levelStars: '@entity.levelStars',
                        }]],
                ],
            },
            {
                event: 'UNLOCK_LEVEL',
                guard: ['not', ['array/includes', '@entity.unlockedLevels', '@payload.levelIndex']],
                effects: [
                    ['set', '@entity.unlockedLevels', ['array/append', '@entity.unlockedLevels', '@payload.levelIndex']],
                ],
            },
            {
                from: 'InLevel',
                to: 'Browsing',
                event: 'BACK_TO_SELECT',
                effects: [
                    ['emit', 'INIT'],
                ],
            },
        ],
    },

    configSchema: {
        required: [
            { name: 'levels', type: 'array', description: 'Level definitions' },
        ],
        optional: [
            { name: 'starsPerLevel', type: 'number', description: 'Max stars per level', default: 3 },
            { name: 'unlockNext', type: 'boolean', description: 'Auto-unlock next level on complete', default: true },
            { name: 'persistProgress', type: 'boolean', description: 'Save progress to storage', default: true },
        ],
    },
};

// ============================================================================
// Export All Behaviors
// ============================================================================

export const GAME_UI_BEHAVIORS: StandardBehavior[] = [
    GAME_FLOW_BEHAVIOR,
    DIALOGUE_BEHAVIOR,
    LEVEL_PROGRESS_BEHAVIOR,
];
