'use strict';

function tableScroll(collection) {

  try {
    if (collection == null || !collection.length && !collection.querySelector) {
      throw new Error('Collection cannot be found.');
    }
  } catch (e) {
    console.warn(e.message);
    return;
  }

  // default settings
  // can be overridden by extending
  var defaults = {
    width: null,
    height: 300
  };

  var options = defaults;
  var scrollbar = 0;

  // extending default settings
  if ({}.toString.call(arguments[1]) == '[object Object]') {
    options = extendDefaults(defaults, arguments[1]);
  }

  function getWidth(opt) {
    return typeof opt === 'number' ? opt + 'px' : opt;
  }

  function scroll(element) {
    if (options.width) {
      element.style.width = getWidth(options.width);
    }

    var emptyEl = emptyElement(element);
    var wrapper = createwrapper(element);
    var tblBody = wrapper.querySelector('tbody');
    var scrollWrap = createElem('div', { className: 'js-scroll-wrap-inner' });

    // remove existing tbody
    tblBody.parentNode.removeChild(tblBody);

    // append empty wrapper and empty table node
    emptyEl.appendChild(tblBody);

    // adjusts widths of wrapper
    if (options.width) {
      wrapper.style.width = getWidth(options.width);
    }
    wrapper.firstChild.style.width = '100%';

    // ensure that the initial table is set to 100% of wrapper
    emptyEl.style.width = '100%';

    // scroller
    scrollWrap.appendChild(emptyEl);
    scrollWrap.style.overflowY = 'scroll';
    scrollWrap.style.overflowX = 'hidden';
    scrollWrap.style.width = '100%';
    scrollWrap.style.maxHeight = options.height + 'px';

    // finalise table wrapper
    wrapper.appendChild(scrollWrap);

    // calculate width of scrollbar
    var w = wrapper.offsetWidth;
    var s = scrollWrap.querySelector('table').offsetWidth;

    scrollbar = w - s;

    setColWidths(wrapper);

    window.addEventListener('resize', setColWidths.bind(this, wrapper));
  }

  function setColWidths(el) {
    var headWrap = el.querySelector('table tr');
    var cellsWrap = el.querySelector('.js-scroll-wrap-inner table tr');

    var widths = Array.from(cellsWrap.children).map(function (cell) {
      return cell.offsetWidth;
    });

    Array.from(headWrap.children).forEach(function (cell, index) {
      if (index === widths.length - 1) {
        cell.style.width = widths[index] + scrollbar + 'px';
      } else {
        cell.style.width = widths[index] + 'px';
      }
    });
  }

  function createElem(elem, opts) {
    var el = document.createElement(elem);

    Object.keys(opts).forEach(function (opt) {
      el[opt] = opts[opt];
    });

    return el;
  }

  // empties the contents from the element
  // and returns the element
  function emptyElement(element) {
    var copyel = element.cloneNode(true);

    while (copyel.firstChild) {
      copyel.removeChild(copyel.firstChild);
    }
    return copyel;
  }

  function createwrapper(element) {
    var tblWrap = document.createElement('div');
    var parentEl = element.parentNode;

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
    var options = defaults;

    for (var x in obj) {
      if (defaults.hasOwnProperty(x)) {
        options[x] = obj[x];
      }
    }
    return options;
  }
}

tableScroll(document.querySelectorAll('.js-scroll'), {
  width: '80%'
});