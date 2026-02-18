import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { BloomQuizBlock } from "./BloomQuizBlock";

const meta: Meta<typeof BloomQuizBlock> = {
  title: "KFlow/Molecules/Learning/BloomQuizBlock",
  component: BloomQuizBlock,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: "select",
      options: ["remember", "understand", "apply", "analyze", "evaluate", "create"],
    },
    isAnswered: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BloomQuizBlock>;

export const Remember: Story = {
  args: {
    level: "remember",
    question: "What is the definition of photosynthesis?",
    answer:
      "Photosynthesis is the process by which plants and other organisms convert light energy into chemical energy that can be stored and later released to fuel the organism's activities.",
    index: 0,
    isAnswered: false,
    conceptId: "concept-1",
    onAnswer: action("UI:ANSWER_BLOOM"),
  },
};

export const Understand: Story = {
  args: {
    level: "understand",
    question:
      "Explain in your own words how photosynthesis benefits the ecosystem.",
    answer:
      "Photosynthesis benefits the ecosystem in several ways:\n\n1. **Oxygen Production**: It releases oxygen as a byproduct, which is essential for aerobic organisms\n2. **Carbon Dioxide Removal**: It removes CO₂ from the atmosphere, helping regulate climate\n3. **Food Chain Foundation**: It creates glucose that forms the base of most food chains\n4. **Energy Conversion**: It transforms solar energy into chemical energy that can be used by other organisms",
    index: 1,
    isAnswered: false,
    conceptId: "concept-1",
    onAnswer: action("UI:ANSWER_BLOOM"),
  },
};

export const Apply: Story = {
  args: {
    level: "apply",
    question:
      "Design a simple experiment to demonstrate that plants need light for photosynthesis.",
    answer:
      "**Experiment Design:**\n\n1. Take two identical plants of the same species\n2. Place one plant in sunlight and one in complete darkness\n3. Ensure both receive the same amount of water\n4. After one week, compare the plants\n5. The plant in darkness will show yellowing leaves and reduced growth, demonstrating that light is essential for photosynthesis",
    index: 2,
    isAnswered: false,
    conceptId: "concept-1",
    onAnswer: action("UI:ANSWER_BLOOM"),
  },
};

export const Analyze: Story = {
  args: {
    level: "analyze",
    question:
      "Compare and contrast photosynthesis and cellular respiration. What is the relationship between these two processes?",
    answer:
      "**Comparison:**\n\n| Aspect | Photosynthesis | Cellular Respiration |\n|--------|---------------|---------------------|\n| Location | Chloroplasts | Mitochondria |\n| Reactants | CO₂ + H₂O + Light | Glucose + O₂ |\n| Products | Glucose + O₂ | CO₂ + H₂O + ATP |\n| Energy | Absorbed | Released |\n\n**Relationship:** These processes are complementary - the products of one are the reactants of the other, forming a cycle that sustains life on Earth.",
    index: 3,
    isAnswered: false,
    conceptId: "concept-1",
    onAnswer: action("UI:ANSWER_BLOOM"),
  },
};

export const Evaluate: Story = {
  args: {
    level: "evaluate",
    question:
      "Assess the potential impact of deforestation on global photosynthesis rates and climate change. Is this a significant concern?",
    answer:
      "**Assessment:**\n\nDeforestation significantly impacts global photosynthesis and climate:\n\n1. **Reduced Carbon Sequestration**: Fewer trees means less CO₂ absorbed\n2. **Positive Feedback Loop**: Less photosynthesis → more atmospheric CO₂ → more warming → more forest fires → less photosynthesis\n3. **Oxygen Production**: While oceans produce most oxygen, forests are crucial for land-based ecosystems\n\n**Verdict:** This is a critical concern. The Amazon alone absorbs ~2 billion tons of CO₂ annually. Its destruction would accelerate climate change significantly.",
    index: 4,
    isAnswered: false,
    conceptId: "concept-1",
    onAnswer: action("UI:ANSWER_BLOOM"),
  },
};

export const Create: Story = {
  args: {
    level: "create",
    question:
      "Design an artificial photosynthesis system that could be used to capture carbon dioxide and produce clean fuel. What components would it need?",
    answer:
      "**Artificial Photosynthesis System Design:**\n\n```\n┌─────────────────────────────────────────┐\n│         Light Harvesting Layer          │\n│    (Solar panels / Quantum dots)        │\n├─────────────────────────────────────────┤\n│         Catalyst Chamber                │\n│    (Cobalt/Manganese catalysts)         │\n├─────────────────────────────────────────┤\n│      CO₂ Capture Membrane               │\n├─────────────────────────────────────────┤\n│       Fuel Synthesis Unit               │\n│    (Hydrogen/Methanol production)       │\n└─────────────────────────────────────────┘\n```\n\n**Key Components:**\n1. Light absorbers (semiconductor materials)\n2. Water oxidation catalysts\n3. CO₂ reduction catalysts\n4. Proton exchange membrane\n5. Fuel collection system",
    index: 5,
    isAnswered: false,
    conceptId: "concept-1",
    onAnswer: action("UI:ANSWER_BLOOM"),
  },
};

export const WithCodeQuestion: Story = {
  args: {
    level: "apply",
    question:
      "Given the following function, what will be the output?\n\n```python\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nprint(fibonacci(6))\n```",
    answer:
      "The output will be `8`.\n\n**Explanation:**\n- fibonacci(6) = fibonacci(5) + fibonacci(4)\n- fibonacci(5) = 5, fibonacci(4) = 3\n- 5 + 3 = 8\n\nThe Fibonacci sequence: 0, 1, 1, 2, 3, 5, **8**, ...",
    index: 0,
    isAnswered: false,
    conceptId: "concept-algorithms",
    onAnswer: action("UI:ANSWER_BLOOM"),
  },
};

export const Answered: Story = {
  args: {
    level: "understand",
    question: "Explain the concept of recursion in programming.",
    answer:
      "Recursion is a programming technique where a function calls itself to solve a problem by breaking it down into smaller subproblems.",
    index: 0,
    isAnswered: true,
    conceptId: "concept-recursion",
    onAnswer: action("UI:ANSWER_BLOOM"),
  },
};

export const AllLevels: Story = {
  render: () => (
    <div className="space-y-4">
      {(["remember", "understand", "apply", "analyze", "evaluate", "create"] as const).map(
        (level, index) => (
          <BloomQuizBlock
            key={level}
            level={level}
            question={`This is a ${level}-level question example.`}
            answer={`This is the answer for the ${level}-level question.`}
            index={index}
            isAnswered={index < 2}
            onAnswer={action(`UI:ANSWER_BLOOM_${level}`)}
          />
        )
      )}
    </div>
  ),
};
