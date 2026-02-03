import type { Meta, StoryObj } from "@storybook/react";
import { ConnectionBlock } from "./ConnectionBlock";

const meta: Meta<typeof ConnectionBlock> = {
  title: "KFlow/Molecules/Learning/ConnectionBlock",
  component: ConnectionBlock,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ConnectionBlock>;

export const Default: Story = {
  args: {
    content:
      "This concept builds on your understanding of **basic arithmetic** and **variables**. If you're comfortable with adding numbers and storing values, you're ready to learn about functions!",
  },
};

export const WithList: Story = {
  args: {
    content: `This lesson connects to several concepts you've already learned:

- **Variables**: You'll use variables to store intermediate results
- **Conditionals**: Decision-making within loops
- **Basic I/O**: Displaying loop results

Think about how you might combine these to repeat an action multiple times.`,
  },
};

export const MathConnection: Story = {
  args: {
    content:
      "Remember how we calculated the area of a rectangle? The concept of **integration** extends this idea to find the area under curves. Instead of simple multiplication, we'll sum up infinitely small rectangles.",
  },
};

export const ProgrammingConnection: Story = {
  args: {
    content: `Your knowledge of **arrays** and **loops** is essential here.

When we discuss **sorting algorithms**, we're essentially asking: "How can we rearrange elements in an array efficiently?"

The patterns you've seen in nested loops will help you understand how comparisons work in sorting.`,
  },
};

export const RealWorldConnection: Story = {
  args: {
    content:
      "Think about how you organize your music playlist or sort your emails by date. These everyday tasks use the same principles we'll explore in this lesson on **data structures**.",
  },
};
