/**
 * InspectionsTemplate
 *
 * Template for the Inspections list page (/inspections).
 * Displays Inspection entities with filtering and actions.
 *
 * Page: InspectionsPage
 * Entity: Inspection
 * ViewType: list
 */

import React, { useState } from "react";
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
import { PhaseIndicator, InspectionPhase } from "../atoms/PhaseIndicator";
import {
  Plus,
  Search,
  Filter,
  ClipboardList,
  Building2,
  Calendar,
  User,
  Eye,
  Play,
  FileText,
} from "lucide-react";

export interface InspectionData {
  id: string;
  companyName: string;
  companyId: string;
  inspectorName: string;
  inspectorId: string;
  phase: InspectionPhase;
  fieldType: string;
  scheduledDate?: string;
  startedAt?: string;
  completedAt?: string;
  rulesChecked?: number;
  totalRules?: number;
  complianceRate?: number;
}

export interface InspectionsTemplateProps {
  /** Inspection items */
  items?: readonly InspectionData[];
  /** Data prop alias */
  data?: readonly InspectionData[];
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Page title */
  title?: string;
  /** Show header */
  showHeader?: boolean;
  /** Show search */
  showSearch?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const getComplianceColor = (rate: number | undefined) => {
  if (rate === undefined) return "neutral";
  if (rate >= 90) return "success";
  if (rate >= 70) return "warning";
  return "error";
};

const InspectionCard: React.FC<{
  inspection: InspectionData;
  onAction: (action: string, inspection: InspectionData) => void;
}> = ({ inspection, onAction }) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <VStack gap="md">
        <HStack justify="between" align="start">
          <VStack gap="xs">
            <Typography variant="body" className="font-medium text-neutral-800">
              {inspection.companyName}
            </Typography>
            <HStack gap="sm" wrap>
              <Badge variant="outline">{inspection.fieldType}</Badge>
              <PhaseIndicator phase={inspection.phase} size="sm" />
            </HStack>
          </VStack>
        </HStack>

        <VStack gap="xs" className="text-neutral-500">
          <HStack gap="xs" align="center">
            <User className="h-3 w-3" />
            <Typography variant="small">{inspection.inspectorName}</Typography>
          </HStack>
          {inspection.scheduledDate && (
            <HStack gap="xs" align="center">
              <Calendar className="h-3 w-3" />
              <Typography variant="small">
                {new Date(inspection.scheduledDate).toLocaleDateString()}
              </Typography>
            </HStack>
          )}
        </VStack>

        {inspection.complianceRate !== undefined && (
          <HStack gap="sm" align="center">
            <Typography variant="small" className="text-neutral-500">
              Compliance:
            </Typography>
            <Badge variant={getComplianceColor(inspection.complianceRate)}>
              {inspection.complianceRate}%
            </Badge>
            <Typography variant="small" className="text-neutral-400">
              ({inspection.rulesChecked}/{inspection.totalRules} rules)
            </Typography>
          </HStack>
        )}

        <HStack gap="sm" className="pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAction("VIEW", inspection)}
            className="gap-1"
          >
            <Eye className="h-3 w-3" />
            View
          </Button>
          {inspection.phase === "preparation" && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onAction("START", inspection)}
              className="gap-1"
            >
              <Play className="h-3 w-3" />
              Start
            </Button>
          )}
          {inspection.phase === "execution" && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onAction("CONTINUE", inspection)}
              className="gap-1"
            >
              <Play className="h-3 w-3" />
              Continue
            </Button>
          )}
          {inspection.phase === "completed" && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onAction("REPORT", inspection)}
              className="gap-1"
            >
              <FileText className="h-3 w-3" />
              Report
            </Button>
          )}
        </HStack>
      </VStack>
    </Card>
  );
};

export const InspectionsTemplate: React.FC<InspectionsTemplateProps> = ({
  items,
  data,
  isLoading = false,
  error = null,
  title = "Inspections",
  showHeader = true,
  showSearch = true,
  className,
}) => {
  const eventBus = useEventBus();
  const [searchTerm, setSearchTerm] = useState("");

  const inspections = items || data || [];

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    eventBus.emit("UI:SEARCH", { searchTerm: value });
  };

  const handleCreate = () => {
    eventBus.emit("UI:CREATE", { entity: "Inspection" });
  };

  const handleAction = (action: string, inspection: InspectionData) => {
    eventBus.emit(`UI:${action}`, { row: inspection, entity: "Inspection" });
  };

  const filteredInspections = searchTerm
    ? inspections.filter(
        (i) =>
          i.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          i.inspectorName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : inspections;

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {showHeader && (
        <HStack justify="between" align="center" wrap>
          <VStack gap="xs">
            <Typography variant="h1">{title}</Typography>
            <Typography variant="body" className="text-neutral-500">
              Manage field inspections
            </Typography>
          </VStack>

          <Button variant="primary" onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            New Inspection
          </Button>
        </HStack>
      )}

      {showSearch && (
        <Box className="w-full max-w-sm">
          <Input
            placeholder="Search inspections..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            leftIcon={<Search className="h-4 w-4 text-neutral-400" />}
          />
        </Box>
      )}

      {isLoading && (
        <VStack align="center" justify="center" className="py-12">
          <Spinner size="lg" />
          <Typography variant="body" className="text-neutral-500">
            Loading inspections...
          </Typography>
        </VStack>
      )}

      {error && (
        <VStack align="center" justify="center" className="py-12">
          <Typography variant="body" className="text-red-500">
            Error: {error.message}
          </Typography>
        </VStack>
      )}

      {!isLoading && !error && (
        <>
          {filteredInspections.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <ClipboardList className="h-12 w-12 text-neutral-300" />
              <Typography variant="h3" className="text-neutral-500">
                No inspections found
              </Typography>
              <Typography variant="body" className="text-neutral-400">
                Create a new inspection to get started
              </Typography>
            </VStack>
          ) : (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInspections.map((inspection) => (
                <InspectionCard
                  key={inspection.id}
                  inspection={inspection}
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

InspectionsTemplate.displayName = "InspectionsTemplate";
