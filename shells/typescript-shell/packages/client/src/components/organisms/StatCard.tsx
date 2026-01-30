import React from 'react';
import { cn } from '../../lib/cn';
import { Card } from '../atoms';
import { TrendingUp, TrendingDown, Minus, LucideIcon } from 'lucide-react';
import { useEntityList } from '../../hooks/useEntityData';
import { useEventBus } from '../../hooks/useEventBus';

/**
 * Schema metric definition
 */
export interface MetricDefinition {
  field: string;
  label: string;
  /** Value format (e.g., 'currency', 'percent', 'number') */
  format?: 'currency' | 'percent' | 'number' | string;
}

export interface StatCardProps {
  /** Main label */
  label?: string;
  /** Primary value */
  value?: string | number;
  /** Previous value for comparison */
  previousValue?: number;
  /** Current value as number for trend calculation */
  currentValue?: number;
  /** Manual trend percentage (overrides calculation) */
  trend?: number;
  /** Trend direction (overrides calculation) */
  trendDirection?: 'up' | 'down' | 'neutral';
  /** Whether up is good (green) or bad (red) */
  invertTrend?: boolean;
  /** Icon to display */
  icon?: LucideIcon;
  /** Icon background color */
  iconBg?: string;
  /** Icon color */
  iconColor?: string;
  /** Subtitle or description */
  subtitle?: string;
  /** Action button */
  action?: {
    label: string;
    /** Event to dispatch via event bus (for trait state machine integration) */
    event?: string;
    /** Navigation URL - supports template interpolation */
    navigatesTo?: string;
    /** Legacy onClick callback */
    onClick?: () => void;
  };
  className?: string;

  // Schema-based props
  /** Entity name for schema-driven stats */
  entity?: string;
  /** Metrics to display (schema format) - accepts readonly for compatibility with generated const arrays */
  metrics?: readonly MetricDefinition[];
  /** Data to calculate stats from - accepts readonly for compatibility with generated const arrays */
  data?: readonly Record<string, unknown>[];
  /** Loading state indicator */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
}

