import type { Metadata } from "next";
import PublikasiClient from "./PublikasiClient";

export const metadata: Metadata = {
  title: "Publikasi Dokumen Bapas Purwokerto",
  description:
    "Akses dokumen publik Balai Pemasyarakatan Kelas II Purwokerto, meliputi laporan kinerja, perencanaan strategis, transparansi anggaran, dan dokumen publik lainnya.",

  keywords: [
    "Publikasi Dokumen",
    "Dokumen Publik",
    "Laporan Kinerja Bapas",
    "Transparansi Anggaran",
    "Bapas Purwokerto",
    "Dokumen Pemasyarakatan",
    "Laporan Tahunan",
    "Informasi Publik",
  ],

  openGraph: {
    title: "Publikasi Dokumen | Bapas Purwokerto",
    description:
      "Akses berbagai dokumen publik dan informasi transparansi anggaran Balai Pemasyarakatan Kelas II Purwokerto.",
    url: "https://bapaspurwokerto.id/publikasi",
    siteName: "Bapas Purwokerto",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/image/logo_pemasyarakatan.png",
        width: 1200,
        height: 630,
        alt: "Publikasi Dokumen Bapas Purwokerto",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Publikasi Dokumen | Bapas Purwokerto",
    description:
      "Dokumen publik, laporan kinerja, dan transparansi anggaran Bapas Purwokerto.",
    images: ["/image/logo_pemasyarakatan.png"],
  },

  alternates: {
    canonical: "https://bapaspurwokerto.id/publikasi",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <PublikasiClient />;
}
