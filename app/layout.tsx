import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { JsonLd } from "@/components/StructuredData";
import { siteConfig } from "@/content/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Dr. Coffee Station | Café especial em Resende",
    template: "%s | Dr. Coffee Station",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: siteConfig.name,
    title: "Dr. Coffee Station | Café especial em Resende",
    description: siteConfig.description,
    images: [
      {
        url: "/images/home/dr-coffee-hero.png",
        width: 1536,
        height: 1024,
        alt: "Café especial preparado na Dr. Coffee Station",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Coffee Station | Café especial em Resende",
    description: siteConfig.description,
    images: ["/images/home/dr-coffee-hero.png"],
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${dmSans.variable} ${playfair.variable}`}>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "CafeOrCoffeeShop",
            "@id": `${siteConfig.url}/#cafeteria`,
            name: siteConfig.name,
            description: siteConfig.description,
            url: siteConfig.url,
            image: `${siteConfig.url}/images/home/dr-coffee-hero.png`,
            logo: `${siteConfig.url}/images/brand/dr-coffee-logo-transparent.png`,
            menu: `${siteConfig.url}/cardapio`,
            sameAs: [siteConfig.instagram.url],
            address: {
              "@type": "PostalAddress",
              streetAddress: siteConfig.address.street,
              addressLocality: siteConfig.address.city,
              addressRegion: siteConfig.address.region,
              addressCountry: "BR",
            },
          }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
