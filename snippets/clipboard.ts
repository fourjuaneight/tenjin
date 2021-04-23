/* eslint-disable quotes */
const clip = document.querySelector('button.clip-btn');

// create selection range for <code> element
clip.addEventListener('click', () => {
  const selection: Selection = window.getSelection();
  const range: Range = document.createRange();
  const pre: Element = clip.nextSibling;
  const code: HTMLElement = pre.querySelector('code');
  const original: string = clip.innerHTML;

  // get element contents
  range.selectNodeContents(code);
  selection.removeAllRanges();
  selection.addRange(range);

  try {
    // set contents to clipboard
    document.execCommand('copy');
    selection.removeAllRanges();

    // notified text was copied
    clip.innerHTML = 'Copied!';
    // and remove message after 3 seconds
    setTimeout(() => {
      clip.innerHTML = original;
    }, 3000);
  } catch (_unused) {
    // notified copying failed
    clip.innerHTML = 'Can't copy, hit Ctrl+C!';
    // and remove message after 3 seconds
    setTimeout(() => {
      clip.innerHTML = original;
    }, 3000);
  }
});
