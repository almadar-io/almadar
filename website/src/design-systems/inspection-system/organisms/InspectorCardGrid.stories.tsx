import type { Meta, StoryObj } from '@storybook/react-vite';
import { InspectorCardGrid, InspectorEntity } from './InspectorCardGrid';

const mockInspectors: InspectorEntity[] = [
  {
    id: 'ins-001',
    name: 'John',
    surname: 'Smith',
    email: 'john.smith@inspection.gov',
    phone: '+386 1 234 5678',
    department: 'Safety Division',
    employeeId: 'EMP-001',
    isActive: true,
    unitName: 'Ljubljana Unit',
    inspectionCount: 12,
    lastInspectionDate: '2026-02-15',
  },
  {
    id: 'ins-002',
    name: 'Jane',
    surname: 'Doe',
    email: 'jane.doe@inspection.gov',
    phone: '+386 1 234 5679',
    department: 'Environmental Division',
    employeeId: 'EMP-002',
    isActive: true,
    inspectionCount: 8,
    lastInspectionDate: '2026-02-12',
  },
  {
    id: 'ins-003',
    name: 'Ahmed',
    surname: 'Ali',
    email: 'ahmed.ali@inspection.gov',
    phone: '+386 1 234 5680',
    department: 'Quality Division',
    employeeId: 'EMP-003',
    isActive: false,
    unitName: 'Maribor Unit',
    unitEmail: 'maribor@inspection.gov',
    unitPhone: '+386 2 234 5678',
    inspectionCount: 3,
  },
  {
    id: 'ins-004',
    name: 'Maria',
    surname: 'Garcia',
    email: 'maria.garcia@inspection.gov',
    phone: '+386 1 234 5681',
    department: 'Safety Division',
    employeeId: 'EMP-004',
    isActive: true,
    inspectionCount: 0,
  },
];

const meta: Meta<typeof InspectorCardGrid> = {
  title: 'Clients/Inspection-System/Organisms/InspectorCardGrid',
  component: InspectorCardGrid,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: mockInspectors,
  },
};

export const Loading: Story = {
  args: {
    entity: [],
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    entity: [],
    error: new Error('Failed to load inspectors'),
  },
};

export const Empty: Story = {
  args: {
    entity: [],
  },
};
