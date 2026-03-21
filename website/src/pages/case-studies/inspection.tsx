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
  { value: "500+", label: translate({ id: "cs.inspection.stat.inspections", message: "Inspections per day" }) },
  { value: "99.9%", label: translate({ id: "cs.inspection.stat.sync", message: "Sync reliability" }) },
  { value: "60%", label: translate({ id: "cs.inspection.stat.errors", message: "Reduction in compliance errors" }) },
];

export default function InspectionCaseStudy(): ReactNode {
  return (
    <Layout
      title={translate({ id: "cs.inspection.meta.title", message: "Inspection System — Almadar Case Study" })}
      description={translate({ id: "cs.inspection.meta.desc", message: "How we digitized thousands of paper inspections with full offline reliability using Orbitals." })}
    >
      <HeroSection
        tag={translate({ id: "cs.inspection.badge", message: "Field Ops" })}
        tagVariant="accent"
        title={translate({ id: "cs.inspection.title", message: "Inspection System" })}
        subtitle={translate({ id: "cs.inspection.subtitle", message: "Digitizing thousands of paper inspections with full offline reliability." })}
      />

      <ContentSection>
        <ArticleSection title={translate({ id: "cs.inspection.challenge.label", message: "The Challenge" })}>
          <Typography variant="body">
            <Translate id="cs.inspection.challenge.desc">
              The client needed to digitize their paper-based inspection process. Field inspectors work in remote locations with unreliable connectivity. They needed a system that would work offline and sync reliably when back online.
            </Translate>
          </Typography>
        </ArticleSection>
      </ContentSection>

      <ContentSection background="alt">
        <ArticleSection title={translate({ id: "cs.inspection.solution.label", message: "The Solution" })}>
          <Typography variant="body">
            <Translate id="cs.inspection.solution.desc">
              We mapped Inspection as a stable Entity, wrapped in GeoLocation and Sync Orbitals. Each inspection captures location data automatically and syncs in the background when connectivity is restored.
            </Translate>
          </Typography>
          <VStack gap="sm">
            <Typography variant="body">
              <strong><Translate id="cs.inspection.orbital1.name">Inspection Entity:</Translate></strong>{" "}
              <Translate id="cs.inspection.orbital1.desc">Core data structure for all inspection types</Translate>
            </Typography>
            <Typography variant="body">
              <strong><Translate id="cs.inspection.orbital2.name">GeoLocation Orbital:</Translate></strong>{" "}
              <Translate id="cs.inspection.orbital2.desc">Automatic location capture and validation</Translate>
            </Typography>
            <Typography variant="body">
              <strong><Translate id="cs.inspection.orbital3.name">Sync Orbital:</Translate></strong>{" "}
              <Translate id="cs.inspection.orbital3.desc">Background synchronization with conflict resolution</Translate>
            </Typography>
            <Typography variant="body">
              <strong><Translate id="cs.inspection.orbital4.name">Approval Orbital:</Translate></strong>{" "}
              <Translate id="cs.inspection.orbital4.desc">Supervisor review and sign-off workflow</Translate>
            </Typography>
          </VStack>
        </ArticleSection>
      </ContentSection>

      <ContentSection>
        <ArticleSection title={translate({ id: "cs.inspection.future.label", message: "Future-Proofing" })}>
          <Typography variant="body">
            <Translate id="cs.inspection.future.desc">
              New compliance rules are added as single Orbitals, instantly propagating to all field units. When regulations change, we simply attach a new validation Orbital -- no need to rewrite the core inspection logic.
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
        title={translate({ id: "cs.inspection.cta.title", message: "Have a Similar Challenge?" })}
        subtitle={translate({ id: "cs.inspection.cta.desc", message: "Let's discuss how Orbitals can solve your field operations challenges." })}
        primaryAction={{ label: "hello@almadar.io", href: "mailto:hello@almadar.io" }}
        background="dark"
      />
    </Layout>
  );
}
