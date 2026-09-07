import Link from "next/link";
import Image from "next/image";
import { Baby, User } from "lucide-react";

export default function CTASection() {
  return (
    <section id="cta" className="py-16">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-12 rounded-2xl bg-neutral p-10 shadow-sm md:grid-cols-2">
          {/* Content */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-primary">
                Cek Status Litmas
              </h2>

              <p className="text-gray-600">
                Pantau status penelitian kemasyarakatan Anda secara real-time.
                Masukkan data Anda untuk melihat progres terbaru.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/litmas-anak"
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 text-lg font-bold text-white transition hover:opacity-90"
              >
                <Baby size={22} />
                Litmas Anak
              </Link>

              <Link
                href="/litmas"
                className="flex items-center justify-center gap-2 rounded-lg bg-tertiary px-6 py-4 text-lg font-bold text-white transition hover:bg-tertiary/60 hover:opacity-90"
              >
                <User size={22} />
                Litmas Dewasa
              </Link>
            </div>
          </div>

          {/* Illustration */}
          <div className="flex justify-center">
            <Image
              src="/image/screen.png"
              alt="Litmas Status Check"
              width={500}
              height={400}
              className="h-auto w-full max-w-125 drop-shadow-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
