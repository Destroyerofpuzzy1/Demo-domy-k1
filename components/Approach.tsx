import { site } from "@/lib/site";
import s from "./Sections.module.css";

export default function Approach() {
  return (
    <section className={`${s.section} ${s.approach}`} aria-labelledby="o-firmie-tytul">
      <div className="shell">
        <div className={s.headNo}>
          <b>06 — O firmie</b>
          <i data-line="" aria-hidden="true" />
        </div>

        <div className={s.approachGrid}>
          <h2 className={s.headTitle} id="o-firmie-tytul" data-reveal="">
            Budujemy
            <br />
            domy.
          </h2>
          <p className={s.headText} data-reveal="" data-delay="80">
            {site.name} działa w Warszawie i okolicy.
            <br />
            Budujemy domy jednorodzinne i bliźniaki.
          </p>
        </div>
      </div>
    </section>
  );
}
