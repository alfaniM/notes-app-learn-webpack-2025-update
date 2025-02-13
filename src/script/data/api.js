const BASE_URL = 'https://notes-api.dicoding.dev/v2';

/** Helper untuk fetch dengan error handling */
async function fetchWithHandling(url, options = {}) {
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    // console.log('Respon API:', result); // Tambahkan ini untuk debug

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error(`Gagal melakukan fetch: ${url}`, error);
    throw error; // Biarkan error diteruskan ke pemanggil
  }
}

/** Ambil catatan aktif */
export async function fetchNotes() {
  const result = await fetchWithHandling(`${BASE_URL}/notes`);
  if (result && result.data && Array.isArray(result.data)) {
    return result.data;
  } else if (result && result.data && Array.isArray(result.data.notes)) {
    return result.data.notes;
  } else {
    throw new Error('Invalid response format');
  }
}

/** Ambil catatan yang diarsipkan */
export function fetchArchivedNotes() {
  return fetchWithHandling(`${BASE_URL}/notes/archived`);
}

/** Tambah catatan baru */
export function addNote(note) {
  return fetchWithHandling(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
}

/** Hapus catatan */
export function deleteNote(id) {
  return fetchWithHandling(`${BASE_URL}/notes/${id}`, { method: 'DELETE' });
}

/** Arsipkan catatan */
export function archiveNote(id) {
  return fetchWithHandling(`${BASE_URL}/notes/${id}/archive`, { method: 'POST' });
}

/** Kembalikan catatan dari arsip */
export function unarchiveNote(id) {
  return fetchWithHandling(`${BASE_URL}/notes/${id}/unarchive`, { method: 'POST' });
}
