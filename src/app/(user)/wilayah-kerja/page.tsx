import type { Metadata } from "next";
import WilayahClient from "./WilayahKerjaClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bapasciangir.id"),

  title: "Wilayah Kerja Bapas Ciangir",
  description:
    "Informasi wilayah kerja Balai Pemasyarakatan (Bapas) Kelas II Ciangir yang meliputi Kabupaten Banyumas, Purbalingga, Banjarnegara, dan Kebumen beserta data klien pemasyarakatan.",

  keywords: [
    "Wilayah Kerja Bapas Ciangir",
    "Bapas Ciangir",
    "Balai Pemasyarakatan Ciangir",
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
    title: "Wilayah Kerja Bapas Ciangir",
    description:
      "Cakupan wilayah kerja Bapas Kelas II Ciangir meliputi Banyumas, Purbalingga, Banjarnegara, dan Kebumen dengan layanan pembimbingan kemasyarakatan yang profesional.",
    url: "/wilayah-kerja",
    siteName: "Bapas Ciangir",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/image/foto-2.png",
        width: 1200,
        height: 630,
        alt: "Wilayah Kerja Bapas Kelas II Ciangir",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Wilayah Kerja | Bapas Kelas II Ciangir",
    description:
      "Informasi wilayah kerja dan statistik klien Bapas Kelas II Ciangir.",
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
