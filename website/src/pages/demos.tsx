import React, { useState, useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import HeroSection from '../components/HeroSection';
import styles from './demos.module.css';
import { PROJECTS, type ProjectEntry } from '../data/projects';

// ─── URL Builders ──────────────────────────────────────────────────────────

interface ParsedStoryId {
  storyPath: string;
  existingParams: string;
}

/**
 * Parse featuredStoryId which may contain existing URL parameters
 * e.g., "story-id--name&globals=theme:light" -> { storyPath: "story-id--name", existingParams: "globals=theme:light" }
 */
function parseStoryId(storyId: string): ParsedStoryId {
  const ampIndex = storyId.indexOf('&');
  if (ampIndex === -1) {
    return { storyPath: storyId, existingParams: '' };
  }
  return {
    storyPath: storyId.substring(0, ampIndex),
    existingParams: storyId.substring(ampIndex + 1),
  };
}

/**
 * Build iframe URL for embedded Storybook (fullscreen mode)
 * Uses the specific featured story with all UI hidden
 */
function buildIframeUrl(project: ProjectEntry): string {
  const baseUrl = project.storybookUrl;
  const { storyPath, existingParams } = parseStoryId(project.featuredStoryId);
  
  // Build URL: base/?path=/story/STORY_PATH&full=true&existingParams
  const params = existingParams 
    ? `full=true&${existingParams}` 
    : 'full=true';
  
  return `${baseUrl}/?path=/story/${storyPath}&${params}`;
}

/**
 * Build external Storybook URL (opens in new tab)
 * Shows sidebar but hides addon panel for cleaner viewing
 */
function buildExternalStorybookUrl(project: ProjectEntry): string {
  const baseUrl = project.storybookUrl;
  const { storyPath, existingParams } = parseStoryId(project.featuredStoryId);
  
  // panel=false hides addon panel but keeps sidebar visible
  const params = existingParams 
    ? `panel=false&${existingParams}` 
    : 'panel=false';
  
  return `${baseUrl}/?path=/story/${storyPath}&${params}`;
}

// ─── Storybook iframe per project ──────────────────────────────────────────

function ProjectStorybookFrame({ project }: { project: ProjectEntry }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Use specific story URL with fullscreen mode for iframe
  const iframeSrc = buildIframeUrl(project);
  const externalUrl = buildExternalStorybookUrl(project);

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
              href={externalUrl}
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

      {/* iframe — desktop only (fullscreen Storybook) */}
      <div className={styles.iframeContainer}>
        {!loaded && !error && (
          <div
            className={styles.iframeSkeleton}
            style={{ background: project.accentColor + '18' }}
          >
            <span className={styles.skeletonLabel}>
              Loading {project.name}...
            </span>
          </div>
        )}
        {error && (
          <div className={styles.iframeError}>
            <p>Failed to load design system preview.</p>
            <Link
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button--primary button--sm"
            >
              Open in New Tab ↗
            </Link>
          </div>
        )}
        <iframe
          src={iframeSrc}
          title={`${project.name} Design System`}
          className={styles.iframe}
          style={{ opacity: loaded ? 1 : 0 }}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          allow="fullscreen"
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
            href={externalUrl}
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
      const navHeight = 140;
      const top = element.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value;
    const element = document.getElementById(key);
    if (element) {
      const navHeight = 140;
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
        
        {/* Desktop: Pills */}
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

        {/* Mobile: Select dropdown */}
        <div className={styles.mobileNav}>
          <select 
            value={activeProject}
            onChange={handleSelectChange}
            className={styles.mobileSelect}
            style={{ borderColor: PROJECTS.find(p => p.key === activeProject)?.accentColor }}
          >
            {PROJECTS.map((project) => (
              <option key={project.key} value={project.key}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

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
        rootMargin: '-10% 0px -40% 0px',
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
              Browse the templates, components, and interactions — no installation needed.
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

        {/* One section per project */}
        {PROJECTS.map((project) => (
          <ProjectStorybookFrame key={project.key} project={project} />
        ))}
      </main>
    </Layout>
  );
}
