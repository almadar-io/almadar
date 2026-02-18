/**
 * AssessmentsBoard
 *
 * Organism that contains all logic, sub-components, and layout
 * for the Assessments page. The template is a thin wrapper.
 */

import React from "react";
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
  useTranslate,
} from "@almadar/ui";

// ── Types ──────────────────────────────────────────────────────────

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

export interface AssessmentsBoardProps {
  /** Entity data (assessment items) */
  entity?: readonly AssessmentData[];
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
  /** Event name for create action */
  createEvent: string;
  /** Event name for view action */
  viewEvent: string;
  /** Event name for edit action */
  editEvent: string;
  /** Event name for search action */
  searchEvent: string;
  /** Event name for filter action */
  filterEvent: string;
}

// ── Helpers ────────────────────────────────────────────────────────

const getStatusConfig = (status: AssessmentData["status"], t: (key: string) => string) => {
  switch (status) {
    case "completed":
      return {
        color: "success" as const,
        icon: CheckCircle,
        label: t("assessments.statusCompleted"),
      };
    case "in_progress":
      return {
        color: "info" as const,
        icon: PlayCircle,
        label: t("assessments.statusInProgress"),
      };
    case "pending":
      return { color: "warning" as const, icon: Clock, label: t("assessments.statusPending") };
    case "expired":
      return { color: "error" as const, icon: Clock, label: t("assessments.statusExpired") };
    default:
      return { color: "neutral" as const, icon: Clock, label: status };
  }
};

// ── Sub-components ─────────────────────────────────────────────────

const AssessmentCard: React.FC<{
  assessment: AssessmentData;
  onAction: (action: string, assessment: AssessmentData) => void;
}> = ({ assessment, onAction }) => {
  const { t } = useTranslate();
  const statusConfig = getStatusConfig(assessment.status, t);
  const StatusIcon = statusConfig.icon;
  const progress =
    assessment.questionCount && assessment.answeredCount
      ? Math.round(
          (assessment.answeredCount / assessment.questionCount) * 100
        )
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
              <HStack
                gap="xs"
                align="center"
                className="text-[var(--color-muted-foreground)]"
              >
                <User className="h-3 w-3" />
                <Typography variant="small">
                  {assessment.userName ||
                    t("assessments.userFallback", { id: assessment.userId.slice(-4) })}
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
              <Typography
                variant="small"
                className="text-[var(--color-muted-foreground)]"
              >
                {t("assessments.progress")}
              </Typography>
              <Typography
                variant="small"
                className="text-[var(--color-muted-foreground)]"
              >
                {t("assessments.questionsProgress", { answered: assessment.answeredCount || 0, total: assessment.questionCount })}
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
        {assessment.status === "completed" &&
          assessment.score !== undefined && (
            <HStack gap="sm" align="center">
              <BarChart3 className="h-4 w-4 text-emerald-500" />
              <Typography
                variant="body"
                className="font-medium text-emerald-600"
              >
                {t("assessments.score", { score: assessment.score })}
              </Typography>
            </HStack>
          )}

        <HStack gap="md" className="text-[var(--color-muted-foreground)]">
          {assessment.startedAt && (
            <HStack gap="xs" align="center">
              <Clock className="h-3 w-3" />
              <Typography variant="small">
                {t("assessments.started", { date: new Date(assessment.startedAt).toLocaleDateString() })}
              </Typography>
            </HStack>
          )}
          {assessment.completedAt && (
            <Typography variant="small">
              {t("assessments.completed", { date: new Date(assessment.completedAt).toLocaleDateString() })}
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
            {t("assessments.view")}
          </Button>
          {assessment.status === "pending" && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onAction("START", assessment)}
              className="gap-1"
            >
              <PlayCircle className="h-3 w-3" />
              {t("assessments.start")}
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
              {t("assessments.continue")}
            </Button>
          )}
        </HStack>
      </VStack>
    </Card>
  );
};

// ── Main Board ─────────────────────────────────────────────────────

export const AssessmentsBoard: React.FC<AssessmentsBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  title,
  subtitle,
  showHeader = true,
  showSearch = true,
  className,
  createEvent,
  viewEvent,
  searchEvent,
}) => {
  const { t } = useTranslate();
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const assessments = entity || [];

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    eventBus.emit(`UI:${searchEvent}`, { searchTerm: value });
  };

  // Handle create
  const handleCreate = () => {
    eventBus.emit(`UI:${createEvent}`, { entity: "Assessment" });
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
            <Typography variant="h1">{title || t("assessments.title")}</Typography>
            <Typography
              variant="body"
              className="text-[var(--color-muted-foreground)]"
            >
              {subtitle || t("assessments.subtitle")}
            </Typography>
          </VStack>

          <Button
            variant="primary"
            onClick={handleCreate}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            {t("assessments.newAssessment")}
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
            <Typography
              variant="small"
              className="text-[var(--color-muted-foreground)]"
            >
              {t("assessments.total")}
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
            <Typography
              variant="small"
              className="text-[var(--color-muted-foreground)]"
            >
              {t("assessments.statusPending")}
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
            <Typography
              variant="small"
              className="text-[var(--color-muted-foreground)]"
            >
              {t("assessments.statusInProgress")}
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
            <Typography
              variant="small"
              className="text-[var(--color-muted-foreground)]"
            >
              {t("assessments.statusCompleted")}
            </Typography>
          </VStack>
        </Card>
      </HStack>

      {/* Toolbar */}
      {showSearch && (
        <Box className="w-full max-w-sm">
          <Input
            placeholder={t("assessments.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            leftIcon={
              <Search className="h-4 w-4 text-[var(--color-muted-foreground)]" />
            }
          />
        </Box>
      )}

      {/* Loading State */}
      {isLoading && (
        <VStack align="center" justify="center" className="py-12">
          <Spinner size="lg" />
          <Typography
            variant="body"
            className="text-[var(--color-muted-foreground)]"
          >
            {t("assessments.loading")}
          </Typography>
        </VStack>
      )}

      {/* Error State */}
      {error && (
        <VStack align="center" justify="center" className="py-12">
          <Typography variant="body" className="text-red-500">
            {t("assessments.error", { message: error.message })}
          </Typography>
        </VStack>
      )}

      {/* Assessments Grid */}
      {!isLoading && !error && (
        <>
          {filteredAssessments.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <ClipboardList className="h-12 w-12 text-[var(--color-muted-foreground)]" />
              <Typography
                variant="h3"
                className="text-[var(--color-muted-foreground)]"
              >
                {t("assessments.noAssessmentsFound")}
              </Typography>
              <Typography
                variant="body"
                className="text-[var(--color-muted-foreground)]"
              >
                {searchTerm || statusFilter !== "all"
                  ? t("assessments.tryDifferentFilters")
                  : t("assessments.createToGetStarted")}
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

AssessmentsBoard.displayName = "AssessmentsBoard";
