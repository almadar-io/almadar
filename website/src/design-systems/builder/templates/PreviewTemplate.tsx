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
import { Typography, Button, Badge, ThemeToggle, Box, HStack, VStack, Spinner, Alert, Toast, Icon, Divider, useEventBus } from '@almadar/ui';
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
      <Box className="fixed inset-0 bg-[var(--color-background)] z-50">
        <HStack gap="xs" className="absolute top-4 right-4 z-40">
          <Button size="sm" variant="ghost" onClick={() => emit('UI:TOGGLE_FULLSCREEN', {})} leftIcon={<Icon icon={Minimize2} size="sm" />}>
            Exit Fullscreen
          </Button>
        </HStack>
        <Box className="h-full pt-14">{runtimeSlot}</Box>
      </Box>
    );
  }

  return (
    <HStack gap="none" className={`h-screen bg-[var(--color-background)] ${className || ''}`}>
      {/* Loading Overlay */}
      {isExecutingEvent && (
        <Box className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <VStack align="center" className="bg-[var(--color-card)] rounded-xl shadow-xl p-6">
            <Spinner size="lg" />
            <Typography variant="body2" className="mt-3 text-[var(--color-muted-foreground)]">Processing...</Typography>
          </VStack>
        </Box>
      )}

      {/* Error Toast */}
      {errorToast && (
        <Box className="fixed top-4 right-4 z-50">
          <Toast variant="error" title="Error" message={errorToast.message} duration={5000} onDismiss={() => emit('UI:DISMISS_ERROR', {})} />
        </Box>
      )}

      {/* Sidebar */}
      <Box className="hidden lg:block">{sidebarSlot}</Box>

      {/* Main */}
      <VStack flex gap="none" className="h-full overflow-hidden">
        {/* Breadcrumb */}
        <HStack gap="xs" align="center" className="px-4 py-2 bg-[var(--color-surface)] border-b border-[var(--color-border)] text-sm">
          <Button variant="ghost" size="sm" onClick={() => emit('UI:NAVIGATE_HOME', {})} leftIcon={<Icon icon={Home} size="sm" />}>
            <Typography variant="caption" className="hidden sm:inline">Home</Typography>
          </Button>
          <Icon icon={ChevronRight} size="sm" className="text-[var(--color-muted-foreground)]" />
          <Button variant="ghost" size="sm" onClick={() => emit('UI:NAVIGATE_BUILDER', { appId })} className="truncate max-w-[120px] sm:max-w-[200px]">
            <Typography variant="caption">{appName}</Typography>
          </Button>
          <Icon icon={ChevronRight} size="sm" className="text-[var(--color-muted-foreground)]" />
          <Typography variant="caption" className="text-[var(--color-foreground)] font-medium">Preview</Typography>
        </HStack>

        {/* Header */}
        <Box padding="sm" paddingX="md" border className="border-t-0 border-l-0 border-r-0 bg-[var(--color-card)]">
          <HStack justify="between" align="center">
            <HStack gap="sm" align="center" className="min-w-0">
              <Typography variant="h5" className="truncate">{appName}</Typography>
              <Badge variant="info" className="text-xs flex-shrink-0">v{appVersion}</Badge>
              {currentStateName && <Badge variant="success" className="hidden sm:flex text-xs flex-shrink-0">{currentStateName}</Badge>}
              <Badge variant="warning" className="hidden sm:flex items-center gap-1 text-xs flex-shrink-0">
                <Icon icon={Database} size="xs" />
                <Typography variant="caption">Mock Data</Typography>
              </Badge>
            </HStack>

            <HStack gap="xs" align="center">
              <Button variant={effectivelyOffline ? 'secondary' : 'ghost'} size="sm"
                onClick={() => emit('UI:TOGGLE_OFFLINE', {})}
                className={effectivelyOffline ? 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]' : ''}
                leftIcon={<Icon icon={effectivelyOffline ? WifiOff : Wifi} size="sm" />}
                disabled={isOffline}
              >
                <Typography variant="caption" className="hidden xl:inline">
                  {isOffline ? 'Offline' : forceOffline ? 'Test Offline' : 'Online'}
                </Typography>
              </Button>

              {pendingCount > 0 && (
                <Badge variant="warning" className="hidden sm:flex items-center gap-1 text-xs flex-shrink-0">
                  {pendingCount} pending
                </Badge>
              )}

              {!isOffline && pendingCount > 0 && (
                <Button variant="ghost" size="sm" onClick={() => emit('UI:SYNC', {})}
                  leftIcon={<Icon icon={RefreshCw} size="sm" className={isSyncing ? 'animate-spin' : ''} />} disabled={isSyncing}>
                  <Typography variant="caption" className="hidden xl:inline">Sync</Typography>
                </Button>
              )}

              <Divider orientation="vertical" className="hidden sm:block h-6" />

              <Button variant="ghost" size="sm" onClick={() => emit('UI:TOGGLE_VISUALIZER', {})} leftIcon={<Icon icon={GitBranch} size="sm" />}>
                <Typography variant="caption" className="hidden xl:inline">Visualizer</Typography>
              </Button>

              <Button variant={showAgentPanel ? 'default' : 'ghost'} size="sm"
                onClick={() => emit('UI:TOGGLE_AGENT', {})}
                leftIcon={<Box className="w-5 h-5 flex items-center justify-center"><AgentAvatar role="assistant" size="sm" /></Box>}>
                <Typography variant="caption" className="hidden xl:inline ml-1 font-medium">Juohmaru</Typography>
              </Button>

              <Divider orientation="vertical" className="hidden sm:block h-6" />

              <Button variant="secondary" size="sm" onClick={() => emit('UI:NAVIGATE_BUILDER', { appId })} leftIcon={<Icon icon={Edit} size="sm" />}>
                <Typography variant="caption" className="hidden sm:inline">Edit</Typography>
              </Button>

              <Divider orientation="vertical" className="hidden sm:block h-6" />

              <Button variant={inspectMode ? 'default' : 'ghost'} size="sm"
                onClick={() => emit('UI:TOGGLE_INSPECT', {})} leftIcon={<Icon icon={Search} size="sm" />}>
                <Typography variant="caption" className="hidden xl:inline">Inspect</Typography>
              </Button>

              <Divider orientation="vertical" className="hidden sm:block h-6" />

              <ThemeToggle size="sm" />
            </HStack>
          </HStack>
        </Box>

        {/* Runtime */}
        <Box as="main" className="flex-1 overflow-hidden">{runtimeSlot}</Box>
      </VStack>

      {notificationSlot}
      {agentSlot}
      {visualizerSlot}
    </HStack>
  );
};

PreviewTemplate.displayName = 'PreviewTemplate';
export default PreviewTemplate;
