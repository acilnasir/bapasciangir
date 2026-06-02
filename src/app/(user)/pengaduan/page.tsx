import type { Metadata } from "next";
import PengaduanClient from "./PengaduanClient";

export const metadata: Metadata = {
  title: "Pengaduan Masyarakat",
  description:
    "Layanan Pengaduan Masyarakat Balai Pemasyarakatan Kelas II Purwokerto. Sampaikan laporan, kritik, saran, atau pengaduan terkait pelayanan secara mudah, aman, dan transparan.",

  keywords: [
    "Pengaduan Bapas Purwokerto",
    "Layanan Pengaduan Masyarakat",
    "Bapas Purwokerto",
    "Pengaduan Pelayanan",
    "Pelaporan Masyarakat",
    "Kementerian Imigrasi dan Pemasyarakatan",
    "Whistleblowing",
    "Layanan Publik Bapas",
  ],

  openGraph: {
    title: "Pengaduan Masyarakat",
    description:
      "Sampaikan pengaduan, kritik, dan saran terkait pelayanan Balai Pemasyarakatan Kelas II Purwokerto.",
    url: "https://bapaspurwokerto.id/pengaduan",
    siteName: "Bapas Purwokerto",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/image/logo_pemasyarakatan.png",
        width: 1200,
        height: 630,
        alt: "Layanan Pengaduan Bapas Purwokerto",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Pengaduan Masyarakat | Bapas Purwokerto",
    description:
      "Layanan pengaduan masyarakat Balai Pemasyarakatan Kelas II Purwokerto.",
    images: ["/image/logo_pemasyarakatan.png"],
  },

  alternates: {
    canonical: "https://bapaspurwokerto.id/pengaduan",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <PengaduanClient />;
}
