import { site } from "@/lib/site";
import s from "./Sections.module.css";

const LINKS = [
  { label: "Co robimy", href: "/#zakres" },
  { label: "Jak pracujemy", href: "/#jak-pracujemy" },
  { label: "Realizacje", href: "/#realizacje" },
  { label: "Kontakt", href: "/#kontakt" },
  { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
];

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className="shell">
        <div className={s.footTop}>
          <div className={s.footBrand}>
            <b>Serhii Anatii Homes</b>
            <p>Budowa domów. Warszawa.</p>
          </div>

          <div className={s.footCol}>
            <span>Kontakt</span>
            <a href={site.phoneHref}>{site.phone}</a>
            <a href={site.emailHref}>{site.email}</a>
          </div>

          <div className={s.footCol}>
            <span>Adres</span>
            <p>
              {site.street}
              <br />
              {site.postalCode} {site.city}
            </p>
          </div>

          <div className={`${s.footCol} ${s.footLinks}`}>
            <span>Strona</span>
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className={s.footBottom}>
          <p>© 2026 Serhii Anatii Homes</p>
          <p>
            Strona wykonana przez <b>Lead Page</b>
          </p>
        </div>
      </div>
    </footer>
  );
}
