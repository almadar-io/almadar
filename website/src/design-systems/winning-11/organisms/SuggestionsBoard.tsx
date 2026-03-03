/**
 * SuggestionsBoard
 *
 * Organism containing all logic for the Connection Suggestions view.
 * Manages suggestion filtering, stats, and suggestion card rendering.
 *
 * Event Contract:
 * - Emits: UI:{viewEvent} - when view action is clicked on a suggestion
 * - Emits: UI:{acceptEvent} - when connect/accept action is clicked
 * - Emits: UI:{rejectEvent} - when dismiss/reject action is clicked
 * - Emits: UI:{createEvent} - when refresh suggestions is clicked
 * - Payload: { row: SuggestionData, entity: "ConnectionSuggestion" }
 */

import React from "react";
import {
  Sparkles,
  UserPlus,
  X,
  RefreshCw,
  TrendingUp,
  Users,
  Zap,
  Star,
  ChevronRight,
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

export interface SuggestionData {
  id: string;
  suggestedUserId: string;
  suggestedUserName?: string;
  suggestedUserCategory?: string;
  compatibilityScore: number;
  reason: string;
  mutualConnections?: number;
  sharedInterests?: string[];
  status: "pending" | "accepted" | "dismissed";
  createdAt: string;
}

export interface SuggestionsBoardProps extends EntityDisplayProps<SuggestionData> {
  /** Page title */
  title?: string;
  /** Page subtitle */
  subtitle?: string;
  /** Show header */
  showHeader?: boolean;
  /** Event name for viewing a suggestion */
  viewEvent?: string;
  /** Event name for accepting/connecting */
  acceptEvent?: string;
  /** Event name for dismissing/rejecting */
  rejectEvent?: string;
  /** Event name for refresh/create */
  createEvent?: string;
}

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-emerald-600";
  if (score >= 60) return "text-blue-600";
  if (score >= 40) return "text-amber-600";
  return "text-[var(--color-muted-foreground)]";
};

const getScoreBadgeVariant = (score: number) => {
  if (score >= 80) return "success" as const;
  if (score >= 60) return "info" as const;
  if (score >= 40) return "warning" as const;
  return "neutral" as const;
};

const getScoreBadgeLabelKey = (score: number) => {
  if (score >= 80) return "suggestions.excellentMatch";
  if (score >= 60) return "suggestions.goodMatch";
  if (score >= 40) return "suggestions.moderateMatch";
  return "suggestions.potentialMatch";
};

const SuggestionCard: React.FC<{
  suggestion: SuggestionData;
  acceptEvent: string;
  rejectEvent: string;
  viewEvent: string;
}> = ({ suggestion, acceptEvent, rejectEvent, viewEvent }) => {
  const { t } = useTranslate();
  const eventBus = useEventBus();
  const scoreBadgeVariant = getScoreBadgeVariant(suggestion.compatibilityScore);
  const scoreBadgeLabelKey = getScoreBadgeLabelKey(suggestion.compatibilityScore);

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <VStack gap="md">
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            <Box className="relative">
              <Avatar
                name={suggestion.suggestedUserName || t("suggestions.defaultUser")}
                size="lg"
              />
              <Box
                className="absolute -top-1 -right-1 bg-purple-500 rounded-full p-1"
              >
                <Sparkles className="h-3 w-3 text-white" />
              </Box>
            </Box>
            <VStack gap="none">
              <Typography variant="body" className="font-medium">
                {suggestion.suggestedUserName ||
                  t("suggestions.userFallback", { id: suggestion.suggestedUserId.slice(-4) })}
              </Typography>
              {suggestion.suggestedUserCategory && (
                <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                  {suggestion.suggestedUserCategory}
                </Typography>
              )}
            </VStack>
          </HStack>
          <Badge variant={scoreBadgeVariant} className="gap-1">
            <Star className="h-3 w-3" />
            {t(scoreBadgeLabelKey)}
          </Badge>
        </HStack>

        {/* Compatibility Score */}
        <HStack gap="sm" align="center">
          <Box className="flex-1 bg-neutral-200 rounded-full h-2">
            <Box
              className={cn(
                "rounded-full h-2 transition-all",
                suggestion.compatibilityScore >= 80
                  ? "bg-emerald-500"
                  : suggestion.compatibilityScore >= 60
                  ? "bg-blue-500"
                  : suggestion.compatibilityScore >= 40
                  ? "bg-amber-500"
                  : "bg-neutral-400"
              )}
              style={{ width: `${suggestion.compatibilityScore}%` }}
            />
          </Box>
          <Typography
            variant="body"
            className={cn("font-bold", getScoreColor(suggestion.compatibilityScore))}
          >
            {suggestion.compatibilityScore}%
          </Typography>
        </HStack>

        {/* Reason */}
        <VStack gap="xs">
          <HStack gap="xs" align="center">
            <Zap className="h-3 w-3 text-purple-500" />
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t("suggestions.whyWeSuggest")}
            </Typography>
          </HStack>
          <Typography variant="small" className="text-[var(--color-foreground)]">
            {suggestion.reason}
          </Typography>
        </VStack>

        {/* Mutual connections & interests */}
        <HStack gap="md" wrap>
          {suggestion.mutualConnections !== undefined &&
            suggestion.mutualConnections > 0 && (
              <HStack gap="xs" align="center" className="text-[var(--color-muted-foreground)]">
                <Users className="h-3 w-3" />
                <Typography variant="small">
                  {t("suggestions.mutualCount", { count: suggestion.mutualConnections })}
                </Typography>
              </HStack>
            )}
          {suggestion.sharedInterests && suggestion.sharedInterests.length > 0 && (
            <HStack gap="xs" wrap>
              {suggestion.sharedInterests.slice(0, 3).map((interest) => (
                <Badge key={interest} variant="neutral" size="sm">
                  {interest}
                </Badge>
              ))}
            </HStack>
          )}
        </HStack>

        <HStack gap="sm" className="pt-2 border-t">
          <Button
            variant="primary"
            size="sm"
            onClick={() => eventBus.emit(`UI:${acceptEvent}`, { row: suggestion, entity: "ConnectionSuggestion" })}
            className="gap-1 flex-1"
          >
            <UserPlus className="h-3 w-3" />
            {t("suggestions.connect")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => eventBus.emit(`UI:${rejectEvent}`, { row: suggestion, entity: "ConnectionSuggestion" })}
            className="gap-1"
          >
            <X className="h-3 w-3" />
            {t("suggestions.dismiss")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => eventBus.emit(`UI:${viewEvent}`, { row: suggestion, entity: "ConnectionSuggestion" })}
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

