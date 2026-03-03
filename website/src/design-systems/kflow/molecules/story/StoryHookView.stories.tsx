import type { Meta, StoryObj } from '@storybook/react';
import { StoryHookView } from './StoryHookView';

const meta: Meta<typeof StoryHookView> = {
  title: 'KFlow/Molecules/Story/StoryHookView',
  component: StoryHookView,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StoryHookView>;

export const Default: Story = {
  args: {
    hookQuestion: 'Why did NASA lose a $125 million Mars orbiter?',
    hookNarrative: 'In 1999, the Mars Climate Orbiter approached the Red Planet after a 9-month journey. Mission control held their breath. Then \u2014 silence. The spacecraft was gone. The investigation revealed a mistake so simple, it could fit on a post-it note.',
    title: 'The $125 Million Bug',
    domain: 'natural',
    difficulty: 'beginner',
    duration: 12,
    onBegin: () => {},
  },
};

export const WithCoverImage: Story = {
  args: {
    ...Default.args,
    coverImage: 'https://placehold.co/800x300/1a1a2e/ffffff?text=Mars+Climate+Orbiter',
  },
};

export const Advanced: Story = {
  args: {
    hookQuestion: 'Can two rational opponents always find a better deal?',
    hookNarrative: 'In 1950, two RAND Corporation scientists posed a puzzle that would reshape economics, politics, and evolutionary biology. The answer defied common sense \u2014 and won a Nobel Prize.',
    title: "The Prisoner's Choice",
    domain: 'formal',
    difficulty: 'advanced',
    duration: 15,
    onBegin: () => {},
  },
};

/* ── Game Type Icon Variants ───────────────────────────────── */

export const BattleIcon: Story = {
  name: 'Game Icon: Battle',
  args: {
    hookQuestion: 'How did 300 Spartans hold a narrow pass against 100,000 Persians?',
    hookNarrative: 'In 480 BCE, King Leonidas led 300 Spartans to the narrow coastal pass of Thermopylae. The geography turned overwhelming numbers into a disadvantage.',
    title: 'The Hot Gates',
    domain: 'social',
    difficulty: 'intermediate',
    duration: 15,
    gameType: 'battle',
    onBegin: () => {},
  },
};

export const AdventureIcon: Story = {
  name: 'Game Icon: Adventure',
  args: {
    hookQuestion: 'How did merchants navigate 7,000 km of desert without GPS?',
    hookNarrative: 'The Silk Road stretched from Chang\'an to Constantinople. Merchants carried silk, spices, and ideas across deserts and mountain passes, guided only by stars and oases.',
    title: 'The Silk Road',
    domain: 'social',
    difficulty: 'intermediate',
    duration: 12,
    gameType: 'adventure',
    onBegin: () => {},
  },
};

export const EventHandlerIcon: Story = {
  name: 'Game Icon: Event Handler',
  args: {
    hookQuestion: 'How does a thermostat keep your room at exactly 21\u00B0C?',
    hookNarrative: 'A thermostat is an event-driven system. Temperature changes trigger actions: heater on, fan on, both off. The rules are simple, but getting them right is the difference between comfort and chaos.',
    title: 'The Smart Thermostat',
    domain: 'formal',
    difficulty: 'beginner',
    duration: 8,
    gameType: 'event-handler',
    onBegin: () => {},
  },
};

export const StateArchitectIcon: Story = {
  name: 'Game Icon: State Architect',
  args: {
    hookQuestion: 'Why do traffic lights need exactly three states?',
    hookNarrative: 'Every traffic light is a finite state machine. GREEN, YELLOW, RED \u2014 each state has rules about what happens next. Get the transitions wrong and cars collide.',
    title: 'The Traffic Light',
    domain: 'formal',
    difficulty: 'beginner',
    duration: 10,
    gameType: 'state-architect',
    onBegin: () => {},
  },
};

export const PhysicsLabIcon: Story = {
  name: 'Game Icon: Physics Lab',
  args: {
    hookQuestion: 'At what angle should you throw a ball to make it go the farthest?',
    hookNarrative: 'Galileo studied projectiles by rolling balls down ramps. The answer involves a surprising trade-off between height and distance \u2014 and a number that appears everywhere in nature.',
    title: 'The Perfect Throw',
    domain: 'natural',
    difficulty: 'beginner',
    duration: 10,
    gameType: 'physics-lab',
    onBegin: () => {},
  },
};
