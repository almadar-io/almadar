/**
 * SessionsTemplate
 *
 * Template for the Training Sessions list page (/training-sessions).
 * Displays TrainingSession entities with filtering by status and type.
 *
 * Page: TrainingSessionsPage
 * Entity: TrainingSession
 * ViewType: list
 * Traits: TrainingSessionManagement, GroupSessionManagement
 *
 * Event Contract:
 * - Emits: UI:CREATE - create new session
 * - Emits: UI:VIEW - view session details
 * - Emits: UI:EDIT - edit session
 * - Emits: UI:START - start a session
 * - Emits: UI:COMPLETE - complete a session
 * - Emits: UI:CANCEL - cancel a session
 * - Emits: UI:DELETE - delete session
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

export interface SessionsTemplateProps {
  /** Session items to display */
  items?: readonly TrainingSessionData[];
  /** Data prop alias */
  data?: readonly TrainingSessionData[];
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
  /** Entity context for events */
  entity?: string;
  /** Additional CSS classes */
  className?: string;
}

const statusConfig = {
  scheduled: {
    label: "Scheduled",
    color: "bg-blue-100 text-blue-700",
    icon: Calendar,
  },
  "in-progress": {
    label: "In Progress",
    color: "bg-amber-100 text-amber-700",
    icon: PlayCircle,
  },
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-700",
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
  onAction: (action: string, session: TrainingSessionData) => void;
}> = ({ session, onAction }) => {
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
            <HStack gap="sm" align="center" className="text-neutral-500">
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
        <HStack gap="md" className="text-neutral-500">
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
            onClick={() => onAction("VIEW", session)}
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("EDIT", session)}
            className="gap-1"
          >
            <Edit className="h-3 w-3" />
            Edit
          </Button>
          {session.status === "scheduled" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAction("START", session)}
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
              onClick={() => onAction("COMPLETE", session)}
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
              onClick={() => onAction("CANCEL", session)}
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
            onClick={() => onAction("DELETE", session)}
            className="gap-1 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

export const SessionsTemplate: React.FC<SessionsTemplateProps> = ({
  items,
  data,
  isLoading = false,
  error = null,
  title = "Training Sessions",
  subtitle = "Manage training sessions for your trainees",
  showHeader = true,
  showSearch = true,
  showFilters = true,
  defaultStatusFilter = "all",
  entity = "TrainingSession",
  className,
}) => {
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "scheduled" | "in-progress" | "completed" | "cancelled"
  >(defaultStatusFilter);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const sessions = items || data || [];

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

  // Handle status filter
  const handleStatusFilter = useCallback(
    (status: "all" | "scheduled" | "in-progress" | "completed" | "cancelled") => {
      setStatusFilter(status);
      eventBus.emit("UI:FILTER", { status, entity });
    },
    [eventBus, entity]
  );

  // Handle session actions
  const handleAction = useCallback(
    (action: string, session: TrainingSessionData) => {
      eventBus.emit(`UI:${action}`, { row: session, entity });
    },
    [eventBus, entity]
  );

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
            <Typography variant="body" className="text-neutral-500">
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
              <Typography variant="small" className="text-neutral-500">
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
              <Typography variant="small" className="text-neutral-500">
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
              <Typography variant="small" className="text-neutral-500">
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
                  leftIcon={<Search className="h-4 w-4 text-neutral-400" />}
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
          <Typography variant="body" className="text-neutral-500">
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
              <Calendar className="h-12 w-12 text-neutral-300" />
              <Typography variant="h3" className="text-neutral-500">
                No sessions found
              </Typography>
              <Typography variant="body" className="text-neutral-400">
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
                <SessionCard key={session.id} session={session} onAction={handleAction} />
              ))}
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

SessionsTemplate.displayName = "SessionsTemplate";
