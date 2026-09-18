import Image from "next/image";
import s from "./Sections.module.css";

/* Prawdziwe zdjęcia z placu budowy. Podpisy mówią wprost, co widać. */
const SHOTS = [
  {
    cls: "d1",
    label: "Ściany",
    src: "/assets/19.jpg",
    alt: "Wymurowane ściany domu z pustaków ceramicznych, widok z góry.",
    w: 600,
    h: 800,
  },
  {
    cls: "d2",
    label: "Płyta",
    src: "/assets/16.jpg",
    alt: "Świeżo wylana płyta betonowa na przygotowanym fundamencie.",
    w: 1067,
    h: 800,
  },
  {
    cls: "d3",
    label: "Zbrojenie",
    src: "/assets/15.jpg",
    alt: "Siatka zbrojeniowa i rury ułożone przed wylaniem betonu.",
    w: 1067,
    h: 800,
  },
  {
    cls: "d4",
    label: "Strop",
    src: "/assets/17.jpg",
    alt: "Belki drewniane oparte na murowanej ścianie budowanego domu.",
    w: 600,
    h: 800,
  },
] as const;

export default function Details() {
  return (
    <section className={`${s.section} ${s.sectionDark}`} aria-labelledby="na-budowie-tytul">
      <div className="shell">
        <div className={s.head}>
          <div>
            <div className={s.headNo}>
              <b>06 — Na budowie</b>
              <i data-line="" aria-hidden="true" />
            </div>
            <h2 className={s.headTitle} id="na-budowie-tytul" data-reveal="">
              Na budowie.
            </h2>
          </div>
          <p className={s.headText} data-reveal="" data-delay="90">
            Zdjęcia z placu budowy. Bez upiększania.
          </p>
        </div>

        <div className={s.detailGrid}>
          {SHOTS.map((d, i) => (
            <div key={d.label} className={`${s.detailItem} ${s[d.cls]}`}>
              <div className={s.detailFig} data-mask="" data-delay={i * 110}>
                <Image
                  src={d.src}
                  alt={d.alt}
                  width={d.w}
                  height={d.h}
                  loading="lazy"
                  sizes="(max-width: 899px) 50vw, 46vw"
                  quality={82}
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
