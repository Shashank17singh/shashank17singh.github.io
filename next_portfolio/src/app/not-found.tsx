import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Shashank Singh",
  description: "The requested page could not be found.",
};

export default function NotFound() {
  return (
    <main id="main" className="section" style={{ minHeight: "calc(100vh - 200px)", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ maxWidth: "600px", textAlign: "center" }}>
        <p className="statement" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", margin: "0 auto var(--space-md)" }}>
          404
        </p>
        <h1 style={{ fontSize: "var(--text-title)", marginBottom: "var(--space-md)" }}>
          Page not found
        </h1>
        <p className="lead" style={{ margin: "0 auto var(--space-xl)", color: "var(--color-ink-2)" }}>
          The page you are looking for doesn’t exist or has moved. Return to the portfolio to explore featured projects and engineering work.
        </p>
        <div className="actions" style={{ justifyContent: "center" }}>
          <Link href="/" className="btn btn--primary">
            Return Home
          </Link>
          <Link href="/#projects" className="btn">
            View Projects
          </Link>
          <a href="mailto:shashanksingh1709@gmail.com" className="btn">
            Contact Shashank
          </a>
        </div>
      </div>
    </main>
  );
}
