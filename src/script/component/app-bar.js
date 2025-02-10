class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <header>
          <h1>📙 Notes App</h1>
          <input type="text" id="search-bar" placeholder="Search notes...">
        </header>
      `;

    this.querySelector('#search-bar').addEventListener('input', (event) => {
      document.querySelector('note-list').filterNotes(event.target.value);
    });
  }
}

customElements.define('app-bar', AppBar);
