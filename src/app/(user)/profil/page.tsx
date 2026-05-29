import Image from "next/image";
import { JabatanLabel } from "../../../../lib/jabatan";
import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  Users,
  Globe,
} from "lucide-react";

import { FaMedal } from "react-icons/fa6";
import { LuChartNoAxesCombined } from "react-icons/lu";

export default async function ProfilPage() {
  async function getPejabat() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/struktural`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) return [];

    const data = await res.json();
    return data.data;
  }

  const pejabat = await getPejabat();

  async function getWilayah() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/wilayah-kerja`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) return [];

    return res.json();
  }

  const wilayah = await getWilayah();

  const totalKlien = wilayah.reduce(
    (
      total: number,
      item: {
        klienDewasa: number;
        klienAnak: number;
      },
    ) => total + item.klienDewasa + item.klienAnak,
    0,
  );

  return (
    <main className="bg-white text-gray-900">
      {/* HERO */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:px-6">
        {/* LEFT */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-yellow-600">
            Profil Instansi
          </span>

          <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
            Mewujudkan Keadilan Restoratif di Banyumas Raya
          </h1>

          <p className="mt-5 text-gray-600">
            Balai Pemasyarakatan (Bapas) Kelas II Purwokerto adalah unit
            pelaksana teknis di bawah Kementerian Imigrasi dan Pemasyarakatan
            yang berfokus pada pembimbingan kemasyarakatan.
          </p>

          {/* STATS */}
          <div className="mt-8 flex gap-6">
            <div className="rounded-md border-l-4 border-tertiary bg-neutral p-4 ">
              <p className="text-xl font-bold text-primary">49+ Tahun</p>
              <p className="text-xs text-gray-500">Tahun Melayani</p>
            </div>

            <div className="rounded-md border-l-4 border-tertiary bg-neutral p-4 ">
              <p className="text-xl font-bold text-primary">{totalKlien}+</p>
              <p className="text-xs text-gray-500">Klien Aktif</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative h-75 w-full overflow-hidden rounded-2xl shadow-lg md:h-105">
          <Image
            src="/image/kantor.jpg"
            alt="Gedung Bapas"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* VISI MISI */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center text-2xl font-bold underline underline-offset-8">
            Visi & Misi
          </h2>

          <div className="mx-auto mt-10 rounded-2xl bg-primary p-8 text-white">
            <h3 className="text-lg font-semibold ">Visi Kami</h3>
            <p className="mt-3 text-sm  text-gray-200">
              “Terwujudnya Penegakan Hukum dan Pelayanan Pemasyarakatan yang
              Berintegritas, Berkeadilan, serta Mendukung Keamanan Nasional yang
              Tangguh di Wilayah Banyumas Raya.”
            </p>
          </div>

          <h2 className="mt-10 text-center text-2xl font-bold underline underline-offset-8">
            Misi Kami
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {[
              {
                title: "Penegakan Hukum Berintegritas",
                desc: "Menjamin proses Litmas dan pendampingan yang profesional, objektif, independen, serta bersih dari praktik KKN.",
              },
              {
                title: "Pelayanan Berkeadilan & Humanis",
                desc: "Memaksimalkan implementasi Restorative Justice bagi ABH dan Klien Dewasa dengan mengutamakan pemulihan sosial.",
              },
              {
                title: "Birokrasi Modern & Digital",
                desc: "Mentransformasi tata kelola melalui SPBE yang terintegrasi penuh dengan ICJS demi layanan yang cepat dan transparan.",
              },
              {
                title: "Reintegrasi Sosial Berdampak",
                desc: "Memperkuat kolaborasi dengan Pemda dan Pokmas Lipas untuk membangun kemandirian ekonomi Klien.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-neutral bg-white p-6 shadow-sm"
              >
                <h4 className="font-semibold text-primary text-lg">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="px-2 sm:px-4 md:px-6 bg-neutral py-16 md:py-24 ">
        <h2 className="text-center text-2xl font-bold mb-8 text-primary">
          Struktur Organisasi
        </h2>
        <div className="flex justify-center overflow-hidden">
          {/* SCALE RESPONSIVE */}
          <div className=" scale-[0.58] sm:scale-[0.72] md:scale-[0.88] lg:scale-100">
            <div className="relative flex w-212.5 flex-col items-center">
              {/* GARIS UTAMA TENGAH */}
              <div className="absolute top-20 h-97.5 w-0.5 bg-gray-300" />

              {/* KEPALA */}
              <div className="z-20 flex h-20 w-64 items-center justify-center rounded-lg bg-primary px-6 text-center font-bold text-white shadow-md">
                Kepala Bapas
              </div>

              {/* KAUR TU */}
              <div className="relative mt-12 flex w-full justify-center">
                <div className="absolute left-1/2 top-8 flex items-center">
                  {/* GARIS KE SAMPING */}
                  <div className="h-0.5 w-12 bg-gray-300" />

                  {/* BOX */}
                  <div className="flex h-16 w-56 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 text-center text-sm font-medium text-primary shadow-sm">
                    Kaur Tata Usaha
                  </div>
                </div>
              </div>

              {/* SPACE */}
              <div className="h-32" />

              {/* BKA BKD */}
              <div className="relative w-full">
                {/* GARIS HORIZONTAL */}
                <div className="absolute top-0 left-1/2 h-0.5 w-120 -translate-x-1/2 bg-gray-300" />

                <div className="grid grid-cols-2 gap-12 md:gap-24">
                  {/* BKA */}
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-0.5 bg-gray-300" />

                    <div className="z-10 flex h-20 w-full max-w-60 md:max-w-70 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 text-center text-xs md:text-sm font-medium text-primary shadow-sm">
                      Kasubsi Bimbingan Klien Anak (BKA)
                    </div>
                  </div>

                  {/* BKD */}
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-0.5 bg-gray-300" />

                    <div className="z-10 flex h-20 w-full max-w-60 md:max-w-70 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 text-center text-xs md:text-sm font-medium text-primary shadow-sm">
                      Kasubsi Bimbingan Klien Dewasa (BKD)
                    </div>
                  </div>
                </div>
              </div>

              {/* PK */}
              <div className="mt-24">
                <div className="flex h-16 w-64 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 text-center text-sm font-medium text-primary shadow-sm">
                  PK (Pembimbing Kemasyarakatan)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PIMPINAN */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-primary">
              Pejabat Struktural
            </h2>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pejabat?.map(
              (item: {
                id: string;
                nama: string;
                jabatan: string;
                foto: string | null;
              }) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-xl bg-white shadow-sm"
                >
                  <div className="relative h-96 w-full">
                    <Image
                      src={item.foto || "/person.jpg"}
                      alt={item.nama}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <p className="font-semibold">{item.nama}</p>
                    <p className="text-sm text-tertiary">
                      {JabatanLabel[item.jabatan as keyof typeof JabatanLabel]}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className=" bg-neutral py-10">
        {/* HEADER */}
        <div className="py-10 text-center">
          <h2 className="text-3xl font-bold text-primary">
            Profil Singkat Kepala Bapas
          </h2>

          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-tertiary" />
        </div>

        {/* CARD */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm mx-5 md:mx-20">
          {/* TOP HEADER */}
          <div className="bg-primary px-5 py-5 md:px-7">
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              {/* FOTO */}
              <div className="flex justify-center md:block">
                <div className="overflow-hidden rounded-lg border border-white/10 bg-white p-1 shadow-md">
                  <Image
                    src="/images/kepala-bapas.jpg"
                    alt="Kepala Bapas"
                    className="h-28 w-20 rounded-md object-cover md:h-32 md:w-24"
                  />
                </div>
              </div>

              {/* INFO */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-extrabold tracking-tight text-white">
                  NASIRUDIN, S.H., M.H.
                </h3>

                <p className="mt-1 text-sm font-semibold text-tertiary">
                  Kepala Balai Pemasyarakatan Kelas II Purwokerto
                </p>

                {/* BADGES */}
                <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
                  <div className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur">
                    <BriefcaseBusiness size={14} />
                    Penata Tk. I / IV-b
                  </div>

                  <div className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur">
                    <GraduationCap size={14} />
                    S1 Ilmu Hukum - S2 Ilmu Hukum
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="grid gap-8 p-5 md:grid-cols-2 xl:grid-cols-3 xl:p-7">
            {/* RIWAYAT PENDIDIKAN */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <GraduationCap size={16} className="text-tertiary" />

                <h4 className="text-sm font-bold uppercase tracking-wide text-primary">
                  Riwayat Pendidikan
                </h4>
              </div>

              <ul className="space-y-3 text-sm text-gray-600">
                <li className="border-t border-gray-200 pt-3">
                  Universitas Mathlaul Anwar – Ilmu Hukum
                  <span className="mt-1 block text-xs text-gray-400">
                    S1 (2010)
                  </span>
                </li>

                <li className="border-t border-gray-200 pt-3">
                  STIH IBLAM – Ilmu Hukum
                  <span className="mt-1 block text-xs text-gray-400">
                    S2 (2013)
                  </span>
                </li>
              </ul>
            </div>

            {/* RIWAYAT JABATAN */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <BriefcaseBusiness size={16} className="text-tertiary" />

                <h4 className="text-sm font-bold uppercase tracking-wide text-primary">
                  Riwayat Jabatan Utama
                </h4>
              </div>

              <ul className="space-y-3 text-sm text-gray-600">
                <li className="border-t border-gray-200 pt-3">
                  2018 Pembimbing Kemasyarakatan – Bapas Kelas II Serang
                </li>

                <li className="border-t border-gray-200 pt-3">
                  2020 Kepala Subseksi BKA – Bapas Kelas I Purwokerto
                </li>

                <li className="border-t border-gray-200 pt-3">
                  2023 Kepala Bapas Kelas II Cirebon
                </li>
              </ul>
            </div>

            {/* PENGHARGAAN */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Award size={16} className="text-tertiary" />

                <h4 className="text-sm font-bold uppercase tracking-wide text-primary">
                  Penghargaan
                </h4>
              </div>

              <ul className="space-y-3 text-sm text-gray-600">
                <li className="border-t border-gray-200 pt-3">
                  Satyalancana Karya Satya X – Presiden RI (2015)
                </li>

                <li className="border-t border-gray-200 pt-3">
                  Pegawai Teladan Kemenkumham (2021)
                </li>

                <li className="border-t border-gray-200 pt-3">
                  Satyalancana Karya Satya XX – Presiden RI (2024)
                </li>
              </ul>
            </div>

            {/* DIKLAT */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <BookOpen size={16} className="text-tertiary" />

                <h4 className="text-sm font-bold uppercase tracking-wide text-primary">
                  Diklat dan Kompetensi
                </h4>
              </div>

              <ul className="space-y-3 text-sm text-gray-600">
                <li className="border-t border-gray-200 pt-3">
                  Pendidikan Dasar Pemasyarakatan – Pengayoman (2010)
                </li>

                <li className="border-t border-gray-200 pt-3">
                  PKP Leadership for Menengah (2020)
                </li>

                <li className="border-t border-gray-200 pt-3">
                  Training of Facilitator Implementasi KUM – Kemenkumham
                </li>
              </ul>
            </div>

            {/* ORGANISASI */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Users size={16} className="text-tertiary" />

                <h4 className="text-sm font-bold uppercase tracking-wide text-primary">
                  Organisasi
                </h4>
              </div>

              <ul className="space-y-3 text-sm text-gray-600">
                <li className="border-t border-gray-200 pt-3">
                  IPKJI – Jabar – 2017–2019
                </li>

                <li className="border-t border-gray-200 pt-3">
                  IPKJI – Jakarta – 2021–2023
                </li>

                <li className="border-t border-gray-200 pt-3">
                  Yayasan Semesta Moral Indonesia – 2022–sekarang
                </li>
              </ul>
            </div>

            {/* PENGALAMAN */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Globe size={16} className="text-tertiary" />

                <h4 className="text-sm font-bold uppercase tracking-wide text-primary">
                  Pengalaman Internasional
                </h4>
              </div>

              <ul className="space-y-3 text-sm text-gray-600">
                <li className="border-t border-gray-200 pt-3">
                  Thailand – Asia Pacific Correctional Juvenile Justice (2015)
                </li>

                <li className="border-t border-gray-200 pt-3">
                  Australia – Promoting Transparency and Accountability
                </li>

                <li className="border-t border-gray-200 pt-3">
                  Thailand – SOSIAL Regional Correctional Conference
                </li>
              </ul>
            </div>

            {/* PRESTASI */}
            <div className="md:col-span-2 xl:col-span-1">
              <div className="mb-4 flex items-center gap-2">
                <FaMedal className="text-sm text-tertiary" />

                <h4 className="text-sm font-bold uppercase tracking-wide text-primary">
                  Prestasi Menonjol
                </h4>
              </div>

              <div className="space-y-4">
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="border-t border-gray-200 pt-3">
                    Tim penyusun modul, instruktur, dan regulasi
                  </li>

                  <li className="border-t border-gray-200 pt-3">
                    Bidang pemasyarakatan tingkat nasional dan internasional.
                  </li>
                </ul>

                <div className="rounded-xl border border-neutral-200 bg-neutral p-4 mt-8">
                  <div className="">
                    <div className="flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center  text-tertiary">
                        <LuChartNoAxesCombined size={18} />
                      </div>

                      <div className="">
                        <p className="text-sm font-bold uppercase tracking-wide text-primary">
                          Kinerja
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between space-y-3 text-sm text-gray-600">
                      <p className="text-sm text-gray-600">Rekam Jejak</p>
                      <div className="bg-green-200 px-3 py-1 rounded-md">
                        <p className="font-bold text-green-600">BAIK</p>
                      </div>
                    </div>
                    <div className="flex justify-between ">
                      <p className="text-sm text-gray-600">PPKP 2025</p>

                      <p className="font-bold text-primary">
                        Di atas ekspektasi
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEJARAH PERJALANAN */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center text-2xl font-bold text-primary">
            Sejarah Perjalanan
          </h2>

          <p className="mt-2 text-center text-sm text-gray-500">
            Perjalanan panjang Bapas Purwokerto
          </p>

          {/* TIMELINE WRAPPER */}
          <div className="relative mt-12">
            {/* GARIS HORIZONTAL */}
            <div className="absolute left-0 top-1/2 hidden h-0.5 w-full -translate-y-1/2 bg-gray-300 md:block" />

            <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
              {[
                {
                  year: "1977",
                  title: "Pendirian",
                  desc: "Bapas Purwokerto resmi berdiri sebagai pelaksana pembimbingan kemasyarakatan.",
                  active: false,
                },
                {
                  year: "1979",
                  title: "Berpindah Gedung",
                  desc: "Bapas Purwokerto berpindah ke lokasi kantor baru guna meningkatkan kualitas pelayanan pembimbingan kemasyarakatan serta mendukung kegiatan administrasi yang semakin berkembang.",
                  active: false,
                },
                {
                  year: "1982",
                  title: "Gedung Permanen",
                  desc: "Pembangunan gedung permanen Bapas Purwokerto menjadi langkah penting dalam memperkuat sarana dan prasarana pelayanan bagi klien pemasyarakatan dan masyarakat.",
                  active: false,
                },
                {
                  year: "2023 - Sekarang",
                  title: "Predikat WBK dan Menuju WBBM",
                  desc: "Bapas Purwokerto berhasil meraih predikat Wilayah Bebas dari Korupsi (WBK) serta terus berkomitmen mewujudkan Wilayah Birokrasi Bersih dan Melayani (WBBM) melalui peningkatan integritas, inovasi layanan, dan kualitas pelayanan publik.",
                  active: true,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* DOT */}
                  <div
                    className={`
                z-10 flex h-10 w-10 items-center justify-center rounded-full border-4
                ${
                  item.active
                    ? "border-yellow-500 bg-yellow-500 text-white"
                    : "border-gray-400 bg-white"
                }
              `}
                  >
                    {item.active ? "★" : index + 1}
                  </div>

                  {/* CARD */}
                  <div className="mt-6 rounded-xl bg-white p-5 md:mt-10">
                    <p className="text-sm font-bold text-primary">
                      {item.year}
                    </p>
                    <h3 className="mt-1 font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
