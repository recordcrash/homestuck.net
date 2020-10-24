




/*
     FILE ARCHIVED ON 6:27:57 Jan 9, 2012 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 1:06:18 Jul 14, 2014.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
$(document).ready(function() {
	var PAPromoLoader = {
		populatePromos: function(data) {
			if (data.length > 0) {
				var promoData = data[0];
				var cachebuster = String(Math.random()).substring(2);
				var url = "/web/20120109062757/http://pa-promos.appspot.com/forward?promo="+promoData['key']+"&url="+promoData['link_url']+"&cb="+cachebuster;

            var banner = $("<a></a>");
            banner.attr("title", promoData['alt']);
            banner.attr("href", url);
            banner.attr("style", "border:none; text-decoration: none;");

            var image = $("<img />");
            image.attr("alt", promoData['alt']);
            image.attr("src", promoData['image_url']);
            image.attr("border", "0");

            banner.append(image);
				$("#bannerAd").append(banner);
			}
		}
	};

   var remoteUrl = ('https:' == document.location.protocol ? 'https://' : 'http://') + "pa-promos.appspot.com/get?callback=?";
   $.ajax({
      dataType: 'jsonp',
      data: { slots: "forum_banner" },
      url: remoteUrl,
      success: function(data) {
         PAPromoLoader.populatePromos(data);
      }
   });
});