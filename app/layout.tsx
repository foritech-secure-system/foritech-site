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
  title: "Foritech — Cryptographic Verification for Machine Data",
  description: "Foritech verifies that telemetry and machine data came from the right device and was not altered. Post-quantum cryptography for industrial IoT.",
  openGraph: {
    title: "Foritech — Cryptographic Verification for Machine Data",
    description: "In a world where AI can fake anything, Foritech proves what is real.",
    url: "https://www.foritech.bg",
    siteName: "Foritech Secure System",
    images: [{ url: "https://www.foritech.bg/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Foritech — Cryptographic Verification for Machine Data",
    images: ["https://www.foritech.bg/og-image.png"],
  },
};
