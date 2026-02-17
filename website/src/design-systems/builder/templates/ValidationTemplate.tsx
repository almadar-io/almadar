/**
 * ValidationTemplate
 *
 * Page: Validation | Entity: ValidationEntity | ViewType: validation
 * Events: UI:NAVIGATE_HOME, UI:NAVIGATE_BUILDER, UI:NAVIGATE_WORKSPACE,
 *         UI:NAVIGATE_PREVIEW, UI:VALIDATE, UI:FIX_ALL, UI:TOGGLE_AGENT,
 *         UI:CANCEL_AGENT
 *
 * Validation page with section sidebar, validation results, and agent panel.
 */

import React, { useState } from 'react';
import { Typography, Button, Spinner, ThemeToggle, Alert, useEventBus } from '@almadar/ui';
import { AgentActivityFeed, TodoList, SchemaDiffViewer } from '../organisms/agent';
import { ValidationReportBoard, type ValidationError as ReportValidationError } from '../organisms';
import {
  Home,
  ChevronRight,
  ArrowLeft,
  RefreshCw,
  Wrench,
  PanelRightClose,
  PanelRightOpen,
  Bot,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  MessageSquare,
  ListTodo,
  GitCompare,
  FileJson,
  FileCode,
  ShieldCheck,
  FolderOpen,
  Play,
} from 'lucide-react';

export type ValidationStage = 'idle' | 'validating' | 'fixing' | 'complete' | 'error';

export interface ValidationError {
  code: string;
  message: string;
  severity?: 'error' | 'warning' | 'info';
  path?: string | string[];
  suggestion?: string;
  validValues?: string[];
  expectedShape?: string;
  fixGuidance?: string;
  llmContext?: { expectedType?: string; actualType?: string };
}

export interface ValidationEntity {
  appName: string;
  appId: string;
  stage: ValidationStage;
  isValidating: boolean;
  isFixing: boolean;
  progressMessage?: string | null;
  errors: ValidationError[];
  warnings: ValidationError[];
  isValid: boolean;
  validationError: string | null;
  agentStatus: string;
  activities: unknown[];
  todos: Array<{ id: string; status: string; task?: string; title?: string }>;
  schemaDiffs: unknown[];
  agentError: string | null;
  isLoading: boolean;
  loadError: string | null;
}

export interface ValidationTemplateProps {
  entity: ValidationEntity;
  sidebarSlot?: React.ReactNode;
  className?: string;
}

