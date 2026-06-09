import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./components/auth/authProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bapaspurwokerto.id"),

  title: {
    default: "Bapas Purwokerto",
    template: "%s | Bapas Purwokerto",
  },

  description:
    "Website resmi Balai Pemasyarakatan Kelas II Purwokerto. Informasi layanan, profil, berita, publikasi, wilayah kerja, dan kegiatan pembimbingan kemasyarakatan.",

  applicationName: "Bapas Purwokerto",
  category: "Government",

  keywords: [
    "Bapas Purwokerto",
    "Balai Pemasyarakatan Purwokerto",
    "Pemasyarakatan Indonesia",
    "Kemenimipas",
    "Bimbingan Kemasyarakatan",
    "Litmas",
    "Klien Pemasyarakatan",
  ],

  authors: [{ name: "Bapas Purwokerto" }],
  creator: "Bapas Purwokerto",

  icons: {
    icon: "/image/logo_pemasyarakatan.png",
  },

  openGraph: {
    title: "Bapas Purwokerto",
    description: "Website resmi Balai Pemasyarakatan Kelas II Purwokerto.",
    url: "https://www.bapaspurwokerto.id",
    siteName: "Bapas Purwokerto",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "https://www.bapaspurwokerto.id/image/kantor.jpg",
        width: 1200,
        height: 630,
        alt: "Bapas Purwokerto",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bapas Purwokerto",
    description: "Website resmi Balai Pemasyarakatan Kelas II Purwokerto.",
    images: ["https://www.bapaspurwokerto.id/image/kantor.jpg"],
  },

  verification: {
    google: "googlec82fac7c7df83869",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
