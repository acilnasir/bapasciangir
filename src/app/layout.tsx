import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./components/auth/authProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bapasciangir.id"),

  title: {
    default: "Bapas Ciangir",
    template: "%s | Bapas Ciangir",
  },

  description:
    "Website resmi Balai Pemasyarakatan Kelas II Ciangir. Informasi layanan, profil, berita, publikasi, wilayah kerja, dan kegiatan pembimbingan kemasyarakatan.",

  applicationName: "Bapas Ciangir",
  category: "Government",

  keywords: [
    "Bapas Ciangir",
    "Balai Pemasyarakatan Ciangir",
    "Pemasyarakatan Indonesia",
    "Kemenimipas",
    "Bimbingan Kemasyarakatan",
    "Litmas",
    "Klien Pemasyarakatan",
  ],

  authors: [{ name: "Bapas Ciangir" }],
  creator: "Bapas Ciangir",

  icons: {
    icon: "/image/logo_pemasyarakatan.png",
  },

  openGraph: {
    title: "Bapas Ciangir",
    description: "Website resmi Balai Pemasyarakatan Kelas II Ciangir.",
    url: "https://www.bapasciangir.id",
    siteName: "Bapas Ciangir",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "https://www.bapasciangir.id/image/kantor.jpg",
        width: 1200,
        height: 630,
        alt: "Bapas Ciangir",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bapas Ciangir",
    description: "Website resmi Balai Pemasyarakatan Kelas II Ciangir.",
    images: ["https://www.bapasciangir.id/image/kantor.jpg"],
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
