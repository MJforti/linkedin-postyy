import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "LinkedIn OS — Content Operating System",
  description: "A professional workspace for creating, analyzing, and publishing viral LinkedIn content based on 2026 reach heuristics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased selection:bg-[#0A66C2]/30 selection:text-white">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
