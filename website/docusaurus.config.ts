import { createConfig } from './shared/config/base-config';

export default createConfig({
  site: 'main',
  url: 'https://almadar.io',
  title: 'Almadar',
  tagline: 'The Physics of Software | فيزياء البرمجيات',
  customCss: './src/css/custom.css',
  blog: {
    showReadingTime: true,
    blogSidebarCount: 0,
    feedOptions: { type: ['rss', 'atom'], xslt: true },
  },
  navbarItems: [
    { to: "/vision", label: "Vision", position: "left" },
    { to: "/ai", label: "AI", position: "left" },
    { to: "/platform", label: "Platform", position: "left" },
    { to: "/blog", label: "Blog", position: "left" },
    { to: "/about", label: "About", position: "left" },
  ],
});
