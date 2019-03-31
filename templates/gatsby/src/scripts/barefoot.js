/* eslint class-methods-use-this: ["error", { "exceptMethods": ["removeBackLinks","removeFootnoteChild","debounce","calculateMargins"] }] */
class BareFoot {
  /**
   * @param {Object} options [Options to configure the script]
   * @constructor
   */
  constructor(options = {}) {
    const DEFAULTS = {
      activeBtnClass: `is-active`,
      activeCallback: null,
      activeFnClass: `footnote-is-active`,
      backdropClass: `footnote-backdrop`,
      buttonClass: `footnote-button`,
      divFootnotesQuery: `.footnotes`,
      fnButtonMarkup: `<button class='footnote-button' id='{{FOOTNOTEREFID}}' data-footnote='{{FOOTNOTEID}}' alt='See Footnote {{FOOTNOTENUMBER}}' aria-label='Button for Footnote {{FOOTNOTENUMBER}}' rel='footnote' data-fn-number='{{FOOTNOTENUMBER}}' data-fn-content='{{FOOTNOTECONTENT}}'></button>`,
      fnClass: `bf-footnote`,
      fnContainer: `footnote-container`,
      fnContentClass: `footnote-content`,
      fnContentMarkup: `<div class='bf-footnote' id='{{FOOTNOTEID}}'><div class='footnote-wrapper'><div class='footnote-content' tabindex='0'>{{FOOTNOTECONTENT}}</div></div><div class='footnote-tooltip' aria-hidden='true'></div>`,
      fnOnTopClass: `footnote-is-top`,
      fnWrapperClass: `footnote-wrapper`,
      footnotesQuery: `[id^='fn']`,
      scope: `body`,
      supQuery: `a[data-href^='#fnref']`,
      tooltipClass: `footnote-tooltip`,
    };
    // Merges defaults with custom options
    this.config = Object.assign({}, DEFAULTS, options);

    // A selector could select multiple containers
    this.divFootnotes = [].slice.call(
      document.querySelectorAll(this.config.divFootnotesQuery)
    );

    // Returns if no container
    if (!this.divFootnotes) return false;

    // Groups all footnotes within every group.
    this.footnotes = this.divFootnotes.map(el => {
      return el.querySelectorAll(this.config.footnotesQuery);
    });

    // Calculate vertical scrollbar width
    // Inspired by https://davidwalsh.name/detect-scrollbar-width

    const scrollDiv = document.createElement(`div`);
    scrollDiv.style.cssText = `width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px; visibility: hidden;`;
    document.body.appendChild(scrollDiv);
    this.scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
  }

  /**
   * Footnotes often have a link to return to the sup, before moving the contents to each individual footnote, we gotta remove this hook to get a clean content.
   * @param  {String} fnHtml [Html from the footnote]
   * @param  {String} backId [ID this footnote refers to]
   * @return {String}        [Clean Html]
   */
  removeBackLinks(fnHtml, backId) {
    if (backId.indexOf(`#`) === 0) {
      backId = backId.slice(1); // eslint-disable-line no-param-reassign
    }

    const regex = new RegExp(
      `(\\s|&nbsp;)*<\\s*a[^#<]*#${backId}[^>]*>(.*?)<\\s*/\\s*a>`,
      `g`
    );

    return fnHtml.replace(regex, ``).replace(`[]`, ``);
  }

  /**
   * Builds the buttons for each footnote based on the configured template.
   * @param  {String} ref     [ID this element refers to]
   * @param  {String} id      [ID for this element]   * @param  {String} n       [Number that illustrates the footnote]
   * @param  {String} content [Footnote content]
   * @return {String}         [Html Markup]
   */
  buildButton(ref, id, num, content) {
    return this.config.fnButtonMarkup
      .replace(/\{\{FOOTNOTEREFID\}\}/g, ref)
      .replace(/\{\{FOOTNOTEID\}\}/g, id)
      .replace(/\{\{FOOTNOTENUMBER\}\}/g, num)
      .replace(/\{\{FOOTNOTECONTENT\}\}/g, content);
  }

  /**
   * Builds the content for each footnote based on the configured template.
   * @param  {String} id      [ID from the parent of this element]
   * @param  {String} content [Footnote content]
   * @return {String}         [Html Markup]
   */
  buildContent(id, content) {
    return this.config.fnContentMarkup
      .replace(/\{\{FOOTNOTEID\}\}/g, id)
      .replace(/\{\{FOOTNOTECONTENT\}\}/g, content);
  }

