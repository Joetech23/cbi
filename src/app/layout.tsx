import type { Metadata, Viewport } from "next";
import { Jost, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ─── Display font: Jost ────────────────────────────────────
   Used wherever code references var(--font-playfair) — headlines,
   pull-quotes, italic emphasis. Jost has true italics and high
   weights that read editorially without feeling stiff. */
const jost = Jost({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

/* ─── UI / body font: Poppins ───────────────────────────────
   Used wherever code references var(--font-jakarta) — UI chrome,
   button text, body copy, eyebrows, captions. Friendly and very
   legible at small sizes. */
const poppins = Poppins({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

/* ─── Stat numerals: Jost (tabular) ─────────────────────────
   Aliased to var(--font-space). Heavy weight + tabular nums
   gives stat counters a confident editorial look. */
const jostStat = Jost({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
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
      className={`${jost.variable} ${poppins.variable} ${jostStat.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-white text-[#000000] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
