import type { Meta, StoryObj } from "@storybook/react";
import { ChangeHistoryTimeline } from "./ChangeHistoryTimeline";
import type { ChangeSetDocument } from "@almadar/core";

const now = Date.now();

const mockChangesets: ChangeSetDocument[] = [
    {
        id: "cs-3",
        version: 3,
        timestamp: now - 5 * 60000, // 5 min ago
        source: "requirements-agent",
        author: { type: "agent", name: "Requirements Agent" },
        trigger: "User requested cancellation rule",
        changes: [
            {
                id: "c1",
                operation: "add",
                target: "AppointmentWorkflow",
                path: ["orbitals", 1, "trait", "transitions", 3],
                description: "Added cancellation transition with 24-hour guard",
                reason: "User requested cancellation policy",
            },
        ],
        summary: { added: 1, modified: 0, removed: 0, description: "Added cancellation rule" },
        status: "applied",
        description: "Appointments can now be cancelled up to 24 hours before the scheduled time",
    },
    {
        id: "cs-2",
        version: 2,
        timestamp: now - 90 * 60000, // 1.5h ago
        source: "user",
        author: { type: "user", name: "Omar" },
        changes: [
            {
                id: "c2",
                operation: "add",
                target: "Doctor",
                path: ["orbitals", 1],
                description: "Added Doctor entity with name, specialty, availability fields",
            },
            {
                id: "c3",
                operation: "modify",
                target: "PatientLifecycle",
                path: ["orbitals", 0, "trait", "transitions", 1],
                description: "Updated ASSIGN_DOCTOR transition to reference Doctor entity",
            },
        ],
        summary: { added: 1, modified: 1, removed: 0, description: "Added Doctor entity" },
        status: "applied",
        description: "Doctors have a name, specialty, and availability status",
    },
    {
        id: "cs-1",
        version: 1,
        timestamp: now - 3 * 3600000, // 3h ago
        source: "requirements-agent",
        author: { type: "agent", name: "Requirements Agent" },
        trigger: "Initial decomposition",
        changes: [
            {
                id: "c4",
                operation: "add",
                target: "Patient",
                path: ["orbitals", 0],
                description: "Created Patient entity with lifecycle trait",
            },
        ],
        summary: { added: 1, modified: 0, removed: 0, description: "Initial schema generation" },
        status: "applied",
        description: "Created initial Patient management schema from user request",
    },
];

const meta: Meta<typeof ChangeHistoryTimeline> = {
    title: "Builder/Molecules/Domain/ChangeHistoryTimeline",
    component: ChangeHistoryTimeline,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChangeHistoryTimeline>;

export const Default: Story = {
    args: { changesets: mockChangesets },
};

export const WithRevert: Story = {
    args: {
        changesets: mockChangesets,
        onRevert: (id: string) => alert(`Revert: ${id}`),
    },
};

export const Interactive: Story = {
    args: {
        changesets: mockChangesets,
        onChangeSelect: (cs: ChangeSetDocument) => alert(`Selected: ${cs.description}`),
        onRevert: (id: string) => alert(`Revert: ${id}`),
    },
};

export const Empty: Story = {
    args: { changesets: [] },
};

export const SingleChange: Story = {
    args: { changesets: [mockChangesets[0]] },
};

export const WithRevertedEntry: Story = {
    args: {
        changesets: [
            ...mockChangesets,
            {
                id: "cs-0",
                version: 0,
                timestamp: now - 5 * 3600000,
                source: "auto-fix" as const,
                author: { type: "agent" as const },
                changes: [
                    {
                        id: "c5",
                        operation: "remove" as const,
                        target: "DeprecatedField",
                        path: ["orbitals", 0, "entity", "fields", 3],
                        description: "Removed deprecated field",
                    },
                ],
                summary: { added: 0, modified: 0, removed: 1, description: "Cleanup" },
                status: "reverted" as const,
                description: "Auto-cleanup of deprecated fields",
            },
        ],
    },
};
