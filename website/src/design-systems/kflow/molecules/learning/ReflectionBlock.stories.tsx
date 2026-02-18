import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { ReflectionBlock } from "./ReflectionBlock";

const meta: Meta<typeof ReflectionBlock> = {
  title: "KFlow/Molecules/Learning/ReflectionBlock",
  component: ReflectionBlock,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ReflectionBlock>;

export const Default: Story = {
  args: {
    prompt:
      "How might you apply what you've just learned about functions to simplify code you've written before?",
    index: 0,
    conceptId: "concept-functions-1",
    onSave: action("UI:SAVE_REFLECTION"),
  },
};

export const WithSavedNote: Story = {
  args: {
    prompt:
      "How might you apply what you've just learned about functions to simplify code you've written before?",
    index: 0,
    savedNote:
      "I realized I could refactor my calculator program to use functions for each operation instead of repeating the same code pattern.",
    conceptId: "concept-functions-1",
    onSave: action("UI:SAVE_REFLECTION"),
  },
};

export const MathReflection: Story = {
  args: {
    prompt:
      "Think about where you might encounter derivatives in everyday life. What quantities change with respect to other quantities?",
    index: 1,
    conceptId: "concept-calculus-1",
    onSave: action("UI:SAVE_REFLECTION"),
  },
};

export const ProgrammingReflection: Story = {
  args: {
    prompt:
      "Consider the trade-offs between the sorting algorithms we've discussed. When would you choose one over another?",
    index: 2,
    conceptId: "concept-sorting-1",
    onSave: action("UI:SAVE_REFLECTION"),
  },
};

export const DeepReflection: Story = {
  args: {
    prompt:
      "We've covered a lot of ground in this section. What concept challenged your previous assumptions the most? Why do you think that is?",
    index: 3,
    conceptId: "concept-advanced-1",
    onSave: action("UI:SAVE_REFLECTION"),
  },
};

export const MultipleReflections: Story = {
  render: () => (
    <div className="space-y-4">
      <ReflectionBlock
        prompt="What patterns do you notice in the examples we've seen?"
        index={0}
        onSave={action("UI:SAVE_REFLECTION_0")}
      />
      <ReflectionBlock
        prompt="How does this connect to what you learned in the previous section?"
        index={1}
        savedNote="The recursion pattern here is similar to the tree traversal we studied before."
        onSave={action("UI:SAVE_REFLECTION_1")}
      />
      <ReflectionBlock
        prompt="What questions do you still have about this topic?"
        index={2}
        onSave={action("UI:SAVE_REFLECTION_2")}
      />
    </div>
  ),
};
