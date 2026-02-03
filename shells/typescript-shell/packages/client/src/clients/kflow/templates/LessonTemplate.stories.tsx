import type { Meta, StoryObj } from "@storybook/react";
import { LessonTemplate } from "./LessonTemplate";

const meta: Meta<typeof LessonTemplate> = {
  title: "KFlow/Templates/LessonTemplate",
  component: LessonTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LessonTemplate>;

const sampleSegments = [
  {
    type: "markdown" as const,
    content: `## Introduction to Neural Networks

Neural networks are computing systems inspired by biological neural networks that constitute animal brains. They are designed to recognize patterns and interpret data through a form of machine perception.

### Key Concepts

1. **Neurons** - The basic units of computation
2. **Weights** - Parameters that are learned during training
3. **Activation Functions** - Non-linear functions that enable complex mappings
`,
  },
  {
    type: "code" as const,
    content: `import torch.nn as nn

class SimpleNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.layer1 = nn.Linear(10, 5)
        self.layer2 = nn.Linear(5, 1)

    def forward(self, x):
        x = torch.relu(self.layer1(x))
        return self.layer2(x)`,
    language: "python",
  },
  {
    type: "markdown" as const,
    content: `### Training Process

The training process involves:
- Forward propagation
- Loss calculation
- Backward propagation
- Weight updates
`,
  },
];

const sampleSidebarItems = [
  { id: "1", title: "Introduction to ML", isCompleted: true },
  { id: "2", title: "Neural Networks Basics", isCurrent: true },
  { id: "3", title: "Backpropagation" },
  { id: "4", title: "Optimization Techniques" },
  { id: "5", title: "Regularization" },
];

export const Default: Story = {
  args: {
    entity: {
      id: "lesson-1",
      title: "Introduction to Neural Networks",
      content: "<p>This is the lesson content.</p>",
      segments: sampleSegments,
      duration: 15,
      courseTitle: "Machine Learning Fundamentals",
      courseProgress: 40,
    },
    sidebarItems: sampleSidebarItems,
    hasPrevious: true,
    hasNext: true,
    readingProgress: 35,
  },
};

export const Completed: Story = {
  args: {
    entity: {
      id: "lesson-2",
      title: "Completed Lesson",
      content: "<p>You have completed this lesson.</p>",
      duration: 10,
      isCompleted: true,
      courseTitle: "Python Basics",
      courseProgress: 100,
    },
    hasPrevious: true,
    hasNext: false,
    readingProgress: 100,
  },
};

export const FirstLesson: Story = {
  args: {
    entity: {
      id: "lesson-0",
      title: "Getting Started",
      content: "<p>Welcome to the course!</p>",
      duration: 5,
      courseTitle: "Introduction Course",
      courseProgress: 0,
    },
    sidebarItems: sampleSidebarItems,
    hasPrevious: false,
    hasNext: true,
    readingProgress: 0,
  },
};

export const WithSegments: Story = {
  args: {
    entity: {
      id: "lesson-3",
      title: "Advanced Neural Networks",
      content: "",
      segments: [
        ...sampleSegments,
        {
          type: "quiz" as const,
          question: "What is the main purpose of an activation function?",
          answer:
            "To introduce non-linearity into the network, allowing it to learn complex patterns that linear functions cannot represent.",
        },
        {
          type: "bloom" as const,
          level: "understand",
          question: "Explain why neural networks need multiple layers.",
          answer:
            "Multiple layers allow the network to learn hierarchical representations of data, with each layer learning increasingly abstract features.",
        },
      ],
      duration: 25,
      courseTitle: "Deep Learning",
      courseProgress: 60,
    },
    hasPrevious: true,
    hasNext: true,
    readingProgress: 50,
  },
};

export const NoSidebar: Story = {
  args: {
    entity: {
      id: "lesson-4",
      title: "Standalone Lesson",
      content: "<p>This lesson has no course context.</p>",
      duration: 8,
    },
    hasPrevious: false,
    hasNext: false,
  },
};
