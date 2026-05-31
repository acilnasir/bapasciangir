"use client";

import { Dashboard } from "@/types/infografis";
import { useEffect, useState } from "react";
import {
  Save,
  Scale,
  Users,
  FileText,
  BadgeCheck,
  Handshake,
} from "lucide-react";

const LABELS: Record<string, string> = {
  apelCB: "CB (Apel)",
  apelCMB: "CMB (Apel)",
  apelPB: "PB (Apel)",
  apelPIB: "PIB (Apel)",

  baruCB: "CB (Baru)",
  baruCMB: "CMB (Baru)",
  baruPB: "PB (Baru)",
  baruPIB: "PIB (Baru)",

  dewasaPB: "PB",
  dewasaCB: "CB",
  dewasaCMB: "CMB",
  dewasaPembinaanAwal: "Pembinaan Awal",
  dewasaPerubahan: "Perubahan Pidana",
  dewasaMutasi: "Mutasi",
  dewasaPraAjudikasi: "Pra Ajudikasi",

  anakSidang: "Sidang Anak",
  anakDiversi: "Diversi",
  anakPB: "PB",
  anakCB: "CB",
  anakPembinaanAwal: "Pembinaan Awal",
  anakKorban: "Korban",
  anakKurang12Tahun: "< 12 Tahun",

  hadir: "Hadir",
  cuti: "Cuti",
  dinasLuar: "Dinas Luar",
  posBapas: "Pos Bapas",
  tanpaKeterangan: "Tanpa Keterangan",

  diversi: "Diversi",
  sidang: "Sidang",
  pengakhiran: "Pengakhiran",
  pencabutan: "Pencabutan",
  pelimpahan: "Pelimpahan",
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/infografis");
        const json = await res.json();

        if (mounted) {
          setData(json?.[0] ?? null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  const handleUpdate = async () => {
    if (!data) return;

    // 🔥 REMOVE id BEFORE SEND (biar clean)
    const { id, ...payload } = data;

    await fetch(`/api/infografis/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("Berhasil update");
  };

  const cardClass =
    "bg-white rounded-2xl border border-slate-200 shadow-sm p-5";

  if (loading) return <div className="p-10 text-white">Loading...</div>;
  if (!data) return <div className="p-10 text-red-500">Data kosong</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Infografis Harian</h1>

        <p className="text-primary mt-2">
          Kelola data operasional yang ditampilkan pada halaman publik.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* ================= JENIS PIDANA ================= */}
        <div className={cardClass}>
          <div className="flex items-center gap-3 mb-5">
            <Scale className="text-primary" size={20} />

            <div>
              <h2 className="font-bold text-slate-800">Jenis Pidana</h2>

              <p className="text-sm text-slate-500">Data klasifikasi perkara</p>
            </div>
          </div>

          {data.jenisPidana.map((item, index) => (
            <div key={item.id} className="grid grid-cols-2 gap-3 mb-3">
              <input
                className="border border-neutral-200 rounded-xl p-3 text-slate-700"
                value={item.label}
                onChange={(e) => {
                  const updated = [...data.jenisPidana];
                  updated[index].label = e.target.value;
                  setData({ ...data, jenisPidana: updated });
                }}
              />

              <input
                type="number"
                className="border border-neutral-200 rounded-xl p-3 text-right"
                value={item.value}
                min={0}
                onChange={(e) => {
                  const updated = [...data.jenisPidana];
                  updated[index].value = Number(e.target.value);
                  setData({ ...data, jenisPidana: updated });
                }}
              />
            </div>
          ))}
        </div>

        {/* ================= KLIEN ================= */}
        <div className={cardClass}>
          <div className="flex items-center gap-3 mb-5">
            <Users className="text-primary" size={20} />

            <div>
              <h2 className="font-bold text-slate-800">Data Klien</h2>

              <p className="text-sm text-slate-500">Klien Apel dan Baru</p>
            </div>
          </div>

          {Object.entries(data.klien)
            .filter(([key]) => key !== "id" && key !== "dashboardId")
            .map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between py-2 border-b border-slate-100"
              >
                <span>{LABELS[key] ?? key}</span>

                <input
                  type="number"
                  className="w-24 rounded-lg border border-slate-200 px-3 py-2 text-right"
                  value={value}
                  min={0}
                  onChange={(e) =>
                    setData({
                      ...data,
                      klien: {
                        ...data.klien,
                        [key]: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>
            ))}
        </div>

        <div className={cardClass}>
          <div className="flex items-center gap-3 mb-5">
            <FileText className="text-primary" />

            <h2 className="font-bold text-slate-800">Data Litmas</h2>
          </div>

          {/* ================= DEWASA ================= */}
          <div className="mb-6">
            <div className="mb-3">
              <span className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                Litmas Dewasa
              </span>
            </div>

            {Object.entries(data.litmas)
              .filter(([key]) => key.startsWith("dewasa"))
              .map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-2 border-b border-slate-100"
                >
                  <span>{LABELS[key] ?? key}</span>

                  <input
                    type="number"
                    className="w-24 rounded-lg border border-slate-200 px-3 py-2 text-right"
                    value={value}
                    min={0}
                    onChange={(e) =>
                      setData({
                        ...data,
                        litmas: {
                          ...data.litmas,
                          [key]: Math.max(0, Number(e.target.value)),
                        },
                      })
                    }
                  />
                </div>
              ))}
          </div>

          {/* ================= ANAK ================= */}
          <div>
            <div className="mb-3">
              <span className="rounded-lg bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                Litmas Anak
              </span>
            </div>

            {Object.entries(data.litmas)
              .filter(([key]) => key.startsWith("anak"))
              .map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-2 border-b border-slate-100"
                >
                  <span>{LABELS[key] ?? key}</span>

                  <input
                    type="number"
                    className="w-24 rounded-lg border border-slate-200 px-3 py-2 text-right"
                    value={value}
                    min={0}
                    onChange={(e) =>
                      setData({
                        ...data,
                        litmas: {
                          ...data.litmas,
                          [key]: Math.max(0, Number(e.target.value)),
                        },
                      })
                    }
                  />
                </div>
              ))}
          </div>
        </div>

        {/* ================= SDM ================= */}
        <div className={cardClass}>
          <div className="flex items-center gap-3 mb-5">
            <BadgeCheck className="text-primary" />

            <h2 className="font-bold text-slate-800">SDM</h2>
          </div>

          {Object.entries(data.sdm)
            .filter(([key]) => key !== "id" && key !== "dashboardId")
            .map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between py-2 border-b border-slate-100"
              >
                <span>{LABELS[key] ?? key}</span>
                <input
                  type="number"
                  className="w-24 rounded-lg border border-slate-200 px-3 py-2 text-right"
                  value={value}
                  min={0}
                  onChange={(e) =>
                    setData({
                      ...data,
                      sdm: {
                        ...data.sdm,
                        [key]: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>
            ))}
        </div>

        <div className={cardClass}>
          <div className="flex items-center gap-3 mb-5">
            <Handshake className="text-primary" />

            <h2 className="font-bold text-slate-800">Data Pendampingan</h2>
          </div>

          {Object.entries(data.pendampingan)
            .filter(([key]) => key !== "id" && key !== "dashboardId")
            .map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between py-2 border-b border-slate-100"
              >
                <span>{LABELS[key] ?? key}</span>

                <input
                  type="number"
                  min={0}
                  className="w-24 rounded-lg border border-slate-200 px-3 py-2 text-right focus:border-primary focus:outline-none"
                  value={value}
                  onChange={(e) =>
                    setData({
                      ...data,
                      pendampingan: {
                        ...data.pendampingan,
                        [key]: Math.max(0, Number(e.target.value)),
                      },
                    })
                  }
                />
              </div>
            ))}
        </div>
      </div>

      {/* ================= SAVE ================= */}
      <div className="sticky bottom-6 mt-8 flex justify-end">
        <button
          onClick={handleUpdate}
          className="
      flex
      items-center
      gap-2
      rounded-xl
      bg-primary
      px-6
      py-3
      font-semibold
      text-white
      shadow-lg
      transition
      hover:scale-105
    "
        >
          <Save size={18} />
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
