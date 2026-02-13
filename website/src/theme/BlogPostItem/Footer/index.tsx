import React from 'react';
import Footer from '@theme-original/BlogPostItem/Footer';
import Link from '@docusaurus/Link';

// A curated list of recent/important posts to show at the bottom
const RECENT_POSTS = [
    {
        title: "Three Execution Models, One Source of Truth",
        permalink: "/blog/three-execution-models",
    },
    {
        title: "State Sync Across Browser Tabs",
        permalink: "/blog/state-sync-browser-tabs",
    },
    {
        title: "Schema-First Development",
        permalink: "/blog/schema-first-development",
    },
    {
        title: "The IKEA Effect for Software",
        permalink: "/blog/ikea-effect-software",
    },
];

export default function BlogPostItemFooter(props): JSX.Element {
    return (
        <>
            <Footer {...props} />

            <section style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--ifm-toc-border-color)' }}>
                <h3>Recent Posts</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                    {RECENT_POSTS.map((post) => (
                        <Link
                            key={post.permalink}
                            to={post.permalink}
                            style={{
                                display: 'block',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid var(--ifm-color-emphasis-200)',
                                textDecoration: 'none',
                                color: 'var(--ifm-font-color-base)',
                                transition: 'all 0.2s ease',
                            }}
                        // Add hover effect via simplified inline style or class if possible, 
                        // but for now simpler is better. Docusaurus Link handles navigation.
                        >
                            <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{post.title}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--almadar-teal)' }}>Read Article →</div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}
