import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers — Join Our Humanitarian Team",
  description:
    "Build your career with Care Best Initiative. Explore open positions in programme management, field operations, monitoring & evaluation, and humanitarian response across Nigeria.",
  alternates: { canonical: "https://cbi.ngo/careers" },
  keywords: [
    "NGO jobs Nigeria",
    "humanitarian jobs Nigeria",
    "CBI careers",
    "programme manager Nigeria",
    "field officer jobs Nigeria",
    "WASH officer Nigeria",
    "M&E jobs Nigeria",
  ],
  openGraph: {
    title: "Careers at Care Best Initiative — Join Our Humanitarian Team",
    description:
      "Open positions across programme management, field operations, and humanitarian response in Nigeria.",
    url: "https://cbi.ngo/careers",
    type: "website",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
