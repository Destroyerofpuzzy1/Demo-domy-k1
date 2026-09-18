"use client";

import Image from "next/image";
import { site } from "@/lib/site";
import { useContactModal } from "./ContactModal";
import s from "./Sections.module.css";

export default function ContactCta() {
  const { open } = useContactModal();

  return (
    <section className={s.cta} id="kontakt">
      <div className={s.ctaMedia} aria-hidden="true">
        <Image
          src="/assets/realization.png"
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          quality={72}
        />
      </div>

      <div className={`shell ${s.ctaInner}`}>
        <div className={s.headNo}>
          <b>07 — Kontakt</b>
          <i data-line="" aria-hidden="true" />
        </div>

        <h2 className={s.ctaTitle} data-reveal="">
          Chcesz
          <br />
          budować dom?
        </h2>

        <p className={s.ctaText} data-reveal="" data-delay="80">
          Zadzwoń albo napisz.
          <br />
          Powiedz, co chcesz zbudować.
        </p>

        <div className={s.ctaActions} data-reveal="" data-delay="150">
          <button type="button" className="btn btn--onDark" onClick={open}>
            <span className="dot" aria-hidden="true" />
            Zapytaj o budowę
            <span className="arw" aria-hidden="true">
              ↗
            </span>
          </button>
          <a className="btn btn--ghostOnDark" href={site.phoneHref}>
            {site.phoneDisplay}
          </a>
        </div>

        <div className={s.ctaDetails}>
          <div className={s.ctaDetail}>
            <span>Telefon</span>
            <a href={site.phoneHref}>{site.phone}</a>
          </div>
          <div className={s.ctaDetail}>
            <span>E-mail</span>
            <a href={site.emailHref}>{site.email}</a>
          </div>
          <div className={s.ctaDetail}>
            <span>Adres</span>
            <p>
              {site.name}
              <br />
              {site.street}
              <br />
              {site.postalCode} {site.city}
            </p>
            <a
              className={s.mapLink}
              href={site.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Otwórz w Google Maps
              <span className="arw" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
