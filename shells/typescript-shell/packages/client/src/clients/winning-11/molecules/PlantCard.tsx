/**
 * PlantCard
 *
 * Card displaying a relationship as a plant with health/growth status.
 * Represents connections in the relationship garden.
 *
 * Maps to RelationshipHealth entity:
 * - visualMetaphor: seedling | sprout | sapling | tree | flowering
 * - healthStatus: thriving | healthy | declining | withering
 * - leafColor: vibrant-green | green | yellow | brown
 * - growthPoints: number
 * - lastWateredAt: timestamp
 * - nextOutreachDue: date
 *
 * Event Contract:
 * - Emits: UI:SELECT - when card is clicked
 * - Emits: UI:WATER - when water action is triggered
 * - Emits: UI:VIEW - when view action is triggered
 * - Payload: { row: RelationshipHealthData, entity }
 */

import React, { useCallback } from "react";
import { cn } from "../../../lib/cn";
import { Card } from "../../../components/atoms/Card";
import { Badge } from "../../../components/atoms/Badge";
import { Button } from "../../../components/atoms/Button";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { GrowthMeter, type VisualMetaphor } from "../atoms/GrowthMeter";
import { TrustMeter, type HealthStatus } from "../atoms/TrustMeter";
import { CareIndicator } from "../atoms/CareIndicator";
import { useEventBus } from "../../../hooks/useEventBus";
import {
  Sprout,
  Leaf,
  TreeDeciduous,
  Flower2,
  AlertCircle,
  Droplets,
} from "lucide-react";

/** Leaf color values from RelationshipHealth entity */
export type LeafColor = "vibrant-green" | "green" | "yellow" | "brown";

/** Re-export entity type for convenience */
export interface RelationshipHealthEntity {
  id: string;
  connectionId?: string;
  healthStatus: HealthStatus;
  visualMetaphor: VisualMetaphor;
  leafColor: LeafColor;
  growthPoints: number;
  lastWateredAt?: string | Date;
  nextOutreachDue?: string | Date;
  outreachCycleDays?: number;
  wateringCount?: number;
  missedOutreachCount?: number;
  name?: string;
  category?: string;
}

export interface PlantCardAction {
  /** Action button label */
  label: string;
  /** Event to dispatch on click */
  event?: string;
  /** Navigation URL - supports template interpolation like "/plants/{{row.id}}" */
  navigatesTo?: string;
  /** Callback on click */
  onClick?: (item: PlantCardData) => void;
  /** Button variant */
  variant?: "primary" | "secondary" | "ghost" | "danger";
}

/**
 * PlantCard data matching RelationshipHealth entity structure
 */
export interface PlantCardData {
  /** Unique identifier */
  id?: string;
  /** Connection ID reference */
  connectionId?: string;
  /** Health status from schema */
  healthStatus?: HealthStatus;
  /** Visual metaphor from schema */
  visualMetaphor?: VisualMetaphor;
  /** Leaf color from schema */
  leafColor?: LeafColor;
  /** Growth points from schema */
  growthPoints?: number;
  /** Last watered timestamp */
  lastWateredAt?: string | Date;
  /** Next outreach due date */
  nextOutreachDue?: string | Date;
  /** Outreach cycle days */
  outreachCycleDays?: number;
  /** Watering count */
  wateringCount?: number;
  /** Missed outreach count */
  missedOutreachCount?: number;
  /** Display name for the relationship */
  name?: string;
  /** Category/type of relationship */
  category?: string;
  /** Additional data fields */
  [key: string]: unknown;
}

export interface PlantCardProps {
  /** Plant data - RelationshipHealth entity data */
  data?: PlantCardData;
  /** Relationship ID */
  id?: string;
  /** Display name */
  name?: string;
  /** Category */
  category?: string;
  /** Health status */
  healthStatus?: HealthStatus;
  /** Visual metaphor */
  visualMetaphor?: VisualMetaphor;
  /** Leaf color */
  leafColor?: LeafColor;
  /** Growth points */
  growthPoints?: number;
  /** Last watered timestamp */
  lastWateredAt?: string | Date;
  /** Next outreach due date */
  nextOutreachDue?: string | Date;
  /** Missed outreach count */
  missedOutreachCount?: number;
  /** Entity type for event context */
  entity?: string;
  /** Actions for this card */
  itemActions?: readonly PlantCardAction[];
  /** Event to emit on card click */
  event?: string;
  /** Click handler callback */
  onClick?: (item: PlantCardData) => void;
  /** Additional CSS classes */
  className?: string;
}

// Map leafColor to visual styling
const leafColorStyles: Record<LeafColor, string> = {
  "vibrant-green": "text-emerald-500",
  green: "text-lime-500",
  yellow: "text-amber-500",
  brown: "text-orange-700",
};

// Get plant icon based on visualMetaphor
const getPlantIcon = (metaphor?: VisualMetaphor) => {
  switch (metaphor) {
    case "seedling":
      return Sprout;
    case "sprout":
      return Leaf;
    case "sapling":
    case "tree":
      return TreeDeciduous;
    case "flowering":
      return Flower2;
    default:
      return Sprout;
  }
};

// Check if outreach is overdue
const isOutreachOverdue = (nextOutreachDue?: string | Date): boolean => {
  if (!nextOutreachDue) return false;
  const dueDate = new Date(nextOutreachDue);
  return dueDate < new Date();
};

// Format date for display
const formatDate = (date?: string | Date): string => {
  if (!date) return "";
  const d = new Date(date);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return d.toLocaleDateString();
};

