/**
 * StudioSidebar Organism
 *
 * ChatGPT-style sidebar for navigating between builder apps.
 * Composed entirely from @almadar/ui atoms: Box, VStack, HStack, Button, etc.
 *
 * Events Emitted:
 * - UI:APP_SELECT { appId }
 * - UI:APP_NEW
 * - UI:APP_DELETE { appId }
 * - UI:APP_RENAME { appId, name }
 * - UI:APP_CREATE { name, description }
 * - UI:APP_PREVIEW { appId }
 * - UI:NAV_STATS
 */

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Plus,
  MoreHorizontal,
  Trash2,
  Edit,
  Play,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Layers,
  AlertTriangle,
} from 'lucide-react';
import {
  Box,
  VStack,
  HStack,
  Button,
  Icon,
  Typography,
  Avatar,
  Badge,
  Divider,
  LoadingState,
  useEventBus,
} from '@almadar/ui';

// =============================================================================
// Types
// =============================================================================

export interface AppSummary {
  id: string;
  name?: string;
  updatedAt: number;
  hasValidationErrors?: boolean;
}

export interface StudioSidebarProps {
  apps: AppSummary[];
  currentAppId?: string;
  isLoading?: boolean;
  error?: string | null;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  hideNewAppButton?: boolean;
  className?: string;
}

// =============================================================================
// Helpers
// =============================================================================

function formatTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// =============================================================================
// Main Component
// =============================================================================

