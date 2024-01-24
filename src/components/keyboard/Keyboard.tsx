import React from "react";
import { Keys } from "./Keys";

interface IKeyboardProps {
  onButtonClick: (letter: string) => void;
}

export const Keyboard = ({ onButtonClick }: IKeyboardProps) => {
  const kbRow1: string[] = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const kbRow2: string[] = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const kbRow3: string[] = [
    "Enter",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    "Backspace",
  ];

  const onClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    const letter = ev.currentTarget.textContent;
    onButtonClick(letter);
  };

  const Set1 = () => {
    return (
      <div className="flex flex-row justify-center mx-1">
        {kbRow1.map((char) => (
          <Keys onClick={onClick} key={char} letter={char} />
        ))}
      </div>
    );
  };

  const Set2 = () => {
    return (
      <div className="flex flex-row justify-center sm:my-3 mx-2 sm:mx-5">
        {kbRow2.map((char) => (
          <Keys onClick={onClick} key={char} letter={char} />
        ))}
      </div>
    );
  };

  const Set3 = () => {
    return (
      <div className="flex flex-row justify-center mx-1">
        {kbRow3.map((char) => (
          <Keys onClick={onClick} key={char} letter={char} />
        ))}
      </div>
    );
  };

  return (
    <section className="mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
      <Set1 />
      <Set2 />
      <Set3 />
    </section>
  );
};
