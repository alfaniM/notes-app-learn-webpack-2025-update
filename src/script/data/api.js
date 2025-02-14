const BASE_URL = 'https://notes-api.dicoding.dev/v2';

async function fetchWithHandling(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('Fetch gagal:', error);

    if (!navigator.onLine) {
      showOfflineAlert();
    } else {
      showError(
        error.message || 'Gagal mengambil data, coba beberapa saat lagi.'
      );
    }

    throw error;
  }
}

/** Fetch data untuk active notes */
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

/** Fetch data untuk archived notes */
export async function fetchArchivedNotes() {
  const result = await fetchWithHandling(`${BASE_URL}/notes/archived`);
  if (result && result.data && Array.isArray(result.data)) {
    return result.data;
  } else if (result && result.data && Array.isArray(result.data.notes)) {
    return result.data.notes;
  } else {
    throw new Error('Invalid response format');
  }
}

/** Tambah notes baru */
export function addNote(note) {
  return fetchWithHandling(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
}

/** Hapus notes */
export function deleteNote(id) {
  return fetchWithHandling(`${BASE_URL}/notes/${id}`, { method: 'DELETE' });
}

/** Asripskan notes*/
export function archiveNote(id) {
  return fetchWithHandling(`${BASE_URL}/notes/${id}/archive`, {
    method: 'POST',
  });
}

/** Mengembalikan notes menjadi aktif*/
export function unarchiveNote(id) {
  return fetchWithHandling(`${BASE_URL}/notes/${id}/unarchive`, {
    method: 'POST',
  });
}
