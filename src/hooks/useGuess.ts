import { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import { calculateGuess } from "../helpers/calculateGuess";
import { setGuesses } from "../store/slice/guesses/guessesSlice";
import { formatKeyboard, KeyboardType } from "../helpers/formatKeyboard";

interface UseGuessProps {
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export const useGuess = ({ setError }: UseGuessProps) => {
  const dispatch = useAppDispatch();
  //ensure that current state will be sent in addGuessLetter
  //   const answerRef = useRef();
  const { answer } = useAppSelector((state) => state.answer);
  const currentKeyboard = useAppSelector((state) => state.guesses.keyboard);

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

            const result: string[] = calculateGuess({
              guessWord: newGuess,
              answerWord: answer,
            });

            if (result[0] === "invalid") {
              setError("Word not in list");
              console.log("invalid");
              return "";
              //error alert logic here - word not in list
            } else {
              //get keyboard
              const keyboard: KeyboardType = formatKeyboard({
                guessWord: newGuess,
                result,
                currentKeyboard,
              });
              dispatch(setGuesses({ guessWord: newGuess, result, keyboard })); //answerRef.current);
              return "";
            }
          } else {
            console.log("invalid");
            setError("Word must have five letters");
            return "";
            //error alert logic here -word must have 5 letters
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
