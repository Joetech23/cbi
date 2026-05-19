import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Our Story, Mission & Team",
  description:
    "Founded in 2019, Care Best Initiative is a registered Nigerian NGO delivering integrated humanitarian programmes across 10 states. Learn about our mission, values, leadership and 1,500,000+ lives reached.",
  alternates: { canonical: "https://cbi.ngo/about" },
  openGraph: {
    title: "About Care Best Initiative — Our Story, Mission & Team",
    description:
      "Founded in 2019, CBI delivers integrated humanitarian programmes — healthcare, education, WASH, nutrition and protection — across 10 Nigerian states.",
    url: "https://cbi.ngo/about",
    images: [{ url: "/images/cbi-community-1.jpg", width: 1200, height: 630, alt: "CBI community engagement" }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
