/**
 * ProgressTemplate
 *
 * Template for the Progress tracking page (/progress).
 * Displays ProgressEntry entities (kinesiology exams, special exercises, assessments, milestones).
 *
 * Page: ProgressPage
 * Entity: ProgressEntry
 * ViewType: list
 * Trait: ProgressManagement
 *
 * Event Contract:
 * - Emits: UI:CREATE_PROGRESS - create new progress entry
 * - Emits: UI:VIEW - view progress entry details
 * - Emits: UI:EDIT - edit progress entry
 * - Emits: UI:DELETE - delete progress entry
 */

import React, { useState, useCallback } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Input } from "../../../components/atoms/Input";
import { Card } from "../../../components/atoms/Card";
import { Badge } from "../../../components/atoms/Badge";
import { Spinner } from "../../../components/atoms/Spinner";
import { useEventBus } from "../../../hooks/useEventBus";
import { SpecialExerciseCard, SpecialExerciseData } from "../molecules/SpecialExerciseCard";
import {
  Plus,
  Search,
  TrendingUp,
  Award,
  ClipboardCheck,
  Dumbbell,
  Calendar,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  PlayCircle,
} from "lucide-react";

/**
 * ProgressEntry entity data from blaz-klemenc.orb
 */
export interface ProgressEntryData {
  id: string;
  traineeId?: string;
  trainerId?: string;
  entryType: "kinesiology_exam" | "special_exercise" | "assessment" | "milestone";
  title: string;
  description?: string;
  date: string | Date;
  status: "planned" | "in_progress" | "completed";
}

export interface ProgressTemplateProps {
  /** Progress entry items to display */
  items?: readonly ProgressEntryData[];
  /** Data prop alias */
  data?: readonly ProgressEntryData[];
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
  /** Show filters */
  showFilters?: boolean;
  /** Entity context for events */
  entity?: string;
  /** Additional CSS classes */
  className?: string;
}

// Entry type configuration
const entryTypeConfig = {
  kinesiology_exam: {
    label: "Kinesiology Exam",
    icon: ClipboardCheck,
    color: "bg-blue-100 text-blue-700",
  },
  special_exercise: {
    label: "Special Exercise",
    icon: Dumbbell,
    color: "bg-purple-100 text-purple-700",
  },
  assessment: {
    label: "Assessment",
    icon: TrendingUp,
    color: "bg-green-100 text-green-700",
  },
  milestone: {
    label: "Milestone",
    icon: Award,
    color: "bg-yellow-100 text-yellow-700",
  },
};

// Status configuration
const statusConfig = {
  planned: {
    label: "Planned",
    color: "bg-blue-100 text-blue-700",
    icon: Clock,
  },
  in_progress: {
    label: "In Progress",
    color: "bg-amber-100 text-amber-700",
    icon: PlayCircle,
  },
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle2,
  },
};

const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

const ProgressEntryCard: React.FC<{
  entry: ProgressEntryData;
  onAction: (action: string, entry: ProgressEntryData) => void;
}> = ({ entry, onAction }) => {
  const typeConfig = entryTypeConfig[entry.entryType];
  const status = statusConfig[entry.status];
  const TypeIcon = typeConfig.icon;
  const StatusIcon = status.icon;

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <VStack gap="md">
        {/* Header */}
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            <Box
              display="flex"
              rounded="lg"
              padding="xs"
              className={cn("items-center justify-center", typeConfig.color.split(" ")[0])}
            >
              <TypeIcon className={cn("h-4 w-4", typeConfig.color.split(" ")[1])} />
            </Box>
            <VStack gap="none">
              <Typography variant="body" className="font-medium">
                {entry.title}
              </Typography>
              <Badge className={typeConfig.color} size="sm">
                {typeConfig.label}
              </Badge>
            </VStack>
          </HStack>
          <Badge className={status.color} size="sm">
            <StatusIcon className="h-3 w-3 mr-1" />
            {status.label}
          </Badge>
        </HStack>

        {/* Description */}
        {entry.description && (
          <Typography variant="body" className="text-neutral-600 line-clamp-2">
            {entry.description}
          </Typography>
        )}

        {/* Date */}
        <HStack gap="xs" align="center" className="text-neutral-500">
          <Calendar className="h-3 w-3" />
          <Typography variant="small">{formatDate(entry.date)}</Typography>
        </HStack>

        {/* Actions */}
        <HStack gap="sm" className="pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("VIEW", entry)}
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("EDIT", entry)}
            className="gap-1"
          >
            <Edit className="h-3 w-3" />
            Edit
          </Button>
          <Box className="flex-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("DELETE", entry)}
            className="gap-1 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

