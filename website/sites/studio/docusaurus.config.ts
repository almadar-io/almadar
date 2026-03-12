import { createConfig } from '../../shared/config/base-config';

export default createConfig({
  site: 'studio',
  url: 'https://studio.almadar.io',
  title: 'Almadar Studio',
  tagline: 'Build software with AI',
  customCss: './src/css/custom.css',
  navbarItems: [
    { to: "/features", label: "Features", position: "left" },
    { href: "https://kflow-builder-app.web.app/", label: "Showcase", position: "left" },
    { to: "/pricing", label: "Pricing", position: "left" },
  ],
});
