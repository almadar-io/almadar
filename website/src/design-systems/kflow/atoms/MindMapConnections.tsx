/**
 * MindMapConnections Atom Component
 *
 * SVG lines connecting mindmap nodes.
 *
 * Event Contract:
 * - No events emitted (display-only SVG element)
 * - entityAware: false
 */

import React from "react";

export interface MindMapConnection {
  source: { x: number; y: number };
  target: { x: number; y: number };
  id?: string;
}

export interface MindMapConnectionsProps {
  /** Array of connections to render */
  connections: MindMapConnection[];
  /** Current zoom level */
  zoom?: number;
  /** Current pan offset */
  pan?: { x: number; y: number };
  /** Line color */
  strokeColor?: string;
  /** Line width */
  strokeWidth?: number;
  /** Additional CSS classes */
  className?: string;
}

export const MindMapConnections = ({
  connections,
  zoom = 1,
  pan = { x: 0, y: 0 },
  strokeColor = "#94a3b8",
  strokeWidth = 2,
  className,
}: MindMapConnectionsProps) => {
  return (
    <g className={className}>
      {connections.map((conn, index) => {
        const sourceX = conn.source.x * zoom + pan.x;
        const sourceY = conn.source.y * zoom + pan.y;
        const targetX = conn.target.x * zoom + pan.x;
        const targetY = conn.target.y * zoom + pan.y;

        // Calculate control points for curved line
        const midX = (sourceX + targetX) / 2;
        const midY = (sourceY + targetY) / 2;
        const dx = targetX - sourceX;
        const dy = targetY - sourceY;
        const curvature = 0.2;
        const controlX = midX - dy * curvature;
        const controlY = midY + dx * curvature;

        return (
          <path
            key={conn.id || index}
            d={`M ${sourceX} ${sourceY} Q ${controlX} ${controlY} ${targetX} ${targetY}`}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth * zoom}
            strokeLinecap="round"
            className="mindmap-connection transition-all duration-200"
          />
        );
      })}
    </g>
  );
};

MindMapConnections.displayName = "MindMapConnections";
