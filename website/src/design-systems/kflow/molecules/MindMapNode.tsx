/**
 * MindMapNode Molecule Component
 *
 * SVG node for mindmap visualization with editing capabilities.
 *
 * Event Contract:
 * - Emits: UI:SELECT_NODE { nodeId }
 * - Emits: UI:EDIT_NODE { nodeId }
 * - Emits: UI:EXPAND_NODE { nodeId }
 * - Emits: UI:AI_GENERATE { nodeId }
 * - entityAware: true
 */

import React, { useState } from "react";
import { Edit2, ChevronDown, ChevronRight, Sparkles } from "lucide-react";
import { useEventBus } from '@almadar/ui';

export interface MindMapNodeData {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  content?: string;
  isExpanded?: boolean;
  hasChildren?: boolean;
  layer?: number;
  isSeed?: boolean;
}

export interface MindMapNodeProps {
  /** Node data */
  node: MindMapNodeData;
  /** Whether this node is selected */
  isSelected?: boolean;
  /** Whether this node is being edited */
  isEditing?: boolean;
  /** Current edit value */
  editValue?: string;
  /** Current zoom level */
  zoom?: number;
  /** Current pan offset */
  pan?: { x: number; y: number };
  /** Callback when node is clicked */
  onClick?: (node: MindMapNodeData) => void;
  /** Callback when node is double-clicked */
  onDoubleClick?: (node: MindMapNodeData) => void;
  /** Callback when edit is saved */
  onSaveEdit?: (nodeId: string, title: string) => void;
  /** Callback when edit is cancelled */
  onCancelEdit?: () => void;
  /** Callback when edit value changes */
  onEditChange?: (value: string) => void;
  /** Callback when expand/collapse is toggled */
  onToggleExpand?: (node: MindMapNodeData) => void;
  /** Callback for AI generation */
  onAIGenerate?: (node: MindMapNodeData) => void;
  /** Additional CSS classes */
  className?: string;
}

// Node colors by layer
const getNodeColor = (
  node: MindMapNodeData,
): { fill: string; stroke: string } => {
  if (node.isSeed) {
    return { fill: "#8b5cf6", stroke: "#7c3aed" };
  }
  const colors = [
    { fill: "#3b82f6", stroke: "#2563eb" },
    { fill: "#10b981", stroke: "#059669" },
    { fill: "#f59e0b", stroke: "#d97706" },
    { fill: "#ec4899", stroke: "#db2777" },
    { fill: "#06b6d4", stroke: "#0891b2" },
  ];
  const layerIndex = (node.layer || 0) % colors.length;
  return colors[layerIndex];
};

export const MindMapNode = ({
  node,
  isSelected = false,
  isEditing = false,
  editValue,
  zoom = 1,
  pan = { x: 0, y: 0 },
  onClick,
  onDoubleClick,
  onSaveEdit,
  onCancelEdit,
  onEditChange,
  onToggleExpand,
  onAIGenerate,
  className,
}: MindMapNodeProps) => {
  const eventBus = useEventBus();
  const [isHovered, setIsHovered] = useState(false);

  // Apply transformations
  const transformedX = (node.x - node.width / 2) * zoom + pan.x;
  const transformedY = (node.y - node.height / 2) * zoom + pan.y;
  const transformedWidth = node.width * zoom;
  const transformedHeight = node.height * zoom;

  const colors = getNodeColor(node);

  const handleClick = () => {
    eventBus.emit("UI:SELECT_NODE", { nodeId: node.id, entity: "Note" });
    onClick?.(node);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    eventBus.emit("UI:EDIT_NODE", { nodeId: node.id, entity: "Note" });
    onDoubleClick?.(node);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSaveEdit?.(node.id, editValue || node.title);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onCancelEdit?.();
    }
  };

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    eventBus.emit("UI:EXPAND_NODE", {
      nodeId: node.id,
      expanded: !node.isExpanded,
    });
    onToggleExpand?.(node);
  };

  const handleAIGenerate = (e: React.MouseEvent) => {
    e.stopPropagation();
    eventBus.emit("UI:AI_GENERATE", { nodeId: node.id, entity: "Note" });
    onAIGenerate?.(node);
  };

  return (
    <g
      transform={`translate(${transformedX}, ${transformedY})`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`mindmap-node ${isSelected ? "selected" : ""} ${className || ""}`}
      style={{ cursor: "pointer" }}
    >
      {/* Node background */}
      <rect
        x={0}
        y={0}
        width={transformedWidth}
        height={transformedHeight}
        rx={8 * zoom}
        ry={8 * zoom}
        fill={colors.fill}
        stroke={colors.stroke}
        strokeWidth={(isSelected ? 3 : isHovered ? 2 : 1) * zoom}
        opacity={node.isExpanded === false && node.hasChildren ? 0.7 : 1}
        strokeDasharray={
          node.isExpanded === false && node.hasChildren ? "5,5" : "none"
        }
      />

      {/* Node title */}
      {isEditing ? (
        <foreignObject x={5} y={10} width={transformedWidth - 10} height={30}>
          <input
            type="text"
            value={editValue ?? node.title}
            onChange={(e) => onEditChange?.(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => onSaveEdit?.(node.id, editValue || node.title)}
            autoFocus
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              background: "rgba(255,255,255,0.9)",
              borderRadius: "4px",
              padding: "4px 8px",
              fontSize: `${Math.max(10, 12 * zoom)}px`,
              textAlign: "center",
            }}
          />
        </foreignObject>
      ) : (
        <text
          x={transformedWidth / 2}
          y={transformedHeight / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize={Math.max(10, 12 * zoom)}
          fontWeight={node.isSeed ? "bold" : "normal"}
        >
          {node.title.length > 20
            ? node.title.slice(0, 20) + "..."
            : node.title}
        </text>
      )}

      {/* Action buttons (visible on hover) */}
      {isHovered && !isEditing && (
        <>
          {/* Edit button */}
          <foreignObject x={5} y={5} width={20} height={20}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDoubleClick?.(node);
              }}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                background: "rgba(255,255,255,0.9)",
                borderRadius: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="Edit"
            >
              <Edit2 size={12} color="#374151" />
            </button>
          </foreignObject>

          {/* AI Generate button */}
          <foreignObject x={transformedWidth - 25} y={5} width={20} height={20}>
            <button
              onClick={handleAIGenerate}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                background: "rgba(255,255,255,0.9)",
                borderRadius: "4px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="AI Generate Children"
            >
              <Sparkles size={12} color="#8b5cf6" />
            </button>
          </foreignObject>

          {/* Expand/Collapse button */}
          {node.hasChildren && (
            <foreignObject
              x={transformedWidth / 2 - 10}
              y={transformedHeight - 5}
              width={20}
              height={20}
            >
              <button
                onClick={handleToggleExpand}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title={node.isExpanded ? "Collapse" : "Expand"}
              >
                {node.isExpanded ? (
                  <ChevronDown size={12} color="#374151" />
                ) : (
                  <ChevronRight size={12} color="#374151" />
                )}
              </button>
            </foreignObject>
          )}
        </>
      )}
    </g>
  );
};

MindMapNode.displayName = "MindMapNode";
