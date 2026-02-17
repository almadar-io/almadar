/**
 * FileTreePanel Organism
 *
 * A file explorer component for displaying and navigating file system trees.
 * Supports file/directory nodes with badges for different file types.
 *
 * Events Emitted:
 * - UI:FILE_SELECT { path }
 */

import React, { useState, useCallback } from 'react';
import {
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  FolderOpen,
  FileJson,
  FileCode,
  FileText,
  Settings,
} from 'lucide-react';
import { Typography, Badge, useEventBus } from '@almadar/ui';

// =============================================================================
// Types
// =============================================================================

export type FileBadge = 'generated' | 'schema' | 'extension' | 'config';

export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
  badge?: FileBadge;
}

export interface FileTreePanelProps {
  files: FileNode[];
  selectedPath: string | null;
  onSelectFile?: (path: string) => void;
  className?: string;
  defaultExpanded?: string[];
  showBadges?: boolean;
}

// =============================================================================
// Helpers
// =============================================================================

function getFileIcon(name: string): React.ReactNode {
  const extension = name.split('.').pop()?.toLowerCase();

  if (name === 'schema.json') return <FileJson size={16} style={{ color: 'var(--color-warning)' }} />;
  if (name === 'package.json') return <FileJson size={16} style={{ color: 'var(--color-success)' }} />;
  if (name === 'tsconfig.json' || name.endsWith('.config.ts') || name.endsWith('.config.js')) {
    return <Settings size={16} style={{ color: 'var(--color-muted-foreground)' }} />;
  }

  switch (extension) {
    case 'ts': case 'tsx': return <FileCode size={16} style={{ color: 'var(--color-info)' }} />;
    case 'js': case 'jsx': return <FileCode size={16} style={{ color: 'var(--color-warning)' }} />;
    case 'json': return <FileJson size={16} style={{ color: 'var(--color-warning)' }} />;
    case 'css': case 'scss': case 'less': return <FileCode size={16} style={{ color: 'var(--color-accent)' }} />;
    case 'html': return <FileCode size={16} style={{ color: 'var(--color-warning)' }} />;
    case 'md': case 'txt': return <FileText size={16} style={{ color: 'var(--color-muted-foreground)' }} />;
    default: return <File size={16} style={{ color: 'var(--color-muted-foreground)' }} />;
  }
}

function getBadgeConfig(badge: FileBadge): { label: string; variant: 'default' | 'success' | 'warning' | 'info' } {
  switch (badge) {
    case 'generated': return { label: 'Gen', variant: 'default' };
    case 'schema': return { label: 'Schema', variant: 'warning' };
    case 'extension': return { label: 'Ext', variant: 'success' };
    case 'config': return { label: 'Config', variant: 'info' };
    default: return { label: '', variant: 'default' };
  }
}

// =============================================================================
// Sub-Components
// =============================================================================

interface FileTreeNodeProps {
  node: FileNode;
  depth: number;
  selectedPath: string | null;
  onSelect: (path: string) => void;
  expandedPaths: Set<string>;
  toggleExpand: (path: string) => void;
  showBadges: boolean;
}

const FileTreeNode: React.FC<FileTreeNodeProps> = ({
  node, depth, selectedPath, onSelect, expandedPaths, toggleExpand, showBadges,
}) => {
  const isDirectory = node.type === 'directory';
  const isExpanded = expandedPaths.has(node.path);
  const isSelected = selectedPath === node.path;
  const hasChildren = isDirectory && node.children && node.children.length > 0;

  const handleClick = useCallback(() => {
    if (isDirectory) {
      toggleExpand(node.path);
    } else {
      onSelect(node.path);
    }
  }, [isDirectory, node.path, onSelect, toggleExpand]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  const sortedChildren = node.children?.slice().sort((a, b) => {
    if (a.type !== b.type) return a.type === 'directory' ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div>
      <div
        className="flex items-center gap-1 py-1 px-2 cursor-pointer rounded-sm transition-colors duration-100"
        style={{
          paddingLeft: `${depth * 12 + 8}px`,
          backgroundColor: isSelected ? 'color-mix(in srgb, var(--color-info) 15%, transparent)' : undefined,
        }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="treeitem"
        tabIndex={0}
        aria-selected={isSelected}
        aria-expanded={isDirectory ? isExpanded : undefined}
      >
        {isDirectory ? (
          <div className="w-4 h-4 flex items-center justify-center shrink-0">
            {hasChildren && (
              isExpanded
                ? <ChevronDown size={14} style={{ color: 'var(--color-muted-foreground)' }} />
                : <ChevronRight size={14} style={{ color: 'var(--color-muted-foreground)' }} />
            )}
          </div>
        ) : (
          <div className="w-4 shrink-0" />
        )}

        <div className="shrink-0">
          {isDirectory ? (
            isExpanded
              ? <FolderOpen size={16} style={{ color: 'var(--color-warning)' }} />
              : <Folder size={16} style={{ color: 'var(--color-warning)' }} />
          ) : (
            getFileIcon(node.name)
          )}
        </div>

        <Typography
          variant="caption"
          className="truncate flex-1"
          style={isSelected ? { color: 'var(--color-info)' } : undefined}
        >
          {node.name}
        </Typography>

        {showBadges && node.badge && (
          <Badge
            variant={getBadgeConfig(node.badge).variant}
            size="sm"
            className="ml-1 shrink-0"
          >
            {getBadgeConfig(node.badge).label}
          </Badge>
        )}
      </div>

      {isDirectory && isExpanded && sortedChildren && (
        <div role="group">
          {sortedChildren.map((child) => (
            <FileTreeNode
              key={child.path}
              node={child}
              depth={depth + 1}
              selectedPath={selectedPath}
              onSelect={onSelect}
              expandedPaths={expandedPaths}
              toggleExpand={toggleExpand}
              showBadges={showBadges}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// =============================================================================
// Main Component
// =============================================================================

export const FileTreePanel: React.FC<FileTreePanelProps> = ({
  files,
  selectedPath,
  onSelectFile,
  className = '',
  defaultExpanded = [],
  showBadges = true,
}) => {
  const { emit } = useEventBus();

  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(
    () => new Set(defaultExpanded)
  );

  const toggleExpand = useCallback((path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }, []);

  const handleSelect = useCallback((path: string) => {
    emit('UI:FILE_SELECT', { path });
    onSelectFile?.(path);
  }, [emit, onSelectFile]);

  const sortedFiles = files.slice().sort((a, b) => {
    if (a.type !== b.type) return a.type === 'directory' ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  if (files.length === 0) {
    return (
      <div className={`flex items-center justify-center w-full h-full ${className}`}>
        <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>
          No files to display
        </Typography>
      </div>
    );
  }

  return (
    <div
      className={`overflow-auto h-full ${className}`}
      role="tree"
      aria-label="File explorer"
    >
      {sortedFiles.map((node) => (
        <FileTreeNode
          key={node.path}
          node={node}
          depth={0}
          selectedPath={selectedPath}
          onSelect={handleSelect}
          expandedPaths={expandedPaths}
          toggleExpand={toggleExpand}
          showBadges={showBadges}
        />
      ))}
    </div>
  );
};

FileTreePanel.displayName = 'FileTreePanel';
export default FileTreePanel;
