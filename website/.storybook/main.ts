/**
 * Website Storybook Config
 *
 * Unified storybook that composes stories from ALL sources for the
 * Almadar website demo section. This is separate from @almadar/ui's
 * own storybook to keep the published package clean.
 *
 * Sources:
 * - Core @almadar/ui components
 * - Project design systems (trait-wars, winning-11, kflow, builder)
 * - Legacy client stories (inspection-system, blaz-klemenc)
 */

import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, "../../..");

const config: StorybookConfig = {
    stories: [
        // Core @almadar/ui
        path.join(workspaceRoot, "packages/almadar-ui/components/**/*.stories.@(js|jsx|ts|tsx)"),
        // Project design systems
        path.join(workspaceRoot, "projects/trait-wars/design-system/**/*.stories.@(js|jsx|ts|tsx)"),
        path.join(workspaceRoot, "projects/winning-11/design-system/**/*.stories.@(js|jsx|ts|tsx)"),
        // KFlow excluded: templates transitively depend on react-force-graph-2d and react-syntax-highlighter
        // which have broken package exports. Build KFlow storybook separately if needed.
        path.join(workspaceRoot, "projects/builder/design-system/**/*.stories.@(js|jsx|ts|tsx)"),
        path.join(workspaceRoot, "projects/inspection-system/design-system/**/*.stories.@(js|jsx|ts|tsx)"),
        path.join(workspaceRoot, "projects/blaz-klemenc/design-system/**/*.stories.@(js|jsx|ts|tsx)"),
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-themes",
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    typescript: {
        reactDocgen: false,
    },
    staticDirs: [
        // Trait Wars assets (sprites, 3D models)
        { from: path.join(workspaceRoot, "projects/trait-wars/assets"), to: "/trait-wars-assets" },
    ],
    async viteFinal(config) {
        const { mergeConfig } = await import("vite");

        return mergeConfig(config, {
            resolve: {
                alias: {
                    // Resolve @almadar/ui to source so all project stories can import it
                    "@almadar/ui": path.join(workspaceRoot, "packages/almadar-ui/components/index.ts"),
                    // Stub out react-force-graph-2d (broken exports field, only used by one KFlow story)
                    "react-force-graph-2d": path.join(__dirname, "stubs/react-force-graph-2d.ts"),
                },
                preserveSymlinks: true,
                dedupe: [
                    "refractor",
                    "hastscript",
                    "react",
                    "react-dom",
                ],
            },
            server: {
                fs: {
                    allow: [
                        workspaceRoot,
                    ],
                },
            },
            optimizeDeps: {
                include: [
                    "react",
                    "react-dom",
                    "react/jsx-runtime",
                    "react/jsx-dev-runtime",
                    "clsx",
                    "@storybook/addon-themes",
                    "@storybook/addon-links",
                    "refractor",
                    "hastscript",
                ],
                exclude: [
                    // react-force-graph-2d has broken exports field
                    "react-force-graph-2d",
                ],
            },
            esbuild: {
                target: "esnext",
                jsx: "automatic",
            },
        });
    },
};

export default config;
