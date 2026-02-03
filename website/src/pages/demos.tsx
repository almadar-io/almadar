import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import { useLocation } from '@docusaurus/router';
import StorybookDemo from '../components/StorybookDemo';
import styles from './demos.module.css';
import demos from '../data/demos.json';

export default function Demos(): React.JSX.Element {
    const location = useLocation();

    // Scroll to specific demo if ID is in query params
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const id = params.get('id');
        if (id) {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [location]);

    return (
        <Layout
            title="Interactive Demos"
            description="Explore the Almadar design system and templates">
            <main className={styles.main}>
                <div className="container">
                    <div className={styles.header}>
                        <h1>Interactive Showcases</h1>
                        <p>Experience the power of KFlow through live, interactive templates.</p>
                    </div>

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
            </main>
        </Layout>
    );
}
