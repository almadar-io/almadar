import React, { useRef, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import demos from '../data/demos.json';
import styles from './DemoCarousel.module.css';

export default function DemoCarousel(): React.JSX.Element {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Triple the list for infinite scroll illusion
    const displayedDemos = [...demos, ...demos, ...demos];

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationFrameId: number;

        const scroll = () => {
            if (!isPaused && scrollContainer) {
                // Scroll speed
                scrollContainer.scrollLeft += 1;

                // Reset position for infinite loop effect
                // If we've scrolled past the first set (approx 1/3 of total width), reset to 0
                // Note: exact pixel math depends on card widths, but rough reset works for visual flow if lists are identical
                const maxScroll = scrollContainer.scrollWidth / 3;
                if (scrollContainer.scrollLeft >= maxScroll * 2) {
                    scrollContainer.scrollLeft = maxScroll;
                } else if (scrollContainer.scrollLeft <= 0) {
                    scrollContainer.scrollLeft = maxScroll;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        // Initialize scroll position to the middle set
        // This allows scrolling left immediately
        if (scrollContainer.scrollLeft === 0) {
            // We'll trust the layout measurement in the next frame or use a rough estimate if needed
            // better to let it run
        }

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.heading}>Interactive Showcases</h2>
                    <p className={styles.subheading}>Explore real-world applications built with Almadar.</p>
                    <div className={styles.actions}>
                        <Link to="/demos" className="button button--primary button--lg">
                            View All Demos
                        </Link>
                    </div>
                </div>
            </div>

            <div
                className={styles.scrollWrapper}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >
                <div
                    className={styles.scrollTrack}
                    ref={scrollRef}
                >
                    {displayedDemos.map((demo, index) => (
                        <Link
                            to={`/demos?id=${demo.id}`}
                            key={`${demo.id}-${index}`}
                            className={styles.card}
                            draggable="false"
                        >
                            <div className={styles.cardPreviewContainer}>
                                <div className={styles.cardPreview}>
                                    <iframe
                                        src={`/storybook/iframe.html?id=${demo.id}&viewMode=story&singleStory=true`}
                                        title={demo.title}
                                        loading="lazy"
                                        tabIndex={-1}
                                    />
                                </div>
                                <div className={styles.previewOverlay} />
                            </div>

                            <div className={styles.cardContent}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.cardCategory}>{demo.category}</span>
                                </div>
                                <h3 className={styles.cardTitle}>{demo.title}</h3>
                                <p className={styles.cardDesc}>{demo.description}</p>
                                <span className={styles.cta}>Explore Demo →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
