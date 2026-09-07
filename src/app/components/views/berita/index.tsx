import Image from "next/image";
import Link from "next/link";
import type { Berita } from "@/types/berita";
import { ChevronRight } from "lucide-react";

export default async function BeritaSection() {
  // FETCH BERITA
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/berita`, {
    cache: "no-store",
  });

  const result = await res.json();

  const berita: Berita[] = result.data || [];

  // AMBIL 4 BERITA TERBARU (STABIL & AMAN)
  const latestBerita = berita
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* HEADER */}
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h2 className="mt-3 text-4xl font-bold text-primary">
              Berita & Informasi
            </h2>

            <p className="mt-4 max-w-2xl text-gray-600">
              Informasi terbaru mengenai kegiatan, layanan, dan pembimbingan
              kemasyarakatan Bapas Kelas II Ciangir.
            </p>
          </div>

          {/* BUTTON */}
          <Link href="/berita" className="text-primary">
            Lihat Semua
            <ChevronRight className="ml-2 inline-block h-6 w-6" />
          </Link>
        </div>

        {/* GRID */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latestBerita.map((item) => (
            <Link
              key={item.id}
              href={`/berita/${item.id}`}
              className="group overflow-hidden rounded-md bg-white shadow-sm transition "
            >
              {/* IMAGE */}
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6">
                {/* CATEGORY */}
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {item.category}
                </span>

                {/* TITLE */}
                <h3 className="mt-4 line-clamp-2 text-lg font-bold leading-snug text-primary transition group-hover:text-tertiary">
                  {item.title}
                </h3>

                {/* EXCERPT */}
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600">
                  {item.excerpt}
                </p>

                {/* FOOTER */}
                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm text-gray-500">{item.author}</span>

                  <span className="text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString("id-ID")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
