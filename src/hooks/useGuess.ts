import { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import { calculateGuess, isWordValid } from "../helpers";
import { makeNewGuess, setGuesses } from "../store/slice/guesses";
import {
  type ResultStates,
  type IGuessAction,
  type IKeyboard,
  type IGuess
} from "../models";
import { type IUseGuessResult, type IUseGuessProps } from "./useGuess.types";
/// End imports///

export const useGuess = ({ setMessage }: IUseGuessProps): IUseGuessResult => {
  const dispatch = useAppDispatch();
  const [guess, setGuess] = useState("");

  // useRef to ensure current value used//
  const keyboardRef = useRef<IKeyboard | null>(null);
  const answerRef = useRef<string | null>(null);
  const guessesRef = useRef<IGuess[] | null>(null);
  // const { guesses, keyboard } = useAppSelector((state) => state.guesses);
  // const { answer } = useAppSelector((state) => state.answer);
  guessesRef.current = useAppSelector((state) => state.guesses.guesses);
  keyboardRef.current = useAppSelector((state) => state.guesses.keyboard);
  answerRef.current = useAppSelector((state) => state.answer.answer);
  // end current values//

  const addGuessLetter = (letter: string): void => {
    setGuess((curGuess) => {
      let newGuess;
      // add letter if not already max length
      if (letter.length === 1 && curGuess.length !== 5) {
        newGuess = curGuess + letter;
      } else {
        newGuess = curGuess;
      }

      // manage backspace and enter buttons
      switch (letter) {
        case "Backspace":
          return newGuess.slice(0, -1);
        case "Enter":
          if (newGuess.length === 5) {
            // 1. validate that exists in list
            const validWord: boolean = isWordValid(newGuess);
            if (!validWord) {
              setMessage("Word not in list");
              return "";
            }
            if (answerRef.current === null || guessesRef.current === null) {
              setMessage("An error ocurred");
              return "";
            }
            // 2. calculateguess:  calculate correct letters
            const result: ResultStates[] = calculateGuess({
              guessWord: newGuess,
              answerWord: answerRef.current
            });

            // 3. dispatch to state
            const newGuessObject: IGuessAction = makeNewGuess({
              guessWord: newGuess,
              result,
              guesses: guessesRef.current,
              oldKeyboard: keyboardRef.current
            });

            if (newGuessObject.gameState !== "playing") {
              setMessage(newGuessObject.gameState);
            }
            dispatch(setGuesses(newGuessObject));
            return "";
          } else {
            setMessage("Word must have five letters");
            return "";
          }
      }
      return newGuess;
    });
  };

  const onKeyDown = (ev: KeyboardEvent): void => {
    const letter = ev.key;
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
