function tableScroll(collection) {

    try {
      if (collection == null || (!collection.length && !collection.querySelector)) {
          throw new Error(`Collection cannot be found.`);
      }
    } catch (e) {
      console.warn(e.message);
      return;
    }

    // default settings
    // can be overridden by extending
    const defaults = {
        width: null
    };

    let options = defaults;

    // extending default settings
    if (({}).toString.call(arguments[1]) == '[object Object]') {
      options = extendDefaults(defaults, arguments[1]);
    }

    function scroll(element) {
      let elWidth = element.offsetWidth;
      let outerWrap = createOuterWrap(element);
      let tblHead = outerWrap.querySelector('thead');
      let tblBody = outerWrap.querySelector('tbody');
      let tblElement = emptyElement(element);
      let scrollWrap = createElem('div', { className: 'js-scroll-wrap-inner' });

      // remove existing tbody
      tblBody.parentNode.removeChild(tblBody);
      // append empty wrapper and empty table node
      tblElement.appendChild(tblBody);
      // scroller
      scrollWrap.appendChild(tblElement);
      scrollWrap.style.overflowY = 'scroll';
      scrollWrap.style.overflowX = 'hidden';
      scrollWrap.style.width = elWidth + 'px';
      // adjusts widths of outerwrap and inner tables to match widths
      outerWrap.style.width = elWidth + 'px';
      outerWrap.firstChild.style.width = '100%';
      outerWrap.firstChild.style.maxWidth = '100%';
      tblElement.style.width = '100%';
      tblElement.style.maxWidth = '100%';

      outerWrap.appendChild(scrollWrap);
    }

    function createElem(elem, opts) {
      let el = document.createElement(elem);

      Object.keys(opts).forEach(function(opt) {
        el[opt] = opts[opt];
      });

      return el;
    }

    // empties the contents from the element
    // and returns the element
    function emptyElement(element) {
      let copyel = element.cloneNode(true);

      while (copyel.firstChild) {
          copyel.removeChild(copyel.firstChild);
      }
      return copyel;
    }

    function createOuterWrap(element) {
      let tblWrap = document.createElement('div');
      let parentEl = element.parentNode;

      tblWrap.className = 'js-scroll-wrap';
      tblWrap.appendChild(element);
      parentEl.appendChild(tblWrap);

      return tblWrap;
    }

    // run scroll function
    if (collection.length) {
      collection = Array.from(collection).forEach(scroll);
    } else {
      scroll(collection);
    }

    function extendDefaults(defaults, obj) {
      let options;

      for (let x in obj) {
          if (defaults.hasOwnProperty(x)) {
              options[x] = obj[x];
          }
      }
      return options;
    }
}

tableScroll(document.querySelectorAll('.js-scroll'));
