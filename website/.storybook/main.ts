/**
 * Website Storybook Config
 *
 * Curated storybook for the Almadar website demo section.
 * Only includes the specific stories used in demos.json — NOT the full
 * design system catalog. This keeps the build fast and the tarball small.
 */

import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, "../../..");

const config: StorybookConfig = {
    stories: [
        // Core @almadar/ui — only the specific stories used in demos
        path.join(workspaceRoot, "packages/almadar-ui/components/templates/GameCanvas3DTemplates.stories.tsx"),
        path.join(workspaceRoot, "packages/almadar-ui/components/organisms/game/BattleBoard.stories.tsx"),
        path.join(workspaceRoot, "packages/almadar-ui/components/organisms/game/WorldMapBoard.stories.tsx"),
        path.join(workspaceRoot, "packages/almadar-ui/components/organisms/GraphCanvas.stories.tsx"),
        path.join(workspaceRoot, "packages/almadar-ui/components/organisms/layout/DashboardGrid.stories.tsx"),

        // Trait Wars
        path.join(workspaceRoot, "projects/trait-wars/design-system/templates/CanvasBattleTemplate.stories.tsx"),
        path.join(workspaceRoot, "projects/trait-wars/design-system/templates/CanvasWorldMapTemplate.stories.tsx"),
        path.join(workspaceRoot, "projects/trait-wars/design-system/templates/CanvasCastleTemplate.stories.tsx"),

        // Winning-11
        path.join(workspaceRoot, "projects/winning-11/design-system/templates/AdminDashboardTemplate.stories.tsx"),
        path.join(workspaceRoot, "projects/winning-11/design-system/templates/TrustIntelligenceTemplate.stories.tsx"),
        path.join(workspaceRoot, "projects/winning-11/design-system/templates/GraphIntelligenceTemplate.stories.tsx"),
        path.join(workspaceRoot, "projects/winning-11/design-system/templates/UserProfileTemplate.stories.tsx"),

        // Inspection System
        path.join(workspaceRoot, "projects/inspection-system/design-system/templates/InspectionsTemplate.stories.tsx"),
        path.join(workspaceRoot, "projects/inspection-system/design-system/templates/InspectionFormTemplate.stories.tsx"),

        // Blaz Klemenc (Fitness)
        path.join(workspaceRoot, "projects/blaz-klemenc/design-system/templates/FitnessTemplate.stories.tsx"),
        path.join(workspaceRoot, "projects/blaz-klemenc/design-system/templates/MealPlanDetailTemplate.stories.tsx"),
        path.join(workspaceRoot, "projects/blaz-klemenc/design-system/templates/ScheduleTemplate.stories.tsx"),

        // Builder
        path.join(workspaceRoot, "projects/builder/design-system/templates/StudioProjectTemplate.stories.tsx"),
        path.join(workspaceRoot, "projects/builder/design-system/organisms/agent/AgentChatPanel.stories.tsx"),
    ],
    addons: [],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    typescript: {
        reactDocgen: false,
    },
    staticDirs: [],
    async viteFinal(config) {
        const { mergeConfig } = await import("vite");

        return mergeConfig(config, {
            resolve: {
                alias: {
                    "@almadar/ui": path.join(workspaceRoot, "packages/almadar-ui/components/index.ts"),
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
                    allow: [workspaceRoot],
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
                    "refractor",
                    "hastscript",
                ],
                exclude: ["react-force-graph-2d"],
            },
            esbuild: {
                target: "esnext",
                jsx: "automatic",
            },
        });
    },
};

export default config;
