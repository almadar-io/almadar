/**
 * PreviewTemplate
 *
 * Page: Preview | Entity: PreviewEntity | ViewType: runtime
 * Events: UI:NAVIGATE_HOME, UI:NAVIGATE_BUILDER, UI:TOGGLE_INSPECT,
 *         UI:TOGGLE_OFFLINE, UI:SYNC, UI:TOGGLE_AGENT, UI:TOGGLE_VISUALIZER,
 *         UI:TOGGLE_FULLSCREEN, UI:RESET_STATE, UI:PAGE_SELECT
 *
 * Pure presentational template for the runtime preview chrome.
 * The actual OrbitalRuntime is passed as a slot prop.
 */

import React from 'react';
import { Typography, Button, Badge, ThemeToggle, Box, HStack, VStack, Spinner, Alert, Toast, useEventBus } from '@almadar/ui';
import { AgentAvatar } from '../atoms/agent/AgentAvatar';
import {
  Edit,
  Minimize2,
  Home,
  ChevronRight,
  Search,
  GitBranch,
  Database,
  Wifi,
  WifiOff,
  RefreshCw,
} from 'lucide-react';

export interface PreviewEntity {
  appName: string;
  appVersion: string | number;
  appId: string;
  currentStateName?: string | null;
  isExecutingEvent: boolean;
  isFullscreen: boolean;
  inspectMode: boolean;
  forceOffline: boolean;
  isOffline: boolean;
  pendingCount: number;
  isSyncing: boolean;
  showAgentPanel: boolean;
  showVisualizerModal: boolean;
  errorToast: { message: string } | null;
  isLoading: boolean;
  loadError: string | null;
}

export interface PreviewTemplateProps {
  entity: PreviewEntity;
  runtimeSlot?: React.ReactNode;
  notificationSlot?: React.ReactNode;
  agentSlot?: React.ReactNode;
  visualizerSlot?: React.ReactNode;
  sidebarSlot?: React.ReactNode;
  className?: string;
}