export const SuggestionsBoard: React.FC<SuggestionsBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  title,
  subtitle,
  showHeader = true,
  className,
  viewEvent = "VIEW",
  acceptEvent = "CONNECT",
  rejectEvent = "DISMISS",
  createEvent = "REFRESH",
}) => {
  const eventBus = useEventBus();
  const { t } = useTranslate();
  const resolvedTitle = title || t("suggestions.title");
  const resolvedSubtitle = subtitle || t("suggestions.subtitle");

  const suggestions: readonly SuggestionData[] = (Array.isArray(entity) ? entity : []).filter((s: SuggestionData) => s.status === "pending");

  // Handle refresh
  const handleRefresh = () => {
    eventBus.emit(`UI:${createEvent}`, { entity: "ConnectionSuggestion" });
  };

  // Stats
  const avgScore =
    suggestions.length > 0
      ? Math.round(
          suggestions.reduce((sum, s) => sum + s.compatibilityScore, 0) /
            suggestions.length
        )
      : 0;

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {/* Page Header */}
      {showHeader && (
        <HStack justify="between" align="center" wrap>
          <VStack gap="xs">
            <HStack gap="sm" align="center">
              <Box rounded="lg" padding="sm" className="bg-purple-100">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </Box>
              <Typography variant="h1">{resolvedTitle}</Typography>
            </HStack>
            <Typography variant="body" className="text-[var(--color-muted-foreground)]">
              {resolvedSubtitle}
            </Typography>
          </VStack>

          <Button variant="secondary" onClick={handleRefresh} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            {t("suggestions.refreshSuggestions")}
          </Button>
        </HStack>
      )}

      {/* Stats Bar */}
      <HStack gap="md" wrap>
        <Card className="px-4 py-2">
          <VStack gap="none" align="center">
            <Typography variant="h4">{suggestions.length}</Typography>
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t("suggestions.suggestionsLabel")}
            </Typography>
          </VStack>
        </Card>
        <Card className="px-4 py-2">
          <VStack gap="none" align="center">
            <HStack gap="xs" align="center">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <Typography variant="h4" className="text-emerald-600">
                {avgScore}%
              </Typography>
            </HStack>
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t("suggestions.avgCompatibility")}
            </Typography>
          </VStack>
        </Card>
      </HStack>

      {/* Loading State */}
      {isLoading && (
        <VStack align="center" justify="center" className="py-12">
          <Spinner size="lg" />
          <Typography variant="body" className="text-[var(--color-muted-foreground)]">
            {t("suggestions.findingMatches")}
          </Typography>
        </VStack>
      )}

      {/* Error State */}
      {error && (
        <VStack align="center" justify="center" className="py-12">
          <Typography variant="body" className="text-red-500">
            {t("suggestions.error", { message: error.message })}
          </Typography>
        </VStack>
      )}

      {/* Suggestions Grid */}
      {!isLoading && !error && (
        <>
          {suggestions.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <Sparkles className="h-12 w-12 text-[var(--color-muted-foreground)]" />
              <Typography variant="h3" className="text-[var(--color-muted-foreground)]">
                {t("suggestions.noSuggestions")}
              </Typography>
              <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                {t("suggestions.checkBackLater")}
              </Typography>
              <Button
                variant="secondary"
                onClick={handleRefresh}
                className="gap-2 mt-4"
              >
                <RefreshCw className="h-4 w-4" />
                {t("suggestions.refresh")}
              </Button>
            </VStack>
          ) : (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestions.map((suggestion) => (
                <SuggestionCard
                  key={suggestion.id}
                  suggestion={suggestion}
                  acceptEvent={acceptEvent}
                  rejectEvent={rejectEvent}
                  viewEvent={viewEvent}
                />
              ))}
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

SuggestionsBoard.displayName = "SuggestionsBoard";
