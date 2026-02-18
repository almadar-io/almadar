/**
 * AgentInterruptDialog Component
 *
 * Dialog for handling human-in-the-loop interrupts during DeepAgent generation.
 * Displays pending tool calls and allows users to approve, edit, or reject each.
 */

import React, { useState } from 'react';
import {
  Button,
  Box,
  VStack,
  HStack,
  Typography,
  Label,
  Textarea,
} from '@almadar/ui';

// =============================================================================
// Types (inlined from useDeepAgentGeneration + stubs/deepagent)
// =============================================================================

export interface DeepAgentActionRequest {
  id: string;
  type: string;
  tool: string;
  args: Record<string, unknown>;
  description?: string;
  allowedDecisions: ('approve' | 'edit' | 'reject')[];
  status: 'pending' | 'approved' | 'rejected' | 'edited';
}

export interface DeepAgentInterrupt {
  id: string;
  type: string;
  actionRequests: DeepAgentActionRequest[];
  timestamp: number;
  threadId?: string;
}

export interface Decision {
  id: string;
  type: string;
  question: string;
  options?: string[];
  timestamp: Date;
  args?: Record<string, unknown>;
}

export interface AgentInterruptDialogProps {
  interrupt: DeepAgentInterrupt;
  onSubmit: (decisions: Decision[], options?: { approveAll?: boolean }) => void;
  onCancel: () => void;
}

// =============================================================================
// Internal Types
// =============================================================================

interface DecisionState {
  type: 'approve' | 'edit' | 'reject';
  args?: Record<string, unknown>;
}

// =============================================================================
// ActionRequestCard
// =============================================================================

interface ActionRequestCardProps {
  request: DeepAgentActionRequest;
  index: number;
  decision: DecisionState;
  onDecisionChange: (decision: DecisionState) => void;
}

function ActionRequestCard({
  request,
  index,
  decision,
  onDecisionChange,
}: ActionRequestCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedArgs, setEditedArgs] = useState(JSON.stringify(request.args, null, 2));

  const handleDecisionTypeChange = (type: 'approve' | 'edit' | 'reject') => {
    if (type === 'edit') {
      setIsEditing(true);
      onDecisionChange({ type, args: request.args });
    } else {
      setIsEditing(false);
      onDecisionChange({ type });
    }
  };

  const handleArgsChange = (value: string) => {
    setEditedArgs(value);
    try {
      const parsed = JSON.parse(value);
      onDecisionChange({ type: 'edit', args: parsed });
    } catch {
      // Invalid JSON, don't update
    }
  };

  return (
    <Box
      className="border border-[var(--color-border)] rounded-lg p-4 bg-[var(--color-card)]"
    >
      {/* Header */}
      <HStack align="center" gap="sm" className="mb-3">
        <Typography
          as="span"
          variant="caption"
          className="px-2 py-1 rounded font-medium"
          style={{ backgroundColor: 'color-mix(in srgb, var(--color-info) 10%, transparent)', color: 'var(--color-info)' }}
        >
          Action {index + 1}
        </Typography>
        <Typography
          as="span"
          variant="small"
          className="font-mono font-semibold text-[var(--color-foreground)]"
        >
          {request.tool}
        </Typography>
      </HStack>

      {/* Description */}
      {request.description && (
        <Box
          className="mb-4 p-3 border rounded"
          style={{ backgroundColor: 'color-mix(in srgb, var(--color-warning) 10%, transparent)', borderColor: 'color-mix(in srgb, var(--color-warning) 30%, transparent)' }}
        >
          <Typography
            variant="body2"
            className="whitespace-pre-wrap"
            style={{ color: 'var(--color-warning)' }}
          >
            {request.description}
          </Typography>
        </Box>
      )}

      {/* Arguments */}
      <VStack gap="xs" className="mb-4">
        <Label className="text-xs text-[var(--color-muted-foreground)] uppercase tracking-wide">
          Arguments
        </Label>
        {isEditing ? (
          <Textarea
            value={editedArgs}
            onChange={(e) => handleArgsChange(e.target.value)}
            className="w-full h-32 font-mono text-xs bg-[var(--color-background)] border border-[var(--color-border)] rounded p-2 text-[var(--color-foreground)] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        ) : (
          <Box
            as="pre"
            className="font-mono text-xs bg-[var(--color-background)] text-[var(--color-foreground)] p-3 rounded overflow-auto max-h-32"
          >
            {JSON.stringify(request.args, null, 2)}
          </Box>
        )}
      </VStack>

      {/* Decision Buttons */}
      <HStack gap="sm">
        {request.allowedDecisions.includes('approve') && (
          <Button
            onClick={() => handleDecisionTypeChange('approve')}
            variant="default"
            className="flex-1"
            style={
              decision.type === 'approve'
                ? { backgroundColor: 'var(--color-success)', color: 'white' }
                : { backgroundColor: 'var(--color-secondary)', color: 'var(--color-foreground)' }
            }
          >
            Approve
          </Button>
        )}
        {request.allowedDecisions.includes('edit') && (
          <Button
            onClick={() => handleDecisionTypeChange('edit')}
            variant="default"
            className="flex-1"
            style={
              decision.type === 'edit'
                ? { backgroundColor: 'var(--color-warning)', color: 'white' }
                : { backgroundColor: 'var(--color-secondary)', color: 'var(--color-foreground)' }
            }
          >
            Edit
          </Button>
        )}
        {request.allowedDecisions.includes('reject') && (
          <Button
            onClick={() => handleDecisionTypeChange('reject')}
            variant="default"
            className="flex-1"
            style={
              decision.type === 'reject'
                ? { backgroundColor: 'var(--color-error)', color: 'white' }
                : { backgroundColor: 'var(--color-secondary)', color: 'var(--color-foreground)' }
            }
          >
            Reject
          </Button>
        )}
      </HStack>
    </Box>
  );
}

