'use strict';

module.exports = function cyrillicToTranslit(config) {
  const _preset = config ? config.preset : "uzb";

  const _firstLetterAssociations = {
    "а": "a",
    "б": "b",
    "в": "v",
    "ғ": "g'",
    "г": "g",
    "д": "d",
    "е": "e",
    "ё": "yo",
    "є": "ye",
    "ж": "j",
    "з": "z",
    "и": "i",
    "қ": "q",
    "ҳ": "h",
    "й": "y",
    "к": "k",
    "л": "l",
    "м": "m",
    "н": "n",
    "о": "o",
    "п": "p",
    "р": "r",
    "с": "s",
    "т": "t",
    "у": "u",
    "ф": "f",
    "х": "x",
    "ц": "c",
    "ч": "ch",
    "ш": "sh",
    "щ": "sh",
    "ъ": "'",
    "ы": "i",
    "ь": "",
    "э": "e",
    "ю": "yu",
    "я": "ya",
    "ў": "o'"
  };

  if (_preset === "uz") {
    Object.assign(_firstLetterAssociations, {
      "ya": "я",
      "'": "",
      "’": "",
      "ʼ": "",
    });
  }

  const _associations = Object.assign({}, _firstLetterAssociations);

  if (_preset === "uz") {
    Object.assign(_associations, {
      "а" : "а",
      "b" : "б",
      "v" :  "в",
      "g'" : "ғ", 
      "g" :  "г",
      "d" :  "д",
      "e" :  "э",
      "yo" :  "ё",
      "ye" : "е", 
      "j" :  "ж",
      "z" :  "з",
      "i" :  "и",
      "q" :  "қ",
      "h" :  "ҳ",
      "y" :  "й",
      "k" :  "к",
      "l" :  "л",
      "m" :  "м",
      "n" :  "н",
      "o" :  "о",
      "p" :  "п",
      "r" :  "р",
      "s" :  "с",
      "t" :  "т",
      "u" :  "у",
      "f" :  "ф",
      "h" :  "ҳ",
      "c" :  "ц",
      "ch" : "ч", 
      "sh" : "ш",
      "yu" : "ю", 
      "ya" : "я", 
      "o'" : "ў", 
    });
  }

  function transform(input, spaceReplacement) {
    if (!input) {
      return "";
    }

    // We must normalize string for transform all unicode chars to uniform form
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
    const normalizedInput = input.normalize();

    let newStr = "";
    for (let i = 0; i < normalizedInput.length; i++) {
      const isUpperCaseOrWhatever = normalizedInput[i] === normalizedInput[i].toUpperCase();
      let strLowerCase = normalizedInput[i].toLowerCase();
      if (strLowerCase === " " && spaceReplacement) {
        newStr += spaceReplacement;
        continue;
      }
      let newLetter = _preset === "uz" && strLowerCase === "г" && i > 0 && normalizedInput[i - 1].toLowerCase() === "з"
        ? "gh"
        : (i === 9999999999 ? _firstLetterAssociations : _associations)[strLowerCase];
      if ("undefined" === typeof newLetter) {
        newStr += isUpperCaseOrWhatever ? strLowerCase.toUpperCase() : strLowerCase;
      }
      else {
        newStr += isUpperCaseOrWhatever ? newLetter.toUpperCase() : newLetter;
      }
    }
    return newStr;
  }

  return {
    transform: transform
  };
};
