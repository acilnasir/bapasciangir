import type { Metadata } from "next";
import ProfilClient from "./ProfilClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bapasciangir.id"),

  title: "Profil Bapas Ciangir",

  description:
    "Profil Balai Pemasyarakatan Kelas II Ciangir, visi dan misi, struktur organisasi, pejabat struktural, sejarah perjalanan, serta profil Kepala Bapas Ciangir.",

  keywords: [
    "Profil Bapas Ciangir",
    "Balai Pemasyarakatan Ciangir",
    "Kepala Bapas Ciangir",
    "Struktur Organisasi Bapas Ciangir",
    "Sejarah Bapas Ciangir",
    "Bapas Kelas II Ciangir",
  ],

  alternates: {
    canonical: "/profil",
  },

  openGraph: {
    title: "Profil Bapas Ciangir",
    description:
      "Informasi lengkap mengenai profil Balai Pemasyarakatan Kelas II Ciangir.",
    url: "/profil",
    siteName: "Bapas Ciangir",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/image/foto-2.png",
        width: 1200,
        height: 630,
        alt: "Profil Bapas Ciangir",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Profil Bapas Ciangir",
    description:
      "Profil Balai Pemasyarakatan Kelas II Ciangir beserta visi misi dan struktur organisasi.",
    images: ["/image/foto-2.png"],
  },
};

export default function Page() {
  return <ProfilClient />;
}
