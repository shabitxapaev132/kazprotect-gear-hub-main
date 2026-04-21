import productionImage from "@/assets/production-cad.jpg";
import fabricImage from "@/assets/fabric-texture.jpg";
import { CheckCircle2 } from "lucide-react";

const cycle = [
  { step: "01", title: "R&D и концепт", text: "Анализ требований, выбор тканей, прототипирование." },
  { step: "02", title: "САПР проектирование", text: "Точные лекала и документация по ГОСТ и ТУ." },
  { step: "03", title: "Plotter раскрой", text: "Автоматическая высокоточная резка ткани." },
  { step: "04", title: "Пошив на MAYER, SIRUBA, JACR", text: "Премиум индустриальное оборудование." },
  { step: "05", title: "Многоступенчатый ОТК", text: "Входной, операционный и финальный контроль." },
  { step: "06", title: "Логистика и доставка", text: "Готовая продукция по всему Казахстану и СНГ." },
];

const equipment = ["MAYER", "SIRUBA", "JACR", "TYPICAL"];

export const Production = () => {
  return (
    <section id="production" className="relative overflow-hidden bg-gradient-navy py-20 text-primary-foreground md:py-28">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="container relative mx-auto px-4">
        <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-3 inline-block rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold">
              Производство
            </div>
            <h2 className="mb-6 text-3xl font-extrabold md:text-5xl">
              Высокие технологии <br />
              <span className="text-gradient-gold">и контроль качества</span>
            </h2>
            <p className="mb-8 text-primary-foreground/80">
              Полный замкнутый цикл производства на премиум индустриальном
              оборудовании. Каждый этап контролируется системой ОТК.
            </p>

            <div className="mb-8 grid grid-cols-2 gap-3">
              {equipment.map((e) => (
                <div
                  key={e}
                  className="flex items-center gap-2 rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-3 text-sm font-bold backdrop-blur-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-brand-gold" />
                  {e}
                </div>
              ))}
            </div>

            <p className="text-sm text-primary-foreground/70">
              <strong className="text-brand-gold">Plotter Technology</strong> —
              автоматизированный высокоточный раскрой. <strong className="text-brand-gold">САПР</strong> —
              соответствие ГОСТ и ТУ. Срок службы тканей в 2–3 раза выше аналогов.
            </p>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-elegant ring-1 ring-brand-gold/20">
              <img
                src={productionImage}
                alt="Plotter Technology — автоматический раскрой ткани"
                width={1280}
                height={896}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden w-48 overflow-hidden rounded-xl shadow-gold ring-1 ring-brand-gold/40 md:block">
              <img
                src={fabricImage}
                alt="Текстура высокотехнологичной ткани"
                width={400}
                height={400}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Production cycle */}
        <div className="mt-20">
          <h3 className="mb-10 text-center text-2xl font-bold md:text-3xl">
            Цикл производства полного замкнутого типа
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cycle.map((c) => (
              <div
                key={c.step}
                className="group rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 backdrop-blur-sm transition-smooth hover:border-brand-gold/40 hover:bg-primary-foreground/10"
              >
                <div className="mb-3 font-extrabold text-3xl text-gradient-gold">
                  {c.step}
                </div>
                <div className="mb-1 font-bold text-primary-foreground">{c.title}</div>
                <div className="text-sm text-primary-foreground/70">{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
