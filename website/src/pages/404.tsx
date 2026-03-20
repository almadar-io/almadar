import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { ContentSection, VStack, Typography, Button } from "@almadar/ui/marketing";

export default function NotFound(): React.ReactNode {
  return (
    <Layout title="Page not found">
      <ContentSection padding="lg">
        <VStack gap="md" align="center" className="min-h-[60vh] justify-center">
          <img
            src="/img/404-illustration.png"
            alt="404 Illustration"
            style={{ width: "100%", maxWidth: "400px", marginBottom: "1.5rem" }}
          />
          <Typography variant="h1" color="primary">404</Typography>
          <Typography variant="h3">Page not found</Typography>
          <Typography variant="body" color="muted" className="max-w-[480px] text-center">
            The page you were looking for doesn't exist or has been moved.
            Let's get you back on track.
          </Typography>
          <Link to="/">
            <Button variant="primary" size="lg">Back to Almadar</Button>
          </Link>
        </VStack>
      </ContentSection>
    </Layout>
  );
}
