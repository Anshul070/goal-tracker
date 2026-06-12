import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "12-Week Roadmap — Anshul Saini",
  description: "12-Week Roadmap tracker for DSA, Agentic AI, and Letbex Outreach progress.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "12-Week Roadmap",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
