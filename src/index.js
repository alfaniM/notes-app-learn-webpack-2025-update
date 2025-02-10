import notesData from './script/data/local.js';
import './script/component/toggle-theme.js';
import './script/component/note-item.js';
import './script/component/note-list.js';
import './script/component/footer-bar.js';

document.addEventListener('DOMContentLoaded', () => {
  const noteList = document.querySelector('#notes-container');
  const form = document.querySelector('#note-form');
  const titleInput = document.querySelector('#note-title');
  const bodyInput = document.querySelector('#note-body');

  // Render notes
  const renderNotes = () => {
    noteList.innerHTML = '';
    notesData.forEach((note) => {
      const noteItem = document.createElement('note-item');
      noteItem.setAttribute('title', note.title);
      noteItem.setAttribute('body', note.body);
      noteItem.setAttribute('date', new Date(note.createdAt).toLocaleDateString());
      noteList.appendChild(noteItem);
    });
  };

  // Add new note
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newNote = {
      id: `note-${Date.now()}`,
      title: titleInput.value,
      body: bodyInput.value,
      createdAt: new Date().toISOString(),
      archived: false,
    };
    notesData.push(newNote);
    titleInput.value = '';
    bodyInput.value = '';
    renderNotes();
  });

  renderNotes();
});
