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

      if(options.width) {
        element.style.width = (typeof options.width === 'number') ? options.width + 'px' : options.width;
      }

      let elWidth = element.offsetWidth;
      let emptyEl = emptyElement(element);

      let wrapper = createwrapper(element);
      let tblHead = wrapper.querySelector('thead');
      let tblBody = wrapper.querySelector('tbody');
      let scrollWrap = createElem('div', { className: 'js-scroll-wrap-inner' });

      // remove existing tbody
      tblBody.parentNode.removeChild(tblBody);

      // append empty wrapper and empty table node
      emptyEl.appendChild(tblBody);

      // scroller
      scrollWrap.appendChild(emptyEl);
      scrollWrap.style.overflowY = 'scroll';
      scrollWrap.style.overflowX = 'hidden';
      scrollWrap.style.width = elWidth + 'px';

      // adjusts widths of all wrappers and inner tables
      wrapper.style.width = elWidth + 'px';
      wrapper.firstChild.style.width = '100%';
      wrapper.firstChild.style.maxWidth = '100%';

      emptyEl.style.width = '100%';
      emptyEl.style.maxWidth = '100%';

      wrapper.appendChild(scrollWrap);
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

    function createwrapper(element) {
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
      let options = {};

      for (let x in obj) {
          if (defaults.hasOwnProperty(x)) {
              options[x] = obj[x];
          }
      }
      return options;
    }
}

tableScroll(document.querySelectorAll('.js-scroll'), {
  width: '60%'
});
