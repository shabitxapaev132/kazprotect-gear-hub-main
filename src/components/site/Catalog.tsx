import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { categories, products, type Category } from "@/data/catalog";

export const Catalog = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("firefighter");

  const filtered = useMemo(
    () => products.filter((p) => p.category === activeCategory),
    [activeCategory],
  );

  return (
    <section id="catalog" className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-3 inline-block rounded-full bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold">
            Каталог
          </div>
          <h2 className="mb-5 text-3xl font-extrabold text-brand-navy md:text-5xl">
            Сертифицированная <span className="text-gradient-gold">продукция</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Готовые решения и индивидуальная разработка по требованиям заказчика.
          </p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
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

        <div key={activeCategory} className="grid animate-fade-up grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
  );
};
