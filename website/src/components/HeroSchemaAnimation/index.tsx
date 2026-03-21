import React from "react";
import Translate, { translate } from "@docusaurus/Translate";
import { AvlOrbitalUnit, AvlStateMachine } from "@almadar/ui/illustrations";
import styles from "./styles.module.css";
import type { OrbitalSchema } from "./types";

/**
 * HeroSchemaAnimation — AVL-based hero visualization.
 *
 * Shows an animated Orbital Unit with a state machine using formal AVL notation.
 * Renders Entity + Traits + Pages on top, state machine below.
 */
export default function HeroSchemaAnimation({ schema }: { schema?: OrbitalSchema }) {
  const appName = schema?.name ?? translate({ message: "Order Fulfillment App", id: "hero.viz.appName" });
  const entityName = schema?.orbitals?.[0]
    ? (typeof schema.orbitals[0].entity === 'string'
      ? schema.orbitals[0].entity.split('.').pop() ?? 'Order'
      : schema.orbitals[0].entity.name)
    : translate({ message: "Order", id: "hero.viz.entityName" });

  const traitName = translate({ message: "Fulfillment", id: "hero.viz.traitName" });
  const pageName = translate({ message: "Track Order", id: "hero.viz.pageName" });

  return (
    <div className={styles.container} style={{ direction: 'ltr' }}>
      <svg
        viewBox="0 0 600 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        {/* Application frame */}
        <rect
          x="10" y="10" width="580" height="700" rx="16"
          stroke="var(--ifm-color-emphasis-400)"
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
          opacity="0.5"
        />
        <text
          x={30} y={40}
          textAnchor="start"
          fontSize="12"
          fontWeight="600"
          fill="var(--ifm-color-emphasis-500)"
          fontFamily="'IBM Plex Mono', monospace"
        >
          APP: {appName.toUpperCase()}
        </text>

        {/* Orbital Unit visualization (top half) */}
        <g transform="translate(-10, 20)">
          <AvlOrbitalUnit
            entityName={entityName}
            fields={4}
            persistence="persistent"
            traits={[{ name: traitName }]}
            pages={[{ name: pageName }]}
            animated
          />
        </g>

        {/* State machine visualization (bottom half) */}
        <g transform="translate(0, 320)">
          <AvlStateMachine
            states={[
              { name: "placed", isInitial: true },
              { name: "prep" },
              { name: "shipped" },
              { name: "done", isTerminal: true },
            ]}
            transitions={[
              { from: "placed", to: "prep", event: "verify" },
              { from: "prep", to: "shipped", event: "dispatch" },
              { from: "shipped", to: "done", event: "arrive" },
            ]}
            animated
          />
        </g>

        {/* Formula label */}
        <text
          x={24} y={696}
          textAnchor="start"
          fontSize="11"
          fill="var(--ifm-color-emphasis-500)"
          opacity="0.7"
          fontFamily="'IBM Plex Mono', monospace"
        >
          <Translate id="hero.viz.orbitalUnit">Orbital Unit = Entity + Traits + Pages</Translate>
        </text>
      </svg>
    </div>
  );
}
