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
import { Typography, Button, Spinner, ThemeToggle, Alert, useEventBus, Box, VStack, HStack, Icon, Badge } from '@almadar/ui';
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
      <Box className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center transition-colors">
        <Spinner size="lg" />
      </Box>
    );
  }

  if (loadError) {
    return (
      <VStack className="min-h-screen bg-[var(--color-surface)] items-center justify-center p-6 transition-colors">
        <Alert variant="error" className="max-w-md">{loadError}</Alert>
        <Button className="mt-4" onClick={() => emit('UI:NAVIGATE_HOME', {})}>Back to Home</Button>
      </VStack>
    );
  }

  const sections = [
    { id: 'schema', label: 'KFlow Schema', icon: <Icon icon={FileJson} size="md" />, active: false, event: 'UI:NAVIGATE_BUILDER' },
    { id: 'domain-logic', label: 'Domain Logic', icon: <Icon icon={FileCode} size="md" />, active: false, event: 'UI:NAVIGATE_BUILDER' },
    { id: 'validation', label: 'Validation', icon: <Icon icon={ShieldCheck} size="md" />, active: true, event: '' },
    { id: 'workspace', label: 'Workspace', icon: <Icon icon={FolderOpen} size="md" />, active: false, event: 'UI:NAVIGATE_WORKSPACE' },
    { id: 'preview', label: 'Preview', icon: <Icon icon={Play} size="md" />, active: false, event: 'UI:NAVIGATE_PREVIEW' },
  ];

  return (
    <HStack gap="none" className={`h-screen bg-[var(--color-background)] ${className || ''}`}>
      {/* App Sidebar */}
      <Box className="hidden lg:block">{sidebarSlot}</Box>

      {/* Section Sidebar */}
      <VStack
        as="aside"
        gap="none"
        className={`hidden md:flex transition-all duration-200 border-r border-[var(--color-border)] bg-[var(--color-background)] ${sectionSidebarCollapsed ? 'w-16' : 'w-56'}`}
      >
        <Box className="p-3 border-b border-[var(--color-border)]">
          {!sectionSidebarCollapsed && (
            <Typography variant="caption" className="text-[var(--color-muted-foreground)] uppercase tracking-wide">
              Sections
            </Typography>
          )}
        </Box>
        <Box as="nav" className="flex-1 p-2">
          {sections.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => item.event && emit(item.event, { appId })}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                item.active
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'text-[var(--color-muted-foreground)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-foreground)]'
              }`}
              title={sectionSidebarCollapsed ? item.label : undefined}
            >
              {item.icon}
              {!sectionSidebarCollapsed && (
                <Typography variant="body2">{item.label}</Typography>
              )}
            </Button>
          ))}
        </Box>
        <Box className="p-2 border-t border-[var(--color-border)]">
          <Button
            variant="ghost"
            onClick={() => setSectionSidebarCollapsed(!sectionSidebarCollapsed)}
            className="w-full flex items-center justify-center p-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] text-sm"
          >
            {sectionSidebarCollapsed ? '→' : '←'}
          </Button>
        </Box>
      </VStack>

      {/* Main Content */}
      <VStack gap="none" flex className="overflow-hidden bg-[var(--color-surface)] transition-colors">
        {/* Breadcrumb */}
        <HStack
          gap="xs"
          align="center"
          className="px-3 sm:px-6 py-2 bg-[var(--color-secondary)] border-b border-[var(--color-border)] text-sm"
        >
          <Button
            variant="ghost"
            onClick={() => emit('UI:NAVIGATE_HOME', {})}
            className="flex items-center gap-1 text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors"
          >
            <Icon icon={Home} size="sm" />
            <Typography variant="body2" className="hidden sm:inline">Home</Typography>
          </Button>
          <Icon icon={ChevronRight} size="sm" className="text-[var(--color-muted-foreground)]" />
          <Button
            variant="ghost"
            onClick={() => emit('UI:NAVIGATE_BUILDER', { appId })}
            className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors truncate max-w-[150px] sm:max-w-[250px]"
          >
            {appName}
          </Button>
          <Icon icon={ChevronRight} size="sm" className="text-[var(--color-muted-foreground)]" />
          <Typography variant="body2" className="text-[var(--color-foreground)] font-medium">Validation</Typography>
        </HStack>

        {/* Header */}
        <Box
          as="header"
          className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-[var(--color-border)] bg-[var(--color-card)]"
        >
          <HStack gap="sm" align="center" className="min-w-0">
            <Button variant="ghost" size="sm" onClick={() => emit('UI:NAVIGATE_BUILDER', { appId })}>
              <Icon icon={ArrowLeft} size="sm" className="mr-1" />Back
            </Button>
            <Box className="w-px h-6 bg-[var(--color-border)]" />
            <Typography variant="h5" className="text-[var(--color-foreground)] truncate text-base sm:text-lg">Schema Validation</Typography>
            {stage === 'complete' && (
              <Badge
                variant={isValid ? 'success' : 'warning'}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
              >
                {isValid ? (
                  <>
                    <Icon icon={CheckCircle2} size="xs" />
                    <Typography variant="caption">Valid</Typography>
                  </>
                ) : (
                  <>
                    <Icon icon={AlertTriangle} size="xs" />
                    <Typography variant="caption">{totalIssues} Issue{totalIssues !== 1 ? 's' : ''}</Typography>
                  </>
                )}
              </Badge>
            )}
          </HStack>
          <HStack gap="sm" align="center">
            <Button
              variant={agentPanelOpen ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setAgentPanelOpen(!agentPanelOpen)}
              leftIcon={agentPanelOpen ? <Icon icon={PanelRightClose} size="sm" /> : <Icon icon={PanelRightOpen} size="sm" />}
            >
              <Typography variant="body2" className="hidden sm:inline">Agent</Typography>
              {isAgentWorking && (
                <Box className="ml-1 w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse" />
              )}
            </Button>
            <ThemeToggle size="sm" />
          </HStack>
        </Box>

        {/* Content */}
        <HStack gap="none" flex className="overflow-hidden">
          <Box
            as="main"
            className={`flex-1 overflow-auto p-6 transition-all ${agentPanelOpen ? 'pr-0' : ''}`}
          >
            {validationError && <Alert variant="error" className="mb-6">{validationError}</Alert>}
            {(isValidating || isFixing) && !agentPanelOpen && (
              <Alert variant="info" className="mb-6">
                <HStack gap="sm" align="center">
                  <Spinner size="sm" />
                  <Typography variant="body2">{progressMessage || (isValidating ? 'Validating schema...' : 'Fixing errors...')}</Typography>
                </HStack>
              </Alert>
            )}
            <HStack justify="between" align="center" className="mb-6">
              <Typography variant="h4" className="text-[var(--color-foreground)]">Validation Results</Typography>
              <HStack gap="sm" align="center">
                <Button variant="secondary" onClick={() => emit('UI:VALIDATE', {})} disabled={isValidating || isAgentWorking}>
                  <Icon icon={RefreshCw} size="sm" className={`mr-2 ${isValidating ? 'animate-spin' : ''}`} />
                  {isValidating ? 'Validating...' : 'Revalidate'}
                </Button>
                {totalIssues > 0 && (
                  <Button
                    variant="primary"
                    onClick={() => { setAgentPanelOpen(true); setActiveTab('activity'); emit('UI:FIX_ALL', {}); }}
                    disabled={isValidating || isAgentWorking}
                  >
                    <Icon icon={Wrench} size="sm" className="mr-2" />
                    {isAgentWorking ? 'Fixing...' : `Fix All (${totalIssues})`}
                  </Button>
                )}
              </HStack>
            </HStack>
            <ValidationReportBoard errors={errors as ReportValidationError[]} warnings={warnings as ReportValidationError[]} onRerunValidation={() => emit('UI:VALIDATE', {})} isValidating={isValidating} />
          </Box>

          {/* Agent Panel */}
          {agentPanelOpen && (
            <VStack
              as="aside"
              gap="none"
              className="w-[400px] xl:w-[480px] border-l border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden"
            >
              <HStack
                justify="between"
                align="center"
                className="px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]"
              >
                <HStack gap="sm" align="center">
                  <Icon icon={Bot} size="md" className="text-[var(--color-primary)]" />
                  <Typography variant="h6" className="text-[var(--color-foreground)]">Fix Agent</Typography>
                  {isAgentWorking && (
                    <Badge
                      variant="primary"
                      className="px-2 py-0.5 text-xs font-medium rounded-full"
                    >
                      Working...
                    </Badge>
                  )}
                </HStack>
                <Button
                  variant="ghost"
                  onClick={() => setAgentPanelOpen(false)}
                  className="p-1.5 rounded hover:bg-[var(--color-secondary)] transition-colors"
                >
                  <Icon icon={XCircle} size="sm" className="text-[var(--color-muted-foreground)]" />
                </Button>
              </HStack>

              {(hasTodos || hasDiffs || (activities as unknown[]).length > 0) && (
                <HStack
                  gap="none"
                  className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
                >
                  {hasTodos && (
                    <Button
                      variant="ghost"
                      onClick={() => setActiveTab('todos')}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${activeTab === 'todos' ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'}`}
                    >
                      <Icon icon={ListTodo} size="xs" />
                      Tasks ({completedTodos}/{todos.length})
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => setActiveTab('activity')}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${activeTab === 'activity' ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'}`}
                  >
                    <Icon icon={MessageSquare} size="xs" />
                    Activity
                  </Button>
                  {hasDiffs && (
                    <Button
                      variant="ghost"
                      onClick={() => setActiveTab('changes')}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${activeTab === 'changes' ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'}`}
                    >
                      <Icon icon={GitCompare} size="xs" />
                      Changes ({(schemaDiffs as unknown[]).length})
                    </Button>
                  )}
                </HStack>
              )}

              <Box className="flex-1 overflow-y-auto">
                {activeTab === 'activity' && (
                  <Box className="p-4">
                    {(activities as unknown[]).length > 0 ? (
                      <AgentActivityFeed activities={activities as never[]} className="space-y-3" />
                    ) : (
                      <VStack align="center" className="py-12 text-center">
                        <Icon icon={Bot} size="xl" className="text-[var(--color-muted-foreground)] mb-3" />
                        <Typography variant="body2" color="muted">Click "Fix All" to start the agent</Typography>
                        <Typography variant="caption" color="muted" className="mt-1 max-w-[200px]">The agent will analyze and fix validation errors automatically</Typography>
                      </VStack>
                    )}
                  </Box>
                )}
                {activeTab === 'todos' && hasTodos && (
                  <Box className="p-4"><TodoList todos={todos as never[]} showHeader={false} /></Box>
                )}
                {activeTab === 'changes' && hasDiffs && (
                  <Box className="p-4"><SchemaDiffViewer diffs={schemaDiffs as never[]} title="Schema Changes" /></Box>
                )}
              </Box>

              {agentError && (
                <Box className="p-4 border-t border-[var(--color-error)]/20 bg-[var(--color-error)]/5">
                  <HStack gap="sm" align="start">
                    <Icon icon={XCircle} size="sm" className="text-[var(--color-error)] flex-shrink-0 mt-0.5" />
                    <Typography variant="caption" className="text-[var(--color-error)]">{agentError}</Typography>
                  </HStack>
                </Box>
              )}

              {isAgentWorking && (
                <Box className="p-4 border-t border-[var(--color-border)]">
                  <Button variant="secondary" size="sm" onClick={() => emit('UI:CANCEL_AGENT', {})} className="w-full">Cancel</Button>
                </Box>
              )}
            </VStack>
          )}
        </HStack>
      </VStack>
    </HStack>
  );
};

ValidationTemplate.displayName = 'ValidationTemplate';
export default ValidationTemplate;
