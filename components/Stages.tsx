"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SectionHead from "./SectionHead";
import { prefersReducedMotion } from "./Motion";
import s from "./Sections.module.css";

const STAGES = [
  {
    no: "01",
    name: "Fundamenty",
    copy: "Robimy fundamenty pod dom.",
    src: "/assets/8.jpg",
    alt: "Gotowe ławy i ściany fundamentowe pod dom jednorodzinny.",
  },
  {
    no: "02",
    name: "Ściany",
    copy: "Stawiamy ściany domu.",
    src: "/assets/10.jpg",
    alt: "Murarz układa pustak na zaprawie podczas budowy ściany.",
  },
  {
    no: "03",
    name: "Stropy",
    copy: "Robimy stropy.",
    src: "/assets/1.jpg",
    alt: "Strop betonowy podparty stemplami na budowie domu.",
  },
  {
    no: "04",
    name: "Dach",
    copy: "Robimy konstrukcję dachu.",
    src: "/assets/9.jpg",
    alt: "Drewniana więźba dachowa domu jednorodzinnego.",
  },
  {
    no: "05",
    name: "Stan surowy",
    copy: "Dom ma ściany i dach.",
    src: "/assets/realization3.png",
    alt: "Dom w stanie surowym z murowanymi ścianami i gotowym dachem.",
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

    const tl = gsap.timeline();
    tl.set(outgoing, { zIndex: 1, autoAlpha: 1 })
      .set(incoming, { zIndex: 2, autoAlpha: 1, clipPath: hidden })
      .fromTo(
        incoming.querySelector("img"),
        { scale: 1.06 },
        { scale: 1, duration: 1.15, ease: "power2.out" },
        0,
      )
      .to(incoming, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.95, ease: "power3.inOut" }, 0);

    if (wipeRef.current) {
      tl.set(wipeRef.current, { opacity: 1, left: forward ? "100%" : "0%" }, 0)
        .to(
          wipeRef.current,
          { left: forward ? "0%" : "100%", duration: 0.95, ease: "power3.inOut" },
          0,
        )
        .to(wipeRef.current, { opacity: 0, duration: 0.2 }, 0.9);
    }

    tl.set(outgoing, { autoAlpha: 0, zIndex: 0 });

    return () => {
      tl.kill();
    };
  }, [active]);

  const current = STAGES[active];

  return (
    <section className={s.section} id="etapy">
      <div className="shell">
        <SectionHead
          no="01 — Etapy"
          title={
            <>
              Etapy
              <br />
              budowy.
            </>
          }
          text="Od fundamentów do dachu."
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
                  sizes="(max-width: 979px) 100vw, 55vw"
                  quality={80}
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
