"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_API_URL ?? "http://localhost:8000";
const PAGE_SIZE = 20;

type GalleryDict = Dictionary["pages"]["gallery"];

interface GalleryImage {
  id: string;
  title: string;
  caption?: string | null;
  category: string;
  url: string;
  active: boolean;
  order: number;
}

interface GalleryFolder {
  id: string;
  slug: string;
  label: string;
  order: number;
}

interface Props {
  p: GalleryDict;
}

const ALL_SLUG = "all";

export default function GalleryGrid({ p }: Props) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [folders, setFolders] = useState<GalleryFolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>(ALL_SLUG);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/gallery?active=true`).then((r) => r.json()),
      fetch(`${API_BASE}/api/gallery-folders`).then((r) => r.json()),
    ])
      .then(([imgs, flds]: [unknown, unknown]) => {
        setImages(Array.isArray(imgs) ? (imgs as GalleryImage[]) : []);
        setFolders(Array.isArray(flds) ? (flds as GalleryFolder[]) : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeCategory]);

  const filtered = activeCategory === ALL_SLUG
    ? images
    : images.filter((img) => img.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // IntersectionObserver to load more on scroll
  const loadMore = useCallback(() => {
    setVisibleCount((n) => Math.min(n + PAGE_SIZE, filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Build filter pills from live folders + "all"
  const filterPills = [
    { slug: ALL_SLUG, label: p.categories.all },
    ...folders.map((f) => ({ slug: f.slug, label: f.label })),
  ];

  return (
    <section className="pb-32 px-8 md:px-16 lg:px-24">
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-3 py-10">
        {filterPills.map((pill) => (
          <button
            key={pill.slug}
            onClick={() => setActiveCategory(pill.slug)}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-all duration-300 ${
              activeCategory === pill.slug
                ? "bg-crimson text-white"
                : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="mb-4 break-inside-avoid animate-pulse bg-white/10 rounded-sm"
              style={{ height: `${180 + (i % 3) * 80}px` }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-white/40 text-center py-24 text-lg">{p.emptyState}</p>
      ) : (
        <motion.div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4" layout>
          <AnimatePresence>
            {visible.map((img, i) => (
              <motion.button
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setLightbox(img)}
                className="mb-4 break-inside-avoid group relative block w-full overflow-hidden rounded-sm cursor-zoom-in"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-all duration-400 flex items-end p-4">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-left">
                    <p className="text-white text-sm font-semibold leading-snug">{img.title}</p>
                    {img.caption && (
                      <p className="text-white/60 text-xs mt-1 line-clamp-2">{img.caption}</p>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="h-1" />
      {hasMore && (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-crimson animate-spin" />
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
            style={{ background: "rgba(10,9,8,0.92)", backdropFilter: "blur(8px)" }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-5xl max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-10 right-0 text-white/60 hover:text-white text-3xl leading-none transition-colors"
                aria-label="Close"
              >
                ×
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox.url}
                alt={lightbox.title}
                className="max-h-[75vh] max-w-full object-contain rounded-sm"
              />
              {(lightbox.title || lightbox.caption) && (
                <div className="mt-4 text-center">
                  <p className="text-white font-semibold">{lightbox.title}</p>
                  {lightbox.caption && (
                    <p className="text-white/55 text-sm mt-1">{lightbox.caption}</p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
