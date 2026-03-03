import type { Meta, StoryObj } from '@storybook/react';
import { KnowledgeStoryTemplate } from '../../../../KnowledgeStoryTemplate';
import type { KnowledgeStoryEntity } from '../../../../KnowledgeStoryTemplate';

const CDN = 'https://almadar-kflow-assets.web.app';

const storyEntity: KnowledgeStoryEntity = {
  id: 'the-grain-counter',
  title: 'The Grain Counter',
  teaser: 'What if nobody could prove how much grain the temple actually had?',
  domain: 'history',
  difficulty: 'beginner',
  duration: 10,
  coverImage: `${CDN}/stories/the-grain-counter/cover.png`,
  hookQuestion: 'What if nobody could prove how much grain the temple actually had?',
  hookNarrative: "Around 3000 BCE in the city of Uruk, temples were the centre of economic life. They collected grain, distributed rations, and managed livestock. But as the city grew from hundreds to tens of thousands, memory failed. A priest couldn't remember whether 40 or 400 bushels went to the northern district. Arguments erupted. Trust eroded. The solution? Clay tablets — humanity's first spreadsheets.",
  scenes: [
    { title: 'The Temple Economy', narrative: "By 3500 BCE, Uruk had grown into one of the world's first cities — perhaps 40,000 people. At its centre stood the temple, the economic engine of the entire city. Managing an economy this large created a problem no one had faced before: how do you keep track of thousands of transactions when your only tool is human memory?", illustration: '' },
    { title: 'The Token System', narrative: "Sumerian accountants used small clay tokens — each shape representing a specific commodity. A cone meant a small measure of grain, a sphere meant a large measure. To create a tamper-proof receipt, they sealed the tokens inside a hollow clay ball called a bulla, stamped with the merchant's cylinder seal.", illustration: '' },
    { title: 'The First Writing', narrative: "Around 3100 BCE, a scribe realized: instead of sealing tokens inside a bulla, why not press the token shapes into the outside of the clay? Soon, the impressions on flat clay tablets were enough. Proto-cuneiform was born. The oldest known writing in human history is a list of barley rations. Writing was invented for bookkeeping.", illustration: '' },
    { title: 'The Audit Trail', narrative: "By 2600 BCE, Sumerian record-keeping had become sophisticated. Temple archives contained thousands of tablets. Scribal schools trained professional accountants who learned standardised measures: the sila (about a litre), the ban (10 sila), and the gur (300 sila). Multiple scribes recorded the same transactions independently — the world's first audit system.", illustration: '' },
    { title: 'Trust at Scale', narrative: "The Code of Hammurabi around 1750 BCE codified 282 laws governing debts, interest rates, wages, and contracts. A merchant who couldn't produce written proof of a debt lost the case. The principle was revolutionary: disputes were settled by what the records showed, not by who was more powerful.", illustration: `${CDN}/stories/the-grain-counter/scenes/scene-5.png` },
  ],
  principle: 'Institutional Trust Through Records',
  explanation: "The Sumerians didn't invent writing to tell stories — they invented it to count grain. When a community grows beyond where everyone knows everyone, trust breaks down. Records — permanent, verifiable, tamper-resistant — are what allow strangers to trust each other. The same principle drives modern banks, courts, and blockchains.",
  pattern: "Trust scales through verifiable records. From clay tablets to databases to blockchains, every civilisation builds systems to answer: 'Can you prove it?'",
  tryItQuestion: 'Why did Sumerian accountants seal clay tokens inside a hollow clay ball (bulla)?',
  tryItOptions: [
    'To create a tamper-proof receipt — breaking the seal proved whether the contents were changed',
    'To protect the tokens from water damage during the rainy season',
    'To make the tokens easier to transport over long distances',
    'To keep the token shapes secret from competing merchants',
  ],
  tryItCorrectIndex: 0,
  gameType: 'classifier',
  gameConfig: {
    id: 'records-vs-memory',
    title: 'Records vs Memory',
    description: 'Sort methods of tracking agreements into the correct category: Physical Record or Memory/Oral.',
    items: [
      { id: 'clay-token', label: 'Clay token sealed in a bulla', description: 'The sealed bulla is a tamper-evident physical record.', correctCategory: 'physical-record' },
      { id: 'cuneiform-tablet', label: 'Cuneiform tablet listing grain rations', description: 'Clay tablets are permanent records. Many survive 5,000 years.', correctCategory: 'physical-record' },
      { id: 'elder-testimony', label: "An elder's testimony about a deal", description: "Oral testimony depends on one person's memory.", correctCategory: 'memory-oral' },
      { id: 'bards-song', label: "A bard's song about a king's victory", description: 'Songs preserve stories but change with each retelling.', correctCategory: 'memory-oral' },
      { id: 'papyrus-scroll', label: 'A papyrus scroll recording a land sale', description: 'Written documents on papyrus served as legal proof.', correctCategory: 'physical-record' },
      { id: 'ritual-chant', label: 'A ritual chant listing tribal ancestors', description: 'Ritual chants depend on unbroken transmission and drift over time.', correctCategory: 'memory-oral' },
      { id: 'sealed-envelope', label: 'A sealed clay envelope with a contract inside', description: 'Sealed envelopes protected inner tablets from tampering.', correctCategory: 'physical-record' },
      { id: 'trade-custom', label: "An unwritten trade custom ('we always pay in silver')", description: "Customs work in small communities but can't scale.", correctCategory: 'memory-oral' },
    ],
    categories: [
      { id: 'physical-record', label: 'Physical Record' },
      { id: 'memory-oral', label: 'Memory/Oral' },
    ],
    successMessage: "Well done! You've discovered why civilisations invest in record-keeping systems.",
    failMessage: 'Think about permanence and verifiability.',
    hint: "Ask: if there's a dispute in 10 years, can you go back and check this?",
  },
  assets: {
    terrain: {},
    effects: {},
    worldMapFeatures: {},
    audio: {
      music: `${CDN}/shared/audio/music/alpha-dance.ogg`,
      sfx: {
        stepAdvance: `${CDN}/shared/audio/sfx/confirmation_001.ogg`,
        correctAnswer: `${CDN}/shared/audio/sfx/jingles-hit_00.ogg`,
        wrongAnswer: `${CDN}/shared/audio/sfx/error_001.ogg`,
        gameComplete: `${CDN}/shared/audio/sfx/upgrade1.ogg`,
        uiClick: `${CDN}/shared/audio/sfx/select_001.ogg`,
      },
    },
  },
  resolution: "From clay tokens sealed inside hollow balls to the Code of Hammurabi carved in stone, the ancient Mesopotamians discovered a principle that still governs every institution on Earth: trust doesn't scale on memory alone. Records — permanent, verifiable, tamper-resistant — are what allow strangers to trust each other.",
  learningPoints: [
    'Writing was invented for accounting, not literature — the oldest known texts are lists of grain rations',
    'Clay tokens sealed in bullae were the first tamper-proof receipts',
    'Standardised measures (sila, ban, gur) enabled consistent accounting across civilisation',
    "Independent scribes recording the same transactions created the first audit systems",
    'The Code of Hammurabi established that written records, not oral testimony, determined legal outcomes',
  ],
  currentStep: 0,
};

const meta: Meta<typeof KnowledgeStoryTemplate> = {
  title: 'KFlow/KnowledgeStory/S0 Origins/S1/E1/The Grain Counter',
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
      gameResult: { score: 100, time: 55, attempts: 1 },
      isComplete: true,
    },
  },
};
