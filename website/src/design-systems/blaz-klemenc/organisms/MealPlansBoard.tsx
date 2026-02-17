/**
 * MealPlansBoard
 *
 * Board organism for displaying and managing meal plans.
 * Contains all state, filtering, computed stats, grouping, and view mode logic.
 * Accepts declarative event prop strings for flattener compliance.
 *
 * Maps to MealPlan entity from blaz-klemenc.orb:
 * - id: string
 * - traineeId: relation to User
 * - trainerId: relation to User
 * - title: string
 * - description: string
 * - date: date
 * - calories: number
 * - protein: number
 * - carbs: number
 * - fat: number
 * - shareLink: string
 * - aiAnalysis: string
 *
 * Event Contract (matches MealPlanManagement trait):
 * - Emits: UI:{createEvent} - create new meal plan
 * - Emits: UI:{searchEvent} - search meal plans
 * - MealPlanCard handles its own view/edit/delete events internally
 */

import React, { useState } from "react";
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
import {
  cn,
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  Input,
  Card,
  Spinner,
  useEventBus,
} from "@almadar/ui";
import { MealPlanCard, MealPlanData } from "../molecules/MealPlanCard";

/** MealPlan entity data for the meal plans board */
export interface MealPlanEntity {
  /** Meal plan items to display */
  items: readonly MealPlanData[];
}

export interface MealPlansBoardProps {
  /** MealPlan entity data */
  entity: MealPlanEntity;
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
  /** Additional CSS classes */
  className?: string;
  /** Event name for creating a meal plan (emitted as UI:{createEvent}) */
  createEvent?: string;
  /** Event name for searching meal plans (emitted as UI:{searchEvent}) */
  searchEvent?: string;
}

export const MealPlansBoard: React.FC<MealPlansBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  title = "Meal Plans",
  subtitle = "Create and manage nutrition plans for your trainees",
  showHeader = true,
  showSearch = true,
  className,
  createEvent,
  searchEvent,
}) => {
  const { emit } = useEventBus();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const mealPlans = entity.items || [];

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (searchEvent) {
      emit(`UI:${searchEvent}`, { searchTerm: value, entity: "MealPlan" });
    }
  };

  // Handle create
  const handleCreate = () => {
    if (createEvent) {
      emit(`UI:${createEvent}`, { entity: "MealPlan" });
    }
  };

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
  const groupedByDate = filteredMealPlans.reduce(
    (acc, plan) => {
      const date = new Date(plan.date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      if (!acc[date]) acc[date] = [];
      acc[date].push(plan);
      return acc;
    },
    {} as Record<string, MealPlanData[]>
  );

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
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
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
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
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
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
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
              leftIcon={<Search className="h-4 w-4 text-[var(--color-muted-foreground)]" />}
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
          <Typography variant="body" className="text-[var(--color-muted-foreground)]">
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
              <Utensils className="h-12 w-12 text-[var(--color-muted-foreground)]" />
              <Typography variant="h3" className="text-[var(--color-muted-foreground)]">
                No meal plans found
              </Typography>
              <Typography variant="body" className="text-[var(--color-muted-foreground)]">
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
                  entity="MealPlan"
                />
              ))}
            </Box>
          ) : (
            <VStack gap="lg">
              {Object.entries(groupedByDate).map(([date, plans]) => (
                <VStack key={date} gap="sm">
                  <HStack gap="sm" align="center">
                    <Calendar className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                    <Typography variant="label" className="text-[var(--color-foreground)]">
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
                        entity="MealPlan"
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

MealPlansBoard.displayName = "MealPlansBoard";
