/**
 * ProjectsBoard
 *
 * Organism containing all logic for the Projects list view.
 * Manages search, filtering, layout, stats, and project card rendering.
 *
 * Event Contract:
 * - Emits: UI:{createEvent} - when create button is clicked
 * - Emits: UI:{viewEvent} - when view action is clicked on a project
 * - Emits: UI:{editEvent} - when edit action is clicked on a project
 * - Emits: UI:{searchEvent} - when search term changes
 * - Emits: UI:{filterEvent} - when filter button is clicked
 * - Payload: { row: ProjectData, entity: "Project" }
 */

import React from "react";
import {
  Plus,
  Search,
  Filter,
  FolderKanban,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  PlayCircle,
  PauseCircle,
  Eye,
  Edit,
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

export interface ProjectData {
  id: string;
  name: string;
  description?: string;
  status: "planning" | "active" | "paused" | "completed" | "archived";
  priority?: "low" | "medium" | "high" | "critical";
  ownerId: string;
  ownerName?: string;
  teamId?: string;
  teamName?: string;
  memberCount?: number;
  progress?: number;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  tags?: string[];
}

export interface ProjectsBoardProps {
  /** Entity data (project items) */
  entity?: readonly ProjectData[];
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
  /** Event name for creating a project */
  createEvent?: string;
  /** Event name for viewing a project */
  viewEvent?: string;
  /** Event name for editing a project */
  editEvent?: string;
  /** Event name for search */
  searchEvent?: string;
  /** Event name for filter */
  filterEvent?: string;
}

const getStatusConfig = (status: ProjectData["status"]) => {
  switch (status) {
    case "active":
      return { color: "success" as const, icon: PlayCircle, label: "Active" };
    case "planning":
      return { color: "info" as const, icon: Clock, label: "Planning" };
    case "paused":
      return { color: "warning" as const, icon: PauseCircle, label: "Paused" };
    case "completed":
      return { color: "success" as const, icon: CheckCircle, label: "Completed" };
    case "archived":
      return { color: "neutral" as const, icon: FolderKanban, label: "Archived" };
    default:
      return { color: "neutral" as const, icon: Clock, label: status };
  }
};

const getPriorityColor = (priority?: ProjectData["priority"]) => {
  switch (priority) {
    case "critical":
      return "error";
    case "high":
      return "warning";
    case "medium":
      return "info";
    case "low":
      return "neutral";
    default:
      return "neutral";
  }
};

const ProjectCard: React.FC<{
  project: ProjectData;
  onAction: (action: string, project: ProjectData) => void;
  viewEvent: string;
  editEvent: string;
}> = ({ project, onAction, viewEvent, editEvent }) => {
  const statusConfig = getStatusConfig(project.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <VStack gap="md">
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            <Box rounded="lg" padding="sm" className="bg-blue-100">
              <FolderKanban className="h-5 w-5 text-blue-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="body" className="font-medium">
                {project.name}
              </Typography>
              {project.teamName && (
                <HStack gap="xs" align="center" className="text-[var(--color-muted-foreground)]">
                  <Users className="h-3 w-3" />
                  <Typography variant="small">{project.teamName}</Typography>
                </HStack>
              )}
            </VStack>
          </HStack>
          <Badge variant={statusConfig.color} className="gap-1">
            <StatusIcon className="h-3 w-3" />
            {statusConfig.label}
          </Badge>
        </HStack>

        {project.description && (
          <Typography variant="small" className="text-[var(--color-foreground)] line-clamp-2">
            {project.description}
          </Typography>
        )}

        {/* Progress bar */}
        {project.progress !== undefined && (
          <VStack gap="xs">
            <HStack justify="between">
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                Progress
              </Typography>
              <Typography variant="small" className="font-medium">
                {project.progress}%
              </Typography>
            </HStack>
            <Box className="w-full bg-neutral-200 rounded-full h-2">
              <Box
                className={cn(
                  "rounded-full h-2 transition-all",
                  project.progress >= 80
                    ? "bg-emerald-500"
                    : project.progress >= 50
                    ? "bg-blue-500"
                    : "bg-amber-500"
                )}
                style={{ width: `${project.progress}%` }}
              />
            </Box>
          </VStack>
        )}

        <HStack gap="md" wrap>
          {project.priority && (
            <Badge variant={getPriorityColor(project.priority)} size="sm">
              {project.priority}
            </Badge>
          )}
          {project.memberCount !== undefined && (
            <HStack gap="xs" align="center" className="text-[var(--color-muted-foreground)]">
              <Users className="h-3 w-3" />
              <Typography variant="small">{project.memberCount}</Typography>
            </HStack>
          )}
          {project.tags && project.tags.length > 0 && (
            <HStack gap="xs" wrap>
              {project.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="neutral" size="sm">
                  {tag}
                </Badge>
              ))}
            </HStack>
          )}
        </HStack>

        {(project.startDate || project.endDate) && (
          <HStack gap="xs" align="center" className="text-[var(--color-muted-foreground)]">
            <Calendar className="h-3 w-3" />
            <Typography variant="small">
              {project.startDate
                ? new Date(project.startDate).toLocaleDateString()
                : "TBD"}{" "}
              -{" "}
              {project.endDate
                ? new Date(project.endDate).toLocaleDateString()
                : "TBD"}
            </Typography>
          </HStack>
        )}

        <HStack gap="sm" className="pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction(viewEvent, project)}
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction(editEvent, project)}
            className="gap-1"
          >
            <Edit className="h-3 w-3" />
            Edit
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

