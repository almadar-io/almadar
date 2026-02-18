import type { Meta, StoryObj } from '@storybook/react';
import { ExpansionSummaryBoard } from './ExpansionSummaryBoard';
import type { SummarySchema } from './ExpansionSummaryBoard';

const meta: Meta<typeof ExpansionSummaryBoard> = {
  title: 'Builder/Organisms/ExpansionSummaryBoard',
  component: ExpansionSummaryBoard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ExpansionSummaryBoard>;

// =============================================================================
// Mock Data
// =============================================================================

const richSchema: SummarySchema = {
  name: 'E-Commerce',
  stateMachine: {
    states: [
      { name: 'Browsing', classification: 'domain' },
      { name: 'CartOpen', classification: 'domain' },
      { name: 'Checkout', classification: 'domain' },
      { name: 'PaymentProcessing', classification: 'domain' },
      { name: 'OrderConfirmed', classification: 'domain' },
      { name: 'Loading', classification: 'system' },
      { name: 'Validating', classification: 'system' },
      { name: 'Error', classification: 'system' },
    ],
    events: [
      { key: 'ADD_TO_CART', name: 'Add to Cart', classification: 'domain' },
      { key: 'CHECKOUT', name: 'Checkout', classification: 'domain' },
      { key: 'PAY', name: 'Pay', classification: 'domain' },
      { key: 'CONFIRM', name: 'Confirm Order', classification: 'domain' },
      { key: 'INIT', name: 'Initialize', classification: 'system' },
      { key: 'VALIDATE', name: 'Validate', classification: 'system' },
      { key: 'RETRY', name: 'Retry', classification: 'system' },
    ],
    transitions: [
      { from: 'Browsing', to: 'CartOpen', event: 'ADD_TO_CART', effects: [{ type: 'persist' }, { type: 'render-ui' }] },
      { from: 'CartOpen', to: 'Checkout', event: 'CHECKOUT', effects: [{ type: 'render-ui' }] },
      { from: 'Checkout', to: 'PaymentProcessing', event: 'PAY', effects: [{ type: 'call_webhook' }, { type: 'persist' }] },
      { from: 'PaymentProcessing', to: 'OrderConfirmed', event: 'CONFIRM', effects: [{ type: 'persist' }, { type: 'notify' }, { type: 'send_email' }] },
      { from: 'Loading', to: 'Browsing', event: 'INIT', effects: [{ type: 'render-ui' }] },
      { from: 'Error', to: 'Browsing', event: 'RETRY', effects: [{ type: 'render-ui' }] },
    ],
  },
  ui: {
    pages: [
      { name: 'StorePage', path: '/store', components: [{ type: 'ProductGrid' }, { type: 'CartSidebar' }] },
      { name: 'CheckoutPage', path: '/checkout', components: [{ type: 'CheckoutForm' }, { type: 'OrderSummary' }] },
      { name: 'ConfirmationPage', path: '/confirmation', components: [{ type: 'SuccessMessage' }] },
    ],
  },
};

const minimalSchema: SummarySchema = {
  name: 'Simple',
  stateMachine: {
    states: [{ name: 'Idle', classification: 'domain' }],
    events: [{ key: 'INIT', name: 'Init', classification: 'system' }],
    transitions: [],
  },
};

const systemHeavySchema: SummarySchema = {
  name: 'SystemHeavy',
  stateMachine: {
    states: [
      { name: 'Active', classification: 'domain' },
      { name: 'Loading', classification: 'system' },
      { name: 'Saving', classification: 'system' },
      { name: 'Validating', classification: 'system' },
      { name: 'Syncing', classification: 'system' },
      { name: 'Error', classification: 'system' },
    ],
    events: [
      { key: 'SUBMIT', name: 'Submit', classification: 'domain' },
      { key: 'INIT', name: 'Init', classification: 'system' },
      { key: 'SAVE', name: 'Save', classification: 'system' },
      { key: 'VALIDATE', name: 'Validate', classification: 'system' },
      { key: 'SYNC', name: 'Sync', classification: 'system' },
      { key: 'RETRY', name: 'Retry', classification: 'system' },
    ],
    transitions: [
      { from: 'Loading', to: 'Active', event: 'INIT', effects: [{ type: 'render-ui' }] },
      { from: 'Active', to: 'Saving', event: 'SUBMIT', effects: [{ type: 'persist' }] },
      { from: 'Saving', to: 'Validating', event: 'SAVE', effects: [{ type: 'navigate' }] },
      { from: 'Validating', to: 'Syncing', event: 'VALIDATE', effects: [{ type: 'schedule' }] },
      { from: 'Syncing', to: 'Active', event: 'SYNC', effects: [{ type: 'update_field' }] },
      { from: 'Error', to: 'Active', event: 'RETRY', effects: [{ type: 'render-ui' }] },
    ],
  },
};

// =============================================================================
// Stories
// =============================================================================

/** Rich schema with domain and system elements */
export const Default: Story = {
  args: {
    schema: richSchema,
  },
};

/** Minimal schema with few elements */
export const Minimal: Story = {
  args: {
    schema: minimalSchema,
  },
};

/** System-heavy schema where Builder added most elements */
export const SystemHeavy: Story = {
  args: {
    schema: systemHeavySchema,
  },
};