export const ValidationTemplate: React.FC<ValidationTemplateProps> = ({
  entity,
  sidebarSlot,
  className,
}) => {
  const { emit } = useEventBus();
  const [sectionSidebarCollapsed, setSectionSidebarCollapsed] = useState(false);
  const [agentPanelOpen, setAgentPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'activity' | 'todos' | 'changes'>('todos');

  const {
    appName, appId, stage, isValidating, isFixing, progressMessage,
    errors, warnings, isValid, validationError,
    agentStatus, activities, todos, schemaDiffs, agentError,
    isLoading, loadError,
  } = entity;

  const hasTodos = todos.length > 0;
  const hasDiffs = (schemaDiffs as unknown[]).length > 0;
  const completedTodos = todos.filter(t => t.status === 'completed').length;
  const isAgentWorking = agentStatus === 'running';
  const totalIssues = errors.length + warnings.length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center transition-colors">
        <Spinner size="lg" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex flex-col items-center justify-center p-6 transition-colors">
        <Alert variant="error" className="max-w-md">{loadError}</Alert>
        <Button className="mt-4" onClick={() => emit('UI:NAVIGATE_HOME', {})}>Back to Home</Button>
      </div>
    );
  }

  const sections = [
    { id: 'schema', label: 'KFlow Schema', icon: <FileJson className="w-5 h-5" />, active: false, event: 'UI:NAVIGATE_BUILDER' },
    { id: 'domain-logic', label: 'Domain Logic', icon: <FileCode className="w-5 h-5" />, active: false, event: 'UI:NAVIGATE_BUILDER' },
    { id: 'validation', label: 'Validation', icon: <ShieldCheck className="w-5 h-5" />, active: true, event: '' },
    { id: 'workspace', label: 'Workspace', icon: <FolderOpen className="w-5 h-5" />, active: false, event: 'UI:NAVIGATE_WORKSPACE' },
    { id: 'preview', label: 'Preview', icon: <Play className="w-5 h-5" />, active: false, event: 'UI:NAVIGATE_PREVIEW' },
  ];

  return (
    <div className={`flex h-screen bg-[var(--color-background)] ${className || ''}`}>
      {/* App Sidebar */}
      <div className="hidden lg:block">{sidebarSlot}</div>

      {/* Section Sidebar */}
      <aside className={`hidden md:flex flex-col transition-all duration-200 border-r border-[var(--color-border)] bg-[var(--color-background)] ${sectionSidebarCollapsed ? 'w-16' : 'w-56'}`}>
        <div className="p-3 border-b border-[var(--color-border)]">
          {!sectionSidebarCollapsed && <span className="text-[var(--color-muted-foreground)] uppercase tracking-wide text-xs">Sections</span>}
        </div>
        <nav className="flex-1 p-2">
          {sections.map((item) => (
            <button key={item.id}
              onClick={() => item.event && emit(item.event, { appId })}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                item.active
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-foreground)]'
              }`}
              title={sectionSidebarCollapsed ? item.label : undefined}
            >
              {item.icon}
              {!sectionSidebarCollapsed && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-2 border-t border-[var(--color-border)]">
          <button onClick={() => setSectionSidebarCollapsed(!sectionSidebarCollapsed)}
            className="w-full flex items-center justify-center p-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] text-sm">
            {sectionSidebarCollapsed ? '→' : '←'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[var(--color-surface)] transition-colors">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 px-3 sm:px-6 py-2 bg-[var(--color-secondary)] border-b border-[var(--color-border)] text-sm">
          <button onClick={() => emit('UI:NAVIGATE_HOME', {})} className="flex items-center gap-1 text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors">
            <Home className="w-4 h-4" /><span className="hidden sm:inline">Home</span>
          </button>
          <ChevronRight className="w-4 h-4 text-[var(--color-muted-foreground)]" />
          <button onClick={() => emit('UI:NAVIGATE_BUILDER', { appId })} className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors truncate max-w-[150px] sm:max-w-[250px]">
            {appName}
          </button>
          <ChevronRight className="w-4 h-4 text-[var(--color-muted-foreground)]" />
          <span className="text-[var(--color-foreground)] font-medium">Validation</span>
        </div>

        {/* Header */}
        <header className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-[var(--color-border)] bg-[var(--color-card)]">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Button variant="ghost" size="sm" onClick={() => emit('UI:NAVIGATE_BUILDER', { appId })}>
              <ArrowLeft className="w-4 h-4 mr-1" />Back
            </Button>
            <div className="w-px h-6 bg-[var(--color-border)]" />
            <Typography variant="h5" className="text-[var(--color-foreground)] truncate text-base sm:text-lg">Schema Validation</Typography>
            {stage === 'complete' && (
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                isValid ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' : 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]'
              }`}>
                {isValid ? <><CheckCircle2 className="w-3.5 h-3.5" /><span>Valid</span></> : <><AlertTriangle className="w-3.5 h-3.5" /><span>{totalIssues} Issue{totalIssues !== 1 ? 's' : ''}</span></>}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant={agentPanelOpen ? 'secondary' : 'ghost'} size="sm"
              onClick={() => setAgentPanelOpen(!agentPanelOpen)}
              leftIcon={agentPanelOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}>
              <span className="hidden sm:inline">Agent</span>
              {isAgentWorking && <span className="ml-1 w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse" />}
            </Button>
            <ThemeToggle size="sm" />
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          <main className={`flex-1 overflow-auto p-6 transition-all ${agentPanelOpen ? 'pr-0' : ''}`}>
            {validationError && <Alert variant="error" className="mb-6">{validationError}</Alert>}
            {(isValidating || isFixing) && !agentPanelOpen && (
              <Alert variant="info" className="mb-6">
                <div className="flex items-center gap-3"><Spinner size="sm" /><span>{progressMessage || (isValidating ? 'Validating schema...' : 'Fixing errors...')}</span></div>
              </Alert>
            )}
            <div className="flex items-center justify-between mb-6">
              <Typography variant="h4" className="text-[var(--color-foreground)]">Validation Results</Typography>
              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={() => emit('UI:VALIDATE', {})} disabled={isValidating || isAgentWorking}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${isValidating ? 'animate-spin' : ''}`} />
                  {isValidating ? 'Validating...' : 'Revalidate'}
                </Button>
                {totalIssues > 0 && (
                  <Button variant="primary" onClick={() => { setAgentPanelOpen(true); setActiveTab('activity'); emit('UI:FIX_ALL', {}); }} disabled={isValidating || isAgentWorking}>
                    <Wrench className="w-4 h-4 mr-2" />{isAgentWorking ? 'Fixing...' : `Fix All (${totalIssues})`}
                  </Button>
                )}
              </div>
            </div>
            <ValidationReportBoard errors={errors as ReportValidationError[]} warnings={warnings as ReportValidationError[]} onRerunValidation={() => emit('UI:VALIDATE', {})} isValidating={isValidating} />
          </main>

          {/* Agent Panel */}
          {agentPanelOpen && (
            <aside className="w-[400px] xl:w-[480px] border-l border-[var(--color-border)] bg-[var(--color-card)] flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-[var(--color-primary)]" />
                  <Typography variant="h6" className="text-[var(--color-foreground)]">Fix Agent</Typography>
                  {isAgentWorking && <span className="px-2 py-0.5 text-xs font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full">Working...</span>}
                </div>
                <button onClick={() => setAgentPanelOpen(false)} className="p-1.5 rounded hover:bg-[var(--color-secondary)] transition-colors">
                  <XCircle className="w-4 h-4 text-[var(--color-muted-foreground)]" />
                </button>
              </div>

              {(hasTodos || hasDiffs || (activities as unknown[]).length > 0) && (
                <div className="flex border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                  {hasTodos && (
                    <button onClick={() => setActiveTab('todos')} className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${activeTab === 'todos' ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'}`}>
                      <ListTodo className="w-3.5 h-3.5" />Tasks ({completedTodos}/{todos.length})
                    </button>
                  )}
                  <button onClick={() => setActiveTab('activity')} className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${activeTab === 'activity' ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'}`}>
                    <MessageSquare className="w-3.5 h-3.5" />Activity
                  </button>
                  {hasDiffs && (
                    <button onClick={() => setActiveTab('changes')} className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${activeTab === 'changes' ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'}`}>
                      <GitCompare className="w-3.5 h-3.5" />Changes ({(schemaDiffs as unknown[]).length})
                    </button>
                  )}
                </div>
              )}

              <div className="flex-1 overflow-y-auto">
                {activeTab === 'activity' && (
                  <div className="p-4">
                    {(activities as unknown[]).length > 0 ? (
                      <AgentActivityFeed activities={activities as never[]} className="space-y-3" />
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Bot className="w-12 h-12 text-[var(--color-muted-foreground)] mb-3" />
                        <Typography variant="body2" color="muted">Click "Fix All" to start the agent</Typography>
                        <Typography variant="caption" color="muted" className="mt-1 max-w-[200px]">The agent will analyze and fix validation errors automatically</Typography>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === 'todos' && hasTodos && (
                  <div className="p-4"><TodoList todos={todos as never[]} showHeader={false} /></div>
                )}
                {activeTab === 'changes' && hasDiffs && (
                  <div className="p-4"><SchemaDiffViewer diffs={schemaDiffs as never[]} title="Schema Changes" /></div>
                )}
              </div>

              {agentError && (
                <div className="p-4 border-t border-[var(--color-error)]/20 bg-[var(--color-error)]/5">
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-[var(--color-error)] flex-shrink-0 mt-0.5" />
                    <Typography variant="caption" className="text-[var(--color-error)]">{agentError}</Typography>
                  </div>
                </div>
              )}

              {isAgentWorking && (
                <div className="p-4 border-t border-[var(--color-border)]">
                  <Button variant="secondary" size="sm" onClick={() => emit('UI:CANCEL_AGENT', {})} className="w-full">Cancel</Button>
                </div>
              )}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

ValidationTemplate.displayName = 'ValidationTemplate';
export default ValidationTemplate;
