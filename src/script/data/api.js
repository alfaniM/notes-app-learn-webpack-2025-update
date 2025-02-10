const BASE_URL = 'https://notes-api.dicoding.dev/v2';

/** Ambil catatan aktif */
export async function fetchNotes() {
  const response = await fetch(`${BASE_URL}/notes`);
  const { data } = await response.json();
  return data;
}

/** Ambil catatan yang diarsipkan */
export async function fetchArchivedNotes() {
  const response = await fetch(`${BASE_URL}/notes/archived`);
  const { data } = await response.json();
  return data;
}

/** Tambah catatan baru */
export async function addNote(note) {
  await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
}

/** Hapus catatan */
export async function deleteNote(id) {
  await fetch(`${BASE_URL}/notes/${id}`, { method: 'DELETE' });
}

/** Arsipkan catatan */
export async function archiveNote(id) {
  await fetch(`${BASE_URL}/notes/${id}/archive`, { method: 'POST' });
}

/** Kembalikan catatan dari arsip */
export async function unarchiveNote(id) {
  await fetch(`${BASE_URL}/notes/${id}/unarchive`, { method: 'POST' });
}
