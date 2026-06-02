import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/profil`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/berita`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/publikasi`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/wilayah-kerja`,
      lastModified: new Date(),
    },
  ];
}
