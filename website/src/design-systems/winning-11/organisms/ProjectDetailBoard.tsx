/**
 * ProjectDetailBoard
 *
 * Organism that contains all logic, sub-components, and layout
 * for the Project Detail page. The template is a thin wrapper.
 */

import React from "react";
import {
  ArrowLeft,
  Edit,
  FolderKanban,
  Users,
  Target,
  CheckCircle,
  Clock,
  PlayCircle,
  PauseCircle,
  Settings,
  UserPlus,
  BarChart3,
} from "lucide-react";
import {
  cn,
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  Card,
  Badge,
  Avatar,
  Spinner,
  useEventBus,
  useTranslate,
  type EntityDisplayProps,
} from "@almadar/ui";

// ── Types ──────────────────────────────────────────────────────────

export interface ProjectMember {
  id: string;
  userId: string;
  userName?: string;
  role: string;
  joinedAt: string;
}

export interface ProjectDetailData {
  id: string;
  name: string;
  description?: string;
  status: "planning" | "active" | "paused" | "completed" | "archived";
  priority?: "low" | "medium" | "high" | "critical";
  ownerId: string;
  ownerName?: string;
  teamId?: string;
  teamName?: string;
  members?: ProjectMember[];
  memberCount?: number;
  progress?: number;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt?: string;
  tags?: string[];
  goals?: string[];
  milestones?: { name: string; completed: boolean; dueDate?: string }[];
}

export interface ProjectDetailBoardProps extends Omit<EntityDisplayProps, 'entity'> {
  /** Entity data (single object) */
  entity?: ProjectDetailData;
  /** Show back button */
  showBack?: boolean;
  /** Event name for edit action */
  editEvent: string;
  /** Event name for delete action */
  deleteEvent: string;
  /** Event name for back navigation */
  backEvent: string;
  /** Event name for adding a member */
  addMemberEvent: string;
  /** Event name for removing a member */
  removeMemberEvent: string;
  /** Event name for adding a goal */
  addGoalEvent: string;
  /** Event name for viewing a member */
  viewMemberEvent: string;
}

// ── Helpers ────────────────────────────────────────────────────────

const getStatusConfig = (status: ProjectDetailData["status"]) => {
  switch (status) {
    case "active":
      return { color: "success" as const, icon: PlayCircle, labelKey: "projectDetail.statusActive" };
    case "planning":
      return { color: "info" as const, icon: Clock, labelKey: "projectDetail.statusPlanning" };
    case "paused":
      return { color: "warning" as const, icon: PauseCircle, labelKey: "projectDetail.statusPaused" };
    case "completed":
      return { color: "success" as const, icon: CheckCircle, labelKey: "projectDetail.statusCompleted" };
    case "archived":
      return { color: "neutral" as const, icon: FolderKanban, labelKey: "projectDetail.statusArchived" };
    default:
      return { color: "neutral" as const, icon: Clock, labelKey: status };
  }
};

