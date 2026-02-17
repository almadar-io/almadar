import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import StorybookDemo from '../components/StorybookDemo';
import HeroSection from '../components/HeroSection';
import styles from './demos.module.css';
import demos from '../data/demos.json';

import { useState } from 'react';
import HeroSchemaAnimation from '../components/HeroSchemaAnimation';
import { demoSchemas } from '../data/demo-schemas';

export default function Demos(): React.JSX.Element {
    const [viewMode, setViewMode] = useState<Record<string, 'live' | 'arch'>>({});

    const toggleView = (key: string) => {
        setViewMode(prev => ({
            ...prev,
            [key]: prev[key] === 'arch' ? 'live' : 'arch'
        }));
    };

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
                                const isArch = viewMode[demo.key] === 'arch';
                                const schema = demoSchemas[demo.key];

                                return (
                                    <div key={demo.key} id={demo.key} className={styles.demoWrapper}>
                                        <div className={styles.demoMeta}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                                <div>
                                                    <span className={styles.badge}>{translatedCategory}</span>
                                                    <h2>{translatedTitle}</h2>
                                                </div>
                                                {schema && (
                                                    <button
                                                        className="button button--secondary button--sm"
                                                        onClick={() => toggleView(demo.key)}
                                                        style={{ marginLeft: '1rem' }}
                                                    >
                                                        {isArch ? 'View Demo' : 'View Architecture'}
                                                    </button>
                                                )}
                                            </div>
                                            <p>{translatedDesc}</p>
                                        </div>

                                        {isArch && schema ? (
                                            <div style={{
                                                height: demo.height,
                                                background: 'var(--ifm-background-surface-color)',
                                                borderRadius: 'var(--radius-lg)',
                                                border: '1px solid var(--ifm-color-emphasis-200)',
                                                overflow: 'hidden',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <HeroSchemaAnimation schema={schema} />
                                            </div>
                                        ) : (
                                            <StorybookDemo
                                                demoKey={demo.key}
                                                title={translatedTitle}
                                                height={demo.height}
                                                theme={demo.theme}
                                            />
                                        )}
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
