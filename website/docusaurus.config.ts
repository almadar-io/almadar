import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Almadar",
  tagline: "The Physics of Software | فيزياء البرمجيات",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://almadar.io",
  baseUrl: "/",

  organizationName: "almadar-io",
  projectName: "almadar",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // i18n configuration for English and Arabic
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ar"],
    localeConfigs: {
      en: {
        label: "English",
        direction: "ltr",
        htmlLang: "en-US",
      },
      ar: {
        label: "العربية",
        direction: "rtl",
        htmlLang: "ar",
      },
    },
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/almadar-io/almadar/tree/main/website/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          editUrl: "https://github.com/almadar-io/almadar/tree/main/website/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/og-image.png",
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Almadar",
      logo: {
        alt: "Almadar Logo",
        src: "img/almadar-icon-transparent.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Docs",
        },
        {
          to: "/enterprise",
          label: "Enterprise",
          position: "left",
        },
        {
          to: "/blog",
          label: "Blog",
          position: "left",
        },
        {
          href: "https://github.com/almadar-io/almadar",
          label: "GitHub",
          position: "right",
        },
        {
          type: "localeDropdown",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "/docs/getting-started/introduction",
            },
            {
              label: "Downloads",
              to: "/docs/downloads/cli",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "GitHub Discussions",
              href: "https://github.com/almadar-io/almadar/discussions",
            },
            {
              label: "Discord",
              href: "https://discord.gg/almadar",
            },
            {
              label: "LinkedIn",
              href: "https://linkedin.com/company/almadar-io",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/almadar-io/almadar",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Almadar. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "json", "typescript"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
