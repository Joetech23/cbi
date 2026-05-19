import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Get in Touch",
  description:
    "Contact Care Best Initiative for partnership enquiries, media requests, volunteer opportunities or general information. Based in Abuja, Nigeria — serving communities across the country.",
  alternates: { canonical: "https://cbi.ngo/contact" },
  openGraph: {
    title: "Contact Care Best Initiative",
    description:
      "Reach out for partnerships, media, or general enquiries. We'd love to hear from you.",
    url: "https://cbi.ngo/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
