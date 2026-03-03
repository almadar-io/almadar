import type { Meta, StoryObj } from '@storybook/react';
import { StoryNarrativeView } from './StoryNarrativeView';

const meta: Meta<typeof StoryNarrativeView> = {
  title: 'KFlow/Molecules/Story/StoryNarrativeView',
  component: StoryNarrativeView,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StoryNarrativeView>;

export const Default: Story = {
  args: {
    scenes: [
      {
        title: 'Two Teams, One Mission',
        narrative: 'At Lockheed Martin in Denver, engineers built the spacecraft\'s thruster software. At NASA\'s Jet Propulsion Laboratory in Pasadena, navigators plotted its course. Both teams were brilliant. But they made one critical assumption about each other.',
      },
      {
        title: 'The Launch',
        narrative: 'December 11, 1998. The Mars Climate Orbiter launched perfectly. For nine months, it sailed through space, sending back data. The navigation team noticed small course deviations, but nothing alarming — they corrected with thruster burns.',
      },
      {
        title: 'Something Wrong',
        narrative: 'As the orbiter approached Mars, the deviations grew. Each thruster correction seemed slightly off. The navigation team ran their models again and again. The math was right. The data was clean. But the trajectory kept drifting.',
      },
      {
        title: 'Impact',
        narrative: 'On September 23, 1999, the orbiter began its insertion burn behind Mars. It never emerged. The spacecraft had descended to just 57 km above the surface — far below the 226 km planned orbit. Mars\' atmosphere tore it apart.',
      },
      {
        title: 'The Post-it Note',
        narrative: 'The investigation team found the bug in days. Lockheed\'s software output thruster force in **pound-force seconds**. NASA\'s navigation system expected **newton seconds**. One team used Imperial. The other used metric. Nobody checked. 1 lbf·s = 4.448 N·s. That factor of 4.448 cost $125 million.',
      },
    ],
  },
};

export const SingleScene: Story = {
  args: {
    scenes: [
      {
        title: 'The Discovery',
        narrative: 'A single scene story for testing minimal rendering.',
      },
    ],
  },
};
