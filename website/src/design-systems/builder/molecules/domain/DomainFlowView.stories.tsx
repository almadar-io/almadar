import type { Meta, StoryObj } from "@storybook/react";
import { DomainFlowView } from "./DomainFlowView";

const meta: Meta<typeof DomainFlowView> = {
    title: "Builder/Molecules/Domain/DomainFlowView",
    component: DomainFlowView,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
    argTypes: {
        storyMode: { control: "boolean" },
    },
};

export default meta;
type Story = StoryObj<typeof DomainFlowView>;

export const Default: Story = {
    args: {
        name: "Patient Lifecycle",
        states: ["registered", "triaged", "in_treatment", "discharged"],
        initialState: "registered",
        transitions: [
            { from: "registered", to: "triaged", event: "TRIAGE" },
            { from: "triaged", to: "in_treatment", event: "ASSIGN_DOCTOR", guard: "doctor.available" },
            { from: "in_treatment", to: "discharged", event: "COMPLETE", effects: ["generateReport", "notifyBilling"] },
        ],
    },
};

export const Interactive: Story = {
    args: {
        name: "Order Process",
        states: ["placed", "paid", "shipped", "delivered"],
        initialState: "placed",
        transitions: [
            { from: "placed", to: "paid", event: "PAY" },
            { from: "paid", to: "shipped", event: "SHIP" },
            { from: "shipped", to: "delivered", event: "DELIVER" },
        ],
        onNodeSelect: (state: string) => alert(`Node: ${state}`),
        onConnectionSelect: (t: { from: string; to: string }) => alert(`Connection: ${t.from} → ${t.to}`),
    },
};

export const StoryModeOn: Story = {
    args: {
        name: "Appointment Flow",
        states: ["pending", "confirmed", "completed", "cancelled"],
        initialState: "pending",
        transitions: [
            { from: "pending", to: "confirmed", event: "CONFIRM" },
            { from: "confirmed", to: "completed", event: "COMPLETE" },
            { from: "confirmed", to: "cancelled", event: "CANCEL", guard: "within24Hours" },
        ],
        storyMode: true,
    },
};

export const LinearFlow: Story = {
    args: {
        states: ["start", "processing", "done"],
        initialState: "start",
        transitions: [
            { from: "start", to: "processing", event: "BEGIN" },
            { from: "processing", to: "done", event: "FINISH" },
        ],
    },
};
