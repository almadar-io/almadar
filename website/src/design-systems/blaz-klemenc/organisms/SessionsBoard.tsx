/**
 * SessionsBoard
 *
 * Board organism for displaying and managing training sessions.
 * Contains all state, filtering, computed counts, view mode, and card rendering logic.
 * Accepts declarative event prop strings for flattener compliance.
 *
 * Maps to TrainingSession entity from blaz-klemenc.orb:
 * - id: string
 * - traineeId: relation to User
 * - trainerId: relation to User
 * - title: string
 * - scheduledAt: timestamp
 * - duration: number
 * - youtubeLink: string
 * - status: enum (scheduled | in-progress | completed | cancelled)
 * - isGroupSession: boolean
 * - maxParticipants: number
 *
 * Event Contract (matches TrainingSessionManagement trait):
 * - Emits: UI:{createEvent} - create new session
 * - Emits: UI:{viewEvent} - view session details
 * - Emits: UI:{editEvent} - edit session
 * - Emits: UI:{startEvent} - start a session
 * - Emits: UI:{completeEvent} - complete a session
 * - Emits: UI:{cancelEvent} - cancel a session
 * - Emits: UI:{deleteEvent} - delete session
 * - Emits: UI:{searchEvent} - search sessions
 * - Emits: UI:{filterEvent} - filter by status
 */

import React, { useState } from "react";
import {
  Plus,
  Search,
  Calendar,
  Clock,
  Eye,
  Edit,
  PlayCircle,
  CheckCircle2,
  XCircle,
  Trash2,
  Users,
  User,
  Youtube,
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
  Badge,
  Spinner,
  useEventBus,
} from "@almadar/ui";

/**
 * TrainingSession entity data from blaz-klemenc.orb
 */
