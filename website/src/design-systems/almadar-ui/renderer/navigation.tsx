'use client';
/**
 * NavigationContext - Schema-Driven Navigation for Orbital Runtime
 *
 * Provides navigation within the orbital schema without react-router dependency.
 * Navigation works by:
 * 1. Matching path to a page in the schema
 * 2. Extracting route params (e.g., /inspection/:id → { id: "123" })
 * 3. Switching active page
 * 4. Triggering INIT with merged payload
 *
 * This approach works whether OrbitalRuntime is standalone or embedded in another app.
 *
 * Used by both:
 * - Builder runtime (interpreted execution)
 * - Compiled shells (generated applications)
 *
 * @packageDocumentation
 */

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { OrbitalSchema, OrbitalPage, Orbital } from '@almadar/core';

// ============================================================================
// Path Matching Utilities
// ============================================================================

/**
 * Match a concrete path against a pattern with :param placeholders.
 * Returns null if no match, or the extracted params if match.
 *
 * @example
 * matchPath('/inspection/:id', '/inspection/123') // { id: '123' }
 * matchPath('/users/:userId/posts/:postId', '/users/42/posts/7') // { userId: '42', postId: '7' }
 * matchPath('/about', '/about') // {}
 * matchPath('/about', '/contact') // null
 */
export function matchPath(
    pattern: string,
    path: string
): Record<string, string> | null {
    // Normalize paths - remove trailing slashes, ensure leading slash
    const normalizeSegment = (p: string) => {
        let normalized = p.trim();
        if (!normalized.startsWith('/')) normalized = '/' + normalized;
        if (normalized.length > 1 && normalized.endsWith('/')) {
            normalized = normalized.slice(0, -1);
        }
        return normalized;
    };

    const normalizedPattern = normalizeSegment(pattern);
    const normalizedPath = normalizeSegment(path);

    const patternParts = normalizedPattern.split('/').filter(Boolean);
    const pathParts = normalizedPath.split('/').filter(Boolean);

    // Must have same number of segments
    if (patternParts.length !== pathParts.length) {
        return null;
    }

    const params: Record<string, string> = {};

    for (let i = 0; i < patternParts.length; i++) {
        const patternPart = patternParts[i];
        const pathPart = pathParts[i];

        if (patternPart.startsWith(':')) {
            // This is a param - extract the name and value
            const paramName = patternPart.slice(1);
            params[paramName] = decodeURIComponent(pathPart);
        } else if (patternPart !== pathPart) {
            // Static segment doesn't match
            return null;
        }
    }

    return params;
}

/**
 * Extract route params from a path given its pattern.
 * Wrapper around matchPath for explicit use.
 */
export function extractRouteParams(
    pattern: string,
    path: string
): Record<string, string> {
    return matchPath(pattern, path) || {};
}

/**
 * Check if a path matches a pattern.
 */
export function pathMatches(pattern: string, path: string): boolean {
    return matchPath(pattern, path) !== null;
}

// ============================================================================
// Page Finding Utilities
// ============================================================================

/**
 * Type guard for inline orbital (not a reference)
 */
function isInlineOrbital(orbital: Orbital): orbital is Orbital & { pages?: OrbitalPage[] } {
    return 'name' in orbital && typeof orbital.name === 'string';
}

/**
 * Type guard for inline page (not a reference)
 */
function isInlinePage(page: unknown): page is OrbitalPage {
    return (
        typeof page === 'object' &&
        page !== null &&
        'name' in page &&
        typeof (page as Record<string, unknown>).name === 'string'
    );
}

/**
 * Find a page in the schema by matching its path pattern against a concrete path.
 * Returns the page and extracted route params.
 */
export function findPageByPath(
    schema: OrbitalSchema,
    path: string
): { page: OrbitalPage; params: Record<string, string>; orbitalName: string } | null {
    if (!schema.orbitals) return null;

    for (const orbital of schema.orbitals) {
        if (!isInlineOrbital(orbital)) continue;
        if (!orbital.pages) continue;

        for (const pageRef of orbital.pages) {
            if (!isInlinePage(pageRef)) continue;
            const page = pageRef;

            const pagePath = page.path;
            if (!pagePath) continue;

            const params = matchPath(pagePath, path);
            if (params !== null) {
                return { page, params, orbitalName: orbital.name };
            }
        }
    }

    return null;
}

