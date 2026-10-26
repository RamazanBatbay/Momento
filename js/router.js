/**
 * Minimal hash-based router.
 *
 * Hash URLs (#/, #/new, #/memory/3) are used instead of the History API
 * because they work on any static host (e.g. GitHub Pages) without
 * server-side rewrites, and the service worker only has to cache index.html.
 */

/**
 * @typedef {Object} Route
 * @property {string} name     Used to highlight the active tab.
 * @property {RegExp} pattern  Matched against the path after "#"; named groups become params.
 * @property {(params: Record<string, string>) => HTMLElement | Promise<HTMLElement>} render
 */

/**
 * Starts the router: renders the matching view on load and on every hash change.
 * @param {Route[]} routes
 * @param {HTMLElement} outlet  Element the views are rendered into.
 * @param {(routeName: string) => void} onNavigate  Called after a view is rendered.
 */
export function startRouter(routes, outlet, onNavigate) {
  async function resolve() {
    const path = location.hash.slice(1) || '/';
    const route = routes.find((r) => r.pattern.test(path));

    if (!route) {
      // Unknown URL: fall back to the home view without adding a history entry.
      location.replace('#/');
      return;
    }

    const params = path.match(route.pattern).groups ?? {};
    outlet.replaceChildren(await route.render(params));
    onNavigate(route.name);

    // Move focus to the new content so screen readers announce the view change.
    window.scrollTo(0, 0);
    outlet.focus({ preventScroll: true });
  }

  window.addEventListener('hashchange', resolve);
  resolve();
}
