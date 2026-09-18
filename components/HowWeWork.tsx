"use client";

import Image from "next/image";
import { useState } from "react";
import SectionHead from "./SectionHead";
import s from "./Sections.module.css";

const STEPS = [
  {
    no: "01",
    title: "Sprawdzamy projekt",
    copy: "Patrzymy, co jest do zrobienia.",
    focus: { x: 32, y: 36 },
  },
  {
    no: "02",
    title: "Ustalamy prace",
    copy: "Ustalamy zakres i kolejność.",
    focus: { x: 60, y: 48 },
  },
  {
    no: "03",
    title: "Budujemy",
    copy: "Robimy kolejne etapy domu.",
    focus: { x: 46, y: 64 },
  },
  {
    no: "04",
    title: "Sprawdzamy",
    copy: "Na końcu sprawdzamy wykonanie.",
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
          no="03 — Jak pracujemy"
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
              src="/assets/realization.png"
              alt="Dom jednorodzinny w budowie, z gotową konstrukcją dachu."
              width={1539}
              height={1022}
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
