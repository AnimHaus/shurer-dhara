import NewsBoardClient from "./NewsBoardClient";

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  body: string;
  imageUrl?: string | null;
  likes: number;
  tags: string[];
  active: boolean;
  pinned: boolean;
  createdAt: string;
}

async function getNews(): Promise<NewsItem[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ??
      (process.env.NODE_ENV === "production"
        ? "https://api.shurerdhara.net"
        : "http://localhost:8000");
    const res = await fetch(`${baseUrl}/api/news?active=true`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function NewsSection() {
  const items = await getNews();
  if (!items.length) return null;
  return <NewsBoardClient items={items} />;
}