/**
 * Find a page by name.
 */
export function findPageByName(
    schema: OrbitalSchema,
    pageName: string
): { page: OrbitalPage; orbitalName: string } | null {
    if (!schema.orbitals) return null;

    for (const orbital of schema.orbitals) {
        if (!isInlineOrbital(orbital)) continue;
        if (!orbital.pages) continue;

        for (const pageRef of orbital.pages) {
            if (!isInlinePage(pageRef)) continue;
            const page = pageRef;

            if (page.name === pageName) {
                return { page, orbitalName: orbital.name };
            }
        }
    }

    return null;
}

/**
 * Get the first page in the schema (default page).
 */
export function getDefaultPage(
    schema: OrbitalSchema
): { page: OrbitalPage; orbitalName: string } | null {
    if (!schema.orbitals) return null;

    for (const orbital of schema.orbitals) {
        if (!isInlineOrbital(orbital)) continue;
        if (!orbital.pages) continue;

        for (const pageRef of orbital.pages) {
            if (isInlinePage(pageRef)) {
                return { page: pageRef, orbitalName: orbital.name };
            }
        }
    }

    return null;
}

/**
 * Get all pages from the schema.
 */
export function getAllPages(
    schema: OrbitalSchema
): Array<{ page: OrbitalPage; orbitalName: string }> {
    const pages: Array<{ page: OrbitalPage; orbitalName: string }> = [];

    if (!schema.orbitals) return pages;

    for (const orbital of schema.orbitals) {
        if (!isInlineOrbital(orbital)) continue;
        if (!orbital.pages) continue;

        for (const pageRef of orbital.pages) {
            if (isInlinePage(pageRef)) {
                pages.push({ page: pageRef, orbitalName: orbital.name });
            }
        }
    }

    return pages;
}

// ============================================================================
// Navigation Context Types
// ============================================================================

export interface NavigationState {
    /** Current active page name */
    activePage: string;
    /** Current path (for URL sync) */
    currentPath: string;
    /** Payload to pass to INIT when page loads */
    initPayload: Record<string, unknown>;
    /** Navigation counter (increments on each navigation) */
    navigationId: number;
}

export interface NavigationContextValue {
    /** Current navigation state */
    state: NavigationState;
    /** Navigate to a path with optional payload */
    navigateTo: (path: string, payload?: Record<string, unknown>) => void;
    /** Navigate to a page by name with optional payload */
    navigateToPage: (pageName: string, payload?: Record<string, unknown>) => void;
    /** The schema being navigated */
    schema: OrbitalSchema;
    /** Whether navigation is ready (schema loaded) */
    isReady: boolean;
}

// ============================================================================
// Navigation Context
// ============================================================================

const NavigationContext = createContext<NavigationContextValue | null>(null);

export interface NavigationProviderProps {
    /** The schema to navigate within */
    schema: OrbitalSchema;
    /** Initial page name (optional, defaults to first page) */
    initialPage?: string;
    /** Whether to update browser URL on navigation (default: true) */
    updateUrl?: boolean;
    /** Callback when navigation occurs */
    onNavigate?: (pageName: string, path: string, payload: Record<string, unknown>) => void;
    /** Children */
    children: React.ReactNode;
}

/**
 * NavigationProvider - Provides schema-driven navigation context
 *
 * @example
 * ```tsx
 * <NavigationProvider schema={mySchema}>
 *   <OrbitalRuntimeContent />
 * </NavigationProvider>
 * ```
 */
