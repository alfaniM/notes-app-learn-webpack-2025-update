import { fetchNotes } from '../data/api.js';

class NoteList extends HTMLElement {
  connectedCallback() {
    this.renderNotes();
  }

  async renderNotes() {
    this.innerHTML = '';
    const notesData = await fetchNotes();
    notesData.forEach((note) => {
      const noteItem = document.createElement('note-item');
      noteItem.setAttribute('title', note.title);
      noteItem.setAttribute('body', note.body);
      noteItem.setAttribute('date', new Date(note.createdAt).toLocaleDateString());
      this.appendChild(noteItem);
    });
  }
}

customElements.define('note-list', NoteList);
