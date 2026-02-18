/**
 * StatsBoard Organism
 *
 * Dashboard showing aggregate statistics about all applications.
 * Displays counts, averages, validation status, and domain distribution.
 */

import React, { useMemo } from 'react';
import {
  Layers,
  Zap,
  LayoutGrid,
  FileText,
  FolderOpen,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import { Box, VStack, HStack, Icon, Card, Typography, LoadingState } from '@almadar/ui';

// =============================================================================
// Types
// =============================================================================

export interface AppStats {
  id: string;
  name?: string;
  updatedAt: number;
  hasValidationErrors?: boolean;
  stats: {
    states: number;
    events: number;
    pages: number;
    entities: number;
    transitions: number;
  };
  domain?: {
    category?: string;
  };
}

export interface StatsBoardProps {
  apps: AppStats[];
  isLoading?: boolean;
  className?: string;
}

// =============================================================================
// Sub-Components
// =============================================================================

const StatCard: React.FC<{
  icon: React.ReactNode;
  iconBgColor: string;
  value: string | number;
  label: string;
}> = ({ icon, iconBgColor, value, label }) => (
  <Card style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
    <Box padding="md">
      <HStack gap="sm" align="center">
        <Box
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: iconBgColor }}
        >
          {icon}
        </Box>
        <VStack gap="none">
          <Typography variant="h4" className="text-3xl font-bold" style={{ color: 'var(--color-foreground)' }}>{value}</Typography>
          <Typography variant="body2" style={{ color: 'var(--color-muted-foreground)' }}>{label}</Typography>
        </VStack>
      </HStack>
    </Box>
  </Card>
);

const SmallStatCard: React.FC<{
  icon: React.ReactNode;
  value: number;
  label: string;
}> = ({ icon, value, label }) => (
  <Card style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', opacity: 0.9 }}>
    <Box padding="md" className="text-center">
      {icon}
      <Typography variant="h5" className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>{value}</Typography>
      <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>{label}</Typography>
    </Box>
  </Card>
);

// =============================================================================
// Main Component
// =============================================================================

