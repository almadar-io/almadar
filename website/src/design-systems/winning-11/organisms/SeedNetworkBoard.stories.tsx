import type { Meta, StoryObj } from "@storybook/react";
import { SeedNetworkBoard, type SeedNominationData } from "./SeedNetworkBoard";

const mockNominations: SeedNominationData[] = [
  {
    id: "nom-1",
    nominatorId: "user-001",
    nominatorName: "Sarah Chen",
    nomineeEmail: "ahmed.hassan@example.com",
    nomineeName: "Ahmed Hassan",
    status: "pending",
    reason:
      "Exceptional community builder who organized 3 local meetups. Strong advocate for collaborative farming practices.",
    trustEndorsement: 92,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "nom-2",
    nominatorId: "user-002",
    nominatorName: "James Rivera",
    nomineeEmail: "maria.santos@example.com",
    nomineeName: "Maria Santos",
    status: "approved",
    reason:
      "Pioneered sustainable irrigation techniques shared across the network. Trusted by multiple community leaders.",
    trustEndorsement: 88,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    reviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    reviewedBy: "admin-001",
  },
  {
    id: "nom-3",
    nominatorId: "user-003",
    nomineeEmail: "tom.baker@example.com",
    nomineeName: "Tom Baker",
    status: "rejected",
    reason: "New to the network, limited interactions so far.",
    trustEndorsement: 35,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    reviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
    reviewedBy: "admin-002",
  },
  {
    id: "nom-4",
    nominatorId: "user-004",
    nominatorName: "Lina Park",
    nomineeEmail: "david.okonkwo@example.com",
    nomineeName: "David Okonkwo",
    status: "converted",
    reason:
      "Successfully onboarded and now an active contributor. Has mentored 5 new members.",
    trustEndorsement: 95,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    reviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 28).toISOString(),
    reviewedBy: "admin-001",
  },
  {
    id: "nom-5",
    nominatorId: "user-005",
    nomineeEmail: "priya.sharma@example.com",
    status: "pending",
    reason:
      "Recommended by three separate community members for contributions to knowledge sharing.",
    trustEndorsement: 78,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

const meta: Meta<typeof SeedNetworkBoard> = {
  title: "Clients/Winning-11/Organisms/SeedNetworkBoard",
  component: SeedNetworkBoard,
  parameters: {
    layout: "padded",
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

export const Loading: Story = {
  args: {
    entity: [],
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    entity: [],
  },
};

export const ErrorState: Story = {
  args: {
    entity: [],
    error: new Error("Failed to load seed nominations"),
  },
};

export const PendingOnly: Story = {
  args: {
    entity: mockNominations.filter((n) => n.status === "pending"),
  },
};

export const WithoutHeader: Story = {
  args: {
    entity: mockNominations,
    showHeader: false,
  },
};

export const WithoutSearch: Story = {
  args: {
    entity: mockNominations,
    showSearch: false,
  },
};

export const CustomTitle: Story = {
  args: {
    entity: mockNominations,
    title: "Community Seeds",
    subtitle: "Grow your network through trusted nominations",
  },
};
