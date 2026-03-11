import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "60vh",
  textAlign: "center",
  padding: "2rem",
};

const statusStyle: React.CSSProperties = {
  fontSize: "0.875rem",
  fontWeight: 600,
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  color: "var(--ifm-color-emphasis-500)",
  marginBottom: "0.5rem",
};

const headingStyle: React.CSSProperties = {
  fontSize: "2.5rem",
  fontWeight: 700,
  marginBottom: "0.5rem",
};

const codeStyle: React.CSSProperties = {
  fontFamily: "var(--ifm-font-family-monospace)",
  fontSize: "1rem",
  color: "var(--ifm-color-danger)",
  marginBottom: "1rem",
};

const messageStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  color: "var(--ifm-color-emphasis-600)",
  marginBottom: "2rem",
  maxWidth: "480px",
};

const buttonStyle: React.CSSProperties = {
  padding: "0.75rem 2rem",
  fontSize: "1rem",
};

export default function NotFound(): React.ReactNode {
  return (
    <Layout title="Page not found">
      <main style={containerStyle}>
        <div style={statusStyle}>Status</div>
        <div style={headingStyle}>404</div>
        <div style={codeStyle}>SERVICE_NOT_PROVISIONED</div>
        <p style={messageStyle}>
          This service endpoint hasn't been provisioned. The resource
          you requested doesn't exist or has been decommissioned.
        </p>
        <Link className="button button--primary button--lg" to="/" style={buttonStyle}>
          Back to Services
        </Link>
      </main>
    </Layout>
  );
}
