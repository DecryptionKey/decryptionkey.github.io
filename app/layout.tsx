import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://manyewade.com"),
  title: "Ma'Nye Wade — Cloud Security & Security Automation",
  description: "Cloud security professional working across security automation, CSPM, IAM, vulnerability management, and multi-cloud governance.",
  icons: { icon: "/media/favicon.png" },
  openGraph: {
    title: "Ma'Nye Wade — Cloud Security & Security Automation",
    description: "Cloud security, automation, IAM, and practical defense across AWS, Azure, and GCP.",
    type: "website",
    images: [{ url: "/og.png", width: 2048, height: 1024, alt: "Ma'Nye Wade cybersecurity portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ma'Nye Wade — Cloud Security & Security Automation",
    description: "Cloud security, automation, IAM, and practical defense across AWS, Azure, and GCP.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
