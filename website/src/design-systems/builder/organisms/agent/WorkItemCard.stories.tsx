import type { Meta, StoryObj } from '@storybook/react';
import { WorkItemCard } from './WorkItemCard';
import type { AnalyzedWorkItem } from './WorkItemCard';

const meta: Meta<typeof WorkItemCard> = {
  title: 'Builder/Organisms/Agent/WorkItemCard',
  component: WorkItemCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WorkItemCard>;

// =============================================================================
// Mock Data
// =============================================================================

const simpleWorkItem: AnalyzedWorkItem = {
  id: 'wi-1',
  name: 'User Authentication',
  description: 'Implement user login, registration, and session management with JWT tokens.',
  scope: {
    entities: ['User', 'Session'],
    features: ['Login', 'Register', 'Logout'],
    states: ['Unauthenticated', 'Authenticated'],
  },
  dependencies: [],
  estimatedComplexity: 25,
  questions: [
    {
      id: 'q1',
      category: 'authorization',
      question: 'Should users be able to log in with social providers (Google, GitHub)?',
      reason: 'Determines if we need OAuth integration traits.',
      inputType: 'yesno',
      suggestedAnswers: ['Yes', 'No'],
      impactsSchemaElement: 'transitions',
    },
    {
      id: 'q2',
      category: 'entity_lifecycle',
      question: 'What user roles should be supported?',
      reason: 'Roles affect guards on transitions and page visibility.',
      inputType: 'multiselect',
      suggestedAnswers: ['Admin', 'Editor', 'Viewer', 'Other: specify'],
      impactsSchemaElement: 'guards',
    },
  ],
};

const complexWorkItem: AnalyzedWorkItem = {
  id: 'wi-2',
  name: 'Order Processing Pipeline',
  description: 'Full order lifecycle from cart checkout through payment, fulfillment, and delivery tracking.',
  scope: {
    entities: ['Order', 'Payment', 'Shipment'],
    features: ['Checkout', 'Payment Processing', 'Fulfillment', 'Tracking'],
    states: ['Draft', 'Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'],
    pages: ['OrdersPage', 'OrderDetailPage'],
  },
  dependencies: ['wi-1'],
  estimatedComplexity: 75,
  questions: [
    {
      id: 'q3',
      category: 'workflow',
      question: 'What payment providers should be integrated?',
      reason: 'Determines external service effects in transitions.',
      inputType: 'select_with_other',
      suggestedAnswers: ['Stripe', 'PayPal', 'Square', 'Other: specify'],
      impactsSchemaElement: 'effects',
    },
    {
      id: 'q4',
      category: 'notification',
      question: 'In what order should notification channels be tried?',
      reason: 'Determines notification effect priority.',
      inputType: 'ordered_list',
      suggestedAnswers: ['Email', 'SMS', 'Push Notification', 'In-App'],
      impactsSchemaElement: 'effects',
    },
    {
      id: 'q5',
      category: 'constraint',
      question: 'Should cancelled orders be refundable?',
      reason: 'Adds a Refunding state and REFUND event if yes.',
      inputType: 'yesno',
      suggestedAnswers: ['Yes', 'No'],
      impactsSchemaElement: 'states',
      conditionalOn: { questionId: 'q3', answerEquals: 'Stripe' },
    },
  ],
};

const noQuestionsWorkItem: AnalyzedWorkItem = {
  id: 'wi-3',
  name: 'Audit Logging',
  description: 'Automatically log all state transitions for compliance and debugging.',
  scope: {
    entities: ['AuditLog'],
    features: ['Auto-logging'],
  },
  dependencies: ['wi-1'],
  estimatedComplexity: 10,
  questions: [],
};

// =============================================================================
// Stories
// =============================================================================

/** Default expanded card with yes/no and multiselect questions */
export const Default: Story = {
  args: {
    workItem: simpleWorkItem,
    answers: {},
    onAnswerChange: () => {},
    index: 0,
    isExpanded: true,
  },
};

/** Complex work item with high complexity and multiple question types */
export const ComplexItem: Story = {
  args: {
    workItem: complexWorkItem,
    answers: { q3: 'Stripe' },
    onAnswerChange: () => {},
    index: 1,
    isExpanded: true,
  },
};

/** Collapsed card */
export const Collapsed: Story = {
  args: {
    workItem: simpleWorkItem,
    answers: {},
    onAnswerChange: () => {},
    index: 0,
    isExpanded: false,
  },
};

/** Work item with no questions */
export const NoQuestions: Story = {
  args: {
    workItem: noQuestionsWorkItem,
    answers: {},
    onAnswerChange: () => {},
    index: 2,
    isExpanded: true,
  },
};

/** All questions answered */
export const AllAnswered: Story = {
  args: {
    workItem: simpleWorkItem,
    answers: { q1: 'Yes', q2: 'Admin, Editor' },
    onAnswerChange: () => {},
    index: 0,
    isExpanded: true,
  },
};
