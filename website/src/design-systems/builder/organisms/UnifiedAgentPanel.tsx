/**
 * UnifiedAgentPanel Organism
 *
 * Agent chat panel with Juohmaru branding, skill mode toggle,
 * activity feed, todo list, and schema diff viewer.
 * Accepts agent state as props (hook-free).
 */

import React, { useRef, useState, useEffect } from 'react';
import {
  Button, Typography, Badge, Box, HStack, VStack, Textarea, Divider, Icon, Alert,
  Tabs, type TabItem,
} from '@almadar/ui';
import { AgentActivityFeed, TodoList, SchemaDiffViewer } from './agent';
import { AgentAvatar } from '../atoms/agent/AgentAvatar';
import {
  XCircle, MessageSquare, ListTodo, GitCompare,
  Loader2, Send, Sparkles, Leaf, Box as BoxIcon,
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

  if (!isOpen) return null;

  const tabItems: TabItem[] = [];
  if (hasTodos) {
    tabItems.push({
      id: 'todos',
      label: `Tasks (${completedTodos}/${todos.length})`,
      icon: ListTodo,
    });
  }
  tabItems.push({
    id: 'activity',
    label: 'Activity',
    icon: MessageSquare,
  });
  if (hasDiffs) {
    tabItems.push({
      id: 'changes',
      label: `Changes (${schemaDiffs.length})`,
      icon: GitCompare,
    });
  }

  return (
    <VStack as="aside" gap="none" className={`bg-[var(--color-card)] overflow-hidden w-full h-full ${className || ''}`}>
      {/* Header */}
      <HStack align="center" justify="between" className="px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <HStack gap="sm" align="center">
          <AgentAvatar role="assistant" size="sm" />
          <Typography variant="h6" className="text-[var(--color-foreground)] font-medium">Juohmaru</Typography>
          {isAgentWorking && (
            <Badge variant="info" className="animate-pulse text-xs">Working...</Badge>
          )}
          {headerSlot}
        </HStack>
        <HStack gap="xs" align="center">
          <HStack gap="none" className="rounded-md border border-[var(--color-border)] p-0.5 bg-[var(--color-secondary)]">
            <Button size="sm" variant={skillMode === 'standard' ? 'secondary' : 'ghost'}
              onClick={() => setSkillMode('standard')} disabled={isAgentWorking}
              className="px-2 py-1 text-xs" title="Standard mode - JSON output">
              <Icon icon={BoxIcon} size="xs" />
            </Button>
            <Button size="sm" variant={skillMode === 'lean' ? 'secondary' : 'ghost'}
              onClick={() => setSkillMode('lean')} disabled={isAgentWorking}
              className="px-2 py-1 text-xs" title="Lean mode - Domain Language">
              <Icon icon={Leaf} size="xs" />
            </Button>
          </HStack>
          <Button size="sm" variant="ghost" onClick={onClose} leftIcon={<Icon icon={XCircle} size="sm" />} />
        </HStack>
      </HStack>

      {/* Tab Bar */}
      {tabItems.length > 1 && (
        <Tabs
          tabs={tabItems}
          activeTab={activeTab}
          onTabChange={(id) => setActiveTab(id as 'activity' | 'todos' | 'changes')}
          className="bg-[var(--color-surface)]"
        />
      )}

      {/* Content */}
      <Box className="flex-1 overflow-y-auto">
        {activeTab === 'activity' && (
          <Box padding="md">
            {activities.length > 0 ? (
              <AgentActivityFeed activities={activities as unknown as import('./agent/AgentActivityFeed').ActivityItem[]} className="space-y-3" />
            ) : (
              <VStack align="center" justify="center" className="py-12 text-center">
                <Icon icon={Sparkles} size="xl" className="text-[var(--color-muted-foreground)] mb-3 opacity-40" />
                <Typography variant="body2" className="text-[var(--color-muted-foreground)]">Ask Juohmaru to help you</Typography>
                <Typography variant="caption" className="text-[var(--color-muted-foreground)] mt-1 max-w-[200px]">Describe changes to make, bugs to fix, or features to add</Typography>
              </VStack>
            )}
          </Box>
        )}
        {activeTab === 'todos' && hasTodos && (
          <Box padding="md"><TodoList todos={todos} showHeader={false} /></Box>
        )}
        {activeTab === 'changes' && hasDiffs && (
          <Box padding="md"><SchemaDiffViewer diffs={schemaDiffs} title="Schema Changes" /></Box>
        )}
      </Box>

      {/* Agent Error */}
      {agentError && (
        <Box padding="md" className="border-t border-[var(--color-error)]/20 bg-[var(--color-error)]/5">
          <Alert variant="error">{agentError}</Alert>
        </Box>
      )}

      {/* Chat Input */}
      <VStack gap="xs" className="border-t border-[var(--color-border)] p-3 bg-[var(--color-card)]">
        <HStack justify="center" gap="xs">
          <Typography variant="caption" className={skillMode === 'lean' ? 'text-[var(--color-success)]' : 'text-[var(--color-info)]'}>
            {skillMode === 'lean' ? 'Lean Mode' : 'Standard Mode'}
          </Typography>
          <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
            {skillMode === 'lean' ? '(Domain Language)' : '(JSON)'}
          </Typography>
        </HStack>
        <HStack gap="xs" align="end">
          <Textarea
            ref={agentInputRef} value={agentInput}
            onChange={(e) => setAgentInput(e.target.value)} onKeyDown={handleKeyPress}
            placeholder={skillDescription || (skillMode === 'lean' ? 'Ask Juohmaru (lean)...' : 'Ask Juohmaru...')}
            disabled={isAgentWorking} rows={1}
            className="flex-1 rounded-xl text-sm"
            style={{ minHeight: '36px', maxHeight: '100px', resize: 'none' }}
          />
          <Button size="sm" onClick={handleSend} disabled={!agentInput.trim() || isAgentWorking}
            className="h-9 px-3 rounded-lg">
            {isAgentWorking ? <Icon icon={Loader2} size="sm" animation="spin" /> : <Icon icon={Send} size="sm" />}
          </Button>
        </HStack>
      </VStack>

      {isAgentWorking && onCancel && (
        <Box padding="sm" paddingX="md" className="bg-[var(--color-card)]">
          <Button variant="secondary" size="sm" onClick={onCancel} className="w-full">Cancel</Button>
        </Box>
      )}
    </VStack>
  );
};

UnifiedAgentPanel.displayName = 'UnifiedAgentPanel';
export default UnifiedAgentPanel;
