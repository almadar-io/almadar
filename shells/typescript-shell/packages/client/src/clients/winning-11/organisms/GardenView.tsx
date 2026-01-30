/**
 * GardenView
 *
 * Visual garden layout showing relationships as plants.
 * Core visualization for the garden metaphor - shows the user's "digital garden"
 * of trust relationships.
 *
 * Maps to RelationshipHealth entity collection.
 *
 * Event Contract:
 * - Emits: UI:SELECT - when an item is clicked
 * - Emits: UI:WATER - when water action is triggered
 * - Emits: UI:VIEW - when view action is triggered
 * - Emits: UI:CREATE - when create action is triggered (empty state)
 * - Listens: UI:SEARCH - filters items by search term
 * - Listens: UI:FILTER - applies filter to items
 * - Payload: { row: RelationshipHealthData, entity }
 */

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { cn } from "../../../lib/cn";
import { useEventBus } from "../../../hooks/useEventBus";
import { useQuerySingleton } from "../../../hooks/useQuerySingleton";
import {
  PlantCard,
  type PlantCardData,
  type PlantCardAction,
} from "../molecules/PlantCard";
import { WeatherWidget } from "../molecules/WeatherWidget";
import { SeasonIndicator } from "../atoms/SeasonIndicator";
import { Button } from "../../../components/atoms/Button";
import { Spinner } from "../../../components/atoms/Spinner";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Plus, Sprout } from "lucide-react";

/**
 * GardenItem extends PlantCardData with required id
 * Maps to RelationshipHealth entity
 */
export interface GardenItem extends PlantCardData {
  /** Unique identifier (required) */
  id: string;
}

export type GardenLayoutStyle = "grid" | "organic" | "rows";

/** Re-export for convenience */
export type { RelationshipHealthEntity } from "../molecules/PlantCard";

export interface GardenViewProps {
  /** Array of RelationshipHealth items to display */
  items?: readonly GardenItem[];
  /** Data prop alias for items (for pattern compatibility) */
  data?: readonly GardenItem[];
  /** Entity type for event context */
  entity?: string;
  /** Layout style */
  layout?: GardenLayoutStyle;
  /** Show weather widget */
  showWeather?: boolean;
  /** Weather condition */
  weatherCondition?: "sunny" | "cloudy" | "rainy" | "stormy";
  /** Weather forecast text */
  weatherForecast?: string;
  /** Market trend */
  weatherTrend?: "up" | "down" | "stable";
  /** Show season indicator */
  showSeason?: boolean;
  /** Current season */
  season?: "planting" | "growing" | "harvest" | "rest";
  /** Season progress */
  seasonProgress?: number;
  /** Item actions */
  itemActions?: readonly PlantCardAction[];
  /** Event to emit on item click */
  event?: string;
  /** Item selection handler */
  onItemClick?: (item: GardenItem) => void;
  /** Content to show when garden is empty */
  emptyState?: React.ReactNode;
  /** Empty state title */
  emptyTitle?: string;
  /** Empty state description */
  emptyDescription?: string;
  /** Show create button in empty state */
  showCreateAction?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Query singleton binding for filter/sort state */
  query?: string;
  /** Additional CSS classes */
  className?: string;
}

const layoutStyles: Record<GardenLayoutStyle, string> = {
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
  organic: "flex flex-wrap gap-4 justify-center",
  rows: "flex flex-col gap-3",
};

