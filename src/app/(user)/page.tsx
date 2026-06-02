import type { Metadata } from "next";

import BeritaSection from "../components/views/berita";
import ResultSurveySection from "../components/views/hasil";
import HeroSection from "../components/views/hero";
import InfografisSection from "../components/views/infografis";
import SurveySection from "../components/views/survey";
import CTASection from "../components/views/cta";
import CTAKandaSection from "../components/views/cta/kanda";

export const metadata: Metadata = {
  title: "Balai Pemasyarakatan Kelas II Purwokerto",
  description:
    "Website resmi Balai Pemasyarakatan Kelas II Purwokerto. Menyediakan informasi layanan, berita, profil, wilayah kerja, dan kegiatan pembimbingan kemasyarakatan di Banyumas Raya.",

  keywords: [
    "Bapas Purwokerto",
    "Balai Pemasyarakatan Purwokerto",
    "Balai Pemasyarakatan Kelas II Purwokerto",
    "Pemasyarakatan",
    "Banyumas",
    "Pembimbing Kemasyarakatan",
    "Litmas",
    "Pendampingan Anak Berhadapan dengan Hukum",
  ],

  alternates: {
    canonical: "https://bapaspurwokerto.id",
  },

  openGraph: {
    title: "Balai Pemasyarakatan Kelas II Purwokerto",
    description: "Website resmi Balai Pemasyarakatan Kelas II Purwokerto.",
    url: "https://bapaspurwokerto.id",
    siteName: "Bapas Purwokerto",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://bapaspurwokerto.id/image/kantor.jpg",
        width: 1200,
        height: 630,
        alt: "Gedung Bapas Purwokerto",
      },
    ],
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
