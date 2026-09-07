import Link from "next/link";
import React from "react";

export default function SurveySection() {
  return (
    <section className="bg-neutral py-20 flex justify-center">
      <div className="mx-auto max-w-7xl px-4 md:px-6 flex flex-col items-center text-center">
        <h2 className="mt-3 text-4xl font-bold text-primary">
          Berikan Penilaian Atas Pelayanan Kami
        </h2>

        <p className="mt-4 max-w-2xl text-gray-600">
          Umpan balik Anda sangat berarti bagi peningkatan kualitas pelayanan di
          Bapas Ciangir
        </p>

        <Link
          className="inline-block bg-primary px-8 py-4 rounded-lg text-white font-semibold hover:bg-primary/60 mt-10"
          href="https://star-survei3a.kemenimipas.go.id/ly/oBs4KCrb"
        >
          Isi Survei
        </Link>
      </div>
    </section>
  );
}
