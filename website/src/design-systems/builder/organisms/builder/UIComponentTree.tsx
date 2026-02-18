/**
 * UI Component Tree
 *
 * Visual tree representation of UI components following atomic design.
 * Shows pages, templates, organisms, molecules, and atoms.
 */

import React, { useState, useMemo, useCallback } from 'react';
import type { BuilderGraph, GraphNode } from './types';
import { Typography, Button, Badge, Icon, Box, VStack, HStack } from '@almadar/ui';
import { Card, CardBody, CardHeader } from '@almadar/ui';
import {
  Layout,
  Layers,
  Component,
  Circle,
  Plus,
  Edit2,
  Trash2,
  ChevronRight,
  ChevronDown,
  Link2,
  Zap,
  FileText,
  Eye,
} from 'lucide-react';

// ============ Types ============

export interface UIComponentTreeProps {
  graph: BuilderGraph;
  onCreatePage?: () => void;
  onCreateComponent?: (parentId: string, type: 'Organism' | 'Molecule' | 'Atom') => void;
  onEditNode?: (nodeId: string) => void;
  onDeleteNode?: (nodeId: string) => void;
  onSelectNode?: (nodeId: string) => void;
  selectedNodeId?: string | null;
  className?: string;
  readOnly?: boolean;
}

interface UINode {
  node: GraphNode;
  children: UINode[];
  bindings: Array<{ fieldName: string; bindingPath: string }>;
  triggers: Array<{ triggerType: string; eventKey: string }>;
}

// ============ Component ============

