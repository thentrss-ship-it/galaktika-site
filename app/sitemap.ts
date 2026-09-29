import type { MetadataRoute } from "next";
import { products } from "../data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://galaxyopt.ru";
  const currentDate = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wholesale`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/delivery`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/catalog/${product.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: product.inStock ? 0.65 : 0.45,
  }));

  return [...staticPages, ...productPages];
}
