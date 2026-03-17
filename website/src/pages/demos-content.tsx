import React, { useState, useEffect, useRef } from 'react';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import HeroSection from '../components/HeroSection';
import { ScreenshotGallery } from '../components/ScreenshotGallery';
import styles from './demos.module.css';
import { useProjects, PROJECTS, type ProjectEntry } from '../data/projects';

// ─── Screenshot Manifest Types ───────────────────────────────────────────────

interface Screenshot {
  storyId: string;
  storyName: string;
  title: string;
  filename: string;
  success: boolean;
}

interface ScreenshotManifest {
  storybookUrl: string;
  capturedAt: string;
  viewport: { width: number; height: number };
  total: number;
  screenshots: Screenshot[];
}

// ─── URL Builders ──────────────────────────────────────────────────────────

/**
 * Build external Storybook URL for a specific story
 */
function buildStorybookUrl(storybookUrl: string, storyId: string): string {
  return `${storybookUrl}/?path=/story/${storyId}`;
}

// ─── Project Section with Screenshot Gallery ────────────────────────────────

interface ProjectSectionProps {
  project: ProjectEntry;
  screenshots: Screenshot[];
}

function ProjectSection({ project, screenshots }: ProjectSectionProps) {
  const featuredStoryId = project.featuredStoryId.split('&')[0]; // Remove any query params
  const featuredUrl = buildStorybookUrl(project.storybookUrl, featuredStoryId);

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
              href={featuredUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button--secondary button--sm"
            >
              <Translate id="demos.viewStorybook">View Storybook</Translate>
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

      {/* Screenshot Gallery */}
      <div className={styles.galleryContainer}>
        <div className="container">
          <ScreenshotGallery
            projectKey={project.key}
            storybookUrl={project.storybookUrl}
            screenshots={screenshots}
          />
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

// ─── Page Content ───────────────────────────────────────────────────────────

export default function DemosContent(): React.JSX.Element {
  const projects = useProjects();
  const [activeProject, setActiveProject] = useState(projects[0]?.key || PROJECTS[0].key);
  const [screenshotData, setScreenshotData] = useState<Record<string, Screenshot[]>>({});
  const userInitiatedScroll = useRef(false);

  // Load screenshot manifests for all projects
  useEffect(() => {
    const loadManifests = async () => {
      const data: Record<string, Screenshot[]> = {};
      
      for (const project of projects) {
        try {
          const response = await fetch(`/screenshots/${project.key}/manifest.json`);
          if (response.ok) {
            const manifest: ScreenshotManifest = await response.json();
            data[project.key] = manifest.screenshots.filter(s => s.success);
          } else {
            console.warn(`No screenshot manifest found for ${project.key}`);
            data[project.key] = [];
          }
        } catch (error) {
          console.warn(`Failed to load screenshots for ${project.key}:`, error);
          data[project.key] = [];
        }
      }
      
      setScreenshotData(data);
    };

    loadManifests();
  }, [projects]);

  // Track which project is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
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

  const handleProjectChange = (key: string) => {
    userInitiatedScroll.current = true;
    setActiveProject(key);
  };

  return (
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
        <ProjectSection 
          key={project.key} 
          project={project}
          screenshots={screenshotData[project.key] || []}
        />
      ))}
    </main>
  );
}
