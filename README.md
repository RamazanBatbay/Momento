# Momento - Travel Journal PWA

Momento is an offline-first travel journal. Take a photo, pin the place you are
standing in and write a short note - the memory is stored on your device and
stays available without an internet connection.

**Live app:** <https://ramazanbatbay.github.io/Momento/>

**Repository:** <https://github.com/RamazanBatbay/Momento>

> Status: **Part 1 - Foundation**.

## Features

| Feature | Status |
|---|---|
| Installable (Web App Manifest + service worker) | Done (Part 1) |
| Three views: memories list, memory detail, new memory | Done (Part 1, sample data) |
| Responsive layout, light/dark theme | Done (Part 1) |
| App shell available offline | Done (Part 1) |
| Memories saved on the device (IndexedDB) | Planned (Part 2) |
| Camera - photo for each memory | Planned (Part 2) |
| Geolocation - place of each memory, map | Planned (Part 3) |
| Offline banner and runtime caching | Planned (Part 3) |
| Share a memory, "On this day" notification | Planned (Part 4) |

## Views

1. **Memories** (`#/`) - grid of all saved memories; entry point of the app.
2. **Memory detail** (`#/memory/:id`) - full photo, note, date, place and map.
3. **New memory** (`#/new`) - capture a photo and location, add a title and note, save.

Navigation: the tab bar switches between *Memories* and *New memory*; tapping a card
opens its detail view, and the back arrow in the header returns to the list.

## Technologies

- HTML5, CSS3 (custom properties, grid, media queries)
- Vanilla JavaScript (ES modules) - no framework, no build step
- Service Worker API, Cache API, Web App Manifest - written by hand
- Planned: IndexedDB, MediaDevices (camera), Geolocation API, Web Share API, Notifications API

## Dependencies

None at runtime in part 1. To run locally you only need a static web server
(see below). Leaflet (map UI) will be added in part 3.

## Running locally

Service workers only work over HTTPS or on `localhost`, so the app must be served
by a web server rather than opened as a file.

```bash
# Option 1 - Python
python -m http.server 8080

# Option 2 - Node.js
npx serve .
```

Then open <http://localhost:8080>.

To test offline mode: open DevTools → *Application* → *Service workers* → tick
**Offline**, then reload.

## Project structure

```
├── index.html              # App shell
├── manifest.webmanifest    # Installability metadata
├── sw.js                   # Service worker (caching)
├── css/styles.css          # Mobile-first styles
├── icons/                  # App icons (any + maskable)
└── js/
    ├── app.js              # Entry point: routes + SW registration
    ├── router.js           # Hash router
    ├── utils.js            # Escaping, formatting, toast
    ├── data/               # Data layer (sample data → IndexedDB in part 2)
    └── views/              # One module per view
```

## Caching strategy

| Resource type | Strategy | Justification |
|---|---|---|
| App shell (HTML, CSS, JS, icons, manifest) | **Precache + cache-first** | These files only change with a new release. Serving them from cache makes the app start instantly and work fully offline; a new `CACHE_VERSION` in `sw.js` replaces them on update. |
| Page navigations | **Cached `index.html`** | The app is a single page with hash routing, so every view is rendered from the same cached shell, even offline. |

Strategies for photos, map tiles and other runtime resources will be added in part 3.

## Native device features

Planned:

- **Camera** - take the photo of a memory directly in the app.
- **Geolocation** - store where the memory was created and show it on a map.
- **Web Share** - send a memory to messaging or social apps.
