"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Edit, Loader2, MapPinned, Plus, Users, X } from "lucide-react";

interface WilayahKerja {
  id: number;

  nama: string;

  image: string;

  klienDewasa: number;

  klienAnak: number;
}

export default function AdminWilayahKerjaPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [data, setData] = useState<WilayahKerja[]>([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [editId, setEditId] = useState<number | null>(null);

  const [submitLoading, setSubmitLoading] = useState(false);

  const [form, setForm] = useState({
    nama: "",

    klienDewasa: "",

    klienAnak: "",
  });

  const [image, setImage] = useState<File | null>(null);

  // =========================
  // GET DATA
  // =========================
  const getWilayah = async () => {
    try {
      const res = await fetch("/api/wilayah-kerja");

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
      await getWilayah();
    };

    fetchData();
  }, []);

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setForm({
      nama: "",

      klienDewasa: "",

      klienAnak: "",
    });

    setImage(null);

    setEditId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================
  // OPEN CREATE
  // =========================
  const handleOpenCreate = () => {
    resetForm();

    setOpenModal(true);
  };

  // =========================
  // OPEN EDIT
  // =========================
  const handleEdit = (item: WilayahKerja) => {
    setEditId(item.id);

    setForm({
      nama: item.nama,

      klienDewasa: item.klienDewasa.toString(),

      klienAnak: item.klienAnak.toString(),
    });

    setOpenModal(true);
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSubmitLoading(true);

      const formData = new FormData();

      formData.append("nama", form.nama);

      formData.append("klienDewasa", form.klienDewasa);

      formData.append("klienAnak", form.klienAnak);

      if (image) {
        formData.append("image", image);
      }

      let res;

      // CREATE
      if (!editId) {
        res = await fetch("/api/wilayah-kerja", {
          method: "POST",

          body: formData,
        });
      }

      // UPDATE
      else {
        res = await fetch(`/api/wilayah-kerja/${editId}`, {
          method: "PUT",

          body: formData,
        });
      }

      if (!res?.ok) {
        throw new Error("Gagal");
      }

      await getWilayah();

      setOpenModal(false);

      resetForm();
    } catch (error) {
      console.error(error);

      alert("Terjadi kesalahan");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Wilayah Kerja</h1>

          <p className="mt-2 text-gray-500">
            Kelola data wilayah kerja Bapas Purwokerto
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-white transition hover:opacity-90"
        >
          <Plus size={18} />
          Tambah Wilayah
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
          <MapPinned size={50} className="mx-auto mb-4 text-primary" />

          <h2 className="text-xl font-semibold">Belum ada data wilayah</h2>

          <p className="mt-2 text-gray-500">
            Tambahkan wilayah kerja terlebih dahulu
          </p>
        </div>
      )}

      {/* CONTENT */}
      {!loading && data.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data.map((item) => {
            const total = item.klienDewasa + item.klienAnak;

            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                {/* IMAGE */}
                <div className="relative h-56 w-full">
                  <Image
                    src={item.image}
                    alt={item.nama}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* BODY */}
                <div className="space-y-5 p-6">
                  <div>
                    <h2 className="text-2xl font-bold text-primary">
                      {item.nama}
                    </h2>
                  </div>

                  {/* INFO */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-2xl bg-blue-50 p-4 text-center">
                      <p className="text-sm text-gray-500">Dewasa</p>

                      <h3 className="mt-1 text-xl font-bold text-blue-600">
                        {item.klienDewasa}
                      </h3>
                    </div>

                    <div className="rounded-2xl bg-green-50 p-4 text-center">
                      <p className="text-sm text-gray-500">Anak</p>

                      <h3 className="mt-1 text-xl font-bold text-green-600">
                        {item.klienAnak}
                      </h3>
                    </div>

                    <div className="rounded-2xl bg-orange-50 p-4 text-center">
                      <p className="text-sm text-gray-500">Total</p>

                      <h3 className="mt-1 text-xl font-bold text-orange-600">
                        {total}
                      </h3>
                    </div>
                  </div>

                  {/* ACTION */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-white transition hover:opacity-90"
                    >
                      <Edit size={18} />
                      Edit
                    </button>

                    <button className="flex items-center justify-center rounded-2xl border border-gray-200 px-4 py-3 transition hover:bg-gray-100">
                      <Users size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-7">
            {/* HEADER */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary">
                {editId ? "Edit Wilayah" : "Tambah Wilayah"}
              </h2>

              <button onClick={() => setOpenModal(false)}>
                <X />
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NAMA */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Nama Wilayah
                </label>

                <input
                  type="text"
                  value={form.nama}
                  onChange={(e) =>
                    setForm({
                      ...form,

                      nama: e.target.value,
                    })
                  }
                  className="bg-neutral py-2 px-3 w-full rounded-md outline-none "
                  required
                />
              </div>

              {/* IMAGE */}
              <div>
                <label className="mb-2 block text-sm font-medium">Image</label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className=" block w-full text-sm text-gray-900 border border-neutral-200 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20 file:border-0 file:bg-primary/20 file:text-white file:py-2 file:px-4 file:rounded-l-lg hover:file:bg-primary/20 hover:file:text-primary/20 transition-all"
                />
              </div>

              {/* KLIEN */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Klien Dewasa
                  </label>

                  <input
                    type="number"
                    value={form.klienDewasa}
                    onChange={(e) =>
                      setForm({
                        ...form,

                        klienDewasa: e.target.value,
                      })
                    }
                    className="bg-neutral py-2 px-3 w-full rounded-md outline-none "
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Klien Anak
                  </label>

                  <input
                    type="number"
                    value={form.klienAnak}
                    onChange={(e) =>
                      setForm({
                        ...form,

                        klienAnak: e.target.value,
                      })
                    }
                    className="bg-neutral py-2 px-3 w-full rounded-md outline-none mb-4"
                    required
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={submitLoading}
                className="flex h-13 w-full items-center justify-center rounded-xl bg-primary font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
              >
                {submitLoading ? (
                  <Loader2 className="animate-spin" />
                ) : editId ? (
                  "Update Wilayah"
                ) : (
                  "Tambah Wilayah"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
