"use client";

import dynamic from "next/dynamic";
import { Users, Loader2 } from "lucide-react";

import Image from "next/image";

import { useEffect, useMemo, useState } from "react";

const WilayahMap = dynamic(() => import("@/app/components/views/wilayah"), {
  ssr: false,
});

interface WilayahKerja {
  id: number;

  nama: string;

  image: string;

  klienDewasa: number;

  klienAnak: number;
}

export default function WilayahClient() {
  const [wilayah, setWilayah] = useState<WilayahKerja[]>([]);

  const [loading, setLoading] = useState(true);

  // =========================
  // GET DATA
  // =========================
  useEffect(() => {
    const fetchWilayah = async () => {
      try {
        const res = await fetch("/api/wilayah-kerja");

        const result = await res.json();

        setWilayah(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWilayah();
  }, []);

  // =========================
  // TOTAL KLIEN
  // =========================
  const totalKlien = useMemo(() => {
    return wilayah.reduce(
      (acc, item) => acc + item.klienDewasa + item.klienAnak,
      0,
    );
  }, [wilayah]);

  return (
    <div className="min-h-screen bg-neutral">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* LEFT */}
          <div>
            <h1 className="mb-6 text-5xl font-bold text-primary">
              Wilayah Kerja Strategis
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              Bapas Purwokerto menaungi wilayah{" "}
              <span className="font-semibold text-tertiary">
                Banyumas, Purbalingga, Banjarnegara, dan Kebumen
              </span>{" "}
              dengan pelayanan profesional dan terintegrasi.
            </p>

            <div className="flex flex-wrap gap-5">
              <div className="rounded-md border-l-4 border-tertiary bg-white p-4">
                <h2 className="text-4xl font-bold text-primary">
                  {wilayah.length}
                </h2>

                <p className="mt-1 text-gray-500">Kabupaten Utama</p>
              </div>

              <div className="rounded-md border-l-4 border-tertiary bg-white p-4">
                <h2 className="text-4xl font-bold text-primary">
                  {totalKlien}+
                </h2>

                <p className="mt-1 text-gray-500">Total Klien</p>
              </div>
            </div>
          </div>

          {/* MAP */}
          <div className="h-125 overflow-hidden rounded-xl border border-gray-200 shadow-md">
            <WilayahMap />
          </div>
        </div>
      </section>

      {/* CARD WILAYAH */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-4xl font-bold text-primary">
            Cakupan Wilayah Kabupaten
          </h2>

          <p className="text-gray-600">
            Pendampingan dan pembimbingan kemasyarakatan dilakukan secara
            profesional di seluruh wilayah.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="animate-spin text-primary" />
          </div>
        )}

        {/* EMPTY */}
        {!loading && wilayah.length === 0 && (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-primary">
              Belum ada wilayah kerja
            </h2>

            <p className="mt-2 text-gray-500">Data wilayah belum tersedia</p>
          </div>
        )}

        {/* CONTENT */}
        {!loading && wilayah.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {wilayah.map((item) => {
              const total = item.klienDewasa + item.klienAnak;

              return (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-xl"
                >
                  {/* IMAGE */}
                  <Image
                    width={1000}
                    height={1000}
                    unoptimized
                    src={item.image}
                    alt={item.nama}
                    className="h-52 w-full object-cover"
                  />

                  {/* BODY */}
                  <div className="p-6">
                    <h3 className="mb-5 text-xl font-bold text-primary">
                      {item.nama}
                    </h3>

                    <div className="space-y-4 text-gray-600">
                      {/* TOTAL */}
                      <div className="flex items-center gap-3">
                        <Users size={18} />

                        <span>{total} Klien Aktif</span>
                      </div>

                      {/* KLIEN DEWASA */}
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                          <Users size={16} className="text-blue-600" />
                        </div>

                        <span>{item.klienDewasa} Klien Dewasa</span>
                      </div>

                      {/* KLIEN ANAK */}
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                          <Users size={16} className="text-green-600" />
                        </div>

                        <span>{item.klienAnak} Klien Anak</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* STATISTIC */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-[40px] bg-linear-to-r from-[#071952] to-[#0b2c7d] p-10 text-white lg:p-14">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* LEFT */}
            <div>
              <h2 className="mb-5 text-4xl font-bold">
                Efektivitas Pendampingan
              </h2>

              <p className="mb-10 max-w-xl leading-relaxed text-gray-300">
                Statistik pelayanan pembimbingan kemasyarakatan secara real-time
                untuk memastikan kualitas pelayanan optimal di seluruh wilayah
                kerja.
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                  <h3 className="mb-3 text-5xl font-bold">98%</h3>

                  <p className="text-gray-300">Keberhasilan Integrasi</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                  <h3 className="mb-3 text-5xl font-bold">{totalKlien}+</h3>

                  <p className="text-gray-300">Total Klien Terdaftar</p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex justify-center">
              <div className="relative flex h-70 w-70 items-center justify-center rounded-full border-14 border-yellow-400">
                <div className="absolute inset-5 rounded-full border-10 border-white/20"></div>

                <div className="z-10 text-center">
                  <h2 className="mb-2 text-6xl font-bold">8.5</h2>

                  <p className="text-gray-300">Indeks Kepuasan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
