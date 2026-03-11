import { createConfig } from '../../shared/config/base-config';
import path from 'path';

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
    // Resolve @almadar/core and @almadar/evaluator for any interactive demos
    function orbAliasesPlugin() {
      return {
        name: "orb-aliases",
        configureWebpack() {
          return {
            resolve: {
              conditionNames: ["import", "module", "browser", "require", "default"],
              extensionAlias: { ".js": [".ts", ".tsx", ".js"] },
            },
          };
        },
      };
    },
  ],
});
