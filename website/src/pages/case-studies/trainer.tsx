import React from "react";
import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import {
  HeroSection,
  ContentSection,
  ArticleSection,
  CTABanner,
  Typography,
  VStack,
  GradientDivider,
  AnimatedCounter,
  SimpleGrid,
} from "@almadar/ui/marketing";

const RESULTS = [
  { value: "70%", label: translate({ id: "cs.trainer.stat.admin", message: "Reduction in admin time" }) },
  { value: "3x", label: translate({ id: "cs.trainer.stat.capacity", message: "Client capacity per trainer" }) },
  { value: "95%", label: translate({ id: "cs.trainer.stat.retention", message: "Client retention rate" }) },
];

export default function TrainerCaseStudy(): ReactNode {
  return (
    <Layout
      title={translate({ id: "cs.trainer.meta.title", message: "Pro Trainer App — Almadar Case Study" })}
      description={translate({ id: "cs.trainer.meta.desc", message: "How we built a trainer management app that separates coaching logic from billing using Orbitals." })}
    >
      <HeroSection
        tag={translate({ id: "cs.trainer.badge", message: "Health & Fitness" })}
        tagVariant="accent"
        title={translate({ id: "cs.trainer.title", message: "Pro Trainer App" })}
        subtitle={translate({ id: "cs.trainer.subtitle", message: "Allow trainers to manage remote clients without admin burnout." })}
      />

      <ContentSection>
        <ArticleSection title={translate({ id: "cs.trainer.challenge.label", message: "The Challenge" })}>
          <Typography variant="body">
            <Translate id="cs.trainer.challenge.desc">
              Personal trainers were spending more time on admin than coaching. They needed a system to manage workout plans, track client progress, and handle billing -- all in one place, without the complexity.
            </Translate>
          </Typography>
        </ArticleSection>
      </ContentSection>

      <ContentSection background="alt">
        <ArticleSection title={translate({ id: "cs.trainer.solution.label", message: "The Solution" })}>
          <Typography variant="body">
            <Translate id="cs.trainer.solution.desc">
              Workout Plans are compositions of exercise patterns. Coaching logic is separated from Billing. Each concern is its own Orbital that can evolve independently.
            </Translate>
          </Typography>
          <VStack gap="sm">
            <Typography variant="body">
              <strong><Translate id="cs.trainer.orbital1.name">Client Entity:</Translate></strong>{" "}
              <Translate id="cs.trainer.orbital1.desc">Core profile and goal tracking</Translate>
            </Typography>
            <Typography variant="body">
              <strong><Translate id="cs.trainer.orbital2.name">Workout Plan Orbital:</Translate></strong>{" "}
              <Translate id="cs.trainer.orbital2.desc">Composable exercise templates</Translate>
            </Typography>
            <Typography variant="body">
              <strong><Translate id="cs.trainer.orbital3.name">Progress Tracking Orbital:</Translate></strong>{" "}
              <Translate id="cs.trainer.orbital3.desc">Metrics, photos, measurements</Translate>
            </Typography>
            <Typography variant="body">
              <strong><Translate id="cs.trainer.orbital4.name">Billing Orbital:</Translate></strong>{" "}
              <Translate id="cs.trainer.orbital4.desc">Subscription and payment handling</Translate>
            </Typography>
          </VStack>
        </ArticleSection>
      </ContentSection>

      <ContentSection>
        <ArticleSection title={translate({ id: "cs.trainer.future.label", message: "Future-Proofing" })}>
          <Typography variant="body">
            <Translate id="cs.trainer.future.desc">
              As fitness metrics evolve, new data Orbitals are attached without breaking core app logic. When the client wanted to add wearable device integration, we simply attached a new Wearable Sync Orbital.
            </Translate>
          </Typography>
        </ArticleSection>
      </ContentSection>

      <GradientDivider />

      <ContentSection background="alt" padding="lg">
        <SimpleGrid cols={3} gap="lg" className="w-full">
          {RESULTS.map((stat) => (
            <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </SimpleGrid>
      </ContentSection>

      <CTABanner
        title={translate({ id: "cs.trainer.cta.title", message: "Building Something Similar?" })}
        subtitle={translate({ id: "cs.trainer.cta.desc", message: "Let's discuss how Orbitals can streamline your service business." })}
        primaryAction={{ label: "hello@almadar.io", href: "mailto:hello@almadar.io" }}
        background="dark"
      />
    </Layout>
  );
}
