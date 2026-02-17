/**
 * AgentActivityFeed - Scrollable activity stream
 *
 * Displays messages, tool calls, and schema changes in chronological order.
 *
 * Event Contract:
 * - Emits: UI:SELECT_ACTIVITY - When an activity is selected
 * - Emits: UI:CLEAR_ACTIVITY - When activities are cleared
 * - Payload: { activity: ActivityItem }
 */

import React, { useRef, useEffect } from "react";
import { Box, VStack, Typography } from '@almadar/ui';
import {
  ChatMessage,
  ToolCallCard,
  FileOperationItem,
  DiffBlock,
  ErrorAlert,
  type DiffHunk,
  type FileOperation,
} from "../../molecules/agent";
import type { AvatarRole } from "../../atoms/agent";

export type ActivityItem =
  | {
      type: "message";
      role: AvatarRole;
      content: string;
      timestamp: number;
      isStreaming?: boolean;
    }
  | {
      type: "tool_call";
      tool: string;
      args: Record<string, unknown>;
      timestamp: number;
      isExecuting?: boolean;
    }
  | {
      type: "tool_result";
      tool: string;
      result: unknown;
      success: boolean;
      timestamp: number;
    }
  | {
      type: "file_operation";
      operation: FileOperation;
      path: string;
      success?: boolean;
      timestamp: number;
    }
  | {
      type: "schema_diff";
      filePath: string;
      hunks: DiffHunk[];
      timestamp: number;
    }
  | { type: "error"; message: string; code?: string; timestamp: number };

export interface AgentActivityFeedProps {
  /** Activity items to display */
  activities: ActivityItem[];
  /** Auto-scroll to bottom on new activities */
  autoScroll?: boolean;
  /** Error retry callback */
  onRetryError?: () => void;
  /** Error dismiss callback */
  onDismissError?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export function AgentActivityFeed({
  activities,
  autoScroll = true,
  onRetryError,
  onDismissError,
  className = "",
}: AgentActivityFeedProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activities.length, autoScroll]);

  if (activities.length === 0) {
    return (
      <Box padding="xl" className={className}>
        <Typography variant="body2" color="muted" align="center">
          No activity yet
        </Typography>
      </Box>
    );
  }

  return (
    <VStack gap="md" className={`overflow-y-auto ${className}`}>
      {activities.map((activity, index) => {
        switch (activity.type) {
          case "message":
            return (
              <ChatMessage
                key={`${activity.type}-${index}`}
                role={activity.role}
                content={activity.content}
                timestamp={activity.timestamp}
                isStreaming={activity.isStreaming}
              />
            );

          case "tool_call":
            return (
              <ToolCallCard
                key={`${activity.type}-${index}`}
                tool={activity.tool}
                args={activity.args}
                isExecuting={activity.isExecuting}
              />
            );

          case "tool_result":
            return (
              <ToolCallCard
                key={`${activity.type}-${index}`}
                tool={activity.tool}
                args={{}}
                result={activity.result}
                success={activity.success}
              />
            );

          case "file_operation":
            return (
              <FileOperationItem
                key={`${activity.type}-${index}`}
                operation={activity.operation}
                path={activity.path}
                success={activity.success}
              />
            );

          case "schema_diff":
            return (
              <DiffBlock
                key={`${activity.type}-${index}`}
                filePath={activity.filePath}
                hunks={activity.hunks}
                maxHeight={200}
              />
            );

          case "error":
            return (
              <ErrorAlert
                key={`${activity.type}-${index}`}
                message={activity.message}
                code={activity.code}
                onRetry={onRetryError}
                onDismiss={onDismissError}
              />
            );

          default:
            return null;
        }
      })}

      {/* Scroll anchor */}
      <div ref={bottomRef} />
    </VStack>
  );
}

export default AgentActivityFeed;
