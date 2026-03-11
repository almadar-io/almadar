import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import path from "path";

interface SiteConfig {
  site: 'main' | 'orb' | 'studio' | 'services';
  url: string;
  baseUrl?: string;
  title: string;
  tagline: string;
  favicon?: string;
  customCss: string;
  /** Whether this site has docs */
  docs?: false | { sidebarPath: string };
  /** Whether this site has a blog */
  blog?: false | object;
  /** Additional navbar items */
  navbarItems?: any[];
  /** Additional plugins */
  plugins?: any[];
  /** Static directories relative to site root */
  staticDirectories?: string[];
}

const SITE_ICONS: Record<string, { logo: string; favicon: string }> = {
  main: { logo: "img/almadar-icon-transparent.svg", favicon: "img/favicon.ico" },
  orb: { logo: "img/orb-icon-64.png", favicon: "img/favicon.ico" },
  studio: { logo: "img/studio-icon-64.png", favicon: "img/favicon.ico" },
  services: { logo: "img/services-icon-64.png", favicon: "img/favicon.ico" },
};

const PRODUCT_SITES = [
  { site: 'studio' as const, label: "Studio", href: "https://studio.almadar.io", description: "Build apps with AI" },
  { site: 'services' as const, label: "Services", href: "https://services.almadar.io", description: "Cloud infrastructure" },
  { site: 'orb' as const, label: "Orb", href: "https://orb.almadar.io", description: "A programming language" },
];

function buildProductsDropdown(currentSite: string) {
  const otherProducts = PRODUCT_SITES.filter(p => p.site !== currentSite);
  return {
    type: "dropdown" as const,
    label: "Products",
    position: "left" as const,
    items: otherProducts.map(p => ({
      label: `${p.label} — ${p.description}`,
      href: p.href,
    })),
  };
}

export function createConfig(opts: SiteConfig): Config {
  const siteDir = path.resolve(__dirname, '../../sites', opts.site);

  return {
    title: opts.title,
    tagline: opts.tagline,
    favicon: opts.favicon || SITE_ICONS[opts.site]?.favicon || "img/favicon.ico",
    url: opts.url,
    baseUrl: opts.baseUrl || "/",
    organizationName: "almadar-io",
    projectName: "almadar",
    onBrokenLinks: "warn",
    onBrokenAnchors: "warn",
    markdown: { hooks: { onBrokenMarkdownLinks: "warn", onBrokenMarkdownImages: "warn" } },
    future: { v4: true },

    i18n: {
      defaultLocale: "en",
      locales: ["en", "ar", "sl"],
      localeConfigs: {
        en: { label: "English", direction: "ltr", htmlLang: "en-US" },
        ar: { label: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629", direction: "rtl", htmlLang: "ar" },
        sl: { label: "Sloven\u0161\u010Dina", direction: "ltr", htmlLang: "sl" },
      },
    },

    staticDirectories: [
      'static',
      '../../shared/static',
      ...(opts.staticDirectories || []),
    ],

    plugins: [
      // Tailwind CSS
      function tailwindPlugin() {
        return {
          name: "tailwind-postcss",
          configurePostCss(postcssOptions) {
            postcssOptions.plugins = [
              require("tailwindcss")(path.resolve(__dirname, "../../tailwind.config.mjs")),
              require("autoprefixer"),
              ...(postcssOptions.plugins || []),
            ];
            return postcssOptions;
          },
        };
      },
      // Fix @almadar/ui ESM resolution in webpack (designed for Vite, needs tweaks for Docusaurus)
      function almadarUIWebpackPlugin() {
        return {
          name: "almadar-ui-webpack-compat",
          configureWebpack(config) {
            return {
              resolve: {
                alias: {
                  // Stub out components that depend on react-router v6 (Docusaurus uses v5)
                  'react-router-dom': path.resolve(__dirname, '../stubs/react-router-dom-stub.js'),
                  // Shared components accessible from all sites
                  '@shared': path.resolve(__dirname, '../components'),
                },
              },
              module: {
                rules: [
                  // Allow ESM imports without extensions (react-syntax-highlighter)
                  {
                    test: /\.m?js$/,
                    resolve: { fullySpecified: false },
                  },
                ],
              },
            };
          },
        };
      },
      ...(opts.plugins || []),
    ],

    presets: [
      [
        "classic",
        {
          docs: opts.docs === false ? false : (opts.docs || false),
          blog: opts.blog === false ? false : (opts.blog || false),
          theme: { customCss: opts.customCss },
          gtag: { trackingID: "G-4XLGPPVQ6C", anonymizeIP: true },
        } satisfies Preset.Options,
      ],
    ],

    themeConfig: {
      image: "img/og-image.png",
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: opts.title,
        logo: {
          alt: `${opts.title} Logo`,
          src: SITE_ICONS[opts.site]?.logo || "img/almadar-icon-transparent.svg",
        },
        items: [
          ...(opts.navbarItems || []),
          buildProductsDropdown(opts.site),
          { href: "https://github.com/almadar-io/almadar", label: "GitHub", position: "right" as const },
          { href: "https://discord.gg/q83VjPJx", label: "Discord", position: "right" as const },
          { type: "localeDropdown" as const, position: "right" as const },
        ],
      },
      footer: {
        style: "dark" as const,
        links: [
          {
            title: "Products",
            items: [
              { label: "Studio", href: "https://studio.almadar.io" },
              { label: "Services", href: "https://services.almadar.io" },
              { label: "Orb", href: "https://orb.almadar.io" },
            ],
          },
          {
            title: "Community",
            items: [
              { label: "Discord", href: "https://discord.gg/q83VjPJx" },
              { label: "GitHub", href: "https://github.com/almadar-io/almadar" },
              { label: "LinkedIn", href: "https://www.linkedin.com/company/almadar-io" },
            ],
          },
          {
            title: "Company",
            items: [
              { label: "About", href: "https://almadar.io/about" },
              { label: "Blog", href: "https://almadar.io/blog" },
              { label: "Contact", href: "mailto:hello@almadar.io" },
            ],
          },
        ],
        copyright: `Copyright \u00A9 ${new Date().getFullYear()} Almadar. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["bash", "json", "typescript"],
      },
    } satisfies Preset.ThemeConfig,
  };
}