export interface TrainingSessionData {
  id: string;
  traineeId?: string;
  trainerId?: string;
  title: string;
  scheduledAt: string | Date;
  duration: number;
  youtubeLink?: string;
  status?: "scheduled" | "in-progress" | "completed" | "cancelled";
  isGroupSession?: boolean;
  maxParticipants?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/** TrainingSession entity data for the sessions board */
export interface TrainingSessionEntity {
  /** Session items to display */
  items: readonly TrainingSessionData[];
}

export interface SessionsBoardProps {
  /** TrainingSession entity data */
  entity: TrainingSessionEntity;
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
  /** Default status filter */
  defaultStatusFilter?: "all" | "scheduled" | "in-progress" | "completed" | "cancelled";
  /** Additional CSS classes */
  className?: string;
  /** Event name for creating a session (emitted as UI:{createEvent}) */
  createEvent?: string;
  /** Event name for viewing a session (emitted as UI:{viewEvent}) */
  viewEvent?: string;
  /** Event name for editing a session (emitted as UI:{editEvent}) */
  editEvent?: string;
  /** Event name for starting a session (emitted as UI:{startEvent}) */
  startEvent?: string;
  /** Event name for completing a session (emitted as UI:{completeEvent}) */
  completeEvent?: string;
  /** Event name for cancelling a session (emitted as UI:{cancelEvent}) */
  cancelEvent?: string;
  /** Event name for deleting a session (emitted as UI:{deleteEvent}) */
  deleteEvent?: string;
  /** Event name for searching sessions (emitted as UI:{searchEvent}) */
  searchEvent?: string;
  /** Event name for filtering sessions (emitted as UI:{filterEvent}) */
  filterEvent?: string;
}

const statusConfig = {
  scheduled: {
    label: "Scheduled",
    color: "bg-blue-500/15 text-blue-600",
    icon: Calendar,
  },
  "in-progress": {
    label: "In Progress",
    color: "bg-amber-500/15 text-amber-600",
    icon: PlayCircle,
  },
  completed: {
    label: "Completed",
    color: "bg-green-500/15 text-green-600",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-500/15 text-red-600",
    icon: XCircle,
  },
};

const formatDateTime = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

const SessionCard: React.FC<{
  session: TrainingSessionData;
  viewEvent?: string;
  editEvent?: string;
  startEvent?: string;
  completeEvent?: string;
  cancelEvent?: string;
  deleteEvent?: string;
}> = ({ session, viewEvent, editEvent, startEvent, completeEvent, cancelEvent, deleteEvent }) => {
  const { emit } = useEventBus();
  const status = statusConfig[session.status || "scheduled"];
  const StatusIcon = status.icon;

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <VStack gap="md">
        {/* Header */}
        <HStack justify="between" align="start">
          <VStack gap="xs">
            <Typography variant="body" className="font-medium">
              {session.title}
            </Typography>
            <HStack gap="sm" align="center" className="text-[var(--color-muted-foreground)]">
              <Calendar className="h-3 w-3" />
              <Typography variant="small">{formatDateTime(session.scheduledAt)}</Typography>
            </HStack>
          </VStack>
          <Badge className={status.color}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {status.label}
          </Badge>
        </HStack>

        {/* Info */}
        <HStack gap="md" className="text-[var(--color-muted-foreground)]">
          <HStack gap="xs" align="center">
            <Clock className="h-3 w-3" />
            <Typography variant="small">{formatDuration(session.duration)}</Typography>
          </HStack>
          <HStack gap="xs" align="center">
            {session.isGroupSession ? (
              <>
                <Users className="h-3 w-3" />
                <Typography variant="small">
                  Group ({session.maxParticipants || "unlimited"})
                </Typography>
              </>
            ) : (
              <>
                <User className="h-3 w-3" />
                <Typography variant="small">1-on-1</Typography>
              </>
            )}
          </HStack>
          {session.youtubeLink && (
            <HStack gap="xs" align="center">
              <Youtube className="h-3 w-3 text-red-500" />
              <Typography variant="small">Video</Typography>
            </HStack>
          )}
        </HStack>

        {/* Actions */}
        <HStack gap="sm" className="pt-2 border-t" wrap>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              viewEvent && emit(`UI:${viewEvent}`, { row: session, entity: "TrainingSession" })
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
              editEvent && emit(`UI:${editEvent}`, { row: session, entity: "TrainingSession" })
            }
            className="gap-1"
          >
            <Edit className="h-3 w-3" />
            Edit
          </Button>
          {session.status === "scheduled" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                startEvent &&
                emit(`UI:${startEvent}`, { row: session, entity: "TrainingSession" })
              }
              className="gap-1 text-green-600 hover:text-green-700"
            >
              <PlayCircle className="h-3 w-3" />
              Start
            </Button>
          )}
          {session.status === "in-progress" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                completeEvent &&
                emit(`UI:${completeEvent}`, { row: session, entity: "TrainingSession" })
              }
              className="gap-1 text-green-600 hover:text-green-700"
            >
              <CheckCircle2 className="h-3 w-3" />
              Complete
            </Button>
          )}
          {(session.status === "scheduled" || session.status === "in-progress") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                cancelEvent &&
                emit(`UI:${cancelEvent}`, { row: session, entity: "TrainingSession" })
              }
              className="gap-1 text-amber-600 hover:text-amber-700"
            >
              <XCircle className="h-3 w-3" />
              Cancel
            </Button>
          )}
          <Box className="flex-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              deleteEvent &&
              emit(`UI:${deleteEvent}`, { row: session, entity: "TrainingSession" })
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

