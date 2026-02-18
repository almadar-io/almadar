/**
 * StudioHomeWebBoard - Organism containing all web home page logic
 *
 * Manages project list, search, sorting, summary stats, and event emission.
 * Used by StudioHomeWebTemplate as a thin wrapper.
 *
 * Events Emitted:
 * - UI:{createProjectEvent} - When creating a new project
 * - UI:{openProjectEvent} - When opening a project
 * - UI:{deleteProjectEvent} - When deleting a project
 * - UI:{previewProjectEvent} - When previewing a project
 * - UI:{searchEvent} - When searching projects
 * - UI:{sortEvent} - When sorting changes
 * - UI:SELECT_PROJECT - When selecting a project
 */

import React from "react";
import {
  Plus,
  Trash2,
  FolderOpen,
  Search,
  Play,
  Edit,
  Layers,
  Zap,
  LayoutGrid,
  FileText,
  Building2,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowUpDown,
} from "lucide-react";
import {
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  Icon,
  Input,
  Card,
  Badge,
  Select,
  ThemeToggle,
  Spinner,
  useEventBus,
} from "@almadar/ui";
import { OrbitalsLogo } from "../atoms";

export interface ProjectStats {
  states: number;
  events: number;
  pages: number;
  entities: number;
}

export interface ProjectDomain {
  category: string;
  subDomain?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  updatedAt: string | number;
  createdAt?: number;
  version?: number;
  stats?: ProjectStats;
  domain?: ProjectDomain;
  hasValidationErrors?: boolean;
  orbitalsCount?: number;
  traitsCount?: number;
  pagesCount?: number;
}

export type SortBy = "updated" | "name" | "created";

export interface StudioHomeWebEntity {
  projects: Project[];
  selectedProject?: Project;
  searchQuery?: string;
  sortBy?: SortBy;
}

export interface StudioHomeWebBoardProps {
  /** Entity containing projects and selection state */
  entity: StudioHomeWebEntity;
  /** AI Agent panel component (slot) */
  agentPanel?: React.ReactNode;
  /** Loading state */
  isLoading?: boolean;
  /** Error message */
  error?: string | null;
  /** Additional CSS classes */
  className?: string;
  /** Event name emitted when creating a project */
  createProjectEvent: string;
  /** Event name emitted when opening a project */
  openProjectEvent: string;
  /** Event name emitted when deleting a project */
  deleteProjectEvent: string;
  /** Event name emitted when previewing a project */
  previewProjectEvent: string;
  /** Event name emitted when searching */
  searchEvent: string;
  /** Event name emitted when sort changes */
  sortEvent: string;
  /** Event name emitted when importing */
  importEvent: string;
}

// ============ Helpers ============

const formatRelativeTime = (timestamp: number | string): string => {
  const date =
    typeof timestamp === "number" ? new Date(timestamp) : new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return diffMins <= 1 ? "Just now" : `${diffMins}m ago`;
    }
    return `${diffHours}h ago`;
  }
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// ============ Sub-organisms ============

const StatCard: React.FC<{
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  value: string | number;
  label: string;
  iconColor: string;
  iconStyle?: React.CSSProperties;
  bgStyle?: React.CSSProperties;
}> = ({ icon: IconComponent, value, label, iconColor, iconStyle, bgStyle }) => (
  <Card padding="sm">
    <HStack gap="sm" align="center">
      <Box
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={bgStyle}
      >
        <IconComponent className={`w-5 h-5 ${iconColor}`} style={iconStyle} />
      </Box>
      <VStack gap="none">
        <Typography variant="h4">{value}</Typography>
        <Typography
          variant="caption"
          className="text-[var(--color-muted-foreground)]"
        >
          {label}
        </Typography>
      </VStack>
    </HStack>
  </Card>
);

