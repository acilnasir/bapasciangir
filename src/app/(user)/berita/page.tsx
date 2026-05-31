"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Search,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../../../../lib/api";

interface Tag {
  tag: {
    id: string;
    name: string;
  };
}

interface Berita {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  category: string;
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
}

async function getArticles() {
  try {
    const res = await fetch(`${API_URL}/api/berita`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch articles");
    }

    return res.json();
  } catch (error) {
    console.error(error);

    return {
      data: [],
    };
  }
}

export default function BeritaPage() {
  const [articles, setArticles] = useState<Berita[]>([]);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const [currentPage, setCurrentPage] = useState(1);

  const [showFilter, setShowFilter] = useState(false);

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      const result = await getArticles();

      setArticles(result?.data || []);
    };

    fetchData();
  }, []);

  // FILTER
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchSearch =
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        selectedCategory === "Semua"
          ? true
          : article.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [articles, search, selectedCategory]);

  // PAGINATION
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const featuredArticle = filteredArticles[0];

  const categories = [
    "Semua",
    "Pengumuman",
    "Sosial",
    "Sosialisai",
    "Event & Ceremonies",
    "Pengabdian kepada Masyarakat",
    "Inovasi",
    "Prestasi",
    "Kunjungan Kerja",
    "Pendidikan",
    "Kerja Sama",
  ];

  return (
    <section className="min-h-screen bg-neutral">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {/* HERO */}
        {featuredArticle && (
          <div className="relative overflow-hidden rounded-3xl shadow-lg">
            {/* IMAGE */}
            <div className="relative h-105 w-full">
              <Image
                src={featuredArticle.thumbnail}
                alt={featuredArticle.title}
                fill
                priority
                unoptimized
                className="object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-linear-to-r from-primary/90 via-primary/60 to-primary/20" />

              {/* CONTENT */}
              <div className="absolute bottom-0 left-0 z-10 max-w-3xl p-8 md:p-12">
                <span className="rounded-md bg-yellow-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                  KABAR TERKINI
                </span>

                <h1 className="mt-5 text-lg font-bold leading-tight text-white md:text-3xl">
                  {featuredArticle.title}
                </h1>

                <p className="mt-5 line-clamp-2 text-base leading-relaxed text-gray-200">
                  {featuredArticle.excerpt}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* FILTER */}
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center">
          {/* SEARCH */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Cari berita..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="
        w-full
        rounded-xl
        bg-white
        py-3
        pl-11
        pr-4
        outline-none
      "
            />
          </div>

          {/* FILTER BUTTON */}
          <div className="relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="
        flex
        items-center
        gap-2
        rounded-xl
      text-white
        px-5
        py-3
        bg-primary
        transition
        hover:bg-primary/40
      "
            >
              <SlidersHorizontal className="text-white" size={18} />
              Filter
            </button>

            {/* DROPDOWN */}
            {showFilter && (
              <div
                className="
          absolute
          right-0
          top-14
          z-50
          w-72
          rounded-2xl
          bg-white
          p-5
          shadow-xl
        "
              >
                <h3 className="mb-4 text-sm font-semibold text-primary">
                  Kategori Berita
                </h3>

                <div className="space-y-3">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex cursor-pointer items-center gap-3 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategory === category}
                        onChange={() => {
                          setSelectedCategory(category);
                          setCurrentPage(1);
                          setShowFilter(false);
                        }}
                      />

                      {category}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ARTICLES */}
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {paginatedArticles.map((article) => (
            <div
              key={article.id}
              className="
                overflow-hidden
                rounded-lg
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:shadow-md
              "
            >
              {/* IMAGE */}
              <div className="relative h-60 w-full">
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  fill
                  unoptimized
                  className="object-cover hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6">
                {/* META */}
                <div className="mb-4 flex items-center gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <CalendarDays size={14} />

                    <span>
                      {new Date(article.createdAt).toLocaleDateString("id-ID")}
                    </span>
                  </div>

                  <span>•</span>

                  <span>{article.category}</span>
                </div>

                {/* TITLE */}
                <h2 className="line-clamp-2 text-xl font-bold leading-snug text-primary">
                  {article.title}
                </h2>

                {/* EXCERPT */}
                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                  {article.excerpt}
                </p>

                {/* BUTTON */}
                <Link
                  href={`/berita/${article.id}`}
                  className="
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-primary
                    transition
                    hover:gap-3
                  "
                >
                  Selengkapnya
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY */}
        {paginatedArticles.length === 0 && (
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-primary">
              Berita tidak ditemukan
            </h2>

            <p className="mt-3 text-gray-500">Coba gunakan kata kunci lain</p>
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-3">
            {/* PREV */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-gray-300
                bg-white
                transition
                hover:border-primary
                hover:text-primary
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <ChevronLeft size={18} />
            </button>

            {/* PAGE NUMBER */}
            {(() => {
              const pages: (number | string)[] = [];

              if (totalPages <= 7) {
                // JIKA HALAMAN SEDIKIT
                for (let i = 1; i <= totalPages; i++) {
                  pages.push(i);
                }
              } else {
                // AWAL
                pages.push(1);

                // DOTS KIRI
                if (currentPage > 4) {
                  pages.push("...");
                }

                // TENGAH
                const start = Math.max(2, currentPage - 1);
                const end = Math.min(totalPages - 1, currentPage + 1);

                for (let i = start; i <= end; i++) {
                  pages.push(i);
                }

                // DOTS KANAN
                if (currentPage < totalPages - 3) {
                  pages.push("...");
                }

                // AKHIR
                pages.push(totalPages);
              }

              return pages.map((page, index) => {
                // DOTS
                if (page === "...") {
                  return (
                    <span
                      key={index}
                      className="flex h-11 w-11 items-center justify-center text-gray-500"
                    >
                      ...
                    </span>
                  );
                }

                // BUTTON
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page as number)}
                    className={`
          h-11
          w-11
          rounded-xl
          text-sm
          font-semibold
          transition
          ${
            currentPage === page
              ? "bg-primary text-white"
              : "border border-gray-300 bg-white hover:border-primary hover:text-primary"
          }
        `}
                  >
                    {page}
                  </button>
                );
              });
            })()}

            {/* NEXT */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-gray-300
                bg-white
                transition
                hover:border-primary
                hover:text-primary
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
