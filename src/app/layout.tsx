import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ── Fonts ────────────────────────────────────────────────────────────────────

const cormorant = Cormorant_Garamond({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSansStat = DM_Sans({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

// ── Viewport ─────────────────────────────────────────────────────────────────

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0102F1",
};

// ── Root metadata ─────────────────────────────────────────────────────────────

const SITE_URL = "https://cbi.ngo";
const SITE_NAME = "Care Best Initiative";
const DEFAULT_TITLE = "Care Best Initiative — Humanitarian Aid Across Nigeria";
const DEFAULT_DESCRIPTION =
  "A registered National NGO delivering integrated humanitarian programs — healthcare, clean water, education, nutrition and protection — to Nigeria's most vulnerable communities since 2019. 1,500,000+ lives reached across 10 states.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },

  description: DEFAULT_DESCRIPTION,

  keywords: [
    "NGO Nigeria",
    "humanitarian aid Nigeria",
    "Care Best Initiative",
    "CBI NGO",
    "Nigeria charity",
    "WASH programme Nigeria",
    "education emergency Nigeria",
    "health programme Nigeria",
    "nutrition programme Nigeria",
    "GBV protection Nigeria",
    "food security Nigeria",
    "Borno State NGO",
    "Northeast Nigeria humanitarian",
    "UNICEF partner Nigeria",
    "WFP partner Nigeria",
    "cbi.ngo",
  ],

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  // ── Open Graph ──────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Care Best Initiative — Humanitarian Aid Across Nigeria",
      },
    ],
  },

  // ── Twitter / X ─────────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@BestInitiative",
    creator: "@BestInitiative",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/opengraph-image.jpg"],
  },

  // ── Robots ───────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Canonical ────────────────────────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
  },

  // ── Icons ────────────────────────────────────────────────────────────────────
  // icon.png + apple-icon.png placed in src/app/ are auto-detected by Next.js.
  // The entries below are explicit fallbacks.
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png" },
    ],
  },

  // ── Manifest ─────────────────────────────────────────────────────────────────
  manifest: "/manifest.webmanifest",

  // ── Verification (add tokens from Google / Bing Search Console) ─────────────
  verification: {
    // google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
    // yandex: "YOUR_YANDEX_TOKEN",
  },
};

// ── JSON-LD Structured Data ──────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["NGO", "Organization"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: "CBI",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo-blue.png`,
        width: 280,
        height: 100,
      },
      image: `${SITE_URL}/opengraph-image.jpg`,
      description: DEFAULT_DESCRIPTION,
      foundingDate: "2019",
      numberOfEmployees: { "@type": "QuantitativeValue", value: 50 },
      areaServed: {
        "@type": "Country",
        name: "Nigeria",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Abuja",
        addressRegion: "Federal Capital Territory",
        addressCountry: "NG",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "info@cbi.ngo",
        contactType: "customer service",
        availableLanguage: "English",
      },
      sameAs: [
        "https://web.facebook.com/profile.php?id=100083698905161",
        "https://x.com/BestInitiative",
        "https://www.linkedin.com/in/care-best-initiative-b03a32202/",
        "https://www.instagram.com/carebestinitiative/",
      ],
      knowsAbout: [
        "Humanitarian Aid",
        "Education in Emergency",
        "WASH",
        "Primary Healthcare",
        "Nutrition",
        "GBV Protection",
        "Food Security",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-NG",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

// ── Root Layout ───────────────────────────────────────────────────────────────

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-NG"
      className={`${cormorant.variable} ${dmSans.variable} ${dmSansStat.variable} scroll-smooth`}
    >
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[#000000] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
