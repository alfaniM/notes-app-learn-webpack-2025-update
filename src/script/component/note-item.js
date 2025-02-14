import { deleteNote, archiveNote, unarchiveNote } from '../data/api.js';
import { showConfirm, showSuccess, showError } from '../utils/sweetalert.js';

class NoteItem extends HTMLElement {
  connectedCallback() {
    this.title = this.getAttribute('title');
    this.body = this.getAttribute('body');

    this.date = this.getAttribute('date');
    this.id = this.getAttribute('id');
    this.archived = this.getAttribute('archived') === 'true';

    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="note-item">
        <h2>${this.title}</h2>
        <p>${this.body}</p>
        <small>${this.date}</small>
        <div class="note-actions">
          <button class="button delete-note" data-id="${this.id}">❌ Delete</button>
          ${this.archived ? `<button class="unarchive-note" data-id="${this.id}">📤 Unarchive</button>` : `<button class="archive-note" data-id="${this.id}">📥 Archive</button>`}
        </div>
      </div>
    `;

    this.querySelector('.delete-note').addEventListener('click', async () => {
      const confirmed = await showConfirm(
        'Kalo dihapus, gak bisa balik lagi lho!'
      );
      if (confirmed) {
        try {
          await deleteNote(this.id);
          showSuccess('Notes berhasil di hapus!');
          document.dispatchEvent(new CustomEvent('noteUpdated'));
        } catch (error) {
          showError('Gagal menghapus notes. Coba lagi nanti ya!');
        }
      }
    });

    if (!this.archived) {
      this.querySelector('.archive-note').addEventListener(
        'click',
        async () => {
          await archiveNote(this.id);
          document.dispatchEvent(new CustomEvent('noteUpdated'));
        }
      );
    }

    if (this.archived) {
      this.querySelector('.unarchive-note').addEventListener(
        'click',
        async () => {
          await unarchiveNote(this.id);
          document.dispatchEvent(new CustomEvent('noteUpdated'));
        }
      );
    }
  }
}

customElements.define('note-item', NoteItem);
