




/*
     FILE ARCHIVED ON 8:19:26 Jan 13, 2012 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 1:09:59 Jul 14, 2014.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/**
 * This is a modified version of Ben Alman's dual GPL/MIT licensed "Javascript
 * Emotify" jQuery plugin.
 */

// About: License
// Copyright (c) 2009 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// /web/20120113081926/http://benalman.com/about/license/

window.emotify = (function(){
  var emotify,
    EMOTICON_RE,
    emoticons = {},
    lookup = [];

  emotify = function(txt, callback) {
    callback = callback || function(cssSuffix, smiley) {
      return '<span class="Emoticon Emoticon' + cssSuffix + '"><span>' + smiley + '</span></span>';
    };

    txt = txt.toString();
    txt = txt.replace("\n", "EXPLICIT_EMOTIFY_NEWLINE");
    txt = txt.replace(/<br>/img, "\nEXPLICIT_EMOTIFY_BR");
    txt = txt.replace(/<br \/>/img, "\nEXPLICIT_EMOTIFY_BR");
    txt = txt.replace(EMOTICON_RE, function(a, b, text) {
      var i = 0,
        smiley = text,
        e = emoticons[text];

      // If smiley matches on manual regexp, reverse-lookup the smiley.
      if (!e) {
        while (i < lookup.length && !lookup[i].regexp.test(text)) {i++};
        smiley = lookup[i].name;
        e = emoticons[smiley];
      }

      // If the smiley was found, return HTML, otherwise the original search string
      return e ? (b + callback(e[0], smiley)) : a;
    });
    txt = txt.replace(/EXPLICIT_EMOTIFY_BR/img, "<br />");
    txt = txt.replace(/EXPLICIT_EMOTIFY_NEWLINE/img, "\n\n");
    return txt;
  };

  emotify.emoticons = function() {
    var args = Array.prototype.slice.call( arguments ),
      replace_all = typeof args[0] === 'boolean' ? args.shift() : false,
      smilies = args[0],
      e,
      arr = [],
      alts,
      i,
      regexp_str;

    if (smilies) {
      if (replace_all) {
        emoticons = {};
        lookup = [];
      }

      for (e in smilies) {
        emoticons[e] = smilies[e];
        emoticons[e][0] = emoticons[e][0];
      }

      // Generate the smiley-match regexp.
      for (e in emoticons) {
        if (emoticons[e].length > 1) {
          // Generate regexp from smiley and alternates.
          alts = emoticons[e].slice(1).concat(e);
          i = alts.length
          while (i--) {
            alts[i] = alts[i].replace(/(\W)/g, '\\$1');
          }

          regexp_str = alts.join('|');

          // Manual regexp, map regexp back to smiley so we can reverse-match.
          lookup.push({name: e, regexp: new RegExp( '^' + regexp_str + '$' )});
        } else {
          // Generate regexp from smiley.
          regexp_str = e.replace(/(\W)/g, '\\$1');
        }

        arr.push(regexp_str);
      }

      EMOTICON_RE = new RegExp('(\\s?)(' + arr.join('|') + ')(?=(?:$|\\s|<|&nbsp;))', 'g');
    }

    return emoticons;
  };

  return emotify;

})();

