/**
 * AdminDashboardTemplate
 *
 * Template for the Admin Dashboard page (/admin).
 * Displays system overview with stats, recent activity, and admin actions.
 *
 * Page: AdminDashboardPage
 * Entity: Multiple (User, Invite, Connection, etc.)
 * ViewType: dashboard
 */

import React from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { Badge } from "../../../components/atoms/Badge";
import { Spinner } from "../../../components/atoms/Spinner";
import { useEventBus } from "../../../hooks/useEventBus";
import {
  Users,
  UserPlus,
  Link2,
  Leaf,
  Shield,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Settings,
  RefreshCw,
} from "lucide-react";

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  pendingUsers: number;
  totalConnections: number;
  pendingConnections: number;
  totalInvites: number;
  redeemedInvites: number;
  averageTrustScore: number;
  healthyRelationships: number;
  decliningRelationships: number;
}

export interface RecentActivity {
  id: string;
  type: "user_registered" | "connection_accepted" | "invite_redeemed" | "trust_calculated";
  description: string;
  timestamp: string;
  userId?: string;
  userName?: string;
}

export interface SystemAlert {
  id: string;
  severity: "info" | "warning" | "error";
  message: string;
  timestamp: string;
}

export interface AdminDashboardTemplateProps {
  /** Dashboard statistics */
  stats?: DashboardStats;
  /** Recent activity items */
  recentActivity?: readonly RecentActivity[];
  /** System alerts */
  alerts?: readonly SystemAlert[];
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Page title */
  title?: string;
  /** Additional CSS classes */
  className?: string;
}

