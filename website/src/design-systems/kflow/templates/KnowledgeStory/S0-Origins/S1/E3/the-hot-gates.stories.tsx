import type { Meta, StoryObj } from '@storybook/react';
import { KnowledgeStoryTemplate } from '../../../../KnowledgeStoryTemplate';
import type { KnowledgeStoryEntity } from '../../../../KnowledgeStoryTemplate';

const CDN = 'https://almadar-kflow-assets.web.app';

const storyEntity: KnowledgeStoryEntity = {
  id: 'hot-gates',
  title: 'The Hot Gates',
  teaser: 'How 300 Spartans held the line against an empire',
  domain: 'history',
  difficulty: 'intermediate',
  duration: 15,
  coverImage: `${CDN}/stories/the-hot-gates/cover.png`,
  hookQuestion: 'How did 300 warriors hold off 100,000?',
  hookNarrative: "In 480 BC, King Leonidas of Sparta led a small force to a narrow coastal pass called Thermopylae — the Hot Gates. What followed became history's most famous last stand.",
  scenes: [
    { title: 'The Persian Invasion', narrative: 'Xerxes I assembled the largest army the ancient world had ever seen. Estimates range from 100,000 to over a million soldiers, marching toward Greece.', illustration: `${CDN}/stories/the-hot-gates/scenes/scene-1.png` },
    { title: 'The Narrow Pass', narrative: "Thermopylae was a coastal pass barely wide enough for a wagon. Leonidas chose this ground deliberately — the Persians' numerical advantage meant nothing in such tight quarters.", illustration: `${CDN}/stories/the-hot-gates/scenes/scene-2.png` },
    { title: 'Three Days of Battle', narrative: "For three days, the Greeks held. The Persian Immortals, Xerxes' elite guard, were thrown back again and again. The narrow pass turned every engagement into a few dozen fighters at a time.", illustration: `${CDN}/stories/the-hot-gates/scenes/scene-3.png` },
    { title: 'Betrayal', narrative: 'A local traitor named Ephialtes revealed a mountain path that bypassed the Greek position. Leonidas learned of the betrayal and sent most of the army away.', illustration: `${CDN}/stories/the-hot-gates/scenes/scene-4.png` },
    { title: 'The Last Stand', narrative: 'Leonidas and his 300 Spartans, along with 700 Thespians, stayed behind. They fought to the last man, buying time for Greece to prepare its defense.', illustration: `${CDN}/stories/the-hot-gates/scenes/scene-5.png` },
  ],
  principle: 'Force Multipliers — Terrain as Strategy',
  explanation: "When outnumbered, **change the rules of engagement**. Leonidas didn't try to match Persian numbers — he found terrain that negated them. In any system, constraints can be turned into advantages.",
  pattern: '**When facing overwhelming force:**\n1. Identify the bottleneck\n2. Position at the narrowest point\n3. Force sequential engagement\n4. Trade time for strategic advantage',
  tryItQuestion: "A small startup competes against a tech giant. Which strategy mirrors Thermopylae?",
  tryItOptions: [
    'Build a general-purpose product to compete on all fronts',
    "Focus on a narrow niche where the giant's scale is irrelevant",
    'Hire as many engineers as possible to match their output',
    'Copy their product exactly but charge less',
  ],
  tryItCorrectIndex: 1,
  gameType: 'battle',
  gameConfig: {
    id: 'thermopylae',
    tiles: [],
    units: [
      { id: 'leonidas', name: 'Leonidas', team: 'player' as const, sprite: `${CDN}/stories/the-hot-gates/game/leonidas.png`, position: { x: 3, y: 6 }, health: 100, maxHealth: 100, movement: 2, attack: 30, defense: 25 },
      { id: 'hoplite-1', name: 'Hoplite', team: 'player' as const, sprite: `${CDN}/stories/the-hot-gates/game/hoplite.png`, position: { x: 4, y: 6 }, health: 80, maxHealth: 80, movement: 3, attack: 20, defense: 20 },
      { id: 'persian-1', name: 'Immortal', team: 'enemy' as const, sprite: `${CDN}/stories/the-hot-gates/game/immortal.png`, position: { x: 3, y: 1 }, health: 60, maxHealth: 60, movement: 3, attack: 25, defense: 10 },
      { id: 'persian-2', name: 'Archer', team: 'enemy' as const, sprite: `${CDN}/stories/the-hot-gates/game/archer.png`, position: { x: 5, y: 0 }, health: 40, maxHealth: 40, movement: 2, attack: 30, defense: 5 },
    ],
    phase: 'selection' as const,
    turn: 1,
    gameResult: null,
    selectedUnitId: null,
  },
  assets: {
    terrain: {
      plains: `${CDN}/shared/terrain/Isometric/dirt_E.png`,
      stone: `${CDN}/shared/terrain/Isometric/stoneInset_E.png`,
      mountains: `${CDN}/shared/terrain/Isometric/stoneColumn_E.png`,
      water: `${CDN}/shared/terrain/Isometric/planks_E.png`,
    },
    effects: {
      slash: Array.from({ length: 4 }, (_, i) => `${CDN}/shared/effects/particles/slash_0${i + 1}.png`),
      smoke: Array.from({ length: 10 }, (_, i) => `${CDN}/shared/effects/particles/smoke_${String(i + 1).padStart(2, '0')}.png`),
      fire: Array.from({ length: 2 }, (_, i) => `${CDN}/shared/effects/particles/fire_0${i + 1}.png`),
    },
    worldMapFeatures: {},
    audio: {
      music: `${CDN}/shared/audio/music/mischief-stroll.ogg`,
      sfx: {
        stepAdvance: `${CDN}/shared/audio/sfx/confirmation_001.ogg`,
        correctAnswer: `${CDN}/shared/audio/sfx/jingles-hit_00.ogg`,
        wrongAnswer: `${CDN}/shared/audio/sfx/error_001.ogg`,
        gameComplete: `${CDN}/shared/audio/sfx/upgrade1.ogg`,
        attack: `${CDN}/shared/audio/sfx/woosh1.ogg`,
        heroMove: `${CDN}/shared/audio/sfx/footstep00.ogg`,
        uiClick: `${CDN}/shared/audio/sfx/select_001.ogg`,
      },
    },
  },
  resolution: "You held the Hot Gates. Leonidas' sacrifice gave Greece time to unite. The Persian fleet was destroyed at Salamis weeks later, and the invasion ended. Sometimes the greatest victory is buying time for others.",
  learningPoints: [
    'Terrain and positioning can negate numerical superiority',
    'Force multipliers work in business, engineering, and warfare',
    'Strategic sacrifice can create outsized impact',
    'Constraints are often hidden advantages',
  ],
  currentStep: 0,
};

const meta: Meta<typeof KnowledgeStoryTemplate> = {
  title: 'KFlow/KnowledgeStory/S0 Origins/S1/E3/The Hot Gates',
  component: KnowledgeStoryTemplate,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof KnowledgeStoryTemplate>;

export const Hook: Story = { args: { entity: { ...storyEntity, currentStep: 0 } } };
export const Narrative: Story = { args: { entity: { ...storyEntity, currentStep: 1 } } };
export const Lesson: Story = { args: { entity: { ...storyEntity, currentStep: 2 } } };
export const Game: Story = { args: { entity: { ...storyEntity, currentStep: 3 } } };
export const Reward: Story = {
  args: {
    entity: {
      ...storyEntity,
      currentStep: 4,
      gameResult: { score: 100, time: 180, attempts: 2 },
      isComplete: true,
    },
  },
};
