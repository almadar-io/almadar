/**
 * Layout algorithm for the Al-Jazari state machine visualization.
 * Pure TypeScript — zero React/DOM dependencies.
 *
 * 1. BFS from initial state to order states by graph distance.
 * 2. Horizontal distribution of gears along the golden axis.
 * 3. Transition arm routing: forward arcs above, backward arcs below, self-loops above.
 * 4. Guard icons at 30% along arm, effect icons at 70%.
 */

import type {
  JazariLayout,
  JazariGearLayout,
  JazariArmLayout,
  JazariGuardInfo,
  JazariEffectInfo,
} from './types.js';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const GEAR_RADIUS = 35;
const GEAR_SPACING = 130;
const PADDING_X = 80;
const PADDING_Y = 120;
const ARC_HEIGHT = 70;
const SELF_LOOP_RADIUS = 30;
const PARALLEL_OFFSET = 24;

// ---------------------------------------------------------------------------
// Input types (mirrors @almadar/core loosely to stay dependency-free)
// ---------------------------------------------------------------------------

export interface LayoutState {
  name: string;
  isInitial?: boolean;
  isTerminal?: boolean;
  isFinal?: boolean;
}

export interface LayoutTransition {
  from: string;
  to: string;
  event: string;
  guard?: unknown;
  effects?: unknown[];
}

export interface LayoutInput {
  states: LayoutState[];
  transitions: LayoutTransition[];
  entityFields?: string[];
  direction?: 'ltr' | 'rtl';
}

// ---------------------------------------------------------------------------
// BFS state ordering
// ---------------------------------------------------------------------------

function orderStates(states: LayoutState[], transitions: LayoutTransition[]): string[] {
  const initial = states.find((s) => s.isInitial);
  if (!initial) {
    return states.map((s) => s.name);
  }

  const adj = new Map<string, string[]>();
  for (const t of transitions) {
    const existing = adj.get(t.from) ?? [];
    existing.push(t.to);
    adj.set(t.from, existing);
  }

  const visited = new Set<string>();
  const order: string[] = [];
  const queue: string[] = [initial.name];
  visited.add(initial.name);

  while (queue.length > 0) {
    const current = queue.shift()!;
    order.push(current);
    const neighbors = adj.get(current) ?? [];
    for (const next of neighbors) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }

  // Append any unreachable states at the end
  for (const s of states) {
    if (!visited.has(s.name)) {
      order.push(s.name);
    }
  }

  return order;
}

// ---------------------------------------------------------------------------
// Quadratic Bezier point helper
// ---------------------------------------------------------------------------

function quadBezierPoint(
  x0: number, y0: number,
  cx: number, cy: number,
  x1: number, y1: number,
  t: number,
): { x: number; y: number } {
  const mt = 1 - t;
  return {
    x: mt * mt * x0 + 2 * mt * t * cx + t * t * x1,
    y: mt * mt * y0 + 2 * mt * t * cy + t * t * y1,
  };
}

// ---------------------------------------------------------------------------
// Main layout function
// ---------------------------------------------------------------------------

