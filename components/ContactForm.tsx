"use client";

import type { Dictionary } from "@/app/[lang]/dictionaries";

export default function ContactForm({ form }: { form: Dictionary["contact"]["form"] }) {
  return (
    <form className="space-y-5">
      <input
        type="text"
        placeholder={form.name}
        className="w-full px-5 py-4 rounded-2xl bg-white/30 border border-white/40 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-crimson/30 transition-all"
      />
      <input
        type="email"
        placeholder={form.email}
        className="w-full px-5 py-4 rounded-2xl bg-white/30 border border-white/40 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-crimson/30 transition-all"
      />
      <textarea
        rows={5}
        placeholder={form.message}
        className="w-full px-5 py-4 rounded-2xl bg-white/30 border border-white/40 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-crimson/30 transition-all resize-none"
      />
      <button
        type="submit"
        className="w-full py-4 bg-crimson text-white font-semibold uppercase rounded-full hover:bg-crimson/90 transition-all duration-300 shadow-lg hover:shadow-crimson/30"
      >
        {form.send}
      </button>
    </form>
  );
}
