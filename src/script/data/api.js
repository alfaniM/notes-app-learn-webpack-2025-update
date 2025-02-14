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

export function addNote(note) {
  return fetchWithHandling(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
}

export function deleteNote(id) {
  return fetchWithHandling(`${BASE_URL}/notes/${id}`, { method: 'DELETE' });
}

export function archiveNote(id) {
  return fetchWithHandling(`${BASE_URL}/notes/${id}/archive`, {
    method: 'POST',
  });
}

export function unarchiveNote(id) {
  return fetchWithHandling(`${BASE_URL}/notes/${id}/unarchive`, {
    method: 'POST',
  });
}
