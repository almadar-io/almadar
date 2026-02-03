/**
 * ProgressChart
 *
 * Visual chart showing progress over time for a metric.
 * Visual progress is motivating for trainees.
 *
 * Event Contract:
 * - Emits: UI:DATE_RANGE_CHANGE - when date range filter changes
 * - Payload: { metric, dateRange, entity }
 */

import React, { useCallback, useMemo, useState } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { HStack, VStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { Badge } from "../../../components/atoms/Badge";
import { useEventBus } from "../../../hooks/useEventBus";
import { TrendingUp, TrendingDown, Minus, Calendar } from "lucide-react";

export interface ChartDataPoint {
  date: string | Date;
  value: number;
  label?: string;
}

/** Operation definition for action buttons */
export interface ProgressOperation {
  label: string;
  event?: string;
  action?: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

export interface ProgressChartProps {
  /** Data points to plot */
  data?: ChartDataPoint[] | unknown;
  /** Metric being tracked */
  metric?: string;
  /** Multiple metrics to track */
  metrics?: string[];
  /** Unit for the metric (e.g., "kg", "reps") */
  unit?: string;
  /** Chart type */
  chartType?: "line" | "bar";
  /** Date range to display */
  dateRange?: "week" | "month" | "3months" | "year" | string;
  /** Time range alias */
  timeRange?: "week" | "month" | "3months" | "year" | string;
  /** Show date range selector */
  showDateSelector?: boolean;
  /** Show milestones */
  showMilestones?: boolean;
  /** Show trends */
  showTrends?: boolean;
  /** Entity context for events */
  entity?: string;
  /** Operations/actions available */
  operations?: ProgressOperation[];
  /** Additional CSS classes */
  className?: string;
}

type DateRange = "week" | "month" | "3months" | "year";

const dateRangeOptions: { value: DateRange; label: string }[] = [
  { value: "week", label: "1W" },
  { value: "month", label: "1M" },
  { value: "3months", label: "3M" },
  { value: "year", label: "1Y" },
];

export const ProgressChart: React.FC<ProgressChartProps> = ({
  data,
  metric,
  unit = "",
  chartType = "line",
  dateRange = "month",
  showDateSelector = true,
  entity = "ProgressEntry",
  className,
}) => {
  const eventBus = useEventBus();
  const [selectedRange, setSelectedRange] = useState<DateRange>(
    (dateRange as DateRange) || "month",
  );

  // Normalize data to array
  const chartData: ChartDataPoint[] = Array.isArray(data)
    ? (data as ChartDataPoint[])
    : [];

  // Filter data based on selected range
  const filteredData = useMemo(() => {
    const now = new Date();
    const cutoffDate = new Date();

    switch (selectedRange) {
      case "week":
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case "month":
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case "3months":
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      case "year":
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    return chartData
      .filter((point: ChartDataPoint) => new Date(point.date) >= cutoffDate)
      .sort(
        (a: ChartDataPoint, b: ChartDataPoint) =>
          new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
  }, [chartData, selectedRange]);

  // Calculate stats
  const stats = useMemo(() => {
    if (filteredData.length === 0) {
      return { current: 0, min: 0, max: 0, avg: 0, trend: 0 };
    }

    const values = filteredData.map((d: ChartDataPoint) => d.value);
    const current = values[values.length - 1];
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;

    // Calculate trend (compare first half to second half)
    let trend = 0;
    if (values.length >= 2) {
      const firstValue = values[0];
      const lastValue = values[values.length - 1];
      trend = ((lastValue - firstValue) / firstValue) * 100;
    }

    return { current, min, max, avg, trend };
  }, [filteredData]);

  // Handle date range change
  const handleRangeChange = useCallback(
    (range: DateRange) => {
      setSelectedRange(range);
      eventBus.emit("UI:DATE_RANGE_CHANGE", {
        metric,
        dateRange: range,
        entity,
      });
    },
    [eventBus, metric, entity],
  );

  // Calculate chart dimensions
  const chartHeight = 120;
  const chartWidth = 100; // percentage

  // Generate chart points
  const chartPoints = useMemo(() => {
    if (filteredData.length === 0) return [];

    const { min, max } = stats;
    const range = max - min || 1;

    return filteredData.map((point: ChartDataPoint, index: number) => {
      const x = (index / (filteredData.length - 1 || 1)) * 100;
      const y = ((point.value - min) / range) * chartHeight;
      return { x, y, ...point };
    });
  }, [filteredData, stats, chartHeight]);

  // Generate SVG path for line chart
  const linePath = useMemo(() => {
    if (chartPoints.length === 0) return "";

    return chartPoints
      .map((point: { x: number; y: number }, index: number) => {
        const cmd = index === 0 ? "M" : "L";
        return `${cmd} ${point.x} ${chartHeight - point.y}`;
      })
      .join(" ");
  }, [chartPoints, chartHeight]);

  return (
    <Card className={cn("p-4", className)}>
      <VStack gap="md">
        {/* Header */}
        <HStack justify="between" align="center">
          <VStack gap="none">
            <Typography variant="h4">{metric}</Typography>
            <HStack gap="xs" align="center">
              <Typography variant="h3" className="font-bold">
                {stats.current.toFixed(1)}
              </Typography>
              {unit && (
                <Typography variant="body" className="text-neutral-500">
                  {unit}
                </Typography>
              )}
              {stats.trend !== 0 && (
                <Badge
                  variant={
                    stats.trend > 0
                      ? "success"
                      : stats.trend < 0
                        ? "danger"
                        : "default"
                  }
                  size="sm"
                >
                  {stats.trend > 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : stats.trend < 0 ? (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  ) : (
                    <Minus className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(stats.trend).toFixed(1)}%
                </Badge>
              )}
            </HStack>
          </VStack>

          {/* Date Range Selector */}
          {showDateSelector && (
            <HStack gap="xs">
              {dateRangeOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={selectedRange === option.value ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => handleRangeChange(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </HStack>
          )}
        </HStack>

        {/* Chart */}
        <Box className="relative" style={{ height: chartHeight + 20 }}>
          {filteredData.length > 0 ? (
            <svg
              viewBox={`0 0 100 ${chartHeight}`}
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              {/* Grid lines */}
              <line
                x1="0"
                y1={chartHeight * 0.25}
                x2="100"
                y2={chartHeight * 0.25}
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
              <line
                x1="0"
                y1={chartHeight * 0.5}
                x2="100"
                y2={chartHeight * 0.5}
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
              <line
                x1="0"
                y1={chartHeight * 0.75}
                x2="100"
                y2={chartHeight * 0.75}
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />

              {chartType === "line" ? (
                <>
                  {/* Area fill */}
                  <path
                    d={`${linePath} L 100 ${chartHeight} L 0 ${chartHeight} Z`}
                    fill="url(#gradient)"
                    opacity="0.2"
                  />
                  {/* Line */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                  {/* Points */}
                  {chartPoints.map(
                    (point: { x: number; y: number }, index: number) => (
                      <circle
                        key={index}
                        cx={point.x}
                        cy={chartHeight - point.y}
                        r="3"
                        fill="#2563eb"
                        vectorEffect="non-scaling-stroke"
                      />
                    ),
                  )}
                </>
              ) : (
                // Bar chart
                chartPoints.map(
                  (point: { x: number; y: number }, index: number) => {
                    const barWidth = 100 / chartPoints.length - 2;
                    return (
                      <rect
                        key={index}
                        x={point.x - barWidth / 2}
                        y={chartHeight - point.y}
                        width={barWidth}
                        height={point.y}
                        fill="#2563eb"
                        rx="2"
                      />
                    );
                  },
                )
              )}

              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            <Box className="h-full flex items-center justify-center text-neutral-400">
              <Typography variant="body">No data for this period</Typography>
            </Box>
          )}
        </Box>

        {/* Stats Row */}
        <HStack justify="between" className="border-t border-neutral-100 pt-3">
          <VStack gap="none" align="center">
            <Typography variant="small" className="text-neutral-500">
              Min
            </Typography>
            <Typography variant="body" className="font-medium">
              {stats.min.toFixed(1)} {unit}
            </Typography>
          </VStack>
          <VStack gap="none" align="center">
            <Typography variant="small" className="text-neutral-500">
              Avg
            </Typography>
            <Typography variant="body" className="font-medium">
              {stats.avg.toFixed(1)} {unit}
            </Typography>
          </VStack>
          <VStack gap="none" align="center">
            <Typography variant="small" className="text-neutral-500">
              Max
            </Typography>
            <Typography variant="body" className="font-medium">
              {stats.max.toFixed(1)} {unit}
            </Typography>
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};

ProgressChart.displayName = "ProgressChart";
