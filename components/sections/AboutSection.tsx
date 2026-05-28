import type { Dictionary } from "@/app/[lang]/dictionaries";

export default function AboutSection({ about }: { about: Dictionary["about"] }) {
  return (
    <section id="about" className="relative z-10 py-32 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="text-xs uppercase  text-crimson font-medium">
            {about.title}
          </p>
          <p className="text-charcoal/70 text-lg leading-relaxed">{about.body}</p>
        </div>
        <div className="glass-card-deep rounded-3xl p-8 space-y-4">
          <h3 className="font-display text-2xl font-semibold text-charcoal">
            {about.mission}
          </h3>
          <p className="text-charcoal/60 leading-relaxed">{about.missionBody}</p>
          <div className="pt-4 flex gap-3">
            <div className="w-2 h-2 rounded-full bg-crimson mt-2" />
            <div className="w-2 h-2 rounded-full bg-apricot mt-2" />
            <div className="w-2 h-2 rounded-full bg-blush mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
