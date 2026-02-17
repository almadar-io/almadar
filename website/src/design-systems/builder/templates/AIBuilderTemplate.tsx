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
import { Button, Typography, ThemeToggle, useEventBus } from '@almadar/ui';
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
  ChevronDown,
  MessageSquare,
  ListTodo,
  GitCompare,
  Sparkles,
  ClipboardList,
  X,
  Leaf,
  Box,
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
    <div className={`flex h-screen bg-[var(--color-background)] overflow-hidden ${className || ''}`}>
      {/* Mobile Sidebar Overlay */}
      {isMobile && !sidebarCollapsed && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-[var(--color-overlay,rgba(0,0,0,0.5))] backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSidebarCollapsed(true)}
          />
          <div className="relative w-64 bg-[var(--color-card)] h-full shadow-xl animate-in slide-in-from-left duration-200">
            {sidebarSlot}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && sidebarSlot}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[var(--color-background)] transition-colors">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-2 sm:px-6 sm:py-3 border-b border-[var(--color-border)] bg-[var(--color-card)]/80 backdrop-blur-sm z-10 transition-all">
          <div className="flex items-center gap-3 overflow-hidden">
            {isMobile && (
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="p-2 -ml-2 rounded-lg text-[var(--color-muted-foreground)] hover:bg-[var(--color-surface)] touch-manipulation"
              >
                <Layers className="w-5 h-5" />
              </button>
            )}
            <div className="min-w-0">
              <Typography variant={isMobile ? 'body1' : 'h5'} className="text-[var(--color-foreground)] font-semibold truncate leading-tight">
                {currentAppId ? 'Builder' : 'Orbitals'}
              </Typography>
              {!isMobile && (
                <Typography variant="caption" color="muted">
                  {status === 'running' ? 'Building...' : 'AI Builder'}
                </Typography>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
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
                <div className="w-px h-6 bg-[var(--color-border)] mx-1" />
              </>
            )}

            {currentAppId && isMobile && (
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0" onClick={() => emit('UI:PREVIEW', { appId: currentAppId })}>
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}

            <div className="hidden sm:block"><ThemeToggle size="sm" /></div>

            {user && (
              <div className="relative ml-1 sm:ml-2">
                <button
                  className="flex items-center gap-2 p-1 sm:p-2 rounded-lg hover:bg-[var(--color-surface)] touch-manipulation"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-[var(--color-primary)]/10 flex items-center justify-center">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs font-medium text-[var(--color-primary)]">
                        {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-[var(--color-card)] rounded-lg shadow-[var(--shadow-lg)] border border-[var(--color-border)] py-1 z-50">
                      <div className="px-4 py-2 border-b border-[var(--color-border)]">
                        <p className="text-sm font-medium text-[var(--color-foreground)] truncate">{user.displayName || 'User'}</p>
                        <p className="text-xs text-[var(--color-muted-foreground)] truncate">{user.email}</p>
                      </div>
                      {isMobile && (
                        <div className="border-b border-[var(--color-border)] pb-1">
                          <div className="w-full flex items-center gap-2 px-4 py-2">
                            <ThemeToggle size="sm" />
                            <span className="text-sm text-[var(--color-foreground)]">Theme</span>
                          </div>
                        </div>
                      )}
                      <button
                        onClick={() => { setUserMenuOpen(false); emit('UI:SIGN_OUT', {}); }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-error)]"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Main Area */}
        <div className="flex-1 flex overflow-hidden relative">
          <div className="flex-1 flex flex-col overflow-hidden w-full">
            {showWelcome ? (
              <WelcomeBoard />
            ) : (
              <div className="flex-1 flex flex-col overflow-hidden w-full">
                {/* Tab Bar */}
                <div className="flex border-b border-[var(--color-border)] bg-[var(--color-surface)]/50 backdrop-blur-sm px-2 sm:px-4 overflow-x-auto no-scrollbar">
                  {hasTodos && (
                    <button
                      onClick={() => setActiveTab('todos')}
                      className={`flex items-center gap-2 px-3 sm:px-4 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                        activeTab === 'todos'
                          ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
                          : 'text-[var(--color-muted-foreground)] border-transparent hover:text-[var(--color-foreground)]'
                      }`}
                    >
                      <ListTodo className="w-4 h-4" />
                      Tasks ({completedTodos}/{todos.length})
                    </button>
                  )}
                  <button
                    onClick={() => setActiveTab('activity')}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                      activeTab === 'activity'
                        ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
                        : 'text-[var(--color-muted-foreground)] border-transparent hover:text-[var(--color-foreground)]'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Activity
                  </button>
                  {hasDiffs && (
                    <button
                      onClick={() => setActiveTab('changes')}
                      className={`flex items-center gap-2 px-3 sm:px-4 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                        activeTab === 'changes'
                          ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
                          : 'text-[var(--color-muted-foreground)] border-transparent hover:text-[var(--color-foreground)]'
                      }`}
                    >
                      <GitCompare className="w-4 h-4" />
                      Changes
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden" ref={activityScrollRef}>
                  {activeTab === 'activity' && (
                    <div className="h-full overflow-y-auto">
                      <div className="max-w-4xl mx-auto p-4 sm:p-6 pb-20">
                        {agentError && status === 'error' && (
                          <div className="mb-4 flex items-start gap-3 p-4 rounded-xl bg-[var(--color-error)]/5 border border-[var(--color-error)]/20 animate-in fade-in slide-in-from-top-2 duration-300">
                            <AlertCircle className="w-5 h-5 text-[var(--color-error)] flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <Typography variant="body2" className="text-[var(--color-error)] font-medium">Generation failed</Typography>
                              <Typography variant="caption" className="text-[var(--color-error)] mt-1 block opacity-80">{agentError}</Typography>
                            </div>
                            <button onClick={() => emit('UI:CLEAR_HISTORY', {})} className="p-1 rounded-lg hover:bg-[var(--color-error)]/10 text-[var(--color-error)]" title="Dismiss">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        <AgentStatusHeader status={status} threadId={threadId || undefined} onCancel={() => emit('UI:CANCEL', {})} />

                        <div className="mt-4">
                          <AgentActivityFeed activities={activities as never[]} className="space-y-4" />
                        </div>

                        {status === 'complete' && schemaSummary && (
                          <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <SchemaSummaryCard
                              schema={schemaSummary}
                              appId={currentAppId || undefined}
                              validated={schemaValidated}
                              onPreview={() => currentAppId && emit('UI:PREVIEW', { appId: currentAppId })}
                              onEdit={() => currentAppId && emit('UI:EDIT', { appId: currentAppId })}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === 'todos' && hasTodos && (
                    <div className="h-full overflow-y-auto p-4 sm:p-6 pb-20">
                      <TodoList todos={todos as never[]} showHeader={true} />
                    </div>
                  )}

                  {activeTab === 'changes' && hasDiffs && (
                    <div className="h-full overflow-y-auto p-4 sm:p-6 pb-20">
                      <SchemaDiffViewer diffs={schemaDiffs as never[]} title="Schema Changes" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className={`border-t border-[var(--color-border)] bg-[var(--color-card)]/95 backdrop-blur-lg transition-all duration-200 ${
              isMobile ? 'fixed bottom-0 left-0 right-0 z-20 pb-safe' : 'relative'
            }`}>
              <div className="max-w-4xl mx-auto p-3 sm:p-4">
                {/* Toggles */}
                {!currentAppId && !threadId && (
                  <div className="flex items-center justify-center gap-3 mb-3">
                    {/* Provider */}
                    <div className="inline-flex rounded-lg border border-[var(--color-border)] p-0.5 bg-[var(--color-surface)]">
                      {(['anthropic', 'openai', 'deepseek', 'kimi'] as const).map((p) => (
                        <button key={p} onClick={() => emit('UI:SET_PROVIDER', { provider: p })} disabled={isProcessing || isAnalyzing}
                          title={p === 'anthropic' ? 'Claude' : p === 'openai' ? 'GPT' : p === 'deepseek' ? 'DeepSeek' : 'Kimi'}
                          className={`px-2 py-1 rounded-md text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                            provider === p
                              ? 'bg-[var(--color-card)] text-[var(--color-primary)] shadow-sm'
                              : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
                          }`}>
                          {p === 'anthropic' ? <Brain className="w-3.5 h-3.5" /> : p === 'openai' ? <Sparkles className="w-3.5 h-3.5" /> : p === 'deepseek' ? <Cpu className="w-3.5 h-3.5" /> : <Box className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>

                    <div className="w-px h-4 bg-[var(--color-border)]" />

                    {/* Skill mode */}
                    <div className="inline-flex rounded-lg border border-[var(--color-border)] p-0.5 bg-[var(--color-surface)]">
                      <button onClick={() => emit('UI:SET_SKILL_MODE', { skillMode: 'standard' })} disabled={isProcessing || isAnalyzing} title="Standard (JSON)"
                        className={`px-2 py-1 rounded-md text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                          skillMode === 'standard' ? 'bg-[var(--color-card)] text-[var(--color-info)] shadow-sm' : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
                        }`}>
                        <Box className="w-3 h-3" />
                      </button>
                      <button onClick={() => emit('UI:SET_SKILL_MODE', { skillMode: 'lean' })} disabled={isProcessing || isAnalyzing} title="Lean (Domain Language)"
                        className={`px-2 py-1 rounded-md text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                          skillMode === 'lean' ? 'bg-[var(--color-card)] text-[var(--color-success)] shadow-sm' : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
                        }`}>
                        <Leaf className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Generation mode */}
                    <div className="inline-flex rounded-lg border border-[var(--color-border)] p-0.5 bg-[var(--color-surface)]">
                      <button onClick={() => emit('UI:SET_GENERATION_MODE', { generationMode: 'quick' })} disabled={isProcessing || isAnalyzing} title="Quick"
                        className={`px-2 py-1 rounded-md text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                          generationMode === 'quick' ? 'bg-[var(--color-card)] text-[var(--color-primary)] shadow-sm' : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
                        }`}>
                        <Zap className="w-3 h-3" />
                      </button>
                      <button onClick={() => emit('UI:SET_GENERATION_MODE', { generationMode: 'detailed' })} disabled={isProcessing || isAnalyzing} title="Detailed"
                        className={`px-2 py-1 rounded-md text-xs font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                          generationMode === 'detailed' ? 'bg-[var(--color-card)] text-[var(--color-primary)] shadow-sm' : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
                        }`}>
                        <ClipboardList className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex items-end gap-2 sm:gap-3">
                  <div className="flex-1 relative">
                    <textarea
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
                  </div>
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isProcessing || isAnalyzing}
                    className="h-[44px] w-[44px] sm:w-auto sm:px-6 rounded-xl flex-shrink-0"
                    leftIcon={(isProcessing || isAnalyzing) ? (
                      <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  >
                    {!isMobile && ((isProcessing || isAnalyzing) ? '' : 'Send')}
                  </Button>
                </div>
                {!isMobile && (
                  <Typography variant="caption" color="muted" className="mt-2 text-center block">
                    {isAnalyzing ? 'Analyzing your request...' : 'Press Enter to send'}
                  </Typography>
                )}
              </div>
            </div>
            {isMobile && <div className="h-[80px]" />}
          </div>
        </div>

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
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-[var(--color-overlay,rgba(0,0,0,0.5))] backdrop-blur-sm"
              onClick={() => emit('UI:QUESTIONS_SKIP', {})}
            />
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto m-4 bg-[var(--color-card)] rounded-2xl shadow-[var(--shadow-lg)]">
              <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-card)]/95 backdrop-blur-sm">
                <div>
                  <Typography variant="h4" className="text-[var(--color-foreground)]">Clarify Requirements</Typography>
                  <Typography variant="caption" color="muted">Answer questions to improve generation accuracy</Typography>
                </div>
                <button onClick={() => emit('UI:QUESTIONS_SKIP', {})} className="p-2 rounded-lg hover:bg-[var(--color-surface)] text-[var(--color-muted-foreground)]">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
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
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

AIBuilderTemplate.displayName = 'AIBuilderTemplate';
export default AIBuilderTemplate;
