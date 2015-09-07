// ==UserScript==
// @name         SharedCount
// @version      0.1
// @description  Get social count data.
// @author       Peytz
// @grant        none
// ==/UserScript==

jQuery.sharedCount = function(url, fn) {
    url = encodeURIComponent(url || location.href);
    var domain = "free.sharedcount.com/";
    var apikey = "aee20866ca3cc94ba8ab50758da938d2f241ee53";
    var arg = {
        data: {
            url : url,
            apikey : apikey
        },
        url: domain,
        cache: true,
        dataType: "json"
    };
    if ('withCredentials' in new XMLHttpRequest) {
        arg.success = fn;
    }
    else {
        var cb = "sc_" + url.replace(/\W/g, '');
        window[cb] = fn;
        arg.jsonpCallback = cb;
        arg.dataType += "p";
    }
    return jQuery.ajax(arg);
};
