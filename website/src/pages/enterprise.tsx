import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import {
  HeroSection as AlmadarHeroSection,
  ContentSection,
  FeatureGrid,
  PricingGrid,
  CTABanner,
  VStack,
  Typography,
  Box,
  Card,
  Icon,
} from "@almadar/ui/marketing";
import { CaseStudyCard } from "@almadar/ui/marketing";

const FEATURES = [
  {
    icon: "users",
    title: translate({ id: "enterprise.feature.collaboration.title", message: "Team Collaboration" }),
    description: translate({ id: "enterprise.feature.collaboration.description", message: "Work together on schemas with role-based access control, version history, and real-time collaboration." }),
  },
  {
    icon: "server",
    title: translate({ id: "enterprise.feature.deployment.title", message: "Private Deployments" }),
    description: translate({ id: "enterprise.feature.deployment.description", message: "Deploy on-premise or in your private cloud. Full control over your data and infrastructure." }),
  },
  {
    icon: "shield",
    title: translate({ id: "enterprise.feature.security.title", message: "Enterprise Security" }),
    description: translate({ id: "enterprise.feature.security.description", message: "SSO/SAML integration, audit logs, SOC 2 compliance, and advanced security controls." }),
  },
  {
    icon: "headphones",
    title: translate({ id: "enterprise.feature.support.title", message: "Priority Support" }),
    description: translate({ id: "enterprise.feature.support.description", message: "Dedicated support channels with guaranteed response times and direct access to our engineering team." }),
  },
  {
    icon: "graduation-cap",
    title: translate({ id: "enterprise.feature.training.title", message: "Custom Training" }),
    description: translate({ id: "enterprise.feature.training.description", message: "Onboarding programs, workshops, and custom training tailored to your team's needs." }),
  },
  {
    icon: "puzzle",
    title: translate({ id: "enterprise.feature.customization.title", message: "Custom Integrations" }),
    description: translate({ id: "enterprise.feature.customization.description", message: "Build custom integrators for your internal systems. We help you connect Almadar to your existing infrastructure." }),
  },
];

const SECURITY_CARDS = [
  {
    title: translate({ id: "enterprise.security.auth.title", message: "Authentication & Access" }),
    items: [
      translate({ id: "enterprise.security.auth.sso", message: "SSO via SAML 2.0 and OIDC" }),
      translate({ id: "enterprise.security.auth.rbac", message: "Role-based access control (RBAC)" }),
      translate({ id: "enterprise.security.auth.audit", message: "Immutable audit logs for all schema operations" }),
      translate({ id: "enterprise.security.auth.mfa", message: "Multi-factor authentication enforcement" }),
    ],
  },
  {
    title: translate({ id: "enterprise.security.compliance.title", message: "Compliance" }),
    items: [
      translate({ id: "enterprise.security.compliance.soc2", message: "SOC 2 Type II (in progress)" }),
      translate({ id: "enterprise.security.compliance.gdpr", message: "GDPR-compliant data handling" }),
      translate({ id: "enterprise.security.compliance.hipaa", message: "HIPAA-ready deployment options" }),
      translate({ id: "enterprise.security.compliance.gov", message: "Government and regulated industry support" }),
    ],
  },
  {
    title: translate({ id: "enterprise.security.ai.title", message: "AI Security (Upcoming)" }),
    items: [
      translate({ id: "enterprise.security.ai.icagi", message: "IC-AGI integration for schema validation and policy enforcement" }),
      translate({ id: "enterprise.security.ai.sandboxed", message: "Sandboxed AI generation with schema review gates" }),
      translate({ id: "enterprise.security.ai.audit", message: "AI decision audit trail" }),
      translate({ id: "enterprise.security.ai.policy", message: "Policy-as-code for AI-generated schemas" }),
    ],
  },
];

const PRICING_PLANS = [
  {
    name: translate({ id: "enterprise.pricing.team.title", message: "Team" }),
    price: translate({ id: "enterprise.pricing.contact", message: "Contact Us" }),
    description: translate({ id: "enterprise.pricing.team.description", message: "For small teams getting started" }),
    features: [
      translate({ id: "enterprise.pricing.team.feature1", message: "Up to 10 team members" }),
      translate({ id: "enterprise.pricing.team.feature2", message: "Shared schemas" }),
      translate({ id: "enterprise.pricing.team.feature3", message: "Email support" }),
      translate({ id: "enterprise.pricing.team.feature4", message: "Cloud deployment" }),
    ],
    action: { label: translate({ id: "enterprise.pricing.contact", message: "Contact Us" }), href: "#contact" },
    highlighted: false,
  },
  {
    name: translate({ id: "enterprise.pricing.business.title", message: "Business" }),
    price: translate({ id: "enterprise.pricing.contact", message: "Contact Us" }),
    description: translate({ id: "enterprise.pricing.business.description", message: "For growing organizations" }),
    features: [
      translate({ id: "enterprise.pricing.business.feature1", message: "Unlimited team members" }),
      translate({ id: "enterprise.pricing.business.feature2", message: "SSO/SAML integration" }),
      translate({ id: "enterprise.pricing.business.feature3", message: "Priority support" }),
      translate({ id: "enterprise.pricing.business.feature4", message: "Private cloud option" }),
      translate({ id: "enterprise.pricing.business.feature5", message: "Audit logs" }),
    ],
    action: { label: translate({ id: "enterprise.pricing.contact", message: "Contact Us" }), href: "#contact" },
    highlighted: true,
    badge: translate({ id: "enterprise.pricing.popular", message: "Most Popular" }),
  },
  {
    name: translate({ id: "enterprise.pricing.enterprise.title", message: "Enterprise" }),
    price: translate({ id: "enterprise.pricing.contact", message: "Contact Us" }),
    description: translate({ id: "enterprise.pricing.enterprise.description", message: "For large organizations" }),
    features: [
      translate({ id: "enterprise.pricing.enterprise.feature1", message: "On-premise deployment" }),
      translate({ id: "enterprise.pricing.enterprise.feature2", message: "Custom integrations" }),
      translate({ id: "enterprise.pricing.enterprise.feature3", message: "Dedicated support" }),
      translate({ id: "enterprise.pricing.enterprise.feature4", message: "SLA guarantee" }),
      translate({ id: "enterprise.pricing.enterprise.feature5", message: "Custom training" }),
    ],
    action: { label: translate({ id: "enterprise.pricing.contact", message: "Contact Us" }), href: "#contact" },
    highlighted: false,
  },
];

