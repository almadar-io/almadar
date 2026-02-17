/**
 * ChangeHistoryTimeline — Plain-language change history
 *
 * Renders a timeline of schema changes using `ChangeSetDocument` from @almadar/core.
 * Shows each change as a plain-language summary with author, time, and details.
 * Non-technical users see "Added cancellation rule" instead of JSON diffs.
 *
 * Composed of: Card, CardHeader, CardTitle, CardContent, VStack, HStack,
 *              Typography, Badge, Divider, Box (from @almadar/ui)
 *              DomainKeyword (from design-system atoms)
 *
 * Event Contract:
 * - Emits: onChangeSelect(changeset: ChangeSetDocument) — when a changeset entry is clicked
 * - Emits: onRevert(changesetId: string) — when the revert action is triggered
 */

import React, { useState } from "react";
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
    Box,
} from "@almadar/ui";
import type {
    ChangeSetDocument,
    SchemaChange,
    ChangeAuthor,
} from "@almadar/core";
import { DomainKeyword } from "../../atoms/domain/DomainKeyword";

export interface ChangeHistoryTimelineProps {
    /** Array of changeset documents from Firestore */
    changesets: ChangeSetDocument[];
    /** Callback when a changeset entry is clicked */
    onChangeSelect?: (changeset: ChangeSetDocument) => void;
    /** Callback when revert is requested */
    onRevert?: (changesetId: string) => void;
    /** Whether to show the detail expansion panel */
    expandable?: boolean;
    /** Additional CSS classes */
    className?: string;
}

/** Format timestamp to readable relative time */
function formatTime(timestamp: number): string {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString();
}

/** Map source to human-readable label */
function sourceLabel(source: ChangeSetDocument["source"]): string {
    switch (source) {
        case "requirements-agent": return "AI Agent";
        case "builder-agent": return "Builder Agent";
        case "user": return "Manual edit";
        case "auto-fix": return "Auto-fix";
        default: return source;
    }
}

/** Map author to display string */
function authorLabel(author: ChangeAuthor): string {
    if (author.name) return author.name;
    if (author.type === "agent") return "AI Agent";
    return "User";
}

/** Map operation to badge variant */
function operationVariant(op: SchemaChange["operation"]): "success" | "primary" | "danger" | "info" {
    switch (op) {
        case "add": return "success";
        case "modify": return "primary";
        case "remove": return "danger";
        case "rename": return "info";
    }
}

/** Map operation to plain-language verb */
function operationVerb(op: SchemaChange["operation"]): string {
    switch (op) {
        case "add": return "Added";
        case "modify": return "Changed";
        case "remove": return "Removed";
        case "rename": return "Renamed";
    }
}