export const StatCard: React.FC<StatCardProps> = ({
  label: propLabel,
  value: propValue,
  previousValue,
  currentValue,
  trend: manualTrend,
  trendDirection: manualDirection,
  invertTrend = false,
  icon: Icon,
  iconBg = 'bg-neutral-100',
  iconColor = 'text-black',
  subtitle,
  action,
  className,
  // Schema-based props
  entity,
  metrics,
  data: externalData,
  isLoading: externalLoading,
  error: externalError,
}) => {
  const eventBus = useEventBus();

  // Handle action click with event bus integration
  const handleActionClick = React.useCallback(() => {
    if (action?.event) {
      eventBus.emit(`UI:${action.event}`, { entity });
    }
    if (action?.onClick) {
      action.onClick();
    }
  }, [action, eventBus, entity]);
  // Auto-fetch data when entity is provided but no external data
  const shouldAutoFetch = !!entity && !externalData && !!metrics;
  const { data: fetchedData, isLoading: fetchLoading } = useEntityList(
    shouldAutoFetch ? entity : undefined,
    { skip: !shouldAutoFetch }
  );

  // Use external data if provided, otherwise use fetched data
  const data = (externalData ?? fetchedData ?? []) as readonly Record<string, unknown>[];

  // Determine loading and error state
  const isLoading = externalLoading ?? (shouldAutoFetch ? fetchLoading : false);
  const error = externalError;

  // Helper to compute a single metric value
  const computeMetricValue = React.useCallback((metric: MetricDefinition, items: readonly Record<string, unknown>[]) => {
    const field = metric.field;

    if (field === 'count') {
      return items.length;
    }

    // Handle explicit field:value format (e.g., "status:active")
    if (field.includes(':')) {
      const [fieldName, fieldValue] = field.split(':');
      return items.filter(item => item[fieldName] === fieldValue).length;
    }

    // Check if field exists on any item
    const fieldExistsOnItems = items.some(item => field in item);

    if (fieldExistsOnItems) {
      // Sum numeric field
      return items.reduce((acc, item) => {
        const val = item[field];
        return acc + (typeof val === 'number' ? val : 0);
      }, 0);
    }

    // Auto-detect: field name might be a status value
    // Check common status field names: status, state, phase
    const statusFields = ['status', 'state', 'phase'];
    for (const statusField of statusFields) {
      const hasStatusField = items.some(item => statusField in item);
      if (hasStatusField) {
        // Count items where statusField === field (the metric field is actually a value)
        const count = items.filter(item => item[statusField] === field).length;
        if (count > 0 || items.length === 0) {
          return count;
        }
      }
    }

    // Fallback: return 0
    return 0;
  }, []);

  // Schema-driven: calculate stats from data and metrics (supports multiple metrics)
  const schemaStats = React.useMemo(() => {
    if (!metrics || metrics.length === 0) return null;

    // Compute all metrics
    return metrics.map(metric => ({
      label: metric.label,
      value: computeMetricValue(metric, data),
      format: metric.format,
    }));
  }, [metrics, data, computeMetricValue]);

  // If multiple metrics, render them as a row of stats
  if (schemaStats && schemaStats.length > 1) {
    if (isLoading) {
      return (
        <div className={cn('grid gap-4', className)} style={{ gridTemplateColumns: `repeat(${schemaStats.length}, 1fr)` }}>
          {schemaStats.map((_, idx) => (
            <Card key={idx} className="p-4">
              <div className="animate-pulse space-y-2">
                <div className="h-3 bg-neutral-200 rounded w-16" />
                <div className="h-6 bg-neutral-200 rounded w-12" />
              </div>
            </Card>
          ))}
        </div>
      );
    }

    return (
      <div className={cn('grid gap-4', className)} style={{ gridTemplateColumns: `repeat(${schemaStats.length}, 1fr)` }}>
        {schemaStats.map((stat, idx) => (
          <Card key={idx} className="p-4">
            <p className="text-xs font-bold text-neutral-600 uppercase tracking-wide">{stat.label}</p>
            <p className="text-xl font-bold text-black">{stat.value}</p>
          </Card>
        ))}
      </div>
    );
  }

  // Use schema stats if available (single metric), otherwise use props
  const label = schemaStats?.[0]?.label || propLabel || entity || 'Stat';
  const value = schemaStats?.[0]?.value ?? propValue ?? 0;
  // Calculate trend if not provided manually
  const calculatedTrend = useMemo(() => {
    if (manualTrend !== undefined) return manualTrend;
    if (previousValue === undefined || currentValue === undefined) return undefined;
    if (previousValue === 0) return currentValue > 0 ? 100 : 0;
    return ((currentValue - previousValue) / previousValue) * 100;
  }, [manualTrend, previousValue, currentValue]);

  const trendDirection = manualDirection || (
    calculatedTrend === undefined || calculatedTrend === 0
      ? 'neutral'
      : calculatedTrend > 0
        ? 'up'
        : 'down'
  );

  const isPositive = invertTrend
    ? trendDirection === 'down'
    : trendDirection === 'up';

  const TrendIcon = trendDirection === 'up'
    ? TrendingUp
    : trendDirection === 'down'
      ? TrendingDown
      : Minus;

  // Show error state
  if (error) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="space-y-1">
          <p className="text-sm font-bold text-neutral-600 uppercase tracking-wide">{label}</p>
          <p className="text-sm text-red-500">Error: {error.message}</p>
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-neutral-200 rounded w-24" />
          <div className="h-8 bg-neutral-200 rounded w-32" />
          <div className="h-4 bg-neutral-200 rounded w-20" />
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-bold text-neutral-600 uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold text-black">{value}</p>

          {/* Trend indicator */}
          {calculatedTrend !== undefined && (
            <div className="flex items-center gap-1">
              <div
                className={cn(
                  'flex items-center gap-0.5 text-sm font-bold',
                  isPositive ? 'text-emerald-600' : trendDirection === 'neutral' ? 'text-neutral-600' : 'text-red-600'
                )}
              >
                <TrendIcon className="h-4 w-4" />
                <span>{Math.abs(calculatedTrend).toFixed(1)}%</span>
              </div>
              <span className="text-sm text-neutral-600">vs last period</span>
            </div>
          )}

          {subtitle && !calculatedTrend && (
            <p className="text-sm text-neutral-600">{subtitle}</p>
          )}
        </div>

        {Icon && (
          <div className={cn('p-3', iconBg)}>
            <Icon className={cn('h-6 w-6', iconColor)} />
          </div>
        )}
      </div>

      {action && (
        <button
          onClick={handleActionClick}
          className="mt-4 text-sm font-bold text-black hover:underline"
        >
          {action.label} →
        </button>
      )}
    </Card>
  );
};

function useMemo<T>(factory: () => T, deps: unknown[]): T {
  return React.useMemo(factory, deps);
}
