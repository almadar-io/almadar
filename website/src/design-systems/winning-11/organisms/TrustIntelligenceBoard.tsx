/**
 * TrustIntelligenceBoard
 *
 * Organism that contains all logic, sub-components, and layout
 * for the Trust Intelligence dashboard page. The template is a thin wrapper.
 */

import React from "react";
import { TrustMeter, type HealthStatus } from "../atoms/TrustMeter";
import {
  Shield,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  Award,
} from "lucide-react";
import {
  cn,
  Box,
  VStack,
  HStack,
  Typography,
  Card,
  Badge,
  Spinner,
  useEventBus,
} from "@almadar/ui";

// ── Types ──────────────────────────────────────────────────────────

export interface TrustScoreData {
  id: string;
  userId?: string;
  overallScore: number;
  reliabilityScore?: number;
  consistencyScore?: number;
  communicationScore?: number;
  trend?: "up" | "down" | "stable";
  rank?: number;
  totalUsers?: number;
}

export interface TrustIntelligenceEntity {
  /** Current user's trust score */
  userScore?: TrustScoreData;
  /** Network average score */
  networkAverage?: number;
  /** Top performers */
  topPerformers?: readonly TrustScoreData[];
  /** Recent score changes */
  recentChanges?: readonly { date: string; change: number }[];
}

export interface TrustIntelligenceBoardProps {
  /** Entity data */
  entity?: TrustIntelligenceEntity;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Page title */
  title?: string;
  /** Additional CSS classes */
  className?: string;
  /** Event name for refresh action */
  refreshEvent: string;
  /** Event name for calculate action */
  calculateEvent: string;
  /** Event name for viewing a user */
  viewUserEvent: string;
  /** Event name for viewing details */
  viewDetailsEvent: string;
}

// ── Helpers ────────────────────────────────────────────────────────

const getHealthStatusFromScore = (score: number): HealthStatus => {
  if (score >= 80) return "thriving";
  if (score >= 60) return "healthy";
  if (score >= 40) return "declining";
  return "withering";
};

// ── Sub-components ─────────────────────────────────────────────────

const TrendIcon = ({ trend }: { trend?: "up" | "down" | "stable" }) => {
  if (!trend || trend === "stable") return null;
  const Icon = trend === "up" ? TrendingUp : TrendingDown;
  const color = trend === "up" ? "text-emerald-500" : "text-red-500";
  return <Icon className={cn("h-5 w-5", color)} />;
};

// ── Main Board ─────────────────────────────────────────────────────

