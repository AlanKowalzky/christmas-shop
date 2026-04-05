# Plan: Implementacja Christmas Shop Home i Gifts Pages

## Cel
Stworzenie dwóch stron o stałej szerokości (1440px) na podstawie projektów z Figmy, z wycentrowanym rozmieszezeniem oraz wymaganą interaktywnością. Tech stack: czysty HTML, CSS, JavaScript.

## Etapy Implementacji

### 1. Przygotowanie Projektu
- Utwórz strukturę folderów:
  - `christmas-shop/`
    - `index.html` (Home page)
    - `gifts.html` (Gifts page)
    - `css/style.css` (wszystkie style)
    - `js/script.js` (logika interaktywności)
    - `assets/` (obrazy, favicon)

### 2. Struktura HTML
- Zbuduj semantyczny HTML dla obu stron
- **Home page (index.html):**
  - `<header>` z nawigacją
  - `<main>` z sekcjami:
    - Hero section
    - About section
    - Slider section
    - Best Gifts section (Flexbox/Grid)
    - CTA section
  - `<footer>` z kontaktami
- **Gifts page (gifts.html):**
  - `<header>` z nawigacją
  - `<main>` z sekcją Gifts (grid/flexbox)
  - `<footer>` z kontaktami
- Warunki:
  - Jeden `<h1>` na stronę
  - Poprawny, semantyczny markup
  - Favicon.ico na każdej stronie

### 3. Layout CSS
- Kontener o stałej szerokości 1440px, wycentrowany
- Białe tło dla pustych przestrzeni
- Flexbox/Grid dla sekcji z prezentami
- Responsywne wycentrowanie dla:
  - >1440px szerokości — layout wycentrowany, nie rozciągnięty
  - <100% zbliżenia — layout wycentrowany
- Smooth transitions dla hover effects

### 4. Stylowanie Sekcji
Każdą sekcję ostyluj zgodnie z Figmą:
- Kolory (tło, tekst, akcenty)
- Czcionki (family, size, weight)
- Odstępy (padding, margin, gap)
- Border radius, shadow (jeśli dotyczy)

### 5. Interaktywność (JavaScript)
- **Nawigacja zakotwiczeniowa:**
  - Linki w nagłówku łączą do sekcji na Home page
  - CONTACTS → footer na tej samej stronie
  - Smooth scrolling

- **Linki między stronami:**
  - GIFTS w header → `gifts.html`
  - Logo w header → `index.html`
  - "Explore Magical Gifts" button (Hero i CTA) → `gifts.html`

- **Stany elementów:**
  - GIFTS link w header na Gifts page — **nieaktywny**, brak hover
  - ALL tab w Gifts section na Gifts page — **nieaktywny**, brak hover

- **Hover effects na kartach:**
  - Best Gifts section (Home) — interactive
  - Gifts section (Gifts page) — interactive
  - Footer cards — interactive

- **Akcje w footer:**
  - CALL US card → inicjuj połączenie (tel:)
  - WRITE US card → otwórz mail client (mailto:)
  - MAGIC FOREST card → otwórz Google Maps w nowej karcie
  - "Made in Rolling Scopes School" link → otwórz RS School w nowej karcie

- **Wizualne efekty:**
  - Zmiany cursor na hover
  - Zmiana koloru/tła na hover
  - Smooth transition bez wpływu na sąsiednie elementy

### 6. Validation i Favicon
- Dodaj `favicon.ico` do obu stron
- Waliduj HTML w W3C Validator — cel: "Document checking completed. No errors or warnings"

### 7. Testowanie
- Layout match z Figmą (PerfectPixel extension, skala 1x):
  - Odchylenie do 10px jest akceptowalne
  - Wyrównanie wszystkich elementów
- Interaktywność:
  - Wszystkie linki działają
  - Hover effects smooth
  - Elementy nieinteraktywne bez hover
- URLs:
  - Home: `/` lub `/index.html`
  - Gifts: `/gifts.html`
  - URLs różne ✓
- Browser test:
  - Wycentrowany layout przy >1440px
  - Brak rozciągnięcia
  - Białe tło wokół
  - Brak widocznego scroll na <100% zoom

### 8. Deployment
- Utwórz branch `christmas-shop` z `main`
- Umieść kod w folderze `christmas-shop/`
- Wdróż na `gh-pages` via PR z `christmas-shop` → `gh-pages`
- Otwórz PR z `christmas-shop` → `main` z opisem

---

## Checklist: Ekstrakcja z Figmy

### Kolory (Copy z Inspect → Hex)
- [ ] Kolor tła sekcji głównej (czerwony)
- [ ] Kolor tekstu głównego (biały/szary)
- [ ] Kolor tekstu drugorzędnego
- [ ] Kolor karty produktu (białe tło)
- [ ] Kolor tekstu na karcie
- [ ] Kolor tagu (FOR WORK, FOR HEALTH, etc.)
- [ ] Kolor tła footera
- [ ] Kolor ikony/tekstu w footer

### Czcionki (Copy z Properties panel)
- [ ] Font family dla nagłówków (H1, H2): __________ / size: __ px / weight: __
- [ ] Font family dla body tekstu: __________ / size: __ px / weight: __
- [ ] Font family dla tagów: __________ / size: __ px / weight: __

### Wymiary i Spacing
- [ ] Szerokość karty Best Gifts: __________ px
- [ ] Wysokość karty: __________ px
- [ ] Padding karty: __________
- [ ] Gap między kartami: __________ px
- [ ] Border radius karty: __________ px
- [ ] Wysokość Hero/CTA sekcji: __________ px
- [ ] Padding sekcji (top/bottom): __________ px
- [ ] Liczba kolumn Best Gifts: __
- [ ] Liczba kolumn Gifts page: __

### Obrazy i Ikony
- [ ] Obraz 1 (Console.log guru)
- [ ] Obraz 2 (Hydration bot)
- [ ] Obraz 3 (Merge master)
- [ ] Obraz 4 (Spontaneous coding)
- [ ] Logo
- [ ] Footer icons
- [ ] Slider images (jeśli potrzebne)

### Copy as Code z Figmy
- [ ] Hero section
- [ ] Best Gifts section
- [ ] Gifts page layout

### Interaktywność - Hover Effects
- [ ] Karty — co się zmienia na hover: __________
- [ ] Przyciski — co się zmienia na hover: __________
- [ ] Linki — co się zmienia na hover: __________

---

## Notatki Dodatkowe

- **Czysty kod**: HTML5, CSS3, vanilla JavaScript — bez frameworków
- **Unikanie kar**: Nie używaj obrazów do layoutu (wyłącznie do treści)
- **W3C Validation**: Priorytet — zero błędów/ostrzeżeń
- **Alignment**: PerfectPixel do ±10px, wycentrowanie przy >1440px
- **Performance**: Smooth transitions, responsive behavior
- **Accessibility**: Semantyczny HTML, accessible links/buttons

---

## Weryfikacja

✅ **W3C HTML Validation** — oba strony: "No errors or warnings"
✅ **Layout Match** — PerfectPixel overlay, alignment ±10px
✅ **Interaktywność** — wszystkie linki, hover effects, akcje
✅ **URLs** — / i /gifts (różne)
✅ **Responsive** — centered >1440px, white background
✅ **Favicon** — na obu stronach
✅ **One <h1>** — na każdej stronie
✅ **Deployment** — gh-pages functional link
