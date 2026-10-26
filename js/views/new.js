/**
 * View 2 - New memory form.
 * Purpose: create a memory from a photo (camera), the current location
 * (geolocation) and a short note.
 *
 * Part 1: layout and validation only. The camera and location buttons are
 * wired up in parts 2 and 3, saving to IndexedDB in part 2.
 */
import { createView, showToast } from '../utils.js';

export function renderNew() {
  // "en-CA" formats as YYYY-MM-DD in local time, which <input type="date"> expects.
  const today = new Date().toLocaleDateString('en-CA');

  const view = createView('section', `
    <h2 class="view-title">New memory</h2>
    <p class="view-subtitle">Capture the moment and where it happened.</p>

    <form class="form" novalidate>
      <div class="device-actions">
        <button type="button" class="btn btn-secondary" disabled>Take photo</button>
        <button type="button" class="btn btn-secondary" disabled>Use my location</button>
      </div>
      <p class="hint">Camera and location access are coming in the next updates.</p>

      <div class="field">
        <label for="title">Title</label>
        <input id="title" name="title" required maxlength="80" placeholder="e.g. Sunset at the pier">
      </div>

      <div class="field">
        <label for="place">Place</label>
        <input id="place" name="place" maxlength="80" placeholder="City, country">
      </div>

      <div class="field">
        <label for="date">Date</label>
        <input id="date" name="date" type="date" value="${today}" max="${today}" required>
      </div>

      <div class="field">
        <label for="note">Note</label>
        <textarea id="note" name="note" maxlength="2000" placeholder="What made this moment special?"></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Save memory</button>
    </form>
  `);

  view.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    showToast('Form is valid - saving on the device arrives in part 2.');
  });

  return view;
}
