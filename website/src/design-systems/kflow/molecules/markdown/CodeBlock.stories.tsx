import type { Meta, StoryObj } from "@storybook/react";
import { CodeBlock } from "./CodeBlock";

const meta: Meta<typeof CodeBlock> = {
  title: "KFlow/Molecules/Markdown/CodeBlock",
  component: CodeBlock,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    language: {
      control: "select",
      options: [
        "javascript",
        "typescript",
        "python",
        "rust",
        "go",
        "html",
        "css",
        "json",
        "bash",
        "text",
      ],
    },
    showCopyButton: {
      control: "boolean",
    },
    showLanguageBadge: {
      control: "boolean",
    },
    maxHeight: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

const javascriptCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate the 10th Fibonacci number
const result = fibonacci(10);
console.log(result); // Output: 55`;

const typescriptCode = `interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}! You are logged in as \${user.role}.\`;
}

const user: User = {
  id: "1",
  name: "Alice",
  email: "alice@example.com",
  role: "admin",
};

console.log(greetUser(user));`;

const pythonCode = `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

# Example usage
numbers = [3, 6, 8, 10, 1, 2, 1]
print(quicksort(numbers))`;

const rustCode = `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    let sum: i32 = numbers
        .iter()
        .filter(|&x| x % 2 == 0)
        .map(|x| x * 2)
        .sum();

    println!("Sum of doubled even numbers: {}", sum);
}`;

export const JavaScript: Story = {
  args: {
    code: javascriptCode,
    language: "javascript",
    showCopyButton: true,
    showLanguageBadge: true,
  },
};

export const TypeScript: Story = {
  args: {
    code: typescriptCode,
    language: "typescript",
    showCopyButton: true,
    showLanguageBadge: true,
  },
};

export const Python: Story = {
  args: {
    code: pythonCode,
    language: "python",
    showCopyButton: true,
    showLanguageBadge: true,
  },
};

export const Rust: Story = {
  args: {
    code: rustCode,
    language: "rust",
    showCopyButton: true,
    showLanguageBadge: true,
  },
};

export const NoCopyButton: Story = {
  args: {
    code: javascriptCode,
    language: "javascript",
    showCopyButton: false,
    showLanguageBadge: true,
  },
};

export const NoLanguageBadge: Story = {
  args: {
    code: javascriptCode,
    language: "javascript",
    showCopyButton: true,
    showLanguageBadge: false,
  },
};

export const MinimalView: Story = {
  args: {
    code: javascriptCode,
    language: "javascript",
    showCopyButton: false,
    showLanguageBadge: false,
  },
};

export const LimitedHeight: Story = {
  args: {
    code: `// A very long code block
${Array(50).fill('console.log("Line of code");').join("\n")}`,
    language: "javascript",
    showCopyButton: true,
    showLanguageBadge: true,
    maxHeight: "200px",
  },
};

export const JsonExample: Story = {
  args: {
    code: globalThis.JSON.stringify(
      {
        name: "kflow",
        version: "1.0.0",
        dependencies: {
          react: "^18.0.0",
          typescript: "^5.0.0",
        },
      },
      null,
      2,
    ),
    language: "json",
    showCopyButton: true,
    showLanguageBadge: true,
  },
};
