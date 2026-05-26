"use client";

import { useEffect, useState } from "react";
import { Loader2, Pencil, Plus, Trash2, Wallet } from "lucide-react";

interface Anggaran {
  id: string;

  tahun: number;

  totalAnggaran: string;

  realisasi: string;
}

export default function AdminAnggaranPage() {
  const [data, setData] = useState<Anggaran[]>([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [editId, setEditId] = useState<string | null>(null);

  const [submitLoading, setSubmitLoading] = useState(false);

  // =========================
  // FORM
  // =========================
  const [form, setForm] = useState({
    tahun: "",
    totalAnggaran: "",
    realisasi: "",
  });

  // =========================
  // GET DATA
  // =========================
  const getData = async () => {
    try {
      const res = await fetch("/api/anggaran");

      const result = await res.json();

      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };

    fetchData();
  }, []);

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitLoading(true);

    try {
      const formData = new FormData();

      formData.append("tahun", form.tahun);

      formData.append("totalAnggaran", form.totalAnggaran);

      formData.append("realisasi", form.realisasi);

      const res = await fetch(
        editId ? `/api/anggaran/${editId}` : "/api/anggaran",

        {
          method: editId ? "PUT" : "POST",

          body: formData,
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      await getData();

      setOpenModal(false);

      setEditId(null);

      setForm({
        tahun: "",
        totalAnggaran: "",
        realisasi: "",
      });

      alert(result.message);
    } catch (error) {
      console.error(error);

      alert("Terjadi kesalahan");
    } finally {
      setSubmitLoading(false);
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Yakin ingin menghapus data?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/anggaran/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setData((prev) => prev.filter((item) => item.id !== id));

      alert(result.message);
    } catch (error) {
      console.error(error);

      alert("Gagal menghapus data");
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Transparansi Anggaran
          </h1>

          <p className="mt-2 text-gray-500">Kelola data anggaran tahunan</p>
        </div>

        <button
          onClick={() => {
            setEditId(null);

            setForm({
              tahun: "",
              totalAnggaran: "",
              realisasi: "",
            });

            setOpenModal(true);
          }}
          className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-white transition hover:opacity-90"
        >
          <Plus size={18} />
          Tambah Anggaran
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex h-64 items-center justify-center">
          <Loader2 size={35} className="animate-spin text-primary" />
        </div>
      )}

      {/* EMPTY */}
      {!loading && data.length === 0 && (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center">
          <Wallet size={50} className="mx-auto mb-4 text-primary" />

          <h2 className="text-xl font-semibold">Belum ada data anggaran</h2>

          <p className="mt-2 text-gray-500">
            Tambahkan data anggaran terlebih dahulu
          </p>
        </div>
      )}

      {/* TABLE */}
      {!loading && data.length > 0 && (
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Tahun
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Total Anggaran
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Realisasi
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Sisa
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Persentase
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => {
                  const total = Number(item.totalAnggaran);

                  const realisasi = Number(item.realisasi);

                  const sisa = total - realisasi;

                  const persentase = ((realisasi / total) * 100).toFixed(2);

                  return (
                    <tr key={item.id} className="border-t border-gray-100">
                      <td className="px-6 py-5 font-semibold">{item.tahun}</td>

                      <td className="px-6 py-5">
                        Rp {total.toLocaleString("id-ID")}
                      </td>

                      <td className="px-6 py-5">
                        Rp {realisasi.toLocaleString("id-ID")}
                      </td>

                      <td className="px-6 py-5">
                        Rp {sisa.toLocaleString("id-ID")}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-3 w-32 overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{
                                width: `${persentase}%`,
                              }}
                            />
                          </div>

                          <span className="text-sm font-medium">
                            {persentase}%
                          </span>
                        </div>
                      </td>

                      {/* ACTION */}
                      <td className="px-6 py-5">
                        <div className="flex gap-3">
                          {/* EDIT */}
                          <button
                            onClick={() => {
                              setEditId(item.id);

                              setForm({
                                tahun: item.tahun.toString(),

                                totalAnggaran: item.totalAnggaran.toString(),

                                realisasi: item.realisasi.toString(),
                              });

                              setOpenModal(true);
                            }}
                            className="rounded-xl bg-yellow-500 p-3 text-white transition hover:bg-yellow-600"
                          >
                            <Pencil size={18} />
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="rounded-xl bg-red-500 p-3 text-white transition hover:bg-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">
          <div className="w-full max-w-xl rounded-3xl bg-white p-8">
            {/* HEADER */}
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary">
                {editId ? "Edit Anggaran" : "Tambah Anggaran"}
              </h2>

              <button onClick={() => setOpenModal(false)} className="text-3xl">
                ×
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* TAHUN */}
              <div>
                <label className="mb-2 block text-sm font-medium">Tahun</label>

                <input
                  type="number"
                  value={form.tahun}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      tahun: e.target.value,
                    })
                  }
                  className="bg-neutral py-2 px-3 w-full rounded-md outline-none mb-4"
                />
              </div>

              {/* TOTAL */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Total Anggaran
                </label>

                <input
                  type="number"
                  value={form.totalAnggaran}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      totalAnggaran: e.target.value,
                    })
                  }
                  className="bg-neutral py-2 px-3 w-full rounded-md outline-none "
                />
              </div>

              {/* REALISASI */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Realisasi
                </label>

                <input
                  type="number"
                  value={form.realisasi}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      realisasi: e.target.value,
                    })
                  }
                  className="bg-neutral py-2 px-3 w-full rounded-md outline-none mb-4"
                />
              </div>

              {/* BUTTON */}
              <div className="flex justify-end gap-4 pt-5">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="rounded-xl border border-gray-300 px-6 py-3"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={submitLoading}
                  className="rounded-xl bg-primary px-6 py-3 text-white"
                >
                  {submitLoading
                    ? "Menyimpan..."
                    : editId
                      ? "Update"
                      : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
