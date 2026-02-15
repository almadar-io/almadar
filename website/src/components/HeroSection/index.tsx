import React from "react";
import type { ReactNode } from "react";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

interface HeroSectionProps {
  title: ReactNode;
  subtitle: ReactNode;
  buttons: ReactNode;
  tag?: ReactNode;
  /** Optional background illustration (e.g. HeroSchemaAnimation on homepage) */
  backgroundElement?: ReactNode;
}

/**
 * Shared hero section used across all top-level pages.
 * Text overlay on the left; optional background illustration on the right.
 */
export default function HeroSection({
  title,
  subtitle,
  buttons,
  tag,
  backgroundElement,
}: HeroSectionProps) {
  return (
    <header className={styles.hero}>
      {backgroundElement && (
        <div className={styles.heroPatternContainer}>
          {backgroundElement}
        </div>
      )}
      <div className={styles.heroContainer}>
        <div className={styles.heroText}>
          {tag && <span className={styles.tag}>{tag}</span>}
          <Heading as="h1" className={styles.heroTitle}>
            {title}
          </Heading>
          <p className={styles.heroSubtitle}>{subtitle}</p>
          <div className={styles.buttons}>{buttons}</div>
        </div>
      </div>
    </header>
  );
}
