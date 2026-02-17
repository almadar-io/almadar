/**
 * ProgressBoard
 *
 * Board organism for displaying and managing progress entries.
 * Contains all state, filtering, computed counts, and card rendering logic.
 * Accepts declarative event prop strings for flattener compliance.
 *
 * Maps to ProgressEntry entity from blaz-klemenc.orb:
 * - id: string
 * - traineeId: relation to User
 * - trainerId: relation to User
 * - entryType: enum (kinesiology_exam | special_exercise | assessment | milestone)
 * - title: string
 * - description: string
 * - date: date
 * - status: enum (planned | in_progress | completed)
 *
 * Event Contract (matches ProgressEntryManagement trait):
 * - Emits: UI:{createEvent} - create new progress entry
 * - Emits: UI:{viewEvent} - view progress entry details
 * - Emits: UI:{editEvent} - edit progress entry
 * - Emits: UI:{deleteEvent} - delete progress entry
 * - Emits: UI:{searchEvent} - search progress entries
 */

import React, { useState } from "react";
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
import {
  cn,
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  Input,
  Card,
  Badge,
  Spinner,
  useEventBus,
} from "@almadar/ui";

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

/** ProgressEntry entity data for the progress board */
export interface ProgressEntryEntity {
  /** Progress entry items to display */
  items: readonly ProgressEntryData[];
}

export interface ProgressBoardProps {
  /** ProgressEntry entity data */
  entity: ProgressEntryEntity;
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
  /** Additional CSS classes */
  className?: string;
  /** Event name for creating a progress entry (emitted as UI:{createEvent}) */
  createEvent?: string;
  /** Event name for viewing a progress entry (emitted as UI:{viewEvent}) */
  viewEvent?: string;
  /** Event name for editing a progress entry (emitted as UI:{editEvent}) */
  editEvent?: string;
  /** Event name for deleting a progress entry (emitted as UI:{deleteEvent}) */
  deleteEvent?: string;
  /** Event name for searching progress entries (emitted as UI:{searchEvent}) */
  searchEvent?: string;
}

// Entry type configuration
const entryTypeConfig = {
  kinesiology_exam: {
    label: "Kinesiology Exam",
    icon: ClipboardCheck,
    color: "bg-blue-500/15 text-blue-600",
  },
  special_exercise: {
    label: "Special Exercise",
    icon: Dumbbell,
    color: "bg-purple-500/15 text-purple-600",
  },
  assessment: {
    label: "Assessment",
    icon: TrendingUp,
    color: "bg-green-500/15 text-green-600",
  },
  milestone: {
    label: "Milestone",
    icon: Award,
    color: "bg-yellow-500/15 text-yellow-600",
  },
};

// Status configuration
const statusConfig = {
  planned: {
    label: "Planned",
    color: "bg-blue-500/15 text-blue-600",
    icon: Clock,
  },
  in_progress: {
    label: "In Progress",
    color: "bg-amber-500/15 text-amber-600",
    icon: PlayCircle,
  },
  completed: {
    label: "Completed",
    color: "bg-green-500/15 text-green-600",
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
  viewEvent?: string;
  editEvent?: string;
  deleteEvent?: string;
}> = ({ entry, viewEvent, editEvent, deleteEvent }) => {
  const { emit } = useEventBus();
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
          <Typography variant="body" className="text-[var(--color-foreground)] line-clamp-2">
            {entry.description}
          </Typography>
        )}

        {/* Date */}
        <HStack gap="xs" align="center" className="text-[var(--color-muted-foreground)]">
          <Calendar className="h-3 w-3" />
          <Typography variant="small">{formatDate(entry.date)}</Typography>
        </HStack>

        {/* Actions */}
        <HStack gap="sm" className="pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              viewEvent && emit(`UI:${viewEvent}`, { row: entry, entity: "ProgressEntry" })
            }
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              editEvent && emit(`UI:${editEvent}`, { row: entry, entity: "ProgressEntry" })
            }
            className="gap-1"
          >
            <Edit className="h-3 w-3" />
            Edit
          </Button>
          <Box className="flex-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              deleteEvent && emit(`UI:${deleteEvent}`, { row: entry, entity: "ProgressEntry" })
            }
            className="gap-1 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

export const ProgressBoard: React.FC<ProgressBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  title = "Progress Tracking",
  subtitle = "Track trainee progress, exams, and milestones",
  showHeader = true,
  showSearch = true,
  showFilters = true,
  className,
  createEvent,
  viewEvent,
  editEvent,
  deleteEvent,
  searchEvent,
}) => {
  const { emit } = useEventBus();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<
    "all" | "kinesiology_exam" | "special_exercise" | "assessment" | "milestone"
  >("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "planned" | "in_progress" | "completed"
  >("all");

  const entries = entity.items || [];

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (searchEvent) {
      emit(`UI:${searchEvent}`, { searchTerm: value, entity: "ProgressEntry" });
    }
  };

  // Handle create
  const handleCreate = () => {
    if (createEvent) {
      emit(`UI:${createEvent}`, { entity: "ProgressEntry" });
    }
  };

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
            <Typography variant="body" className="text-[var(--color-muted-foreground)]">
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
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
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
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
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
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
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
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
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
                  leftIcon={<Search className="h-4 w-4 text-[var(--color-muted-foreground)]" />}
                />
              </Box>
            )}
          </HStack>

          {showFilters && (
            <HStack gap="sm" wrap>
              <HStack gap="xs">
                <Typography variant="small" className="text-[var(--color-muted-foreground)]">
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
              <Box className="border-l border-[var(--color-border)] h-6" />
              <HStack gap="xs">
                <Typography variant="small" className="text-[var(--color-muted-foreground)]">
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
          <Typography variant="body" className="text-[var(--color-muted-foreground)]">
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
              <TrendingUp className="h-12 w-12 text-[var(--color-muted-foreground)]" />
              <Typography variant="h3" className="text-[var(--color-muted-foreground)]">
                No progress entries found
              </Typography>
              <Typography variant="body" className="text-[var(--color-muted-foreground)]">
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
                  viewEvent={viewEvent}
                  editEvent={editEvent}
                  deleteEvent={deleteEvent}
                />
              ))}
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

ProgressBoard.displayName = "ProgressBoard";
