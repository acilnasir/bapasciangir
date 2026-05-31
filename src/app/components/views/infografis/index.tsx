"use client";

import React, { useEffect, useState } from "react";
import {
  Scale,
  UserCheck,
  FileText,
  Handshake,
  BadgeCheck,
} from "lucide-react";
import Image from "next/image";
import { Dashboard } from "@/types/infografis";

/* ===================== TYPES ===================== */

type Pejabat = {
  id: string;
  nama: string;
  jabatan: string;
  foto?: string | null;
};

type StatItem = [string, number | undefined];

/* ===================== COMPONENT ===================== */

export default function InfografisSection() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [kabapas, setKabapas] = useState<Pejabat | null>(null);

  /* ===================== FETCH KEPALA BAPAS ===================== */
  useEffect(() => {
    const fetchPejabat = async () => {
      try {
        const res = await fetch("/api/struktural");
        const json = await res.json();

        const data: Pejabat[] = json?.data || [];

        const kabapasData = data.find(
          (item: Pejabat) => item.jabatan === "KABAPAS",
        );

        setKabapas(kabapasData || null);
      } catch (error) {
        console.error("Gagal fetch pejabat:", error);
      }
    };

    fetchPejabat();
  }, []);

  /* ===================== FETCH DASHBOARD ===================== */
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/infografis");
        const json: Dashboard[] = await res.json();

        setDashboard(json?.[0] || null);
      } catch (error) {
        console.error("Gagal fetch dashboard:", error);
      }
    };

    fetchDashboard();
  }, []);

  const formatDate = () => {
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date());
  };

  return (
    <section className="py-16 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-white/20 pb-4">
          <div>
            <p className="text-xs text-tertiary font-medium mb-1">
              {formatDate()}
            </p>
            <h2 className="text-3xl font-bold text-tertiary">
              Infografis Operasional Harian
            </h2>
            <p className="text-sm text-gray-300 mt-1">
              Data terkini operasional dan pelayanan Bapas Kelas II Purwokerto
            </p>
          </div>

          {/* KEPALA BAPAS */}
          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/20">
            <div className="relative h-16 w-16">
              <Image
                src={kabapas?.foto || "/image/person.png"}
                alt={kabapas?.nama || "Kepala Bapas"}
                fill
                className="rounded-lg object-cover border-2 border-tertiartext-tertiary"
              />
            </div>

            <div>
              <p className="font-semibold">{kabapas?.nama || "Loading..."}</p>
              <p className="text-xs text-tertiary uppercase tracking-wider">
                {kabapas?.jabatan || "Kepala Bapas"}
              </p>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ===================== LEFT ===================== */}
          <div className="space-y-6">
            {/* JENIS PIDANA */}
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <h3 className="flex items-center gap-2 text-sm font-bold text-tertiary uppercase tracking-widest mb-4">
                <Scale size={18} />
                Jenis Pidana
              </h3>

              {dashboard?.jenisPidana?.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b border-white/10 py-1"
                >
                  <span className="text-xs text-gray-300 uppercase">
                    {item.label}
                  </span>
                  <span className="font-bold text-tertiary">{item.value}</span>
                </div>
              ))}
            </div>

            {/* KLIEN APEL */}
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <h3 className="flex items-center gap-2 text-sm font-bold text-tertiary uppercase tracking-widest mb-4">
                <UserCheck size={18} />
                Klien Apel
              </h3>

              <div className="grid grid-cols-4 gap-2 text-center">
                {(
                  [
                    ["CB", dashboard?.klien?.apelCB],
                    ["CMB", dashboard?.klien?.apelCMB],
                    ["PB", dashboard?.klien?.apelPB],
                    ["PIB", dashboard?.klien?.apelPIB],
                  ] as StatItem[]
                ).map(([label, value]) => (
                  <div key={label} className="bg-white/10 p-2 rounded">
                    <div className="text-[10px] text-gray-400">{label}</div>
                    <div className="font-bold">{value ?? 0}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* KLIEN BARU */}
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <h3 className="flex items-center gap-2 text-sm font-bold text-tertiary uppercase tracking-widest mb-4">
                <UserCheck size={18} />
                Klien Baru
              </h3>

              <div className="grid grid-cols-4 gap-2 text-center">
                {(
                  [
                    ["CB", dashboard?.klien?.baruCB],
                    ["CMB", dashboard?.klien?.baruCMB],
                    ["PB", dashboard?.klien?.baruPB],
                    ["PIB", dashboard?.klien?.baruPIB],
                  ] as StatItem[]
                ).map(([label, value]) => (
                  <div key={label} className="bg-white/10 p-2 rounded">
                    <div className="text-[10px] text-gray-400">{label}</div>
                    <div className="font-bold">{value ?? 0}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===================== MIDDLE ===================== */}
          <div className="space-y-6">
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <h3 className="flex items-center gap-2 text-sm font-bold text-tertiary uppercase tracking-widest mb-4">
                <FileText size={18} />
                Litmas
              </h3>

              {/* DEWASA */}
              <div className="mb-6">
                <span className="inline-block mb-3 px-2 py-1 text-xs bg-tertiary  text-white font-bold rounded">
                  DEWASA
                </span>

                {(
                  [
                    ["PB", dashboard?.litmas?.dewasaPB],
                    ["CB", dashboard?.litmas?.dewasaCB],
                    ["CMB", dashboard?.litmas?.dewasaCMB],
                    ["Pemb. Awal", dashboard?.litmas?.dewasaPembinaanAwal],
                    ["Perubahan Pidana", dashboard?.litmas?.dewasaPerubahan],
                    ["Mutasi", dashboard?.litmas?.dewasaMutasi],
                    ["Pra Ajudikasi", dashboard?.litmas?.dewasaPraAjudikasi],
                  ] as StatItem[]
                ).map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between border-b border-white/10 py-1"
                  >
                    <span className="text-xs text-gray-300 uppercase">
                      {label}
                    </span>
                    <span className="font-bold">{value ?? 0}</span>
                  </div>
                ))}
              </div>

              {/* ANAK */}
              <div>
                <span className="inline-block mb-3 px-2 py-1 text-xs bg-tertiary  text-white font-bold rounded">
                  ANAK
                </span>

                {(
                  [
                    ["Sidang Anak", dashboard?.litmas?.anakSidang],
                    ["Diversi", dashboard?.litmas?.anakDiversi],
                    ["PB", dashboard?.litmas?.anakPB],
                    ["CB", dashboard?.litmas?.anakCB],
                    ["Pembinaan Awal", dashboard?.litmas?.anakPembinaanAwal],
                    ["Korban", dashboard?.litmas?.anakKorban],
                    ["< 12 Tahun", dashboard?.litmas?.anakKurang12Tahun],
                  ] as StatItem[]
                ).map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between border-b border-white/10 py-1"
                  >
                    <span className="text-xs text-gray-300 uppercase">
                      {label}
                    </span>
                    <span className="font-bold">{value ?? 0}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===================== RIGHT ===================== */}
          <div className="space-y-6">
            {/* PENDAMPINGAN */}
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <h3 className="flex items-center gap-2 text-sm font-bold text-tertiary uppercase tracking-widest mb-4">
                <Handshake size={18} />
                Pendampingan
              </h3>

              {(
                [
                  ["Diversi", dashboard?.pendampingan?.diversi],
                  ["Sidang", dashboard?.pendampingan?.sidang],
                  ["Pengakhiran", dashboard?.pendampingan?.pengakhiran],
                  ["Pencabutan", dashboard?.pendampingan?.pencabutan],
                  ["Pelimpahan", dashboard?.pendampingan?.pelimpahan],
                ] as StatItem[]
              ).map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between border-b border-white/10 py-1"
                >
                  <span className="text-xs text-gray-300 uppercase">
                    {label}
                  </span>
                  <span className="font-bold text-tertiary">{value ?? 0}</span>
                </div>
              ))}
            </div>

            {/* SDM */}
            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
              <h3 className="flex items-center gap-2 text-sm font-bold text-tertiary uppercase tracking-widest mb-4">
                <BadgeCheck size={18} />
                Sumber Daya Manusia
              </h3>

              {(
                [
                  ["Hadir", dashboard?.sdm?.hadir],
                  ["Cuti", dashboard?.sdm?.cuti],
                  ["Dinas Luar", dashboard?.sdm?.dinasLuar],
                  ["Pos Bapas", dashboard?.sdm?.posBapas],
                  ["Tanpa Keterangan", dashboard?.sdm?.tanpaKeterangan],
                ] as StatItem[]
              ).map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between border-b border-white/10 py-1"
                >
                  <span className="text-xs text-gray-300 uppercase">
                    {label}
                  </span>
                  <span className="font-bold">{value ?? 0}</span>
                </div>
              ))}

              <div className="flex justify-between mt-3 pt-2 border-t border-tertiartext-tertiary/40">
                <span className="font-bold text-tertiary uppercase">
                  Total Pegawai
                </span>
                <span className="font-bold text-tertiary">
                  {dashboard?.sdm?.hadir ?? 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
