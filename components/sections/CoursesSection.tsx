import type { Dictionary } from "@/app/[lang]/dictionaries";

export default function CoursesSection({
  courses,
}: {
  courses: Dictionary["courses"];
}) {
  const levels = ["beginner", "intermediate", "advanced"] as const;

  return (
    <section id="courses" className="relative z-10 py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase  text-crimson font-medium mb-3">
            {courses.subtitle}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
            {courses.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {levels.map((level, i) => (
            <div
              key={level}
              className="glass-card-deep rounded-3xl p-8 group hover:scale-105 transition-transform duration-500"
            >
              <div className="w-10 h-10 rounded-full bg-crimson/10 flex items-center justify-center mb-6 group-hover:bg-crimson/20 transition-colors">
                <span className="text-crimson font-bold">{i + 1}</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-charcoal mb-3">
                {courses[level].title}
              </h3>
              <p className="text-charcoal/60 leading-relaxed text-sm">
                {courses[level].desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