export const StatsBoard: React.FC<StatsBoardProps> = ({
  apps,
  isLoading = false,
  className = '',
}) => {
  const stats = useMemo(() => ({
    totalApps: apps.length,
    totalStates: apps.reduce((sum, app) => sum + app.stats.states, 0),
    totalEvents: apps.reduce((sum, app) => sum + app.stats.events, 0),
    totalPages: apps.reduce((sum, app) => sum + app.stats.pages, 0),
    totalEntities: apps.reduce((sum, app) => sum + app.stats.entities, 0),
    totalTransitions: apps.reduce((sum, app) => sum + app.stats.transitions, 0),
    withIssues: apps.filter(app => app.hasValidationErrors).length,
    validApps: apps.filter(app => !app.hasValidationErrors).length,
  }), [apps]);

  const domainCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    apps.forEach(app => {
      const domain = app.domain?.category || 'Unknown';
      counts[domain] = (counts[domain] || 0) + 1;
    });
    return counts;
  }, [apps]);

  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentApps = apps.filter(app => app.updatedAt > weekAgo).length;

  const avgStates = stats.totalApps ? (stats.totalStates / stats.totalApps).toFixed(1) : '0';
  const avgEvents = stats.totalApps ? (stats.totalEvents / stats.totalApps).toFixed(1) : '0';

  if (isLoading) {
    return (
      <Box className={`flex items-center justify-center h-64 ${className}`}>
        <LoadingState message="Loading statistics..." />
      </Box>
    );
  }

  return (
    <VStack gap="lg" className={`max-w-6xl mx-auto ${className}`}>
      {/* Main Stats Grid */}
      <Box className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Icon icon={FolderOpen} size="lg" style={{ color: 'var(--color-primary)' }} />}
          iconBgColor="color-mix(in srgb, var(--color-primary) 20%, transparent)"
          value={stats.totalApps}
          label="Applications"
        />
        <StatCard
          icon={<Icon icon={Layers} size="lg" style={{ color: 'var(--color-info)' }} />}
          iconBgColor="color-mix(in srgb, var(--color-info) 20%, transparent)"
          value={stats.totalStates}
          label="Total States"
        />
        <StatCard
          icon={<Icon icon={Zap} size="lg" style={{ color: 'var(--color-warning)' }} />}
          iconBgColor="color-mix(in srgb, var(--color-warning) 20%, transparent)"
          value={stats.totalEvents}
          label="Total Events"
        />
        <StatCard
          icon={stats.withIssues > 0
            ? <Icon icon={AlertTriangle} size="lg" style={{ color: 'var(--color-warning)' }} />
            : <Icon icon={CheckCircle2} size="lg" style={{ color: 'var(--color-success)' }} />}
          iconBgColor={stats.withIssues > 0
            ? 'color-mix(in srgb, var(--color-warning) 20%, transparent)'
            : 'color-mix(in srgb, var(--color-success) 20%, transparent)'}
          value={stats.withIssues > 0 ? stats.withIssues : '✓'}
          label={stats.withIssues > 0 ? 'Need Attention' : 'All Valid'}
        />
      </Box>

      {/* Secondary Stats */}
      <Box className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SmallStatCard icon={<Icon icon={LayoutGrid} size="md" className="mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />} value={stats.totalPages} label="Pages" />
        <SmallStatCard icon={<Icon icon={FileText} size="md" className="mx-auto mb-2" style={{ color: 'var(--color-success)' }} />} value={stats.totalEntities} label="Entities" />
        <SmallStatCard icon={<Icon icon={TrendingUp} size="md" className="mx-auto mb-2" style={{ color: 'var(--color-info)' }} />} value={stats.totalTransitions} label="Transitions" />
        <SmallStatCard icon={<Icon icon={Calendar} size="md" className="mx-auto mb-2" style={{ color: 'var(--color-error)' }} />} value={recentApps} label="Updated This Week" />
      </Box>

      {/* Averages & Distribution */}
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
          <Box padding="lg" className="p-5">
            <Typography variant="h6" style={{ color: 'var(--color-foreground)' }} className="mb-4">Averages per App</Typography>
            <VStack gap="md">
              <HStack align="center" justify="between">
                <HStack gap="xs" align="center">
                  <Icon icon={Layers} size="sm" style={{ color: 'var(--color-info)' }} />
                  <Typography variant="body2" style={{ color: 'var(--color-foreground)', opacity: 0.8 }}>States</Typography>
                </HStack>
                <Typography variant="body2" className="font-semibold" style={{ color: 'var(--color-foreground)' }}>{avgStates}</Typography>
              </HStack>
              <HStack align="center" justify="between">
                <HStack gap="xs" align="center">
                  <Icon icon={Zap} size="sm" style={{ color: 'var(--color-warning)' }} />
                  <Typography variant="body2" style={{ color: 'var(--color-foreground)', opacity: 0.8 }}>Events</Typography>
                </HStack>
                <Typography variant="body2" className="font-semibold" style={{ color: 'var(--color-foreground)' }}>{avgEvents}</Typography>
              </HStack>
              <HStack align="center" justify="between">
                <HStack gap="xs" align="center">
                  <Icon icon={CheckCircle2} size="sm" style={{ color: 'var(--color-success)' }} />
                  <Typography variant="body2" style={{ color: 'var(--color-foreground)', opacity: 0.8 }}>Valid Apps</Typography>
                </HStack>
                <Typography variant="body2" className="font-semibold" style={{ color: 'var(--color-foreground)' }}>
                  {stats.totalApps ? Math.round((stats.validApps / stats.totalApps) * 100) : 0}%
                </Typography>
              </HStack>
            </VStack>
          </Box>
        </Card>

        <Card style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
          <Box padding="lg" className="p-5">
            <Typography variant="h6" style={{ color: 'var(--color-foreground)' }} className="mb-4">Domain Distribution</Typography>
            {Object.keys(domainCounts).length === 0 ? (
              <Typography variant="body2" style={{ color: 'var(--color-muted-foreground)' }}>No apps with domain information</Typography>
            ) : (
              <VStack gap="sm">
                {Object.entries(domainCounts)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([domain, count]) => (
                    <HStack key={domain} gap="sm" align="center">
                      <Box className="flex-1">
                        <HStack align="center" justify="between" className="mb-1">
                          <Typography variant="body2" className="capitalize" style={{ color: 'var(--color-foreground)', opacity: 0.8 }}>{domain}</Typography>
                          <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>{count}</Typography>
                        </HStack>
                        <Box className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-surface)' }}>
                          <Box
                            className="h-full rounded-full"
                            style={{
                              width: `${(count / stats.totalApps) * 100}%`,
                              background: 'linear-gradient(to right, var(--color-primary), var(--color-info))',
                            }}
                          />
                        </Box>
                      </Box>
                    </HStack>
                  ))}
              </VStack>
            )}
          </Box>
        </Card>
      </Box>
    </VStack>
  );
};

StatsBoard.displayName = 'StatsBoard';
export default StatsBoard;