export const UIComponentTree: React.FC<UIComponentTreeProps> = ({
  graph,
  onCreatePage,
  onCreateComponent,
  onEditNode,
  onDeleteNode,
  onSelectNode,
  selectedNodeId,
  className = '',
  readOnly = false,
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Build the UI tree
  const { pages, componentCounts } = useMemo(() => {
    const pageNodes: UINode[] = [];
    const counts = {
      pages: 0,
      templates: 0,
      organisms: 0,
      molecules: 0,
      atoms: 0,
      dataFields: 0,
    };

    // Helper to find children of a node
    const findChildren = (parentId: string): UINode[] => {
      const composedOfRels = graph.relationships.filter(
        (r) => r.type === 'COMPOSED_OF' && r.source === parentId
      );

      return composedOfRels.map((rel) => {
        const childNode = graph.nodes[rel.target];
        if (!childNode) return null;

        // Find data bindings
        const bindingRels = graph.relationships.filter(
          (r) => r.type === 'BINDS_DATA' && r.source === childNode.id
        );
        const bindings = bindingRels.map((br) => {
          const fieldNode = graph.nodes[br.target];
          return {
            fieldName: String(fieldNode?.properties?.name || 'Unknown'),
            bindingPath: String(br.metadata?.bindingPath || 'value'),
          };
        });

        // Find event triggers
        const triggerRels = graph.relationships.filter(
          (r) => r.type === 'TRIGGERS_EVENT' && r.source === childNode.id
        );
        const triggers = triggerRels.map((tr) => {
          const eventNode = graph.nodes[tr.target];
          return {
            triggerType: String(tr.metadata?.trigger || 'onClick'),
            eventKey: String(eventNode?.properties?.key || 'Unknown'),
          };
        });

        return {
          node: childNode,
          children: findChildren(childNode.id),
          bindings,
          triggers,
        };
      }).filter(Boolean) as UINode[];
    };

    // Find all pages
    Object.values(graph.nodes).forEach((node) => {
      switch (node.type) {
        case 'Page':
          counts.pages++;
          pageNodes.push({
            node,
            children: findChildren(node.id),
            bindings: [],
            triggers: [],
          });
          break;
        case 'Template':
          counts.templates++;
          break;
        case 'Organism':
          counts.organisms++;
          break;
        case 'Molecule':
          counts.molecules++;
          break;
        case 'Atom':
          counts.atoms++;
          break;
        case 'DataField':
          counts.dataFields++;
          break;
      }
    });

    return { pages: pageNodes, componentCounts: counts };
  }, [graph]);

  // Toggle node expansion
  const toggleExpand = useCallback((nodeId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }, []);

  // Get icon for node type
  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'Page':
        return <Icon icon={FileText} size="sm" style={{ color: 'var(--color-info)' }} />;
      case 'Template':
        return <Icon icon={Layout} size="sm" style={{ color: 'var(--color-primary)' }} />;
      case 'Organism':
        return <Icon icon={Layers} size="sm" style={{ color: 'var(--color-success)' }} />;
      case 'Molecule':
        return <Icon icon={Component} size="sm" style={{ color: 'var(--color-warning)' }} />;
      case 'Atom':
        return <Icon icon={Circle} size="sm" style={{ color: 'var(--color-warning)' }} />;
      default:
        return <Icon name="layout" size="sm" style={{ color: 'var(--color-muted-foreground)' }} />;
    }
  };

  // Get badge variant for node type
  const getNodeBadgeVariant = (type: string): 'primary' | 'success' | 'warning' | 'danger' | 'info' => {
    switch (type) {
      case 'Page':
        return 'primary';
      case 'Template':
        return 'info';
      case 'Organism':
        return 'success';
      case 'Molecule':
        return 'warning';
      case 'Atom':
        return 'danger';
      default:
        return 'primary';
    }
  };

  // Render tree node
  const renderNode = (uiNode: UINode, depth: number = 0) => {
    const { node, children, bindings, triggers } = uiNode;
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = children.length > 0;
    const isSelected = selectedNodeId === node.id;
    const isHovered = hoveredNodeId === node.id;

    return (
      <Box key={node.id} className="select-none">
        <Box
          className="flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-colors"
          style={{
            paddingLeft: `${depth * 24 + 12}px`,
            ...(isSelected
              ? { backgroundColor: 'color-mix(in srgb, var(--color-primary) 15%, transparent)', border: '1px solid var(--color-primary)' }
              : isHovered
                ? { backgroundColor: 'var(--color-surface)' }
                : {}),
          }}
          onClick={() => onSelectNode?.(node.id)}
          onMouseEnter={() => setHoveredNodeId(node.id)}
          onMouseLeave={() => setHoveredNodeId(null)}
        >
          {/* Expand/Collapse Button */}
          {hasChildren ? (
            <Button
              size="sm"
              variant="ghost"
              className="w-5 h-5 flex items-center justify-center p-0"
              style={{ color: 'var(--color-muted-foreground)' }}
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(node.id);
              }}
            >
              {isExpanded ? (
                <Icon icon={ChevronDown} size="sm" />
              ) : (
                <Icon icon={ChevronRight} size="sm" />
              )}
            </Button>
          ) : (
            <Box className="w-5" />
          )}

          {/* Icon */}
          {getNodeIcon(node.type)}

          {/* Name & Type */}
          <VStack gap="none" flex className="min-w-0">
            <HStack gap="xs" align="center">
              <Typography variant="body2" className="truncate" style={{ color: 'var(--color-foreground)' }}>
                {String(node.properties.name || node.properties.componentType || node.id)}
              </Typography>
              {Boolean(node.properties.componentType) && node.type !== 'Page' && (
                <Badge size="sm" variant={getNodeBadgeVariant(node.type)}>
                  {String(node.properties.componentType)}
                </Badge>
              )}
              {node.type === 'Page' && Boolean(node.properties.isInitial) && (
                <Badge size="sm" variant="success">Initial</Badge>
              )}
            </HStack>

            {/* Bindings & Triggers indicators */}
            {(bindings.length > 0 || triggers.length > 0) && (
              <HStack gap="xs" align="center" className="mt-1">
                {bindings.length > 0 && (
                  <HStack gap="xs" align="center" className="text-xs" style={{ color: 'var(--color-info)' }}>
                    <Icon icon={Link2} size="xs" />
                    <Typography variant="caption">
                      {bindings.length} binding{bindings.length > 1 ? 's' : ''}
                    </Typography>
                  </HStack>
                )}
                {triggers.length > 0 && (
                  <HStack gap="xs" align="center" className="text-xs" style={{ color: 'var(--color-warning)' }}>
                    <Icon icon={Zap} size="xs" />
                    <Typography variant="caption">
                      {triggers.length} trigger{triggers.length > 1 ? 's' : ''}
                    </Typography>
                  </HStack>
                )}
              </HStack>
            )}
          </VStack>

          {/* Actions */}
          <HStack gap="xs" align="center">
            {/* View JSON button - always visible */}
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onSelectNode?.(node.id);
              }}
              title="View component properties"
              style={{ color: 'var(--color-muted-foreground)' }}
            >
              <Icon icon={Eye} size="xs" />
            </Button>

            {/* Other actions - only visible when selected or hovered */}
            {!readOnly && (isSelected || isHovered) && (
              <>
                {node.type !== 'Atom' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      const childType =
                        node.type === 'Page' ? 'Organism' :
                          node.type === 'Template' ? 'Organism' :
                            node.type === 'Organism' ? 'Molecule' : 'Atom';
                      onCreateComponent?.(node.id, childType);
                    }}
                  >
                    <Icon icon={Plus} size="xs" />
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditNode?.(node.id);
                  }}
                >
                  <Icon icon={Edit2} size="xs" />
                </Button>
                {node.type !== 'Page' || !Boolean(node.properties.isInitial) && (
                  <Button
                    size="sm"
                    variant="ghost"
                    style={{ color: 'var(--color-error)' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteNode?.(node.id);
                    }}
                  >
                    <Icon icon={Trash2} size="xs" />
                  </Button>
                )}
              </>
            )}
          </HStack>
        </Box>

        {/* Children */}
        {isExpanded && hasChildren && (
          <Box className="ml-2 border-l" style={{ borderColor: 'var(--color-border)' }}>
            {children.map((child) => renderNode(child, depth + 1))}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <VStack gap="lg" className={className}>
      {/* Header */}
      <HStack justify="between" align="center">
        <VStack gap="none">
          <Typography variant="h4" style={{ color: 'var(--color-foreground)' }}>
            UI Components
          </Typography>
          <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>
            {componentCounts.pages} pages, {componentCounts.organisms} organisms,{' '}
            {componentCounts.molecules} molecules, {componentCounts.atoms} atoms
          </Typography>
        </VStack>
        {!readOnly && (
          <Button
            size="sm"
            variant="secondary"
            leftIcon={<Icon icon={Plus} size="sm" />}
            onClick={onCreatePage}
          >
            Add Page
          </Button>
        )}
      </HStack>

      {/* Stats Bar */}
      <HStack gap="sm" wrap>
        <Badge variant="primary">
          <Icon icon={FileText} size="xs" className="mr-1" /> {componentCounts.pages} Pages
        </Badge>
        <Badge variant="success">
          <Icon icon={Layers} size="xs" className="mr-1" /> {componentCounts.organisms} Organisms
        </Badge>
        <Badge variant="warning">
          <Icon icon={Component} size="xs" className="mr-1" /> {componentCounts.molecules} Molecules
        </Badge>
        <Badge variant="danger">
          <Icon icon={Circle} size="xs" className="mr-1" /> {componentCounts.atoms} Atoms
        </Badge>
        <Badge variant="info">
          <Icon icon={Link2} size="xs" className="mr-1" /> {componentCounts.dataFields} Data Fields
        </Badge>
      </HStack>

      {/* Component Tree */}
      <Card style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
        <CardHeader>
          <Typography variant="h5" style={{ color: 'var(--color-foreground)' }}>
            Component Hierarchy
          </Typography>
        </CardHeader>
        <CardBody className="max-h-[500px] overflow-auto">
          {pages.length === 0 ? (
            <VStack align="center" gap="sm" className="py-12">
              <Icon icon={FileText} size="xl" className="mx-auto mb-4" style={{ color: 'var(--color-muted-foreground)' }} />
              <Typography variant="h4" className="mb-2" style={{ color: 'var(--color-muted-foreground)' }}>
                No Pages Yet
              </Typography>
              <Typography variant="body2" className="mb-4" style={{ color: 'var(--color-muted-foreground)' }}>
                Create a page to start building your UI
              </Typography>
              {!readOnly && (
                <Button onClick={onCreatePage} leftIcon={<Icon icon={Plus} size="sm" />}>
                  Create First Page
                </Button>
              )}
            </VStack>
          ) : (
            <VStack gap="xs">
              {pages.map((page) => renderNode(page, 0))}
            </VStack>
          )}
        </CardBody>
      </Card>

      {/* Atomic Design Legend */}
      <Card style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <CardBody>
          <Typography variant="caption" className="block mb-3" style={{ color: 'var(--color-muted-foreground)' }}>
            Atomic Design Hierarchy
          </Typography>
          <HStack wrap gap="md" className="text-sm">
            <HStack gap="xs" align="center">
              <Icon icon={FileText} size="sm" style={{ color: 'var(--color-info)' }} />
              <Typography variant="body2" style={{ color: 'var(--color-foreground)' }}>Page</Typography>
              <Typography variant="body2" style={{ color: 'var(--color-muted-foreground)' }}>→ Contains templates/organisms</Typography>
            </HStack>
            <HStack gap="xs" align="center">
              <Icon icon={Layout} size="sm" style={{ color: 'var(--color-primary)' }} />
              <Typography variant="body2" style={{ color: 'var(--color-foreground)' }}>Template</Typography>
              <Typography variant="body2" style={{ color: 'var(--color-muted-foreground)' }}>→ Page layouts</Typography>
            </HStack>
            <HStack gap="xs" align="center">
              <Icon icon={Layers} size="sm" style={{ color: 'var(--color-success)' }} />
              <Typography variant="body2" style={{ color: 'var(--color-foreground)' }}>Organism</Typography>
              <Typography variant="body2" style={{ color: 'var(--color-muted-foreground)' }}>→ Complex sections</Typography>
            </HStack>
            <HStack gap="xs" align="center">
              <Icon icon={Component} size="sm" style={{ color: 'var(--color-warning)' }} />
              <Typography variant="body2" style={{ color: 'var(--color-foreground)' }}>Molecule</Typography>
              <Typography variant="body2" style={{ color: 'var(--color-muted-foreground)' }}>→ Composite components</Typography>
            </HStack>
            <HStack gap="xs" align="center">
              <Icon icon={Circle} size="sm" style={{ color: 'var(--color-warning)' }} />
              <Typography variant="body2" style={{ color: 'var(--color-foreground)' }}>Atom</Typography>
              <Typography variant="body2" style={{ color: 'var(--color-muted-foreground)' }}>→ Basic elements</Typography>
            </HStack>
          </HStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

UIComponentTree.displayName = 'UIComponentTree';

export default UIComponentTree;
