/**
 * StoryHeader - Domain context banner for Story Mode
 *
 * Displays the project's domain context: request description,
 * category/subDomain badges, and persona role pills.
 *
 * Composed of: Card, CardContent, VStack, HStack, Typography, Badge, Divider (from @almadar/ui)
 *
 * Event Contract:
 * - Emits: onPersonaSelect (optional)
 */

import React from "react";
import {
    Card,
    CardContent,
    VStack,
    HStack,
    Typography,
    Badge,
    Divider,
} from "@almadar/ui";
import type { DomainContext, UserPersona } from "@almadar/core";

export interface StoryHeaderProps {
    /** The domain context from the schema */
    domainContext: DomainContext;
    /** Currently selected persona */
    activePersona?: string;
    /** Callback when a persona is selected */
    onPersonaSelect?: (persona: UserPersona) => void;
    /** Additional CSS classes */
    className?: string;
}

export function StoryHeader({
    domainContext,
    activePersona,
    onPersonaSelect,
    className = "",
}: StoryHeaderProps) {
    const { request, category, personas } = domainContext;

    return (
        <Card className={className}>
            <CardContent>
                <VStack gap="md">
                    {/* Request description */}
                    {request && (
                        <Typography variant="body1" color="inherit">
                            {request}
                        </Typography>
                    )}

                    {/* Category + SubDomain badges */}
                    <HStack gap="sm" align="center">
                        {category && (
                            <Badge variant="primary">
                                {category}
                            </Badge>
                        )}
                        {domainContext.subDomain && (
                            <Badge variant="info">
                                {domainContext.subDomain}
                            </Badge>
                        )}
                    </HStack>

                    {/* Personas */}
                    {personas && personas.length > 0 && (
                        <>
                            <Divider />
                            <VStack gap="xs">
                                <Typography variant="caption" color="muted">
                                    Personas
                                </Typography>
                                <HStack gap="sm" className="flex-wrap">
                                    {personas.map((persona) => (
                                        <Badge
                                            key={persona.name}
                                            variant={activePersona === persona.name ? "primary" : "neutral"}
                                            className={onPersonaSelect ? "cursor-pointer" : ""}
                                            onClick={() => onPersonaSelect?.(persona)}
                                        >
                                            {persona.name}
                                            {persona.role && ` — ${persona.role}`}
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

export default StoryHeader;
