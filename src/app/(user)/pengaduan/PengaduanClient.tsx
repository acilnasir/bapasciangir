"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import {
  ChevronDown,
  CircleHelp,
  Phone,
  Mail,
  Send,
  Upload,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function PengaduanClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState({
    nama: "",
    kontak: "",
    kategori: "",
    deskripsi: "",
  });

  const [file, setFile] = useState<File | null>(null);

  // ======================
  // HANDLE INPUT
  // ======================
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ======================
  // HANDLE FILE
  // ======================
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // ======================
  // SUBMIT
  // ======================
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSuccessMessage("");

      const formData = new FormData();

      formData.append("nama", form.nama);
      formData.append("kontak", form.kontak);
      formData.append("kategori", form.kategori);
      formData.append("deskripsi", form.deskripsi);

      if (file) {
        formData.append("lampiran", file);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pengaduan`,
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Gagal mengirim pengaduan");
        return;
      }

      // SUCCESS MESSAGE
      setSuccessMessage(
        "Pengaduan berhasil dikirim. Terima kasih atas laporan Anda.",
      );

      // RESET FORM
      setForm({
        nama: "",
        kontak: "",
        kategori: "",
        deskripsi: "",
      });

      setFile(null);
    } catch (error) {
      console.error(error);

      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-neutral">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        {/* HERO */}
        <div className="rounded-2xl bg-primary">
          <div className="flex items-center justify-center">
            <div className="max-w-2xl px-8 py-6 md:px-12">
              <h1 className="text-center text-2xl font-bold leading-tight text-white md:text-5xl">
                Layanan Pengaduan Masyarakat
              </h1>

              <p className="mt-5 text-center text-lg leading-relaxed text-white/80">
                Laporkan segala kendala atau ketidaksesuaian pelayanan demi
                mewujudkan Bapas Purwokerto yang berintegritas dan transparan.
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* LEFT */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            {/* TITLE */}
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                <Send size={20} className="text-primary" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary">
                  Formulir Pengaduan
                </h2>

                <p className="text-sm text-gray-500">
                  Sampaikan laporan Anda dengan lengkap dan jelas.
                </p>
              </div>
            </div>

            {/* SUCCESS ALERT */}
            {successMessage && (
              <div className="mb-6 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-4 text-green-700">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0" />

                <p className="text-sm leading-relaxed">{successMessage}</p>
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ROW */}
              <div className="grid gap-5 md:grid-cols-2">
                {/* NAMA */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nama Lengkap
                  </label>

                  <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    placeholder="Masukkan nama sesuai KTP"
                    className="bg-neutral py-2 px-3 w-full rounded-md outline-none mb-4"
                    required
                  />
                </div>

                {/* KONTAK */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Kontak (WhatsApp/Email)
                  </label>

                  <input
                    type="text"
                    name="kontak"
                    value={form.kontak}
                    onChange={handleChange}
                    placeholder="081xxxxx atau email@domain.com"
                    className="bg-neutral py-2 px-3 w-full rounded-md outline-none mb-4"
                    required
                  />
                </div>
              </div>

              {/* SUBJECT */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Subjek Laporan
                </label>

                <div className="">
                  <select
                    name="kategori"
                    value={form.kategori}
                    onChange={handleChange}
                    className=" bg-neutral py-2 px-3 w-full rounded-md outline-none mb-4"
                    required
                  >
                    <option value="">Pilih Kategori Layanan</option>

                    <option value="PELAYANAN_KLIEN">Pelayanan Klien</option>

                    <option value="PENDAMPINGAN">Pendampingan</option>

                    <option value="ADMINISTRASI">Administrasi</option>

                    <option value="INFORMASI">Informasi</option>

                    <option value="LAINNYA">Lainnya</option>
                  </select>
                </div>
              </div>

              {/* DESKRIPSI */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Deskripsi Pengaduan
                </label>

                <textarea
                  rows={6}
                  name="deskripsi"
                  value={form.deskripsi}
                  onChange={handleChange}
                  placeholder="Ceritakan detail kejadian secara jelas dan objektif..."
                  className="bg-neutral py-2 px-3 w-full rounded-md outline-none mb-4"
                  required
                />
              </div>

              {/* UPLOAD */}
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  Lampiran Bukti (Opsional)
                </label>

                <label className="flex h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition-all hover:border-primary">
                  <Upload size={34} className="text-gray-400" />

                  <p className="mt-4 text-sm font-medium text-gray-600">
                    {file
                      ? file.name
                      : "Klik untuk upload atau seret file ke sini"}
                  </p>

                  <span className="mt-1 text-xs text-gray-400">
                    PNG, JPG (Maks. 5MB)
                  </span>

                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".png,.jpg,.jpeg,.pdf"
                  />
                </label>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-white transition-all hover:bg-[#0b2c7d] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Kirim Laporan Sekarang
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                Laporan Anda dilindungi oleh kebijakan kerahasiaan pelapor.
              </p>
            </form>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* FAQ */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-primary">Tanya Jawab</h3>

              <div className="mt-6 divide-y divide-gray-100">
                {[
                  {
                    question: "Berapa lama laporan diproses?",
                    answer:
                      "Laporan akan diverifikasi dan diproses maksimal 3x24 jam kerja setelah diterima.",
                  },
                  {
                    question: "Apakah pelapor anonim?",
                    answer:
                      "Identitas pelapor dapat dirahasiakan sesuai permintaan untuk menjaga keamanan dan kenyamanan.",
                  },
                  {
                    question: "Bagaimana jika bukti kurang?",
                    answer:
                      "Petugas akan menghubungi pelapor untuk melengkapi informasi atau bukti tambahan apabila diperlukan.",
                  },
                ].map((item, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div key={index}>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="flex w-full items-center justify-between py-4 text-left"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {item.question}
                        </span>

                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen
                            ? "max-h-40 pb-4 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-sm leading-relaxed text-gray-500">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CONTACT */}
            <div className="rounded-3xl bg-primary p-6 text-white shadow-lg">
              <div className="flex items-center gap-3">
                <CircleHelp size={22} />

                <h3 className="text-2xl font-bold">Bantuan Langsung</h3>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/80">
                Butuh bantuan segera terkait prosedur pengaduan?
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={16} />
                  (0281) 636608
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} />
                  bapas_purwokerto@yahoo.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
