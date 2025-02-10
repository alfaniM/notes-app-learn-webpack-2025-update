import { fetchNotes, fetchArchivedNotes } from '../data/api.js';

class NoteList extends HTMLElement {
  async connectedCallback() {
    this.renderNotes();
    document.addEventListener('noteUpdated', () => this.renderNotes());
  }

  async renderNotes() {
    this.innerHTML = `
      <h2>Active Notes</h2>
      <div class="note-grid" id="active-notes"></div>
      <h2>Archived Notes</h2>
      <div class="note-grid" id="archived-notes"></div>
    `;

    const activeNotes = await fetchNotes();
    const archivedNotes = await fetchArchivedNotes();

    this.renderNoteList(activeNotes, '#active-notes');
    this.renderNoteList(archivedNotes, '#archived-notes');
  }

  renderNoteList(notes, containerSelector) {
    const container = this.querySelector(containerSelector);
    container.innerHTML = '';
    notes.forEach((note) => {
      const noteItem = document.createElement('note-item');
      noteItem.setAttribute('title', note.title);
      noteItem.setAttribute('body', note.body);
      noteItem.setAttribute('date', new Date(note.createdAt).toLocaleDateString());
      noteItem.setAttribute('id', note.id);
      noteItem.setAttribute('archived', note.archived);
      container.appendChild(noteItem);
    });
  }
}

customElements.define('note-list', NoteList);
