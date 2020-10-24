var buildGenreElement, classes, genre, genreWords, genres, getA, loadWords, makeGenreBoxes, randomElement, randomWord, toggleGenre, word, wordType, words;
var __hasProp = Object.prototype.hasOwnProperty, __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (__hasProp.call(this, i) && this[i] === item) return i; } return -1; };

genres = ["general"];

loadWords = function() {
  var link, links, _i, _len, _results;
  links = $("a.word_link");
  _results = [];
  for (_i = 0, _len = links.length; _i < _len; _i++) {
    link = links[_i];
    _results.push(link.onclick());
  }
  return _results;
};

randomWord = function(type) {
  var candidates, genre, genreWords, _ref;
  candidates = [];
  _ref = words[type];
  for (genre in _ref) {
    if (!__hasProp.call(_ref, genre)) continue;
    genreWords = _ref[genre];
    if (__indexOf.call(genres, genre) < 0) continue;
    candidates = candidates.concat(genreWords);
  }
  return randomElement(candidates);
};

getA = function(type) {
  var retVal, suffix;
  type = type.split("_")[0];
  retVal = (function() {
    switch (type) {
      case "prefix":
        if (Math.random() < 0.15) {
          return randomWord("suffix");
        } else {
          return randomWord("prefix");
        }
        break;
      case "suffix":
        suffix = randomWord("suffix");
        return suffix.charAt(0).toUpperCase() + suffix.substring(1);
      default:
        return randomWord(type);
    }
  })();
  if (type !== "prefix" && type !== "suffix") retVal = retVal.toUpperCase();
  return retVal;
};

makeGenreBoxes = function() {
  var genre, genreBoxes, genreList, genreWords, type, typeWords, validGenres, _i, _len, _results;
  genreList = $("#genres")[0];
  genreBoxes = {};
  validGenres = [];
  for (type in words) {
    if (!__hasProp.call(words, type)) continue;
    typeWords = words[type];
    for (genre in typeWords) {
      if (!__hasProp.call(typeWords, genre)) continue;
      genreWords = typeWords[genre];
      if (genre !== "general" && __indexOf.call(validGenres, genre) < 0) {
        validGenres.push(genre);
      }
    }
  }
  validGenres.sort();
  _results = [];
  for (_i = 0, _len = validGenres.length; _i < _len; _i++) {
    genre = validGenres[_i];
    _results.push(genreList.appendChild(buildGenreElement(genre)));
  }
  return _results;
};

buildGenreElement = function(genre) {
  var input, label;
  input = document.createElement("input");
  label = document.createElement("label");
  input.type = "checkbox";
  input.id = "genre";
  input.onchange = (function(input) {
    return function(event) {
      return toggleGenre(input);
    };
  })(input);
  input.id = genre;
  label.appendChild(input);
  label.classList.add("checkbox");
  label.setAttribute("for", genre);
  label.appendChild(document.createTextNode(genre));
  return label;
};

toggleGenre = function(box) {
  var g, genre, _i, _len;
  genre = box.id;
  if ($(box).is(':checked')) {
    genres.push(genre);
  } else {
    for (_i = 0, _len = genres.length; _i < _len; _i++) {
      g = genres[_i];
      if (g !== genre) genres = g;
    }
  }
  return $.cookie('genres', genres);
};

$(document).keypress(function(event) {
  if (event.which === 114 || event.which === 82) return loadWords();
});