export const ProgressTemplate: React.FC<ProgressTemplateProps> = ({
  items,
  data,
  isLoading = false,
  error = null,
  title = "Progress Tracking",
  subtitle = "Track trainee progress, exams, and milestones",
  showHeader = true,
  showSearch = true,
  showFilters = true,
  entity = "ProgressEntry",
  className,
}) => {
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<
    "all" | "kinesiology_exam" | "special_exercise" | "assessment" | "milestone"
  >("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "planned" | "in_progress" | "completed"
  >("all");

  const entries = items || data || [];

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
    eventBus.emit("UI:CREATE_PROGRESS", { entity });
  }, [eventBus, entity]);

  // Handle entry actions
  const handleAction = useCallback(
    (action: string, entry: ProgressEntryData) => {
      eventBus.emit(`UI:${action}`, { row: entry, entity });
    },
    [eventBus, entity]
  );

  // Filter entries
  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      !searchTerm ||
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || entry.entryType === typeFilter;
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Count by type
  const examCount = entries.filter((e) => e.entryType === "kinesiology_exam").length;
  const exerciseCount = entries.filter((e) => e.entryType === "special_exercise").length;
  const milestoneCount = entries.filter((e) => e.entryType === "milestone").length;
  const completedCount = entries.filter((e) => e.status === "completed").length;

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
            Add Progress
          </Button>
        </HStack>
      )}

      {/* Stats */}
      <HStack gap="md" wrap>
        <Card className="p-3 flex-1 min-w-[120px]">
          <HStack gap="sm" align="center">
            <ClipboardCheck className="h-5 w-5 text-blue-500" />
            <VStack gap="none">
              <Typography variant="h3">{examCount}</Typography>
              <Typography variant="small" className="text-neutral-500">
                Exams
              </Typography>
            </VStack>
          </HStack>
        </Card>
        <Card className="p-3 flex-1 min-w-[120px]">
          <HStack gap="sm" align="center">
            <Dumbbell className="h-5 w-5 text-purple-500" />
            <VStack gap="none">
              <Typography variant="h3">{exerciseCount}</Typography>
              <Typography variant="small" className="text-neutral-500">
                Exercises
              </Typography>
            </VStack>
          </HStack>
        </Card>
        <Card className="p-3 flex-1 min-w-[120px]">
          <HStack gap="sm" align="center">
            <Award className="h-5 w-5 text-yellow-500" />
            <VStack gap="none">
              <Typography variant="h3">{milestoneCount}</Typography>
              <Typography variant="small" className="text-neutral-500">
                Milestones
              </Typography>
            </VStack>
          </HStack>
        </Card>
        <Card className="p-3 flex-1 min-w-[120px]">
          <HStack gap="sm" align="center">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <VStack gap="none">
              <Typography variant="h3">{completedCount}</Typography>
              <Typography variant="small" className="text-neutral-500">
                Completed
              </Typography>
            </VStack>
          </HStack>
        </Card>
      </HStack>

      {/* Toolbar */}
      {(showSearch || showFilters) && (
        <VStack gap="sm">
          <HStack justify="between" align="center" wrap gap="sm">
            {showSearch && (
              <Box className="w-full max-w-sm">
                <Input
                  placeholder="Search progress entries..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  leftIcon={<Search className="h-4 w-4 text-neutral-400" />}
                />
              </Box>
            )}
          </HStack>

          {showFilters && (
            <HStack gap="sm" wrap>
              <HStack gap="xs">
                <Typography variant="small" className="text-neutral-500">
                  Type:
                </Typography>
                <Button
                  variant={typeFilter === "all" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setTypeFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant={typeFilter === "kinesiology_exam" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setTypeFilter("kinesiology_exam")}
                >
                  Exams
                </Button>
                <Button
                  variant={typeFilter === "special_exercise" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setTypeFilter("special_exercise")}
                >
                  Exercises
                </Button>
                <Button
                  variant={typeFilter === "milestone" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setTypeFilter("milestone")}
                >
                  Milestones
                </Button>
              </HStack>
              <Box className="border-l border-neutral-200 h-6" />
              <HStack gap="xs">
                <Typography variant="small" className="text-neutral-500">
                  Status:
                </Typography>
                <Button
                  variant={statusFilter === "all" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === "planned" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setStatusFilter("planned")}
                >
                  Planned
                </Button>
                <Button
                  variant={statusFilter === "in_progress" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setStatusFilter("in_progress")}
                >
                  In Progress
                </Button>
                <Button
                  variant={statusFilter === "completed" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setStatusFilter("completed")}
                >
                  Completed
                </Button>
              </HStack>
            </HStack>
          )}
        </VStack>
      )}

      {/* Loading State */}
      {isLoading && (
        <VStack align="center" justify="center" className="py-12">
          <Spinner size="lg" />
          <Typography variant="body" className="text-neutral-500">
            Loading progress entries...
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

      {/* Progress Entries Grid */}
      {!isLoading && !error && (
        <>
          {filteredEntries.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <TrendingUp className="h-12 w-12 text-neutral-300" />
              <Typography variant="h3" className="text-neutral-500">
                No progress entries found
              </Typography>
              <Typography variant="body" className="text-neutral-400">
                {searchTerm
                  ? "Try a different search term"
                  : "Add your first progress entry to get started"}
              </Typography>
            </VStack>
          ) : (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEntries.map((entry) => (
                <ProgressEntryCard
                  key={entry.id}
                  entry={entry}
                  onAction={handleAction}
                />
              ))}
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

ProgressTemplate.displayName = "ProgressTemplate";
