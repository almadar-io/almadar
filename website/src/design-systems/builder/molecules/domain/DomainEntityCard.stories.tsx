import type { Meta, StoryObj } from "@storybook/react";
import { DomainEntityCard } from "./DomainEntityCard";

const meta: Meta<typeof DomainEntityCard> = {
    title: "Builder/Molecules/Domain/DomainEntityCard",
    component: DomainEntityCard,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
    argTypes: {
        storyMode: { control: "boolean" },
    },
};

export default meta;
type Story = StoryObj<typeof DomainEntityCard>;

export const Default: Story = {
    args: {
        name: "Patient",
        description: "A person receiving medical care",
        fields: [
            { name: "name", type: "string", required: true },
            { name: "age", type: "number", required: true },
            { name: "bloodType", type: "enum" },
            { name: "admittedAt", type: "datetime" },
        ],
        states: ["registered", "triaged", "in_treatment", "discharged"],
        initialState: "registered",
    },
};

export const WithProvenance: Story = {
    args: {
        name: "Appointment",
        description: "A scheduled visit between a patient and doctor",
        provenance: "...with appointment scheduling...",
        fields: [
            { name: "date", type: "datetime", required: true },
            { name: "duration", type: "number" },
            { name: "notes", type: "text" },
        ],
        states: ["pending", "confirmed", "completed", "cancelled"],
        initialState: "pending",
    },
};

export const StoryModeOn: Story = {
    args: {
        name: "Patient",
        description: "A person receiving medical care",
        fields: [
            { name: "name", type: "string", required: true },
            { name: "age", type: "number" },
        ],
        states: ["registered", "discharged"],
        initialState: "registered",
        storyMode: true,
    },
};

export const WithVocabulary: Story = {
    args: {
        name: "Cargo",
        vocabulary: { item: "Shipment", collection: "Shipments" },
        fields: [
            { name: "weight", type: "number", required: true },
            { name: "destination", type: "string", required: true },
        ],
    },
};

export const MinimalEntity: Story = {
    args: {
        name: "Tag",
        description: "A label for categorization",
        fields: [{ name: "label", type: "string", required: true }],
    },
};
