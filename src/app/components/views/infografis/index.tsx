import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function InfografisSection() {
  return (
    <section className="border-y border-gray-200 bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          {/* Heading */}
          <div>
            <h2 className="text-3xl font-bold text-primary md:text-4xl">
              Infografis Operasional Harian
            </h2>

            <p className="mt-3 text-base leading-relaxed text-gray-600">
              Pantau data terkini operasional dan pelayanan Bapas Kelas II
              Purwokerto secara real-time.
            </p>
          </div>

          {/* Button */}
          <Link
            href="https://datastudio.google.com/reporting/94185a92-1f9a-4baf-9599-0776cfa58ce4/page/kSwyF"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              inline-flex
              items-center
              gap-3
              rounded-xl
              bg-primary
              px-10
              py-4
              font-semibold
              text-white
              shadow-md
              transition-all
              hover:opacity-90
            "
          >
            <span>Infografis Harian Bapas, Lihat di sini</span>

            <ExternalLink
              size={22}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
