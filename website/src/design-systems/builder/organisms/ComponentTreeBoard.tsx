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
import { ChevronRight, ChevronDown, Box as BoxIcon, Layers, Zap, Settings } from 'lucide-react';
import {
  Box,
  VStack,
  HStack,
  Center,
  Typography,
  Badge,
  Icon,
  Select,
  useEventBus,
} from '@almadar/ui';

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
    <Box className="select-none">
      <HStack
        gap="xs"
        align="center"
        onClick={handleClick}
        className={`py-1.5 px-2 rounded cursor-pointer transition-colors duration-150 border-l-2 ${
          isSelected ? '' : 'border-transparent'
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
        <Box
          display="inline-flex"
          className="w-4 h-4 items-center justify-center"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          {hasChildren ? (
            isExpanded
              ? <Icon icon={ChevronDown} size="sm" />
              : <Icon icon={ChevronRight} size="sm" />
          ) : (
            <Box
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: 'var(--color-border)' }}
            />
          )}
        </Box>

        <Box
          display="inline-flex"
          style={{ color: node.isSystem ? 'var(--color-accent)' : 'var(--color-primary)' }}
        >
          {node.type === 'Page'
            ? <Icon icon={Layers} size="sm" />
            : node.isSystem
              ? <Icon icon={Settings} size="sm" />
              : <Icon icon={BoxIcon} size="sm" />
          }
        </Box>

        <Typography
          variant="body2"
          style={{ color: node.isSystem ? 'var(--color-accent)' : 'var(--color-foreground)' }}
        >
          {node.name}
        </Typography>

        {node.componentType && node.componentType !== node.name && (
          <Badge
            variant="neutral"
            size="sm"
            style={{ color: 'var(--color-muted-foreground)', backgroundColor: 'var(--color-card)' }}
          >
            {node.componentType}
          </Badge>
        )}

        {node.isSystem && (
          <Badge
            variant="info"
            size="sm"
            style={{
              color: 'var(--color-accent)',
              backgroundColor: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
              borderColor: 'color-mix(in srgb, var(--color-accent) 30%, transparent)',
            }}
          >
            system
          </Badge>
        )}

        {node.events && node.events.length > 0 && (
          <HStack gap="xs" align="center" style={{ color: 'var(--color-warning)' }}>
            <Icon icon={Zap} size="xs" />
            <Typography variant="caption" style={{ color: 'var(--color-warning)' }}>
              {node.events.join(', ')}
            </Typography>
          </HStack>
        )}
      </HStack>

      {isExpanded && hasChildren && (
        <Box>
          {node.children.map(child => (
            <TreeNodeComponent key={child.id} node={child} depth={depth + 1} selectedId={selectedId} onSelect={onSelect} />
          ))}
        </Box>
      )}
    </Box>
  );
};

const ComponentDetails: React.FC<{ node: TreeNode }> = ({ node }) => (
  <Box
    padding="sm"
    rounded="md"
    border
    style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
  >
    <Typography variant="h6" className="mb-3" style={{ color: 'var(--color-foreground)' }}>
      {node.name}
    </Typography>
    <VStack gap="sm">
      <VStack gap="none">
        <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>Type</Typography>
        <Typography variant="body2" style={{ color: 'var(--color-foreground)' }}>
          {node.componentType || node.type}
        </Typography>
      </VStack>

      {node.props && Object.keys(node.props).length > 0 && (
        <VStack gap="none">
          <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>Props</Typography>
          <Box className="mt-1" overflow="auto" style={{ maxHeight: '12rem' }}>
            <VStack gap="xs">
              {Object.entries(node.props).map(([key, value]) => (
                <HStack key={key} gap="xs" align="start">
                  <Typography
                    variant="caption"
                    className="font-mono"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {key}:
                  </Typography>
                  <Typography
                    variant="caption"
                    className="font-mono truncate"
                    style={{ color: 'var(--color-muted-foreground)', maxWidth: '150px' }}
                  >
                    {typeof value === 'object'
                      ? JSON.stringify(value).slice(0, 80) + (JSON.stringify(value).length > 80 ? '...' : '')
                      : String(value)}
                  </Typography>
                </HStack>
              ))}
            </VStack>
          </Box>
        </VStack>
      )}

      {node.events && node.events.length > 0 && (
        <VStack gap="none">
          <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>Event Triggers</Typography>
          <HStack gap="xs" wrap className="mt-1">
            {node.events.map(event => (
              <Badge
                key={event}
                variant="warning"
                size="sm"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-warning) 20%, transparent)',
                  color: 'var(--color-warning)',
                  borderColor: 'color-mix(in srgb, var(--color-warning) 30%, transparent)',
                }}
              >
                {event}
              </Badge>
            ))}
          </HStack>
        </VStack>
      )}

      {node.children.length > 0 && (
        <VStack gap="none">
          <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>Children</Typography>
          <Typography variant="body2" style={{ color: 'var(--color-foreground)' }}>
            {node.children.length} components
          </Typography>
        </VStack>
      )}
    </VStack>
  </Box>
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

  const pageSelectOptions = pages.map(page => ({
    value: page.name,
    label: `${page.name} (${page.path})`,
  }));

  return (
    <VStack gap="none" className={`h-full ${className}`}>
      <HStack
        gap="xs"
        align="center"
        className="p-2 border-b"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
      >
        <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>Page:</Typography>
        <Select
          className="flex-1 text-sm rounded"
          value={activePageName || ''}
          onChange={(e) => {
            setActivePageName((e.target as HTMLSelectElement).value || undefined);
            setSelectedNodeId(null);
          }}
          options={pageSelectOptions}
          placeholder="Select a page..."
          style={{
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-foreground)',
            borderColor: 'var(--color-border)',
          }}
        />
        {activePageName && (
          <HStack gap="xs" align="center">
            <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>
              {totalComponents} components
            </Typography>
            {systemCount > 0 && (
              <Typography variant="caption" style={{ color: 'var(--color-accent)' }}>
                ({systemCount} system)
              </Typography>
            )}
          </HStack>
        )}
      </HStack>

      <HStack gap="none" flex className="overflow-hidden">
        <Box
          className="flex-1 overflow-auto p-1"
          style={{ backgroundColor: 'var(--color-card)' }}
        >
          {componentTree ? (
            <TreeNodeComponent
              node={componentTree}
              depth={0}
              selectedId={selectedNodeId || undefined}
              onSelect={handleSelect}
            />
          ) : pages.length === 0 ? (
            <Center fullHeight style={{ color: 'var(--color-muted-foreground)' }}>
              <Typography variant="body2">No pages found in schema</Typography>
            </Center>
          ) : (
            <Center fullHeight style={{ color: 'var(--color-muted-foreground)' }}>
              <Typography variant="body2">Select a page to view its component tree</Typography>
            </Center>
          )}
        </Box>

        {selectedNode && (
          <Box
            overflow="auto"
            padding="xs"
            className="w-72 border-l"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
          >
            <ComponentDetails node={selectedNode} />
          </Box>
        )}
      </HStack>
    </VStack>
  );
};

ComponentTreeBoard.displayName = 'ComponentTreeBoard';
export default ComponentTreeBoard;
