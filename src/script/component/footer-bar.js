class FooterBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
        <style>
          :host {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background: #1e1e1e;
            color: white;
            text-align: center;
            padding: 10px 0;
            font-size: 1.2rem;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        </style>
        <footer>
          Made with ❤️
        </footer>
      `;
  }
}

customElements.define('footer-bar', FooterBar);
