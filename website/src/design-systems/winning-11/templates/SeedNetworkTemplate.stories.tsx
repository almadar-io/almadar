import type { Meta, StoryObj } from "@storybook/react";
import { SeedNetworkTemplate, type SeedNominationData } from "./SeedNetworkTemplate";

const mockNominations: SeedNominationData[] = [
  {
    id: "nom-1",
    nominatorId: "user-1",
    nominatorName: "Alex Thompson",
    nomineeEmail: "trusted.friend@example.com",
    nomineeName: "James Wilson",
    status: "pending",
    reason: "We've worked together for 5 years and I can vouch for his integrity and professionalism.",
    trustEndorsement: 95,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "nom-2",
    nominatorId: "user-2",
    nominatorName: "Sarah Chen",
    nomineeEmail: "colleague@example.com",
    nomineeName: "Rachel Adams",
    status: "approved",
    reason: "Exceptional track record in our industry. Would be a valuable addition to the network.",
    trustEndorsement: 88,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    reviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    reviewedBy: "admin-1",
  },
  {
    id: "nom-3",
    nominatorId: "user-3",
    nominatorName: "Mike Rodriguez",
    nomineeEmail: "mentor@example.com",
    nomineeName: "Patricia Brown",
    status: "converted",
    reason: "My mentor for the past 3 years. Highly respected in the community.",
    trustEndorsement: 92,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    reviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
    reviewedBy: "admin-1",
  },
  {
    id: "nom-4",
    nominatorId: "user-4",
    nominatorName: "Emily Watson",
    nomineeEmail: "partner@example.com",
    status: "rejected",
    reason: "Business partner recommendation.",
    trustEndorsement: 45,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
    reviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    reviewedBy: "admin-2",
  },
  {
    id: "nom-5",
    nominatorId: "user-1",
    nominatorName: "Alex Thompson",
    nomineeEmail: "friend@example.com",
    nomineeName: "Daniel Lee",
    status: "pending",
    reason: "Long-time friend with excellent reputation in the tech community.",
    trustEndorsement: 85,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "nom-6",
    nominatorId: "user-5",
    nominatorName: "David Kim",
    nomineeEmail: "cofounder@example.com",
    nomineeName: "Sophia Garcia",
    status: "approved",
    reason: "Co-founded two successful startups together. Absolute trust.",
    trustEndorsement: 98,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    reviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    reviewedBy: "admin-1",
  },
];

const meta: Meta<typeof SeedNetworkTemplate> = {
  title: "Clients/Winning-11/Templates/SeedNetworkTemplate",
  component: SeedNetworkTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: mockNominations,
  },
};

export const PendingOnly: Story = {
  args: {
    entity: mockNominations.filter((n) => n.status === "pending"),
  },
};

export const ApprovedOnly: Story = {
  args: {
    entity: mockNominations.filter((n) => n.status === "approved"),
  },
};

export const ConvertedOnly: Story = {
  args: {
    entity: mockNominations.filter((n) => n.status === "converted"),
  },
};

export const Loading: Story = {
  args: {
    entity: [],
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    entity: [],
    isLoading: false,
  },
};

export const ErrorState: Story = {
  args: {
    entity: [],
    error: new Error("Failed to load nominations"),
  },
};

export const NoHeader: Story = {
  args: {
    entity: mockNominations,
    showHeader: false,
  },
};

export const NoSearch: Story = {
  args: {
    entity: mockNominations,
    showSearch: false,
  },
};

export const CustomTitle: Story = {
  args: {
    entity: mockNominations,
    title: "Trust Nominations",
    subtitle: "Nominate people you trust to join the network",
  },
};
