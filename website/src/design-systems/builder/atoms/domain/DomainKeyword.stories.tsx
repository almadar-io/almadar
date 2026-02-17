import type { Meta, StoryObj } from "@storybook/react";
import { DomainKeyword } from "./DomainKeyword";

const meta: Meta<typeof DomainKeyword> = {
    title: "Builder/Atoms/Domain/DomainKeyword",
    component: DomainKeyword,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
    argTypes: {
        category: {
            control: "select",
            options: ["entity", "property", "state", "behavior", "guard", "effect", "page"],
        },
    },
};

export default meta;
type Story = StoryObj<typeof DomainKeyword>;

export const Entity: Story = {
    args: { children: "Entity", category: "entity" },
};

export const Property: Story = {
    args: { children: "It has:", category: "property" },
};

export const State: Story = {
    args: { children: "It can be:", category: "state" },
};

export const Guard: Story = {
    args: { children: "Guards:", category: "guard" },
};

export const Effect: Story = {
    args: { children: "Effects:", category: "effect" },
};

export const Clickable: Story = {
    args: { children: "It has:", clickable: true },
};

export const AutoDetect: Story = {
    args: { children: "Transitions:" },
};

export const AllCategories: Story = {
    render: () => (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <DomainKeyword category="entity">Entity</DomainKeyword>
            <DomainKeyword category="property">It has:</DomainKeyword>
            <DomainKeyword category="state">It can be:</DomainKeyword>
            <DomainKeyword category="behavior">From</DomainKeyword>
            <DomainKeyword category="guard">Guards:</DomainKeyword>
            <DomainKeyword category="effect">Effects:</DomainKeyword>
            <DomainKeyword category="page">Shows</DomainKeyword>
        </div>
    ),
};
