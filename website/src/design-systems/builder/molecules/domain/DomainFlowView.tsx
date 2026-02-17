/**
 * DomainFlowView - Visual process flow for Story Mode
 *
 * Renders state transitions as a simplified, readable flow board.
 * Shows events in plain language with cause → effect connections.
 * Designed for non-technical audiences who think in processes, not state machines.
 *
 * Composed of: Card, CardContent, VStack, HStack, Typography, Badge, Divider, Box (from @almadar/ui)
 *              DomainKeyword (from design-system atoms)
 *
 * Event Contract:
 * - Emits: onNodeSelect(stateName: string) — when a state node is clicked
 * - Emits: onConnectionSelect(transition: FlowTransition) — when a connection is clicked
 */

import React, { useState } from "react";
import {
    Card,
    CardContent,
    VStack,
    HStack,
    Typography,
    Badge,
    Divider,
    Box,
} from "@almadar/ui";
import { DomainKeyword } from "../../atoms/domain/DomainKeyword";
import { DomainState } from "../../atoms/domain/DomainState";

export interface FlowTransition {
    from: string;
    to: string;
    event: string;
    guard?: string;
    effects?: string[];
}

export interface DomainFlowViewProps {
    /** Behavior/workflow name */
    name?: string;
    /** State names in order */
    states: string[];
    /** Initial state */
    initialState?: string;
    /** Transitions between states */
    transitions: FlowTransition[];
    /** Use Vision vocabulary */
    storyMode?: boolean;
    /** Callback when a state node is clicked */
    onNodeSelect?: (stateName: string) => void;
    /** Callback when a connection is clicked */
    onConnectionSelect?: (transition: FlowTransition) => void;
    /** Additional CSS classes */
    className?: string;
}

/** Build ordered path from initial state through transitions */
function buildFlowPath(
    states: string[],
    initialState: string | undefined,
    transitions: FlowTransition[]
): string[] {
    if (states.length === 0) return [];

    const start = initialState || states[0];
    const visited = new Set<string>();
    const path: string[] = [start];
    visited.add(start);

    // BFS walk through transitions
    let current = start;
    let maxSteps = states.length;
    while (maxSteps-- > 0) {
        const next = transitions.find(
            (t) => t.from === current && !visited.has(t.to)
        );
        if (!next) break;
        path.push(next.to);
        visited.add(next.to);
        current = next.to;
    }

    // Append any unvisited states
    for (const s of states) {
        if (!visited.has(s)) path.push(s);
    }

    return path;
}

export function DomainFlowView({
    name,
    states,
    initialState,
    transitions,
    storyMode = false,
    onNodeSelect,
    onConnectionSelect,
    className = "",
}: DomainFlowViewProps) {
    const [selectedTransition, setSelectedTransition] =
        useState<FlowTransition | null>(null);

    const orderedPath = buildFlowPath(states, initialState, transitions);

    const handleConnectionClick = (t: FlowTransition) => {
        setSelectedTransition(selectedTransition === t ? null : t);
        onConnectionSelect?.(t);
    };

    return (
        <Card className={className}>
            <CardContent>
                <VStack gap="md">
                    {/* Header */}
                    {name && (
                        <HStack gap="sm" align="center">
                            <DomainKeyword category="behavior">
                                {storyMode ? "Workflow" : "Flow"}
                            </DomainKeyword>
                            <Typography variant="h4">{name}</Typography>
                        </HStack>
                    )}

                    {/* Flow nodes */}
                    <HStack gap="none" align="center" className="flex-wrap">
                        {orderedPath.map((state, i) => {
                            const outTransition = transitions.find(
                                (t) => t.from === state && t.to === orderedPath[i + 1]
                            );

                            return (
                                <React.Fragment key={state}>
                                    {/* State node */}
                                    <Box
                                        className={`px-4 py-2 rounded-lg border-2 transition-colors ${onNodeSelect ? "cursor-pointer hover:border-[var(--color-primary)]" : ""
                                            } ${state === initialState
                                                ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10"
                                                : "border-[var(--color-border)] bg-[var(--color-surface)]"
                                            }`}
                                        onClick={() => onNodeSelect?.(state)}
                                    >
                                        <Typography variant="body2" weight="medium">
                                            {state}
                                        </Typography>
                                    </Box>

                                    {/* Arrow connector */}
                                    {i < orderedPath.length - 1 && outTransition && (
                                        <Box
                                            className={`flex items-center px-1 ${onConnectionSelect ? "cursor-pointer" : ""
                                                }`}
                                            onClick={() => handleConnectionClick(outTransition)}
                                        >
                                            <VStack gap="none" align="center">
                                                <Typography
                                                    variant="caption"
                                                    color="muted"
                                                    className="text-center max-w-[100px] truncate"
                                                >
                                                    {outTransition.event}
                                                </Typography>
                                                <Typography variant="body1" color="muted">
                                                    →
                                                </Typography>
                                            </VStack>
                                        </Box>
                                    )}

                                    {/* Plain arrow if no direct transition */}
                                    {i < orderedPath.length - 1 && !outTransition && (
                                        <Typography variant="body1" color="muted" className="px-2">
                                            →
                                        </Typography>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </HStack>

                    {/* Expanded transition detail */}
                    {selectedTransition && (
                        <>
                            <Divider />
                            <Card className="bg-[var(--color-muted)]/30">
                                <CardContent>
                                    <VStack gap="xs">
                                        <Typography variant="body2">
                                            <DomainKeyword category="behavior">
                                                {storyMode ? "When" : "Event:"}
                                            </DomainKeyword>
                                            {" "}{selectedTransition.event}
                                        </Typography>
                                        <Typography variant="body2" color="muted">
                                            <DomainState name={selectedTransition.from} />
                                            {" → "}
                                            <DomainState name={selectedTransition.to} />
                                        </Typography>
                                        {selectedTransition.guard && (
                                            <Typography variant="caption" color="muted">
                                                <DomainKeyword category="guard">
                                                    {storyMode ? "Only if:" : "Guard:"}
                                                </DomainKeyword>
                                                {" "}{selectedTransition.guard}
                                            </Typography>
                                        )}
                                        {selectedTransition.effects &&
                                            selectedTransition.effects.length > 0 && (
                                                <Typography variant="caption" color="muted">
                                                    <DomainKeyword category="effect">
                                                        {storyMode ? "Then:" : "Effects:"}
                                                    </DomainKeyword>
                                                    {" "}{selectedTransition.effects.join(", ")}
                                                </Typography>
                                            )}
                                    </VStack>
                                </CardContent>
                            </Card>
                        </>
                    )}

                    {/* Legend */}
                    <HStack gap="md" className="pt-2">
                        <HStack gap="xs" align="center">
                            <Box className="w-3 h-3 rounded-sm border-2 border-[var(--color-primary)] bg-[var(--color-primary)]/10" />
                            <Typography variant="caption" color="muted">
                                Start
                            </Typography>
                        </HStack>
                        <HStack gap="xs" align="center">
                            <Box className="w-3 h-3 rounded-sm border-2 border-[var(--color-border)]" />
                            <Typography variant="caption" color="muted">
                                State
                            </Typography>
                        </HStack>
                        <Typography variant="caption" color="muted">
                            Click a connection for details
                        </Typography>
                    </HStack>
                </VStack>
            </CardContent>
        </Card>
    );
}

export default DomainFlowView;
