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
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function About(): ReactNode {
  return (
    <Layout
      title={translate({ id: "about.meta.title", message: "About — The Almadar Team" })}
      description={translate({ id: "about.meta.desc", message: "A small team in Ljubljana, Slovenia, building the physics of software." })}
    >
      <Box as="header" className="w-full min-h-[60vh] flex items-center relative overflow-hidden">
        <Box className="absolute right-8 top-[10%] w-full max-w-[380px] pointer-events-none hidden lg:flex items-start">
          <ThemedImage
            alt="Almadar Entity"
            sources={{
              light: useBaseUrl('/img/illustrations/Entity-light.svg'),
              dark: useBaseUrl('/img/illustrations/Entity-dark.svg'),
            }}
            className="w-full max-w-[500px] opacity-90 drop-shadow-2xl"
          />
        </Box>
        <Box className="site-container py-20 relative z-10">
          <VStack gap="lg" align="center">
            <Typography variant="h1" align="center">
              {translate({ id: "about.hero.title", message: "About Almadar" })}
            </Typography>
            <Typography variant="body1" color="muted" align="center">
              {translate({ id: "about.hero.subtitle", message: "A small team building the physics of software. Based in Ljubljana, Slovenia." })}
            </Typography>
          </VStack>
        </Box>
      </Box>

      <Box className="w-full py-24">
        <Box className="site-container">
          <HStack gap="xl" align="start" responsive>
            <VStack gap="lg" className="flex-1">
              <Typography variant="h2">
                {translate({ id: "about.team.title", message: "The Team" })}
              </Typography>
              <VStack gap="lg">
                <Card className="p-6">
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
                <Card className="p-6">
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
              </VStack>
            </VStack>
            <Box className="flex-1 max-w-[280px]">
              <img
                src="/img/about-team.webp"
                alt="The Almadar team"
                className="w-full rounded-lg"
              />
            </Box>
          </HStack>
        </Box>
      </Box>

      <Box className="w-full bg-[var(--color-surface)] py-24">
        <Box className="site-container">
          <VStack gap="lg">
            <Typography variant="h2">
              {translate({ id: "about.story.title", message: "Why We Build This" })}
            </Typography>
            <Typography variant="body">
              <Translate id="about.story.p1">
                Software development has a fundamental problem: the gap between what someone wants and what they can build keeps growing. Tools get more powerful, but also more complex. AI assistants generate code faster, but the underlying approach is still the same: write code, hope it works, debug when it does not.
              </Translate>
            </Typography>
            <Typography variant="body">
              <Translate id="about.story.p2">
                We started Almadar with a different premise. What if software had physics? What if you could describe how a system behaves, formally, and a compiler could prove it correct before generating any code? What if AI understood software structure instead of just predicting the next token?
              </Translate>
            </Typography>
            <Typography variant="body">
              <Translate id="about.story.p3">
                That premise became Orb, the Almadar compiler, and the neural pipeline. It is still early. But seven production projects and 93 standard behaviors later, the premise holds.
              </Translate>
            </Typography>
          </VStack>
        </Box>
      </Box>
    </Layout>
  );
}
