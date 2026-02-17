/**
 * StudioHomeElectronBoard - Organism containing all Electron home page logic
 *
 * Manages file picker actions, recent files list, and event emission.
 * Used by StudioHomeElectronTemplate as a thin wrapper.
 *
 * Events Emitted:
 * - UI:{openFileEvent} - When opening a file via file picker
 * - UI:{createProjectEvent} - When creating a new project
 * - UI:{openRecentEvent} - When opening a recent file
 * - UI:REMOVE_RECENT - When removing a file from recent list
 * - UI:CLEAR_RECENT - When clearing all recent files
 */

import React from "react";
import { Plus, FolderOpen, FileCode, X, Trash2, Orbit } from "lucide-react";
import {
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  Icon,
  Card,
  useEventBus,
} from '@almadar/ui';

export interface RecentFile {
  path: string;
  name: string;
  lastOpened: string;
}

export interface StudioHomeElectronEntity {
  recentFiles: RecentFile[];
  version?: string;
}

export interface StudioHomeElectronBoardProps {
  /** Entity containing recent files and app metadata */
  entity: StudioHomeElectronEntity;
  /** Additional CSS classes */
  className?: string;
  /** Event name emitted when opening a file */
  openFileEvent: string;
  /** Event name emitted when creating a new project */
  createProjectEvent: string;
  /** Event name emitted when opening a recent file */
  openRecentEvent: string;
  /** Event name emitted when importing */
  importEvent: string;
}

export const StudioHomeElectronBoard: React.FC<StudioHomeElectronBoardProps> = ({
  entity,
  className = "",
  openFileEvent,
  createProjectEvent,
  openRecentEvent,
}) => {
  const { recentFiles, version = "1.0.0" } = entity;
  const { emit } = useEventBus();

  const handleOpenFile = () => {
    emit(`UI:${openFileEvent}`, {});
  };

  const handleCreateNew = () => {
    emit(`UI:${createProjectEvent}`, {});
  };

  const handleOpenRecent = (file: RecentFile) => {
    emit(`UI:${openRecentEvent}`, { file, entity: "RecentFile" });
  };

  const handleRemoveRecent = (file: RecentFile, e: React.MouseEvent) => {
    e.stopPropagation();
    emit("UI:REMOVE_RECENT", { file, entity: "RecentFile" });
  };

  const handleClearRecent = () => {
    emit("UI:CLEAR_RECENT", {});
  };

  return (
    <Box
      fullHeight
      fullWidth
      className={`bg-[var(--color-background)] ${className}`}
    >
      <VStack gap="none" className="h-full" align="center" justify="center">
        {/* Logo & Title */}
        <VStack gap="md" align="center" className="mb-12">
          <Box className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
            <Icon icon={Orbit} size="lg" className="text-white" />
          </Box>
          <VStack gap="xs" align="center">
            <Typography variant="h1">Almadar Studio</Typography>
            <Typography
              variant="body2"
              className="text-[var(--color-muted-foreground)]"
            >
              v{version}
            </Typography>
          </VStack>
        </VStack>

        {/* Action Buttons */}
        <HStack gap="md" className="mb-12">
          <Button size="lg" onClick={handleCreateNew}>
            <HStack gap="xs" align="center">
              <Icon icon={Plus} size="sm" />
              <span>New Project</span>
            </HStack>
          </Button>
          <Button size="lg" variant="secondary" onClick={handleOpenFile}>
            <HStack gap="xs" align="center">
              <Icon icon={FolderOpen} size="sm" />
              <span>Open File</span>
            </HStack>
          </Button>
        </HStack>

        {/* Recent Files */}
        <Box className="w-full max-w-2xl" padding="lg">
          <HStack justify="between" align="center" className="mb-4">
            <Typography variant="h3">Recent Files</Typography>
            {recentFiles.length > 0 && (
              <Button variant="ghost" size="sm" onClick={handleClearRecent}>
                <HStack gap="xs" align="center">
                  <Icon icon={Trash2} size="sm" />
                  <span>Clear All</span>
                </HStack>
              </Button>
            )}
          </HStack>

          {recentFiles.length === 0 ? (
            <Card padding="lg">
              <VStack gap="md" align="center" className="py-8">
                <Icon
                  icon={FileCode}
                  size="lg"
                  className="text-[var(--color-muted-foreground)] opacity-50"
                />
                <Typography
                  variant="body1"
                  className="text-[var(--color-muted-foreground)]"
                >
                  No recent files
                </Typography>
                <Typography
                  variant="body2"
                  className="text-[var(--color-muted-foreground)]"
                >
                  Open a .orb file to get started
                </Typography>
              </VStack>
            </Card>
          ) : (
            <VStack gap="sm">
              {recentFiles.map((file) => (
                <Card
                  key={file.path}
                  padding="md"
                  className="cursor-pointer hover:bg-[var(--color-muted)] transition-colors"
                  onClick={() => handleOpenRecent(file)}
                >
                  <HStack justify="between" align="center">
                    <HStack gap="md" align="center">
                      <Icon
                        icon={FileCode}
                        size="md"
                        className="text-[var(--color-primary)]"
                      />
                      <VStack gap="none">
                        <Typography variant="body1" className="font-medium">
                          {file.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          className="text-[var(--color-muted-foreground)]"
                        >
                          {file.path}
                        </Typography>
                      </VStack>
                    </HStack>
                    <HStack gap="sm" align="center">
                      <Typography
                        variant="caption"
                        className="text-[var(--color-muted-foreground)]"
                      >
                        {file.lastOpened}
                      </Typography>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleRemoveRecent(file, e)}
                        className="text-[var(--color-muted-foreground)] hover:text-[var(--color-error)]"
                      >
                        <Icon icon={X} size="sm" />
                      </Button>
                    </HStack>
                  </HStack>
                </Card>
              ))}
            </VStack>
          )}
        </Box>

        {/* Footer */}
        <Box className="absolute bottom-4">
          <Typography
            variant="caption"
            className="text-[var(--color-muted-foreground)]"
          >
            Press Ctrl+O to open a file, Ctrl+N to create new
          </Typography>
        </Box>
      </VStack>
    </Box>
  );
};

StudioHomeElectronBoard.displayName = "StudioHomeElectronBoard";
