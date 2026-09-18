import Image from "next/image";
import SectionHead from "./SectionHead";
import s from "./Sections.module.css";

const DETAILS = [
  {
    cls: "d1",
    label: "Fundament",
    src: "/assets/4.jpg",
    alt: "Ściana fundamentowa z izolacją, przed zasypaniem wykopu.",
    w: 711,
    h: 400,
  },
  {
    cls: "d2",
    label: "Ściana",
    src: "/assets/10.jpg",
    alt: "Murarz układa pustak na zaprawie w budowanej ścianie.",
    w: 599,
    h: 400,
  },
  {
    cls: "d3",
    label: "Strop",
    src: "/assets/5.jpg",
    alt: "Betonowanie stropu na zbrojeniu z siatki stalowej.",
    w: 600,
    h: 400,
  },
  {
    cls: "d4",
    label: "Dach",
    src: "/assets/3.jpg",
    alt: "Wnętrze budowanego domu z drewnianą konstrukcją dachu.",
    w: 733,
    h: 400,
  },
] as const;

export default function Details() {
  return (
    <section className={`${s.section} ${s.sectionDark}`} aria-labelledby="detale-tytul">
      <div className="shell">
        <div className={s.head}>
          <div>
            <div className={s.headNo}>
              <b>05 — Budowa</b>
              <i data-line="" aria-hidden="true" />
            </div>
            <h2 className={s.headTitle} id="detale-tytul" data-reveal="">
              Najpierw
              <br />
              dobra podstawa.
            </h2>
          </div>
          <p className={s.headText} data-reveal="" data-delay="90">
            Najpierw fundamenty. Potem reszta domu.
          </p>
        </div>

        <div className={s.detailGrid}>
          {DETAILS.map((d, i) => (
            <div key={d.label} className={`${s.detailItem} ${s[d.cls]}`}>
              <div className={s.detailFig} data-mask="" data-delay={i * 110}>
                <Image
                  src={d.src}
                  alt={d.alt}
                  width={d.w}
                  height={d.h}
                  loading="lazy"
                  sizes="(max-width: 899px) 50vw, 40vw"
                  quality={80}
                />
              </div>
              <p className={s.detailCap} data-reveal="" data-delay={i * 110 + 160}>
                <i aria-hidden="true" />
                {d.label}
              </p>
            </div>
          ))}
        </div>

        <div className={s.detailNote}>
          <span className="label" data-reveal="">
            Kolejność
          </span>
          <p data-reveal="" data-delay="80">
            Kończymy jeden etap i dopiero wtedy zaczynamy następny.
          </p>
        </div>
      </div>
    </section>
  );
}
