/**
 * DomainGlossary - Auto-generated vocabulary glossary
 *
 * Produces a readable glossary from domain context, entities, and behaviors.
 * Serves as both a reference document for domain experts and
 * entity/trait documentation for developers.
 *
 * Composed of: Card, CardHeader, CardTitle, CardContent, VStack, HStack,
 *              Typography, Badge, Divider (from @almadar/ui)
 *
 * Event Contract:
 * - Emits: onTermSelect(term: string) — when a glossary term is clicked
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
import type { DomainVocabulary } from "@almadar/core";

export interface GlossaryEntry {
    /** The term / entity name */
    term: string;
    /** Plain-language description */
    definition: string;
    /** Category tag */
    category: "entity" | "behavior" | "vocabulary" | "persona" | "state";
    /** Properties / fields summary */
    properties?: string[];
    /** State names */
    states?: string[];
}

export interface DomainGlossaryProps {
    /** Glossary entries */
    entries: GlossaryEntry[];
    /** Domain vocabulary overrides (shown as a special "Vocabulary" section) */
    vocabulary?: DomainVocabulary;
    /** Callback when a term is clicked */
    onTermSelect?: (term: string) => void;
    /** Additional CSS classes */
    className?: string;
}

/** Standard vocabulary key → human-readable label */
const VOCAB_LABELS: Record<string, string> = {
    item: "Item label",
    collection: "Collection label",
    create: "Create action",
    delete: "Delete action",
    container: "Container label",
};

export function DomainGlossary({
    entries,
    vocabulary,
    onTermSelect,
    className = "",
}: DomainGlossaryProps) {
    // Group entries by category
    const grouped = entries.reduce(
        (acc, entry) => {
            if (!acc[entry.category]) acc[entry.category] = [];
            acc[entry.category].push(entry);
            return acc;
        },
        {} as Record<string, GlossaryEntry[]>
    );

    const categoryOrder: GlossaryEntry["category"][] = [
        "entity",
        "behavior",
        "state",
        "persona",
        "vocabulary",
    ];

    const categoryLabels: Record<GlossaryEntry["category"], string> = {
        entity: "Things",
        behavior: "Workflows",
        state: "Stages",
        persona: "People",
        vocabulary: "Terminology",
    };

    const categoryBadgeVariants: Record<string, "primary" | "success" | "warning" | "info" | "secondary"> = {
        entity: "primary",
        behavior: "success",
        state: "warning",
        persona: "info",
        vocabulary: "secondary",
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Glossary</CardTitle>
            </CardHeader>
            <CardContent>
                <VStack gap="lg">
                    {categoryOrder.map((cat) => {
                        const items = grouped[cat];
                        if (!items || items.length === 0) return null;

                        return (
                            <VStack key={cat} gap="sm">
                                <HStack gap="sm" align="center">
                                    <Badge variant={categoryBadgeVariants[cat]} size="sm">
                                        {categoryLabels[cat]}
                                    </Badge>
                                    <Typography variant="caption" color="muted">
                                        {items.length} {items.length === 1 ? "entry" : "entries"}
                                    </Typography>
                                </HStack>

                                <VStack gap="xs" className="pl-2">
                                    {items.map((entry) => (
                                        <HStack
                                            key={entry.term}
                                            gap="md"
                                            align="start"
                                            className={`py-1 ${onTermSelect
                                                    ? "cursor-pointer hover:bg-[var(--color-muted)]/20 rounded px-2 -mx-2"
                                                    : ""
                                                }`}
                                            onClick={() => onTermSelect?.(entry.term)}
                                        >
                                            <Typography
                                                variant="body2"
                                                weight="semibold"
                                                className="min-w-[120px] shrink-0"
                                            >
                                                {entry.term}
                                            </Typography>
                                            <VStack gap="xs">
                                                <Typography variant="body2" color="muted">
                                                    {entry.definition}
                                                </Typography>
                                                {entry.properties && entry.properties.length > 0 && (
                                                    <Typography variant="caption" color="muted">
                                                        has: {entry.properties.join(", ")}
                                                    </Typography>
                                                )}
                                                {entry.states && entry.states.length > 0 && (
                                                    <Typography variant="caption" color="muted">
                                                        can be: {entry.states.join(" → ")}
                                                    </Typography>
                                                )}
                                            </VStack>
                                        </HStack>
                                    ))}
                                </VStack>

                                <Divider />
                            </VStack>
                        );
                    })}

                    {/* Vocabulary section */}
                    {vocabulary && Object.keys(vocabulary).length > 0 && (
                        <VStack gap="sm">
                            <HStack gap="sm" align="center">
                                <Badge variant="secondary" size="sm">
                                    Custom Labels
                                </Badge>
                            </HStack>
                            <VStack gap="xs" className="pl-2">
                                {Object.entries(vocabulary).map(([key, value]) => {
                                    if (!value) return null;
                                    return (
                                        <HStack key={key} gap="md" align="center" className="py-1">
                                            <Typography
                                                variant="body2"
                                                weight="semibold"
                                                className="min-w-[120px] shrink-0"
                                            >
                                                {VOCAB_LABELS[key] || key}
                                            </Typography>
                                            <Typography variant="body2" color="muted">
                                                → {value}
                                            </Typography>
                                        </HStack>
                                    );
                                })}
                            </VStack>
                        </VStack>
                    )}
                </VStack>
            </CardContent>
        </Card>
    );
}

export default DomainGlossary;
