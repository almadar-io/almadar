import React from "react";

/**
 * Mashrabiya-derived geometric line icons for feature cards.
 *
 * Each icon is built from the same geometric grammar as the Mashrabiya pattern:
 * diamonds, grids, circles, and intersecting lines drawn with teal strokes
 * and gold accents — evoking hand-drawn architectural blueprints.
 */

interface IconProps {
  size?: number;
  className?: string;
}

/** Declarative Schemas — A diamond grid with intersecting lines (blueprint/schema) */
export function SchemaIcon({ size = 48, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer diamond */}
      <path
        d="M24 4L44 24L24 44L4 24Z"
        stroke="#14b8a6"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Inner diamond */}
      <path
        d="M24 14L34 24L24 34L14 24Z"
        stroke="#14b8a6"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Cross lines */}
      <line x1="24" y1="4" x2="24" y2="44" stroke="#c9a227" strokeWidth="1" opacity="0.6" />
      <line x1="4" y1="24" x2="44" y2="24" stroke="#c9a227" strokeWidth="1" opacity="0.6" />
      {/* Corner dots */}
      <circle cx="24" cy="4" r="2" fill="#c9a227" />
      <circle cx="44" cy="24" r="2" fill="#c9a227" />
      <circle cx="24" cy="44" r="2" fill="#c9a227" />
      <circle cx="4" cy="24" r="2" fill="#c9a227" />
    </svg>
  );
}

/** State Machines — Interlocking circles with arrows (state transitions) */
export function StateMachineIcon({ size = 48, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Three states as circles */}
      <circle cx="14" cy="16" r="8" stroke="#14b8a6" strokeWidth="1.5" />
      <circle cx="34" cy="16" r="8" stroke="#14b8a6" strokeWidth="1.5" />
      <circle cx="24" cy="36" r="8" stroke="#14b8a6" strokeWidth="1.5" />
      {/* Transition arrows */}
      <path d="M22 16L26 16" stroke="#c9a227" strokeWidth="1.5" strokeLinecap="round" markerEnd="url(#arrowGold)" />
      <path d="M30 23L27 29" stroke="#c9a227" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 23L21 29" stroke="#c9a227" strokeWidth="1.5" strokeLinecap="round" />
      {/* State dots */}
      <circle cx="14" cy="16" r="2.5" fill="#14b8a6" opacity="0.3" />
      <circle cx="34" cy="16" r="2.5" fill="#14b8a6" opacity="0.3" />
      <circle cx="24" cy="36" r="2.5" fill="#c9a227" opacity="0.5" />
    </svg>
  );
}

/** Full-Stack Generation — Layered rectangles (stack) with upward motion */
export function FullStackIcon({ size = 48, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Three stacked layers */}
      <rect x="8" y="30" width="32" height="8" rx="2" stroke="#14b8a6" strokeWidth="1.5" />
      <rect x="10" y="20" width="28" height="8" rx="2" stroke="#14b8a6" strokeWidth="1.5" />
      <rect x="12" y="10" width="24" height="8" rx="2" stroke="#14b8a6" strokeWidth="1.5" />
      {/* Rising arrow */}
      <path d="M24 44V6" stroke="#c9a227" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3" />
      <path d="M20 10L24 4L28 10" stroke="#c9a227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Built-in Integrations — Plug/connector with Mashrabiya grid pattern */
export function IntegrationsIcon({ size = 48, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Central hub */}
      <circle cx="24" cy="24" r="6" stroke="#14b8a6" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="2" fill="#c9a227" />
      {/* Radiating connections */}
      <line x1="24" y1="8" x2="24" y2="18" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="30" x2="24" y2="40" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="24" x2="18" y2="24" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="30" y1="24" x2="40" y2="24" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" />
      {/* Diagonal connections */}
      <line x1="13" y1="13" x2="19" y2="19" stroke="#c9a227" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="29" y1="29" x2="35" y2="35" stroke="#c9a227" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="35" y1="13" x2="29" y2="19" stroke="#c9a227" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="13" y1="35" x2="19" y2="29" stroke="#c9a227" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      {/* Endpoint nodes */}
      <circle cx="24" cy="8" r="2.5" fill="#14b8a6" opacity="0.3" />
      <circle cx="24" cy="40" r="2.5" fill="#14b8a6" opacity="0.3" />
      <circle cx="8" cy="24" r="2.5" fill="#14b8a6" opacity="0.3" />
      <circle cx="40" cy="24" r="2.5" fill="#14b8a6" opacity="0.3" />
    </svg>
  );
}

