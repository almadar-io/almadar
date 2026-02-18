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

import React, { useState, useEffect, useMemo } from 'react';
import {
  Typography,
  Button,
  Spinner,
  Badge,
  ThemeToggle,
  Alert,
  Toast,
  useEventBus,
  Box,
  HStack,
  VStack,
  Icon,
  Divider,
} from '@almadar/ui';
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
      <Box className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center transition-colors">
        <VStack align="center" gap="none" className="text-center">
          <Spinner size="lg" />
          <Typography variant="body2" className="mt-4 text-[var(--color-muted-foreground)]">Loading workspace...</Typography>
        </VStack>
      </Box>
    );
  }

  if (loadError) {
    return (
      <VStack align="center" justify="center" className="min-h-screen bg-[var(--color-surface)] p-6 transition-colors">
        <Alert variant="error" className="max-w-md">{loadError}</Alert>
        <Button className="mt-4" onClick={() => emit('UI:NAVIGATE_HOME', {})}>Back to Home</Button>
      </VStack>
    );
  }

  return (
    <HStack gap="none" className={`h-screen bg-[var(--color-background)] ${className || ''}`}>
      {showLoader && (
        <WorkspaceLoader
          status={containerStatus}
          isLoading={isContainerLoading || isCompiling}
          error={containerError}
          appName={appName}
        />
      )}

      <Box className="hidden lg:block">{sidebarSlot}</Box>

      <Box id="workspace-content" className="flex flex-col flex-1 overflow-hidden">
        {/* Breadcrumb */}
        <HStack gap="xs" align="center" className="px-4 py-2 bg-[var(--color-secondary)] border-b border-[var(--color-border)] text-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => emit('UI:NAVIGATE_HOME', {})}
            leftIcon={<Icon icon={Home} size="sm" />}
            className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors"
          >
            <Typography variant="caption" className="hidden sm:inline">Home</Typography>
          </Button>
          <Icon icon={ChevronRight} size="sm" className="text-[var(--color-muted-foreground)]" />
          <Typography variant="caption" className="text-[var(--color-foreground)] font-medium truncate">{appName}</Typography>
          <Badge variant="info" className="ml-2 text-xs">Workspace</Badge>
        </HStack>

        {/* Header */}
        <Box as="header" className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-card)]">
          <HStack gap="sm" align="center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
              className="p-1.5 rounded hover:bg-[var(--color-secondary)] transition-colors"
              title={leftPanelCollapsed ? 'Show file tree' : 'Hide file tree'}
            >
              {leftPanelCollapsed
                ? <Icon icon={PanelLeft} size="sm" className="text-[var(--color-muted-foreground)]" />
                : <Icon icon={PanelLeftClose} size="sm" className="text-[var(--color-muted-foreground)]" />}
            </Button>
            <HStack gap="sm" align="center">
              <Typography variant="h6" className="text-[var(--color-foreground)]">{appName}</Typography>
              {isBooting && <Badge variant="warning" className="text-xs"><Icon icon={Loader2} size="xs" animation="spin" className="mr-1" />Starting...</Badge>}
              {isCompiling && <Badge variant="info" className="text-xs"><Icon icon={Loader2} size="xs" animation="spin" className="mr-1" />Compiling...</Badge>}
              {containerStatus === 'ready' && !isCompiling && <Badge variant="success" className="text-xs"><Icon icon={CheckCircle} size="xs" className="mr-1" />Ready</Badge>}
              {containerError && <Badge variant="danger" className="text-xs"><Icon icon={AlertCircle} size="xs" className="mr-1" />Error</Badge>}
            </HStack>
          </HStack>
          <HStack gap="sm" align="center">
            <Button variant={hasUnsavedChanges ? 'primary' : 'ghost'} size="sm" onClick={() => emit('UI:SAVE_FILE', {})} disabled={!hasUnsavedChanges || isSaving}
              leftIcon={isSaving ? <Icon icon={Loader2} size="sm" animation="spin" /> : <Icon icon={Save} size="sm" />}>Save</Button>
            <Button variant="ghost" size="sm" onClick={() => emit('UI:RECOMPILE', {})} leftIcon={<Icon icon={RefreshCw} size="sm" />}>Recompile</Button>
            <Divider orientation="vertical" className="h-6" />
            <Button variant="ghost" size="sm" onClick={() => emit('UI:NAVIGATE_BUILDER', { appId })} leftIcon={<Icon icon={GitBranch} size="sm" />}>Graph</Button>
            <Button variant="ghost" size="sm" onClick={() => emit('UI:NAVIGATE_PREVIEW', { appId })} leftIcon={<Icon icon={Play} size="sm" />}>Preview</Button>
            <Divider orientation="vertical" className="h-6" />
            <Button variant={agentPanelOpen ? 'secondary' : 'ghost'} size="sm" onClick={() => setAgentPanelOpen(!agentPanelOpen)}
              className={agentPanelOpen ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : ''}
              leftIcon={<Box className="w-5 h-5 flex items-center justify-center"><AgentAvatar role="assistant" size="sm" /></Box>}>
              <Typography variant="caption" className="hidden xl:inline ml-1 font-medium">Juohmaru</Typography>
            </Button>
            <ThemeToggle size="sm" />
          </HStack>
        </Box>

        {/* Workspace Area */}
        <HStack gap="none" className="flex-1 overflow-hidden">
          {/* File Tree */}
          {!leftPanelCollapsed && (
            <VStack as="aside" gap="none" className="flex-shrink-0 border-r border-[var(--color-border)] bg-[var(--color-card)]" style={{ width: leftPanelWidth }}>
              <HStack justify="between" align="center" className="px-3 py-2 border-b border-[var(--color-border)]">
                <HStack gap="sm" align="center">
                  <Icon icon={FolderOpen} size="sm" className="text-[var(--color-muted-foreground)]" />
                  <Typography variant="caption" className="text-[var(--color-muted-foreground)] uppercase tracking-wide">Files</Typography>
                </HStack>
              </HStack>
              <Box className="flex-1 overflow-auto">
                {isContainerLoading ? (
                  <HStack justify="center" align="center" className="h-32"><Spinner size="sm" /></HStack>
                ) : (
                  <FileTreePanel files={files} selectedPath={selectedPath} onSelectFile={(path) => emit('UI:SELECT_FILE', { path })} defaultExpanded={defaultExpanded} showBadges={true} />
                )}
              </Box>
            </VStack>
          )}

          {/* Editor */}
          <VStack gap="none" className="flex-1 min-w-0 bg-[var(--color-background)]" style={{ width: `${100 - previewWidth}%` }}>
            {selectedFile ? (
              <>
                <HStack gap="sm" align="center" className="px-3 py-2 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                  <HStack gap="sm" align="center" className="px-3 py-1 bg-[var(--color-background)] rounded-t border-b-2 border-[var(--color-primary)]">
                    <Icon icon={FileJson} size="sm" className="text-[var(--color-muted-foreground)]" />
                    <Typography variant="caption" className="text-[var(--color-foreground)]">{selectedFile.path.split('/').pop()}</Typography>
                    {hasUnsavedChanges && <Box className="w-2 h-2 rounded-full bg-[var(--color-warning)]" title="Unsaved changes" />}
                  </HStack>
                  <Box className="flex-1" />
                  <Typography variant="caption" color="muted" className="text-xs">{selectedFile.language}</Typography>
                </HStack>
                <Box className="flex-1">
                  <CodeEditorPanel path={selectedFile.path} content={selectedFile.content} language={selectedFile.language}
                    onChange={(content) => emit('UI:FILE_CONTENT_CHANGE', { content })} theme="vs-dark" showMinimap={false} />
                </Box>
              </>
            ) : (
              <VStack justify="center" align="center" className="flex-1">
                <VStack align="center" gap="none" className="text-center">
                  <Icon icon={FolderOpen} size="xl" className="text-[var(--color-muted-foreground)] mx-auto mb-3" />
                  <Typography variant="body2" color="muted">Select a file to edit</Typography>
                </VStack>
              </VStack>
            )}
          </VStack>

          {/* Divider (drag handle) */}
          {!agentPanelOpen && (
            <Box
              className={`w-1 cursor-col-resize bg-[var(--color-border)] hover:bg-[var(--color-primary)] transition-colors ${isDraggingDivider ? 'bg-[var(--color-primary)]' : ''}`}
              onMouseDown={() => setIsDraggingDivider(true)}
            />
          )}

          {/* Preview */}
          {!agentPanelOpen && (
            <VStack gap="none" className="flex-shrink-0 bg-[var(--color-card)] border-l border-[var(--color-border)]" style={{ width: `${previewWidth}%` }}>
              <HStack justify="between" align="center" className="px-3 py-2 border-b border-[var(--color-border)]">
                <HStack gap="sm" align="center">
                  <Icon icon={Play} size="sm" className="text-[var(--color-muted-foreground)]" />
                  <Typography variant="caption" className="text-[var(--color-muted-foreground)] uppercase tracking-wide">Preview</Typography>
                </HStack>
                {previewUrl && (
                  <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--color-primary)] hover:text-[var(--color-primary)]/80">Open in new tab</a>
                )}
              </HStack>
              <Box className="flex-1 bg-[var(--color-card)]">
                {isBooting ? (
                  <VStack justify="center" align="center" className="h-full bg-[var(--color-surface)]">
                    <VStack align="center" gap="none" className="text-center">
                      <Spinner size="lg" />
                      <Typography variant="body2" className="mt-4 text-[var(--color-muted-foreground)]">Starting preview server...</Typography>
                    </VStack>
                  </VStack>
                ) : previewUrl ? (
                  <iframe src={previewUrl} className="w-full h-full border-0" title="App Preview" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
                ) : (
                  <VStack justify="center" align="center" className="h-full bg-[var(--color-surface)]">
                    <VStack align="center" gap="none" className="text-center">
                      <Icon icon={AlertCircle} size="xl" className="text-[var(--color-muted-foreground)] mx-auto mb-3" />
                      <Typography variant="body2" color="muted">Preview not available</Typography>
                      {containerError && <Typography variant="caption" className="text-[var(--color-error)] mt-2">{containerError}</Typography>}
                    </VStack>
                  </VStack>
                )}
              </Box>
            </VStack>
          )}
        </HStack>
      </Box>

      {/* Toast */}
      {toast && (
        <Box position="fixed" className="bottom-4 right-4 z-50">
          <Toast variant={toast.type === 'success' ? 'success' : toast.type === 'error' ? 'error' : 'info'}
            title={toast.title} message={toast.message} duration={3000} onDismiss={() => emit('UI:DISMISS_TOAST', {})} />
        </Box>
      )}
    </HStack>
  );
};

WorkspaceTemplate.displayName = 'WorkspaceTemplate';
export default WorkspaceTemplate;
