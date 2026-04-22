import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Industries } from "@/components/site/Industries";
import { QuizConsultant } from "@/components/site/QuizConsultant";
import { Button } from "@/components/ui/button";
import { categories, products } from "@/data/catalog";

const Index = () => {
  const featured = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Industries />
        <QuizConsultant />

        {/* Catalog teaser */}
        <section className="bg-background py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <div className="mb-3 inline-block rounded-full bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold">
                Каталог
              </div>
              <h2 className="mb-5 text-3xl font-extrabold text-brand-navy md:text-5xl">
                9 категорий <span className="text-gradient-gold">сертифицированной СИЗ</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                От боевой одежды пожарного и защиты от электродуги до теплоотражающих
                комплектов ТОК-600.
              </p>
            </div>

            <div className="mb-10 flex flex-wrap justify-center gap-2">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  to="/catalog"
                  className="rounded-full border border-brand-navy/15 bg-card px-5 py-2.5 text-sm font-bold text-brand-navy transition-smooth hover:border-brand-gold hover:text-brand-gold"
                >
                  {c.label}
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {featured.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-gradient-card transition-spring hover:-translate-y-1 hover:shadow-hover"
                >
                  <div className="h-1 bg-gradient-gold" />
                  <div className="flex flex-1 flex-col p-7">
                    {p.badge && (
                      <span className="mb-3 w-fit rounded-md border border-brand-gold/30 bg-brand-gold/10 px-2.5 py-1 text-xs font-semibold text-brand-gold">
                        {p.badge}
                      </span>
                    )}
                    <h3 className="mb-2 text-lg font-bold text-brand-navy">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">{p.description}</p>
                    <div className="mt-4 inline-flex items-center text-sm font-semibold text-brand-gold transition-smooth group-hover:gap-2">
                      Подробнее <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-gold text-brand-navy-deep shadow-gold hover:opacity-95"
              >
                <Link to="/catalog">
                  Открыть полный каталог <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-gradient-hero py-20 text-primary-foreground">
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="container relative mx-auto grid grid-cols-1 items-center gap-8 px-4 md:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-3 inline-block rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold">
                Производство и партнёрства
              </div>
              <h2 className="text-3xl font-extrabold md:text-4xl">
                Узнайте больше о заводе и сертификатах
              </h2>
              <p className="mt-2 max-w-2xl text-primary-foreground/80">
                Полный цикл производства, оборудование MAYER · SIRUBA · JACR · TYPICAL,
                ткани IBENA, Carrington, Concordia, Westex.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-gradient-gold text-brand-navy-deep shadow-gold hover:opacity-95"
              >
                <Link to="/about">О заводе</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-brand-gold"
              >
                <Link to="/contacts">Связаться</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