/** Real-time & Games — Pulse/wave emanating from center (live signal) */
export function RealtimeIcon({ size = 48, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Concentric diamonds (expanding signal) */}
      <path d="M24 12L36 24L24 36L12 24Z" stroke="#14b8a6" strokeWidth="1.5" opacity="0.3" />
      <path d="M24 8L40 24L24 40L8 24Z" stroke="#14b8a6" strokeWidth="1" opacity="0.15" />
      {/* Inner diamond - solid */}
      <path d="M24 16L32 24L24 32L16 24Z" stroke="#14b8a6" strokeWidth="1.5" />
      {/* Center pulse dot */}
      <circle cx="24" cy="24" r="3" fill="#c9a227" />
      <circle cx="24" cy="24" r="5" stroke="#c9a227" strokeWidth="1" opacity="0.4" />
      {/* Signal lines */}
      <path d="M6 24H16" stroke="#14b8a6" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
      <path d="M32 24H42" stroke="#14b8a6" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
    </svg>
  );
}

/** AI-Powered — Rub el Hizb star (8-pointed) with neural connections */
export function AIIcon({ size = 48, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 8-pointed star (Rub el Hizb) — two overlapping squares */}
      <rect
        x="24"
        y="7.03"
        width="24"
        height="24"
        rx="1"
        transform="rotate(45 24 7.03)"
        stroke="#14b8a6"
        strokeWidth="1.5"
      />
      <rect
        x="8"
        y="8"
        width="32"
        height="32"
        rx="1"
        stroke="#14b8a6"
        strokeWidth="1"
        opacity="0.4"
      />
      {/* Inner pattern — neural nodes */}
      <circle cx="24" cy="24" r="3" fill="#c9a227" />
      <circle cx="16" cy="16" r="1.5" fill="#14b8a6" opacity="0.5" />
      <circle cx="32" cy="16" r="1.5" fill="#14b8a6" opacity="0.5" />
      <circle cx="16" cy="32" r="1.5" fill="#14b8a6" opacity="0.5" />
      <circle cx="32" cy="32" r="1.5" fill="#14b8a6" opacity="0.5" />
      {/* Neural connections */}
      <line x1="17" y1="17" x2="22" y2="22" stroke="#c9a227" strokeWidth="1" opacity="0.5" />
      <line x1="31" y1="17" x2="26" y2="22" stroke="#c9a227" strokeWidth="1" opacity="0.5" />
      <line x1="17" y1="31" x2="22" y2="26" stroke="#c9a227" strokeWidth="1" opacity="0.5" />
      <line x1="31" y1="31" x2="26" y2="26" stroke="#c9a227" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

/* === Enterprise Icons === */

/** Team Collaboration — overlapping circles (people/Venn) */
export function TeamIcon({ size = 48, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="18" cy="22" r="10" stroke="#14b8a6" strokeWidth="1.5" />
      <circle cx="30" cy="22" r="10" stroke="#14b8a6" strokeWidth="1.5" />
      <circle cx="24" cy="32" r="10" stroke="#c9a227" strokeWidth="1" opacity="0.5" />
      {/* Intersection dot */}
      <circle cx="24" cy="22" r="2.5" fill="#c9a227" />
    </svg>
  );
}

/** Private Deployments — building/tower with lock */
export function DeploymentIcon({ size = 48, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Building */}
      <rect x="12" y="10" width="24" height="32" rx="2" stroke="#14b8a6" strokeWidth="1.5" />
      {/* Windows - Mashrabiya grid */}
      <rect x="16" y="14" width="6" height="6" stroke="#14b8a6" strokeWidth="1" opacity="0.5" />
      <rect x="26" y="14" width="6" height="6" stroke="#14b8a6" strokeWidth="1" opacity="0.5" />
      <rect x="16" y="24" width="6" height="6" stroke="#14b8a6" strokeWidth="1" opacity="0.5" />
      <rect x="26" y="24" width="6" height="6" stroke="#14b8a6" strokeWidth="1" opacity="0.5" />
      {/* Door with gold accent */}
      <rect x="20" y="34" width="8" height="8" rx="1" stroke="#c9a227" strokeWidth="1.5" />
      <circle cx="26" cy="38" r="1" fill="#c9a227" />
    </svg>
  );
}

