/**
 * DomainEntityCard - Entity card for Story Mode
 *
 * Renders a domain entity (from schema) as a readable card showing
 * its name, description, fields, states, and provenance.
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
import type { DomainVocabulary } from "@almadar/core";

export interface EntityField {
    name: string;
    type: string;
    required?: boolean;
}

export interface DomainEntityCardProps {
    /** Entity name */
    name: string;
    /** Entity description */
    description?: string;
    /** Provenance text from requestFragment */
    provenance?: string;
    /** Entity fields */
    fields?: EntityField[];
    /** State names */
    states?: string[];
    /** Initial state */
    initialState?: string;
    /** Vocabulary for label mapping */
    vocabulary?: DomainVocabulary;
    /** Use Vision vocabulary */
    storyMode?: boolean;
    /** Additional CSS classes */
    className?: string;
}

export function DomainEntityCard({
    name,
    description,
    provenance,
    fields = [],
    states = [],
    initialState,
    vocabulary,
    storyMode = false,
    className = "",
}: DomainEntityCardProps) {
    const itemLabel = vocabulary?.item || name;

    return (
        <Card className={className}>
            <CardHeader>
                <HStack gap="sm" align="center">
                    <DomainKeyword category="entity">
                        {storyMode ? "Thing" : "Entity"}
                    </DomainKeyword>
                    <CardTitle>{itemLabel}</CardTitle>
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
                    {/* Fields */}
                    {fields.length > 0 && (
                        <VStack gap="xs">
                            <DomainKeyword category="property">
                                {storyMode ? "Facts:" : "It has:"}
                            </DomainKeyword>
                            <VStack gap="xs" className="pl-4">
                                {fields.map((field) => (
                                    <HStack key={field.name} gap="sm" align="center">
                                        <Typography variant="body2">
                                            {field.name}
                                        </Typography>
                                        <Badge variant="neutral" size="sm">
                                            {field.type}
                                        </Badge>
                                        {field.required && (
                                            <Badge variant="warning" size="sm">
                                                required
                                            </Badge>
                                        )}
                                    </HStack>
                                ))}
                            </VStack>
                        </VStack>
                    )}

                    {/* States */}
                    {states.length > 0 && (
                        <>
                            <Divider />
                            <VStack gap="xs">
                                <DomainKeyword category="state">
                                    {storyMode ? "Stages:" : "It can be:"}
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
                                {initialState && (
                                    <Typography variant="caption" color="muted" className="pl-4">
                                        <DomainKeyword category="state">
                                            {storyMode ? "Begins at" : "It starts as"}
                                        </DomainKeyword>
                                        {" "}{initialState}
                                    </Typography>
                                )}
                            </VStack>
                        </>
                    )}
                </VStack>
            </CardContent>
        </Card>
    );
}

export default DomainEntityCard;
