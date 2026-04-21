import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Award, FileCheck, Sparkles, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { getCategoryLabel, getProductById, products } from "@/data/catalog";
import { getTelegramPayloadFromForm, sendToTelegram } from "@/lib/sendToTelegram";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  if (!product) {
    return <Navigate to="/" replace />;
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.currentTarget;
      const payload = getTelegramPayloadFromForm(form);
      await sendToTelegram(payload);

      setLoading(false);
      form.reset();
      toast({
        title: "Запрос отправлен",
        description: `КП по позиции «${product.title}» подготовим в течение рабочего дня.`,
      });
    } catch (err) {
      setLoading(false);
      toast({
        title: "Не удалось отправить запрос",
        description: err instanceof Error ? err.message : "Попробуйте ещё раз позже.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-hero py-16 text-primary-foreground md:py-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="container relative mx-auto px-4">
            <Button
              asChild
              variant="ghost"
              className="mb-6 -ml-3 text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-brand-gold"
            >
              <Link to="/catalog">
                <ArrowLeft className="mr-1 h-4 w-4" /> Назад в каталог
              </Link>
            </Button>

            <div className="max-w-3xl">
              <div className="mb-3 inline-block rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold">
                {getCategoryLabel(product.category)}
              </div>
              <h1 className="mb-5 text-3xl font-extrabold leading-tight md:text-5xl">
                {product.title}
              </h1>
              {product.badge && (
                <Badge className="mb-5 border border-brand-gold/40 bg-brand-gold/15 font-semibold text-brand-gold hover:bg-brand-gold/20">
                  {product.badge}
                </Badge>
              )}
              <p className="text-lg text-primary-foreground/85">{product.description}</p>
            </div>
          </div>
        </section>

        {/* Specs + form */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto grid grid-cols-1 gap-10 px-4 lg:grid-cols-3">
            <div className="space-y-5 lg:col-span-2">
              <SpecBlock
                icon={<Layers className="h-5 w-5" />}
                title="Ткани и материалы"
                text={product.materials}
              />
              {product.gost && (
                <SpecBlock
                  icon={<Award className="h-5 w-5" />}
                  title="Сертификация / ГОСТ"
                  text={product.gost}
                  highlight
                />
              )}
              <SpecBlock
                icon={<Sparkles className="h-5 w-5" />}
                title="Преимущества"
                text={product.advantages}
              />
              <SpecBlock
                icon={<FileCheck className="h-5 w-5" />}
                title="Описание и комплектация"
                text={product.description}
              />
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <form
                onSubmit={onSubmit}
                className="rounded-2xl border border-border bg-gradient-card p-6 shadow-elegant"
              >
                <div className="mb-4">
                  <div className="mb-1 text-xs font-bold uppercase tracking-wider text-brand-gold">
                    Запросить КП
                  </div>
                  <h2 className="text-xl font-extrabold text-brand-navy">
                    {product.title}
                  </h2>
                </div>
                <input type="hidden" name="product" value={product.title} />
                <div className="space-y-3">
                  <Input required name="name" placeholder="Имя" />
                  <Input required name="phone" type="tel" placeholder="Телефон" />
                  <Input name="company" placeholder="Компания" />
                  <Input name="email" type="email" placeholder="Email" />
                  <Textarea
                    name="message"
                    rows={3}
                    placeholder="Размеры, объём, сроки…"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="w-full bg-gradient-gold text-brand-navy-deep shadow-gold hover:opacity-95"
                  >
                    {loading ? "Отправляем…" : "Запросить стоимость"}
                    {!loading && <ArrowRight className="ml-1 h-4 w-4" />}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Ответим в течение рабочего дня.
                  </p>
                </div>
              </form>
            </aside>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t border-border bg-muted/30 py-16">
            <div className="container mx-auto px-4">
              <div className="mb-8 flex items-end justify-between gap-4">
                <h2 className="text-2xl font-extrabold text-brand-navy md:text-3xl">
                  Похожие позиции
                </h2>
                <Button asChild variant="ghost" className="text-brand-navy hover:text-brand-gold">
                  <Link to="/catalog">Весь каталог <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-spring hover:-translate-y-1 hover:shadow-hover"
                  >
                    <div className="h-1 bg-gradient-gold" />
                    <div className="flex flex-1 flex-col p-6">
                      {p.badge && (
                        <Badge className="mb-3 w-fit border border-brand-gold/30 bg-brand-gold/10 font-semibold text-brand-gold hover:bg-brand-gold/15">
                          {p.badge}
                        </Badge>
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
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
};

const SpecBlock = ({
  icon,
  title,
  text,
  highlight,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  highlight?: boolean;
}) => (
  <div
    className={`flex items-start gap-4 rounded-xl border p-5 ${
      highlight
        ? "border-brand-gold/30 bg-brand-gold/5"
        : "border-border bg-card"
    }`}
  >
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
        highlight ? "bg-brand-gold/15 text-brand-gold" : "bg-muted text-brand-navy"
      }`}
    >
      {icon}
    </div>
    <div>
      <div className="mb-1 text-xs font-bold uppercase tracking-wider text-brand-gold">
        {title}
      </div>
      <p className="text-sm leading-relaxed text-foreground">{text}</p>
    </div>
  </div>
);

export default ProductPage;
