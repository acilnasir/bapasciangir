import type { Metadata } from "next";

import BeritaSection from "../components/views/berita";
import ResultSurveySection from "../components/views/hasil";
import HeroSection from "../components/views/hero";
import InfografisSection from "../components/views/infografis";
import SurveySection from "../components/views/survey";
import CTASection from "../components/views/cta";
import CTAKandaSection from "../components/views/cta/kanda";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bapaspurwokerto.id"),

  applicationName: "Bapas Purwokerto",
  category: "Government",

  title: "Balai Pemasyarakatan Kelas II Purwokerto",

  description:
    "Website resmi Balai Pemasyarakatan Kelas II Purwokerto. Menyediakan informasi layanan publik, berita, profil, Litmas, wilayah kerja, serta kegiatan pembimbingan kemasyarakatan di Banyumas Raya.",

  keywords: [
    "Bapas Purwokerto",
    "Balai Pemasyarakatan Purwokerto",
    "Bapas Kelas II Purwokerto",
    "Pemasyarakatan Indonesia",
    "Banyumas Raya",
    "Pembimbing Kemasyarakatan",
    "Litmas",
    "Layanan Publik Pemasyarakatan",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Balai Pemasyarakatan Kelas II Purwokerto",
    description:
      "Website resmi Balai Pemasyarakatan Kelas II Purwokerto - layanan publik, berita, profil, dan informasi pemasyarakatan.",
    url: "/",
    siteName: "Bapas Purwokerto",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/image/kantor.jpg",
        width: 1200,
        height: 630,
        alt: "Gedung Bapas Purwokerto",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bapas Purwokerto",
    description: "Website resmi Balai Pemasyarakatan Kelas II Purwokerto.",
    images: ["/image/kantor.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <CTASection />
      <BeritaSection />
      <CTAKandaSection />
      <InfografisSection />
      <ResultSurveySection />
      <SurveySection />
    </>
  );
}