export const PreviewTemplate: React.FC<PreviewTemplateProps> = ({
  entity,
  runtimeSlot,
  notificationSlot,
  agentSlot,
  visualizerSlot,
  sidebarSlot,
  className,
}) => {
  const { emit } = useEventBus();
  const {
    appName, appVersion, appId, currentStateName, isExecutingEvent,
    isFullscreen, inspectMode, forceOffline, isOffline, pendingCount,
    isSyncing, showAgentPanel, errorToast, isLoading, loadError,
  } = entity;

  const effectivelyOffline = isOffline || forceOffline;

  if (isLoading) {
    return (
      <Box className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <Spinner size="lg" />
      </Box>
    );
  }

  if (loadError) {
    return (
      <VStack gap="md" align="center" justify="center" className="min-h-screen bg-[var(--color-background)] p-6">
        <Alert variant="error" className="max-w-md">{loadError}</Alert>
        <Button onClick={() => emit('UI:NAVIGATE_HOME', {})}>Back to Home</Button>
      </VStack>
    );
  }

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-[var(--color-background)] z-50">
        <div className="absolute top-4 right-4 z-40 flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => emit('UI:TOGGLE_FULLSCREEN', {})} leftIcon={<Minimize2 className="w-4 h-4" />}>
            Exit Fullscreen
          </Button>
        </div>
        <div className="h-full pt-14">{runtimeSlot}</div>
      </div>
    );
  }

  return (
    <HStack gap="none" className={`h-screen bg-[var(--color-background)] ${className || ''}`}>
      {/* Loading Overlay */}
      {isExecutingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <Box padding="lg" className="bg-[var(--color-card)] rounded-xl shadow-xl flex flex-col items-center">
            <Spinner size="lg" />
            <Typography variant="body2" className="mt-3 text-[var(--color-muted-foreground)]">Processing...</Typography>
          </Box>
        </div>
      )}

      {/* Error Toast */}
      {errorToast && (
        <div className="fixed top-4 right-4 z-50">
          <Toast variant="error" title="Error" message={errorToast.message} duration={5000} onDismiss={() => emit('UI:DISMISS_ERROR', {})} />
        </div>
      )}

      {/* Sidebar */}
      <div className="hidden lg:block">{sidebarSlot}</div>

      {/* Main */}
      <VStack flex gap="none" className="h-full overflow-hidden">
        {/* Breadcrumb */}
        <HStack gap="xs" align="center" className="px-4 py-2 bg-[var(--color-surface)] border-b border-[var(--color-border)] text-sm">
          <button onClick={() => emit('UI:NAVIGATE_HOME', {})} className="flex items-center gap-1 text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors">
            <Home className="w-4 h-4" /><span className="hidden sm:inline">Home</span>
          </button>
          <ChevronRight className="w-4 h-4 text-[var(--color-muted-foreground)]" />
          <button onClick={() => emit('UI:NAVIGATE_BUILDER', { appId })} className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors truncate max-w-[120px] sm:max-w-[200px]">
            {appName}
          </button>
          <ChevronRight className="w-4 h-4 text-[var(--color-muted-foreground)]" />
          <span className="text-[var(--color-foreground)] font-medium">Preview</span>
        </HStack>

        {/* Header */}
        <Box padding="sm" paddingX="md" border className="border-t-0 border-l-0 border-r-0 bg-[var(--color-card)]">
          <HStack justify="between" align="center">
            <HStack gap="sm" align="center" className="min-w-0">
              <Typography variant="h5" className="truncate">{appName}</Typography>
              <Badge variant="info" className="text-xs flex-shrink-0">v{appVersion}</Badge>
              {currentStateName && <Badge variant="success" className="hidden sm:flex text-xs flex-shrink-0">{currentStateName}</Badge>}
              <Badge variant="warning" className="hidden sm:flex items-center gap-1 text-xs flex-shrink-0">
                <Database className="w-3 h-3" />Mock Data
              </Badge>
            </HStack>

            <HStack gap="xs" align="center">
              <Button variant={effectivelyOffline ? 'secondary' : 'ghost'} size="sm"
                onClick={() => emit('UI:TOGGLE_OFFLINE', {})}
                className={effectivelyOffline ? 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]' : ''}
                leftIcon={effectivelyOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
                disabled={isOffline}
              >
                <span className="hidden xl:inline">{isOffline ? 'Offline' : forceOffline ? 'Test Offline' : 'Online'}</span>
              </Button>

              {pendingCount > 0 && <Badge variant="warning" className="hidden sm:flex items-center gap-1 text-xs flex-shrink-0">{pendingCount} pending</Badge>}

              {!isOffline && pendingCount > 0 && (
                <Button variant="ghost" size="sm" onClick={() => emit('UI:SYNC', {})}
                  leftIcon={<RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />} disabled={isSyncing}>
                  <span className="hidden xl:inline">Sync</span>
                </Button>
              )}

              <Box className="hidden sm:block w-px h-6 bg-[var(--color-border)]" />

              <Button variant="ghost" size="sm" onClick={() => emit('UI:TOGGLE_VISUALIZER', {})} leftIcon={<GitBranch className="w-4 h-4" />}>
                <span className="hidden xl:inline">Visualizer</span>
              </Button>

              <Button variant={showAgentPanel ? 'default' : 'ghost'} size="sm"
                onClick={() => emit('UI:TOGGLE_AGENT', {})}
                leftIcon={<div className="w-5 h-5 flex items-center justify-center"><AgentAvatar role="assistant" size="sm" /></div>}>
                <span className="hidden xl:inline ml-1 font-medium">Juohmaru</span>
              </Button>

              <Box className="hidden sm:block w-px h-6 bg-[var(--color-border)]" />

              <Button variant="secondary" size="sm" onClick={() => emit('UI:NAVIGATE_BUILDER', { appId })} leftIcon={<Edit className="w-4 h-4" />}>
                <span className="hidden sm:inline">Edit</span>
              </Button>

              <Box className="hidden sm:block w-px h-6 bg-[var(--color-border)]" />

              <Button variant={inspectMode ? 'default' : 'ghost'} size="sm"
                onClick={() => emit('UI:TOGGLE_INSPECT', {})} leftIcon={<Search className="w-4 h-4" />}>
                <span className="hidden xl:inline">Inspect</span>
              </Button>

              <Box className="hidden sm:block w-px h-6 bg-[var(--color-border)]" />

              <ThemeToggle size="sm" />
            </HStack>
          </HStack>
        </Box>

        {/* Runtime */}
        <main className="flex-1 overflow-hidden">{runtimeSlot}</main>
      </VStack>

      {notificationSlot}
      {agentSlot}
      {visualizerSlot}
    </HStack>
  );
};

PreviewTemplate.displayName = 'PreviewTemplate';
export default PreviewTemplate;
