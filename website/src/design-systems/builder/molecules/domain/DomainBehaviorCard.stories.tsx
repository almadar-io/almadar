import type { Meta, StoryObj } from "@storybook/react";
import { DomainBehaviorCard } from "./DomainBehaviorCard";

const meta: Meta<typeof DomainBehaviorCard> = {
    title: "Builder/Molecules/Domain/DomainBehaviorCard",
    component: DomainBehaviorCard,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
    argTypes: {
        storyMode: { control: "boolean" },
    },
};

export default meta;
type Story = StoryObj<typeof DomainBehaviorCard>;

export const Default: Story = {
    args: {
        name: "PatientLifecycle",
        description: "Tracks a patient from admission to discharge",
        states: ["registered", "triaged", "in_treatment", "discharged"],
        initialState: "registered",
        transitions: [
            { from: "registered", to: "triaged", event: "TRIAGE" },
            { from: "triaged", to: "in_treatment", event: "ASSIGN_DOCTOR", guard: "doctor.available" },
            { from: "in_treatment", to: "discharged", event: "COMPLETE_TREATMENT", effects: ["generateReport", "notifyBilling"] },
        ],
    },
};

export const WithProvenance: Story = {
    args: {
        name: "AppointmentWorkflow",
        provenance: "...with appointment scheduling...",
        states: ["pending", "confirmed", "completed", "cancelled"],
        initialState: "pending",
        transitions: [
            { from: "pending", to: "confirmed", event: "CONFIRM" },
            { from: "confirmed", to: "completed", event: "COMPLETE" },
            { from: "confirmed", to: "cancelled", event: "CANCEL", guard: "within24Hours" },
        ],
    },
};

export const StoryModeOn: Story = {
    args: {
        name: "OrderProcess",
        states: ["placed", "paid", "shipped", "delivered"],
        initialState: "placed",
        transitions: [
            { from: "placed", to: "paid", event: "PAY" },
            { from: "paid", to: "shipped", event: "SHIP" },
            { from: "shipped", to: "delivered", event: "DELIVER" },
        ],
        storyMode: true,
    },
};

export const WithSuggestedGuards: Story = {
    args: {
        name: "CargoManagement",
        states: ["loading", "in_transit", "delivered"],
        initialState: "loading",
        transitions: [
            { from: "loading", to: "in_transit", event: "DEPART" },
            { from: "in_transit", to: "delivered", event: "ARRIVE" },
        ],
        suggestedGuards: [
            { id: "g1", description: "Weight must be under 1000kg", appliesTo: ["Cargo.CREATE"] },
            { id: "g2", description: "Destination must be valid port", appliesTo: ["Cargo.UPDATE"] },
        ],
    },
};
