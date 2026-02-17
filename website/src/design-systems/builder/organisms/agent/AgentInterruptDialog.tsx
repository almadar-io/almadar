/**
 * AgentInterruptDialog Component
 *
 * Dialog for handling human-in-the-loop interrupts during DeepAgent generation.
 * Displays pending tool calls and allows users to approve, edit, or reject each.
 */

import React, { useState } from 'react';
import { Button } from '@almadar/ui';

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
    <div className="border border-[var(--color-border)] rounded-lg p-4 bg-[var(--color-card)]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-1 text-xs font-medium rounded" style={{ backgroundColor: 'color-mix(in srgb, var(--color-info) 10%, transparent)', color: 'var(--color-info)' }}>
          Action {index + 1}
        </span>
        <span className="font-mono text-sm font-semibold text-[var(--color-foreground)]">
          {request.tool}
        </span>
      </div>

      {/* Description */}
      {request.description && (
        <div className="mb-4 p-3 border rounded" style={{ backgroundColor: 'color-mix(in srgb, var(--color-warning) 10%, transparent)', borderColor: 'color-mix(in srgb, var(--color-warning) 30%, transparent)' }}>
          <p className="text-sm whitespace-pre-wrap" style={{ color: 'var(--color-warning)' }}>
            {request.description}
          </p>
        </div>
      )}

      {/* Arguments */}
      <div className="mb-4">
        <label className="text-xs text-[var(--color-muted-foreground)] uppercase tracking-wide block mb-1">
          Arguments
        </label>
        {isEditing ? (
          <textarea
            value={editedArgs}
            onChange={(e) => handleArgsChange(e.target.value)}
            className="w-full h-32 font-mono text-xs bg-[var(--color-background)] border border-[var(--color-border)] rounded p-2 text-[var(--color-foreground)] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        ) : (
          <pre className="font-mono text-xs bg-[var(--color-background)] text-[var(--color-foreground)] p-3 rounded overflow-auto max-h-32">
            {JSON.stringify(request.args, null, 2)}
          </pre>
        )}
      </div>

      {/* Decision Buttons */}
      <div className="flex gap-2">
        {request.allowedDecisions.includes('approve') && (
          <button
            onClick={() => handleDecisionTypeChange('approve')}
            className="flex-1 px-4 py-2 rounded font-medium transition-colors"
            style={
              decision.type === 'approve'
                ? { backgroundColor: 'var(--color-success)', color: 'white' }
                : { backgroundColor: 'var(--color-secondary)', color: 'var(--color-foreground)' }
            }
          >
            Approve
          </button>
        )}
        {request.allowedDecisions.includes('edit') && (
          <button
            onClick={() => handleDecisionTypeChange('edit')}
            className="flex-1 px-4 py-2 rounded font-medium transition-colors"
            style={
              decision.type === 'edit'
                ? { backgroundColor: 'var(--color-warning)', color: 'white' }
                : { backgroundColor: 'var(--color-secondary)', color: 'var(--color-foreground)' }
            }
          >
            Edit
          </button>
        )}
        {request.allowedDecisions.includes('reject') && (
          <button
            onClick={() => handleDecisionTypeChange('reject')}
            className="flex-1 px-4 py-2 rounded font-medium transition-colors"
            style={
              decision.type === 'reject'
                ? { backgroundColor: 'var(--color-error)', color: 'white' }
                : { backgroundColor: 'var(--color-secondary)', color: 'var(--color-foreground)' }
            }
          >
            Reject
          </button>
        )}
      </div>
    </div>
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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 transition-opacity"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-[var(--color-card)] rounded-xl shadow-xl max-w-2xl w-full mx-auto transform transition-all">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[var(--color-border)]">
            <h2 className="text-xl font-bold text-[var(--color-foreground)]">
              Action Approval Required
            </h2>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
              The agent wants to perform the following action(s). Please review
              and decide how to proceed.
            </p>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-[60vh] overflow-y-auto bg-[var(--color-background)]/50">
            <div className="space-y-4">
              {interrupt.actionRequests.map((request, index) => (
                <ActionRequestCard
                  key={index}
                  request={request}
                  index={index}
                  decision={decisions[index]}
                  onDecisionChange={(d) => handleDecisionChange(index, d)}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-[var(--color-border)] flex flex-wrap justify-between gap-3">
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <div className="flex gap-3">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AgentInterruptDialog.displayName = 'AgentInterruptDialog';
export default AgentInterruptDialog;
