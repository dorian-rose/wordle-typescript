import React from "react";

export type KeyboardType = {
  [key: string]: string;
};

interface IFormatKeyboardProps {
  guessWord: string;
  result: string[];
  currentKeyboard: KeyboardType;
}

export const formatKeyboard = ({
  guessWord,
  result,
  currentKeyboard,
}: IFormatKeyboardProps) => {
  //calculate keyboard letter state

  let keyboard: KeyboardType = { ...currentKeyboard };

  result.forEach((r, index) => {
    const letterInResult = guessWord[index]; //e.g. "h"
    const currentLetterState = keyboard[letterInResult]; //e.g. {h:miss}
    switch (currentLetterState) {
      //e.g. if {h:"match"}
      case "match":
        break;
      //e.g. if {h:present}-leave as present
      case "present":
        if (r === "miss") {
          /* falls through */
          break;
        }
      default:
        keyboard[letterInResult] = r;
        break;
    }
  });
  return keyboard;
};
