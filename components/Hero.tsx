"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useContactModal } from "./ContactModal";
import { prefersReducedMotion } from "./Motion";
import s from "./Hero.module.css";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const introDone = useRef(false);
  const { open } = useContactModal();

  // Sekwencja wejściowa. Odpalamy ją raz i nie cofamy — to animacja
  // wczytania strony, a nie stan komponentu. Dzięki temu podwójne
  // montowanie w trybie deweloperskim nie przywraca stanu startowego.
  useEffect(() => {
    const el = root.current;
    if (!el || introDone.current) return;
    introDone.current = true;

    const q = <T extends Element>(sel: string) => el.querySelectorAll<T>(sel);
    const cover = el.querySelector<HTMLElement>(`.${s.cover}`);

    if (prefersReducedMotion()) {
      cover?.remove();
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl
      // 1. kurtyna schodzi
      .to(cover, { yPercent: -100, duration: 0.62, ease: "power4.inOut" })
      // 2. linia konstrukcyjna rysuje się w poprzek
      .fromTo(
        q(`.${s.eyebrowLine}`),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: "power2.inOut" },
        0.34,
      )
      .to(q(`.${s.tick}`), { opacity: 1, duration: 0.3 }, 0.5)
      // 3. zdjęcie odsłania się maską
      .to(
        q(`.${s.media}`),
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.95, ease: "power3.inOut" },
        0.4,
      )
      .to(q(`.${s.mediaInner} img`), { scale: 1, duration: 1.6, ease: "power2.out" }, 0.4)
      .fromTo(
        q(`.${s.dimension}`),
        { scaleY: 0 },
        { scaleY: 1, duration: 0.8, ease: "power2.inOut" },
        0.66,
      )
      // 4. wiersze nagłówka.
      //    y: 0 w obu stanach jest konieczne — GSAP zamienia CSS-owe
      //    translateY(105%) na piksele i bez tego dodałby je do yPercent.
      .fromTo(
        q(`.${s.line} > span`),
        { yPercent: 105, y: 0 },
        { yPercent: 0, y: 0, duration: 0.86, stagger: 0.075, ease: "power3.out" },
        0.58,
      )
      // 5. na końcu treść wspierająca i przyciski
      .from(
        [el.querySelector(`.${s.support}`), el.querySelector(`.${s.actions}`), el.querySelector(`.${s.scope}`)],
        { y: 14, opacity: 0, duration: 0.6, stagger: 0.07 },
        0.94,
      )
      .to(q(`.${s.caption}`), { opacity: 1, duration: 0.45 }, 1.05)
      .set(cover, { display: "none" });
  }, []);

  // Minimalna reakcja zdjęcia na kursor — kilka pikseli, bez parallaksy.
  useEffect(() => {
    const img = root.current?.querySelector<HTMLElement>(`.${s.mediaInner} img`);
    if (!img || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const x = gsap.quickTo(img, "x", { duration: 0.9, ease: "power3.out" });
    const y = gsap.quickTo(img, "y", { duration: 0.9, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      x((e.clientX / window.innerWidth - 0.5) * 10);
      y((e.clientY / window.innerHeight - 0.5) * 10);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section className={s.hero} ref={root} aria-label="Serhii Anatii Homes — budowa domów">
      <div className={s.cover} aria-hidden="true" />

      <div className={s.grid}>
        <div className={s.copy}>
          <div>
            <div className={s.eyebrowRow}>
              <p className={`label ${s.eyebrow}`}>Budowa domów / Warszawa</p>
              <span className={s.eyebrowLine} aria-hidden="true" />
              <span className={s.tick} aria-hidden="true" />
            </div>

            <h1 className={s.title}>
              <span className={s.line}>
                <span>Budujemy domy.</span>
              </span>
              <span className={s.line}>
                <span>Od fundamentów.</span>
              </span>
            </h1>

            <p className={s.support}>
              Domy jednorodzinne i bliźniaki.
              <br />
              Warszawa i okolice.
            </p>

            <div className={s.actions}>
              <button type="button" className="btn" onClick={open}>
                <span className="dot" aria-hidden="true" />
                Zapytaj o budowę
                <span className="arw" aria-hidden="true">
                  ↗
                </span>
              </button>
              <a className="btn btn--ghost" href="#realizacje">
                Zobacz realizacje
              </a>
            </div>

            <div className={s.trust}>
              <span className={s.stars} aria-hidden="true">
                ★★★★★
              </span>
              <span className={s.trustScore}>5,0</span>
              <span className={s.trustDivider} aria-hidden="true" />
              <span className={s.trustMeta}>
                <b>Google</b>
                <span>Opinie klientów</span>
              </span>
            </div>
          </div>

          <div className={`label ${s.scope}`}>
            <span>Domy jednorodzinne</span>
            <i aria-hidden="true" />
            <span>Bliźniaki</span>
            <i aria-hidden="true" />
            <span>Stan surowy</span>
          </div>
        </div>

        <div className={s.media}>
          <span className={s.dimension} aria-hidden="true" />
          <div className={s.mediaInner}>
            <Image
              src="/assets/realization2.png"
              alt="Dom jednorodzinny w budowie, z pokrytym dachem i rusztowaniem przy ścianie."
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 899px) 100vw, 58vw"
              quality={82}
            />
          </div>
          <p className={s.caption}>
            <i aria-hidden="true" />
            <b>Dom jednorodzinny — budowa</b>
          </p>
        </div>
      </div>
    </section>
  );
}
