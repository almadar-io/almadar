import type { Meta, StoryObj } from '@storybook/react';
import { StoryGameView } from './StoryGameView';
import type { BattleEntity, WorldMapEntity, EventHandlerPuzzleEntity, StateArchitectPuzzleEntity } from '@almadar/ui';
import type { PhysicsLabConfig } from './StoryGameView';

const meta: Meta<typeof StoryGameView> = {
  title: 'KFlow/Molecules/Story/StoryGameView',
  component: StoryGameView,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StoryGameView>;

/* ── Sequencer (existing) ──────────────────────────────────── */

export const Sequencer: Story = {
  args: {
    gameType: 'sequencer',
    gameConfig: {
      id: 'mars-fix',
      title: 'Fix the Trajectory',
      description: 'Arrange the steps in the correct order to fix the unit conversion error.',
      availableActions: [
        { id: 'identify', name: 'Identify Mismatch', category: 'analysis', iconEmoji: '\uD83D\uDD0D', description: 'Identify the unit mismatch (lbf\u00B7s vs N\u00B7s)' },
        { id: 'convert', name: 'Convert to SI', category: 'conversion', iconEmoji: '\uD83D\uDD04', description: 'Convert all values to SI (newton-seconds)' },
        { id: 'recalculate', name: 'Recalculate', category: 'compute', iconEmoji: '\uD83E\uDDEE', description: 'Recalculate the trajectory correction' },
        { id: 'verify', name: 'Verify Altitude', category: 'validation', iconEmoji: '\u2705', description: 'Verify orbit insertion altitude (226 km)' },
      ],
      maxSlots: 4,
      allowDuplicates: false,
      solutions: [['identify', 'convert', 'recalculate', 'verify']],
      successMessage: 'Mission saved! The orbiter enters a stable orbit at 226 km.',
      failMessage: 'The trajectory is still off. Try a different order.',
      hint: 'First find the problem, then fix the units before recalculating.',
    },
  },
};

/* ── Event Handler ─────────────────────────────────────────── */

const thermostatPuzzle: EventHandlerPuzzleEntity = {
  id: 'thermostat-puzzle',
  title: 'Wire the Smart Thermostat',
  description: 'Define event-action rules so the thermostat keeps the room at 21\u00B0C. When temperature drops below 19\u00B0C, turn on the heater. When it rises above 23\u00B0C, turn on the fan.',
  objects: [
    { id: 'thermometer', name: 'Thermometer', icon: '🌡️', states: ['COLD', 'WARM', 'HOT'], initialState: 'COLD', currentState: 'COLD', availableEvents: [{ value: 'TEMP_CHANGED', label: 'Temp Changed' }], availableActions: [], rules: [] },
    { id: 'heater', name: 'Heater', icon: '🔥', states: ['OFF', 'ON'], initialState: 'OFF', currentState: 'OFF', availableEvents: [{ value: 'TURN_ON', label: 'Turn On' }, { value: 'TURN_OFF', label: 'Turn Off' }], availableActions: [{ value: 'TURN_ON', label: 'Turn On' }, { value: 'TURN_OFF', label: 'Turn Off' }], rules: [] },
    { id: 'fan', name: 'Fan', icon: '💨', states: ['OFF', 'ON'], initialState: 'OFF', currentState: 'OFF', availableEvents: [{ value: 'TURN_ON', label: 'Turn On' }, { value: 'TURN_OFF', label: 'Turn Off' }], availableActions: [{ value: 'TURN_ON', label: 'Turn On' }, { value: 'TURN_OFF', label: 'Turn Off' }], rules: [] },
  ],
  goalCondition: 'temperature === 21',
  goalEvent: 'TEMP_STABLE',
  triggerEvents: ['TEMP_CHANGED'],
  successMessage: 'The thermostat keeps the room at a comfortable 21\u00B0C!',
  failMessage: 'The temperature is not stabilizing. Check your event\u2192action rules.',
  hint: 'Heater ON when temp < 19. Fan ON when temp > 23. Both OFF when 19\u201323.',
};

export const EventHandler: Story = {
  args: {
    gameType: 'event-handler',
    gameConfig: thermostatPuzzle,
  },
};

/* ── State Architect ───────────────────────────────────────── */

const trafficLightPuzzle: StateArchitectPuzzleEntity = {
  id: 'traffic-light-fsm',
  title: 'Design a Traffic Light',
  description: 'Create the state machine for a traffic light. It cycles GREEN \u2192 YELLOW \u2192 RED \u2192 GREEN on timer events, and must handle an EMERGENCY event that forces RED from any state.',
  hint: 'GREEN transitions to YELLOW on TIMER. YELLOW to RED. RED back to GREEN. EMERGENCY always goes to RED.',
  entityName: 'TrafficLight',
  variables: [
    { name: 'timer', value: 0 },
  ],
  states: ['GREEN', 'YELLOW', 'RED'],
  initialState: 'GREEN',
  transitions: [
    { id: 't1', from: 'GREEN', to: 'YELLOW', event: 'TIMER' },
    { id: 't2', from: 'YELLOW', to: 'RED', event: 'TIMER' },
    { id: 't3', from: 'RED', to: 'GREEN', event: 'TIMER' },
    { id: 't4', from: 'GREEN', to: 'RED', event: 'EMERGENCY' },
    { id: 't5', from: 'YELLOW', to: 'RED', event: 'EMERGENCY' },
  ],
  availableEvents: ['TIMER', 'EMERGENCY'],
  availableStates: ['GREEN', 'YELLOW', 'RED'],
  testCases: [
    { events: ['TIMER'], expectedState: 'YELLOW', label: 'One tick' },
    { events: ['TIMER', 'TIMER'], expectedState: 'RED', label: 'Two ticks' },
    { events: ['TIMER', 'TIMER', 'TIMER'], expectedState: 'GREEN', label: 'Full cycle' },
    { events: ['EMERGENCY'], expectedState: 'RED', label: 'Emergency from green' },
    { events: ['TIMER', 'EMERGENCY'], expectedState: 'RED', label: 'Emergency from yellow' },
  ],
  successMessage: 'All test cases pass! Your traffic light handles normal cycles and emergencies.',
  failMessage: 'Some transitions are missing. Remember: EMERGENCY from any state \u2192 RED.',
};

export const StateArchitect: Story = {
  args: {
    gameType: 'state-architect',
    gameConfig: trafficLightPuzzle,
  },
};

/* ── Battle ────────────────────────────────────────────────── */

const battleEntity: BattleEntity = {
  id: 'thermopylae',
  tiles: Array.from({ length: 64 }, (_, i) => ({
    x: i % 8,
    y: Math.floor(i / 8),
    terrain: i % 8 >= 3 && i % 8 <= 4 ? 'stone' : 'grass',
  })),
  units: [
    {
      id: 'leonidas',
      name: 'Leonidas',
      team: 'player',
      position: { x: 3, y: 6 },
      health: 100,
      maxHealth: 100,
      movement: 2,
      attack: 30,
      defense: 25,
      traits: [{ name: 'Phalanx', currentState: 'ready', states: ['ready', 'active', 'cooldown'] }],
    },
    {
      id: 'hoplite-1',
      name: 'Hoplite',
      team: 'player',
      position: { x: 4, y: 6 },
      health: 80,
      maxHealth: 80,
      movement: 3,
      attack: 20,
      defense: 20,
    },
    {
      id: 'persian-1',
      name: 'Immortal',
      team: 'enemy',
      position: { x: 3, y: 1 },
      health: 60,
      maxHealth: 60,
      movement: 3,
      attack: 25,
      defense: 10,
    },
    {
      id: 'persian-2',
      name: 'Archer',
      team: 'enemy',
      position: { x: 5, y: 0 },
      health: 40,
      maxHealth: 40,
      movement: 2,
      attack: 30,
      defense: 5,
    },
  ],
  phase: 'selection',
  turn: 1,
  gameResult: null,
  selectedUnitId: null,
};

export const Battle: Story = {
  args: {
    gameType: 'battle',
    gameConfig: battleEntity,
  },
  parameters: { layout: 'fullscreen' },
};

/* ── Adventure ─────────────────────────────────────────────── */

const adventureEntity: WorldMapEntity = {
  id: 'silk-road',
  hexes: [
    // 5x5 hex grid: merchant must navigate from (0,0) to (4,4)
    { x: 0, y: 0, terrain: 'city', passable: true, feature: 'start' },
    { x: 1, y: 0, terrain: 'plains', passable: true },
    { x: 2, y: 0, terrain: 'desert', passable: true },
    { x: 3, y: 0, terrain: 'mountains', passable: false },
    { x: 4, y: 0, terrain: 'mountains', passable: false },

    { x: 0, y: 1, terrain: 'plains', passable: true },
    { x: 1, y: 1, terrain: 'forest', passable: true },
    { x: 2, y: 1, terrain: 'desert', passable: true },
    { x: 3, y: 1, terrain: 'desert', passable: true },
    { x: 4, y: 1, terrain: 'mountains', passable: false },

    { x: 0, y: 2, terrain: 'forest', passable: true },
    { x: 1, y: 2, terrain: 'forest', passable: false, feature: 'bandit-camp' },
    { x: 2, y: 2, terrain: 'oasis', passable: true, feature: 'oasis' },
    { x: 3, y: 2, terrain: 'desert', passable: true },
    { x: 4, y: 2, terrain: 'plains', passable: true },

    { x: 0, y: 3, terrain: 'plains', passable: true },
    { x: 1, y: 3, terrain: 'plains', passable: true },
    { x: 2, y: 3, terrain: 'desert', passable: true },
    { x: 3, y: 3, terrain: 'plains', passable: true },
    { x: 4, y: 3, terrain: 'forest', passable: true },

    { x: 0, y: 4, terrain: 'mountains', passable: false },
    { x: 1, y: 4, terrain: 'plains', passable: true },
    { x: 2, y: 4, terrain: 'plains', passable: true },
    { x: 3, y: 4, terrain: 'plains', passable: true },
    { x: 4, y: 4, terrain: 'city', passable: true, feature: 'goal' },
  ],
  heroes: [
    {
      id: 'merchant',
      name: 'Marco',
      owner: 'player',
      position: { x: 0, y: 0 },
      movement: 2,
      level: 1,
    },
  ],
  selectedHeroId: 'merchant',
};

export const Adventure: Story = {
  args: {
    gameType: 'adventure',
    gameConfig: adventureEntity,
  },
  parameters: { layout: 'fullscreen' },
};

/* ── Physics Lab ───────────────────────────────────────────── */

const physicsLabConfig: PhysicsLabConfig = {
  preset: {
    id: 'projectile-challenge',
    name: 'Hit the Target',
    description: 'Adjust launch angle and velocity to land the ball on the target platform.',
    domain: 'natural',
    gravity: { x: 0, y: 9.81 },
    bodies: [
      { id: 'ball', x: 50, y: 350, vx: 80, vy: -120, mass: 1, radius: 10, color: '#e94560', fixed: false },
      { id: 'ground', x: 300, y: 390, vx: 0, vy: 0, mass: 1000, radius: 400, color: '#333', fixed: true },
    ],
    showVelocity: true,
    parameters: {
      angle: { value: 45, min: 0, max: 90, step: 1, label: 'Launch angle (deg)' },
      velocity: { value: 100, min: 10, max: 200, step: 5, label: 'Initial velocity (m/s)' },
    },
  },
  targetLabel: 'Range',
  targetValue: 250,
  tolerance: 20,
  measurementLabel: 'Horizontal range',
  measurementUnit: 'm',
};

export const PhysicsLab: Story = {
  args: {
    gameType: 'physics-lab',
    gameConfig: physicsLabConfig,
  },
  parameters: { layout: 'fullscreen' },
};

/* ── Fallback (unknown type) ───────────────────────────────── */

export const UnsupportedType: Story = {
  args: {
    gameType: 'mystery-box',
    gameConfig: {
      id: 'placeholder',
      title: 'Mystery',
      description: 'Unknown game type fallback',
      availableActions: [],
      maxSlots: 0,
      solutions: [],
    },
  },
};
