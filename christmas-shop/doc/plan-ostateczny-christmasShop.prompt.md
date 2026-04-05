# Plan Ostateczny: Implementacja Christmas Shop

## Status Projektu
✅ **Wszystkie zasoby dostępne:**
- CSS: home1440.css, gifts1440.css, slider-section_cos_wnosi.css, after-group_home.css
- Obrazy: ~50 plików PNG/SVG w assets/ (snowglobes, logo, backgrounds, screenshots sekcji)
- Screenshots: pełne strony + indywidualne sekcje Home
- Struktura: christmas-shop/ gotowa

## Etapy Implementacji

### 1. Przygotowanie Projektu (10 min)
- Utwórz strukturę folderów:
  ```
  christmas-shop/
  ├── index.html
  ├── gifts.html
  ├── css/style.css
  ├── js/script.js
  ├── assets/images/ (skopiuj wszystkie obrazy)
  └── favicon.ico
  ```
- Skopiuj wszystkie obrazy z assets/ do assets/images/
- Wybierz favicon (snowflake.svg → favicon.ico)

### 2. Budowa HTML (30 min)
**index.html (Home page):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Christmas Shop</title>
    <link rel="icon" href="assets/favicon.ico">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <!-- Logo + nav -->
    </header>
    <main>
        <section id="hero"><!-- Hero --></section>
        <section id="about"><!-- About --></section>
        <section id="slider"><!-- Slider --></section>
        <section id="best-gifts"><!-- Best Gifts --></section>
        <section id="cta"><!-- CTA --></section>
    </main>
    <footer>
        <!-- Footer -->
    </footer>
    <script src="js/script.js"></script>
</body>
</html>
```

**gifts.html (Gifts page):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gifts - Christmas Shop</title>
    <link rel="icon" href="assets/favicon.ico">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <!-- Logo + nav -->
    </header>
    <main>
        <section id="gifts"><!-- Gifts grid --></section>
    </main>
    <footer>
        <!-- Footer -->
    </footer>
    <script src="js/script.js"></script>
</body>
</html>
```

### 3. CSS Implementation (60 min)
- Połącz wszystkie CSS pliki w `style.css`
- Dodaj zmienne CSS dla kolorów:
  ```css
  :root {
      --primary-red: #FF4646;
      --white: #FFFFFF;
      --text-dark: #181C29;
      --text-secondary: #666666;
  }
  ```
- Layout 1440px fixed width, centered
- Responsywność: >1440px centered, <100% zoom centered
- Hover effects: smooth transitions

### 4. JavaScript Implementation (30 min)
- Nawigacja zakotwiczeniowa (smooth scroll)
- Linki między stronami:
  - GIFTS → gifts.html
  - Logo → index.html
  - "Explore Magical Gifts" → gifts.html
- Footer actions:
  - CALL US: tel:+1234567890
  - WRITE US: mailto:info@christmas-shop.com
  - MAGIC FOREST: https://maps.google.com
  - RS School: https://rs.school
- Slider carousel (jeśli potrzebny)
- Hover effects na kartach

### 5. Testowanie i Walidacja (30 min)
- W3C HTML validation (no errors)
- Layout match z PerfectPixel (±10px)
- Interaktywność: wszystkie linki, hovers
- URLs: / i /gifts
- Browser test: centered layout

### 6. Deployment (10 min)
- Branch christmas-shop
- PR do gh-pages
- Link deployment

## Zasoby Dostępne

### Obrazy (assets/images/)
**Snowglobes (16 szt.):**
- Best Gifts: christmas-tree-ball.png, fairytale-house.png, snowman.png, snake.png
- Gifts page: christmas-tree.png, santa-claus.png, christmas-trees.png, image.png, image-1.png, image-2.png, Untitled.png, Untitled-1.png, christmas-tree-ball-1.png, christmas-trees-1.png, fairytale-house-1.png, snowman-1.png

**Inne:**
- Logo: snowflake.svg
- About: santa.png
- Slider: snowman.png, image.png, image-1.png, image-2.png
- Backgrounds: christmas-tree.png, christmas-trees.png
- Footer icons: (brakuje — użyć SVG lub placeholder)

### CSS Sekcje
- Header: z home1440.css
- Hero: z home1440.css
- About: z home1440.css
- Slider: z slider-section_cos_wnosi.css
- Best Gifts: z home1440.css
- CTA: z home1440.css
- Footer: z home1440.css
- Gifts: z gifts1440.css

### Kolory (oszacowane z CSS)
- Primary: #FF4646 (czerwony)
- White: #FFFFFF
- Text dark: #181C29
- Text secondary: #666666

### Czcionki (z CSS)
- Montserrat: 600 weight, sizes: 12px, 32px, 16px

## Checklist Ostateczny
- [ ] Struktura folderów
- [ ] HTML index.html
- [ ] HTML gifts.html
- [ ] CSS style.css (połączony)
- [ ] JS script.js
- [ ] Obrazy w assets/images/
- [ ] Favicon
- [ ] W3C validation
- [ ] Layout match
- [ ] Interaktywność
- [ ] Deployment

## Szacowany Czas: 3-4 godziny
- Przygotowanie: 10 min
- HTML: 30 min
- CSS: 60 min
- JS: 30 min
- Testowanie: 30 min
- Deployment: 10 min

## Kryteria Oceny (110 punktów)
- Walidacja HTML: 18 pkt
- Layout: 46 pkt
- Interaktywność: 36 pkt
- CSS: 10 pkt

**Gotowy do implementacji!** 🚀
