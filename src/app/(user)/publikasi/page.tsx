import type { Metadata } from "next";
import PublikasiClient from "./PublikasiClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bapaspurwokerto.id"),

  title: "Publikasi Dokumen Bapas Purwokerto",

  description:
    "Akses dokumen publik Balai Pemasyarakatan Kelas II Purwokerto, meliputi laporan kinerja, perencanaan strategis, transparansi anggaran, dan dokumen publik lainnya.",

  keywords: [
    "Publikasi Bapas Purwokerto",
    "Dokumen Publik",
    "Laporan Kinerja Bapas Purwokerto",
    "Transparansi Anggaran Bapas",
    "Informasi Publik Bapas",
    "Bapas Kelas II Purwokerto",
    "Laporan Tahunan Pemasyarakatan",
  ],

  alternates: {
    canonical: "/publikasi",
  },

  openGraph: {
    title: "Publikasi Dokumen | Bapas Purwokerto",
    description:
      "Akses dokumen publik, laporan kinerja, dan transparansi anggaran Balai Pemasyarakatan Kelas II Purwokerto.",
    url: "/publikasi",
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
    description: "Dokumen publik dan transparansi anggaran Bapas Purwokerto.",
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
