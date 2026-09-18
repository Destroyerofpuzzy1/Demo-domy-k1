import Image from "next/image";
import SectionHead from "./SectionHead";
import s from "./Sections.module.css";

/* Podpisy mówią wprost, co widać na zdjęciu.
   Nie nadajemy zdjęciom nazw projektów, których nie da się potwierdzić. */
const PROJECTS = [
  {
    no: "01",
    name: "Dom jednorodzinny",
    copy: "Ściany i dach gotowe.",
    src: "/assets/realization2.png",
    alt: "Dom jednorodzinny w budowie, z pokrytym dachem i rusztowaniem przy ścianie.",
  },
  {
    no: "02",
    name: "Stan surowy",
    copy: "Dom ma ściany i dach.",
    src: "/assets/realization3.png",
    alt: "Dom w stanie surowym z murowanymi ścianami i gotowym dachem.",
  },
  {
    no: "03",
    name: "Fundamenty",
    copy: "Fundamenty pod dom.",
    src: "/assets/8.jpg",
    alt: "Gotowe ławy i ściany fundamentowe pod dom jednorodzinny.",
  },
  {
    no: "04",
    name: "Ściany",
    copy: "Ściany w środku domu.",
    src: "/assets/2.jpg",
    alt: "Murowane ściany działowe w środku budowanego domu.",
  },
  {
    no: "05",
    name: "Strop",
    copy: "Strop między piętrami.",
    src: "/assets/1.jpg",
    alt: "Strop betonowy podparty stemplami na budowie domu.",
  },
  {
    no: "06",
    name: "Komin",
    copy: "Komin nad dachem.",
    src: "/assets/12.jpg",
    alt: "Murowane kominy nad dachem domu.",
  },
];

export default function Projects() {
  return (
    <section className={s.section} id="realizacje">
      <div className="shell">
        <SectionHead
          no="04 — Realizacje"
          title={
            <>
              Zobacz,
              <br />
              co robimy.
            </>
          }
          text="Kilka przykładów naszych prac."
        />

        <div className={s.projects}>
          {PROJECTS.map((p, i) => (
            <article key={p.no} className={s.project}>
              <div className={s.projectMedia} data-mask="" data-delay={(i % 3) * 90}>
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 32vw"
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
