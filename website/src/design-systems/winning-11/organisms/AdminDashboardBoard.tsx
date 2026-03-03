/**
 * AdminDashboardBoard
 *
 * Organism that contains all logic, sub-components, and layout
 * for the Admin Dashboard page. The template is a thin wrapper.
 */

import React from "react";
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
import {
  cn,
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  Card,
  Badge,
  Spinner,
  useEventBus,
  useTranslate,
  type EntityDisplayProps,
} from "@almadar/ui";

// ── Types ──────────────────────────────────────────────────────────

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
  type:
    | "user_registered"
    | "connection_accepted"
    | "invite_redeemed"
    | "trust_calculated";
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

export interface AdminDashboardEntity {
  /** Dashboard statistics */
  stats?: DashboardStats;
  /** Recent activity items */
  recentActivity?: readonly RecentActivity[];
  /** System alerts */
  alerts?: readonly SystemAlert[];
}

export interface AdminDashboardBoardProps extends Omit<EntityDisplayProps, 'entity'> {
  /** Entity (single object) */
  entity?: AdminDashboardEntity;
  /** Page title */
  title?: string;
  /** Event name for refresh action */
  refreshEvent: string;
  /** Event name for navigate action */
  navigateEvent: string;
  /** Event name for settings action */
  settingsEvent: string;
}

// ── Sub-components ─────────────────────────────────────────────────

const StatCard: React.FC<{
  icon: React.ElementType;
  label: string;
  value: number | string;
  subtitle?: string;
  trend?: "up" | "down" | "stable";
  iconColor?: string;
  event?: string;
  eventBus?: ReturnType<typeof useEventBus>;
}> = ({
  icon: Icon,
  label,
  value,
  subtitle,
  trend,
  iconColor = "text-blue-600",
  event,
  eventBus,
}) => {
  return (
    <Card
      className={cn(
        "p-4",
        event && "cursor-pointer hover:shadow-md transition-shadow"
      )}
      onClick={event && eventBus ? () => eventBus.emit(`UI:${event}`, {}) : undefined}
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
          <Typography
            variant="label"
            className="text-[var(--color-muted-foreground)]"
          >
            {label}
          </Typography>
          {subtitle && (
            <Typography
              variant="small"
              className="text-[var(--color-muted-foreground)]"
            >
              {subtitle}
            </Typography>
          )}
        </VStack>
      </VStack>
    </Card>
  );
};

