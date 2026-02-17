/**
 * DiffLine - Single line of a diff display
 *
 * Shows a line with appropriate coloring for add/remove/context.
 *
 * Event Contract:
 * - Emits: None (display only)
 */

import React from "react";
import { HStack, Box, Typography } from '@almadar/ui';

export type DiffLineType = "add" | "remove" | "context";

export interface DiffLineProps {
  type: DiffLineType;
  content: string;
  lineNumber?: number;
  /** Show line numbers */
  showLineNumber?: boolean;
}

const lineConfig: Record<
  DiffLineType,
  {
    bgClass: string;
    gutterClass: string;
    prefix: string;
    color: "success" | "error" | "muted";
  }
> = {
  add: {
    bgClass: "bg-[color-mix(in_srgb,var(--color-success)_10%,transparent)]",
    gutterClass: "bg-[color-mix(in_srgb,var(--color-success)_20%,transparent)]",
    prefix: "+",
    color: "success",
  },
  remove: {
    bgClass: "bg-[color-mix(in_srgb,var(--color-error)_10%,transparent)]",
    gutterClass: "bg-[color-mix(in_srgb,var(--color-error)_20%,transparent)]",
    prefix: "-",
    color: "error",
  },
  context: {
    bgClass: "bg-[var(--color-muted)]",
    gutterClass: "bg-[var(--color-surface)]",
    prefix: " ",
    color: "muted",
  },
};

export function DiffLine({
  type,
  content,
  lineNumber,
  showLineNumber = false,
}: DiffLineProps) {
  const config = lineConfig[type];

  return (
    <HStack gap="none" className={`font-mono text-xs ${config.bgClass}`}>
      {showLineNumber && lineNumber !== undefined && (
        <Box
          paddingX="sm"
          paddingY="xs"
          className={`w-10 text-right select-none ${config.gutterClass}`}
        >
          <Typography variant="caption" color={config.color}>
            {lineNumber}
          </Typography>
        </Box>
      )}
      <Box
        paddingX="xs"
        paddingY="xs"
        className={`w-5 text-center select-none ${config.gutterClass}`}
      >
        <Typography variant="caption" color={config.color}>
          {config.prefix}
        </Typography>
      </Box>
      <Box paddingX="sm" paddingY="xs" className="flex-1">
        <Typography
          variant="caption"
          color={config.color}
          className="whitespace-pre font-mono"
          as="code"
        >
          {content}
        </Typography>
      </Box>
    </HStack>
  );
}

export default DiffLine;
