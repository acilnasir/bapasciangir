"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/image/kantor.jpg",
    type: "content",
  },
  {
    image: "/image/foto 2.png",
    type: "content",
  },
  {
    image: "/image/unnamed.png",
    type: "content",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-137.5 overflow-hidden bg-[#011a45] md:h-162.5">
      {/* SLIDES */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative min-w-full shrink-0">
            {/* IMAGE */}
            <Image
              src={slide.image}
              alt={`Slide ${index + 1}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />

            {/* CONTENT */}
            {slide.type === "content" && (
              <>
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-[#011a45]/90 via-[#011a45]/60 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="mx-auto w-full max-w-7xl px-4 md:px-10">
                    <div className="max-w-2xl text-white">
                      <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
                        Selamat Datang di Bapas Kelas II Ciangir
                      </h1>

                      <p className="mb-8 text-lg leading-8 text-blue-100">
                        Melayani dengan integritas dan profesionalisme untuk
                        pembimbingan kemasyarakatan yang unggul di wilayah
                        Banyumas dan sekitarnya.
                      </p>

                      <div className="flex flex-wrap gap-4">
                        <a
                          href="#layanan"
                          className="rounded-lg bg-[#735c00] px-8 py-3 font-semibold text-white transition hover:bg-[#8a7000]"
                        >
                          Pelajari Layanan →
                        </a>

                        <a
                          href="#kontak"
                          className="rounded-lg border border-white/30 bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
                        >
                          Hubungi Kami
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* PREVIOUS */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Slide sebelumnya"
        className="absolute left-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-2xl text-white backdrop-blur transition hover:bg-black/50"
      >
        ‹
      </button>

      {/* NEXT */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Slide berikutnya"
        className="absolute right-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-2xl text-white backdrop-blur transition hover:bg-black/50"
      >
        ›
      </button>

      {/* DOTS */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={`Pindah ke slide ${index + 1}`}
            className={`h-3 w-3 rounded-full transition ${
              index === currentSlide
                ? "bg-[#f1b82d]"
                : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
