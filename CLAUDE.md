# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static tourism site for the municipality of Compostela, Nayarit (Mexico) — `compostelacercadeti.mx`. Pure HTML/CSS/JS, no build step, no package manager, no tests. Content is in Spanish.

## Running it

There is no build or dev server. To preview, open `index.html` directly in a browser, or serve the repo root with any static server (e.g. `python -m http.server`). All relative paths assume the repo root is the web root — subpages reference shared assets with `../../css/`, `../../js/`, `../../images/`.

External dependencies (AOS, Font Awesome, Google Fonts) are loaded from CDNs on every page — no local copies, no lockfile.

## Architecture

### Page topology

- [index.html](index.html) is the landing page. It is the **only** page that uses [js/map.js](js/map.js) and [css/index.css](css/index.css).
- [locations/](locations/) contains one folder per destination (`compostela/`, `chacala/`, `guayabitos/`, `la-penita/`, `los-ayala/`, `las-varas/`, `platanitos/`, `playa-chila/`, `playa-del-toro/`, `playa-las-tortugas/`, `zacualpan/`).
- Each destination folder has a main page (`<slug>.html`) and optional subpages following a fixed naming pattern: `atractivos-turisticos-<slug>.html`, `gastronomia-<slug>.html`, `hospedajes-<slug>.html`, `eventos-temporada-<slug>.html`, `operadores-turisticos-<slug>.html`. Guayabitos also has `vida-nocturna-guayabitos.html` and `isla-coral.html`.
- [locations/eventos.html](locations/eventos.html) is the shared events landing page reachable from every floating nav.
- Not all destinations have the full subpage set — Las Varas, Zacualpan, Platanitos, Playa Chila, Playa del Toro, and Playa las Tortugas currently only have a main page (Platanitos also has gastronomía). When adding features, don't assume the full set exists.

### The map (index only)

[js/map.js](js/map.js) is self-contained and drives the interactive map on the home page:

- The `locations` array at the top of the file is the single source of truth for pins. Each entry has `id`, `name`, `x`/`y` (percent-based coordinates over [images/mapa-compostela.png](images/mapa-compostela.png)), and `url`. Adding a destination = add an entry here, add a folder under `locations/`, add the URL to [sitemap.xml](sitemap.xml).
- Pins and the sidebar list are generated from that array on `window.load`; hover/click sync both directions.
- `map.js` also owns the hero slider, the stat counters, the menu overlay, and the floating-nav-stops-before-footer logic — all for the home page only.

### Shared behavior on subpages ([js/main.js](js/main.js))

Subpages load [js/main.js](js/main.js) instead of `map.js`. It provides:

- **Floating nav** (`.floating-nav-container`) — three pills (INICIO / MENÚ / EVENTOS). The "stops before footer" logic is duplicated from `map.js` with slightly different DOM assumptions (`document.querySelector('footer')` vs `#main-footer`). If you touch one, check whether the other needs the same fix.
- **Menu overlay** (`#menu-overlay`) — opened via `toggleOverlayMenu()` (called from inline `onclick`) or `#btn-menu-toggle`. Closing restores `body.overflow` and un-hides the floating nav. Several subpages trigger this via inline `onclick="toggleOverlayMenu()"`, so that global function must stay on `window`.
- **Info modal** (`#info-modal`, `setupInfoModal`) — any `.btn-info` button with `data-title`, `data-info`, and optionally `data-link` / `data-menu-link` / `data-booking-link` opens a shared modal. Subclasses `btn-direccion`, `btn-ubicacion`, `btn-precio`, `btn-contacto` decide which action buttons (map / menu / booking) appear. This is the standard pattern for showing address, hours, pricing, and contact info on cards.
- **Filter modal** (`#filter-modal`, `setupFilterModal`) — opens a category picker; `.filter-option[data-filter]` values are matched against `data-category` on cards (`restaurant-card`, `hotel-card`, `attraction-card`, `operator-card`, `event-card`, `destination-card`, `night-card`). `all` / `todos` reset. If you add a new card type, add its class to the `cards` query in `setupFilterModal`.

### Styling

- [css/styles.css](css/styles.css) (~1700 lines) is the shared stylesheet loaded by every page, including home. It defines all the reusable components (navbar, floating nav, menu overlay, info modal, filter modal, card grids, etc.).
- [css/index.css](css/index.css) is home-only — map interface, hero slider, stats section.
- Per-destination theming is done with **inline `<style>` blocks in each location's main HTML file** that override `:root` custom properties (`--primary`, `--accent`, `--bg-light`, etc.) and the `.hero` background. This is intentional: each destination has its own palette (Compostela = colonial reds, Platanitos = teal/sunset, etc.). When editing a destination's colors, edit the `<style>` block in that page — do not push destination-specific colors into `styles.css`.
- [css/styles.backup.css](css/styles.backup.css) is a frozen copy; do not edit it and do not treat it as authoritative.

## Conventions worth knowing

- **Images use `loading="lazy"`** everywhere except the hero background (which is a CSS `background-image`, so the attribute doesn't apply). Keep new `<img>` tags lazy.
- **SEO:** [sitemap.xml](sitemap.xml) is hand-maintained. Any new page must be added there with an appropriate `<priority>` (main destination page = 0.9, content subpage = 0.8, secondary = 0.7).
- **Spanish-only content.** UI strings, comments, and commit messages in this repo are in Spanish — follow the existing style when editing user-facing text.
- **No ASCII-only rule:** existing files use accented characters and ñ freely. Don't strip them.
