import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Heading font: Cormorant Garamond
// Maps to var(--font-playfair) used across all heading components.
// Elegant humanist serif — authoritative, editorial, NGO-premium.
// The italic variant is especially beautiful for <em> emphasis.
const cormorant = Cormorant_Garamond({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Body / UI font: DM Sans
// Maps to var(--font-jakarta) used for all UI chrome and body copy.
// Geometric, modern, very legible at small sizes — cleaner than Poppins.
const dmSans = DM_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Stat numerals: DM Sans bold
// Maps to var(--font-space) used in count-up stat displays.
const dmSansStat = DM_Sans({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0102F1",
};

export const metadata: Metadata = {
  title: "Care Best Initiative — Humanitarian Programs Across Nigeria",
  description:
    "A National NGO delivering integrated humanitarian programs — healthcare, clean water, education and protection — to Nigeria's most vulnerable communities since 2019.",
  keywords: ["NGO", "Nigeria", "humanitarian", "healthcare", "WASH", "education", "nutrition"],
  openGraph: {
    title: "Care Best Initiative",
    description: "Lifesaving care for Nigeria's most vulnerable communities.",
    type: "website",
    locale: "en_NG",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dmSansStat.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-white text-[#000000] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
