"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { site } from "@/lib/site";
import {
  buildMailto,
  submitInquiry,
  type Inquiry,
  type InquiryResult,
} from "@/lib/submitInquiry";
import s from "./ContactModal.module.css";

type Ctx = { open: () => void; close: () => void; isOpen: boolean };
const ContactCtx = createContext<Ctx | null>(null);

export function useContactModal() {
  const ctx = useContext(ContactCtx);
  if (!ctx) throw new Error("useContactModal poza ContactProvider");
  return ctx;
}

const EMPTY: Inquiry = {
  name: "",
  phone: "",
  email: "",
  scope: "Dom jednorodzinny",
  message: "",
};

const FOCUSABLE =
  'input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <ContactCtx.Provider value={value}>
      {children}
      <ContactPanel isOpen={isOpen} close={close} />
    </ContactCtx.Provider>
  );
}

function ContactPanel({ isOpen, close }: { isOpen: boolean; close: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const [data, setData] = useState<Inquiry>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<InquiryResult | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const uid = useId();

  // Montowanie, a odmontowanie dopiero po animacji wyjścia.
  useEffect(() => {
    if (isOpen) {
      restoreRef.current = document.activeElement as HTMLElement;
      setMounted(true);
      const t = window.setTimeout(() => setShown(true), 20);
      return () => window.clearTimeout(t);
    }
    setShown(false);
    const t = window.setTimeout(() => setMounted(false), 300);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  // Blokada scrolla strony i zwrot focusu po zamknięciu.
  useEffect(() => {
    if (!mounted) return;
    document.body.dataset.locked = "true";
    return () => {
      delete document.body.dataset.locked;
      restoreRef.current?.focus?.();
    };
  }, [mounted]);

  // ESC zamyka, Tab nie wychodzi poza panel.
  useEffect(() => {
    if (!mounted) return;
    const panel = panelRef.current;
    const t = window.setTimeout(() => {
      panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }, 80);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [mounted, close]);

  if (!mounted) return null;

  const set = (key: keyof Inquiry) => (v: string) => {
    setData((d) => ({ ...d, [key]: v }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  };

  const validate = (form: HTMLFormElement) => {
    const next: Record<string, string> = {};
    if (data.name.trim().length < 2) next.name = "Wpisz imię.";
    if (data.phone.replace(/\D/g, "").length < 9) next.phone = "Wpisz numer telefonu.";
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      next.email = "Sprawdź adres e-mail.";
    }
    const consent = form.elements.namedItem("consent") as HTMLInputElement | null;
    if (!consent?.checked) next.consent = "Zaznacz zgodę, żeby wysłać wiadomość.";

    setErrors(next);
    const firstKey = Object.keys(next)[0];
    if (firstKey) form.querySelector<HTMLElement>(`[data-field="${firstKey}"]`)?.focus();
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate(e.currentTarget)) return;
    setSending(true);
    const res = await submitInquiry(data);
    setSending(false);
    setResult(res);
  };

  return (
    <div
      className={s.backdrop}
      data-open={shown}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className={s.panel}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${uid}-title`}
        // Lenis przechwytuje zdarzenia kółka — bez tego panel nie dałby się przewinąć.
        data-lenis-prevent=""
      >
        <div className={s.head}>
          <div>
            <h2 className={s.title} id={`${uid}-title`}>
              Napisz
              <br />
              do nas.
            </h2>
            <p className={s.sub}>Napisz krótko, czego potrzebujesz.</p>
          </div>
          <button type="button" className={s.close} onClick={close} aria-label="Zamknij formularz">
            ✕
          </button>
        </div>

        {result?.status === "ok" ? (
          <div className={s.notice} role="status">
            <p className={s.noticeText}>
              Wiadomość wysłana. Odezwiemy się na podany numer albo e-mail.
            </p>
          </div>
        ) : (
          <form className={s.form} onSubmit={onSubmit} noValidate>
            <div className={s.row}>
              <Field
                id={`${uid}-name`}
                name="name"
                label="Imię"
                value={data.name}
                onChange={set("name")}
                error={errors.name}
                autoComplete="given-name"
                required
              />
              <Field
                id={`${uid}-phone`}
                name="phone"
                label="Telefon"
                type="tel"
                inputMode="tel"
                value={data.phone}
                onChange={set("phone")}
                error={errors.phone}
                autoComplete="tel"
                required
              />
            </div>

            <Field
              id={`${uid}-email`}
              name="email"
              label="E-mail"
              type="email"
              inputMode="email"
              value={data.email}
              onChange={set("email")}
              error={errors.email}
              autoComplete="email"
            />

            <div className={s.field}>
              <label htmlFor={`${uid}-scope`}>Co chcesz zbudować?</label>
              <select
                id={`${uid}-scope`}
                name="scope"
                value={data.scope}
                onChange={(e) => set("scope")(e.target.value)}
              >
                <option>Dom jednorodzinny</option>
                <option>Bliźniak</option>
                <option>Stan surowy</option>
                <option>Inne</option>
              </select>
            </div>

            <div className={s.field}>
              <label htmlFor={`${uid}-msg`}>Wiadomość</label>
              <textarea
                id={`${uid}-msg`}
                name="message"
                value={data.message}
                onChange={(e) => set("message")(e.target.value)}
                placeholder="Np. dom jednorodzinny, stan surowy."
              />
            </div>

            <div className={s.field}>
              <label className={s.consent} htmlFor={`${uid}-consent`}>
                <input
                  id={`${uid}-consent`}
                  name="consent"
                  type="checkbox"
                  data-field="consent"
                  aria-invalid={Boolean(errors.consent)}
                />
                <span>
                  Akceptuję{" "}
                  <a href="/polityka-prywatnosci" target="_blank" rel="noreferrer">
                    politykę prywatności
                  </a>
                  .
                </span>
              </label>
              {errors.consent && (
                <p className={s.err} role="alert">
                  {errors.consent}
                </p>
              )}
            </div>

            <button type="submit" className={`btn ${s.submit}`} disabled={sending}>
              <span className="dot" aria-hidden="true" />
              {sending ? "Wysyłam…" : "Wyślij"}
              <span className="arw" aria-hidden="true">
                ↗
              </span>
            </button>

            {/* Brak backendu — nie udajemy wysyłki, dajemy działającą alternatywę. */}
            {result?.status === "not-configured" && (
              <div className={s.notice} role="status">
                <p className={s.noticeText}>
                  Formularz nie jest jeszcze podłączony. Nic nie zostało wysłane.
                  Zadzwoń albo wyślij tę wiadomość e-mailem — treść jest już gotowa.
                </p>
                <div className={s.noticeActions}>
                  <a className="btn" href={buildMailto(data, site.email)}>
                    <span className="dot" aria-hidden="true" />
                    Wyślij e-mailem
                    <span className="arw" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                  <a className="btn btn--ghost" href={site.phoneHref}>
                    {site.phoneDisplay}
                  </a>
                </div>
              </div>
            )}

            {result?.status === "error" && (
              <p className={s.err} role="alert">
                {result.message} Zadzwoń: {site.phoneDisplay}
              </p>
            )}
          </form>
        )}

        <div className={s.direct}>
          <p className={s.directRow}>
            <span>Telefon</span>
            <a href={site.phoneHref}>{site.phoneDisplay}</a>
          </p>
          <p className={s.directRow}>
            <span>E-mail</span>
            <a href={site.emailHref}>{site.email}</a>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  id,
  name,
  label,
  value,
  onChange,
  error,
  type = "text",
  inputMode,
  autoComplete,
  required,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  inputMode?: "tel" | "email" | "text";
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div className={s.field}>
      <label htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        data-field={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && (
        <p className={s.err} id={`${id}-err`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
