import React from "react";
import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import {
  Box,
  VStack,
  HStack,
  Typography,
  Badge,
  Button,
  Icon,
  Card,
  SimpleGrid,
} from "@almadar/ui/marketing";
import { AvlApplication, AvlOrbital, AvlEntity } from "@almadar/ui/illustrations";

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
    href: "#contact",
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
    href: "#contact",
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
    href: "#contact",
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
      <Box as="header" className="w-full min-h-[60vh] flex items-center relative overflow-hidden">
        <Box className="absolute right-8 top-1/2 -translate-y-1/2 w-[45%] max-h-[80%] opacity-30 pointer-events-none hidden lg:flex items-center">
          <svg viewBox="0 0 600 400" fill="none" className="w-full">
            <AvlApplication x={20} y={20} width={560} height={360} label="Enterprise" />
            <AvlOrbital cx={150} cy={200} r={80} label="Tenant A" />
            <AvlEntity x={150} y={200} r={25} fieldCount={4} />
            <AvlOrbital cx={300} cy={140} r={70} label="Tenant B" />
            <AvlEntity x={300} y={140} r={20} fieldCount={3} />
            <AvlOrbital cx={450} cy={220} r={75} label="Tenant C" />
            <AvlEntity x={450} y={220} r={22} fieldCount={5} />
          </svg>
        </Box>
        <Box className="site-container py-20 relative z-10">
          <VStack gap="lg" align="center">
            <Badge variant="primary">{translate({ id: "enterprise.tag", message: "Enterprise" })}</Badge>
            <Typography variant="h1" align="center">
              {translate({ id: "enterprise.title", message: "Almadar for Teams & Organizations" })}
            </Typography>
            <Typography variant="body1" color="muted" align="center">
              {translate({ id: "enterprise.subtitle", message: "Scale your development with enterprise-grade features, dedicated support, and custom deployment options." })}
            </Typography>
            <HStack gap="md">
              <a href="#contact"><Button variant="primary" size="lg">{translate({ id: "enterprise.cta.contact", message: "Contact Sales" })}</Button></a>
              <a href="/developers"><Button variant="secondary" size="lg">{translate({ id: "enterprise.cta.docs", message: "View Documentation" })}</Button></a>
            </HStack>
          </VStack>
        </Box>
      </Box>

      <Box className="w-full py-24">
        <Box className="site-container">
          <VStack gap="lg" align="center">
            <VStack gap="sm" align="center">
              <Typography variant="h2">
                <Translate id="enterprise.features.title">Enterprise Features</Translate>
              </Typography>
              <Typography variant="body" color="muted">
                <Translate id="enterprise.features.subtitle">Everything you need to build at scale</Translate>
              </Typography>
            </VStack>
            <SimpleGrid cols={3} gap="lg">
              {FEATURES.map((item) => (
                <Card key={item.title} className="p-6">
                  <VStack gap="md">
                    <Icon name={item.icon} size={24} />
                    <Typography variant="h4">{item.title}</Typography>
                    <Typography variant="body" color="muted">{item.description}</Typography>
                  </VStack>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </Box>

      <Box className="w-full bg-[var(--color-surface)] py-24">
        <Box className="site-container">
          <VStack gap="lg" align="center">
            <VStack gap="sm" align="center">
              <Typography variant="h2">
                <Translate id="enterprise.security.title">Security & Compliance</Translate>
              </Typography>
              <Typography variant="body" color="muted">
                <Translate id="enterprise.security.subtitle">Built for regulated industries from day one</Translate>
              </Typography>
            </VStack>
            <SimpleGrid cols={3} gap="lg">
              {SECURITY_CARDS.map((card) => (
                <Card key={card.title} className="p-6 border border-[var(--color-border)]">
                  <VStack gap="md">
                    <Typography variant="h4">{card.title}</Typography>
                    <VStack gap="xs">
                      {card.items.map((item) => (
                        <Typography key={item} variant="body" color="muted">{item}</Typography>
                      ))}
                    </VStack>
                  </VStack>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </Box>

      <Box className="w-full py-24">
        <Box className="site-container">
          <VStack gap="lg" align="center">
            <VStack gap="sm" align="center">
              <Typography variant="h2">
                <Translate id="enterprise.pricing.title">Flexible Pricing</Translate>
              </Typography>
              <Typography variant="body" color="muted">
                <Translate id="enterprise.pricing.subtitle">Plans that grow with your organization</Translate>
              </Typography>
            </VStack>
            <SimpleGrid cols={3} gap="lg">
              {PRICING_PLANS.map((plan) => (
                <Card key={plan.name} className={`p-6 ${plan.highlighted ? 'border-2 border-[var(--color-primary)]' : ''}`}>
                  <VStack gap="md">
                    <HStack gap="sm" align="center">
                      <Typography variant="h4">{plan.name}</Typography>
                      {plan.badge && <Badge variant="primary">{plan.badge}</Badge>}
                    </HStack>
                    <Typography variant="h3" color="primary">{plan.price}</Typography>
                    <Typography variant="body" color="muted">{plan.description}</Typography>
                    <VStack gap="xs">
                      {plan.features.map((feature) => (
                        <HStack key={feature} gap="sm" align="center">
                          <Icon name="check" size={16} />
                          <Typography variant="body">{feature}</Typography>
                        </HStack>
                      ))}
                    </VStack>
                    <a href={plan.href}>
                      <Button variant={plan.highlighted ? "primary" : "secondary"} className="w-full">
                        {translate({ id: "enterprise.pricing.contact", message: "Contact Us" })}
                      </Button>
                    </a>
                  </VStack>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </Box>

      <Box className="w-full bg-[var(--color-foreground)] py-24">
        <Box className="site-container">
          <VStack gap="lg" align="center">
            <VStack gap="sm" align="center">
              <Typography variant="h2" className="text-[var(--color-background)]">
                <Translate id="enterprise.caseStudies.title">Proven in the Field</Translate>
              </Typography>
              <Typography variant="body" className="text-[var(--color-background)]/60">
                <Translate id="enterprise.caseStudies.subtitle">Real deployments built on Almadar</Translate>
              </Typography>
            </VStack>
            <SimpleGrid cols={2} gap="lg">
              {CASE_STUDIES.map((cs) => (
                <Card key={cs.href} className="p-6 bg-[var(--color-background)]/10">
                  <VStack gap="md">
                    <Badge className={`bg-[${cs.categoryColor}]/20 text-[${cs.categoryColor}]`}>{cs.category}</Badge>
                    <Typography variant="h4" className="text-[var(--color-background)]">{cs.title}</Typography>
                    <Typography variant="body" className="text-[var(--color-background)]/70">{cs.description}</Typography>
                    <a href={cs.href}>
                      <Typography variant="body" color="primary">{cs.linkLabel}</Typography>
                    </a>
                  </VStack>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </Box>

      <Box id="contact" className="w-full bg-[var(--color-primary)] py-16">
        <Box className="site-container">
          <VStack gap="lg" align="center">
            <Typography variant="h2" align="center" className="text-white">
              {translate({ id: "enterprise.contact.title", message: "Ready to get started?" })}
            </Typography>
            <Typography variant="body" align="center" className="text-white/80">
              {translate({ id: "enterprise.contact.description", message: "Contact our sales team to discuss your requirements and get a custom quote." })}
            </Typography>
            <a href="mailto:hello@almadar.io">
              <Button variant="secondary" size="lg">hello@almadar.io</Button>
            </a>
          </VStack>
        </Box>
      </Box>
    </Layout>
  );
}
