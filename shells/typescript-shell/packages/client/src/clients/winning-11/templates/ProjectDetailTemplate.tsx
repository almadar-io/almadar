/**
 * ProjectDetailTemplate
 *
 * Template for the Project Detail page (/projects/:id).
 * Displays a single Project entity with full details and team info.
 *
 * Page: ProjectDetailPage
 * Entity: Project
 * ViewType: detail
 */

import React from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Button } from "../../../components/atoms/Button";
import { Card } from "../../../components/atoms/Card";
import { Badge } from "../../../components/atoms/Badge";
import { Avatar } from "../../../components/atoms/Avatar";
import { Spinner } from "../../../components/atoms/Spinner";
import { useEventBus } from "../../../hooks/useEventBus";
import {
  ArrowLeft,
  Edit,
  FolderKanban,
  Users,
  Calendar,
  Target,
  CheckCircle,
  Clock,
  PlayCircle,
  PauseCircle,
  Settings,
  UserPlus,
  BarChart3,
} from "lucide-react";

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

export interface ProjectDetailTemplateProps {
  /** Project data to display */
  project?: ProjectDetailData;
  /** Data prop alias */
  data?: ProjectDetailData;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Show back button */
  showBack?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const getStatusConfig = (status: ProjectDetailData["status"]) => {
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

export const ProjectDetailTemplate: React.FC<ProjectDetailTemplateProps> = ({
  project: projectProp,
  data,
  isLoading = false,
  error = null,
  showBack = true,
  className,
}) => {
  const eventBus = useEventBus();
  const project = projectProp || data;

  // Handle back navigation
  const handleBack = () => {
    eventBus.emit("UI:BACK", {});
  };

  // Handle edit
  const handleEdit = () => {
    if (project) {
      eventBus.emit("UI:EDIT", { row: project, entity: "Project" });
    }
  };

  // Handle add member
  const handleAddMember = () => {
    if (project) {
      eventBus.emit("UI:ADD_MEMBER", { projectId: project.id });
    }
  };

  if (isLoading) {
    return (
      <VStack align="center" justify="center" className={cn("py-12", className)}>
        <Spinner size="lg" />
        <Typography variant="body" className="text-neutral-500">
          Loading project...
        </Typography>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack align="center" justify="center" className={cn("py-12", className)}>
        <Typography variant="body" className="text-red-500">
          Error: {error.message}
        </Typography>
      </VStack>
    );
  }

  if (!project) {
    return (
      <VStack align="center" justify="center" className={cn("py-12", className)}>
        <Typography variant="body" className="text-neutral-500">
          Project not found
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
              Back
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
            Edit
          </Button>
          <Button variant="secondary" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </HStack>
      </HStack>

      {/* Status and Meta */}
      <HStack gap="md" wrap>
        <Badge variant={statusConfig.color} size="lg" className="gap-1">
          <StatusIcon className="h-4 w-4" />
          {statusConfig.label}
        </Badge>
        {project.priority && (
          <Badge variant={getPriorityColor(project.priority)} size="lg">
            {project.priority} priority
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
              <Typography variant="h4">Description</Typography>
              <Typography variant="body" className="text-neutral-600">
                {project.description || "No description provided."}
              </Typography>
            </VStack>
          </Card>

          {/* Progress */}
          {project.progress !== undefined && (
            <Card className="p-4">
              <VStack gap="sm">
                <HStack justify="between" align="center">
                  <Typography variant="h4">Progress</Typography>
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
                  <Typography variant="h4">Milestones</Typography>
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
                          milestone.completed && "line-through text-neutral-400"
                        )}
                      >
                        {milestone.name}
                      </Typography>
                      {milestone.dueDate && (
                        <Typography variant="small" className="text-neutral-400 ml-auto">
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
                <Typography variant="h4">Goals</Typography>
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
                <Typography variant="h4">Team</Typography>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAddMember}
                  className="gap-1"
                >
                  <UserPlus className="h-3 w-3" />
                  Add
                </Button>
              </HStack>

              {project.teamName && (
                <HStack gap="sm" align="center" className="text-neutral-600">
                  <Users className="h-4 w-4" />
                  <Typography variant="body">{project.teamName}</Typography>
                </HStack>
              )}

              {project.members && project.members.length > 0 ? (
                <VStack gap="sm">
                  {project.members.slice(0, 5).map((member) => (
                    <HStack key={member.id} gap="sm" align="center">
                      <Avatar name={member.userName || "User"} size="sm" />
                      <VStack gap="none" className="flex-1">
                        <Typography variant="small" className="font-medium">
                          {member.userName || `User ${member.userId.slice(-4)}`}
                        </Typography>
                        <Typography variant="small" className="text-neutral-400">
                          {member.role}
                        </Typography>
                      </VStack>
                    </HStack>
                  ))}
                  {project.members.length > 5 && (
                    <Typography variant="small" className="text-neutral-500">
                      +{project.members.length - 5} more
                    </Typography>
                  )}
                </VStack>
              ) : (
                <Typography variant="small" className="text-neutral-400">
                  No team members yet
                </Typography>
              )}
            </VStack>
          </Card>

          {/* Details Card */}
          <Card className="p-4">
            <VStack gap="md">
              <Typography variant="h4">Details</Typography>

              <VStack gap="sm">
                <HStack justify="between">
                  <Typography variant="small" className="text-neutral-500">
                    Owner
                  </Typography>
                  <Typography variant="small">
                    {project.ownerName || `User ${project.ownerId.slice(-4)}`}
                  </Typography>
                </HStack>

                {project.startDate && (
                  <HStack justify="between">
                    <Typography variant="small" className="text-neutral-500">
                      Start Date
                    </Typography>
                    <Typography variant="small">
                      {new Date(project.startDate).toLocaleDateString()}
                    </Typography>
                  </HStack>
                )}

                {project.endDate && (
                  <HStack justify="between">
                    <Typography variant="small" className="text-neutral-500">
                      End Date
                    </Typography>
                    <Typography variant="small">
                      {new Date(project.endDate).toLocaleDateString()}
                    </Typography>
                  </HStack>
                )}

                <HStack justify="between">
                  <Typography variant="small" className="text-neutral-500">
                    Created
                  </Typography>
                  <Typography variant="small">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </Typography>
                </HStack>

                {project.updatedAt && (
                  <HStack justify="between">
                    <Typography variant="small" className="text-neutral-500">
                      Last Updated
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
              <Typography variant="h4">Quick Actions</Typography>
              <Button
                variant="secondary"
                className="w-full gap-2 justify-start"
                onClick={() => eventBus.emit("UI:VIEW_ANALYTICS", { projectId: project.id })}
              >
                <BarChart3 className="h-4 w-4" />
                View Analytics
              </Button>
              <Button
                variant="secondary"
                className="w-full gap-2 justify-start"
                onClick={() => eventBus.emit("UI:VIEW_TEAM", { teamId: project.teamId })}
              >
                <Users className="h-4 w-4" />
                Manage Team
              </Button>
            </VStack>
          </Card>
        </VStack>
      </Box>
    </VStack>
  );
};

ProjectDetailTemplate.displayName = "ProjectDetailTemplate";
