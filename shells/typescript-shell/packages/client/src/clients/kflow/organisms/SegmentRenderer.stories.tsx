import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SegmentRenderer } from "./SegmentRenderer";
import { Segment } from "../utils/parseLessonSegments";

const meta: Meta<typeof SegmentRenderer> = {
  title: "KFlow/Organisms/SegmentRenderer",
  component: SegmentRenderer,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SegmentRenderer>;

const simpleSegments: Segment[] = [
  {
    type: "markdown",
    content: `# Introduction to Functions

Functions are one of the fundamental building blocks in programming. They allow you to:

- **Encapsulate** code that performs a specific task
- **Reuse** that code throughout your program
- **Organize** your code into logical units`,
  },
  {
    type: "code",
    language: "javascript",
    content: `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World")); // Output: Hello, World!`,
  },
  {
    type: "markdown",
    content: `Notice how the function takes a **parameter** called \`name\` and uses it to create a personalized greeting.`,
  },
];

const fullLessonSegments: Segment[] = [
  {
    type: "activate",
    question:
      "Think about tasks you do repeatedly every day. How might grouping related actions together make them easier to remember and perform?",
  },
  {
    type: "connect",
    content:
      "This lesson builds on your understanding of **variables** and **data types**. Functions use these concepts but add a new layer of organization to your code.",
  },
  {
    type: "markdown",
    content: `# Understanding Functions

A function is a reusable block of code designed to perform a particular task. Functions help us:

1. Write **DRY** (Don't Repeat Yourself) code
2. Break complex problems into smaller parts
3. Make code more readable and maintainable`,
  },
  {
    type: "code",
    language: "python",
    content: `def calculate_area(width, height):
    """Calculate the area of a rectangle."""
    return width * height

# Using the function
room_area = calculate_area(10, 12)
print(f"The room area is {room_area} square feet")`,
  },
  {
    type: "reflect",
    prompt:
      "How might using functions change the way you approach writing a program? Think about a project you've worked on that could benefit from functions.",
  },
  {
    type: "markdown",
    content: `## Function Parameters

Parameters are variables that act as placeholders for the values that will be passed to the function when it's called.`,
  },
  {
    type: "bloom",
    level: "remember",
    question: "What are the two main parts of a function definition?",
    answer:
      "The two main parts are:\n1. **Function signature** - includes the function name and parameters\n2. **Function body** - the code that executes when the function is called",
  },
  {
    type: "bloom",
    level: "apply",
    question:
      "Write a function that takes two numbers and returns their average.",
    answer: `\`\`\`python
def average(a, b):
    return (a + b) / 2

# Test
print(average(10, 20))  # Output: 15.0
\`\`\``,
  },
];

const quizOnlySegments: Segment[] = [
  {
    type: "markdown",
    content: "## Quick Quiz\n\nTest your understanding with these questions:",
  },
  {
    type: "quiz",
    question: "What keyword is used to define a function in Python?",
    answer: "The `def` keyword is used to define functions in Python.",
  },
  {
    type: "quiz",
    question:
      "What is the difference between a parameter and an argument?",
    answer:
      "A **parameter** is the variable in the function definition, while an **argument** is the actual value passed to the function when it's called.",
  },
];

export const SimpleLesson: Story = {
  args: {
    segments: simpleSegments,
    conceptId: "concept-functions-intro",
    onSaveActivation: action("UI:SAVE_ACTIVATION"),
    onSaveReflection: action("UI:SAVE_REFLECTION"),
    onAnswerBloom: action("UI:ANSWER_BLOOM"),
  },
};

export const FullLesson: Story = {
  args: {
    segments: fullLessonSegments,
    conceptId: "concept-functions-full",
    onSaveActivation: action("UI:SAVE_ACTIVATION"),
    onSaveReflection: action("UI:SAVE_REFLECTION"),
    onAnswerBloom: action("UI:ANSWER_BLOOM"),
  },
};

export const WithUserProgress: Story = {
  args: {
    segments: fullLessonSegments,
    conceptId: "concept-functions-full",
    userProgress: {
      activationResponse:
        "I brush my teeth the same way every morning - it's like a routine or function!",
      reflectionNotes: [
        "I think functions would help me avoid copy-pasting code when I need to do the same calculation multiple times.",
      ],
      bloomAnswered: { 0: true },
    },
    onSaveActivation: action("UI:SAVE_ACTIVATION"),
    onSaveReflection: action("UI:SAVE_REFLECTION"),
    onAnswerBloom: action("UI:ANSWER_BLOOM"),
  },
};

export const QuizOnly: Story = {
  args: {
    segments: quizOnlySegments,
    conceptId: "concept-quiz",
  },
};

export const MarkdownOnly: Story = {
  args: {
    segments: [
      {
        type: "markdown",
        content: `# Pure Markdown Content

This example shows the SegmentRenderer with only markdown content.

## Features

- **Bold text** and *italic text*
- Lists like this one
- Code like \`console.log()\`

## Tables

| Feature | Supported |
|---------|-----------|
| Headers | Yes |
| Bold | Yes |
| Tables | Yes |

> Blockquotes are also supported!`,
      },
    ],
  },
};

export const CodeHeavy: Story = {
  args: {
    segments: [
      {
        type: "markdown",
        content: "## Multiple Code Examples\n\nHere are examples in different languages:",
      },
      {
        type: "code",
        language: "javascript",
        content: `// JavaScript
const sum = (a, b) => a + b;`,
      },
      {
        type: "code",
        language: "python",
        content: `# Python
def sum(a, b):
    return a + b`,
      },
      {
        type: "code",
        language: "rust",
        content: `// Rust
fn sum(a: i32, b: i32) -> i32 {
    a + b
}`,
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    segments: [],
  },
};
