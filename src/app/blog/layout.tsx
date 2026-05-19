import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Stories — Field Reports & Impact Updates",
  description:
    "Read the latest news, field reports, and impact stories from Care Best Initiative's humanitarian programmes across Nigeria. Real stories from the communities we serve.",
  alternates: { canonical: "https://cbi.ngo/blog" },
  openGraph: {
    title: "CBI News & Stories — Field Reports & Impact Updates",
    description:
      "Latest news, impact stories, and field reports from CBI's humanitarian programmes across Nigeria.",
    url: "https://cbi.ngo/blog",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
