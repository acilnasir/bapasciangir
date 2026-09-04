import type { Metadata } from "next";
import LitmasClient from "./LitmasClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bapasciangir.id"),

  title: "Tracking Litmas Dewasa",

  description:
    "Layanan Tracking Litmas Dewasa Bapas Kelas II Ciangir. Cari dan pantau status penelitian kemasyarakatan (Litmas) berdasarkan nama klien secara cepat, transparan, dan mudah diakses.",

  keywords: [
    "Tracking Litmas",
    "Tracking Litmas Dewasa",
    "Litmas Dewasa",
    "Cek Status Litmas",
    "Penelitian Kemasyarakatan",
    "Bapas Ciangir",
    "Status Litmas",
  ],

  openGraph: {
    title: "Tracking Litmas Dewasa",
    description:
      "Pantau status penelitian kemasyarakatan (Litmas) secara online melalui layanan resmi Bapas Kelas II Ciangir.",
    url: "/litmas",
    siteName: "Bapas Ciangir",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/image/logo_pemasyarakatan.png",
        width: 1200,
        height: 630,
        alt: "Tracking Litmas Dewasa Bapas Ciangir",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Tracking Litmas Dewasa | Bapas Ciangir",
    description:
      "Layanan pencarian dan pelacakan status Litmas Dewasa Bapas Kelas II Ciangir.",
    images: ["/image/logo_pemasyarakatan.png"],
  },

  alternates: {
    canonical: "/litmas",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <LitmasClient />;
}
