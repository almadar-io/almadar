/**
 * ComponentTreeBoard Organism
 *
 * Hierarchical tree view of page components showing their structure,
 * props, and event bindings. Reads from schema ui.pages[].components.
 *
 * Events Emitted:
 * - UI:COMPONENT_SELECT { nodeId }
 */

import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, Box, Layers, Zap, Settings } from 'lucide-react';
import { Typography, useEventBus } from '@almadar/ui';

// =============================================================================
// Types
// =============================================================================

interface TreeNode {
  id: string;
  name: string;
  type: string;
  componentType?: string;
  isSystem?: boolean;
  props?: Record<string, unknown>;
  events?: string[];
  children: TreeNode[];
}

interface SchemaComponent {
  type: string;
  props?: Record<string, unknown>;
  children?: SchemaComponent[] | string;
}

interface SchemaPage {
  name: string;
  path: string;
  isInitial?: boolean;
  purpose?: string;
  components?: SchemaComponent[];
}

export interface ComponentTreeBoardProps {
  schema: {
    ui?: { pages?: SchemaPage[] };
    [key: string]: unknown;
  };
  selectedPageId?: string;
  onComponentSelect?: (nodeId: string) => void;
  className?: string;
}

// =============================================================================
// Helpers
// =============================================================================

function componentToTreeNode(
  component: SchemaComponent,
  index: number,
  parentId: string = ''
): TreeNode {
  const id = `${parentId}-${index}`;
  const componentType = component.type;
  const systemComponents = ['Spinner', 'LoadingOverlay', 'Toast', 'ErrorBoundary', 'Skeleton', 'StateView', 'Show'];
  const isSystem = systemComponents.includes(componentType);

  const events: string[] = [];
  if (component.props) {
    if (component.props.onClick && typeof component.props.onClick === 'string') events.push(component.props.onClick as string);
    if (component.props.onSubmit && typeof component.props.onSubmit === 'string') events.push(component.props.onSubmit as string);
  }

  const children: TreeNode[] = [];
  if (Array.isArray(component.children)) {
    component.children.forEach((child, childIndex) => {
      if (typeof child === 'object' && child !== null) {
        children.push(componentToTreeNode(child as SchemaComponent, childIndex, id));
      }
    });
  }

  return { id, name: componentType, type: 'Component', componentType, isSystem, props: component.props, events: events.length > 0 ? events : undefined, children };
}

function buildTreeFromPage(page: SchemaPage): TreeNode {
  const pageNode: TreeNode = {
    id: `page-${page.name}`,
    name: page.name,
    type: 'Page',
    componentType: 'Page',
    isSystem: false,
    props: { path: page.path, isInitial: page.isInitial, purpose: page.purpose },
    children: [],
  };

  if (page.components && Array.isArray(page.components)) {
    page.components.forEach((component, index) => {
      pageNode.children.push(componentToTreeNode(component, index, `page-${page.name}`));
    });
  }

  return pageNode;
}

function countNodes(tree: TreeNode | null, predicate?: (n: TreeNode) => boolean): number {
  if (!tree) return 0;
  let count = predicate ? (predicate(tree) ? 1 : 0) : 1;
  for (const child of tree.children) count += countNodes(child, predicate);
  return count;
}

// =============================================================================
// Sub-Components
// =============================================================================

