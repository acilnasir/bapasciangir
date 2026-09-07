import type { Metadata } from "next";
import LitmasAnakClient from "./LitmasAnakClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bapasciangir.id"),
  title: "Tracking Litmas Anak",

  description:
    "Layanan Tracking Litmas Anak Bapas Kelas II Ciangir. Cari dan pantau status penelitian kemasyarakatan (Litmas) berdasarkan nama klien secara cepat, transparan, dan mudah diakses.",

  keywords: [
    "Tracking Litmas",
    "Tracking Litmas Anak",
    "Litmas Anak",
    "Cek Status Litmas",
    "Penelitian Kemasyarakatan",
    "Bapas Ciangir",
    "Balai Pemasyarakatan Ciangir",
    "Status Litmas",
    "Layanan Litmas",
    "Pemasyarakatan",
    "Kementerian Imigrasi dan Pemasyarakatan",
    "Klien Pemasyarakatan",
  ],

  openGraph: {
    title: "Tracking Litmas Anak",
    description:
      "Pantau status penelitian kemasyarakatan (Litmas) secara online melalui layanan resmi Bapas Kelas II Ciangir.",

    url: "/litmas-anak",

    siteName: "Bapas Ciangir",

    type: "website",

    locale: "id_ID",

    images: [
      {
        url: "/image/logo_pemasyarakatan.png",
        width: 1200,
        height: 630,
        alt: "Tracking Litmas Anak Bapas Ciangir",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Tracking Litmas Anak | Bapas Ciangir",

    description:
      "Layanan pencarian dan pelacakan status Litmas Anak Bapas Kelas II Ciangir.",

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
