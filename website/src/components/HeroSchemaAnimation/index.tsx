import React from "react";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./styles.module.css";

/**
 * HeroSchemaAnimation — A "living schema being drawn" visualization.
 *
 * Replaces the Three.js 3D orbital with a lightweight CSS/SVG animation
 * that shows an Orbital schema assembling itself: entities appearing,
 * traits connecting, pages binding — like a blueprint being sketched.
 *
 * Design philosophy: "watch behavior being modeled" not "cool particle effect"
 */
export default function HeroSchemaAnimation() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const teal = isDark ? "#2dd4bf" : "#14b8a6";
  const gold = isDark ? "#e8c547" : "#c9a227";
  const muted = isDark ? "#334155" : "#cbd5e1";
  const textColor = isDark ? "#94a3b8" : "#64748b";
  const nodeText = isDark ? "#f8fafc" : "#0f172a";

  return (
    <div className={styles.container}>
      <svg
        viewBox="0 0 480 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        {/* === Connection Lines (drawn first, appear with path animation) === */}

        {/* Entity -> Trait connection */}
        <path
          d="M160 120 L240 200"
          stroke={gold}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className={styles.connectionLine}
          style={{ animationDelay: "1.2s" }}
        />

        {/* Entity -> Page connection */}
        <path
          d="M320 120 L240 200"
          stroke={gold}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className={styles.connectionLine}
          style={{ animationDelay: "1.4s" }}
        />

        {/* Trait -> State nodes */}
        <path
          d="M240 230 L160 300"
          stroke={teal}
          strokeWidth="1"
          className={styles.connectionLine}
          style={{ animationDelay: "2.0s" }}
        />
        <path
          d="M240 230 L320 300"
          stroke={teal}
          strokeWidth="1"
          className={styles.connectionLine}
          style={{ animationDelay: "2.2s" }}
        />

        {/* State transition arrow */}
        <path
          d="M180 300 C200 260 280 260 300 300"
          stroke={gold}
          strokeWidth="1.5"
          fill="none"
          className={styles.connectionLine}
          style={{ animationDelay: "2.8s" }}
        />
        {/* Arrow head */}
        <path
          d="M295 293 L300 300 L292 299"
          stroke={gold}
          strokeWidth="1.5"
          fill="none"
          className={styles.connectionLine}
          style={{ animationDelay: "2.8s" }}
        />

        {/* === Entity Node (Matter) === */}
        <g className={styles.nodeGroup} style={{ animationDelay: "0.3s" }}>
          {/* Diamond shape for Entity */}
          <path
            d="M160 80 L200 120 L160 160 L120 120 Z"
            stroke={teal}
            strokeWidth="2"
            fill={isDark ? "rgba(20, 184, 166, 0.08)" : "rgba(20, 184, 166, 0.05)"}
            className={styles.nodeShape}
          />
          <text
            x="160"
            y="117"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fontFamily="'Source Serif 4', Georgia, serif"
            fill={nodeText}
            className={styles.nodeLabel}
          >
            Entity
          </text>
          <text
            x="160"
            y="132"
            textAnchor="middle"
            fontSize="8"
            fill={textColor}
            fontFamily="'IBM Plex Mono', monospace"
            className={styles.nodeLabel}
          >
            (Matter)
          </text>
        </g>

        {/* === Page Node (Space) === */}
        <g className={styles.nodeGroup} style={{ animationDelay: "0.6s" }}>
          {/* Rounded rect for Page */}
          <rect
            x="280"
            y="90"
            width="80"
            height="60"
            rx="8"
            stroke={teal}
            strokeWidth="2"
            fill={isDark ? "rgba(20, 184, 166, 0.08)" : "rgba(20, 184, 166, 0.05)"}
            className={styles.nodeShape}
          />
          <text
            x="320"
            y="117"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fontFamily="'Source Serif 4', Georgia, serif"
            fill={nodeText}
            className={styles.nodeLabel}
          >
            Page
          </text>
          <text
            x="320"
            y="132"
            textAnchor="middle"
            fontSize="8"
            fill={textColor}
            fontFamily="'IBM Plex Mono', monospace"
            className={styles.nodeLabel}
          >
            (Space)
          </text>
        </g>

        {/* === Trait Node (Energy) — Central hub === */}
        <g className={styles.nodeGroup} style={{ animationDelay: "0.9s" }}>
          {/* Circle for Trait */}
          <circle
            cx="240"
            cy="210"
            r="35"
            stroke={gold}
            strokeWidth="2"
            fill={isDark ? "rgba(201, 162, 39, 0.08)" : "rgba(201, 162, 39, 0.05)"}
            className={styles.nodeShape}
          />
          {/* Inner pulse ring */}
          <circle
            cx="240"
            cy="210"
            r="35"
            stroke={gold}
            strokeWidth="1"
            fill="none"
            opacity="0.3"
            className={styles.pulseRing}
          />
          <text
            x="240"
            y="207"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fontFamily="'Source Serif 4', Georgia, serif"
            fill={nodeText}
            className={styles.nodeLabel}
          >
            Trait
          </text>
          <text
            x="240"
            y="222"
            textAnchor="middle"
            fontSize="8"
            fill={textColor}
            fontFamily="'IBM Plex Mono', monospace"
            className={styles.nodeLabel}
          >
            (Energy)
          </text>
        </g>

        {/* === State Nodes === */}
        <g className={styles.nodeGroup} style={{ animationDelay: "1.8s" }}>
          {/* State: idle */}
          <circle
            cx="160"
            cy="310"
            r="22"
            stroke={muted}
            strokeWidth="1.5"
            fill={isDark ? "rgba(51, 65, 85, 0.3)" : "rgba(203, 213, 225, 0.3)"}
            className={styles.nodeShape}
          />
          <text
            x="160"
            y="313"
            textAnchor="middle"
            fontSize="9"
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
            cx="320"
            cy="310"
            r="22"
            stroke={teal}
            strokeWidth="1.5"
            fill={isDark ? "rgba(20, 184, 166, 0.1)" : "rgba(20, 184, 166, 0.06)"}
            className={styles.nodeShape}
          />
          <text
            x="320"
            y="313"
            textAnchor="middle"
            fontSize="9"
            fill={teal}
            fontFamily="'IBM Plex Mono', monospace"
            fontWeight="500"
            className={styles.nodeLabel}
          >
            active
          </text>
        </g>

        {/* === Floating labels for connections === */}
        <text
          x="185"
          y="158"
          fontSize="7"
          fill={gold}
          fontFamily="'IBM Plex Mono', monospace"
          opacity="0.7"
          className={styles.edgeLabel}
          style={{ animationDelay: "1.6s" }}
        >
          has_trait
        </text>

        <text
          x="275"
          y="158"
          fontSize="7"
          fill={gold}
          fontFamily="'IBM Plex Mono', monospace"
          opacity="0.7"
          className={styles.edgeLabel}
          style={{ animationDelay: "1.8s" }}
        >
          renders
        </text>

        <text
          x="228"
          y="274"
          fontSize="7"
          fill={gold}
          fontFamily="'IBM Plex Mono', monospace"
          opacity="0.7"
          className={styles.edgeLabel}
          style={{ animationDelay: "3.0s" }}
        >
          transition
        </text>

        {/* === Decorative Mashrabiya corner pattern === */}
        <g opacity="0.08" className={styles.cornerPattern}>
          <path d="M20 20 L40 40 L20 60 L0 40 Z" stroke={teal} strokeWidth="0.5" fill="none" />
          <path d="M440 340 L460 360 L440 380 L420 360 Z" stroke={teal} strokeWidth="0.5" fill="none" />
        </g>
      </svg>
    </div>
  );
}
