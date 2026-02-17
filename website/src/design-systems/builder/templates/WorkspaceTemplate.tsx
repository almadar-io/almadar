/**
 * WorkspaceTemplate
 *
 * Page: Workspace | Entity: WorkspaceEntity | ViewType: ide
 * Events: UI:NAVIGATE_HOME, UI:NAVIGATE_BUILDER, UI:NAVIGATE_PREVIEW,
 *         UI:SAVE_FILE, UI:RECOMPILE, UI:TOGGLE_LEFT_PANEL, UI:TOGGLE_AGENT,
 *         UI:SELECT_FILE, UI:FILE_CONTENT_CHANGE
 *
 * IDE-like layout with file tree, code editor, and live preview.
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Typography, Button, Spinner, Badge, ThemeToggle, Alert, Toast, useEventBus } from '@almadar/ui';
import { WorkspaceLoader } from '../molecules';
import { FileTreePanel, CodeEditorPanel } from '../organisms';
import type { FileNode } from '../organisms';
import { AgentAvatar } from '../atoms/agent/AgentAvatar';
import {
  Home,
  ChevronRight,
  Play,
  Save,
  RefreshCw,
  GitBranch,
  FolderOpen,
  PanelLeftClose,
  PanelLeft,
  Loader2,
  CheckCircle,
  AlertCircle,
  FileJson,
} from 'lucide-react';

export type WebContainerStatus = 'idle' | 'booting' | 'ready' | 'running' | 'error';

export interface SelectedFile {
  path: string;
  content: string;
  language?: string;
  isDirty?: boolean;
}

export interface ToastMessage {
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

export interface WorkspaceEntity {
  appName: string;
  appId: string;
  containerStatus: WebContainerStatus;
  isContainerLoading: boolean;
  isCompiling: boolean;
  containerError: string | null;
  files: FileNode[];
  selectedPath: string | null;
  selectedFile: SelectedFile | null;
  previewUrl: string | null;
  isSaving: boolean;
  toast: ToastMessage | null;
  isLoading: boolean;
  loadError: string | null;
  showLoader: boolean;
}

export interface WorkspaceTemplateProps {
  entity: WorkspaceEntity;
  sidebarSlot?: React.ReactNode;
  className?: string;
}

export const WorkspaceTemplate: React.FC<WorkspaceTemplateProps> = ({
  entity,
  sidebarSlot,
  className,
}) => {
  const { emit } = useEventBus();
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [leftPanelWidth] = useState(280);
  const [previewWidth, setPreviewWidth] = useState(50);
  const [isDraggingDivider, setIsDraggingDivider] = useState(false);
  const [agentPanelOpen, setAgentPanelOpen] = useState(false);

  const {
    appName, appId, containerStatus, isContainerLoading, isCompiling,
    containerError, files, selectedPath, selectedFile, previewUrl,
    isSaving, toast, isLoading, loadError, showLoader,
  } = entity;

  const isBooting = containerStatus === 'booting' || containerStatus === 'idle';
  const hasUnsavedChanges = selectedFile?.isDirty || false;

  // Divider drag
  useEffect(() => {
    if (!isDraggingDivider) return;
    const handleMouseMove = (e: MouseEvent) => {
      const container = document.getElementById('workspace-content');
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const leftPx = leftPanelCollapsed ? 0 : leftPanelWidth;
      const agentPx = agentPanelOpen ? 400 : 0;
      const available = rect.width - leftPx - agentPx;
      const mouseX = e.clientX - rect.left - leftPx;
      const pct = Math.max(20, Math.min(80, (mouseX / available) * 100));
      setPreviewWidth(100 - pct);
    };
    const handleMouseUp = () => setIsDraggingDivider(false);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => { document.removeEventListener('mousemove', handleMouseMove); document.removeEventListener('mouseup', handleMouseUp); };
  }, [isDraggingDivider, leftPanelCollapsed, leftPanelWidth, agentPanelOpen]);

  const defaultExpanded = useMemo(() => ['/src', '/src/components', '/src/features'], []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center transition-colors">
        <div className="text-center">
          <Spinner size="lg" />
          <Typography variant="body2" className="mt-4 text-[var(--color-muted-foreground)]">Loading workspace...</Typography>
        </div>
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

  return (
    <div className={`flex h-screen bg-[var(--color-background)] ${className || ''}`}>
      {showLoader && (
        <WorkspaceLoader
          status={containerStatus}
          isLoading={isContainerLoading || isCompiling}
          error={containerError}
          appName={appName}
        />
      )}

      <div className="hidden lg:block">{sidebarSlot}</div>

      <div id="workspace-content" className="flex-1 flex flex-col overflow-hidden">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 px-4 py-2 bg-[var(--color-secondary)] border-b border-[var(--color-border)] text-sm">
          <button onClick={() => emit('UI:NAVIGATE_HOME', {})} className="flex items-center gap-1 text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors">
            <Home className="w-4 h-4" /><span className="hidden sm:inline">Home</span>
          </button>
          <ChevronRight className="w-4 h-4 text-[var(--color-muted-foreground)]" />
          <span className="text-[var(--color-foreground)] font-medium truncate">{appName}</span>
          <Badge variant="info" className="ml-2 text-xs">Workspace</Badge>
        </div>

        {/* Header */}
        <header className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-card)]">
          <div className="flex items-center gap-3">
            <button onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)} className="p-1.5 rounded hover:bg-[var(--color-secondary)] transition-colors" title={leftPanelCollapsed ? 'Show file tree' : 'Hide file tree'}>
              {leftPanelCollapsed ? <PanelLeft className="w-4 h-4 text-[var(--color-muted-foreground)]" /> : <PanelLeftClose className="w-4 h-4 text-[var(--color-muted-foreground)]" />}
            </button>
            <div className="flex items-center gap-2">
              <Typography variant="h6" className="text-[var(--color-foreground)]">{appName}</Typography>
              {isBooting && <Badge variant="warning" className="text-xs"><Loader2 className="w-3 h-3 mr-1 animate-spin" />Starting...</Badge>}
              {isCompiling && <Badge variant="info" className="text-xs"><Loader2 className="w-3 h-3 mr-1 animate-spin" />Compiling...</Badge>}
              {containerStatus === 'ready' && !isCompiling && <Badge variant="success" className="text-xs"><CheckCircle className="w-3 h-3 mr-1" />Ready</Badge>}
              {containerError && <Badge variant="danger" className="text-xs"><AlertCircle className="w-3 h-3 mr-1" />Error</Badge>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant={hasUnsavedChanges ? 'primary' : 'ghost'} size="sm" onClick={() => emit('UI:SAVE_FILE', {})} disabled={!hasUnsavedChanges || isSaving}
              leftIcon={isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}>Save</Button>
            <Button variant="ghost" size="sm" onClick={() => emit('UI:RECOMPILE', {})} leftIcon={<RefreshCw className="w-4 h-4" />}>Recompile</Button>
            <div className="w-px h-6 bg-[var(--color-border)]" />
            <Button variant="ghost" size="sm" onClick={() => emit('UI:NAVIGATE_BUILDER', { appId })} leftIcon={<GitBranch className="w-4 h-4" />}>Graph</Button>
            <Button variant="ghost" size="sm" onClick={() => emit('UI:NAVIGATE_PREVIEW', { appId })} leftIcon={<Play className="w-4 h-4" />}>Preview</Button>
            <div className="w-px h-6 bg-[var(--color-border)]" />
            <Button variant={agentPanelOpen ? 'secondary' : 'ghost'} size="sm" onClick={() => setAgentPanelOpen(!agentPanelOpen)}
              className={agentPanelOpen ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : ''}
              leftIcon={<div className="w-5 h-5 flex items-center justify-center"><AgentAvatar role="assistant" size="sm" /></div>}>
              <span className="hidden xl:inline ml-1 font-medium">Juohmaru</span>
            </Button>
            <ThemeToggle size="sm" />
          </div>
        </header>

        {/* Workspace Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* File Tree */}
          {!leftPanelCollapsed && (
            <div className="flex-shrink-0 border-r border-[var(--color-border)] bg-[var(--color-card)] flex flex-col" style={{ width: leftPanelWidth }}>
              <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-[var(--color-muted-foreground)]" />
                  <Typography variant="caption" className="text-[var(--color-muted-foreground)] uppercase tracking-wide">Files</Typography>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                {isContainerLoading ? (
                  <div className="flex items-center justify-center h-32"><Spinner size="sm" /></div>
                ) : (
                  <FileTreePanel files={files} selectedPath={selectedPath} onSelectFile={(path) => emit('UI:SELECT_FILE', { path })} defaultExpanded={defaultExpanded} showBadges={true} />
                )}
              </div>
            </div>
          )}

          {/* Editor */}
          <div className="flex-1 flex flex-col min-w-0 bg-[var(--color-background)]" style={{ width: `${100 - previewWidth}%` }}>
            {selectedFile ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                  <div className="flex items-center gap-2 px-3 py-1 bg-[var(--color-background)] rounded-t border-b-2 border-[var(--color-primary)]">
                    <FileJson className="w-4 h-4 text-[var(--color-muted-foreground)]" />
                    <Typography variant="caption" className="text-[var(--color-foreground)]">{selectedFile.path.split('/').pop()}</Typography>
                    {hasUnsavedChanges && <span className="w-2 h-2 rounded-full bg-[var(--color-warning)]" title="Unsaved changes" />}
                  </div>
                  <div className="flex-1" />
                  <Typography variant="caption" color="muted" className="text-xs">{selectedFile.language}</Typography>
                </div>
                <div className="flex-1">
                  <CodeEditorPanel path={selectedFile.path} content={selectedFile.content} language={selectedFile.language}
                    onChange={(content) => emit('UI:FILE_CONTENT_CHANGE', { content })} theme="vs-dark" showMinimap={false} />
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <FolderOpen className="w-12 h-12 text-[var(--color-muted-foreground)] mx-auto mb-3" />
                  <Typography variant="body2" color="muted">Select a file to edit</Typography>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          {!agentPanelOpen && (
            <div className={`w-1 cursor-col-resize bg-[var(--color-border)] hover:bg-[var(--color-primary)] transition-colors ${isDraggingDivider ? 'bg-[var(--color-primary)]' : ''}`}
              onMouseDown={() => setIsDraggingDivider(true)} />
          )}

          {/* Preview */}
          {!agentPanelOpen && (
            <div className="flex-shrink-0 flex flex-col bg-[var(--color-card)] border-l border-[var(--color-border)]" style={{ width: `${previewWidth}%` }}>
              <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-[var(--color-muted-foreground)]" />
                  <Typography variant="caption" className="text-[var(--color-muted-foreground)] uppercase tracking-wide">Preview</Typography>
                </div>
                {previewUrl && (
                  <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--color-primary)] hover:text-[var(--color-primary)]/80">Open in new tab</a>
                )}
              </div>
              <div className="flex-1 bg-[var(--color-card)]">
                {isBooting ? (
                  <div className="flex items-center justify-center h-full bg-[var(--color-surface)]">
                    <div className="text-center"><Spinner size="lg" /><Typography variant="body2" className="mt-4 text-[var(--color-muted-foreground)]">Starting preview server...</Typography></div>
                  </div>
                ) : previewUrl ? (
                  <iframe src={previewUrl} className="w-full h-full border-0" title="App Preview" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
                ) : (
                  <div className="flex items-center justify-center h-full bg-[var(--color-surface)]">
                    <div className="text-center">
                      <AlertCircle className="w-12 h-12 text-[var(--color-muted-foreground)] mx-auto mb-3" />
                      <Typography variant="body2" color="muted">Preview not available</Typography>
                      {containerError && <Typography variant="caption" className="text-[var(--color-error)] mt-2">{containerError}</Typography>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50">
          <Toast variant={toast.type === 'success' ? 'success' : toast.type === 'error' ? 'error' : 'info'}
            title={toast.title} message={toast.message} duration={3000} onDismiss={() => emit('UI:DISMISS_TOAST', {})} />
        </div>
      )}
    </div>
  );
};

WorkspaceTemplate.displayName = 'WorkspaceTemplate';
export default WorkspaceTemplate;
