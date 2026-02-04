import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './OrbitalVisualization.module.css';

const OrbitalVisualization: React.FC = () => {
    return (
        <div className={styles.container}>
            <img
                src={useBaseUrl('/img/orbital-blueprint.png')}
                alt="Technical Blueprint of the Orbital Architecture: Entity Core, Trait Circuitry, Page Frame"
                className={styles.schematicImage}
            />
        </div>
    );
};

export default OrbitalVisualization;
