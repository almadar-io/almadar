import type { Meta, StoryObj } from "@storybook/react";
import { CardSelector } from "./CardSelector";
import { Building2, Utensils, Factory, ShoppingCart, Truck, Warehouse } from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof CardSelector> = {
  title: "Clients/Inspection-System/Molecules/CardSelector",
  component: CardSelector,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CardSelector>;

const inspectionTypes = [
  {
    id: "restaurant",
    title: "Restaurant",
    description: "Food service establishments",
    icon: Utensils,
  },
  {
    id: "retail",
    title: "Retail Store",
    description: "Consumer goods shops",
    icon: ShoppingCart,
  },
  {
    id: "factory",
    title: "Factory",
    description: "Manufacturing facilities",
    icon: Factory,
  },
  {
    id: "warehouse",
    title: "Warehouse",
    description: "Storage and distribution",
    icon: Warehouse,
  },
  {
    id: "office",
    title: "Office Building",
    description: "Commercial office spaces",
    icon: Building2,
  },
  {
    id: "transport",
    title: "Transport",
    description: "Vehicles and logistics",
    icon: Truck,
  },
];

export const Default: Story = {
  args: {
    options: inspectionTypes,
    selectedId: null,
  },
};

export const WithSelection: Story = {
  args: {
    options: inspectionTypes,
    selectedId: "restaurant",
  },
};

export const TwoColumns: Story = {
  args: {
    options: inspectionTypes.slice(0, 4),
    columns: 2,
  },
};

export const FourColumns: Story = {
  args: {
    options: inspectionTypes,
    columns: 4,
  },
};

export const WithDisabled: Story = {
  args: {
    options: [
      ...inspectionTypes.slice(0, 3),
      { ...inspectionTypes[3], disabled: true },
      { ...inspectionTypes[4], disabled: true },
      inspectionTypes[5],
    ],
    selectedId: "restaurant",
  },
};

export const NoIcons: Story = {
  args: {
    options: inspectionTypes.map(({ icon, ...rest }) => rest),
  },
};

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <CardSelector
        options={inspectionTypes}
        selectedId={selected}
        onChange={setSelected}
      />
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <CardSelector
        options={inspectionTypes}
        multiple
        selectedIds={selected}
        onMultiChange={setSelected}
      />
    );
  },
};
