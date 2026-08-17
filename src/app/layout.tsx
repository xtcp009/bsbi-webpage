import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { MobileDock } from "@/components/mobile-dock";
import { site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
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
    title: `${site.name} · Charleston, SC`,
    description: site.description,
    images: [{ url: "/images/exterior-facade.jpg", width: 1920, height: 1440, alt: "BSBI synagogue on Rutledge Avenue" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · Charleston, SC`,
    description: site.description,
    images: ["/images/exterior-facade.jpg"],
  },
  alternates: { canonical: site.url },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#1c2826",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-parchment text-ink">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <JsonLd />
        <Header />
        <main id="main" className="flex-1 safe-bottom">
          {children}
        </main>
        <Footer />
        <MobileDock />
      </body>
    </html>
  );
}
