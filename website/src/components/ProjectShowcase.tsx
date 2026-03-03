import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Translate from '@docusaurus/Translate';
import { PROJECTS, type ProjectEntry } from '../data/projects';
import styles from './ProjectShowcase.module.css';

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
  const storyUrl = `${project.storybookUrl}/?path=/story/${project.featuredStoryId}`;
  return (
    <article
      className={styles.card}
      style={{ '--accent': project.accentColor } as React.CSSProperties}
    >
      <div className={styles.cardAccent} />
      <div className={styles.cardInner}>
        {/* Header row */}
        <div className={styles.cardHeader}>
          <span className={styles.category}>{project.category}</span>
          <Link
            href={storyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.appLink}
          >
            <Translate id="showcase.viewDesignSystem">View Design System</Translate>
            <span aria-hidden="true"> ↗</span>
          </Link>
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
          <Link
            href={storyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionLink}
            style={{ color: project.accentColor }}
          >
            <Translate id="showcase.viewDesignSystem">View Design System</Translate>
            <span aria-hidden="true"> ↗</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ProjectShowcase() {
  return (
    <section className={styles.section}>
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
