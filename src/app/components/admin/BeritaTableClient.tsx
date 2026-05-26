"use client";

import Image from "next/image";
import { useState } from "react";

interface Tag {
  tag: {
    id: string;
    name: string;
  };
}

interface Berita {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  category: string;
  author: string;
  createdAt: string;
  tags: Tag[];
}

interface Props {
  initialData: Berita[];
}

export default function BeritaTableClient({ initialData }: Props) {
  const [berita, setBerita] = useState(initialData);

  const [openEdit, setOpenEdit] = useState(false);

  const [selectedBerita, setSelectedBerita] = useState<Berita | null>(null);

  const [editLoading, setEditLoading] = useState(false);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const totalPages = Math.ceil(berita.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const currentData = berita.slice(startIndex, endIndex);

  // GENERATE PAGE
  const generatePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);

      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  // EDIT
  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedBerita) return;

    setEditLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const body = {
        title: formData.get("title") as string,

        excerpt: formData.get("excerpt") as string,

        content: formData.get("content") as string,

        category: formData.get("category") as string,

        author: formData.get("author") as string,
      };

      // SEND FORM DATA
      const sendFormData = new FormData();

      sendFormData.append("title", body.title);

      sendFormData.append("excerpt", body.excerpt);

      sendFormData.append("content", body.content);

      sendFormData.append("category", body.category);

      sendFormData.append("author", body.author);

      // IMAGE
      const imageInput = formData.get("image") as File;

      if (imageInput.size > 0) {
        sendFormData.append("image", imageInput);
      }

      const res = await fetch(`/api/berita/${selectedBerita.id}`, {
        method: "PATCH",
        body: sendFormData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      // UPDATE UI
      setBerita((prev) =>
        prev.map((item) =>
          item.id === selectedBerita.id
            ? {
                ...item,
                ...data.data,
              }
            : item,
        ),
      );

      alert(data.message);

      setOpenEdit(false);
    } catch (error) {
      console.error(error);

      alert("Gagal update berita");
    } finally {
      setEditLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Yakin ingin menghapus berita?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/berita/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setBerita((prev) => prev.filter((item) => item.id !== id));

      alert(data.message);
    } catch (error) {
      console.error(error);

      alert("Gagal menghapus berita");
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      {/* HEADER */}
      <div className="border-b border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-primary">List Berita</h2>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Thumbnail
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Judul
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Kategori
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Author
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((item) => (
              <tr key={item.id} className="border-t border-gray-100">
                {/* IMAGE */}
                <td className="px-6 py-4">
                  <div className="relative h-20 w-28 overflow-hidden rounded-xl">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                </td>

                {/* TITLE */}
                <td className="px-6 py-4">
                  <div>
                    <h3 className="line-clamp-2 font-semibold text-primary">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                </td>

                {/* CATEGORY */}
                <td className="px-6 py-4">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                    {item.category}
                  </span>
                </td>

                {/* AUTHOR */}
                <td className="px-6 py-4 text-sm text-gray-700">
                  {item.author}
                </td>

                {/* ACTION */}
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    {/* EDIT */}
                    <button
                      onClick={() => {
                        setSelectedBerita(item);

                        setPreviewImage(item.thumbnail);

                        setOpenEdit(true);
                      }}
                      className="
                        rounded-lg
                        bg-yellow-500
                        px-4
                        py-2
                        text-sm
                        text-white
                        transition
                        hover:bg-yellow-600
                      "
                    >
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="
                        rounded-lg
                        bg-red-500
                        px-4
                        py-2
                        text-sm
                        text-white
                        transition
                        hover:bg-red-600
                      "
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 border-t border-gray-100 p-6">
            {/* PREV */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="
                rounded-xl
                border
                border-gray-200
                px-4
                py-2
                text-sm
                transition
                disabled:cursor-not-allowed
                disabled:opacity-50
                hover:bg-gray-50
              "
            >
              Prev
            </button>

            {/* PAGE */}
            {generatePages().map((page, index) =>
              page === "..." ? (
                <span key={index} className="px-2 text-sm text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  onClick={() => setCurrentPage(Number(page))}
                  className={`
                    h-10
                    min-w-10
                    rounded-xl
                    px-3
                    text-sm
                    font-medium
                    transition
                    ${
                      currentPage === page
                        ? "bg-primary text-white"
                        : "border border-gray-200 hover:bg-gray-50"
                    }
                  `}
                >
                  {page}
                </button>
              ),
            )}

            {/* NEXT */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="
                rounded-xl
                border
                border-gray-200
                px-4
                py-2
                text-sm
                transition
                disabled:cursor-not-allowed
                disabled:opacity-50
                hover:bg-gray-50
              "
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* MODAL EDIT */}
      {openEdit && selectedBerita && (
        <div
          className="
              fixed
              inset-0
              z-50
              overflow-y-auto
              bg-black/60
              p-6
            "
        >
          <div
            className="
                mx-auto
                my-10
                w-full
                max-w-5xl
                rounded-3xl
                bg-white
                p-8
                shadow-2xl
              "
          >
            {/* HEADER */}
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-primary">Edit Berita</h2>

              <button onClick={() => setOpenEdit(false)} className="text-3xl">
                ×
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleEdit} className="space-y-6">
              {/* THUMBNAIL */}
              <div>
                <label className="mb-3 block text-sm font-medium">
                  Thumbnail
                </label>

                {/* PREVIEW */}
                <div className="mb-4">
                  <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-gray-200">
                    {previewImage && (
                      <Image
                        src={previewImage}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    )}
                  </div>
                </div>

                {/* INPUT FILE */}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      setPreviewImage(URL.createObjectURL(file));
                    }
                  }}
                  className="mb-4 block w-full text-sm text-gray-900 border border-neutral-200 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20 file:border-0 file:bg-primary/20 file:text-white file:py-2 file:px-4 file:rounded-l-lg hover:file:bg-primary/20 hover:file:text-primary/20 transition-all"
                />
              </div>

              {/* TITLE */}
              <div>
                <label className="mb-2 block text-sm font-medium">Judul</label>

                <input
                  type="text"
                  name="title"
                  defaultValue={selectedBerita.title}
                  className="bg-neutral py-2 px-3 w-full rounded-md outline-none mb-4"
                />
              </div>

              {/* EXCERPT */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Excerpt
                </label>

                <textarea
                  name="excerpt"
                  rows={3}
                  defaultValue={selectedBerita.excerpt}
                  className="bg-neutral py-2 px-3 w-full rounded-md outline-none mb-4"
                />
              </div>

              {/* CONTENT */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Content
                </label>

                <textarea
                  name="content"
                  rows={8}
                  defaultValue={selectedBerita.content}
                  className="bg-neutral py-2 px-3 w-full rounded-md outline-none mb-4"
                />
              </div>

              {/* GRID */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* CATEGORY */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Kategori
                  </label>

                  <input
                    type="text"
                    name="category"
                    defaultValue={selectedBerita.category}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-gray-300
                        px-4
                        py-3
                        outline-none
                        focus:border-primary
                      "
                  />
                </div>

                {/* AUTHOR */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Author
                  </label>

                  <input
                    type="text"
                    name="author"
                    defaultValue={selectedBerita.author}
                    className="bg-neutral py-2 px-3 w-full rounded-md outline-none mb-4"
                  />
                </div>
              </div>

              {/* BUTTON */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setOpenEdit(false)}
                  className="
                      rounded-xl
                      border
                      border-gray-300
                      px-6
                      py-3
                    "
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={editLoading}
                  className="
                      rounded-xl
                      bg-primary
                      px-6
                      py-3
                      text-white
                    "
                >
                  {editLoading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
