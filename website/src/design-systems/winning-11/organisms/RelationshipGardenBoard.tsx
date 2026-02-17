/**
 * RelationshipGardenBoard
 *
 * Organism containing all logic for the Relationship Garden view.
 * Wraps GardenView with search, layout toggle, and header controls.
 *
 * Event Contract:
 * - Emits: UI:{createEvent} - when create/plant button is clicked
 * - Emits: UI:{viewEvent} - when view action is clicked on an item
 * - Emits: UI:{searchEvent} - when search term changes
 * - Emits: UI:{filterEvent} - when filter button is clicked
 * - Emits: UI:{waterEvent} - when water action is triggered
 * - Payload: { row: GardenItem, entity: "RelationshipHealth" }
 */

import React from "react";
import { GardenView, type GardenItem } from "./GardenView";
import { type SeasonPhase } from "../atoms/SeasonIndicator";
import { Plus, Search, Filter, LayoutGrid, List } from "lucide-react";
import {
  cn,
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  Input,
  Spinner,
  useEventBus,
} from "@almadar/ui";

export interface RelationshipGardenBoardProps {
  /** Entity data (garden items) */
  entity?: readonly GardenItem[];
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Current season */
  season?: SeasonPhase;
  /** Season progress */
  seasonProgress?: number;
  /** Weather condition */
  weatherCondition?: "sunny" | "cloudy" | "rainy" | "stormy";
  /** Weather forecast */
  weatherForecast?: string;
  /** Page title */
  title?: string;
  /** Page subtitle */
  subtitle?: string;
  /** Show header */
  showHeader?: boolean;
  /** Show search */
  showSearch?: boolean;
  /** Show filters */
  showFilters?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Event name for creating a relationship */
  createEvent?: string;
  /** Event name for viewing a relationship */
  viewEvent?: string;
  /** Event name for search */
  searchEvent?: string;
  /** Event name for filter */
  filterEvent?: string;
  /** Event name for watering a relationship */
  waterEvent?: string;
}

export const RelationshipGardenBoard: React.FC<RelationshipGardenBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  season = "growing",
  seasonProgress = 50,
  weatherCondition = "sunny",
  weatherForecast,
  title = "My Garden",
  subtitle = "Nurture your relationships",
  showHeader = true,
  showSearch = true,
  showFilters = true,
  className,
  createEvent = "CREATE",
  viewEvent = "VIEW",
  searchEvent = "SEARCH",
  filterEvent = "FILTER",
  waterEvent = "WATER",
}) => {
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [layout, setLayout] = React.useState<"grid" | "rows">("grid");

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    eventBus.emit(`UI:${searchEvent}`, { searchTerm: value });
  };

  // Handle create
  const handleCreate = () => {
    eventBus.emit(`UI:${createEvent}`, { entity: "RelationshipHealth" });
  };

  // Handle filter
  const handleFilter = () => {
    eventBus.emit(`UI:${filterEvent}`, { entity: "RelationshipHealth" });
  };

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {/* Page Header */}
      {showHeader && (
        <HStack justify="between" align="center" wrap>
          <VStack gap="xs">
            <Typography variant="h1">{title}</Typography>
            <Typography variant="body" className="text-[var(--color-muted-foreground)]">
              {subtitle}
            </Typography>
          </VStack>

          <HStack gap="sm">
            <Button variant="primary" onClick={handleCreate} className="gap-2">
              <Plus className="h-4 w-4" />
              Plant New Seed
            </Button>
          </HStack>
        </HStack>
      )}

      {/* Toolbar */}
      {(showSearch || showFilters) && (
        <HStack justify="between" align="center" wrap gap="sm">
          {showSearch && (
            <Box className="w-full max-w-sm">
              <Input
                placeholder="Search relationships..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                leftIcon={<Search className="h-4 w-4 text-[var(--color-muted-foreground)]" />}
              />
            </Box>
          )}

          <HStack gap="sm">
            {showFilters && (
              <Button variant="secondary" onClick={handleFilter} className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            )}

            {/* Layout toggle */}
            <HStack gap="xs" className="border rounded-md p-1">
              <Button
                variant={layout === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setLayout("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={layout === "rows" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setLayout("rows")}
              >
                <List className="h-4 w-4" />
              </Button>
            </HStack>
          </HStack>
        </HStack>
      )}

      {/* Loading State */}
      {isLoading && (
        <VStack align="center" justify="center" className="py-12">
          <Spinner size="lg" />
          <Typography variant="body" className="text-[var(--color-muted-foreground)]">
            Loading your garden...
          </Typography>
        </VStack>
      )}

      {/* Error State */}
      {error && (
        <VStack align="center" justify="center" className="py-12">
          <Typography variant="body" className="text-red-500">
            Error: {error.message}
          </Typography>
        </VStack>
      )}

      {/* Garden View */}
      {!isLoading && !error && (
        <GardenView
          items={entity}
          layout={layout}
          season={season}
          seasonProgress={seasonProgress}
          weatherCondition={weatherCondition}
          weatherForecast={weatherForecast}
          showWeather
          showSeason
          emptyTitle="Your garden is empty"
          emptyDescription="Start building meaningful relationships by planting your first seed"
        />
      )}
    </VStack>
  );
};

RelationshipGardenBoard.displayName = "RelationshipGardenBoard";
