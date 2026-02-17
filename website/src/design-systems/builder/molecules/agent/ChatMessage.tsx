/**
 * ChatMessage - A chat bubble for agent/user messages
 *
 * Displays message content with avatar and optional timestamp.
 *
 * Event Contract:
 * - Emits: UI:COPY_MESSAGE (optional) - When message is copied
 * - Emits: UI:RETRY_MESSAGE (optional) - When retry is requested
 * - Payload: { message: ChatMessageData }
 */

import React from "react";
import {
  Box,
  HStack,
  VStack,
  Typography,
} from '@almadar/ui';
import { AgentAvatar, type AvatarRole } from "../../atoms/agent";

export interface ChatMessageProps {
  /** Message content */
  content: string;
  /** Who sent the message */
  role: AvatarRole;
  /** Timestamp */
  timestamp?: number;
  /** Is the message still being typed/streamed */
  isStreaming?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function ChatMessage({
  content,
  role,
  timestamp,
  isStreaming = false,
  className = "",
}: ChatMessageProps) {
  const isAssistant =
    role === "assistant" || role === "tool" || role === "system";

  return (
    <HStack gap="md" className={className} reverse={!isAssistant}>
      <AgentAvatar role={role} size="sm" />

      <VStack
        gap="xs"
        className={`flex-1 max-w-[85%] ${isAssistant ? "" : "items-end"}`}
      >
        <Box
          padding="md"
          rounded="lg"
          bg={isAssistant ? "muted" : "primary"}
          className={isAssistant ? "rounded-tl-sm" : "rounded-tr-sm"}
        >
          <Typography
            variant="body2"
            color={isAssistant ? "primary" : "inherit"}
            className="whitespace-pre-wrap break-words"
          >
            {content}
            {isStreaming && (
              <Box
                as="span"
                display="inline-block"
                className="w-2 h-4 ml-1 bg-current animate-pulse rounded-[var(--radius-sm)]"
              />
            )}
          </Typography>
        </Box>

        {timestamp && (
          <Typography
            variant="caption"
            color="muted"
            align={isAssistant ? "left" : "right"}
          >
            {new Date(timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        )}
      </VStack>
    </HStack>
  );
}

export default ChatMessage;
