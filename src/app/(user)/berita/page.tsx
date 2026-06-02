import type { Metadata } from "next";
import BeritaClient from "./BeritaClient";

export const metadata: Metadata = {
  title: "Berita & Informasi Terbaru Bapas Purwokerto",
  description:
    "Kumpulan berita, kegiatan, prestasi, pengumuman, dan informasi terbaru Balai Pemasyarakatan Kelas II Purwokerto.",

  keywords: [
    "Berita Bapas Purwokerto",
    "Kegiatan Bapas Purwokerto",
    "Pengumuman Bapas Purwokerto",
    "Prestasi Bapas Purwokerto",
    "Pemasyarakatan Purwokerto",
    "Balai Pemasyarakatan Purwokerto",
  ],

  alternates: {
    canonical: "https://bapaspurwokerto.id/berita",
  },

  openGraph: {
    title: "Berita Bapas Purwokerto",
    description:
      "Kumpulan berita dan informasi terbaru Balai Pemasyarakatan Kelas II Purwokerto.",
    url: "https://bapaspurwokerto.id/berita",
    siteName: "Bapas Purwokerto",
    type: "website",
  },
};

export default function Page() {
  return <BeritaClient />;
}
