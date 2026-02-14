import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import StorybookDemo from '../components/StorybookDemo';
import HeroSection from '../components/HeroSection';
import styles from './demos.module.css';
import demos from '../data/demos.json';

export default function Demos(): React.JSX.Element {
    return (
        <Layout
            title={translate({ id: 'demos.meta.title', message: 'Interactive Demos' })}
            description={translate({ id: 'demos.meta.description', message: 'Explore the Almadar design system and templates' })}>
            <main className={styles.main}>
                <HeroSection
                    tag={<Translate id="demos.tag">Demos</Translate>}
                    title={<Translate id="demos.title">Interactive Showcases</Translate>}
                    subtitle={<Translate id="demos.description">Experience the power of Almadar through live, interactive templates.</Translate>}
                    buttons={
                        <Link className="button button--primary button--lg" to="#demos-grid">
                            <Translate id="demos.cta">View Demos</Translate>
                        </Link>
                    }
                />

                <div className={styles.demosSection}>
                    <div className="container">
                        <div id="demos-grid" className={styles.grid}>
                            {demos.map((demo) => {
                                const translatedTitle = translate({ id: `demo.${demo.key}.title`, message: demo.title });
                                const translatedDesc = translate({ id: `demo.${demo.key}.description`, message: demo.description });
                                const translatedCategory = translate({ id: `demo.category.${demo.categoryKey}`, message: demo.category });
                                return (
                                    <div key={demo.id} id={demo.id} className={styles.demoWrapper}>
                                        <div className={styles.demoMeta}>
                                            <span className={styles.badge}>{translatedCategory}</span>
                                            <h2>{translatedTitle}</h2>
                                            <p>{translatedDesc}</p>
                                        </div>
                                        <StorybookDemo
                                            id={demo.id}
                                            title={translatedTitle}
                                            height={demo.height}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
