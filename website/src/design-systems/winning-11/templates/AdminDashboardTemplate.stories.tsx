import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminDashboardTemplate,
  type DashboardStats,
  type RecentActivity,
  type SystemAlert,
} from "./AdminDashboardTemplate";

const mockStats: DashboardStats = {
  totalUsers: 1250,
  activeUsers: 892,
  pendingUsers: 45,
  totalConnections: 4567,
  pendingConnections: 123,
  totalInvites: 340,
  redeemedInvites: 278,
  averageTrustScore: 72,
  healthyRelationships: 3456,
  decliningRelationships: 234,
};

const mockRecentActivity: RecentActivity[] = [
  {
    id: "act-1",
    type: "user_registered",
    description: "New user John Doe registered",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    userId: "user-new-1",
    userName: "John Doe",
  },
  {
    id: "act-2",
    type: "connection_accepted",
    description: "Connection between Alex and Sarah accepted",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "act-3",
    type: "invite_redeemed",
    description: "Invite code TRUST2024A redeemed by jane@example.com",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "act-4",
    type: "trust_calculated",
    description: "Trust scores recalculated for 50 users",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "act-5",
    type: "user_registered",
    description: "New user Emma Wilson registered",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    userId: "user-new-2",
    userName: "Emma Wilson",
  },
];

const mockAlerts: SystemAlert[] = [
  {
    id: "alert-1",
    severity: "warning",
    message: "23 relationships are at risk of withering due to lack of interaction",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "alert-2",
    severity: "info",
    message: "Trust score calculation completed successfully",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
];

const meta: Meta<typeof AdminDashboardTemplate> = {
  title: "Clients/Winning-11/Templates/AdminDashboardTemplate",
  component: AdminDashboardTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    entity: {
      stats: mockStats,
      recentActivity: mockRecentActivity,
      alerts: mockAlerts,
    },
  },
};

export const HealthySystem: Story = {
  args: {
    entity: {
      stats: {
        ...mockStats,
        decliningRelationships: 12,
        pendingUsers: 5,
      },
      recentActivity: mockRecentActivity,
      alerts: [],
    },
  },
};

export const WithCriticalAlert: Story = {
  args: {
    entity: {
      stats: mockStats,
      recentActivity: mockRecentActivity,
      alerts: [
        {
          id: "alert-critical",
          severity: "error",
          message: "Database connection issues detected - some features may be unavailable",
          timestamp: new Date().toISOString(),
        },
        ...mockAlerts,
      ],
    },
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const ErrorState: Story = {
  args: {
    error: new Error("Failed to load dashboard data"),
  },
};

export const NoActivity: Story = {
  args: {
    entity: {
      stats: mockStats,
      recentActivity: [],
      alerts: [],
    },
  },
};

export const NoAlerts: Story = {
  args: {
    entity: {
      stats: mockStats,
      recentActivity: mockRecentActivity,
      alerts: [],
    },
  },
};

export const NoStats: Story = {
  args: {
    entity: {
      recentActivity: mockRecentActivity,
      alerts: mockAlerts,
    },
  },
};

export const CustomTitle: Story = {
  args: {
    entity: {
      stats: mockStats,
      recentActivity: mockRecentActivity,
      alerts: mockAlerts,
    },
    title: "System Overview",
  },
};
