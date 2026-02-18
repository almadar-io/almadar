import type { Meta, StoryObj } from '@storybook/react';
import { BuilderOutputBoard } from './BuilderOutputBoard';
import type { SummarySchema } from './ExpansionSummaryBoard';
import type { ValidationError } from './ValidationReportBoard';

const meta: Meta<typeof BuilderOutputBoard> = {
  title: 'Builder/Organisms/BuilderOutputBoard',
  component: BuilderOutputBoard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof BuilderOutputBoard>;

// =============================================================================
// Mock Data
// =============================================================================

const sampleSchema: SummarySchema & { ui?: { pages?: Array<{ name: string; path: string; isInitial?: boolean; purpose?: string; components?: unknown[] }> } } = {
  name: 'TaskManager',
  stateMachine: {
    states: [
      { name: 'Idle', classification: 'domain' },
      { name: 'Creating', classification: 'domain' },
      { name: 'Editing', classification: 'domain' },
      { name: 'Loading', classification: 'system' },
      { name: 'Validating', classification: 'system' },
      { name: 'Error', classification: 'system' },
    ],
    events: [
      { key: 'CREATE', name: 'Create Task', classification: 'domain' },
      { key: 'EDIT', name: 'Edit Task', classification: 'domain' },
      { key: 'SAVE', name: 'Save', classification: 'domain' },
      { key: 'INIT', name: 'Initialize', classification: 'system' },
      { key: 'VALIDATE', name: 'Validate', classification: 'system' },
    ],
    transitions: [
      { from: 'Idle', to: 'Creating', event: 'CREATE', effects: [{ type: 'render-ui' }] },
      { from: 'Creating', to: 'Validating', event: 'SAVE', effects: [{ type: 'persist' }, { type: 'notify' }] },
      { from: 'Validating', to: 'Idle', event: 'VALIDATE', effects: [{ type: 'render-ui' }] },
      { from: 'Validating', to: 'Error', event: 'VALIDATE', effects: [{ type: 'notify' }] },
      { from: 'Idle', to: 'Editing', event: 'EDIT', effects: [{ type: 'render-ui' }] },
      { from: 'Loading', to: 'Idle', event: 'INIT', effects: [{ type: 'render-ui' }] },
    ],
  },
  ui: {
    pages: [
      { name: 'TasksPage', path: '/tasks', isInitial: true, purpose: 'List and manage tasks' },
      { name: 'SettingsPage', path: '/settings', purpose: 'Application settings' },
    ],
  },
};

const sampleErrors: ValidationError[] = [
  { code: 'INIT_REQUIRED', severity: 'error', message: 'Missing INIT transition for state "Editing"', path: 'stateMachine.transitions', suggestion: 'Add an INIT self-loop transition to the Editing state' },
  { code: 'UNREACHABLE', severity: 'error', message: 'Unreachable state "Deleted" has no incoming transitions', path: 'stateMachine.states[5]', suggestion: 'Add an incoming transition or remove the state' },
];

const sampleWarnings: ValidationError[] = [
  { code: 'DEAD_END', severity: 'warning', message: 'State "Error" has no outgoing transitions (dead end)', path: 'stateMachine.states[5]', suggestion: 'Add a recovery transition from Error state' },
];

// =============================================================================
// Stories
// =============================================================================

/** Default builder output with schema data */
export const Default: Story = {
  args: {
    schema: sampleSchema,
    validationErrors: [],
    validationWarnings: [],
  },
};

/** With validation errors and warnings */
export const WithValidationIssues: Story = {
  args: {
    schema: sampleSchema,
    validationErrors: sampleErrors,
    validationWarnings: sampleWarnings,
    onApplyFix: () => {},
    onApplyAllFixes: () => {},
    onRerunValidation: () => {},
  },
};

/** Currently validating */
export const Validating: Story = {
  args: {
    schema: sampleSchema,
    validationErrors: [],
    validationWarnings: [],
    isValidating: true,
    onRerunValidation: () => {},
  },
};

/** Minimal schema with few elements */
export const MinimalSchema: Story = {
  args: {
    schema: {
      name: 'Simple',
      stateMachine: {
        states: [{ name: 'Idle', classification: 'domain' }],
        events: [{ key: 'INIT', name: 'Init', classification: 'system' }],
        transitions: [],
      },
    },
    validationErrors: [],
    validationWarnings: [],
  },
};
