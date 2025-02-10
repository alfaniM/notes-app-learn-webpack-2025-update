const API_URL = 'https://notes-api.dicoding.dev/v2';

export const fetchNotes = async () => {
  try {
    const response = await fetch(`${API_URL}/notes`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    return [];
  }
};

export const addNote = async (note) => {
  try {
    const response = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to add note:', error);
    return null;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to delete note:', error);
    return null;
  }
};
