import type { Meta, StoryObj } from "@storybook/react";
import { DomainState } from "./DomainState";

const meta: Meta<typeof DomainState> = {
    title: "Builder/Atoms/Domain/DomainState",
    component: DomainState,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
    argTypes: {
        isInitial: { control: "boolean" },
        isActive: { control: "boolean" },
    },
};

export default meta;
type Story = StoryObj<typeof DomainState>;

export const Default: Story = {
    args: { name: "pending" },
};

export const Initial: Story = {
    args: { name: "draft", isInitial: true },
};

export const Active: Story = {
    args: { name: "in_progress", isActive: true },
};

export const Clickable: Story = {
    args: { name: "completed", onClick: () => alert("State clicked!") },
};

export const StateRow: Story = {
    render: () => (
        <div style={{ display: "flex", gap: 8 }}>
            <DomainState name="draft" isInitial />
            <DomainState name="pending" />
            <DomainState name="in_progress" isActive />
            <DomainState name="completed" />
            <DomainState name="cancelled" />
        </div>
    ),
};
