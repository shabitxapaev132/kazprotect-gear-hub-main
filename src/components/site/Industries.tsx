import { Flame, Pickaxe, Droplets, Zap, HardHat, Factory } from "lucide-react";

const industries = [
  {
    icon: Zap,
    title: "Энергетика",
    desc: "Защита от электродуги до 120 кал/см². Костюмы IBENA Arc, Nomex Comfort.",
    spec: "до 120 cal/cm²",
  },
  {
    icon: Droplets,
    title: "Нефть и газ",
    desc: "Маслоотталкивающая, антистатическая одежда. Ткани Carrington, RIGCHIEF.",
    spec: "ГОСТ 12.4.111-82",
  },
  {
    icon: Flame,
    title: "Спасательные службы",
    desc: "Боевая одежда пожарного Euro-1, Euro-2 и теплоотражающие комплекты ТОК-600.",
    spec: "до +600°C",
  },
  {
    icon: Pickaxe,
    title: "Горнодобывающая",
    desc: "Усиленные антистатические костюмы для шахт и взрывоопасных сред.",
    spec: "EN 1149-5",
  },
  {
    icon: Factory,
    title: "Металлургия",
    desc: "Теплоотражающая защита и устойчивость к брызгам расплавленного металла.",
    spec: "LOI 45-50%",
  },
  {
    icon: HardHat,
    title: "Строительство и ИТР",
    desc: "Базовые комплекты СИЗ, светоотражающая и сезонная спецодежда.",
    spec: "ГОСТ 27575-87",
  },
];

export const Industries = () => {
  return (
    <section id="industries" className="bg-muted/40 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-3 inline-block rounded-full bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold">
            Отрасли
          </div>
          <h2 className="mb-5 text-3xl font-extrabold text-brand-navy md:text-5xl">
            Решения для <span className="text-gradient-gold">ключевых отраслей</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            12 лет опыта. Сертифицированные решения для самых требовательных
            промышленных секторов Казахстана и СНГ.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <div
              key={i.title}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-7 shadow-card transition-spring hover:-translate-y-1 hover:shadow-hover"
            >
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-gradient-gold opacity-0 blur-3xl transition-spring group-hover:opacity-30" />
              <div className="relative">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-navy text-brand-gold">
                  <i.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-brand-navy">{i.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{i.desc}</p>
                <div className="inline-block rounded-md border border-brand-gold/30 bg-brand-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-gold">
                  {i.spec}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
