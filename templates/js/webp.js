/*
Authored by Juan Villela.
https://github.com/fourjuaneight
*/

function WebpIsSupported(callback) {
  // If the browser doesn't has the method createImageBitmap, you can't display webp format
  if (!window.createImageBitmap) {
    callback(false);
    return;
  }

  // Base64 representation of a white point image
  const webpdata = `data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=`;

  // Retrieve the Image in Blob Format
  fetch(webpdata)
    .then(response => {
      return response.blob();
    })
    .then(blob => {
      // If the createImageBitmap method succeeds, return true, otherwise false
      createImageBitmap(blob).then(
        () => {
          callback(true);
        },
        () => {
          callback(false);
        }
      );
    });
}
// Added class to supported
const hero = document.querySelectorAll(`section.hero`);
WebpIsSupported(isSupported => {
  if (isSupported) {
    hero.forEach(bg => {
      bg.classList.add(`webp`);
    });
  }
});
