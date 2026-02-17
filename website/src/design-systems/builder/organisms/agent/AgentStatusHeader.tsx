/**
 * AgentStatusHeader - Header showing agent status and controls
 *
 * Event Contract:
 * - Emits: UI:CANCEL_GENERATION - When cancel is clicked
 * - Payload: void
 */

import React from "react";
import {
  Box,
  HStack,
  Typography,
  Button,
  Badge,
} from '@almadar/ui';
import { AgentStatusBadge, type AgentStatus } from "../../atoms/agent";

export interface AgentStatusHeaderProps {
  /** Current status */
  status: AgentStatus;
  /** Skill name being used */
  skill?: string;
  /** Thread ID for the current session */
  threadId?: string;
  /** Cancel callback */
  onCancel?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export function AgentStatusHeader({
  status,
  skill,
  threadId,
  onCancel,
  className = "",
}: AgentStatusHeaderProps) {
  const isActive = status === "running" || status === "interrupted";

  return (
    <Box
      padding="md"
      border
      bg="transparent"
      className={`border-t-0 border-l-0 border-r-0 ${className}`}
    >
      <HStack justify="between" align="center">
        <HStack gap="md" align="center">
          <AgentStatusBadge status={status} />
          {skill && (
            <Badge variant="neutral" size="sm" className="font-mono">
              {skill}
            </Badge>
          )}
        </HStack>

        <HStack gap="sm" align="center">
          {threadId && (
            <Typography
              variant="caption"
              color="muted"
              className="hidden sm:block"
            >
              {threadId.slice(0, 8)}...
            </Typography>
          )}
          {isActive && onCancel && (
            <Button variant="ghost" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </HStack>
      </HStack>
    </Box>
  );
}

export default AgentStatusHeader;
