export type TelegramLeadPayload = {
  name: string;
  phone: string;
  product: string;
  company?: string;
  email?: string;
  message?: string;
};

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
    const details =
      data && typeof data === "object" && "error" in data ? data.error : undefined;
    throw new Error(details ? `Ошибка отправки: ${details}` : "Не удалось отправить заявку");
  }

  return data;
}

function getFormValue(fd: FormData, name: string) {
  const raw = fd.get(name);
  return typeof raw === "string" ? raw.trim() : String(raw ?? "").trim();
}

export function getTelegramPayloadFromForm(form: HTMLFormElement): TelegramLeadPayload {
  const fd = new FormData(form);

  const name = getFormValue(fd, "name");
  const phone = getFormValue(fd, "phone");
  const product = getFormValue(fd, "product");
  const company = getFormValue(fd, "company");
  const email = getFormValue(fd, "email");
  const message = getFormValue(fd, "message");

  if (!name) throw new Error("Поле «Имя» обязательно");
  if (!phone) throw new Error("Поле «Телефон» обязательно");
  if (!product) throw new Error("Поле «Товар» обязательно");

  return {
    name,
    phone,
    product,
    ...(company ? { company } : {}),
    ...(email ? { email } : {}),
    ...(message ? { message } : {}),
  };
}

