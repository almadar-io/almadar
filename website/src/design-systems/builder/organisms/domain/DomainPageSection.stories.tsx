import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { DomainPageSection } from './DomainPageSection';
import type { PageData } from './DomainPageSection';

const meta: Meta<typeof DomainPageSection> = {
  title: 'Builder/Organisms/Domain/DomainPageSection',
  component: DomainPageSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DomainPageSection>;

// =============================================================================
// Mock Data
// =============================================================================

const patientListPage: PageData = {
  name: 'PatientListPage',
  description: 'all patients in the system',
  url: '/patients',
  sections: [],
  actions: [],
};

const pageWithSections: PageData = {
  name: 'PatientDetailPage',
  description: 'detailed information about a single patient',
  purpose: 'Allow staff to view and manage individual patient records',
  url: '/patients/:id',
  sections: [
    { description: 'Patient header with name, age, and status badge', pattern: 'entity-detail' },
    { description: 'Medical history timeline', pattern: 'timeline' },
    { description: 'Upcoming appointments list', pattern: 'entity-table' },
    { description: 'Notes and observations', pattern: 'card-list' },
  ],
  actions: [],
};

const pageWithActions: PageData = {
  name: 'DashboardPage',
  description: 'an overview of hospital activity',
  purpose: 'Provide quick access to key metrics and recent activity',
  url: '/dashboard',
  sections: [],
  actions: [
    { trigger: 'Click "New Patient"', action: 'open patient registration form' },
    { trigger: 'Click "View Schedule"', action: 'navigate to appointment calendar' },
    { trigger: 'Click on a stat card', action: 'drill down into detailed report' },
  ],
};

const fullPage: PageData = {
  name: 'AppointmentSchedulerPage',
  description: 'the appointment scheduling interface',
  purpose: 'Enable staff to schedule, reschedule, and cancel appointments',
  url: '/appointments',
  sections: [
    { description: 'Calendar view of appointments', pattern: 'calendar' },
    { description: 'Filter panel for doctor, department, and date range' },
    { description: 'Appointment details sidebar', pattern: 'entity-detail' },
  ],
  actions: [
    { trigger: 'Click a time slot', action: 'open new appointment form' },
    { trigger: 'Drag an appointment', action: 'reschedule to new time' },
    { trigger: 'Click "Cancel"', action: 'cancel the selected appointment' },
    { trigger: 'Click "Export"', action: 'download schedule as PDF' },
  ],
  onAccess: 'Load appointments for the current week',
};

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    page: patientListPage,
    expanded: true,
    editable: true,
    onEdit: fn(),
    onDelete: fn(),
    onUrlClick: fn(),
    onAddSection: fn(),
    onAddAction: fn(),
  },
};

export const WithSections: Story = {
  args: {
    page: pageWithSections,
    expanded: true,
    editable: true,
    onEdit: fn(),
    onDelete: fn(),
    onUrlClick: fn(),
    onAddSection: fn(),
    onEditSection: fn(),
    onDeleteSection: fn(),
    onAddAction: fn(),
  },
};

export const WithActions: Story = {
  args: {
    page: pageWithActions,
    expanded: true,
    editable: true,
    onEdit: fn(),
    onDelete: fn(),
    onUrlClick: fn(),
    onAddSection: fn(),
    onAddAction: fn(),
    onEditAction: fn(),
    onDeleteAction: fn(),
  },
};

export const FullPage: Story = {
  args: {
    page: fullPage,
    expanded: true,
    editable: true,
    onEdit: fn(),
    onDelete: fn(),
    onUrlClick: fn(),
    onAddSection: fn(),
    onEditSection: fn(),
    onDeleteSection: fn(),
    onAddAction: fn(),
    onEditAction: fn(),
    onDeleteAction: fn(),
  },
};

export const ReadOnly: Story = {
  args: {
    page: fullPage,
    expanded: true,
    editable: false,
    onUrlClick: fn(),
  },
};
