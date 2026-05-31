"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";

interface Prestasi {
  id: string;
  nama: string;
}

interface Props {
  profilId: string;
  initialData: Prestasi[];
}

export default function PrestasiSection({ profilId, initialData }: Props) {
  const [data, setData] = useState<Prestasi[]>(initialData);

  const [nama, setNama] = useState("");

  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  function resetForm() {
    setNama("");

    setEditId(null);
  }

  function mulaiEdit(item: Prestasi) {
    setEditId(item.id);
    setNama(item.nama);
  }

  async function simpanData() {
    if (!nama) {
      alert("Semua field wajib diisi");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        const res = await fetch(`/api/prestasi/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nama,
          }),
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }

        setData((prev) =>
          prev.map((item) => (item.id === editId ? result.data : item)),
        );
      } else {
        const res = await fetch("/api/prestasi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nama,
            profilId,
          }),
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }

        setData((prev) => [...prev, result.data]);
      }

      resetForm();
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  }

  async function hapusData(id: string) {
    const confirmDelete = confirm(
      "Yakin ingin menghapus Riwayat prestasi ini?",
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/prestasi/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Gagal menghapus");
      }

      setData((prev) => prev.filter((item) => item.id !== id));

      if (editId === id) {
        resetForm();
      }
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data");
    }
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-primary">Prestasi Menonjol</h2>

      {/* FORM */}
      <div className="grid gap-4">
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Prestasi Menonjol"
          className="bg-neutral py-2 px-3 rounded-md outline-none w-full"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={simpanData}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-white disabled:opacity-50"
        >
          <Plus size={18} />

          {loading
            ? "Menyimpan..."
            : editId
              ? "Update Prestasi"
              : "Tambah Prestasi"}
        </button>

        {editId && (
          <button onClick={resetForm} className="rounded-lg border px-5 py-3">
            Batal Edit
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="mt-8 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral">
              <th className="p-2 text-left">Prestasi</th>
              <th className="p-2 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="">
                <td className="p-2">{item.nama}</td>

                <td className="p-3">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => mulaiEdit(item)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => hapusData(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  Belum ada data riwayat Prestasi
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
