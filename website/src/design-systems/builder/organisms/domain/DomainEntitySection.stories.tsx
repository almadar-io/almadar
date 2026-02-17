import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { DomainEntitySection } from './DomainEntitySection';
import type { EntityData } from './DomainEntitySection';

const meta: Meta<typeof DomainEntitySection> = {
  title: 'Builder/Organisms/Domain/DomainEntitySection',
  component: DomainEntitySection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DomainEntitySection>;

// =============================================================================
// Mock Data
// =============================================================================

const patientEntity: EntityData = {
  name: 'Patient',
  description: 'a person receiving medical care at the hospital',
  fields: [
    { name: 'name', fieldType: 'text', constraints: [{ type: 'required' }] },
    { name: 'age', fieldType: 'number' },
    { name: 'email', fieldType: 'text', constraints: [{ type: 'required' }, { type: 'unique' }] },
    { name: 'status', fieldType: 'enum', enumValues: ['active', 'discharged', 'pending'] },
  ],
  relationships: [],
};

const entityWithRelationships: EntityData = {
  name: 'Appointment',
  description: 'a scheduled visit between a patient and a doctor',
  fields: [
    { name: 'date', fieldType: 'date', constraints: [{ type: 'required' }] },
    { name: 'duration', fieldType: 'number' },
    { name: 'notes', fieldType: 'text' },
  ],
  relationships: [
    { relationshipType: 'belongs_to', targetEntity: 'Patient' },
    { relationshipType: 'belongs_to', targetEntity: 'Doctor' },
    { relationshipType: 'has_many', targetEntity: 'Note', alias: 'visitNotes' },
  ],
};

const entityWithStates: EntityData = {
  name: 'Order',
  description: 'a customer purchase order',
  fields: [
    { name: 'orderNumber', fieldType: 'text', constraints: [{ type: 'required' }, { type: 'unique' }] },
    { name: 'total', fieldType: 'currency' },
    { name: 'shippingAddress', fieldType: 'text', constraints: [{ type: 'required' }] },
  ],
  relationships: [],
  states: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
  initialState: 'pending',
};

const fullEntity: EntityData = {
  name: 'Invoice',
  description: 'a billing document for services rendered',
  fields: [
    { name: 'invoiceNumber', fieldType: 'text', constraints: [{ type: 'required' }, { type: 'unique' }] },
    { name: 'amount', fieldType: 'currency', constraints: [{ type: 'required' }] },
    { name: 'dueDate', fieldType: 'date', constraints: [{ type: 'required' }] },
    { name: 'notes', fieldType: 'text' },
    { name: 'priority', fieldType: 'enum', enumValues: ['low', 'medium', 'high', 'urgent'] },
  ],
  relationships: [
    { relationshipType: 'belongs_to', targetEntity: 'Patient' },
    { relationshipType: 'has_many', targetEntity: 'LineItem' },
    { relationshipType: 'has_one', targetEntity: 'Payment' },
  ],
  states: ['draft', 'sent', 'paid', 'overdue', 'cancelled'],
  initialState: 'draft',
};

const emptyEntity: EntityData = {
  name: 'NewEntity',
  description: 'a newly created entity with no fields yet',
  fields: [],
  relationships: [],
};

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    entity: patientEntity,
    expanded: true,
    editable: true,
    onEdit: fn(),
    onDelete: fn(),
    onAddField: fn(),
    onEditField: fn(),
    onDeleteField: fn(),
  },
};

export const WithRelationships: Story = {
  args: {
    entity: entityWithRelationships,
    expanded: true,
    editable: true,
    onEdit: fn(),
    onDelete: fn(),
    onAddField: fn(),
    onEditField: fn(),
    onDeleteField: fn(),
    onAddRelationship: fn(),
    onEditRelationship: fn(),
    onDeleteRelationship: fn(),
    onEntityClick: fn(),
  },
};

export const WithStates: Story = {
  args: {
    entity: entityWithStates,
    expanded: true,
    editable: true,
    onEdit: fn(),
    onDelete: fn(),
    onAddField: fn(),
    onEditField: fn(),
    onDeleteField: fn(),
    onStateClick: fn(),
  },
};

export const FullEntity: Story = {
  args: {
    entity: fullEntity,
    expanded: true,
    editable: true,
    onEdit: fn(),
    onDelete: fn(),
    onAddField: fn(),
    onEditField: fn(),
    onDeleteField: fn(),
    onAddRelationship: fn(),
    onEditRelationship: fn(),
    onDeleteRelationship: fn(),
    onEntityClick: fn(),
    onStateClick: fn(),
  },
};

export const ReadOnly: Story = {
  args: {
    entity: fullEntity,
    expanded: true,
    editable: false,
  },
};

export const Empty: Story = {
  args: {
    entity: emptyEntity,
    expanded: true,
    editable: true,
    onEdit: fn(),
    onDelete: fn(),
    onAddField: fn(),
    onAddRelationship: fn(),
  },
};
