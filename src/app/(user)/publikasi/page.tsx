import type { Metadata } from "next";
import PublikasiClient from "./PublikasiClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bapasciangir.id"),

  title: "Publikasi Dokumen Bapas Ciangir",

  description:
    "Akses dokumen publik Balai Pemasyarakatan Kelas II Ciangir, meliputi laporan kinerja, perencanaan strategis, transparansi anggaran, dan dokumen publik lainnya.",

  keywords: [
    "Publikasi Bapas Ciangir",
    "Dokumen Publik",
    "Laporan Kinerja Bapas Ciangir",
    "Transparansi Anggaran Bapas",
    "Informasi Publik Bapas",
    "Bapas Kelas II Ciangir",
    "Laporan Tahunan Pemasyarakatan",
  ],

  alternates: {
    canonical: "/publikasi",
  },

  openGraph: {
    title: "Publikasi Dokumen | Bapas Ciangir",
    description:
      "Akses dokumen publik, laporan kinerja, dan transparansi anggaran Balai Pemasyarakatan Kelas II Ciangir.",
    url: "/publikasi",
    siteName: "Bapas Ciangir",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/image/logo_pemasyarakatan.png",
        width: 1200,
        height: 630,
        alt: "Publikasi Dokumen Bapas Ciangir",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Publikasi Dokumen | Bapas Ciangir",
    description: "Dokumen publik dan transparansi anggaran Bapas Ciangir.",
    images: ["/image/logo_pemasyarakatan.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <PublikasiClient />;
}