  /**
   * Triggers whenever an user clicks a footnote button and is responsible to coordinate all the necessary steps to show and position the footnotes.
   * @param  {Event} e [Event]
   */
  clickAction(err) {
    const btn = err.target;
    const content = btn.getAttribute(`data-fn-content`);
    const id = btn.getAttribute(`data-footnote`);
    const returnOnDismiss = btn.classList.contains(`is-active`);

    // We calculate the document.documentElement.scrollHeight before inserting the footnote, so later (at the calculateSpacing function to be more specific), we can check if there's any overflow to the bottom of the page, if so it flips the footnote to the top.
    const scrollHeight = this.getScrollHeight();

    this.dismissFootnotes();

    if (returnOnDismiss) {
      return;
    }

    const fnHtml = this.buildContent(id, content);
    btn.insertAdjacentHTML(`afterend`, fnHtml);
    const fn = btn.nextElementSibling;

    // Position and flip the footnote on demand.
    this.calculateOffset(fn, btn);
    this.calculateSpacing(fn, scrollHeight);

    btn.classList.add(this.config.activeBtnClass);
    fn.classList.add(this.config.activeFnClass);

    // Focus is set on the footnote content, this looks kinda ugly but allows keyboard navigation and scrolling when the content overflow. I have a gut feeling this is good, so I'm sticking to it. All the help to improve accessibility is welcome.
    fn.querySelector(`.${this.config.fnContentClass}`).focus();

    // As far as I recall, touch devices require a tweak to dismiss footnotes when you tap the body outside the footnote, this is the tweak.
    if (`ontouchstart` in document.documentElement) {
      document.body.classList.add(this.config.backdropClass);
    }

    // Triggers the activeCallback if there's any. I never used and never tested this, but I'm passing the button and the footnote as parameters because I think that's all you may expect.
    if (this.config.activeCallback) {
      this.config.activeCallback(btn, fn);
    }
  }

  /**
   * Mathematical Hell. This function repositions the footnote according to the edges of the screen. The goal is to never (gonna give you up) overflow content. Also, remember when we calculated the scrollBarWidth? This is where we use it in case the footnote overflows to the right.
   * @param  {Element} fn  [Footnote Node]
   * @param  {Element} btn [Button Node]
   */
  calculateOffset(fn, btn) {
    const tooltip = fn.querySelector(`.${this.config.tooltipClass}`);
    const tipWidth = tooltip.clientWidth;
    const container = fn.parentNode;
    const contWidth = container.clientWidth;
    const contOffset = container.offsetLeft;
    const wrapWidth = fn.offsetWidth;
    let wrapMove = -(wrapWidth / 2 - contWidth / 2);
    const windowWidth = window.innerWidth || window.availWidth;

    // Footnote overflows to the left
    if (contOffset + wrapMove < 0) {
      wrapMove -= contOffset + wrapMove;
    }
    // Footnote overflows to the right
    else if (
      contOffset + wrapMove + wrapWidth + this.scrollBarWidth >
      windowWidth
    ) {
      wrapMove -=
        contOffset +
        wrapMove +
        wrapWidth +
        this.scrollBarWidth +
        contWidth / 2 -
        windowWidth;
    }

    fn.style.left = `${wrapMove}px`;
    const wrapOffset = contOffset + wrapMove;
    const tipOffset = contOffset - wrapOffset + contWidth / 2 - tipWidth / 2;
    tooltip.style.left = `${tipOffset}px`;
  }

  /**
   * Removes element, mostly used for footnotes.
   * @param  {Element} el
   */
  removeFootnoteChild(el) {
    return el.parentNode.removeChild(el);
  }

  /**
   * Delays and withholds function triggering in events. Based on https://davidwalsh.name/javascript-debounce-function
   * @param  {Function} func      [The function to after the delays]
   * @param  {Number}   wait      [The delay in milliseconds]
   * @param  {Boolean}  immediate [if true, triggers the function on the leading edge rather than the trailing]
   * @return {Function}           [It's a closure, what did you expect?]
   */
  debounce(func, wait, immediate) {
    let timeout;
    return function(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (immediate && !timeout) func.apply(this, args);
    };
  }

  /**
   * Action to be attached to the resize event and recalculate the position of the active footnotes.
   */
  resizeAction() {
    const footnotes = document.querySelectorAll(
      `.${this.config.activeFnClass}`
    );

    if (footnotes.length) {
      [].forEach.call(footnotes, fn => {
        this.calculateOffset(fn);
        this.calculateSpacing(fn);
      });
    }
  }

  /**
   * Returns the height of the document. Used to find out if the footnote overflows the content
   * @return {Number} [see description]
   */
  getScrollHeight() {
    return this.scrollHeight;
  }

  /**
   * Calculates if the footnote should appear above or below the button
   * @param  {Element}  fn     [The footnote in question]
   * @param  {Number}   height [By now the footnote is about to show up and we use the previous value, this one, to check if the footnote is overflow the document]
   */
  calculateSpacing(fn, height) {
    const margins = this.calculateMargins(fn);
    const windowHeight = window.innerHeight || window.availHeight;

    const bcr = fn.getBoundingClientRect();
    const bch = bcr.height;
    const bcb = bcr.bottom;

    if (
      height < this.getScrollHeight() ||
      bcb > windowHeight - margins.bottom
    ) {
      fn.classList.add(this.config.fnOnTopClass);
    } else if (
      windowHeight - (bch + margins.top) > bcb &&
      fn.classList.contains(this.config.fnOnTopClass)
    ) {
      fn.classList.remove(this.config.fnOnTopClass);
    }
  }

