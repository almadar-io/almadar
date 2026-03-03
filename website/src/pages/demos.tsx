import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import HeroSection from '../components/HeroSection';
import styles from './demos.module.css';
import { PROJECTS, type ProjectEntry } from '../data/projects';

// ─── Storybook iframe per project ──────────────────────────────────────────

function ProjectStorybookFrame({ project }: { project: ProjectEntry }) {
  const [loaded, setLoaded] = useState(false);
  const src = `${project.storybookUrl}/?path=/story/${project.featuredStoryId}`;

  return (
    <div
      className={styles.projectSection}
      id={project.key}
      style={{ '--accent': project.accentColor } as React.CSSProperties}
    >
      <div className="container">
        <div className={styles.projectHeader}>
          <div className={styles.projectMeta}>
            <span className={styles.badge}>{project.category}</span>
            <Heading as="h2" className={styles.projectName}>
              {project.name}
            </Heading>
            <p className={styles.projectTagline}>{project.tagline}</p>
          </div>
          <div className={styles.projectLinks}>
            <Link
              href={project.storybookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button--secondary button--sm"
            >
              <Translate id="demos.openStorybook">Open Full Storybook</Translate>
              {' ↗'}
            </Link>
            <Link
              href={project.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button--primary button--sm"
            >
              <Translate id="demos.openApp">Open Live App</Translate>
              {' ↗'}
            </Link>
          </div>
        </div>
      </div>

      {/* iframe — desktop only */}
      <div className={styles.iframeContainer}>
        {!loaded && (
          <div
            className={styles.iframeSkeleton}
            style={{ background: project.accentColor + '18' }}
          >
            <span className={styles.skeletonLabel}>
              {project.name}
            </span>
          </div>
        )}
        <iframe
          src={src}
          title={project.name}
          className={styles.iframe}
          style={{ opacity: loaded ? 1 : 0 }}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Mobile fallback — link only */}
      <div className={styles.mobileFallback}>
        <div className="container">
          <p className={styles.mobileNote}>
            <Translate id="demos.mobileNote">
              Open on a larger screen to browse the interactive design system.
            </Translate>
          </p>
          <Link
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="button button--primary button--md"
          >
            <Translate id="demos.openDesignSystem">Open Design System ↗</Translate>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function Demos(): React.JSX.Element {
  return (
    <Layout
      title={translate({ id: 'demos.meta.title', message: 'Project Demos — Almadar' })}
      description={translate({
        id: 'demos.meta.description',
        message: 'Browse the live design systems for each Almadar client project — government, consumer, education, and games.',
      })}
    >
      <main className={styles.main}>
        <HeroSection
          tag={<Translate id="demos.tag">Our Work</Translate>}
          title={<Translate id="demos.title">Live Design Systems</Translate>}
          subtitle={
            <Translate id="demos.description">
              Each Almadar project ships with a fully deployed Storybook design system.
              Browse the templates, components, and interactions — no installation needed.
            </Translate>
          }
          buttons={
            <Link className="button button--secondary button--lg" to="/#our-work">
              <Translate id="demos.backToPortfolio">Back to Portfolio</Translate>
            </Link>
          }
        />

        {/* Project nav */}
        <nav className={styles.projectNav}>
          <div className="container">
            <div className={styles.projectNavInner}>
              {PROJECTS.map((project) => (
                <a
                  key={project.key}
                  href={`#${project.key}`}
                  className={styles.projectNavItem}
                  style={{ '--accent': project.accentColor } as React.CSSProperties}
                >
                  {project.name}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* One section per project */}
        {PROJECTS.map((project) => (
          <ProjectStorybookFrame key={project.key} project={project} />
        ))}
      </main>
    </Layout>
  );
}
