import React from "react";
import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import {
  Box,
  VStack,
  HStack,
  Typography,
  Card,
} from "@almadar/ui/marketing";
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function About(): ReactNode {
  return (
    <Layout
      title={translate({ id: "about.meta.title", message: "About — The Almadar Team" })}
      description={translate({ id: "about.meta.desc", message: "A small team in Ljubljana, Slovenia, building the physics of software." })}
    >
      <Box as="header" className="w-full flex items-center">
        <Box className="site-container py-20">
          <VStack gap="lg" align="center">
            <img
              src={useBaseUrl('/img/almadar-icon-256.png')}
              alt="Almadar"
              className="w-20 h-20 opacity-80"
            />
            <Typography variant="h1" align="center">
              {translate({ id: "about.hero.title", message: "About Almadar" })}
            </Typography>
            <Typography variant="body1" color="muted" align="center" className="max-w-2xl">
              {translate({ id: "about.hero.subtitle", message: "A small team building the physics of software. Based in Ljubljana, Slovenia." })}
            </Typography>
          </VStack>
        </Box>
      </Box>

      <Box className="w-full py-24">
        <Box className="site-container">
          <VStack gap="lg" align="center">
            <Typography variant="h2">
              {translate({ id: "about.team.title", message: "The Team" })}
            </Typography>
            <HStack gap="xl" justify="center" responsive>
              <Card className="p-6" style={{ maxWidth: 400 }}>
                <VStack gap="sm">
                  <Typography variant="h4">Osama Alghanmi</Typography>
                  <Typography variant="body" color="muted">{"\u0623\u0633\u0627\u0645\u0629 \u0627\u0644\u063A\u0627\u0646\u0645\u064A"}</Typography>
                  <Typography variant="body" color="primary">
                    {translate({ id: "about.team.osama.role", message: "Co-Founder & Technical Lead" })}
                  </Typography>
                  <Typography variant="body">
                    {translate({ id: "about.team.osama.bio", message: "15+ years building enterprise systems. Designed and built Saudi Arabia's national e-invoicing platform. Architect of the Orb programming language and the Almadar compiler. Leads the AI pipeline, standard library, and infrastructure." })}
                  </Typography>
                </VStack>
              </Card>
              <Card className="p-6" style={{ maxWidth: 400 }}>
                <VStack gap="sm">
                  <Typography variant="h4">Maja Golob</Typography>
                  <Typography variant="body" color="primary">
                    {translate({ id: "about.team.maja.role", message: "Co-Founder & Program Manager" })}
                  </Typography>
                  <Typography variant="body">
                    {translate({ id: "about.team.maja.bio", message: "10+ years in enterprise delivery and program management. Manages client projects, quality gates, and go-to-market strategy. Ensures every shipped product meets production standards." })}
                  </Typography>
                </VStack>
              </Card>
            </HStack>
          </VStack>
        </Box>
      </Box>

    </Layout>
  );
}
