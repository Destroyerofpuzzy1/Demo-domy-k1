"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SectionHead from "./SectionHead";
import { prefersReducedMotion } from "./Motion";
import s from "./Sections.module.css";

/* Prawdziwe zdjęcia z jednej budowy, w kolejności powstawania domu. */
const STAGES = [
  {
    no: "01",
    name: "Fundament",
    copy: "Zaczynamy od podstaw.",
    src: "/assets/13.jpg",
    alt: "Przygotowany podkład z piasku i szalunek pod płytę fundamentową.",
  },
  {
    no: "02",
    name: "Zbrojenie",
    copy: "Układamy zbrojenie.",
    src: "/assets/15.jpg",
    alt: "Siatka zbrojeniowa i niebieskie rury ułożone przed wylaniem betonu.",
  },
  {
    no: "03",
    name: "Beton",
    copy: "Wylewamy płytę.",
    src: "/assets/16.jpg",
    alt: "Świeżo wylana płyta betonowa na przygotowanym fundamencie.",
  },
  {
    no: "04",
    name: "Ściany",
    copy: "Murujemy ściany.",
    src: "/assets/19.jpg",
    alt: "Wymurowane ściany domu z pustaków ceramicznych, widok z góry.",
  },
  {
    no: "05",
    name: "Strop",
    copy: "Robimy kolejny poziom.",
    src: "/assets/18.jpg",
    alt: "Drewniane belki stropowe ułożone na ścianach budowanego domu.",
  },
];

export default function Stages() {
  const [active, setActive] = useState(0);
  const prev = useRef(0);
  const mediaRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wipeRef = useRef<HTMLSpanElement>(null);

  // Odsłonięcie nowego zdjęcia maską przesuwającą się w poziomie.
  // useLayoutEffect: warstwa startuje zasłonięta jeszcze przed malowaniem klatki.
  useLayoutEffect(() => {
    if (active === prev.current) return;
    const from = prev.current;
    prev.current = active;

    const incoming = layerRefs.current[active];
    const outgoing = layerRefs.current[from];
    if (!incoming || !outgoing) return;

    if (prefersReducedMotion()) {
      gsap.set(layerRefs.current, { autoAlpha: 0, zIndex: 0 });
      gsap.set(incoming, { autoAlpha: 1, zIndex: 2, clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    const forward = active > from;
    const hidden = forward ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)";
    const D = 0.8;

    const tl = gsap.timeline();
    tl.set(outgoing, { zIndex: 1, autoAlpha: 1 })
      .set(incoming, { zIndex: 2, autoAlpha: 1, clipPath: hidden })
      // Stare zdjęcie delikatnie odpływa: minimalne powiększenie, lekkie rozmycie.
      .to(
        outgoing.querySelector("img"),
        { scale: 1.015, filter: "blur(3px)", duration: D, ease: "power2.inOut" },
        0,
      )
      // Nowe wjeżdża spod maski i osiada.
      .fromTo(
        incoming.querySelector("img"),
        { scale: 1.025, filter: "blur(0px)" },
        { scale: 1, duration: D * 1.35, ease: "power2.out" },
        0,
      )
      .to(incoming, { clipPath: "inset(0% 0% 0% 0%)", duration: D, ease: "power3.inOut" }, 0);

    if (wipeRef.current) {
      tl.set(wipeRef.current, { opacity: 1, left: forward ? "100%" : "0%" }, 0)
        .to(wipeRef.current, { left: forward ? "0%" : "100%", duration: D, ease: "power3.inOut" }, 0)
        .to(wipeRef.current, { opacity: 0, duration: 0.18 }, D - 0.06);
    }

    tl.set(outgoing, { autoAlpha: 0, zIndex: 0 }).set(outgoing.querySelector("img"), {
      scale: 1,
      filter: "blur(0px)",
    });

    return () => {
      tl.kill();
    };
  }, [active]);

  const current = STAGES[active];

  return (
    <section className={s.section} id="etapy">
      <div className="shell">
        <SectionHead
          no="01 — Budowa"
          title={
            <>
              Tak powstaje
              <br />
              dom.
            </>
          }
          text="Od fundamentów do ścian i stropu. Zdjęcia z naszej budowy."
        />

        <div className={s.stages}>
          <div className={s.stageMedia} ref={mediaRef} data-mask="">
            {STAGES.map((stage, i) => (
              <div
                key={stage.no}
                className={s.stageLayer}
                ref={(el) => {
                  layerRefs.current[i] = el;
                }}
                // Stan startowy; dalej widocznością warstw steruje już GSAP.
                style={{
                  zIndex: i === 0 ? 2 : 0,
                  visibility: i === 0 ? "visible" : "hidden",
                  opacity: i === 0 ? 1 : 0,
                }}
                aria-hidden={i !== active}
              >
                <Image
                  src={stage.src}
                  alt={stage.alt}
                  fill
                  sizes="(max-width: 979px) 100vw, 56vw"
                  quality={84}
                />
              </div>
            ))}
            <span className={s.stageWipe} ref={wipeRef} aria-hidden="true" />
            <p className={s.stageBadge}>
              <em>{current.no}</em>
              {current.name}
            </p>
          </div>

          <div>
            <div className={s.stageList} role="tablist" aria-label="Etapy budowy">
              {STAGES.map((stage, i) => (
                <button
                  key={stage.no}
                  type="button"
                  role="tab"
                  id={`etap-${stage.no}`}
                  aria-selected={i === active}
                  aria-controls="etap-opis"
                  tabIndex={i === active ? 0 : -1}
                  className={s.stageBtn}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                      e.preventDefault();
                      setActive((v) => (v + 1) % STAGES.length);
                    }
                    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                      e.preventDefault();
                      setActive((v) => (v - 1 + STAGES.length) % STAGES.length);
                    }
                  }}
                >
                  <em>{stage.no}</em>
                  <span className={s.stageName}>{stage.name}</span>
                  <span className={s.stageArrow} aria-hidden="true">
                    ↗
                  </span>
                </button>
              ))}
            </div>

            <div
              className={s.stageCopy}
              id="etap-opis"
              role="tabpanel"
              aria-labelledby={`etap-${current.no}`}
            >
              <h3>
                Etap {current.no} — {current.name}
              </h3>
              <p>{current.copy}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