const getPriorityColor = (priority?: ProjectDetailData["priority"]) => {
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

// ── Main Board ─────────────────────────────────────────────────────

export const ProjectDetailBoard: React.FC<ProjectDetailBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  showBack = true,
  className,
  editEvent,
  backEvent,
  addMemberEvent,
}) => {
  const eventBus = useEventBus();
  const { t } = useTranslate();
  const project = entity;

  const handleBack = () => {
    eventBus.emit(`UI:${backEvent}`, {});
  };

  const handleEdit = () => {
    if (project) {
      eventBus.emit(`UI:${editEvent}`, { row: project, entity: "Project" });
    }
  };

  const handleAddMember = () => {
    if (project) {
      eventBus.emit(`UI:${addMemberEvent}`, { projectId: project.id });
    }
  };

  if (isLoading) {
    return (
      <VStack align="center" justify="center" className={cn("py-12", className)}>
        <Spinner size="lg" />
        <Typography variant="body" className="text-[var(--color-muted-foreground)]">
          {t('projectDetail.loading')}
        </Typography>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack align="center" justify="center" className={cn("py-12", className)}>
        <Typography variant="body" className="text-red-500">
          {t('projectDetail.error', { message: error.message })}
        </Typography>
      </VStack>
    );
  }

  if (!project) {
    return (
      <VStack align="center" justify="center" className={cn("py-12", className)}>
        <Typography variant="body" className="text-[var(--color-muted-foreground)]">
          {t('projectDetail.notFound')}
        </Typography>
      </VStack>
    );
  }

  const statusConfig = getStatusConfig(project.status);
  const StatusIcon = statusConfig.icon;

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {/* Header */}
      <HStack justify="between" align="center" wrap>
        <HStack gap="md" align="center">
          {showBack && (
            <Button variant="ghost" onClick={handleBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t('projectDetail.back')}
            </Button>
          )}
          <VStack gap="xs">
            <HStack gap="sm" align="center">
              <Box rounded="lg" padding="sm" className="bg-blue-100">
                <FolderKanban className="h-6 w-6 text-blue-600" />
              </Box>
              <Typography variant="h1">{project.name}</Typography>
            </HStack>
          </VStack>
        </HStack>

        <HStack gap="sm">
          <Button variant="secondary" onClick={handleEdit} className="gap-2">
            <Edit className="h-4 w-4" />
            {t('projectDetail.edit')}
          </Button>
          <Button variant="secondary" className="gap-2">
            <Settings className="h-4 w-4" />
            {t('projectDetail.settings')}
          </Button>
        </HStack>
      </HStack>

      {/* Status and Meta */}
      <HStack gap="md" wrap>
        <Badge variant={statusConfig.color} size="lg" className="gap-1">
          <StatusIcon className="h-4 w-4" />
          {t(statusConfig.labelKey)}
        </Badge>
        {project.priority && (
          <Badge variant={getPriorityColor(project.priority)} size="lg">
            {t(`projectDetail.priority${project.priority.charAt(0).toUpperCase()}${project.priority.slice(1)}`)}
          </Badge>
        )}
        {project.tags?.map((tag) => (
          <Badge key={tag} variant="neutral">
            {tag}
          </Badge>
        ))}
      </HStack>

      {/* Main Content Grid */}
      <Box className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <VStack gap="md" className="lg:col-span-2">
          {/* Description */}
          <Card className="p-4">
            <VStack gap="sm">
              <Typography variant="h4">{t('projectDetail.description')}</Typography>
              <Typography variant="body" className="text-[var(--color-foreground)]">
                {project.description || t('projectDetail.noDescription')}
              </Typography>
            </VStack>
          </Card>

          {/* Progress */}
          {project.progress !== undefined && (
            <Card className="p-4">
              <VStack gap="sm">
                <HStack justify="between" align="center">
                  <Typography variant="h4">{t('projectDetail.progress')}</Typography>
                  <Typography variant="h3" className="text-blue-600">
                    {project.progress}%
                  </Typography>
                </HStack>
                <Box className="w-full bg-neutral-200 rounded-full h-3">
                  <Box
                    className={cn(
                      "rounded-full h-3 transition-all",
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
            </Card>
          )}

          {/* Milestones */}
          {project.milestones && project.milestones.length > 0 && (
            <Card className="p-4">
              <VStack gap="md">
                <HStack justify="between" align="center">
                  <Typography variant="h4">{t('projectDetail.milestones')}</Typography>
                  <Badge variant="info">
                    {project.milestones.filter((m) => m.completed).length}/
                    {project.milestones.length}
                  </Badge>
                </HStack>
                <VStack gap="sm">
                  {project.milestones.map((milestone, idx) => (
                    <HStack
                      key={idx}
                      gap="sm"
                      align="center"
                      className="p-2 rounded-lg hover:bg-neutral-50"
                    >
                      <Box
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center",
                          milestone.completed
                            ? "bg-emerald-100"
                            : "bg-neutral-100"
                        )}
                      >
                        {milestone.completed && (
                          <CheckCircle className="h-3 w-3 text-emerald-600" />
                        )}
                      </Box>
                      <Typography
                        variant="body"
                        className={cn(
                          milestone.completed && "line-through text-[var(--color-muted-foreground)]"
                        )}
                      >
                        {milestone.name}
                      </Typography>
                      {milestone.dueDate && (
                        <Typography variant="small" className="text-[var(--color-muted-foreground)] ml-auto">
                          {new Date(milestone.dueDate).toLocaleDateString()}
                        </Typography>
                      )}
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </Card>
          )}

          {/* Goals */}
          {project.goals && project.goals.length > 0 && (
            <Card className="p-4">
              <VStack gap="md">
                <Typography variant="h4">{t('projectDetail.goals')}</Typography>
                <VStack gap="sm">
                  {project.goals.map((goal, idx) => (
                    <HStack key={idx} gap="sm" align="start">
                      <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                      <Typography variant="body">{goal}</Typography>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </Card>
          )}
        </VStack>

        {/* Right Column - Team & Info */}
        <VStack gap="md">
          {/* Team Card */}
          <Card className="p-4">
            <VStack gap="md">
              <HStack justify="between" align="center">
                <Typography variant="h4">{t('projectDetail.team')}</Typography>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAddMember}
                  className="gap-1"
                >
                  <UserPlus className="h-3 w-3" />
                  {t('projectDetail.add')}
                </Button>
              </HStack>

              {project.teamName && (
                <HStack gap="sm" align="center" className="text-[var(--color-foreground)]">
                  <Users className="h-4 w-4" />
                  <Typography variant="body">{project.teamName}</Typography>
                </HStack>
              )}

              {project.members && project.members.length > 0 ? (
                <VStack gap="sm">
                  {project.members.slice(0, 5).map((member) => (
                    <HStack key={member.id} gap="sm" align="center">
                      <Avatar name={member.userName || t('projectDetail.user')} size="sm" />
                      <VStack gap="none" className="flex-1">
                        <Typography variant="small" className="font-medium">
                          {member.userName || t('projectDetail.userWithId', { id: member.userId.slice(-4) })}
                        </Typography>
                        <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                          {member.role}
                        </Typography>
                      </VStack>
                    </HStack>
                  ))}
                  {project.members.length > 5 && (
                    <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                      {t('projectDetail.moreMembers', { count: project.members.length - 5 })}
                    </Typography>
                  )}
                </VStack>
              ) : (
                <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                  {t('projectDetail.noTeamMembers')}
                </Typography>
              )}
            </VStack>
          </Card>

          {/* Details Card */}
          <Card className="p-4">
            <VStack gap="md">
              <Typography variant="h4">{t('projectDetail.details')}</Typography>

              <VStack gap="sm">
                <HStack justify="between">
                  <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                    {t('projectDetail.owner')}
                  </Typography>
                  <Typography variant="small">
                    {project.ownerName || t('projectDetail.userWithId', { id: project.ownerId.slice(-4) })}
                  </Typography>
                </HStack>

                {project.startDate && (
                  <HStack justify="between">
                    <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                      {t('projectDetail.startDate')}
                    </Typography>
                    <Typography variant="small">
                      {new Date(project.startDate).toLocaleDateString()}
                    </Typography>
                  </HStack>
                )}

                {project.endDate && (
                  <HStack justify="between">
                    <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                      {t('projectDetail.endDate')}
                    </Typography>
                    <Typography variant="small">
                      {new Date(project.endDate).toLocaleDateString()}
                    </Typography>
                  </HStack>
                )}

                <HStack justify="between">
                  <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                    {t('projectDetail.created')}
                  </Typography>
                  <Typography variant="small">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </Typography>
                </HStack>

                {project.updatedAt && (
                  <HStack justify="between">
                    <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                      {t('projectDetail.lastUpdated')}
                    </Typography>
                    <Typography variant="small">
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </Typography>
                  </HStack>
                )}
              </VStack>
            </VStack>
          </Card>

          {/* Quick Actions */}
          <Card className="p-4">
            <VStack gap="sm">
              <Typography variant="h4">{t('projectDetail.quickActions')}</Typography>
              <Button
                variant="secondary"
                className="w-full gap-2 justify-start"
                onClick={() => eventBus.emit("UI:VIEW_ANALYTICS", { projectId: project.id })}
              >
                <BarChart3 className="h-4 w-4" />
                {t('projectDetail.viewAnalytics')}
              </Button>
              <Button
                variant="secondary"
                className="w-full gap-2 justify-start"
                onClick={() => eventBus.emit("UI:VIEW_TEAM", { teamId: project.teamId })}
              >
                <Users className="h-4 w-4" />
                {t('projectDetail.manageTeam')}
              </Button>
            </VStack>
          </Card>
        </VStack>
      </Box>
    </VStack>
  );
};

ProjectDetailBoard.displayName = "ProjectDetailBoard";
