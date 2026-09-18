import s from "./Sections.module.css";

const ITEMS = ["Domy jednorodzinne", "Bliźniaki", "Stan surowy", "Warszawa i okolice"];

export default function TrustStrip() {
  return (
    <section className={s.strip} aria-label="Zakres i miejsce pracy">
      <div className="shell">
        <ul className={s.stripRow}>
          {ITEMS.map((item, i) => (
            <li className={s.stripItem} key={item} data-reveal="" data-delay={i * 60}>
              <i aria-hidden="true" />
              <b>{item}</b>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
