import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { About } from "@/components/site/About";
import { Production } from "@/components/site/Production";
import { Partners } from "@/components/site/Partners";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-hero py-16 text-primary-foreground md:py-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="container relative mx-auto px-4 text-center">
            <div className="mb-3 inline-block rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold">
              О компании
            </div>
            <h1 className="mb-5 text-4xl font-extrabold md:text-5xl">
              ТОО «KAZPROTECT» — <span className="text-gradient-gold">12 лет на рынке СИЗ</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-primary-foreground/85">
              Ведущий казахстанский производитель высокотехнологичной защитной
              одежды и снаряжения. Полный цикл производства, международные
              партнёры и сертификация ISO 9001.
            </p>
          </div>
        </section>

        <About />
        <Production />
        <Partners />

        {/* CTA */}
        <section className="bg-background py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-2xl font-extrabold text-brand-navy md:text-3xl">
              Нужно решение под ваш проект?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
              Конструкторский отдел разработает модель с нуля под параметры
              эксплуатации, отрасль и требования сертификации.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-gold text-brand-navy-deep shadow-gold hover:opacity-95"
            >
              <Link to="/contacts">
                Связаться с нами <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default AboutPage;
