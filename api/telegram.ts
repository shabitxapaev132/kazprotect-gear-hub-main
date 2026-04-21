type TelegramRequestBody = {
  name?: unknown;
  phone?: unknown;
  product?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
};

function asNonEmptyString(value: unknown) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function asOptionalString(value: unknown) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
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

  const body = (req.body ?? {}) as TelegramRequestBody;
  const name = asNonEmptyString(body.name);
  const phone = asNonEmptyString(body.phone);
  const product = asNonEmptyString(body.product);
  const company = asOptionalString(body.company);
  const email = asOptionalString(body.email);
  const message = asOptionalString(body.message);

  if (!name || !phone || !product) {
    res.status(400).json({ ok: false, error: "Missing required fields" });
    return;
  }

  const companyText = company ? escapeText(company) : "Не указано";
  const emailText = email ? escapeText(email) : "Не указано";
  const messageText = message ? escapeText(message) : "Не указано";

  const text = [
    "🚀 НОВАЯ ЗАЯВКА KAZPROTECT",
    `👤 Имя: ${escapeText(name)}`,
    `📞 Телефон: ${escapeText(phone)}`,
    `🏢 Компания: ${companyText}`,
    `📧 Email: ${emailText}`,
    `📦 Товар/Интерес: ${escapeText(product)}`,
    `📝 Задача/Детали: ${messageText}`,
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

    const tgData = (await tgRes.json().catch(() => null)) as
      | { ok: true; result: unknown }
      | { ok: false; description?: string }
      | null;

    if (!tgRes.ok || !tgData || (typeof tgData === "object" && "ok" in tgData && tgData.ok !== true)) {
      const details =
        tgData && typeof tgData === "object" && "description" in tgData ? tgData.description : undefined;
      res.status(502).json({ ok: false, error: details ?? "Telegram request failed" });
      return;
    }

    res.status(200).json({ ok: true });
  } catch {
    res.status(502).json({ ok: false, error: "Telegram request failed" });
  }
}

