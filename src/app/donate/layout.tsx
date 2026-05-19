import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate — Support Humanitarian Work in Nigeria",
  description:
    "Your donation goes directly to people in need. Give securely via Paystack or bank transfer in Nigerian Naira. ₦25,000 sends a child back to school for a full term. 100% of programme funds reach beneficiaries.",
  alternates: { canonical: "https://cbi.ngo/donate" },
  keywords: [
    "donate NGO Nigeria",
    "humanitarian donation Nigeria",
    "CBI donation",
    "Nigeria charity donation",
    "Paystack donation",
    "donate for education Nigeria",
    "donate clean water Nigeria",
  ],
  openGraph: {
    title: "Donate to Care Best Initiative — Support Humanitarian Work in Nigeria",
    description:
      "100% of programme funds reach beneficiaries. Give securely via Paystack. ₦25,000 returns a child to school for a full term.",
    url: "https://cbi.ngo/donate",
    images: [{ url: "/images/cbi-children-treatment.jpg", width: 1200, height: 630, alt: "CBI children receiving care" }],
  },
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
