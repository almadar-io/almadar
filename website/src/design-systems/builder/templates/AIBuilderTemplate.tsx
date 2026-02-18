/**
 * AIBuilderTemplate
 *
 * Page: AIBuilder | Entity: AIBuilderEntity | ViewType: chat
 * Events: UI:SEND_MESSAGE, UI:CANCEL, UI:PREVIEW, UI:EDIT,
 *         UI:NEW_APP, UI:TOGGLE_JSON, UI:EXAMPLE_CLICK,
 *         UI:INTERRUPT_SUBMIT, UI:SET_PROVIDER, UI:SET_SKILL_MODE,
 *         UI:SET_GENERATION_MODE, UI:SIGN_OUT, UI:TOGGLE_SIDEBAR,
 *         UI:QUESTIONS_SUBMIT, UI:QUESTIONS_SKIP, UI:ANSWER_CHANGE
 *
 * Pure presentational template — receives all data via entity prop,
 * emits all user actions via useEventBus.
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Avatar,
  Button,
  Typography,
  ThemeToggle,
  useEventBus,
  Box,
  VStack,
  HStack,
  Icon,
  Divider,
  Textarea,
} from '@almadar/ui';
import { AgentInterruptDialog } from '../organisms/agent';
import { AgentStatusHeader, AgentActivityFeed, TodoList, SchemaDiffViewer } from '../organisms/agent';
import { AnalysisResultBoard } from '../organisms/agent';
import { WelcomeBoard } from '../organisms/WelcomeBoard';
import { SchemaSummaryCard, type SchemaSummary } from '../molecules/SchemaSummaryCard';
import { GraphJSONViewer } from '../molecules';
import { AgentAvatar } from '../atoms/agent/AgentAvatar';
import type { AvatarRole } from '../atoms/agent/AgentAvatar';
import {
  Send,
  AlertCircle,
  Layers,
  ExternalLink,
  LogOut,
  MessageSquare,
  ListTodo,
  GitCompare,
  Sparkles,
  ClipboardList,
  X,
  Leaf,
  Box as BoxIcon,
  Brain,
  Cpu,
  Zap,
} from 'lucide-react';

// ============ Types ============

export type AgentStatus = 'idle' | 'running' | 'complete' | 'error' | 'interrupted' | 'cancelled';
export type LLMProvider = 'anthropic' | 'openai' | 'deepseek' | 'kimi';
export type SkillMode = 'standard' | 'lean';
export type GenerationMode = 'quick' | 'detailed';

export interface Activity {
  type: 'message' | 'tool_call' | 'tool_result' | 'file_operation' | 'schema_diff' | 'error';
  role?: AvatarRole;
  content?: string;
  timestamp: number;
  isStreaming?: boolean;
}

export interface Todo {
  id: string;
  title?: string;
  text?: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface SchemaDiff {
  path: string;
  op: 'add' | 'remove' | 'replace';
  before?: unknown;
  after?: unknown;
}

export interface DeepAgentInterrupt {
  type: string;
  message?: string;
  actions?: Array<{ id: string; label: string; description?: string }>;
}

export interface AnalysisResult {
  globalRequirements: Record<string, unknown>;
  workItems: Array<{
    id: string;
    title: string;
    questions: Array<{
      id: string;
      text: string;
      impactsSchemaElement?: string;
      options?: string[];
    }>;
  }>;
}

export type WorkItemAnswers = Record<string, Record<string, string>>;

export interface UserInfo {
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
}

export interface AIBuilderEntity {
  status: AgentStatus;
  activities: Activity[];
  todos: Todo[];
  schemaDiffs: SchemaDiff[];
  schemaSummary: SchemaSummary | null;
  currentAppId: string | null;
  user: UserInfo | null;
  schemaValidated: boolean | null;
  agentError: string | null;
  threadId: string | null;
  isAnalyzing: boolean;
  analysisResult: AnalysisResult | null;
  questionAnswers: WorkItemAnswers;
  showQuestionsModal: boolean;
  showJSONViewer: boolean;
  graphData: unknown;
  graphLoading: boolean;
  graphError: string | null;
  provider: LLMProvider;
  skillMode: SkillMode;
  generationMode: GenerationMode;
  interrupt: DeepAgentInterrupt | null;
  sidebarSlot?: React.ReactNode;
}

export interface AIBuilderTemplateProps {
  entity: AIBuilderEntity;
  className?: string;
}

// ============ Template ============

export const AIBuilderTemplate: React.FC<AIBuilderTemplateProps> = ({ entity, className }) => {
  const { emit } = useEventBus();
  const [input, setInput] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'activity' | 'todos' | 'changes'>('activity');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const activityScrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const {
    status, activities, todos, schemaDiffs, schemaSummary, currentAppId,
    user, schemaValidated, agentError, threadId, isAnalyzing,
    analysisResult, questionAnswers, showQuestionsModal,
    showJSONViewer, graphData, graphLoading, graphError,
    provider, skillMode, generationMode, interrupt, sidebarSlot,
  } = entity;

  const isProcessing = status === 'running';
  const isInterrupted = status === 'interrupted';
  const showWelcome = status === 'idle' && activities.length === 0;
  const hasTodos = todos.length > 0;
  const hasDiffs = schemaDiffs.length > 0;
  const completedTodos = todos.filter(t => t.status === 'completed').length;

  // Auto-switch tabs
  useEffect(() => {
    if (hasTodos && activeTab === 'activity') setActiveTab('todos');
    else if (!hasTodos && activeTab === 'todos') setActiveTab('activity');
  }, [hasTodos]);

  // Auto-scroll activity
  useEffect(() => {
    if (activityScrollRef.current) {
      activityScrollRef.current.scrollTop = activityScrollRef.current.scrollHeight;
    }
  }, [activities]);

  // Focus input
  useEffect(() => { inputRef.current?.focus(); }, []);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => { setSidebarCollapsed(window.innerWidth < 768); }, []);

  const handleSend = useCallback(() => {
    if (!input.trim() || isProcessing || isAnalyzing) return;
    emit('UI:SEND_MESSAGE', { message: input.trim() });
    setInput('');
  }, [input, isProcessing, isAnalyzing, emit]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  return (
    <Box className={`flex h-screen bg-[var(--color-background)] overflow-hidden ${className || ''}`}>
      {/* Mobile Sidebar Overlay */}
      {isMobile && !sidebarCollapsed && (
        <Box className="fixed inset-0 z-50 flex">
          <Box
            className="absolute inset-0 bg-[var(--color-overlay,rgba(0,0,0,0.5))] backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSidebarCollapsed(true)}
          />
          <Box className="relative w-64 bg-[var(--color-card)] h-full shadow-xl animate-in slide-in-from-left duration-200">
            {sidebarSlot}
          </Box>
        </Box>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && sidebarSlot}

      {/* Main Content */}
      <VStack className="flex-1 min-w-0 bg-[var(--color-background)] transition-colors">
        {/* Header */}
        <Box
          as="header"
          className="flex items-center justify-between px-4 py-2 sm:px-6 sm:py-3 border-b border-[var(--color-border)] bg-[var(--color-card)]/80 backdrop-blur-sm z-10 transition-all"
        >
          <HStack className="items-center gap-3 overflow-hidden">
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(false)}
                className="p-2 -ml-2 rounded-lg text-[var(--color-muted-foreground)] hover:bg-[var(--color-surface)] touch-manipulation"
              >
                <Icon icon={Layers} size="md" />
              </Button>
            )}
            <VStack className="min-w-0">
              <Typography variant={isMobile ? 'body1' : 'h5'} className="text-[var(--color-foreground)] font-semibold truncate leading-tight">
                {currentAppId ? 'Builder' : 'Orbitals'}
              </Typography>
              {!isMobile && (
                <Typography variant="caption" color="muted">
                  {status === 'running' ? 'Building...' : 'AI Builder'}
                </Typography>
              )}
            </VStack>
          </HStack>

          <HStack className="items-center gap-2 flex-shrink-0">
            {currentAppId && !isMobile && (
              <>
                <Button variant="ghost" size="sm" onClick={() => emit('UI:PREVIEW', { appId: currentAppId })} leftIcon={<ExternalLink className="w-4 h-4" />}>
                  Preview
                </Button>
                <Button variant="ghost" size="sm" onClick={() => emit('UI:EDIT', { appId: currentAppId })}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => emit('UI:TOGGLE_JSON', {})}>
                  JSON
                </Button>
                <Box className="w-px h-6 bg-[var(--color-border)] mx-1" />
              </>
            )}

            {currentAppId && isMobile && (
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0" onClick={() => emit('UI:PREVIEW', { appId: currentAppId })}>
                <Icon icon={ExternalLink} size="sm" />
              </Button>
            )}

            <Box className="hidden sm:block"><ThemeToggle size="sm" /></Box>

            {user && (
              <Box className="relative ml-1 sm:ml-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 p-1 sm:p-2 rounded-lg hover:bg-[var(--color-surface)] touch-manipulation"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <Box className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-[var(--color-primary)]/10 flex items-center justify-center">
                    {user.photoURL ? (
                      <Avatar src={user.photoURL} alt="User" name={user.displayName || user.email || 'U'} size="sm" />
                    ) : (
                      <Typography variant="caption" className="text-xs font-medium text-[var(--color-primary)]">
                        {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                      </Typography>
                    )}
                  </Box>
                </Button>

                {userMenuOpen && (
                  <>
                    <Box className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <Box className="absolute right-0 top-full mt-2 w-48 bg-[var(--color-card)] rounded-lg shadow-[var(--shadow-lg)] border border-[var(--color-border)] py-1 z-50">
                      <Box className="px-4 py-2 border-b border-[var(--color-border)]">
                        <Typography variant="body2" className="text-sm font-medium text-[var(--color-foreground)] truncate">{user.displayName || 'User'}</Typography>
                        <Typography variant="caption" className="text-xs text-[var(--color-muted-foreground)] truncate">{user.email}</Typography>
                      </Box>
                      {isMobile && (
                        <Box className="border-b border-[var(--color-border)] pb-1">
                          <HStack className="w-full items-center gap-2 px-4 py-2">
                            <ThemeToggle size="sm" />
                            <Typography variant="body2" className="text-sm text-[var(--color-foreground)]">Theme</Typography>
                          </HStack>
                        </Box>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => { setUserMenuOpen(false); emit('UI:SIGN_OUT', {}); }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-error)]"
                        leftIcon={<Icon icon={LogOut} size="sm" />}
                      >
                        Sign out
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            )}
          </HStack>
        </Box>

        {/* Main Area */}
        <Box className="flex-1 flex overflow-hidden relative">
          <VStack className="flex-1 overflow-hidden w-full">
            {showWelcome ? (
              <WelcomeBoard />
            ) : (
              <VStack className="flex-1 overflow-hidden w-full">
                {/* Tab Bar */}
                <HStack className="border-b border-[var(--color-border)] bg-[var(--color-surface)]/50 backdrop-blur-sm px-2 sm:px-4 overflow-x-auto no-scrollbar">
                  {hasTodos && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveTab('todos')}
                      className={`flex items-center gap-2 px-3 sm:px-4 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                        activeTab === 'todos'
                          ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
                          : 'text-[var(--color-muted-foreground)] border-transparent hover:text-[var(--color-foreground)]'
                      }`}
                    >
                      <Icon icon={ListTodo} size="sm" />
                      Tasks ({completedTodos}/{todos.length})
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab('activity')}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                      activeTab === 'activity'
                        ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
                        : 'text-[var(--color-muted-foreground)] border-transparent hover:text-[var(--color-foreground)]'
                    }`}
                  >
                    <Icon icon={MessageSquare} size="sm" />
                    Activity
                  </Button>
                  {hasDiffs && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveTab('changes')}
                      className={`flex items-center gap-2 px-3 sm:px-4 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                        activeTab === 'changes'
                          ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
                          : 'text-[var(--color-muted-foreground)] border-transparent hover:text-[var(--color-foreground)]'
                      }`}
                    >
                      <Icon icon={GitCompare} size="sm" />
                      Changes
                    </Button>
                  )}
                </HStack>

                {/* Content */}
                <Box className="flex-1 overflow-hidden" ref={activityScrollRef as React.RefObject<HTMLDivElement>}>
                  {activeTab === 'activity' && (
                    <Box className="h-full overflow-y-auto">
                      <Box className="max-w-4xl mx-auto p-4 sm:p-6 pb-20">
                        {agentError && status === 'error' && (
                          <HStack className="mb-4 items-start gap-3 p-4 rounded-xl bg-[var(--color-error)]/5 border border-[var(--color-error)]/20 animate-in fade-in slide-in-from-top-2 duration-300">
                            <Icon icon={AlertCircle} size="md" className="text-[var(--color-error)] flex-shrink-0 mt-0.5" />
                            <Box className="flex-1 min-w-0">
                              <Typography variant="body2" className="text-[var(--color-error)] font-medium">Generation failed</Typography>
                              <Typography variant="caption" className="text-[var(--color-error)] mt-1 block opacity-80">{agentError}</Typography>
                            </Box>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => emit('UI:CLEAR_HISTORY', {})}
                              className="p-1 rounded-lg hover:bg-[var(--color-error)]/10 text-[var(--color-error)]"
                              title="Dismiss"
                            >
                              <Icon icon={X} size="sm" />
                            </Button>
                          </HStack>
                        )}

                        <AgentStatusHeader status={status} threadId={threadId || undefined} onCancel={() => emit('UI:CANCEL', {})} />

                        <Box className="mt-4">
                          <AgentActivityFeed activities={activities as never[]} className="space-y-4" />
                        </Box>

                        {status === 'complete' && schemaSummary && (
                          <Box className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <SchemaSummaryCard
                              schema={schemaSummary}
                              appId={currentAppId || undefined}
                              validated={schemaValidated}
                              onPreview={() => currentAppId && emit('UI:PREVIEW', { appId: currentAppId })}
                              onEdit={() => currentAppId && emit('UI:EDIT', { appId: currentAppId })}
                            />
                          </Box>
                        )}
                      </Box>
                    </Box>
                  )}

                  {activeTab === 'todos' && hasTodos && (
                    <Box className="h-full overflow-y-auto p-4 sm:p-6 pb-20">
                      <TodoList todos={todos as never[]} showHeader={true} />
                    </Box>
                  )}

                  {activeTab === 'changes' && hasDiffs && (
                    <Box className="h-full overflow-y-auto p-4 sm:p-6 pb-20">
                      <SchemaDiffViewer diffs={schemaDiffs as never[]} title="Schema Changes" />
                    </Box>
                  )}
                </Box>
              </VStack>
            )}

            {/* Input Area */}
            <Box className={`border-t border-[var(--color-border)] bg-[var(--color-card)]/95 backdrop-blur-lg transition-all duration-200 ${
              isMobile ? 'fixed bottom-0 left-0 right-0 z-20 pb-safe' : 'relative'
            }`}>
              <Box className="max-w-4xl mx-auto p-3 sm:p-4">
                {/* Toggles */}
                {!currentAppId && !threadId && (
                  <HStack className="items-center justify-center gap-3 mb-3">
                    {/* Provider */}
                    <HStack className="inline-flex rounded-lg border border-[var(--color-border)] p-0.5 bg-[var(--color-surface)]">
                      {(['anthropic', 'openai', 'deepseek', 'kimi'] as const).map((p) => (
                        <Button key={p} variant="ghost" size="sm" onClick={() => emit('UI:SET_PROVIDER', { provider: p })} disabled={isProcessing || isAnalyzing}
                          title={p === 'anthropic' ? 'Claude' : p === 'openai' ? 'GPT' : p === 'deepseek' ? 'DeepSeek' : 'Kimi'}
                          className={`px-2 py-1 rounded-md text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                            provider === p
                              ? 'bg-[var(--color-card)] text-[var(--color-primary)] shadow-sm'
                              : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
                          }`}>
                          {p === 'anthropic' ? <Icon icon={Brain} size="xs" /> : p === 'openai' ? <Icon icon={Sparkles} size="xs" /> : p === 'deepseek' ? <Icon icon={Cpu} size="xs" /> : <Icon icon={BoxIcon} size="xs" />}
                        </Button>
                      ))}
                    </HStack>

                    <Box className="w-px h-4 bg-[var(--color-border)]" />

                    {/* Skill mode */}
                    <HStack className="inline-flex rounded-lg border border-[var(--color-border)] p-0.5 bg-[var(--color-surface)]">
                      <Button variant="ghost" size="sm" onClick={() => emit('UI:SET_SKILL_MODE', { skillMode: 'standard' })} disabled={isProcessing || isAnalyzing} title="Standard (JSON)"
                        className={`px-2 py-1 rounded-md text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                          skillMode === 'standard' ? 'bg-[var(--color-card)] text-[var(--color-info)] shadow-sm' : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
                        }`}>
                        <Icon icon={BoxIcon} className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => emit('UI:SET_SKILL_MODE', { skillMode: 'lean' })} disabled={isProcessing || isAnalyzing} title="Lean (Domain Language)"
                        className={`px-2 py-1 rounded-md text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                          skillMode === 'lean' ? 'bg-[var(--color-card)] text-[var(--color-success)] shadow-sm' : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
                        }`}>
                        <Icon icon={Leaf} className="w-3 h-3" />
                      </Button>
                    </HStack>

                    {/* Generation mode */}
                    <HStack className="inline-flex rounded-lg border border-[var(--color-border)] p-0.5 bg-[var(--color-surface)]">
                      <Button variant="ghost" size="sm" onClick={() => emit('UI:SET_GENERATION_MODE', { generationMode: 'quick' })} disabled={isProcessing || isAnalyzing} title="Quick"
                        className={`px-2 py-1 rounded-md text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                          generationMode === 'quick' ? 'bg-[var(--color-card)] text-[var(--color-primary)] shadow-sm' : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
                        }`}>
                        <Icon icon={Zap} className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => emit('UI:SET_GENERATION_MODE', { generationMode: 'detailed' })} disabled={isProcessing || isAnalyzing} title="Detailed"
                        className={`px-2 py-1 rounded-md text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                          generationMode === 'detailed' ? 'bg-[var(--color-card)] text-[var(--color-primary)] shadow-sm' : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
                        }`}>
                        <Icon icon={ClipboardList} className="w-3 h-3" />
                      </Button>
                    </HStack>
                  </HStack>
                )}

                <HStack className="items-end gap-2 sm:gap-3">
                  <Box className="flex-1 relative">
                    <Textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder={
                        currentAppId
                          ? 'Describe changes...'
                          : generationMode === 'detailed'
                            ? "Describe your app... (you'll answer questions next)"
                            : 'Describe your app idea...'
                      }
                      disabled={isProcessing || isAnalyzing}
                      rows={1}
                      className="w-full px-3 py-3 sm:px-4 sm:py-3 pr-10 sm:pr-12 rounded-xl border border-[var(--color-border)]
                        bg-[var(--color-input,var(--color-surface))] text-base sm:text-sm text-[var(--color-foreground)]
                        placeholder-[var(--color-muted-foreground)]
                        focus:ring-2 focus:ring-[var(--color-ring,var(--color-primary))] focus:border-[var(--color-ring,var(--color-primary))]
                        disabled:opacity-50
                        resize-none transition-all"
                      style={{ minHeight: '44px', maxHeight: '120px' }}
                    />
                  </Box>
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isProcessing || isAnalyzing}
                    className="h-[44px] w-[44px] sm:w-auto sm:px-6 rounded-xl flex-shrink-0"
                    leftIcon={(isProcessing || isAnalyzing) ? (
                      <Icon icon={Send} size="sm" animation="spin" />
                    ) : (
                      <Icon icon={Send} size="sm" />
                    )}
                  >
                    {!isMobile && ((isProcessing || isAnalyzing) ? '' : 'Send')}
                  </Button>
                </HStack>
                {!isMobile && (
                  <Typography variant="caption" color="muted" className="mt-2 text-center block">
                    {isAnalyzing ? 'Analyzing your request...' : 'Press Enter to send'}
                  </Typography>
                )}
              </Box>
            </Box>
            {isMobile && <Box className="h-[80px]" />}
          </VStack>
        </Box>

        {/* JSON Viewer Modal */}
        {currentAppId && (
          <GraphJSONViewer
            data={graphData}
            isOpen={showJSONViewer}
            onClose={() => emit('UI:TOGGLE_JSON', {})}
            isLoading={graphLoading}
            error={graphError}
          />
        )}

        {/* Interrupt Dialog */}
        {isInterrupted && interrupt && (
          <AgentInterruptDialog
            interrupt={interrupt as never}
            onSubmit={(decisions: unknown) => emit('UI:INTERRUPT_SUBMIT', { decisions })}
            onCancel={() => emit('UI:CANCEL', {})}
          />
        )}

        {/* Questions Modal */}
        {showQuestionsModal && analysisResult && (
          <Box className="fixed inset-0 z-50 flex items-center justify-center">
            <Box
              className="absolute inset-0 bg-[var(--color-overlay,rgba(0,0,0,0.5))] backdrop-blur-sm"
              onClick={() => emit('UI:QUESTIONS_SKIP', {})}
            />
            <Box className="relative w-full max-w-4xl max-h-[90vh] overflow-auto m-4 bg-[var(--color-card)] rounded-2xl shadow-[var(--shadow-lg)]">
              <HStack className="sticky top-0 z-10 items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-card)]/95 backdrop-blur-sm">
                <VStack>
                  <Typography variant="h4" className="text-[var(--color-foreground)]">Clarify Requirements</Typography>
                  <Typography variant="caption" color="muted">Answer questions to improve generation accuracy</Typography>
                </VStack>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => emit('UI:QUESTIONS_SKIP', {})}
                  className="p-2 rounded-lg hover:bg-[var(--color-surface)] text-[var(--color-muted-foreground)]"
                >
                  <Icon icon={X} size="md" />
                </Button>
              </HStack>
              <Box className="p-6">
                <AnalysisResultBoard
                  analysis={analysisResult as never}
                  answers={questionAnswers}
                  onAnswerChange={(workItemId: string, questionId: string, value: string) =>
                    emit('UI:ANSWER_CHANGE', { workItemId, questionId, value })
                  }
                  canSubmit={true}
                  onSubmit={() => emit('UI:QUESTIONS_SUBMIT', {})}
                  isSubmitting={isProcessing}
                  onCancel={() => emit('UI:QUESTIONS_SKIP', {})}
                />
              </Box>
            </Box>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

AIBuilderTemplate.displayName = 'AIBuilderTemplate';
export default AIBuilderTemplate;
