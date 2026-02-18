import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import path from "path";

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

  // i18n configuration for English, Arabic, and Slovenian
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ar", "sl"],
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
      sl: {
        label: "Slovenščina",
        direction: "ltr",
        htmlLang: "sl",
      },
    },
  },

  plugins: [
    // Portable stories: resolve @almadar/ui and project design system imports
    function demoAliasesPlugin() {
      return {
        name: "demo-aliases",
        configureWebpack() {
          return {
            resolve: {
              alias: {
                "@almadar/ui": path.join(__dirname, "src/design-systems/almadar-ui/components/index.ts"),
                "react-force-graph-2d": path.join(__dirname, ".storybook/stubs/react-force-graph-2d.ts"),
              },
            },
          };
        },
      };
    },
    // Tailwind CSS: process @tailwind directives for inline @almadar/ui demos
    function tailwindPlugin() {
      return {
        name: "tailwind-postcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins = [
            require("tailwindcss")(
              path.join(__dirname, "tailwind.config.mjs"),
            ),
            require("autoprefixer"),
            ...(postcssOptions.plugins || []),
          ];
          return postcssOptions;
        },
      };
    },
  ],

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
          blogSidebarCount: 0,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          editUrl: "https://github.com/almadar-io/almadar/tree/main/website/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-4XLGPPVQ6C",
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  headTags: [
    // LinkedIn Insight Tag
    {
      tagName: "script",
      attributes: { type: "text/javascript" },
      innerHTML: `
        _linkedin_partner_id = "YOUR_LINKEDIN_PARTNER_ID";
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        (function(l) {
          if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
          window.lintrk.q=[]}
          var s = document.getElementsByTagName("script")[0];
          var b = document.createElement("script");
          b.type = "text/javascript";b.async = true;
          b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
          s.parentNode.insertBefore(b, s);})(window.lintrk);
      `,
    },
    {
      tagName: "noscript",
      attributes: {},
      innerHTML: `<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=YOUR_LINKEDIN_PARTNER_ID&fmt=gif" />`,
    },
  ],

  themeConfig: {
    image: "img/og-image.png",
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: "Almadar",
      logo: {
        alt: "Almadar Logo",
        src: "img/almadar-icon-transparent.svg",
      },
      items: [
        {
          to: "/",
          label: "Home",
          position: "left",
          activeBaseRegex: "^/$",
        },
        {
          to: "/demos",
          label: "Demos",
          position: "left",
        },
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
          href: "https://discord.gg/YtWJCpnk",
          label: "Discord",
          position: "right",
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
              label: "Discord",
              href: "https://discord.gg/YtWJCpnk",
            },
            {
              label: "GitHub",
              href: "https://github.com/almadar-io/almadar",
            },

            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/almadar-io",
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
            {
              label: "Contact",
              href: "mailto:hello@almadar.io",
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
