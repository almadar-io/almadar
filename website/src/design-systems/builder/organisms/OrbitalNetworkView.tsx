/**
 * OrbitalNetworkView - Orbital Schema Network Visualizer
 *
 * Meta-view showing all Orbitals in a schema connected via emits/listens.
 * Uses same layout and bundling logic as OrbitalStateMachineView for consistency.
 * Click an orbital to open its state machine detail view.
 *
 * Supports the Trait Event Contract model:
 * - Shows event payload schemas
 * - Displays event scope (internal/external)
 * - Shows source trait information
 * - Displays payload mappings for listeners
 *
 * Events Emitted:
 * - UI:SELECT_ORBITAL - When an orbital node is clicked
 */

import React, { useState, useMemo, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { Typography, LoadingState } from "@almadar/ui";
import type {
  OrbitalSchema,
  Orbital,
  OrbitalDefinition,
  TraitEventContract,
  TraitEventListener,
  EventPayloadField,
  EventScope,
  Trait,
  TraitRef,
  EntityRef,
} from "@almadar/core";
import {
  isOrbitalDefinition,
  isEntityReference,
} from "@almadar/core";
import { OrbitalVisualizerModal } from "./OrbitalDetailModal";

/**
 * Get entity name safely from EntityRef
 */
function getEntityName(entity: EntityRef | undefined): string | undefined {
  if (!entity) return undefined;
  if (isEntityReference(entity)) {
    return entity.replace('.entity', '');
  }
  return entity.name;
}

// ============================================================================
// Node color mapping for semantic types
// ============================================================================

const nodeColors: Record<string, string> = {
  entity: 'var(--color-success)',
  trait: 'var(--color-info)',
  state: 'var(--color-warning)',
  event: 'var(--color-accent)',
  page: 'var(--color-accent)',
  effect: 'var(--color-info)',
};

// ============================================================================
// Types
// ============================================================================

/** Normalized event contract for visualization */
interface NormalizedEventContract {
  /** Namespaced event name (TraitName.EVENT_NAME) for external events */
  event: string;
  /** Original event name without namespace */
  originalEvent?: string;
  /** Human-readable description */
  description?: string;
  /** Payload schema */
  payload?: EventPayloadField[];
  /** Event scope */
  scope?: EventScope;
  /** Source trait name (for trait-level emits) */
  sourceTrait?: string;
  /** Source tick name (if emitted by a tick) */
  sourceTick?: string;
}

/** Normalized event listener for visualization */
interface NormalizedEventListener {
  /** Event to listen for */
  event: string;
  /** State machine event to trigger */
  triggers: string;
  /** Guard expression (simplified for display) */
  guard?: string;
  /** Event scope */
  scope?: EventScope;
  /** Payload field mapping */
  payloadMapping?: Record<string, string>;
  /** Source trait name */
  sourceTrait?: string;
}

interface OrbitalNode {
  id: string;
  name: string;
  description?: string;
  entityName?: string;
  traitCount: number;
  pageCount: number;
  /** Normalized emits with full contract info */
  emits: NormalizedEventContract[];
  /** Normalized listens with full listener info */
  listens: NormalizedEventListener[];
  /** Simple emit names for connection matching */
  emitNames: string[];
  /** Simple listen event names for connection matching */
  listenNames: string[];
  x: number;
  y: number;
  radius: number;
}

/** Event info in a bundle - includes contract details */
interface BundledEventInfo {
  /** Event name (namespaced: TraitName.EVENT_NAME) */
  event: string;
  /** Original event name without namespace */
  originalEvent?: string;
  /** Description from emit contract */
  description?: string;
  /** Payload schema from emit contract */
  payload?: EventPayloadField[];
  /** Event scope */
  scope?: EventScope;
  /** Source trait that emits this event */
  sourceTrait?: string;
  /** Source tick name (if emitted by a tick) */
  sourceTick?: string;
  /** Listener info from target orbital */
  listener?: {
    triggers: string;
    guard?: string;
    payloadMapping?: Record<string, string>;
    sourceTrait?: string;
  };
}

/** Bundled connections between orbitals (like TransitionBundle) */
interface ConnectionBundle {
  id: string;
  from: string;
  to: string;
  /** Simple event names for display */
  events: string[];
  /** Full event info with contracts */
  eventDetails: BundledEventInfo[];
  isBidirectional: boolean;
  isReverse: boolean;
}

interface TooltipState {
  visible: boolean;
  pinned: boolean;
  x: number;
  y: number;
  bundle: ConnectionBundle | null;
}

export interface OrbitalSchemaVisualizerProps {
  schema: OrbitalSchema | null;
  className?: string;
}

// ============================================================================
// Helper Functions for Event Extraction
// ============================================================================

/**
 * Helper to check if a trait ref is an inline trait definition.
 * Matches almadar-core's isInlineTrait: has 'name' but NOT 'ref'.
 * Does NOT require stateMachine (it's optional on Trait).
 */
function isInlineTrait(ref: TraitRef): ref is Trait {
  return (
    typeof ref === "object" &&
    ref !== null &&
    "name" in ref &&
    !("ref" in ref)
  );
}

/**
 * Compute the orbital event interface by deriving emits/listens
 * entirely from trait-level declarations.
 *
 * Orbital-level emits/listens are COMPUTED (not authored), so we
 * always derive from trait data:
 *   - trait.emits: TraitEventContract[] — events this trait can emit
 *   - trait.listens: TraitEventListener[] — events this trait listens for
 *   - ["emit", "EVENT"] effects in transitions — actual emit points
 *
 * For cross-orbital matching, events with scope "external" or no scope
 * (undefined) are treated as potentially cross-orbital. Only events
 * with explicit scope "internal" are excluded from cross-orbital matching.
 */
function computeOrbitalEvents(orbital: OrbitalDefinition): {
  emits: NormalizedEventContract[];
  listens: NormalizedEventListener[];
} {
  const emits: NormalizedEventContract[] = [];
  const listens: NormalizedEventListener[] = [];
  const seenEmitEvents = new Set<string>();
  const seenListenKeys = new Set<string>();

  const traits = orbital.traits || [];

  traits.forEach((traitRef) => {
    if (!isInlineTrait(traitRef)) return;
    const trait = traitRef;
    const traitName = trait.name || "Unknown";

    // ── Extract emits from trait's emits array ──
    if (trait.emits && Array.isArray(trait.emits)) {
      trait.emits.forEach((emit: any) => {
        const eventName = typeof emit === "string" ? emit : emit?.event;
        if (!eventName || seenEmitEvents.has(eventName)) return;

        seenEmitEvents.add(eventName);
        emits.push({
          event: eventName,
          originalEvent: eventName,
          description: typeof emit === "object" ? emit.description : undefined,
          payload: typeof emit === "object" ? emit.payload : undefined,
          scope: (typeof emit === "object" ? emit.scope : undefined) as EventScope,
          sourceTrait: traitName,
        });
      });
    }

    // ── Scan transitions for ["emit", "EVENT_NAME"] effects ──
    const sm = trait.stateMachine;
    if (sm?.transitions) {
      sm.transitions.forEach((t: any) => {
        if (!t.effects) return;
        t.effects.forEach((effect: any) => {
          if (
            Array.isArray(effect) &&
            effect[0] === "emit" &&
            typeof effect[1] === "string" &&
            !seenEmitEvents.has(effect[1])
          ) {
            const eventName = effect[1];
            seenEmitEvents.add(eventName);
            emits.push({
              event: eventName,
              originalEvent: eventName,
              scope: "external" as EventScope,
              sourceTrait: traitName,
            });
          }
        });
      });
    }

    // ── Extract listens from trait's listens array ──
    if (trait.listens && Array.isArray(trait.listens)) {
      trait.listens.forEach((listen: any) => {
        if (typeof listen === "object" && listen.event) {
          const key = `${traitName}:${listen.event}`;
          if (seenListenKeys.has(key)) return;
          seenListenKeys.add(key);

          listens.push({
            event: listen.event,
            triggers: listen.triggers || listen.event,
            guard:
              typeof listen.guard === "string"
                ? listen.guard
                : Array.isArray(listen.guard)
                  ? JSON.stringify(listen.guard)
                  : undefined,
            scope: listen.scope as EventScope,
            payloadMapping: listen.payloadMapping,
            sourceTrait: traitName,
          });
        }
      });
    }
  });

  return { emits, listens };
}

/**
 * Collect explicitly internal events from traits for display purposes.
 * Only includes events with scope === "internal" to avoid duplicating
 * events already collected by computeOrbitalEvents.
 */
function collectInternalEvents(traits: TraitRef[]): {
  internalEmits: NormalizedEventContract[];
  internalListens: NormalizedEventListener[];
} {
  const internalEmits: NormalizedEventContract[] = [];
  const internalListens: NormalizedEventListener[] = [];

  traits.forEach((traitRef) => {
    if (!isInlineTrait(traitRef)) return;

    const trait = traitRef;
    const traitName = trait.name || "Unknown";

    // Extract explicitly internal emits from trait
    if (trait.emits && Array.isArray(trait.emits)) {
      trait.emits.forEach((emit: any) => {
        if (typeof emit === "object" && emit.scope === "internal") {
          internalEmits.push({
            event: emit.event,
            description: emit.description,
            payload: emit.payload,
            scope: "internal" as EventScope,
            sourceTrait: traitName,
          });
        }
      });
    }

    // Extract explicitly internal listens from trait
    if (trait.listens && Array.isArray(trait.listens)) {
      trait.listens.forEach((listen: any) => {
        if (typeof listen === "object" && listen.scope === "internal") {
          internalListens.push({
            event: listen.event,
            triggers: listen.triggers || listen.event,
            guard:
              typeof listen.guard === "string"
                ? listen.guard
                : Array.isArray(listen.guard)
                  ? JSON.stringify(listen.guard)
                  : undefined,
            scope: "internal" as EventScope,
            payloadMapping: listen.payloadMapping,
            sourceTrait: traitName,
          });
        }
      });
    }
  });

  return { internalEmits, internalListens };
}

// ============================================================================
// Layout Algorithm (same structure as orbital visualizer)
// ============================================================================

function layoutOrbitals(orbitals: Orbital[]): {
  nodes: OrbitalNode[];
  width: number;
  height: number;
} {
  const nodes: OrbitalNode[] = [];
  const nodeRadius = 70;
  const horizontalSpacing = 450; // Increased for more room between nodes
  const verticalSpacing = 380; // Increased to prevent vertical line overlaps
  const startX = 350; // More left margin for curve offsets
  const startY = 250; // More top margin for p-shell lobes

  // Use BFS-like layout: calculate columns based on dependencies
  const cols = Math.max(2, Math.ceil(Math.sqrt(orbitals.length)));

  orbitals.forEach((orbital, idx) => {
    if (!isOrbitalDefinition(orbital)) return;

    const col = idx % cols;
    const row = Math.floor(idx / cols);

    // Compute orbital-level events using the resolver
    // This derives namespaced events from traits (TraitName.EVENT_NAME)
    const computedEvents = computeOrbitalEvents(orbital);

    // Also collect internal events for display purposes
    const internalEvents = collectInternalEvents(orbital.traits || []);

    // Combine external (computed) and internal events
    // External events are used for cross-orbital connections
    // Internal events are shown in the orbital detail view
    const allEmits = [...computedEvents.emits, ...internalEvents.internalEmits];
    const allListens = [
      ...computedEvents.listens,
      ...internalEvents.internalListens,
    ];

    nodes.push({
      id: `orbital-${orbital.name}`,
      name: orbital.name,
      description: orbital.description,
      entityName: getEntityName(orbital.entity),
      traitCount: orbital.traits?.length || 0,
      pageCount: orbital.pages?.length || 0,
      emits: allEmits,
      listens: allListens,
      // For connection matching, only use external (namespaced) events
      emitNames: computedEvents.emits.map((e) => e.event),
      listenNames: computedEvents.listens.map((l) => l.event),
      x: startX + col * horizontalSpacing,
      y: startY + row * verticalSpacing,
      radius: nodeRadius,
    });
  });

  const maxX = Math.max(...nodes.map((n) => n.x), startX) + nodeRadius + 300;
  const maxY = Math.max(...nodes.map((n) => n.y), startY) + nodeRadius + 200;

  return { nodes, width: Math.max(1600, maxX), height: Math.max(1000, maxY) };
}

/** Bundle connections like DomStateMachineVisualizer bundles transitions */
function bundleConnections(nodes: OrbitalNode[]): ConnectionBundle[] {
  // Map to store full event details for each connection
  const bundleMap: Record<string, BundledEventInfo[]> = {};

  // Build bundles: OrbitalA emits event → OrbitalB listens to it
  nodes.forEach((fromNode) => {
    // Include emits that are NOT explicitly internal (external or undefined scope)
    const crossOrbitalEmits = fromNode.emits.filter(
      (e) => e.scope !== "internal",
    );

    crossOrbitalEmits.forEach((emitContract) => {
      const emitEvent = emitContract.event;
      const originalEvent = emitContract.originalEvent || emitEvent;

      nodes.forEach((toNode) => {
        if (fromNode.name === toNode.name) return;

        // Find matching listener in target orbital
        // Match by: exact event name, original event name, or namespaced name
        // Include listeners that are NOT explicitly internal
        const listener = toNode.listens.find(
          (l) =>
            l.scope !== "internal" &&
            (l.event === emitEvent ||
             l.event === originalEvent ||
             l.event === `${fromNode.name}.${originalEvent}`),
        );

        if (listener) {
          const key = `${fromNode.name}->${toNode.name}`;
          if (!bundleMap[key]) bundleMap[key] = [];

          bundleMap[key].push({
            event: emitEvent,
            originalEvent: originalEvent,
            description: emitContract.description,
            payload: emitContract.payload,
            scope: emitContract.scope,
            sourceTrait: emitContract.sourceTrait,
            sourceTick: emitContract.sourceTick,
            listener: {
              triggers: listener.triggers,
              guard: listener.guard,
              payloadMapping: listener.payloadMapping,
              sourceTrait: listener.sourceTrait,
            },
          });
        }
      });
    });
  });

  // Check for bidirectional pairs
  const allPairs = new Set(Object.keys(bundleMap));

  const bundles = Object.entries(bundleMap).map(([key, eventDetails]) => {
    const [from, to] = key.split("->");
    const reverseKey = `${to}->${from}`;
    const isBidirectional = allPairs.has(reverseKey);
    const isReverse = from > to;

    return {
      id: `bundle-${from}-${to}`,
      from,
      to,
      events: eventDetails.map((e) => e.event),
      eventDetails,
      isBidirectional,
      isReverse,
    };
  });

  return bundles;
}

/**
 * Calculate lane index for each bundle to prevent overlaps.
 * Uses global lane assignment based on connection direction to spread out curves.
 */
function assignLaneIndices(
  bundles: ConnectionBundle[],
  nodes: OrbitalNode[],
): Map<string, number> {
  const laneMap = new Map<string, number>();

  // Get node positions for direction calculation
  const nodePos = new Map<string, { x: number; y: number }>();
  nodes.forEach((n) => nodePos.set(n.name, { x: n.x, y: n.y }));

  // Group bundles by their general direction (which octant they curve into)
  // This prevents connections going the same direction from overlapping
  const directionGroups: Record<string, ConnectionBundle[]> = {};

  bundles.forEach((bundle) => {
    const from = nodePos.get(bundle.from);
    const to = nodePos.get(bundle.to);
    if (!from || !to) return;

    const dx = to.x - from.x;
    const dy = to.y - from.y;

    // Determine octant (8 directions) + whether it curves left or right
    const angle = Math.atan2(dy, dx);
    const octant = Math.floor(((angle + Math.PI) / (Math.PI / 4)) % 8);
    const curveDir = bundle.from < bundle.to ? "L" : "R";
    const groupKey = `${octant}-${curveDir}`;

    if (!directionGroups[groupKey]) directionGroups[groupKey] = [];
    directionGroups[groupKey].push(bundle);
  });

  // Assign lane indices within each direction group
  Object.values(directionGroups).forEach((group) => {
    group.forEach((bundle, idx) => {
      laneMap.set(bundle.id, idx);
    });
  });

  return laneMap;
}

// ============================================================================
// Connection Arrow Component (matching orbital visualizer style)
// ============================================================================

const ConnectionArrow: React.FC<{
  bundle: ConnectionBundle;
  nodes: OrbitalNode[];
  bundleIndex: number;
  totalBundlesForPair: number;
  isHighlighted: boolean;
  isDimmed: boolean;
  onHover: (bundle: ConnectionBundle | null, x: number, y: number) => void;
  onClick: (bundle: ConnectionBundle) => void;
}> = ({
  bundle,
  nodes,
  bundleIndex,
  totalBundlesForPair,
  isHighlighted,
  isDimmed,
  onHover,
  onClick,
}) => {
  const groupRef = useRef<SVGGElement>(null);

  const fromNode = nodes.find((n) => n.name === bundle.from);
  const toNode = nodes.find((n) => n.name === bundle.to);

  if (!fromNode || !toNode) return null;

  const dx = toNode.x - fromNode.x;
  const dy = toNode.y - fromNode.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return null;

  const nx = dx / dist;
  const ny = dy / dist;

  // Start and end on edge of nodes
  const startX = fromNode.x + nx * fromNode.radius;
  const startY = fromNode.y + ny * fromNode.radius;
  const endX = toNode.x - nx * (toNode.radius + 12);
  const endY = toNode.y - ny * (toNode.radius + 12);

  // === EXACT LOGIC FROM DomStateMachineVisualizer ===

  // Curve direction based on isReverse (alphabetical order)
  const baseCurveDirection = bundle.isReverse ? 1 : -1;

  // Lane calculation: 55px base + 55px per lane
  const lane = bundleIndex;
  const laneOffset = 55 + lane * 55;

  // Base offset for bidirectionality
  const baseOffset = bundle.isBidirectional ? 60 : 40;
  const curveAmount = (baseOffset + laneOffset) * baseCurveDirection;

  // Midpoint and control point
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;

  // Perpendicular offset
  const perpX = -ny * curveAmount;
  const perpY = nx * curveAmount;

  const controlX = midX + perpX;
  const controlY = midY + perpY;

  const pathD = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;

  // PERIMETER LABEL PLACEMENT: Position label near the source orbital (t=0.18)
  // This spreads labels around the edges instead of clumping in the center
  const t = 0.18;
  const t1 = 1 - t;
  // Quadratic bezier: B(t) = (1-t)²P₀ + 2(1-t)tP₁ + t²P₂
  const labelX = t1 * t1 * startX + 2 * t1 * t * controlX + t * t * endX;
  const labelY = t1 * t1 * startY + 2 * t1 * t * controlY + t * t * endY;

  // Label styling (same as orbital visualizer)
  const isSingle = bundle.events.length === 1;
  // For namespaced events (TraitName.EVENT_NAME), show only the event name part
  const formatEventName = (event: string) => {
    const parts = event.split(".");
    return parts.length > 1 ? parts[1] : event;
  };
  const labelText = isSingle
    ? formatEventName(bundle.events[0])
    : `${bundle.events.length} events`;
  const bundleColor = isSingle ? "#8b5cf6" : "#6366f1";
  const labelWidth = labelText.length * 7 + (isSingle ? 24 : 40);

  const markerId = `arrow-${bundle.id}`;

  const handleMouseEnter = () => {
    if (groupRef.current) {
      // Pass label position for tooltip - this is where the event name is displayed
      onHover(bundle, labelX, labelY);
    }
  };

  const handleMouseLeave = () => {
    // Signal to parent to schedule hide (parent manages the timeout)
    onHover(null, 0, 0);
  };

  const handleClick = () => {
    onClick(bundle);
  };

  return (
    <g
      ref={groupRef}
      className="cursor-pointer transition-opacity duration-150"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        opacity: isDimmed ? 0.2 : 1,
        zIndex: isHighlighted ? 100 : 1,
      }}
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
          <polygon points="0 0, 10 3.5, 0 7" fill={bundleColor} />
        </marker>
      </defs>

      {/* Main path */}
      <path
        id={`path-${bundle.id}`}
        d={pathD}
        stroke={bundleColor}
        strokeWidth={isSingle ? 1.5 : 2.5}
        fill="none"
        markerEnd={`url(#${markerId})`}
      />

      {/* Animated flowing dot to show direction */}
      <circle
        r="3"
        fill="#22d3ee"
        opacity={0.8}
        style={{ pointerEvents: "none" }}
      >
        <animateMotion dur="2s" repeatCount="indefinite" path={pathD} />
      </circle>

      {/* Label background - masks the line so event name appears inline */}
      <rect
        x={labelX - labelWidth / 2}
        y={labelY - 14}
        width={labelWidth}
        height={28}
        rx={4}
        fill="#030712"
        stroke={bundleColor}
        strokeWidth={1}
      />

      {/* Label text */}
      <text
        x={labelX}
        y={labelY + 5}
        textAnchor="middle"
        fill="#c4b5fd"
        fontSize="13"
        fontFamily="JetBrains Mono, monospace"
        fontWeight={600}
      >
        {labelText}
      </text>

      {/* Bundle count badge (for multi-event bundles) */}
      {!isSingle && (
        <circle
          cx={labelX + labelWidth / 2 + 4}
          cy={labelY}
          r={8}
          fill="#ef4444"
          stroke="#030712"
          strokeWidth={2}
        />
      )}
      {!isSingle && (
        <text
          x={labelX + labelWidth / 2 + 4}
          y={labelY + 4}
          textAnchor="middle"
          fill="#fff"
          fontSize="10"
          fontWeight={700}
        >
          {bundle.events.length}
        </text>
      )}
    </g>
  );
};

