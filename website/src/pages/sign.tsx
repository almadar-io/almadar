import React from 'react';
import type { ReactNode } from 'react';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './sign.module.css';

/**
 * Conference sign. Hidden — not linked from the navbar or sitemap.
 * Render at /sign (full-bleed, no Docusaurus chrome) and project it on
 * a screen at the booth.
 */
export default function Sign(): ReactNode {
  const logo = useBaseUrl('/img/new-logos/almadar-logo.svg');

  return (
    <>
      <Head>
        <title>Almadar</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="theme-color" content="#0a0a0a" />
      </Head>

      <main className={styles.shell}>
        <div className={styles.brand}>
          <img src={logo} alt="" className={styles.brandMark} />
          <span className={styles.brandWord}>Almadar</span>
        </div>

        <h1 className={styles.headline}>
          <span className={styles.lineNormal}>Bring an idea.</span>
          <span className={styles.kicker}>Leave with a</span>
          <span className={styles.linePunch}>working product.</span>
        </h1>

        <div className={styles.accent} aria-hidden />
      </main>
    </>
  );
}
