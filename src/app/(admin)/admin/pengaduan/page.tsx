"use client";

import { useEffect, useState } from "react";

import {
  Search,
  Loader2,
  CalendarDays,
  BadgeAlert,
  Trash2,
} from "lucide-react";

import Image from "next/image";

type Pengaduan = {
  id: string;
  nama: string;
  kontak: string;
  kategori: string;
  deskripsi: string;
  lampiran: string | null;
  createdAt: string;
};

export default function AdminPengaduanPage() {
  const [data, setData] = useState<Pengaduan[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // ======================
  // FETCH DATA
  // ======================
  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/pengaduan`,
        );

        const result = await response.json();

        setData(result.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ======================
  // DELETE
  // ======================
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Apakah Anda yakin ingin menghapus pengaduan ini?",
    );

    if (!confirmDelete) return;

    try {
      setDeleteLoading(id);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pengaduan?id=${id}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Gagal menghapus data");
        return;
      }

      // UPDATE STATE
      setData((prev) => prev.filter((item) => item.id !== id));

      alert("Pengaduan berhasil dihapus");
    } catch (error) {
      console.error(error);

      alert("Terjadi kesalahan");
    } finally {
      setDeleteLoading(null);
    }
  };

  // ======================
  // FILTER DATA
  // ======================
  const filteredData = data.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.nama.toLowerCase().includes(keyword) ||
      item.kategori.toLowerCase().includes(keyword)
    );
  });

  return (
    <section className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Data Pengaduan</h1>

            <p className="mt-2 text-sm text-gray-500">
              Kelola seluruh laporan pengaduan masyarakat.
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-80">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Cari pengaduan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 outline-none transition-all focus:border-primary"
            />
          </div>
        </div>

        {/* CARD */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          {/* TABLE HEADER */}
          <div className="border-b border-gray-100 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                <BadgeAlert size={20} className="text-primary" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-primary">
                  Daftar Pengaduan
                </h2>

                <p className="text-sm text-gray-500">
                  Total {filteredData.length} laporan masuk
                </p>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Pelapor
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Kategori
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Deskripsi
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Lampiran
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Tanggal
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-14 text-center">
                      <div className="flex items-center justify-center gap-3 text-gray-500">
                        <Loader2 size={20} className="animate-spin" />
                        Memuat data...
                      </div>
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-14 text-center text-gray-500"
                    >
                      Tidak ada data pengaduan
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 transition-all hover:bg-gray-50"
                    >
                      {/* PELAPOR */}
                      <td className="px-6 py-5">
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {item.nama}
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            {item.kontak}
                          </p>
                        </div>
                      </td>

                      {/* KATEGORI */}
                      <td className="px-6 py-5">
                        <span className="rounded-xl bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">
                          {item.kategori.replaceAll("_", " ")}
                        </span>
                      </td>

                      {/* DESKRIPSI */}
                      <td className="max-w-sm px-6 py-5">
                        <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
                          {item.deskripsi}
                        </p>
                      </td>

                      {/* LAMPIRAN */}
                      <td className="px-6 py-5">
                        <Image
                          src={item.lampiran || "/image/noimage.png"}
                          alt={item.deskripsi}
                          width={90}
                          height={90}
                          className="rounded-xl border border-gray-200 object-cover"
                        />
                      </td>

                      {/* TANGGAL */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <CalendarDays size={15} />

                          {new Date(item.createdAt).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </div>
                      </td>

                      {/* AKSI */}
                      <td className="px-6 py-5">
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleDelete(item.id)}
                            disabled={deleteLoading === item.id}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 transition-all hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
                          >
                            {deleteLoading === item.id ? (
                              <Loader2 size={18} className="animate-spin" />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
