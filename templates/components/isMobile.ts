const body = document.querySelector("body");

/**
 * Update the body element with a data attribute to indicate if the screen is mobile or not.
 */
const updateBody = (element: Element) => {
  window.requestAnimationFrame(() => {
    const rect = element.getBoundingClientRect();

    if (rect.width < 768 && body) {
      body.setAttribute("data-mobile", "true");
    } else if (body) {
      body.setAttribute("data-mobile", "false");
    }
  });
};

/**
 * Debounce function to limit the number of times a function is called.
 * @param ms - number of milliseconds to wait before calling the function.
 * @param cb - callback method
 */
const debounce = (ms: number, cb: ResizeObserverCallback) => {
  let timer;

  return function() {
    const args = Array.prototype.slice.call(arguments);

    clearTimeout(timer);
    args.unshift(this);
    timer = setTimeout(cb.bind.apply(cb, args), ms);
  };
};

/**
 * Check if the browser supports ResizeObserver and if so, use it to detect screen size changes.
 * If not, use the resize event listener.
 */
if ("ResizeObserver" in window && body) {
  const resizeObserver = new ResizeObserver(
    debounce(250, (entries) => {
      for (const entry of entries) {
        updateBody(entry.target);
      }
    })
  );

  resizeObserver.observe(body);
} else if (body) {
  window.addEventListener(
    "resize",
    () => {
      let throttled = false;
      // only run if we're not throttled
      if (!throttled) {
        // actual callback action
        updateBody(body);
        // we're throttled!
        throttled = true;
        // set a timeout to un-throttle
        setTimeout(() => {
          throttled = false;
        }, 250);
      }
    },
    false
  );
}
