import type { Metadata } from "next";
import ProfilClient from "./ProfilClient";

export const metadata: Metadata = {
  title: "Profil Bapas Purwokerto",
  description:
    "Profil Balai Pemasyarakatan Kelas II Purwokerto, visi dan misi, struktur organisasi, pejabat struktural, sejarah perjalanan, serta profil Kepala Bapas Purwokerto.",
  keywords: [
    "Profil Bapas Purwokerto",
    "Balai Pemasyarakatan Purwokerto",
    "Kepala Bapas Purwokerto",
    "Struktur Organisasi Bapas Purwokerto",
    "Pejabat Struktural Bapas",
    "Sejarah Bapas Purwokerto",
    "Bapas Kelas II Purwokerto",
    "Pemasyarakatan Purwokerto",
  ],
  alternates: {
    canonical: "https://bapaspurwokerto.id/profil",
  },
  openGraph: {
    title: "Profil Bapas Purwokerto",
    description:
      "Informasi lengkap mengenai profil Balai Pemasyarakatan Kelas II Purwokerto.",
    url: "https://bapaspurwokerto.id/profil",
    siteName: "Bapas Purwokerto",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://bapaspurwokerto.id/image/foto%202.png",
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
    images: ["https://bapaspurwokerto.id/image/foto%202.png"],
  },
};

export default function Page() {
  return <ProfilClient />;
}
