/**
 * AssessmentTemplate
 *
 * Template for the Assessment page (/assessment).
 * Displays psychological assessments for trust scoring.
 *
 * Page: AssessmentPage
 * Entity: Assessment
 * ViewType: list
 */

import React from "react";
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
  ClipboardList,
  CheckCircle,
  Clock,
  PlayCircle,
  Eye,
  BarChart3,
  User,
} from "lucide-react";

export interface AssessmentData {
  id: string;
  userId: string;
  userName?: string;
  status: "pending" | "in_progress" | "completed" | "expired";
  type: string;
  score?: number;
  startedAt?: string;
  completedAt?: string;
  expiresAt?: string;
  questionCount?: number;
  answeredCount?: number;
}

export interface AssessmentTemplateProps {
  /** Assessment items to display */
  items?: readonly AssessmentData[];
  /** Data prop alias */
  data?: readonly AssessmentData[];
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
}

const getStatusConfig = (status: AssessmentData["status"]) => {
  switch (status) {
    case "completed":
      return { color: "success" as const, icon: CheckCircle, label: "Completed" };
    case "in_progress":
      return { color: "info" as const, icon: PlayCircle, label: "In Progress" };
    case "pending":
      return { color: "warning" as const, icon: Clock, label: "Pending" };
    case "expired":
      return { color: "error" as const, icon: Clock, label: "Expired" };
    default:
      return { color: "neutral" as const, icon: Clock, label: status };
  }
};

const AssessmentCard: React.FC<{
  assessment: AssessmentData;
  onAction: (action: string, assessment: AssessmentData) => void;
}> = ({ assessment, onAction }) => {
  const statusConfig = getStatusConfig(assessment.status);
  const StatusIcon = statusConfig.icon;
  const progress =
    assessment.questionCount && assessment.answeredCount
      ? Math.round((assessment.answeredCount / assessment.questionCount) * 100)
      : 0;

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <VStack gap="md">
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            <Box rounded="lg" padding="sm" className="bg-purple-100">
              <ClipboardList className="h-5 w-5 text-purple-600" />
            </Box>
            <VStack gap="none">
              <Typography variant="body" className="font-medium">
                {assessment.type}
              </Typography>
              <HStack gap="xs" align="center" className="text-neutral-500">
                <User className="h-3 w-3" />
                <Typography variant="small">
                  {assessment.userName || `User ${assessment.userId.slice(-4)}`}
                </Typography>
              </HStack>
            </VStack>
          </HStack>
          <Badge variant={statusConfig.color} className="gap-1">
            <StatusIcon className="h-3 w-3" />
            {statusConfig.label}
          </Badge>
        </HStack>

        {/* Progress bar for in-progress assessments */}
        {assessment.status === "in_progress" && assessment.questionCount && (
          <VStack gap="xs">
            <HStack justify="between">
              <Typography variant="small" className="text-neutral-500">
                Progress
              </Typography>
              <Typography variant="small" className="text-neutral-500">
                {assessment.answeredCount || 0}/{assessment.questionCount} questions
              </Typography>
            </HStack>
            <Box className="w-full bg-neutral-200 rounded-full h-2">
              <Box
                className="bg-purple-600 rounded-full h-2 transition-all"
                style={{ width: `${progress}%` }}
              />
            </Box>
          </VStack>
        )}

        {/* Score for completed assessments */}
        {assessment.status === "completed" && assessment.score !== undefined && (
          <HStack gap="sm" align="center">
            <BarChart3 className="h-4 w-4 text-emerald-500" />
            <Typography variant="body" className="font-medium text-emerald-600">
              Score: {assessment.score}
            </Typography>
          </HStack>
        )}

        <HStack gap="md" className="text-neutral-500">
          {assessment.startedAt && (
            <HStack gap="xs" align="center">
              <Clock className="h-3 w-3" />
              <Typography variant="small">
                Started {new Date(assessment.startedAt).toLocaleDateString()}
              </Typography>
            </HStack>
          )}
          {assessment.completedAt && (
            <Typography variant="small">
              Completed {new Date(assessment.completedAt).toLocaleDateString()}
            </Typography>
          )}
        </HStack>

        <HStack gap="sm" className="pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("VIEW", assessment)}
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            View
          </Button>
          {assessment.status === "pending" && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onAction("START", assessment)}
              className="gap-1"
            >
              <PlayCircle className="h-3 w-3" />
              Start
            </Button>
          )}
          {assessment.status === "in_progress" && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onAction("CONTINUE", assessment)}
              className="gap-1"
            >
              <PlayCircle className="h-3 w-3" />
              Continue
            </Button>
          )}
        </HStack>
      </VStack>
    </Card>
  );
};

