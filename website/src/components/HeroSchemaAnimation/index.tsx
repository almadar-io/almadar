import React from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { Box, Zap, Layout } from "lucide-react";
import styles from "./styles.module.css";

/**
 * HeroSchemaAnimation — A "living schema being drawn" visualization.
 *
 * Visualization Update (Standard State Machine):
 * - Entity Moved Down (y=350) to clear State Machine flow.
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
  const goldFill = isDark ? "rgba(201, 162, 39, 0.15)" : "rgba(201, 162, 39, 0.1)";
  const mutedFill = isDark ? "rgba(71, 85, 105, 0.3)" : "rgba(148, 163, 184, 0.25)";
  const traitBg = isDark ? "rgba(20, 20, 25, 0.8)" : "rgba(255, 255, 255, 0.9)";

  // Center X = 250 (ViewBox width 500)
  const centerX = 250;
  const labelX = 305;

  return (
    <div className={styles.container}>
      <svg
        viewBox="0 0 500 420" // Increased height to 420
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={gold} />
          </marker>
        </defs>

        {/* === Connection Lines (Vertical Stack) === */}
        {/* Entity -> Trait (Extended Line) */}
        <path
          d={`M${centerX} 340 L${centerX} 240`} // Start at 340 (Top of new Entity box)
          stroke={gold}
          strokeWidth="2"
          className={styles.connectionLine}
          style={{ animationDelay: "1.0s" }}
        />
        <path
          d={`M${centerX} 160 L${centerX} 110`}
          stroke={gold}
          strokeWidth="2"
          className={styles.connectionLine}
          style={{ animationDelay: "1.2s" }}
        />

        {/* === State Machine Control Lines (Trait -> States) === */}
        <path d={`M${centerX - 40} 190 L135 170`} stroke={teal} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" className={styles.connectionLine} style={{ animationDelay: "1.8s" }} />
        <path d={`M${centerX - 40} 210 L135 250`} stroke={teal} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" className={styles.connectionLine} style={{ animationDelay: "1.9s" }} />
        <path d={`M${centerX + 40} 210 L365 250`} stroke={teal} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" className={styles.connectionLine} style={{ animationDelay: "2.0s" }} />
        <path d={`M${centerX + 40} 190 L365 170`} stroke={teal} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" className={styles.connectionLine} style={{ animationDelay: "2.1s" }} />


        {/* === Transitions (Arrows & Events) === */}

        {/* 1. Placed -> Preparing (Down) */}
        <path
          d="M85 185 L85 235"
          stroke={gold}
          strokeWidth="1.5"
          markerEnd="url(#arrowhead)"
          className={styles.connectionLine}
          style={{ animationDelay: "2.4s" }}
        />
        <rect x="70" y="200" width="30" height="14" rx="4" fill={isDark ? "#1e293b" : "#ffffff"} opacity="0.8" />
        <text x="85" y="210" textAnchor="middle" fontSize="9" fill={gold} fontFamily="'IBM Plex Mono', monospace" fontWeight="600" style={{ animationDelay: "2.4s" }} className={styles.fadeIn}>
          verify
        </text>

        {/* 2. Preparing -> Shipped (Curve Under Entity) */}
        <path
          d="M135 265 Q250 340 365 265"
          stroke={gold}
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#arrowhead)"
          className={styles.connectionLine}
          style={{ animationDelay: "2.6s" }}
        />
        <rect x="230" y="305" width="40" height="14" rx="4" fill={isDark ? "#1e293b" : "#ffffff"} opacity="0.8" />
        <text x="250" y="315" textAnchor="middle" fontSize="9" fill={gold} fontFamily="'IBM Plex Mono', monospace" fontWeight="600" style={{ animationDelay: "2.6s" }} className={styles.fadeIn}>
          dispatch
        </text>

        {/* 3. Shipped -> Delivered (Up) */}
        <path
          d="M415 235 L415 185"
          stroke={gold}
          strokeWidth="1.5"
          markerEnd="url(#arrowhead)"
          className={styles.connectionLine}
          style={{ animationDelay: "2.8s" }}
        />
        <rect x="400" y="200" width="30" height="14" rx="4" fill={isDark ? "#1e293b" : "#ffffff"} opacity="0.8" />
        <text x="415" y="210" textAnchor="middle" fontSize="9" fill={gold} fontFamily="'IBM Plex Mono', monospace" fontWeight="600" style={{ animationDelay: "2.8s" }} className={styles.fadeIn}>
          arrive
        </text>


        {/* === Entity Node (Matter) — Bottom (MOVED DOWN) === */}
        <g className={styles.nodeGroup} style={{ animationDelay: "0.3s" }}>
          <Box
            x={centerX - 30}
            y="340" // Moved down from 290
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
            Order
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

        {/* === Trait Node (Energy) — Middle === */}
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
            Fulfillment
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
            Track Order
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
        {/* 1. Placed */}
        <g className={styles.nodeGroup} style={{ animationDelay: "1.4s" }}>
          <rect x="50" y="150" width="70" height="30" rx="15" stroke={muted} strokeWidth="1.5" fill={mutedFill} className={styles.nodeShape} />
          <text x="85" y="169" textAnchor="middle" fontSize="10" fontWeight="500" fill={textColor} fontFamily="'IBM Plex Mono', monospace" className={styles.nodeLabel}>placed</text>
        </g>
        {/* 2. Preparing */}
        <g className={styles.nodeGroup} style={{ animationDelay: "1.5s" }}>
          <rect x="50" y="240" width="70" height="30" rx="15" stroke={teal} strokeWidth="1.5" fill={tealFill} className={styles.nodeShape} />
          <text x="85" y="259" textAnchor="middle" fontSize="10" fontWeight="500" fill={teal} fontFamily="'IBM Plex Mono', monospace" className={styles.nodeLabel}>prep</text>
        </g>
        {/* 3. Shipped */}
        <g className={styles.nodeGroup} style={{ animationDelay: "1.6s" }}>
          <rect x="380" y="240" width="70" height="30" rx="15" stroke={teal} strokeWidth="1.5" fill={tealFill} className={styles.nodeShape} />
          <text x="415" y="259" textAnchor="middle" fontSize="10" fontWeight="500" fill={teal} fontFamily="'IBM Plex Mono', monospace" className={styles.nodeLabel}>shipped</text>
        </g>
        {/* 4. Delivered */}
        <g className={styles.nodeGroup} style={{ animationDelay: "1.7s" }}>
          <rect x="380" y="150" width="70" height="30" rx="15" stroke={gold} strokeWidth="1.5" fill={goldFill} className={styles.nodeShape} />
          <text x="415" y="169" textAnchor="middle" fontSize="10" fontWeight="700" fill={gold} fontFamily="'IBM Plex Mono', monospace" className={styles.nodeLabel}>done</text>
        </g>

      </svg>
    </div>
  );
}