export const ProjectsBoard: React.FC<ProjectsBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  title = "Projects",
  subtitle = "Manage team projects and collaborations",
  showHeader = true,
  showSearch = true,
  showFilters = true,
  className,
  createEvent = "CREATE",
  viewEvent = "VIEW",
  editEvent = "EDIT",
  searchEvent = "SEARCH",
  filterEvent = "FILTER",
}) => {
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [layout, setLayout] = React.useState<"grid" | "list">("grid");

  const projects = entity || [];

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    eventBus.emit(`UI:${searchEvent}`, { searchTerm: value });
  };

  // Handle create
  const handleCreate = () => {
    eventBus.emit(`UI:${createEvent}`, { entity: "Project" });
  };

  // Handle filter
  const handleFilter = () => {
    eventBus.emit(`UI:${filterEvent}`, { entity: "Project" });
  };

  // Handle project actions
  const handleAction = (action: string, project: ProjectData) => {
    eventBus.emit(`UI:${action}`, { row: project, entity: "Project" });
  };

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) {
      return false;
    }
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        p.name.toLowerCase().includes(search) ||
        p.description?.toLowerCase().includes(search)
      );
    }
    return true;
  });

  // Stats
  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.status === "active").length,
    completed: projects.filter((p) => p.status === "completed").length,
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

          <Button variant="primary" onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </HStack>
      )}

      {/* Stats Bar */}
      <HStack gap="md" wrap>
        <Card
          className={cn(
            "px-4 py-2 cursor-pointer",
            statusFilter === "all" && "ring-2 ring-blue-500"
          )}
          onClick={() => setStatusFilter("all")}
        >
          <VStack gap="none" align="center">
            <Typography variant="h4">{stats.total}</Typography>
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              Total
            </Typography>
          </VStack>
        </Card>
        <Card
          className={cn(
            "px-4 py-2 cursor-pointer",
            statusFilter === "active" && "ring-2 ring-emerald-500"
          )}
          onClick={() => setStatusFilter("active")}
        >
          <VStack gap="none" align="center">
            <Typography variant="h4" className="text-emerald-600">
              {stats.active}
            </Typography>
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              Active
            </Typography>
          </VStack>
        </Card>
        <Card
          className={cn(
            "px-4 py-2 cursor-pointer",
            statusFilter === "completed" && "ring-2 ring-blue-500"
          )}
          onClick={() => setStatusFilter("completed")}
        >
          <VStack gap="none" align="center">
            <Typography variant="h4" className="text-blue-600">
              {stats.completed}
            </Typography>
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              Completed
            </Typography>
          </VStack>
        </Card>
      </HStack>

      {/* Toolbar */}
      {(showSearch || showFilters) && (
        <HStack justify="between" align="center" wrap gap="sm">
          {showSearch && (
            <Box className="w-full max-w-sm">
              <Input
                placeholder="Search projects..."
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

            <HStack gap="xs" className="border rounded-md p-1">
              <Button
                variant={layout === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setLayout("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={layout === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setLayout("list")}
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
            Loading projects...
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

      {/* Projects Grid */}
      {!isLoading && !error && (
        <>
          {filteredProjects.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <FolderKanban className="h-12 w-12 text-[var(--color-muted-foreground)]" />
              <Typography variant="h3" className="text-[var(--color-muted-foreground)]">
                No projects found
              </Typography>
              <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                {searchTerm || statusFilter !== "all"
                  ? "Try different filters"
                  : "Create your first project to get started"}
              </Typography>
            </VStack>
          ) : (
            <Box
              className={cn(
                layout === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "flex flex-col gap-4"
              )}
            >
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onAction={handleAction}
                  viewEvent={viewEvent}
                  editEvent={editEvent}
                />
              ))}
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

ProjectsBoard.displayName = "ProjectsBoard";
