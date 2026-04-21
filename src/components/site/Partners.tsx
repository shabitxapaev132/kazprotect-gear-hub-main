const partners = [
  { name: "IBENA", country: "Германия", text: "Высокотехнологичные ткани от электродуги." },
  { name: "Carrington", country: "Великобритания", text: "Огнестойкие ткани Proban®." },
  { name: "Concordia Textiles", country: "Бельгия", text: "Многофункциональные мембранные ткани." },
  { name: "Westex", country: "США", text: "Премиум защитный текстиль." },
  { name: "Dale", country: "Норвегия", text: "Инновационные защитные ткани." },
  { name: "Fritsche", country: "Германия", text: "Пара-арамидные материалы." },
  { name: "3M & Coats", country: "Глобально", text: "Светоотражающие ленты, нити Kevlar/Nomex." },
  { name: "Elvex", country: "США", text: "Защита лица и глаз от электродуги." },
];

const certifications = ["ISO 9001:2015", "ГОСТ K", "ДС РК", "EN стандарты", "AITEX"];

export const Partners = () => {
  return (
    <section id="partners" className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-3 inline-block rounded-full bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold">
            Партнёры
          </div>
          <h2 className="mb-5 text-3xl font-extrabold text-brand-navy md:text-5xl">
            Глобальная сеть <span className="text-gradient-gold">поставщиков</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Сотрудничаем с мировыми лидерами текстильной индустрии. Перенимаем
            опыт на выставках A+A Düsseldorf и Secure&Safety Frankfurt.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {partners.map((p) => (
            <div
              key={p.name}
              className="group rounded-xl border border-border bg-card p-5 transition-spring hover:-translate-y-1 hover:border-brand-gold hover:shadow-card"
            >
              <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                {p.country}
              </div>
              <div className="mb-2 text-base font-extrabold text-brand-navy md:text-lg">
                {p.name}
              </div>
              <div className="text-xs leading-relaxed text-muted-foreground">{p.text}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-brand-gold/20 bg-gradient-navy p-8 text-center text-primary-foreground md:p-10">
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-gold">
            Сертификация
          </div>
          <h3 className="mb-6 text-2xl font-extrabold md:text-3xl">
            Подтверждённое качество и соответствие
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {certifications.map((c) => (
              <div
                key={c}
                className="rounded-full border border-brand-gold/40 bg-brand-gold/10 px-5 py-2 text-sm font-bold text-brand-gold"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
