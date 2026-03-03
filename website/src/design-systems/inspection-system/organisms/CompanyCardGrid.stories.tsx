import type { Meta, StoryObj } from '@storybook/react-vite';
import { CompanyCardGrid, CompanyEntity } from './CompanyCardGrid';

const mockCompanies: CompanyEntity[] = [
  {
    id: 'comp-001',
    name: 'Acme Manufacturing',
    address: '123 Industrial Ave',
    city: 'Ljubljana',
    country: 'Slovenia',
    registrationNumber: 'SI-2024-001',
    taxNumber: 'SI12345678',
    companyId: 'comp-001',
    inspectionCount: 5,
    lastInspectionDate: '2026-02-10',
    complianceStatus: 'compliant',
    units: [
      { id: 'u1', name: 'Main Plant' },
      { id: 'u2', name: 'Warehouse A' },
    ],
  },
  {
    id: 'comp-002',
    name: 'Global Logistics',
    address: '456 Transport Rd',
    city: 'Maribor',
    country: 'Slovenia',
    registrationNumber: 'SI-2024-002',
    companyId: 'comp-002',
    inspectionCount: 2,
    complianceStatus: 'non-compliant',
  },
  {
    id: 'comp-003',
    name: 'Tech Solutions',
    address: '789 Innovation Blvd',
    city: 'Celje',
    country: 'Slovenia',
    registrationNumber: 'SI-2024-003',
    companyId: 'comp-003',
    inspectionCount: 0,
    complianceStatus: 'pending',
    units: [{ id: 'u3', name: 'HQ Office' }],
  },
  {
    id: 'comp-004',
    name: 'Harbor Industries',
    address: '321 Port Lane',
    city: 'Koper',
    country: 'Slovenia',
    registrationNumber: 'SI-2024-004',
    companyId: 'comp-004',
    complianceStatus: 'unknown',
  },
];

const meta: Meta<typeof CompanyCardGrid> = {
  title: 'Clients/Inspection-System/Organisms/CompanyCardGrid',
  component: CompanyCardGrid,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: mockCompanies,
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
    error: new Error('Failed to load companies'),
  },
};

export const Empty: Story = {
  args: {
    entity: [],
  },
};
