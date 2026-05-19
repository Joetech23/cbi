import type { MetadataRoute } from "next";

const BASE = "https://cbi.ngo";

// Static routes with priorities and change frequencies
const ROUTES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
}[] = [
  { path: "/",             priority: 1.0,  changeFrequency: "weekly"  },
  { path: "/about",        priority: 0.9,  changeFrequency: "monthly" },
  { path: "/programs",     priority: 0.9,  changeFrequency: "monthly" },
  { path: "/impact",       priority: 0.85, changeFrequency: "monthly" },
  { path: "/donate",       priority: 0.95, changeFrequency: "weekly"  },
  { path: "/contact",      priority: 0.8,  changeFrequency: "monthly" },
  { path: "/blog",         priority: 0.85, changeFrequency: "weekly"  },
  { path: "/gallery",      priority: 0.7,  changeFrequency: "monthly" },
  { path: "/team",         priority: 0.75, changeFrequency: "monthly" },
  { path: "/events",       priority: 0.7,  changeFrequency: "weekly"  },
  { path: "/publications", priority: 0.65, changeFrequency: "monthly" },
  { path: "/careers",      priority: 0.65, changeFrequency: "weekly"  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
