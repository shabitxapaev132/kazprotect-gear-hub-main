import heroImage from "@/assets/hero-firefighter.jpg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";

const stats = [
  { value: "12+", label: "лет на рынке" },
  { value: "ISO", label: "9001:2015" },
  { value: "120", label: "кал/см² защита" },
  { value: "9", label: "отраслей" },
];

export const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-brand-navy-deep pt-24">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt="Производство спецодежды KAZPROTECT"
          width={1920}
          height={1080}
          className="h-full w-full object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      </div>

      <div className="container mx-auto px-4 pb-24 pt-16 md:pb-32 md:pt-24">
        <div className="max-w-4xl animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5" />
            Полный цикл производства · Карагандинская обл.
          </div>

          <h1 className="mb-6 font-extrabold leading-[1.05] text-primary-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Инженерная защита
            <br />
            <span className="text-gradient-gold">мирового уровня</span>
          </h1>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold/90">
            Профессионалу всегда важно быть в форме
          </p>
          <p className="mb-10 max-w-2xl text-base text-primary-foreground/80 md:text-lg">
            ТОО «KAZPROTECT» — казахстанский производитель профессиональной
            спецодежды и СИЗ полного цикла. Используем материалы IBENA, Carrington,
            Concordia, Westex. Сертификация ГОСТ K, ISO 9001 и европейские нормы EN.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-gold text-brand-navy-deep shadow-gold transition-spring hover:scale-[1.02] hover:opacity-95"
            >
              <Link to="/catalog">
                Смотреть каталог <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/10 hover:text-brand-gold"
            >
              <Link to="/contacts">Запросить КП</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-md md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-brand-navy-deep/60 p-6 text-center">
              <div className="text-3xl font-extrabold text-brand-gold md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-primary-foreground/70">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
