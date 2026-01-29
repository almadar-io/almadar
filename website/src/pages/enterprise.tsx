import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";

import styles from "./enterprise.module.css";

function EnterpriseHero() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <span className={styles.tag}>
            <Translate id="enterprise.tag">Enterprise</Translate>
          </span>
          <Heading as="h1" className={styles.heroTitle}>
            <Translate id="enterprise.title">
              Almadar for Teams & Organizations
            </Translate>
          </Heading>
          <p className={styles.heroSubtitle}>
            <Translate id="enterprise.subtitle">
              Scale your development with enterprise-grade features, dedicated support, and custom deployment options.
            </Translate>
          </p>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="#contact">
              <Translate id="enterprise.cta.contact">Contact Sales</Translate>
            </Link>
            <Link className="button button--secondary button--lg" to="/docs">
              <Translate id="enterprise.cta.docs">View Documentation</Translate>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

const features = [
  {
    icon: "👥",
    titleId: "enterprise.feature.collaboration.title",
    titleDefault: "Team Collaboration",
    descriptionId: "enterprise.feature.collaboration.description",
    descriptionDefault:
      "Work together on schemas with role-based access control, version history, and real-time collaboration.",
  },
  {
    icon: "🏢",
    titleId: "enterprise.feature.deployment.title",
    titleDefault: "Private Deployments",
    descriptionId: "enterprise.feature.deployment.description",
    descriptionDefault:
      "Deploy on-premise or in your private cloud. Full control over your data and infrastructure.",
  },
  {
    icon: "🛡️",
    titleId: "enterprise.feature.security.title",
    titleDefault: "Enterprise Security",
    descriptionId: "enterprise.feature.security.description",
    descriptionDefault:
      "SSO/SAML integration, audit logs, SOC 2 compliance, and advanced security controls.",
  },
  {
    icon: "🎯",
    titleId: "enterprise.feature.support.title",
    titleDefault: "Priority Support",
    descriptionId: "enterprise.feature.support.description",
    descriptionDefault:
      "Dedicated support channels with guaranteed response times and direct access to our engineering team.",
  },
  {
    icon: "📚",
    titleId: "enterprise.feature.training.title",
    titleDefault: "Custom Training",
    descriptionId: "enterprise.feature.training.description",
    descriptionDefault:
      "Onboarding programs, workshops, and custom training tailored to your team's needs.",
  },
  {
    icon: "🔧",
    titleId: "enterprise.feature.customization.title",
    titleDefault: "Custom Integrations",
    descriptionId: "enterprise.feature.customization.description",
    descriptionDefault:
      "Build custom integrators for your internal systems. We help you connect Almadar to your existing infrastructure.",
  },
];

function EnterpriseFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">
            <Translate id="enterprise.features.title">
              Enterprise Features
            </Translate>
          </Heading>
          <p>
            <Translate id="enterprise.features.subtitle">
              Everything you need to build at scale
            </Translate>
          </p>
        </div>
        <div className={styles.featureGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <span className={styles.featureIcon}>{feature.icon}</span>
              <Heading as="h3">
                <Translate id={feature.titleId}>{feature.titleDefault}</Translate>
              </Heading>
              <p>
                <Translate id={feature.descriptionId}>
                  {feature.descriptionDefault}
                </Translate>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnterprisePricing() {
  return (
    <section className={styles.pricing}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">
            <Translate id="enterprise.pricing.title">
              Flexible Pricing
            </Translate>
          </Heading>
          <p>
            <Translate id="enterprise.pricing.subtitle">
              Plans that grow with your organization
            </Translate>
          </p>
        </div>
        <div className={styles.pricingGrid}>
          <div className={styles.pricingCard}>
            <div className={styles.pricingHeader}>
              <Heading as="h3">
                <Translate id="enterprise.pricing.team.title">Team</Translate>
              </Heading>
              <p className={styles.pricingDescription}>
                <Translate id="enterprise.pricing.team.description">
                  For small teams getting started
                </Translate>
              </p>
            </div>
            <ul className={styles.pricingFeatures}>
              <li><Translate id="enterprise.pricing.team.feature1">Up to 10 team members</Translate></li>
              <li><Translate id="enterprise.pricing.team.feature2">Shared schemas</Translate></li>
              <li><Translate id="enterprise.pricing.team.feature3">Email support</Translate></li>
              <li><Translate id="enterprise.pricing.team.feature4">Cloud deployment</Translate></li>
            </ul>
            <Link className="button button--secondary button--lg button--block" to="#contact">
              <Translate id="enterprise.pricing.contact">Contact Us</Translate>
            </Link>
          </div>
          <div className={`${styles.pricingCard} ${styles.pricingCardFeatured}`}>
            <div className={styles.pricingBadge}>
              <Translate id="enterprise.pricing.popular">Most Popular</Translate>
            </div>
            <div className={styles.pricingHeader}>
              <Heading as="h3">
                <Translate id="enterprise.pricing.business.title">Business</Translate>
              </Heading>
              <p className={styles.pricingDescription}>
                <Translate id="enterprise.pricing.business.description">
                  For growing organizations
                </Translate>
              </p>
            </div>
            <ul className={styles.pricingFeatures}>
              <li><Translate id="enterprise.pricing.business.feature1">Unlimited team members</Translate></li>
              <li><Translate id="enterprise.pricing.business.feature2">SSO/SAML integration</Translate></li>
              <li><Translate id="enterprise.pricing.business.feature3">Priority support</Translate></li>
              <li><Translate id="enterprise.pricing.business.feature4">Private cloud option</Translate></li>
              <li><Translate id="enterprise.pricing.business.feature5">Audit logs</Translate></li>
            </ul>
            <Link className="button button--primary button--lg button--block" to="#contact">
              <Translate id="enterprise.pricing.contact">Contact Us</Translate>
            </Link>
          </div>
          <div className={styles.pricingCard}>
            <div className={styles.pricingHeader}>
              <Heading as="h3">
                <Translate id="enterprise.pricing.enterprise.title">Enterprise</Translate>
              </Heading>
              <p className={styles.pricingDescription}>
                <Translate id="enterprise.pricing.enterprise.description">
                  For large organizations
                </Translate>
              </p>
            </div>
            <ul className={styles.pricingFeatures}>
              <li><Translate id="enterprise.pricing.enterprise.feature1">On-premise deployment</Translate></li>
              <li><Translate id="enterprise.pricing.enterprise.feature2">Custom integrations</Translate></li>
              <li><Translate id="enterprise.pricing.enterprise.feature3">Dedicated support</Translate></li>
              <li><Translate id="enterprise.pricing.enterprise.feature4">SLA guarantee</Translate></li>
              <li><Translate id="enterprise.pricing.enterprise.feature5">Custom training</Translate></li>
            </ul>
            <Link className="button button--secondary button--lg button--block" to="#contact">
              <Translate id="enterprise.pricing.contact">Contact Us</Translate>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function EnterpriseContact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <div className={styles.contactCard}>
          <Heading as="h2">
            <Translate id="enterprise.contact.title">
              Ready to get started?
            </Translate>
          </Heading>
          <p>
            <Translate id="enterprise.contact.description">
              Contact our sales team to discuss your requirements and get a custom quote.
            </Translate>
          </p>
          <a href="mailto:enterprise@almadar.io" className="button button--primary button--lg">
            enterprise@almadar.io
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Enterprise(): ReactNode {
  return (
    <Layout
      title={translate({ id: "enterprise.meta.title", message: "Enterprise" })}
      description={translate({
        id: "enterprise.meta.description",
        message: "Almadar Enterprise - Scale your development with enterprise-grade features",
      })}
    >
      <EnterpriseHero />
      <main>
        <EnterpriseFeatures />
        <EnterprisePricing />
        <EnterpriseContact />
      </main>
    </Layout>
  );
}
