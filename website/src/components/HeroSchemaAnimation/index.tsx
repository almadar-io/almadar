import React from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { Box, Zap, Layout } from "lucide-react";
import styles from "./styles.module.css";

/**
 * HeroSchemaAnimation — A "living schema being drawn" visualization.
 *
 * Shows an Orbital schema assembling itself: entities appearing,
 * traits connecting, pages binding — like a blueprint being sketched.
 *
 * Visualization Update (Orbit Layout):
 * - Trait (Center): Framed by state machine arcs (Eye/Orbit shape)
 * - State Machine: Symmetric arcs (Top/Bottom) connecting Idle <-> Active
 * - Hierarchy: Vertical Stack (Entity -> Trait -> Page)
 */
export default function HeroSchemaAnimation() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const teal = isDark ? "#2dd4bf" : "#0d9488";
  const gold = isDark ? "#e8c547" : "#b8941f";
  const muted = isDark ? "#475569" : "#94a3b8";
  const textColor = isDark ? "#cbd5e1" : "#475569";
  const nodeText = isDark ? "#f1f5f9" : "#0f172a";
  const tealFill = isDark ? "rgba(20, 184, 166, 0.15)" : "rgba(20, 184, 166, 0.1)";
  const goldFill = isDark ? "rgba(201, 162, 39, 0.15)" : "rgba(201, 162, 39, 0.1)"; // Background for trait
  const mutedFill = isDark ? "rgba(71, 85, 105, 0.3)" : "rgba(148, 163, 184, 0.25)";
  const traitBg = isDark ? "rgba(20, 20, 25, 0.8)" : "rgba(255, 255, 255, 0.9)"; // Solid bg to pop trait

  // Center X = 250 (ViewBox width 500)
  const centerX = 250;
  const labelX = 285; // Closer to icon

  return (
    <div className={styles.container}>
      <svg
        viewBox="0 0 500 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        {/* === Connection Lines (drawn first) === */}

        {/* Entity (Bottom) -> Trait (Middle) */}
        <path
          d={`M${centerX} 290 L${centerX} 240`}
          stroke={gold}
          strokeWidth="2"
          className={styles.connectionLine}
          style={{ animationDelay: "1.0s" }}
        />

        {/* Trait (Middle) -> Page (Top) */}
        <path
          d={`M${centerX} 160 L${centerX} 110`}
          stroke={gold}
          strokeWidth="2"
          className={styles.connectionLine}
          style={{ animationDelay: "1.2s" }}
        />

        {/* === State Machine Orbit Arcs (The "Eye") === */}

        {/* Upper Arc: Idle -> Active */}
        <path
          d="M125 200 Q250 120 375 200"
          stroke={teal}
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 4"
          className={styles.connectionLine}
          style={{ animationDelay: "2.0s", opacity: 0.6 }}
        />

        {/* Lower Arc: Active -> Idle */}
        <path
          d="M375 200 Q250 280 125 200"
          stroke={teal}
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 4"
          className={styles.connectionLine}
          style={{ animationDelay: "2.2s", opacity: 0.6 }}
        />

        {/* Transition flow arrows on arcs? Maybe just the dashes are enough for now to keep it clean */}


        {/* === Entity Node (Matter) — Bottom === */}
        <g className={styles.nodeGroup} style={{ animationDelay: "0.3s" }}>
          <Box
            x={centerX - 30}
            y="290"
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
            y="320"
            textAnchor="start"
            fontSize="13"
            fontWeight="700"
            fontFamily="'Source Serif 4', Georgia, serif"
            fill={nodeText}
            className={styles.nodeLabel}
          >
            Entity
          </text>
          <text
            x={labelX}
            y="335"
            textAnchor="start"
            fontSize="10"
            fill={textColor}
            fontFamily="'IBM Plex Mono', monospace"
            className={styles.nodeLabel}
          >
            (Matter)
          </text>
        </g>

        {/* === Trait Node (Energy) — Middle (The Core) === */}
        <g className={styles.nodeGroup} style={{ animationDelay: "0.6s" }}>
          {/* Solid background to pop */}
          <circle
            cx={centerX}
            cy="200"
            r="38"
            fill={traitBg}
            className={styles.fadeIn}
          />
          {/* Pulse ring */}
          <circle
            cx={centerX}
            cy="200"
            r="42"
            stroke={gold}
            strokeWidth="1.5"
            fill="none"
            opacity="0.3"
            className={styles.pulseRing}
          />
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
            Trait
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
            (Energy)
          </text>
        </g>

        {/* === Page Node (Space) — Top === */}
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
            Page
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
            (Space)
          </text>
        </g>

        {/* === State Nodes === */}
        <g className={styles.nodeGroup} style={{ animationDelay: "1.8s" }}>
          {/* State: idle */}
          <circle
            cx="100"
            cy="200"
            r="25"
            stroke={muted}
            strokeWidth="2"
            fill={mutedFill}
            className={styles.nodeShape}
          />
          <text
            x="100"
            y="204"
            textAnchor="middle"
            fontSize="10"
            fontWeight="500"
            fill={textColor}
            fontFamily="'IBM Plex Mono', monospace"
            className={styles.nodeLabel}
          >
            idle
          </text>
        </g>

        <g className={styles.nodeGroup} style={{ animationDelay: "2.0s" }}>
          {/* State: active */}
          <circle
            cx="400"
            cy="200"
            r="25"
            stroke={teal}
            strokeWidth="2"
            fill={tealFill}
            className={styles.nodeShape}
          />
          <text
            x="400"
            y="204"
            textAnchor="middle"
            fontSize="10"
            fill={teal}
            fontFamily="'IBM Plex Mono', monospace"
            fontWeight="600"
            className={styles.nodeLabel}
          >
            active
          </text>
        </g>

        {/* === Key Labels === */}
        <text
          x={centerX}
          y="370"
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