export function computeJazariLayout(input: LayoutInput): JazariLayout {
  const { states, transitions, entityFields = [], direction = 'ltr' } = input;

  if (states.length === 0) {
    return {
      width: 200,
      height: 200,
      gears: [],
      arms: [],
      axisY: 100,
      axisStartX: 0,
      axisEndX: 200,
      entityFields,
      direction,
    };
  }

  const stateOrder = orderStates(states, transitions);
  const stateMap = new Map(states.map((s) => [s.name, s]));
  const stateIndex = new Map(stateOrder.map((name, i) => [name, i]));

  // Gear positions
  const totalWidth = PADDING_X * 2 + (stateOrder.length - 1) * GEAR_SPACING;
  const axisY = PADDING_Y + ARC_HEIGHT + SELF_LOOP_RADIUS + 10;
  const height = axisY + PADDING_Y + ARC_HEIGHT + SELF_LOOP_RADIUS + 10;

  const gears: JazariGearLayout[] = stateOrder.map((name, i) => {
    const state = stateMap.get(name);
    const xPos = direction === 'rtl'
      ? totalWidth - PADDING_X - i * GEAR_SPACING
      : PADDING_X + i * GEAR_SPACING;

    return {
      name,
      cx: xPos,
      cy: axisY,
      radius: GEAR_RADIUS,
      isInitial: state?.isInitial === true,
      isTerminal: state?.isTerminal === true || state?.isFinal === true,
    };
  });

  // Track parallel transitions between same state pairs
  const pairCounts = new Map<string, number>();
  const pairIndices = new Map<string, number>();

  for (const t of transitions) {
    const pairKey = `${t.from}|${t.to}`;
    pairCounts.set(pairKey, (pairCounts.get(pairKey) ?? 0) + 1);
  }

  // Build arms
  const arms: JazariArmLayout[] = transitions.map((t) => {
    const pairKey = `${t.from}|${t.to}`;
    const currentIdx = pairIndices.get(pairKey) ?? 0;
    pairIndices.set(pairKey, currentIdx + 1);
    const pairCount = pairCounts.get(pairKey) ?? 1;
    const parallelShift = (currentIdx - (pairCount - 1) / 2) * PARALLEL_OFFSET;

    const fromIdx = stateIndex.get(t.from) ?? 0;
    const toIdx = stateIndex.get(t.to) ?? 0;
    const fromGear = gears[fromIdx];
    const toGear = gears[toIdx];

    if (!fromGear || !toGear) {
      return {
        from: t.from,
        to: t.to,
        event: t.event,
        path: '',
        labelX: 0,
        labelY: 0,
        guard: null,
        effect: null,
        isSelfLoop: false,
      };
    }

    const isSelfLoop = t.from === t.to;

    let path: string;
    let labelX: number;
    let labelY: number;
    let ctrlX: number;
    let ctrlY: number;

    if (isSelfLoop) {
      // Self-loop: small arc above the gear
      const loopY = fromGear.cy - GEAR_RADIUS - SELF_LOOP_RADIUS - 5;
      path = [
        `M ${fromGear.cx - 12} ${fromGear.cy - GEAR_RADIUS}`,
        `C ${fromGear.cx - 25} ${loopY - 15}, ${fromGear.cx + 25} ${loopY - 15}, ${fromGear.cx + 12} ${fromGear.cy - GEAR_RADIUS}`,
      ].join(' ');
      labelX = fromGear.cx;
      labelY = loopY - 10;
      ctrlX = fromGear.cx;
      ctrlY = loopY;
    } else {
      // Forward = arc above, backward = arc below
      const isForward = direction === 'rtl' ? fromIdx > toIdx : fromIdx < toIdx;
      const arcSign = isForward ? -1 : 1;
      const midX = (fromGear.cx + toGear.cx) / 2;
      ctrlY = axisY + arcSign * (ARC_HEIGHT + Math.abs(parallelShift));
      ctrlX = midX;

      // Offset start/end to gear perimeter so arrows don't overlap state names
      const perimeterR = GEAR_RADIUS + 7; // outer radius including teeth
      const dx = toGear.cx - fromGear.cx;
      const dy = toGear.cy - fromGear.cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const startX = dist > 0 ? fromGear.cx + (dx / dist) * perimeterR : fromGear.cx;
      const startY = dist > 0 ? fromGear.cy + (dy / dist) * perimeterR : fromGear.cy;
      const endX = dist > 0 ? toGear.cx - (dx / dist) * perimeterR : toGear.cx;
      const endY = dist > 0 ? toGear.cy - (dy / dist) * perimeterR : toGear.cy;

      path = `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`;
      const mid = quadBezierPoint(startX, startY, ctrlX, ctrlY, endX, endY, 0.5);
      labelX = mid.x;
      labelY = mid.y;
    }

    // Guard at 30%
    let guard: JazariGuardInfo | null = null;
    if (t.guard != null) {
      const isAI = Array.isArray(t.guard)
        && typeof t.guard[0] === 'string'
        && t.guard[0] === 'call-service';
      if (isSelfLoop) {
        guard = { x: fromGear.cx - 18, y: fromGear.cy - GEAR_RADIUS - SELF_LOOP_RADIUS, isAI };
      } else {
        const gp = quadBezierPoint(fromGear.cx, fromGear.cy, ctrlX, ctrlY, toGear.cx, toGear.cy, 0.3);
        guard = { x: gp.x, y: gp.y, isAI };
      }
    }

    // Effects at 70%
    let effect: JazariEffectInfo | null = null;
    if (t.effects && t.effects.length > 0) {
      const names = t.effects.map((e) => {
        if (Array.isArray(e)) return JSON.stringify(e);
        return String(e);
      });
      if (isSelfLoop) {
        effect = { x: fromGear.cx + 18, y: fromGear.cy - GEAR_RADIUS - SELF_LOOP_RADIUS, count: t.effects.length, names };
      } else {
        const ep = quadBezierPoint(fromGear.cx, fromGear.cy, ctrlX, ctrlY, toGear.cx, toGear.cy, 0.7);
        effect = { x: ep.x, y: ep.y, count: t.effects.length, names };
      }
    }

    return {
      from: t.from,
      to: t.to,
      event: t.event,
      path,
      labelX,
      labelY,
      guard,
      effect,
      isSelfLoop,
    };
  });

  return {
    width: totalWidth,
    height,
    gears,
    arms,
    axisY,
    axisStartX: direction === 'rtl' ? gears[gears.length - 1]?.cx ?? PADDING_X : gears[0]?.cx ?? PADDING_X,
    axisEndX: direction === 'rtl' ? gears[0]?.cx ?? totalWidth - PADDING_X : gears[gears.length - 1]?.cx ?? totalWidth - PADDING_X,
    entityFields,
    direction,
  };
}
