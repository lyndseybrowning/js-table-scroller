'use strict';

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
      width: null,
      height: 300
    };

    let options = defaults;
    let scrollbar = 0;

    // extending default settings
    if (({}).toString.call(arguments[1]) == '[object Object]') {
      options = extendDefaults(defaults, arguments[1]);
    }

    function getWidth(opt) {
      return (typeof opt === 'number') ? opt + 'px' : opt;
    }

    function scroll(element) {
      if (options.width) {
        element.style.width = getWidth(options.width);
      }

      let elWidth = element.offsetWidth;
      let emptyEl = emptyElement(element);

      let wrapper = createwrapper(element);
      let tblHead = wrapper.querySelector('thead');
      let tblBody = wrapper.querySelector('tbody');
      let scrollWrap = createElem('div', { className: 'js-scroll-wrap-inner' });
      let scrollWrapWidth;

      // remove existing tbody
      tblBody.parentNode.removeChild(tblBody);

      // append empty wrapper and empty table node
      emptyEl.appendChild(tblBody);

      // adjusts widths of wrapper
      if (options.width) {
        wrapper.style.width = getWidth(options.width);
      }
      wrapper.firstChild.style.width = '100%';
      wrapper.firstChild.style.maxWidth = '100%';

      // ensure that the initial table is set to 100% of wrapper
      emptyEl.style.width = '100%';
      emptyEl.style.maxWidth = '100%';

      // scroller
      scrollWrap.appendChild(emptyEl);
      scrollWrap.style.overflowY = 'scroll';
      scrollWrap.style.overflowX = 'hidden';
      scrollWrap.style.minWidth = '100%';
      scrollWrap.style.maxHeight = options.height + 'px';
         
      // finalise table wrapper
      wrapper.appendChild(scrollWrap);

      // set scrollbar width
      scrollWrapWidth = Array.from(scrollWrap.querySelector('tr').children)
        .map(function (cell) {
          return cell.offsetWidth;
        })
        .reduce(function (prev, current) {          
          return prev + current;
        }, 0);

      // calculate width of scrollbar
      let w = wrapper.getBoundingClientRect().width;
      let s = scrollWrap.querySelector('table').getBoundingClientRect().width;

      scrollbar = w - s;
      
      setColWidths(wrapper);

      window.addEventListener('resize', setColWidths.bind(this, wrapper));
    }

    function setColWidths(el) {
      let headWrap = el.querySelector('table tr');      
      let cellsWrap = el.querySelector('.js-scroll-wrap-inner table tr');     

      let widths = Array.from(headWrap.children).map(function (head) {
        return head.offsetWidth;
      });

      let cells = Array.from(cellsWrap.children).forEach(function (cell, index) {
        if (index === widths.length - 1) {
          cell.style.width = widths[index] - scrollbar + 'px';
        } else {
          cell.style.width = widths[index] + 'px';
        }
        // force box-sizing 
        cell.style.boxSizing = 'border-box';
      });
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
      let options = defaults;

      for (let x in obj) {
          if (defaults.hasOwnProperty(x)) {
              options[x] = obj[x];
          }
      }
      return options;
    }
}

tableScroll(document.querySelectorAll('.js-scroll'), {
  width: 500
});

