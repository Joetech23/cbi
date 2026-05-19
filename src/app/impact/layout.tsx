import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Impact — 1,500,000+ Lives Reached Across Nigeria",
  description:
    "See CBI's verified humanitarian impact: 1,500,000+ beneficiaries, 45,000+ health consultations, 900+ children in school, 30,000+ with clean water access — across 10 Nigerian states since 2019.",
  alternates: { canonical: "https://cbi.ngo/impact" },
  openGraph: {
    title: "CBI Impact — 1,500,000+ Lives Reached Across Nigeria",
    description:
      "Verified, measurable impact across 10 Nigerian states. From 500 people in 2019 to over 1,500,000 — every number is a real person whose life we touched.",
    url: "https://cbi.ngo/impact",
    images: [{ url: "/images/cbi-medical-outreach.jpg", width: 1200, height: 630, alt: "CBI medical outreach" }],
  },
};

export default function ImpactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
