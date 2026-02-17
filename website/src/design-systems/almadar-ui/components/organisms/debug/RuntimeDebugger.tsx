/**
 * RuntimeDebugger - Main debug panel for KFlow applications
 * 
 * Press backtick (`) to toggle. Displays traits, ticks, entities, events, and guards.
 * Uses existing component library atoms/molecules.
 * 
 * @packageDocumentation
 */

import * as React from 'react';
import { cn } from '../../../lib/cn';
import { useDebugData } from './hooks/useDebugData';
import { onDebugToggle, isDebugEnabled } from '../../../lib/debugUtils';
import { Tabs, type TabItem } from '../../molecules/Tabs';
import { Button } from '../../atoms/Button';
import { Card } from '../../atoms/Card';
import { Badge } from '../../atoms/Badge';
import { Typography } from '../../atoms/Typography';
import { TraitsTab } from './tabs/TraitsTab';
import { TicksTab } from './tabs/TicksTab';
import { EntitiesTab } from './tabs/EntitiesTab';
import { EventFlowTab } from './tabs/EventFlowTab';
import { GuardsPanel } from './tabs/GuardsPanel';
import './RuntimeDebugger.css';

export interface RuntimeDebuggerProps {
    /** Initial position */
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    /** Initial collapsed state */
    defaultCollapsed?: boolean;
    /** Additional CSS classes */
    className?: string;
}

export function RuntimeDebugger({
    position = 'bottom-right',
    defaultCollapsed = true,
    className,
}: RuntimeDebuggerProps) {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
    const [isVisible, setIsVisible] = React.useState(isDebugEnabled());

    const debugData = useDebugData();

    // Listen for keyboard toggle
    React.useEffect(() => {
        return onDebugToggle((enabled) => {
            setIsVisible(enabled);
            if (enabled) {
                setIsCollapsed(false);
            }
        });
    }, []);

    // Keyboard shortcut to toggle collapse
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '`' && isVisible) {
                // Don't toggle if typing in input
                const target = e.target as HTMLElement;
                if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
                setIsCollapsed(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isVisible]);

    if (!isVisible) {
        return null;
    }

    const positionClasses = {
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
    };

    // Build tab items using existing Tabs molecule
    const tabItems: TabItem[] = [
        {
            id: 'traits',
            label: 'Traits',
            badge: debugData.traits.length || undefined,
            content: <TraitsTab traits={debugData.traits} />,
        },
        {
            id: 'ticks',
            label: 'Ticks',
            badge: debugData.ticks.filter((t: { active: boolean }) => t.active).length || undefined,
            content: <TicksTab ticks={debugData.ticks} />,
        },
        {
            id: 'entities',
            label: 'Entities',
            badge: debugData.entitySnapshot?.runtime.length || undefined,
            content: <EntitiesTab snapshot={debugData.entitySnapshot} />,
        },
        {
            id: 'events',
            label: 'Events',
            badge: debugData.events.length > 0 ? debugData.events.length : undefined,
            content: <EventFlowTab events={debugData.events} />,
        },
        {
            id: 'guards',
            label: 'Guards',
            badge: debugData.guards.filter((g: { result: boolean }) => !g.result).length || undefined,
            content: <GuardsPanel guards={debugData.guards} />,
        },
    ];

    return (
        <div
            className={cn(
                'runtime-debugger',
                'fixed z-[9999]',
                positionClasses[position],
                isCollapsed ? 'runtime-debugger--collapsed' : 'runtime-debugger--expanded',
                className
            )}
            data-testid={isCollapsed ? 'debugger-collapsed' : 'debugger-expanded'}
        >
            {isCollapsed ? (
                <Button
                    onClick={() => setIsCollapsed(false)}
                    variant="secondary"
                    size="sm"
                    className="runtime-debugger__toggle"
                    title="Open Debugger (`)"
                >
                    🔍
                </Button>
            ) : (
                <Card className="runtime-debugger__panel">
                    {/* Header */}
                    <div className="runtime-debugger__header">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🔍</span>
                            <Typography variant="h6">KFlow Debugger</Typography>
                            <Badge variant="info" size="sm">Runtime</Badge>
                        </div>
                        <Button
                            onClick={() => setIsCollapsed(true)}
                            variant="ghost"
                            size="sm"
                            title="Close (`)"
                        >
                            ✕
                        </Button>
                    </div>

                    {/* Tabs - using existing Tabs molecule */}
                    <div className="runtime-debugger__content">
                        <Tabs
                            items={tabItems}
                            variant="pills"
                            className="runtime-debugger__tabs"
                        />
                    </div>

                    {/* Footer */}
                    <div className="runtime-debugger__footer">
                        <Typography variant="small" className="text-gray-500">
                            Press ` to toggle
                        </Typography>
                    </div>
                </Card>
            )}
        </div>
    );
}

RuntimeDebugger.displayName = 'RuntimeDebugger';
