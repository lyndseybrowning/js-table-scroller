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
        const tblWrap = createTblWrap();
        tblWrap.innerHTML = element.innerHTML;
        console.log(tblWrap);

        element.parentNode.appendChild(tblWrap);
    }

    function createTblWrap() {
        let tblWrap = document.createElement('div');
        tblWrap.className = 'js-scroll-wrap';

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