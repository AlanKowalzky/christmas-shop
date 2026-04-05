# Deploy i Pull Request — Christmas Shop

## Kontekst
Po zakończeniu kodu lokalnego trzeba było:
1. Dodać remote origin (repo szkoły)
2. Wypchnąć branche na GitHub
3. Naprawić brakującą interaktywność (footer, nav)
4. Wdrożyć na gh-pages
5. Otworzyć PR do `main` do oceny

---

## Chronologia działań

### 1. Dodanie remote origin

```bash
git remote add origin https://github.com/rolling-scopes-school/alankowalzky-JSFEPRESCHOOL2026Q1.git
```

Sprawdzenie co jest na zdalnym repo:

```bash
git fetch origin
git log origin/main --oneline
# ed9baab Initial commit
```

Zdalne `main` miało tylko jeden automatyczny commit szkoły (`ed9baab`).
Lokalne `main` miało 2 własne commity — **niezgodne historie**.

---

### 2. Push obu branchy

```bash
git push origin main --force
# + ed9baab...290db85 main -> main (forced update)

git push origin christmas-shop
# * [new branch] christmas-shop -> christmas-shop
```

Force push na `main` był bezpieczny — nadpisał tylko pusty commit szkoły.

---

### 3. Naprawa interaktywności (CrossCheck)

Zidentyfikowane braki punktowe:

| Problem | Punkty |
|---|---|
| Footer CALL US — brak `href="tel:"` | +2 |
| Footer WRITE US — brak `href="mailto:"` | +2 |
| Footer MAGIC FOREST — brak Google Maps | +2 |
| GIFTS nav na gifts.html — nadal `<a>` (powinien być nieinteraktywny) | +2 |

**Zmiany w `index.html` i `gifts.html`** — karty footer zamienione z `<div>` na `<a>`:

```html
<!-- PRZED -->
<div class="footer-card" tabindex="0">...</div>

<!-- PO -->
<a href="tel:+1234567890" class="footer-card">...</a>
<a href="mailto:hello@christmas.shop" class="footer-card">...</a>
<a href="https://maps.google.com/?q=Central+Park,New+York"
   target="_blank" rel="noopener noreferrer" class="footer-card">...</a>
```

**Zmiana w `gifts.html`** — GIFTS w nav jako `<span>` (nieinteraktywny):

```html
<!-- PRZED -->
<a href="gifts.html" class="nav-item active">...</a>

<!-- PO -->
<span class="nav-item active">...</span>
```

**Zmiana w `style.css`** — dodano `text-decoration: none; color: inherit;` do `.footer-card` oraz styl dla `span.nav-item`.

Commit i push:

```bash
git add christmas-shop/index.html christmas-shop/gifts.html christmas-shop/css/style.css
git commit -m "fix: footer cards as links (tel/mailto/maps), GIFTS nav non-interactive on gifts page"
git push origin christmas-shop
# 33f1130..4c4fc26 christmas-shop -> christmas-shop
```

---

### 4. Wdrożenie na gh-pages

```bash
git push origin christmas-shop:gh-pages --force
# + ed9baab...4c4fc26 christmas-shop -> gh-pages (forced update)
```

Strona dostępna pod:
```
https://rolling-scopes-school.github.io/alankowalzky-JSFEPRESCHOOL2026Q1/christmas-shop/
```

---

### 5. Problem z PR — brak wspólnej historii

Próba utworzenia PR przez `gh`:

```bash
gh pr create --base main --head christmas-shop ...
# pull request create failed: GraphQL: The christmas-shop branch
# has no history in common with main (createPullRequest)
```

**Przyczyna**: `main` i `christmas-shop` były orphan branches — dwa osobne drzewa bez wspólnego przodka. GitHub blokuje PR między nimi.

```
main:           fe3d542 --- 290db85
                                        (brak połączenia)
christmas-shop: ad84784 --- 598c993 --- 33f1130 --- 4c4fc26
```

---

### 6. Naprawa historii — merge z allow-unrelated-histories

**Krok 1 — backup tag:**
```bash
git tag backup-christmas-shop-before-merge 4c4fc26
```

**Krok 2 — stash niezacommitowanych zmian:**
```bash
git stash push -m "backup uncommitted changes before merge"
# Saved working directory and index state On christmas-shop: backup...
```

**Krok 3 — merge main do christmas-shop:**
```bash
git merge main --allow-unrelated-histories --no-edit \
  -m "chore: merge main into christmas-shop to establish common history"
# Merge made by the 'ort' strategy.
# .gitignore | 6 ++++++
# .gitkeep   | 1 +
# 2 files changed, 7 insertions(+)
```

**Krok 4 — weryfikacja grafu:**
```bash
git log --oneline --graph --all
#   f6b8cb4 chore: merge main into christmas-shop to establish common history
# |\ 
# | * 290db85 chore: add .gitignore with mermaid exclusions
# | * fe3d542 chore: initial empty commit
# * 4c4fc26 fix: footer cards as links...
# * 33f1130 feat: move all project files...
# * 598c993 feat: Santa in about section...
# * ad84784 feat: add assets, festive backgrounds...
```

**Krok 5 — force push:**
```bash
git push origin christmas-shop --force
# 4c4fc26..f6b8cb4 christmas-shop -> christmas-shop

git push origin christmas-shop:gh-pages --force
# 4c4fc26..f6b8cb4 christmas-shop -> gh-pages
```

