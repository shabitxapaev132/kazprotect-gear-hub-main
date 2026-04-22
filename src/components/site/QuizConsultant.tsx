import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/sendToTelegram";

const industries = ["Нефтегаз", "Энергетика", "Металлургия", "Пожарная охрана"] as const;
type Industry = (typeof industries)[number];

const risks = ["Электрическая дуга", "Искры металла", "Открытое пламя", "Низкие температуры"] as const;
type Risk = (typeof risks)[number];

function getRecommendedProduct(risk: Risk | null): string {
  if (risk === "Электрическая дуга") return "Костюм ArcProtect";
  if (risk === "Искры металла") return "Костюм сварщика";
  return "Костюм Firefighter";
}

export const QuizConsultant = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [risk, setRisk] = useState<Risk | null>(null);
  const [loading, setLoading] = useState(false);

  const recommendedProduct = useMemo(() => getRecommendedProduct(risk), [risk]);
  const telegramMessage = useMemo(() => {
    const i = industry ?? "—";
    const r = risk ?? "—";
    return `Заявка из Квиза. Отрасль: [${i}], Риск: [${r}]`;
  }, [industry, risk]);

  const reset = () => {
    setStep(1);
    setIndustry(null);
    setRisk(null);
  };

  const goBack = () => {
    setStep((s) => (s === 1 ? 1 : ((s - 1) as 1 | 2 | 3)));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.currentTarget;
      const fd = new FormData(form);
      const name = String(fd.get("name") ?? "").trim();
      const phone = String(fd.get("phone") ?? "").trim();

      await sendToTelegram({
        name,
        phone,
        product: recommendedProduct,
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
    <section id="quiz" className="bg-muted/40 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-3 inline-block rounded-full bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold">
            Квиз-консультант
          </div>
          <h2 className="mb-4 text-3xl font-extrabold text-brand-navy md:text-5xl">
            Подберём экипировку <span className="text-gradient-gold">за 1 минуту</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Ответьте на 2 вопроса — мы предложим подходящий костюм и свяжемся для уточнений.
          </p>
        </div>

        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <div className="h-1 bg-gradient-gold" />

          <div className="p-6 md:p-10">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-muted-foreground">
                Шаг {step} из 3
              </div>
              <Button type="button" variant="outline" size="sm" onClick={reset}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Сбросить
              </Button>
            </div>

            {step === 1 && (
              <div>
                <h3 className="mb-5 text-xl font-bold text-brand-navy md:text-2xl">Ваша отрасль?</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {industries.map((opt) => {
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
                <h3 className="mb-2 text-xl font-bold text-brand-navy md:text-2xl">Главный фактор риска?</h3>
                <p className="mb-5 text-sm text-muted-foreground">
                  Отрасль: <span className="font-semibold text-brand-navy">{industry ?? "—"}</span>
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {risks.map((opt) => {
                    const active = risk === opt;
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
                          setRisk(opt);
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
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
                <div>
                  <h3 className="mb-2 text-xl font-bold text-brand-navy md:text-2xl">Рекомендация</h3>
                  <p className="mb-5 text-sm text-muted-foreground">
                    Отрасль: <span className="font-semibold text-brand-navy">{industry ?? "—"}</span>
                    {" · "}
                    Риск: <span className="font-semibold text-brand-navy">{risk ?? "—"}</span>
                  </p>

                  <div className="rounded-xl border border-border bg-gradient-card p-6">
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-gold">
                      Подходящий товар
                    </div>
                    <div className="text-2xl font-extrabold text-brand-navy">{recommendedProduct}</div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Оставьте контакты — уточним условия эксплуатации и предложим комплектацию и ткани под ваш проект.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Button type="button" variant="outline" onClick={goBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Назад
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setIndustry(null);
                        setRisk(null);
                        setStep(1);
                      }}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Пройти заново
                    </Button>
                  </div>
                </div>

                <form onSubmit={onSubmit} className="rounded-xl border border-border bg-muted/30 p-6">
                  <input type="hidden" name="product" value={recommendedProduct} />
                  <input type="hidden" name="message" value={telegramMessage} />

                  <div className="mb-4">
                    <div className="text-sm font-semibold text-brand-navy">Связаться с консультантом</div>
                    <div className="text-xs text-muted-foreground">Заполним заявку и перезвоним.</div>
                  </div>

                  <div className="space-y-4">
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
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