// ============================================================================
// Payload Field Display Component
// ============================================================================

const payloadTypeColors: Record<string, string> = {
  string: 'var(--color-success)',
  number: 'var(--color-info)',
  boolean: 'var(--color-warning)',
  object: 'var(--color-accent)',
  array: 'var(--color-accent)',
  entity: 'var(--color-info)',
};

const PayloadFieldDisplay: React.FC<{ field: EventPayloadField }> = ({
  field,
}) => {
  const typeColor = payloadTypeColors[field.type as string] || 'var(--color-muted-foreground)';

  return (
    <div className="flex items-start gap-2 text-xs">
      <span style={{ color: 'var(--color-muted-foreground)' }}>{field.name}</span>
      <span style={{ color: typeColor }}>{field.type}</span>
      {field.required && <span style={{ color: 'var(--color-error)' }}>*</span>}
      {field.entityType && (
        <span className="text-xs" style={{ color: 'var(--color-info)' }}>({field.entityType})</span>
      )}
      {field.description && (
        <span
          className="italic truncate max-w-[150px]"
          style={{ color: 'var(--color-muted-foreground)' }}
          title={field.description}
        >
          - {field.description}
        </span>
      )}
    </div>
  );
};

// ============================================================================
// Event Contract Card Component
// ============================================================================

