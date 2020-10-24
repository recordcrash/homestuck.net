




/*
     FILE ARCHIVED ON 8:19:23 Jan 13, 2012 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 1:06:42 Jul 14, 2014.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
jQuery(document).ready(function($) {
/* Autosave functionality for comment & discussion drafts */
   $.fn.autosave = function(opts) {
      var options = $.extend({interval: 60000, button: false}, opts);
      var textarea = this;
      if (!options.button)
         return false;

      var lastVal = null;

      var save = function() {
         var currentVal = $(textarea).val();
         if (currentVal != undefined && currentVal != '' && currentVal != lastVal) {
            lastVal = currentVal
            $(options.button).click();
         }
      };

      if (options.interval > 0) {
         setInterval(save, options.interval);
      }

      return this;
   }
});