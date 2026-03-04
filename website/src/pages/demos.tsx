import React, { useState, useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import HeroSection from '../components/HeroSection';
import styles from './demos.module.css';
import { useProjects, PROJECTS, type ProjectEntry } from '../data/projects';

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

interface ProjectStorybookFrameProps {
  project: ProjectEntry;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
}

function ProjectStorybookFrame({ project, onLoadStart, onLoadEnd }: ProjectStorybookFrameProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Use specific story URL with fullscreen mode for iframe
  const iframeSrc = buildIframeUrl(project);
  const externalUrl = buildExternalStorybookUrl(project);

  // Notify parent when load starts (on mount or src change)
  useEffect(() => {
    onLoadStart?.();
    setLoaded(false);
    setError(false);
  }, [iframeSrc, onLoadStart]);

  const handleLoad = () => {
    setLoaded(true);
    onLoadEnd?.();
  };

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
          onLoad={handleLoad}
          onError={() => {
            setError(true);
            onLoadEnd?.();
          }}
          allow="fullscreen"
          scrolling="no"
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

function ProjectNav({ 
  projects,
  activeProject, 
  onProjectChange 
}: { 
  projects: ProjectEntry[];
  activeProject: string;
  onProjectChange: (key: string) => void;
}) {
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
    onProjectChange(key);
    const element = document.getElementById(key);
    if (element) {
      const navHeight = 140;
      const top = element.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value;
    onProjectChange(key);
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
          {projects.map((project) => (
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
            style={{ borderColor: projects.find(p => p.key === activeProject)?.accentColor }}
          >
            {projects.map((project) => (
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
  const projects = useProjects();
  const [activeProject, setActiveProject] = useState(projects[0]?.key || PROJECTS[0].key);
  const userInitiatedScroll = useRef(false);
  const loadingCountRef = useRef(0);
  const [, forceUpdate] = useState({});

  // Track which project is in view (only updates state, doesn't auto-scroll)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Skip updates during iframe loads to prevent scroll jumps
        if (loadingCountRef.current > 0) return;
        // Only update active state if user hasn't manually clicked
        if (!userInitiatedScroll.current) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveProject(entry.target.id);
            }
          });
        }
      },
      { 
        rootMargin: '-10% 0px -40% 0px',
        threshold: 0 
      }
    );

    projects.forEach((project) => {
      const element = document.getElementById(project.key);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Reset user initiated scroll flag after scroll completes
  useEffect(() => {
    const handleScrollEnd = () => {
      userInitiatedScroll.current = false;
    };

    window.addEventListener('scroll', handleScrollEnd, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollEnd);
  }, []);

  const handleProjectChange = (key: string) => {
    userInitiatedScroll.current = true;
    setActiveProject(key);
  };

  const handleIframeLoadStart = () => {
    loadingCountRef.current += 1;
    forceUpdate({}); // Trigger re-render to disable observer
  };

  const handleIframeLoadEnd = () => {
    loadingCountRef.current = Math.max(0, loadingCountRef.current - 1);
    forceUpdate({}); // Trigger re-render to re-enable observer
  };

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
        <ProjectNav 
          projects={projects}
          activeProject={activeProject} 
          onProjectChange={handleProjectChange}
        />

        {/* One section per project */}
        {projects.map((project) => (
          <ProjectStorybookFrame 
            key={project.key} 
            project={project} 
            onLoadStart={handleIframeLoadStart}
            onLoadEnd={handleIframeLoadEnd}
          />
        ))}
      </main>
    </Layout>
  );
}
