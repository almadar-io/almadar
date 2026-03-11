import React from "react";
import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "./pricing.module.css";

function Hero() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          <Translate id="svc-pricing.hero.title">Services Pricing</Translate>
        </Heading>
        <p className={styles.heroSubtitle}>
          <Translate id="svc-pricing.hero.subtitle">
            Open source forever. Cloud hosting when you need it.
          </Translate>
        </p>
      </div>
    </header>
  );
}

const TIERS = [
  {
    nameId: "svc-pricing.oss.name", name: "OSS",
    priceId: "svc-pricing.oss.price", price: "Free",
    descId: "svc-pricing.oss.desc", desc: "Self-host everything. The full platform is open source.",
    features: ["All services included", "Self-hosted infrastructure", "Community support", "No usage limits"],
    ctaId: "svc-pricing.oss.cta", cta: "View on GitHub",
    ctaHref: "https://github.com/almadar-io/almadar",
    highlighted: false,
    badge: "",
  },
  {
    nameId: "svc-pricing.cloud.name", name: "Cloud",
    priceId: "svc-pricing.cloud.price", price: "Pay-per-use",
    descId: "svc-pricing.cloud.desc", desc: "Managed hosting with usage-based billing. No upfront costs.",
    features: ["Managed infrastructure", "Automatic scaling", "99.9% SLA", "Email support"],
    ctaId: "svc-pricing.cloud.cta", cta: "Coming Soon",
    ctaHref: "mailto:hello@almadar.io",
    highlighted: true,
    badge: "Coming Soon",
  },
  {
    nameId: "svc-pricing.enterprise.name", name: "Enterprise",
    priceId: "svc-pricing.enterprise.price", price: "Custom",
    descId: "svc-pricing.enterprise.desc", desc: "Dedicated infrastructure, custom SLAs, and priority support.",
    features: ["Dedicated cluster", "Custom AI models", "On-premise option", "24/7 support", "Custom SLA"],
    ctaId: "svc-pricing.enterprise.cta", cta: "Contact Us",
    ctaHref: "mailto:hello@almadar.io",
    highlighted: false,
    badge: "",
  },
];

function PricingGrid() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.pricingGrid}>
          {TIERS.map((tier) => (
            <div
              key={tier.nameId}
              className={`${styles.pricingCard} ${tier.highlighted ? styles.pricingCardHighlighted : ""}`}
            >
              {tier.badge && <span className={styles.badge}>{tier.badge}</span>}
              <h3><Translate id={tier.nameId}>{tier.name}</Translate></h3>
              <div className={styles.price}>
                <Translate id={tier.priceId}>{tier.price}</Translate>
              </div>
              <p className={styles.tierDesc}>
                <Translate id={tier.descId}>{tier.desc}</Translate>
              </p>
              <ul className={styles.featureList}>
                {tier.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <Link
                className={`button button--lg ${tier.highlighted ? "button--primary" : "button--secondary"}`}
                href={tier.ctaHref}
              >
                <Translate id={tier.ctaId}>{tier.cta}</Translate>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPricing(): ReactNode {
  return (
    <Layout
      title={translate({ id: "svc-pricing.meta.title", message: "Pricing — Almadar Services" })}
      description={translate({ id: "svc-pricing.meta.desc", message: "OSS free forever. Cloud pay-per-use coming soon. Enterprise with custom pricing." })}
    >
      <Hero />
      <main>
        <PricingGrid />
      </main>
    </Layout>
  );
}
