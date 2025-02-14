class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <header data-aos="fade-down">
        <h1>📙 Notes App</h1>
        <div class="toggle-wrapper" id="theme-toggle">
          <span class="icon">☀️</span>
          <div class="toggle"></div>
          <span class="icon">🌙</span>
        </div>
      </header>
      `;

    this.querySelector('#search-button').addEventListener('click', () => {
      const keyword = this.querySelector('#search-bar').value;
      document.querySelector('note-list').searchNotes(keyword);
    });
  }
}

customElements.define('app-bar', AppBar);
