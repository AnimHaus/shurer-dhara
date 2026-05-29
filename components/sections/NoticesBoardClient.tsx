"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Notice {
  id: string;
  title: string;
  body: string;
  author: string;
  imageUrl?: string | null;
  likes: number;
  tags: string[];
  pinned: boolean;
  createdAt: string;
}

const API_BASE =
  process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8000";

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

function initials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const TAG_COLORS: Record<string, string> = {
  event: "bg-indigo-500/15 text-indigo-300",
  announcement: "bg-emerald-500/15 text-emerald-300",
  update: "bg-sky-500/15 text-sky-300",
  urgent: "bg-rose-500/15 text-rose-300",
  music: "bg-purple-500/15 text-purple-300",
};

function tagColor(tag: string): string {
  return TAG_COLORS[tag.toLowerCase()] ?? "bg-white/10 text-white/50";
}

function FeedPost({
  notice,
  onLike,
}: {
  notice: Notice;
  onLike: (id: string) => void;
}) {
  const [liked, setLiked] = useState(false);

  function handleLike() {
    if (liked) return;
    setLiked(true);
    onLike(notice.id);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-white/5 border rounded-2xl overflow-hidden transition-colors ${
        notice.pinned
          ? "border-crimson/30"
          : "border-white/10 hover:border-white/20"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-5">
        <div className="w-10 h-10 rounded-full bg-crimson/20 flex items-center justify-center shrink-0">
          <span className="text-crimson text-xs font-bold">
            {initials(notice.author)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold leading-tight">
            {notice.author}
          </p>
          <p className="text-white/35 text-xs">{timeAgo(notice.createdAt)}</p>
        </div>
        {notice.pinned && (
          <span className="text-[10px] font-semibold uppercase  text-crimson bg-crimson/10 px-2.5 py-1 rounded-full shrink-0">
            📌 Pinned
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-5 pt-4 pb-3">
        <h3 className="text-white font-semibold text-base leading-snug mb-2">
          {notice.title}
        </h3>
        <p className="text-white/55 text-sm leading-relaxed whitespace-pre-wrap">
          {notice.body}
        </p>
      </div>

      {/* Image */}
      {notice.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={notice.imageUrl}
          alt={notice.title}
          className="w-full max-h-72 object-cover mt-1"
        />
      )}

      {/* Tags */}
      {notice.tags && notice.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-5 pt-3">
          {notice.tags.map((tag) => (
            <span
              key={tag}
              className={`text-[10px] font-semibold uppercase  px-2.5 py-1 rounded-full ${tagColor(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 px-4 py-3 border-t border-white/[0.08] mt-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
            liked
              ? "bg-crimson/15 text-crimson"
              : "text-white/40 hover:text-crimson hover:bg-crimson/10"
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
          <span>{notice.likes + (liked ? 1 : 0)}</span>
        </button>
      </div>
    </motion.article>
  );
}

export default function NoticesBoardClient({
  notices: initial,
}: {
  notices: Notice[];
}) {
  const [notices, setNotices] = useState(initial);

  const handleLike = useCallback(async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/notices/${id}/like`, {
        method: "POST",
      });
      if (res.ok) {
        const updated = await res.json();
        setNotices((prev) => prev.map((n) => (n.id === id ? updated : n)));
      }
    } catch {
      // silent — optimistic UI handles count
    }
  }, []);

  const pinned = notices.filter((n) => n.pinned);
  const regular = notices.filter((n) => !n.pinned);
  const ordered = [...pinned, ...regular];

  return (
    <section className="bg-charcoal py-24 px-8 md:px-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between border-b border-white/10 pb-8 mb-10">
          <div>
            <p className="text-xs uppercase  text-crimson font-medium mb-2">
              Community
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
              Announcements
            </h2>
          </div>
          <span className="text-white/20 text-xs">
            {notices.length} post{notices.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Feed */}
        <div className="space-y-4">
          {ordered.map((notice) => (
            <FeedPost key={notice.id} notice={notice} onLike={handleLike} />
          ))}
        </div>
      </div>
    </section>
  );
}
