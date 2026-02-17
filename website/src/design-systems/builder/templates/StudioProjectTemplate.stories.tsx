import type { Meta, StoryObj } from "@storybook/react";
import { StudioProjectTemplate } from "./StudioProjectTemplate";
import { StoryHeader } from "../molecules/domain/StoryHeader";
import { DomainEntityCard } from "../molecules/domain/DomainEntityCard";
import { DomainBehaviorCard } from "../molecules/domain/DomainBehaviorCard";
import { DomainFlowView } from "../molecules/domain/DomainFlowView";
import { DomainGlossary } from "../molecules/domain/DomainGlossary";
import { ChangeHistoryTimeline } from "../molecules/domain/ChangeHistoryTimeline";
import type { DomainContext, ChangeSetDocument } from "@almadar/core";
import React from "react";
import { VStack } from "@almadar/ui";

const meta: Meta<typeof StudioProjectTemplate> = {
  title: "Builder/Templates/StudioProjectTemplate",
  component: StudioProjectTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof StudioProjectTemplate>;

const mockProject = {
  id: "1",
  name: "Task Manager",
  description: "A comprehensive task management application with kanban boards and team collaboration",
  version: "1.0.0",
  createdAt: "2024-01-15",
  updatedAt: "2024-02-01",
  orbitalsCount: 3,
  traitsCount: 5,
  pagesCount: 4,
};

const mockDomainContext: DomainContext = {
  request: "Build a patient management system with appointment scheduling and triage workflows",
  category: "business",
  subDomain: "healthcare",
  personas: [
    { name: "Receptionist", role: "admin", device: "desktop" },
    { name: "Doctor", role: "provider", device: "tablet" },
    { name: "Patient", role: "user", device: "mobile" },
  ],
  vocabulary: {
    item: "Patient",
    collection: "Patients",
    create: "Admit",
    delete: "Discharge",
    container: "Ward",
  },
};

const MockStoryView = () => (
  <VStack gap="md">
    <StoryHeader domainContext={mockDomainContext} />
    <DomainEntityCard
      name="Patient"
      description="A person receiving medical care"
      fields={[
        { name: "name", type: "string", required: true },
        { name: "age", type: "number", required: true },
        { name: "bloodType", type: "enum" },
      ]}
      states={["registered", "triaged", "in_treatment", "discharged"]}
      initialState="registered"
      vocabulary={mockDomainContext.vocabulary}
      storyMode
    />
    <DomainBehaviorCard
      name="PatientLifecycle"
      description="Tracks a patient from admission to discharge"
      states={["registered", "triaged", "in_treatment", "discharged"]}
      initialState="registered"
      transitions={[
        { from: "registered", to: "triaged", event: "TRIAGE" },
        { from: "triaged", to: "in_treatment", event: "ASSIGN_DOCTOR", guard: "doctor.available" },
        { from: "in_treatment", to: "discharged", event: "COMPLETE_TREATMENT", effects: ["generateReport"] },
      ]}
      storyMode
    />
  </VStack>
);

const MockFlowView = () => (
  <DomainFlowView
    name="Patient Lifecycle"
    states={["registered", "triaged", "in_treatment", "discharged"]}
    initialState="registered"
    transitions={[
      { from: "registered", to: "triaged", event: "TRIAGE" },
      { from: "triaged", to: "in_treatment", event: "ASSIGN_DOCTOR", guard: "doctor.available" },
      { from: "in_treatment", to: "discharged", event: "COMPLETE", effects: ["generateReport", "notifyBilling"] },
    ]}
    storyMode
  />
);

const MockGlossaryView = () => (
  <DomainGlossary
    entries={[
      { term: "Patient", definition: "A person receiving care", category: "entity", properties: ["name", "age", "bloodType"], states: ["registered", "triaged", "in_treatment", "discharged"] },
      { term: "Doctor", definition: "A medical professional", category: "entity", properties: ["name", "speciality"] },
      { term: "PatientLifecycle", definition: "Tracks a patient from admission to discharge", category: "behavior" },
      { term: "Receptionist", definition: "Handles patient registration", category: "persona" },
    ]}
    vocabulary={mockDomainContext.vocabulary}
  />
);

const MockSchemaEditor = () => (
  <div style={{ padding: "16px", height: "100%", background: "#1e1e1e", color: "#d4d4d4", fontFamily: "monospace", fontSize: "14px" }}>
    <pre>{`{
  "name": "TaskManager",
  "version": "1.0.0",
  "orbitals": [
    {
      "name": "TaskManagement",
      "entity": {
        "name": "Task",
        "fields": [
          { "name": "title", "type": "string" },
          { "name": "status", "type": "enum" }
        ]
      }
    }
  ]
}`}</pre>
  </div>
);

const MockVisualization = () => (
  <div style={{ padding: "16px", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-muted)" }}>
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔀</div>
      <p style={{ color: "var(--color-muted-foreground)" }}>State Machine Visualization</p>
    </div>
  </div>
);

const MockAgentPanel = () => (
  <div style={{ padding: "16px", height: "100%" }}>
    <div style={{ padding: "12px", background: "var(--color-muted)", borderRadius: "8px" }}>
      <p style={{ fontSize: "14px" }}>AI Assistant ready to help...</p>
    </div>
  </div>
);

const MockInspector = () => (
  <div style={{ padding: "8px" }}>
    <div style={{ fontSize: "12px", color: "var(--color-muted-foreground)" }}>
      <p><strong>Selected:</strong> TaskManagement</p>
      <p><strong>Type:</strong> Orbital</p>
      <p><strong>States:</strong> 4</p>
      <p><strong>Transitions:</strong> 6</p>
    </div>
  </div>
);

const mockChangesets: ChangeSetDocument[] = [
  {
    id: "cs-2", version: 2, timestamp: Date.now() - 5 * 60000,
    source: "requirements-agent", author: { type: "agent", name: "AI Agent" },
    changes: [{ id: "c1", operation: "add", target: "AppointmentWorkflow", path: ["orbitals", 1], description: "Added cancellation transition" }],
    summary: { added: 1, modified: 0, removed: 0, description: "Added cancellation rule" },
    status: "applied", description: "Appointments can be cancelled up to 24h before",
  },
  {
    id: "cs-1", version: 1, timestamp: Date.now() - 2 * 3600000,
    source: "user", author: { type: "user", name: "Omar" },
    changes: [{ id: "c2", operation: "add", target: "Doctor", path: ["orbitals", 1], description: "Added Doctor entity" }],
    summary: { added: 1, modified: 0, removed: 0, description: "Added Doctor entity" },
    status: "applied", description: "Doctors have a name, specialty, and availability",
  },
];

const MockHistoryView = () => (
  <ChangeHistoryTimeline changesets={mockChangesets} />
);

export const StoryMode: Story = {
  args: {
    entity: { project: mockProject, mode: "hq", activeTab: "story", validationStatus: "valid", domainContext: mockDomainContext },
    storyView: <MockStoryView />,
  },
};

export const FlowMode: Story = {
  args: {
    entity: { project: mockProject, mode: "hq", activeTab: "flow", validationStatus: "valid" },
    flowView: <MockFlowView />,
  },
};

export const GlossaryMode: Story = {
  args: {
    entity: { project: mockProject, mode: "hq", activeTab: "glossary", validationStatus: "valid" },
    glossaryView: <MockGlossaryView />,
  },
};

export const HistoryMode: Story = {
  args: {
    entity: { project: mockProject, mode: "hq", activeTab: "history", validationStatus: "valid" },
    historyTimeline: <MockHistoryView />,
  },
};

export const HQMode: Story = {
  args: {
    entity: { project: mockProject, mode: "hq", activeTab: "info", validationStatus: "valid" },
  },
};

export const HQModeProposal: Story = {
  args: {
    entity: { project: mockProject, mode: "hq", activeTab: "proposal", validationStatus: "valid" },
  },
};

export const HQModeDesignSystem: Story = {
  args: {
    entity: { project: mockProject, mode: "hq", activeTab: "design-system", validationStatus: "valid" },
  },
};

export const BuildModeSchema: Story = {
  args: {
    entity: { project: mockProject, mode: "build", activeTab: "schema", validationStatus: "valid" },
    schemaEditor: <MockSchemaEditor />,
  },
};

export const BuildModeVisualization: Story = {
  args: {
    entity: { project: mockProject, mode: "build", activeTab: "visualization", validationStatus: "valid" },
    orbitalVisualization: <MockVisualization />,
  },
};

export const WithValidationError: Story = {
  args: {
    entity: { project: mockProject, mode: "build", activeTab: "schema", validationStatus: "invalid", errorCount: 3 },
    schemaEditor: <MockSchemaEditor />,
  },
};

export const Validating: Story = {
  args: {
    entity: { project: mockProject, mode: "build", activeTab: "schema", validationStatus: "validating" },
    schemaEditor: <MockSchemaEditor />,
  },
};

export const WithAgentPanel: Story = {
  args: {
    entity: { project: mockProject, mode: "build", activeTab: "schema", validationStatus: "valid", showAgentPanel: true },
    schemaEditor: <MockSchemaEditor />,
    agentPanel: <MockAgentPanel />,
  },
};

export const WithInspectorPanel: Story = {
  args: {
    entity: { project: mockProject, mode: "build", activeTab: "schema", validationStatus: "valid", showInspectorPanel: true },
    schemaEditor: <MockSchemaEditor />,
    inspectorPanel: <MockInspector />,
  },
};

export const WithAllPanels: Story = {
  args: {
    entity: { project: mockProject, mode: "build", activeTab: "schema", validationStatus: "valid", showAgentPanel: true, showInspectorPanel: true },
    schemaEditor: <MockSchemaEditor />,
    agentPanel: <MockAgentPanel />,
    inspectorPanel: <MockInspector />,
  },
};

export const MinimalProject: Story = {
  args: {
    entity: {
      project: {
        id: "2",
        name: "New Project",
        version: "0.1.0",
        createdAt: "Today",
        updatedAt: "Today",
        orbitalsCount: 0,
        traitsCount: 0,
        pagesCount: 0,
      },
      mode: "hq",
      activeTab: "info",
      validationStatus: "valid",
    },
  },
};
