/**
 * SchemaSummaryCard
 *
 * Displays a summary of a generated OrbitalSchema with stats,
 * validation status, domain context, and action buttons.
 */

import React from 'react';
import { Typography, Button, VStack, HStack, Box } from '@almadar/ui';
import {
  CheckCircle2,
  AlertCircle,
  Building2,
  Layers,
  Zap,
  FileText,
  LayoutGrid,
  ExternalLink,
} from 'lucide-react';

export interface SchemaSummary {
  name: string;
  description?: string;
  stateCount: number;
  eventCount: number;
  entityCount: number;
  pageCount: number;
  domainContext?: {
    category: string;
    subDomain?: string;
    confidence: number;
  };
}

export interface SchemaSummaryCardProps {
  schema: SchemaSummary;
  appId?: string;
  validated?: boolean | null;
  onPreview?: () => void;
  onEdit?: () => void;
  className?: string;
}

export const SchemaSummaryCard: React.FC<SchemaSummaryCardProps> = ({
  schema,
  appId,
  validated,
  onPreview,
  onEdit,
  className,
}) => {
  const stats = [
    { icon: Layers, label: 'States', value: schema.stateCount },
    { icon: Zap, label: 'Events', value: schema.eventCount },
    { icon: FileText, label: 'Entities', value: schema.entityCount },
    { icon: LayoutGrid, label: 'Pages', value: schema.pageCount },
  ];

  return (
    <VStack
      gap="md"
      className={`p-6 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] shadow-[var(--shadow-main)] ${className || ''}`}
    >
      <HStack gap="md" align="start">
        <Box
          className="w-10 h-10 rounded-xl bg-[var(--color-success)]/10 flex items-center justify-center flex-shrink-0"
        >
          <CheckCircle2 className="w-5 h-5 text-[var(--color-success)]" />
        </Box>
        <VStack gap="none" className="flex-1 min-w-0">
          <Typography variant="h4" className="text-[var(--color-foreground)] mb-1 truncate">
            {schema.name}
          </Typography>
          {schema.description && (
            <Typography variant="body2" className="text-[var(--color-muted-foreground)] line-clamp-2">
              {schema.description}
            </Typography>
          )}
        </VStack>
      </HStack>

      {validated !== null && validated !== undefined && (
        <HStack
          gap="sm"
          align="center"
          className={`px-3 py-2 rounded-lg border ${
            validated
              ? 'bg-[var(--color-success)]/5 border-[var(--color-success)]/20'
              : 'bg-[var(--color-warning)]/5 border-[var(--color-warning)]/20'
          }`}
        >
          {validated
            ? <CheckCircle2 className="w-4 h-4 text-[var(--color-success)]" />
            : <AlertCircle className="w-4 h-4 text-[var(--color-warning)]" />
          }
          <Typography
            variant="small"
            className={validated ? 'text-[var(--color-success)]' : 'text-[var(--color-warning)]'}
          >
            {validated ? 'Schema validated' : 'Schema has validation warnings'}
          </Typography>
        </HStack>
      )}

      {schema.domainContext && (
        <HStack
          gap="sm"
          align="center"
          className="px-3 py-2 rounded-lg bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20"
        >
          <Building2 className="w-4 h-4 text-[var(--color-primary)]" />
          <Typography variant="small" className="text-[var(--color-primary)]">
            {schema.domainContext.category}
          </Typography>
        </HStack>
      )}

      <HStack gap="sm" className="grid grid-cols-4">
        {stats.map((stat, idx) => (
          <VStack key={idx} gap="none" align="center" className="p-2 rounded-lg bg-[var(--color-surface)]">
            <stat.icon className="w-4 h-4 text-[var(--color-primary)] mb-1" />
            <Typography variant="body1" className="text-lg font-bold text-[var(--color-foreground)]">
              {stat.value}
            </Typography>
            <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
              {stat.label}
            </Typography>
          </VStack>
        ))}
      </HStack>

      {appId && (
        <HStack gap="sm" align="center" className="pt-2">
          <Button variant="primary" size="sm" onClick={onPreview} leftIcon={<ExternalLink className="w-4 h-4" />}>
            Preview
          </Button>
          <Button variant="secondary" size="sm" onClick={onEdit}>
            Edit in Builder
          </Button>
        </HStack>
      )}
    </VStack>
  );
};

SchemaSummaryCard.displayName = 'SchemaSummaryCard';
export default SchemaSummaryCard;
