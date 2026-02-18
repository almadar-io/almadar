import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { ActivationBlock } from "./ActivationBlock";

const meta: Meta<typeof ActivationBlock> = {
  title: "KFlow/Molecules/Learning/ActivationBlock",
  component: ActivationBlock,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ActivationBlock>;

export const Default: Story = {
  args: {
    question:
      "What do you already know about how plants create their own food? Think about any experiences you've had with gardening or observing plants.",
    conceptId: "concept-photosynthesis-1",
    onSave: action("UI:SAVE_ACTIVATION"),
  },
};

export const WithSavedResponse: Story = {
  args: {
    question:
      "What do you already know about how plants create their own food? Think about any experiences you've had with gardening or observing plants.",
    savedResponse:
      "I know that plants need sunlight and water to grow. I've noticed that plants in darker areas don't grow as well.",
    conceptId: "concept-photosynthesis-1",
    onSave: action("UI:SAVE_ACTIVATION"),
  },
};

export const MathQuestion: Story = {
  args: {
    question:
      "Before we dive into calculus, what do you understand about the concept of 'rate of change'? Can you think of real-world examples where things change at different rates?",
    conceptId: "concept-calculus-1",
    onSave: action("UI:SAVE_ACTIVATION"),
  },
};

export const ProgrammingQuestion: Story = {
  args: {
    question:
      "Think about a time when you had to organize information or follow a set of steps to complete a task. How did you approach it? This relates to how we think about algorithms.",
    conceptId: "concept-algorithms-1",
    onSave: action("UI:SAVE_ACTIVATION"),
  },
};

export const HistoryQuestion: Story = {
  args: {
    question:
      "What do you already know about the causes of World War I? Have you heard about any key events or figures from this period?",
    conceptId: "concept-wwi-1",
    onSave: action("UI:SAVE_ACTIVATION"),
  },
};

export const LongQuestion: Story = {
  args: {
    question:
      "Consider the following scenario: You're designing a system to recommend movies to users based on their viewing history. What factors would you consider important? How might you approach measuring similarity between movies or users? Don't worry if you don't know the technical terms yet - just think about it from a logical perspective.",
    conceptId: "concept-recommender-systems-1",
    onSave: action("UI:SAVE_ACTIVATION"),
  },
};