/** Enterprise Security — shield with Mashrabiya pattern */
export function SecurityIcon({ size = 48, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield outline */}
      <path
        d="M24 4L40 12V26C40 35 33 42 24 44C15 42 8 35 8 26V12L24 4Z"
        stroke="#14b8a6"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Inner diamond pattern */}
      <path d="M24 14L32 24L24 34L16 24Z" stroke="#c9a227" strokeWidth="1" opacity="0.6" />
      <path d="M24 18L28 24L24 30L20 24Z" stroke="#14b8a6" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="2" fill="#c9a227" />
    </svg>
  );
}

/** Priority Support — target/bullseye */
export function SupportIcon({ size = 48, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="24" cy="24" r="18" stroke="#14b8a6" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="12" stroke="#14b8a6" strokeWidth="1" opacity="0.5" />
      <circle cx="24" cy="24" r="6" stroke="#14b8a6" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="2.5" fill="#c9a227" />
      {/* Crosshair lines */}
      <line x1="24" y1="2" x2="24" y2="10" stroke="#c9a227" strokeWidth="1" opacity="0.4" />
      <line x1="24" y1="38" x2="24" y2="46" stroke="#c9a227" strokeWidth="1" opacity="0.4" />
      <line x1="2" y1="24" x2="10" y2="24" stroke="#c9a227" strokeWidth="1" opacity="0.4" />
      <line x1="38" y1="24" x2="46" y2="24" stroke="#c9a227" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

/** Custom Training — open book with lines */
export function TrainingIcon({ size = 48, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Book spine */}
      <path d="M24 8V40" stroke="#c9a227" strokeWidth="1.5" />
      {/* Left page */}
      <path d="M24 8C24 8 18 6 8 8V40C18 38 24 40 24 40" stroke="#14b8a6" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Right page */}
      <path d="M24 8C24 8 30 6 40 8V40C30 38 24 40 24 40" stroke="#14b8a6" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Text lines */}
      <line x1="12" y1="16" x2="20" y2="16" stroke="#14b8a6" strokeWidth="1" opacity="0.4" />
      <line x1="12" y1="22" x2="20" y2="22" stroke="#14b8a6" strokeWidth="1" opacity="0.4" />
      <line x1="12" y1="28" x2="18" y2="28" stroke="#14b8a6" strokeWidth="1" opacity="0.4" />
      <line x1="28" y1="16" x2="36" y2="16" stroke="#14b8a6" strokeWidth="1" opacity="0.4" />
      <line x1="28" y1="22" x2="36" y2="22" stroke="#14b8a6" strokeWidth="1" opacity="0.4" />
      <line x1="30" y1="28" x2="36" y2="28" stroke="#14b8a6" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

/** Custom Integrations — wrench/gear with connecting nodes */
export function CustomizationIcon({ size = 48, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gear teeth (simplified octagon) */}
      <path
        d="M20 6H28L30 10L36 12L40 8L44 12L40 18L42 24L46 26V34L42 36L40 42L44 46L40 46L34 42L28 44H20L14 42L8 46L4 46L8 42L6 36L2 34V26L6 24L8 18L4 12L8 8L12 12L18 10L20 6Z"
        stroke="#14b8a6"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.3"
      />
      {/* Inner circle */}
      <circle cx="24" cy="26" r="8" stroke="#14b8a6" strokeWidth="1.5" />
      <circle cx="24" cy="26" r="3" fill="#c9a227" />
      {/* Connecting lines */}
      <line x1="24" y1="6" x2="24" y2="18" stroke="#c9a227" strokeWidth="1" opacity="0.5" />
      <line x1="24" y1="34" x2="24" y2="44" stroke="#c9a227" strokeWidth="1" opacity="0.5" />
      <line x1="6" y1="26" x2="16" y2="26" stroke="#c9a227" strokeWidth="1" opacity="0.5" />
      <line x1="32" y1="26" x2="42" y2="26" stroke="#c9a227" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

/** Map of icon keys to components for easy lookup */
export const featureIconMap: Record<string, React.FC<IconProps>> = {
  schema: SchemaIcon,
  stateMachine: StateMachineIcon,
  fullStack: FullStackIcon,
  integrations: IntegrationsIcon,
  realtime: RealtimeIcon,
  ai: AIIcon,
  team: TeamIcon,
  deployment: DeploymentIcon,
  security: SecurityIcon,
  support: SupportIcon,
  training: TrainingIcon,
  customization: CustomizationIcon,
};
