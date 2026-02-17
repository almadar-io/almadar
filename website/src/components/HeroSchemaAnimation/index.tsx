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
 * Visualization Update (4-State Order Fulfillment):
 * - Example: Order Fulfillment (placed -> preparing -> shipped -> delivered)
 * - Layout: Satellite Orbit (4 Corners)
 * - Trait (Center): "Fulfillment" logic
 * - Page: "Track Order"
 * - Entity: "Order"
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
        viewBox="0 0 500 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        {/* === Connection Lines (Vertical Stack) === */}
        <path
          d={`M${centerX} 290 L${centerX} 240`}
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

        {/* === State Connections (Star Topology) === */}
        {/* Trait -> placed */}
        <path d={`M${centerX - 40} 190 L130 160`} stroke={teal} strokeWidth="1" opacity="0.5" className={styles.connectionLine} style={{ animationDelay: "1.8s" }} />
        {/* Trait -> preparing */}
        <path d={`M${centerX - 40} 210 L130 240`} stroke={teal} strokeWidth="1" opacity="0.5" className={styles.connectionLine} style={{ animationDelay: "1.9s" }} />
        {/* Trait -> shipped */}
        <path d={`M${centerX + 40} 190 L370 160`} stroke={teal} strokeWidth="1" opacity="0.5" className={styles.connectionLine} style={{ animationDelay: "2.0s" }} />
        {/* Trait -> delivered */}
        <path d={`M${centerX + 40} 210 L370 240`} stroke={teal} strokeWidth="1" opacity="0.5" className={styles.connectionLine} style={{ animationDelay: "2.1s" }} />

        {/* === Transitions (Process Flow) === */}

        {/* placed -> preparing (Left Down) */}
        <path
          d="M100 175 L100 225"
          stroke={gold}
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 4"
          className={styles.connectionLine}
          style={{ animationDelay: "2.5s", opacity: 0.6 }}
        />

        {/* preparing -> shipped (Curve Under) */}
        <path
          d="M125 240 Q250 320 375 160" // Long curve from bottom-left to top-right feels weird visually?
        // Let's try preparing -> shipped as a curve under
        // Actually, let's do:
        // Left: placed -> preparing
        // Cross: preparing -> shipped
        // Right: shipped -> delivered
        />
        {/* Simpler Curve: Preparing(100,240) -> Shipped(400,160) is a big jump. */}
        {/* Maybe better: 
             TL(Placed) -> TR(Preparing) ? No, user reads L->R.
             TL(placed) -> TR(preparing) -> ML(shipped)? No.
        */}
        {/* User asked for "Super Clear". 
            Sequence: Placed -> Preparing -> Shipped -> Delivered.
            Let's put them in order visually?
            1(TL) -> 2(BL)? No.
            1(Far Left) -> 2(Mid Left) -> 3(Mid Right) -> 4(Far Right)?
            The "Star/Satellite" layout implies equal weight.
            Let's stick to the 4 corners but connect them 1->2->3->4.
            1: Placed (TL) -> 2: Preparing (BL)
            2: Preparing (BL) -> 3: Shipped (TR) THIS CROSSES CENTER. BAD.
            
            Alternative Layout:
            1: Placed (TL)
            2: Preparing (TR)
            3: Shipped (BL) ?? Confusing.
            
            Let's do circular:
            TL(Placed) -> TR(Preparing) -> BR(Shipped) -> BL(Delivered)? No, end logic is usually "Done" at end.
            
            Standard Diagram:
            L -> R.
            Placed(100, 200) -> Preparing(200, 200) -> Shipped(300, 200) -> Delivered(400, 200).
            But Trait is in center (250, 200).
            
            So: 
            Placed(80, 200) -> Preparing(160, 200) -> [Trait] -> Shipped(340, 200) -> Delivered(420, 200).
            This creates a horizontal line through the center... obscuring trait?
            
            Let's go back to 4 corners, but order them nicely.
            Left Side: Placed(Top), Preparing(Bottom).
            Right Side: Shipped(Top), Delivered(Bottom).
            
            Flow: Placed -> Preparing -> Shipped -> Delivered.
            
            We can draw a "U" curve for Preparing -> Shipped.
            Preparing (Left Bottom) -> Curve under Trait -> Shipped (Right Top... or Right Bottom).
            If Shipped is Right Bottom and Delivered is Right Top?
            Then Preparing -> Shipped is straight across bottom.
            Shipped -> Delivered is straight up.
            
            Let's try that ordering:
            1. Placed (Left Top)
            2. Preparing (Left Bottom)
            3. Shipped (Right Bottom)
            4. Delivered (Right Top)
            
            Logic: Down, Across, Up.
            "U" shape.
            
            Let's do that.
        */}

        {/* 1->2: Placed(LT) -> Preparing(LB) */}
        <path
          d="M100 175 L100 225"
          stroke={gold}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className={styles.connectionLine}
          style={{ animationDelay: "2.4s", opacity: 0.6 }}
        />

        {/* 2->3: Preparing(LB) -> Shipped(RB) */}
        <path
          d="M125 240 Q250 280 375 240"
          stroke={gold}
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 4"
          className={styles.connectionLine}
          style={{ animationDelay: "2.5s", opacity: 0.6 }}
        />

        {/* 3->4: Shipped(RB) -> Delivered(RT) */}
        <path
          d="M400 225 L400 175"
          stroke={gold}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className={styles.connectionLine}
          style={{ animationDelay: "2.6s", opacity: 0.6 }}
        />


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
            Order
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
            (Entity)
          </text>
        </g>

        {/* === Trait Node (Energy) — Middle (The Core) === */}
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

        {/* === State Nodes (4 States) === */}

        {/* 1. Placed (Top Left) */}
        <g className={styles.nodeGroup} style={{ animationDelay: "1.4s" }}>
          <circle cx="100" cy="160" r="22" stroke={muted} strokeWidth="2" fill={mutedFill} className={styles.nodeShape} />
          <text x="100" y="164" textAnchor="middle" fontSize="9" fontWeight="500" fill={textColor} fontFamily="'IBM Plex Mono', monospace" className={styles.nodeLabel}>placed</text>
        </g>

        {/* 2. Preparing (Bottom Left) */}
        <g className={styles.nodeGroup} style={{ animationDelay: "1.5s" }}>
          <circle cx="100" cy="240" r="22" stroke={teal} strokeWidth="2" fill={tealFill} className={styles.nodeShape} />
          <text x="100" y="244" textAnchor="middle" fontSize="9" fontWeight="500" fill={teal} fontFamily="'IBM Plex Mono', monospace" className={styles.nodeLabel}>prep</text>
        </g>

        {/* 3. Shipped (Bottom Right) - Flow goes Across Bottom */}
        <g className={styles.nodeGroup} style={{ animationDelay: "1.6s" }}>
          <circle cx="400" cy="240" r="22" stroke={teal} strokeWidth="2" fill={tealFill} className={styles.nodeShape} />
          <text x="400" y="244" textAnchor="middle" fontSize="9" fontWeight="500" fill={teal} fontFamily="'IBM Plex Mono', monospace" className={styles.nodeLabel}>shipped</text>
        </g>

        {/* 4. Delivered (Top Right) - Flow goes Up */}
        <g className={styles.nodeGroup} style={{ animationDelay: "1.7s" }}>
          <circle cx="400" cy="160" r="22" stroke={gold} strokeWidth="2" fill={goldFill} className={styles.nodeShape} />
          <text x="400" y="164" textAnchor="middle" fontSize="9" fontWeight="700" fill={gold} fontFamily="'IBM Plex Mono', monospace" className={styles.nodeLabel}>done</text>
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
