




/*
     FILE ARCHIVED ON 1:30:55 Dec 28, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 1:11:02 Jul 14, 2014.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
$(document).ready(function() {
	$('.nav a').append('<span></span>').each(function () {
		var $span = $('> span', this).css('opacity', 0);
		$(this).hover(function () {
			$span.stop().fadeTo(175, 1);
		}, function () {
			$span.stop().fadeTo(1000, 0);
		});
	});
});