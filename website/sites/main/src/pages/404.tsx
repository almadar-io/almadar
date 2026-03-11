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

const headingStyle: React.CSSProperties = {
  fontSize: "4rem",
  fontWeight: 800,
  marginBottom: "0.5rem",
  color: "var(--ifm-color-primary)",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: 600,
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
        <div style={headingStyle}>404</div>
        <div style={subtitleStyle}>Page not found</div>
        <p style={messageStyle}>
          The page you were looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <Link className="button button--primary button--lg" to="/" style={buttonStyle}>
          Back to Almadar
        </Link>
      </main>
    </Layout>
  );
}
