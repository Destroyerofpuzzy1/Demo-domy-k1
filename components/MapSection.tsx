import { site } from "@/lib/site";
import s from "./Sections.module.css";

export default function MapSection() {
  return (
    <section className={s.section} id="lokalizacja" aria-labelledby="mapa-tytul">
      <div className="shell">
        <div className={s.headNo}>
          <b>08 — Lokalizacja</b>
          <i data-line="" aria-hidden="true" />
        </div>

        <div className={s.mapWrap}>
          <div className={s.mapFrame} data-reveal="">
            <iframe
              src={site.mapsEmbedUrl}
              title="Mapa — Serhii Anatii Homes, Instalatorów 7/164, Warszawa"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className={s.mapInfo}>
            <h2 className={s.mapTitle} id="mapa-tytul" data-reveal="">
              Gdzie
              <br />
              nas znaleźć.
            </h2>

            <dl className={s.mapList} data-reveal="" data-delay="80">
              <div>
                <dt>Firma</dt>
                <dd>{site.name}</dd>
              </div>
              <div>
                <dt>Adres</dt>
                <dd>
                  {site.street}
                  <br />
                  {site.postalCode} {site.city}
                </dd>
              </div>
              <div>
                <dt>Telefon</dt>
                <dd>
                  <a href={site.phoneHref}>{site.phoneDisplay}</a>
                </dd>
              </div>
              <div>
                <dt>E-mail</dt>
                <dd>
                  <a href={site.emailHref}>{site.email}</a>
                </dd>
              </div>
              <div>
                <dt>Obszar</dt>
                <dd>{site.area}</dd>
              </div>
            </dl>

            <div className={s.mapRating} data-reveal="" data-delay="120">
              <span aria-hidden="true">★★★★★</span>
              <strong>{site.rating}</strong>
              <span>Google</span>
            </div>

            <div className={s.mapActions} data-reveal="" data-delay="160">
              <a
                className="btn"
                href={site.mapsUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className="dot" aria-hidden="true" />
                Otwórz w Google Maps
                <span className="arw" aria-hidden="true">
                  ↗
                </span>
              </a>
              <a className="btn btn--ghost" href={site.phoneHref}>
                Zadzwoń
                <span className="arw" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
