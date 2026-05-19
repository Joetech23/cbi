import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Care Best Initiative",
    short_name: "CBI",
    description:
      "A National NGO delivering integrated humanitarian programs across Nigeria — healthcare, clean water, education and protection since 2019.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0102F1",
    orientation: "portrait-primary",
    categories: ["education", "health", "charity"],
    lang: "en-NG",
    icons: [
      {
        src: "/images/logo-blue.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/images/logo-blue.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/opengraph-image.jpg",
        sizes: "1200x630",
        type: "image/jpeg",
      },
    ],
  };
}
