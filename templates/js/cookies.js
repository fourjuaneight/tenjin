const cookies = document.querySelector('div.cookies__dialogue');
const accept = document.querySelector('button.cookies__button');

if (localStorage.getItem('cookies')) {
  const status = localStorage.getItem('cookies');
  cookies.classList.add(status);
}

accept.addEventListener('click', () => {
  cookies.classList.add('accepted');
  localStorage.setItem('cookies', 'accepted');
});
