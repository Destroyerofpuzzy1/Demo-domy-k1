"use client";

import Image from "next/image";
import { useState } from "react";
import SectionHead from "./SectionHead";
import s from "./Sections.module.css";

const STEPS = [
  {
    no: "01",
    title: "Sprawdzamy projekt",
    copy: "Wiemy, co trzeba zrobić.",
    focus: { x: 32, y: 36 },
  },
  {
    no: "02",
    title: "Ustalamy zakres",
    copy: "Ustalamy robotę i kolejność.",
    focus: { x: 60, y: 48 },
  },
  {
    no: "03",
    title: "Budujemy",
    copy: "Robimy dom krok po kroku.",
    focus: { x: 46, y: 64 },
  },
  {
    no: "04",
    title: "Sprawdzamy",
    copy: "Kontrolujemy wykonanie.",
    focus: { x: 70, y: 28 },
  },
];

export default function HowWeWork() {
  const [active, setActive] = useState(0);
  const focus = STEPS[active].focus;

  return (
    <section className={s.section} id="jak-pracujemy">
      <div className="shell">
        <SectionHead
          no="04 — Jak pracujemy"
          title={
            <>
              Krok
              <br />
              po kroku.
            </>
          }
          text="Najpierw ustalamy pracę. Potem budujemy."
        />

        <div className={s.workWrap}>
          <div className={s.workMedia} data-mask="">
            <Image
              src="/assets/14.jpg"
              alt="Plac budowy z przygotowanym fundamentem i materiałem przed murowaniem."
              width={1067}
              height={800}
              sizes="(max-width: 979px) 100vw, 46vw"
              quality={86}
              style={{
                transform: `scale(1.07) translate(${(50 - focus.x) * 0.06}%, ${
                  (50 - focus.y) * 0.06
                }%)`,
              }}
            />
            {/* Krzyż wymiarowy wskazuje aktywny krok — jak na rysunku roboczym. */}
            <div className={s.workCross} aria-hidden="true">
              <span className={s.workCrossH} style={{ top: `${focus.y}%` }} />
              <span className={s.workCrossV} style={{ left: `${focus.x}%` }} />
            </div>
          </div>

          <div className={s.workSteps}>
            {STEPS.map((step, i) => (
              <div key={step.no} className={s.workStep} data-open={i === active}>
                <h3 className={s.workStepHead}>
                  <button
                    type="button"
                    aria-expanded={i === active}
                    aria-controls={`krok-${step.no}`}
                    onClick={() => setActive(i)}
                  >
                    <em aria-hidden="true">{step.no}</em>
                    <span>{step.title}</span>
                  </button>
                </h3>
                <div className={s.workStepBody} id={`krok-${step.no}`} role="region">
                  <p>{step.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
