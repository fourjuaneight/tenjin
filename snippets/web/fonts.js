/**
 * Font loading via FontFace API to avoid FOUT.
 * After US charset subset files load, load full Latin chartset files.
 */
if ('fonts' in document) {
  const regular = new FontFace(
    '<FONT>',
    'url(/fonts/<FONT>-Regular.woff2) format("woff2"), url(/fonts/<FONT>-Regular.woff) format("woff")'
  );
  const bold = new FontFace(
    '<FONT>',
    'url(/fonts/<FONT>-Bold.woff2) format("woff2"), url(/fonts/<FONT>-Bold.woff) format("woff")',
    { weight: '700' }
  );

  Promise.all([bold.load(), regular.load()]).then(fonts => {
    fonts.forEach(font => {
      document.fonts.add(font);
    });
  });
}
