/**
 * TodoItem - A single todo item with activity accordion
 *
 * Displays a todo with status indicator and expandable activity details.
 *
 * Event Contract:
 * - Emits: UI:TODO_TOGGLE - When todo status is toggled
 * - Emits: UI:TODO_SELECT - When todo is selected
 * - Payload: { todo: TodoItemData }
 */

import React, { useState, useMemo } from "react";
import { Circle, Loader2, Check, ChevronDown } from "lucide-react";
import {
  Box,
  HStack,
  VStack,
  Typography,
  Badge,
  Button,
  Icon,
} from '@almadar/ui';
import { DiffLine } from "../../atoms/agent";

export type TodoActivityType = "thinking" | "tool_call" | "tool_result" | "code_change";

export interface TodoActivity {
  type: TodoActivityType;
  content: string;
  timestamp: number;
  tool?: string;
  success?: boolean;
  filePath?: string;
  diff?: string;
}

export interface Todo {
  id: string;
  task: string;
  status: "pending" | "in_progress" | "completed";
  latestActivity?: TodoActivity;
  activityHistory?: TodoActivity[];
}

export interface TodoItemProps {
  todo: Todo;
  /** Auto-expand when in progress */
  autoExpand?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const statusConfig: Record<
  Todo["status"],
  { variant: "neutral" | "info" | "success"; icon: typeof Circle }
> = {
  pending: { variant: "neutral", icon: Circle },
  in_progress: { variant: "info", icon: Loader2 },
  completed: { variant: "success", icon: Check },
};

const activityTypeConfig: Record<
  TodoActivityType,
  { icon: string; label: string; variant: "neutral" | "info" | "success" | "warning" }
> = {
  thinking: { icon: "💭", label: "Thinking", variant: "neutral" },
  tool_call: { icon: "🔧", label: "Tool Call", variant: "info" },
  tool_result: { icon: "✅", label: "Result", variant: "success" },
  code_change: { icon: "📝", label: "Code Change", variant: "warning" },
};

function parseDiffToLines(
  diff: string
): Array<{ type: "add" | "remove" | "context"; content: string }> {
  const lines = diff.split("\n");
  const result: Array<{ type: "add" | "remove" | "context"; content: string }> = [];

  for (const line of lines) {
    if (line.startsWith("---") || line.startsWith("+++") || line.startsWith("@@")) {
      continue;
    }

    if (line.startsWith("+")) {
      result.push({ type: "add", content: line.slice(1) });
    } else if (line.startsWith("-")) {
      result.push({ type: "remove", content: line.slice(1) });
    } else {
      result.push({ type: "context", content: line.slice(1) || line });
    }
  }

  return result;
}

function ActivityDisplay({ activity }: { activity: TodoActivity }) {
  const config = activityTypeConfig[activity.type];
  const [showFullDiff, setShowFullDiff] = useState(false);

  const diffLines = useMemo(() => {
    if (activity.type !== "code_change" || !activity.diff) return null;
    return parseDiffToLines(activity.diff);
  }, [activity.type, activity.diff]);

  const diffStats = useMemo(() => {
    if (!diffLines) return null;
    return {
      added: diffLines.filter((l) => l.type === "add").length,
      removed: diffLines.filter((l) => l.type === "remove").length,
    };
  }, [diffLines]);

  const visibleDiffLines = showFullDiff ? diffLines : diffLines?.slice(0, 10);
  const hasMoreLines = diffLines && diffLines.length > 10;

  return (
    <Box border className="border-l-2 border-t-0 border-r-0 border-b-0" paddingX="md" paddingY="sm">
      <VStack gap="sm">
        {/* Activity Header */}
        <HStack gap="sm" align="center" wrap>
          <Typography variant="caption">{config.icon}</Typography>
          <Badge variant={config.variant} size="sm">
            {config.label}
          </Badge>
          {activity.tool && (
            <Badge variant="neutral" size="sm" className="font-mono">
              {activity.tool}
            </Badge>
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
          <Typography variant="caption" color="muted" className="ml-auto">
            {new Date(activity.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </Typography>
        </HStack>

        {/* File path */}
        {activity.filePath && (
          <Typography variant="caption" color="muted" className="font-mono">
            📁 {activity.filePath}
          </Typography>
        )}

        {/* Non-diff content */}
        {activity.type !== "code_change" && activity.content && (
          <Typography variant="caption" color="muted" className="whitespace-pre-wrap break-words">
            {activity.content.slice(0, 200)}
            {activity.content.length > 200 ? "..." : ""}
          </Typography>
        )}

        {/* Diff visualization */}
        {activity.type === "code_change" && diffLines && diffLines.length > 0 && (
          <Box border rounded="lg" overflow="hidden">
            <Box overflow="auto" bg="surface" className="max-h-60">
              {visibleDiffLines?.map((line, idx) => (
                <DiffLine key={idx} type={line.type} content={line.content} />
              ))}
            </Box>
            {hasMoreLines && (
              <Box
                padding="sm"
                bg="muted"
                border
                className="border-l-0 border-r-0 border-b-0"
                onClick={() => setShowFullDiff(!showFullDiff)}
              >
                <Typography variant="caption" color="muted" align="center">
                  {showFullDiff
                    ? "Show less"
                    : `Show ${diffLines.length - 10} more lines`}
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </VStack>
    </Box>
  );
}

export function TodoItem({ todo, autoExpand = true, className = "" }: TodoItemProps) {
  const [isExpanded, setIsExpanded] = useState(
    autoExpand && todo.status === "in_progress" && todo.latestActivity !== undefined
  );

  const hasActivity =
    todo.latestActivity || (todo.activityHistory && todo.activityHistory.length > 0);
  const config = statusConfig[todo.status];
  const StatusIcon = config.icon;

  return (
    <Box bg="muted" rounded="lg" overflow="hidden" className={className}>
      {/* Header */}
      <Box
        padding="md"
        onClick={() => hasActivity && setIsExpanded(!isExpanded)}
        className={hasActivity ? "cursor-pointer hover:bg-[var(--color-surface-hover)]" : ""}
      >
        <HStack gap="md" align="center">
          <Icon
            icon={StatusIcon}
            size="sm"
            className={todo.status === "in_progress" ? "animate-spin" : ""}
          />
          <Typography variant="body2" className="flex-1">
            {todo.task}
          </Typography>
          <Badge variant={config.variant} size="sm">
            {todo.status.replace("_", " ")}
          </Badge>
          {hasActivity && (
            <Icon
              icon={ChevronDown}
              size="sm"
              className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
          )}
        </HStack>
      </Box>

      {/* Expanded Content */}
      {isExpanded && hasActivity && (
        <Box padding="md" bg="surface">
          <VStack gap="md">
            {/* Latest Activity */}
            {todo.latestActivity && (
              <VStack gap="xs">
                <Typography variant="overline">Current Activity</Typography>
                <ActivityDisplay activity={todo.latestActivity} />
              </VStack>
            )}

            {/* Activity History */}
            {todo.activityHistory && todo.activityHistory.length > 1 && (
              <details>
                <Box as="summary" className="cursor-pointer">
                  <Typography variant="caption" color="muted">
                    View history ({todo.activityHistory.length - 1} previous)
                  </Typography>
                </Box>
                <VStack gap="sm" className="mt-2 max-h-64 overflow-y-auto">
                  {todo.activityHistory
                    .slice(0, -1)
                    .reverse()
                    .map((activity, idx) => (
                      <ActivityDisplay key={idx} activity={activity} />
                    ))}
                </VStack>
              </details>
            )}
          </VStack>
        </Box>
      )}
    </Box>
  );
}

export default TodoItem;
