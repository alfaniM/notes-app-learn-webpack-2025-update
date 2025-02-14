import { addNote } from '../data/api.js';
import {
  showSuccess,
  showError,
  showOfflineAlert,
} from '../utils/sweetalert.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#note-form');
  const titleInput = document.querySelector('#note-title');
  const bodyInput = document.querySelector('#note-body');

  if (!form || !titleInput || !bodyInput) {
    console.error('One or more elements not found.');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (!title || !body) {
      showError('Title and body cannot be empty.');
      return;
    }

    try {
      await addNote({ title, body });
      showSuccess('Yeay, berhasil menambahkan note!');

      titleInput.value = '';
      bodyInput.value = '';

      document.dispatchEvent(new CustomEvent('noteUpdated'));
    } catch (error) {
      console.error('Failed to add note:', error);
      showError('Yah gagal, coba lagi nanti ya!');
    }
  });
});

window.addEventListener('load', function () {
  if (!navigator.onLine) {
    showOfflineAlert();
  }
});
