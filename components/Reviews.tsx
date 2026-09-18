import { site } from "@/lib/site";
import s from "./Sections.module.css";

/* ------------------------------------------------------------------
 * PRAWDZIWE OPINIE Z WIZYTÓWKI GOOGLE.
 * Treść i imiona przepisane 1:1 ze zrzutów dostarczonych przez klienta.
 * Nie skracamy, nie parafrazujemy i nie dopisujemy nowych opinii.
 * Nie podajemy łącznej liczby opinii — nie została potwierdzona.
 * ------------------------------------------------------------------ */
const REVIEWS = [
  {
    name: "Tetiana Platon",
    text: "Jesteśmy bardzo zadowoleni ze współpracy z Serhii Anatii Homes. Od początku wszystko przebiegało sprawnie i zgodnie z ustaleniami. Ekipa była punktualna, dokładna i zawsze chętnie odpowiadała na nasze pytania. Dom został wykonany bardzo solidnie. Z czystym sumieniem polecamy tę firmę każdemu, kto planuje budowę domu.",
  },
  {
    name: "Yana Slipchenko",
    text: "Z pełnym przekonaniem polecam tą firmę. Od pierwszego kontaktu aż do zakończenia budowy wszystko przebiegało sprawnie i profesjonalnie. Pracowniki byli pomocni, terminowi i chętnie odpowiadali na wszystkie pytania. Jakość wykonania domu jest na bardzo wysokim poziomie, a wszystkie prace zostały zrealizowane zgodnie z ustaleniami i w wyznaczonym terminie. Widać, że firma stawia na solidność i dbałość o szczegóły. Jestem bardzo zadowolona z efektu końcowego i z czystym sumieniem mogę polecić ich usługi każdemu, kto planuje budowę domu jednorodzinnego.",
  },
  {
    name: "Vadym Platon",
    text: "Pełen profesjonalizm od początku do końca. Serhii Anatii Homes to firma, której naprawdę można zaufać. Wszystkie prace zostały wykonane starannie i na czas, a jakość wykonania jest bardzo wysoka. Widać, że znają się na swojej pracy. Jesteśmy bardzo zadowoleni z efektu i na pewno polecimy ich znajomym.",
  },
  {
    name: "Viktoriia Tymokhina",
    text: "Serdecznie polecam firmę Serhii Anatii Homes! Profesjonalne podejście do klienta, wysoka jakość wykonania i dbałość o każdy szczegół. Wszystko zostało wykonane solidnie i zgodnie z ustaleniami. Widać duże doświadczenie, zaangażowanie i odpowiedzialność. Jestem bardzo zadowolona ze współpracy i z pełnym przekonaniem mogę polecić tę firmę każdemu, kto szuka rzetelnej i profesjonalnej ekipy do budowy domu. Dziękuję za świetną pracę!",
  },
  {
    name: "Borys Sanchuk",
    text: "Bardzo dobra ekipa, szybko, solidnie i profesjonalnie",
  },
  {
    name: "Valentin Simerchuk",
    text: "Firma jest po prostu świetna. Polecam ją wszystkim.",
  },
  {
    name: "Oleksandr Kulish",
    text: "Budują szybko i sprawnie",
  },
];

function Stars() {
  return (
    <span className={s.revStars} aria-hidden="true">
      ★★★★★
    </span>
  );
}

function Card({ r }: { r: { name: string; text: string } }) {
  return (
    <figure className={s.revCard}>
      <Stars />
      <blockquote>{r.text}</blockquote>
      <figcaption>
        {r.name}
        <span>Opinia w Google</span>
      </figcaption>
    </figure>
  );
}

/* Taśma jedzie samą animacją CSS — bez JS-a, bez stanu i bez handlerów.
   Dwie identyczne grupy kart; przesunięcie o -50% szerokości toru to dokładnie
   jedna grupa, więc powrót pętli jest niewidoczny. Odstęp siedzi w marginesie
   karty (nie w gap), dzięki czemu tor ma równo dwukrotność szerokości grupy. */
export default function Reviews() {
  return (
    <section className={`${s.section} ${s.reviews}`} id="opinie" aria-labelledby="opinie-tytul">
      <div className="shell">
        <div className={s.headNo}>
          <b>07 — Opinie</b>
          <i data-line="" aria-hidden="true" />
        </div>

        <h2 className={`${s.headTitle} ${s.revTitle}`} id="opinie-tytul" data-reveal="">
          Co mówią{" "}
          <br />
          nasi klienci.
        </h2>

        <div className={s.revTop}>
          <div className={s.revScore} data-reveal="">
            <Stars />
            <strong>{site.rating}</strong>
            <span>
              Google
              <br />
              Opinie klientów
            </span>
          </div>
        </div>
      </div>

      <div className={s.revRail}>
        <div className={s.revTrack}>
          <div className={s.revGroup}>
            {REVIEWS.map((r) => (
              <Card key={r.name} r={r} />
            ))}
          </div>
          {/* Kopia tylko dla płynnej pętli — czytniki ekranu ją pomijają. */}
          <div className={s.revGroup} aria-hidden="true">
            {REVIEWS.map((r) => (
              <Card key={`dup-${r.name}`} r={r} />
            ))}
          </div>
        </div>
      </div>

      <div className="shell">
        <a
          className={`btn btn--ghost ${s.revLink}`}
          href={site.mapsUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          Zobacz opinie w Google
          <span className="arw" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}
