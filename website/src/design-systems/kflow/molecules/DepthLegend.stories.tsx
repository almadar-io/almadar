import type { Meta, StoryObj } from "@storybook/react";
import { DepthLegend } from "./DepthLegend";

const meta: Meta<typeof DepthLegend> = {
  title: "KFlow/Molecules/DepthLegend",
  component: DepthLegend,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DepthLegend>;

export const Default: Story = {};