export const SessionsBoard: React.FC<SessionsBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  title = "Training Sessions",
  subtitle = "Manage training sessions for your trainees",
  showHeader = true,
  showSearch = true,
  showFilters = true,
  defaultStatusFilter = "all",
  className,
  createEvent,
  viewEvent,
  editEvent,
  startEvent,
  completeEvent,
  cancelEvent,
  deleteEvent,
  searchEvent,
  filterEvent,
}) => {
  const { emit } = useEventBus();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "scheduled" | "in-progress" | "completed" | "cancelled"
  >(defaultStatusFilter);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const sessions = entity.items || [];

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (searchEvent) {
      emit(`UI:${searchEvent}`, { searchTerm: value, entity: "TrainingSession" });
    }
  };

  // Handle create
  const handleCreate = () => {
    if (createEvent) {
      emit(`UI:${createEvent}`, { entity: "TrainingSession" });
    }
  };

  // Handle status filter
  const handleStatusFilter = (
    status: "all" | "scheduled" | "in-progress" | "completed" | "cancelled"
  ) => {
    setStatusFilter(status);
    if (filterEvent) {
      emit(`UI:${filterEvent}`, { status, entity: "TrainingSession" });
    }
  };

  // Filter sessions
  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      !searchTerm || session.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || session.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Count by status
  const scheduledCount = sessions.filter((s) => s.status === "scheduled").length;
  const inProgressCount = sessions.filter((s) => s.status === "in-progress").length;
  const completedCount = sessions.filter((s) => s.status === "completed").length;

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
            Schedule Session
          </Button>
        </HStack>
      )}

      {/* Stats */}
      <HStack gap="md">
        <Card className="p-3 flex-1">
          <HStack gap="sm" align="center">
            <Calendar className="h-5 w-5 text-blue-500" />
            <VStack gap="none">
              <Typography variant="h3">{scheduledCount}</Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                Scheduled
              </Typography>
            </VStack>
          </HStack>
        </Card>
        <Card className="p-3 flex-1">
          <HStack gap="sm" align="center">
            <PlayCircle className="h-5 w-5 text-amber-500" />
            <VStack gap="none">
              <Typography variant="h3">{inProgressCount}</Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                In Progress
              </Typography>
            </VStack>
          </HStack>
        </Card>
        <Card className="p-3 flex-1">
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
        <HStack justify="between" align="center" wrap gap="sm">
          <HStack gap="sm" align="center">
            {showSearch && (
              <Box className="w-full max-w-sm">
                <Input
                  placeholder="Search sessions..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  leftIcon={<Search className="h-4 w-4 text-[var(--color-muted-foreground)]" />}
                />
              </Box>
            )}
          </HStack>

          <HStack gap="sm">
            {showFilters && (
              <>
                <Button
                  variant={statusFilter === "all" ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => handleStatusFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === "scheduled" ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => handleStatusFilter("scheduled")}
                >
                  Scheduled
                </Button>
                <Button
                  variant={statusFilter === "in-progress" ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => handleStatusFilter("in-progress")}
                >
                  In Progress
                </Button>
                <Button
                  variant={statusFilter === "completed" ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => handleStatusFilter("completed")}
                >
                  Completed
                </Button>
              </>
            )}
            <HStack gap="xs" className="border-l pl-2 ml-2">
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
        </HStack>
      )}

      {/* Loading State */}
      {isLoading && (
        <VStack align="center" justify="center" className="py-12">
          <Spinner size="lg" />
          <Typography variant="body" className="text-[var(--color-muted-foreground)]">
            Loading sessions...
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

      {/* Sessions Grid/List */}
      {!isLoading && !error && (
        <>
          {filteredSessions.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <Calendar className="h-12 w-12 text-[var(--color-muted-foreground)]" />
              <Typography variant="h3" className="text-[var(--color-muted-foreground)]">
                No sessions found
              </Typography>
              <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                {searchTerm
                  ? "Try a different search term"
                  : "Schedule your first session to get started"}
              </Typography>
            </VStack>
          ) : (
            <Box
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "flex flex-col gap-3"
              }
            >
              {filteredSessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  viewEvent={viewEvent}
                  editEvent={editEvent}
                  startEvent={startEvent}
                  completeEvent={completeEvent}
                  cancelEvent={cancelEvent}
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

SessionsBoard.displayName = "SessionsBoard";
