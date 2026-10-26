/**
 * View 3 - Memory detail.
 * Purpose: show one memory in full: photo, note, date and place
 * (a map and sharing are added in later parts).
 */
import { getMemory } from '../data/sample-memories.js';
import { createView, escapeHtml, formatDate } from '../utils.js';

/**
 * @param {{ id: string }} params  Route params from "#/memory/:id".
 */
export function renderDetail({ id }) {
  const memory = getMemory(Number(id));

  if (!memory) {
    return createView('section', `
      <div class="empty-state">
        <p>This memory does not exist.</p>
        <a href="#/">Back to memories</a>
      </div>
    `);
  }

  return createView('article', `
    <div class="detail">
      <div class="photo-placeholder" aria-hidden="true">&#9679;</div>
      <h2>${escapeHtml(memory.title)}</h2>
      <p class="meta">${escapeHtml(memory.place)} · ${formatDate(memory.date)}</p>
      <p class="detail-note">${escapeHtml(memory.note)}</p>

      <div class="info-box">Map of the saved location will appear here.</div>
    </div>
  `);
}
