class NavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
          /* Navbar container */
          .navbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #ffffff;
            padding: 10px 20px;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
  
          /* Logo + Text */
          .navbar-left {
            display: flex;
            align-items: center;
            gap: 8px;
          }
  
          .navbar-logo {
            width: 32px;
            height: 32px;
          }
  
          .navbar-title {
            font-size: 18px;
            font-weight: bold;
            color: #333;
          }
  
          /* Search Input */
          .navbar-search {
            display: flex;
            align-items: center;
            background: #f5f5f5;
            padding: 6px 12px;
            border-radius: 20px;
          }
  
          .navbar-search input {
            border: none;
            outline: none;
            background: transparent;
            font-size: 14px;
            padding: 4px;
          }
  
          .navbar-search i {
            color: #888;
            margin-left: 6px;
          }
  
          /* Profile Avatar */
          .navbar-profile img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            object-fit: cover;
          }
        </style>
  
        <nav class="navbar">
          <!-- Kiri: Logo dan Title -->
          <div class="navbar-left">
            <img src="logo.png" alt="Logo" class="navbar-logo" />
            <span class="navbar-title">My Notes App</span>
          </div>
  
          <!-- Tengah: Input Pencarian -->
          <div class="navbar-search">
            <input type="text" placeholder="Cari notes..." />
            <i class="fas fa-search"></i> <!-- Gunakan FontAwesome atau icon lainnya -->
          </div>
  
          <!-- Kanan: Profil Avatar -->
          <div class="navbar-profile">
            <img src="avatar.png" alt="User Avatar" />
          </div>
        </nav>
      `;
  }
}

// Daftarkan Web Component
customElements.define('nav-bar', NavBar);
