import type { Meta, StoryObj } from "@storybook/react";
import { OrbitalsLogo } from "./OrbitalsLogo";

const meta: Meta<typeof OrbitalsLogo> = {
    title: "Builder/Atoms/OrbitalsLogo",
    component: OrbitalsLogo,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
    argTypes: {
        size: { control: { type: "range", min: 16, max: 200, step: 4 } },
        borderRadius: { control: { type: "range", min: 0, max: 50, step: 1 } },
    },
};

export default meta;
type Story = StoryObj<typeof OrbitalsLogo>;

export const Default: Story = {
    args: {},
};

export const Small: Story = {
    args: { size: 24 },
};

export const Large: Story = {
    args: { size: 100 },
};

export const FullyRound: Story = {
    args: { borderRadius: 50 },
};

export const Sharp: Story = {
    args: { borderRadius: 0 },
};
