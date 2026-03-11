import { createConfig } from '../../shared/config/base-config';

export default createConfig({
  site: 'studio',
  url: 'https://studio.almadar.io',
  title: 'Almadar Studio',
  tagline: 'Build software with AI',
  customCss: './src/css/custom.css',
  navbarItems: [
    { to: "/features", label: "Features", position: "left" },
    { to: "/showcase", label: "Showcase", position: "left" },
    { to: "/pricing", label: "Pricing", position: "left" },
  ],
});
