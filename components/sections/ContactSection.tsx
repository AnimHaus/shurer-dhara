import type { Dictionary } from "@/app/[lang]/dictionaries";
import ContactForm from "@/components/ContactForm";

export default function ContactSection({
  contact,
}: {
  contact: Dictionary["contact"];
}) {
  return (
    <section id="contact" className="relative z-10 py-32 px-6 pb-40">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <p className="text-xs uppercase  text-crimson font-medium mb-3">
          {contact.subtitle}
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
          {contact.title}
        </h2>
      </div>

      <div className="max-w-2xl mx-auto glass-card-deep rounded-3xl p-10">
        <ContactForm form={contact.form} />
      </div>
    </section>
  );
}
