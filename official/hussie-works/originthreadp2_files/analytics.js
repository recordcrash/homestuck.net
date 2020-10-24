var startTime = new Date();

var archive_analytics = {
    loadtime: 0,
    img_src: "//analytics.archive.org/0.gif",
    values: {},

    onload_func: function() {
        var endTime = new Date();

        // Get field values
        loadtime = ((endTime.getTime() - startTime.getTime())/100)/10;
        loadtime = parseInt(loadtime * 1000);

        archive_analytics.values['loadtime'] = loadtime;
        archive_analytics.values['timediff'] = (new Date().getTimezoneOffset()/60)*(-1);
        archive_analytics.values['locale'] = archive_analytics.get_locale();

        // if no referrer set '-' as referrer
        if (document.referrer == '')
            archive_analytics.values['referrer'] = '-';
        else
            archive_analytics.values['referrer'] = document.referrer;

        string = archive_analytics.format_bug(archive_analytics.values);

        loadtime_img = new Image(100,25);
        loadtime_img.src = archive_analytics.img_src + "?" + string;
    },

    format_bug: function(values) {
        ret = [];
        count = 2;
        version = 2;

        for (var data in values) {
            ret.push(encodeURIComponent(data) + "=" + encodeURIComponent(values[data]));
            count = count + 1;
        }

        ret.push('version=' + version);
        ret.push('count=' + count);
        return ret.join("&");
    },

    get_locale: function() {
        if (navigator) {
            if (navigator.language)
                return navigator.language;

            else if (navigator.browserLanguage)
                return navigator.browserLanguage;

            else if (navigator.systemLanguage)
                return navigator.systemLanguage;

            else if (navigator.userLanguage)
                return navigator.userLanguage;
        }
        return '';
    },


    get_cookie: function(name) {
      var parts = document.cookie.split(name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
      return 0;
    }
}

if (window.addEventListener) {
    window.addEventListener('load', archive_analytics.onload_func, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', archive_analytics.onload_func);
}

window.archive_analytics.values['server_ms'] = window.archive_analytics.get_cookie("wb_total_perf");
window.archive_analytics.values['service'] = 'wb';
