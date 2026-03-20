import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import {
  HeroSection,
  ContentSection,
  FeatureGrid,
  CTABanner,
  VStack,
  Typography,
} from "@almadar/ui/marketing";

const CHANNELS = [
  {
    title: translate({ id: "contact.investors.title", message: "Investors" }),
    description: translate({ id: "contact.investors.desc", message: "We are building foundational infrastructure for AI-native software. If you invest in developer tools, AI infrastructure, or platform companies, we would like to talk." }),
  },
  {
    title: translate({ id: "contact.partnerships.title", message: "Partnerships" }),
    description: translate({ id: "contact.partnerships.desc", message: "System integrators, consultancies, and technology companies that want to build on or with the Almadar platform." }),
  },
  {
    title: translate({ id: "contact.enterprise.title", message: "Enterprise" }),
    description: translate({ id: "contact.enterprise.desc", message: "Custom deployments, dedicated infrastructure, and tailored AI models for large organizations." }),
  },
];

export default function Contact(): ReactNode {
  return (
    <Layout
      title={translate({ id: "contact.meta.title", message: "Contact — Almadar" })}
      description={translate({ id: "contact.meta.desc", message: "Investors, partnerships, and enterprise inquiries. hello@almadar.io" })}
    >
      <HeroSection
        title={translate({ id: "contact.hero.title", message: "Get in Touch" })}
        subtitle={translate({ id: "contact.hero.subtitle", message: "Investors, partnerships, and enterprise inquiries." })}
      />
      <ContentSection>
        <FeatureGrid items={CHANNELS} columns={3} />
      </ContentSection>
      <ContentSection background="alt">
        <VStack gap="md" align="center">
          <Typography variant="h2">
            <Translate id="contact.email.title">Write to Us</Translate>
          </Typography>
          <Typography variant="body">
            <Translate id="contact.email.text">For any inquiry, reach us directly at:</Translate>
          </Typography>
          <Link href="mailto:hello@almadar.io">
            <Typography variant="h3" color="primary">hello@almadar.io</Typography>
          </Link>
        </VStack>
      </ContentSection>
    </Layout>
  );
}
