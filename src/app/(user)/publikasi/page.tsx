"use client";

import { useEffect, useMemo, useState } from "react";

import Link from "next/link";

import {
  Search,
  Download,
  FileText,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

type Publikasi = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
  createdAt: string;
};

type Anggaran = {
  id: string;
  tahun: number;
  totalAnggaran: string;
  realisasi: string;
};

export default function PublikasiPage() {
  const [data, setData] = useState<Publikasi[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // ======================
  // ANGGARAN
  // ======================
  const [anggaran, setAnggaran] = useState<Anggaran | null>(null);

  // ======================
  // PAGINATION
  // ======================
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // ======================
  // FETCH DATA
  // ======================
  useEffect(() => {
    const fetchData = async () => {
      try {
        // PUBLIKASI
        const publikasiRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/publikasi`,
          {
            cache: "no-store",
          },
        );

        const publikasiResult = await publikasiRes.json();

        setData(publikasiResult.data || []);

        // ANGGARAN
        const anggaranRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/anggaran`,
          {
            cache: "no-store",
          },
        );

        const anggaranResult = await anggaranRes.json();

        if (anggaranResult?.length > 0) {
          setAnggaran(anggaranResult[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ======================
  // FILTER DATA
  // ======================
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  // ======================
  // PAGINATION DATA
  // ======================
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // ======================
  // ANGGARAN DATA
  // ======================
  const paguAnggaran = Number(anggaran?.totalAnggaran || 0);

  const realisasi = Number(anggaran?.realisasi || 0);

  const sisa = paguAnggaran - realisasi;

  const persentase =
    paguAnggaran > 0 ? ((realisasi / paguAnggaran) * 100).toFixed(2) : "0";

  return (
    <section className="min-h-screen bg-neutral">
      {/* HERO */}
      <div className="bg-primary">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-white md:text-5xl">
              Publikasi Dokumen
            </h1>

            <p className="mt-5 text-base leading-relaxed text-white/75 md:text-lg">
              Akses berbagai dokumen publik mulai dari laporan kinerja,
              perencanaan strategis, hingga dokumen kebutuhan lainnya.
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        {/* SEARCH */}
        <div className="-mt-7 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row">
            {/* INPUT */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Cari nama dokumen..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition-all focus:border-primary"
              />
            </div>

            {/* BUTTON */}
            <button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#c59b2a] px-5 text-sm font-semibold text-white transition-all hover:opacity-90">
              <Search size={17} />
              Terapkan
            </button>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex h-80 items-center justify-center">
            <div className="flex items-center gap-3 text-gray-500">
              <Loader2 size={22} className="animate-spin" />
              Memuat publikasi...
            </div>
          </div>
        ) : (
          <>
            {/* TRANSPARANSI ANGGARAN */}
            <div className="bg-neutral pt-8">
              <div className="px-4 md:px-6">
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                  {/* HEADER */}
                  <div className="flex flex-col gap-5 border-b border-gray-100 p-8 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-primary">
                        Transparansi Anggaran{" "}
                        {anggaran?.tahun || new Date().getFullYear()}
                      </h2>

                      <p className="mt-2 text-gray-500">
                        Data realisasi anggaran Bapas Kelas II Purwokerto
                      </p>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="grid gap-6 p-8 md:grid-cols-4">
                    {/* PAGU */}
                    <div className="rounded-2xl border border-gray-200 bg-neutral p-6">
                      <p className="text-sm text-gray-500">Anggaran</p>

                      <h3 className="mt-3 text-xl font-bold text-primary">
                        Rp {paguAnggaran.toLocaleString("id-ID")}
                      </h3>
                    </div>

                    {/* REALISASI */}
                    <div className="rounded-2xl border border-gray-200 bg-neutral p-6">
                      <p className="text-sm text-gray-500">Realisasi</p>

                      <h3 className="mt-3 text-xl font-bold text-primary">
                        Rp {realisasi.toLocaleString("id-ID")}
                      </h3>
                    </div>

                    {/* SISA */}
                    <div className="rounded-2xl border border-gray-200 bg-neutral p-6">
                      <p className="text-sm text-gray-500">Sisa</p>

                      <h3 className="mt-3 text-xl font-bold text-primary">
                        Rp {sisa.toLocaleString("id-ID")}
                      </h3>
                    </div>

                    {/* PERSENTASE */}
                    <div className="rounded-2xl border border-gray-200 bg-neutral p-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          Persentase Penyerapan
                        </p>

                        <span className="text-sm font-semibold text-primary">
                          {persentase}%
                        </span>
                      </div>

                      {/* PROGRESS */}
                      <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-yellow-500 transition-all duration-700"
                          style={{
                            width: `${persentase}%`,
                          }}
                        />
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs text-primary">
                        <span>0%</span>
                        <span>Target: 100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* GRID */}
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {paginatedData.length === 0 ? (
                <div className="col-span-full rounded-2xl border border-gray-200 bg-white py-16 text-center text-gray-500">
                  Tidak ada publikasi ditemukan
                </div>
              ) : (
                paginatedData.map((item) => {
                  const extension =
                    item.fileName.split(".").pop()?.toUpperCase() || "FILE";

                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                    >
                      {/* TOP */}
                      <div className="flex items-start justify-between gap-3">
                        {/* CATEGORY */}
                        <span className="rounded-md bg-[#fff5d6] px-2.5 py-1 text-xs font-semibold text-[#9b7600]">
                          {extension}
                        </span>

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                          <FileText size={18} className="text-primary" />
                        </div>
                      </div>

                      {/* TITLE */}
                      <h2 className="mt-4 line-clamp-2 text-lg font-bold leading-snug text-primary">
                        {item.title}
                      </h2>

                      {/* DESC */}
                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-500">
                        {item.description}
                      </p>

                      {/* META */}
                      <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <CalendarDays size={14} />

                          {new Date(item.createdAt).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </div>
                      </div>

                      {/* BUTTON */}
                      <div className="mt-6 flex justify-end">
                        <Link
                          href={`/api/publikasi/download/${item.id}`}
                          target="_blank"
                          className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-all hover:opacity-90"
                        >
                          <Download size={16} />
                          Unduh
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                {/* PREV */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* PAGE */}
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                      currentPage === index + 1
                        ? "bg-primary text-white"
                        : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                {/* NEXT */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
