import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
    ExplainProvider,
    ExplainToggle,
    ExplainAnnotation,
    ValidationExplain,
} from "./ExplainOverlay";
import { Typography, VStack, Card, CardContent } from "@almadar/ui";

const meta: Meta<typeof ExplainAnnotation> = {
    title: "Builder/Atoms/Domain/ExplainOverlay",
    component: ExplainAnnotation,
    parameters: { layout: "padded" },
    tags: ["autodocs"],
    decorators: [
        (Story: React.ComponentType) => (
            <ExplainProvider defaultEnabled={true}>
                <Story />
            </ExplainProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof ExplainAnnotation>;

export const Default: Story = {
    args: {
        explanation: "This defines the fields (properties) that every Patient record will have in your system.",
        children: (
            <Card>
                <CardContent>
                    <Typography variant="body2">
                        entity Patient {'{'} name: string, age: number, bloodType: enum {'}'}
                    </Typography>
                </CardContent>
            </Card>
        ),
    },
};

export const WithCustomHeading: Story = {
    args: {
        explanation: "A guard is a rule that must be true before an action can happen. This guard checks that the doctor is not already treating another patient.",
        heading: "About Guards",
        children: (
            <Card>
                <CardContent>
                    <Typography variant="body2">
                        guard: doctor.available == true
                    </Typography>
                </CardContent>
            </Card>
        ),
    },
};

export const ToggleDemo: Story = {
    decorators: [
        () => (
            <ExplainProvider>
                <VStack gap="md">
                    <ExplainToggle />
                    <ExplainAnnotation explanation="This creates a new Patient record when someone is admitted to the hospital.">
                        <Card>
                            <CardContent>
                                <Typography variant="body2">
                                    transition: registered → triaged on TRIAGE
                                </Typography>
                            </CardContent>
                        </Card>
                    </ExplainAnnotation>
                    <ExplainAnnotation explanation="Fields define what information is stored for each entity. Required fields must always have a value.">
                        <Card>
                            <CardContent>
                                <Typography variant="body2">
                                    field name: string (required)
                                </Typography>
                            </CardContent>
                        </Card>
                    </ExplainAnnotation>
                </VStack>
            </ExplainProvider>
        ),
    ],
};

export const ValidationErrors: Story = {
    decorators: [
        () => (
            <ExplainProvider defaultEnabled={true}>
                <VStack gap="md">
                    <ExplainToggle />
                    <ValidationExplain
                        errorMessage="Missing required field: primaryKey"
                        explanation="Every entity needs a unique identifier so the system can tell records apart. Add a field like 'id' or 'patientId'."
                        severity="error"
                    />
                    <ValidationExplain
                        errorMessage="Unreachable state: 'archived'"
                        explanation="The 'archived' stage exists but nothing can move a patient into it. Add a transition that leads to this stage."
                        severity="warning"
                    />
                </VStack>
            </ExplainProvider>
        ),
    ],
};

export const DisabledByDefault: Story = {
    decorators: [
        () => (
            <ExplainProvider defaultEnabled={false}>
                <VStack gap="md">
                    <ExplainToggle />
                    <ExplainAnnotation explanation="This won't show until you toggle the explain switch.">
                        <Card>
                            <CardContent>
                                <Typography variant="body2">
                                    Technical content here — toggle explain to see annotations
                                </Typography>
                            </CardContent>
                        </Card>
                    </ExplainAnnotation>
                </VStack>
            </ExplainProvider>
        ),
    ],
};
