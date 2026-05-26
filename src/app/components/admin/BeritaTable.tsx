import BeritaTableClient from "./BeritaTableClient";

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

async function getBerita() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/berita`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed fetch berita");
    }

    return res.json();
  } catch (error) {
    console.error(error);

    return {
      data: [],
    };
  }
}

export default async function BeritaTable() {
  const result = await getBerita();

  const berita: Berita[] = result?.data || [];

  return <BeritaTableClient initialData={berita} />;
}
