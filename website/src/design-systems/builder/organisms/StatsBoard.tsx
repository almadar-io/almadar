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
import { Card, Typography, LoadingState } from '@almadar/ui';

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
    <div className="p-4">
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: iconBgColor }}
        >
          {icon}
        </div>
        <div>
          <div className="text-3xl font-bold" style={{ color: 'var(--color-foreground)' }}>{value}</div>
          <div className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>{label}</div>
        </div>
      </div>
    </div>
  </Card>
);

const SmallStatCard: React.FC<{
  icon: React.ReactNode;
  value: number;
  label: string;
}> = ({ icon, value, label }) => (
  <Card style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', opacity: 0.9 }}>
    <div className="p-4 text-center">
      {icon}
      <div className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>{value}</div>
      <div className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{label}</div>
    </div>
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
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <LoadingState message="Loading statistics..." />
      </div>
    );
  }

  return (
    <div className={`max-w-6xl mx-auto space-y-6 ${className}`}>
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<FolderOpen className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />}
          iconBgColor="color-mix(in srgb, var(--color-primary) 20%, transparent)"
          value={stats.totalApps}
          label="Applications"
        />
        <StatCard
          icon={<Layers className="w-6 h-6" style={{ color: 'var(--color-info)' }} />}
          iconBgColor="color-mix(in srgb, var(--color-info) 20%, transparent)"
          value={stats.totalStates}
          label="Total States"
        />
        <StatCard
          icon={<Zap className="w-6 h-6" style={{ color: 'var(--color-warning)' }} />}
          iconBgColor="color-mix(in srgb, var(--color-warning) 20%, transparent)"
          value={stats.totalEvents}
          label="Total Events"
        />
        <StatCard
          icon={stats.withIssues > 0
            ? <AlertTriangle className="w-6 h-6" style={{ color: 'var(--color-warning)' }} />
            : <CheckCircle2 className="w-6 h-6" style={{ color: 'var(--color-success)' }} />}
          iconBgColor={stats.withIssues > 0
            ? 'color-mix(in srgb, var(--color-warning) 20%, transparent)'
            : 'color-mix(in srgb, var(--color-success) 20%, transparent)'}
          value={stats.withIssues > 0 ? stats.withIssues : '✓'}
          label={stats.withIssues > 0 ? 'Need Attention' : 'All Valid'}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SmallStatCard icon={<LayoutGrid className="w-5 h-5 mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />} value={stats.totalPages} label="Pages" />
        <SmallStatCard icon={<FileText className="w-5 h-5 mx-auto mb-2" style={{ color: 'var(--color-success)' }} />} value={stats.totalEntities} label="Entities" />
        <SmallStatCard icon={<TrendingUp className="w-5 h-5 mx-auto mb-2" style={{ color: 'var(--color-info)' }} />} value={stats.totalTransitions} label="Transitions" />
        <SmallStatCard icon={<Calendar className="w-5 h-5 mx-auto mb-2" style={{ color: 'var(--color-error)' }} />} value={recentApps} label="Updated This Week" />
      </div>

      {/* Averages & Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
          <div className="p-5">
            <Typography variant="h6" style={{ color: 'var(--color-foreground)' }} className="mb-4">Averages per App</Typography>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4" style={{ color: 'var(--color-info)' }} />
                  <span style={{ color: 'var(--color-foreground)', opacity: 0.8 }}>States</span>
                </div>
                <span className="font-semibold" style={{ color: 'var(--color-foreground)' }}>{avgStates}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" style={{ color: 'var(--color-warning)' }} />
                  <span style={{ color: 'var(--color-foreground)', opacity: 0.8 }}>Events</span>
                </div>
                <span className="font-semibold" style={{ color: 'var(--color-foreground)' }}>{avgEvents}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
                  <span style={{ color: 'var(--color-foreground)', opacity: 0.8 }}>Valid Apps</span>
                </div>
                <span className="font-semibold" style={{ color: 'var(--color-foreground)' }}>
                  {stats.totalApps ? Math.round((stats.validApps / stats.totalApps) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
          <div className="p-5">
            <Typography variant="h6" style={{ color: 'var(--color-foreground)' }} className="mb-4">Domain Distribution</Typography>
            {Object.keys(domainCounts).length === 0 ? (
              <Typography variant="body2" style={{ color: 'var(--color-muted-foreground)' }}>No apps with domain information</Typography>
            ) : (
              <div className="space-y-3">
                {Object.entries(domainCounts)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([domain, count]) => (
                    <div key={domain} className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm capitalize" style={{ color: 'var(--color-foreground)', opacity: 0.8 }}>{domain}</span>
                          <span className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>{count}</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-surface)' }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(count / stats.totalApps) * 100}%`,
                              background: 'linear-gradient(to right, var(--color-primary), var(--color-info))',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

StatsBoard.displayName = 'StatsBoard';
export default StatsBoard;