$(function(){
  var emoticons = {
/*  smiley, css_suffix, alternate_smileys */
    ":winky:":    ["winky"],
    ":twisted:":  ["icon_twisted"],
    ":evil:":     ["icon_evil"],
    ":cry:":      ["icon_cry"],
    ":oops:":     ["icon_redface"],
    ":P":         ["icon_razz"],
    ":x":         ["icon_mad"],
    ":lol:":      ["icon_lol"],
    "8-)":        ["icon_cool"],
    ":?":         ["icon_confused"],
    ":shock:":    ["icon_eek"],
    ":o":         ["icon_surprised"],
    ":(":         ["icon_sad"],
    ":)":         ["icon_smile"],
    ":D":         ["icon_biggrin"],
    ":wink:":     ["icon_wink", ";-)"],
    ":zzz:":      ["sleepy"],
    ":...:":      ["ellipses"],
    ":whistle:":  ["whistle"],
    ":!!:":       ["exclamation"],
    "O_o":        ["icon_eh2"],
    "<3":         ["icon_heartbeat"],
    ":v:":        ["icon_down"],
    ":^:":        ["icon_up"],
    ":rotate:":   ["icon_rotate"],
    ":mrgreen:":  ["icon_mrgreen"],
    "o_O":        ["icon_eh"],
    ":arrow:":    ["icon_arrow"],
    ":?:":        ["icon_question"],
    ":!:":        ["icon_exclaim"],
    "D:":         ["bigfrown"],
    ":bz":        ["115"],
    ":ar!":       ["pirate"],
    "8->":        ["105", "8-&gt;"],
    "(*)":        ["79"]
  }

  emotify.emoticons(emoticons);

  if (gdn.definition('FormatEmoticons', false)) {
     $('div.Comment div.Message, div.Preview div.Message').livequery(function() {
       $(this).html(emotify($(this).html()));
     });
  }

  // Insert a clickable icon list after the textbox
  $('textarea#Form_Body').livequery(function() {
    var buts = '';
    var emo = '';
    for (e in emoticons) {
      emo = emoticons[e][1];
      if (typeof(emo) == 'undefined')
        emo = e;

      buts += '<a class="EmoticonBox Emoticon Emoticon'+emoticons[e][0]+'"><span>'+emo+'</span></a>';
    }
    $(this).before("<div class=\"EmotifyWrapper\">\
      <a class=\"EmotifyDropdown\"><span>Emoticons</span></a> \
      <div class=\"EmoticonContainer Hidden\">"+buts+"</div> \
    </div>");

    $('.EmotifyDropdown').live('click', function() {
      if ($(this).hasClass('EmotifyDropdownActive'))
        $(this).removeClass('EmotifyDropdownActive');
      else
        $(this).addClass('EmotifyDropdownActive');

      $(this).next().toggle();
      return false;
    });

    // Hide emotify options when previewing
    $('form#Form_Comment').bind("PreviewLoaded", function(e, frm) {
      frm.find('.EmotifyDropdown').removeClass('EmotifyDropdownActive');
      frm.find('.EmotifyDropdown').hide();
      frm.find('.EmoticonContainer').hide();
    });

    // Reveal emotify dropdowner when write button clicked
    $('form#Form_Comment').bind('WriteButtonClick', function(e, frm) {
      frm.find('.EmotifyDropdown').show();
    });

    // Hide emoticon box when textarea is focused
    $('textarea#Form_Body').live('focus', function() {
      var frm = $(this).parents('form');
      frm.find('.EmotifyDropdown').removeClass('EmotifyDropdownActive');
      frm.find('.EmoticonContainer').hide();
    });

    // Put the clicked emoticon into the textarea
    $('.EmoticonBox').live('click', function() {
      var emoticon = $(this).find('span').text();
      var textbox = $(this).parents('form').find('textarea#Form_Body');
      var txt = $(textbox).val();
      if (txt != '')
        txt += ' ';
      $(textbox).val(txt + emoticon + ' ');
      var container = $(this).parents('.EmoticonContainer');
      $(container).hide();
      $(container).prev().removeClass('EmotifyDropdownActive');

      // If cleditor is running, update it's contents
      var ed = $(textbox).get(0).editor;
      if (ed) {
        // Update the frame to match the contents of textarea
        ed.updateFrame();
        // Run emotify on the frame contents
        var Frame = $(ed.$frame).get(0);
        var FrameBody = null;
        var FrameDocument = null;

        // DOM
        if (Frame.contentDocument) {
           FrameDocument = Frame.contentDocument;
           FrameBody = FrameDocument.body;
        // IE
        } else if (Frame.contentWindow) {
           FrameDocument = Frame.contentWindow.document;
           FrameBody = FrameDocument.body;
        }
        $(FrameBody).html(emotify($(FrameBody).html()));
        var webRoot = gdn.definition('WebRoot', '');
        var ss = document.createElement("link");
        ss.type = "text/css";
        ss.rel = "stylesheet";
        ss.href = gdn.combinePaths(webRoot, 'plugins/Emotify/emotify.css');
        if (document.all)
           FrameDocument.createStyleSheet(ss.href);
        else
           FrameDocument.getElementsByTagName("head")[0].appendChild(ss);
      }

      return false;
    });
  });

});
