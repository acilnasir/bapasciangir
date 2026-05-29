"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Newspaper,
  Users,
  LogOut,
  LocationEdit,
  Upload,
  Wallet,
  Star,
} from "lucide-react";

import { signOut, useSession } from "next-auth/react";
import { BiVolumeFull } from "react-icons/bi";

export default function Sidebar() {
  const pathname = usePathname();

  const { data: session } = useSession();

  const menus = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Berita",
      href: "/admin/berita",
      icon: Newspaper,
    },
    {
      name: "Pejabat Struktural",
      href: "/admin/struktural",
      icon: Users,
    },
    {
      name: "Pengaduan",
      href: "/admin/pengaduan",
      icon: BiVolumeFull,
    },
    {
      name: "Anggaran",
      href: "/admin/anggaran",
      icon: Wallet,
    },
    {
      name: "SPAK & SKPK",
      href: "/admin/survey",
      icon: Star,
    },
    {
      name: "Publikasi Dokumen",
      href: "/admin/publikasi",
      icon: Upload,
    },
    {
      name: "Wilayah Kerja",
      href: "/admin/wilayah-kerja",
      icon: LocationEdit,
    },
  ];

  return (
    <aside className="sticky top-0 flex h-full w-64 flex-col bg-primary p-6 text-white">
      {/* USER */}
      <div className="mb-2 flex items-center gap-3 rounded-2xl bg-white/10 p-4">
        <div className="overflow-hidden">
          <h2 className="truncate font-semibold">
            {session?.user?.name || "Admin"}
          </h2>

          <p className="truncate text-sm text-white/70">
            {session?.user?.email}
          </p>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 space-y-2">
        {menus.map((menu) => {
          const active = pathname === menu.href;

          const Icon = menu.icon;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                active ? "bg-tertiary text-primary" : "hover:bg-white/10"
              }`}
            >
              <Icon size={18} />
              {menu.name}
            </Link>
          );
        })}
      </nav>

      {/* SIGN OUT */}
      <button
        onClick={() =>
          signOut({
            callbackUrl: "/login",
          })
        }
        className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-3 transition hover:bg-red-500"
      >
        <LogOut size={18} />
        Keluar
      </button>
    </aside>
  );
}
