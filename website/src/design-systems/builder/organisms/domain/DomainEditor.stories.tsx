import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { DomainEditor } from './DomainEditor';

const meta: Meta<typeof DomainEditor> = {
  title: 'Builder/Organisms/Domain/DomainEditor',
  component: DomainEditor,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DomainEditor>;

// =============================================================================
// Sample Data
// =============================================================================

const sampleDomainText = `# Patient Management Domain
---

Entity Patient
  - name : text (required)
  - age : number
  - status : active | discharged | pending
  - admittedAt : timestamp (auto)

Entity Doctor
  - name : text (required)
  - specialty : text
  - available : yes/no

Behavior PatientLifecycle
  States: registered, triaged, in_treatment, discharged
  From registered \u2192 triaged when TRIAGE
  From triaged \u2192 in_treatment when ASSIGN_DOCTOR
    if doctor.available
  From in_treatment \u2192 discharged when COMPLETE
    then generateReport
    then notify patient via email

The PatientList shows all patients
  Purpose: Browse and manage patients
  URL: /patients
  It displays:
    - A table of patients with name, age, status
    - Filter controls for status
  Users can:
    - Click a patient to view details
    - Click "Add Patient" to register a new patient`;

const shortDomainText = `Entity Task
  - title : text (required)
  - status : pending | active | done`;

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    value: sampleDomainText,
    onChange: fn(),
    showLineNumbers: true,
    height: '500px',
  },
};

export const WithErrors: Story = {
  args: {
    value: sampleDomainText,
    onChange: fn(),
    showLineNumbers: true,
    height: '500px',
    errors: [
      {
        message: 'Unknown field type "timestamp" - did you mean "date"?',
        line: 5,
        column: 20,
        severity: 'error',
        suggestion: 'Replace "timestamp" with "date"',
      },
      {
        message: 'Entity "Doctor" has no relationships defined',
        line: 8,
        severity: 'warning',
        suggestion: 'Consider adding a relationship to Patient',
      },
      {
        message: 'Transition guard "doctor.available" references unqualified field',
        line: 17,
        severity: 'error',
        suggestion: 'Use "@entity.doctor.available" or "@Doctor.available"',
      },
    ],
  },
};

export const ReadOnly: Story = {
  args: {
    value: sampleDomainText,
    readOnly: true,
    showLineNumbers: true,
    height: '500px',
  },
};

export const NoLineNumbers: Story = {
  args: {
    value: shortDomainText,
    onChange: fn(),
    showLineNumbers: false,
    height: '200px',
  },
};

export const WithToolbar: Story = {
  args: {
    value: sampleDomainText,
    onChange: fn(),
    showLineNumbers: true,
    height: '500px',
    onSync: fn(),
    onCopy: fn(),
    onDownload: fn(),
    onUpload: fn(),
  },
};
