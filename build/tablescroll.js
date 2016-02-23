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
        var tblWrap = createTblWrap(element);
    }

    function createTblWrap(element) {
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