"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  type MenuItem =
    | {
        name: string;
        href: string;
      }
    | {
        name: string;
        dropdown: true;
      };

  const menus: MenuItem[] = [
    { name: "Beranda", href: "/" },
    { name: "Profil", href: "/profil" },
    { name: "Layanan Umum", dropdown: true },
    { name: "Pengaduan", href: "/pengaduan" },
    { name: "Berita", href: "/berita" },
    { name: "Publikasi", href: "/publikasi" },
  ];

  const layananMenu = [
    {
      name: "Tracking Litmas Dewasa",
      href: "/litmas",
    },
    {
      name: "Tracking Litmas Anak",
      href: "/litmas-anak",
    },
    {
      name: "SIBATAPAS (Buku Tamu dan Apel Klien)",
      href: "https://sibatapas.vercel.app/",
    },
    {
      name: "Survei SPAK dan SPKP",
      href: "https://star-survei3a.kemenimipas.go.id/ly/oBs4KCrb",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur bg-white/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/image/imipas.png" alt="logo" width={27} height={27} />
          <Image
            src="/image/logo_pemasyarakatan.png"
            alt="logo"
            width={27}
            height={27}
          />

          <Link
            href="/"
            className="text-2xl font-bold tracking-wide text-primary transition-all duration-300"
          >
            BAPAS Ciangir
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          {menus.map((menu) => {
            if ("dropdown" in menu) {
              return (
                <div key={menu.name} className="relative">
                  <button
                    onClick={() => setServiceOpen(!serviceOpen)}
                    className="flex items-center gap-1 text-sm font-medium text-[#44464F] transition hover:text-primary"
                  >
                    Layanan Umum
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        serviceOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {serviceOpen && (
                    <div className="absolute left-0 top-full mt-3 w-64 overflow-hidden rounded-xl  bg-white shadow-xl">
                      {layananMenu.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-3 hover:bg-gray-50"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === menu.href;

            return (
              <Link
                key={menu.name}
                href={menu.href}
                className={`text-sm font-medium transition-all duration-300 hover:text-primary ${
                  isActive
                    ? "border-b-2 border-tertiary text-tertiary"
                    : "text-[#44464F]"
                }`}
              >
                {menu.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => router.push("/wilayah-kerja")}
            className="rounded-lg bg-neutral px-6 py-2.5 text-primary transition hover:opacity-90 hover:bg-primary hover:text-neutral"
          >
            Wilayah Kerja
          </button>

          {session?.user ? (
            <button
              onClick={() => signOut()}
              className="rounded-lg bg-primary px-6 py-2.5 text-neutral transition hover:opacity-90 hover:bg-neutral hover:text-primary"
            >
              {session.user.name}
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="rounded-lg bg-primary px-6 py-2.5 text-neutral transition hover:opacity-90 hover:bg-neutral hover:text-primary"
            >
              Masuk
            </button>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center rounded-lg p-2 text-primary transition hover:bg-primary/10 md:hidden"
          aria-label="Toggle Menu"
        >
          <div className="relative h-6 w-6">
            <Menu
              className={`absolute transition-all duration-300 ${
                isOpen
                  ? "rotate-90 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
            />

            <X
              className={`absolute transition-all duration-300 ${
                isOpen
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-0 opacity-0"
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-500 md:hidden ${
          isOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2 border-t border-primary/10  px-4 py-4">
          {menus.map((menu, index) => {
            if ("dropdown" in menu) {
              return (
                <div key={menu.name} className="overflow-hidden rounded-xl ">
                  <button
                    onClick={() => setServiceOpen(!serviceOpen)}
                    className="flex w-full items-center justify-between px-4 py-3"
                  >
                    <span className="text-sm font-medium">Layanan Umum</span>

                    <ChevronDown
                      size={18}
                      className={`transition-transform ${
                        serviceOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`transition-all duration-300 ${
                      serviceOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    {layananMenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          setIsOpen(false);
                          setServiceOpen(false);
                        }}
                        className="block px-8 py-3 text-sm text-[#44464F] hover:bg-primary/5"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            const isActive = pathname === menu.href;

            return (
              <Link
                key={menu.name}
                href={menu.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-[#44464F] hover:bg-primary/5"
                }`}
                style={{
                  transitionDelay: `${index * 70}ms`,
                }}
              >
                {menu.name}
              </Link>
            );
          })}

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <button
              onClick={() => router.push("/wilayah-kerja")}
              className="rounded-lg bg-neutral px-6 py-3 text-primary"
            >
              Wilayah Kerja
            </button>

            <button
              onClick={() => router.push("/login")}
              className="rounded-lg bg-primary px-6 py-3 text-neutral"
            >
              Masuk
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
