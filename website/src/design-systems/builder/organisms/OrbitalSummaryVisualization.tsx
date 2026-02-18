/**
 * OrbitalSummaryVisualization
 *
 * Animated SVG visualization of an OrbitalSchema's business structure.
 * Renders the Entity → Trait → Page orbital diagram with state machine
 * transitions as curved arrows.
 *
 * Accepts a full or summarized OrbitalSchema — works with both since
 * summaries are the same type.
 *
 * Ported from almadar/website HeroSchemaAnimation, adapted for the
 * builder design system (CSS variables, no Docusaurus deps).
 */

import React, { useMemo } from "react";
import { Box, Typography, LoadingState, EmptyState } from "@almadar/ui";
import type {
  OrbitalSchema,
  OrbitalDefinition,
  Trait,
  TraitRef,
  State,
  Transition,
  Page,
  PageRef,
} from "@almadar/core";
import { isInlineTrait } from "@almadar/core";

// ============================================================================
// Props
// ============================================================================

export interface OrbitalSummaryVisualizationEntity {
  schema: OrbitalSchema;
  /** Which orbital index to visualize (default: 0) */
  orbitalIndex?: number;
}

export interface OrbitalSummaryVisualizationProps {
  entity: OrbitalSummaryVisualizationEntity;
  className?: string;
  isLoading?: boolean;
  error?: Error | null;
}

// ============================================================================
// Extraction
// ============================================================================

interface VisualizationData {
  appName: string;
  entityName: string;
  pageName: string;
  traitName: string;
  states: State[];
  transitions: Array<{ from: string; to: string; event: string }>;
}

function extractVisualizationData(
  schema: OrbitalSchema,
  orbitalIndex: number
): VisualizationData {
  const fallback: VisualizationData = {
    appName: schema.name || "Application",
    entityName: "Entity",
    pageName: "Page",
    traitName: "Trait",
    states: [],
    transitions: [],
  };

  if (!schema.orbitals || schema.orbitals.length === 0) return fallback;

  const orbital = schema.orbitals[Math.min(orbitalIndex, schema.orbitals.length - 1)];
  const appName = schema.name || "Application";

  // Entity name
  let entityName = "Entity";
  if (typeof orbital.entity === "string") {
    entityName = orbital.entity.split(".").pop() || "Entity";
  } else {
    entityName = orbital.entity.name;
  }

  // Page name
  let pageName = "Page";
  if (orbital.pages && orbital.pages.length > 0) {
    const page = orbital.pages[0];
    if (typeof page === "string") {
      pageName = page.split(".").pop() || "Page";
    } else if (typeof page === "object" && "name" in page) {
      pageName = (page as Page).name;
    } else if (typeof page === "object" && "ref" in page) {
      pageName = (page as { ref: string }).ref.split(".").pop() || "Page";
    }
  }

  // Trait + state machine
  let traitName = "Trait";
  let states: State[] = [];
  let transitions: Array<{ from: string; to: string; event: string }> = [];

  const statefulTrait = orbital.traits.find(
    (t): t is Trait => typeof t === "object" && "stateMachine" in t && !!((t as Trait).stateMachine)
  );

  if (statefulTrait) {
    traitName = statefulTrait.name;
    states = statefulTrait.stateMachine?.states ?? [];
    transitions = (statefulTrait.stateMachine?.transitions ?? []).map((t) => ({
      from: t.from,
      to: t.to,
      event: t.event,
    }));
  } else if (orbital.traits.length > 0) {
    const t = orbital.traits[0];
    if (typeof t === "string") traitName = t;
    else if (typeof t === "object" && "ref" in t) traitName = (t as { ref: string }).ref;
    else if (typeof t === "object" && "name" in t) traitName = (t as Trait).name;
  }

  return { appName, entityName, pageName, traitName, states, transitions };
}

// ============================================================================
// Component
// ============================================================================

const VIEW_W = 600;
const VIEW_H = 720;
const CENTER_X = VIEW_W / 2;
const CENTER_Y = VIEW_H / 2;
const RADIUS = 180;

