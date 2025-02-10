class NoteItem extends HTMLElement {
  connectedCallback() {
    this.title = this.getAttribute('title');
    this.body = this.getAttribute('body');
    this.date = this.getAttribute('date');
    this.id = this.getAttribute('id');

    this.innerHTML = `
        <div class="note-item">
          <h2>${this.title}</h2>
          <p>${this.body}</p>
          <small>${this.date}</small>
          <button class="delete-note" data-id="${this.id}">Delete</button>
        </div>
      `;

    this.querySelector('.delete-note').addEventListener('click', async (e) => {
      const noteId = e.target.dataset.id;
      await deleteNote(noteId);
      this.remove();
    });
  }
}

customElements.define('note-item', NoteItem);
