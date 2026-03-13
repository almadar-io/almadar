import { createConfig } from '../../shared/config/base-config';
import path from 'path';

const routerStubPath = path.resolve(__dirname, 'src/stubs/react-router-dom.ts');

// Force all react-router imports to the website's own copy.
// The pnpm monorepo has multiple copies in .pnpm/ (v5/v7, react@18/react@19).
// Without deduplication, webpack bundles two copies and Router context fragments
// (<Switch> from copy A can't find <Router> from copy B).
const websiteNodeModules = path.resolve(__dirname, '../../node_modules');

export default createConfig({
  site: 'orb',
  url: 'https://orb.almadar.io',
  title: 'Orb',
  tagline: 'Formal world models of software',
  customCss: './src/css/custom.css',
  docs: {
    sidebarPath: './sidebars.ts',
  },
  navbarItems: [
    { to: "/docs/getting-started/introduction", label: "Docs", position: "left" },
    { to: "/stdlib", label: "Standard Library", position: "left" },
    { to: "/downloads", label: "Downloads", position: "left" },
    { to: "/playground", label: "Playground", position: "left" },
  ],
  plugins: [
    function orbAliasesPlugin() {
      return {
        name: "orb-aliases",
        configureWebpack() {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          const webpack = require('webpack');
          return {
            resolve: {
              conditionNames: ["import", "module", "browser", "require", "default"],
              extensionAlias: { ".js": [".ts", ".tsx", ".js"] },
              alias: {
                // Deduplicate react-router: force all imports to the website's
                // single v5 copy so Router context is shared across the bundle.
                'react-router': path.join(websiteNodeModules, 'react-router'),
                'react-router-dom': path.join(websiteNodeModules, 'react-router-dom'),
              },
            },
            plugins: [
              // Stub react-router-dom for @almadar/ui imports ONLY.
              // This fires in beforeResolve (before aliases), so @almadar/ui
              // gets the stub while Docusaurus keeps the real v5 module.
              new webpack.NormalModuleReplacementPlugin(
                /^react-router(-dom)?$/,
                function (resource: { context?: string; request: string }) {
                  if (
                    resource.context &&
                    (resource.context.includes('/@almadar/ui/') ||
                      resource.context.includes('/almadar-ui/'))
                  ) {
                    resource.request = routerStubPath;
                  }
                },
              ),
            ],
          };
        },
      };
    },
  ],
});
