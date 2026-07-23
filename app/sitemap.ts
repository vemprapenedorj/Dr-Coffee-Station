import type { MetadataRoute } from "next";
import { blogArticles } from "@/content/blog";
import { siteConfig } from "@/content/site";

const staticRoutes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/cardapio", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/sobre", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/servicos", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contato", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/experiencias", priority: 0.7, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: "2026-07-23",
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const articles: MetadataRoute.Sitemap = blogArticles.map((article) => ({
    url: `${siteConfig.url}/blog/${article.slug}`,
    lastModified: article.publishedAt,
    changeFrequency: "monthly",
    priority: 0.7,
    images: [`${siteConfig.url}${article.image}`],
  }));

  return [...staticPages, ...articles];
}