export const AssessmentTemplate: React.FC<AssessmentTemplateProps> = ({
  items,
  data,
  isLoading = false,
  error = null,
  title = "Assessments",
  subtitle = "Psychological compatibility assessments",
  showHeader = true,
  showSearch = true,
  className,
}) => {
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const assessments = items || data || [];

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    eventBus.emit("UI:SEARCH", { searchTerm: value });
  };

  // Handle create
  const handleCreate = () => {
    eventBus.emit("UI:CREATE", { entity: "Assessment" });
  };

  // Handle assessment actions
  const handleAction = (action: string, assessment: AssessmentData) => {
    eventBus.emit(`UI:${action}`, { row: assessment, entity: "Assessment" });
  };

  // Filter assessments
  const filteredAssessments = assessments.filter((a) => {
    if (statusFilter !== "all" && a.status !== statusFilter) {
      return false;
    }
    if (searchTerm) {
      return (
        a.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return true;
  });

  // Stats
  const stats = {
    total: assessments.length,
    pending: assessments.filter((a) => a.status === "pending").length,
    inProgress: assessments.filter((a) => a.status === "in_progress").length,
    completed: assessments.filter((a) => a.status === "completed").length,
  };

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
            New Assessment
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
            <Typography variant="small" className="text-neutral-500">
              Total
            </Typography>
          </VStack>
        </Card>
        <Card
          className={cn(
            "px-4 py-2 cursor-pointer",
            statusFilter === "pending" && "ring-2 ring-amber-500"
          )}
          onClick={() => setStatusFilter("pending")}
        >
          <VStack gap="none" align="center">
            <Typography variant="h4" className="text-amber-600">
              {stats.pending}
            </Typography>
            <Typography variant="small" className="text-neutral-500">
              Pending
            </Typography>
          </VStack>
        </Card>
        <Card
          className={cn(
            "px-4 py-2 cursor-pointer",
            statusFilter === "in_progress" && "ring-2 ring-blue-500"
          )}
          onClick={() => setStatusFilter("in_progress")}
        >
          <VStack gap="none" align="center">
            <Typography variant="h4" className="text-blue-600">
              {stats.inProgress}
            </Typography>
            <Typography variant="small" className="text-neutral-500">
              In Progress
            </Typography>
          </VStack>
        </Card>
        <Card
          className={cn(
            "px-4 py-2 cursor-pointer",
            statusFilter === "completed" && "ring-2 ring-emerald-500"
          )}
          onClick={() => setStatusFilter("completed")}
        >
          <VStack gap="none" align="center">
            <Typography variant="h4" className="text-emerald-600">
              {stats.completed}
            </Typography>
            <Typography variant="small" className="text-neutral-500">
              Completed
            </Typography>
          </VStack>
        </Card>
      </HStack>

      {/* Toolbar */}
      {showSearch && (
        <Box className="w-full max-w-sm">
          <Input
            placeholder="Search assessments..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            leftIcon={<Search className="h-4 w-4 text-neutral-400" />}
          />
        </Box>
      )}

      {/* Loading State */}
      {isLoading && (
        <VStack align="center" justify="center" className="py-12">
          <Spinner size="lg" />
          <Typography variant="body" className="text-neutral-500">
            Loading assessments...
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

      {/* Assessments Grid */}
      {!isLoading && !error && (
        <>
          {filteredAssessments.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <ClipboardList className="h-12 w-12 text-neutral-300" />
              <Typography variant="h3" className="text-neutral-500">
                No assessments found
              </Typography>
              <Typography variant="body" className="text-neutral-400">
                {searchTerm || statusFilter !== "all"
                  ? "Try different filters"
                  : "Create a new assessment to get started"}
              </Typography>
            </VStack>
          ) : (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAssessments.map((assessment) => (
                <AssessmentCard
                  key={assessment.id}
                  assessment={assessment}
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

AssessmentTemplate.displayName = "AssessmentTemplate";
