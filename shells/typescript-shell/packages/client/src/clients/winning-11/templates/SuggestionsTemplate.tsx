/**
 * SuggestionsTemplate
 *
 * Template for the Suggestions page (/suggestions).
 * Displays AI-powered connection suggestions.
 *
 * Page: SuggestionsPage
 * Entity: ConnectionSuggestion
 * ViewType: list
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

export interface SuggestionsTemplateProps {
  /** Suggestion items to display */
  items?: readonly SuggestionData[];
  /** Data prop alias */
  data?: readonly SuggestionData[];
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
  /** Additional CSS classes */
  className?: string;
}

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-emerald-600";
  if (score >= 60) return "text-blue-600";
  if (score >= 40) return "text-amber-600";
  return "text-neutral-600";
};

const getScoreBadge = (score: number) => {
  if (score >= 80) return { variant: "success" as const, label: "Excellent Match" };
  if (score >= 60) return { variant: "info" as const, label: "Good Match" };
  if (score >= 40) return { variant: "warning" as const, label: "Moderate Match" };
  return { variant: "neutral" as const, label: "Potential Match" };
};

const SuggestionCard: React.FC<{
  suggestion: SuggestionData;
  onAction: (action: string, suggestion: SuggestionData) => void;
}> = ({ suggestion, onAction }) => {
  const scoreBadge = getScoreBadge(suggestion.compatibilityScore);

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <VStack gap="md">
        <HStack justify="between" align="start">
          <HStack gap="sm" align="center">
            <Box className="relative">
              <Avatar
                name={suggestion.suggestedUserName || "User"}
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
                  `User ${suggestion.suggestedUserId.slice(-4)}`}
              </Typography>
              {suggestion.suggestedUserCategory && (
                <Typography variant="small" className="text-neutral-500">
                  {suggestion.suggestedUserCategory}
                </Typography>
              )}
            </VStack>
          </HStack>
          <Badge variant={scoreBadge.variant} className="gap-1">
            <Star className="h-3 w-3" />
            {scoreBadge.label}
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
            <Typography variant="small" className="text-neutral-500">
              Why we suggest
            </Typography>
          </HStack>
          <Typography variant="small" className="text-neutral-700">
            {suggestion.reason}
          </Typography>
        </VStack>

        {/* Mutual connections & interests */}
        <HStack gap="md" wrap>
          {suggestion.mutualConnections !== undefined &&
            suggestion.mutualConnections > 0 && (
              <HStack gap="xs" align="center" className="text-neutral-500">
                <Users className="h-3 w-3" />
                <Typography variant="small">
                  {suggestion.mutualConnections} mutual
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
            onClick={() => onAction("CONNECT", suggestion)}
            className="gap-1 flex-1"
          >
            <UserPlus className="h-3 w-3" />
            Connect
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("DISMISS", suggestion)}
            className="gap-1"
          >
            <X className="h-3 w-3" />
            Dismiss
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("VIEW", suggestion)}
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

export const SuggestionsTemplate: React.FC<SuggestionsTemplateProps> = ({
  items,
  data,
  isLoading = false,
  error = null,
  title = "Connection Suggestions",
  subtitle = "AI-powered recommendations for your network",
  showHeader = true,
  className,
}) => {
  const eventBus = useEventBus();

  const suggestions = (items || data || []).filter((s) => s.status === "pending");

  // Handle refresh
  const handleRefresh = () => {
    eventBus.emit("UI:REFRESH", { entity: "ConnectionSuggestion" });
  };

  // Handle suggestion actions
  const handleAction = (action: string, suggestion: SuggestionData) => {
    eventBus.emit(`UI:${action}`, { row: suggestion, entity: "ConnectionSuggestion" });
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
              <Typography variant="h1">{title}</Typography>
            </HStack>
            <Typography variant="body" className="text-neutral-500">
              {subtitle}
            </Typography>
          </VStack>

          <Button variant="secondary" onClick={handleRefresh} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh Suggestions
          </Button>
        </HStack>
      )}

      {/* Stats Bar */}
      <HStack gap="md" wrap>
        <Card className="px-4 py-2">
          <VStack gap="none" align="center">
            <Typography variant="h4">{suggestions.length}</Typography>
            <Typography variant="small" className="text-neutral-500">
              Suggestions
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
            <Typography variant="small" className="text-neutral-500">
              Avg Compatibility
            </Typography>
          </VStack>
        </Card>
      </HStack>

      {/* Loading State */}
      {isLoading && (
        <VStack align="center" justify="center" className="py-12">
          <Spinner size="lg" />
          <Typography variant="body" className="text-neutral-500">
            Finding your best matches...
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

      {/* Suggestions Grid */}
      {!isLoading && !error && (
        <>
          {suggestions.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <Sparkles className="h-12 w-12 text-neutral-300" />
              <Typography variant="h3" className="text-neutral-500">
                No suggestions available
              </Typography>
              <Typography variant="body" className="text-neutral-400">
                Check back later for new connection recommendations
              </Typography>
              <Button
                variant="secondary"
                onClick={handleRefresh}
                className="gap-2 mt-4"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </VStack>
          ) : (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestions.map((suggestion) => (
                <SuggestionCard
                  key={suggestion.id}
                  suggestion={suggestion}
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

SuggestionsTemplate.displayName = "SuggestionsTemplate";