export function OrbitalSummaryVisualization({
  entity,
  className,
  isLoading,
  error,
}: OrbitalSummaryVisualizationProps) {
  if (isLoading) return <LoadingState message="Loading schema..." />;
  if (error) return <Typography className="text-[var(--color-danger)]">{error.message}</Typography>;
  if (!entity?.schema) return <EmptyState title="No schema" description="Provide an OrbitalSchema to visualize." />;

  const { schema, orbitalIndex = 0 } = entity;

  const data = useMemo(
    () => extractVisualizationData(schema, orbitalIndex),
    [schema, orbitalIndex]
  );

  const statePositions = useMemo(() => {
    const count = data.states.length;
    if (count === 0) return {} as Record<string, { x: number; y: number; angle: number }>;

    const positions: Record<string, { x: number; y: number; angle: number }> = {};
    const startAngle = Math.PI;

    data.states.forEach((state, i) => {
      const angle = startAngle + (i * (2 * Math.PI)) / count;
      positions[state.name] = {
        x: CENTER_X + RADIUS * Math.cos(angle),
        y: CENTER_Y + RADIUS * Math.sin(angle),
        angle,
      };
    });

    return positions;
  }, [data.states]);

  // Colors from CSS variables
  const teal = "var(--color-primary, #0d9488)";
  const gold = "var(--color-warning, #b8941f)";
  const muted = "var(--color-muted-foreground, #94a3b8)";
  const textColor = "var(--color-muted-foreground, #475569)";
  const nodeText = "var(--color-foreground, #0f172a)";
  const tealFill = "rgba(20, 184, 166, 0.1)";
  const goldFill = "rgba(201, 162, 39, 0.15)";
  const mutedFill = "rgba(148, 163, 184, 0.25)";
  const traitBg = "var(--color-surface, rgba(255, 255, 255, 0.9))";
  const labelBg = "var(--color-background, #ffffff)";
  const labelBorder = "var(--color-border, #e2e8f0)";

  const markerId = `arrowhead-${orbitalIndex}`;
  const maskId = `mask-${orbitalIndex}`;

  const getControlPoint = (angle1: number, angle2: number) => {
    let diff = angle2 - angle1;
    while (diff <= -Math.PI) diff += 2 * Math.PI;
    while (diff > Math.PI) diff -= 2 * Math.PI;
    const midAngle = angle1 + diff / 2;
    const controlDist = RADIUS * 1.35;
    return {
      x: CENTER_X + controlDist * Math.cos(midAngle),
      y: CENTER_Y + controlDist * Math.sin(midAngle),
    };
  };

  const getShortenedEnd = (
    start: { x: number; y: number },
    cp: { x: number; y: number },
    end: { x: number; y: number },
    shortenBy: number
  ) => {
    const dx = end.x - cp.x;
    const dy = end.y - cp.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len === 0) return end;
    const t = Math.max(0, len - shortenBy) / len;
    return { x: cp.x + dx * t, y: cp.y + dy * t };
  };

  return (
    <Box className={className} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", maxWidth: 600, height: "auto" }}
      >
        <defs>
          <marker
            id={markerId}
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={gold} />
          </marker>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="white" />
            {data.states.map((state) => {
              const pos = statePositions[state.name];
              if (!pos) return null;
              return (
                <rect
                  key={`mask-${state.name}`}
                  x={pos.x - 42}
                  y={pos.y - 20}
                  width="84"
                  height="40"
                  rx="18"
                  fill="black"
                />
              );
            })}
          </mask>

          <style>{`
            @keyframes osv-appear {
              0% { opacity: 0; transform: translateY(8px) scale(0.95); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes osv-draw {
              to { stroke-dashoffset: 0; }
            }
            @keyframes osv-fade {
              0% { opacity: 0; }
              100% { opacity: 1; }
            }
            @keyframes osv-connect {
              0% { stroke-dashoffset: 300; opacity: 0; }
              10% { opacity: 0.8; }
              100% { stroke-dashoffset: 0; opacity: 0.8; }
            }
            @keyframes osv-pulse {
              0%, 100% { r: 40; opacity: 0.3; }
              50% { r: 50; opacity: 0; }
            }
            .osv-node { opacity: 0; animation: osv-appear 0.8s cubic-bezier(0.4,0,0.2,1) forwards; }
            .osv-shape { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: osv-draw 1.5s cubic-bezier(0.4,0,0.2,1) forwards; }
            .osv-label { opacity: 0; animation: osv-fade 0.6s ease forwards; }
            .osv-conn { stroke-dasharray: 300; stroke-dashoffset: 300; opacity: 0; animation: osv-connect 1s cubic-bezier(0.4,0,0.2,1) forwards; }
            .osv-edge { opacity: 0; animation: osv-fade 0.8s ease forwards; }
            .osv-pulse { animation: osv-pulse 3s ease-in-out infinite; animation-delay: 2s; transform-origin: center; }
            .osv-fadein { opacity: 0; animation: osv-fade 0.6s ease forwards; }
          `}</style>
        </defs>

        {/* Application frame */}
        <rect
          x="10" y="10" width={VIEW_W - 20} height={VIEW_H - 20} rx="16"
          stroke={muted} strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.5"
        />
        <text
          x={30} y={40} textAnchor="start" fontSize="12" fontWeight="600"
          fill={muted} fontFamily="monospace"
          className="osv-edge" style={{ animationDelay: "0.2s" }}
        >
          APP: {data.appName.toUpperCase()}
        </text>

        {/* Vertical connections (Entity → Trait → Page) */}
        <g mask={`url(#${maskId})`}>
          <path
            d={`M${CENTER_X} ${CENTER_Y + 280} L${CENTER_X} ${CENTER_Y + 40}`}
            stroke={gold} strokeWidth="2"
            className="osv-conn" style={{ animationDelay: "1.0s" }}
          />
          <path
            d={`M${CENTER_X} ${CENTER_Y - 40} L${CENTER_X} ${CENTER_Y - 270}`}
            stroke={gold} strokeWidth="2"
            className="osv-conn" style={{ animationDelay: "1.2s" }}
          />
        </g>

        {/* Transition arrows */}
        {data.transitions.map((t, i) => {
          const start = statePositions[t.from];
          const end = statePositions[t.to];
          if (!start || !end) return null;

          const cp = getControlPoint(start.angle, end.angle);
          const dxS = cp.x - start.x;
          const dyS = cp.y - start.y;
          const lenS = Math.sqrt(dxS * dxS + dyS * dyS);
          const tS = Math.min(1, 45 / lenS);
          const shortStart = { x: start.x + dxS * tS, y: start.y + dyS * tS };
          const shortEnd = getShortenedEnd(start, cp, end, 48);
          const pathD = `M${shortStart.x} ${shortStart.y} Q${cp.x} ${cp.y} ${shortEnd.x} ${shortEnd.y}`;

          return (
            <path
              key={`line-${i}`}
              d={pathD}
              stroke={gold} strokeWidth="1.5" fill="none"
              markerEnd={`url(#${markerId})`}
              className="osv-fadein"
              style={{ animationDelay: `${2.4 + i * 0.2}s` }}
            />
          );
        })}

        {/* Entity node (bottom) */}
        <g className="osv-node" style={{ animationDelay: "0.3s" }}>
          <rect
            x={CENTER_X - 30} y={CENTER_Y + 280} width="60" height="60" rx="8"
            stroke={teal} strokeWidth="2" fill={tealFill}
            className="osv-shape"
          />
          <text
            x={CENTER_X + 55} y={CENTER_Y + 310} textAnchor="start"
            fontSize="14" fontWeight="700" fontFamily="serif"
            fill={nodeText} className="osv-label"
          >
            {data.entityName}
          </text>
          <text
            x={CENTER_X + 55} y={CENTER_Y + 325} textAnchor="start"
            fontSize="11" fill={textColor} fontFamily="monospace" className="osv-label"
          >
            (Entity)
          </text>
        </g>

        {/* Trait node (center) */}
        <g className="osv-node" style={{ animationDelay: "0.6s" }}>
          <circle cx={CENTER_X} cy={CENTER_Y} r="45" fill={traitBg} className="osv-fadein" />
          <circle
            cx={CENTER_X} cy={CENTER_Y} r="50"
            stroke={gold} strokeWidth="1.5" fill="none" opacity="0.3"
            className="osv-pulse"
          />
          <polygon
            points={`${CENTER_X},${CENTER_Y - 25} ${CENTER_X + 22},${CENTER_Y + 15} ${CENTER_X - 22},${CENTER_Y + 15}`}
            stroke={gold} strokeWidth="2.5" fill={goldFill}
            className="osv-shape"
          />
          <text
            x={CENTER_X + 55} y={CENTER_Y} textAnchor="start"
            fontSize="14" fontWeight="700" fontFamily="serif"
            fill={nodeText} className="osv-label"
          >
            {data.traitName}
          </text>
          <text
            x={CENTER_X + 55} y={CENTER_Y + 15} textAnchor="start"
            fontSize="11" fill={textColor} fontFamily="monospace" className="osv-label"
          >
            (Trait)
          </text>
        </g>

        {/* Page node (top) */}
        <g className="osv-node" style={{ animationDelay: "0.9s" }}>
          <rect
            x={CENTER_X - 30} y={CENTER_Y - 330} width="60" height="60" rx="4"
            stroke={teal} strokeWidth="2" fill={tealFill}
            className="osv-shape"
          />
          <line
            x1={CENTER_X - 30} y1={CENTER_Y - 315} x2={CENTER_X + 30} y2={CENTER_Y - 315}
            stroke={teal} strokeWidth="1" opacity="0.5"
          />
          <text
            x={CENTER_X + 55} y={CENTER_Y - 300} textAnchor="start"
            fontSize="14" fontWeight="700" fontFamily="serif"
            fill={nodeText} className="osv-label"
          >
            {data.pageName}
          </text>
          <text
            x={CENTER_X + 55} y={CENTER_Y - 285} textAnchor="start"
            fontSize="11" fill={textColor} fontFamily="monospace" className="osv-label"
          >
            (Page)
          </text>
        </g>

        {/* State nodes */}
        {data.states.map((state, i) => {
          const pos = statePositions[state.name];
          if (!pos) return null;
          const isTerminal = state.isTerminal || state.isFinal;
          const isInitial = state.isInitial;
          const strokeColor = isTerminal ? gold : isInitial ? muted : teal;
          const fillColor = isTerminal ? goldFill : isInitial ? mutedFill : tealFill;
          const textFill = isTerminal ? gold : isInitial ? textColor : teal;

          return (
            <g key={state.name} className="osv-node" style={{ animationDelay: `${1.4 + i * 0.1}s` }}>
              <rect
                x={pos.x - 40} y={pos.y - 18} width="80" height="36" rx="18"
                stroke={strokeColor} strokeWidth="2" fill={fillColor}
                className="osv-shape"
              />
              <text
                x={pos.x} y={pos.y + 4} textAnchor="middle"
                fontSize="11" fontWeight={isTerminal ? "700" : "500"}
                fill={textFill} fontFamily="monospace" className="osv-label"
              >
                {state.name}
              </text>
            </g>
          );
        })}

        {/* Transition labels (on top of arrows) */}
        {data.transitions.map((t, i) => {
          const start = statePositions[t.from];
          const end = statePositions[t.to];
          if (!start || !end) return null;

          const cp = getControlPoint(start.angle, end.angle);
          const lx = 0.25 * start.x + 0.5 * cp.x + 0.25 * end.x;
          const ly = 0.25 * start.y + 0.5 * cp.y + 0.25 * end.y;

          return (
            <g key={`label-${i}`} className="osv-fadein" style={{ animationDelay: `${2.4 + i * 0.2}s` }}>
              <rect
                x={lx - 35} y={ly - 10} width="70" height="20" rx="4"
                fill={labelBg} stroke={labelBorder} strokeWidth="1"
              />
              <text
                x={lx} y={ly + 4} textAnchor="middle" fontSize="10"
                fill={gold} fontFamily="monospace" fontWeight="600"
              >
                {t.event}
              </text>
            </g>
          );
        })}

        {/* Bottom label */}
        <text
          x={24} y={VIEW_H - 24} textAnchor="start" fontSize="11"
          fill={muted} opacity="0.7" fontFamily="monospace"
          className="osv-edge" style={{ animationDelay: "3.2s" }}
        >
          Orbital Unit = Entity + Traits + Pages
        </text>
      </svg>
    </Box>
  );
}

OrbitalSummaryVisualization.displayName = "OrbitalSummaryVisualization";
