import React from 'react';
import Footer from '@theme-original/BlogPostItem/Footer';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';

function useRecentPosts() {
    return [
        {
            title: translate({
                id: 'blog.recentPosts.oneSchemaTitle',
                message: 'One Schema, Six Apps',
            }),
            permalink: "/blog/one-schema-six-apps",
        },
        {
            title: translate({
                id: 'blog.recentPosts.jsonThinksTitle',
                message: 'JSON That Thinks: Turing-Complete JSON',
            }),
            permalink: "/blog/json-that-thinks",
        },
        {
            title: translate({
                id: 'blog.recentPosts.threeExecutionModelsTitle',
                message: 'Three Execution Models, One Source of Truth',
            }),
            permalink: "/blog/three-execution-models",
        },
        {
            title: translate({
                id: 'blog.recentPosts.closedCircuitTitle',
                message: 'The Closed Circuit Pattern',
            }),
            permalink: "/blog/closed-circuit-pattern",
        },
    ];
}

export default function BlogPostItemFooter(props): JSX.Element {
    const recentPosts = useRecentPosts();

    return (
        <>
            <Footer {...props} />

            <section style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--ifm-toc-border-color)' }}>
                <h3>
                    {translate({
                        id: 'blog.recentPosts.heading',
                        message: 'Recent Posts',
                    })}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                    {recentPosts.map((post) => (
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
                        >
                            <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{post.title}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--almadar-teal)' }}>
                                {translate({
                                    id: 'blog.recentPosts.readArticle',
                                    message: 'Read Article →',
                                })}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}
