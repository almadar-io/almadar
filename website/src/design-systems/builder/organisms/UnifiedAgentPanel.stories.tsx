import type { Meta, StoryObj } from '@storybook/react';
import { UnifiedAgentPanel } from './UnifiedAgentPanel';
import type { AgentActivity, AgentTodo, SchemaDiff } from './UnifiedAgentPanel';

const meta: Meta<typeof UnifiedAgentPanel> = {
  title: 'Builder/Organisms/UnifiedAgentPanel',
  component: UnifiedAgentPanel,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ width: 420, height: '100vh', backgroundColor: 'var(--color-background)' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UnifiedAgentPanel>;

// =============================================================================
// Mock Data
// =============================================================================

const now = Date.now();

const sampleActivities: AgentActivity[] = [
  { id: 'a1', type: 'thinking', message: 'Analyzing your request to add a user authentication orbital...', timestamp: now - 30_000 },
  { id: 'a2', type: 'tool_call', message: 'Reading schema file: projects/myapp/myapp.orb', timestamp: now - 25_000 },
  { id: 'a3', type: 'tool_call', message: 'Checking patterns registry for form-section and entity-table', timestamp: now - 20_000 },
  { id: 'a4', type: 'response', message: 'Added User entity with fields: email, passwordHash, role, createdAt. Created AuthInteraction trait with Login, Register, and Logout flows.', timestamp: now - 10_000 },
];

const sampleTodos: AgentTodo[] = [
  { id: 't1', text: 'Add User entity to schema', status: 'completed' },
  { id: 't2', text: 'Create AuthInteraction trait', status: 'completed' },
  { id: 't3', text: 'Add login page with form-section pattern', status: 'in_progress' },
  { id: 't4', text: 'Add registration page', status: 'pending' },
  { id: 't5', text: 'Validate schema and fix errors', status: 'pending' },
];

const sampleDiffs: SchemaDiff[] = [
  { id: 'd1', type: 'added', path: 'orbitals[2].entity', description: 'User entity' },
  { id: 'd2', type: 'added', path: 'orbitals[2].traits[0]', description: 'AuthInteraction trait' },
  { id: 'd3', type: 'modified', path: 'orbitals[0].traits[0].stateMachine', description: 'Added LOGOUT event' },
];

// =============================================================================
// Stories
// =============================================================================

/** Idle agent panel with empty state */
export const Idle: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    agentStatus: 'idle',
    activities: [],
    todos: [],
    schemaDiffs: [],
    onSendMessage: () => {},
  },
};

/** Agent actively working with activity feed */
export const Working: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    agentStatus: 'running',
    activities: sampleActivities,
    todos: sampleTodos,
    schemaDiffs: [],
    onSendMessage: () => {},
    onCancel: () => {},
  },
};

/** Completed run with todos and schema diffs */
export const Complete: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    agentStatus: 'complete',
    activities: sampleActivities,
    todos: sampleTodos.map((t) => ({ ...t, status: 'completed' as const })),
    schemaDiffs: sampleDiffs,
    onSendMessage: () => {},
  },
};

/** Error state */
export const ErrorState: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    agentStatus: 'error',
    activities: sampleActivities.slice(0, 2),
    todos: [],
    schemaDiffs: [],
    agentError: 'Agent encountered an error: Rate limit exceeded. Please try again in 60 seconds.',
    onSendMessage: () => {},
  },
};

/** With initial input pre-populated */
export const WithInitialInput: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    agentStatus: 'idle',
    activities: [],
    todos: [],
    schemaDiffs: [],
    onSendMessage: () => {},
    initialInput: 'Add a user authentication system with login, register, and password reset',
  },
};
