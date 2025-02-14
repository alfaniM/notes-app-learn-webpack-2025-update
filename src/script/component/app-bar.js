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
  }
}
customElements.define('app-bar', AppBar);
