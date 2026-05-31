"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";

interface ProfilKabapas {
  id: string;
  nama: string;
  jabatan: string;
  pangkat: string;
  pendidikan: string;
  foto: string;
}

export default function ProfilKabapasPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profil, setProfil] = useState<ProfilKabapas | null>(null);

  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [pangkat, setPangkat] = useState("");
  const [pendidikan, setPendidikan] = useState("");

  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const res = await fetch("/api/profil-kabapas");

      const result = await res.json();

      if (result.data) {
        const data = result.data;

        setProfil(data);

        setNama(data.nama || "");
        setJabatan(data.jabatan || "");
        setPangkat(data.pangkat || "");
        setPendidikan(data.pendidikan || "");

        setPreview(data.foto || "");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleFotoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setFoto(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("nama", nama);
      formData.append("jabatan", jabatan);
      formData.append("pangkat", pangkat);
      formData.append("pendidikan", pendidikan);

      if (foto) {
        formData.append("foto", foto);
      }

      let res: Response;

      if (profil?.id) {
        res = await fetch(`/api/profil-kabapas/${profil.id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        res = await fetch("/api/profil-kabapas", {
          method: "POST",
          body: formData,
        });
      }

      if (!res.ok) {
        throw new Error("Gagal menyimpan");
      }

      alert("Profil berhasil disimpan");

      await loadData();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <p>Memuat data...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen">
      <div className="mx-auto max-w-7xl rounded-xl bg-white p-6 shadow">
        <h1 className="mb-6 text-2xl font-bold">Profil Kepala Bapas</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block font-medium">Foto</label>

            {preview && (
              <div className="mb-4">
                <Image
                  src={preview}
                  alt="preview"
                  width={150}
                  height={200}
                  unoptimized
                  className="rounded-lg border object-cover"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
              className="mb-4 block w-full text-sm text-gray-900 border border-neutral-200 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20 file:border-0 file:bg-primary/20 file:text-white file:py-2 file:px-4 file:rounded-l-lg hover:file:bg-primary/20 hover:file:text-primary/20 transition-all"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Nama</label>

            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="bg-neutral py-2 px-3 w-full rounded-md outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Jabatan</label>

            <input
              value={jabatan}
              onChange={(e) => setJabatan(e.target.value)}
              className="bg-neutral py-2 px-3 w-full rounded-md outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Pangkat</label>

            <input
              value={pangkat}
              onChange={(e) => setPangkat(e.target.value)}
              className="bg-neutral py-2 px-3 w-full rounded-md outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Pendidikan</label>

            <input
              value={pendidikan}
              onChange={(e) => setPendidikan(e.target.value)}
              className="bg-neutral py-2 px-3 w-full rounded-md outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-primary px-6 py-3 font-medium text-white"
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </form>
      </div>
    </section>
  );
}
