/**
 * DiffBlock - A block of diff lines with file header
 *
 * Shows a unified diff format for file changes.
 *
 * Event Contract:
 * - Emits: UI:ACCEPT_CHANGE - When a change is accepted
 * - Emits: UI:REJECT_CHANGE - When a change is rejected
 * - Payload: { change: DiffChange }
 */

import React from "react";
import { FileCode } from "lucide-react";
import {
  Box,
  HStack,
  VStack,
  Typography,
  Icon,
} from '@almadar/ui';
import { DiffLine, type DiffLineType } from "../../atoms/agent";

export interface DiffHunk {
  oldStart: number;
  oldLines: number;
  newStart: number;
  newLines: number;
  lines: Array<{
    type: DiffLineType;
    content: string;
  }>;
}

export interface DiffBlockProps {
  /** File path that was changed */
  filePath: string;
  /** Diff hunks */
  hunks: DiffHunk[];
  /** Whether to show line numbers */
  showLineNumbers?: boolean;
  /** Max height before scrolling */
  maxHeight?: number;
  /** Additional CSS classes */
  className?: string;
}

export function DiffBlock({
  filePath,
  hunks,
  showLineNumbers = false,
  maxHeight = 300,
  className = "",
}: DiffBlockProps) {
  return (
    <Box border rounded="lg" overflow="hidden" className={`shrink-0 ${className}`}>
      {/* File Header */}
      <Box padding="sm" bg="muted" border className="border-t-0 border-l-0 border-r-0">
        <HStack gap="sm" align="center">
          <Icon icon={FileCode} size="sm" />
          <Typography variant="caption" className="font-mono truncate">
            {filePath}
          </Typography>
        </HStack>
      </Box>

      {/* Diff Content */}
      <Box
        overflow="auto"
        bg="surface"
        style={{ maxHeight }}
      >
        {hunks.map((hunk, hunkIdx) => (
          <VStack key={hunkIdx} gap="none">
            {/* Hunk Header */}
            <Box paddingX="md" paddingY="xs" bg="accent">
              <Typography
                variant="caption"
                color="inherit"
                className="font-mono"
              >
                @@ -{hunk.oldStart},{hunk.oldLines} +{hunk.newStart},{hunk.newLines} @@
              </Typography>
            </Box>

            {/* Hunk Lines */}
            {hunk.lines.map((line, lineIdx) => (
              <DiffLine
                key={`${hunkIdx}-${lineIdx}`}
                type={line.type}
                content={line.content}
                showLineNumber={showLineNumbers}
              />
            ))}
          </VStack>
        ))}

        {/* Empty state */}
        {hunks.length === 0 && (
          <Box padding="xl">
            <Typography variant="body2" color="muted" align="center">
              No changes
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default DiffBlock;
