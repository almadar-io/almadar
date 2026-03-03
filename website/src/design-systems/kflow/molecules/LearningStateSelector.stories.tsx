import type { Meta, StoryObj } from "@storybook/react";
import { LearningStateSelector } from "./LearningStateSelector";

const meta: Meta<typeof LearningStateSelector> = {
  title: "KFlow/Molecules/LearningStateSelector",
  component: LearningStateSelector,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LearningStateSelector>;

export const Unexplored: Story = {
  args: {
    currentStatus: "unexplored",
    nodeId: "js-closures",
    setStateEvent: "SET_LEARNING_STATE",
  },
};

export const Studying: Story = {
  args: {
    currentStatus: "studying",
    nodeId: "js-closures",
    setStateEvent: "SET_LEARNING_STATE",
  },
};

export const Understood: Story = {
  args: {
    currentStatus: "understood",
    nodeId: "js-closures",
    setStateEvent: "SET_LEARNING_STATE",
  },
};

export const Teaching: Story = {
  args: {
    currentStatus: "teaching",
    nodeId: "js-closures",
    setStateEvent: "SET_LEARNING_STATE",
  },
};