export const TrustIntelligenceBoard: React.FC<TrustIntelligenceBoardProps> = ({
  entity,
  isLoading = false,
  error = null,
  title = "Trust Intelligence",
  className,
  viewUserEvent,
}) => {
  const { userScore, networkAverage = 65, topPerformers = [], recentChanges = [] } = entity || {};
  const eventBus = useEventBus();

  const handleScoreClick = (score: TrustScoreData) => {
    eventBus.emit(`UI:${viewUserEvent}`, { row: score, entity: "TrustScore" });
  };

  if (isLoading) {
    return (
      <VStack align="center" justify="center" className={cn("py-12", className)}>
        <Spinner size="lg" />
        <Typography variant="body" className="text-[var(--color-muted-foreground)]">
          Calculating trust metrics...
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

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {/* Header */}
      <HStack justify="between" align="center">
        <VStack gap="xs">
          <Typography variant="h1">{title}</Typography>
          <Typography variant="body" className="text-[var(--color-muted-foreground)]">
            Your trust metrics and network insights
          </Typography>
        </VStack>
        <Badge variant="info" className="gap-1">
          <Activity className="h-3 w-3" />
          Live
        </Badge>
      </HStack>

      {/* Main Score Card */}
      {userScore && (
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <HStack justify="between" align="start" wrap gap="lg">
            <VStack gap="md">
              <HStack gap="sm" align="center">
                <Box
                  rounded="full"
                  padding="sm"
                  className="bg-blue-100"
                >
                  <Shield className="h-8 w-8 text-blue-600" />
                </Box>
                <VStack gap="none">
                  <Typography variant="label" className="text-[var(--color-muted-foreground)]">
                    Your Trust Score
                  </Typography>
                  <HStack gap="sm" align="center">
                    <Typography variant="h1" className="text-blue-600">
                      {userScore.overallScore}
                    </Typography>
                    <TrendIcon trend={userScore.trend} />
                  </HStack>
                </VStack>
              </HStack>

              <TrustMeter
                healthStatus={getHealthStatusFromScore(userScore.overallScore)}
                growthPoints={userScore.overallScore}
                size="lg"
              />
            </VStack>

            {/* Score breakdown */}
            <VStack gap="sm" className="min-w-[200px]">
              <Typography variant="label" className="text-[var(--color-muted-foreground)]">
                Score Breakdown
              </Typography>
              {userScore.reliabilityScore !== undefined && (
                <HStack justify="between">
                  <Typography variant="small">Reliability</Typography>
                  <Typography variant="small" className="font-medium">
                    {userScore.reliabilityScore}%
                  </Typography>
                </HStack>
              )}
              {userScore.consistencyScore !== undefined && (
                <HStack justify="between">
                  <Typography variant="small">Consistency</Typography>
                  <Typography variant="small" className="font-medium">
                    {userScore.consistencyScore}%
                  </Typography>
                </HStack>
              )}
              {userScore.communicationScore !== undefined && (
                <HStack justify="between">
                  <Typography variant="small">Communication</Typography>
                  <Typography variant="small" className="font-medium">
                    {userScore.communicationScore}%
                  </Typography>
                </HStack>
              )}
            </VStack>

            {/* Rank */}
            {userScore.rank && userScore.totalUsers && (
              <VStack align="center" gap="xs">
                <Box
                  rounded="full"
                  padding="md"
                  className="bg-amber-100"
                >
                  <Award className="h-8 w-8 text-amber-600" />
                </Box>
                <Typography variant="label" className="text-[var(--color-muted-foreground)]">
                  Network Rank
                </Typography>
                <Typography variant="h3">
                  #{userScore.rank}{" "}
                  <Typography as="span" variant="small" className="text-[var(--color-muted-foreground)]">
                    of {userScore.totalUsers}
                  </Typography>
                </Typography>
              </VStack>
            )}
          </HStack>
        </Card>
      )}

      {/* Stats Grid */}
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Network Average */}
        <Card className="p-4">
          <VStack gap="sm">
            <HStack gap="sm" align="center">
              <Users className="h-5 w-5 text-[var(--color-muted-foreground)]" />
              <Typography variant="label" className="text-[var(--color-muted-foreground)]">
                Network Average
              </Typography>
            </HStack>
            <Typography variant="h2">{networkAverage}</Typography>
            {userScore && (
              <Typography
                variant="small"
                className={cn(
                  userScore.overallScore > networkAverage
                    ? "text-emerald-600"
                    : "text-amber-600",
                )}
              >
                {userScore.overallScore > networkAverage
                  ? `+${userScore.overallScore - networkAverage} above average`
                  : `${networkAverage - userScore.overallScore} below average`}
              </Typography>
            )}
          </VStack>
        </Card>

        {/* Top Performers Preview */}
        <Card className="p-4">
          <VStack gap="sm">
            <HStack gap="sm" align="center">
              <Award className="h-5 w-5 text-amber-500" />
              <Typography variant="label" className="text-[var(--color-muted-foreground)]">
                Top Performers
              </Typography>
            </HStack>
            <VStack gap="xs">
              {topPerformers.slice(0, 3).map((performer, idx) => (
                <HStack
                  key={performer.id}
                  justify="between"
                  className="cursor-pointer hover:bg-neutral-50 p-1 rounded"
                  onClick={() => handleScoreClick(performer)}
                >
                  <Typography variant="small">
                    #{idx + 1} User {performer.userId?.slice(-4) || performer.id.slice(-4)}
                  </Typography>
                  <Typography variant="small" className="font-medium text-emerald-600">
                    {performer.overallScore}
                  </Typography>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </Card>

        {/* Recent Changes */}
        <Card className="p-4">
          <VStack gap="sm">
            <HStack gap="sm" align="center">
              <Activity className="h-5 w-5 text-blue-500" />
              <Typography variant="label" className="text-[var(--color-muted-foreground)]">
                Recent Changes
              </Typography>
            </HStack>
            <VStack gap="xs">
              {recentChanges.slice(0, 3).map((change, idx) => (
                <HStack key={idx} justify="between">
                  <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                    {change.date}
                  </Typography>
                  <Typography
                    variant="small"
                    className={cn(
                      "font-medium",
                      change.change > 0 ? "text-emerald-600" : "text-red-600",
                    )}
                  >
                    {change.change > 0 ? "+" : ""}
                    {change.change}
                  </Typography>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </Card>
      </Box>
    </VStack>
  );
};

TrustIntelligenceBoard.displayName = "TrustIntelligenceBoard";
