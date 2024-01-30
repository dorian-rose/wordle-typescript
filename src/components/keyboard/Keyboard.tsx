import { type IKeyboardProps } from "./Keyboard.types";
import { keyboardKeys } from "./keyboardKeys";
import { Keys } from "../Keys";
import React from "react";

export const Keyboard = ({ onButtonClick }: IKeyboardProps): JSX.Element => {
 
  const renderRow = (row: string[], className: string): JSX.Element => (
    <div
      key={className}
      className={`flex flex-row justify-center ${className}`}
    >
      {row.map((char) => (
        <Keys key={char} letter={char} onButtonClick={onButtonClick} />
      ))}
    </div>
  );

  return (
    <section className="mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
      {renderRow(keyboardKeys.slice(0, 10), "mx-1")}
      {renderRow(keyboardKeys.slice(10, 19), "mx-2 sm:mx-5 sm:my-3")}
      {renderRow(keyboardKeys.slice(19), "mx-1 1")}
    </section>
  );
};
