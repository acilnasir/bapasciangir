import type { Metadata } from "next";
import LitmasAnakClient from "./LitmasAnakClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bapaspurwokerto.id"),
  title: "Tracking Litmas Anak",

  description:
    "Layanan Tracking Litmas Anak Bapas Kelas II Purwokerto. Cari dan pantau status penelitian kemasyarakatan (Litmas) berdasarkan nama klien secara cepat, transparan, dan mudah diakses.",

  keywords: [
    "Tracking Litmas",
    "Tracking Litmas Anak",
    "Litmas Anak",
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
    title: "Tracking Litmas Anak",
    description:
      "Pantau status penelitian kemasyarakatan (Litmas) secara online melalui layanan resmi Bapas Kelas II Purwokerto.",

    url: "/litmas-anak",

    siteName: "Bapas Purwokerto",

    type: "website",

    locale: "id_ID",

    images: [
      {
        url: "/image/logo_pemasyarakatan.png",
        width: 1200,
        height: 630,
        alt: "Tracking Litmas Anak Bapas Purwokerto",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Tracking Litmas Anak | Bapas Purwokerto",

    description:
      "Layanan pencarian dan pelacakan status Litmas Anak Bapas Kelas II Purwokerto.",

    images: ["/image/logo_pemasyarakatan.png"],
  },

  alternates: {
    canonical: "/litmas-anak",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <LitmasAnakClient />;
}
