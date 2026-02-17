import type { Meta, StoryObj } from "@storybook/react";
import { DomainFieldType } from "./DomainFieldType";
import type { FieldType } from "./DomainFieldType";

const meta: Meta<typeof DomainFieldType> = {
    title: "Builder/Atoms/Domain/DomainFieldType",
    component: DomainFieldType,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
    argTypes: {
        type: {
            control: "select",
            options: [
                "text",
                "long text",
                "number",
                "currency",
                "date",
                "timestamp",
                "yes/no",
                "enum",
                "list",
                "relation",
            ],
        },
        size: {
            control: "select",
            options: ["sm", "md", "lg"],
        },
        showIcon: { control: "boolean" },
    },
};

export default meta;
type Story = StoryObj<typeof DomainFieldType>;

export const Default: Story = {
    args: { type: "text" },
};

const allTypes: FieldType[] = [
    "text",
    "long text",
    "number",
    "currency",
    "date",
    "timestamp",
    "yes/no",
    "enum",
    "list",
    "relation",
];

export const AllTypes: Story = {
    render: () => (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, auto)",
                gap: 8,
                justifyItems: "start",
            }}
        >
            {allTypes.map((type) => (
                <DomainFieldType key={type} type={type} />
            ))}
        </div>
    ),
};

export const SmallSize: Story = {
    args: { type: "number", size: "sm" },
};

export const LargeSize: Story = {
    args: { type: "relation", size: "lg" },
};

export const NoIcon: Story = {
    args: { type: "enum", showIcon: false },
};
