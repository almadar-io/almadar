import type { Meta, StoryObj } from '@storybook/react';
import { KnowledgeStoryTemplate } from '../../../KnowledgeStoryTemplate';
import { extractStoryEntity } from '../../../../utils/orbEntityLoader';
import type { LocaleOrbMap } from '../../../../utils/orbEntityLoader';
import orbEn from '../../../../../stories/series-1-code/S2-modern-era/microsofts-answer.orb';
import orbAr from '../../../../../stories/series-1-code/S2-modern-era/microsofts-answer.ar.orb';
import orbSl from '../../../../../stories/series-1-code/S2-modern-era/microsofts-answer.sl.orb';

const orbs: LocaleOrbMap = { en: orbEn, ar: orbAr, sl: orbSl };

const meta: Meta<typeof KnowledgeStoryTemplate> = {
  title: "KFlow/KnowledgeStory/S1 Code/S2 Modern Era/Microsoft's Answer",
  component: KnowledgeStoryTemplate,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof KnowledgeStoryTemplate>;

export const Hook: Story = {
  render: (_args, ctx) => {
    const entity = extractStoryEntity(orbs, ctx.globals.locale);
    return <KnowledgeStoryTemplate entity={{ ...entity, currentStep: 0 }} />;
  },
};
export const Narrative: Story = {
  render: (_args, ctx) => {
    const entity = extractStoryEntity(orbs, ctx.globals.locale);
    return <KnowledgeStoryTemplate entity={{ ...entity, currentStep: 1 }} />;
  },
};
export const Lesson: Story = {
  render: (_args, ctx) => {
    const entity = extractStoryEntity(orbs, ctx.globals.locale);
    return <KnowledgeStoryTemplate entity={{ ...entity, currentStep: 2 }} />;
  },
};
export const Game: Story = {
  render: (_args, ctx) => {
    const entity = extractStoryEntity(orbs, ctx.globals.locale);
    return <KnowledgeStoryTemplate entity={{ ...entity, currentStep: 3 }} />;
  },
};
export const Reward: Story = {
  render: (_args, ctx) => {
    const entity = extractStoryEntity(orbs, ctx.globals.locale);
    return <KnowledgeStoryTemplate entity={{ ...entity, currentStep: 4, gameResult: { score: 100, time: 60, attempts: 1 }, isComplete: true }} />;
  },
};
