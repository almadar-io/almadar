/**
 * UnifiedAgentPanel Organism
 *
 * Agent chat panel with Juohmaru branding, skill mode toggle,
 * activity feed, todo list, and schema diff viewer.
 * Accepts agent state as props (hook-free).
 */

import React, { useRef, useState, useEffect } from 'react';
import { Button, Typography } from '@almadar/ui';
import { AgentActivityFeed, TodoList, SchemaDiffViewer } from './agent';
import { AgentAvatar } from '../atoms/agent/AgentAvatar';
import {
  XCircle, MessageSquare, ListTodo, GitCompare,
  Loader2, Send, Sparkles, Leaf, Box,
} from 'lucide-react';

// =============================================================================
// Types
// =============================================================================

/** Skill mode — standard uses JSON, lean uses Domain Language */
export type SkillMode = 'standard' | 'lean';

export type AgentStatus = 'idle' | 'running' | 'complete' | 'error';

export interface AgentActivity {
  id: string;
  type: string;
  message: string;
  timestamp: number;
  [key: string]: unknown;
}

export interface AgentTodo {
  id: string;
  text: string;
  status: 'pending' | 'in_progress' | 'completed';
  [key: string]: unknown;
}

export interface SchemaDiff {
  id: string;
  [key: string]: unknown;
}

export interface UnifiedAgentPanelProps {
  isOpen: boolean;
  onClose: () => void;
  /** Agent status */
  agentStatus: AgentStatus;
  /** Activity feed items */
  activities: AgentActivity[];
  /** Todo list items */
  todos: AgentTodo[];
  /** Schema diff items */
  schemaDiffs: SchemaDiff[];
  /** Agent error message */
  agentError?: string | null;
  /** Whether there's an active thread */
  hasThread?: boolean;
  /** Send a message to the agent */
  onSendMessage: (message: string, skillMode: SkillMode) => void;
  /** Cancel the current agent run */
  onCancel?: () => void;
  /** Description for placeholder text */
  skillDescription?: string;
  /** Optional slot for custom header content */
  headerSlot?: React.ReactNode;
  /** Initial input to populate the chat with */
  initialInput?: string;
  className?: string;
}

// =============================================================================
// Component
// =============================================================================

