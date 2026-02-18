/**
 * StudioProjectBoard - Organism containing all project workspace logic
 *
 * Manages mode switching (HQ/Build), tab navigation, agent/inspector panels,
 * toolbar actions, and renders all content slots.
 * Used by StudioProjectTemplate as a thin wrapper.
 *
 * Events Emitted:
 * - UI:{modeChangeEvent} - When switching between HQ and Build modes
 * - UI:{tabChangeEvent} - When switching tabs within a mode
 * - UI:{saveEvent} - When saving the project
 * - UI:{compileEvent} - When compiling the schema
 * - UI:{toggleAgentEvent} - When toggling agent panel
 * - UI:{toggleInspectorEvent} - When toggling inspector panel
 * - UI:{runTestsEvent} - When running tests
 * - UI:{deployEvent} - When deploying
 * - UI:VALIDATE - When validating the schema
 * - UI:PREVIEW - When previewing the app
 * - UI:BACK - When navigating back to home
 */

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Building,
  Hammer,
  Bot,
  Info,
  FileText,
  Palette,
  Code,
  GitBranch,
  CheckCircle,
  Package,
  Play,
  Save,
  PanelRight,
  X,
  BookOpen,
  GitPullRequest,
  Book,
  History,
} from "lucide-react";
import {
  Box,
  VStack,
  HStack,
  Typography,
  Button,
  Icon,
  Badge,
  Card,
  useEventBus,
  cn,
} from '@almadar/ui';

export type StudioMode = "hq" | "build";
export type HQTab = "story" | "flow" | "glossary" | "history" | "info" | "proposal" | "design-system" | "preview";
export type BuildTab = "schema" | "visualization" | "validation" | "domain-logic" | "preview";

export interface ProjectInfo {
  id: string;
  name: string;
  description?: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  orbitalsCount: number;
  traitsCount: number;
  pagesCount: number;
}

export interface ProjectEntity {
  project: ProjectInfo;
  mode?: StudioMode;
  activeTab?: HQTab | BuildTab;
  validationStatus?: "valid" | "invalid" | "validating";
  errorCount?: number;
  showAgentPanel?: boolean;
  showInspectorPanel?: boolean;
  domainContext?: import('@almadar/core').DomainContext;
}

export interface StudioProjectBoardProps {
  /** Entity containing project data and workspace state */
  entity: ProjectEntity;

  /** Slot: Schema editor component */
  schemaEditor?: React.ReactNode;
  /** Slot: Orbital visualization component */
  orbitalVisualization?: React.ReactNode;
  /** Slot: History timeline component */
  historyTimeline?: React.ReactNode;
  /** Slot: Design system browser component */
  designSystemBrowser?: React.ReactNode;
  /** Slot: Proposal generator component */
  proposalGenerator?: React.ReactNode;
  /** Slot: AI Agent panel */
  agentPanel?: React.ReactNode;
  /** Slot: Inspector panel */
  inspectorPanel?: React.ReactNode;
  /** Slot: Story view component (rendered in story tab) */
  storyView?: React.ReactNode;
  /** Slot: Flow view component (rendered in flow tab) */
  flowView?: React.ReactNode;
  /** Slot: Glossary component (rendered in glossary tab) */
  glossaryView?: React.ReactNode;
  /** Slot: Validation view component (rendered in validation tab) */
  validationView?: React.ReactNode;
  /** Slot: Domain logic view component (rendered in domain-logic tab) */
  domainLogicView?: React.ReactNode;
  /** Slot: Preview view component (rendered in HQ preview tab) */
  previewView?: React.ReactNode;
  /** Slot: Embedded preview panel for Build mode preview tab */
  previewPanel?: React.ReactNode;
  /** Slot: App sidebar */
  sidebarSlot?: React.ReactNode;
  /** Slot: Modals and overlays (rendered inside the layout but visually floating) */
  modalsSlot?: React.ReactNode;

  /** Additional CSS classes */
  className?: string;

