import type { Meta, StoryObj } from '@storybook/react';
import { StateMachineVisualizer } from './StateMachineVisualizer';
import type { BuilderGraph } from './types';

const meta: Meta<typeof StateMachineVisualizer> = {
  title: 'Builder/Organisms/Builder/StateMachineVisualizer',
  component: StateMachineVisualizer,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof StateMachineVisualizer>;

// =============================================================================
// Mock Data
// =============================================================================

const baseGraph: BuilderGraph = {
  id: 'graph-1',
  name: 'Task Manager',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  version: 1,
  nodes: {
    's1': { id: 's1', type: 'State', properties: { name: 'Idle', isInitial: true, description: 'Initial idle state' } },
    's2': { id: 's2', type: 'State', properties: { name: 'Loading', description: 'Fetching data from server' } },
    's3': { id: 's3', type: 'State', properties: { name: 'Active' } },
    's4': { id: 's4', type: 'State', properties: { name: 'Error', isFinal: true } },
    'e1': { id: 'e1', type: 'Event', properties: { key: 'FETCH', name: 'Fetch Data' } },
    'e2': { id: 'e2', type: 'Event', properties: { key: 'SUCCESS', name: 'Fetch Success' } },
    'e3': { id: 'e3', type: 'Event', properties: { key: 'FAILURE', name: 'Fetch Failure', description: 'Network or server error' } },
    'e4': { id: 'e4', type: 'Event', properties: { key: 'RESET', name: 'Reset' } },
    't1': { id: 't1', type: 'Transition', properties: { name: 'Start Fetch' } },
    't2': { id: 't2', type: 'Transition', properties: { name: 'Data Loaded' } },
    't3': { id: 't3', type: 'Transition', properties: { name: 'Error Occurred' } },
    't4': { id: 't4', type: 'Transition', properties: { name: 'Back to Idle' } },
  },
  nodeTypes: {
    State: ['s1', 's2', 's3', 's4'],
    Event: ['e1', 'e2', 'e3', 'e4'],
    Transition: ['t1', 't2', 't3', 't4'],
  },
  relationships: [
    { id: 'r1', source: 't1', target: 's1', type: 'TRANSITIONS_FROM', direction: 'forward' },
    { id: 'r2', source: 't1', target: 's2', type: 'TRANSITIONS_TO', direction: 'forward' },
    { id: 'r3', source: 't1', target: 'e1', type: 'ON_EVENT', direction: 'forward' },
    { id: 'r4', source: 't2', target: 's2', type: 'TRANSITIONS_FROM', direction: 'forward' },
    { id: 'r5', source: 't2', target: 's3', type: 'TRANSITIONS_TO', direction: 'forward' },
    { id: 'r6', source: 't2', target: 'e2', type: 'ON_EVENT', direction: 'forward' },
    { id: 'r7', source: 't3', target: 's2', type: 'TRANSITIONS_FROM', direction: 'forward' },
    { id: 'r8', source: 't3', target: 's4', type: 'TRANSITIONS_TO', direction: 'forward' },
    { id: 'r9', source: 't3', target: 'e3', type: 'ON_EVENT', direction: 'forward' },
    { id: 'r10', source: 't4', target: 's3', type: 'TRANSITIONS_FROM', direction: 'forward' },
    { id: 'r11', source: 't4', target: 's1', type: 'TRANSITIONS_TO', direction: 'forward' },
    { id: 'r12', source: 't4', target: 'e4', type: 'ON_EVENT', direction: 'forward' },
  ],
};

const emptyGraph: BuilderGraph = {
  id: 'graph-empty',
  name: 'Empty',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  version: 1,
  nodes: {},
  nodeTypes: {},
  relationships: [],
};

// =============================================================================
// Stories
// =============================================================================

/** Default editable state machine with states, events, and transitions */
export const Default: Story = {
  args: {
    graph: baseGraph,
    onCreateState: () => {},
    onCreateEvent: () => {},
    onCreateTransition: () => {},
    onEditState: () => {},
    onEditEvent: () => {},
    onDeleteState: () => {},
    onDeleteEvent: () => {},
    onDeleteTransition: () => {},
  },
};

/** Read-only mode with no edit actions visible */
export const ReadOnly: Story = {
  args: {
    graph: baseGraph,
    readOnly: true,
  },
};

/** Empty state machine with no states or events */
export const EmptyGraph: Story = {
  args: {
    graph: emptyGraph,
    onCreateState: () => {},
    onCreateEvent: () => {},
  },
};