const EventContractCard: React.FC<{ eventInfo: BundledEventInfo }> = ({
  eventInfo,
}) => {
  const hasPayload = eventInfo.payload && eventInfo.payload.length > 0;
  const hasMapping =
    eventInfo.listener?.payloadMapping &&
    Object.keys(eventInfo.listener.payloadMapping).length > 0;

  // Check if event is namespaced (TraitName.EVENT_NAME format)
  const isNamespaced = eventInfo.event.includes(".");
  const [traitNamespace, originalEvent] = isNamespaced
    ? eventInfo.event.split(".")
    : [null, eventInfo.event];

  return (
    <div className="rounded-lg p-3 space-y-2" style={{ backgroundColor: 'var(--color-card)' }}>
      {/* Event header */}
      <div className="flex items-center justify-between flex-wrap gap-1">
        <div className="flex items-center gap-1">
          {isNamespaced && (
            <span className="font-mono text-xs" style={{ color: 'var(--color-accent)' }}>
              {traitNamespace}.
            </span>
          )}
          <span className="font-mono font-semibold text-sm" style={{ color: 'var(--color-foreground)' }}>
            {originalEvent}
          </span>
        </div>
        {eventInfo.scope && (
          <span
            className="px-2 py-0.5 rounded-full text-xs font-medium"
            style={
              eventInfo.scope === "external"
                ? {
                    backgroundColor: 'color-mix(in srgb, var(--color-warning) 20%, transparent)',
                    color: 'var(--color-warning)',
                  }
                : {
                    backgroundColor: 'color-mix(in srgb, var(--color-info) 20%, transparent)',
                    color: 'var(--color-info)',
                  }
            }
          >
            {eventInfo.scope}
          </span>
        )}
      </div>

      {/* Description */}
      {eventInfo.description && (
        <p className="text-xs italic" style={{ color: 'var(--color-muted-foreground)' }}>{eventInfo.description}</p>
      )}

      {/* Source trait and tick */}
      {(eventInfo.sourceTrait || eventInfo.sourceTick) && (
        <div className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
          <span style={{ color: 'var(--color-accent)' }}>emit from:</span>{" "}
          {eventInfo.sourceTrait}
          {eventInfo.sourceTick && (
            <span className="ml-1" style={{ color: 'var(--color-warning)' }}>
              (tick: {eventInfo.sourceTick})
            </span>
          )}
        </div>
      )}

      {/* Payload schema */}
      {hasPayload && (
        <div className="border-t pt-2 mt-2" style={{ borderColor: 'var(--color-border)' }}>
          <div className="text-xs font-medium mb-1" style={{ color: 'var(--color-warning)' }}>
            Payload:
          </div>
          <div className="space-y-1 pl-2">
            {eventInfo.payload!.map((field, idx) => (
              <PayloadFieldDisplay key={idx} field={field} />
            ))}
          </div>
        </div>
      )}

      {/* Listener info */}
      {eventInfo.listener && (
        <div className="border-t pt-2 mt-2" style={{ borderColor: 'var(--color-border)' }}>
          <div className="text-xs font-medium mb-1" style={{ color: 'var(--color-success)' }}>
            Triggers:{" "}
            <span className="font-mono" style={{ color: 'var(--color-foreground)' }}>
              {eventInfo.listener.triggers}
            </span>
          </div>
          {eventInfo.listener.sourceTrait && (
            <div className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
              <span style={{ color: 'var(--color-success)' }}>listen in:</span>{" "}
              {eventInfo.listener.sourceTrait}
            </div>
          )}
          {eventInfo.listener.guard && (
            <div className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>
              Guard:{" "}
              <span className="font-mono" style={{ color: 'var(--color-foreground)' }}>
                {eventInfo.listener.guard}
              </span>
            </div>
          )}
          {hasMapping && (
            <div className="mt-1">
              <div className="text-xs font-medium" style={{ color: 'var(--color-info)' }}>
                Payload Mapping:
              </div>
              <div className="pl-2 space-y-0.5">
                {Object.entries(eventInfo.listener.payloadMapping!).map(
                  ([key, value]) => (
                    <div key={key} className="text-xs">
                      <span style={{ color: 'var(--color-muted-foreground)' }}>{key}</span>
                      <span className="mx-1" style={{ color: 'var(--color-muted-foreground)' }}>←</span>
                      <span className="font-mono" style={{ color: 'var(--color-info)' }}>{value}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// Tooltip Component (enhanced with event contracts)
// ============================================================================

const BundleTooltip: React.FC<{
  state: TooltipState;
  nodes: OrbitalNode[];
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ state, nodes, onClose, onMouseEnter, onMouseLeave }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [hasBeenDragged, setHasBeenDragged] = useState(false);

  // Reset drag state when tooltip changes or becomes unpinned
  React.useEffect(() => {
    if (!state.pinned) {
      setHasBeenDragged(false);
    }
  }, [state.pinned, state.bundle?.id]);

  // Adjust position after render to ensure tooltip stays in viewport
  React.useLayoutEffect(() => {
    // Don't reposition if user has dragged it
    if (hasBeenDragged) {
      return;
    }

    if (!state.visible || !state.bundle || !tooltipRef.current) {
      return;
    }

    const tooltip = tooltipRef.current;
    const rect = tooltip.getBoundingClientRect();
    const tooltipWidth = rect.width;
    const tooltipHeight = rect.height;
    const padding = 20; // Padding from viewport edges

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate available space on each side of the anchor point
    const spaceRight = viewportWidth - state.x - padding;
    const spaceLeft = state.x - padding;
    const spaceBelow = viewportHeight - state.y - padding;
    const spaceAbove = state.y - padding;

    let left: number;
    let top: number;

    // Horizontal positioning: prefer right, fallback to left, then center
    if (spaceRight >= tooltipWidth + 40) {
      // Place to the right of the event label
      left = state.x + 40;
    } else if (spaceLeft >= tooltipWidth + 40) {
      // Place to the left of the event label
      left = state.x - tooltipWidth - 40;
    } else {
      // Center horizontally and clamp to viewport
      left = Math.max(
        padding,
        Math.min(
          state.x - tooltipWidth / 2,
          viewportWidth - tooltipWidth - padding,
        ),
      );
    }

    // Vertical positioning: prefer centered on label, adjust if needed
    top = state.y - tooltipHeight / 2;

    // Clamp vertical position to viewport
    if (top < padding) {
      top = padding;
    } else if (top + tooltipHeight > viewportHeight - padding) {
      top = viewportHeight - tooltipHeight - padding;
    }

    // Final safety clamps
    left = Math.max(
      padding,
      Math.min(left, viewportWidth - tooltipWidth - padding),
    );
    top = Math.max(
      padding,
      Math.min(top, viewportHeight - tooltipHeight - padding),
    );

    setPosition({ left, top });
  }, [state.visible, state.bundle, state.x, state.y, hasBeenDragged]);

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!state.pinned) return;

    // Only drag from the header area (first 40px)
    const rect = tooltipRef.current?.getBoundingClientRect();
    if (!rect) return;

    const relativeY = e.clientY - rect.top;
    if (relativeY > 40) return; // Only allow dragging from top area

    e.preventDefault();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.left,
      y: e.clientY - position.top,
    });
  };

  // Handle drag move
  React.useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setHasBeenDragged(true);
      setPosition({
        left: e.clientX - dragOffset.x,
        top: e.clientY - dragOffset.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  if (!state.visible || !state.bundle) return null;

  const { eventDetails } = state.bundle;

  // Check if we have detailed info to show
  const hasDetailedInfo = eventDetails.some(
    (e) => e.payload?.length || e.description || e.listener?.payloadMapping,
  );

  return createPortal(
    <div
      ref={tooltipRef}
      className={`fixed z-[99999] pointer-events-auto ${isDragging ? "cursor-grabbing" : ""}`}
      style={{
        left: position.left,
        top: position.top,
        userSelect: isDragging ? "none" : "auto",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={handleMouseDown}
    >
      <div
        className={`rounded-lg shadow-xl border p-4 relative ${state.pinned ? "cursor-grab" : ""}`}
        style={{
          backgroundColor: "rgba(22, 27, 34, 0.98)",
          borderColor: state.pinned ? "var(--color-success)" : "#8b5cf6",
          borderWidth: state.pinned ? 2 : 1,
          maxWidth: "450px",
          maxHeight: "500px",
          overflowY: "auto",
        }}
      >
        {/* Pinned header bar with drag handle and close button */}
        {state.pinned && (
          <div className="flex items-center justify-between mb-2 -mt-1">
            <div
              className="px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{ backgroundColor: "var(--color-success)", color: "#fff" }}
            >
              Drag to move
            </div>
            <button
              onClick={onClose}
              className="w-6 h-6 rounded-full text-sm flex items-center justify-center pointer-events-auto"
              style={{ backgroundColor: 'var(--color-error)', color: '#fff' }}
            >
              x
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-semibold" style={{ color: 'var(--color-accent)' }}>
            {state.bundle.from}
          </span>
          <span style={{ color: 'var(--color-muted-foreground)' }}>→</span>
          <span className="font-semibold" style={{ color: 'var(--color-success)' }}>
            {state.bundle.to}
          </span>
        </div>

        {/* Event count summary */}
        <div className="text-sm mb-3 flex items-center gap-2" style={{ color: 'var(--color-muted-foreground)' }}>
          <span>
            {state.bundle.events.length} event
            {state.bundle.events.length !== 1 ? "s" : ""}
          </span>
          {!state.pinned && hasDetailedInfo && (
            <span className="text-xs" style={{ color: 'var(--color-info)' }}>
              (click to pin & see details)
            </span>
          )}
        </div>

        {/* Event details - show full info when pinned, compact when not */}
        <div className="space-y-2">
          {state.pinned
            ? // Full event contract cards when pinned
              eventDetails.map((eventInfo, idx) => (
                <EventContractCard key={idx} eventInfo={eventInfo} />
              ))
            : // Compact list when just hovering
              state.bundle.events.map((event, idx) => {
                const eventInfo = eventDetails[idx];
                // Parse namespaced event for display
                const isNamespaced = event.includes(".");
                const [traitNs, eventName] = isNamespaced
                  ? event.split(".")
                  : [null, event];
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-sm font-mono px-2 py-1 rounded"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                  >
                    {isNamespaced && (
                      <span className="text-xs" style={{ color: 'var(--color-accent)' }}>
                        {traitNs}.
                      </span>
                    )}
                    <span style={{ color: 'var(--color-foreground)' }}>{eventName}</span>
                    {eventInfo?.scope === "external" && (
                      <span className="text-xs" style={{ color: 'var(--color-warning)' }}>ext</span>
                    )}
                    {eventInfo?.payload?.length ? (
                      <span className="text-xs" style={{ color: 'var(--color-warning)' }}>
                        ({eventInfo.payload.length} fields)
                      </span>
                    ) : null}
                    {eventInfo?.sourceTick && (
                      <span className="text-xs" style={{ color: 'var(--color-warning)' }}>tick</span>
                    )}
                  </div>
                );
              })}
        </div>
      </div>
    </div>,
    document.body,
  );
};

// ============================================================================
// Main Component
// ============================================================================

export const OrbitalSchemaVisualizer: React.FC<
  OrbitalSchemaVisualizerProps
> = ({ schema, className = "" }) => {
  const [selectedOrbital, setSelectedOrbital] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredBundleId, setHoveredBundleId] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    pinned: false,
    x: 0,
    y: 0,
    bundle: null,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Layout orbitals
  const { nodes, width, height } = useMemo(() => {
    if (!schema?.orbitals) return { nodes: [], width: 800, height: 600 };
    return layoutOrbitals(schema.orbitals);
  }, [schema]);

  // Bundle connections (like transition bundling)
  const bundles = useMemo(() => bundleConnections(nodes), [nodes]);

  // Assign lane indices to prevent label overlaps
  const laneMap = useMemo(
    () => assignLaneIndices(bundles, nodes),
    [bundles, nodes],
  );

  // Find selected trait for modal
  const selectedTraitName = useMemo(() => {
    if (!selectedOrbital || !schema?.orbitals) return undefined;
    const orbital = schema.orbitals.find(
      (o: Orbital) => isOrbitalDefinition(o) && o.name === selectedOrbital,
    );
    if (orbital && isOrbitalDefinition(orbital) && orbital.traits?.length > 0) {
      const firstTrait = orbital.traits[0];
      return typeof firstTrait === "object" && "name" in firstTrait
        ? firstTrait.name
        : undefined;
    }
    return undefined;
  }, [selectedOrbital, schema]);

  const handleNodeClick = useCallback((nodeName: string) => {
    setSelectedOrbital(nodeName);
  }, []);

  // Ref to track if mouse is over tooltip
  const tooltipHoverRef = useRef(false);
  const hideTimeoutRef = useRef<number | null>(null);

  const clearHideTimeout = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const scheduleHide = useCallback(() => {
    clearHideTimeout();
    hideTimeoutRef.current = window.setTimeout(() => {
      if (!tooltipHoverRef.current) {
        setHoveredBundleId(null);
        setTooltip((prev) => ({ ...prev, visible: false, bundle: null }));
      }
    }, 400);
  }, [clearHideTimeout]);

  const handleBundleHover = useCallback(
    (bundle: ConnectionBundle | null, x: number, y: number) => {
      if (tooltip.pinned) return;

      if (bundle && containerRef.current) {
        clearHideTimeout();
        const rect = containerRef.current.getBoundingClientRect();
        setHoveredBundleId(bundle.id);
        setTooltip({
          visible: true,
          pinned: false,
          x: rect.left + x,
          y: rect.top + y,
          bundle,
        });
      } else {
        scheduleHide();
      }
    },
    [tooltip.pinned, clearHideTimeout, scheduleHide],
  );

  const handleTooltipMouseEnter = useCallback(() => {
    tooltipHoverRef.current = true;
    clearHideTimeout();
  }, [clearHideTimeout]);

  const handleTooltipMouseLeave = useCallback(() => {
    tooltipHoverRef.current = false;
    scheduleHide();
  }, [scheduleHide]);

  const handleBundleClick = useCallback((bundle: ConnectionBundle) => {
    if (containerRef.current) {
      // Toggle pin or show tooltip
      setTooltip((prev) => ({
        ...prev,
        visible: true,
        pinned: !prev.pinned || prev.bundle?.id !== bundle.id,
        bundle,
      }));
    }
  }, []);

  const handleTooltipClose = useCallback(() => {
    setTooltip({ visible: false, pinned: false, x: 0, y: 0, bundle: null });
  }, []);

  if (!schema) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingState message="Loading schema..." />
      </div>
    );
  }

  if (nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Typography
            variant="h6"
            className="mb-2"
            style={{ color: 'var(--color-muted-foreground)' }}
          >
            No Orbitals Found
          </Typography>
          <Typography
            variant="body2"
            style={{ color: 'var(--color-muted-foreground)' }}
          >
            This schema doesn't contain any orbital definitions.
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className={`overflow-auto ${className}`}
        style={{ height: "100%", backgroundColor: 'var(--color-background)' }}
      >
        <div
          className="relative"
          style={{ width, height, minWidth: "100%", minHeight: "100%" }}
        >
          {/* Title */}
          <div className="absolute top-4 left-6 z-10">
            <Typography variant="h5" style={{ color: 'var(--color-foreground)' }}>
              {schema.name} — Orbital Graph
            </Typography>
            <Typography variant="caption" style={{ color: 'var(--color-muted-foreground)' }}>
              Click an orbital to view its state machine • Hover connections for
              details
            </Typography>
          </div>

          {/* SVG Layer for connections */}
          <svg
            className="absolute inset-0"
            width={width}
            height={height}
            style={{ zIndex: 5 }}
          >
            {bundles.map((bundle) => {
              // Use pre-calculated lane index for consistent spacing
              const bundleIndex = laneMap.get(bundle.id) || 0;
              const samePairBundles = bundles.filter(
                (b) =>
                  [b.from, b.to].sort().join("-") ===
                  [bundle.from, bundle.to].sort().join("-"),
              );

              return (
                <ConnectionArrow
                  key={bundle.id}
                  bundle={bundle}
                  nodes={nodes}
                  bundleIndex={bundleIndex}
                  totalBundlesForPair={samePairBundles.length}
                  isHighlighted={hoveredBundleId === bundle.id}
                  isDimmed={
                    hoveredBundleId !== null && hoveredBundleId !== bundle.id
                  }
                  onHover={handleBundleHover}
                  onClick={handleBundleClick}
                />
              );
            })}
          </svg>

          {/* Orbital Nodes (Atomic P-Shell treatment) */}
          {nodes.map((node) => (
            <div
              key={node.id}
              className="absolute cursor-pointer transition-all duration-200"
              style={{
                left: node.x - node.radius,
                top: node.y - node.radius,
                width: node.radius * 2,
                height: node.radius * 2,
                zIndex: hoveredNode === node.name ? 20 : 10,
              }}
              onClick={() => handleNodeClick(node.name)}
              onMouseEnter={() => setHoveredNode(node.name)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* P-Shell Upper Lobe */}
              <div
                className="absolute left-1/2 -translate-x-1/2 transition-all duration-300"
                style={{
                  top: -20,
                  width: 40,
                  height: 50,
                  background:
                    hoveredNode === node.name
                      ? "radial-gradient(ellipse 50% 70% at 50% 80%, rgba(20,184,166,0.5) 0%, rgba(20,184,166,0.2) 50%, transparent 100%)"
                      : "radial-gradient(ellipse 50% 70% at 50% 80%, rgba(20,184,166,0.3) 0%, rgba(20,184,166,0.1) 50%, transparent 100%)",
                  borderRadius: "50% 50% 40% 40%",
                  transform:
                    hoveredNode === node.name ? "scaleY(1.15)" : "scaleY(1)",
                }}
              />

              {/* P-Shell Lower Lobe */}
              <div
                className="absolute left-1/2 -translate-x-1/2 transition-all duration-300"
                style={{
                  bottom: -20,
                  width: 40,
                  height: 50,
                  background:
                    hoveredNode === node.name
                      ? "radial-gradient(ellipse 50% 70% at 50% 20%, rgba(20,184,166,0.5) 0%, rgba(20,184,166,0.2) 50%, transparent 100%)"
                      : "radial-gradient(ellipse 50% 70% at 50% 20%, rgba(20,184,166,0.3) 0%, rgba(20,184,166,0.1) 50%, transparent 100%)",
                  borderRadius: "40% 40% 50% 50%",
                  transform:
                    hoveredNode === node.name ? "scaleY(1.15)" : "scaleY(1)",
                }}
              />

              {/* Main nucleus orb */}
              <div
                className="absolute inset-3 rounded-full flex flex-col items-center justify-center transition-all duration-200"
                style={{
                  background:
                    "linear-gradient(135deg, #0d9488 0%, #0f766e 50%, #115e59 100%)",
                  boxShadow:
                    hoveredNode === node.name
                      ? "0 0 30px 5px rgba(20,184,166,0.4), inset 0 0 15px rgba(255,255,255,0.08)"
                      : "0 0 15px 2px rgba(20,184,166,0.2), inset 0 0 10px rgba(255,255,255,0.05)",
                  border: "2px solid rgba(94,234,212,0.5)",
                  transform:
                    hoveredNode === node.name ? "scale(1.05)" : "scale(1)",
                }}
              >
                {/* Highlight */}
                <div
                  className="absolute inset-1 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                  }}
                />

                {/* Content */}
                <span
                  className="font-bold text-center px-2 z-10"
                  style={{
                    fontSize: "13px",
                    textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                    color: 'var(--color-foreground)',
                  }}
                >
                  {node.name}
                </span>
                {node.entityName && (
                  <span
                    className="text-center z-10 mt-0.5"
                    style={{ fontSize: "10px", opacity: 0.8, color: 'var(--color-primary)' }}
                  >
                    {node.entityName}
                  </span>
                )}
              </div>

              {/* Stats badges */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                {node.traitCount > 0 && (
                  <span
                    className="px-1.5 py-0.5 text-[10px] font-semibold rounded-md shadow-sm border"
                    style={{
                      backgroundColor: 'var(--color-card)',
                      borderColor: 'color-mix(in srgb, var(--color-accent) 50%, transparent)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    {node.traitCount}T
                  </span>
                )}
                {node.pageCount > 0 && (
                  <span
                    className="px-1.5 py-0.5 text-[10px] font-semibold rounded-md shadow-sm border"
                    style={{
                      backgroundColor: 'var(--color-card)',
                      borderColor: 'color-mix(in srgb, var(--color-info) 50%, transparent)',
                      color: 'var(--color-info)',
                    }}
                  >
                    {node.pageCount}P
                  </span>
                )}
              </div>

              {/* Emit/Listen indicators with scope awareness */}
              {node.emits.length > 0 &&
                (() => {
                  const externalCount = node.emits.filter(
                    (e) => e.scope === "external",
                  ).length;
                  const hasPayload = node.emits.some((e) => e.payload?.length);
                  return (
                    <div
                      className="absolute -right-1 top-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5"
                      title={`${node.emits.length} emits (${externalCount} external)`}
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
                        style={{
                          backgroundColor: externalCount > 0
                            ? 'var(--color-warning)'
                            : 'color-mix(in srgb, var(--color-warning) 70%, transparent)',
                          color: '#fff',
                        }}
                      >
                        ↗
                      </div>
                      {hasPayload && (
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: 'var(--color-warning)' }}
                          title="Has payload schema"
                        />
                      )}
                    </div>
                  );
                })()}
              {node.listens.length > 0 &&
                (() => {
                  const externalCount = node.listens.filter(
                    (l) => l.scope === "external",
                  ).length;
                  const hasMapping = node.listens.some(
                    (l) =>
                      l.payloadMapping &&
                      Object.keys(l.payloadMapping).length > 0,
                  );
                  return (
                    <div
                      className="absolute -left-1 top-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5"
                      title={`${node.listens.length} listens (${externalCount} external)`}
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
                        style={{
                          backgroundColor: externalCount > 0
                            ? 'var(--color-success)'
                            : 'color-mix(in srgb, var(--color-success) 70%, transparent)',
                          color: '#fff',
                        }}
                      >
                        ↙
                      </div>
                      {hasMapping && (
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: 'var(--color-info)' }}
                          title="Has payload mapping"
                        />
                      )}
                    </div>
                  );
                })()}
            </div>
          ))}

          {/* Legend - Enhanced for event contracts */}
          <div
            className="absolute bottom-4 right-4 rounded-lg p-3 text-xs z-10"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-card) 90%, transparent)',
              color: 'var(--color-muted-foreground)',
            }}
          >
            <div className="font-medium mb-2" style={{ color: 'var(--color-foreground)' }}>Legend</div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-warning)' }}></span>
              <span>Emits events (external)</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'color-mix(in srgb, var(--color-warning) 70%, transparent)' }}></span>
              <span>Emits events (internal)</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-success)' }}></span>
              <span>Listens to events (external)</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'color-mix(in srgb, var(--color-success) 70%, transparent)' }}></span>
              <span>Listens to events (internal)</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-4 h-0.5" style={{ backgroundColor: 'var(--color-accent)' }}></span>
              <span>Event connection</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-1 text-xs rounded" style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}>
                N
              </span>
              <span>Bundled events</span>
            </div>
            <div className="border-t mt-2 pt-2" style={{ borderColor: 'var(--color-border)' }}>
              <div className="mb-1" style={{ color: 'var(--color-muted-foreground)' }}>Contract indicators:</div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-warning)' }}></span>
                <span>Has payload schema</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-info)' }}></span>
                <span>Has payload mapping</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip Portal */}
      <BundleTooltip
        state={tooltip}
        nodes={nodes}
        onClose={handleTooltipClose}
        onMouseEnter={handleTooltipMouseEnter}
        onMouseLeave={handleTooltipMouseLeave}
      />

      {/* Detail Modal */}
      <OrbitalVisualizerModal
        isOpen={selectedOrbital !== null}
        onClose={() => setSelectedOrbital(null)}
        schema={schema}
        selectedTraitName={selectedTraitName}
      />
    </>
  );
};

export { OrbitalSchemaVisualizer as OrbitalNetworkView };
export default OrbitalSchemaVisualizer;