export const StudioSidebar: React.FC<StudioSidebarProps> = ({
  apps,
  currentAppId,
  isLoading = false,
  error,
  collapsed = false,
  onCollapsedChange,
  hideNewAppButton = false,
  className = '',
}) => {
  const { emit } = useEventBus();
  const [hoveredAppId, setHoveredAppId] = useState<string | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);

  const handleAppClick = (appId: string) => emit('UI:APP_SELECT', { appId });
  const handleNewApp = () => emit('UI:APP_NEW', {});

  const handleDelete = (e: React.MouseEvent, appId: string) => {
    e.stopPropagation();
    emit('UI:APP_DELETE', { appId });
    setMenuOpenId(null);
    setMenuPosition(null);
  };

  const handleRename = (e: React.MouseEvent, app: AppSummary) => {
    e.stopPropagation();
    emit('UI:APP_RENAME', { appId: app.id, name: app.name || '' });
    setMenuOpenId(null);
    setMenuPosition(null);
  };

  const handlePreview = (e: React.MouseEvent, appId: string) => {
    e.stopPropagation();
    emit('UI:APP_PREVIEW', { appId });
    setMenuOpenId(null);
    setMenuPosition(null);
  };

  const closeMenu = () => {
    setMenuOpenId(null);
    setMenuPosition(null);
  };

  // Close menu on click-outside or Escape
  useEffect(() => {
    if (!menuOpenId) return;
    const handleClickOutside = () => closeMenu();
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu(); };
    // Delay listener to avoid catching the same click that opened the menu
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpenId]);

  // =========================================================================
  // Collapsed view
  // =========================================================================
  if (collapsed) {
    return (
      <Box
        border
        fullHeight
        bg="surface"
        className={`w-16 border-t-0 border-b-0 border-l-0 z-20 relative ${className}`}
      >
        <VStack gap="sm" align="center" className="h-full py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCollapsedChange?.(false)}
            title="Expand sidebar"
          >
            <Icon icon={ChevronRight} size="sm" />
          </Button>

          {!hideNewAppButton && (
            <Button variant="ghost" size="sm" onClick={handleNewApp} title="New App">
              <Icon icon={Plus} size="sm" />
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => emit('UI:NAV_STATS', {})}
            title="Statistics"
          >
            <Icon icon={BarChart3} size="sm" />
          </Button>

          <Box className="flex-1" />

          <VStack gap="xs" align="center">
            {apps.slice(0, 5).map((app) => (
              <Avatar
                key={app.id}
                name={app.name || 'Untitled'}
                size="sm"
                className={`cursor-pointer ${
                  app.id === currentAppId
                    ? 'ring-2 ring-[var(--color-primary)]'
                    : ''
                }`}
                onClick={() => handleAppClick(app.id)}
              />
            ))}
          </VStack>
        </VStack>
      </Box>
    );
  }

  // =========================================================================
  // Expanded view
  // =========================================================================
  return (
    <Box
      border
      fullHeight
      bg="surface"
      className={`w-64 border-t-0 border-b-0 border-l-0 z-20 relative flex flex-col ${className}`}
    >
      {/* Header */}
      <Box padding="md" border className="border-t-0 border-l-0 border-r-0">
        <HStack justify="between" align="center">
          <Typography variant="body2" className="font-semibold">Orbitals</Typography>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCollapsedChange?.(true)}
            title="Collapse sidebar"
          >
            <Icon icon={ChevronLeft} size="sm" />
          </Button>
        </HStack>

        {!hideNewAppButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNewApp}
            leftIcon={<Plus className="w-4 h-4" />}
            className="w-full mt-3 justify-start"
          >
            New App
          </Button>
        )}
      </Box>

      {/* App List */}
      <VStack flex gap="none" className="overflow-y-auto py-2 px-2">
        {isLoading ? (
          <Box padding="lg" className="flex items-center justify-center">
            <LoadingState message="" />
          </Box>
        ) : error ? (
          <Box padding="lg" className="text-center">
            <Typography variant="caption" className="text-[var(--color-error)]">
              {error}
            </Typography>
          </Box>
        ) : apps.length === 0 ? (
          <VStack gap="sm" align="center" className="py-12">
            <Icon icon={Layers} size="lg" className="text-[var(--color-muted-foreground)] opacity-40" />
            <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
              No apps yet
            </Typography>
          </VStack>
        ) : (
          <VStack gap="xs">
            {apps.map((app, index) => {
              const isSelected = app.id === currentAppId;
              const isHovered = hoveredAppId === app.id;
              const isMenuOpen = menuOpenId === app.id;
              const isLastItems = index > apps.length - 4;

              return (
                <Box
                  key={app.id}
                  rounded="md"
                  className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[var(--color-secondary)]'
                      : 'hover:bg-[var(--color-secondary)]/50'
                  }`}
                  onClick={() => handleAppClick(app.id)}
                  onMouseEnter={() => setHoveredAppId(app.id)}
                  onMouseLeave={() => {
                    setHoveredAppId(null);
                  }}
                >
                  <Avatar
                    name={app.name || 'Untitled'}
                    size="sm"
                    className={isSelected ? 'ring-2 ring-[var(--color-primary)] ring-offset-1 ring-offset-[var(--color-card)]' : ''}
                  />

                  <VStack gap="none" flex className="min-w-0">
                    <HStack gap="xs" align="center">
                      <Typography
                        variant="body2"
                        className={`truncate font-medium ${
                          isSelected
                            ? 'text-[var(--color-foreground)]'
                            : 'text-[var(--color-muted-foreground)]'
                        }`}
                      >
                        {app.name || 'Untitled App'}
                      </Typography>
                      {app.hasValidationErrors && (
                        <Icon icon={AlertTriangle} size="sm" className="text-[var(--color-warning)] flex-shrink-0" />
                      )}
                    </HStack>
                    <Typography variant="caption" className="text-[var(--color-muted-foreground)]">
                      {formatTime(app.updatedAt)}
                    </Typography>
                  </VStack>

                  {/* Context menu trigger */}
                  {(isHovered || isMenuOpen) && (
                    <Box className="relative flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isMenuOpen) {
                            closeMenu();
                          } else {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setMenuPosition({
                              top: isLastItems ? rect.top - 120 : rect.bottom + 4,
                              left: rect.right - 144,
                            });
                            setMenuOpenId(app.id);
                          }
                        }}
                        className="!p-1"
                      >
                        <Icon icon={MoreHorizontal} size="sm" />
                      </Button>

                      {isMenuOpen && menuPosition &&
                        createPortal(
                          <Box
                            border
                            rounded="md"
                            bg="surface"
                            className="fixed w-36 shadow-xl z-[9999] py-1"
                            style={{ top: menuPosition.top, left: menuPosition.left }}
                          >
                            <VStack gap="none">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => handlePreview(e, app.id)}
                                leftIcon={<Play className="w-4 h-4" />}
                                className="w-full justify-start rounded-none"
                              >
                                Preview
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => handleRename(e, app)}
                                leftIcon={<Edit className="w-4 h-4" />}
                                className="w-full justify-start rounded-none"
                              >
                                Rename
                              </Button>
                              <Divider />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => handleDelete(e, app.id)}
                                leftIcon={<Trash2 className="w-4 h-4" />}
                                className="w-full justify-start rounded-none text-[var(--color-error)]"
                              >
                                Delete
                              </Button>
                            </VStack>
                          </Box>,
                          document.body,
                        )}
                    </Box>
                  )}
                </Box>
              );
            })}
          </VStack>
        )}
      </VStack>

      {/* Footer */}
      <Box padding="sm" border className="border-b-0 border-l-0 border-r-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => emit('UI:NAV_STATS', {})}
          leftIcon={<BarChart3 className="w-4 h-4" />}
          className="w-full justify-start"
        >
          Statistics
        </Button>
      </Box>
    </Box>
  );
};

StudioSidebar.displayName = 'StudioSidebar';
export default StudioSidebar;
