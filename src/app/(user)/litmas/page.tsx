import type { Metadata } from "next";
import LitmasClient from "./LitmasClient";

export const metadata: Metadata = {
  title: "Tracking Litmas Dewasa",

  description:
    "Layanan Tracking Litmas Dewasa Bapas Kelas II Purwokerto. Cari dan pantau status penelitian kemasyarakatan (Litmas) berdasarkan nama klien secara cepat, transparan, dan mudah diakses.",

  keywords: [
    "Tracking Litmas",
    "Tracking Litmas Dewasa",
    "Litmas Dewasa",
    "Cek Status Litmas",
    "Penelitian Kemasyarakatan",
    "Bapas Purwokerto",
    "Balai Pemasyarakatan Purwokerto",
    "Status Litmas",
    "Layanan Litmas",
    "Pemasyarakatan",
    "Kementerian Imigrasi dan Pemasyarakatan",
    "Klien Pemasyarakatan",
  ],

  openGraph: {
    title: "Tracking Litmas Dewasa",
    description:
      "Pantau status penelitian kemasyarakatan (Litmas) secara online melalui layanan resmi Bapas Kelas II Purwokerto.",

    url: "https://bapaspurwokerto.id/litmas",

    siteName: "Bapas Purwokerto",

    type: "website",

    locale: "id_ID",

    images: [
      {
        url: "/image/logo_pemasyarakatan.png",
        width: 1200,
        height: 630,
        alt: "Tracking Litmas Dewasa Bapas Purwokerto",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Tracking Litmas Dewasa | Bapas Purwokerto",

    description:
      "Layanan pencarian dan pelacakan status Litmas Dewasa Bapas Kelas II Purwokerto.",

    images: ["/image/logo_pemasyarakatan.png"],
  },

  alternates: {
    canonical: "https://bapaspurwokerto.id/litmas",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <LitmasClient />;
}
