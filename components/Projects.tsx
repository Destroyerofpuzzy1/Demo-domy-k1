import Image from "next/image";
import SectionHead from "./SectionHead";
import s from "./Sections.module.css";

/* Mieszanka: gotowy dom, prawdziwe zdjęcia z budowy, detal.
   Podpisy mówią wprost, co widać — bez nazw projektów, których nie da się potwierdzić. */
const PROJECTS = [
  {
    no: "01",
    name: "Dom jednorodzinny",
    copy: "Ściany i dach gotowe.",
    src: "/assets/realization2.png",
    alt: "Dom jednorodzinny w budowie, z pokrytym dachem i rusztowaniem przy ścianie.",
    cls: "pWide",
  },
  {
    no: "02",
    name: "Ściany",
    copy: "Murowane ściany domu.",
    src: "/assets/19.jpg",
    alt: "Wymurowane ściany domu z pustaków ceramicznych, widok z góry.",
    cls: "pTall",
  },
  {
    no: "03",
    name: "Fundament",
    copy: "Płyta pod dom.",
    src: "/assets/16.jpg",
    alt: "Świeżo wylana płyta betonowa na przygotowanym fundamencie.",
    cls: "pStd",
  },
  {
    no: "04",
    name: "Stan surowy",
    copy: "Dom ma ściany i dach.",
    src: "/assets/realization3.png",
    alt: "Dom w stanie surowym z murowanymi ścianami i gotowym dachem.",
    cls: "pStd",
  },
  {
    no: "05",
    name: "Strop",
    copy: "Belki na ścianach.",
    src: "/assets/18.jpg",
    alt: "Drewniane belki stropowe ułożone na ścianach budowanego domu.",
    cls: "pTall",
  },
  {
    no: "06",
    name: "Komin",
    copy: "Komin nad dachem.",
    src: "/assets/12.jpg",
    alt: "Murowane kominy nad dachem domu.",
    cls: "pStd",
  },
] as const;

export default function Projects() {
  return (
    <section className={s.section} id="realizacje">
      <div className="shell">
        <SectionHead
          no="05 — Realizacje"
          title={
            <>
              Zobacz,
              <br />
              co robimy.
            </>
          }
          text="Nasze budowy i etapy prac."
        />

        <div className={s.projects}>
          {PROJECTS.map((p, i) => (
            <article key={p.no} className={`${s.project} ${s[p.cls]}`}>
              <div className={s.projectMedia} data-mask="" data-delay={(i % 3) * 90}>
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 40vw"
                  quality={82}
                />
              </div>
              <div className={s.projectMeta} data-reveal="" data-delay={(i % 3) * 90 + 120}>
                <span className={s.projectNo}>{p.no}</span>
                <h3 className={s.projectName}>{p.name}</h3>
                <p className={s.projectCopy}>{p.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
