/**
 * RuleCheckItem
 *
 * A compliance rule item with toggle and notes.
 * Used in inspection wizard to check rule compliance.
 *
 * Event Contract:
 * - Emits: UI:RULE_CHECKED { ruleId, isCompliant, notes }
 */

import React, { useState, useCallback } from "react";
import { cn } from "../../../lib/cn";
import { Box } from "../../../components/atoms/Box";
import { VStack, HStack } from "../../../components/atoms/Stack";
import { Typography } from "../../../components/atoms/Typography";
import { Badge } from "../../../components/atoms/Badge";
import { Card } from "../../../components/atoms/Card";
import { Textarea } from "../../../components/atoms/Textarea";
import { useEventBus } from "../../../hooks/useEventBus";
import { LawReferenceBadge } from "../atoms/LawReferenceBadge";
import { Check, X, AlertTriangle, Camera } from "lucide-react";

export type RuleSeverity = "critical" | "major" | "minor" | "info";

export interface RuleCheckItemProps {
  /** Rule ID */
  id: string;
  /** Rule description */
  description: string;
  /** Official Gazette reference */
  gazetteNumber?: string;
  /** Article reference */
  article?: string;
  /** Severity level */
  severity?: RuleSeverity;
  /** Current compliance status */
  isCompliant?: boolean | null;
  /** Notes for non-compliance */
  notes?: string;
  /** Photos attached */
  photoCount?: number;
  /** Show notes input */
  showNotes?: boolean;
  /** Read-only mode */
  readOnly?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Change handler */
  onChange?: (data: { isCompliant: boolean | null; notes: string }) => void;
}

const severityConfig: Record<
  RuleSeverity,
  { color: string; bgColor: string; label: string }
> = {
  critical: { color: "text-red-600", bgColor: "bg-red-100", label: "Critical" },
  major: { color: "text-orange-600", bgColor: "bg-orange-100", label: "Major" },
  minor: { color: "text-yellow-600", bgColor: "bg-yellow-100", label: "Minor" },
  info: { color: "text-blue-600", bgColor: "bg-blue-100", label: "Info" },
};

export const RuleCheckItem: React.FC<RuleCheckItemProps> = ({
  id,
  description,
  gazetteNumber,
  article,
  severity = "major",
  isCompliant = null,
  notes = "",
  photoCount = 0,
  showNotes = true,
  readOnly = false,
  className,
  onChange,
}) => {
  const eventBus = useEventBus();
  const [localNotes, setLocalNotes] = useState(notes);
  const [localCompliant, setLocalCompliant] = useState(isCompliant);

  const severityStyle = severityConfig[severity];

  const handleComplianceChange = useCallback(
    (value: boolean) => {
      if (readOnly) return;
      setLocalCompliant(value);
      const data = { isCompliant: value, notes: localNotes };
      onChange?.(data);
      eventBus.emit("UI:RULE_CHECKED", { ruleId: id, ...data });
    },
    [id, localNotes, readOnly, onChange, eventBus]
  );

  const handleNotesChange = useCallback(
    (value: string) => {
      if (readOnly) return;
      setLocalNotes(value);
      const data = { isCompliant: localCompliant, notes: value };
      onChange?.(data);
    },
    [localCompliant, readOnly, onChange]
  );

  return (
    <Card className={cn("p-4", className)}>
      <VStack gap="md">
        {/* Header */}
        <HStack justify="between" align="start" wrap>
          <VStack gap="xs" className="flex-1">
            <HStack gap="sm" wrap>
              {(gazetteNumber || article) && (
                <LawReferenceBadge
                  gazette={gazetteNumber}
                  article={article}
                  size="sm"
                />
              )}
              <Badge
                variant="outline"
                className={cn(severityStyle.bgColor, severityStyle.color)}
              >
                {severityStyle.label}
              </Badge>
            </HStack>
            <Typography variant="body" className="font-medium text-neutral-800">
              {description}
            </Typography>
          </VStack>

          {/* Compliance Toggle */}
          {!readOnly && (
            <HStack gap="xs">
              <button
                type="button"
                onClick={() => handleComplianceChange(true)}
                className={cn(
                  "p-2 rounded-lg border transition-all",
                  localCompliant === true
                    ? "bg-green-100 border-green-300 text-green-600"
                    : "bg-neutral-50 border-neutral-200 text-neutral-400 hover:bg-green-50"
                )}
              >
                <Check className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => handleComplianceChange(false)}
                className={cn(
                  "p-2 rounded-lg border transition-all",
                  localCompliant === false
                    ? "bg-red-100 border-red-300 text-red-600"
                    : "bg-neutral-50 border-neutral-200 text-neutral-400 hover:bg-red-50"
                )}
              >
                <X className="h-5 w-5" />
              </button>
            </HStack>
          )}

          {/* Read-only status */}
          {readOnly && localCompliant !== null && (
            <Box
              rounded="lg"
              padding="sm"
              className={cn(
                localCompliant
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              )}
            >
              {localCompliant ? (
                <Check className="h-5 w-5" />
              ) : (
                <X className="h-5 w-5" />
              )}
            </Box>
          )}
        </HStack>

        {/* Notes section - shown when non-compliant or explicitly requested */}
        {showNotes && (localCompliant === false || localNotes) && (
          <VStack gap="xs">
            <HStack gap="xs" align="center">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <Typography variant="small" className="font-medium text-neutral-600">
                Non-compliance Notes
              </Typography>
            </HStack>
            {readOnly ? (
              <Typography variant="body" className="text-neutral-700">
                {localNotes || "No notes provided"}
              </Typography>
            ) : (
              <Textarea
                value={localNotes}
                onChange={(e) => handleNotesChange(e.target.value)}
                placeholder="Describe the non-compliance issue..."
                rows={2}
                className="w-full"
              />
            )}
          </VStack>
        )}

        {/* Photo indicator */}
        {photoCount > 0 && (
          <HStack gap="xs" align="center" className="text-neutral-500">
            <Camera className="h-4 w-4" />
            <Typography variant="small">
              {photoCount} photo{photoCount !== 1 ? "s" : ""} attached
            </Typography>
          </HStack>
        )}
      </VStack>
    </Card>
  );
};

RuleCheckItem.displayName = "RuleCheckItem";
