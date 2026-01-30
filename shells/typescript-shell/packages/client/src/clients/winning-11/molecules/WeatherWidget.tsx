/**
 * WeatherWidget
 *
 * Shows agricultural conditions affecting the relationship garden.
 * Adds immersion to garden metaphor, shows market conditions.
 *
 * Event Contract:
 * - Emits: UI:WEATHER_CLICK (optional) - when clicked for details
 * - Payload: { condition, forecast }
 */

import React, { useCallback } from "react";
import { cn } from "../../../lib/cn";
import { Card } from "../../../components/atoms/Card";
import { Box } from "../../../components/atoms/Box";
import { HStack, VStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { useEventBus } from "../../../hooks/useEventBus";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

export type MarketCondition = "sunny" | "cloudy" | "rainy" | "stormy";

export interface WeatherWidgetProps {
  /** Weather/market condition */
  condition?: MarketCondition;
  /** Brief forecast text */
  forecast?: string;
  /** Market trend indicator */
  trend?: "up" | "down" | "stable";
  /** Trend percentage */
  trendValue?: number;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Show detailed info */
  showDetails?: boolean;
  /** Temperature (metaphor for market heat) */
  temperature?: number;
  /** Market trend label */
  marketTrend?: "up" | "down" | "stable" | "volatile";
  /** Event to emit on click */
  event?: string;
  /** Click handler callback */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

const conditionConfig = {
  sunny: {
    icon: Sun,
    label: "Excellent Conditions",
    color: "text-amber-500",
    bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50",
    borderColor: "border-amber-200",
    description: "Great time for new partnerships",
  },
  cloudy: {
    icon: Cloud,
    label: "Mixed Conditions",
    color: "text-slate-500",
    bgColor: "bg-gradient-to-br from-slate-50 to-gray-50",
    borderColor: "border-slate-200",
    description: "Market is neutral",
  },
  rainy: {
    icon: CloudRain,
    label: "Challenging Conditions",
    color: "text-blue-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-slate-50",
    borderColor: "border-blue-200",
    description: "Focus on existing relationships",
  },
  stormy: {
    icon: CloudLightning,
    label: "Difficult Conditions",
    color: "text-purple-600",
    bgColor: "bg-gradient-to-br from-purple-50 to-slate-50",
    borderColor: "border-purple-200",
    description: "Market volatility - proceed carefully",
  },
};

const sizeConfig = {
  sm: {
    padding: "sm" as const,
    icon: "h-6 w-6",
    title: "text-sm",
    text: "text-xs",
  },
  md: {
    padding: "md" as const,
    icon: "h-8 w-8",
    title: "text-base",
    text: "text-sm",
  },
  lg: {
    padding: "lg" as const,
    icon: "h-10 w-10",
    title: "text-lg",
    text: "text-base",
  },
};

const TrendIcon = ({ trend }: { trend: "up" | "down" | "stable" }) => {
  const icons = { up: TrendingUp, down: TrendingDown, stable: Minus };
  const colors = {
    up: "text-emerald-500",
    down: "text-red-500",
    stable: "text-neutral-500",
  };
  const Icon = icons[trend];
  return <Icon className={cn("h-4 w-4", colors[trend])} />;
};

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  condition = "sunny",
  forecast,
  trend,
  trendValue,
  size = "md",
  showDetails = false,
  temperature,
  marketTrend,
  event,
  onClick,
  className,
}) => {
  const eventBus = useEventBus();
  const config = conditionConfig[condition];
  const sizes = sizeConfig[size];
  const Icon = config.icon;
  const isClickable = !!(event || onClick);

  // Normalize trend from marketTrend if provided
  const displayTrend =
    trend ?? (marketTrend === "volatile" ? "down" : marketTrend);

  // Handle click
  const handleClick = useCallback(() => {
    if (event) {
      eventBus.emit(`UI:${event}`, {
        condition,
        forecast,
        trend: displayTrend,
        trendValue,
      });
    }
    onClick?.();
  }, [event, eventBus, condition, forecast, displayTrend, trendValue, onClick]);

  return (
    <Card
      className={cn(
        "transition-all",
        config.bgColor,
        config.borderColor,
        isClickable && "cursor-pointer hover:shadow-md",
        className,
      )}
      padding={sizes.padding}
      onClick={isClickable ? handleClick : undefined}
    >
      <HStack gap="sm" align="start">
        {/* Weather icon */}
        <Box className="flex-shrink-0">
          <Icon className={cn(sizes.icon, config.color)} />
        </Box>

        {/* Content */}
        <VStack gap="xs" className="flex-1 min-w-0">
          <Typography
            variant="h4"
            className={cn(sizes.title, "text-neutral-800")}
          >
            {config.label}
          </Typography>
          <Typography
            variant="body"
            className={cn(sizes.text, "text-neutral-600")}
          >
            {forecast || config.description}
          </Typography>

          {/* Trend indicator */}
          {displayTrend && (
            <HStack gap="xs" align="center" className="mt-1">
              <TrendIcon trend={displayTrend} />
              {trendValue !== undefined && (
                <Typography
                  variant="small"
                  className={cn(
                    "font-medium",
                    displayTrend === "up" && "text-emerald-600",
                    displayTrend === "down" && "text-red-600",
                    displayTrend === "stable" && "text-neutral-600",
                  )}
                >
                  {displayTrend === "up"
                    ? "+"
                    : displayTrend === "down"
                      ? "-"
                      : ""}
                  {Math.abs(trendValue)}%
                </Typography>
              )}
            </HStack>
          )}

          {/* Extra details */}
          {showDetails && temperature !== undefined && (
            <Typography variant="small" className="text-neutral-500 mt-1">
              Market temperature: {temperature}°
            </Typography>
          )}
        </VStack>
      </HStack>
    </Card>
  );
};

WeatherWidget.displayName = "WeatherWidget";
