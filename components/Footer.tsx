import { site } from "@/lib/site";
import s from "./Sections.module.css";

const LINKS = [
  { label: "Realizacje", href: "/#realizacje" },
  { label: "Zakres", href: "/#zakres" },
  { label: "Opinie", href: "/#opinie" },
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
            <a href={site.mapsUrl} target="_blank" rel="noreferrer noopener">
              Google Maps ↗
            </a>
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
            Strona przygotowana przez <b>Lead Page</b>
          </p>
        </div>
      </div>
    </footer>
  );
}
