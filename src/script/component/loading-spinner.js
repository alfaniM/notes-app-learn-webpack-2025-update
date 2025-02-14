class LoadingSpinner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
        <style>
          .spinner-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50px;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
          }
          .spinner {
            width: 20px;
            height: 20px;
            border: 4px solid rgba(0, 0, 0, 0.2);
            border-top-color: #007bff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .visible { opacity: 1; }
        </style>
        <div class="spinner-container">
          <div class="spinner"></div>
        </div>
      `;
  }

  show() {
    this.shadowRoot
      .querySelector('.spinner-container')
      .classList.add('visible');
  }

  hide() {
    setTimeout(() => {
      this.shadowRoot
        .querySelector('.spinner-container')
        .classList.remove('visible');
    }, 300);
  }
}

customElements.define('loading-spinner', LoadingSpinner);
