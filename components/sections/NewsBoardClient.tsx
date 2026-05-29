"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";
import { motion } from "framer-motion";
import type { NewsItem } from "./NoticesSection";

const API_BASE =
  process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8000";

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

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function truncate(text: string, max = 120): string {
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

// ─── Hero Card (Magazine Cover) ──────────────────────────────────────────────

function HeroCard({
  item,
  lang,
  onLike,
}: {
  item: NewsItem;
  lang: string;
  onLike: (id: string) => void;
}) {
  const [liked, setLiked] = useState(false);

  function handleLike() {
    if (liked) return;
    setLiked(true);
    onLike(item.id);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] group cursor-pointer"
    >
      {/* Stretched link — makes whole card clickable */}
      <TransitionLink
        href={`/${lang}/news/${item.slug}`}
        className="absolute inset-0 z-0"
        aria-label={item.title}
      />
      {item.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.imageUrl}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Pinned ribbon */}
      {item.pinned && (
        <div className="absolute top-5 left-5">
          <span className="text-[10px] font-bold uppercase  bg-amber-400 text-zinc-900 px-3 py-1 rounded-full">
            Featured
          </span>
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {item.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className={`text-[10px] font-bold uppercase  px-2.5 py-1 rounded-full border ${tagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight mb-2 md:mb-3 max-w-3xl">
          {item.title}
        </h2>
        <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl line-clamp-2 mb-4">
          {item.body}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <p className="text-white/50 text-xs">{timeAgo(item.createdAt)}</p>

          <div className="flex items-center gap-3 relative z-10">
            <button
              onClick={(e) => { e.preventDefault(); handleLike(); }}
              aria-label="Like"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold backdrop-blur transition-all ${
                liked
                  ? "bg-rose-500/80 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>{item.likes + (liked ? 1 : 0)}</span>
            </button>

            <span
              className="flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-semibold bg-white text-zinc-900 hover:bg-white/90 transition-colors"
            >
              Read article
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Article Card (Grid) ─────────────────────────────────────────────────────

function ArticleCard({
  item,
  lang,
  index,
  onLike,
}: {
  item: NewsItem;
  lang: string;
  index: number;
  onLike: (id: string) => void;
}) {
  const [liked, setLiked] = useState(false);

  function handleLike() {
    if (liked) return;
    setLiked(true);
    onLike(item.id);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col group hover:bg-white/8 transition-colors"
    >
      {/* Stretched link — makes whole card clickable */}
      <TransitionLink
        href={`/${lang}/news/${item.slug}`}
        className="absolute inset-0 z-0"
        aria-label={item.title}
      />
      {/* Thumbnail */}
      {item.imageUrl ? (
        <div className="aspect-[16/9] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-gradient-to-br from-zinc-700/60 to-zinc-800/60 flex items-center justify-center">
          <svg className="w-8 h-8 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className={`text-[9px] font-bold uppercase  px-2 py-0.5 rounded-full border ${tagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-white font-semibold text-base leading-snug mb-2 line-clamp-2 group-hover:text-crimson transition-colors">
          {item.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed line-clamp-3 flex-1">
          {truncate(item.body)}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <p className="text-white/35 text-[10px]">{timeAgo(item.createdAt)}</p>

          <button
            onClick={(e) => { e.preventDefault(); handleLike(); }}
            aria-label="Like"
            className={`relative z-10 flex items-center gap-1 text-[11px] font-semibold transition-colors ${
              liked ? "text-rose-400" : "text-white/40 hover:text-rose-400"
            }`}
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill={liked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>{item.likes + (liked ? 1 : 0)}</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export default function NewsBoardClient({ items: initial }: { items: NewsItem[] }) {
  const [items, setItems] = useState(initial);
  const pathname = usePathname();
  const lang = pathname.split("/")[1] ?? "en";

  const handleLike = useCallback(async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/news/${id}/like`, {
        method: "POST",
      });
      if (res.ok) {
        const updated = await res.json();
        setItems((prev) => prev.map((n) => (n.id === id ? updated : n)));
      }
    } catch {
      // silent — optimistic UI handles count
    }
  }, []);

  const pinned = items.filter((n) => n.pinned);
  const regular = items.filter((n) => !n.pinned);
  const ordered = [...pinned, ...regular];

  const [hero, ...rest] = ordered;

  return (
    <section className="relative z-10 bg-charcoal rounded-t-[2.5rem] pt-20 pb-24 px-6 md:px-12 lg:px-20 shadow-[0_-16px_60px_rgba(0,0,0,0.6)]">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-crimson text-xs font-bold uppercase  mb-2">
            Latest from Shurer Dhara
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
            Featured News &amp; Events
          </h2>
        </motion.div>

        {/* Hero article */}
        {hero && (
          <div className="mb-8">
            <HeroCard item={hero} lang={lang} onLike={handleLike} />
          </div>
        )}

        {/* Article grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((item, i) => (
              <ArticleCard key={item.id} item={item} lang={lang} index={i} onLike={handleLike} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
