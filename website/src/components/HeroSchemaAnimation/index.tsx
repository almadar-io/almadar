import React, { useMemo } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { Box, Zap, Layout } from "lucide-react";
import styles from "./styles.module.css";
import type { OrbitalSchema, Orbital, Trait, State, Transition } from "./types";

/**
 * Helper to extract data from a potentially complex Schema/Orbital structure.
 */
function extractVisualizationData(schema?: OrbitalSchema) {
  // Default Data (Order Fulfillment)
  const defaultData = {
    appName: "Order Fulfillment App",
    entityName: "Order",
    pageName: "Track Order",
    traitName: "Fulfillment",
    states: [
      { name: "placed", isInitial: true },
      { name: "prep" }, // processing
      { name: "shipped" },
      { name: "done", isTerminal: true }, // delivered
    ] as State[],
    transitions: [
      { from: "placed", to: "prep", event: "verify" },
      { from: "prep", to: "shipped", event: "dispatch" },
      { from: "shipped", to: "done", event: "arrive" },
    ] as Transition[],
  };

  if (!schema || !schema.orbitals || schema.orbitals.length === 0) {
    return defaultData;
  }

  const appName = schema.name || "Application";
  const orbital = schema.orbitals[0];

  // Extract Entity Name
  let entityName = "Entity";
  if (typeof orbital.entity === "string") {
    entityName = orbital.entity.split(".").pop() || "Entity";
  } else {
    entityName = orbital.entity.name;
  }

  // Extract Page Name
  let pageName = "Page";
  if (orbital.pages && orbital.pages.length > 0) {
    const page = orbital.pages[0];
    if (typeof page === "string") {
      pageName = page.split(".").pop() || "Page";
    } else if ("name" in page) {
      pageName = page.name;
    } else if ("ref" in page) {
      pageName = page.ref.split(".").pop() || "Page";
    }
  }

  // Extract Trait & State Machine
  let traitName = "Trait";
  let states: State[] = [];
  let transitions: Transition[] = [];

  // Find a trait with a state machine
  const statefulTraitRef = orbital.traits.find((t) => {
    if (typeof t === "object" && "stateMachine" in t) return true;
    return false;
  });

  if (statefulTraitRef && typeof statefulTraitRef === "object" && "name" in statefulTraitRef) {
    traitName = statefulTraitRef.name;
    if (statefulTraitRef.stateMachine) {
      states = statefulTraitRef.stateMachine.states;
      transitions = statefulTraitRef.stateMachine.transitions;
    }
  } else if (orbital.traits.length > 0) {
    // Fallback to first trait name if no state machine found
    const t = orbital.traits[0];
    if (typeof t === "string") traitName = t;
    else if ("ref" in t) traitName = t.ref;
    else if ("name" in t) traitName = t.name;
  }

  // If no states found in schema, use default (or empty?)
  // User wants "viz would work", so if no states, maybe just show core?
  // But let's fallback to default if purely empty to avoid broken viz.
  if (states.length === 0) {
    return {
      appName,
      entityName,
      pageName,
      traitName,
      states: [],
      transitions: [],
    };
  }

  return { appName, entityName, pageName, traitName, states, transitions };
}