  /** Event name emitted on save */
  saveEvent: string;
  /** Event name emitted on compile */
  compileEvent: string;
  /** Event name emitted on deploy */
  deployEvent: string;
  /** Event name emitted on tab change */
  tabChangeEvent: string;
  /** Event name emitted on agent toggle */
  toggleAgentEvent: string;
  /** Event name emitted on inspector toggle */
  toggleInspectorEvent: string;
  /** Event name emitted on mode change */
  modeChangeEvent: string;
  /** Event name emitted on run tests */
  runTestsEvent: string;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: IconComponent,
}) => (
  <Card padding="md" className="flex-1">
    <HStack gap="md" align="center">
      <Box className="p-2 rounded-lg bg-[var(--color-primary)]/10">
        <IconComponent className="w-5 h-5 text-[var(--color-primary)]" />
      </Box>
      <VStack gap="none">
        <Typography
          variant="caption"
          className="text-[var(--color-muted-foreground)]"
        >
          {title}
        </Typography>
        <Typography variant="h3">{value}</Typography>
      </VStack>
    </HStack>
  </Card>
);

export const StudioProjectBoard: React.FC<StudioProjectBoardProps> = ({
  entity,
  schemaEditor,
  orbitalVisualization,
  historyTimeline,
  designSystemBrowser,
  proposalGenerator,
  agentPanel,
  inspectorPanel,
  storyView,
  flowView,
  glossaryView,
  validationView,
  domainLogicView,
  previewView,
  previewPanel,
  sidebarSlot,
  modalsSlot,
  className = "",
  saveEvent,
  compileEvent,
  tabChangeEvent,
  toggleAgentEvent,
  toggleInspectorEvent,
  modeChangeEvent,
}) => {
  const {
    project,
    mode: initialMode = "hq",
    activeTab: initialTab = "story",
    validationStatus = "valid",
    errorCount = 0,
    showAgentPanel: initialShowAgent = false,
  } = entity;
  const { emit } = useEventBus();
  const [mode, setMode] = useState<StudioMode>(initialMode);
  const [activeTab, setActiveTab] = useState<HQTab | BuildTab>(initialTab);
  const [showAgentPanel, setShowAgentPanel] = useState(initialShowAgent);
  // Sync local state with entity prop changes (e.g. from parent page)
  useEffect(() => {
    setShowAgentPanel(initialShowAgent);
  }, [initialShowAgent]);

  const handleModeChange = (newMode: StudioMode) => {
    setMode(newMode);
    setActiveTab(newMode === "hq" ? "story" : "schema");
    emit(`UI:${modeChangeEvent}`, { mode: newMode });
  };

  const handleTabChange = (tab: HQTab | BuildTab) => {
    setActiveTab(tab);
    emit(`UI:${tabChangeEvent}`, { tab });
  };

  const handleBack = () => {
    emit("UI:BACK", {});
  };

  const handleSave = () => {
    emit(`UI:${saveEvent}`, { projectId: project.id });
  };

  const handleValidate = () => {
    emit("UI:VALIDATE", { projectId: project.id });
  };

  const handleCompile = () => {
    emit(`UI:${compileEvent}`, { projectId: project.id });
  };

  const handlePreview = () => {
    emit("UI:PREVIEW", { projectId: project.id });
  };

  const handleToggleAgent = () => {
    const next = !showAgentPanel;
    setShowAgentPanel(next);
    emit(`UI:${toggleAgentEvent}`, { visible: next });
  };

  const hqTabs = [
    { id: "story" as const, label: "Story", icon: BookOpen },
    { id: "flow" as const, label: "Flow", icon: GitPullRequest },
    { id: "glossary" as const, label: "Glossary", icon: Book },
    { id: "history" as const, label: "History", icon: History },
    { id: "info" as const, label: "Project Info", icon: Info },
    { id: "proposal" as const, label: "Proposal", icon: FileText },
    { id: "design-system" as const, label: "Design System", icon: Palette },
    { id: "preview" as const, label: "Preview", icon: Play },
  ];

  const buildTabs = [
    { id: "schema" as const, label: "Schema", icon: Code },
    { id: "domain-logic" as const, label: "Domain Logic", icon: FileText },
    { id: "visualization" as const, label: "Visualization", icon: GitBranch },
    { id: "validation" as const, label: "Validation", icon: CheckCircle },
    { id: "preview" as const, label: "Preview", icon: Play },
  ];

  const currentTabs = mode === "hq" ? hqTabs : buildTabs;

  return (
    <HStack gap="none" className={`h-screen ${className}`}>
      {/* App Sidebar (from connected wrapper) */}
      {sidebarSlot}

      {/* Left Sidebar - Mode Switcher */}
      <Box
        border
        fullHeight
        bg="muted"
        className="w-16 border-t-0 border-b-0 border-l-0"
      >
        <VStack gap="none" className="h-full">
          {/* Back Button */}
          <Box padding="sm" border className="border-t-0 border-l-0 border-r-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="w-full"
            >
              <Icon icon={ArrowLeft} size="sm" />
            </Button>
          </Box>

          {/* Mode Buttons + AI */}
          <VStack gap="sm" className="p-2">
            <Button
              variant={mode === "hq" ? "default" : "ghost"}
              size="sm"
              className="w-full flex-col h-16 gap-1"
              onClick={() => handleModeChange("hq")}
              title="HQ Mode"
            >
              <Icon icon={Building} size="md" />
              <Typography variant="caption">HQ</Typography>
            </Button>
            <Button
              variant={mode === "build" ? "default" : "ghost"}
              size="sm"
              className="w-full flex-col h-16 gap-1"
              onClick={() => handleModeChange("build")}
              title="Build Mode"
            >
              <Icon icon={Hammer} size="md" />
              <Typography variant="caption">Build</Typography>
            </Button>
            <Button
              variant={showAgentPanel ? "default" : "ghost"}
              size="sm"
              className="w-full flex-col h-16 gap-1"
              onClick={handleToggleAgent}
              title="AI Assistant"
            >
              <Icon icon={Bot} size="md" />
              <Typography variant="caption">AI</Typography>
            </Button>
          </VStack>
        </VStack>
      </Box>

      {/* Main Content Area */}
      <VStack flex gap="none" className="h-full">
        {/* Top Bar */}
        <Box
          padding="md"
          border
          bg="surface"
          className="border-t-0 border-l-0 border-r-0"
        >
          <HStack justify="between" align="center">
            <HStack gap="md" align="center">
              <VStack gap="none">
                <Typography variant="h3">{project.name}</Typography>
                <Typography
                  variant="caption"
                  className="text-[var(--color-muted-foreground)]"
                >
                  v{project.version}
                </Typography>
              </VStack>
              <Badge
                variant={
                  validationStatus === "valid"
                    ? "success"
                    : validationStatus === "invalid"
                      ? "error"
                      : "secondary"
                }
              >
                {validationStatus === "valid" && "Valid"}
                {validationStatus === "invalid" && `${errorCount} errors`}
                {validationStatus === "validating" && "Validating..."}
              </Badge>
            </HStack>

            <HStack gap="sm">
              {mode === "build" && (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleValidate}
                  >
                    <HStack gap="xs" align="center">
                      <Icon icon={CheckCircle} size="sm" />
                      <Typography as="span" variant="body2">Validate</Typography>
                    </HStack>
                  </Button>
                  <Button variant="secondary" size="sm" onClick={handleCompile}>
                    <HStack gap="xs" align="center">
                      <Icon icon={Package} size="sm" />
                      <Typography as="span" variant="body2">Compile</Typography>
                    </HStack>
                  </Button>
                </>
              )}
              <Button variant="secondary" size="sm" onClick={handlePreview}>
                <HStack gap="xs" align="center">
                  <Icon icon={Play} size="sm" />
                  <Typography as="span" variant="body2">Preview</Typography>
                </HStack>
              </Button>
              <Button onClick={handleSave}>
                <HStack gap="xs" align="center">
                  <Icon icon={Save} size="sm" />
                  <Typography as="span" variant="body2">Save</Typography>
                </HStack>
              </Button>
              <Button variant={showAgentPanel ? "default" : "ghost"} size="sm" onClick={handleToggleAgent} title="AI Assistant">
                <Icon icon={PanelRight} size="sm" />
              </Button>
            </HStack>
          </HStack>
        </Box>

        {/* Tab Navigation */}
        <Box
          paddingX="md"
          border
          bg="surface"
          className="border-t-0 border-l-0 border-r-0"
        >
          <HStack gap="md">
            {currentTabs.map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                className={`rounded-none border-b-2 ${activeTab === tab.id
                  ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                  : "border-transparent"
                  }`}
                onClick={() => handleTabChange(tab.id)}
              >
                <HStack gap="xs" align="center">
                  <Icon icon={tab.icon} size="sm" />
                  <Typography as="span" variant="body2">{tab.label}</Typography>
                </HStack>
              </Button>
            ))}
          </HStack>
        </Box>

        {/* Content Area */}
        <HStack gap="none" flex className="overflow-hidden">
          {/* Main Panel */}
          <VStack flex className={cn("h-full overflow-auto", activeTab !== "preview" && "p-6")}>
            {/* HQ Mode Content */}
            {/* Story Tab */}
            {mode === "hq" && activeTab === "story" && (
              <VStack gap="lg">
                <Typography variant="h2">Story</Typography>
                {storyView || (
                  <Card padding="lg" className="text-center">
                    <VStack gap="md" align="center" className="py-8">
                      <Icon
                        icon={BookOpen}
                        size="lg"
                        className="text-[var(--color-muted-foreground)] opacity-50"
                      />
                      <Typography
                        variant="body1"
                        className="text-[var(--color-muted-foreground)]"
                      >
                        Your project's domain story will appear here
                      </Typography>
                    </VStack>
                  </Card>
                )}
              </VStack>
            )}

            {/* Flow Tab */}
            {mode === "hq" && activeTab === "flow" && (
              <VStack gap="lg">
                <Typography variant="h2">Flow</Typography>
                {flowView || (
                  <Card padding="lg" className="text-center">
                    <VStack gap="md" align="center" className="py-8">
                      <Icon
                        icon={GitPullRequest}
                        size="lg"
                        className="text-[var(--color-muted-foreground)] opacity-50"
                      />
                      <Typography
                        variant="body1"
                        className="text-[var(--color-muted-foreground)]"
                      >
                        Visual process flow will appear here
                      </Typography>
                    </VStack>
                  </Card>
                )}
              </VStack>
            )}

            {/* Glossary Tab */}
            {mode === "hq" && activeTab === "glossary" && (
              <VStack gap="lg">
                <Typography variant="h2">Glossary</Typography>
                {glossaryView || (
                  <Card padding="lg" className="text-center">
                    <VStack gap="md" align="center" className="py-8">
                      <Icon
                        icon={Book}
                        size="lg"
                        className="text-[var(--color-muted-foreground)] opacity-50"
                      />
                      <Typography
                        variant="body1"
                        className="text-[var(--color-muted-foreground)]"
                      >
                        Domain glossary will auto-generate here
                      </Typography>
                    </VStack>
                  </Card>
                )}
              </VStack>
            )}

            {/* History Tab */}
            {mode === "hq" && activeTab === "history" && (
              <VStack gap="lg">
                <Typography variant="h2">Change History</Typography>
                {historyTimeline || (
                  <Card padding="lg" className="text-center">
                    <VStack gap="md" align="center" className="py-8">
                      <Icon
                        icon={History}
                        size="lg"
                        className="text-[var(--color-muted-foreground)] opacity-50"
                      />
                      <Typography
                        variant="body1"
                        className="text-[var(--color-muted-foreground)]"
                      >
                        Change history will appear here as you make edits
                      </Typography>
                    </VStack>
                  </Card>
                )}
              </VStack>
            )}

            {mode === "hq" && activeTab === "info" && (
              <VStack gap="lg">
                <Typography variant="h2">Project Information</Typography>

                {/* Stats */}
                <HStack gap="md">
                  <StatCard
                    title="Orbitals"
                    value={project.orbitalsCount}
                    icon={GitBranch}
                  />
                  <StatCard
                    title="Traits"
                    value={project.traitsCount}
                    icon={Code}
                  />
                  <StatCard
                    title="Pages"
                    value={project.pagesCount}
                    icon={FileText}
                  />
                </HStack>

                {/* Project Details */}
                <Card padding="lg">
                  <VStack gap="md">
                    <HStack justify="between">
                      <Typography
                        variant="body2"
                        className="text-[var(--color-muted-foreground)]"
                      >
                        Name
                      </Typography>
                      <Typography variant="body1">{project.name}</Typography>
                    </HStack>
                    <HStack justify="between">
                      <Typography
                        variant="body2"
                        className="text-[var(--color-muted-foreground)]"
                      >
                        Version
                      </Typography>
                      <Typography variant="body1">{project.version}</Typography>
                    </HStack>
                    <HStack justify="between">
                      <Typography
                        variant="body2"
                        className="text-[var(--color-muted-foreground)]"
                      >
                        Created
                      </Typography>
                      <Typography variant="body1">
                        {project.createdAt}
                      </Typography>
                    </HStack>
                    <HStack justify="between">
                      <Typography
                        variant="body2"
                        className="text-[var(--color-muted-foreground)]"
                      >
                        Updated
                      </Typography>
                      <Typography variant="body1">
                        {project.updatedAt}
                      </Typography>
                    </HStack>
                    {project.description && (
                      <VStack gap="sm">
                        <Typography
                          variant="body2"
                          className="text-[var(--color-muted-foreground)]"
                        >
                          Description
                        </Typography>
                        <Typography variant="body1">
                          {project.description}
                        </Typography>
                      </VStack>
                    )}
                  </VStack>
                </Card>

                {/* History Timeline Slot */}
                {historyTimeline && (
                  <VStack gap="md">
                    <Typography variant="h3">Version History</Typography>
                    {historyTimeline}
                  </VStack>
                )}
              </VStack>
            )}

            {mode === "hq" && activeTab === "proposal" && (
              <VStack gap="lg">
                <Typography variant="h2">Project Proposal</Typography>
                {proposalGenerator || (
                  <Card padding="lg" className="text-center">
                    <VStack gap="md" align="center" className="py-8">
                      <Icon
                        icon={FileText}
                        size="lg"
                        className="text-[var(--color-muted-foreground)] opacity-50"
                      />
                      <Typography
                        variant="body1"
                        className="text-[var(--color-muted-foreground)]"
                      >
                        Generate a lean proposal with architecture and pricing
                      </Typography>
                      <Button>Generate Proposal</Button>
                    </VStack>
                  </Card>
                )}
              </VStack>
            )}

            {mode === "hq" && activeTab === "design-system" && (
              <VStack gap="lg">
                <Typography variant="h2">Design System</Typography>
                {designSystemBrowser || (
                  <Card padding="lg" className="text-center">
                    <VStack gap="md" align="center" className="py-8">
                      <Icon
                        icon={Palette}
                        size="lg"
                        className="text-[var(--color-muted-foreground)] opacity-50"
                      />
                      <Typography
                        variant="body1"
                        className="text-[var(--color-muted-foreground)]"
                      >
                        Browse available patterns and components
                      </Typography>
                      <Button>Open Storybook</Button>
                    </VStack>
                  </Card>
                )}
              </VStack>
            )}

            {mode === "hq" && activeTab === "preview" && (
              <Box fullHeight>
                {previewView || (
                  <Card padding="lg" className="h-full">
                    <VStack
                      gap="md"
                      align="center"
                      justify="center"
                      className="h-full"
                    >
                      <Icon
                        icon={Play}
                        size="lg"
                        className="text-[var(--color-muted-foreground)] opacity-50"
                      />
                      <Typography
                        variant="body1"
                        className="text-[var(--color-muted-foreground)]"
                      >
                        App preview will appear here
                      </Typography>
                      <Button onClick={handlePreview}>Launch Preview</Button>
                    </VStack>
                  </Card>
                )}
              </Box>
            )}

            {/* Build Mode Content */}
            {mode === "build" && activeTab === "schema" && (
              <Box fullHeight>
                {schemaEditor || (
                  <Card padding="lg" className="h-full">
                    <VStack
                      gap="md"
                      align="center"
                      justify="center"
                      className="h-full"
                    >
                      <Icon
                        icon={Code}
                        size="lg"
                        className="text-[var(--color-muted-foreground)] opacity-50"
                      />
                      <Typography
                        variant="body1"
                        className="text-[var(--color-muted-foreground)]"
                      >
                        Schema editor will appear here
                      </Typography>
                    </VStack>
                  </Card>
                )}
              </Box>
            )}

            {mode === "build" && activeTab === "domain-logic" && (
              <Box fullHeight>
                {domainLogicView || (
                  <Card padding="lg" className="h-full">
                    <VStack
                      gap="md"
                      align="center"
                      justify="center"
                      className="h-full"
                    >
                      <Icon
                        icon={FileText}
                        size="lg"
                        className="text-[var(--color-muted-foreground)] opacity-50"
                      />
                      <Typography
                        variant="body1"
                        className="text-[var(--color-muted-foreground)]"
                      >
                        Domain logic view will appear here
                      </Typography>
                    </VStack>
                  </Card>
                )}
              </Box>
            )}

            {mode === "build" && activeTab === "visualization" && (
              <Box fullHeight>
                {orbitalVisualization || (
                  <Card padding="lg" className="h-full">
                    <VStack
                      gap="md"
                      align="center"
                      justify="center"
                      className="h-full"
                    >
                      <Icon
                        icon={GitBranch}
                        size="lg"
                        className="text-[var(--color-muted-foreground)] opacity-50"
                      />
                      <Typography
                        variant="body1"
                        className="text-[var(--color-muted-foreground)]"
                      >
                        State machine visualization will appear here
                      </Typography>
                    </VStack>
                  </Card>
                )}
              </Box>
            )}

            {mode === "build" && activeTab === "validation" && (
              <Box fullHeight>
                {validationView || (
                  <Card padding="lg" className="h-full">
                    <VStack
                      gap="md"
                      align="center"
                      justify="center"
                      className="h-full"
                    >
                      <Icon
                        icon={CheckCircle}
                        size="lg"
                        className="text-[var(--color-muted-foreground)] opacity-50"
                      />
                      <Typography
                        variant="body1"
                        className="text-[var(--color-muted-foreground)]"
                      >
                        Schema validation results will appear here
                      </Typography>
                    </VStack>
                  </Card>
                )}
              </Box>
            )}

            {mode === "build" && activeTab === "preview" && (
              <Box className="h-full overflow-hidden">
                {previewPanel || (
                  <Card padding="lg" className="h-full">
                    <VStack
                      gap="md"
                      align="center"
                      justify="center"
                      className="h-full"
                    >
                      <Icon
                        icon={Play}
                        size="lg"
                        className="text-[var(--color-muted-foreground)] opacity-50"
                      />
                      <Typography
                        variant="body1"
                        className="text-[var(--color-muted-foreground)]"
                      >
                        Compile and preview your app here
                      </Typography>
                      <Button onClick={handleCompile}>Compile &amp; Preview</Button>
                    </VStack>
                  </Card>
                )}
              </Box>
            )}
          </VStack>

          {/* Inspector is now a tooltip/popover anchored to the PanelRight button in the top bar */}
        </HStack>
      </VStack>

      {/* AI Agent Panel */}
      {showAgentPanel && (
        <Box
          border
          fullHeight
          className="w-[400px] xl:w-[480px] shrink-0 border-t-0 border-b-0 border-r-0"
        >
          <VStack gap="none" className="h-full">
            <Box
              padding="md"
              border
              className="border-t-0 border-l-0 border-r-0"
            >
              <HStack justify="between" align="center">
                <Typography variant="h4">AI Assistant</Typography>
                <Button variant="ghost" size="sm" onClick={handleToggleAgent}>
                  <Icon icon={X} size="sm" />
                </Button>
              </HStack>
            </Box>
            <VStack flex className="overflow-auto">
              {agentPanel || (
                <Box padding="lg">
                  <Typography
                    variant="body2"
                    className="text-[var(--color-muted-foreground)]"
                  >
                    AI Assistant will appear here
                  </Typography>
                </Box>
              )}
            </VStack>
          </VStack>
        </Box>
      )}

      {/* Modals and overlays — rendered inside layout, positioned by CSS */}
      {modalsSlot}
    </HStack>
  );
};

StudioProjectBoard.displayName = "StudioProjectBoard";
