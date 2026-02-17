import React, { useState, useEffect, useRef } from 'react';
import styles from './StorybookDemo.module.css';
import StoryThemeWrapper from './StoryThemeWrapper';
import { demoRegistry, type DemoEntry } from '../data/demo-registry';

interface StorybookDemoProps {
    /** Demo key from demos.json (maps to demo-registry entry) */
    demoKey: string;
    title: string;
    height?: string;
    /** Theme name from @almadar/ui (e.g. "ocean-light", "midnight-dark") */
    theme?: string;
}

export default function StorybookDemo({ demoKey, title, height = '600px', theme }: StorybookDemoProps): React.JSX.Element {
    const [isVisible, setIsVisible] = useState(false);
    const [demo, setDemo] = useState<DemoEntry | null>(null);
    const [error, setError] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Lazy load: only start loading when scrolled into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Load the demo component once visible
    useEffect(() => {
        if (!isVisible) return;

        const loader = demoRegistry[demoKey];
        if (!loader) {
            setError(`Unknown demo: ${demoKey}`);
            return;
        }

        loader()
            .then(setDemo)
            .catch((err) => {
                console.error(`Failed to load demo "${demoKey}":`, err);
                setError(`Failed to load demo: ${err.message}`);
            });
    }, [isVisible, demoKey]);

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.header}>
                <div className={styles.dots}>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                </div>
                <span className={styles.title}>{title}</span>
            </div>
            <div className={styles.contentWrapper} style={{ height }}>
                {error ? (
                    <div className={styles.placeholder}>
                        <span style={{ color: 'var(--ifm-color-danger)' }}>{error}</span>
                    </div>
                ) : demo ? (
                    <StoryThemeWrapper theme={theme}>
                        <demo.Component {...demo.args} />
                    </StoryThemeWrapper>
                ) : (
                    <div className={styles.placeholder}>
                        Loading Preview...
                    </div>
                )}
            </div>
        </div>
    );
}
