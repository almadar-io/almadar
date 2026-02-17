import type { Meta, StoryObj } from "@storybook/react";
import { CompaniesTemplate, CompanyEntity } from "./CompaniesTemplate";

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

const sampleCompanies: CompanyEntity[] = [
  {
    id: "comp-1",
    name: "Gostilna Pri Hrastu d.o.o.",
    address: "Celovška cesta 123",
    city: "Ljubljana",
    country: "Slovenija",
    registrationNumber: "1234567890",
    taxNumber: "SI12345678",
    companyId: "GPH-001",
    postalCode: "1000",
    inspectionCount: 5,
    lastInspectionDate: "2024-01-15T00:00:00Z",
    complianceStatus: "compliant",
    units: [
      { id: "unit-1", name: "Glavna restavracija" },
      { id: "unit-2", name: "Kuhinja za dostavo" },
    ],
  },
  {
    id: "comp-2",
    name: "Trgovina Spar Slovenija d.o.o.",
    address: "Slovenska cesta 56",
    city: "Maribor",
    country: "Slovenija",
    registrationNumber: "9876543210",
    taxNumber: "SI87654321",
    companyId: "SPAR-002",
    inspectionCount: 3,
    lastInspectionDate: "2024-01-10T00:00:00Z",
    complianceStatus: "pending",
    units: [{ id: "unit-3", name: "Supermarket Center" }],
  },
  {
    id: "comp-3",
    name: "Iskraemeco d.d.",
    address: "Savska loka 4",
    city: "Kranj",
    country: "Slovenija",
    registrationNumber: "555666777",
    companyId: "ISK-003",
    inspectionCount: 2,
    complianceStatus: "compliant",
  },
  {
    id: "comp-4",
    name: "Skladišče Logistika d.o.o.",
    address: "Ljubljanska cesta 10",
    city: "Celje",
    country: "Slovenija",
    registrationNumber: "111222333",
    companyId: "LOG-004",
    inspectionCount: 1,
    complianceStatus: "non-compliant",
  },
  {
    id: "comp-5",
    name: "Kavarna Sonček",
    address: "Obala 15",
    city: "Portorož",
    country: "Slovenija",
    registrationNumber: "444555666",
    companyId: "KS-005",
    inspectionCount: 0,
    complianceStatus: "unknown",
  },
];

export const Default: Story = {
  args: {
    entity: sampleCompanies,
  },
};

export const Empty: Story = {
  args: {
    entity: [],
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
    error: new Error("Failed to load companies"),
  },
};

export const SingleCompany: Story = {
  args: {
    entity: [sampleCompanies[0]],
  },
};
