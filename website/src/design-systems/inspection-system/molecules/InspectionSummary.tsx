/**
 * InspectionSummary
 *
 * Summary component for displaying inspection results.
 * Shows compliance stats, violations, and overall status.
 *
 * Event Contract:
 * - Emits: UI:VIEW_DETAILS, UI:DOWNLOAD_REPORT
 */

import React from "react";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Download,
  Eye,
  Clock,
  User,
  Building2,
  Calendar,
} from "lucide-react";
import {
  cn,
  VStack,
  HStack,
  Typography,
  Card,
  Badge,
  Button,
  useEventBus,
} from '@almadar/ui';

export interface InspectionSummaryData {
  id?: string;
  companyName?: string;
  inspectorName?: string;
  date?: string;
  status?: "compliant" | "non_compliant" | "pending" | "partial";
  totalRules?: number;
  compliantCount?: number;
  nonCompliantCount?: number;
  pendingCount?: number;
  criticalViolations?: number;
  majorViolations?: number;
  minorViolations?: number;
  notes?: string;
}

export interface InspectionSummaryProps {
  /** Summary entity */
  entity?: InspectionSummaryData;
  /** Display variant */
  variant?: "default" | "compact" | "card";
  /** Show actions */
  showActions?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const statusConfig = {
  compliant: { variant: "success" as const, label: "Compliant", icon: CheckCircle, color: "text-green-600" },
  non_compliant: { variant: "danger" as const, label: "Non-Compliant", icon: XCircle, color: "text-red-600" },
  pending: { variant: "warning" as const, label: "Pending Review", icon: Clock, color: "text-amber-600" },
  partial: { variant: "warning" as const, label: "Partially Compliant", icon: AlertTriangle, color: "text-amber-600" },
};

export const InspectionSummary: React.FC<InspectionSummaryProps> = ({
  entity,
  variant = "default",
  showActions = true,
  className,
}) => {
  const eventBus = useEventBus();

  if (!entity) return null;

  const status = entity.status || "pending";
  const statusInfo = statusConfig[status];
  const StatusIcon = statusInfo.icon;

  const total = entity.totalRules || 0;
  const compliant = entity.compliantCount || 0;
  const nonCompliant = entity.nonCompliantCount || 0;
  const pending = entity.pendingCount || (total - compliant - nonCompliant);

  const complianceRate = total > 0 ? Math.round((compliant / total) * 100) : 0;

  const handleViewDetails = () => {
    eventBus.emit("UI:VIEW_DETAILS", { item: entity });
  };

  const handleDownload = () => {
    eventBus.emit("UI:DOWNLOAD_REPORT", { item: entity });
  };

  if (variant === "compact") {
    return (
      <Card className={cn("p-4", className)}>
        <HStack justify="between" align="center">
          <HStack gap="sm" align="center">
            <StatusIcon className={cn("h-5 w-5", statusInfo.color)} />
            <VStack gap="xs">
              <Typography variant="body" className="font-medium">
                {entity.companyName || "Inspection Summary"}
              </Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                {complianceRate}% Compliant
              </Typography>
            </VStack>
          </HStack>
          <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
        </HStack>
      </Card>
    );
  }

  return (
    <Card className={cn("p-6", className)}>
      <VStack gap="lg">
        {/* Header */}
        <HStack justify="between" align="start" wrap>
          <VStack gap="xs">
            <Typography variant="h3">
              Inspection Summary
            </Typography>
            {entity.companyName && (
              <HStack gap="xs" align="center" className="text-[var(--color-muted-foreground)]">
                <Building2 className="h-4 w-4" />
                <Typography variant="body">{entity.companyName}</Typography>
              </HStack>
            )}
          </VStack>
          <Badge variant={statusInfo.variant} className="gap-1 px-3 py-1.5">
            <StatusIcon className="h-4 w-4" />
            {statusInfo.label}
          </Badge>
        </HStack>

        {/* Meta info */}
        <HStack gap="lg" wrap className="text-[var(--color-muted-foreground)]">
          {entity.inspectorName && (
            <HStack gap="xs" align="center">
              <User className="h-4 w-4" />
              <Typography variant="small">{entity.inspectorName}</Typography>
            </HStack>
          )}
          {entity.date && (
            <HStack gap="xs" align="center">
              <Calendar className="h-4 w-4" />
              <Typography variant="small">{entity.date}</Typography>
            </HStack>
          )}
        </HStack>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-neutral-50 border-0">
            <VStack gap="xs" align="center">
              <Typography variant="h2">
                {total}
              </Typography>
              <Typography variant="small" className="text-[var(--color-muted-foreground)]">
                Total Rules
              </Typography>
            </VStack>
          </Card>
          <Card className="p-4 bg-green-50 border-0">
            <VStack gap="xs" align="center">
              <Typography variant="h2" className="text-green-600">
                {compliant}
              </Typography>
              <Typography variant="small" className="text-green-600">
                Compliant
              </Typography>
            </VStack>
          </Card>
          <Card className="p-4 bg-red-50 border-0">
            <VStack gap="xs" align="center">
              <Typography variant="h2" className="text-red-600">
                {nonCompliant}
              </Typography>
              <Typography variant="small" className="text-red-600">
                Non-Compliant
              </Typography>
            </VStack>
          </Card>
          <Card className="p-4 bg-amber-50 border-0">
            <VStack gap="xs" align="center">
              <Typography variant="h2" className="text-amber-600">
                {pending}
              </Typography>
              <Typography variant="small" className="text-amber-600">
                Pending
              </Typography>
            </VStack>
          </Card>
        </div>

        {/* Compliance bar */}
        <VStack gap="sm">
          <HStack justify="between">
            <Typography variant="small" className="font-medium text-[var(--color-foreground)]">
              Compliance Rate
            </Typography>
            <Typography variant="small" className="font-bold">
              {complianceRate}%
            </Typography>
          </HStack>
          <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full transition-all rounded-full",
                complianceRate >= 80 ? "bg-green-500" : complianceRate >= 50 ? "bg-amber-500" : "bg-red-500"
              )}
              style={{ width: `${complianceRate}%` }}
            />
          </div>
        </VStack>

