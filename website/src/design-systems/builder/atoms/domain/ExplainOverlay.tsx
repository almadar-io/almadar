/**
 * ExplainOverlay — "What this means" plain-language annotations
 *
 * A toggle-able overlay that adds plain-language explanations
 * to technical content. When enabled, each annotated section
 * shows a collapsible "What this means" expansion.
 *
 * Composed of: Card, CardContent, VStack, HStack, Typography, Box, Badge (from @almadar/ui)
 *
 * Event Contract:
 * - Emits: onToggle(enabled: boolean) — when the explain mode is toggled on/off
 */

import React, { useState, createContext, useContext } from "react";
import {
    Card,
    CardContent,
    VStack,
    HStack,
    Typography,
    Box,
    Badge,
} from "@almadar/ui";

// ────────────────────────────────────────────────────────────────
// Context: shared explain-mode state
// ────────────────────────────────────────────────────────────────

interface ExplainContextValue {
    enabled: boolean;
    toggle: () => void;
}

const ExplainContext = createContext<ExplainContextValue>({
    enabled: false,
    toggle: () => { },
});

export function useExplainMode() {
    return useContext(ExplainContext);
}

// ────────────────────────────────────────────────────────────────
// Provider
// ────────────────────────────────────────────────────────────────

export interface ExplainProviderProps {
    /** Initial state */
    defaultEnabled?: boolean;
    /** Callback when toggled */
    onToggle?: (enabled: boolean) => void;
    children: React.ReactNode;
}

export function ExplainProvider({
    defaultEnabled = false,
    onToggle,
    children,
}: ExplainProviderProps) {
    const [enabled, setEnabled] = useState(defaultEnabled);

    const toggle = () => {
        const next = !enabled;
        setEnabled(next);
        onToggle?.(next);
    };

    return (
        <ExplainContext.Provider value={{ enabled, toggle }}>
            {children}
        </ExplainContext.Provider>
    );
}

// ────────────────────────────────────────────────────────────────
// Toggle button
// ────────────────────────────────────────────────────────────────

export interface ExplainToggleProps {
    className?: string;
}

export function ExplainToggle({ className = "" }: ExplainToggleProps) {
    const { enabled, toggle } = useExplainMode();

    return (
        <HStack
            gap="sm"
            align="center"
            className={`cursor-pointer select-none ${className}`}
            onClick={toggle}
        >
            <Box
                className={`w-8 h-4 rounded-full transition-colors flex items-center px-0.5 ${enabled
                        ? "bg-[var(--color-primary)]"
                        : "bg-[var(--color-muted-foreground)]/30"
                    }`}
            >
                <Box
                    className={`w-3 h-3 rounded-full bg-white transition-transform ${enabled ? "translate-x-4" : "translate-x-0"
                        }`}
                />
            </Box>
            <Typography variant="caption" color={enabled ? "primary" : "muted"}>
                Explain
            </Typography>
        </HStack>
    );
}

// ────────────────────────────────────────────────────────────────
// Annotation wrapper
// ────────────────────────────────────────────────────────────────

export interface ExplainAnnotationProps {
    /** Plain-language explanation shown when explain mode is on */
    explanation: string;
    /** Optional heading for the explanation card */
    heading?: string;
    /** The technical content being annotated */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

export function ExplainAnnotation({
    explanation,
    heading = "What this means",
    children,
    className = "",
}: ExplainAnnotationProps) {
    const { enabled } = useExplainMode();

    return (
        <VStack gap="xs" className={className}>
            {children}
            {enabled && (
                <Card className="bg-[var(--color-primary)]/5 border-[var(--color-primary)]/20">
                    <CardContent className="py-2 px-3">
                        <VStack gap="xs">
                            <HStack gap="xs" align="center">
                                <Badge variant="primary" size="sm">💡</Badge>
                                <Typography variant="caption" weight="semibold" color="primary">
                                    {heading}
                                </Typography>
                            </HStack>
                            <Typography variant="caption" color="muted">
                                {explanation}
                            </Typography>
                        </VStack>
                    </CardContent>
                </Card>
            )}
        </VStack>
    );
}

// ────────────────────────────────────────────────────────────────
// Validation error explanation
// ────────────────────────────────────────────────────────────────

export interface ValidationExplainProps {
    /** The technical error message */
    errorMessage: string;
    /** Plain-language explanation */
    explanation: string;
    /** Severity */
    severity?: "error" | "warning";
    /** Additional CSS classes */
    className?: string;
}

export function ValidationExplain({
    errorMessage,
    explanation,
    severity = "error",
    className = "",
}: ValidationExplainProps) {
    const { enabled } = useExplainMode();

    return (
        <VStack gap="xs" className={className}>
            <HStack gap="sm" align="center">
                <Badge variant={severity === "error" ? "danger" : "warning"} size="sm">
                    {severity}
                </Badge>
                <Typography variant="caption">{errorMessage}</Typography>
            </HStack>
            {enabled && (
                <Box className="pl-4">
                    <Typography variant="caption" color="muted">
                        → {explanation}
                    </Typography>
                </Box>
            )}
        </VStack>
    );
}

export default ExplainAnnotation;