const CASE_STUDIES = [
  {
    title: translate({ id: "enterprise.cs.inspection.title", message: "Inspection System" }),
    description: translate({ id: "enterprise.cs.inspection.desc", message: "500+ inspections per day, 99.9% sync reliability, 60% reduction in compliance errors." }),
    category: translate({ id: "enterprise.cs.inspection.badge", message: "Field Ops" }),
    categoryColor: "#fb923c",
    href: "/case-studies/inspection",
    linkLabel: translate({ id: "enterprise.cs.readMore", message: "Read case study" }),
  },
  {
    title: translate({ id: "enterprise.cs.trainer.title", message: "Pro Trainer App" }),
    description: translate({ id: "enterprise.cs.trainer.desc", message: "70% reduction in admin time, 3x client capacity per trainer, 95% client retention rate." }),
    category: translate({ id: "enterprise.cs.trainer.badge", message: "Health & Fitness" }),
    categoryColor: "#34d399",
    href: "/case-studies/trainer",
    linkLabel: translate({ id: "enterprise.cs.readMore", message: "Read case study" }),
  },
];

export default function Enterprise(): ReactNode {
  return (
    <Layout
      title={translate({ id: "enterprise.meta.title", message: "Enterprise" })}
      description={translate({ id: "enterprise.meta.description", message: "Almadar Enterprise - Scale your development with enterprise-grade features" })}
    >
      <AlmadarHeroSection
        tag={translate({ id: "enterprise.tag", message: "Enterprise" })}
        title={translate({ id: "enterprise.title", message: "Almadar for Teams & Organizations" })}
        subtitle={translate({ id: "enterprise.subtitle", message: "Scale your development with enterprise-grade features, dedicated support, and custom deployment options." })}
        primaryAction={{ label: translate({ id: "enterprise.cta.contact", message: "Contact Sales" }), href: "#contact" }}
        secondaryAction={{ label: translate({ id: "enterprise.cta.docs", message: "View Documentation" }), href: "/developers" }}
      />

      <ContentSection>
        <VStack gap="lg" align="center" className="container">
          <VStack gap="sm" align="center">
            <Typography variant="h2">
              <Translate id="enterprise.features.title">Enterprise Features</Translate>
            </Typography>
            <Typography variant="body" color="muted">
              <Translate id="enterprise.features.subtitle">Everything you need to build at scale</Translate>
            </Typography>
          </VStack>
          <FeatureGrid items={FEATURES} columns={3} />
        </VStack>
      </ContentSection>

      <ContentSection background="alt">
        <VStack gap="lg" align="center" className="container">
          <VStack gap="sm" align="center">
            <Typography variant="h2">
              <Translate id="enterprise.security.title">Security & Compliance</Translate>
            </Typography>
            <Typography variant="body" color="muted">
              <Translate id="enterprise.security.subtitle">Built for regulated industries from day one</Translate>
            </Typography>
          </VStack>
          <FeatureGrid
            items={SECURITY_CARDS.map((card) => ({
              title: card.title,
              description: card.items.join(" | "),
              variant: "bordered" as const,
            }))}
            columns={3}
          />
        </VStack>
      </ContentSection>

      <ContentSection>
        <VStack gap="lg" align="center" className="container">
          <VStack gap="sm" align="center">
            <Typography variant="h2">
              <Translate id="enterprise.pricing.title">Flexible Pricing</Translate>
            </Typography>
            <Typography variant="body" color="muted">
              <Translate id="enterprise.pricing.subtitle">Plans that grow with your organization</Translate>
            </Typography>
          </VStack>
          <PricingGrid plans={PRICING_PLANS} />
        </VStack>
      </ContentSection>

      <ContentSection background="dark">
        <VStack gap="lg" align="center" className="container">
          <VStack gap="sm" align="center">
            <Typography variant="h2" className="text-[var(--color-background)]">
              <Translate id="enterprise.caseStudies.title">Proven in the Field</Translate>
            </Typography>
            <Typography variant="body" className="text-[var(--color-background)]/60">
              <Translate id="enterprise.caseStudies.subtitle">Real deployments built on Almadar</Translate>
            </Typography>
          </VStack>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {CASE_STUDIES.map((cs) => (
              <CaseStudyCard key={cs.href} {...cs} />
            ))}
          </Box>
        </VStack>
      </ContentSection>

      <CTABanner
        title={translate({ id: "enterprise.contact.title", message: "Ready to get started?" })}
        subtitle={translate({ id: "enterprise.contact.description", message: "Contact our sales team to discuss your requirements and get a custom quote." })}
        primaryAction={{ label: "hello@almadar.io", href: "mailto:hello@almadar.io" }}
        background="primary"
      />
    </Layout>
  );
}
