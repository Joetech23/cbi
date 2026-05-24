import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events — Workshops, Outreach & Community Programmes",
  description:
    "Upcoming and past events from Care Best Initiative — medical outreaches, training workshops, community engagement and partnership convenings across Nigeria.",
  alternates: { canonical: "https://cbi.ngo/events" },
  openGraph: {
    title: "CBI Events — Workshops, Outreach & Community Programmes",
    description:
      "Join our upcoming events or browse past medical outreaches, workshops and community programmes.",
    url: "https://cbi.ngo/events",
    type: "website",
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
