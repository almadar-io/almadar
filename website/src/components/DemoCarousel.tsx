import React, { useRef, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import demos from '../data/demos.json';
import styles from './DemoCarousel.module.css';

export default function DemoCarousel(): React.JSX.Element {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Triple the list for infinite scroll illusion
    const displayedDemos = [...demos, ...demos, ...demos];

    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.heading}><Translate id="carousel.title">Interactive Showcases</Translate></h2>
                    <p className={styles.subheading}><Translate id="carousel.subtitle">Explore real-world applications built with Almadar.</Translate></p>
                    <div className={styles.actions}>
                        <Link to="/demos" className="button button--primary button--lg">
                            <Translate id="carousel.viewAll">View All Demos</Translate>
                        </Link>
                    </div>
                </div>
            </div>

            <div
                className={styles.scrollWrapper}
            >
                <button
                    className={`${styles.navButton} ${styles.navButtonLeft}`}
                    onClick={() => scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}
                    aria-label="Scroll left"
                >
                    ←
                </button>

                <button
                    className={`${styles.navButton} ${styles.navButtonRight}`}
                    onClick={() => scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}
                    aria-label="Scroll right"
                >
                    →
                </button>

                <div
                    className={styles.scrollTrack}
                    ref={scrollRef}
                >
                    {displayedDemos.map((demo, index) => (
                        <DemoCard key={`${demo.id}-${index}`} demo={demo} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function DemoCard({ demo }: { demo: typeof demos[0] }) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <Link
            ref={cardRef}
            to={`/demos?id=${demo.id}`}
            className={styles.card}
            draggable="false"
        >
            <div className={styles.cardPreviewContainer}>
                <div className={styles.cardPreview}>
                    {isVisible ? (
                        <iframe
                            src={`/storybook/iframe.html?id=${demo.id}&viewMode=story&singleStory=true`}
                            title={demo.title}
                            tabIndex={-1}
                        />
                    ) : (
                        <div className={styles.cardPlaceholder}>
                            <div className={styles.cardPlaceholderPattern} />
                            <span className={styles.cardPlaceholderLabel}>Preview</span>
                        </div>
                    )}
                </div>
                <div className={styles.previewOverlay} />
            </div>

            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <span className={styles.cardCategory}>{demo.category}</span>
                </div>
                <h3 className={styles.cardTitle}>{demo.title}</h3>
                <p className={styles.cardDesc}>{demo.description}</p>
                <span className={styles.cta}><Translate id="carousel.exploreDemo">Explore Demo →</Translate></span>
            </div>
        </Link>
    );
}
