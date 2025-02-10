class NoteItem extends HTMLElement {
  connectedCallback() {
    this.title = this.getAttribute('title');
    this.body = this.getAttribute('body');
    this.date = this.getAttribute('date');

    this.innerHTML = `
        <div class="note-item">
          <h2>${this.title}</h2>
          <p>${this.body}</p>
          <small>${this.date}</small>
        </div>
      `;
  }
}

customElements.define('note-item', NoteItem);
