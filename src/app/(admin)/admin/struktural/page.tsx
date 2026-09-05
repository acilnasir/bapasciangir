"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Pejabat = {
  id: string;
  nama: string;
  jabatan: string;
  foto: string | null;
};

export default function AdminPejabatPage() {
  const [data, setData] = useState<Pejabat[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    id: "",
    nama: "",
    jabatan: "KABAPAS",
    foto: null as File | null,
  });

  // =========================
  // FETCH DATA (FIXED - NO WARNING)
  // =========================
  useEffect(() => {
    (async () => {
      setLoading(true);

      const res = await fetch("/api/struktural");
      const json = await res.json();

      setData(json.data);
      setLoading(false);
    })();
  }, []);

  // =========================
  // EDIT
  // =========================
  const handleEdit = (item: Pejabat) => {
    setForm({
      id: item.id,
      nama: item.nama,
      jabatan: item.jabatan,
      foto: null,
    });
  };

  // =========================
  // CREATE OR UPDATE
  // =========================
  const handleSave = async () => {
    if (!form.nama || !form.jabatan) {
      window.alert("Nama dan jabatan wajib diisi.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("id", form.id);
      formData.append("nama", form.nama);
      formData.append("jabatan", form.jabatan);

      if (form.foto) {
        formData.append("foto", form.foto);
      }

      const res = await fetch("/api/struktural", {
        method: form.id ? "PUT" : "POST",
        body: formData,
      });

      if (!res.ok) {
        const result = await res.json().catch(() => null);
        throw new Error(result?.error || "Gagal menyimpan data");
      }

      // reset form
      setForm({
        id: "",
        nama: "",
        jabatan: "KABAPAS",
        foto: null,
      });

      // reload data
      const refresh = await fetch("/api/struktural");
      const json = await refresh.json();
      setData(json.data);

      // ✅ SUCCESS ALERT
      window.alert(
        form.id
          ? "Data pejabat berhasil diperbarui!"
          : "Data pejabat berhasil disimpan!",
      );
    } catch (error) {
      console.error(error);

      // ❌ ERROR ALERT
      window.alert("Terjadi kesalahan saat menyimpan data!");
    }
  };

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-xl font-bold">Data Pejabat</h1>

          {loading ? (
            <p>Loading...</p>
          ) : (
            data.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border border-neutral-200 p-4 rounded-lg"
              >
                <Image
                  src={item.foto || "/person.jpg"}
                  alt={item.nama}
                  width={60}
                  height={60}
                  unoptimized
                  className="object-cover"
                />

                <div className="flex-1">
                  <p className="font-semibold">{item.nama}</p>
                  <p className="text-sm text-gray-500">{item.jabatan}</p>
                </div>

                <button
                  onClick={() => handleEdit(item)}
                  className="px-3 py-1 bg-tertiary text-white rounded"
                >
                  Edit
                </button>
              </div>
            ))
          )}
        </div>

        <div className="border border-neutral-200 p-4 rounded-lg h-fit">
          <h2 className="font-bold mb-4">Edit Pejabat</h2>

          {data.length === 0 && (
            <p className="mb-4 text-sm text-gray-500">
              Belum ada data. Isi formulir untuk menambahkan pejabat.
            </p>
          )}

          <input
            className="bg-neutral py-2 px-3 w-full rounded-md outline-none mb-4"
            placeholder="Nama"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
          />

          <select
            className="bg-neutral py-2 px-3 w-full rounded-md outline-none mb-4"
            value={form.jabatan}
            onChange={(e) => setForm({ ...form, jabatan: e.target.value })}
          >
            <option value="KABAPAS">KABAPAS</option>
            <option value="KASUBSI_BKD">KASUBSI BKD</option>
            <option value="KASUBSI_BKA">KASUBSI BKA</option>
            <option value="KAUR_TU">KAUR TU</option>
          </select>

          <input
            type="file"
            className="mb-4 block w-full text-sm text-gray-900 border border-neutral-200 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20 file:border-0 file:bg-primary/20 file:text-white file:py-2 file:px-4 file:rounded-l-lg hover:file:bg-primary/20 hover:file:text-primary/20 transition-all"
            onChange={(e) =>
              setForm({ ...form, foto: e.target.files?.[0] || null })
            }
          />

          <button
            onClick={handleSave}
            disabled={!form.nama || !form.jabatan}
            className="w-full bg-primary text-white py-2 rounded"
          >
            {form.id ? "Simpan Perubahan" : "Tambah Pejabat"}
          </button>
        </div>
      </div>
    </div>
  );
}