export const UnifiedAgentPanel: React.FC<UnifiedAgentPanelProps> = ({
  isOpen, onClose, agentStatus, activities, todos, schemaDiffs,
  agentError, onSendMessage, onCancel, skillDescription,
  headerSlot, initialInput, className,
}) => {
  const [activeTab, setActiveTab] = useState<'activity' | 'todos' | 'changes'>('activity');
  const [agentInput, setAgentInput] = useState('');
  const [skillMode, setSkillMode] = useState<SkillMode>('standard');
  const agentInputRef = useRef<HTMLTextAreaElement>(null);

  const isAgentWorking = agentStatus === 'running';
  const hasTodos = todos.length > 0;
  const hasDiffs = schemaDiffs.length > 0;
  const completedTodos = todos.filter(t => t.status === 'completed').length;

  useEffect(() => {
    if (isOpen && initialInput) {
      setAgentInput(initialInput);
      setTimeout(() => agentInputRef.current?.focus(), 100);
    }
  }, [isOpen, initialInput]);

  useEffect(() => {
    if (!isOpen) return;
    if (hasTodos && activeTab === 'activity' && activities.length > 0) setActiveTab('todos');
    else if (!hasTodos && activeTab === 'todos') setActiveTab('activity');
    else if (hasDiffs && activeTab !== 'changes' && !hasTodos) setActiveTab('changes');
  }, [hasDiffs, hasTodos, isOpen]);

  const handleSend = () => {
    if (!agentInput.trim() || isAgentWorking) return;
    const message = agentInput.trim();
    setAgentInput('');
    onSendMessage(message, skillMode);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <aside className={`bg-[var(--color-card)] flex flex-col overflow-hidden transition-all duration-300 ease-in-out w-full h-full ${isOpen ? 'opacity-100' : 'opacity-0'} ${className || ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="flex items-center gap-3">
          <AgentAvatar role="assistant" size="sm" />
          <Typography variant="h6" className="text-[var(--color-foreground)] font-medium">Juohmaru</Typography>
          {isAgentWorking && (
            <span className="px-2 py-0.5 text-xs font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 rounded-full animate-pulse">Working...</span>
          )}
          {headerSlot}
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-md border border-[var(--color-border)] p-0.5 bg-[var(--color-secondary)]">
            <button onClick={() => setSkillMode('standard')} disabled={isAgentWorking} title="Standard mode - JSON output"
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all ${skillMode === 'standard' ? 'bg-[var(--color-secondary-hover)] text-[var(--color-info)]' : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'} disabled:opacity-50 disabled:cursor-not-allowed`}>
              <Box className="w-3 h-3" />
            </button>
            <button onClick={() => setSkillMode('lean')} disabled={isAgentWorking} title="Lean mode - Domain Language"
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all ${skillMode === 'lean' ? 'bg-[var(--color-secondary-hover)] text-[var(--color-success)]' : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'} disabled:opacity-50 disabled:cursor-not-allowed`}>
              <Leaf className="w-3 h-3" />
            </button>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--color-surface)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors">
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tab Bar */}
      {(hasTodos || hasDiffs || activities.length > 0) && (
        <div className="flex border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          {hasTodos && (
            <button onClick={() => setActiveTab('todos')}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${activeTab === 'todos' ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'}`}>
              <ListTodo className="w-3.5 h-3.5" /> Tasks ({completedTodos}/{todos.length})
            </button>
          )}
          <button onClick={() => setActiveTab('activity')}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${activeTab === 'activity' ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'}`}>
            <MessageSquare className="w-3.5 h-3.5" /> Activity
          </button>
          {hasDiffs && (
            <button onClick={() => setActiveTab('changes')}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${activeTab === 'changes' ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'}`}>
              <GitCompare className="w-3.5 h-3.5" /> Changes ({schemaDiffs.length})
            </button>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'activity' && (
          <div className="p-4">
            {activities.length > 0 ? (
              <AgentActivityFeed activities={activities as unknown as import('./agent/AgentActivityFeed').ActivityItem[]} className="space-y-3" />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Sparkles className="w-12 h-12 text-[var(--color-muted-foreground)] mb-3 opacity-40" />
                <Typography variant="body2" className="text-[var(--color-muted-foreground)]">Ask Juohmaru to help you</Typography>
                <Typography variant="caption" className="text-[var(--color-muted-foreground)] mt-1 max-w-[200px]">Describe changes to make, bugs to fix, or features to add</Typography>
              </div>
            )}
          </div>
        )}
        {activeTab === 'todos' && hasTodos && (
          <div className="p-4"><TodoList todos={todos} showHeader={false} /></div>
        )}
        {activeTab === 'changes' && hasDiffs && (
          <div className="p-4"><SchemaDiffViewer diffs={schemaDiffs} title="Schema Changes" /></div>
        )}
      </div>

      {/* Agent Error */}
      {agentError && (
        <div className="p-4 border-t border-[var(--color-error)]/20 bg-[var(--color-error)]/5">
          <div className="flex items-start gap-2">
            <XCircle className="w-4 h-4 text-[var(--color-error)] flex-shrink-0 mt-0.5" />
            <Typography variant="caption" className="text-[var(--color-error)]">{agentError}</Typography>
          </div>
        </div>
      )}

      {/* Chat Input */}
      <div className="border-t border-[var(--color-border)] p-3 bg-[var(--color-card)]">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className={`text-xs ${skillMode === 'lean' ? 'text-[var(--color-success)]' : 'text-[var(--color-info)]'}`}>
            {skillMode === 'lean' ? 'Lean Mode' : 'Standard Mode'}
          </span>
          <span className="text-xs text-[var(--color-muted-foreground)]">{skillMode === 'lean' ? '(Domain Language)' : '(JSON)'}</span>
        </div>
        <div className="flex items-end gap-2">
          <textarea
            ref={agentInputRef} value={agentInput}
            onChange={(e) => setAgentInput(e.target.value)} onKeyDown={handleKeyPress}
            placeholder={skillDescription || (skillMode === 'lean' ? 'Ask Juohmaru (lean)...' : 'Ask Juohmaru...')}
            disabled={isAgentWorking} rows={1}
            className="flex-1 px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-input,var(--color-secondary))] text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] focus:ring-2 focus:ring-[var(--color-ring,var(--color-primary))]/50 focus:border-[var(--color-ring,var(--color-primary))] disabled:opacity-50 resize-none text-sm transition-all"
            style={{ minHeight: '36px', maxHeight: '100px' }}
          />
          <Button size="sm" onClick={handleSend} disabled={!agentInput.trim() || isAgentWorking}
            className={`h-9 px-3 rounded-lg transition-all duration-300 ${!agentInput.trim() || isAgentWorking ? 'bg-[var(--color-secondary)] text-[var(--color-muted-foreground)]' : 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:opacity-90'}`}>
            {isAgentWorking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {isAgentWorking && onCancel && (
        <div className="px-3 pb-3 bg-[var(--color-card)]">
          <Button variant="secondary" size="sm" onClick={onCancel} className="w-full">Cancel</Button>
        </div>
      )}
    </aside>
  );
};

UnifiedAgentPanel.displayName = 'UnifiedAgentPanel';
export default UnifiedAgentPanel;
