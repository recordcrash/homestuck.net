




/*
     FILE ARCHIVED ON 1:30:55 Dec 28, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 1:06:41 Jul 14, 2014.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
jQuery(document).ready(function($) {
   // Handle the various option button clicks...

   // 1. "Dismiss" clicks
   $('a.DismissAnnouncement').click(function() {
      var btn = this;
      var parent = $(this).parents('.Announcements');
      $.ajax({
         type: "POST",
         url: $(btn).attr('href'),
         data: 'DeliveryType=BOOL&DeliveryMethod=JSON',
         dataType: 'json',
         error: function(XMLHttpRequest, textStatus, errorThrown) {
            $.popup({}, XMLHttpRequest.responseText);
         },
         success: function(json) {
            // Is this the last item in the announcements list?
            if ($(parent).children().length == 1) {
               // Remove the entire list
               $(parent).slideUp('fast', function() { $(this).remove(); });
               $(parent).prev().slideUp('fast', function() { $(this).remove(); });
            } else {
               // Remove the affected row
               $(btn).parents('.Announcement').slideUp('fast', function() { $(this).remove(); });
            }
         }
      });
      return false;
   });

   // 2. Announce discussion
   $('a.AnnounceDiscussion').livequery('click', function() {
      var btn = this;
      var row = $(btn).parents('li.Item');
      $.ajax({
         type: "POST",
         url: $(btn).attr('href'),
         data: 'DeliveryType=BOOL&DeliveryMethod=JSON',
         dataType: 'json',
         error: function(XMLHttpRequest, textStatus, errorThrown) {
            $.popup({}, XMLHttpRequest.responseText);
         },
         success: function(json) {
            gdn.inform(json);
            if (json.RedirectUrl)
              setTimeout("document.location='" + json.RedirectUrl + "';", 300);
         }
      });
      return false;
   });

   // 3. Sink discussion
   $('a.SinkDiscussion').popup({
      confirm: true,
      followConfirm: false,
      afterConfirm: function(json, sender) {
         var row = $(sender).parents('li.Item');
         if (json.State)
            $(row).addClass('Sink');
         else
            $(row).removeClass('Sink');

         if (json.LinkText)
            $(sender).text(json.LinkText);
      }
   });

   // 4. Close discussion
   $('a.CloseDiscussion').popup({
      confirm: true,
      followConfirm: false,
      afterConfirm: function(json, sender) {
         var row = $(sender).parents('li.Item');
         if (json.State)
            $(row).addClass('Close');
         else
            $(row).removeClass('Close');

         if (json.LinkText)
            $(sender).text(json.LinkText);
      }
   });

   // 5. Delete discussion
   $('a.DeleteDiscussion, a.DeleteDraft').popup({
      confirm: true,
      followConfirm: false,
      deliveryType: 'BOOL', // DELIVERY_TYPE_BOOL
      afterConfirm: function(json, sender) {
         var row = $(sender).parents('li.Item');
         if (json.ErrorMessage) {
            $.popup({}, json.ErrorMessage);
         } else {
            // Remove the affected row
            $(row).slideUp('fast', function() { $(this).remove(); });
         }
      }
   });

});