import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { translate } from '@docusaurus/Translate';

// Lazy-load the actual content to avoid importing browser-only modules during SSG
const DemosContent = React.lazy(() => import('../components/DemosContent'));

export default function Demos(): React.JSX.Element {
  return (
    <Layout
      title={translate({ id: 'demos.meta.title', message: 'Project Demos — Almadar' })}
      description={translate({
        id: 'demos.meta.description',
        message: 'Browse the live design systems for each Almadar client project — government, consumer, education, and games.',
      })}
    >
      <BrowserOnly fallback={<div style={{ minHeight: '80vh' }} />}>
        {() => (
          <React.Suspense fallback={<div style={{ minHeight: '80vh' }} />}>
            <DemosContent />
          </React.Suspense>
        )}
      </BrowserOnly>
    </Layout>
  );
}
