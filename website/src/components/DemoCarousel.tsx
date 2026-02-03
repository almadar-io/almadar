import React, { useRef, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import demos from '../data/demos.json';
import styles from './DemoCarousel.module.css';

export default function DemoCarousel(): React.JSX.Element {
    const [isPaused, setIsPaused] = useState(false);

    // We duplicate the list to ensure seamless infinite scrolling
    const displayedDemos = [...demos, ...demos, ...demos];

    return (
        <div className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.heading}>Interactive Showcases</h2>
                    <p className={styles.subheading}>Explore real-world applications built with KFlow.</p>
                    <div className={styles.actions}>
                        <Link to="/demos" className="button button--primary button--lg">
                            View All Demos
                        </Link>
                    </div>
                </div>
            </div>

            <div
                className={styles.carouselContainer}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className={`${styles.track} ${isPaused ? styles.paused : ''}`}>
                    {displayedDemos.map((demo, index) => (
                        <Link to={`/demos?id=${demo.id}`} key={`${demo.id}-${index}`} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardCategory}>{demo.category}</span>
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{demo.title}</h3>
                                <p className={styles.cardDesc}>{demo.description}</p>
                                <div className={styles.cta}>View Interactive Demo →</div>
                            </div>
                            {/* We could add a screenshot here if available in the future */}
                            <div className={styles.cardBackground}></div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