export function NavigationProvider({
    schema,
    initialPage,
    updateUrl = true,
    onNavigate,
    children,
}: NavigationProviderProps): React.ReactElement {
    // Determine initial state
    const initialState = useMemo((): NavigationState => {
        let page: OrbitalPage | null = null;
        let path = '/';

        if (initialPage) {
            const found = findPageByName(schema, initialPage);
            if (found) {
                page = found.page;
                path = page.path || '/';
            }
        }

        if (!page) {
            const defaultPage = getDefaultPage(schema);
            if (defaultPage) {
                page = defaultPage.page;
                path = page.path || '/';
            }
        }

        return {
            activePage: page?.name || '',
            currentPath: path,
            initPayload: {},
            navigationId: 0,
        };
    }, [schema, initialPage]);

    const [state, setState] = useState<NavigationState>(initialState);

    /**
     * Navigate to a path - matches against schema page paths
     */
    const navigateTo = useCallback((
        path: string,
        payload?: Record<string, unknown>
    ) => {
        const result = findPageByPath(schema, path);

        if (!result) {
            console.error(`[Navigation] No page found for path: ${path}`);
            return;
        }

        const { page, params } = result;

        // Merge route params with explicit payload (explicit wins)
        const finalPayload = { ...params, ...payload };

        console.log('[Navigation] Navigating to:', {
            path,
            page: page.name,
            params,
            payload,
            finalPayload,
        });

        // Update state - increment navigationId to trigger INIT
        setState(prev => ({
            activePage: page.name,
            currentPath: path,
            initPayload: finalPayload,
            navigationId: prev.navigationId + 1,
        }));

        // Update browser URL (optional, for bookmarkability)
        if (updateUrl && typeof window !== 'undefined') {
            try {
                window.history.pushState(finalPayload, '', path);
            } catch (e) {
                // Ignore errors (e.g., in embedded contexts)
                console.warn('[Navigation] Could not update URL:', e);
            }
        }

        // Callback
        if (onNavigate) {
            onNavigate(page.name, path, finalPayload);
        }
    }, [schema, updateUrl, onNavigate]);

    /**
     * Navigate to a page by name
     */
    const navigateToPage = useCallback((
        pageName: string,
        payload?: Record<string, unknown>
    ) => {
        const result = findPageByName(schema, pageName);

        if (!result) {
            console.error(`[Navigation] No page found with name: ${pageName}`);
            return;
        }

        const { page } = result;
        const path = page.path || `/${pageName.toLowerCase()}`;

        console.log('[Navigation] Navigating to page:', {
            pageName,
            path,
            payload,
        });

        setState(prev => ({
            activePage: page.name,
            currentPath: path,
            initPayload: payload || {},
            navigationId: prev.navigationId + 1,
        }));

        if (updateUrl && typeof window !== 'undefined') {
            try {
                window.history.pushState(payload || {}, '', path);
            } catch (e) {
                console.warn('[Navigation] Could not update URL:', e);
            }
        }

        if (onNavigate) {
            onNavigate(page.name, path, payload || {});
        }
    }, [schema, updateUrl, onNavigate]);

    const contextValue: NavigationContextValue = useMemo(() => ({
        state,
        navigateTo,
        navigateToPage,
        schema,
        isReady: !!state.activePage,
    }), [state, navigateTo, navigateToPage, schema]);

    return (
        <NavigationContext.Provider value={contextValue}>
            {children}
        </NavigationContext.Provider>
    );
}

// ============================================================================
// Hooks
// ============================================================================

/**
 * Hook to access navigation context.
 * Returns null if not within NavigationProvider.
 */
export function useNavigation(): NavigationContextValue | null {
    return useContext(NavigationContext);
}

/**
 * Hook to get the navigateTo function.
 * Returns a no-op function if not within NavigationProvider.
 */
export function useNavigateTo(): (path: string, payload?: Record<string, unknown>) => void {
    const context = useContext(NavigationContext);

    const noOp = useCallback((path: string, _payload?: Record<string, unknown>) => {
        console.warn(`[Navigation] navigateTo called outside NavigationProvider. Path: ${path}`);
    }, []);

    return context?.navigateTo || noOp;
}

/**
 * Hook to get current navigation state.
 */
export function useNavigationState(): NavigationState | null {
    const context = useContext(NavigationContext);
    return context?.state || null;
}

/**
 * Hook to get the current INIT payload (for passing to trait INIT events).
 */
export function useInitPayload(): Record<string, unknown> {
    const context = useContext(NavigationContext);
    return context?.state.initPayload || {};
}

/**
 * Hook to get current active page name.
 */
export function useActivePage(): string | null {
    const context = useContext(NavigationContext);
    return context?.state.activePage || null;
}

/**
 * Hook to get navigation ID (changes on each navigation, useful for triggering effects).
 */
export function useNavigationId(): number {
    const context = useContext(NavigationContext);
    return context?.state.navigationId || 0;
}

export default NavigationProvider;
