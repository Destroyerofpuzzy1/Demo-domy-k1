"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Lenis + ScrollTrigger. Pojedyncze źródło prawdy dla scrolla.
 * Przy prefers-reduced-motion smooth scroll jest wyłączony.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Kotwice w nawigacji jadą przez Lenis, żeby nie było przeskoku.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -72 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}

/**
 * Ujawnianie elementów przy wejściu w viewport — jedna obserwacja dla całej strony.
 *
 * Uwaga: stan startowy [data-mask] (clip-path) i [data-line] (scaleX(0)) zeruje
 * pole elementu, a IntersectionObserver liczy przecięcie na przyciętym prostokącie —
 * taki element nigdy nie zgłosiłby wejścia w viewport. Dlatego obserwujemy rodzica,
 * który zaczyna się w tym samym miejscu, a klasę dodajemy właściwemu elementowi.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal], [data-mask], [data-line]"),
    );

    if (prefersReducedMotion()) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }

    const collapses = (el: HTMLElement) =>
      el.hasAttribute("data-mask") || el.hasAttribute("data-line");

    const groups = new Map<Element, HTMLElement[]>();
    nodes.forEach((el) => {
      const target = collapses(el) ? (el.parentElement ?? el) : el;
      const list = groups.get(target);
      if (list) list.push(el);
      else groups.set(target, [el]);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const list = groups.get(entry.target);
          if (!list) return;
          list.forEach((el) => {
            const delay = Number(el.dataset.delay ?? 0);
            window.setTimeout(() => el.classList.add("is-in"), delay);
          });
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.04 },
    );

    groups.forEach((_, target) => io.observe(target));
    return () => io.disconnect();
  }, []);
}

/** Delikatna głębia obrazu przy scrollu — maksymalnie kilka procent. */
export function useImageDepth(selector: string, amount = 6) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const els = gsap.utils.toArray<HTMLElement>(selector);
    const tweens = els.map((el) =>
      gsap.fromTo(
        el,
        { yPercent: -amount / 2 },
        {
          yPercent: amount / 2,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      ),
    );
    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, [selector, amount]);
}