const ActivityItem: React.FC<{ activity: RecentActivity }> = ({
  activity,
}) => {
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
        return (
          <Activity className="h-4 w-4 text-[var(--color-muted-foreground)]" />
        );
    }
  };

  return (
    <HStack gap="sm" align="start" className="py-2 border-b last:border-0">
      <Box rounded="full" padding="xs" className="bg-neutral-100 mt-0.5">
        {getActivityIcon()}
      </Box>
      <VStack gap="none" className="flex-1">
        <Typography variant="small">{activity.description}</Typography>
        <Typography
          variant="small"
          className="text-[var(--color-muted-foreground)]"
        >
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

// ── Main Board ─────────────────────────────────────────────────────

export const AdminDashboardBoard: React.FC<AdminDashboardBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  title,
  className,
  refreshEvent,
  navigateEvent,
  settingsEvent,
}) => {
  const { stats, recentActivity = [], alerts = [] } = entity || {};
  const eventBus = useEventBus();
  const { t } = useTranslate();

  const handleRefresh = () => {
    eventBus.emit(`UI:${refreshEvent}`, {});
  };

  const handleNavigate = (path: string) => {
    eventBus.emit(`UI:${navigateEvent}`, { path });
  };

  const handleSettings = () => {
    eventBus.emit(`UI:${settingsEvent}`, {});
    handleNavigate("/settings");
  };

  if (isLoading) {
    return (
      <VStack
        align="center"
        justify="center"
        className={cn("py-12", className)}
      >
        <Spinner size="lg" />
        <Typography
          variant="body"
          className="text-[var(--color-muted-foreground)]"
        >
          {t('admin.loadingDashboard')}
        </Typography>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack
        align="center"
        justify="center"
        className={cn("py-12", className)}
      >
        <Typography variant="body" className="text-red-500">
          {t('admin.error', { message: error.message })}
        </Typography>
      </VStack>
    );
  }

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {/* Header */}
      <HStack justify="between" align="center" wrap>
        <VStack gap="xs">
          <Typography variant="h1">{title ?? t('admin.title')}</Typography>
          <Typography
            variant="body"
            className="text-[var(--color-muted-foreground)]"
          >
            {t('admin.subtitle')}
          </Typography>
        </VStack>

        <HStack gap="sm">
          <Button variant="secondary" onClick={handleRefresh} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            {t('admin.refresh')}
          </Button>
          <Button
            variant="secondary"
            onClick={handleSettings}
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            {t('admin.settings')}
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
            label={t('admin.totalUsers')}
            value={stats.totalUsers}
            subtitle={t('admin.activeCount', { count: stats.activeUsers })}
            iconColor="text-blue-600"
            event={navigateEvent}
            eventBus={eventBus}
          />
          <StatCard
            icon={Link2}
            label={t('admin.connections')}
            value={stats.totalConnections}
            subtitle={t('admin.pendingCount', { count: stats.pendingConnections })}
            iconColor="text-emerald-600"
            event={navigateEvent}
            eventBus={eventBus}
          />
          <StatCard
            icon={UserPlus}
            label={t('admin.invites')}
            value={stats.totalInvites}
            subtitle={t('admin.redeemedCount', { count: stats.redeemedInvites })}
            iconColor="text-purple-600"
            event={navigateEvent}
            eventBus={eventBus}
          />
          <StatCard
            icon={Shield}
            label={t('admin.avgTrustScore')}
            value={stats.averageTrustScore}
            iconColor="text-amber-600"
            event={navigateEvent}
            eventBus={eventBus}
          />
          <StatCard
            icon={Leaf}
            label={t('admin.healthyGardens')}
            value={stats.healthyRelationships}
            subtitle={t('admin.needAttentionCount', { count: stats.decliningRelationships })}
            trend={stats.decliningRelationships > 0 ? "down" : "up"}
            iconColor="text-green-600"
            event={navigateEvent}
            eventBus={eventBus}
          />
        </Box>
      )}

      {/* Main Content Grid */}
      <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-4">
          <VStack gap="md">
            <HStack justify="between" align="center">
              <Typography variant="h3">{t('admin.recentActivity')}</Typography>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigate("/activity")}
              >
                {t('admin.viewAll')}
              </Button>
            </HStack>

            {recentActivity.length === 0 ? (
              <VStack align="center" className="py-8">
                <Activity className="h-8 w-8 text-[var(--color-muted-foreground)]" />
                <Typography
                  variant="body"
                  className="text-[var(--color-muted-foreground)]"
                >
                  {t('admin.noRecentActivity')}
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
            <Typography variant="h3">{t('admin.quickActions')}</Typography>

            <Box className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                className="gap-2 justify-start h-auto py-3"
                onClick={() => handleNavigate("/users/register")}
              >
                <UserPlus className="h-4 w-4" />
                <VStack gap="none" align="start">
                  <Typography variant="small" className="font-medium">
                    {t('admin.addUser')}
                  </Typography>
                  <Typography
                    variant="small"
                    className="text-[var(--color-muted-foreground)]"
                  >
                    {t('admin.registerNewMember')}
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
                    {t('admin.sendInvite')}
                  </Typography>
                  <Typography
                    variant="small"
                    className="text-[var(--color-muted-foreground)]"
                  >
                    {t('admin.inviteNewMember')}
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
                    {t('admin.calculateTrust')}
                  </Typography>
                  <Typography
                    variant="small"
                    className="text-[var(--color-muted-foreground)]"
                  >
                    {t('admin.runTrustAnalysis')}
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
                    {t('admin.graphAnalysis')}
                  </Typography>
                  <Typography
                    variant="small"
                    className="text-[var(--color-muted-foreground)]"
                  >
                    {t('admin.networkInsights')}
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

AdminDashboardBoard.displayName = "AdminDashboardBoard";
