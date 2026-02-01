/**
 * MealPlansTemplate
 *
 * Template for the Meal Plans list page (/meal-plans).
 * Displays MealPlan entities with AI analysis and sharing features.
 *
 * Page: MealPlansPage
 * Entity: MealPlan
 * ViewType: list
 * Trait: MealPlanManagement
 *
 * Event Contract:
 * - Emits: UI:CREATE - create new meal plan
 * - Emits: UI:VIEW - view meal plan details
 * - Emits: UI:EDIT - edit meal plan
 * - Emits: UI:DELETE - delete meal plan
 * - Emits: UI:ANALYZE - request AI analysis
 * - Emits: UI:SHARE - share meal plan
 */

import React, { useState, useCallback } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Input } from "../../../components/atoms/Input";
import { Card } from "../../../components/atoms/Card";
import { Spinner } from "../../../components/atoms/Spinner";
import { useEventBus } from "../../../hooks/useEventBus";
import { MealPlanCard, MealPlanData } from "../molecules/MealPlanCard";
import {
  Plus,
  Search,
  Utensils,
  Flame,
  Sparkles,
  Calendar,
  LayoutGrid,
  List,
} from "lucide-react";

export interface MealPlansTemplateProps {
  /** Meal plan items to display */
  items?: readonly MealPlanData[];
  /** Data prop alias */
  data?: readonly MealPlanData[];
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Page title */
  title?: string;
  /** Page subtitle */
  subtitle?: string;
  /** Show header */
  showHeader?: boolean;
  /** Show search */
  showSearch?: boolean;
  /** Entity context for events */
  entity?: string;
  /** Additional CSS classes */
  className?: string;
}

export const MealPlansTemplate: React.FC<MealPlansTemplateProps> = ({
  items,
  data,
  isLoading = false,
  error = null,
  title = "Meal Plans",
  subtitle = "Create and manage nutrition plans for your trainees",
  showHeader = true,
  showSearch = true,
  entity = "MealPlan",
  className,
}) => {
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const mealPlans = items || data || [];

  // Handle search
  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      eventBus.emit("UI:SEARCH", { searchTerm: value, entity });
    },
    [eventBus, entity]
  );

  // Handle create
  const handleCreate = useCallback(() => {
    eventBus.emit("UI:CREATE", { entity });
  }, [eventBus, entity]);

  // Filter meal plans
  const filteredMealPlans = mealPlans.filter((plan) => {
    return (
      !searchTerm ||
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Calculate stats
  const totalPlans = mealPlans.length;
  const plansWithAnalysis = mealPlans.filter((p) => p.aiAnalysis).length;
  const avgCalories =
    mealPlans.length > 0
      ? Math.round(
          mealPlans.reduce((sum, p) => sum + (p.calories || 0), 0) / mealPlans.length
        )
      : 0;

  // Group by date
  const groupedByDate = filteredMealPlans.reduce((acc, plan) => {
    const date = new Date(plan.date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(plan);
    return acc;
  }, {} as Record<string, MealPlanData[]>);

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

          <Button variant="primary" onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Meal Plan
          </Button>
        </HStack>
      )}

      {/* Stats */}
      <HStack gap="md">
        <Card className="p-3 flex-1">
          <HStack gap="sm" align="center">
            <Utensils className="h-5 w-5 text-orange-500" />
            <VStack gap="none">
              <Typography variant="h3">{totalPlans}</Typography>
              <Typography variant="small" className="text-neutral-500">
                Meal Plans
              </Typography>
            </VStack>
          </HStack>
        </Card>
        <Card className="p-3 flex-1">
          <HStack gap="sm" align="center">
            <Flame className="h-5 w-5 text-red-500" />
            <VStack gap="none">
              <Typography variant="h3">{avgCalories}</Typography>
              <Typography variant="small" className="text-neutral-500">
                Avg Calories
              </Typography>
            </VStack>
          </HStack>
        </Card>
        <Card className="p-3 flex-1">
          <HStack gap="sm" align="center">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <VStack gap="none">
              <Typography variant="h3">{plansWithAnalysis}</Typography>
              <Typography variant="small" className="text-neutral-500">
                AI Analyzed
              </Typography>
            </VStack>
          </HStack>
        </Card>
      </HStack>

      {/* Toolbar */}
      <HStack justify="between" align="center" wrap gap="sm">
        {showSearch && (
          <Box className="w-full max-w-sm">
            <Input
              placeholder="Search meal plans..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              leftIcon={<Search className="h-4 w-4 text-neutral-400" />}
            />
          </Box>
        )}

        <HStack gap="xs">
          <Button
            variant={viewMode === "grid" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </HStack>
      </HStack>

      {/* Loading State */}
      {isLoading && (
        <VStack align="center" justify="center" className="py-12">
          <Spinner size="lg" />
          <Typography variant="body" className="text-neutral-500">
            Loading meal plans...
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

      {/* Meal Plans */}
      {!isLoading && !error && (
        <>
          {filteredMealPlans.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <Utensils className="h-12 w-12 text-neutral-300" />
              <Typography variant="h3" className="text-neutral-500">
                No meal plans found
              </Typography>
              <Typography variant="body" className="text-neutral-400">
                {searchTerm
                  ? "Try a different search term"
                  : "Create your first meal plan to get started"}
              </Typography>
            </VStack>
          ) : viewMode === "grid" ? (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMealPlans.map((plan) => (
                <MealPlanCard
                  key={plan.id}
                  data={plan}
                  showMacros={true}
                  showAiAnalysis={true}
                  showActions={true}
                  entity={entity}
                />
              ))}
            </Box>
          ) : (
            <VStack gap="lg">
              {Object.entries(groupedByDate).map(([date, plans]) => (
                <VStack key={date} gap="sm">
                  <HStack gap="sm" align="center">
                    <Calendar className="h-4 w-4 text-neutral-400" />
                    <Typography variant="label" className="text-neutral-600">
                      {date}
                    </Typography>
                  </HStack>
                  <VStack gap="sm">
                    {plans.map((plan) => (
                      <MealPlanCard
                        key={plan.id}
                        data={plan}
                        compact={true}
                        showMacros={false}
                        showAiAnalysis={true}
                        showActions={false}
                        entity={entity}
                      />
                    ))}
                  </VStack>
                </VStack>
              ))}
            </VStack>
          )}
        </>
      )}
    </VStack>
  );
};

MealPlansTemplate.displayName = "MealPlansTemplate";
