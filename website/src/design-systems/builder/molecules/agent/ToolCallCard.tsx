/**
 * ToolCallCard - Displays a tool call with arguments
 *
 * Shows the tool being called and its arguments in an expandable format.
 *
 * Event Contract:
 * - Emits: UI:EXPAND_TOOL - When tool card is expanded
 * - Emits: UI:RETRY_TOOL - When retry is requested
 * - Payload: { toolCall: ToolCallData }
 */

import React, { useState, useMemo } from "react";
import { ChevronDown, Loader2, Check, X } from "lucide-react";
import {
  Box,
  HStack,
  VStack,
  Typography,
  Badge,
  Button,
  Icon,
} from '@almadar/ui';
import { ToolBadge, DiffLine } from "../../atoms/agent";

export interface ToolCallCardProps {
  /** Tool name */
  tool: string;
  /** Tool arguments */
  args: Record<string, unknown>;
  /** Result if available */
  result?: unknown;
  /** Whether the tool is currently executing */
  isExecuting?: boolean;
  /** Whether execution was successful */
  success?: boolean;
  /** Error message if failed */
  error?: string;
  /** Additional CSS classes */
  className?: string;
}

function isEditTool(tool: string): boolean {
  const editTools = ["Edit", "edit", "search_replace", "write", "Write", "edit_file"];
  return editTools.some((t) => tool.toLowerCase().includes(t.toLowerCase()));
}

function isJsonFile(path: string | undefined): boolean {
  return typeof path === "string" && path.endsWith(".json");
}

function extractEditInfo(args: Record<string, unknown>): {
  filePath: string | undefined;
  oldStr: string | undefined;
  newStr: string | undefined;
} {
  return {
    filePath: (args.file_path || args.path || args.target_file || args.filePath) as
      | string
      | undefined,
    oldStr: (args.old_str || args.old_string || args.oldStr || args.search) as
      | string
      | undefined,
    newStr: (args.new_str ||
      args.new_string ||
      args.newStr ||
      args.replace ||
      args.content) as string | undefined,
  };
}

function createDiffLines(
  oldStr: string,
  newStr: string
): Array<{ type: "add" | "remove" | "context"; content: string }> {
  const oldLines = oldStr.split("\n");
  const newLines = newStr.split("\n");
  const lines: Array<{ type: "add" | "remove" | "context"; content: string }> = [];

  let prefixLen = 0;
  while (
    prefixLen < oldLines.length &&
    prefixLen < newLines.length &&
    oldLines[prefixLen] === newLines[prefixLen]
  ) {
    prefixLen++;
  }

  const prefixContext = Math.max(0, prefixLen - 3);
  for (let i = prefixContext; i < prefixLen; i++) {
    lines.push({ type: "context", content: oldLines[i] });
  }

  for (let i = prefixLen; i < oldLines.length; i++) {
    lines.push({ type: "remove", content: oldLines[i] });
  }

  for (let i = prefixLen; i < newLines.length; i++) {
    lines.push({ type: "add", content: newLines[i] });
  }

  return lines;
}

