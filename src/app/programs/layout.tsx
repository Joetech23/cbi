import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Programs — Education, Health, WASH, Nutrition & More",
  description:
    "Six integrated humanitarian programmes: Education in Emergency, Health & Primary Care, Nutrition, WASH, Protection & GBV, and Food Security & Livelihoods. Serving communities across Nigeria since 2019.",
  alternates: { canonical: "https://cbi.ngo/programs" },
  keywords: [
    "education in emergency Nigeria",
    "WASH Nigeria",
    "humanitarian health Nigeria",
    "nutrition programme Nigeria",
    "GBV protection Nigeria",
    "food security Nigeria",
    "CBI programmes",
  ],
  openGraph: {
    title: "CBI Programs — Education, Health, WASH, Nutrition & Protection",
    description:
      "Six integrated humanitarian programmes delivering measurable impact across Nigeria — 1,500,000+ beneficiaries and counting.",
    url: "https://cbi.ngo/programs",
    images: [{ url: "/images/cbi-education-class.jpg", width: 1200, height: 630, alt: "CBI education programme" }],
  },
};

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
