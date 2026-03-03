import type { Meta, StoryObj } from "@storybook/react";
import { ConnectionsBoard, type ConnectionData } from "./ConnectionsBoard";

// Mock data matching the ConnectionData interface
const mockConnections: ConnectionData[] = [
  {
    id: "conn-1",
    requesterId: "u-101",
    recipientId: "u-current",
    status: "pending",
    category: "professional",
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    requesterName: "Sarah Chen",
    recipientName: "Current User",
    notes: "Met at the annual technology conference in Berlin",
    isInWaitingRoom: false,
  },
  {
    id: "conn-2",
    requesterId: "u-current",
    recipientId: "u-102",
    status: "accepted",
    category: "mentor",
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    acceptedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 28).toISOString(),
    lastInteractionAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    interactionCount: 47,
    requesterName: "Current User",
    recipientName: "James Rivera",
    notes: "Long-time mentor in product development",
  },
  {
    id: "conn-3",
    requesterId: "u-103",
    recipientId: "u-current",
    status: "accepted",
    category: "community",
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
    acceptedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    lastInteractionAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    interactionCount: 12,
    requesterName: "Aisha Patel",
    recipientName: "Current User",
  },
  {
    id: "conn-4",
    requesterId: "u-current",
    recipientId: "u-104",
    status: "rejected",
    category: "personal",
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    requesterName: "Current User",
    recipientName: "Tom Nakamura",
  },
  {
    id: "conn-5",
    requesterId: "u-105",
    recipientId: "u-current",
    status: "archived",
    category: "professional",
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
    acceptedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 89).toISOString(),
    archivedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    interactionCount: 3,
    requesterName: "Maria Gonzalez",
    recipientName: "Current User",
  },
];

const meta: Meta<typeof ConnectionsBoard> = {
  title: "Clients/Winning-11/Organisms/ConnectionsBoard",
  component: ConnectionsBoard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    currentUserId: "u-current",
    createEvent: "CREATE_CONNECTION",
    viewEvent: "VIEW_CONNECTION",
    acceptEvent: "ACCEPT_CONNECTION",
    rejectEvent: "REJECT_CONNECTION",
    searchEvent: "SEARCH_CONNECTIONS",
    filterEvent: "FILTER_CONNECTIONS",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: mockConnections,
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
    error: new Error("Failed to load connections"),
  },
};

export const PendingOnly: Story = {
  args: {
    entity: mockConnections.filter((c) => c.status === "pending"),
    title: "Pending Requests",
    subtitle: "Connection requests awaiting your response",
  },
};

export const NoSearchNoFilters: Story = {
  args: {
    entity: mockConnections,
    showSearch: false,
    showFilters: false,
  },
};
