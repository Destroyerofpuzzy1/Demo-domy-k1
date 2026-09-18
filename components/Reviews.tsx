"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import s from "./Sections.module.css";

/* ------------------------------------------------------------------
 * PRAWDZIWE OPINIE Z WIZYTÓWKI GOOGLE.
 * Treść i imiona przepisane 1:1 ze zrzutów dostarczonych przez klienta.
 * Nie skracamy, nie parafrazujemy i nie dopisujemy nowych opinii.
 * Nie podajemy łącznej liczby opinii — nie została potwierdzona.
 * ------------------------------------------------------------------ */
const REVIEWS = [
  {
    name: "Tetiana Platon",
    text: "Jesteśmy bardzo zadowoleni ze współpracy z Serhii Anatii Homes. Od początku wszystko przebiegało sprawnie i zgodnie z ustaleniami. Ekipa była punktualna, dokładna i zawsze chętnie odpowiadała na nasze pytania. Dom został wykonany bardzo solidnie. Z czystym sumieniem polecamy tę firmę każdemu, kto planuje budowę domu.",
  },
  {
    name: "Yana Slipchenko",
    text: "Z pełnym przekonaniem polecam tą firmę. Od pierwszego kontaktu aż do zakończenia budowy wszystko przebiegało sprawnie i profesjonalnie. Pracowniki byli pomocni, terminowi i chętnie odpowiadali na wszystkie pytania. Jakość wykonania domu jest na bardzo wysokim poziomie, a wszystkie prace zostały zrealizowane zgodnie z ustaleniami i w wyznaczonym terminie. Widać, że firma stawia na solidność i dbałość o szczegóły. Jestem bardzo zadowolona z efektu końcowego i z czystym sumieniem mogę polecić ich usługi każdemu, kto planuje budowę domu jednorodzinnego.",
  },
  {
    name: "Vadym Platon",
    text: "Pełen profesjonalizm od początku do końca. Serhii Anatii Homes to firma, której naprawdę można zaufać. Wszystkie prace zostały wykonane starannie i na czas, a jakość wykonania jest bardzo wysoka. Widać, że znają się na swojej pracy. Jesteśmy bardzo zadowoleni z efektu i na pewno polecimy ich znajomym.",
  },
  {
    name: "Viktoriia Tymokhina",
    text: "Serdecznie polecam firmę Serhii Anatii Homes! Profesjonalne podejście do klienta, wysoka jakość wykonania i dbałość o każdy szczegół. Wszystko zostało wykonane solidnie i zgodnie z ustaleniami. Widać duże doświadczenie, zaangażowanie i odpowiedzialność. Jestem bardzo zadowolona ze współpracy i z pełnym przekonaniem mogę polecić tę firmę każdemu, kto szuka rzetelnej i profesjonalnej ekipy do budowy domu. Dziękuję za świetną pracę!",
  },
  {
    name: "Borys Sanchuk",
    text: "Bardzo dobra ekipa, szybko, solidnie i profesjonalnie",
  },
  {
    name: "Valentin Simerchuk",
    text: "Firma jest po prostu świetna. Polecam ją wszystkim.",
  },
  {
    name: "Oleksandr Kulish",
    text: "Budują szybko i sprawnie",
  },
];

function Stars() {
  return (
    <span className={s.revStars} aria-hidden="true">
      ★★★★★
    </span>
  );
}

export default function Reviews() {
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    sync();
    const el = railRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const step = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("figure");
    const amount = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className={`${s.section} ${s.reviews}`} id="opinie" aria-labelledby="opinie-tytul">
      <div className="shell">
        <div className={s.headNo}>
          <b>07 — Opinie</b>
          <i data-line="" aria-hidden="true" />
        </div>

        <div className={s.revTop}>
          <div className={s.revScore} data-reveal="">
            <Stars />
            <strong>{site.rating}</strong>
            <span>
              Google
              <br />
              Opinie klientów
            </span>
          </div>

          <div className={s.revIntro}>
            <h2 className={s.headTitle} id="opinie-tytul" data-reveal="">
              Co mówią
              <br />
              klienci.
            </h2>
            <div className={s.revNav} data-reveal="" data-delay="90">
              <button
                type="button"
                onClick={() => step(-1)}
                disabled={atStart}
                aria-label="Poprzednia opinia"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                disabled={atEnd}
                aria-label="Następna opinia"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={s.revRail} ref={railRef} data-lenis-prevent="">
        {REVIEWS.map((r) => (
          <figure key={r.name} className={s.revCard}>
            <Stars />
            <blockquote>{r.text}</blockquote>
            <figcaption>
              {r.name}
              <span>Opinia w Google</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="shell">
        <a
          className={`btn btn--ghost ${s.revLink}`}
          href={site.mapsUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          Zobacz opinie w Google
          <span className="arw" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}
