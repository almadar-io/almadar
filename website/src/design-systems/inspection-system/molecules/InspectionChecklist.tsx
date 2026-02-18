/**
 * InspectionChecklist
 *
 * Checklist component for displaying inspection rules.
 * Groups rules by category with compliance tracking.
 *
 * Event Contract:
 * - Emits: UI:RULE_CHECKED with { ruleId, isCompliant, notes }
 */

import React from "react";
import { RuleCheckItem, RuleCheckItemProps } from "./RuleCheckItem";
import { ClipboardList, CheckCircle, XCircle, MinusCircle } from "lucide-react";
import {
  cn,
  VStack,
  HStack,
  Typography,
  Card,
  Badge,
  useEventBus,
  useTranslate,
} from '@almadar/ui';

export interface ChecklistRule {
  id: string;
  ruleText?: string;
  description?: string;
  gazetteNumber?: string;
  article?: string;
  severity?: "critical" | "major" | "minor" | "info";
  isCompliant?: boolean | null;
  notes?: string;
  category?: string;
}

export interface InspectionChecklistProps {
  /** Checklist items */
  items?: ChecklistRule[];
  /** Data alias */
  data?: ChecklistRule[];
  /** Entity name */
  entity?: string;
  /** Display fields */
  displayFields?: string[];
  /** Show rule count */
  showRuleCount?: boolean;
  /** Show severity badge */
  showSeverityBadge?: boolean;
  /** Item actions */
  itemActions?: Array<{ label: string; event: string }>;
  /** Empty state title */
  emptyTitle?: string;
  /** Empty state icon */
  emptyIcon?: string;
  /** Read-only mode */
  readOnly?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const InspectionChecklist: React.FC<InspectionChecklistProps> = ({
  items,
  data,
  showRuleCount = true,
  showSeverityBadge = true,
  emptyTitle,
  readOnly = false,
  className,
}) => {
  const eventBus = useEventBus();
  const { t } = useTranslate();
  const resolvedEmptyTitle = emptyTitle ?? t('empty.noItems');
  const rules = items || data || [];

  const handleRuleChange = (ruleId: string, data: { isCompliant: boolean | null; notes: string }) => {
    eventBus.emit("UI:RULE_CHECKED", { ruleId, ...data });
  };

  // Calculate stats
  const total = rules.length;
  const compliant = rules.filter((r) => r.isCompliant === true).length;
  const nonCompliant = rules.filter((r) => r.isCompliant === false).length;
  const pending = rules.filter((r) => r.isCompliant === null || r.isCompliant === undefined).length;

  // Group by category if present
  const groupedRules = rules.reduce(
    (acc, rule) => {
      const category = rule.category || "General";
      if (!acc[category]) acc[category] = [];
      acc[category].push(rule);
      return acc;
    },
    {} as Record<string, ChecklistRule[]>
  );

  if (rules.length === 0) {
    return (
      <Card className={cn("p-8", className)}>
        <VStack align="center" gap="md">
          <ClipboardList className="h-12 w-12 text-[var(--color-muted-foreground)]" />
          <Typography variant="body" className="text-[var(--color-muted-foreground)]">
            {resolvedEmptyTitle}
          </Typography>
        </VStack>
      </Card>
    );
  }

  return (
    <VStack gap="lg" className={className}>
      {/* Summary */}
      {showRuleCount && (
        <Card className="p-4">
          <HStack justify="between" align="center" wrap>
            <Typography variant="h3">
              Checklist Progress
            </Typography>
            <HStack gap="md">
              <HStack gap="xs" align="center">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <Typography variant="small" className="text-[var(--color-foreground)]">
                  {compliant} Compliant
                </Typography>
              </HStack>
              <HStack gap="xs" align="center">
                <XCircle className="h-4 w-4 text-red-500" />
                <Typography variant="small" className="text-[var(--color-foreground)]">
                  {nonCompliant} Non-compliant
                </Typography>
              </HStack>
              <HStack gap="xs" align="center">
                <MinusCircle className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                <Typography variant="small" className="text-[var(--color-foreground)]">
                  {pending} Pending
                </Typography>
              </HStack>
            </HStack>
          </HStack>
          {/* Progress bar */}
          <div className="mt-3 h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div className="h-full flex">
              <div
                className="bg-green-500 transition-all"
                style={{ width: `${(compliant / total) * 100}%` }}
              />
              <div
                className="bg-red-500 transition-all"
                style={{ width: `${(nonCompliant / total) * 100}%` }}
              />
            </div>
          </div>
        </Card>
      )}

      {/* Rules by category */}
      {Object.entries(groupedRules).map(([category, categoryRules]) => (
        <VStack key={category} gap="md">
          {Object.keys(groupedRules).length > 1 && (
            <HStack justify="between" align="center">
              <Typography variant="h4" className="text-[var(--color-foreground)]">
                {category}
              </Typography>
              <Badge variant="neutral">{categoryRules.length} rules</Badge>
            </HStack>
          )}
          <VStack gap="sm">
            {categoryRules.map((rule) => (
              <RuleCheckItem
                key={rule.id}
                id={rule.id}
                description={rule.ruleText || rule.description}
                gazetteNumber={rule.gazetteNumber}
                article={rule.article}
                severity={rule.severity}
                isCompliant={rule.isCompliant}
                notes={rule.notes}
                readOnly={readOnly}
                onChange={(data) => handleRuleChange(rule.id, data)}
              />
            ))}
          </VStack>
        </VStack>
      ))}
    </VStack>
  );
};

InspectionChecklist.displayName = "InspectionChecklist";
