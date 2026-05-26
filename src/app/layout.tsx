import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./components/auth/authProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Bapas Purwokerto",
    template: "%s | Bapas Purwokerto",
  },
  description:
    "Website resmi Balai Pemasyarakatan Kelas II Purwokerto. Informasi layanan, profil, dan kegiatan pembimbingan kemasyarakatan.",
  keywords: [
    "Bapas Purwokerto",
    "Pemasyarakatan",
    "Kemenimipas",
    "Bimbingan Kemasyarakatan",
  ],
  icons: {
    icon: "/image/logo_pemasyarakatan.png",
  },
  authors: [{ name: "Bapas Purwokerto" }],
  creator: "Bapas Purwokerto",
  openGraph: {
    title: "Bapas Purwokerto",
    description: "Website resmi Balai Pemasyarakatan Kelas II Purwokerto.",
    url: "https://bapaspwt.com",
    siteName: "Bapas Purwokerto",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
