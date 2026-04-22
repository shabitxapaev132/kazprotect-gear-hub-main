import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { products, type Product } from "@/data/catalog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/sendToTelegram";

type Step = 1 | 2 | 3 | 4;
type Season = Product["season"];

const seasons: Season[] = ["Зима", "Лето", "Универсальный"];

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, "ru"));
}

function getSeasonMatchScore(productSeason: Season, selectedSeason: Season) {
  if (selectedSeason === "Универсальный") return 1;
  if (productSeason === selectedSeason) return 2;
  if (productSeason === "Универсальный") return 1;
  return 0;
}

function getProductMatchScore(p: Product, industry: string | null, season: Season | null, hazards: string[]) {
  let score = 0;

  if (industry) score += p.industry.includes(industry) ? 3 : 0;
  if (season) score += getSeasonMatchScore(p.season, season);

  if (hazards.length > 0) {
    const matched = hazards.filter((h) => p.hazard.includes(h)).length;
    score += matched * 2;
    if (matched === hazards.length) score += 2; // бонус за полное совпадение рисков
  } else {
    score += 1;
  }

  return score;
}

export const SmartQuiz = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>(1);
  const [industry, setIndustry] = useState<string | null>(null);
  const [season, setSeason] = useState<Season | null>(null);
  const [hazards, setHazards] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const industryOptions = useMemo(
    () => uniqueSorted(products.flatMap((p) => p.industry)),
    [],
  );

  const hazardOptions = useMemo(
    () => uniqueSorted(products.flatMap((p) => p.hazard)),
    [],
  );

  const exactMatches = useMemo(() => {
    if (!industry || !season) return [];
    return products.filter((p) => {
      const okIndustry = p.industry.includes(industry);
      const okSeason = season === "Универсальный" ? true : p.season === season || p.season === "Универсальный";
      const okHazards = hazards.length === 0 ? true : hazards.every((h) => p.hazard.includes(h));
      return okIndustry && okSeason && okHazards;
    });
  }, [industry, season, hazards]);

  const bestMatches = useMemo(() => {
    const scored = products
      .map((p) => ({
        p,
        score: getProductMatchScore(p, industry, season, hazards),
      }))
      .sort((a, b) => b.score - a.score);

    const top = scored.filter((x) => x.score > 0).slice(0, 3).map((x) => x.p);
    return top;
  }, [industry, season, hazards]);

  const results = useMemo(() => {
    const slice = (arr: Product[]) => arr.slice(0, 3);
    if (exactMatches.length > 0) return { kind: "exact" as const, items: slice(exactMatches) };
    return { kind: "best" as const, items: bestMatches };
  }, [exactMatches, bestMatches]);

  const reset = () => {
    setStep(1);
    setIndustry(null);
    setSeason(null);
    setHazards([]);
  };

  const goBack = () => setStep((s) => (s === 1 ? 1 : ((s - 1) as Step)));

  const telegramMessage = useMemo(() => {
    const i = industry ?? "—";
    const s = season ?? "—";
    const h = hazards.length ? hazards.join(", ") : "—";
    return `Заявка из Умного Квиза. Отрасль: ${i}, Сезон: ${s}, Риск: ${h}`;
  }, [industry, season, hazards]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.currentTarget;
      const fd = new FormData(form);
      const name = String(fd.get("name") ?? "").trim();
      const phone = String(fd.get("phone") ?? "").trim();

      const productTitles = results.items.map((p) => p.title);

      await sendToTelegram({
        name,
        phone,
        product: productTitles.join(", "),
        message: telegramMessage,
      });

      setLoading(false);
      form.reset();
      toast({
        title: "Заявка отправлена",
        description: "Мы свяжемся с вами в течение рабочего дня.",
      });
    } catch (err) {
      setLoading(false);
      toast({
        title: "Не удалось отправить заявку",
        description: err instanceof Error ? err.message : "Попробуйте ещё раз позже.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mx-auto mb-10 max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="h-1 bg-gradient-gold" />
      <div className="p-6 md:p-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm font-semibold text-muted-foreground">Умный подбор · Шаг {step} из 4</div>
          <Button type="button" variant="outline" size="sm" onClick={reset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Сбросить
          </Button>
        </div>

        {step === 1 && (
          <div>
            <h3 className="mb-5 text-xl font-bold text-brand-navy md:text-2xl">
              Для какой отрасли подбираем экипировку?
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {industryOptions.map((opt) => {
                const active = industry === opt;
                return (
                  <Button
                    key={opt}
                    type="button"
                    variant={active ? "default" : "outline"}
                    className={
                      active
                        ? "justify-between bg-gradient-gold text-brand-navy-deep shadow-gold hover:opacity-95"
                        : "justify-between"
                    }
                    onClick={() => {
                      setIndustry(opt);
                      setStep(2);
                    }}
                  >
                    <span>{opt}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="mb-2 text-xl font-bold text-brand-navy md:text-2xl">Какой основной сезон использования?</h3>
            <p className="mb-5 text-sm text-muted-foreground">
              Отрасль: <span className="font-semibold text-brand-navy">{industry ?? "—"}</span>
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {seasons.map((opt) => {
                const active = season === opt;
                return (
                  <Button
                    key={opt}
                    type="button"
                    variant={active ? "default" : "outline"}
                    className={
                      active
                        ? "justify-between bg-gradient-gold text-brand-navy-deep shadow-gold hover:opacity-95"
                        : "justify-between"
                    }
                    onClick={() => {
                      setSeason(opt);
                      setStep(3);
                    }}
                  >
                    <span>{opt}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                );
              })}
            </div>

            <div className="mt-6">
              <Button type="button" variant="ghost" onClick={goBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="mb-2 text-xl font-bold text-brand-navy md:text-2xl">От каких рисков нужна защита?</h3>
            <p className="mb-5 text-sm text-muted-foreground">
              Отрасль: <span className="font-semibold text-brand-navy">{industry ?? "—"}</span>
              {" · "}
              Сезон: <span className="font-semibold text-brand-navy">{season ?? "—"}</span>
            </p>

            <div className="flex flex-wrap gap-2">
              {hazardOptions.map((opt) => {
                const active = hazards.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() =>
                      setHazards((prev) => (prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]))
                    }
                    className={`rounded-full px-4 py-2 text-sm font-bold transition-smooth ${
                      active
                        ? "bg-gradient-gold text-brand-navy-deep shadow-gold"
                        : "border border-brand-navy/15 bg-card text-brand-navy hover:border-brand-gold hover:text-brand-gold"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button type="button" variant="ghost" onClick={goBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад
              </Button>
              <Button
                type="button"
                className="bg-gradient-gold text-brand-navy-deep shadow-gold hover:opacity-95"
                onClick={() => setStep(4)}
              >
                Показать результаты <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-brand-navy md:text-2xl">Подходящие варианты</h3>
                <p className="mt-1 text-sm text-muted-foreground">{telegramMessage}</p>
                {results.kind === "best" && exactMatches.length === 0 && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Точных совпадений нет — показываем максимально близкие варианты.
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" onClick={goBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Назад
                </Button>
                <Button type="button" variant="ghost" onClick={reset}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Пройти заново
                </Button>
              </div>
            </div>

            {results.items.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.items.map((p) => (
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
                      <h4 className="mb-3 text-lg font-bold leading-tight text-brand-navy">{p.title}</h4>
                      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                      <Button
                        asChild
                        className="mt-auto w-full bg-brand-navy text-primary-foreground transition-smooth hover:bg-brand-navy-deep group-hover:bg-gradient-gold group-hover:text-brand-navy-deep"
                      >
                        <Link to={`/product/${p.id}`}>Подробнее</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-muted/30 p-6">
                <div className="text-lg font-bold text-brand-navy">Не нашли подходящий вариант</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Свяжитесь с технологом — подберём ткань и комплектацию под ваши условия эксплуатации.
                </p>
                <Button asChild className="mt-4 bg-gradient-gold text-brand-navy-deep shadow-gold hover:opacity-95">
                  <Link to="/contacts">Связаться с технологом</Link>
                </Button>
              </div>
            )}

            <div className="mt-10 grid grid-cols-1 gap-6 rounded-xl border border-border bg-muted/30 p-6 lg:grid-cols-[1fr_1fr]">
              <div>
                <div className="text-lg font-bold text-brand-navy">Оставьте контакты</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Уточним требования и подготовим предложение под ваш объект.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Имя</label>
                  <Input required name="name" placeholder="Иван Иванов" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Телефон</label>
                  <Input required name="phone" type="tel" placeholder="+7 (___) ___-__-__" />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full bg-gradient-gold text-brand-navy-deep shadow-gold hover:opacity-95"
                >
                  {loading ? "Отправляем…" : "Отправить заявку"}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Отправляя форму, вы соглашаетесь на обработку персональных данных.
                </p>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

