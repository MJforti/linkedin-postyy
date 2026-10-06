import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Postyy — LinkedIn Content Operating System",
  description: "Executive suite for creating, humanizing, and publishing high-signal LinkedIn content based on 2026 reach heuristics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F4F5F8] text-[#101828] antialiased selection:bg-[#EFF8FF] selection:text-[#175CD3]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

