import type { Metadata } from "next";
import BeritaClient from "./BeritaClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bapasciangir.id"),

  title: "Berita & Informasi Terbaru Bapas Ciangir",
  description:
    "Kumpulan berita, kegiatan, prestasi, pengumuman, dan informasi terbaru Balai Pemasyarakatan Kelas II Ciangir.",

  keywords: [
    "Berita Bapas Ciangir",
    "Kegiatan Bapas Ciangir",
    "Pengumuman Bapas Ciangir",
    "Prestasi Bapas Ciangir",
    "Pemasyarakatan Ciangir",
    "Balai Pemasyarakatan Ciangir",
  ],

  alternates: {
    canonical: "/berita",
  },

  openGraph: {
    title: "Berita Bapas Ciangir",
    description:
      "Kumpulan berita dan informasi terbaru Balai Pemasyarakatan Kelas II Ciangir.",
    url: "/berita",
    siteName: "Bapas Ciangir",
    type: "website",
  },
};

export default function Page() {
  return <BeritaClient />;
}
