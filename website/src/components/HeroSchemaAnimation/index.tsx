import React from "react";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./styles.module.css";

/**
 * HeroSchemaAnimation — A "living schema being drawn" visualization.
 *
 * Shows an Orbital schema assembling itself: entities appearing,
 * traits connecting, pages binding — like a blueprint being sketched.
 *
 * Design philosophy: "watch behavior being modeled" not "cool particle effect"
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
          d="M160 130 L230 200"
          stroke={gold}
          strokeWidth="2"
          className={styles.connectionLine}
          style={{ animationDelay: "1.2s" }}
        />

        {/* Page -> Trait connection */}
        <path
          d="M320 130 L250 200"
          stroke={gold}
          strokeWidth="2"
          className={styles.connectionLine}
          style={{ animationDelay: "1.4s" }}
        />

        {/* Trait -> State nodes */}
        <path
          d="M230 240 L165 300"
          stroke={teal}
          strokeWidth="1.5"
          className={styles.connectionLine}
          style={{ animationDelay: "2.0s" }}
        />
        <path
          d="M250 240 L315 300"
          stroke={teal}
          strokeWidth="1.5"
          className={styles.connectionLine}
          style={{ animationDelay: "2.2s" }}
        />

        {/* State transition arrow */}
        <path
          d="M185 305 C210 265 270 265 295 305"
          stroke={gold}
          strokeWidth="2"
          fill="none"
          className={styles.connectionLine}
          style={{ animationDelay: "2.8s" }}
        />
        {/* Arrow head */}
        <path
          d="M289 297 L295 305 L286 303"
          stroke={gold}
          strokeWidth="2"
          fill="none"
          className={styles.connectionLine}
          style={{ animationDelay: "2.8s" }}
        />

        {/* === Entity Node (Matter) — Diamond shape === */}
        <g className={styles.nodeGroup} style={{ animationDelay: "0.3s" }}>
          <path
            d="M160 75 L205 120 L160 165 L115 120 Z"
            stroke={teal}
            strokeWidth="2.5"
            fill={tealFill}
            className={styles.nodeShape}
          />
          <text
            x="160"
            y="117"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fontFamily="'Source Serif 4', Georgia, serif"
            fill={nodeText}
            className={styles.nodeLabel}
          >
            Entity
          </text>
          <text
            x="160"
            y="134"
            textAnchor="middle"
            fontSize="9"
            fill={textColor}
            fontFamily="'IBM Plex Mono', monospace"
            className={styles.nodeLabel}
          >
            (Matter)
          </text>
        </g>

        {/* === Page Node (Space) — Rounded rect === */}
        <g className={styles.nodeGroup} style={{ animationDelay: "0.6s" }}>
          <rect
            x="275"
            y="85"
            width="90"
            height="70"
            rx="10"
            stroke={teal}
            strokeWidth="2.5"
            fill={tealFill}
            className={styles.nodeShape}
          />
          <text
            x="320"
            y="117"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fontFamily="'Source Serif 4', Georgia, serif"
            fill={nodeText}
            className={styles.nodeLabel}
          >
            Page
          </text>
          <text
            x="320"
            y="134"
            textAnchor="middle"
            fontSize="9"
            fill={textColor}
            fontFamily="'IBM Plex Mono', monospace"
            className={styles.nodeLabel}
          >
            (Space)
          </text>
        </g>

        {/* === Trait Node (Energy) — Central hub circle === */}
        <g className={styles.nodeGroup} style={{ animationDelay: "0.9s" }}>
          <circle
            cx="240"
            cy="215"
            r="40"
            stroke={gold}
            strokeWidth="2.5"
            fill={goldFill}
            className={styles.nodeShape}
          />
          {/* Pulse ring */}
          <circle
            cx="240"
            cy="215"
            r="40"
            stroke={gold}
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
            className={styles.pulseRing}
          />
          <text
            x="240"
            y="212"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fontFamily="'Source Serif 4', Georgia, serif"
            fill={nodeText}
            className={styles.nodeLabel}
          >
            Trait
          </text>
          <text
            x="240"
            y="229"
            textAnchor="middle"
            fontSize="9"
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
            cy="315"
            r="26"
            stroke={muted}
            strokeWidth="2"
            fill={mutedFill}
            className={styles.nodeShape}
          />
          <text
            x="160"
            y="319"
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
            cx="320"
            cy="315"
            r="26"
            stroke={teal}
            strokeWidth="2"
            fill={tealFill}
            className={styles.nodeShape}
          />
          <text
            x="320"
            y="319"
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

        {/* === Floating labels for connections === */}
        <text
          x="168"
          y="172"
          textAnchor="end"
          fontSize="8"
          fill={gold}
          fontFamily="'IBM Plex Mono', monospace"
          fontWeight="500"
          className={styles.edgeLabel}
          style={{ animationDelay: "1.6s" }}
        >
          has_trait
        </text>

        <text
          x="312"
          y="172"
          textAnchor="start"
          fontSize="8"
          fill={gold}
          fontFamily="'IBM Plex Mono', monospace"
          fontWeight="500"
          className={styles.edgeLabel}
          style={{ animationDelay: "1.8s" }}
        >
          renders
        </text>

        <text
          x="240"
          y="272"
          textAnchor="middle"
          fontSize="8"
          fill={gold}
          fontFamily="'IBM Plex Mono', monospace"
          fontWeight="500"
          className={styles.edgeLabel}
          style={{ animationDelay: "3.0s" }}
        >
          transition
        </text>

        {/* === Decorative Mashrabiya corner diamonds === */}
        <g className={styles.cornerPattern}>
          <path d="M15 15 L35 35 L15 55 L-5 35 Z" stroke={teal} strokeWidth="0.8" fill="none" />
          <path d="M445 340 L465 360 L445 380 L425 360 Z" stroke={teal} strokeWidth="0.8" fill="none" />
          <path d="M445 15 L465 35 L445 55 L425 35 Z" stroke={gold} strokeWidth="0.5" fill="none" />
        </g>
      </svg>
    </div>
  );
}
