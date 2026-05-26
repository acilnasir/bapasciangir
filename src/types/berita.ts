export interface Tag {
  tag: {
    id: string;
    name: string;
  };
}

export interface Berita {
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
