import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { CalendarDays, User } from "lucide-react";
import ShareButtons from "@/app/components/atoms/ShareButtons";
import remarkGfm from "remark-gfm";

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
  createdAt: string;
  tags: Tag[];
}

interface Props {
  params: Promise<{
    id: string;
  }>;
}

/* =====================================
   DYNAMIC METADATA
===================================== */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/berita/${id}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return {
        title: "Berita | Bapas Purwokerto",
      };
    }

    const result = await res.json();
    const berita: Berita = result.data;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    return {
      title: berita.title,
      description: berita.excerpt,

      keywords: [
        berita.title,
        berita.category,
        "Berita Bapas Purwokerto",
        "Bapas Purwokerto",
        "Pemasyarakatan",
      ],

      alternates: {
        canonical: `${siteUrl}/berita/${id}`,
      },

      openGraph: {
        title: berita.title,
        description: berita.excerpt,
        url: `${siteUrl}/berita/${id}`,
        siteName: "Bapas Purwokerto",
        locale: "id_ID",
        type: "article",

        publishedTime: berita.createdAt,

        authors: [berita.author],

        images: [
          {
            url: berita.thumbnail,
            width: 1200,
            height: 630,
            alt: berita.title,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: berita.title,
        description: berita.excerpt,
        images: [berita.thumbnail],
      },

      robots: {
        index: true,
        follow: true,
      },
    };
  } catch {
    return {
      title: "Berita | Bapas Purwokerto",
    };
  }
}

/* =====================================
   PAGE
===================================== */
export default async function DetailBeritaPage({ params }: Props) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/berita/${id}`,
    {
      cache: "no-store",
    },
  );

  const result = await res.json();

  const berita: Berita = result.data;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // URL ARTIKEL
  const articleUrl = `${siteUrl}/berita/${id}`;

  // SHARE TEXT
  const shareText = encodeURIComponent(berita.title);

  // SHARE URL
  const whatsappUrl = `https://wa.me/?text=${shareText}%20${articleUrl}`;

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`;

  // BERITA POPULER
  const popularRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/berita`,
    {
      cache: "no-store",
    },
  );

  const popularResult = await popularRes.json();

  const popularNews: Berita[] = popularResult.data
    .filter((item: Berita) => item.id !== id)
    .slice(0, 3);

  return (
    <section className="bg-neutral py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* BREADCRUMB */}
        <div className="mb-5 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/">Beranda</Link>
          <span>/</span>

          <Link href="/berita">Berita</Link>

          <span>/</span>

          <span>Detail Berita</span>
        </div>

        {/* CATEGORY */}
        <span className="rounded-full bg-tertiary px-4 py-1.5 text-xs font-semibold text-primary">
          {berita.category}
        </span>

        {/* TITLE */}
        <h1 className="mt-6 max-w-4xl text-xl font-bold leading-tight text-primary md:text-4xl">
          {berita.title}
        </h1>

        {/* META */}
        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} />

            <span>
              {new Date(berita.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <User size={16} />

            <span>{berita.author}</span>
          </div>
        </div>

        {/* IMAGE */}
        <div className="relative mt-10 h-125 w-full overflow-hidden rounded-3xl shadow-lg">
          <Image
            src={berita.thumbnail}
            alt={berita.title}
            fill
            priority
            unoptimized
            className="object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* ARTICLE */}
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            {/* EXCERPT */}
            <p className="text-lg leading-relaxed text-gray-700">
              {berita.excerpt}
            </p>

            {/* CONTENT */}
            <div className="mt-10 max-w-none text-gray-700 text-justify">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => (
                    <p className="mb-5 leading-8 text-[15px] md:text-base">
                      {children}
                    </p>
                  ),

                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold mt-8 mb-4 text-primary">
                      {children}
                    </h1>
                  ),

                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold mt-8 mb-4 text-primary">
                      {children}
                    </h2>
                  ),

                  ul: ({ children }) => (
                    <ul className="list-disc pl-6 mb-5 space-y-2">
                      {children}
                    </ul>
                  ),

                  li: ({ children }) => (
                    <li className="leading-7 text-gray-700">{children}</li>
                  ),

                  a: ({ children, href }) => (
                    <a
                      href={href}
                      className="text-blue-600 underline hover:text-blue-800"
                      target="_blank"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {berita.content}
              </ReactMarkdown>
            </div>

            {/* TAGS */}
            <div className="mt-10 flex flex-wrap gap-3 border-t border-gray-200 pt-6">
              {berita.tags.map((item) => (
                <span
                  key={item.tag.id}
                  className="rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700"
                >
                  #{item.tag.name}
                </span>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            {/* SHARE */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-primary">
                Bagikan Artikel
              </h3>

              <div className="mt-5 flex gap-3">
                <ShareButtons
                  articleUrl={articleUrl}
                  whatsappUrl={whatsappUrl}
                  facebookUrl={facebookUrl}
                />
              </div>
            </div>

            {/* BERITA POPULER */}
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-primary">
                Berita Terpopuler
              </h3>

              <div className="mt-6 space-y-5">
                {popularNews.map((item) => (
                  <Link
                    key={item.id}
                    href={`/berita/${item.id}`}
                    className="flex gap-4"
                  >
                    <div className="relative overflow-hidden w-20 rounded-md">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h4 className="line-clamp-2 text-sm font-semibold text-primary">
                        {item.title}
                      </h4>

                      <p className="mt-2 text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div
              className="
                rounded-3xl
                bg-primary
                p-8
                text-center
                text-white
              "
            >
              <h3 className="text-3xl font-bold">Punya Pertanyaan?</h3>

              <p className="mt-4 text-sm text-gray-200">
                Tim kami siap membantu memberikan informasi terkait layanan
                pembimbingan.
              </p>

              <Link
                href="https://wa.me/6285138212168"
                className="
    mt-6
    inline-block
    rounded-xl
    bg-tertiary
    px-6
    py-3
    font-semibold
    text-primary
    transition
    hover:scale-105
  "
              >
                Hubungi Layanan Pengaduan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
