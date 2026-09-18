import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Zasady przetwarzania danych osobowych przez Serhii Anatii Homes — kto jest administratorem, jakie dane otrzymujemy i jakie prawa przysługują użytkownikom.",
  alternates: { canonical: "/polityka-prywatnosci" },
  robots: { index: true, follow: true },
};

function Block({
  no,
  title,
  children,
}: {
  no: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={s.block}>
      <h2>
        <em>{no}</em>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function PrivacyPolicy() {
  return (
    <>
      <main className={s.page}>
        <div className="shell">
          <Link href="/" className={s.back}>
            <span className="arw" aria-hidden="true">
              ←
            </span>
            Wróć do strony
          </Link>

          <h1 className={s.title}>
            Polityka
            <br />
            prywatności.
          </h1>

          <div className={s.meta}>
            <p className="label">Serhii Anatii Homes</p>
            <p className="label">Ostatnia aktualizacja: {site.privacyUpdated}</p>
          </div>

          <div className={s.body}>
            <Block no="01" title="Administrator danych">
              <p>
                Administratorem danych osobowych przekazanych przez tę stronę jest
                Serhii Anatii Homes, {site.street}, {site.postalCode} {site.city}.
              </p>
              <p>
                W sprawach dotyczących danych osobowych można kontaktować się
                e-mailem: <a href={site.emailHref}>{site.email}</a> albo telefonicznie:{" "}
                <a href={site.phoneHref}>{site.phone}</a>.
              </p>
            </Block>

            <Block no="02" title="Jakie dane możemy otrzymać">
              <p>
                Zakres danych zależy od tego, w jaki sposób się z nami kontaktujesz.
                Możemy otrzymać:
              </p>
              <ul>
                <li>imię lub nazwę, którą podajesz,</li>
                <li>numer telefonu,</li>
                <li>adres e-mail,</li>
                <li>informacje zawarte w treści wiadomości,</li>
                <li>informacje o planowanej budowie i zakresie prac,</li>
                <li>
                  dane techniczne niezbędne do bezpiecznego działania strony, przetwarzane
                  przez dostawcę hostingu (na przykład adres IP w logach serwera).
                </li>
              </ul>
              <p>
                Nie prosimy o dane wrażliwe. Prosimy, żeby nie przesyłać ich w treści
                zapytania.
              </p>
            </Block>

            <Block no="03" title="Po co wykorzystujemy dane">
              <p>Dane wykorzystujemy po to, aby:</p>
              <ul>
                <li>odpowiedzieć na zapytanie,</li>
                <li>przygotować kontakt w sprawie prac budowlanych i ustalić ich zakres,</li>
                <li>prowadzić dalszą korespondencję w tej samej sprawie,</li>
                <li>chronić stronę przed nadużyciami i zapewnić jej bezpieczne działanie,</li>
                <li>wypełnić obowiązki wynikające z przepisów, jeśli takie wystąpią.</li>
              </ul>
              <p>Nie wykorzystujemy danych do profilowania ani do zautomatyzowanego podejmowania decyzji.</p>
            </Block>

            <Block no="04" title="Podstawa przetwarzania">
              <p>Podstawa prawna zależy od sytuacji:</p>
              <ul>
                <li>
                  art. 6 ust. 1 lit. b RODO — działania podejmowane na Twoje żądanie przed
                  zawarciem umowy oraz wykonanie umowy, jeśli do niej dojdzie,
                </li>
                <li>
                  art. 6 ust. 1 lit. f RODO — nasz prawnie uzasadniony interes polegający na
                  prowadzeniu komunikacji, obsłudze korespondencji, zapewnieniu bezpieczeństwa
                  strony oraz ewentualnym ustaleniu lub dochodzeniu roszczeń,
                </li>
                <li>
                  art. 6 ust. 1 lit. c RODO — wypełnienie obowiązku prawnego, jeżeli przepisy
                  nakładają na nas taki obowiązek,
                </li>
                <li>
                  art. 6 ust. 1 lit. a RODO — zgoda, ale wyłącznie tam, gdzie konkretna funkcja
                  faktycznie tego wymaga.
                </li>
              </ul>
              <p>
                Zgoda nie jest podstawą przetwarzania dla zwykłej odpowiedzi na zapytanie —
                w tym zakresie opieramy się na podstawach wskazanych powyżej.
              </p>
            </Block>

            <Block no="05" title="Jak długo przechowujemy dane">
              <p>
                Korespondencję przechowujemy tak długo, jak jest to potrzebne do obsługi
                sprawy, a następnie przez czas potrzebny do wykazania jej przebiegu.
              </p>
              <p>
                Dane związane z zawartą umową przechowujemy przez okresy wymagane przez
                obowiązujące przepisy, w tym przepisy podatkowe i rachunkowe.
              </p>
              <p>
                Dane potrzebne do ustalenia, dochodzenia lub obrony roszczeń możemy
                przechowywać do upływu okresu przedawnienia wynikającego z przepisów.
              </p>
            </Block>

            <Block no="06" title="Komu dane mogą być przekazane">
              <p>
                Dane udostępniamy wyłącznie podmiotom, które są potrzebne do działania
                strony i prowadzenia komunikacji:
              </p>
              <ul>
                <li>dostawcy hostingu i usług informatycznych,</li>
                <li>dostawcy poczty elektronicznej,</li>
                <li>
                  podmiotom świadczącym obsługę księgową lub prawną, jeżeli jest to konieczne,
                </li>
                <li>organom publicznym, jeżeli wynika to z przepisów prawa.</li>
              </ul>
              <p>Nie sprzedajemy danych i nie udostępniamy ich w celach marketingowych.</p>
            </Block>

            <Block no="07" title="Prawa użytkownika">
              <p>W związku z przetwarzaniem danych przysługuje Ci prawo do:</p>
              <ul>
                <li>dostępu do swoich danych oraz otrzymania ich kopii,</li>
                <li>sprostowania danych,</li>
                <li>usunięcia danych — w przypadkach przewidzianych przepisami,</li>
                <li>ograniczenia przetwarzania,</li>
                <li>
                  sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie,
                </li>
                <li>przenoszenia danych — w przypadkach przewidzianych przepisami,</li>
                <li>
                  cofnięcia zgody w dowolnym momencie, jeżeli przetwarzanie odbywa się na jej
                  podstawie; nie wpływa to na zgodność z prawem przetwarzania sprzed cofnięcia,
                </li>
                <li>
                  wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2,
                  00-193 Warszawa).
                </li>
              </ul>
              <p>
                Aby skorzystać z tych praw, napisz na adres{" "}
                <a href={site.emailHref}>{site.email}</a>.
              </p>
            </Block>

            {/* Uwaga dla wdrożenia: po podłączeniu realnej wysyłki formularza
                zaktualizuj poniższy punkt (patrz lib/submitInquiry.ts). */}
            <Block no="08" title="Formularz kontaktowy">
              <p>
                Formularz na stronie zbiera imię, numer telefonu oraz informację o tym,
                co chcesz zbudować. Wykorzystujemy je wyłącznie do skontaktowania się
                w sprawie opisanych prac.
              </p>
              <p>
                Jeżeli automatyczna wysyłka jest w danym momencie niedostępna, formularz
                informuje o tym wprost i proponuje kontakt telefoniczny albo wysłanie
                wiadomości z własnego programu pocztowego. W takiej sytuacji dane nie są
                nigdzie przesyłane ani zapisywane przez stronę.
              </p>
              <p>Podanie danych jest dobrowolne, ale bez numeru telefonu lub adresu e-mail nie odpowiemy na zapytanie.</p>
            </Block>

            <Block no="09" title="Cookies i pamięć przeglądarki">
              <p>
                Ta strona nie korzysta z Google Analytics, Meta Pixel, Hotjar ani innych
                narzędzi analitycznych i reklamowych. Nie zapisujemy własnych plików cookies
                w celach statystycznych ani marketingowych.
              </p>
              <p>
                Wyjątkiem jest osadzona mapa Google opisana w punkcie 10 — to jedyny
                element strony, który może zapisać pliki cookies w Twojej przeglądarce,
                i robi to dopiero po wczytaniu mapy.
              </p>
              <p>
                Techniczne dane, takie jak standardowe logi serwera, mogą być przetwarzane
                przez dostawcę hostingu w celu zapewnienia bezpieczeństwa i poprawnego
                działania strony.
              </p>
              <p>
                Kroje pisma używane na stronie są serwowane z naszego serwera. Przeglądarka
                nie łączy się w tym celu z serwerami zewnętrznymi.
              </p>
            </Block>

            <Block no="10" title="Mapa Google i linki zewnętrzne">
              <p>
                W sekcji z lokalizacją osadzamy mapę Google. Po jej wczytaniu Twoja
                przeglądarka łączy się z serwerami Google, które mogą otrzymać adres IP,
                informacje o urządzeniu i przeglądarce oraz zapisać własne pliki cookies.
                Dzieje się to na zasadach Google, na które nie mamy wpływu.
              </p>
              <p>
                Zasady te opisuje polityka prywatności Google:{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  policies.google.com/privacy
                </a>
                .
              </p>
              <p>
                Na stronie są też zwykłe odnośniki do usług zewnętrznych, na przykład do
                wizytówki firmy w Google Maps i do opinii klientów. Po kliknięciu przechodzisz
                do serwisu, który działa na własnych zasadach i ma własną politykę prywatności.
              </p>
              <p>
                Opinie klientów pokazujemy na stronie jako cytaty z publicznej wizytówki
                Google. Nie zbieramy przy tym żadnych danych od osób odwiedzających stronę.
              </p>
            </Block>

            <Block no="11" title="Bezpieczeństwo">
              <p>
                Stosujemy rozsądne środki techniczne i organizacyjne chroniące dane przed
                nieuprawnionym dostępem, utratą lub ujawnieniem, w tym szyfrowane połączenie
                ze stroną.
              </p>
              <p>
                Żadne rozwiązanie nie daje pełnej gwarancji bezpieczeństwa, dlatego nie składamy
                takiej obietnicy. Jeśli zauważysz coś niepokojącego, napisz do nas.
              </p>
            </Block>

            <Block no="12" title="Zmiany polityki">
              <p>
                Politykę prywatności możemy aktualizować, jeżeli zmieni się sposób działania
                strony albo wymagania wynikające z przepisów. Aktualna wersja zawsze znajduje
                się pod tym adresem, wraz z datą ostatniej aktualizacji.
              </p>
            </Block>

            <Block no="13" title="Kontakt">
              <p>W sprawach dotyczących danych osobowych napisz albo zadzwoń:</p>
              <div className={s.contactCard}>
                <b>Serhii Anatii Homes</b>
                <span>
                  {site.street}, {site.postalCode} {site.city}
                </span>
                <span>
                  <a href={site.emailHref}>{site.email}</a>
                </span>
                <span>
                  <a href={site.phoneHref}>{site.phone}</a>
                </span>
              </div>
            </Block>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
