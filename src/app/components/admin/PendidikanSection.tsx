"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";

interface Pendidikan {
  id: string;
  nama: string;
  jenjang: string;
  jurusan: string;
  tahun: string;
}

interface Props {
  profilId: string;
  initialData: Pendidikan[];
}

export default function PendidikanSection({ profilId, initialData }: Props) {
  const [data, setData] = useState<Pendidikan[]>(initialData);

  const [nama, setNama] = useState("");
  const [jenjang, setJenjang] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [tahun, setTahun] = useState("");

  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  function resetForm() {
    setNama("");
    setJenjang("");
    setJurusan("");
    setTahun("");
    setEditId(null);
  }

  function mulaiEdit(item: Pendidikan) {
    setEditId(item.id);
    setNama(item.nama);
    setJenjang(item.jenjang);
    setJurusan(item.jurusan);
    setTahun(item.tahun);
  }

  async function simpanData() {
    if (!nama || !jenjang || !jurusan || !tahun) {
      alert("Semua field wajib diisi");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        const res = await fetch(`/api/pendidikan/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nama,
            jenjang,
            jurusan,
            tahun,
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
        const res = await fetch("/api/pendidikan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nama,
            jenjang,
            jurusan,
            tahun,
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
    const confirmDelete = confirm("Yakin ingin menghapus pendidikan ini?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/pendidikan/${id}`, {
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
      <h2 className="mb-6 text-xl font-bold text-primary">
        Riwayat Pendidikan
      </h2>

      {/* FORM */}
      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama Universitas / Sekolah"
          className="bg-neutral py-2 px-3 w-full rounded-md outline-none"
        />

        <select
          value={jenjang}
          onChange={(e) => setJenjang(e.target.value)}
          className="bg-neutral py-2 px-3 w-full rounded-md outline-none"
        >
          <option value="">Pilih Jenjang</option>
          <option value="SMA">SMA</option>
          <option value="D3">D3</option>
          <option value="D4">D4</option>
          <option value="S1">S1</option>
          <option value="S2">S2</option>
          <option value="S3">S3</option>
        </select>

        <input
          type="text"
          value={jurusan}
          onChange={(e) => setJurusan(e.target.value)}
          placeholder="Jurusan"
          className="bg-neutral py-2 px-3 w-full rounded-md outline-none"
        />

        <input
          type="text"
          value={tahun}
          onChange={(e) => setTahun(e.target.value)}
          placeholder="Tahun Lulus"
          className="bg-neutral py-2 px-3 w-full rounded-md outline-none"
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
              ? "Update Pendidikan"
              : "Tambah Pendidikan"}
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
              <th className="p-2 text-left">Institusi</th>
              <th className="p-2 text-left">Jenjang</th>
              <th className="p-2 text-left">Jurusan</th>
              <th className="p-2 text-left">Tahun</th>
              <th className="p-2 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="">
                <td className="p-2">{item.nama}</td>
                <td className="p-2">{item.jenjang}</td>
                <td className="p-2">{item.jurusan}</td>
                <td className="p-2">{item.tahun}</td>

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
                  Belum ada data pendidikan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
