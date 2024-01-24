import { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import { calculateGuess } from "../helpers/calculateGuess";

export const useGuess = () => {
  const dispatch = useAppDispatch();
  //ensure that current state will be sent in addGuessLetter
  //   const answerRef = useRef();
  const { answer } = useAppSelector((state) => state.answer);

  //   answerRef.current = answer;

  const [guess, setGuess] = useState("");

  const addGuessLetter = (letter: string) => {
    setGuess((curGuess) => {
      let newGuess;
      if (letter.length === 1 && curGuess.length !== 5) {
        //add key letter to current letters
        newGuess = curGuess + letter;
      } else {
        // current letters remain the same
        newGuess = curGuess;
      }

      //manage back and enter buttons
      switch (letter) {
        case "Backspace":
          return newGuess.slice(0, -1);
        case "Enter":
          if (newGuess.length === 5) {
            //validate and save in state, clear current letters

            calculateGuess({ guessWord: newGuess, answerWord: answer });
            //dispatch(getGuesses(newGuess, answer)); //answerRef.current));
            return "";
          } else {
            //error logic here
            // dispatch(setValid("Word must have five letters"));
          }
      }
      return newGuess;
    });
  };

  const onKeyDown = (e) => {
    let letter = e.key;
    addGuessLetter(letter);
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return { guess, setGuess, addGuessLetter };
};
