import type { Meta, StoryObj } from "@storybook/react";
import { MarkdownContent } from "./MarkdownContent";

const meta: Meta<typeof MarkdownContent> = {
  title: "KFlow/Molecules/Markdown/MarkdownContent",
  component: MarkdownContent,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MarkdownContent>;

export const BasicText: Story = {
  args: {
    content: `# Introduction to Photosynthesis

Photosynthesis is a process used by plants and other organisms to convert **light energy** into *chemical energy* that can be stored and later released to fuel the organism's activities.

This process is fundamental to life on Earth as it:
- Produces oxygen
- Converts CO₂ into organic compounds
- Forms the base of most food chains`,
  },
};

export const WithInlineCode: Story = {
  args: {
    content: `## Using Variables in JavaScript

In JavaScript, you can declare variables using \`const\`, \`let\`, or \`var\`.

The \`const\` keyword is used for values that won't change, while \`let\` allows reassignment.

For example, \`const PI = 3.14159\` creates a constant, and \`let count = 0\` creates a mutable variable.`,
  },
};

export const WithTable: Story = {
  args: {
    content: `## Comparison of Data Types

| Type | Mutable | Ordered | Duplicates |
|------|---------|---------|------------|
| List | Yes | Yes | Yes |
| Tuple | No | Yes | Yes |
| Set | Yes | No | No |
| Dict | Yes | No | Keys: No |

Each data type has its own use cases based on these characteristics.`,
  },
};

export const WithMath: Story = {
  args: {
    content: `## The Quadratic Formula

The solutions to the quadratic equation $ax^2 + bx + c = 0$ are given by:

$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

Where:
- $a$ is the coefficient of $x^2$
- $b$ is the coefficient of $x$
- $c$ is the constant term

The discriminant $\\Delta = b^2 - 4ac$ determines the nature of the roots.`,
  },
};

export const WithBlockquote: Story = {
  args: {
    content: `## Famous Programming Quotes

> "Programs must be written for people to read, and only incidentally for machines to execute."
> — Harold Abelson

This quote emphasizes the importance of code readability.

> "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
> — Martin Fowler`,
  },
};

export const WithLinks: Story = {
  args: {
    content: `## Learning Resources

Here are some helpful resources for learning:

- [MDN Web Docs](https://developer.mozilla.org) - Comprehensive web documentation
- [React Documentation](https://react.dev) - Official React docs
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Learn TypeScript

You can also check out internal links like [the next chapter](#chapter-2).`,
  },
};

export const WithLists: Story = {
  args: {
    content: `## Project Setup Steps

1. **Clone the repository**
   - Use \`git clone\` to download
   - Navigate to the project folder

2. **Install dependencies**
   - Run \`npm install\`
   - Check for any peer dependency warnings

3. **Configure environment**
   - Copy \`.env.example\` to \`.env\`
   - Fill in required values

### Additional Notes

- Make sure Node.js v18+ is installed
- Use a code editor with TypeScript support
- Consider using VS Code with recommended extensions`,
  },
};

export const ComplexLesson: Story = {
  args: {
    content: `# Understanding Neural Networks

## Introduction

Neural networks are computing systems inspired by **biological neural networks** that constitute animal brains.

## Key Concepts

### Neurons and Layers

A neural network consists of:

1. **Input Layer** - Receives the initial data
2. **Hidden Layers** - Process the information
3. **Output Layer** - Produces the final result

### Activation Functions

Common activation functions include:

| Function | Formula | Use Case |
|----------|---------|----------|
| ReLU | $f(x) = max(0, x)$ | Hidden layers |
| Sigmoid | $f(x) = \\frac{1}{1 + e^{-x}}$ | Binary classification |
| Softmax | $f(x_i) = \\frac{e^{x_i}}{\\sum_j e^{x_j}}$ | Multi-class output |

> "Deep learning allows computational models composed of multiple processing layers to learn representations of data with multiple levels of abstraction."
> — LeCun, Bengio, Hinton (2015)

### Forward Propagation

The output is calculated using \`y = activation(weights · inputs + bias)\` for each neuron.`,
  },
};