// =============================================================================
// Main Component
// =============================================================================

export function AgentInterruptDialog({
  interrupt,
  onSubmit,
  onCancel,
}: AgentInterruptDialogProps) {
  const [decisions, setDecisions] = useState<DecisionState[]>(
    interrupt.actionRequests.map(() => ({ type: 'approve' }))
  );

  const handleDecisionChange = (index: number, decision: DecisionState) => {
    const newDecisions = [...decisions];
    newDecisions[index] = decision;
    setDecisions(newDecisions);
  };

  const handleSubmit = () => {
    const formattedDecisions: Decision[] = decisions.map((d, idx) => ({
      id: `decision-${idx}`,
      type: d.type,
      question: `Action ${idx + 1}: ${interrupt.actionRequests[idx]?.tool || 'unknown'}`,
      timestamp: new Date(),
      ...(d.args ? { args: d.args } : {}),
    }));
    onSubmit(formattedDecisions);
  };

  const handleApproveAll = () => {
    const approveAllDecisions: Decision[] = interrupt.actionRequests.map((req, idx) => ({
      id: `decision-${idx}`,
      type: 'approve',
      question: `Action ${idx + 1}: ${req.tool}`,
      timestamp: new Date(),
    }));
    onSubmit(approveAllDecisions, { approveAll: true });
  };

  return (
    <Box className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <Box
        className="fixed inset-0 bg-black/60 transition-opacity"
        onClick={onCancel}
      />

      {/* Dialog */}
      <Box className="flex min-h-full items-center justify-center p-4">
        <Box className="relative bg-[var(--color-card)] rounded-xl shadow-xl max-w-2xl w-full mx-auto transform transition-all">
          {/* Header */}
          <Box className="px-6 py-4 border-b border-[var(--color-border)]">
            <Typography
              variant="h2"
              className="text-xl font-bold text-[var(--color-foreground)]"
            >
              Action Approval Required
            </Typography>
            <Typography
              variant="body2"
              className="mt-1 text-[var(--color-muted-foreground)]"
            >
              The agent wants to perform the following action(s). Please review
              and decide how to proceed.
            </Typography>
          </Box>

          {/* Content */}
          <Box className="px-6 py-4 max-h-[60vh] overflow-y-auto bg-[var(--color-background)]/50">
            <VStack gap="md">
              {interrupt.actionRequests.map((request, index) => (
                <ActionRequestCard
                  key={index}
                  request={request}
                  index={index}
                  decision={decisions[index]}
                  onDecisionChange={(d) => handleDecisionChange(index, d)}
                />
              ))}
            </VStack>
          </Box>

          {/* Footer */}
          <HStack
            justify="between"
            wrap
            gap="sm"
            className="px-6 py-4 border-t border-[var(--color-border)]"
          >
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <HStack gap="sm">
              <Button
                variant="secondary"
                onClick={handleApproveAll}
                title="Approve this action and all future actions without interruption"
              >
                Approve All Future
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </HStack>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}

AgentInterruptDialog.displayName = 'AgentInterruptDialog';
export default AgentInterruptDialog;
