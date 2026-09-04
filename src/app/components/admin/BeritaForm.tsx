"use client";
import { useState } from "react";
export default function BeritaForm() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const res = await fetch("/api/berita", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      alert("Berita berhasil ditambahkan");
      form.reset();
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan berita");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-8 shadow-sm"
    >
      <h2 className="mb-6 text-2xl font-bold text-primary">Tambah Berita</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {/* TITLE */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">Judul Berita</label>
          <input
            type="text"
            name="title"
            required
            className="bg-neutral py-2 px-3 w-full rounded-md outline-none mb-4"
            placeholder="Masukkan judul berita"
          />
        </div>
        {/* EXCERPT */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Ringkasan Berita
          </label>
          <textarea
            name="excerpt"
            required
            rows={3}
            className="bg-neutral py-2 px-3 w-full rounded-md outline-none mb-4"
            placeholder="Ringkasan berita"
          />
        </div>
        {/* CONTENT */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">Isi Berita</label>
          <textarea
            name="content"
            required
            rows={8}
            className="bg-neutral py-2 px-3 w-full rounded-md outline-none mb-4"
            placeholder="Isi berita"
          />
        </div>
        {/* CATEGORY */}
        <div>
          <label className="mb-2 block text-sm font-medium">Kategori</label>
          <select
            name="category"
            required
            className="bg-neutral py-2 px-3 w-full rounded-md outline-none mb-4"
          >
            <option value="">Pilih kategori</option>
            <option value="Events & Ceremonies">Events & Ceremonies</option>
            <option value="Pengumuman">Pengumuman</option>
            <option value="Sosialisasi">Sosialisasi</option>
            <option value="Pengabdian Kepada Masyarakat">
              Pengabdian Kepada Masyarakat
            </option>
            <option value="Inovasi">Inovasi</option>
            <option value="Prestasi">Prestasi</option>
            <option value="Kunjungan Kerja">Kunjungan Kerja</option>
            <option value="Sosial">Sosial</option>
            <option value="Kerja Sama">Kerja Sama</option>
            <option value="Pendidikan">Pendidikan</option>
          </select>
        </div>
        {/* AUTHOR */}
        <div>
          <label className="mb-2 block text-sm font-medium">Author</label>
          <input
            type="text"
            name="author"
            required
            className="bg-neutral py-2 px-3 w-full rounded-md outline-none mb-4"
            placeholder="Nama author"
          />
        </div>
        {/* TAGS */}
        <div>
          <label className="mb-2 block text-sm font-medium">Tags</label>
          <input
            type="text"
            name="tags"
            className="bg-neutral py-2 px-3 w-full rounded-md outline-none mb-4"
            placeholder="bapas,ciangir, imipas..."
          />
        </div>
        {/* IMAGE */}
        <div>
          <label className="mb-2 block text-sm font-medium">Thumbnail</label>
          <input
            type="file"
            name="image"
            required
            accept="image/*"
            className="mb-4 block w-full text-sm text-gray-900 border border-neutral-200 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20 file:border-0 file:bg-primary/20 file:text-white file:py-2 file:px-4 file:rounded-l-lg hover:file:bg-primary/20 hover:file:text-primary/20 transition-all"
          />
        </div>
      </div>
      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="mt-8 rounded-xl bg-primary px-6 py-3 font-semibold text-white
transition hover:bg-secondary disabled:opacity-50"
      >
        {loading ? "Menyimpan..." : "Tambah Berita"}
      </button>
    </form>
  );
}