export const PlantCard: React.FC<PlantCardProps> = ({
  data,
  id: propId,
  name: propName,
  category: propCategory,
  healthStatus: propHealthStatus,
  visualMetaphor: propVisualMetaphor,
  leafColor: propLeafColor,
  growthPoints: propGrowthPoints,
  lastWateredAt: propLastWateredAt,
  nextOutreachDue: propNextOutreachDue,
  missedOutreachCount: propMissedOutreachCount,
  entity = "RelationshipHealth",
  itemActions = [],
  event,
  onClick,
  className,
}) => {
  const eventBus = useEventBus();

  // Normalize data - support both data prop and individual props
  const plantData: PlantCardData = data ?? {
    id: propId,
    name: propName,
    category: propCategory,
    healthStatus: propHealthStatus,
    visualMetaphor: propVisualMetaphor,
    leafColor: propLeafColor,
    growthPoints: propGrowthPoints,
    lastWateredAt: propLastWateredAt,
    nextOutreachDue: propNextOutreachDue,
    missedOutreachCount: propMissedOutreachCount,
  };

  const {
    name = "Relationship",
    category,
    healthStatus = "healthy",
    visualMetaphor = "seedling",
    leafColor = "green",
    growthPoints = 0,
    lastWateredAt,
    nextOutreachDue,
    missedOutreachCount = 0,
  } = plantData;

  const PlantIcon = getPlantIcon(visualMetaphor);
  const iconColor = leafColorStyles[leafColor];
  const needsAttention =
    healthStatus === "withering" ||
    healthStatus === "declining" ||
    isOutreachOverdue(nextOutreachDue);
  const isClickable = !!(event || onClick);

  // Handle card click - emit SELECT event
  const handleCardClick = useCallback(() => {
    if (event) {
      eventBus.emit(`UI:${event}`, { row: plantData, entity });
    } else if (onClick) {
      onClick(plantData);
    } else {
      eventBus.emit("UI:SELECT", { row: plantData, entity });
    }
  }, [event, eventBus, plantData, entity, onClick]);

  // Handle action click
  const handleActionClick = useCallback(
    (action: PlantCardAction) => (e: React.MouseEvent) => {
      e.stopPropagation();

      if (action.event) {
        eventBus.emit(`UI:${action.event}`, { row: plantData, entity });
      }
      if (action.onClick) {
        action.onClick(plantData);
      }
    },
    [eventBus, plantData, entity],
  );

  // Handle water action
  const handleWater = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      eventBus.emit("UI:WATER", { row: plantData, entity });
    },
    [eventBus, plantData, entity],
  );

  return (
    <Card
      className={cn(
        "relative p-4 transition-all",
        needsAttention && "ring-2 ring-amber-400",
        isClickable && "cursor-pointer hover:shadow-lg hover:scale-[1.02]",
        className,
      )}
      onClick={isClickable ? handleCardClick : undefined}
    >
      {/* Attention indicator */}
      {needsAttention && (
        <Box position="absolute" className="-right-1 -top-1">
          <Box
            display="flex"
            rounded="full"
            className="h-4 w-4 items-center justify-center bg-amber-400"
          >
            <AlertCircle className="h-3 w-3 text-white" />
          </Box>
        </Box>
      )}

      <VStack gap="sm">
        {/* Header with plant icon and name */}
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            <Box
              rounded="full"
              padding="sm"
              className="bg-gradient-to-br from-lime-100 to-emerald-100"
            >
              <PlantIcon className={cn("h-6 w-6", iconColor)} />
            </Box>
            <VStack gap="none">
              <Typography variant="h4" className="text-neutral-800">
                {name}
              </Typography>
              {category && (
                <Badge variant="secondary" size="sm">
                  {category}
                </Badge>
              )}
            </VStack>
          </HStack>

          {/* Quick water button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleWater}
            className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
            title="Water this relationship"
          >
            <Droplets className="h-4 w-4" />
          </Button>
        </HStack>

        {/* Growth meter */}
        <GrowthMeter
          visualMetaphor={visualMetaphor}
          growthPoints={growthPoints}
          size="sm"
          showStageLabel={false}
        />

        {/* Health status */}
        <TrustMeter
          healthStatus={healthStatus}
          growthPoints={growthPoints}
          size="sm"
          showLabel={false}
        />

        {/* Care indicators */}
        {(missedOutreachCount > 0 || isOutreachOverdue(nextOutreachDue)) && (
          <HStack
            gap="xs"
            align="center"
            className="border-t border-neutral-100 pt-3"
          >
            <Typography variant="small" className="text-neutral-500">
              Needs:
            </Typography>
            {missedOutreachCount > 0 && (
              <CareIndicator
                type="communication"
                urgency={missedOutreachCount > 2 ? "high" : "medium"}
                tooltip={`${missedOutreachCount} missed outreach${missedOutreachCount > 1 ? "es" : ""}`}
                size="sm"
              />
            )}
            {isOutreachOverdue(nextOutreachDue) && (
              <CareIndicator
                type="feedback"
                urgency="medium"
                tooltip="Outreach overdue"
                size="sm"
              />
            )}
          </HStack>
        )}

        {/* Last watered */}
        {lastWateredAt && (
          <Typography variant="small" className="text-neutral-400">
            Last watered: {formatDate(lastWateredAt)}
          </Typography>
        )}

        {/* Item Actions */}
        {itemActions.length > 0 && (
          <HStack gap="sm" className="border-t border-neutral-100 pt-3">
            {itemActions.map((action, idx) => (
              <Button
                key={idx}
                variant={action.variant ?? "secondary"}
                size="sm"
                onClick={handleActionClick(action)}
              >
                {action.label}
              </Button>
            ))}
          </HStack>
        )}
      </VStack>
    </Card>
  );
};

PlantCard.displayName = "PlantCard";
