import type { Meta, StoryObj } from "@storybook/react";
import { DomainGlossary } from "./DomainGlossary";
import type { GlossaryEntry } from "./DomainGlossary";

const healthcareEntries: GlossaryEntry[] = [
    {
        term: "Patient",
        definition: "A person receiving care",
        category: "entity",
        properties: ["name", "age", "bloodType"],
        states: ["registered", "triaged", "in_treatment", "discharged"],
    },
    {
        term: "Doctor",
        definition: "A medical professional who treats patients",
        category: "entity",
        properties: ["name", "speciality", "available"],
    },
    {
        term: "Appointment",
        definition: "A scheduled visit between a patient and doctor",
        category: "entity",
        properties: ["date", "duration", "notes"],
        states: ["pending", "confirmed", "completed", "cancelled"],
    },
    {
        term: "PatientLifecycle",
        definition: "Tracks a patient from admission to discharge",
        category: "behavior",
    },
    {
        term: "AppointmentWorkflow",
        definition: "Manages appointment scheduling and completion",
        category: "behavior",
    },
    {
        term: "Triage",
        definition: "The process of deciding who gets seen first",
        category: "state",
    },
    {
        term: "Receptionist",
        definition: "Handles patient registration and scheduling",
        category: "persona",
    },
    {
        term: "Doctor",
        definition: "Provides medical care and treatment",
        category: "persona",
    },
];

const meta: Meta<typeof DomainGlossary> = {
    title: "Builder/Molecules/Domain/DomainGlossary",
    component: DomainGlossary,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DomainGlossary>;

export const Default: Story = {
    args: { entries: healthcareEntries },
};

export const WithVocabulary: Story = {
    args: {
        entries: healthcareEntries,
        vocabulary: {
            item: "Patient",
            collection: "Patients",
            create: "Admit",
            delete: "Discharge",
            container: "Ward",
        },
    },
};

export const Interactive: Story = {
    args: {
        entries: healthcareEntries,
        onTermSelect: (term: string) => alert(`Selected: ${term}`),
    },
};

export const EntitiesOnly: Story = {
    args: {
        entries: healthcareEntries.filter((e) => e.category === "entity"),
    },
};

export const EmptyState: Story = {
    args: { entries: [] },
};
