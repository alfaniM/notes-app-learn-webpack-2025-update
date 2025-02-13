const BASE_URL = 'https://notes-api.dicoding.dev/v2';

/** Helper for fetch with error handling */
async function fetchWithHandling(url, options = {}) {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log('Fetch URL:', url);
    console.log('Fetch Result:', result);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error(`Failed to fetch: ${url}`, error);
    throw error; // Let the error propagate
  }
}

/** Fetch active notes */
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

/** Fetch archived notes */
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

/** Add a new note */
export function addNote(note) {
  return fetchWithHandling(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
}

/** Delete a note */
export function deleteNote(id) {
  return fetchWithHandling(`${BASE_URL}/notes/${id}`, { method: 'DELETE' });
}

/** Archive a note */
export function archiveNote(id) {
  return fetchWithHandling(`${BASE_URL}/notes/${id}/archive`, { method: 'POST' });
}

/** Unarchive a note */
export function unarchiveNote(id) {
  return fetchWithHandling(`${BASE_URL}/notes/${id}/unarchive`, { method: 'POST' });
}
