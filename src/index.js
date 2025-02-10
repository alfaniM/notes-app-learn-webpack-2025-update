import { fetchNotes, addNote, deleteNote } from './script/data/api.js';
import './script/component/toggle-theme.js';
import './script/component/note-item.js';
import './script/component/note-list.js';
import './script/component/footer-bar.js';

document.addEventListener('DOMContentLoaded', async () => {
  const noteList = document.querySelector('#notes-container');
  const form = document.querySelector('#note-form');
  const titleInput = document.querySelector('#note-title');
  const bodyInput = document.querySelector('#note-body');

  // Render ulang catatan
  const renderNotes = async () => {
    const noteListComponent = document.createElement('note-list');
    noteList.innerHTML = '';
    noteList.appendChild(noteListComponent);
  };

  // Tambah catatan baru
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await addNote({
      title: titleInput.value,
      body: bodyInput.value,
    });
    titleInput.value = '';
    bodyInput.value = '';
    renderNotes();
  });

  renderNotes();
});
