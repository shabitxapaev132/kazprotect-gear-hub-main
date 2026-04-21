declare const process: { env: Record<string, string | undefined> };

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : String(value ?? "").trim();
}

function valueOrNotSpecified(value: unknown): string {
  const s = asTrimmedString(value);
  return s ? s : "Не указано";
}

function escapeText(text: string) {
  return text.replace(/\r\n/g, "\n").trim();
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method Not Allowed" });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    res.status(500).json({ ok: false, error: "Server misconfigured" });
    return;
  }

  const body = req.body ?? {};

  // name/phone считаем обязательными (как и в формах), остальное — опционально.
  const name = asTrimmedString(body.name);
  const phone = asTrimmedString(body.phone);

  if (!name || !phone) {
    res.status(400).json({ ok: false, error: "Missing required fields" });
    return;
  }

  const company = valueOrNotSpecified(body.company);
  const email = valueOrNotSpecified(body.email);
  const product = valueOrNotSpecified(body.product);
  const message = valueOrNotSpecified(body.message ?? body.task ?? body.comment);

  const text = [
    "🚀 НОВАЯ ЗАЯВКА KAZPROTECT",
    `👤 Имя: ${escapeText(name)}`,
    `📞 Телефон: ${escapeText(phone)}`,
    `🏢 Компания: ${escapeText(company)}`,
    `📧 Email: ${escapeText(email)}`,
    `📦 Товар/Интерес: ${escapeText(product)}`,
    `📝 Задача/Детали: ${escapeText(message)}`,
  ].join("\n");

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    });

    if (!tgRes.ok) {
      res.status(502).json({ ok: false, error: "Telegram request failed" });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(502).json({ ok: false, error: "Telegram request failed" });
  }
}
