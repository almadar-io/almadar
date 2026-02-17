import type { Meta, StoryObj } from "@storybook/react";
import { SettingsBoard } from "./SettingsBoard";

const meta: Meta<typeof SettingsBoard> = {
  title: "Builder/Organisms/SettingsBoard",
  component: SettingsBoard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", width: "100%", backgroundColor: "var(--color-background)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SettingsBoard>;

// =============================================================================
// Stories
// =============================================================================

/** Default settings board starting on the integrations tab */
export const Default: Story = {
  args: {
    tabChangeEvent: "TAB_CHANGE",
    saveEvent: "SAVE_SETTINGS",
    resetEvent: "RESET_SETTINGS",
  },
};

/** General tab selected by default (user navigates to it) */
export const GeneralTab: Story = {
  args: {
    tabChangeEvent: "TAB_CHANGE",
    saveEvent: "SAVE_SETTINGS",
    resetEvent: "RESET_SETTINGS",
  },
};

/** Appearance tab */
export const AppearanceTab: Story = {
  args: {
    tabChangeEvent: "TAB_CHANGE",
    saveEvent: "SAVE_SETTINGS",
    resetEvent: "RESET_SETTINGS",
  },
};

/** Advanced tab */
export const AdvancedTab: Story = {
  args: {
    tabChangeEvent: "TAB_CHANGE",
    saveEvent: "SAVE_SETTINGS",
    resetEvent: "RESET_SETTINGS",
  },
};
