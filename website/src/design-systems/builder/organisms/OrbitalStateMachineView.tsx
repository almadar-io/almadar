/**
 * OrbitalStateMachineView - State Machine Visualizer
 *
 * A hybrid DOM/SVG component for visualizing state machines.
 * Uses SVG for arrow paths, DOM for tooltips.
 *
 * BUNDLING: When multiple transitions exist between the same states (same direction),
 * they are bundled into a single arrow with a badge showing the count.
 * Hovering shows all events and their effects in a detailed tooltip.
 *
 * Events Emitted:
 * - UI:STATE_CLICK - When a state node is clicked
 * - UI:TRANSITION_CLICK - When a transition bundle is clicked
 */

import React, { useState, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import type {
    DomLayoutData,
    DomStateNode,
    DomTransitionLabel,
    DomEntityBox,
    DomOutputsBox,
    VisualizerConfig,
} from '@almadar/ui/lib';
import { Box, VStack, HStack, Typography, Button, Icon } from '@almadar/ui';
import { X } from 'lucide-react';

// =============================================================================
// Types
// =============================================================================

interface DomStateMachineVisualizerProps {
    layoutData: DomLayoutData;
    /** Callback when a transition bundle is clicked */
    onTransitionClick?: (labels: DomTransitionLabel[]) => void;
    /** Callback when a state is clicked */
    onStateClick?: (state: DomStateNode) => void;
    className?: string;
}

/** Bundled transitions between same from→to states */
interface TransitionBundle {
    id: string;
    from: string;
    to: string;
    labels: DomTransitionLabel[];
    isBidirectional: boolean;
    isReverse: boolean; // true if from > to alphabetically (for curve direction)
}

interface TooltipState {
    visible: boolean;
    pinned: boolean; // true when clicked to lock in place
    x: number;
    y: number;
    bundle: TransitionBundle | null;
}

// =============================================================================
// Sub-Components
// =============================================================================

/** Renders a single state node as a positioned div with a circle */
const StateNode: React.FC<{
    state: DomStateNode;
    config: VisualizerConfig;
    onClick?: (state: DomStateNode) => void;
}> = ({ state, config, onClick }) => {
    const size = state.radius * 2;

    let borderColor = config.colors.nodeBorder;
    let borderWidth = 2;

    if (state.isInitial) {
        borderColor = config.colors.initialNode;
        borderWidth = 3;
    } else if (state.isFinal) {
        borderColor = config.colors.finalNode;
        borderWidth = 3;
    }

    return (
        <Box
            className="absolute flex items-center justify-center cursor-pointer transition-all hover:scale-105"
            style={{
                left: state.x - state.radius,
                top: state.y - state.radius,
                width: size,
                height: size,
                zIndex: 5, // States are below transitions
            }}
            onClick={() => onClick?.(state)}
            title={state.description}
        >
            {/* Main circle */}
            <Box
                className="absolute inset-0 rounded-full flex items-center justify-center"
                style={{
                    backgroundColor: config.colors.node,
                    border: `${borderWidth}px solid ${borderColor}`,
                }}
            >
                {/* Inner circle for final states */}
                {state.isFinal && (
                    <Box
                        className="absolute rounded-full"
                        style={{
                            width: size - 12,
                            height: size - 12,
                            border: `2px solid ${borderColor}`,
                        }}
                    />
                )}
                <Typography
                    variant="label"
                    weight="semibold"
                    align="center"
                    className="px-2"
                    style={{
                        color: config.colors.nodeText,
                        fontSize: '18px',
                        fontFamily: 'Inter, sans-serif',
                    }}
                >
                    {state.name}
                </Typography>
            </Box>

            {/* Initial state indicator arrow */}
            {state.isInitial && (
                <svg
                    className="absolute"
                    style={{
                        left: -45,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 40,
                        height: 20,
                    }}
                >
                    <defs>
                        <marker
                            id="initial-arrow"
                            viewBox="0 0 10 10"
                            refX="8"
                            refY="5"
                            markerWidth="6"
                            markerHeight="6"
                            orient="auto"
                        >
                            <path d="M 0 0 L 10 5 L 0 10 z" fill={config.colors.initial} />
                        </marker>
                    </defs>
                    <path
                        d="M 0 10 L 35 10"
                        stroke={config.colors.initial}
                        strokeWidth="2"
                        fill="none"
                        markerEnd="url(#initial-arrow)"
                    />
                </svg>
            )}
        </Box>
    );
};

/**
 * Renders a transition bundle (one or more transitions same direction)
 * Single transition: shows event name inline
 * Multiple transitions: shows "N events" with bundle indicator
 *
 * Includes obstacle avoidance - curves around intermediate states
 */
const TransitionBundleArrow: React.FC<{
    bundle: TransitionBundle;
    states: DomStateNode[];
    bundleIndex: number;
    totalBundlesForPair: number;
    config: VisualizerConfig;
    onClick?: (bundle: TransitionBundle) => void;
    onHover: (bundle: TransitionBundle | null, x: number, y: number) => void;
}> = ({ bundle, states, bundleIndex, totalBundlesForPair, config, onClick, onHover }) => {
    const groupRef = useRef<SVGGElement>(null);

    const fromState = states.find(s => s.name === bundle.from);
    const toState = states.find(s => s.name === bundle.to);

    if (!fromState || !toState) return null;

    // Check if this is a self-loop (from === to)
    const isSelfLoop = bundle.from === bundle.to;

    // Calculate path geometry
    const dx = toState.x - fromState.x;
    const dy = toState.y - fromState.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // For self-loops, we'll render a loop above or below the state
    if (isSelfLoop) {
        // Self-loop rendering - loop goes up and around the state
        const loopRadius = 50 + bundleIndex * 25; // Increase size for multiple self-loops
        const loopDirection = bundleIndex % 2 === 0 ? -1 : 1; // Alternate above/below

        const cx = fromState.x;
        const cy = fromState.y + (fromState.radius + loopRadius) * loopDirection;

        // Start and end points on the edge of the state
        const startAngle = loopDirection === -1 ? -0.5 : 0.5; // radians offset
        const endAngle = loopDirection === -1 ? 0.5 : -0.5;

        const startX = fromState.x + Math.cos(Math.PI / 2 * loopDirection + startAngle) * fromState.radius;
        const startY = fromState.y + Math.sin(Math.PI / 2 * loopDirection + startAngle) * fromState.radius;
        const endX = fromState.x + Math.cos(Math.PI / 2 * loopDirection + endAngle) * fromState.radius;
        const endY = fromState.y + Math.sin(Math.PI / 2 * loopDirection + endAngle) * fromState.radius;

        const isSingle = bundle.labels.length === 1;
        const labelText = isSingle ? bundle.labels[0].event : `${bundle.labels.length} events`;
        const bundleColor = isSingle ? config.colors.arrow : '#6366f1';
        const labelWidth = labelText.length * 9 + (isSingle ? 24 : 40);

        const loopPath = `M ${startX} ${startY} A ${loopRadius} ${loopRadius} 0 1 ${loopDirection === -1 ? 1 : 0} ${endX} ${endY}`;
        const labelX = cx;
        const labelY = cy + loopRadius * loopDirection * 0.5;

        const uniqueMarkerId = `arrow-self-${bundle.id}`;

        const handleMouseEnter = () => {
            if (groupRef.current) {
                const rect = groupRef.current.getBoundingClientRect();
                onHover(bundle, rect.left + rect.width / 2, rect.top - 8);
            }
        };

        const handleMouseLeave = () => {
            onHover(null, 0, 0);
        };

        return (
            <g
                ref={groupRef}
                className="transition-bundle cursor-pointer"
                data-bundle-id={bundle.id}
                onClick={() => onClick?.(bundle)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ pointerEvents: 'auto' }}
            >
                <defs>
                    <marker
                        id={uniqueMarkerId}
                        viewBox="0 0 10 10"
                        refX="8"
                        refY="5"
                        markerWidth="8"
                        markerHeight="8"
                        orient="auto"
                    >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill={bundleColor} />
                    </marker>
                </defs>
                <path
                    d={loopPath}
                    stroke={bundleColor}
                    strokeWidth={isSingle ? 1.5 : 2.5}
                    fill="none"
                    markerEnd={`url(#${uniqueMarkerId})`}
                />
                {/* Label */}
                <rect
                    x={labelX - labelWidth / 2}
                    y={labelY - 14}
                    width={labelWidth}
                    height={28}
                    rx={isSingle ? 4 : 14}
                    fill={isSingle ? config.colors.background : '#4f46e5'}
                    stroke={bundleColor}
                    strokeWidth={isSingle ? 1 : 0}
                />
                <text
                    x={labelX}
                    y={labelY + 5}
                    textAnchor="middle"
                    fill={isSingle ? config.colors.arrowText : '#ffffff'}
                    fontFamily="JetBrains Mono, monospace"
                    fontSize="13px"
                    fontWeight={isSingle ? 600 : 700}
                >
                    {labelText}
                </text>
            </g>
        );
    }

    // Non-self-loop: normal transition
    if (dist === 0) return null;

    const nx = dx / dist;
    const ny = dy / dist;

    // Start and end at node edges
    const startX = fromState.x + nx * fromState.radius;
    const startY = fromState.y + ny * fromState.radius;
    const endX = toState.x - nx * (toState.radius + 8);
    const endY = toState.y - ny * (toState.radius + 8);

    // Find intermediate states that might be in the path
    const intermediateStates = states.filter(s => {
        if (s.name === bundle.from || s.name === bundle.to) return false;

        // Check if state is roughly between from and to
        const sx = s.x, sy = s.y;

        // Project state onto the line from→to
        const t = ((sx - fromState.x) * dx + (sy - fromState.y) * dy) / (dist * dist);
        if (t < 0.1 || t > 0.9) return false; // Not between

        // Distance from state to line
        const projX = fromState.x + t * dx;
        const projY = fromState.y + t * dy;
        const distToLine = Math.sqrt((sx - projX) ** 2 + (sy - projY) ** 2);

        // If state is close to the direct line, it's an obstacle
        return distToLine < s.radius + 80; // 80px buffer
    });

    // Determine curve direction and amount based on obstacles and lane assignment
    const baseCurveDirection = bundle.isReverse ? 1 : -1;

    // Lane calculation: each bundle gets a unique lane based on index
    // INCREASED spacing: 55px base + 55px per lane (was 40 + 35)
    const lane = bundleIndex;
    const laneOffset = 55 + lane * 55; // Increased from 40 + lane * 35

    // If there are obstacles, check which direction to curve to avoid them
    let avoidanceOffset = 0;
    if (intermediateStates.length > 0) {
        // Find the obstacle closest to the midpoint
        const midX = (fromState.x + toState.x) / 2;
        const midY = (fromState.y + toState.y) / 2;

        // Calculate perpendicular direction
        const perpDirX = -ny;
        const perpDirY = nx;

        // Check which side has obstacles
        let obstaclesAbove = 0, obstaclesBelow = 0;
        intermediateStates.forEach(s => {
            const relX = s.x - midX;
            const relY = s.y - midY;
            const perpDist = relX * perpDirX + relY * perpDirY;
            if (perpDist > 0) obstaclesAbove++;
            else obstaclesBelow++;
        });

        // Route to the side with fewer obstacles
        if (obstaclesAbove > obstaclesBelow) {
            avoidanceOffset = -100; // Increased from -80
        } else {
            avoidanceOffset = 100; // Increased from 80
        }
    }

    // Final curve amount combines: base offset + lane stacking + avoidance
    const baseOffset = bundle.isBidirectional ? 60 : 40; // Increased from 50/30
    const curveAmount = (baseOffset + laneOffset) * baseCurveDirection + avoidanceOffset;

    // Calculate midpoint and control point for quadratic bezier
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    // Perpendicular offset for curve
    const perpX = -ny * curveAmount;
    const perpY = nx * curveAmount;

    const controlX = midX + perpX;
    const controlY = midY + perpY;

    // Determine label text
    const isSingle = bundle.labels.length === 1;
    const labelText = isSingle
        ? bundle.labels[0].event
        : `${bundle.labels.length} events`;

    // Calculate the label width for gap in the line
    const labelWidth = labelText.length * 9 + (isSingle ? 24 : 40);
    const gapHalf = labelWidth / 2;

    // Bezier point calculation: B(t) = (1-t)²P0 + 2(1-t)tP1 + t²P2
    const bezierPoint = (t: number) => ({
        x: (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX,
        y: (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY,
    });

    // Label position at EXACT curve midpoint (t=0.5), directly ON the line
    const curveMidpoint = bezierPoint(0.5);
    const labelX = curveMidpoint.x;
    const labelY = curveMidpoint.y;

    // Calculate points along bezier for splitting (gap around label)
    const gapT = (gapHalf / dist) * 0.8;
    const t1 = Math.max(0.15, 0.5 - gapT);
    const t2 = Math.min(0.85, 0.5 + gapT);

    const gapStart = bezierPoint(t1);
    const gapEnd = bezierPoint(t2);

    // First segment: start to gap
    const path1 = `M ${startX} ${startY} Q ${controlX} ${controlY} ${gapStart.x} ${gapStart.y}`;
    // Second segment: gap to end
    const path2 = `M ${gapEnd.x} ${gapEnd.y} Q ${controlX} ${controlY} ${endX} ${endY}`;

    const handleMouseEnter = useCallback(() => {
        if (groupRef.current) {
            const rect = groupRef.current.getBoundingClientRect();
            // Position tooltip ABOVE the event, not below
            onHover(bundle, rect.left + rect.width / 2, rect.top - 8);
        }
    }, [bundle, onHover]);

    const handleMouseLeave = useCallback(() => {
        onHover(null, 0, 0);
    }, [onHover]);

    const uniqueMarkerId = `arrow-${bundle.id}`;

    // Bundle styling
    const hasDetails = bundle.labels.some(l => l.hasDetails);
    const bundleColor = isSingle ? config.colors.arrow : '#6366f1'; // Indigo for bundles

    return (
        <g
            ref={groupRef}
            className="transition-bundle cursor-pointer"
            data-bundle-id={bundle.id}
            onClick={() => onClick?.(bundle)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ pointerEvents: 'auto' }}
        >
            {/* Arrow marker */}
            <defs>
                <marker
                    id={uniqueMarkerId}
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="8"
                    markerHeight="8"
                    orient="auto"
                >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill={bundleColor} />
                </marker>
            </defs>

            {/* Single continuous bezier curve from start to end */}
            <path
                d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`}
                stroke={bundleColor}
                strokeWidth={isSingle ? 1.5 : 2.5}
                fill="none"
                markerEnd={`url(#${uniqueMarkerId})`}
            />

            {/* Label background masks the line visually */}

            {/* Label Background */}
            <rect
                x={labelX - labelWidth / 2}
                y={labelY - 14}
                width={labelWidth}
                height={28}
                rx={isSingle ? 4 : 14}
                fill={isSingle ? config.colors.background : '#4f46e5'}
                stroke={bundleColor}
                strokeWidth={isSingle ? 1 : 0}
            />

            {/* Label Text */}
            <text
                x={labelX}
                y={labelY + 5}
                textAnchor="middle"
                fill={isSingle ? config.colors.arrowText : '#ffffff'}
                fontFamily="JetBrains Mono, monospace"
                fontSize="13px"
                fontWeight={isSingle ? 600 : 700}
            >
                {labelText}
            </text>

            {/* Detail indicator for single transitions */}
            {isSingle && hasDetails && (
                <circle
                    cx={labelX + labelWidth / 2 - 6}
                    cy={labelY - 10}
                    r={4}
                    fill={config.colors.guardText}
                />
            )}

            {/* Bundle count badge (for multi-event bundles) */}
            {!isSingle && (
                <circle
                    cx={labelX + labelWidth / 2 - 4}
                    cy={labelY - 10}
                    r={8}
                    fill="#ef4444"
                    stroke="#ffffff"
                    strokeWidth={1}
                />
            )}
        </g>
    );
};

/** Portaled tooltip for transition bundle details */
const BundleTooltip: React.FC<{
    tooltip: TooltipState;
    config: VisualizerConfig;
    onClose?: () => void;
}> = ({ tooltip, config, onClose }) => {
    if (!tooltip.visible || !tooltip.bundle) return null;

    const { bundle } = tooltip;
    const isSingle = bundle.labels.length === 1;

    // Estimate tooltip height (rough estimate based on content)
    const estimatedHeight = isSingle
        ? (bundle.labels[0].guardText || bundle.labels[0].effectTexts.length > 0 ? 120 : 60)
        : Math.min(400, 80 + bundle.labels.length * 60);

    // Check if tooltip would go off the top of the viewport
    const wouldGoOffTop = tooltip.y - estimatedHeight < 20;

    // Calculate safe position
    const safeX = Math.max(200, Math.min(tooltip.x, window.innerWidth - 200));
    const safeY = wouldGoOffTop ? tooltip.y + 40 : tooltip.y; // If off top, show below instead

    // Transform based on position
    const transform = wouldGoOffTop
        ? 'translateX(-50%)' // Position below
        : 'translate(-50%, -100%)'; // Position above

    return createPortal(
        <Box
            className={`fixed z-50 animate-in fade-in-0 zoom-in-95 duration-150 ${tooltip.pinned ? 'pointer-events-auto' : 'pointer-events-none'}`}
            style={{
                left: safeX,
                top: safeY,
                transform,
                maxHeight: 'calc(100vh - 40px)',
                overflow: 'auto',
            }}
        >
            <Box
                className="rounded-lg shadow-xl border px-4 py-3 max-w-lg relative"
                style={{
                    backgroundColor: 'rgba(22, 27, 34, 0.98)',
                    borderColor: tooltip.pinned ? '#22c55e' : (isSingle ? config.colors.nodeBorder : '#6366f1'),
                    borderWidth: tooltip.pinned ? 2 : (isSingle ? 1 : 2),
                }}
            >
                {/* Close button when pinned */}
                {tooltip.pinned && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                        style={{ backgroundColor: '#ef4444', padding: 0 }}
                        title="Close"
                    >
                        <Icon icon={X} size="xs" style={{ color: '#ffffff' }} />
                    </Button>
                )}

                {/* Pinned indicator */}
                {tooltip.pinned && (
                    <Box
                        className="absolute -top-2 left-1/2 transform -translate-x-1/2 px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: '#22c55e' }}
                    >
                        <Typography variant="caption" weight="semibold" style={{ color: '#fff' }}>
                            📌 Pinned
                        </Typography>
                    </Box>
                )}

                {/* Header for bundles */}
                {!isSingle && (
                    <HStack
                        gap="sm"
                        align="center"
                        className="font-bold mb-3 pb-2 border-b"
                        style={{
                            color: '#a5b4fc',
                            borderColor: '#4f46e5',
                        }}
                    >
                        <Typography variant="large" style={{ color: '#a5b4fc' }}>{bundle.from}</Typography>
                        <Typography variant="label" style={{ color: '#6b7280' }}>→</Typography>
                        <Typography variant="large" style={{ color: '#a5b4fc' }}>{bundle.to}</Typography>
                        <Box
                            className="ml-2 px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: '#4f46e5' }}
                        >
                            <Typography variant="caption" style={{ color: '#fff' }}>
                                {bundle.labels.length} events
                            </Typography>
                        </Box>
                    </HStack>
                )}

                {/* Events list */}
                <VStack gap="sm">
                    {bundle.labels.map((label, idx) => (
                        <Box
                            key={label.id}
                            className={!isSingle && idx > 0 ? 'pt-2 border-t' : ''}
                            style={{ borderColor: '#30363d' }}
                        >
                            {/* Event name */}
                            <Typography
                                variant="label"
                                weight="semibold"
                                className="mb-1"
                                style={{
                                    color: config.colors.arrowText,
                                    fontFamily: 'JetBrains Mono, monospace',
                                    fontSize: isSingle ? '14px' : '13px',
                                }}
                            >
                                {!isSingle && <Typography variant="caption" as="span" style={{ color: '#6b7280' }}>• </Typography>}
                                {label.event}
                            </Typography>

                            {/* Guard */}
                            {label.guardText && (
                                <HStack gap="sm" align="start" className="ml-3 mb-0.5">
                                    <Typography
                                        variant="caption"
                                        weight="semibold"
                                        style={{ color: config.colors.guardText }}
                                    >
                                        if:
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        style={{ color: config.colors.guardText }}
                                    >
                                        {label.guardText}
                                    </Typography>
                                </HStack>
                            )}

                            {/* Effects */}
                            {label.effectTexts.length > 0 && (
                                <VStack gap="none" className="ml-3">
                                    {label.effectTexts.map((effect, effIdx) => (
                                        <HStack key={effIdx} gap="sm" align="start">
                                            <Typography
                                                variant="caption"
                                                weight="semibold"
                                                style={{ color: config.colors.effectText }}
                                            >
                                                {effIdx === 0 ? '→' : ' '}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                style={{ color: config.colors.effectText }}
                                            >
                                                {effect}
                                            </Typography>
                                        </HStack>
                                    ))}
                                </VStack>
                            )}
                        </Box>
                    ))}
                </VStack>
            </Box>
        </Box>,
        document.body
    );
};

/** Entity input box */
const EntityBox: React.FC<{
    entity: DomEntityBox;
}> = ({ entity }) => {
    return (
        <Box
            className="absolute rounded-lg border-2 p-3"
            style={{
                left: entity.x,
                top: entity.y,
                width: entity.width,
                height: entity.height,
                backgroundColor: '#1a1f2e',
                borderColor: '#4a9eff',
                zIndex: 5,
            }}
        >
            <Typography
                variant="label"
                weight="semibold"
                align="center"
                className="mb-2"
                style={{ color: '#4a9eff', fontSize: '14px' }}
            >
                📦 {entity.name}
            </Typography>
            {entity.fields.map((field, idx) => (
                <Typography
                    key={idx}
                    variant="caption"
                    style={{ color: '#8b949e', fontFamily: 'JetBrains Mono, monospace' }}
                >
                    • {field}
                </Typography>
            ))}
        </Box>
    );
};

/** Outputs box */
const OutputsBox: React.FC<{
    outputs: DomOutputsBox;
}> = ({ outputs }) => {
    return (
        <Box
            className="absolute rounded-lg border-2 p-3"
            style={{
                left: outputs.x,
                top: outputs.y,
                width: outputs.width,
                height: outputs.height,
                backgroundColor: '#1a1f2e',
                borderColor: '#ffb86c',
                zIndex: 5,
            }}
        >
            <Typography
                variant="caption"
                weight="semibold"
                align="center"
                className="mb-2"
                style={{ color: '#ffb86c', fontSize: '13px' }}
            >
                📤 External Effects
            </Typography>
            {outputs.outputs.map((output, idx) => (
                <Typography
                    key={idx}
                    variant="caption"
                    className="mb-0.5"
                    style={{ color: '#e6edf3', fontFamily: 'Inter, sans-serif' }}
                >
                    • {output}
                </Typography>
            ))}
        </Box>
    );
};

/** Legend component */
const Legend: React.FC<{
    config: VisualizerConfig;
    y: number;
}> = ({ config, y }) => {
    const items = [
        { label: 'Initial', color: config.colors.initialNode },
        { label: 'Final', color: config.colors.finalNode },
        { label: 'State', color: config.colors.nodeBorder },
        { label: 'Multi-event', color: '#6366f1' },
    ];

    return (
        <HStack
            gap="md"
            align="center"
            className="absolute"
            style={{ left: 20, top: y, zIndex: 15 }}
        >
            {items.map((item) => (
                <HStack key={item.label} gap="xs" align="center">
                    <Box
                        className="w-3 h-3 rounded-full"
                        style={{
                            backgroundColor: item.label === 'Multi-event' ? item.color : config.colors.node,
                            border: item.label !== 'Multi-event' ? `2px solid ${item.color}` : 'none',
                        }}
                    />
                    <Typography
                        variant="caption"
                        style={{ color: config.colors.arrowText }}
                    >
                        {item.label}
                    </Typography>
                </HStack>
            ))}
        </HStack>
    );
};

// =============================================================================
// Main Component
// =============================================================================

export const DomStateMachineVisualizer: React.FC<DomStateMachineVisualizerProps> = ({
    layoutData,
    onTransitionClick,
    onStateClick,
    className = '',
}) => {
    const [tooltip, setTooltip] = useState<TooltipState>({
        visible: false,
        pinned: false,
        x: 0,
        y: 0,
        bundle: null,
    });

    const handleBundleHover = useCallback((bundle: TransitionBundle | null, x: number, y: number) => {
        // Don't update if pinned
        if (tooltip.pinned) return;

        if (bundle) {
            setTooltip({ visible: true, pinned: false, x, y, bundle });
        } else {
            setTooltip(prev => ({ ...prev, visible: false }));
        }
    }, [tooltip.pinned]);

    const handleBundleClick = useCallback((bundle: TransitionBundle) => {
        // Toggle pin on click
        if (tooltip.pinned && tooltip.bundle?.id === bundle.id) {
            // Unpin if clicking the same bundle
            setTooltip(prev => ({ ...prev, pinned: false, visible: false }));
        } else {
            // Pin the tooltip in place
            const el = document.querySelector(`[data-bundle-id="${bundle.id}"]`);
            if (el) {
                const rect = el.getBoundingClientRect();
                setTooltip({
                    visible: true,
                    pinned: true,
                    x: rect.left + rect.width / 2,
                    y: rect.top - 8,
                    bundle
                });
            }
        }
        onTransitionClick?.(bundle.labels);
    }, [tooltip.pinned, tooltip.bundle?.id, onTransitionClick]);

    const handleCloseTooltip = useCallback(() => {
        setTooltip(prev => ({ ...prev, pinned: false, visible: false }));
    }, []);

    const { width, height, title, states, labels, entity, outputs, config } = layoutData;

    // Bundle transitions by from→to pair
    const bundles = useMemo((): TransitionBundle[] => {
        const bundleMap: Record<string, DomTransitionLabel[]> = {};

        labels.forEach(label => {
            const key = `${label.from}->${label.to}`;
            if (!bundleMap[key]) bundleMap[key] = [];
            bundleMap[key].push(label);
        });

        // Check for bidirectional pairs
        const allPairs = new Set(Object.keys(bundleMap));

        return Object.entries(bundleMap).map(([key, bundleLabels]) => {
            const [from, to] = key.split('->');
            const reverseKey = `${to}->${from}`;
            const isBidirectional = allPairs.has(reverseKey);
            const isReverse = from > to; // Alphabetically later means "reverse" direction

            return {
                id: `bundle-${from}-${to}`,
                from,
                to,
                labels: bundleLabels,
                isBidirectional,
                isReverse,
            };
        });
    }, [labels]);

    return (
        <Box
            className={`relative ${className}`}
            style={{
                width,
                height,
                backgroundColor: config.colors.background,
                borderRadius: '8px',
            }}
        >
            {/* Title */}
            {title && (
                <Typography
                    variant="label"
                    weight="semibold"
                    align="center"
                    className="absolute"
                    style={{
                        left: 0,
                        right: 0,
                        top: 10,
                        color: config.colors.nodeText,
                        fontSize: '14px',
                        fontFamily: 'Inter, sans-serif',
                        zIndex: 15,
                    }}
                >
                    {title}
                </Typography>
            )}

            {/* Content offset for title */}
            <Box
                className="absolute inset-0"
                style={{ top: title ? 30 : 0 }}
            >
                {/* Entity Box */}
                {entity && <EntityBox entity={entity} />}

                {/* States Layer - rendered FIRST (below transitions) */}
                {states.map((state) => (
                    <StateNode
                        key={state.id}
                        state={state}
                        config={config}
                        onClick={onStateClick}
                    />
                ))}

                {/* SVG Layer - Transition bundles (rendered on TOP of states) */}
                <svg
                    className="absolute inset-0"
                    width={width}
                    height={height - (title ? 30 : 0)}
                    style={{ overflow: 'visible', zIndex: 20, pointerEvents: 'none' }}
                >
                    {bundles.map((bundle, idx) => (
                        <TransitionBundleArrow
                            key={bundle.id}
                            bundle={bundle}
                            states={states}
                            bundleIndex={idx}
                            totalBundlesForPair={bundles.length}
                            config={config}
                            onClick={handleBundleClick}
                            onHover={handleBundleHover}
                        />
                    ))}
                </svg>

                {/* Outputs Box */}
                {outputs && <OutputsBox outputs={outputs} />}
            </Box>

            {/* Legend */}
            <Legend config={config} y={height - 25} />

            {/* Portaled Tooltip */}
            <BundleTooltip tooltip={tooltip} config={config} onClose={handleCloseTooltip} />
        </Box>
    );
};

// Re-export with both names for compatibility
export { DomStateMachineVisualizer as OrbitalStateMachineView };
export default DomStateMachineVisualizer;
