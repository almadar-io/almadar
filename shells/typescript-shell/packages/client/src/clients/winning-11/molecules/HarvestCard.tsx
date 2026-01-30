/**
 * HarvestCard
 *
 * Card showing a completed transaction/successful outcome.
 * Celebrates successful farmer-buyer transactions.
 *
 * Event Contract:
 * - Emits: UI:VIEW (optional) - when card is clicked
 * - Emits: UI:SELECT (optional) - when selected
 * - Payload: { row: HarvestData, entity }
 */

import React, { useCallback } from "react";
import { cn } from "../../../lib/cn";
import { Card } from "../../../components/atoms/Card";
import { Badge } from "../../../components/atoms/Badge";
import { Button } from "../../../components/atoms/Button";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { useEventBus } from "../../../hooks/useEventBus";
import { Wheat, CheckCircle2, Calendar, Users } from "lucide-react";

export interface HarvestCardAction {
  /** Action button label */
  label: string;
  /** Event to dispatch on click */
  event?: string;
  /** Callback on click */
  onClick?: (item: HarvestEntity) => void;
  /** Button variant */
  variant?: "primary" | "secondary" | "ghost" | "danger";
}

export interface HarvestEntity {
  /** Unique identifier */
  id?: string;
  /** Harvest/transaction title */
  title: string;
  /** Transaction amount */
  amount?: number;
  /** Currency symbol */
  currency?: string;
  /** Completion date */
  date?: Date | string;
  /** Transaction parties */
  parties?: { farmer: string; buyer: string };
  /** Status */
  status?: "completed" | "pending";
  /** Crop type */
  crop?: string;
  /** Quantity */
  quantity?: string;
  /** Additional data fields */
  [key: string]: unknown;
}

export interface HarvestCardProps {
  /** Harvest data - can be individual props or a data object */
  entity?: HarvestEntity;
  /** Alias for entity prop */
  data?: HarvestEntity;
  /** Harvest/transaction title (if not using data prop) */
  title?: string;
  /** Transaction amount (if not using data prop) */
  amount?: number;
  /** Currency symbol */
  currency?: string;
  /** Completion date (if not using data prop) */
  date?: Date | string;
  /** Transaction parties (if not using data prop) */
  parties?: { farmer: string; buyer: string };
  /** Entity type for event context */
  entityType?: string;
  /** Actions for this card */
  itemActions?: readonly HarvestCardAction[];
  /** Event to emit on card click */
  event?: string;
  /** Click handler callback */
  onClick?: (item: HarvestEntity) => void;
  /** Compact display mode */
  compact?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const formatDate = (date: Date | string | undefined): string => {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatAmount = (
  amount: number | undefined,
  currency: string = "$",
): string => {
  if (amount === undefined) return "";
  return `${currency}${amount.toLocaleString()}`;
};

export const HarvestCard: React.FC<HarvestCardProps> = ({
  entity,
  data,
  title: propTitle,
  amount: propAmount,
  currency = "$",
  date: propDate,
  parties: propParties,
  entityType = "Harvest",
  itemActions = [],
  event,
  onClick,
  compact = false,
  className,
}) => {
  const eventBus = useEventBus();

  // Normalize data
  const harvestData: HarvestEntity = entity ??
    data ?? {
      title: propTitle ?? "Harvest",
      amount: propAmount,
      currency,
      date: propDate,
      parties: propParties,
    };

  const { title, amount, date, parties, status = "completed" } = harvestData;
  const isClickable = !!(event || onClick);
  const isPending = status === "pending";

  // Handle card click
  const handleCardClick = useCallback(() => {
    if (event) {
      eventBus.emit(`UI:${event}`, { row: harvestData, entity: entityType });
    } else if (onClick) {
      onClick(harvestData);
    } else {
      eventBus.emit("UI:VIEW", { row: harvestData, entity: entityType });
    }
  }, [event, eventBus, harvestData, entityType, onClick]);

  // Handle action click
  const handleActionClick = useCallback(
    (action: HarvestCardAction) => (e: React.MouseEvent) => {
      e.stopPropagation();
      if (action.event) {
        eventBus.emit(`UI:${action.event}`, {
          row: harvestData,
          entity: entityType,
        });
      }
      action.onClick?.(harvestData);
    },
    [eventBus, harvestData, entityType],
  );

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all",
        compact ? "p-3" : "p-4",
        "bg-gradient-to-br from-amber-50 to-orange-50",
        "border-amber-200",
        isClickable && "cursor-pointer hover:shadow-lg hover:scale-[1.02]",
        className,
      )}
      onClick={isClickable ? handleCardClick : undefined}
    >
      {/* Status badge */}
      <Box position="absolute" className="right-2 top-2">
        <Badge
          variant={isPending ? "warning" : "success"}
          size="sm"
          className="gap-1"
        >
          <CheckCircle2 className="h-3 w-3" />
          {isPending ? "Pending" : "Completed"}
        </Badge>
      </Box>

      <VStack gap="sm">
        {/* Header with harvest icon */}
        <HStack gap="sm" align="center">
          <Box
            rounded="full"
            padding="sm"
            className="bg-gradient-to-br from-amber-200 to-orange-200"
          >
            <Wheat className="h-6 w-6 text-amber-700" />
          </Box>
          <VStack gap="none">
            <Typography variant="h4" className="text-neutral-800">
              {title}
            </Typography>
            {amount !== undefined && (
              <Typography variant="h3" className="text-emerald-600">
                {formatAmount(amount, currency)}
              </Typography>
            )}
          </VStack>
        </HStack>

        {/* Details */}
        {!compact && (
          <VStack gap="xs">
            {date && (
              <HStack gap="sm" align="center">
                <Calendar className="h-4 w-4 text-neutral-500" />
                <Typography variant="body" className="text-neutral-600">
                  {formatDate(date)}
                </Typography>
              </HStack>
            )}

            {parties && (
              <HStack gap="sm" align="center">
                <Users className="h-4 w-4 text-neutral-500" />
                <Typography variant="body" className="text-neutral-600">
                  {parties.farmer} → {parties.buyer}
                </Typography>
              </HStack>
            )}
          </VStack>
        )}

        {/* Item Actions */}
        {itemActions.length > 0 && (
          <HStack gap="sm" className="border-t border-amber-200 pt-3">
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

HarvestCard.displayName = "HarvestCard";
