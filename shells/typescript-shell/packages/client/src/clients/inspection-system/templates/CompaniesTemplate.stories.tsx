import type { Meta, StoryObj } from "@storybook/react";
import { CompaniesTemplate, CompanyData } from "./CompaniesTemplate";

const meta: Meta<typeof CompaniesTemplate> = {
  title: "Clients/Inspection-System/Templates/CompaniesTemplate",
  component: CompaniesTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CompaniesTemplate>;

const sampleCompanies: CompanyData[] = [
  {
    id: "comp-1",
    name: "Golden Dragon Restaurant",
    address: "123 Main Street",
    city: "Tripoli",
    country: "Libya",
    registrationNumber: "LY-2023-001234",
    taxNumber: "TAX-001234",
    companyId: "GDR-001",
    postalCode: "12345",
    inspectionCount: 5,
    lastInspectionDate: "2024-01-15T00:00:00Z",
    complianceStatus: "compliant",
  },
  {
    id: "comp-2",
    name: "Fresh Foods Market",
    address: "456 Commerce Blvd",
    city: "Benghazi",
    country: "Libya",
    registrationNumber: "LY-2022-005678",
    taxNumber: "TAX-005678",
    companyId: "FFM-002",
    inspectionCount: 3,
    lastInspectionDate: "2024-01-10T00:00:00Z",
    complianceStatus: "pending",
  },
  {
    id: "comp-3",
    name: "Tech Solutions Inc.",
    address: "789 Innovation Park",
    city: "Tripoli",
    country: "Libya",
    registrationNumber: "LY-2021-009012",
    companyId: "TSI-003",
    inspectionCount: 2,
    complianceStatus: "compliant",
  },
  {
    id: "comp-4",
    name: "City Warehouse Ltd.",
    address: "321 Industrial Zone",
    city: "Misrata",
    country: "Libya",
    registrationNumber: "LY-2023-003456",
    companyId: "CWL-004",
    inspectionCount: 1,
    complianceStatus: "non-compliant",
  },
  {
    id: "comp-5",
    name: "Sunset Cafe",
    address: "555 Beach Road",
    city: "Tripoli",
    country: "Libya",
    registrationNumber: "LY-2024-000111",
    companyId: "SC-005",
    inspectionCount: 0,
    complianceStatus: "unknown",
  },
];

export const Default: Story = {
  args: {
    items: sampleCompanies,
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    error: new Error("Failed to load companies"),
  },
};

export const SingleCompany: Story = {
  args: {
    items: [sampleCompanies[0]],
  },
};
