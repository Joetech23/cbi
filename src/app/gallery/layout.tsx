import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — Photos from the Field",
  description:
    "A photo record of Care Best Initiative's work across Nigeria — field clinics, classrooms, water installations, community outreach and more.",
  alternates: { canonical: "https://cbi.ngo/gallery" },
  openGraph: {
    title: "CBI Gallery — Photos from the Field",
    description: "Visual evidence of impact — CBI's work across 10 Nigerian states.",
    url: "https://cbi.ngo/gallery",
    images: [{ url: "/images/cbi-community-2.jpg", width: 1200, height: 630, alt: "CBI field work" }],
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
