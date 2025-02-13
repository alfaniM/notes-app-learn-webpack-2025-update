import { fetchNotes, fetchArchivedNotes } from '../data/api.js';

class NoteList extends HTMLElement {
  async connectedCallback() {
    console.log('NoteList connected');
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

    try {
      const activeNotes = await fetchNotes();
      const archivedNotes = await fetchArchivedNotes();
      console.log('Active Notes:', activeNotes);
      console.log('Archived Notes:', archivedNotes);

      if (!Array.isArray(activeNotes)) {
        throw new Error('Active notes data is not an array.');
      }

      if (!Array.isArray(archivedNotes)) {
        throw new Error('Archived notes data is not an array.');
      }

      this.renderNoteList(activeNotes, '#active-notes');
      this.renderNoteList(archivedNotes, '#archived-notes');
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }

  renderNoteList(notes, containerSelector) {
    const container = this.querySelector(containerSelector);
    container.innerHTML = '';
    notes.forEach((note) => {
      console.log('Rendering Note:', note);
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
