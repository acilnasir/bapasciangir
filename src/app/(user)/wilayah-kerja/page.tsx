import type { Metadata } from "next";
import WilayahClient from "./WilayahKerjaClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bapaspurwokerto.id"),

  title: "Wilayah Kerja Bapas Purwokerto",
  description:
    "Informasi wilayah kerja Balai Pemasyarakatan (Bapas) Kelas II Purwokerto yang meliputi Kabupaten Banyumas, Purbalingga, Banjarnegara, dan Kebumen beserta data klien pemasyarakatan.",

  keywords: [
    "Wilayah Kerja Bapas Purwokerto",
    "Bapas Purwokerto",
    "Balai Pemasyarakatan Purwokerto",
    "Banyumas",
    "Purbalingga",
    "Banjarnegara",
    "Kebumen",
    "Klien Pemasyarakatan",
    "Pembimbing Kemasyarakatan",
  ],

  alternates: {
    canonical: "/wilayah-kerja",
  },

  openGraph: {
    title: "Wilayah Kerja Bapas Purwokerto",
    description:
      "Cakupan wilayah kerja Bapas Kelas II Purwokerto meliputi Banyumas, Purbalingga, Banjarnegara, dan Kebumen dengan layanan pembimbingan kemasyarakatan yang profesional.",
    url: "/wilayah-kerja",
    siteName: "Bapas Purwokerto",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/image/foto-2.png",
        width: 1200,
        height: 630,
        alt: "Wilayah Kerja Bapas Kelas II Purwokerto",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Wilayah Kerja | Bapas Kelas II Purwokerto",
    description:
      "Informasi wilayah kerja dan statistik klien Bapas Kelas II Purwokerto.",
    images: ["/image/foto-2.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <WilayahClient />;
}
