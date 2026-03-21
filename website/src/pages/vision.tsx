import React from "react";
import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import {
  HeroSection,
  ArticleSection,
  SplitSection,
  CTABanner,
  ContentSection,
  Typography,
  PullQuote,
  GradientDivider,
  Box,
} from "@almadar/ui/marketing";
import { ComposableModels, CommunityOwnership, WorldModel } from "@almadar/ui/illustrations";

export default function Vision(): ReactNode {
  return (
    <Layout
      title={translate({ id: "vision.meta.title", message: "Vision — A Shared Digital Reality" })}
      description={translate({ id: "vision.meta.desc", message: "Software that coexists, coordinates, and evolves together. Communities keeping ownership. Composable world models." })}
    >
      <HeroSection
        title={translate({ id: "vision.hero.title", message: "A Shared Digital Reality" })}
        subtitle={translate({ id: "vision.hero.subtitle", message: "Software that coexists, coordinates, and evolves together." })}
      />

      <ContentSection>
        <ArticleSection title={translate({ id: "vision.coexist.title", message: "Software That Coexists" })}>
          <Typography variant="body">
            <Translate id="vision.coexist.p1">
              Today, every application is an island. It has its own data model, its own rules, its own language. Moving information between systems means building bridges that break every time either side changes.
            </Translate>
          </Typography>
          <Typography variant="body">
            <Translate id="vision.coexist.p2">
              We believe software should share a common grammar. The idea flows seamlessly: a nurse identifies a need on the floor, and that domain knowledge translates directly into .orb. Data flows without translation layers. Rules compose without glue code.
            </Translate>
          </Typography>
          <PullQuote>
            {translate({ id: "vision.coexist.pullquote", message: "Domain knowledge translates directly into code. No translation layers. No glue code." })}
          </PullQuote>
          <Box className="flex justify-center py-8"><ComposableModels className="w-full max-w-md" /></Box>
        </ArticleSection>
      </ContentSection>

      <GradientDivider />

      <ContentSection background="alt">
        <ArticleSection title={translate({ id: "vision.ownership.title", message: "Communities Keep Ownership" })}>
          <Typography variant="body">
            <Translate id="vision.ownership.p1">
              The current model concentrates power and wastes immense resources. A few platforms own the tools, the data, and the distribution, creating heavy, inefficient silos. Communities that build on those platforms rent their digital presence at a high cost, both financially and ecologically.
            </Translate>
          </Typography>
          <Typography variant="body">
            <Translate id="vision.ownership.p2">
              Almadar changes this with an efficiency-first, "Go Green" philosophy. Orb is open source. The standard library is open source. When a community describes their domain in Orb, they build lightweight, efficient models that they own. They can compile it to any platform, host it sustainably anywhere, and evolve it on their own terms.
            </Translate>
          </Typography>
          <PullQuote>
            {translate({ id: "vision.ownership.pullquote", message: "Communities build lightweight models they own. Compile to any platform. Evolve on their own terms." })}
          </PullQuote>
          <Box className="flex justify-center py-8"><CommunityOwnership className="w-full max-w-md" /></Box>
        </ArticleSection>
      </ContentSection>

      <GradientDivider />

      <ContentSection>
        <SplitSection
          title={translate({ id: "vision.models.title", message: "Composable World Models" })}
          description={
            <>
              <Typography variant="body" color="muted">
                <Translate id="vision.models.p1">A world model is a formal description of how a domain works: what exists, how it changes, what the rules are. In .orb, a healthcare scheduling system and an inventory tracker are both world models. They can be validated independently and composed together.</Translate>
              </Typography>
              <Typography variant="body">
                <Translate id="vision.models.p2">
                  This is the long game. When enough domains have formal models, software stops being a collection of isolated programs and becomes a shared, interoperable digital reality. Each model is a building block. Each composition creates something new.
                </Translate>
              </Typography>
            </>
          }
          imagePosition="right"
        >
          <Box className="flex justify-center py-8"><WorldModel className="w-full max-w-md" /></Box>
        </SplitSection>
      </ContentSection>

      <CTABanner
        title={translate({ id: "vision.cta.title", message: "Build With Us" })}
        subtitle={translate({ id: "vision.cta.text", message: "The shared digital reality starts with the first model. Write yours." })}
        primaryAction={{ label: translate({ id: "vision.cta.language", message: "Explore the Language" }), href: "https://orb.almadar.io" }}
        secondaryAction={{ label: translate({ id: "vision.cta.contact", message: "Get in Touch" }), href: "/contact" }}
        background="dark"
      />
    </Layout>
  );
}
