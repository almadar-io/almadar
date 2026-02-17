import type { Meta, StoryObj } from "@storybook/react";
import { DomainOperator, DomainArrow } from "./DomainOperator";
import type { OperatorType } from "./DomainOperator";

const meta: Meta<typeof DomainOperator> = {
    title: "Builder/Atoms/Domain/DomainOperator",
    component: DomainOperator,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
    argTypes: {
        operator: {
            control: "select",
            options: [
                "AND",
                "OR",
                "NOT",
                "==",
                "!=",
                ">",
                "<",
                ">=",
                "<=",
                "is",
                "is not",
            ],
        },
        size: {
            control: "select",
            options: ["sm", "md", "lg"],
        },
        symbolic: { control: "boolean" },
    },
};

export default meta;
type Story = StoryObj<typeof DomainOperator>;

export const Default: Story = {
    args: { operator: "AND" },
};

const logicalOps: OperatorType[] = ["AND", "OR", "NOT"];

export const LogicalOperators: Story = {
    render: () => (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {logicalOps.map((op) => (
                <DomainOperator key={op} operator={op} />
            ))}
        </div>
    ),
};

const comparisonOps: OperatorType[] = [
    "==",
    "!=",
    ">",
    "<",
    ">=",
    "<=",
    "is",
    "is not",
];

export const ComparisonOperators: Story = {
    render: () => (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {comparisonOps.map((op) => (
                <DomainOperator key={op} operator={op} />
            ))}
        </div>
    ),
};

export const Symbolic: Story = {
    render: () => (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {logicalOps.map((op) => (
                <DomainOperator key={op} operator={op} symbolic />
            ))}
        </div>
    ),
};

const arrowDirections = [
    "right",
    "left",
    "up",
    "down",
    "bidirectional",
] as const;

export const Arrows: Story = {
    render: () => (
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {arrowDirections.map((dir) => (
                <DomainArrow key={dir} direction={dir} />
            ))}
        </div>
    ),
};
