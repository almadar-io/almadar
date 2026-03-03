import type { Meta, StoryObj } from '@storybook/react-vite';
import { InspectionCardGrid, InspectionEntity } from './InspectionCardGrid';

const mockInspections: InspectionEntity[] = [
  {
    id: 'insp-001',
    companyName: 'Acme Manufacturing',
    companyId: 'comp-001',
    inspectorName: 'John Smith',
    inspectorId: 'ins-001',
    phase: 'preparation',
    fieldType: 'Safety',
    scheduledDate: '2026-03-01',
    rulesChecked: 0,
    totalRules: 25,
  },
  {
    id: 'insp-002',
    companyName: 'Global Logistics',
    companyId: 'comp-002',
    inspectorName: 'Jane Doe',
    inspectorId: 'ins-002',
    phase: 'execution',
    fieldType: 'Environmental',
    startedAt: '2026-02-15',
    rulesChecked: 12,
    totalRules: 30,
    complianceRate: 75,
  },
  {
    id: 'insp-003',
    companyName: 'Tech Solutions',
    companyId: 'comp-003',
    inspectorName: 'Ahmed Ali',
    inspectorId: 'ins-003',
    phase: 'completed',
    fieldType: 'Quality',
    scheduledDate: '2026-02-10',
    startedAt: '2026-02-10',
    completedAt: '2026-02-12',
    rulesChecked: 20,
    totalRules: 20,
    complianceRate: 95,
  },
  {
    id: 'insp-004',
    companyName: 'Harbor Industries',
    companyId: 'comp-004',
    inspectorName: 'Maria Garcia',
    inspectorId: 'ins-004',
    phase: 'completed',
    fieldType: 'Safety',
    completedAt: '2026-02-08',
    rulesChecked: 18,
    totalRules: 25,
    complianceRate: 60,
  },
];

const meta: Meta<typeof InspectionCardGrid> = {
  title: 'Clients/Inspection-System/Organisms/InspectionCardGrid',
  component: InspectionCardGrid,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: mockInspections,
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
    error: new Error('Failed to load inspections'),
  },
};

export const Empty: Story = {
  args: {
    entity: [],
  },
};

export const WithoutHeader: Story = {
  args: {
    entity: mockInspections,
    showHeader: false,
    showSearch: false,
  },
};
