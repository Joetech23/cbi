import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team — Leadership & Staff",
  description:
    "Meet the dedicated team behind Care Best Initiative — humanitarian professionals, field staff and programme coordinators working across Nigeria to deliver integrated care.",
  alternates: { canonical: "https://cbi.ngo/team" },
  openGraph: {
    title: "CBI Team — Leadership & Staff",
    description: "Meet the people delivering humanitarian impact across Nigeria.",
    url: "https://cbi.ngo/team",
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
