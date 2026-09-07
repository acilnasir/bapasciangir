"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";

interface LitmasAnak {
  "Nama Klien"?: string;
  "Asal Permintaan"?: string;
  "Tanggal Penerimaan"?: string;
  "Jenis Litmas"?: string;
  "No. Reg"?: string;
  PK?: string;
  "Status Litmas"?: string;
  "Tanggal Selesai"?: string;
  "Proses Hukum"?: string;
  Hasil?: string;
  Keterangan?: string;
}

export default function LitmasAnakClient() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<LitmasAnak[]>([]);

  const handleSearch = async () => {
    if (!keyword.trim()) return;

    try {
      setLoading(true);

      const res = await fetch(
        `/api/litmas-anak/search?nama=${encodeURIComponent(keyword)}`,
      );

      const data = await res.json();

      setResults(data.data || []);
    } catch (error) {
      console.error(error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="bg-primary py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-bold md:text-5xl">
            Pencarian Data Litmas Anak
          </h1>

          <p className="mt-4 text-lg text-blue-100">
            Cari data klien anak berdasarkan nama untuk memantau proses
            penelitian kemasyarakatan.
          </p>
        </div>
      </section>

      {/* SEARCH */}
      <section className="-mt-10 px-4">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Masukkan nama klien..."
              className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 outline-none focus:border-blue-600"
            />

            <button
              onClick={handleSearch}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-white"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Search size={18} />
              )}
              Cari
            </button>
          </div>
        </div>
      </section>

      {/* RESULT */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">Hasil Pencarian</h2>

          <span className="text-gray-500">
            {results.length} hasil ditemukan
          </span>
        </div>

        {!loading && results.length === 0 && (
          <div className="rounded-2xl border bg-white p-10 text-center text-gray-500">
            Tidak ada data ditemukan
          </div>
        )}

        <div className="space-y-6">
          {results.map((item, index) => {
            const selesai = Boolean(item["Tanggal Selesai"]?.trim());

            return (
              <div
                key={index}
                className="rounded-2xl border-l-4 border-l-blue-500 bg-white p-8 shadow-md"
              >
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-primary">
                      {item["Nama Klien"]}
                    </h3>

                    <p className="mt-1 text-gray-500">
                      Nomor Register:
                      <span className="ml-2 font-semibold text-primary">
                        {item["No. Reg"] || "-"}
                      </span>
                    </p>
                  </div>

                  <div>
                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        selesai
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-tertiary"
                      }`}
                    >
                      {selesai ? "Selesai" : "Dalam Proses"}
                    </span>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="mb-1 text-xs uppercase text-gray-400">
                      Jenis Litmas
                    </p>
                    <p className="font-semibold">
                      {item["Jenis Litmas"] || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs uppercase text-gray-400">PK</p>
                    <p className="font-semibold">{item["PK"] || "-"}</p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs uppercase text-gray-400">
                      Asal Permintaan
                    </p>
                    <p className="font-semibold">
                      {item["Asal Permintaan"] || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs uppercase text-gray-400">
                      Proses Hukum
                    </p>
                    <p className="font-semibold">
                      {item["Proses Hukum"] || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs uppercase text-gray-400">
                      Hasil
                    </p>
                    <p className="font-semibold">{item["Hasil"] || "-"}</p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs uppercase text-gray-400">
                      Status Litmas
                    </p>
                    <p className="font-semibold">
                      {item["Status Litmas"] || "-"}
                    </p>
                  </div>
                </div>

                {item["Keterangan"] && (
                  <div className="mt-6 rounded-xl bg-slate-50 p-4">
                    <p className="mb-1 text-sm font-semibold text-primary">
                      Keterangan
                    </p>

                    <p className="text-gray-700">{item["Keterangan"]}</p>
                  </div>
                )}

                <div className="mt-8 rounded-xl bg-slate-50 p-5">
                  <h4 className="mb-4 font-semibold text-primary">
                    Timeline Litmas
                  </h4>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-gray-500">
                        Tanggal Penerimaan
                      </p>

                      <p className="font-semibold">
                        {item["Tanggal Penerimaan"] || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Tanggal Selesai</p>

                      <p
                        className={
                          selesai
                            ? "font-semibold text-green-600"
                            : "font-semibold text-gray-400"
                        }
                      >
                        {item["Tanggal Selesai"] || "-"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t pt-4 text-sm text-gray-500">
                  Data ini berasal dari E-Distribusi Bapas Ciangir.
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
