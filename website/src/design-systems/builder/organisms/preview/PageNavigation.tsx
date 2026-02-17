/**
 * PageNavigation Component
 *
 * Sidebar navigation for switching between pages (orbital units) in the preview.
 * Replaces the hardcoded Tailwind version with @almadar/ui atoms and CSS variables.
 */

import React from 'react';
import { VStack, Box, Typography, cn } from '@almadar/ui';

/** Local type compatible with runtime ResolvedPage */
export interface PreviewPage {
    name: string;
    path?: string;
    viewType?: string;
    sections: Array<{ pattern: { type?: string } }>;
}

export interface PageNavigationProps {
    /** All available pages */
    pages: PreviewPage[];
    /** Currently active page name */
    currentPage: string;
    /** Callback when page changes */
    onPageChange: (pageName: string) => void;
    /** Whether the navigation is collapsed */
    collapsed?: boolean;
}

/** Icon mapping based on view type or pattern */
function getPageIcon(page: PreviewPage): string {
    const viewType = page.viewType;
    const firstPattern = page.sections[0]?.pattern.type;

    if (viewType === 'list' || firstPattern?.includes('list')) return '\uD83D\uDCCB';
    if (viewType === 'detail' || firstPattern?.includes('detail')) return '\uD83D\uDCC4';
    if (viewType === 'create' || viewType === 'edit' || firstPattern?.includes('form')) return '\u270F\uFE0F';
    if (viewType === 'dashboard' || firstPattern?.includes('stats')) return '\uD83D\uDCCA';
    return '\uD83D\uDCD1';
}

/**
 * PageNavigation - Sidebar for navigating between pages in the preview runtime.
 */
export const PageNavigation: React.FC<PageNavigationProps> = ({
    pages,
    currentPage,
    onPageChange,
    collapsed = false,
}) => {
    return (
        <Box
            as="nav"
            className="page-navigation"
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'var(--color-card)',
                borderRight: '1px solid var(--color-border)',
            }}
        >
            {/* Header */}
            <Box
                style={{
                    padding: '0.75rem',
                    borderBottom: '1px solid var(--color-border)',
                }}
            >
                <Typography
                    variant="overline"
                    className={collapsed ? 'sr-only' : undefined}
                    style={{ color: 'var(--color-muted-foreground)' }}
                >
                    Pages
                </Typography>
            </Box>

            {/* Page list */}
            <VStack
                as="ul"
                gap="none"
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '0.5rem 0',
                    listStyle: 'none',
                    margin: 0,
                }}
            >
                {pages.map((page) => {
                    const isActive = page.name === currentPage;
                    const icon = getPageIcon(page);

                    return (
                        <li key={page.name}>
                            <button
                                onClick={() => onPageChange(page.name)}
                                title={collapsed ? page.name : undefined}
                                className={cn(
                                    'page-navigation__item',
                                    isActive && 'page-navigation__item--active',
                                )}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.5rem 0.75rem',
                                    textAlign: 'left',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 150ms, color 150ms',
                                    backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                                    color: isActive ? 'var(--color-primary-foreground)' : 'var(--color-foreground)',
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }
                                }}
                            >
                                <span
                                    style={{ fontSize: '1.125rem' }}
                                    role="img"
                                    aria-hidden="true"
                                >
                                    {icon}
                                </span>
                                {!collapsed && (
                                    <Box style={{ flex: 1, minWidth: 0 }}>
                                        <Typography
                                            variant="body2"
                                            style={{
                                                fontWeight: 500,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                color: 'inherit',
                                            }}
                                        >
                                            {page.name}
                                        </Typography>
                                        {page.path && (
                                            <Typography
                                                variant="caption"
                                                style={{
                                                    color: 'var(--color-muted-foreground)',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {page.path}
                                            </Typography>
                                        )}
                                    </Box>
                                )}
                            </button>
                        </li>
                    );
                })}
            </VStack>

            {/* Empty state */}
            {pages.length === 0 && (
                <Box style={{ padding: '1rem', textAlign: 'center' }}>
                    <Typography
                        variant="body2"
                        style={{ color: 'var(--color-muted-foreground)' }}
                    >
                        No pages found
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

PageNavigation.displayName = 'PageNavigation';

export default PageNavigation;
