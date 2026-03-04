import React, { useState, useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import HeroSection from '../components/HeroSection';
import styles from './demos.module.css';
import { PROJECTS, type ProjectEntry } from '../data/projects';

// ─── Project Card (replaces iframe) ─────────────────────────────────────────

function ProjectCard({ project }: { project: ProjectEntry }) {
  return (
    <div
      className={styles.projectCard}
      id={project.key}
      style={{ '--accent': project.accentColor } as React.CSSProperties}
    >
      <div className="container">
        <div className={styles.cardContent}>
          {/* Left: Project Info */}
          <div className={styles.cardInfo}>
            <span className={styles.badge}>{project.category}</span>
            <Heading as="h2" className={styles.projectName}>
              {project.name}
            </Heading>
            <p className={styles.projectTagline}>{project.tagline}</p>
            
            {/* Tech pills */}
            <div className={styles.techPills}>
              {project.techPills.slice(0, 3).map((pill, i) => (
                <span key={i} className={styles.techPill}>{pill.label}</span>
              ))}
            </div>

            {/* Action buttons */}
            <div className={styles.cardActions}>
              <Link
                href={project.storybookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button--secondary"
              >
                <Translate id="demos.openStorybook">Open Design System</Translate>
                {' ↗'}
              </Link>
              <Link
                href={project.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button--primary"
              >
                <Translate id="demos.openApp">Open Live App</Translate>
                {' ↗'}
              </Link>
            </div>
          </div>

          {/* Right: Preview Image/Placeholder */}
          <div 
            className={styles.cardPreview}
            style={{ backgroundColor: `${project.accentColor}15` }}
          >
            <div 
              className={styles.previewAccent}
              style={{ backgroundColor: project.accentColor }}
            />
            <span className={styles.previewLetter}>{project.name[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sticky Navigation ─────────────────────────────────────────────────────

function ProjectNav({ activeProject }: { activeProject: string }) {
  const navRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 60);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, key: string) => {
    e.preventDefault();
    const element = document.getElementById(key);
    if (element) {
      const navHeight = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav 
      ref={navRef}
      className={`${styles.projectNav} ${isSticky ? styles.sticky : ''}`}
    >
      <div className="container">
        <div className={styles.navHeader}>
          <span className={styles.navLabel}>
            <Translate id="demos.jumpTo">Jump to project</Translate>
          </span>
        </div>
        <div className={styles.projectNavInner}>
          {PROJECTS.map((project) => (
            <a
              key={project.key}
              href={`#${project.key}`}
              onClick={(e) => handleNavClick(e, project.key)}
              className={`${styles.projectNavItem} ${activeProject === project.key ? styles.active : ''}`}
              style={{ '--accent': project.accentColor } as React.CSSProperties}
            >
              <span className={styles.navDot} style={{ backgroundColor: project.accentColor }} />
              {project.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function Demos(): React.JSX.Element {
  const [activeProject, setActiveProject] = useState(PROJECTS[0].key);

  // Track which project is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveProject(entry.target.id);
          }
        });
      },
      { 
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0 
      }
    );

    PROJECTS.forEach((project) => {
      const element = document.getElementById(project.key);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

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
              Browse components, templates, and interactions — no installation needed.
            </Translate>
          }
          buttons={
            <Link className="button button--secondary button--lg" to="/#our-work">
              <Translate id="demos.backToPortfolio">Back to Portfolio</Translate>
            </Link>
          }
        />

        {/* Sticky Navigation */}
        <ProjectNav activeProject={activeProject} />

        {/* Project Cards */}
        <div className={styles.projectsContainer}>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.key} project={project} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className={styles.footerCta}>
          <div className="container">
            <Heading as="h2" className={styles.footerTitle}>
              <Translate id="demos.ctaTitle">Want to see more?</Translate>
            </Heading>
            <p className={styles.footerText}>
              <Translate id="demos.ctaText">
                Each design system contains dozens of components and templates.
                Open any project above to explore the full Storybook.
              </Translate>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
