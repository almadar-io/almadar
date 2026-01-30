/**
 * RelationshipGardenTemplate
 *
 * Template for the Relationship Garden page (/garden).
 * Displays RelationshipHealth entities as a visual garden with plants.
 *
 * This is the core visualization for the winning-11 app - the "digital garden"
 * of trust relationships.
 *
 * Page: RelationshipGardenPage
 * Entity: RelationshipHealth
 * ViewType: list
 */

import React from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Input } from "../../../components/atoms/Input";
import { Spinner } from "../../../components/atoms/Spinner";
import { GardenView, type GardenItem } from "../organisms/GardenView";
import { SeasonIndicator, type SeasonPhase } from "../atoms/SeasonIndicator";
import { useEventBus } from "../../../hooks/useEventBus";
import { Plus, Search, Filter, LayoutGrid, List } from "lucide-react";

export interface RelationshipGardenTemplateProps {
  /** Relationship health items to display */
  items?: readonly GardenItem[];
  /** Data prop alias */
  data?: readonly GardenItem[];
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
}

export const RelationshipGardenTemplate: React.FC<RelationshipGardenTemplateProps> = ({
  items,
  data,
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
}) => {
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [layout, setLayout] = React.useState<"grid" | "rows">("grid");

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    eventBus.emit("UI:SEARCH", { searchTerm: value });
  };

  // Handle create
  const handleCreate = () => {
    eventBus.emit("UI:CREATE", { entity: "RelationshipHealth" });
  };

  // Handle filter
  const handleFilter = () => {
    eventBus.emit("UI:FILTER", { entity: "RelationshipHealth" });
  };

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {/* Page Header */}
      {showHeader && (
        <HStack justify="between" align="center" wrap>
          <VStack gap="xs">
            <Typography variant="h1">{title}</Typography>
            <Typography variant="body" className="text-neutral-500">
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
                leftIcon={<Search className="h-4 w-4 text-neutral-400" />}
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
          <Typography variant="body" className="text-neutral-500">
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
          items={items}
          data={data}
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

RelationshipGardenTemplate.displayName = "RelationshipGardenTemplate";
