import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminDashboardBoard,
  type AdminDashboardEntity,
  type DashboardStats,
  type RecentActivity,
  type SystemAlert,
} from "./AdminDashboardBoard";

// Mock data matching the AdminDashboardEntity interface
const mockStats: DashboardStats = {
  totalUsers: 1248,
  activeUsers: 892,
  pendingUsers: 47,
  totalConnections: 3567,
  pendingConnections: 123,
  totalInvites: 560,
  redeemedInvites: 412,
  averageTrustScore: 78,
  healthyRelationships: 2890,
  decliningRelationships: 34,
};

const mockRecentActivity: RecentActivity[] = [
  {
    id: "act-1",
    type: "user_registered",
    description: "Sarah Chen registered a new account",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    userId: "u-101",
    userName: "Sarah Chen",
  },
  {
    id: "act-2",
    type: "connection_accepted",
    description: "James Rivera accepted a connection from Aisha Patel",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    userId: "u-102",
    userName: "James Rivera",
  },
  {
    id: "act-3",
    type: "invite_redeemed",
    description: "Maria Gonzalez redeemed an invite from Mike Chen",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    userId: "u-103",
    userName: "Maria Gonzalez",
  },
  {
    id: "act-4",
    type: "trust_calculated",
    description: "Trust scores recalculated for 156 users",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    id: "act-5",
    type: "user_registered",
    description: "Tom Nakamura registered a new account",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    userId: "u-104",
    userName: "Tom Nakamura",
  },
];

const mockAlerts: SystemAlert[] = [
  {
    id: "alert-1",
    severity: "warning",
    message: "Trust score calculation queue is running behind schedule",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "alert-2",
    severity: "info",
    message: "System maintenance scheduled for tonight at 2:00 AM UTC",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
];

const mockEntity: AdminDashboardEntity = {
  stats: mockStats,
  recentActivity: mockRecentActivity,
  alerts: mockAlerts,
};

const meta: Meta<typeof AdminDashboardBoard> = {
  title: "Clients/Winning-11/Organisms/AdminDashboardBoard",
  component: AdminDashboardBoard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    refreshEvent: "REFRESH_DASHBOARD",
    navigateEvent: "NAVIGATE",
    settingsEvent: "OPEN_SETTINGS",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: mockEntity,
  },
};

export const Loading: Story = {
  args: {
    entity: undefined,
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    entity: {
      stats: {
        totalUsers: 0,
        activeUsers: 0,
        pendingUsers: 0,
        totalConnections: 0,
        pendingConnections: 0,
        totalInvites: 0,
        redeemedInvites: 0,
        averageTrustScore: 0,
        healthyRelationships: 0,
        decliningRelationships: 0,
      },
      recentActivity: [],
      alerts: [],
    },
  },
};

export const ErrorState: Story = {
  args: {
    entity: undefined,
    error: new Error("Failed to load dashboard data"),
  },
};

export const WithAlerts: Story = {
  args: {
    entity: {
      ...mockEntity,
      alerts: [
        ...mockAlerts,
        {
          id: "alert-3",
          severity: "error" as const,
          message: "Connection service is experiencing elevated error rates",
          timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        },
      ],
    },
  },
};

export const CustomTitle: Story = {
  args: {
    entity: mockEntity,
    title: "Network Operations Center",
  },
};