export function ToolCallCard({
  tool,
  args,
  result,
  isExecuting = false,
  success,
  error,
  className = "",
}: ToolCallCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<"diff" | "raw">("diff");

  const hasResult = result !== undefined || error;
  const argsString = JSON.stringify(args, null, 2);
  const resultString = result
    ? typeof result === "string"
      ? result
      : JSON.stringify(result, null, 2)
    : error;

  const isEdit = isEditTool(tool);
  const editInfo = useMemo(() => (isEdit ? extractEditInfo(args) : null), [isEdit, args]);
  const isJsonEdit = editInfo && isJsonFile(editInfo.filePath);

  const diffLines = useMemo(() => {
    if (!isJsonEdit || !editInfo.oldStr || !editInfo.newStr) return null;
    return createDiffLines(editInfo.oldStr, editInfo.newStr);
  }, [isJsonEdit, editInfo]);

  const diffStats = useMemo(() => {
    if (!diffLines) return null;
    return {
      added: diffLines.filter((l) => l.type === "add").length,
      removed: diffLines.filter((l) => l.type === "remove").length,
    };
  }, [diffLines]);

  return (
    <Box border rounded="lg" overflow="hidden" className={`shrink-0 ${className}`}>
      {/* Header */}
      <Box
        as="button"
        padding="sm"
        bg="muted"
        fullWidth
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer text-left hover:bg-[var(--color-surface-hover)]"
      >
        <HStack gap="sm" align="center">
          <ToolBadge tool={tool} />

          {editInfo?.filePath && (
            <Typography
              variant="caption"
              color="muted"
              className="font-mono truncate max-w-[180px]"
            >
              {editInfo.filePath}
            </Typography>
          )}

          {diffStats && (
            <HStack gap="xs">
              <Typography variant="caption" color="success">
                +{diffStats.added}
              </Typography>
              <Typography variant="caption" color="error">
                -{diffStats.removed}
              </Typography>
            </HStack>
          )}

          <Box className="ml-auto">
            <HStack gap="sm" align="center">
              {isExecuting && <Icon icon={Loader2} size="sm" className="animate-spin" />}
              {success === true && (
                <Icon icon={Check} size="sm" className="text-[var(--color-success)]" />
              )}
              {success === false && (
                <Icon icon={X} size="sm" className="text-[var(--color-error)]" />
              )}
              <Icon
                icon={ChevronDown}
                size="sm"
                className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
              />
            </HStack>
          </Box>
        </HStack>
      </Box>

      {/* Expanded Content */}
      {isExpanded && (
        <Box border className="border-l-0 border-r-0 border-b-0" bg="surface">
          {/* View mode toggle for JSON edits */}
          {isJsonEdit && diffLines && diffLines.length > 0 && (
            <Box padding="sm" bg="muted" border className="border-l-0 border-r-0 border-t-0">
              <HStack gap="sm" align="center">
                <Typography variant="caption" color="muted">
                  View:
                </Typography>
                <Button
                  variant={viewMode === "diff" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("diff")}
                >
                  Diff
                </Button>
                <Button
                  variant={viewMode === "raw" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("raw")}
                >
                  Raw
                </Button>
              </HStack>
            </Box>
          )}

          {/* Diff View */}
          {isJsonEdit && diffLines && diffLines.length > 0 && viewMode === "diff" ? (
            <Box overflow="auto" className="max-h-80">
              {diffLines.map((line, idx) => (
                <DiffLine key={idx} type={line.type} content={line.content} />
              ))}
            </Box>
          ) : (
            <VStack gap="none">
              {/* Arguments */}
              <Box padding="md">
                <VStack gap="xs">
                  <Typography variant="overline">Arguments</Typography>
                  <Box bg="muted" padding="sm" rounded="md" overflow="auto" className="max-h-48">
                    <Typography
                      variant="caption"
                      className="font-mono whitespace-pre"
                      as="pre"
                    >
                      {argsString}
                    </Typography>
                  </Box>
                </VStack>
              </Box>

              {/* Result */}
              {hasResult && (
                <Box
                  padding="md"
                  border
                  className="border-l-0 border-r-0 border-b-0"
                >
                  <VStack gap="xs">
                    <Typography variant="overline">
                      {error ? "Error" : "Result"}
                    </Typography>
                    <Box
                      bg={error ? "transparent" : "muted"}
                      padding="sm"
                      rounded="md"
                      overflow="auto"
                      className={`max-h-40 ${error ? "border border-[var(--color-error)]" : ""}`}
                    >
                      <Typography
                        variant="caption"
                        color={error ? "error" : "primary"}
                        className="font-mono whitespace-pre"
                        as="pre"
                      >
                        {typeof resultString === "string"
                          ? resultString.slice(0, 1000) +
                            (resultString.length > 1000 ? "..." : "")
                          : resultString}
                      </Typography>
                    </Box>
                  </VStack>
                </Box>
              )}
            </VStack>
          )}
        </Box>
      )}
    </Box>
  );
}

export default ToolCallCard;
