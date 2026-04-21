import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Contact } from "@/components/site/Contact";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

const ContactsPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-hero py-16 text-primary-foreground md:py-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="container relative mx-auto px-4 text-center">
            <div className="mb-3 inline-block rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold">
              Контакты
            </div>
            <h1 className="mb-5 text-4xl font-extrabold md:text-5xl">
              Свяжитесь <span className="text-gradient-gold">с нашим заводом</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-primary-foreground/85">
              Отдел продаж и производство в Карагандинской области. Отвечаем
              в течение рабочего дня.
            </p>
          </div>
        </section>

        {/* Quick info cards */}
        <section className="py-12">
          <div className="container mx-auto grid grid-cols-1 gap-5 px-4 md:grid-cols-2 lg:grid-cols-4">
            <InfoCard
              icon={<Phone className="h-5 w-5" />}
              title="Телефон"
              value="+7 (701) 748-98-95"
              href="tel:+77017489895"
            />
            <InfoCard
              icon={<Mail className="h-5 w-5" />}
              title="Email"
              value="info@kazprotect.kz"
              href="mailto:info@kazprotect.kz"
            />
            <InfoCard
              icon={<MapPin className="h-5 w-5" />}
              title="Адрес"
              value="пос. Осакаровка, ул. А. Бокейханова, 67"
            />
            <InfoCard
              icon={<Clock className="h-5 w-5" />}
              title="Часы работы"
              value="Пн–Пт, 09:00 – 18:00"
            />
          </div>
        </section>

        {/* Map */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="overflow-hidden rounded-2xl border border-border shadow-elegant">
              <iframe
                title="Карта производства KAZPROTECT"
                src="https://www.google.com/maps?q=Осакаровка,%20Бокейханова%2067&output=embed"
                width="100%"
                height="420"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[420px] w-full border-0"
              />
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
};

const InfoCard = ({
  icon,
  title,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
}) => {
  const content = (
    <div className="group flex h-full items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-card transition-spring hover:-translate-y-1 hover:border-brand-gold hover:shadow-hover">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-navy text-brand-gold transition-spring group-hover:bg-gradient-gold group-hover:text-brand-navy-deep">
        {icon}
      </div>
      <div>
        <div className="mb-1 text-xs font-bold uppercase tracking-wider text-brand-gold">
          {title}
        </div>
        <div className="text-sm font-semibold text-brand-navy">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
};

export default ContactsPage;
