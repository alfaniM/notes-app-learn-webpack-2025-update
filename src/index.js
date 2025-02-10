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

  // Render notes
  const renderNotes = async () => {
    noteList.innerHTML = '';
    const notesData = await fetchNotes();
    notesData.forEach((note) => {
      const noteItem = document.createElement('note-item');
      noteItem.setAttribute('title', note.title);
      noteItem.setAttribute('body', note.body);
      noteItem.setAttribute('date', new Date(note.createdAt).toLocaleDateString());
      noteList.appendChild(noteItem);
    });
  };

  // Add new note
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newNote = {
      title: titleInput.value,
      body: bodyInput.value,
    };
    await addNote(newNote);
    titleInput.value = '';
    bodyInput.value = '';
    renderNotes();
  });

  // Delete note
  noteList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-note')) {
      const noteId = e.target.dataset.id;
      await deleteNote(noteId);
      renderNotes();
    }
  });

  renderNotes();
});
