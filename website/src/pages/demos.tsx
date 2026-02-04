import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import { useLocation } from '@docusaurus/router';
import StorybookDemo from '../components/StorybookDemo';
import styles from './demos.module.css';
import demos from '../data/demos.json';
import MashrabiyaPattern from '../components/MashrabiyaPattern';

export default function Demos(): React.JSX.Element {
    const location = useLocation();

    // Scroll logic removed based on user request ("page auto scrolls... fix that")
    // useEffect(() => { ... }, [location]);

    return (
        <Layout
            title="Interactive Demos"
            description="Explore the Almadar design system and templates">
            <main className={styles.main}>
                <header className={styles.heroWrapper}>
                    <div className={styles.heroPatternContainer}>
                        <MashrabiyaPattern className={styles.heroPattern} opacity={0.6} />
                    </div>
                    <div className="container">
                        <div className={styles.header}>
                            <h1>Interactive Showcases</h1>
                            <p className={styles.description}>Experience the power of Almadar through live, interactive templates.</p>
                        </div>
                    </div>
                </header>

                <div className={styles.demosSection}>
                    <div className="container">
                        <div className={styles.grid}>
                            {demos.map((demo) => (
                                <div key={demo.id} id={demo.id} className={styles.demoWrapper}>
                                    <div className={styles.demoMeta}>
                                        <span className={styles.badge}>{demo.category}</span>
                                        <h2>{demo.title}</h2>
                                        <p>{demo.description}</p>
                                    </div>
                                    <StorybookDemo
                                        id={demo.id}
                                        title={demo.title}
                                        height={demo.height}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