const ProjectCard: React.FC<{
  project: Project;
  isSelected: boolean;
  onSelect: () => void;
  onOpen: (e: React.MouseEvent) => void;
  onPreview: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}> = ({ project, isSelected, onSelect, onOpen, onPreview, onDelete }) => (
  <Card
    padding="none"
    className={`group cursor-pointer hover:shadow-lg transition-all duration-200 overflow-hidden ${
      isSelected ? "ring-2 ring-[var(--color-primary)]" : ""
    }`}
    onClick={onSelect}
  >
    {/* Accent bar */}
    <Box className="h-1.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]" />

    <Box padding="md">
      <VStack gap="sm">
        {/* Header: name + version + validation */}
        <HStack justify="between" align="start">
          <VStack gap="xs" className="flex-1 min-w-0">
            <HStack gap="xs" align="center">
              <Typography variant="h5" className="truncate">
                {project.name}
              </Typography>
              {project.version !== undefined && (
                <Badge variant="info" className="text-xs flex-shrink-0">
                  v{project.version}
                </Badge>
              )}
            </HStack>
            {project.description && (
              <Typography
                variant="body2"
                className="text-[var(--color-muted-foreground)] line-clamp-2"
              >
                {project.description}
              </Typography>
            )}
          </VStack>

          {/* Validation status */}
          <Box className="ml-2 flex-shrink-0">
            {project.hasValidationErrors ? (
              <Box
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'color-mix(in srgb, var(--color-warning) 15%, transparent)' }}
                title="Has validation issues"
              >
                <AlertTriangle className="w-4 h-4" style={{ color: 'var(--color-warning)' }} />
              </Box>
            ) : project.hasValidationErrors === false ? (
              <Box
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'color-mix(in srgb, var(--color-success) 15%, transparent)' }}
                title="Valid"
              >
                <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
              </Box>
            ) : null}
          </Box>
        </HStack>

        {/* Domain badge */}
        {project.domain && (
          <HStack gap="xs" align="center">
            <Building2 className="w-4 h-4 text-[var(--color-primary)]" />
            <Typography
              variant="caption"
              className="text-[var(--color-primary)] font-medium"
            >
              {project.domain.category}
              {project.domain.subDomain && (
                <Typography as="span" variant="caption" className="opacity-70">
                  {" "}
                  &rsaquo; {project.domain.subDomain}
                </Typography>
              )}
            </Typography>
          </HStack>
        )}

        {/* Stats grid */}
        {project.stats && (
          <Box className="grid grid-cols-4 gap-2">
            {[
              {
                icon: Layers,
                value: project.stats.states,
                label: "States",
                style: { color: 'var(--color-info)' },
              },
              {
                icon: Zap,
                value: project.stats.events,
                label: "Events",
                style: { color: 'var(--color-warning)' },
              },
              {
                icon: LayoutGrid,
                value: project.stats.pages,
                label: "Pages",
                style: { color: 'var(--color-primary)' },
              },
              {
                icon: FileText,
                value: project.stats.entities,
                label: "Entities",
                style: { color: 'var(--color-success)' },
              },
            ].map(({ icon: StatIcon, value, label, style }) => (
              <VStack
                key={label}
                gap="none"
                align="center"
                className="p-2 rounded-lg bg-[var(--color-muted)]"
              >
                <StatIcon className="w-3.5 h-3.5 mb-1" style={style} />
                <Typography variant="h5">{value}</Typography>
                <Typography
                  variant="caption"
                  className="text-[var(--color-muted-foreground)]"
                >
                  {label}
                </Typography>
              </VStack>
            ))}
          </Box>
        )}

        {/* Orbital/trait/page counts (fallback for simpler data) */}
        {!project.stats &&
          (project.orbitalsCount !== undefined ||
            project.traitsCount !== undefined) && (
            <HStack
              gap="md"
              className="pt-2 border-t border-[var(--color-border)]"
            >
              {project.orbitalsCount !== undefined && (
                <Typography
                  variant="caption"
                  className="text-[var(--color-muted-foreground)]"
                >
                  {project.orbitalsCount} orbital
                  {project.orbitalsCount !== 1 ? "s" : ""}
                </Typography>
              )}
              {project.traitsCount !== undefined && (
                <Typography
                  variant="caption"
                  className="text-[var(--color-muted-foreground)]"
                >
                  {project.traitsCount} trait
                  {project.traitsCount !== 1 ? "s" : ""}
                </Typography>
              )}
              {project.pagesCount !== undefined && (
                <Typography
                  variant="caption"
                  className="text-[var(--color-muted-foreground)]"
                >
                  {project.pagesCount} page
                  {project.pagesCount !== 1 ? "s" : ""}
                </Typography>
              )}
            </HStack>
          )}

        {/* Footer: time + actions */}
        <HStack
          justify="between"
          align="center"
          className="pt-2 border-t border-[var(--color-border)]"
        >
          <HStack gap="xs" align="center">
            <Clock className="w-3.5 h-3.5 text-[var(--color-muted-foreground)]" />
            <Typography
              variant="caption"
              className="text-[var(--color-muted-foreground)]"
            >
              {formatRelativeTime(project.updatedAt)}
            </Typography>
          </HStack>

          <HStack
            gap="xs"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Button
              size="sm"
              variant="ghost"
              onClick={onPreview}
              className="h-7 px-1.5"
            >
              <Play className="w-3.5 h-3.5" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onOpen}
              className="h-7 px-1.5"
            >
              <Edit className="w-3.5 h-3.5" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onDelete}
              className="h-7 px-1.5"
              style={{ color: 'var(--color-error)' }}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  </Card>
);

