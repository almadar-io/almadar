import React from "react";
import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import {
  Box,
  VStack,
  Typography,
  Button,
} from "@almadar/ui/marketing";

const STUDIO_URL = "https://studio.almadar.io";

function JoinPromptInput(): ReactNode {
  const placeholder = translate({
    id: "join.prompt.placeholder",
    message: "Tell us what you want to build...",
  });
  const submitLabel = translate({
    id: "join.prompt.submit",
    message: "Start building",
  });
  return (
    <form action={STUDIO_URL} method="GET" className="w-full max-w-2xl mt-2">
      {/* Hidden ref tags so the studio knows the user came in via /join. */}
      <input type="hidden" name="ref" value="join" />
      <Box className="flex items-center gap-2 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg pl-5 pr-2 py-2 focus-within:ring-2 focus-within:ring-[var(--color-primary)]/40 transition">
        <input
          type="text"
          name="prompt"
          required
          autoComplete="off"
          placeholder={placeholder}
          aria-label={placeholder}
          className="flex-1 min-w-0 bg-transparent border-0 outline-none text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] text-base py-3"
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          iconRight="arrow-up"
          aria-label={submitLabel}
        />
      </Box>
    </form>
  );
}

export default function Join(): ReactNode {
  return (
    <Layout
      title={translate({ id: "join.meta.title", message: "Welcome to Almadar" })}
      description={translate({
        id: "join.meta.desc",
        message: "Thank you for joining Almadar. Start building your product today in Studio.",
      })}
    >
      <Box as="header" className="w-full flex items-center" style={{ minHeight: "calc(100vh - 80px)" }}>
        <Box className="site-container py-20">
          <VStack gap="xl" align="center">
            <Typography variant="h1" align="center">
              <Translate id="join.title">Thank you for joining us at Almadar</Translate>
            </Typography>
            <Typography
              variant="body1"
              color="muted"
              align="center"
              className="max-w-2xl"
            >
              <Translate id="join.subtitle">
                Tell us what you want to build and we&apos;ll take you straight to Studio.
              </Translate>
            </Typography>
            <JoinPromptInput />
          </VStack>
        </Box>
      </Box>
    </Layout>
  );
}
