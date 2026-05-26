"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";

import Image from "next/image";

import {
  Upload,
  FileText,
  Loader2,
  Search,
  Trash2,
  Download,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";

type Publikasi = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
  createdAt: string;
};

export default function AdminPublikasiPage() {
  const [data, setData] = useState<Publikasi[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // FORM
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [file, setFile] = useState<File | null>(null);

  const [submitLoading, setSubmitLoading] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // ======================
  // FETCH DATA
  // ======================
  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/publikasi`,
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
  // HANDLE FILE
  // ======================
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
  };

  // ======================
  // SUBMIT
  // ======================
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setSubmitLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);

      if (file) {
        formData.append("file", file);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/publikasi`,
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Gagal upload publikasi");
        return;
      }

      // UPDATE STATE
      setData((prev) => [result.data, ...prev]);

      // RESET FORM
      setTitle("");
      setDescription("");
      setFile(null);

      alert("Publikasi berhasil ditambahkan");
    } catch (error) {
      console.error(error);

      alert("Terjadi kesalahan");
    } finally {
      setSubmitLoading(false);
    }
  };

  // ======================
  // DELETE
  // ======================
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Apakah Anda yakin ingin menghapus publikasi ini?",
    );

    if (!confirmDelete) return;

    try {
      setDeleteLoading(id);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/publikasi?id=${id}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Gagal menghapus data");
        return;
      }

      setData((prev) => prev.filter((item) => item.id !== id));

      alert("Publikasi berhasil dihapus");
    } catch (error) {
      console.error(error);

      alert("Terjadi kesalahan");
    } finally {
      setDeleteLoading(null);
    }
  };

  // ======================
  // FILTER
  // ======================
  const filteredData = data.filter((item) => {
    const keyword = search.toLowerCase();

    return item.title.toLowerCase().includes(keyword);
  });

  return (
    <section className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">
            Manajemen Publikasi
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Kelola dokumen publikasi website.
          </p>
        </div>

        {/* FORM */}
        <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
              <Upload size={20} className="text-primary" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary">
                Upload Publikasi
              </h2>

              <p className="text-sm text-gray-500">
                Tambahkan dokumen publikasi baru.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* TITLE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Judul Publikasi
              </label>

              <input
                type="text"
                placeholder="Masukkan judul publikasi"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-14 w-full rounded-2xl border border-gray-200 px-4 outline-none transition-all focus:border-primary"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Deskripsi
              </label>

              <textarea
                rows={5}
                placeholder="Masukkan deskripsi publikasi..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 p-4 outline-none transition-all focus:border-primary"
              />
            </div>

            {/* FILE */}
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">
                Upload File
              </label>

              <label className="flex h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition-all hover:border-primary">
                <Upload size={34} className="text-gray-400" />

                <p className="mt-4 text-sm font-medium text-gray-600">
                  Klik untuk upload file
                </p>

                <span className="mt-1 text-xs text-gray-400">
                  PDF, PNG, JPG (Maks. 5MB)
                </span>

                {file && (
                  <p className="mt-3 text-sm font-semibold text-primary">
                    {file.name}
                  </p>
                )}

                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={submitLoading}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Mengupload...
                </>
              ) : (
                <>
                  <Upload size={18} />
                  Upload Publikasi
                </>
              )}
            </button>
          </form>
        </div>

        {/* SEARCH */}
        <div className="mb-6 flex justify-end">
          <div className="relative w-full md:w-80">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Cari publikasi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 outline-none transition-all focus:border-primary"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Dokumen
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    File
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
                    <td colSpan={5} className="px-6 py-14 text-center">
                      <div className="flex items-center justify-center gap-3 text-gray-500">
                        <Loader2 size={20} className="animate-spin" />
                        Memuat data...
                      </div>
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-14 text-center text-gray-500"
                    >
                      Tidak ada data publikasi
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 transition-all hover:bg-gray-50"
                    >
                      {/* TITLE */}
                      <td className="px-6 py-5 max-w-xs">
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                            <FileText size={20} className="text-primary" />
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-800 text-wrap">
                              {item.title}
                            </h3>

                            <p className="mt-1 line-clamp-2 max-w-sm text-sm text-gray-500">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* FILE */}
                      <td className="px-6 py-5">
                        {item.fileUrl.includes(".pdf") ? (
                          <div className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
                            <FileText size={16} />
                            PDF File
                          </div>
                        ) : (
                          <Image
                            src={item.fileUrl}
                            alt={item.title}
                            width={80}
                            height={80}
                            className="rounded-xl border border-gray-200 object-cover"
                          />
                        )}
                      </td>

                      {/* DATE */}
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

                      {/* ACTION */}
                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-2">
                          <Link
                            href={`/api/publikasi/download/${item.id}`}
                            target="_blank"
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all hover:bg-primary hover:text-white"
                          >
                            <Download size={18} />
                          </Link>

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
