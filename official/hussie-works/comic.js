//global variables
var QUERY_STRING, PAGE_LIST;


function getQueryString() {
	QUERY_STRING = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if (typeof QUERY_STRING[pair[0]] === "undefined") {
			QUERY_STRING[pair[0]] = pair[1];
		} else if (typeof QUERY_STRING[pair[0]] === "string") {
			var arr = [ QUERY_STRING[pair[0]], pair[1] ];
			QUERY_STRING[pair[0]] = arr;
		} else {
			QUERY_STRING[pair[0]].push(pair[1]);
		}
	}
};

function updateQueryStringParameter(key, value, replaceCurrentState) {
	var replaceFunction = replaceCurrentState ? "replaceState" : "pushState";
	
	var uri = window.location.href;
	var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
	var separator = uri.indexOf('?') !== -1 ? "&" : "?";
	QUERY_STRING[key] = value;
	if (uri.match(re)) {
		window.history[replaceFunction](QUERY_STRING , '', uri.replace(re, '$1' + key + "=" + value + '$2'));
	}
	else {
		window.history[replaceFunction](QUERY_STRING , '', uri + separator + key + "=" + value);
	}
}

function removeQueryStringParameter(key, replaceCurrentState) {
	var replaceFunction = replaceCurrentState ? "replaceState" : "pushState";

	var url = window.location.href;

    //prefer to use l.search if you have a location/link object
    var urlparts= url.split('?');   
    if (urlparts.length>=2) {

        var prefix= encodeURIComponent(key)+'=';
        var pars= urlparts[1].split(/[&;]/g);

        //reverse iteration as may be destructive
        for (var i= pars.length; i-- > 0;) {    
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
                pars.splice(i, 1);
            }
        }

        url= urlparts[0]+'?'+pars.join('&');
		delete QUERY_STRING[key];
        window.history[replaceFunction](QUERY_STRING , '', url);
    }
}



function processComicList() {
	getQueryString();
	
	if (!QUERY_STRING.comic || !COMIC_LIST.comics[QUERY_STRING.comic]) {
		window.location.replace("index.html");
		return;
	}

	PAGE_LIST = COMIC_LIST.comics[QUERY_STRING.comic];
	document.getElementById('total').innerHTML = PAGE_LIST.pages.length;
	
	window.onpopstate = function(event) {
		QUERY_STRING = event.state;
		updateComic();
	};
	
	updateComic();
	
	document.onkeydown = processKeyEvents;
}

function updateComic() {
	
	if (!PAGE_LIST.pages[getCurrentPage()] || getCurrentPage() == 0) {
		removeQueryStringParameter("page", true);
	}

	document.getElementById('comic-img').src = PAGE_LIST.base_url + PAGE_LIST.pages[getCurrentPage()].url;
	
	if (PAGE_LIST.pages[getCurrentPage() + 1]) {
		document.getElementById('comic-link').href = "javascript:next();";
	} else {
		document.getElementById('comic-link').removeAttribute("href");
	}
	
	window.scrollTo(0, 0);
	document.getElementById('number').innerHTML = getCurrentPage()+1;
}

function prev() {
	if (getCurrentPage() > 1) {
		updateQueryStringParameter("page", getCurrentPage().toString(), false);
	} else {
		removeQueryStringParameter("page", false);
	}
	updateComic();
}

function next() {
	updateQueryStringParameter("page", (getCurrentPage() + 2).toString(), false);
	updateComic();
}

function getCurrentPage() {
	if (QUERY_STRING.page) {
		return parseInt(QUERY_STRING.page, 10) - 1;
	} else {
		return 0;
	}
}

function processKeyEvents(e) {
	e = e || window.event;
	
	if (e.altKey || e.shiftKey || e.metaKey || e.ctrlKey) {
		return;
	}
	
	if (e.keyCode == '37' && PAGE_LIST.pages[getCurrentPage() - 1]) {
		prev();
	} else if (e.keyCode == '39' && PAGE_LIST.pages[getCurrentPage() + 1]) {
		next();
	}
}


processComicList();