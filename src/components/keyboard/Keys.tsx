import React from "react";
import { useAppSelector } from "../../store/store";

interface IKeysProps {
  onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  letter: string;
}

export const Keys = ({ letter, onClick }: IKeysProps) => {
  const keyboard = useAppSelector((state) => state.guesses.keyboard);
  const keyState = keyboard[letter];

  return (
    <button
      onClick={(ev) => onClick(ev)}
      className={`  w-10 sm:w-20 capitalize h-10 m-1 rounded-md grid place-items-center text-base  text-black cursor-pointer font-bold shadow-xl ${
        keyState === "match"
          ? "bg-green-500 text-white border-green-500"
          : keyState === "present"
          ? "bg-yellow-500 text-white border-yellow-500"
          : keyState === "miss"
          ? "bg-gray-400 border-gray-400"
          : "bg-gray-300"
      }`}
    >
      {letter}
    </button>
  );
};
