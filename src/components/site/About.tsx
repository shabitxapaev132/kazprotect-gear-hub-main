import { Award, Clock, Cog, Globe2, Sparkles, Wrench } from "lucide-react";

const items = [
  {
    icon: Cog,
    title: "Полный цикл производства",
    text: "От концепции и R&D до раскроя, пошива и логистики — всё под одной крышей. Никаких посредников.",
  },
  {
    icon: Globe2,
    title: "Международные партнёры",
    text: "Ткани IBENA, Carrington, Concordia, Westex, Dale. Компоненты 3M, Coats, Elvex. Тестирование в AITEX.",
  },
  {
    icon: Wrench,
    title: "Индивидуальная разработка",
    text: "Конструкторский отдел создаёт модели с нуля под параметры конкретного проекта и условия эксплуатации.",
  },
  {
    icon: Sparkles,
    title: "Срок службы выше в 2–3 раза",
    text: "Используем ткани нового поколения. Стабильность размеров (усадка <1%), кубовые красители 50+ оттенков.",
  },
  {
    icon: Award,
    title: "Сертификация",
    text: "ГОСТ K Республики Казахстан, ДС РК, ISO 9001. Соответствие европейским нормам EN.",
  },
  {
    icon: Clock,
    title: "Скорость и гибкость",
    text: "Минимизация согласований и быстрое принятие решений — ключевое преимущество перед крупными корпорациями.",
  },
];

export const About = () => {
  return (
    <section id="about" className="relative bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-3 inline-block rounded-full bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold">
            О компании
          </div>
          <h2 className="mb-5 text-3xl font-extrabold text-brand-navy md:text-5xl">
            Инженерная точность <br className="hidden md:inline" />
            <span className="text-gradient-gold">в каждой детали</span>
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Миссия ТОО «KAZPROTECT» — оперативное и качественное обеспечение
            клиентов специализированной одеждой и снаряжением. Постоянное
            улучшение через стандарт ISO 9001 и динамичное развитие на мировом
            рынке.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-7 shadow-card transition-spring hover:-translate-y-1 hover:shadow-hover"
            >
              <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-gold transition-spring group-hover:scale-x-100" />
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-navy text-brand-gold transition-spring group-hover:bg-gradient-gold group-hover:text-brand-navy-deep">
                <it.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-brand-navy">{it.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
