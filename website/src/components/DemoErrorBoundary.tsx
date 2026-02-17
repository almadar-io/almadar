import React from 'react';

interface Props {
    children: React.ReactNode;
    demoKey: string;
    /** Render nothing instead of an error message (useful for carousel cards) */
    silent?: boolean;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

/**
 * Catches render errors in individual demos so one broken demo
 * doesn't crash the entire page.
 */
export default class DemoErrorBoundary extends React.Component<Props, State> {
    state: State = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.warn(`[Demo "${this.props.demoKey}"] render error:`, error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.silent) return null;
            return (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    padding: '2rem',
                    color: 'var(--ifm-color-emphasis-600)',
                    fontSize: '0.9rem',
                    textAlign: 'center',
                }}>
                    Demo unavailable
                </div>
            );
        }
        return this.props.children;
    }
}
