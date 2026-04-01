import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
export const metadata = {
  metadataBase: new URL("https://www.foritech.bg"),
  title: "Foritech — Cryptographic Verification for Machine Data",
  description: "Foritech cryptographically verifies telemetry and machine data using post-quantum cryptography. Prove data origin and integrity for industrial IoT, energy systems, and critical infrastructure.",
  openGraph: {
    title: "Foritech — Cryptographic Verification for Machine Data",
    description: "In a world where AI can fake anything, Foritech proves what is real. Post-quantum cryptographic verification for industrial telemetry, machine data, and critical infrastructure.",
    url: "https://www.foritech.bg",
    siteName: "Foritech Secure System",
    images: [{ url: "/foritech-banner-1200x630.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Foritech — Cryptographic Verification for Machine Data",
    images: ["/foritech-banner-1200x630.png"],
  },
};
