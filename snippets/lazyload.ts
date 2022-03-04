const imgs: NodeListOf<HTMLImageElement> = document.querySelectorAll(
  'img[data-lazy="true"]'
);

let observer = new IntersectionObserver((entries, self) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement;

      img.src = img.dataset.src;
      img.removeAttribute('data-lazy');

      self.unobserve(img);
    }
  });
});

if (imgs.length > 0) {
  imgs.forEach(img => {
    observer.observe(img);
  });
}