        {/* Violations breakdown */}
        {(entity.criticalViolations || entity.majorViolations || entity.minorViolations) && (
          <VStack gap="sm">
            <Typography variant="small" className="font-medium text-[var(--color-foreground)]">
              Violations by Severity
            </Typography>
            <HStack gap="md" wrap>
              {entity.criticalViolations !== undefined && entity.criticalViolations > 0 && (
                <Badge variant="danger" className="gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {entity.criticalViolations} Critical
                </Badge>
              )}
              {entity.majorViolations !== undefined && entity.majorViolations > 0 && (
                <Badge variant="warning" className="gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {entity.majorViolations} Major
                </Badge>
              )}
              {entity.minorViolations !== undefined && entity.minorViolations > 0 && (
                <Badge variant="neutral" className="gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {entity.minorViolations} Minor
                </Badge>
              )}
            </HStack>
          </VStack>
        )}

        {/* Notes */}
        {entity.notes && (
          <VStack gap="sm">
            <Typography variant="small" className="font-medium text-[var(--color-foreground)]">
              Notes
            </Typography>
            <Typography variant="body" className="text-[var(--color-foreground)]">
              {entity.notes}
            </Typography>
          </VStack>
        )}

        {/* Actions */}
        {showActions && (
          <HStack gap="sm" className="pt-4 border-t">
            <Button variant="ghost" onClick={handleViewDetails} className="gap-2">
              <Eye className="h-4 w-4" />
              View Details
            </Button>
            <Button variant="ghost" onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </HStack>
        )}
      </VStack>
    </Card>
  );
};

InspectionSummary.displayName = "InspectionSummary";
