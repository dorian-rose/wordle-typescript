import React from "react";
import { useAppSelector } from "../store/store";
import { IGuess } from "../store/slice/guesses/guessesSlice";
import { Row } from "./Row";

export interface IGridProps {
  guess: string;
  setGuess: React.Dispatch<React.SetStateAction<string>>;
}

export const Grid = ({ guess, setGuess }: IGridProps) => {
  //collect previous guesses
  const { guesses } = useAppSelector((state) => state.guesses);

  let rows: IGuess[] = [...guesses];

  //add guess in progress to rows array so that it can be rendered in Row.js
  if (rows.length < 6) {
    rows.push({ guessWord: guess, result: [] });
  }

  //make sure there are always six rows, so as to display full grid
  const guessesRemaining = 6 - rows.length;
  rows = rows.concat(Array(guessesRemaining).fill(""));

  return (
    <section className="mx-auto max-w-80 sm:max-w-md sm:mx-auto">
      <div className="grid grid-rows-5 gap-4 my-6 sm:my-10 mx-10 sm:mx-0">
        {rows.map((guessObject, index) => (
          <Row
            key={index}
            word={guessObject.guessWord}
            result={guessObject.result}
          />
        ))}
      </div>
    </section>
  );
};