$(document).ready(function() {
  var blank, blanks, genre, link, _i, _j, _len, _len2, _results;
  blanks = $("#description > span");
  for (_i = 0, _len = blanks.length; _i < _len; _i++) {
    blank = blanks[_i];
    link = document.createElement('a');
    link.href = "#";
    link.onclick = function() {
      $(this).fadeTo('fast', 0.1, function() {
        this.innerHTML = getA(this.parentNode.id);
        return $(this).fadeTo('fast', 1.0);
      });
      return false;
    };
    $(link).addClass("word_link");
    blank.appendChild(link);
  }
  loadWords();
  makeGenreBoxes();
  if ($.cookie('genres')) {
    genres = $.cookie('genres').split(",");
    _results = [];
    for (_j = 0, _len2 = genres.length; _j < _len2; _j++) {
      genre = genres[_j];
      if (genre !== "general") {
        _results.push($('#' + genre).prop('checked', true));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  } else {
    return $.cookie('genres', genres);
  }
});

randomElement = function(list) {
  return list[Math.floor(Math.random() * list.length)];
};

words = {
  prefix: {
    science: "scientific experimental oncological physical chemical quantum relativistic cephied",
    computers: "electronic logical",
    fantasy: "magical arcane etheric ethereal ancient psychic mystic mystical cyclopean draconic occult",
    general: "incoming weird ironic clumsy ascending enthusiastic wobbly authorial arrayed jubilant repeated imbalanced muscular rowdy austere monstrous historical curved multiple",
    math: "topological algebraic categorical cylindrical",
    music: "sustained percussive",
    nature: "feline felid canine canid vulpine ecological piscine",
    art: "composed romantic impressionistic pointillist classical",
    mythology: "fated blessed cursed"
  },
  suffix: {
    science: "science physicist laser quark gluon plasma hypothesis horologist excavator lymph",
    computers: "logician machine computer circuit cable memory processor graph",
    fantasy: "elixir wizard mage sorcerer wyvern magic spell wand ossuary occultist purgatory simulacrum cultist",
    general: "gambler enthusiast descendant executioner archive expanse beacon scrapper conspiracy mendicant bias exterminator clothing fashion bouncer",
    math: "integral derivative triangle square pentagon topology theory algebra exponent divisor variable manifold node",
    music: "clef bass note crescendo glissando drumroll string trumpet",
    nature: "rose ecosystem ecology gaia aquarium",
    literature: "folio character thesis analysis",
    art: "palette sfumato composition",
    mythology: "divine deity demon angel gorgon titan demiurge fanatic prophet demagogue"
  },
  title: {
    general: "scion prince knight heir prisoner judge leader fool mage page squire herald voice serf vassal thrall",
    science: "scientist technician",
    fantasy: "alchemist hermit sage hierophant prophet demiurge sylph witch",
    literature: "scribe author poet",
    music: "composer conductor",
    art: "artist painter sculptor"
  },
  quality: {
    general: "void breath space time mind color voice speech music line shape form substance thought doom hope way tears wrath rage anger justice death law pride sloth greed fear chaos order self life"
  },
  land: {
    general: "blood pulse haze fade lace caves hollows glass frost air earth water sun sky moon silence mist fog steel stone skies vines flame leaves spires lamps depths clouds bamboo masks drills trash arenas cake sundials noise conspiracies grime dread violins violence force wind",
    science: "quartz silicon circuits magnets elements copper",
    fantasy: "bismuth electrum platinum lead elements gold silver"
  },
  material: {
    general: "ruby sapphire pearl quartz chalk emerald diamond void plastic metal wood silicon acid ember obsidian bone amber honey paper salt sand keratin fabric ephemeral"
  },
  denizen: {
    general: "Typheus Cetus Hecatoncheires Echidna Panoptes Talos Antaeus Metis Hecate Cronus Eos Laksmi Cybele Clotho Lachesis Atropos Thanatos Abaddon Sandalphon Metatron Belial Samael Azrael Ahuitzotl Akhenaten Jormungandr Czernobog Tyr Coyote Mictlancihuatl Legba"
  },
  consorts: {
    general: "salamanders turtles iguanas crocodiles giraffes newts snakes geckos skinks chameleons"
  },
  specibus: {
    general: "bat plunger yoyo scissor chainsaw crowbar hammer plank scythe shoe puppet dart stapler pistol shotgun",
    music: "keyboard saxophone violin woodwind",
    computers: "keyboard monitor",
    literature: "book pen",
    art: "palette brush paint",
    fantasy: "wand",
    nature: "claw"
  },
  modus: {
    general: "stack queue array hashmap van_emde_boas encryption miracle fibonacci_heap puzzle red_black_tree tree disjoint-set bloom-filter jenga pictionary memory clue"
  },
  planet: {
    general: "prospit derse"
  }
};

for (wordType in words) {
  if (!__hasProp.call(words, wordType)) continue;
  classes = words[wordType];
  for (genre in classes) {
    if (!__hasProp.call(classes, genre)) continue;
    genreWords = classes[genre];
    words[wordType][genre] = (function() {
      var _i, _len, _ref, _results;
      _ref = genreWords.split(' ');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        word = _ref[_i];
        _results.push(word.replace(/_/g, ' '));
      }
      return _results;
    })();
  }
}

/*
     FILE ARCHIVED ON 23:48:37 Feb 15, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 20:37:02 Jan 26, 2020.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  PetaboxLoader3.resolve: 53.39
  xauthn.chkprivs: 0.038
  RedisCDXSource: 33.568
  PetaboxLoader3.datanode: 352.734 (4)
  exclusion.robots: 104.226
  captures_list: 421.517
  CDXLines.iter: 13.438 (3)
  esindex: 0.021
  xauthn.identify: 103.828
  LoadShardBlock: 266.484 (3)
  exclusion.robots.policy: 104.204
  load_resource: 187.022
*/