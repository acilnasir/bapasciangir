"use client";

import { Lock, X } from "lucide-react";
import { useState } from "react";

export default function CTAKandaSection() {
  const [showModal, setShowModal] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [accessLoading, setAccessLoading] = useState(false);
  const [accessError, setAccessError] = useState("");

  const handleKamandakaAccess = async () => {
    try {
      setAccessLoading(true);
      setAccessError("");

      const res = await fetch("/api/kamandaka/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: accessCode,
        }),
      });

      const result = await res.json();

      if (!result.success) {
        setAccessError(result.message);
        return;
      }

      window.open(result.redirectUrl, "_blank");

      setShowModal(false);
      setAccessCode("");
    } catch {
      setAccessError("Terjadi kesalahan");
    } finally {
      setAccessLoading(false);
    }
  };

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary shadow-2xl">
          {/* Background Decoration */}
          <div className="absolute right-0 top-0 p-8 opacity-10">
            <Lock size={180} className="text-white" />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center gap-6 p-10 md:col-span-2 md:p-16">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-tertiary/30 bg-yellow-500/20 px-3 py-1">
                <Lock size={16} className="text-tertiary" />

                <span className="text-xs font-bold uppercase tracking-wider text-tertiary">
                  Internal Pegawai
                </span>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-white md:text-5xl">
                  Kamandaka Digital Assistant
                </h2>

                <p className="mt-3 max-w-xl text-lg text-white/80">
                  Asisten Digital Layanan Pemasyarakatan untuk mendukung
                  optimalisasi kinerja pegawai Bapas Ciangir.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setShowModal(true)}
                  className="flex w-fit items-center gap-3 rounded-xl bg-tertiary px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:opacity-90"
                >
                  <Lock size={20} />
                  Akses Kanda
                </button>

                <p className="text-sm font-medium text-white/70">
                  Hanya untuk pegawai (Memerlukan Kode Akses)
                </p>
              </div>
            </div>

            {/* Image */}
            <div
              className="hidden min-h-87.5 bg-cover bg-center md:block"
              style={{
                backgroundImage: "url('/image/unnamed.png')",
              }}
            >
              <div className="h-full w-full bg-primary/40 backdrop-blur-[2px]" />
            </div>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-primary">
                Kode Akses Kamandaka
              </h3>

              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mb-4 text-sm text-gray-500">
              Masukkan kode akses yang diberikan administrator.
            </p>

            <input
              type="password"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="Masukkan kode akses"
              className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-primary"
            />

            {accessError && (
              <div className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {accessError}
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-xl border border-gray-300 py-3 font-medium"
              >
                Batal
              </button>

              <button
                onClick={handleKamandakaAccess}
                disabled={accessLoading}
                className="flex-1 rounded-xl bg-primary py-3 font-medium text-white hover:opacity-90 disabled:opacity-50"
              >
                {accessLoading ? "Memeriksa..." : "Masuk"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
