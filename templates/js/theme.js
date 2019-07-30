const root = document.querySelector('html');
const compStyles = window.getComputedStyle(root);
const localTheme = localStorage.getItem('theme');
const osTheme = compStyles.getPropertyValue('--theme').replace(' ', '');
const toggle = document.querySelector('#theme');

switch (localTheme || osTheme) {
  case 'dark':
    root.setAttribute('data-theme', 'dark');
    toggle.checked = true;
    break;
  case 'light':
    root.setAttribute('data-theme', 'light');
    toggle.checked = false;
    break;
  default:
    root.setAttribute('data-theme', 'light');
    toggle.checked = false;
}

toggle.addEventListener('input', () => {
  switch (toggle.checked) {
    case false:
      localStorage.setItem('theme', 'light');
      break;
    case true:
      localStorage.setItem('theme', 'dark');
      break;
    default:
      localStorage.setItem('theme', 'dark');
  }
  switch (root.getAttribute('data-theme')) {
    case 'dark':
      root.setAttribute('data-theme', 'light');
      break;
    case 'light':
      root.setAttribute('data-theme', 'dark');
      break;
    default:
      root.setAttribute('data-theme', 'dark');
  }
});