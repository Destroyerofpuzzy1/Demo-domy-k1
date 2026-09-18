"use client";

import Image from "next/image";
import { useState } from "react";
import SectionHead from "./SectionHead";
import s from "./Sections.module.css";

const SERVICES = [
  {
    name: "Fundamenty",
    copy: "Robimy fundamenty pod dom.",
    src: "/assets/8.jpg",
    alt: "Gotowe ławy i ściany fundamentowe pod dom jednorodzinny.",
  },
  {
    name: "Ściany",
    copy: "Stawiamy ściany domu.",
    src: "/assets/10.jpg",
    alt: "Murarz układa pustak na zaprawie podczas budowy ściany.",
  },
  {
    name: "Stropy",
    copy: "Robimy stropy.",
    src: "/assets/1.jpg",
    alt: "Strop betonowy podparty stemplami na budowie domu.",
  },
  {
    name: "Schody",
    copy: "Robimy schody betonowe.",
    src: "/assets/5.jpg",
    alt: "Betonowanie elementu żelbetowego na zbrojeniu z siatki stalowej.",
  },
  {
    name: "Kominy",
    copy: "Budujemy kominy.",
    src: "/assets/12.jpg",
    alt: "Dwa murowane kominy nad dachem domu.",
  },
  {
    name: "Dach",
    copy: "Robimy konstrukcję dachu.",
    src: "/assets/9.jpg",
    alt: "Drewniana więźba dachowa domu jednorodzinnego.",
  },
];

export default function WhatWeBuild() {
  const [active, setActive] = useState(0);

  return (
    <section className={s.section} id="zakres">
      <div className="shell">
        <SectionHead
          no="02 — Zakres"
          title="Co robimy."
          text="Robimy całość albo pojedyncze etapy."
        />

        <div className={s.buildWrap}>
          <ul className={s.buildList}>
            {SERVICES.map((item, i) => (
              <li key={item.name} data-reveal="" data-delay={i * 40}>
                <button
                  type="button"
                  className={s.buildRow}
                  data-active={i === active}
                  aria-pressed={i === active}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <em aria-hidden="true">{String(i + 1).padStart(2, "0")}</em>
                  <span className={s.buildText}>
                    <b>{item.name}</b>
                    <i>{item.copy}</i>
                  </span>
                  <span data-arrow="" aria-hidden="true">
                    ↗
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Jeden stały kadr podglądu — zdjęcia nie gonią za kursorem. */}
          <div className={s.buildMedia} aria-hidden="true">
            {SERVICES.map((item, i) => (
              <div
                key={item.name}
                className={s.buildMediaLayer}
                style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 979px) 100vw, 34vw"
                  quality={78}
                />
              </div>
            ))}
            <p className={s.buildMediaLabel}>{SERVICES[active].name}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
