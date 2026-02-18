/**
 * State Machine Diagram
 *
 * SVG visualization of the state machine showing states, transitions, and events.
 */

import React, { useMemo } from 'react';
import { Box, Typography } from '@almadar/ui';
import type { BuilderGraph, GraphNode } from './types';

export interface StateMachineDiagramProps {
  graph: BuilderGraph;
  width?: number;
  height?: number;
  className?: string;
  onStateClick?: (stateId: string) => void;
  selectedStateId?: string;
}

interface StatePosition {
  id: string;
  name: string;
  x: number;
  y: number;
  isInitial: boolean;
  isFinal: boolean;
  navigatesToPage?: string;
}

interface TransitionLine {
  id: string;
  fromState: string;
  toState: string;
  eventKey: string;
  eventName: string;
  guardExpression?: string;
  navigatesToPage?: string;
}

const STATE_RADIUS = 50;
const ARROW_SIZE = 10;

export const StateMachineDiagram: React.FC<StateMachineDiagramProps> = ({
  graph,
  width = 800,
  height = 500,
  className = '',
  onStateClick,
  selectedStateId,
}) => {
  // Extract state machine data from graph
  const { states, transitions, events } = useMemo(() => {
    const stateNodeIds = graph.nodeTypes['State'] || [];
    const eventNodeIds = graph.nodeTypes['Event'] || [];
    const transitionNodeIds = graph.nodeTypes['Transition'] || [];

    const stateNodes = stateNodeIds
      .map(id => graph.nodes[id])
      .filter(Boolean) as GraphNode[];

    const eventNodes = eventNodeIds
      .map(id => graph.nodes[id])
      .filter(Boolean) as GraphNode[];

    const transitionNodes = transitionNodeIds
      .map(id => graph.nodes[id])
      .filter(Boolean) as GraphNode[];

    // Build event lookup
    const eventLookup: Record<string, GraphNode> = {};
    eventNodes.forEach(e => { eventLookup[e.id] = e; });

    // Build state lookup
    const stateLookup: Record<string, GraphNode> = {};
    stateNodes.forEach(s => { stateLookup[s.id] = s; });

    // Parse transitions with their relationships
    const parsedTransitions: TransitionLine[] = [];

    transitionNodes.forEach(transition => {
      // Find TRANSITIONS_FROM, TRANSITIONS_TO, ON_EVENT relationships
      const fromRel = graph.relationships.find(
        r => r.type === 'TRANSITIONS_FROM' && r.source === transition.id
      );
      const toRel = graph.relationships.find(
        r => r.type === 'TRANSITIONS_TO' && r.source === transition.id
      );
      const eventRel = graph.relationships.find(
        r => r.type === 'ON_EVENT' && r.source === transition.id
      );
      const navRel = graph.relationships.find(
        r => r.type === 'NAVIGATES_TO' && r.source === transition.id
      );

      if (fromRel && toRel && eventRel) {
        const fromState = stateLookup[fromRel.target];
        const toState = stateLookup[toRel.target];
        const event = eventLookup[eventRel.target];
        const navPage = navRel ? graph.nodes[navRel.target] : null;

        if (fromState && toState && event) {
          parsedTransitions.push({
            id: transition.id,
            fromState: fromState.id,
            toState: toState.id,
            eventKey: event.properties.key as string,
            eventName: event.properties.name as string,
            navigatesToPage: navPage?.properties.name as string | undefined,
          });
        }
      }
    });

    return {
      states: stateNodes,
      transitions: parsedTransitions,
      events: eventNodes,
    };
  }, [graph]);

  // Calculate state positions in a circle layout
  const statePositions = useMemo((): StatePosition[] => {
    if (states.length === 0) return [];

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - STATE_RADIUS - 60;

    // Find initial state to place at top
    const initialIndex = states.findIndex(s => s.properties.isInitial);
    const startAngle = -Math.PI / 2; // Start from top

    return states.map((state, index) => {
      // Adjust index so initial state is at top
      const adjustedIndex = initialIndex >= 0
        ? (index - initialIndex + states.length) % states.length
        : index;

      const angle = startAngle + (adjustedIndex * 2 * Math.PI) / states.length;

      // Check for NAVIGATES_TO from state
      const navRel = graph.relationships.find(
        r => r.type === 'NAVIGATES_TO' && r.source === state.id
      );
      const navPage = navRel ? graph.nodes[navRel.target] : null;

      return {
        id: state.id,
        name: state.properties.name as string,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        isInitial: !!state.properties.isInitial,
        isFinal: !!state.properties.isFinal,
        navigatesToPage: navPage?.properties.name as string | undefined,
      };
    });
  }, [states, width, height, graph]);

  // Create position lookup
  const positionLookup = useMemo(() => {
    const lookup: Record<string, StatePosition> = {};
    statePositions.forEach(p => { lookup[p.id] = p; });
    return lookup;
  }, [statePositions]);

  // Calculate curved path for transition arrow
  const getTransitionPath = (from: StatePosition, to: StatePosition, index: number, total: number) => {
    if (from.id === to.id) {
      // Self-loop
      const loopRadius = 30;
      return `M ${from.x} ${from.y - STATE_RADIUS}
              C ${from.x - loopRadius} ${from.y - STATE_RADIUS - loopRadius * 2}
                ${from.x + loopRadius} ${from.y - STATE_RADIUS - loopRadius * 2}
                ${from.x} ${from.y - STATE_RADIUS}`;
    }

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Normalize direction
    const nx = dx / dist;
    const ny = dy / dist;

    // Start and end points on circle edges
    const startX = from.x + nx * STATE_RADIUS;
    const startY = from.y + ny * STATE_RADIUS;
    const endX = to.x - nx * STATE_RADIUS;
    const endY = to.y - ny * STATE_RADIUS;

    // Calculate control point for curve (offset perpendicular to line)
    const offset = (index - (total - 1) / 2) * 30;
    const perpX = -ny * offset;
    const perpY = nx * offset;
    const midX = (startX + endX) / 2 + perpX;
    const midY = (startY + endY) / 2 + perpY;

    return `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;
  };

  // Get label position for transition
  const getLabelPosition = (from: StatePosition, to: StatePosition, index: number, total: number) => {
    if (from.id === to.id) {
      return { x: from.x, y: from.y - STATE_RADIUS - 50 };
    }

    const offset = (index - (total - 1) / 2) * 30;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const perpX = -(dy / dist) * offset;
    const perpY = (dx / dist) * offset;

    return {
      x: (from.x + to.x) / 2 + perpX,
      y: (from.y + to.y) / 2 + perpY - 10,
    };
  };

  // Group transitions by from-to pair
  const groupedTransitions = useMemo(() => {
    const groups: Record<string, TransitionLine[]> = {};
    transitions.forEach(t => {
      const key = `${t.fromState}-${t.toState}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(t);
    });
    return groups;
  }, [transitions]);

  if (states.length === 0) {
    return (
      <Box className={`flex items-center justify-center ${className}`} style={{ width, height }}>
        <Typography variant="body2" style={{ color: 'var(--color-muted-foreground)' }}>No states defined</Typography>
      </Box>
    );
  }

  return (
    <svg
      width={width}
      height={height}
      className={`rounded-lg ${className}`}
      style={{ backgroundColor: 'var(--color-card)' }}
      viewBox={`0 0 ${width} ${height}`}
    >
      {/* Definitions */}
      <defs>
        {/* Arrow marker */}
        <marker
          id="arrowhead"
          markerWidth={ARROW_SIZE}
          markerHeight={ARROW_SIZE}
          refX={ARROW_SIZE - 2}
          refY={ARROW_SIZE / 2}
          orient="auto"
        >
          <polygon
            points={`0 0, ${ARROW_SIZE} ${ARROW_SIZE / 2}, 0 ${ARROW_SIZE}`}
            fill="#8b5cf6"
          />
        </marker>

        {/* Gradient for states */}
        <linearGradient id="stateGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>

        <linearGradient id="initialGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        <linearGradient id="finalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        <linearGradient id="selectedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>

        {/* Drop shadow */}
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Title */}
      <text x={width / 2} y="30" textAnchor="middle" className="text-lg font-semibold" style={{ fill: 'var(--color-foreground)' }}>
        State Machine Diagram
      </text>

      {/* Legend */}
      <g transform="translate(20, 50)">
        <circle cx="10" cy="10" r="8" fill="url(#initialGradient)" />
        <text x="25" y="14" className="text-xs" style={{ fill: 'var(--color-muted-foreground)' }}>Initial</text>

        <circle cx="10" cy="30" r="8" fill="url(#stateGradient)" />
        <text x="25" y="34" className="text-xs" style={{ fill: 'var(--color-muted-foreground)' }}>State</text>

        <circle cx="10" cy="50" r="8" fill="url(#finalGradient)" />
        <text x="25" y="54" className="text-xs" style={{ fill: 'var(--color-muted-foreground)' }}>Final</text>

        <line x1="0" y1="70" x2="20" y2="70" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="25" y="74" className="text-xs" style={{ fill: 'var(--color-muted-foreground)' }}>Transition</text>
      </g>

      {/* Transitions (draw first so they're behind states) */}
      {Object.entries(groupedTransitions).map(([_key, transGroup]) => {
        const firstTrans = transGroup[0];
        const from = positionLookup[firstTrans.fromState];
        const to = positionLookup[firstTrans.toState];

        if (!from || !to) return null;

        return transGroup.map((trans, idx) => (
          <g key={trans.id}>
            {/* Transition line */}
            <path
              d={getTransitionPath(from, to, idx, transGroup.length)}
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              className="transition-all duration-200"
            />

            {/* Event label */}
            {(() => {
              const labelPos = getLabelPosition(from, to, idx, transGroup.length);
              return (
                <g transform={`translate(${labelPos.x}, ${labelPos.y})`}>
                  <rect
                    x="-40"
                    y="-10"
                    width="80"
                    height="20"
                    rx="4"
                    fill="#1f2937"
                    fillOpacity="0.9"
                  />
                  <text
                    textAnchor="middle"
                    y="4"
                    className="text-xs font-medium"
                    style={{ fill: 'var(--color-warning)' }}
                  >
                    {trans.eventKey}
                  </text>
                  {trans.navigatesToPage && (
                    <text
                      textAnchor="middle"
                      y="18"
                      className="text-[10px]"
                      style={{ fill: 'var(--color-info)' }}
                    >
                      → {trans.navigatesToPage}
                    </text>
                  )}
                </g>
              );
            })()}
          </g>
        ));
      })}

      {/* States */}
      {statePositions.map((state) => {
        const isSelected = state.id === selectedStateId;
        const gradient = isSelected
          ? 'url(#selectedGradient)'
          : state.isInitial
            ? 'url(#initialGradient)'
            : state.isFinal
              ? 'url(#finalGradient)'
              : 'url(#stateGradient)';

        return (
          <g
            key={state.id}
            transform={`translate(${state.x}, ${state.y})`}
            onClick={() => onStateClick?.(state.id)}
            className="cursor-pointer"
            style={{ filter: 'url(#shadow)' }}
          >
            {/* Initial state indicator (double circle) */}
            {state.isInitial && (
              <circle
                r={STATE_RADIUS + 5}
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              />
            )}

            {/* Final state indicator (inner circle) */}
            {state.isFinal && (
              <circle
                r={STATE_RADIUS - 8}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
              />
            )}

            {/* State circle */}
            <circle
              r={STATE_RADIUS}
              fill={gradient}
              stroke={isSelected ? '#ec4899' : '#fff'}
              strokeWidth={isSelected ? 3 : 2}
              className="transition-all duration-200 hover:opacity-90"
            />

            {/* State name */}
            <text
              textAnchor="middle"
              y="5"
              className="text-sm font-semibold pointer-events-none"
              style={{ fill: 'var(--color-foreground)' }}
            >
              {state.name}
            </text>

            {/* Page indicator */}
            {state.navigatesToPage && (
              <text
                textAnchor="middle"
                y={STATE_RADIUS + 18}
                className="text-xs pointer-events-none"
                style={{ fill: 'var(--color-info)' }}
              >
                📄 {state.navigatesToPage}
              </text>
            )}
          </g>
        );
      })}

      {/* Stats */}
      <g transform={`translate(${width - 120}, ${height - 60})`}>
        <rect x="0" y="0" width="110" height="50" rx="6" fill="#1f2937" fillOpacity="0.8" />
        <text x="10" y="18" className="text-xs" style={{ fill: 'var(--color-foreground)' }}>
          States: {states.length}
        </text>
        <text x="10" y="32" className="text-xs" style={{ fill: 'var(--color-foreground)' }}>
          Events: {events.length}
        </text>
        <text x="10" y="46" className="text-xs" style={{ fill: 'var(--color-foreground)' }}>
          Transitions: {transitions.length}
        </text>
      </g>
    </svg>
  );
};

StateMachineDiagram.displayName = 'StateMachineDiagram';

export default StateMachineDiagram;
