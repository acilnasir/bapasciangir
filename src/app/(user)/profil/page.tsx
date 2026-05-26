import Image from "next/image";
import { JabatanLabel } from "../../../../lib/jabatan";

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
            Mewujudkan Keadilan Restoratif di Purwokerto
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
          <h2 className="text-center text-2xl font-bold">Visi & Misi</h2>

          <div className="mx-auto mt-10 rounded-2xl bg-[#0b1f44] p-8 text-white">
            <h3 className="text-lg font-semibold">Visi Kami</h3>
            <p className="mt-3 text-sm text-gray-200">
              “Terwujudnya Penegakan Hukum dan Pelayanan Pemasyarakatan yang
              Berintegritas, Berkeadilan, serta Mendukung Keamanan Nasional yang
              Tangguh di Wilayah Banyumas Raya.”
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Penegakan Hukum",
                desc: "Melaksanakan pembimbingan klien secara objektif.",
              },
              {
                title: "Reintegrasi Sosial",
                desc: "Mengoptimalkan peran masyarakat dalam pembimbingan.",
              },
              {
                title: "Pelayanan Prima",
                desc: "Memberikan layanan transparan dan profesional.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-neutral bg-white p-6 shadow-sm"
              >
                <h4 className="font-semibold">{item.title}</h4>
                <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRUKTUR */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center text-2xl font-bold">
            Struktur Organisasi
          </h2>

          <p className="mt-2 text-center text-sm text-gray-500">
            Sinergi kepemimpinan untuk pelayanan yang transparan
          </p>

          {/* TREE WRAPPER */}
          <div className="mt-10 flex flex-col items-center">
            {/* KEPALA BAPAS */}
            <div className="relative">
              <div className="rounded-lg bg-primary px-6 py-3 text-white shadow-md">
                Kepala Bapas
              </div>

              {/* vertical line */}
              <div className="mx-auto h-10 w-px bg-gray-300"></div>
            </div>

            {/* SECOND LEVEL LINE (horizontal) */}
            <div className="relative flex w-full max-w-4xl justify-center">
              <div className="absolute top-0 h-px w-2/3 bg-gray-300"></div>
            </div>

            {/* CHILD NODES */}
            <div className="mt-6 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
              {/* LEFT */}
              <div className="relative flex flex-col items-center">
                <div className="h-6 w-px bg-gray-300"></div>
                <div className="rounded-lg border bg-white px-4 py-3 text-center shadow-sm">
                  Urusan Tata Usaha
                </div>
              </div>

              {/* MIDDLE */}
              <div className="relative flex flex-col items-center">
                <div className="h-6 w-px bg-gray-300"></div>
                <div className="rounded-lg border bg-white px-4 py-3 text-center shadow-sm">
                  Sub Seksi Bimbingan Klien Dewasa
                </div>
              </div>

              {/* RIGHT */}
              <div className="relative flex flex-col items-center">
                <div className="h-6 w-px bg-gray-300"></div>
                <div className="rounded-lg border bg-white px-4 py-3 text-center shadow-sm">
                  Sub Seksi Bimbingan Klien Anak
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PIMPINAN */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Pejabat Struktural</h2>
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
                    <p className="text-xs text-gray-500">
                      {JabatanLabel[item.jabatan as keyof typeof JabatanLabel]}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      {/* SEJARAH PERJALANAN */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center text-2xl font-bold">Sejarah Perjalanan</h2>

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
