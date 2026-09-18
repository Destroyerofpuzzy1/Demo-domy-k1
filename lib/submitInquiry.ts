/**
 * ------------------------------------------------------------------
 * PUNKT INTEGRACJI FORMULARZA
 * ------------------------------------------------------------------
 * Na ten moment strona NIE MA backendu. Ta funkcja celowo nie udaje
 * wysyłki i zwraca status "not-configured" — formularz pokazuje wtedy
 * telefon, e-mail oraz gotową wiadomość do wysłania z programu pocztowego.
 *
 * Aby podłączyć prawdziwą wysyłkę przed startem strony:
 *   1. utwórz endpoint (np. app/api/zapytanie/route.ts albo Formspree / Resend),
 *   2. podmień ciało funkcji poniżej na fetch do tego endpointu,
 *   3. zwróć { status: "ok" } po sukcesie i { status: "error" } przy błędzie,
 *   4. uzupełnij punkt 8 Polityki prywatności o opis realnej wysyłki.
 * Reszta interfejsu nie wymaga zmian.
 * ------------------------------------------------------------------
 */

export type Inquiry = {
  name: string;
  phone: string;
  email: string;
  scope: string;
  message: string;
};

export type InquiryResult =
  | { status: "ok" }
  | { status: "error"; message: string }
  | { status: "not-configured" };

export const INQUIRY_ENDPOINT: string | null = null;

export async function submitInquiry(data: Inquiry): Promise<InquiryResult> {
  if (!INQUIRY_ENDPOINT) {
    return { status: "not-configured" };
  }

  try {
    const res = await fetch(INQUIRY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      return { status: "error", message: "Nie udało się wysłać zapytania." };
    }
    return { status: "ok" };
  } catch {
    return { status: "error", message: "Brak połączenia. Spróbuj ponownie." };
  }
}

/** Zapasowa ścieżka: otwiera program pocztowy z gotową treścią. */
export function buildMailto(data: Inquiry, to: string) {
  const subject = `Zapytanie o budowę — ${data.name || "strona www"}`;
  const body = [
    `Imię: ${data.name}`,
    `Telefon: ${data.phone}`,
    `E-mail: ${data.email}`,
    `Co budujemy: ${data.scope}`,
    "",
    data.message,
  ].join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
