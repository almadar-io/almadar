import { createConfig } from '../../shared/config/base-config';

export default createConfig({
  site: 'services',
  url: 'https://services.almadar.io',
  title: 'Almadar Services',
  tagline: 'Infrastructure for the agentic era',
  customCss: './src/css/custom.css',
  navbarItems: [
    { to: "/brains", label: "Brains", position: "left" },
    { to: "/metal", label: "Metal", position: "left" },
    { to: "/integrations", label: "Integrations", position: "left" },
    { to: "/pricing", label: "Pricing", position: "left" },
  ],
});
