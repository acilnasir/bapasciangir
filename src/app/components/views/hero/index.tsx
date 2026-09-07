import {
  FileText,
  ShieldCheck,
  Users,
  MapPinned,
  BadgeCheck,
  Handshake,
} from "lucide-react";
import Link from "next/link";
import Icon from "../../icons";
import HeroCarousel from "./HeroCarousel";

export default async function HeroSection() {
  const services = [
    {
      title: "Penelitian Kemasyarakatan",
      description:
        "Penyusunan laporan litmas untuk kepentingan peradilan dan pembimbingan warga binaan.",
      icon: FileText,
      href: "#cta",
    },
    {
      title: "Pembimbingan",
      description:
        "Program pembimbingan kepribadian dan kemandirian bagi klien pemasyarakatan.",
      icon: Users,
    },
    {
      title: "Pengawasan",
      description:
        "Pemantauan rutin terhadap pelaksanaan reintegrasi sosial klien di masyarakat.",
      icon: ShieldCheck,
    },
    {
      title: "Pendampingan",
      description:
        "Mengawal hak-hak Anak yang Berhadapan dengan Hukum (ABH) dalam setiap tahapan peradilan pidana",
      icon: Handshake,
    },
  ];

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

  async function getAnggaran() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/anggaran`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    return res.json();
  }

  const anggaran = await getAnggaran();
  return (
    <>
      {/* Hero Section */}
      <HeroCarousel />

      {/* Main Services Section */}
      <section className="bg-neutral py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {/* Heading */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Layanan Utama
            </span>

            <h2 className="mt-6 text-4xl font-bold text-primary md:text-5xl">
              Pelayanan Utama Kami
            </h2>

            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Akses cepat berbagai layanan administrasi dan teknis
              pemasyarakatan yang tersedia secara profesional.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;

              const CardContent = (
                <div
                  className="
  group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm
  transition-all hover:border-primary/20 hover:shadow-lg
  h-full flex flex-col
"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition group-hover:bg-primary">
                    <Icon
                      size={30}
                      className="text-primary group-hover:text-white"
                    />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-primary">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                </div>
              );

              if (service.href) {
                return (
                  <Link key={index} href={service.href}>
                    {CardContent}
                  </Link>
                );
              }

              return <div key={index}>{CardContent}</div>;
            })}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="w-full bg-primary py-20 mt-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Card 1 */}
              <div
                className="
          flex
          flex-col
          items-center
          text-center
          rounded-3xl
          border
          border-white/10
          bg-white/10
          p-8
          backdrop-blur
          transition-all
          duration-300
          hover:-translate-y-2
        "
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-tertiary/20">
                  <Users size={32} className="text-tertiary" />
                </div>

                <h3 className="mt-6 text-5xl font-bold text-tertiary">
                  {totalKlien}+
                </h3>

                <p className="mt-4 text-xl font-semibold text-white">
                  Klien Aktif
                </p>
              </div>

              {/* Card 2 */}
              <div
                className="
          flex
          flex-col
          items-center
          text-center
          rounded-3xl
          border
          border-white/10
          bg-white/10
          p-8
          backdrop-blur
          transition-all
          duration-300
          hover:-translate-y-2
        "
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-tertiary/20">
                  <MapPinned size={32} className="text-tertiary" />
                </div>

                <h3 className="mt-6 text-5xl font-bold text-tertiary">4</h3>

                <p className="mt-4 text-xl font-semibold text-white">
                  Wilayah Kerja Kabupaten
                </p>
              </div>

              {/* Card 3 */}
              <div
                className="
          flex
          flex-col
          items-center
          text-center
          rounded-3xl
          border
          border-white/10
          bg-white/10
          p-8
          backdrop-blur
          transition-all
          duration-300
          hover:-translate-y-2
        "
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-tertiary/20">
                  <BadgeCheck size={32} className="text-tertiary" />
                </div>

                <h3 className="mt-6 text-5xl font-bold text-tertiary">100%</h3>

                <p className="mt-4 text-xl font-semibold text-white">
                  Layanan Publik
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TRANSPARANSI ANGGARAN */}
        <div className="bg-neutral pt-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            {(() => {
              // AMBIL DATA TERBARU
              const latestAnggaran = anggaran?.[0];

              // DEFAULT VALUE
              const paguAnggaran = latestAnggaran
                ? Number(latestAnggaran.totalAnggaran)
                : 0;

              const realisasi = latestAnggaran
                ? Number(latestAnggaran.realisasi)
                : 0;

              const tahun = latestAnggaran
                ? latestAnggaran.tahun
                : new Date().getFullYear();

              // PERSENTASE DINAMIS
              const persentase =
                paguAnggaran > 0
                  ? ((realisasi / paguAnggaran) * 100).toFixed(2)
                  : "0";

              return (
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                  {/* HEADER */}
                  <div className="flex flex-col gap-5 border-b border-gray-100 p-8 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-primary">
                        Transparansi Anggaran {tahun}
                      </h2>

                      <p className="mt-2 text-gray-500">
                        Data realisasi anggaran Bapas Kelas II Ciangir Tahun{" "}
                        {tahun}
                      </p>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="grid gap-6 p-8 md:grid-cols-3">
                    {/* PAGU */}
                    <div className="rounded-2xl border border-gray-200 bg-neutral p-6">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Icon name="pagu" />
                      </div>

                      <p className="text-sm text-gray-500">Anggaran</p>

                      <h3 className="mt-3 text-xl font-bold text-primary">
                        Rp {paguAnggaran.toLocaleString("id-ID")}
                      </h3>
                    </div>

                    {/* REALISASI */}
                    <div className="rounded-2xl border border-gray-200 bg-neutral p-6">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                        <Icon name="realisasi" />
                      </div>

                      <p className="text-sm text-gray-500">Realisasi</p>

                      <h3 className="mt-3 text-xl font-bold text-primary">
                        Rp {realisasi.toLocaleString("id-ID")}
                      </h3>
                    </div>

                    {/* PERSENTASE */}
                    <div className="rounded-2xl border border-gray-200 bg-neutral p-6">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
                        <Icon name="persentase" />
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          Persentase Penyerapan
                        </p>

                        <span className="text-sm font-semibold text-primary">
                          {persentase}%
                        </span>
                      </div>

                      {/* PROGRESS */}
                      <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-yellow-500 transition-all duration-700"
                          style={{
                            width: `${persentase}%`,
                          }}
                        />
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs text-primary">
                        <span>0%</span>
                        <span>Target: 100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>
    </>
  );
}
