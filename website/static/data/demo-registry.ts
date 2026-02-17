/**
 * Demo Registry — maps demo keys to lazy-loaded story components.
 *
 * Each entry returns a { Component, args } tuple via dynamic import.
 * This replaces the old iframe-based Storybook embedding with direct
 * React component rendering (portable stories pattern).
 *
 * All imports reference src/design-systems/ which is synced from the
 * monorepo via tools/sync-website-design-systems.sh.
 */

export interface DemoEntry {
    Component: React.ComponentType<any>;
    args: Record<string, any>;
}

type DemoLoader = () => Promise<DemoEntry>;

// ─── Winning-11 ──────────────────────────────────────────────

const executiveDashboard: DemoLoader = () =>
    Promise.all([
        import('../design-systems/winning-11/templates/AdminDashboardTemplate'),
        import('../design-systems/winning-11/templates/AdminDashboardTemplate.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.AdminDashboardTemplate,
        args: (stories.Default as any).args ?? {},
    }));

const trustIntelligence: DemoLoader = () =>
    Promise.all([
        import('../design-systems/winning-11/templates/TrustIntelligenceTemplate'),
        import('../design-systems/winning-11/templates/TrustIntelligenceTemplate.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.TrustIntelligenceTemplate,
        args: (stories.Default as any).args ?? {},
    }));

const graphIntelligence: DemoLoader = () =>
    Promise.all([
        import('../design-systems/winning-11/templates/GraphIntelligenceTemplate'),
        import('../design-systems/winning-11/templates/GraphIntelligenceTemplate.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.GraphIntelligenceTemplate,
        args: (stories.HighDensityNetwork as any).args ?? {},
    }));

const userProfile360: DemoLoader = () =>
    Promise.all([
        import('../design-systems/winning-11/templates/UserProfileTemplate'),
        import('../design-systems/winning-11/templates/UserProfileTemplate.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.UserProfileTemplate,
        args: (stories.Default as any).args ?? {},
    }));

// ─── Inspection System ───────────────────────────────────────

const inspectionManagement: DemoLoader = () =>
    Promise.all([
        import('../design-systems/inspection-system/templates/InspectionsTemplate'),
        import('../design-systems/inspection-system/templates/InspectionsTemplate.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.InspectionsTemplate,
        args: (stories.Default as any).args ?? {},
    }));

const inspectionForm: DemoLoader = () =>
    Promise.all([
        import('../design-systems/inspection-system/templates/InspectionFormTemplate'),
        import('../design-systems/inspection-system/templates/InspectionFormTemplate.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.InspectionFormTemplate,
        args: (stories.TradeInspection as any).args ?? {},
    }));

// ─── Blaz Klemenc (Fitness) ──────────────────────────────────

const fitnessTracker: DemoLoader = () =>
    Promise.all([
        import('../design-systems/blaz-klemenc/templates/FitnessTemplate'),
        import('../design-systems/blaz-klemenc/templates/FitnessTemplate.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.FitnessTemplate,
        args: (stories.Default as any).args ?? {},
    }));

const mealPlanDetail: DemoLoader = () =>
    Promise.all([
        import('../design-systems/blaz-klemenc/templates/MealPlanDetailTemplate'),
        import('../design-systems/blaz-klemenc/templates/MealPlanDetailTemplate.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.MealPlanDetailTemplate,
        args: (stories.Default as any).args ?? {},
    }));

const trainingSchedule: DemoLoader = () =>
    Promise.all([
        import('../design-systems/blaz-klemenc/templates/ScheduleTemplate'),
        import('../design-systems/blaz-klemenc/templates/ScheduleTemplate.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.ScheduleTemplate,
        args: (stories.BusyWeek as any).args ?? {},
    }));

// ─── Builder ─────────────────────────────────────────────────

const almadarStudio: DemoLoader = () =>
    Promise.all([
        import('../design-systems/builder/templates/StudioProjectTemplate'),
        import('../design-systems/builder/templates/StudioProjectTemplate.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.StudioProjectTemplate,
        args: (stories.HQMode as any).args ?? {},
    }));

const studioFullView: DemoLoader = () =>
    Promise.all([
        import('../design-systems/builder/templates/StudioProjectTemplate'),
        import('../design-systems/builder/templates/StudioProjectTemplate.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.StudioProjectTemplate,
        args: (stories.WithAllPanels as any).args ?? {},
    }));

const aiAgentPanel: DemoLoader = () =>
    Promise.all([
        import('../design-systems/builder/organisms/agent/AgentChatPanel'),
        import('../design-systems/builder/organisms/agent/AgentChatPanel.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.AgentChatPanel,
        args: (stories.Running as any).args ?? {},
    }));

// ─── Core @almadar/ui ────────────────────────────────────────

const gameMapEditor: DemoLoader = () =>
    Promise.all([
        import('../design-systems/almadar-ui/components/organisms/game/BattleBoard'),
        import('../design-systems/almadar-ui/components/organisms/game/BattleBoard.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.BattleBoard,
        args: (stories.Editor as any).args ?? {},
    }));

const interactiveGraph: DemoLoader = () =>
    Promise.all([
        import('../design-systems/almadar-ui/components/organisms/GraphCanvas'),
        import('../design-systems/almadar-ui/components/organisms/GraphCanvas.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.GraphCanvas,
        args: (stories.Interactive as any).args ?? {},
    }));

// ─── Registry ────────────────────────────────────────────────

export const demoRegistry: Record<string, DemoLoader> = {
    executiveDashboard,
    trustIntelligence,
    graphIntelligence,
    userProfile360,
    inspectionManagement,
    inspectionForm,
    fitnessTracker,
    mealPlanDetail,
    trainingSchedule,
    almadarStudio,
    studioFullView,
    aiAgentPanel,
    gameMapEditor,
    interactiveGraph,
};
