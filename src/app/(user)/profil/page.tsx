import type { Metadata } from "next";
import ProfilClient from "./ProfilClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bapaspurwokerto.id"),

  title: "Profil Bapas Purwokerto",

  description:
    "Profil Balai Pemasyarakatan Kelas II Purwokerto, visi dan misi, struktur organisasi, pejabat struktural, sejarah perjalanan, serta profil Kepala Bapas Purwokerto.",

  keywords: [
    "Profil Bapas Purwokerto",
    "Balai Pemasyarakatan Purwokerto",
    "Kepala Bapas Purwokerto",
    "Struktur Organisasi Bapas Purwokerto",
    "Sejarah Bapas Purwokerto",
    "Bapas Kelas II Purwokerto",
  ],

  alternates: {
    canonical: "/profil",
  },

  openGraph: {
    title: "Profil Bapas Purwokerto",
    description:
      "Informasi lengkap mengenai profil Balai Pemasyarakatan Kelas II Purwokerto.",
    url: "/profil",
    siteName: "Bapas Purwokerto",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/image/foto-2.png",
        width: 1200,
        height: 630,
        alt: "Profil Bapas Purwokerto",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Profil Bapas Purwokerto",
    description:
      "Profil Balai Pemasyarakatan Kelas II Purwokerto beserta visi misi dan struktur organisasi.",
    images: ["/image/foto-2.png"],
  },
};

export default function Page() {
  return <ProfilClient />;
}