export default function HeroSchemaAnimation({ schema }: { schema?: OrbitalSchema }) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const teal = isDark ? "#2dd4bf" : "#0d9488";
  const gold = isDark ? "#e8c547" : "#b8941f";
  const muted = isDark ? "#475569" : "#94a3b8";
  const textColor = isDark ? "#cbd5e1" : "#475569";
  const nodeText = isDark ? "#f1f5f9" : "#0f172a";
  const tealFill = isDark ? "rgba(20, 184, 166, 0.15)" : "rgba(20, 184, 166, 0.1)";
  const goldFill = isDark ? "rgba(201, 162, 39, 0.15)" : "rgba(201, 162, 39, 0.1)";
  const mutedFill = isDark ? "rgba(71, 85, 105, 0.3)" : "rgba(148, 163, 184, 0.25)";
  const traitBg = isDark ? "rgba(20, 20, 25, 0.8)" : "rgba(255, 255, 255, 0.9)";

  // Layout Constants
  const viewBoxW = 600;
  const viewBoxH = 600;
  const centerX = viewBoxW / 2; // 300
  const centerY = viewBoxH / 2; // 300 - Trait Center
  const labelX = centerX + 55;
  const radiusX = 220;
  const radiusY = 140;

  const { appName, entityName, pageName, traitName, states, transitions } = useMemo(
    () => extractVisualizationData(schema),
    [schema]
  );

  // Calculate State Positions (Circular/Oval Layout)
  const statePositions = useMemo(() => {
    const count = states.length;
    if (count === 0) return {};

    const positions: Record<string, { x: number; y: number }> = {};
    const startAngle = -135 * (Math.PI / 180); // Top Left start

    states.forEach((state, i) => {
      const angle = startAngle + (i * (2 * Math.PI)) / count;
      const x = centerX + radiusX * Math.cos(angle);
      const y = centerY + radiusY * Math.sin(angle);
      positions[state.name] = { x, y };
    });

    return positions;
  }, [states]);

  // Helper to get definition for marker
  const markerId = "arrowhead";

  // Helper to shorten the end of a bezier curve so the arrow doesn't get buried
  const getShortenedEnd = (start: { x: number, y: number }, cp: { x: number, y: number }, end: { x: number, y: number }, shortenBy: number) => {
    // Vector from CP to End (approximate for Quad Bezier approaching end)
    // Actually for Quad Bezier B(t), tangent at t=1 is 2(P2 - P1).
    // So vector is End - CP.
    const dx = end.x - cp.x;
    const dy = end.y - cp.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len === 0) return end;

    // We want to stop 'shortenBy' pixels before 'end'.
    // t param is not linear with distance, but for small shortening near end, linear approx on the vector P1->P2 is okay ish?
    // Actually, we can just move the end point P2 back along the vector P1->P2.
    // New P2' = P2 - (v/len)*shortenBy
    const t = Math.max(0, len - shortenBy) / len;
    return {
      x: cp.x + dx * t,
      y: cp.y + dy * t
    };
  };

  return (
    <div className={styles.container}>
      <svg
        viewBox={`0 0 ${viewBoxW} ${viewBoxH}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
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
        </defs>

        {/* === Application Frame === */}
        <rect
          x="10"
          y="10"
          width={viewBoxW - 20}
          height={viewBoxH - 20}
          rx="16"
          stroke={muted}
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
          opacity="0.5"
        />
        <text
          x="30"
          y="40"
          textAnchor="start"
          fontSize="12"
          fontWeight="600"
          fill={muted}
          fontFamily="'IBM Plex Mono', monospace"
          className={styles.edgeLabel}
        >
          APP: {appName.toUpperCase()}
        </text>

        {/* === Vertical Connections (Entity-Trait-Page) === */}
        <path
          d={`M${centerX} ${centerY + 160} L${centerX} ${centerY + 40}`}
          stroke={gold}
          strokeWidth="2"
          className={styles.connectionLine}
          style={{ animationDelay: "1.0s" }}
        />
        <path
          d={`M${centerX} ${centerY - 40} L${centerX} ${centerY - 160}`}
          stroke={gold}
          strokeWidth="2"
          className={styles.connectionLine}
          style={{ animationDelay: "1.2s" }}
        />

        {/* === Transitions (Outward Arcs) === */}
        {transitions.map((t, i) => {
          const start = statePositions[t.from];
          const end = statePositions[t.to];
          if (!start || !end) return null;

          // Calculate Control Point for Outward Curve
          // 1. Midpoint of chord
          const mx = (start.x + end.x) / 2;
          const my = (start.y + end.y) / 2;

          // 2. Vector from Center to Midpoint
          let vcx = mx - centerX;
          let vcy = my - centerY;
          // Normalize
          const vLen = Math.sqrt(vcx * vcx + vcy * vcy);
          if (vLen > 0) {
            vcx /= vLen;
            vcy /= vLen;
          }

          // 3. Push control point OUT
          const curveFactor = 60; // How much to bulge out
          const cpx = mx + vcx * curveFactor;
          const cpy = my + vcy * curveFactor;

          // Shorten the end point straight towards the control point to expose the arrow
          // Target is a Pill (80x36), radius ~40/18.
          // We shorten by ~42px to be safe and land on edge.
          const shortEnd = getShortenedEnd(start, { x: cpx, y: cpy }, end, 42);

          // Quadratic Bezier: Start -> Control -> ShortEnd
          let pathD = `M${start.x} ${start.y} Q${cpx} ${cpy} ${shortEnd.x} ${shortEnd.y}`;

          // Label Position: Approx t=0.5 on the ORIGINAL construction (not shortened) so it stays centered visually
          const lx = 0.25 * start.x + 0.5 * cpx + 0.25 * end.x;
          const ly = 0.25 * start.y + 0.5 * cpy + 0.25 * end.y;

          return (
            <g key={`trans-${i}`} className={styles.fadeIn} style={{ animationDelay: `${2.4 + i * 0.2}s` }}>
              <path
                d={pathD}
                stroke={gold}
                strokeWidth="1.5"
                fill="none"
                markerEnd={`url(#${markerId})`}
              />
              {/* Event Label Box: Opaque to "sit on top" */}
              <rect
                x={lx - 30} y={ly - 9}
                width="60" height="18" rx="4"
                fill={isDark ? "#0f172a" : "#ffffff"}
                stroke={isDark ? "#334155" : "#e2e8f0"}
                strokeWidth="1"
                opacity="1"
              />
              <text x={lx} y={ly + 4} textAnchor="middle" fontSize="10" fill={gold} fontFamily="'IBM Plex Mono', monospace" fontWeight="600">
                {t.event}
              </text>
            </g>
          );
        })}


        {/* === Entity Node (Bottom) === */}
        <g className={styles.nodeGroup} style={{ animationDelay: "0.3s" }}>
          <Box
            x={centerX - 30}
            y={centerY + 160}
            width="60"
            height="60"
            stroke={teal}
            strokeWidth="2"
            fill={tealFill}
            strokeDasharray="1000" strokeDashoffset="1000"
            className={styles.nodeShape}
          />
          <text
            x={labelX}
            y={centerY + 190}
            textAnchor="start"
            fontSize="14"
            fontWeight="700"
            fontFamily="'Source Serif 4', Georgia, serif"
            fill={nodeText}
            className={styles.nodeLabel}
          >
            {entityName}
          </text>
          <text
            x={labelX}
            y={centerY + 205}
            textAnchor="start"
            fontSize="11"
            fill={textColor}
            fontFamily="'IBM Plex Mono', monospace"
            className={styles.nodeLabel}
          >
            (Entity)
          </text>
        </g>

        {/* === Trait Node (Center) === */}
        <g className={styles.nodeGroup} style={{ animationDelay: "0.6s" }}>
          <circle cx={centerX} cy={centerY} r="45" fill={traitBg} className={styles.fadeIn} />
          <circle cx={centerX} cy={centerY} r="50" stroke={gold} strokeWidth="1.5" fill="none" opacity="0.3" className={styles.pulseRing} />
          <Zap
            x={centerX - 30}
            y={centerY - 30}
            width="60"
            height="60"
            stroke={gold}
            strokeWidth="3"
            fill={goldFill}
            strokeDasharray="1000" strokeDashoffset="1000"
            className={styles.nodeShape}
          />
          <text
            x={labelX}
            y={centerY}
            textAnchor="start"
            fontSize="14"
            fontWeight="700"
            fontFamily="'Source Serif 4', Georgia, serif"
            fill={nodeText}
            className={styles.nodeLabel}
          >
            {traitName}
          </text>
          <text
            x={labelX}
            y={centerY + 15}
            textAnchor="start"
            fontSize="11"
            fill={textColor}
            fontFamily="'IBM Plex Mono', monospace"
            className={styles.nodeLabel}
          >
            (Trait)
          </text>
        </g>

        {/* === Page Node (Top) === */}
        <g className={styles.nodeGroup} style={{ animationDelay: "0.9s" }}>
          <Layout
            x={centerX - 30}
            y={centerY - 220}
            width="60"
            height="60"
            stroke={teal}
            strokeWidth="2"
            fill={tealFill}
            strokeDasharray="1000" strokeDashoffset="1000"
            className={styles.nodeShape}
          />
          <text
            x={labelX}
            y={centerY - 190}
            textAnchor="start"
            fontSize="14"
            fontWeight="700"
            fontFamily="'Source Serif 4', Georgia, serif"
            fill={nodeText}
            className={styles.nodeLabel}
          >
            {pageName}
          </text>
          <text
            x={labelX}
            y={centerY - 175}
            textAnchor="start"
            fontSize="11"
            fill={textColor}
            fontFamily="'IBM Plex Mono', monospace"
            className={styles.nodeLabel}
          >
            (Page)
          </text>
        </g>

        {/* === State Nodes === */}
        {states.map((state, i) => {
          const pos = statePositions[state.name];
          if (!pos) return null;

          const isTerminal = state.isTerminal || state.isFinal;
          const strokeColor = isTerminal ? gold : (state.name === 'placed' ? muted : teal);
          const fillColor = isTerminal ? goldFill : (state.name === 'placed' ? mutedFill : tealFill);

          return (
            <g key={state.name} className={styles.nodeGroup} style={{ animationDelay: `${1.4 + i * 0.1}s` }}>
              <rect
                x={pos.x - 40}
                y={pos.y - 18}
                width="80"
                height="36"
                rx="18"
                stroke={strokeColor}
                strokeWidth="2"
                fill={fillColor}
                className={styles.nodeShape}
              />
              <text
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                fontSize="11"
                fontWeight={isTerminal ? "700" : "500"}
                fill={isTerminal ? gold : (state.name === 'placed' ? textColor : teal)}
                fontFamily="'IBM Plex Mono', monospace"
                className={styles.nodeLabel}
              >
                {state.name}
              </text>
            </g>
          );
        })}

        {/* === Key Labels === */}
        <text
          x={centerX}
          y={viewBoxH - 25}
          textAnchor="middle"
          fontSize="11"
          fill={muted}
          opacity="0.7"
          fontFamily="'IBM Plex Mono', monospace"
          className={styles.edgeLabel}
          style={{ animationDelay: "3.2s" }}
        >
          Orbital Unit
        </text>

      </svg>
    </div>
  );
}
