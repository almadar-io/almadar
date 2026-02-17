/**
 * AgentChatInput - Chat input with send button
 *
 * Event Contract:
 * - Emits: UI:SEND_MESSAGE - When message is sent
 * - Payload: { message: string }
 */

import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import {
  Box,
  HStack,
  Textarea,
  Button,
  Spinner,
  Icon,
} from '@almadar/ui';

export interface AgentChatInputProps {
  /** Placeholder text */
  placeholder?: string;
  /** Send callback */
  onSend: (message: string) => void;
  /** Whether the agent is currently processing */
  isProcessing?: boolean;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function AgentChatInput({
  placeholder = "Type a message...",
  onSend,
  isProcessing = false,
  disabled = false,
  className = "",
}: AgentChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isDisabled = disabled || isProcessing || message.trim().length === 0;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = () => {
    if (isDisabled) return;

    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      onSend(trimmedMessage);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Box
      padding="md"
      border
      bg="surface"
      className={`border-l-0 border-r-0 border-b-0 ${className}`}
    >
      <HStack gap="sm" align="end">
        <Box className="flex-1">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="resize-none min-h-[40px]"
          />
        </Box>

        <Button
          variant="primary"
          size="md"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="rounded-[var(--radius-full)] w-10 h-10 p-0"
        >
          {isProcessing ? (
            <Spinner size="sm" />
          ) : (
            <Icon icon={Send} size="sm" />
          )}
        </Button>
      </HStack>
    </Box>
  );
}

export default AgentChatInput;
