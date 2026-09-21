import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Only lists pages that are actually indexable. Excludes: /admin/* (noindex, gated),
 * the legal pages (noindex until real policy text replaces the "not yet published"
 * placeholder — see their per-page metadata), and /programmes/[slug] (no real
 * programmes exist yet, so every slug is currently a noindex placeholder too).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" },
    { path: "/programmes", priority: 0.8, changeFrequency: "weekly" },
    { path: "/corporate-training", priority: 0.7, changeFrequency: "monthly" },
    { path: "/events", priority: 0.7, changeFrequency: "weekly" },
    { path: "/media", priority: 0.6, changeFrequency: "weekly" },
    { path: "/testimonials", priority: 0.6, changeFrequency: "monthly" },
    { path: "/knowledge-centre", priority: 0.6, changeFrequency: "weekly" },
    { path: "/resources", priority: 0.5, changeFrequency: "monthly" },
    { path: "/leadership", priority: 0.6, changeFrequency: "monthly" },
    { path: "/clients", priority: 0.5, changeFrequency: "monthly" },
    { path: "/partnerships", priority: 0.6, changeFrequency: "monthly" },
    { path: "/careers", priority: 0.5, changeFrequency: "monthly" },
    { path: "/register", priority: 0.9, changeFrequency: "monthly" },
    { path: "/verify-certificate", priority: 0.4, changeFrequency: "yearly" },
    { path: "/faq", priority: 0.5, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
