import type { Meta, StoryObj } from '@storybook/react';
import { KnowledgeStoryTemplate } from '../../../../KnowledgeStoryTemplate';
import type { KnowledgeStoryEntity } from '../../../../KnowledgeStoryTemplate';
import type { StateArchitectPuzzleEntity } from '@almadar/ui';

const storyEntity: KnowledgeStoryEntity = {
  id: 'traffic-light',
  title: 'The Traffic Light',
  teaser: 'Why do traffic lights need exactly three states?',
  domain: 'formal',
  difficulty: 'beginner',
  duration: 10,
  hookQuestion: 'Why do traffic lights need exactly three states?',
  hookNarrative: "Every intersection in the world uses the same three colors: green, yellow, red. Not two. Not four. Three. This isn't arbitrary — it's the minimum number of states needed to prevent collisions while keeping traffic flowing. The traffic light is a **finite state machine**, and understanding state machines is the key to understanding every computer program ever written.",
  scenes: [
    { title: 'Before Traffic Lights', narrative: 'In 1868, London installed the first traffic signal: a gas-lit semaphore operated by a police officer. It exploded within a month, injuring the officer. Automated signals wouldn\'t arrive until 1914 in Cleveland.' },
    { title: 'Why Two States Fail', narrative: 'Imagine just GREEN and RED. GREEN → RED: cars at full speed suddenly face a red light. No warning. Rear-end collisions everywhere. You need a **transition state** — YELLOW — to warn drivers.' },
    { title: 'The State Machine', narrative: 'GREEN → YELLOW → RED → GREEN. Each state has one rule: on TIMER, go to the next state. This is a **finite state machine**: a system that\'s always in exactly one state, with defined transitions between states.' },
    { title: 'Adding Emergency', narrative: 'An ambulance approaches. The light must go RED immediately, no matter what state it\'s in. This is a **global transition**: EMERGENCY from any state → RED. State machines handle exceptional cases elegantly.' },
    { title: 'State Machines Everywhere', narrative: 'Vending machines, elevators, TCP connections, game characters, UI components — all state machines. A button can be idle, hovered, pressed, disabled. A door can be open, closed, locked. Understanding states is understanding systems.' },
  ],
  principle: 'Finite State Machines',
  explanation: "A **finite state machine** (FSM) has:\n- A finite set of **states** (GREEN, YELLOW, RED)\n- **Transitions** triggered by events (TIMER, EMERGENCY)\n- An **initial state** (GREEN)\n- Rules that determine the next state\n\nAt any moment, the system is in exactly one state.",
  pattern: '1. List all possible states\n2. Define events that cause transitions\n3. Map each (state, event) → next state\n4. Handle global transitions (events that apply from any state)\n5. Verify: no state is unreachable, no transition is missing',
  tryItQuestion: 'A vending machine has states: IDLE, SELECTING, DISPENSING. A user inserts a coin in IDLE. What state should it transition to?',
  tryItOptions: [
    'SELECTING — the user can now choose a product',
    'DISPENSING — skip to dispensing immediately',
    'IDLE — stay in IDLE until a product is selected',
    'A new state: PAID',
  ],
  tryItCorrectIndex: 0,
  gameType: 'state-architect',
  gameConfig: {
    id: 'traffic-light-fsm',
    title: 'Design a Traffic Light',
    description: 'Create the state machine for a traffic light. It cycles GREEN → YELLOW → RED → GREEN on timer events, and must handle an EMERGENCY event that forces RED from any state.',
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
    failMessage: 'Some transitions are missing. Remember: EMERGENCY from any state → RED.',
  } satisfies StateArchitectPuzzleEntity,
  resolution: "You just designed a finite state machine that controls every intersection in the world. The same pattern powers elevator controllers, network protocols, and game AI. State machines turn complex behavior into a simple, verifiable diagram.",
  learningPoints: [
    'A finite state machine is always in exactly one state at a time',
    'Transitions are triggered by events and move the system to a new state',
    'YELLOW exists as a transition state — it prevents abrupt changes',
    'Global transitions (EMERGENCY) apply from any state',
    'FSMs power vending machines, TCP, game AI, and UI components',
  ],
  currentStep: 0,
};

const meta: Meta<typeof KnowledgeStoryTemplate> = {
  title: 'KFlow/KnowledgeStory/S0 Origins/S3/E2/The Traffic Light',
  component: KnowledgeStoryTemplate,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof KnowledgeStoryTemplate>;

export const Hook: Story = { args: { entity: { ...storyEntity, currentStep: 0 } } };
export const Narrative: Story = { args: { entity: { ...storyEntity, currentStep: 1 } } };
export const Lesson: Story = { args: { entity: { ...storyEntity, currentStep: 2 } } };
export const Game: Story = { args: { entity: { ...storyEntity, currentStep: 3 } } };
export const Reward: Story = {
  args: {
    entity: {
      ...storyEntity,
      currentStep: 4,
      gameResult: { score: 100, time: 65, attempts: 2 },
      isComplete: true,
    },
  },
};
