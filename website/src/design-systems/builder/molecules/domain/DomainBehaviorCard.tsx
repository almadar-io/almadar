/**
 * DomainBehaviorCard - Behavior/workflow card for Story Mode
 *
 * Renders a domain behavior showing states, transitions, and rules
 * in plain language.
 *
 * Composed of: Card, CardHeader, CardTitle, CardContent, VStack, HStack,
 *              Typography, Badge, Divider (from @almadar/ui)
 *              DomainKeyword, DomainState (from design-system atoms)
 *
 * Event Contract:
 * - Emits: None (display only)
 */

import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    VStack,
    HStack,
    Typography,
    Badge,
    Divider,
} from "@almadar/ui";
import { DomainKeyword } from "../../atoms/domain/DomainKeyword";
import { DomainState } from "../../atoms/domain/DomainState";
import type { SuggestedGuard } from "@almadar/core";

export interface BehaviorTransition {
    from: string;
    to: string;
    event: string;
    guard?: string;
    effects?: string[];
}

export interface DomainBehaviorCardProps {
    /** Behavior name */
    name: string;
    /** Description */
    description?: string;
    /** Provenance text from requestFragment */
    provenance?: string;
    /** State names */
    states?: string[];
    /** Initial state */
    initialState?: string;
    /** Transitions */
    transitions?: BehaviorTransition[];
    /** Suggested guards from domainContext */
    suggestedGuards?: SuggestedGuard[];
    /** Use Vision vocabulary */
    storyMode?: boolean;
    /** Additional CSS classes */
    className?: string;
}

export function DomainBehaviorCard({
    name,
    description,
    provenance,
    states = [],
    initialState,
    transitions = [],
    suggestedGuards = [],
    storyMode = false,
    className = "",
}: DomainBehaviorCardProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <HStack gap="sm" align="center">
                    <DomainKeyword category="behavior" >
                        {storyMode ? "Workflow" : "Behavior"}
                    </DomainKeyword>
                    <CardTitle>{name}</CardTitle>
                </HStack>
                {description && (
                    <Typography variant="body2" color="muted">
                        {description}
                    </Typography>
                )}
                {provenance && (
                    <Typography variant="caption" color="muted" className="italic">
                        ↳ {provenance}
                    </Typography>
                )}
            </CardHeader>

            <CardContent>
                <VStack gap="md">
                    {/* States */}
                    {states.length > 0 && (
                        <VStack gap="xs">
                            <DomainKeyword category="state" >
                                {storyMode ? "Stages:" : "States:"}
                            </DomainKeyword>
                            <HStack gap="sm" className="flex-wrap pl-4">
                                {states.map((state) => (
                                    <DomainState
                                        key={state}
                                        name={state}
                                        isInitial={state === initialState}
                                    />
                                ))}
                            </HStack>
                        </VStack>
                    )}

                    {/* Transitions */}
                    {transitions.length > 0 && (
                        <>
                            <Divider />
                            <VStack gap="xs">
                                <DomainKeyword category="behavior" >
                                    {storyMode ? "When this happens:" : "Transitions:"}
                                </DomainKeyword>
                                <VStack gap="sm" className="pl-4">
                                    {transitions.map((t, i) => (
                                        <VStack key={i} gap="xs">
                                            <Typography variant="body2">
                                                <DomainKeyword category="behavior" >
                                                    {storyMode ? "When" : "From"}
                                                </DomainKeyword>
                                                {" "}<DomainState name={t.from} />
                                                {" → "}<DomainState name={t.to} />
                                                {" "}
                                                <Typography variant="caption" color="muted" as="span">
                                                    on {t.event}
                                                </Typography>
                                            </Typography>
                                            {t.guard && (
                                                <Typography variant="caption" color="muted" className="pl-4">
                                                    <DomainKeyword category="guard" >
                                                        {storyMode ? "Only if:" : "Guards:"}
                                                    </DomainKeyword>
                                                    {" "}{t.guard}
                                                </Typography>
                                            )}
                                            {t.effects && t.effects.length > 0 && (
                                                <Typography variant="caption" color="muted" className="pl-4">
                                                    <DomainKeyword category="effect" >
                                                        {storyMode ? "Then:" : "Effects:"}
                                                    </DomainKeyword>
                                                    {" "}{t.effects.join(", ")}
                                                </Typography>
                                            )}
                                        </VStack>
                                    ))}
                                </VStack>
                            </VStack>
                        </>
                    )}

                    {/* Suggested Guards */}
                    {suggestedGuards.length > 0 && (
                        <>
                            <Divider />
                            <VStack gap="xs">
                                <Typography variant="caption" color="muted">
                                    Suggested Rules
                                </Typography>
                                <HStack gap="sm" className="flex-wrap pl-4">
                                    {suggestedGuards.map((guard) => (
                                        <Badge key={guard.id} variant="info" size="sm">
                                            {guard.description}
                                        </Badge>
                                    ))}
                                </HStack>
                            </VStack>
                        </>
                    )}
                </VStack>
            </CardContent>
        </Card>
    );
}

export default DomainBehaviorCard;
