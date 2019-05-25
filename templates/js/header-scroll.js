let scrollPos = window.scrollY;
const header = document.querySelector('header');
const header_height = header.offsetHeight;
const fade = () => header.classList.add('fade');
const removeFade = () => header.classList.remove('fade');

window.addEventListener('scroll', () => {
  scrollPos = window.scrollY;
  if (scrollPos >= header_height) { fade(); }
  else { removeFade(); }
});
