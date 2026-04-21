type TelegramPayload = {
  name: string;
  phone: string;
  product: string;
  email?: string;
};

export async function sendToTelegram(payload: TelegramPayload) {
  const res = await fetch("/api/telegram", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json().catch(() => null)) as
    | { ok: true }
    | { ok: false; error?: string }
    | null;

  if (!res.ok || !data || (typeof data === "object" && "ok" in data && data.ok !== true)) {
    const details =
      data && typeof data === "object" && "error" in data ? data.error : undefined;
    throw new Error(details ? `Ошибка отправки: ${details}` : "Не удалось отправить заявку");
  }

  return data;
}

export function getTelegramPayloadFromForm(form: HTMLFormElement): TelegramPayload {
  const fd = new FormData(form);

  const name = String(fd.get("name") ?? "").trim();
  const phone = String(fd.get("phone") ?? "").trim();
  const product = String(fd.get("product") ?? "").trim();
  const email = String(fd.get("email") ?? "").trim();

  if (!name) throw new Error("Поле «Имя» обязательно");
  if (!phone) throw new Error("Поле «Телефон» обязательно");
  if (!product) throw new Error("Поле «Товар» обязательно");

  return { name, phone, product, ...(email ? { email } : {}) };
}

