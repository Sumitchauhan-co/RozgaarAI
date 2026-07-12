import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#ea580c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rozgaar.ai"),
  title: "RozgaarAI - AI-Powered Job & Worker Marketplace",
  description:
    "Digital Employment & Wage Management Platform for India's Informal Workforce.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/icon-192x192-maskable.png",
  },
  keywords: [
    "rozgaar",
    "jobs",
    "workers",
    "employment",
    "AI job platform",
    "informal workforce",
  ],
  authors: [{ name: "RozgaarAI", url: "https://rozgaar.ai-app2.vercel.app" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "RozgaarAI - AI-Powered Job & Worker Marketplace",
    description:
      "Digital Employment & Wage Management Platform for India's Informal Workforce.",
    url: "https://rozgaar.ai",
    siteName: "RozgaarAI",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "RozgaarAI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RozgaarAI - AI-Powered Job & Worker Marketplace",
    description:
      "Digital Employment & Wage Management Platform for India's Informal Workforce.",
    images: ["/icons/icon-512x512.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RozgaarAI",
  },
};

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
      <body
        className="flex min-h-full flex-col"
        suppressHydrationWarning={true}
      >
        <a
          href="#content"
          className="sr-only rounded bg-white px-3 py-2 text-black focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
        >
          Skip to content
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "RozgaarAI",
              url: "https://rozgaar.ai",
              logo: "https://rozgaar.ai/icons/icon-192x192.png",
            }),
          }}
        />

        {children}
      </body>
    </html>
  );
}
