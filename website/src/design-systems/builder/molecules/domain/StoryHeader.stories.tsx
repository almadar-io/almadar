import type { Meta, StoryObj } from "@storybook/react";
import { StoryHeader } from "./StoryHeader";
import type { DomainContext } from "@almadar/core";

const sampleContext: DomainContext = {
    request: "Build a patient management system for a hospital with appointment scheduling and triage",
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

const meta: Meta<typeof StoryHeader> = {
    title: "Builder/Molecules/Domain/StoryHeader",
    component: StoryHeader,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StoryHeader>;

export const Default: Story = {
    args: { domainContext: sampleContext },
};

export const WithActivePersona: Story = {
    args: {
        domainContext: sampleContext,
        activePersona: "Doctor",
        onPersonaSelect: (p: { name: string }) => alert(`Selected: ${p.name}`),
    },
};

export const MinimalContext: Story = {
    args: {
        domainContext: {
            request: "A simple to-do list app",
            category: "business",
        },
    },
};

export const GameCategory: Story = {
    args: {
        domainContext: {
            request: "Build a turn-based strategy game with hex grid and unit management",
            category: "game",
            subDomain: "strategy",
            personas: [{ name: "Player", device: "desktop" }],
        },
    },
};
