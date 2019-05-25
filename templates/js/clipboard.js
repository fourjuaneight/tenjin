const codeBlocks = document.querySelectorAll('div.highlight');

codeBlocks.forEach(el => {
  const button = document.createElement('button');
  button.classList.add('clipboard__button');
  button.innerHTML = 'Copy';
  el.prepend(button);
});

const clip = document.querySelectorAll('button.clipboard__button');

clip.forEach(copy => {
  copy.addEventListener('click', () => {
    const selection = window.getSelection();
    const range = document.createRange();
    const pre = copy.nextSibling;
    const code = pre.querySelector('code');
    const original = copy.innerHTML;
    range.selectNodeContents(code);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      document.execCommand('copy');
      selection.removeAllRanges();
      copy.innerHTML = 'Copied!';
      setTimeout(() => {
        copy.innerHTML = original;
      }, 1000);
    } catch (_unused) {
      copy.innerHTML = 'Can\'t copy, hit Ctrl+C!';
      setTimeout(() => {
        copy.innerHTML = original;
      }, 1000);
    }
  });
});