export function ChangeHistoryTimeline({
    changesets,
    onChangeSelect,
    onRevert,
    expandable = true,
    className = "",
}: ChangeHistoryTimelineProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const sorted = [...changesets].sort((a, b) => b.timestamp - a.timestamp);

    const handleToggle = (cs: ChangeSetDocument) => {
        if (expandable) {
            setExpandedId(expandedId === cs.id ? null : cs.id);
        }
        onChangeSelect?.(cs);
    };

    return (
        <Card className={className}>
            <CardHeader>
                <HStack gap="sm" align="center" justify="between">
                    <CardTitle>Change History</CardTitle>
                    <Badge variant="neutral" size="sm">
                        {changesets.length} {changesets.length === 1 ? "change" : "changes"}
                    </Badge>
                </HStack>
            </CardHeader>
            <CardContent>
                {sorted.length === 0 ? (
                    <Typography variant="body2" color="muted" className="text-center py-4">
                        No changes recorded yet
                    </Typography>
                ) : (
                    <VStack gap="none">
                        {sorted.map((cs, i) => (
                            <React.Fragment key={cs.id}>
                                {/* Timeline entry */}
                                <HStack
                                    gap="md"
                                    align="start"
                                    className={`py-3 px-2 rounded ${expandable ? "cursor-pointer hover:bg-[var(--color-muted)]/20" : ""
                                        }`}
                                    onClick={() => handleToggle(cs)}
                                >
                                    {/* Timeline dot */}
                                    <Box className="flex flex-col items-center pt-1.5">
                                        <Box
                                            className={`w-2.5 h-2.5 rounded-full ${cs.status === "applied"
                                                ? "bg-[var(--color-primary)]"
                                                : cs.status === "reverted"
                                                    ? "bg-[var(--color-muted-foreground)]"
                                                    : "bg-[var(--color-warning)]"
                                                }`}
                                        />
                                        {i < sorted.length - 1 && (
                                            <Box className="w-px h-full min-h-[24px] bg-[var(--color-border)] mt-1" />
                                        )}
                                    </Box>

                                    {/* Content */}
                                    <VStack gap="xs" className="flex-1">
                                        <HStack gap="sm" align="center" justify="between">
                                            <Typography variant="body2" weight="semibold">
                                                {cs.summary.description || cs.description}
                                            </Typography>
                                            <Typography variant="caption" color="muted" className="shrink-0">
                                                {formatTime(cs.timestamp)}
                                            </Typography>
                                        </HStack>

                                        <HStack gap="sm" align="center">
                                            <Badge
                                                variant={cs.author.type === "agent" ? "info" : "secondary"}
                                                size="sm"
                                            >
                                                {sourceLabel(cs.source)}
                                            </Badge>
                                            <Typography variant="caption" color="muted">
                                                by {authorLabel(cs.author)}
                                            </Typography>
                                            {cs.status === "reverted" && (
                                                <Badge variant="neutral" size="sm">reverted</Badge>
                                            )}
                                        </HStack>

                                        {/* Summary counts */}
                                        <HStack gap="md">
                                            {cs.summary.added > 0 && (
                                                <Typography variant="caption" color="success">
                                                    +{cs.summary.added} added
                                                </Typography>
                                            )}
                                            {cs.summary.modified > 0 && (
                                                <Typography variant="caption" color="primary">
                                                    ~{cs.summary.modified} modified
                                                </Typography>
                                            )}
                                            {cs.summary.removed > 0 && (
                                                <Typography variant="caption" color="error">
                                                    -{cs.summary.removed} removed
                                                </Typography>
                                            )}
                                        </HStack>

                                        {/* Expanded detail */}
                                        {expandedId === cs.id && (
                                            <VStack gap="xs" className="mt-2 pl-2 border-l-2 border-[var(--color-border)]">
                                                {cs.changes.map((change) => (
                                                    <HStack key={change.id} gap="sm" align="start">
                                                        <Badge
                                                            variant={operationVariant(change.operation)}
                                                            size="sm"
                                                        >
                                                            {operationVerb(change.operation)}
                                                        </Badge>
                                                        <VStack gap="none">
                                                            <Typography variant="caption">
                                                                <DomainKeyword category="entity">
                                                                    {change.target}
                                                                </DomainKeyword>
                                                            </Typography>
                                                            <Typography variant="caption" color="muted">
                                                                {change.description}
                                                            </Typography>
                                                            {change.reason && (
                                                                <Typography variant="caption" color="muted">
                                                                    Reason: {change.reason}
                                                                </Typography>
                                                            )}
                                                        </VStack>
                                                    </HStack>
                                                ))}

                                                {onRevert && cs.status === "applied" && (
                                                    <Box
                                                        className="cursor-pointer hover:underline mt-1"
                                                        onClick={(e: React.MouseEvent) => {
                                                            e.stopPropagation();
                                                            onRevert(cs.id);
                                                        }}
                                                    >
                                                        <Typography variant="caption" color="error">
                                                            Revert this change
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </VStack>
                                        )}
                                    </VStack>
                                </HStack>

                                {i < sorted.length - 1 && <Divider className="ml-5" />}
                            </React.Fragment>
                        ))}
                    </VStack>
                )}
            </CardContent>
        </Card>
    );
}

export default ChangeHistoryTimeline;