export const GardenView: React.FC<GardenViewProps> = ({
  items: propItems,
  data,
  entity = "RelationshipHealth",
  layout = "grid",
  showWeather = true,
  weatherCondition = "sunny",
  weatherForecast,
  weatherTrend,
  showSeason = true,
  season = "growing",
  seasonProgress = 50,
  itemActions = [],
  event,
  onItemClick,
  emptyState,
  emptyTitle = "Your garden is empty",
  emptyDescription = "Start building relationships to grow your network",
  showCreateAction = true,
  isLoading = false,
  error = null,
  query,
  className,
}) => {
  const eventBus = useEventBus();
  const queryState = useQuerySingleton(query);

  // Use items or data prop
  const rawItems = propItems ?? data ?? [];

  // Local search state (if not using query singleton)
  const [localSearch, setLocalSearch] = useState("");

  // Listen for search events if not using query singleton
  useEffect(() => {
    if (query) return; // Using query singleton instead

    const handleSearch = (event: { payload?: { searchTerm?: string } }) => {
      setLocalSearch(event.payload?.searchTerm ?? "");
    };

    const handleClearSearch = () => {
      setLocalSearch("");
    };

    const unsubSearch = eventBus.on("UI:SEARCH", handleSearch);
    const unsubClear = eventBus.on("UI:CLEAR_SEARCH", handleClearSearch);

    return () => {
      unsubSearch();
      unsubClear();
    };
  }, [eventBus, query]);

  // Get search term from query singleton or local state
  const searchTerm = queryState?.search ?? localSearch;

  // Filter items based on search
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return rawItems;

    const lowerSearch = searchTerm.toLowerCase();
    return rawItems.filter((item) => {
      return (
        item.name?.toLowerCase().includes(lowerSearch) ||
        item.category?.toLowerCase().includes(lowerSearch) ||
        item.healthStatus?.toLowerCase().includes(lowerSearch) ||
        item.visualMetaphor?.toLowerCase().includes(lowerSearch)
      );
    });
  }, [rawItems, searchTerm]);

  // Handle item click
  const handleItemClick = useCallback(
    (item: GardenItem) => {
      if (event) {
        eventBus.emit(`UI:${event}`, { row: item, entity });
      } else if (onItemClick) {
        onItemClick(item);
      } else {
        eventBus.emit("UI:SELECT", { row: item, entity });
      }
    },
    [event, eventBus, entity, onItemClick],
  );

  // Handle create action
  const handleCreate = useCallback(() => {
    eventBus.emit("UI:CREATE", { entity });
  }, [eventBus, entity]);

  // Calculate garden stats
  const gardenStats = useMemo(() => {
    const items = filteredItems as GardenItem[];
    const thriving = items.filter((i) => i.healthStatus === "thriving").length;
    const healthy = items.filter((i) => i.healthStatus === "healthy").length;
    const needsAttention = items.filter(
      (i) => i.healthStatus === "declining" || i.healthStatus === "withering",
    ).length;
    return { thriving, healthy, needsAttention, total: items.length };
  }, [filteredItems]);

  // Loading state
  if (isLoading) {
    return (
      <VStack
        align="center"
        justify="center"
        gap="md"
        className={cn("py-12", className)}
      >
        <Spinner size="lg" />
        <Typography variant="body" className="text-neutral-500">
          Loading your garden...
        </Typography>
      </VStack>
    );
  }

  // Error state
  if (error) {
    return (
      <VStack
        align="center"
        justify="center"
        gap="md"
        className={cn("py-12", className)}
      >
        <Typography variant="body" className="text-red-500">
          Error loading garden: {error.message}
        </Typography>
      </VStack>
    );
  }

  // Empty state
  if (filteredItems.length === 0) {
    if (emptyState) {
      return <Box className={className}>{emptyState}</Box>;
    }

    return (
      <VStack
        align="center"
        justify="center"
        gap="md"
        className={cn("py-12 text-center", className)}
      >
        <Box bg="muted" rounded="full" padding="md">
          <Sprout className="h-12 w-12 text-lime-500" />
        </Box>
        <Typography variant="h4" className="text-neutral-800">
          {emptyTitle}
        </Typography>
        <Typography variant="body" className="max-w-sm text-neutral-500">
          {emptyDescription}
        </Typography>
        {showCreateAction && (
          <Button
            variant="primary"
            className="mt-4 gap-2"
            onClick={handleCreate}
          >
            <Plus className="h-4 w-4" />
            Plant Your First Seed
          </Button>
        )}
      </VStack>
    );
  }

  return (
    <VStack gap="md" className={className}>
      {/* Header with weather and season */}
      {(showWeather || showSeason) && (
        <HStack wrap justify="between" align="center" gap="sm">
          {showSeason && (
            <SeasonIndicator
              season={season}
              progress={seasonProgress}
              size="md"
            />
          )}
          {showWeather && (
            <WeatherWidget
              condition={weatherCondition}
              forecast={weatherForecast}
              trend={weatherTrend}
              size="sm"
            />
          )}
        </HStack>
      )}

      {/* Garden grid */}
      <Box className={layoutStyles[layout]}>
        {filteredItems.map((item) => (
          <PlantCard
            key={item.id}
            data={item}
            entity={entity}
            itemActions={itemActions}
            onClick={() => handleItemClick(item)}
            className={layout === "organic" ? "w-64" : undefined}
          />
        ))}
      </Box>

      {/* Summary footer */}
      <HStack wrap align="center" gap="md" className="mt-2">
        <Typography variant="small" className="text-neutral-500">
          {gardenStats.total} relationship{gardenStats.total !== 1 ? "s" : ""}{" "}
          in your garden
        </Typography>
        {gardenStats.thriving > 0 && (
          <Typography variant="small" className="text-blue-600">
            {gardenStats.thriving} thriving
          </Typography>
        )}
        {gardenStats.healthy > 0 && (
          <Typography variant="small" className="text-emerald-600">
            {gardenStats.healthy} healthy
          </Typography>
        )}
        {gardenStats.needsAttention > 0 && (
          <Typography variant="small" className="text-amber-600">
            {gardenStats.needsAttention} need attention
          </Typography>
        )}
        {searchTerm && (
          <Typography variant="small" className="text-neutral-400">
            (filtered from {rawItems.length})
          </Typography>
        )}
      </HStack>
    </VStack>
  );
};

GardenView.displayName = "GardenView";