// ============ Main Component ============

export const StudioHomeWebBoard: React.FC<StudioHomeWebBoardProps> = ({
  entity,
  agentPanel,
  isLoading = false,
  error,
  className = "",
  createProjectEvent,
  openProjectEvent,
  deleteProjectEvent,
  previewProjectEvent,
  searchEvent,
  sortEvent,
}) => {
  const { projects = [], selectedProject, searchQuery = "", sortBy = "updated" } = entity;
  const { emit } = useEventBus();
  const [localSearch, setLocalSearch] = React.useState(searchQuery);
  const [localSort, setLocalSort] = React.useState<SortBy>(sortBy);

  const handleCreateProject = () => {
    emit(`UI:${createProjectEvent}`, {});
  };

  const handleSelectProject = (project: Project) => {
    emit("UI:SELECT_PROJECT", { project, entity: "Project" });
  };

  const handleOpenProject = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    emit(`UI:${openProjectEvent}`, { project, entity: "Project" });
  };

  const handlePreviewProject = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    emit(`UI:${previewProjectEvent}`, { project, entity: "Project" });
  };

  const handleDeleteProject = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    emit(`UI:${deleteProjectEvent}`, { project, entity: "Project" });
  };

  const handleSearch = (query: string) => {
    setLocalSearch(query);
    emit(`UI:${searchEvent}`, { query });
  };

  const handleSortChange = (newSort: SortBy) => {
    setLocalSort(newSort);
    emit(`UI:${sortEvent}`, { sortBy: newSort });
  };

  // Ensure projects is always an array
  const projectsList = Array.isArray(projects) ? projects : [];

  // Filter
  const filteredProjects = localSearch
    ? projectsList.filter(
        (p) =>
          p.name.toLowerCase().includes(localSearch.toLowerCase()) ||
          p.description?.toLowerCase().includes(localSearch.toLowerCase()) ||
          p.domain?.category.toLowerCase().includes(localSearch.toLowerCase()) ||
          p.domain?.subDomain?.toLowerCase().includes(localSearch.toLowerCase()),
      )
    : projectsList;

  // Sort
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (localSort) {
      case "name":
        return a.name.localeCompare(b.name);
      case "created": {
        const ac = typeof a.createdAt === "number" ? a.createdAt : 0;
        const bc = typeof b.createdAt === "number" ? b.createdAt : 0;
        return bc - ac;
      }
      case "updated":
      default: {
        const au =
          typeof a.updatedAt === "number"
            ? a.updatedAt
            : new Date(a.updatedAt).getTime();
        const bu =
          typeof b.updatedAt === "number"
            ? b.updatedAt
            : new Date(b.updatedAt).getTime();
        return bu - au;
      }
    }
  });

  // Summary stats
  const summaryStats = {
    totalApps: projectsList.length,
    totalStates: projectsList.reduce((s, p) => s + (p.stats?.states ?? 0), 0),
    totalEvents: projectsList.reduce((s, p) => s + (p.stats?.events ?? 0), 0),
    withIssues: projectsList.filter((p) => p.hasValidationErrors).length,
  };

  const hasStats = projectsList.some((p) => p.stats);

  return (
    <HStack gap="none" className={`h-screen ${className}`}>
      {/* Left Panel - AI Agent */}
      {agentPanel !== undefined && (
        <Box
          border
          fullHeight
          className="w-[400px] border-t-0 border-b-0 border-l-0 flex-shrink-0"
        >
          <VStack gap="none" className="h-full">
            <Box
              padding="md"
              border
              className="border-t-0 border-l-0 border-r-0"
            >
              <HStack justify="between" align="center">
                <Typography variant="h3">AI Assistant</Typography>
              </HStack>
            </Box>
            <VStack flex className="overflow-auto">
              {agentPanel || (
                <Box padding="lg">
                  <VStack gap="md" align="center" className="py-12">
                    <Typography
                      variant="body2"
                      className="text-[var(--color-muted-foreground)] text-center"
                    >
                      AI Assistant will appear here
                    </Typography>
                  </VStack>
                </Box>
              )}
            </VStack>
          </VStack>
        </Box>
      )}

      {/* Main Content */}
      <VStack flex gap="none" className="h-full overflow-hidden">
        {/* Header */}
        <Box
          padding="md"
          paddingX="lg"
          border
          className="border-t-0 border-l-0 border-r-0 bg-[var(--color-surface)] backdrop-blur-sm flex-shrink-0"
        >
          <HStack justify="between" align="center">
            <HStack gap="sm" align="center">
              <OrbitalsLogo size={40} borderRadius={10} className="shadow-lg" />
              <VStack gap="none">
                <Typography variant="h3">My Applications</Typography>
                <Typography
                  variant="caption"
                  className="text-[var(--color-muted-foreground)]"
                >
                  {projectsList.length}{" "}
                  {projectsList.length === 1 ? "project" : "projects"}
                </Typography>
              </VStack>
            </HStack>
            <HStack gap="sm" align="center">
              <Button onClick={handleCreateProject}>
                <HStack gap="xs" align="center">
                  <Icon icon={Plus} size="sm" />
                  <Typography as="span" variant="body2">New Application</Typography>
                </HStack>
              </Button>
              <ThemeToggle size="sm" />
            </HStack>
          </HStack>
        </Box>

        {/* Scrollable content */}
        <VStack flex className="overflow-auto">
          <Box padding="lg" className="max-w-7xl mx-auto w-full">
            {isLoading ? (
              <VStack gap="md" align="center" className="py-16">
                <Spinner size="lg" />
                <Typography
                  variant="body2"
                  className="text-[var(--color-muted-foreground)]"
                >
                  Loading your applications...
                </Typography>
              </VStack>
            ) : error ? (
              <Card padding="md" className="border-[var(--color-error)]">
                <HStack gap="sm" align="center">
                  <AlertTriangle className="w-5 h-5 text-[var(--color-error)]" />
                  <Typography variant="body1" className="flex-1">
                    {error}
                  </Typography>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      emit(`UI:${createProjectEvent}`, { action: "retry" })
                    }
                  >
                    Retry
                  </Button>
                </HStack>
              </Card>
            ) : projectsList.length === 0 ? (
              <VStack gap="lg" align="center" className="py-16">
                <Box className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 flex items-center justify-center">
                  <Icon
                    icon={FolderOpen}
                    size="lg"
                    className="text-[var(--color-primary)]"
                  />
                </Box>
                <VStack gap="xs" align="center">
                  <Typography variant="h4">No applications yet</Typography>
                  <Typography
                    variant="body1"
                    className="text-[var(--color-muted-foreground)] text-center max-w-md"
                  >
                    Start designing your first application by describing what
                    you want to build. Our AI will guide you through the
                    requirements gathering process.
                  </Typography>
                </VStack>
                <Button
                  onClick={handleCreateProject}
                  size="lg"
                  leftIcon={
                    <OrbitalsLogo size={20} borderRadius={4} />
                  }
                >
                  Create Your First App
                </Button>
              </VStack>
            ) : (
              <VStack gap="lg">
                {/* Summary Stats */}
                {hasStats && (
                  <Box className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard
                      icon={FolderOpen}
                      value={summaryStats.totalApps}
                      label="Applications"
                      iconColor="text-[var(--color-primary)]"
                      bgStyle={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)' }}
                    />
                    <StatCard
                      icon={Layers}
                      value={summaryStats.totalStates}
                      label="Total States"
                      iconColor=""
                      iconStyle={{ color: 'var(--color-info)' }}
                      bgStyle={{ backgroundColor: 'color-mix(in srgb, var(--color-info) 15%, transparent)' }}
                    />
                    <StatCard
                      icon={Zap}
                      value={summaryStats.totalEvents}
                      label="Total Events"
                      iconColor=""
                      iconStyle={{ color: 'var(--color-warning)' }}
                      bgStyle={{ backgroundColor: 'color-mix(in srgb, var(--color-warning) 15%, transparent)' }}
                    />
                    <StatCard
                      icon={
                        summaryStats.withIssues > 0
                          ? AlertTriangle
                          : CheckCircle2
                      }
                      value={
                        summaryStats.withIssues > 0
                          ? summaryStats.withIssues
                          : "\u2713"
                      }
                      label={
                        summaryStats.withIssues > 0
                          ? "Need Attention"
                          : "All Valid"
                      }
                      iconColor=""
                      iconStyle={{
                        color: summaryStats.withIssues > 0
                          ? 'var(--color-warning)'
                          : 'var(--color-success)',
                      }}
                      bgStyle={{
                        backgroundColor: summaryStats.withIssues > 0
                          ? 'color-mix(in srgb, var(--color-warning) 15%, transparent)'
                          : 'color-mix(in srgb, var(--color-success) 15%, transparent)',
                      }}
                    />
                  </Box>
                )}

                {/* Search + Sort */}
                <HStack gap="sm" align="center">
                  <HStack
                    gap="xs"
                    align="center"
                    className="flex-1 px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
                  >
                    <Icon
                      icon={Search}
                      size="sm"
                      className="text-[var(--color-muted-foreground)] flex-shrink-0"
                    />
                    <Input
                      value={localSearch}
                      onChange={(e) => handleSearch(e.target.value)}
                      placeholder="Search applications..."
                      className="flex-1 border-0 bg-transparent p-0 focus:ring-0"
                    />
                  </HStack>
                  <HStack gap="xs" align="center">
                    <Icon
                      icon={ArrowUpDown}
                      size="sm"
                      className="text-[var(--color-muted-foreground)]"
                    />
                    <Select
                      value={localSort}
                      onChange={(e) =>
                        handleSortChange(e.target.value as SortBy)
                      }
                      className="px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm focus:ring-2 focus:ring-[var(--color-primary)]"
                      options={[
                        { value: "updated", label: "Recently Updated" },
                        { value: "created", label: "Recently Created" },
                        { value: "name", label: "Name (A-Z)" },
                      ]}
                    />
                  </HStack>
                </HStack>

                {/* Project Grid */}
                {sortedProjects.length === 0 ? (
                  <Card padding="lg" className="text-center">
                    <VStack gap="sm" align="center">
                      <Icon
                        icon={Search}
                        size="lg"
                        className="text-[var(--color-muted-foreground)] opacity-30"
                      />
                      <Typography
                        variant="h5"
                        className="text-[var(--color-muted-foreground)]"
                      >
                        No matching applications
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-[var(--color-muted-foreground)]"
                      >
                        Try a different search term
                      </Typography>
                    </VStack>
                  </Card>
                ) : (
                  <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        isSelected={selectedProject?.id === project.id}
                        onSelect={() => handleSelectProject(project)}
                        onOpen={(e) => handleOpenProject(project, e)}
                        onPreview={(e) => handlePreviewProject(project, e)}
                        onDelete={(e) => handleDeleteProject(project, e)}
                      />
                    ))}
                  </Box>
                )}
              </VStack>
            )}
          </Box>
        </VStack>
      </VStack>
    </HStack>
  );
};

StudioHomeWebBoard.displayName = "StudioHomeWebBoard";
