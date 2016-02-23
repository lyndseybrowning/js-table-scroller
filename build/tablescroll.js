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
        width: null
    };

    var options = defaults;

    // extending default settings
    if ({}.toString.call(arguments[1]) == '[object Object]') {
        options = extendDefaults(defaults, arguments[1]);
    }

    function scroll(element) {
        var outerWrap = createOuterWrap(element);
        var tblHead = outerWrap.querySelector('thead');
        var tblBody = outerWrap.querySelector('tbody');
        var tblEmpty = emptyElement(element);
        var tblEmptyWrap = createElem('div', { className: 'js-scroll-wrap-inner' });

        // remove existing tbody
        tblBody.parentNode.removeChild(tblBody);
        // append empty wrapper and empty table node
        tblEmpty.appendChild(tblBody);
        tblEmptyWrap.appendChild(tblEmpty);
        outerWrap.appendChild(tblEmptyWrap);
    }

    function createElem(elem, opts) {
        var el = document.createElement(elem);

        Object.keys(opts).forEach(function (opt) {
            el[opt] = opts[opt];
        });

        return el;
    }

    // empties the contents from the element
    function emptyElement(element) {
        var copyel = element.cloneNode(true);

        while (copyel.firstChild) {
            copyel.removeChild(copyel.firstChild);
        }
        return copyel;
    }

    function createOuterWrap(element) {
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
        var options = undefined;

        for (var x in obj) {
            if (defaults.hasOwnProperty(x)) {
                options[x] = obj[x];
            }
        }
        return options;
    }
}

tableScroll(document.querySelectorAll('.js-scroll'));