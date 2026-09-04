import type { Metadata } from "next";

import BeritaSection from "../components/views/berita";
import ResultSurveySection from "../components/views/hasil";
import HeroSection from "../components/views/hero";
import InfografisSection from "../components/views/infografis";
import SurveySection from "../components/views/survey";
import CTASection from "../components/views/cta";
import CTAKandaSection from "../components/views/cta/kanda";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bapasciangir.id"),

  applicationName: "Bapas Ciangir",
  category: "Government",

  title: "Balai Pemasyarakatan Kelas II Ciangir",

  description:
    "Website resmi Balai Pemasyarakatan Kelas II Ciangir. Menyediakan informasi layanan publik, berita, profil, Litmas, wilayah kerja, serta kegiatan pembimbingan kemasyarakatan di Banyumas Raya.",

  keywords: [
    "Bapas Ciangir",
    "Balai Pemasyarakatan Ciangir",
    "Bapas Kelas II Ciangir",
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
    title: "Balai Pemasyarakatan Kelas II Ciangir",
    description:
      "Website resmi Balai Pemasyarakatan Kelas II Ciangir - layanan publik, berita, profil, dan informasi pemasyarakatan.",
    url: "/",
    siteName: "Bapas Ciangir",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/image/kantor.jpg",
        width: 1200,
        height: 630,
        alt: "Gedung Bapas Ciangir",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bapas Ciangir",
    description: "Website resmi Balai Pemasyarakatan Kelas II Ciangir.",
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
