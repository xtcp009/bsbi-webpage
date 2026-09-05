import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { HapticRoot } from "@/components/haptic-root";
import { MobileDock } from "@/components/mobile-dock";
import ClickSpark from "@/components/react-bits/click-spark";
import { GsapRefresh } from "@/components/gsap-refresh";
import { SearchJump } from "@/components/search-jump";
import { site } from "@/lib/site";
import { SanityLive } from "@/sanity/live";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Charleston, SC`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  keywords: [
    "BSBI",
    "Brith Sholom Beth Israel",
    "Charleston synagogue",
    "Orthodox synagogue Charleston",
    "minyan Charleston",
    "Shabbat Charleston",
    "mikvah Charleston",
    "eruv Charleston",
    "kosher Charleston",
    "Jewish Charleston",
  ],
  category: "religion",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    images: [{ url: "/images/exterior-facade.jpg", width: 1600, height: 1200, alt: "BSBI synagogue on Rutledge Avenue" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/exterior-facade.jpg"],
  },
  alternates: { canonical: site.url },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#fffdf8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${sourceSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-cream text-ink" suppressHydrationWarning>
        <HapticRoot />
        <ClickSpark>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <JsonLd />
          <Header />
          <GsapRefresh />
          <main id="main" className="flex-1 safe-bottom">
            <Suspense>
              <SearchJump />
            </Suspense>
            {children}
          </main>
          <Footer />
          <MobileDock />
          <SanityLive />
        </ClickSpark>
      </body>
    </html>
  );
}
