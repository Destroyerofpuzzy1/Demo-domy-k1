"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { site } from "@/lib/site";
import { prefersReducedMotion } from "./Motion";
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

/* Prędkość przewijania taśmy w px/s. Wolno, żeby dało się czytać w locie. */
const SPEED_DESKTOP = 26;
const SPEED_MOBILE = 20;
const TAP_SLOP = 10;

function Stars() {
  return (
    <span className={s.revStars} aria-hidden="true">
      ★★★★★
    </span>
  );
}

function Card({ r }: { r: { name: string; text: string } }) {
  return (
    <figure className={s.revCard}>
      <Stars />
      <blockquote>{r.text}</blockquote>
      <figcaption>
        {r.name}
        <span>Opinia w Google</span>
      </figcaption>
    </figure>
  );
}

export default function Reviews() {
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  const loopRef = useRef<gsap.core.Timeline | null>(null);
  const stepRef = useRef(1);           // ile sekund osi czasu to jedna karta
  const pausedRef = useRef(false);
  const pointer = useRef({ x: 0, y: 0, t: 0, moved: false });

  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  /* Jedna pętla dla całej taśmy. Dwie identyczne grupy kart: przesunięcie
     o szerokość grupy wygląda dokładnie tak samo jak pozycja startowa,
     więc powrót pętli jest niewidoczny. */
  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      setReduced(true);
      return;
    }

    const track = trackRef.current;
    const group = groupRef.current;
    if (!track || !group) return;

    const build = (keep = 0) => {
      loopRef.current?.kill();

      const gap = parseFloat(getComputedStyle(track).columnGap) || 20;
      const half = group.offsetWidth + gap;
      const card = group.querySelector<HTMLElement>("figure");
      const speed = window.innerWidth < 760 ? SPEED_MOBILE : SPEED_DESKTOP;
      const duration = half / speed;

      stepRef.current = ((card?.offsetWidth ?? 420) + gap) / speed;

      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
      tl.fromTo(track, { x: -half }, { x: 0, duration });

      // Start w głębi pętli — strzałki mogą cofać taśmę bez odbijania się od zera.
      tl.totalTime(duration * 20 + keep * duration);
      if (pausedRef.current) tl.pause();

      loopRef.current = tl;
    };

    build();

    let raf = 0;
    const ro = new ResizeObserver(() => {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => build(loopRef.current?.progress() ?? 0));
    });
    ro.observe(group);

    return () => {
      ro.disconnect();
      window.cancelAnimationFrame(raf);
      loopRef.current?.kill();
      loopRef.current = null;
    };
  }, []);

  const toggle = useCallback(() => {
    const tl = loopRef.current;
    if (!tl) return;
    const next = !pausedRef.current;
    pausedRef.current = next;
    setPaused(next);
    // Wznowienie idzie z bieżącej pozycji — pętla nie startuje od nowa.
    if (next) tl.pause();
    else tl.play();
  }, []);

  /* Tap, nie hover. Ruch palcem po ekranie to przewijanie strony, nie pauza. */
  const onPointerDown = (e: React.PointerEvent) => {
    pointer.current = { x: e.clientX, y: e.clientY, t: Date.now(), moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const p = pointer.current;
    if (Math.abs(e.clientX - p.x) > TAP_SLOP || Math.abs(e.clientY - p.y) > TAP_SLOP) {
      p.moved = true;
    }
  };
  const onPointerUp = () => {
    const p = pointer.current;
    if (!p.moved && Date.now() - p.t < 700) toggle();
  };

  /* Strzałki przesuwają taśmę o mniej więcej jedną kartę, nie przerywając pętli. */
  const nudge = (dir: 1 | -1) => {
    const tl = loopRef.current;
    if (!tl) {
      railRef.current?.scrollBy({ left: dir * 420, behavior: "smooth" });
      return;
    }
    const wasPaused = pausedRef.current;
    tl.pause();
    gsap.to(tl, {
      totalTime: tl.totalTime() + dir * stepRef.current,
      duration: 0.7,
      ease: "power2.inOut",
      overwrite: true,
      onComplete: () => {
        if (!wasPaused) tl.play();
      },
    });
  };

  return (
    <section className={`${s.section} ${s.reviews}`} id="opinie" aria-labelledby="opinie-tytul">
      <div className="shell">
        <div className={s.headNo}>
          <b>07 — Opinie</b>
          <i data-line="" aria-hidden="true" />
        </div>

        <h2 className={`${s.headTitle} ${s.revTitle}`} id="opinie-tytul" data-reveal="">
          Co mówią{" "}
          <br />
          nasi klienci.
        </h2>

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

          <div className={s.revControls} data-reveal="" data-delay="90">
            {!reduced && (
              <button
                type="button"
                className={s.revHint}
                onClick={toggle}
                aria-pressed={paused}
              >
                <i aria-hidden="true" />
                {paused ? "Kliknij, aby wznowić" : "Kliknij, aby zatrzymać"}
              </button>
            )}
            <div className={s.revNav}>
              <button type="button" onClick={() => nudge(-1)} aria-label="Cofnij opinie">
                ←
              </button>
              <button type="button" onClick={() => nudge(1)} aria-label="Przesuń opinie dalej">
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={s.revRail}
        ref={railRef}
        data-paused={paused}
        data-reduced={reduced}
        data-lenis-prevent=""
        onPointerDown={reduced ? undefined : onPointerDown}
        onPointerMove={reduced ? undefined : onPointerMove}
        onPointerUp={reduced ? undefined : onPointerUp}
      >
        <div className={s.revTrack} ref={trackRef}>
          <div className={s.revGroup} ref={groupRef}>
            {REVIEWS.map((r) => (
              <Card key={r.name} r={r} />
            ))}
          </div>
          {/* Kopia tylko dla płynnej pętli — czytniki ekranu ją pomijają. */}
          <div className={s.revGroup} aria-hidden="true">
            {REVIEWS.map((r) => (
              <Card key={`dup-${r.name}`} r={r} />
            ))}
          </div>
        </div>
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
