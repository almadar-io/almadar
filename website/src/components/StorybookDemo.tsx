import React from 'react';
import styles from './StorybookDemo.module.css';

interface StorybookDemoProps {
    id: string;
    title: string;
    height?: string;
    viewMode?: 'story' | 'docs';
}

export default function StorybookDemo({ id, title, height = '600px', viewMode = 'story' }: StorybookDemoProps): React.JSX.Element {
    // Construct the URL to the specific story in the iframe
    // singleStory=true hides the Storybook sidebar/toolbar for a cleaner embed
    const src = `/storybook/iframe.html?id=${id}&viewMode=${viewMode}&singleStory=true`;

    const [isVisible, setIsVisible] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
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
            <div className={styles.iframeWrapper} style={{ height }}>
                {isVisible ? (
                    <iframe
                        src={src}
                        title={title}
                        className={styles.iframe}
                        tabIndex={-1}
                    />
                ) : (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'var(--almadar-parchment)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--almadar-teal)',
                        opacity: 0.5
                    }}>
                        Loading Preview...
                    </div>
                )}
            </div>
        </div>
    );
}
