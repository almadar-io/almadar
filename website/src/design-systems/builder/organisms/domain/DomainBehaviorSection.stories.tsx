import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { DomainBehaviorSection } from './DomainBehaviorSection';
import type { BehaviorData } from './DomainBehaviorSection';

const meta: Meta<typeof DomainBehaviorSection> = {
  title: 'Builder/Organisms/Domain/DomainBehaviorSection',
  component: DomainBehaviorSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DomainBehaviorSection>;

// =============================================================================
// Mock Data
// =============================================================================

const patientLifecycleBehavior: BehaviorData = {
  name: 'PatientLifecycle',
  entityName: 'Patient',
  states: ['registered', 'triaged', 'in_treatment', 'discharged'],
  initialState: 'registered',
  transitions: [
    {
      fromState: 'registered',
      toState: 'triaged',
      event: 'TRIAGE',
    },
    {
      fromState: 'triaged',
      toState: 'in_treatment',
      event: 'ASSIGN_DOCTOR',
      guards: [{ field: 'doctor.available', operator: 'eq', value: true, description: 'Doctor must be available' }],
    },
    {
      fromState: 'in_treatment',
      toState: 'discharged',
      event: 'COMPLETE',
      effects: [{ description: 'Generate discharge report' }],
    },
  ],
  ticks: [],
  rules: [],
};

const behaviorWithTicks: BehaviorData = {
  name: 'AppointmentReminder',
  entityName: 'Appointment',
  states: ['scheduled', 'reminded', 'confirmed', 'missed'],
  initialState: 'scheduled',
  transitions: [
    {
      fromState: 'scheduled',
      toState: 'reminded',
      event: 'SEND_REMINDER',
    },
    {
      fromState: 'reminded',
      toState: 'confirmed',
      event: 'CONFIRM',
    },
    {
      fromState: 'reminded',
      toState: 'missed',
      event: 'MARK_MISSED',
    },
  ],
  ticks: [
    {
      name: 'reminder_check',
      interval: '1 hour',
      intervalMs: 3600000,
      effects: [
        { description: 'Check for upcoming appointments within 24 hours' },
        { description: 'Send reminder notification via email' },
      ],
    },
    {
      name: 'missed_check',
      interval: '15 minutes',
      intervalMs: 900000,
      guard: { field: 'state', operator: 'eq', value: 'reminded', description: 'Only when in reminded state' },
      effects: [
        { description: 'Mark as missed if no confirmation received' },
      ],
    },
  ],
  rules: [],
};

const behaviorWithRules: BehaviorData = {
  name: 'OrderFulfillment',
  entityName: 'Order',
  states: ['pending', 'processing', 'shipped', 'delivered'],
  initialState: 'pending',
  transitions: [
    {
      fromState: 'pending',
      toState: 'processing',
      event: 'START_PROCESSING',
    },
    {
      fromState: 'processing',
      toState: 'shipped',
      event: 'SHIP',
    },
    {
      fromState: 'shipped',
      toState: 'delivered',
      event: 'DELIVER',
    },
  ],
  ticks: [],
  rules: [
    'Orders over $500 require manager approval before processing',
    'Shipping address must be validated before transitioning to shipped',
    'Delivery confirmation must include a signature for orders over $100',
  ],
};

const emptyBehavior: BehaviorData = {
  name: 'NewBehavior',
  entityName: 'Item',
  states: [],
  initialState: '',
  transitions: [],
  ticks: [],
  rules: [],
};

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    behavior: patientLifecycleBehavior,
    expanded: true,
    editable: true,
    onEdit: fn(),
    onDelete: fn(),
    onAddState: fn(),
    onStateClick: fn(),
    onAddTransition: fn(),
    onEditTransition: fn(),
    onDeleteTransition: fn(),
  },
};

export const WithTicks: Story = {
  args: {
    behavior: behaviorWithTicks,
    expanded: true,
    editable: true,
    onEdit: fn(),
    onDelete: fn(),
    onAddState: fn(),
    onStateClick: fn(),
    onAddTransition: fn(),
    onEditTransition: fn(),
    onDeleteTransition: fn(),
    onAddTick: fn(),
    onEditTick: fn(),
    onDeleteTick: fn(),
  },
};

export const WithRules: Story = {
  args: {
    behavior: behaviorWithRules,
    expanded: true,
    editable: true,
    onEdit: fn(),
    onDelete: fn(),
    onAddState: fn(),
    onStateClick: fn(),
    onAddTransition: fn(),
    onEditTransition: fn(),
    onDeleteTransition: fn(),
  },
};

export const ReadOnly: Story = {
  args: {
    behavior: patientLifecycleBehavior,
    expanded: true,
    editable: false,
  },
};

export const Empty: Story = {
  args: {
    behavior: emptyBehavior,
    expanded: true,
    editable: true,
    onEdit: fn(),
    onDelete: fn(),
    onAddState: fn(),
    onAddTransition: fn(),
    onAddTick: fn(),
  },
};
