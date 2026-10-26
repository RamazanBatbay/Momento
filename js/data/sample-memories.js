/**
 * Temporary in-memory data used while the UI is being built (part 1).
 * In part 2 this module is replaced by an IndexedDB store (js/data/db.js)
 * so that memories are saved on the device and available offline.
 */

/** @type {Array<{id: number, title: string, note: string, date: string, place: string}>} */
const memories = [
  {
    id: 1,
    title: 'Sunrise over the Vistula',
    note: 'Walked along the boulevards before the city woke up. Cold, but worth it.',
    date: '2026-09-28',
    place: 'Warsaw, Poland',
  },
  {
    id: 2,
    title: 'Old Town market square',
    note: 'Pierogi from the corner stall and a street musician playing Chopin.',
    date: '2026-10-04',
    place: 'Kraków, Poland',
  },
  {
    id: 3,
    title: 'Hiking in the Tatras',
    note: 'Reached Morskie Oko around noon. The lake was perfectly still.',
    date: '2026-10-18',
    place: 'Zakopane, Poland',
  },
];

/** Returns all memories, newest first. */
export function getAllMemories() {
  return [...memories].sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * @param {number} id
 * @returns {object | undefined}
 */
export function getMemory(id) {
  return memories.find((m) => m.id === id);
}
