/**
 * InspectionCardGrid Organism
 *
 * Searchable card grid for inspections. Contains search state, filtering logic,
 * InspectionCard sub-component, and event emission via useEventBus.
 *
 * Extracted from InspectionsTemplate for flattener compliance.
 */

import React, { useState } from "react";
import { PhaseIndicator, InspectionPhase } from "../atoms/PhaseIndicator";
import {
  Plus,
  Search,
  ClipboardList,
  Calendar,
  User,
  Eye,
  Play,
  FileText,
} from "lucide-react";
import {
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  Input,
  Card,
  Badge,
  Spinner,
  cn,
  useEventBus,
  useTranslate,
} from '@almadar/ui';

export type { InspectionPhase } from "../atoms/PhaseIndicator";

export interface InspectionEntity {
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

export interface InspectionCardGridProps {
  entity: readonly InspectionEntity[];
  isLoading?: boolean;
  error?: Error | null;
  title?: string;
  showHeader?: boolean;
  showSearch?: boolean;
  /** Declarative event for search */
  searchEvent?: string;
  /** Declarative event for create */
  createEvent?: string;
  className?: string;
}

const getComplianceColor = (rate: number | undefined) => {
  if (rate === undefined) return "neutral";
  if (rate >= 90) return "success";
  if (rate >= 70) return "warning";
  return "error";
};

const InspectionCard: React.FC<{
  inspection: InspectionEntity;
}> = ({ inspection }) => {
  const { emit } = useEventBus();
  const { t } = useTranslate();

  const handleAction = (action: string) => {
    emit(`UI:${action}`, { row: inspection, entity: "Inspection" });
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <VStack gap="md">
        <HStack justify="between" align="start">
          <VStack gap="xs">
            <Typography variant="body" className="font-medium">
              {inspection.companyName}
            </Typography>
            <HStack gap="sm" wrap>
              <Badge variant="default">{inspection.fieldType}</Badge>
              <PhaseIndicator phase={inspection.phase} size="sm" />
            </HStack>
          </VStack>
        </HStack>

        <VStack gap="xs" className="text-[var(--color-muted-foreground)]">
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
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              {t('inspections.compliance')}
            </Typography>
            <Badge variant={getComplianceColor(inspection.complianceRate)}>
              {inspection.complianceRate}%
            </Badge>
            <Typography variant="small" className="text-[var(--color-muted-foreground)]">
              ({inspection.rulesChecked}/{inspection.totalRules} {t('inspections.rules')})
            </Typography>
          </HStack>
        )}

        <HStack gap="sm" className="pt-2 border-t">
          <Button variant="ghost" size="sm" onClick={() => handleAction("VIEW")} className="gap-1">
            <Eye className="h-3 w-3" />
            {t('common.view')}
          </Button>
          {inspection.phase === "preparation" && (
            <Button variant="primary" size="sm" onClick={() => handleAction("START")} className="gap-1">
              <Play className="h-3 w-3" />
              {t('inspections.start')}
            </Button>
          )}
          {inspection.phase === "execution" && (
            <Button variant="primary" size="sm" onClick={() => handleAction("CONTINUE")} className="gap-1">
              <Play className="h-3 w-3" />
              {t('inspections.continue')}
            </Button>
          )}
          {inspection.phase === "completed" && (
            <Button variant="secondary" size="sm" onClick={() => handleAction("REPORT")} className="gap-1">
              <FileText className="h-3 w-3" />
              {t('inspections.report')}
            </Button>
          )}
        </HStack>
      </VStack>
    </Card>
  );
};

export function InspectionCardGrid({
  entity,
  isLoading = false,
  error = null,
  title = "Inspections",
  showHeader = true,
  showSearch = true,
  searchEvent,
  createEvent,
  className,
}: InspectionCardGridProps): JSX.Element {
  const { emit } = useEventBus();
  const { t } = useTranslate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (searchEvent) emit(`UI:${searchEvent}`, { searchTerm: value });
  };

  const handleCreate = () => {
    if (createEvent) emit(`UI:${createEvent}`, { entity: "Inspection" });
  };

  const filteredInspections = searchTerm
    ? entity.filter(
        (i) =>
          i.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          i.inspectorName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : entity;

  return (
    <VStack gap="lg" className={cn("p-6", className)}>
      {showHeader && (
        <HStack justify="between" align="center" wrap>
          <VStack gap="xs">
            <Typography variant="h1">{title}</Typography>
            <Typography variant="body" className="text-[var(--color-muted-foreground)]">
              {t('inspections.subtitle')}
            </Typography>
          </VStack>

          <Button variant="primary" onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            {t('inspections.newInspection')}
          </Button>
        </HStack>
      )}

      {showSearch && (
        <Box className="w-full max-w-sm">
          <Input
            placeholder={t('inspections.search')}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            leftIcon={<Search className="h-4 w-4 text-[var(--color-muted-foreground)]" />}
          />
        </Box>
      )}

      {isLoading && (
        <VStack align="center" justify="center" className="py-12">
          <Spinner size="lg" />
          <Typography variant="body" className="text-[var(--color-muted-foreground)]">
            {t('inspections.loading')}
          </Typography>
        </VStack>
      )}

      {error && (
        <VStack align="center" justify="center" className="py-12">
          <Typography variant="body" className="text-red-500">
            {t('error.prefix')} {error.message}
          </Typography>
        </VStack>
      )}

      {!isLoading && !error && (
        <>
          {filteredInspections.length === 0 ? (
            <VStack align="center" justify="center" className="py-12">
              <ClipboardList className="h-12 w-12 text-[var(--color-muted-foreground)]" />
              <Typography variant="h3" className="text-[var(--color-muted-foreground)]">
                {t('inspections.empty.title')}
              </Typography>
              <Typography variant="body" className="text-[var(--color-muted-foreground)]">
                {t('inspections.empty.description')}
              </Typography>
            </VStack>
          ) : (
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInspections.map((inspection) => (
                <InspectionCard key={inspection.id} inspection={inspection} />
              ))}
            </Box>
          )}
        </>
      )}
    </VStack>
  );
}

InspectionCardGrid.displayName = "InspectionCardGrid";

export default InspectionCardGrid;
