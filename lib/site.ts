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
    "https://www.google.com/maps/search/?api=1&query=Serhii+Anatii+Homes+ul.+Instalator%C3%B3w+7%2F164+02-237+Warszawa",
  area: "Warszawa i woj. mazowieckie",
  privacyUpdated: "18.09.2026",
} as const;

export const nav = [
  { label: "Co robimy", href: "#zakres" },
  { label: "Jak pracujemy", href: "#jak-pracujemy" },
  { label: "Realizacje", href: "#realizacje" },
  { label: "Kontakt", href: "#kontakt" },
] as const;
