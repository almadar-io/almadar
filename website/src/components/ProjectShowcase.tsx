import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Translate from '@docusaurus/Translate';
import { PROJECTS, type ProjectEntry } from '../data/projects';
import styles from './ProjectShowcase.module.css';

/**
 * Build Storybook URL for external viewing (panel hidden, sidebar visible)
 */
function buildStorybookUrl(project: ProjectEntry): string {
  const baseUrl = project.storybookUrl;
  const storyPath = project.featuredStoryId;
  
  // panel=false hides addon panel but keeps sidebar visible
  return `${baseUrl}/?path=/story/${storyPath}&panel=false`;
}

function TechPills({ pills, accentColor }: { pills: ProjectEntry['techPills']; accentColor: string }) {
  return (
    <div className={styles.pills}>
      {pills.map((pill) => (
        <span
          key={pill.label}
          className={styles.pill}
          style={{ borderColor: accentColor, color: accentColor }}
        >
          {pill.label}
        </span>
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: ProjectEntry }) {
  // Link to demos page with anchor for this specific project
  const demoUrl = `/demos#${project.key}`;
  const storyUrl = buildStorybookUrl(project);
  
  return (
    <Link
      to={demoUrl}
      className={styles.cardLink}
      style={{ '--accent': project.accentColor } as React.CSSProperties}
    >
      <article className={styles.card}>
        <div className={styles.cardAccent} />
        <div className={styles.cardInner}>
          {/* Header row */}
          <div className={styles.cardHeader}>
            <span className={styles.category}>{project.category}</span>
            <span
              className={styles.appLink}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(storyUrl, '_blank', 'noopener,noreferrer');
              }}
            >
              <Translate id="showcase.viewDesignSystem">View Design System</Translate>
              <span aria-hidden="true"> ↗</span>
            </span>
          </div>

          {/* Title */}
          <Heading as="h3" className={styles.projectName}>
            {project.name}
          </Heading>
          <p className={styles.tagline}>{project.tagline}</p>

          {/* Two-column body */}
          <div className={styles.body}>
            <div className={styles.column}>
              <h4 className={styles.sectionLabel}>
                <Translate id="showcase.clientProblem">Client Problem</Translate>
              </h4>
              <p className={styles.text}>{project.clientContext}</p>
            </div>
            <div className={styles.column}>
              <h4 className={styles.sectionLabel}>
                <Translate id="showcase.whatWeBuilt">What We Built</Translate>
              </h4>
              <p className={styles.text}>{project.whatWeBuilt}</p>
            </div>
          </div>

          {/* Tech pills */}
          <TechPills pills={project.techPills} accentColor={project.accentColor} />

          {/* Key capability */}
          <p className={styles.keyCapability}>
            <em>{project.keyCapability}</em>
          </p>

          {/* Actions */}
          <div className={styles.actions}>
            <span className={styles.actionLink} style={{ color: project.accentColor }}>
              <Translate id="showcase.viewDemo">View Demo</Translate>
              <span aria-hidden="true"> →</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function ProjectShowcase() {
  return (
    <section className={styles.section} id="our-work">
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            <Translate id="showcase.title">Our Work</Translate>
          </Heading>
          <p className={styles.sectionSubtitle}>
            <Translate id="showcase.subtitle">
              Six applications across government, consumer, education, and gaming —
              all built from schema to production with Almadar.
            </Translate>
          </p>
        </div>
        <div className={styles.grid}>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.key} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
