/**
 * Small, dependency-free helpers shared by the views.
 */

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/**
 * Escapes user-provided text before it is inserted with innerHTML,
 * so a memory titled "<img onerror=...>" is shown as text, not executed.
 * @param {unknown} value
 * @returns {string}
 */
export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch]);
}

/**
 * Creates a DOM element from an HTML string.
 * @param {string} tag   Wrapper element name, e.g. "section".
 * @param {string} html  Inner HTML (dynamic parts must go through escapeHtml).
 * @returns {HTMLElement}
 */
export function createView(tag, html) {
  const el = document.createElement(tag);
  el.innerHTML = html;
  return el;
}

/**
 * Formats an ISO date (YYYY-MM-DD) for display in the user's locale.
 * @param {string} isoDate
 * @returns {string}
 */
export function formatDate(isoDate) {
  // Fixed English locale so dates match the language of the UI.
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Shows a short, non-blocking message at the bottom of the screen.
 * @param {string} message
 * @param {number} [duration=3000] Time in ms before the toast disappears.
 */
export function showToast(message, duration = 3000) {
  document.querySelector('.toast')?.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.textContent = message;
  document.body.append(toast);
  setTimeout(() => toast.remove(), duration);
}
