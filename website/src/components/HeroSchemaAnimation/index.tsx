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
  const centerX = 250;
  const centerY = 200; // Trait Center
  const labelX = 305;
  const radiusX = 150; // Horizontal radius
  const radiusY = 80;  // Vertical radius (flattened oval)

  const { appName, entityName, pageName, traitName, states, transitions } = useMemo(
    () => extractVisualizationData(schema),
    [schema]
  );

  // Calculate State Positions (Circular/Oval Layout)
  const statePositions = useMemo(() => {
    const count = states.length;
    if (count === 0) return {};

    const positions: Record<string, { x: number; y: number }> = {};

    // Start angle: -180 (Left) to flow clockwise?
    // Or standard: distribute evenly.
    // For 4 states: Top-Left, Top-Right, Bottom-Right, Bottom-Left?
    // Let's use a standard circular distribution starting from roughly Top-Left (-135deg).

    // Actually, let's replicate the "U" shape or "Diamond" if possible.
    // Dynamic approach: Distribute across 360 degrees.
    const startAngle = -135 * (Math.PI / 180); // Top Left start

    states.forEach((state, i) => {
      // Evenly space them
      // If 4 states: 0, 1, 2, 3.
      // We want 1(Placed) at TL, 2(Prep) at BL, 3(Shipped) at BR, 4(Done) at TR? 
      // No, standard order: 1->2->3->4.
      // Let's just place them in a circle around the center.
      const angle = startAngle + (i * (2 * Math.PI)) / count;

      // Use oval to fit aspect ratio
      // But for generic N, circle is safest.
      // Let's manually map the strict 4-state fallback to corners to preserve the exact design approved.
      if (states.length === 4 && states[0].name === "placed") {
        if (i === 0) positions[state.name] = { x: 50, y: 150 }; // TL
        if (i === 1) positions[state.name] = { x: 50, y: 240 }; // BL
        if (i === 2) positions[state.name] = { x: 380, y: 240 }; // BR
        if (i === 3) positions[state.name] = { x: 380, y: 150 }; // TR
        return;
      }

      // Generic Layout
      const x = centerX + radiusX * Math.cos(angle);
      const y = centerY + radiusY * Math.sin(angle);
      positions[state.name] = { x, y };
    });

    return positions;
  }, [states]);

  // Helper to get definition for marker
  const markerId = "arrowhead";

  return (
    <div className={styles.container}>
      <svg
        viewBox="0 0 500 460"
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
          width="480"
          height="440"
          rx="12"
          stroke={muted}
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
          opacity="0.5"
        />
        <text
          x="25"
          y="35"
          textAnchor="start"
          fontSize="11"
          fontWeight="600"
          fill={muted}
          fontFamily="'IBM Plex Mono', monospace"
          className={styles.edgeLabel}
        >
          APP: {appName.toUpperCase()}
        </text>

        {/* === Connection Lines (Vertical Stack) === */}
        {/* Entity -> Trait */}
        <path
          d={`M${centerX} 340 L${centerX} 240`}
          stroke={gold}
          strokeWidth="2"
          className={styles.connectionLine}
          style={{ animationDelay: "1.0s" }}
        />
        {/* Trait -> Page */}
        <path
          d={`M${centerX} 160 L${centerX} 110`}
          stroke={gold}
          strokeWidth="2"
          className={styles.connectionLine}
          style={{ animationDelay: "1.2s" }}
        />




        {/* === Transitions (Arrows & Events) === */}
        {transitions.map((t, i) => {
          const start = statePositions[t.from];
          const end = statePositions[t.to];
          if (!start || !end) return null;

          // Simple straight line or curve?
          // "U" curve logic for generic is hard. 
          // Straight lines with arrowheads are robust for generic N.
          // But let's try a quad curve if they are far apart? Default to straight.
          // Special case for Order Fulfillment preserved via hardcoded fallback logic potentially... 
          // Actually, let's just use straight lines for generic and maybe specific overrides.

          // For 4-state corner logic (Fallback):
          let pathD = `M${start.x + 35} ${start.y + 15} L${end.x + 35} ${end.y + 15}`;

          // Customize for the specific visual requested earlier if matches
          if (states.length === 4 && states[0].name === "placed") {
            if (t.from === "placed" && t.to === "prep") pathD = `M85 185 L85 235`;
            if (t.from === "prep" && t.to === "shipped") pathD = `M135 265 Q250 340 365 265`;
            if (t.from === "shipped" && t.to === "done") pathD = `M415 235 L415 185`;
          }

          // Calculate label position (midpoint)
          // Midpoint logic depends on path... simplified for custom paths
          let lx = (start.x + end.x) / 2 + 35;
          let ly = (start.y + end.y) / 2 + 15;

          if (states.length === 4 && states[0].name === "placed") {
            if (t.from === "placed") { lx = 85; ly = 210; }
            if (t.from === "prep") { lx = 250; ly = 315; }
            if (t.from === "shipped") { lx = 415; ly = 210; }
          }

          return (
            <g key={`trans-${i}`} className={styles.fadeIn} style={{ animationDelay: `${2.4 + i * 0.2}s` }}>
              <path
                d={pathD}
                stroke={gold}
                strokeWidth="1.5"
                fill="none"
                markerEnd={`url(#${markerId})`}
              />
              {/* Event Label Box */}
              <rect x={lx - 20} y={ly - 7} width="40" height="14" rx="4" fill={isDark ? "#1e293b" : "#ffffff"} opacity="0.8" />
              <text x={lx} y={ly + 3} textAnchor="middle" fontSize="9" fill={gold} fontFamily="'IBM Plex Mono', monospace" fontWeight="600">
                {t.event}
              </text>
            </g>
          );
        })}


        {/* === Entity Node (Matter) === */}
        <g className={styles.nodeGroup} style={{ animationDelay: "0.3s" }}>
          <Box
            x={centerX - 30}
            y="340"
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
            y="370"
            textAnchor="start"
            fontSize="13"
            fontWeight="700"
            fontFamily="'Source Serif 4', Georgia, serif"
            fill={nodeText}
            className={styles.nodeLabel}
          >
            {entityName}
          </text>
          <text
            x={labelX}
            y="385"
            textAnchor="start"
            fontSize="10"
            fill={textColor}
            fontFamily="'IBM Plex Mono', monospace"
            className={styles.nodeLabel}
          >
            (Entity)
          </text>
        </g>

        {/* === Trait Node (Energy) === */}
        <g className={styles.nodeGroup} style={{ animationDelay: "0.6s" }}>
          <circle cx={centerX} cy="200" r="38" fill={traitBg} className={styles.fadeIn} />
          <circle cx={centerX} cy="200" r="42" stroke={gold} strokeWidth="1.5" fill="none" opacity="0.3" className={styles.pulseRing} />
          <Zap
            x={centerX - 28}
            y="172"
            width="56"
            height="56"
            stroke={gold}
            strokeWidth="2.5"
            fill={goldFill}
            strokeDasharray="1000" strokeDashoffset="1000"
            className={styles.nodeShape}
          />
          <text
            x={labelX}
            y="200"
            textAnchor="start"
            fontSize="13"
            fontWeight="700"
            fontFamily="'Source Serif 4', Georgia, serif"
            fill={nodeText}
            className={styles.nodeLabel}
          >
            {traitName}
          </text>
          <text
            x={labelX}
            y="215"
            textAnchor="start"
            fontSize="10"
            fill={textColor}
            fontFamily="'IBM Plex Mono', monospace"
            className={styles.nodeLabel}
          >
            (Trait)
          </text>
        </g>

        {/* === Page Node (Space) === */}
        <g className={styles.nodeGroup} style={{ animationDelay: "0.9s" }}>
          <Layout
            x={centerX - 30}
            y="50"
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
            y="80"
            textAnchor="start"
            fontSize="13"
            fontWeight="700"
            fontFamily="'Source Serif 4', Georgia, serif"
            fill={nodeText}
            className={styles.nodeLabel}
          >
            {pageName}
          </text>
          <text
            x={labelX}
            y="95"
            textAnchor="start"
            fontSize="10"
            fill={textColor}
            fontFamily="'IBM Plex Mono', monospace"
            className={styles.nodeLabel}
          >
            (Page)
          </text>
        </g>

        {/* === State Nodes (Pills) === */}
        {states.map((state, i) => {
          const pos = statePositions[state.name];
          if (!pos) return null;

          const isTerminal = state.isTerminal || state.isFinal;
          const strokeColor = isTerminal ? gold : (state.name === 'placed' ? muted : teal);
          const fillColor = isTerminal ? goldFill : (state.name === 'placed' ? mutedFill : tealFill);

          return (
            <g key={state.name} className={styles.nodeGroup} style={{ animationDelay: `${1.4 + i * 0.1}s` }}>
              <rect
                x={pos.x}
                y={pos.y}
                width="70"
                height="30"
                rx="15"
                stroke={strokeColor}
                strokeWidth="1.5"
                fill={fillColor}
                className={styles.nodeShape}
              />
              <text
                x={pos.x + 35}
                y={pos.y + 19}
                textAnchor="middle"
                fontSize="10"
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
          y="435"
          textAnchor="middle"
          fontSize="10"
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
