import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Award, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { categories, products, type Category } from "@/data/catalog";

const CatalogPage = () => {
  const [active, setActive] = useState<Category | "all">("all");

  const filtered = useMemo(
    () => (active === "all" ? products : products.filter((p) => p.category === active)),
    [active],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-hero py-16 text-primary-foreground md:py-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="container relative mx-auto px-4 text-center">
            <div className="mb-3 inline-block rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold">
              Каталог продукции
            </div>
            <h1 className="mb-5 text-4xl font-extrabold md:text-5xl">
              Сертифицированная <span className="text-gradient-gold">спецодежда и СИЗ</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-primary-foreground/80">
              9 категорий продукции под ключевые отрасли. Готовые решения и
              индивидуальная разработка под ТЗ заказчика.
            </p>
          </div>
        </section>

        {/* Filters + grid */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-10 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setActive("all")}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition-smooth ${
                  active === "all"
                    ? "bg-gradient-gold text-brand-navy-deep shadow-gold"
                    : "border border-brand-navy/15 bg-card text-brand-navy hover:border-brand-gold hover:text-brand-gold"
                }`}
              >
                Все категории
              </button>
              {categories.map((cat) => {
                const isActive = cat.id === active;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActive(cat.id)}
                    className={`rounded-full px-5 py-2.5 text-sm font-bold transition-smooth ${
                      isActive
                        ? "bg-gradient-gold text-brand-navy-deep shadow-gold"
                        : "border border-brand-navy/15 bg-card text-brand-navy hover:border-brand-gold hover:text-brand-gold"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div key={active} className="grid animate-fade-up grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <Card
                  key={p.id}
                  className="group flex flex-col overflow-hidden border-border bg-gradient-card transition-spring hover:-translate-y-1 hover:shadow-hover"
                >
                  <div className="h-1 bg-gradient-gold" />
                  <CardContent className="flex flex-1 flex-col p-7">
                    {p.badge && (
                      <Badge className="mb-3 w-fit border border-brand-gold/30 bg-brand-gold/10 font-semibold text-brand-gold hover:bg-brand-gold/15">
                        {p.badge}
                      </Badge>
                    )}
                    <h3 className="mb-3 text-xl font-bold leading-tight text-brand-navy">
                      {p.title}
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                    {p.gost && (
                      <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-border bg-muted/60 p-3">
                        <Award className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                            Сертификат
                          </div>
                          <div className="text-xs font-medium text-foreground">{p.gost}</div>
                        </div>
                      </div>
                    )}
                    <Button
                      asChild
                      className="mt-auto w-full bg-brand-navy text-primary-foreground transition-smooth hover:bg-brand-navy-deep group-hover:bg-gradient-gold group-hover:text-brand-navy-deep"
                    >
                      <Link to={`/product/${p.id}`}>
                        Подробнее <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default CatalogPage;
