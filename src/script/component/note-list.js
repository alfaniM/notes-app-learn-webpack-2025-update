import { fetchNotes, fetchArchivedNotes } from '../data/api.js';

class NoteList extends HTMLElement {
  async connectedCallback() {
    console.log('NoteList connected');
    this.renderNotes();
    document.addEventListener('noteUpdated', () => this.renderNotes());
  }

  async renderNotes() {
    this.innerHTML = `
      <loading-spinner></loading-spinner>
      <h2 data-aos="fade-right">Active Notes</h2>
      <div class="note-grid fade-in" id="active-notes" data-aos="fade-up"></div>
      <h2 data-aos="fade-right">Archived Notes</h2>
      <div class="note-grid fade-in" id="archived-notes" data-aos="fade-up"></div>
    `;

    await customElements.whenDefined('loading-spinner');
    const spinner = this.querySelector('loading-spinner');

    if (!spinner) {
      console.error('Loading spinner tidak ditemukan!');
      return;
    }

    spinner.show();
    console.log('Loading spinner ditampilkan');

    try {
      const activeNotes = await fetchNotes();
      const archivedNotes = await fetchArchivedNotes();

      this.renderNoteList(activeNotes, '#active-notes');
      this.renderNoteList(archivedNotes, '#archived-notes');

      setTimeout(() => {
        this.querySelector('#active-notes').style.opacity = '1';
        this.querySelector('#archived-notes').style.opacity = '1';
      }, 300);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      spinner.hide();
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
      noteItem.setAttribute(
        'date',
        new Date(note.createdAt).toLocaleDateString()
      );
      noteItem.setAttribute('id', note.id);
      noteItem.setAttribute('archived', note.archived);
      container.appendChild(noteItem);
    });
  }
}

customElements.define('note-list', NoteList);
