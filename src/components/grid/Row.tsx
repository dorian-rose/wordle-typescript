import React from "react";

import { Tile } from "./Tile";

interface RowProps {
  word: string;
  result?: string[]; // LetterState[];
  className?: string;
}

export const Row = ({ word = "", result = [], className = "" }: RowProps) => {
  // ensure array always has length of 5 for renderization
  const lettersRemaining = 5 - word.length;

  const wordAsArray: string[] = word.split("");

  const lettersForRow: string[] = wordAsArray.concat(
    Array(lettersRemaining).fill("")
  );

  return (
    <div className="grid place-items-center grid-cols-5 gap-4 mx-2">
      {lettersForRow.map((char, index) => (
        <Tile key={index} value={char} classState={result[index]} />
      ))}
    </div>
  );
};