const StatCard: React.FC<{
  icon: React.ElementType;
  label: string;
  value: number | string;
  subtitle?: string;
  trend?: "up" | "down" | "stable";
  iconColor?: string;
  onClick?: () => void;
}> = ({ icon: Icon, label, value, subtitle, trend, iconColor = "text-blue-600", onClick }) => {
  return (
    <Card
      className={cn("p-4", onClick && "cursor-pointer hover:shadow-md transition-shadow")}
      onClick={onClick}
    >
      <VStack gap="sm">
        <HStack justify="between" align="start">
          <Box rounded="lg" padding="sm" className="bg-neutral-100">
            <Icon className={cn("h-5 w-5", iconColor)} />
          </Box>
          {trend && trend !== "stable" && (
            <Badge
              variant={trend === "up" ? "success" : "error"}
              size="sm"
              className="gap-1"
            >
              {trend === "up" ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
            </Badge>
          )}
        </HStack>
        <VStack gap="none">
          <Typography variant="h2">{value}</Typography>
          <Typography variant="label" className="text-neutral-500">
            {label}
          </Typography>
          {subtitle && (
            <Typography variant="small" className="text-neutral-400">
              {subtitle}
            </Typography>
          )}
        </VStack>
      </VStack>
    </Card>
  );
};

const ActivityItem: React.FC<{ activity: RecentActivity }> = ({ activity }) => {
  const getActivityIcon = () => {
    switch (activity.type) {
      case "user_registered":
        return <UserPlus className="h-4 w-4 text-blue-500" />;
      case "connection_accepted":
        return <Link2 className="h-4 w-4 text-emerald-500" />;
      case "invite_redeemed":
        return <Users className="h-4 w-4 text-purple-500" />;
      case "trust_calculated":
        return <Shield className="h-4 w-4 text-amber-500" />;
      default:
        return <Activity className="h-4 w-4 text-neutral-500" />;
    }
  };

  return (
    <HStack gap="sm" align="start" className="py-2 border-b last:border-0">
      <Box rounded="full" padding="xs" className="bg-neutral-100 mt-0.5">
        {getActivityIcon()}
      </Box>
      <VStack gap="none" className="flex-1">
        <Typography variant="small">{activity.description}</Typography>
        <Typography variant="small" className="text-neutral-400">
          {new Date(activity.timestamp).toLocaleString()}
        </Typography>
      </VStack>
    </HStack>
  );
};

const AlertItem: React.FC<{ alert: SystemAlert }> = ({ alert }) => {
  const getAlertColor = () => {
    switch (alert.severity) {
      case "error":
        return "bg-red-50 border-red-200 text-red-700";
      case "warning":
        return "bg-amber-50 border-amber-200 text-amber-700";
      default:
        return "bg-blue-50 border-blue-200 text-blue-700";
    }
  };

  return (
    <HStack
      gap="sm"
      align="start"
      className={cn("p-3 rounded-lg border", getAlertColor())}
    >
      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
      <VStack gap="none" className="flex-1">
        <Typography variant="small">{alert.message}</Typography>
        <Typography variant="small" className="opacity-70">
          {new Date(alert.timestamp).toLocaleString()}
        </Typography>
      </VStack>
    </HStack>
  );
};

export const AdminDashboardTemplate: React.FC<AdminDashboardTemplateProps> = ({
  stats,
  recentActivity = [],
  alerts = [],
  isLoading = false,
  error = null,
  title = "Admin Dashboard",
  className,
}) => {
  const eventBus = useEventBus();

  const handleRefresh = () => {
    eventBus.emit("UI:REFRESH", {});
  };

  const handleNavigate = (path: string) => {
    eventBus.emit("UI:NAVIGATE", { path });
  };

  if (isLoading) {
    return (
      <VStack align="center" justify="center" className={cn("py-12", className)}>
        <Spinner size="lg" />
        <Typography variant="body" className="text-neutral-500">
          Loading dashboard...
        </Typography>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack align="center" justify="center" className={cn("py-12", className)}>
        <Typography variant="body" className="text-red-500">
          Error: {error.message}
        </Typography>
      </VStack>
    );
  }

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {/* Header */}
      <HStack justify="between" align="center" wrap>
        <VStack gap="xs">
          <Typography variant="h1">{title}</Typography>
          <Typography variant="body" className="text-neutral-500">
            System overview and management
          </Typography>
        </VStack>

        <HStack gap="sm">
          <Button variant="secondary" onClick={handleRefresh} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleNavigate("/settings")}
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </HStack>
      </HStack>

      {/* Alerts */}
      {alerts.length > 0 && (
        <VStack gap="sm">
          {alerts.map((alert) => (
            <AlertItem key={alert.id} alert={alert} />
          ))}
        </VStack>
      )}

      {/* Stats Grid */}
      {stats && (
        <Box className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard
            icon={Users}
            label="Total Users"
            value={stats.totalUsers}
            subtitle={`${stats.activeUsers} active`}
            iconColor="text-blue-600"
            onClick={() => handleNavigate("/users")}
          />
          <StatCard
            icon={Link2}
            label="Connections"
            value={stats.totalConnections}
            subtitle={`${stats.pendingConnections} pending`}
            iconColor="text-emerald-600"
            onClick={() => handleNavigate("/connections")}
          />
          <StatCard
            icon={UserPlus}
            label="Invites"
            value={stats.totalInvites}
            subtitle={`${stats.redeemedInvites} redeemed`}
            iconColor="text-purple-600"
            onClick={() => handleNavigate("/invites")}
          />
          <StatCard
            icon={Shield}
            label="Avg Trust Score"
            value={stats.averageTrustScore}
            iconColor="text-amber-600"
            onClick={() => handleNavigate("/trust-intelligence")}
          />
          <StatCard
            icon={Leaf}
            label="Healthy Gardens"
            value={stats.healthyRelationships}
            subtitle={`${stats.decliningRelationships} need attention`}
            trend={stats.decliningRelationships > 0 ? "down" : "up"}
            iconColor="text-green-600"
            onClick={() => handleNavigate("/garden")}
          />
        </Box>
      )}

      {/* Main Content Grid */}
      <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-4">
          <VStack gap="md">
            <HStack justify="between" align="center">
              <Typography variant="h3">Recent Activity</Typography>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigate("/activity")}
              >
                View All
              </Button>
            </HStack>

            {recentActivity.length === 0 ? (
              <VStack align="center" className="py-8">
                <Activity className="h-8 w-8 text-neutral-300" />
                <Typography variant="body" className="text-neutral-400">
                  No recent activity
                </Typography>
              </VStack>
            ) : (
              <VStack gap="none">
                {recentActivity.slice(0, 5).map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </VStack>
            )}
          </VStack>
        </Card>

        {/* Quick Actions */}
        <Card className="p-4">
          <VStack gap="md">
            <Typography variant="h3">Quick Actions</Typography>

            <Box className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                className="gap-2 justify-start h-auto py-3"
                onClick={() => handleNavigate("/users/register")}
              >
                <UserPlus className="h-4 w-4" />
                <VStack gap="none" align="start">
                  <Typography variant="small" className="font-medium">
                    Add User
                  </Typography>
                  <Typography variant="small" className="text-neutral-400">
                    Register new member
                  </Typography>
                </VStack>
              </Button>

              <Button
                variant="secondary"
                className="gap-2 justify-start h-auto py-3"
                onClick={() => handleNavigate("/invites/create")}
              >
                <Users className="h-4 w-4" />
                <VStack gap="none" align="start">
                  <Typography variant="small" className="font-medium">
                    Send Invite
                  </Typography>
                  <Typography variant="small" className="text-neutral-400">
                    Invite new member
                  </Typography>
                </VStack>
              </Button>

              <Button
                variant="secondary"
                className="gap-2 justify-start h-auto py-3"
                onClick={() => handleNavigate("/trust-intelligence/calculate")}
              >
                <Shield className="h-4 w-4" />
                <VStack gap="none" align="start">
                  <Typography variant="small" className="font-medium">
                    Calculate Trust
                  </Typography>
                  <Typography variant="small" className="text-neutral-400">
                    Run trust analysis
                  </Typography>
                </VStack>
              </Button>

              <Button
                variant="secondary"
                className="gap-2 justify-start h-auto py-3"
                onClick={() => handleNavigate("/graph-intelligence")}
              >
                <Activity className="h-4 w-4" />
                <VStack gap="none" align="start">
                  <Typography variant="small" className="font-medium">
                    Graph Analysis
                  </Typography>
                  <Typography variant="small" className="text-neutral-400">
                    Network insights
                  </Typography>
                </VStack>
              </Button>
            </Box>
          </VStack>
        </Card>
      </Box>
    </VStack>
  );
};

AdminDashboardTemplate.displayName = "AdminDashboardTemplate";
