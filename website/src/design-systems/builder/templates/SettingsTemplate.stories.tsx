import type { Meta, StoryObj } from "@storybook/react";
import { SettingsTemplate } from "./SettingsTemplate";

const meta: Meta<typeof SettingsTemplate> = {
  title: "Builder/Templates/SettingsTemplate",
  component: SettingsTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SettingsTemplate>;

export const Default: Story = {
  args: {},
};
