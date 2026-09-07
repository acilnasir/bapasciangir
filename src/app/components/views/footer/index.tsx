"use client";

import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { FaThreads } from "react-icons/fa6";

export default function FooterSection() {
  return (
    <>
      {/* MEDIA SOSIAL */}
      <section className="w-full bg-white] py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-start">
          {/* LEFT */}
          <div>
            <h2 className="text-4xl font-bold text-primary mb-4">
              Ikuti Kami di Media Sosial
            </h2>

            <p className="text-gray-600 leading-relaxed mb-8 max-w-xl">
              Dapatkan informasi terbaru mengenai kegiatan, pelayanan,
              publikasi, dan informasi resmi Bapas Ciangir melalui media
              sosial kami.
            </p>

            {/* SOCIAL ICON */}
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="https://www.instagram.com/bapaspwt?igsh=eDYxa2VwenM1bjNq&utm_source=qr"
                className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <FaInstagram size={20} />
              </Link>

              <Link
                href="https://www.threads.com/@bapaspwt"
                className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <FaThreads size={20} />
              </Link>

              <Link
                href="https://www.facebook.com/share/1BLvgbYe6B/?mibextid=wwXIfr"
                className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <FaFacebookF size={20} />
              </Link>

              <Link
                href="https://www.tiktok.com/@bapas_ciangir?_t=ZS-8zxONV2Utfd&_r=1"
                className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <FaTiktok size={20} />
              </Link>

              <Link
                href="https://x.com/bapas2_pwt?s=21"
                className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <FaX size={20} />
              </Link>

              <Link
                href="https://youtube.com/@bapasciangir4891?si=qPFt068MzJXDhKfC"
                className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <FaYoutube size={20} />
              </Link>
            </div>
          </div>

          {/* JAM LAYANAN */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock3 className="text-primary" />
              </div>

              <h3 className="text-2xl font-bold text-primary">Jam Layanan</h3>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-neutral pb-4">
                <span className="text-gray-600">Senin - Kamis</span>

                <span className="font-semibold text-primary">
                  07:30 - 16:00 WIB
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-neutral pb-4">
                <span className="text-gray-600">Jumat</span>

                <span className="font-semibold text-primary">
                  07:30 - 16:30 WIB
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-neutral pb-4">
                <span className="text-gray-600">Sabtu</span>

                <span className="font-semibold text-primary">
                  08:00 - 15:00 WIB
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Minggu dan Tanggal merah</span>

                <span className="font-semibold text-red-500">Tutup</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary text-white pt-16 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 mb-12">
            {/* LOGO */}
            <div>
              <div className="flex items-center gap-4 mb-5">
                <Image
                  src={"/image/logo_pemasyarakatan.png"}
                  alt="Logo"
                  width={1000}
                  height={1000}
                  className="w-14 h-14 object-contain"
                />

                <div>
                  <h2 className="text-2xl font-bold leading-tight">
                    Bapas
                    <br />
                    Ciangir
                  </h2>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed text-sm">
                Balai Pemasyarakatan Kelas II Ciangir di bawah naungan
                Kementerian Imigrasi dan Pemasyarakatan.
              </p>

              {/* SOCIAL */}
              <div className="flex items-center gap-3 mt-6">
                <Link
                  href="https://www.instagram.com/bapaspwt?igsh=eDYxa2VwenM1bjNq&utm_source=qr"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all duration-300"
                >
                  <FaInstagram size={18} />
                </Link>
                <Link
                  href="https://www.threads.com/@bapaspwt"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all duration-300"
                >
                  <FaThreads size={18} />
                </Link>
                <Link
                  href="https://www.tiktok.com/@bapas_ciangir?_t=ZS-8zxONV2Utfd&_r=1"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all duration-300"
                >
                  <FaTiktok size={18} />
                </Link>
                <Link
                  href="https://x.com/bapas2_pwt?s=21"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all duration-300"
                >
                  <FaX size={18} />
                </Link>
                <Link
                  href="https://www.facebook.com/share/1BLvgbYe6B/?mibextid=wwXIfr"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all duration-300"
                >
                  <FaFacebookF size={18} />
                </Link>
                <Link
                  href="https://youtube.com/@bapasciangir4891?si=qPFt068MzJXDhKfC"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all duration-300"
                >
                  <FaYoutube size={18} />
                </Link>
              </div>
            </div>

            {/* KONTAK */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-yellow-400">
                Kontak
              </h3>

              <div className="space-y-5 text-sm text-gray-300">
                <div className="flex gap-3">
                  <MapPin size={18} className="mt-0.5" />
                  <p>
                    Jl. Pasukan Pelajar Imam No.7, Pamijen Lor, Pamijen,
                    Sokaraja, Banyumas Regency, Central Java 53181
                  </p>
                </div>

                <div className="flex gap-3">
                  <Phone size={18} className="mt-0.5" />

                  <p>(0281) 636608</p>
                </div>

                <div className="flex gap-3">
                  <Mail size={18} className="mt-0.5" />

                  <p>bapas_ciangir@yahoo.com</p>
                </div>
              </div>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-yellow-400">
                Tautan Cepat
              </h3>

              <div className="flex flex-col gap-4 text-sm text-gray-300">
                <Link href="/" className="hover:text-yellow-400 transition-all">
                  Beranda
                </Link>

                <Link
                  href="/profil"
                  className="hover:text-yellow-400 transition-all"
                >
                  Profil
                </Link>

                <Link
                  href="/pengaduan"
                  className="hover:text-yellow-400 transition-all"
                >
                  Pengaduan
                </Link>

                <Link
                  href="/publikasi"
                  className="hover:text-yellow-400 transition-all"
                >
                  Publikasi
                </Link>
              </div>
            </div>

            {/* MAP */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-yellow-400">
                Lokasi
              </h3>

              <div className="overflow-hidden rounded-2xl border border-white/10 h-56">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2383731777027!2d109.2670469747622!3d-7.4388558925720085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655c02d35ef92b%3A0x801f9dff2fa1c1f1!2sBalai%20Pemasyarakatan%20Kelas%20II%20Ciangir!5e0!3m2!1sid!2sid!4v1779680981593!5m2!1sid!2sid"
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="border-t border-white/10 pt-6 text-center text-sm text-gray-400">
            © 2026 Bapas Ciangir. Seluruh Hak Cipta Dilindungi.
          </div>
        </div>
      </footer>
    </>
  );
}
