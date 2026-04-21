import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

export const SiteFooter = () => {
  return (
    <footer className="bg-brand-navy-deep text-primary-foreground/80">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-4 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-4 text-2xl font-extrabold tracking-wider">
            <span className="text-brand-gold">KAZ</span>
            <span className="text-primary-foreground">PROTECT</span>
          </div>
          <p className="max-w-md text-sm leading-relaxed">
            Ведущий казахстанский производитель высокотехнологичной защитной
            одежды и СИЗ. Полный цикл производства — от R&amp;D до логистики.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold text-brand-gold">
            ISO 9001 · ГОСТ K · ДС РК
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-gold">
            Навигация
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-brand-gold">Главная</Link></li>
            <li><Link to="/catalog" className="hover:text-brand-gold">Каталог</Link></li>
            <li><Link to="/about" className="hover:text-brand-gold">О компании</Link></li>
            <li><Link to="/contacts" className="hover:text-brand-gold">Контакты</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-gold">
            Контакты
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
              <span>Карагандинская обл., Осакаровский р-н,<br />пос. Осакаровка, ул. А. Бокейханова, 67</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
              <a href="tel:+77017489895" className="hover:text-brand-gold">+7 (701) 748-98-95</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
              <a href="mailto:info@kazprotect.kz" className="hover:text-brand-gold">info@kazprotect.kz</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-primary-foreground/60 sm:flex-row">
          <span>© {new Date().getFullYear()} ТОО «KAZPROTECT». Все права защищены.</span>
          <span>Карагандинская область · Казахстан · 12 лет на рынке</span>
        </div>
      </div>
    </footer>
  );
};
