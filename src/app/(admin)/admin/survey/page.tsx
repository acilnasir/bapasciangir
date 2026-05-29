"use client";

import { useEffect, useState } from "react";

import { Loader2, Pencil, Star } from "lucide-react";

type Survey = {
  id: string;
  label: string;
  title: string;
  score: number;
  period: string;
  respondents: string;
};

export default function AdminSurveyPage() {
  const [data, setData] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  // ======================
  // FORM
  // ======================
  const [form, setForm] = useState({
    label: "",
    title: "",
    score: "",
    period: "",
    respondents: "",
  });

  // ======================
  // LOAD DATA
  // ======================
  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/survey`,
        );

        const result = await response.json();

        if (!ignore) {
          setData(result.data || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      ignore = true;
    };
  }, []);

  // ======================
  // RELOAD
  // ======================
  const reloadSurvey = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/survey`,
      );

      const result = await response.json();

      setData(result.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  // ======================
  // HANDLE CHANGE
  // ======================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ======================
  // UPDATE ONLY
  // ======================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingId) {
      alert("Pilih data yang ingin diedit");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("id", editingId);
      formData.append("label", form.label);
      formData.append("title", form.title);
      formData.append("score", form.score);
      formData.append("period", form.period);
      formData.append("respondents", form.respondents);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/survey`,
        {
          method: "PUT",
          body: formData,
        },
      );

      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      alert(result.message);

      // RESET
      setForm({
        label: "",
        title: "",
        score: "",
        period: "",
        respondents: "",
      });

      setEditingId(null);

      await reloadSurvey();
    } catch (error) {
      console.error(error);

      alert("Terjadi kesalahan");
    } finally {
      setSubmitting(false);
    }
  };

  // ======================
  // EDIT
  // ======================
  const handleEdit = (item: Survey) => {
    setEditingId(item.id);

    setForm({
      label: item.label,
      title: item.title,
      score: item.score.toString(),
      period: item.period,
      respondents: item.respondents.toString(),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getCategory = (score: number) => {
    if (score >= 3.76) {
      return {
        label: "Sangat Baik",
        color: "bg-green-100 text-green-700",
      };
    }

    if (score >= 3.0) {
      return {
        label: "Baik",
        color: "bg-blue-100 text-blue-700",
      };
    }

    if (score >= 2.0) {
      return {
        label: "Cukup",
        color: "bg-yellow-100 text-yellow-700",
      };
    }

    return {
      label: "Kurang",
      color: "bg-red-100 text-red-700",
    };
  };

  return (
    <section className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Data Survey</h1>

          <p className="mt-2 text-sm text-gray-500">
            Kelola hasil survey IPK & IKM.
          </p>
        </div>

        {/* FORM EDIT */}
        <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-primary">Edit Data Survey</h2>

            <p className="mt-1 text-sm text-gray-500">
              Klik tombol edit pada tabel untuk mengubah data.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
            {/* LABEL */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Label
              </label>

              <input
                type="text"
                name="label"
                value={form.label}
                onChange={handleChange}
                placeholder="SPAK / SKPK"
                className="bg-neutral py-2 px-3 w-full rounded-md outline-none "
              />
            </div>

            {/* SCORE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nilai
              </label>

              <input
                type="number"
                step="0.01"
                name="score"
                value={form.score}
                onChange={handleChange}
                placeholder="97.50"
                className="bg-neutral py-2 px-3 w-full rounded-md outline-none "
              />
            </div>

            {/* TITLE */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Judul
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Survey Persepsi Anti Korupsi"
                className="bg-neutral py-2 px-3 w-full rounded-md outline-none "
              />
            </div>

            {/* RESPONDENTS */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Responden
              </label>

              <input
                type="text"
                name="respondents"
                value={form.respondents}
                onChange={handleChange}
                placeholder="Jumlah Responden"
                className="bg-neutral py-2 px-3 w-full rounded-md outline-none "
              />
            </div>

            {/* PERIOD */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Periode
              </label>

              <input
                type="text"
                name="period"
                value={form.period}
                onChange={handleChange}
                placeholder="Maret 2026"
                className="bg-neutral py-2 px-3 w-full rounded-md outline-none "
              />
            </div>

            {/* BUTTON */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={submitting || !editingId}
                className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-6 font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Pencil size={18} />
                    Update Survey
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          {/* HEADER */}
          <div className="border-b border-gray-100 px-6 py-5">
            <div>
              <h2 className="text-xl font-bold text-primary">Daftar Survey</h2>

              <p className="text-sm text-gray-500">
                Total {data.length} survey
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Label
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Judul
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Responden
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Nilai
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Periode
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
                ) : data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-14 text-center text-gray-500"
                    >
                      Tidak ada data survey
                    </td>
                  </tr>
                ) : (
                  data.map((item) => {
                    const category = getCategory(item.score);
                    return (
                      <tr
                        key={item.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        {/* LABEL */}
                        <td className="px-6 py-5">
                          <span className="rounded-xl bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">
                            {item.label}
                          </span>
                        </td>

                        {/* TITLE */}
                        <td className="px-6 py-5">
                          <h3 className="font-semibold text-gray-800">
                            {item.title}
                          </h3>
                        </td>

                        {/* RESPONDENTS */}
                        <td className="px-6 py-5">
                          <h3 className="font-semibold text-gray-800">
                            {item.respondents}
                          </h3>
                        </td>

                        {/* SCORE */}

                        <td className="px-6 py-5">
                          <div className="flex flex-col gap-2">
                            {/* SCORE */}
                            <div className="flex items-center gap-2">
                              <Star
                                size={16}
                                className="fill-yellow-400 text-yellow-400"
                              />

                              <span className="font-bold text-primary">
                                {item.score}/4
                              </span>
                            </div>

                            {/* CATEGORY */}
                            <span
                              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${category.color}`}
                            >
                              {category.label}
                            </span>
                          </div>
                        </td>

                        {/* PERIOD */}
                        <td className="px-6 py-5 text-sm text-gray-500">
                          {item.period}
                        </td>

                        {/* ACTION */}
                        <td className="px-6 py-5">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-all hover:bg-blue-600 hover:text-white"
                            >
                              <Pencil size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
