const body = document.querySelector("body");

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
const debounce = (ms: number, cb: ResizeObserverCallback) => {
  let timer;

  return function() {
    const args = Array.prototype.slice.call(arguments);

    clearTimeout(timer);
    args.unshift(this);
    timer = setTimeout(cb.bind.apply(cb, args), ms);
  };
};

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
