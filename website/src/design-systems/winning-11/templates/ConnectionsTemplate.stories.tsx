import type { Meta, StoryObj } from "@storybook/react";
import { ConnectionsTemplate, type ConnectionData } from "./ConnectionsTemplate";

const mockConnections: ConnectionData[] = [
  {
    id: "conn-1",
    requesterId: "user-1",
    recipientId: "user-2",
    requesterName: "Alex Thompson",
    recipientName: "Sarah Chen",
    status: "accepted",
    category: "professional",
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    acceptedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 28).toISOString(),
    lastInteractionAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    interactionCount: 15,
    notes: "Met at tech conference 2024",
  },
  {
    id: "conn-2",
    requesterId: "user-3",
    recipientId: "user-1",
    requesterName: "Mike Rodriguez",
    recipientName: "Alex Thompson",
    status: "pending",
    category: "mentor",
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    notes: "Interested in mentorship for career transition",
  },
  {
    id: "conn-3",
    requesterId: "user-1",
    recipientId: "user-4",
    requesterName: "Alex Thompson",
    recipientName: "Emily Watson",
    status: "accepted",
    category: "community",
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
    acceptedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 58).toISOString(),
    lastInteractionAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    interactionCount: 8,
  },
  {
    id: "conn-4",
    requesterId: "user-5",
    recipientId: "user-1",
    requesterName: "David Kim",
    recipientName: "Alex Thompson",
    status: "rejected",
    category: "professional",
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "conn-5",
    requesterId: "user-1",
    recipientId: "user-6",
    requesterName: "Alex Thompson",
    recipientName: "Lisa Park",
    status: "archived",
    category: "personal",
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120).toISOString(),
    acceptedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 118).toISOString(),
    archivedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    interactionCount: 25,
  },
  {
    id: "conn-6",
    requesterId: "user-7",
    recipientId: "user-1",
    requesterName: "James Wilson",
    recipientName: "Alex Thompson",
    status: "pending",
    category: "mentee",
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    notes: "Looking for guidance in product management",
    isInWaitingRoom: true,
  },
];

const meta: Meta<typeof ConnectionsTemplate> = {
  title: "Clients/Winning-11/Templates/ConnectionsTemplate",
  component: ConnectionsTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: mockConnections,
    currentUserId: "user-1",
  },
};

export const WithIncomingRequests: Story = {
  args: {
    entity: mockConnections.filter(
      (c) => c.status === "pending" && c.recipientId === "user-1"
    ),
    currentUserId: "user-1",
  },
};

export const AcceptedOnly: Story = {
  args: {
    entity: mockConnections.filter((c) => c.status === "accepted"),
    currentUserId: "user-1",
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
    error: new Error("Failed to load connections"),
  },
};

export const NoHeader: Story = {
  args: {
    entity: mockConnections,
    currentUserId: "user-1",
    showHeader: false,
  },
};

export const NoSearchOrFilters: Story = {
  args: {
    entity: mockConnections,
    currentUserId: "user-1",
    showSearch: false,
    showFilters: false,
  },
};

export const CustomTitle: Story = {
  args: {
    entity: mockConnections,
    currentUserId: "user-1",
    title: "Your Network",
    subtitle: "Build meaningful relationships",
  },
};
