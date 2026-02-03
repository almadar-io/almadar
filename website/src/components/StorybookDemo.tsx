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

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.dots}>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                </div>
                <span className={styles.title}>{title}</span>
            </div>
            <div className={styles.iframeWrapper} style={{ height }}>
                <iframe
                    src={src}
                    title={title}
                    className={styles.iframe}
                    loading="lazy"
                />
            </div>
        </div>
    );
}
