/**
 * Shared types for the Al-Jazari state machine visualization.
 * Pure TypeScript — zero React/DOM dependencies.
 */

/** Layout for a single gear (state node) */
export interface JazariGearLayout {
  /** State name */
  name: string;
  /** Center X coordinate */
  cx: number;
  /** Center Y coordinate */
  cy: number;
  /** Gear outer radius */
  radius: number;
  /** Whether this is the initial state */
  isInitial: boolean;
  /** Whether this is a terminal state */
  isTerminal: boolean;
}

/** Guard info attached to an arm */
export interface JazariGuardInfo {
  /** Position X along the arm (30% point) */
  x: number;
  /** Position Y along the arm (30% point) */
  y: number;
  /** Whether this is an AI guard (call-service) vs deterministic */
  isAI: boolean;
}

/** Effect info attached to an arm */
export interface JazariEffectInfo {
  /** Position X along the arm (70% point) */
  x: number;
  /** Position Y along the arm (70% point) */
  y: number;
  /** Number of effects */
  count: number;
  /** Effect labels for tooltip display */
  names: string[];
}

/** Layout for a single transition arm */
export interface JazariArmLayout {
  /** Source state name */
  from: string;
  /** Target state name */
  to: string;
  /** Event name label */
  event: string;
  /** SVG path d attribute for the arm curve */
  path: string;
  /** Label position X (midpoint of arm) */
  labelX: number;
  /** Label position Y (midpoint of arm) */
  labelY: number;
  /** Guard info if transition has guards */
  guard: JazariGuardInfo | null;
  /** Effect info if transition has effects */
  effect: JazariEffectInfo | null;
  /** Whether this is a self-loop */
  isSelfLoop: boolean;
}

/** Complete layout result for an entire state machine diagram */
export interface JazariLayout {
  /** Total SVG width */
  width: number;
  /** Total SVG height */
  height: number;
  /** All gear positions */
  gears: JazariGearLayout[];
  /** All transition arm paths */
  arms: JazariArmLayout[];
  /** Golden axis Y position */
  axisY: number;
  /** Golden axis start X */
  axisStartX: number;
  /** Golden axis end X */
  axisEndX: number;
  /** Entity field labels to display on the axis */
  entityFields: string[];
  /** Text direction */
  direction: 'ltr' | 'rtl';
}

/** Al-Jazari color palette constants */
export const JAZARI_COLORS = {
  brass: '#B87333',
  gold: '#C8A951',
  sky: '#0EA5E9',
  crimson: '#DC2626',
  lapis: '#1E40AF',
  ivory: '#FFFBEB',
  darkBg: '#1a1a2e',
} as const;
