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

const iconStyle: React.CSSProperties = {
  fontSize: "4rem",
  marginBottom: "1rem",
  opacity: 0.3,
};

const headingStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: 700,
  marginBottom: "0.5rem",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "1.25rem",
  fontWeight: 500,
  color: "var(--ifm-color-primary)",
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
        <div style={iconStyle}>[ ]</div>
        <div style={headingStyle}>Nothing here yet</div>
        <div style={subtitleStyle}>404</div>
        <p style={messageStyle}>
          This page is a blank canvas. It either doesn't exist
          or hasn't been built yet. Go build something.
        </p>
        <Link className="button button--primary button--lg" to="/" style={buttonStyle}>
          Back to Studio
        </Link>
      </main>
    </Layout>
  );
}
