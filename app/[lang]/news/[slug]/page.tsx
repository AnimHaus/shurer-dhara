import { notFound } from "next/navigation";
import Link from "next/link";
import ViewTracker from "@/components/ViewTracker";

interface NewsItem {
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
  updatedAt: string;
}

const TAG_COLORS: Record<string, string> = {
  event: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  announcement: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  update: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  urgent: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  music: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};
function tagColor(tag: string) {
  return TAG_COLORS[tag.toLowerCase()] ?? "bg-white/10 text-white/60 border-white/20";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function getArticle(slug: string): Promise<NewsItem | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ??
      (process.env.NODE_ENV === "production"
        ? "https://api.shurerdhara.net"
        : "http://localhost:8000");
    const res = await fetch(`${baseUrl}/api/news/slug/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function NewsArticlePage({
  params,
}: PageProps<"/[lang]/news/[slug]">) {
  const { lang, slug } = await params;
  const article = await getArticle(slug);

  if (!article || !article.active) notFound();

  return (
    <div className="min-h-screen bg-charcoal text-white">
      <ViewTracker articleId={article.id} />
      {/* Hero image or gradient header */}
      <div className="relative w-full h-[50vh] min-h-64 overflow-hidden">
        {article.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-6 md:left-12">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M13 8H3M7 4L3 8l4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </Link>
        </div>
      </div>

      {/* Article content */}
      <div className="max-w-3xl mx-auto px-6 md:px-8 -mt-20 relative pb-24">
        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${tagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
          {article.title}
        </h1>

        <p className="text-white/40 text-sm mb-10 pb-10 border-b border-white/10">
          Published {formatDate(article.createdAt)}
          {article.updatedAt !== article.createdAt && (
            <> · Updated {formatDate(article.updatedAt)}</>
          )}
        </p>

        <div className="prose prose-invert prose-lg max-w-none text-white/80 leading-relaxed whitespace-pre-wrap">
          {article.body}
        </div>
      </div>
    </div>
  );
}