**Krok 6 — PR przez gh CLI:**
```bash
gh pr create \
  --base main \
  --head christmas-shop \
  --title "Christmas Shop. Part-1 - Fixed Layout" \
  --body "..." \
  --repo rolling-scopes-school/alankowalzky-JSFEPRESCHOOL2026Q1
# https://github.com/rolling-scopes-school/alankowalzky-JSFEPRESCHOOL2026Q1/pull/1
```

**Krok 7 — przywrócenie stash:**
```bash
git stash pop
# Dropped refs/stash@{0}
```

---

## Stan końcowy

| Branch | Commit HEAD | Zawartość |
|---|---|---|
| `main` | `290db85` | `.gitkeep` + `.gitignore` |
| `christmas-shop` | `f6b8cb4` | projekt + merge commit |
| `gh-pages` | `f6b8cb4` | identyczny z christmas-shop |

PR #1: https://github.com/rolling-scopes-school/alankowalzky-JSFEPRESCHOOL2026Q1/pull/1
— **NIE mergować** (do oceny przez szkołę)

---

## Diagramy

### Przepływ zdalnych operacji

```mermaid
sequenceDiagram
    participant L as Local
    participant O as origin (GitHub)

    L->>O: git push origin main --force
    Note over O: main: fe3d542→290db85

    L->>O: git push origin christmas-shop
    Note over O: christmas-shop: ad84784→4c4fc26

    L->>L: fix: footer links + GIFTS nav
    L->>O: git push origin christmas-shop
    Note over O: christmas-shop: →4c4fc26

    L->>O: git push origin christmas-shop:gh-pages --force
    Note over O: gh-pages: ed9baab→4c4fc26

    L->>L: merge main --allow-unrelated-histories
    Note over L: commit f6b8cb4

    L->>O: git push origin christmas-shop --force
    L->>O: git push origin christmas-shop:gh-pages --force
    Note over O: oba: →f6b8cb4

    L->>O: gh pr create christmas-shop→main
    Note over O: PR #1 otwarty
```

### Historia commitów po merge

```mermaid
gitGraph
    commit id: "fe3d542 initial empty commit" tag: "main start"
    commit id: "290db85 add .gitignore"
    branch christmas-shop order: 1
    checkout christmas-shop
    commit id: "ad84784 assets & hero"
    commit id: "598c993 santa & slider fix"
    commit id: "33f1130 move to christmas-shop/"
    commit id: "4c4fc26 fix footer links"
    merge main id: "f6b8cb4 merge main" tag: "HEAD"
```

### Problem i rozwiązanie — brak wspólnej historii

```mermaid
flowchart TD
    subgraph PRZED["PRZED — brak wspólnego przodka"]
        M1[fe3d542\ninitial empty commit] --> M2[290db85\nadd .gitignore]
        C1[ad84784\nassets & hero] --> C2[598c993\nsanta & slider]
        C2 --> C3[33f1130\nmove to folder]
        C3 --> C4[4c4fc26\nfix footer links]
    end

    subgraph PO["PO — merge --allow-unrelated-histories"]
        N1[fe3d542] --> N2[290db85]
        D1[ad84784] --> D2[598c993]
        D2 --> D3[33f1130]
        D3 --> D4[4c4fc26]
        N2 --> MERGE[f6b8cb4\nmerge commit\nHEAD christmas-shop]
        D4 --> MERGE
    end

    PRZED -->|git merge main\n--allow-unrelated-histories| PO

    style MERGE fill:#4CAF50,color:#fff
    style PRZED fill:#f44336,color:#fff
    style PO fill:#2196F3,color:#fff
```

### Naprawione punkty CrossCheck

```mermaid
flowchart LR
    subgraph PRZED["PRZED naprawą"]
        A1["footer CALL US\ndiv — brak tel:"]
        A2["footer WRITE US\ndiv — brak mailto:"]
        A3["footer MAGIC FOREST\ndiv — brak maps"]
        A4["GIFTS nav\na href — interaktywny"]
    end

    subgraph PO["PO naprawie"]
        B1["a href=tel:+1234567890\n+2 pkt"]
        B2["a href=mailto:hello@...\n+2 pkt"]
        B3["a href=maps.google.com\ntarget=_blank\n+2 pkt"]
        B4["span.nav-item.active\npointer-events:none\n+2 pkt"]
    end

    A1 -->|zamiana div→a| B1
    A2 -->|zamiana div→a| B2
    A3 -->|zamiana div→a| B3
    A4 -->|zamiana a→span| B4

    style B1 fill:#4CAF50,color:#fff
    style B2 fill:#4CAF50,color:#fff
    style B3 fill:#4CAF50,color:#fff
    style B4 fill:#4CAF50,color:#fff
    style A1 fill:#f44336,color:#fff
    style A2 fill:#f44336,color:#fff
    style A3 fill:#f44336,color:#fff
    style A4 fill:#f44336,color:#fff
```

### Zabezpieczenie przed utratą danych

```mermaid
stateDiagram-v2
    [*] --> StanWyjściowy: 4c4fc26 na christmas-shop

    StanWyjściowy --> TagBackup: git tag backup-christmas-shop-before-merge
    TagBackup --> Stash: git stash push -m "backup..."
    Stash --> Merge: git merge main --allow-unrelated-histories
    Merge --> PushForce: git push --force (christmas-shop + gh-pages)
    PushForce --> PRUtworzony: gh pr create → PR #1
    PRUtworzony --> StashPop: git stash pop
    StashPop --> [*]: Stan końcowy f6b8cb4

    note right of TagBackup: Punkt przywrócenia:\ngit checkout backup-christmas-shop-before-merge
    note right of Stash: Odzyskanie:\ngit stash pop
```
