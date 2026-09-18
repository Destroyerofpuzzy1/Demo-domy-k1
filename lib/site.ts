/**
 * Zweryfikowane dane firmy.
 * Nie dodawaj tu NIP, REGON, liczby realizacji, lat doświadczenia,
 * ocen ani godzin otwarcia, dopóki nie zostaną potwierdzone przez klienta.
 */
export const site = {
  name: "Serhii Anatii Homes",
  shortName: "Serhii Anatii Homes",
  url: "https://serhiianatiihomes.pl",
  phone: "+48 574 110 547",
  phoneHref: "tel:+48574110547",
  phoneDisplay: "574 110 547",
  email: "anatijsergij@gmail.com",
  emailHref: "mailto:anatijsergij@gmail.com",
  street: "ul. Instalatorów 7/164",
  postalCode: "02-237",
  city: "Warszawa",
  mapsUrl:
    "https://www.google.com/maps/place/Budowa+dom%C3%B3w+Serhii+Anatii+Homes/@52.1980525,20.9558814,613m/data=!3m2!1e3!4b1!4m6!3m5!1s0x4719335befad3797:0xcbf4b5365e28b984!8m2!3d52.1980492!4d20.9584617!16s%2Fg%2F11zk3fqm64",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Serhii+Anatii+Homes,+Instalator%C3%B3w+7%2F164,+02-237+Warszawa&z=16&output=embed",
  rating: "5,0",
  area: "Warszawa i woj. mazowieckie",
  privacyUpdated: "18.09.2026",
} as const;

export const nav = [
  { label: "Realizacje", href: "#realizacje" },
  { label: "Zakres", href: "#zakres" },
  { label: "Jak pracujemy", href: "#jak-pracujemy" },
  { label: "Opinie", href: "#opinie" },
  { label: "Kontakt", href: "#kontakt" },
] as const;
