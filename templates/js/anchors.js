const headings = document.querySelectorAll("h1, h2");

const createAnchor = id => {
  const anchor = document.createElement("a");
  const url = document.URL;
  anchor.className = "doc__anchor";
  anchor.href = "".concat(url, "#").concat(id);
  anchor.setAttribute("aria-label", "Link to section.");
  anchor.innerHTML = '&sect;';
  return anchor;
};

headings.forEach(el => {
  el.prepend(createAnchor(el));
});
