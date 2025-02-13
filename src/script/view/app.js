import { addNote } from '../data/api.js';
import { showSuccess, showError } from '../utils/sweetalert.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#note-form');
  const titleInput = document.querySelector('#note-title');
  const bodyInput = document.querySelector('#note-body');

  // Ensure all elements are found before running the script
  if (!form || !titleInput || !bodyInput) {
    console.error('One or more elements not found.');
    return;
  }

  /** Add a new note */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate input to ensure it's not empty
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (!title || !body) {
      showError('Title and body cannot be empty.');
      return;
    }

    try {
      await addNote({ title, body });
      showSuccess('Note added successfully!');

      // Reset input
      titleInput.value = '';
      bodyInput.value = '';

      // Dispatch event to update notes
      document.dispatchEvent(new CustomEvent('noteUpdated'));
    } catch (error) {
      console.error('Failed to add note:', error);
      showError('Failed to add note. Please try again later.');
    }
  });
});
