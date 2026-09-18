import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Budowa domów Warszawa | Serhii Anatii Homes",
    template: "%s | Serhii Anatii Homes",
  },
  description:
    "Budowa domów jednorodzinnych i bliźniaków w Warszawie. Fundamenty, ściany, stropy, schody, kominy i stan surowy.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: site.url,
    siteName: site.name,
    title: "Budowa domów Warszawa | Serhii Anatii Homes",
    description:
      "Budowa domów jednorodzinnych i bliźniaków w Warszawie. Fundamenty, ściany, stropy, schody, kominy i stan surowy.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Dom jednorodzinny w stanie surowym w trakcie budowy.",
      },
    ],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#f2efe8",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  image: `${site.url}/og.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.street,
    postalCode: site.postalCode,
    addressLocality: site.city,
    addressCountry: "PL",
  },
  areaServed: { "@type": "City", name: "Warszawa" },
  knowsLanguage: ["pl"],
  makesOffer: [
    "Budowa domów jednorodzinnych",
    "Budowa domów bliźniaczych",
    "Stan surowy",
    "Fundamenty",
    "Prace murarskie",
    "Stropy i schody",
    "Kominy",
    "Konstrukcja dachu",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={GeistSans.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
