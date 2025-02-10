document.addEventListener('DOMContentLoaded', () => {
  const toggleWrapper = document.getElementById('theme-toggle');

  if (!toggleWrapper) {
    console.error('Error: Could not find the toggle button.');
    return;
  }

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  };
  initTheme();

  toggleWrapper.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Set the new theme
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
});
