if ('fonts' in document) {
  const regular = new FontFace(
    'Rubik',
    "url(/fonts/Rubik-Regular.woff2) format('woff2'), url(/fonts/Rubik-Regular.woff) format('woff')"
  );
  const bold = new FontFace(
    'Rubik',
    "url(/fonts/Rubik-Bold.woff2) format('woff2'), url(/fonts/Rubik-Bold.woff) format('woff')",
    { weight: '700' }
  );
  Promise.all([bold.load(), regular.load()]).then(fonts => {
    fonts.forEach(font => {
      document.fonts.add(font);
    });
  });
}