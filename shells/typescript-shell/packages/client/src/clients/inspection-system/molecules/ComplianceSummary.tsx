/**
 * ComplianceSummary
 *
 * Summary view of inspection compliance status.
 * Shows overall compliance stats and breakdown.
 *
 * Event Contract:
 * - Emits: none (display only)
 * - entityAware: true
 */

import React from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Card } from "../../../components/atoms/Card";
import { Badge } from "../../../components/atoms/Badge";
import { ProgressBar } from "../../../components/atoms/ProgressBar";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  MinusCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export interface ComplianceStats {
  total: number;
  compliant: number;
  nonCompliant: number;
  notChecked: number;
  critical: number;
  major: number;
  minor: number;
}

export interface ComplianceSummaryProps {
  /** Compliance statistics */
  stats: ComplianceStats;
  /** Show percentage */
  showPercentage?: boolean;
  /** Show breakdown by severity */
  showSeverityBreakdown?: boolean;
  /** Previous compliance rate for comparison */
  previousRate?: number;
  /** Title */
  title?: string;
  /** Compact mode */
  compact?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const ComplianceSummary: React.FC<ComplianceSummaryProps> = ({
  stats,
  showPercentage = true,
  showSeverityBreakdown = true,
  previousRate,
  title = "Compliance Summary",
  compact = false,
  className,
}) => {
  const checkedItems = stats.compliant + stats.nonCompliant;
  const complianceRate = checkedItems > 0
    ? Math.round((stats.compliant / checkedItems) * 100)
    : 0;

  const rateChange = previousRate !== undefined
    ? complianceRate - previousRate
    : null;

  const getComplianceColor = (rate: number) => {
    if (rate >= 90) return "success";
    if (rate >= 70) return "warning";
    return "error";
  };

  if (compact) {
    return (
      <HStack gap="md" align="center" className={className}>
        <HStack gap="xs" align="center">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <Typography variant="body" className="font-medium">
            {stats.compliant}
          </Typography>
        </HStack>
        <HStack gap="xs" align="center">
          <XCircle className="h-4 w-4 text-red-500" />
          <Typography variant="body" className="font-medium">
            {stats.nonCompliant}
          </Typography>
        </HStack>
        {stats.notChecked > 0 && (
          <HStack gap="xs" align="center">
            <MinusCircle className="h-4 w-4 text-neutral-400" />
            <Typography variant="body" className="font-medium">
              {stats.notChecked}
            </Typography>
          </HStack>
        )}
        {showPercentage && (
          <Badge variant={getComplianceColor(complianceRate)}>
            {complianceRate}%
          </Badge>
        )}
      </HStack>
    );
  }

  return (
    <Card className={cn("p-4", className)}>
      <VStack gap="md">
        {/* Header */}
        <HStack justify="between" align="center">
          <Typography variant="h4" className="text-neutral-800">
            {title}
          </Typography>
          {showPercentage && (
            <HStack gap="sm" align="center">
              <Badge
                variant={getComplianceColor(complianceRate)}
                className="text-lg px-3 py-1"
              >
                {complianceRate}%
              </Badge>
              {rateChange !== null && rateChange !== 0 && (
                <HStack
                  gap="xs"
                  align="center"
                  className={cn(
                    rateChange > 0 ? "text-green-600" : "text-red-600"
                  )}
                >
                  {rateChange > 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <Typography variant="small" className="font-medium">
                    {rateChange > 0 ? "+" : ""}
                    {rateChange}%
                  </Typography>
                </HStack>
              )}
            </HStack>
          )}
        </HStack>

        {/* Progress bar */}
        <VStack gap="xs">
          <ProgressBar
            value={complianceRate}
            max={100}
            variant={getComplianceColor(complianceRate) as any}
            size="lg"
          />
          <HStack justify="between">
            <Typography variant="small" className="text-neutral-500">
              {checkedItems} of {stats.total} rules checked
            </Typography>
            <Typography variant="small" className="text-neutral-500">
              {stats.notChecked} remaining
            </Typography>
          </HStack>
        </VStack>

        {/* Stats row */}
        <HStack gap="lg" justify="center" className="py-2">
          <VStack align="center" gap="xs">
            <HStack gap="xs" align="center">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <Typography variant="h3" className="text-green-600">
                {stats.compliant}
              </Typography>
            </HStack>
            <Typography variant="small" className="text-neutral-500">
              Compliant
            </Typography>
          </VStack>

          <Box className="w-px h-12 bg-neutral-200" />

          <VStack align="center" gap="xs">
            <HStack gap="xs" align="center">
              <XCircle className="h-5 w-5 text-red-500" />
              <Typography variant="h3" className="text-red-600">
                {stats.nonCompliant}
              </Typography>
            </HStack>
            <Typography variant="small" className="text-neutral-500">
              Non-Compliant
            </Typography>
          </VStack>

          <Box className="w-px h-12 bg-neutral-200" />

          <VStack align="center" gap="xs">
            <HStack gap="xs" align="center">
              <MinusCircle className="h-5 w-5 text-neutral-400" />
              <Typography variant="h3" className="text-neutral-600">
                {stats.notChecked}
              </Typography>
            </HStack>
            <Typography variant="small" className="text-neutral-500">
              Not Checked
            </Typography>
          </VStack>
        </HStack>

        {/* Severity breakdown */}
        {showSeverityBreakdown && stats.nonCompliant > 0 && (
          <VStack gap="sm" className="pt-2 border-t">
            <Typography variant="small" className="font-medium text-neutral-600">
              Non-Compliance by Severity
            </Typography>
            <HStack gap="md" wrap>
              {stats.critical > 0 && (
                <HStack gap="xs" align="center">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <Typography variant="small" className="text-red-600 font-medium">
                    {stats.critical} Critical
                  </Typography>
                </HStack>
              )}
              {stats.major > 0 && (
                <HStack gap="xs" align="center">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <Typography variant="small" className="text-orange-600 font-medium">
                    {stats.major} Major
                  </Typography>
                </HStack>
              )}
              {stats.minor > 0 && (
                <HStack gap="xs" align="center">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <Typography variant="small" className="text-yellow-600 font-medium">
                    {stats.minor} Minor
                  </Typography>
                </HStack>
              )}
            </HStack>
          </VStack>
        )}
      </VStack>
    </Card>
  );
};

ComplianceSummary.displayName = "ComplianceSummary";
