export type TelegramLeadPayload = {
  name: string;
  phone: string;
  company?: string;
  email?: string;
  product?: string;
  message?: string;
};

function asTrimmedString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : String(value ?? "").trim();
}

function pickFirstNonEmpty(...values: Array<FormDataEntryValue | null>): string {
  for (const v of values) {
    const s = asTrimmedString(v);
    if (s) return s;
  }
  return "";
}

export function getTelegramPayloadFromForm(form: HTMLFormElement): TelegramLeadPayload {
  const fd = new FormData(form);

  const name = asTrimmedString(fd.get("name"));
  const phone = asTrimmedString(fd.get("phone"));

  // Опциональные поля — но мы всё равно пытаемся их собрать из возможных имён.
  const company = pickFirstNonEmpty(fd.get("company"), fd.get("Компания"));
  const email = pickFirstNonEmpty(fd.get("email"), fd.get("Email"), fd.get("E-mail"));
  const product = pickFirstNonEmpty(fd.get("product"), fd.get("товар"), fd.get("interest"));
  const message = pickFirstNonEmpty(fd.get("message"), fd.get("task"), fd.get("comment"), fd.get("Задача"), fd.get("Комментарий"));

  if (!name) throw new Error("Поле «Имя» обязательно");
  if (!phone) throw new Error("Поле «Телефон» обязательно");

  return {
    name,
    phone,
    ...(company ? { company } : {}),
    ...(email ? { email } : {}),
    ...(product ? { product } : {}),
    ...(message ? { message } : {}),
  };
}

export async function sendToTelegram(payload: TelegramLeadPayload) {
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
    const details = data && typeof data === "object" && "error" in data ? data.error : undefined;
    throw new Error(details ? `Ошибка отправки: ${details}` : "Не удалось отправить заявку");
  }

  return data;
}

