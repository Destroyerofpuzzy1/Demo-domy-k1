# Serhii Anatii Homes

Strona firmowa — budowa domów, Warszawa. Next.js 16 (App Router), TypeScript, GSAP + Lenis, CSS Modules.

```bash
npm install
npm run dev     # http://localhost:3210
npm run build
npm start
```

## Struktura

| Ścieżka | Zawartość |
| --- | --- |
| `app/page.tsx` | strona główna (sekcje 01–10) |
| `app/polityka-prywatnosci/` | polityka prywatności |
| `app/globals.css` | tokeny: kolory, typografia, siatka, krzywe animacji |
| `components/` | sekcje + formularz + warstwa animacji |
| `lib/site.ts` | dane firmy — jedno źródło prawdy |
| `lib/submitInquiry.ts` | punkt integracji formularza |
| `public/assets/` | zdjęcia z budów |

## Do zrobienia przed publikacją

1. **Formularz** — obecnie nie ma backendu i strona tego nie ukrywa: po wysłaniu
   pokazuje komunikat i proponuje telefon albo e-mail z gotową treścią.
   Podłączenie wysyłki: `lib/submitInquiry.ts` (instrukcja w komentarzu).
   Po podłączeniu zaktualizuj punkt 8 polityki prywatności.
2. **Opinie** — `components/Reviews.tsx` zawiera treści demonstracyjne,
   oznaczone w kodzie i widoczne na stronie jako „Demo". Podmień na prawdziwe
   opinie i usuń oznaczenie. Nie dopisuj ocen ani liczby opinii bez pokrycia.
3. **Adres strony** — `site.url` w `lib/site.ts` to placeholder. Ustaw docelową
   domenę; z niej generują się canonical, Open Graph i dane strukturalne.
4. **Link do Google Maps** — `site.mapsUrl` prowadzi do wyszukania adresu.
   Podmień na link do wizytówki firmy, jeśli taka istnieje.

## Czego świadomie tu nie ma

- Google Analytics, Meta Pixel, Hotjar i innych skryptów śledzących.
- Własnych plików cookies — dlatego nie ma banera zgody.
- Osadzonej mapy Google (zwykły odnośnik zamiast iframe'a).
- Zmyślonych danych: liczby realizacji, lat doświadczenia, gwarancji, NIP-u,
  REGON-u, ocen, godzin otwarcia, nazw miejscowości.

Kroje pisma (Geist Sans / Geist Mono) są serwowane z własnego serwera —
przeglądarka nie łączy się z Google Fonts.

## Uwagi projektowe

- Etapy budowy i kroki „jak pracujemy" przełącza użytkownik. Nic nie zmienia się
  samo, bo automatyczne karuzele utrudniają obejrzenie zdjęcia.
- Na telefonie selektor etapów jest pionowy, nie poziomy — pięć pozycji w poziomie
  wymuszałoby przewijanie w bok i zbyt małe pola dotyku.
- Marquee z opiniami jedzie bez przerwy, także pod kursorem.
- `prefers-reduced-motion` wyłącza sekwencję wejściową, maski i przesunięcia;
  treść jest od razu w stanie docelowym.
