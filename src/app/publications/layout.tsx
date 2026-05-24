import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publications — Reports, Studies & Briefs",
  description:
    "Annual reports, programme briefs, needs assessments and research publications from Care Best Initiative's humanitarian work across Nigeria.",
  alternates: { canonical: "https://cbi.ngo/publications" },
  openGraph: {
    title: "CBI Publications — Reports, Studies & Briefs",
    description:
      "Download annual reports, programme briefs and field research from CBI's humanitarian work in Nigeria.",
    url: "https://cbi.ngo/publications",
    type: "website",
  },
};

export default function PublicationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
