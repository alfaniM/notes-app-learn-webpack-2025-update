import { fetchNotes, addNote, deleteNote, archiveNote, unarchiveNote } from '../data/api.js';
import { showSuccess, showError } from '../utils/sweetalert.js';

document.addEventListener('DOMContentLoaded', () => {
  const noteList = document.querySelector('#notes-container');
  const form = document.querySelector('#note-form');
  const titleInput = document.querySelector('#note-title');
  const bodyInput = document.querySelector('#note-body');

  // Pastikan semua elemen ditemukan sebelum menjalankan script
  if (!noteList || !form || !titleInput || !bodyInput) {
    console.error('Satu atau lebih elemen tidak ditemukan.');
    return;
  }

  /** Render ulang catatan */
  const renderNotes = async () => {
    try {
      const notes = await fetchNotes();
      console.log('Catatan yang diambil:', notes);

      // Pastikan notes adalah array
      if (!Array.isArray(notes)) {
        console.error('Data yang diterima:', notes);
        throw new Error('Data catatan bukan array.');
      }

      // Kosongkan sebelum render
      noteList.innerHTML = '';

      // Tambahkan catatan ke dalam list
      notes.forEach((note) => {
        const noteItem = document.createElement('div');
        noteItem.classList.add('note-item');
        noteItem.innerHTML = `
          <h3>${note.title}</h3>
          <p>${note.body}</p>
          <button class="delete-btn" data-id="${note.id}">Hapus</button>
        `;

        noteList.appendChild(noteItem);
      });

      // Tambahkan event listener untuk tombol hapus
      document.querySelectorAll('.delete-btn').forEach((button) => {
        button.addEventListener('click', async (event) => {
          const noteId = event.target.getAttribute('data-id');
          await handleDelete(noteId);
        });
      });
    } catch (error) {
      console.error('Error saat mengambil catatan:', error);
      showError(`Gagal mengambil catatan: ${error.message}`);
    }
  };

  /** Tambah catatan baru */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validasi input agar tidak kosong
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (!title || !body) {
      showError('Judul dan isi catatan tidak boleh kosong.');
      return;
    }

    try {
      await addNote({ title, body });
      showSuccess('Catatan berhasil ditambahkan!');

      // Reset input
      titleInput.value = '';
      bodyInput.value = '';

      // Render ulang catatan
      await renderNotes();
    } catch (error) {
      console.error('Gagal menambah catatan:', error);
      showError('Gagal menambah catatan. Coba lagi nanti.');
    }
  });

  /** Hapus catatan */
  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      showSuccess('Catatan berhasil dihapus!');
      await renderNotes();
    } catch (error) {
      console.error('Gagal menghapus catatan:', error);
      showError('Gagal menghapus catatan.');
    }
  };

  // Panggil renderNotes saat halaman dimuat
  renderNotes();
});
