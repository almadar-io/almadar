/**
 * Demo Registry — maps demo keys to lazy-loaded story components.
 *
 * Each entry returns a { Component, args } tuple via dynamic import.
 * This replaces the old iframe-based Storybook embedding with direct
 * React component rendering (portable stories pattern).
 */

export interface DemoEntry {
    Component: React.ComponentType<any>;
    args: Record<string, any>;
}

type DemoLoader = () => Promise<DemoEntry>;

// ─── Winning-11 ──────────────────────────────────────────────

const executiveDashboard: DemoLoader = () =>
    Promise.all([
        import('../../../projects/winning-11/design-system/templates/AdminDashboardTemplate'),
        import('../../../projects/winning-11/design-system/templates/AdminDashboardTemplate.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.AdminDashboardTemplate,
        args: (stories.Default as any).args ?? {},
    }));

const trustIntelligence: DemoLoader = () =>
    Promise.all([
        import('../../../projects/winning-11/design-system/templates/TrustIntelligenceTemplate'),
        import('../../../projects/winning-11/design-system/templates/TrustIntelligenceTemplate.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.TrustIntelligenceTemplate,
        args: (stories.Default as any).args ?? {},
    }));

const graphIntelligence: DemoLoader = () =>
    Promise.all([
        import('../../../projects/winning-11/design-system/templates/GraphIntelligenceTemplate'),
        import('../../../projects/winning-11/design-system/templates/GraphIntelligenceTemplate.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.GraphIntelligenceTemplate,
        args: (stories.HighDensityNetwork as any).args ?? {},
    }));

const userProfile360: DemoLoader = () =>
    Promise.all([
        import('../../../projects/winning-11/design-system/templates/UserProfileTemplate'),
        import('../../../projects/winning-11/design-system/templates/UserProfileTemplate.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.UserProfileTemplate,
        args: (stories.Default as any).args ?? {},
    }));

// ─── Inspection System ───────────────────────────────────────

const inspectionManagement: DemoLoader = () =>
    Promise.all([
        import('../../../projects/inspection-system/design-system/templates/InspectionsTemplate'),
        import('../../../projects/inspection-system/design-system/templates/InspectionsTemplate.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.InspectionsTemplate,
        args: (stories.Default as any).args ?? {},
    }));

const inspectionForm: DemoLoader = () =>
    Promise.all([
        import('../../../projects/inspection-system/design-system/templates/InspectionFormTemplate'),
        import('../../../projects/inspection-system/design-system/templates/InspectionFormTemplate.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.InspectionFormTemplate,
        args: (stories.TradeInspection as any).args ?? {},
    }));

// ─── Blaz Klemenc (Fitness) ──────────────────────────────────

const fitnessTracker: DemoLoader = () =>
    Promise.all([
        import('../../../projects/blaz-klemenc/design-system/templates/FitnessTemplate'),
        import('../../../projects/blaz-klemenc/design-system/templates/FitnessTemplate.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.FitnessTemplate,
        args: (stories.Default as any).args ?? {},
    }));

const mealPlanDetail: DemoLoader = () =>
    Promise.all([
        import('../../../projects/blaz-klemenc/design-system/templates/MealPlanDetailTemplate'),
        import('../../../projects/blaz-klemenc/design-system/templates/MealPlanDetailTemplate.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.MealPlanDetailTemplate,
        args: (stories.Default as any).args ?? {},
    }));

const trainingSchedule: DemoLoader = () =>
    Promise.all([
        import('../../../projects/blaz-klemenc/design-system/templates/ScheduleTemplate'),
        import('../../../projects/blaz-klemenc/design-system/templates/ScheduleTemplate.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.ScheduleTemplate,
        args: (stories.BusyWeek as any).args ?? {},
    }));

// ─── Builder ─────────────────────────────────────────────────

const almadarStudio: DemoLoader = () =>
    Promise.all([
        import('../../../projects/builder/design-system/templates/StudioProjectTemplate'),
        import('../../../projects/builder/design-system/templates/StudioProjectTemplate.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.StudioProjectTemplate,
        args: (stories.HQMode as any).args ?? {},
    }));

const studioFullView: DemoLoader = () =>
    Promise.all([
        import('../../../projects/builder/design-system/templates/StudioProjectTemplate'),
        import('../../../projects/builder/design-system/templates/StudioProjectTemplate.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.StudioProjectTemplate,
        args: (stories.WithAllPanels as any).args ?? {},
    }));

const aiAgentPanel: DemoLoader = () =>
    Promise.all([
        import('../../../projects/builder/design-system/organisms/agent/AgentChatPanel'),
        import('../../../projects/builder/design-system/organisms/agent/AgentChatPanel.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.AgentChatPanel,
        args: (stories.Running as any).args ?? {},
    }));

// ─── Core @almadar/ui ────────────────────────────────────────

const gameMapEditor: DemoLoader = () =>
    Promise.all([
        import('../../../packages/almadar-ui/components/organisms/game/BattleBoard'),
        import('../../../packages/almadar-ui/components/organisms/game/BattleBoard.stories'),
    ]).then(([mod, stories]) => ({
        Component: mod.BattleBoard,
        args: (stories.Editor as any).args ?? {},
    }));

const interactiveGraph: DemoLoader = () =>
    Promise.all([
        import('../../../packages/almadar-ui/components/organisms/GraphCanvas'),
        import('../../../packages/almadar-ui/components/organisms/GraphCanvas.stories'),
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
