"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { useContactModal } from "./ContactModal";
import s from "./Header.module.css";

export default function Header() {
  const [stuck, setStuck] = useState(false);
  const [menu, setMenu] = useState(false);
  const { open } = useContactModal();

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menu) return;
    document.body.dataset.locked = "true";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey);
    return () => {
      delete document.body.dataset.locked;
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  return (
    <>
      <header className={s.header} data-stuck={stuck || menu}>
        <div className={`shell ${s.inner}`}>
          <a href="/" className={s.mark} aria-label="Serhii Anatii Homes — strona główna">
            <i>Serhii Anatii</i>
            <b>Homes</b>
          </a>

          <nav className={s.nav} aria-label="Nawigacja główna">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className={s.actions}>
            <a className={s.phone} href={site.phoneHref}>
              {site.phoneDisplay}
            </a>
            <button type="button" className={`btn ${s.cta}`} onClick={open}>
              <span className="dot" aria-hidden="true" />
              Zapytaj<span className={s.ctaLong}>&nbsp;o budowę</span>
              <span className="arw" aria-hidden="true">
                ↗
              </span>
            </button>
            <button
              type="button"
              className={s.menuBtn}
              aria-expanded={menu}
              aria-controls="menu-mobilne"
              aria-label={menu ? "Zamknij menu" : "Otwórz menu"}
              onClick={() => setMenu((v) => !v)}
            >
              <i aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div className={s.sheet} id="menu-mobilne" data-open={menu} aria-hidden={!menu}>
        <nav className={s.sheetNav} aria-label="Nawigacja mobilna">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenu(false)}
              tabIndex={menu ? 0 : -1}
            >
              <em aria-hidden="true">{String(i + 1).padStart(2, "0")}</em>
              {item.label}
            </a>
          ))}
        </nav>
        <div className={s.sheetFoot}>
          <a data-line-item="" href={site.phoneHref} tabIndex={menu ? 0 : -1}>
            <span>Telefon</span>
            {site.phoneDisplay}
          </a>
          <a data-line-item="" href={site.emailHref} tabIndex={menu ? 0 : -1}>
            <span>E-mail</span>
            {site.email}
          </a>
        </div>
      </div>
    </>
  );
}