  /**
   * Action to be attached to the scroll event to verify if we should change the position of the footnote using the available space.
   */
  scrollAction() {
    const footnotes = document.querySelectorAll(
      `.${this.config.activeFnClass}`
    );
    if (footnotes.length) {
      [].forEach.call(footnotes, el => {
        this.calculateSpacing(el);
      });
    }
  }

  /**
   * Returns the computed margins of an element, used to calculate the position and spacing.
   * @param  {Element} fn  [The footnote]
   * @return {Object}      [An object containing all margins]
   */
  calculateMargins(fn) {
    const computedStyle = window.getComputedStyle(fn, null);
    return {
      bottom: parseFloat(computedStyle.marginBottom),
      left: parseFloat(computedStyle.marginLeft),
      right: parseFloat(computedStyle.marginRight),
      top: parseFloat(computedStyle.marginTop),
    };
  }

  /**
   * This is set on click and touchend events for the body and removes the footnotes when you click/tap outside them
   * @param  {Event}
   */
  documentAction(ev) {
    if (!ev.target.closest(`.${this.config.fnContainer}`)) {
      this.dismissFootnotes();
    }
  }

  /**
   * Dismisses active footnotes when the ESC key is hit and the current active element is a footnote. Returns focus to the footnote button.
   * @param  {Event} e
   */
  dismissOnEsc(ev) {
    if (
      ev.keyCode === 27 &&
      document.activeElement.matches(`.${this.config.fnContentClass}`)
    ) {
      document.activeElement
        .closest(`.${this.config.activeFnClass}`)
        .previousElementSibling.focus();
      return this.dismissFootnotes();
    }
    return ev;
  }

  /**
   * Removes all open footnotes (and also the backdrop, remember it?)
   */
  dismissFootnotes() {
    const footnotes = document.querySelectorAll(
      `.${this.config.activeFnClass}`
    );

    if (footnotes.length) {
      [].forEach.call(footnotes, el => {
        el.previousElementSibling.classList.remove(this.config.activeBtnClass);
        el.addEventListener(
          `transitionend`,
          this.removeFootnoteChild(el),
          false
        );
        el.classList.remove(this.config.activeFnClass);
      });
    }

    if (document.body.classList.contains(this.config.backdropClass)) {
      document.body.classList.remove(this.config.backdropClass);
    }
  }

  /**
   * Opens pandora's box. This function crosses every footnote and makes all the replacements and then sets up every eventListener for the script to work.
   */
  init() {
    [].forEach.call(this.footnotes, (fns, i) => {
      const currentScope = fns[0].closest(this.config.scope);

      [].forEach.call(fns, (fn, dex) => {
        const fnRefN = dex + 1;
        const fnHrefId = fn
          .querySelector(this.config.supQuery)
          .getAttribute(`data-href`);

        let fnContent = this.removeBackLinks(fn.innerHTML.trim(), fnHrefId);

        fnContent = fnContent
          .replace(/'/g, `&quot;`)
          .replace(/&lt;/g, `&ltsym;`)
          .replace(/&gt;/g, `&gtsym;`);

        if (fnContent.indexOf(`<`) !== 0) {
          fnContent = `<p>${fnContent}</p>`;
        }
        // Gotta escape `:` used within a querySelector so JS doesn't think you're looking for a pseudo-element.
        const ref = currentScope.querySelector(fnHrefId.replace(`:`, `\\:`));

        const footnote = `<div class='
        ${this.config.fnContainer}'>
        ${this.buildButton(fnHrefId, fn.id, fnRefN, fnContent)}</div>`;

        ref.insertAdjacentHTML(`afterend`, footnote);
        ref.parentNode.removeChild(ref);
      });
    });

    // Setting up events

    [].forEach.call(
      document.querySelectorAll(`.${this.config.buttonClass}`),
      el => {
        el.addEventListener(`click`, this.clickAction.bind(this));
      }
    );

    window.addEventListener(
      `resize`,
      this.debounce(this.resizeAction.bind(this), 100)
    );
    window.addEventListener(
      `scroll`,
      this.debounce(this.scrollAction.bind(this), 100)
    );
    window.addEventListener(`keyup`, this.dismissOnEsc.bind(this));
    document.body.addEventListener(`click`, this.documentAction.bind(this));
    document.body.addEventListener(`touchend`, this.documentAction.bind(this));

    this.divFootnotes.forEach(el => {
      return el.parentNode.removeChild(el);
    });
  }
}

const lf = new BareFoot();
lf.init();
