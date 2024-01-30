import { type IGuess } from "../../models/models";
import { type IGridProps } from "./Grid.types";
import React, { useEffect, useState } from "react";
import { Row } from "../GridRow";
import { useAppSelector } from "../../store/store";

export const Grid = ({ guess }: IGridProps): JSX.Element => {
  const [rows, setRows] = useState<IGuess[]>([]);
  const { guesses } = useAppSelector((state) => state.guesses);

  useEffect(() => {
    const updatedRows = [...guesses];
    // add guess in progress to rows array so that it can be rendered in Row.js
    if (updatedRows.length < 6) {
      updatedRows.push({ guessWord: guess, result: [] });
    }
    // make sure there are always six rows, so as to display full grid
    const guessesRemaining = 6 - updatedRows.length;
    setRows(updatedRows.concat(Array(guessesRemaining).fill("")));
  }, [guess, guesses]);

  // try: include id using react hook useId in rows array to use as key
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
