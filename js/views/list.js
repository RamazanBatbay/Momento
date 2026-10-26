/**
 * View 1 - Memories list (home screen).
 * Purpose: browse all saved memories and open one of them.
 */
import { getAllMemories } from '../data/sample-memories.js';
import { createView, escapeHtml, formatDate } from '../utils.js';

export function renderList() {
  const memories = getAllMemories();

  if (memories.length === 0) {
    return createView('section', `
      <div class="empty-state">
        <p>No memories yet.</p>
        <a class="btn btn-primary" href="#/new">Add your first memory</a>
      </div>
    `);
  }

  const cards = memories.map((m) => `
    <li>
      <a class="memory-card" href="#/memory/${m.id}">
        <div class="photo-placeholder" aria-hidden="true">&#9679;</div>
        <div class="memory-card-body">
          <h3>${escapeHtml(m.title)}</h3>
          <p class="meta">${escapeHtml(m.place)} · ${formatDate(m.date)}</p>
        </div>
      </a>
    </li>
  `).join('');

  return createView('section', `
    <h2 class="view-title">Your memories</h2>
    <p class="view-subtitle">${memories.length} saved places</p>
    <ul class="memory-grid">${cards}</ul>
  `);
}