const TreeNodeComponent: React.FC<{
  node: TreeNode;
  depth: number;
  selectedId?: string;
  onSelect?: (id: string) => void;
}> = ({ node, depth, selectedId, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(depth < 2);
  const hasChildren = node.children.length > 0;
  const isSelected = selectedId === node.id;

  const handleClick = () => {
    if (hasChildren) setIsExpanded(!isExpanded);
    onSelect?.(node.id);
  };

  return (
    <div className="select-none">
      <div
        onClick={handleClick}
        className={`flex items-center gap-2 py-1.5 px-2 rounded cursor-pointer transition-colors duration-150 border-l-2 ${
          isSelected
            ? ''
            : 'border-transparent'
        }`}
        style={{
          paddingLeft: `${depth * 16 + 8}px`,
          ...(isSelected
            ? {
                backgroundColor: 'color-mix(in srgb, var(--color-primary) 20%, transparent)',
                borderColor: 'var(--color-primary)',
              }
            : {}),
        }}
      >
        <span className="w-4 h-4 flex items-center justify-center" style={{ color: 'var(--color-muted-foreground)' }}>
          {hasChildren ? (
            isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
          ) : (
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--color-border)' }} />
          )}
        </span>

        <span style={{ color: node.isSystem ? 'var(--color-accent)' : 'var(--color-primary)' }}>
          {node.type === 'Page' ? <Layers className="w-4 h-4" /> : node.isSystem ? <Settings className="w-4 h-4" /> : <Box className="w-4 h-4" />}
        </span>

        <span className="text-sm" style={{ color: node.isSystem ? 'var(--color-accent)' : 'var(--color-foreground)' }}>
          {node.name}
        </span>

        {node.componentType && node.componentType !== node.name && (
          <span className="text-xs px-1.5 py-0.5 rounded" style={{ color: 'var(--color-muted-foreground)', backgroundColor: 'var(--color-card)' }}>{node.componentType}</span>
        )}
        {node.isSystem && (
          <span
            className="text-xs px-1.5 py-0.5 rounded border"
            style={{
              color: 'var(--color-accent)',
              backgroundColor: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
              borderColor: 'color-mix(in srgb, var(--color-accent) 30%, transparent)',
            }}
          >
            system
          </span>
        )}
        {node.events && node.events.length > 0 && (
          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-warning)' }}>
            <Zap className="w-3 h-3" />
            {node.events.join(', ')}
          </span>
        )}
      </div>

      {isExpanded && hasChildren && (
        <div>
          {node.children.map(child => (
            <TreeNodeComponent key={child.id} node={child} depth={depth + 1} selectedId={selectedId} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

const ComponentDetails: React.FC<{ node: TreeNode }> = ({ node }) => (
  <div className="p-3 rounded-lg border text-sm" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
    <Typography variant="h6" className="mb-3" style={{ color: 'var(--color-foreground)' }}>{node.name}</Typography>
    <div className="space-y-3">
      <div>
        <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>Type</Typography>
        <div style={{ color: 'var(--color-foreground)' }}>{node.componentType || node.type}</div>
      </div>
      {node.props && Object.keys(node.props).length > 0 && (
        <div>
          <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>Props</Typography>
          <div className="mt-1 space-y-1 max-h-48 overflow-auto">
            {Object.entries(node.props).map(([key, value]) => (
              <div key={key} className="flex items-start gap-2 text-xs">
                <span className="font-mono" style={{ color: 'var(--color-primary)' }}>{key}:</span>
                <span className="font-mono truncate max-w-[150px]" style={{ color: 'var(--color-muted-foreground)' }}>
                  {typeof value === 'object' ? JSON.stringify(value).slice(0, 80) + (JSON.stringify(value).length > 80 ? '...' : '') : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {node.events && node.events.length > 0 && (
        <div>
          <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>Event Triggers</Typography>
          <div className="mt-1 flex flex-wrap gap-1">
            {node.events.map(event => (
              <span
                key={event}
                className="text-xs px-2 py-0.5 rounded border"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-warning) 20%, transparent)',
                  color: 'var(--color-warning)',
                  borderColor: 'color-mix(in srgb, var(--color-warning) 30%, transparent)',
                }}
              >
                {event}
              </span>
            ))}
          </div>
        </div>
      )}
      {node.children.length > 0 && (
        <div>
          <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>Children</Typography>
          <div style={{ color: 'var(--color-foreground)' }}>{node.children.length} components</div>
        </div>
      )}
    </div>
  </div>
);

// =============================================================================
// Main Component
// =============================================================================

export const ComponentTreeBoard: React.FC<ComponentTreeBoardProps> = ({
  schema,
  onComponentSelect,
  className = '',
}) => {
  const { emit } = useEventBus();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activePageName, setActivePageName] = useState<string | undefined>(undefined);

  const pages = useMemo(() => (schema.ui?.pages || []) as SchemaPage[], [schema]);

  const componentTree = useMemo(() => {
    if (!activePageName) return null;
    const page = pages.find(p => p.name === activePageName);
    if (!page) return null;
    return buildTreeFromPage(page);
  }, [pages, activePageName]);

  const selectedNode = useMemo(() => {
    if (!selectedNodeId || !componentTree) return null;
    const findNode = (tree: TreeNode): TreeNode | null => {
      if (tree.id === selectedNodeId) return tree;
      for (const child of tree.children) {
        const found = findNode(child);
        if (found) return found;
      }
      return null;
    };
    return findNode(componentTree);
  }, [componentTree, selectedNodeId]);

  const handleSelect = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    emit('UI:COMPONENT_SELECT', { nodeId });
    onComponentSelect?.(nodeId);
  };

  const totalComponents = countNodes(componentTree);
  const systemCount = countNodes(componentTree, n => !!n.isSystem);

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="flex items-center gap-2 p-3 border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>Page:</Typography>
        <select
          value={activePageName || ''}
          onChange={(e) => { setActivePageName(e.target.value || undefined); setSelectedNodeId(null); }}
          className="flex-1 text-sm rounded px-2 py-1 border focus:outline-none"
          style={{
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-foreground)',
            borderColor: 'var(--color-border)',
          }}
        >
          <option value="">Select a page...</option>
          {pages.map(page => (
            <option key={page.name} value={page.name}>{page.name} ({page.path})</option>
          ))}
        </select>
        {activePageName && (
          <span className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
            {totalComponents} components
            {systemCount > 0 && <span className="ml-1" style={{ color: 'var(--color-accent)' }}>({systemCount} system)</span>}
          </span>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-auto p-2" style={{ backgroundColor: 'var(--color-card)' }}>
          {componentTree ? (
            <TreeNodeComponent node={componentTree} depth={0} selectedId={selectedNodeId || undefined} onSelect={handleSelect} />
          ) : pages.length === 0 ? (
            <div className="flex items-center justify-center h-full" style={{ color: 'var(--color-muted-foreground)' }}>
              <Typography variant="body2">No pages found in schema</Typography>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full" style={{ color: 'var(--color-muted-foreground)' }}>
              <Typography variant="body2">Select a page to view its component tree</Typography>
            </div>
          )}
        </div>
        {selectedNode && (
          <div className="w-72 border-l overflow-auto p-2" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
            <ComponentDetails node={selectedNode} />
          </div>
        )}
      </div>
    </div>
  );
};

ComponentTreeBoard.displayName = 'ComponentTreeBoard';
export default ComponentTreeBoard;
