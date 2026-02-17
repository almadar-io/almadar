/**
 * SchemaDiffViewer - Full-featured schema diff viewer
 *
 * Shows all schema changes with navigation and summary.
 *
 * Event Contract:
 * - Emits: UI:ACCEPT_DIFF - When diff is accepted
 * - Emits: UI:REJECT_DIFF - When diff is rejected
 * - Emits: UI:VIEW_DIFF - When viewing a specific diff
 * - Payload: { diff: DiffBlock }
 */

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  Box,
  HStack,
  VStack,
  Typography,
  Button,
  Icon,
} from '@almadar/ui';
import { DiffBlock, type DiffHunk } from "../../molecules/agent";

export interface SchemaDiff {
  id: string;
  filePath: string;
  hunks: DiffHunk[];
  timestamp: number;
  addedLines: number;
  removedLines: number;
}

export interface SchemaDiffViewerProps {
  /** List of schema diffs — accepts DS SchemaDiff[] or compiler-generated Record<string, unknown>[] */
  diffs?: SchemaDiff[] | Record<string, unknown>[];
  /** Title for the viewer */
  title?: string;
  /** Collapse by default */
  defaultCollapsed?: boolean;
  /** Selected diff ID (passed by compiler) */
  selectedDiffId?: string;
  /** Event name for selecting a diff (compiler pattern) */
  onSelectDiff?: string;
  /** Event name for accepting a diff (compiler pattern) */
  onAcceptDiff?: string;
  /** Event name for rejecting a diff (compiler pattern) */
  onRejectDiff?: string;
  /** Event name for accepting all diffs (compiler pattern) */
  onAcceptAll?: string;
  /** Entity name (passed by compiler) */
  entity?: string;
  /** Additional CSS classes */
  className?: string;
}

export function SchemaDiffViewer({
  diffs: rawDiffs = [],
  title = "Schema Changes",
  defaultCollapsed = false,
  className = "",
}: SchemaDiffViewerProps) {
  // Normalize diffs — compiler generates Record<string, unknown>[] for array fields
  const diffs = (rawDiffs || []) as SchemaDiff[];

  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [selectedDiffId, setSelectedDiffId] = useState<string | null>(
    diffs.length > 0 ? diffs[diffs.length - 1]?.id : null
  );

  if (diffs.length === 0) {
    return null;
  }

  const selectedDiff = diffs.find((d) => d.id === selectedDiffId);

  const totalAdded = diffs.reduce((sum, d) => sum + d.addedLines, 0);
  const totalRemoved = diffs.reduce((sum, d) => sum + d.removedLines, 0);

  return (
    <Box border rounded="lg" overflow="hidden" className={className}>
      {/* Header */}
      <Box
        padding="md"
        bg="muted"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="cursor-pointer hover:bg-[var(--color-surface-hover)]"
      >
        <HStack justify="between" align="center">
          <HStack gap="md" align="center">
            <Icon
              icon={ChevronRight}
              size="sm"
              className={`transition-transform ${isCollapsed ? "" : "rotate-90"}`}
            />
            <Typography variant="body2" weight="medium">
              {title}
            </Typography>
            <Typography variant="caption" color="muted">
              ({diffs.length} change{diffs.length !== 1 ? "s" : ""})
            </Typography>
          </HStack>

          <HStack gap="md">
            <Typography variant="caption" color="success">
              +{totalAdded}
            </Typography>
            <Typography variant="caption" color="error">
              -{totalRemoved}
            </Typography>
          </HStack>
        </HStack>
      </Box>

      {/* Content */}
      {!isCollapsed && (
        <Box border className="border-l-0 border-r-0 border-b-0">
          {/* Change list (if multiple) */}
          {diffs.length > 1 && (
            <Box padding="sm" bg="surface" overflow="auto">
              <HStack gap="sm">
                {diffs.map((diff, index) => (
                  <Button
                    key={diff.id}
                    variant={selectedDiffId === diff.id ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => setSelectedDiffId(diff.id)}
                  >
                    <HStack gap="xs" align="center">
                      <Typography variant="caption">#{index + 1}</Typography>
                      <Typography variant="caption" color="success">
                        +{diff.addedLines}
                      </Typography>
                      <Typography variant="caption" color="error">
                        -{diff.removedLines}
                      </Typography>
                    </HStack>
                  </Button>
                ))}
              </HStack>
            </Box>
          )}

          {/* Diff display */}
          {selectedDiff && (
            <Box padding="md">
              <VStack gap="sm">
                <DiffBlock
                  filePath={selectedDiff.filePath}
                  hunks={selectedDiff.hunks}
                  maxHeight={400}
                />
                <Typography variant="caption" color="muted">
                  Changed at{" "}
                  {new Date(selectedDiff.timestamp).toLocaleTimeString()}
                </Typography>
              </VStack>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default SchemaDiffViewer;
