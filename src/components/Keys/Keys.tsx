import { useAppSelector } from "../../store/store";
import { type IKeysProps } from "./Keys.types";

export const Keys = ({ letter, onButtonClick }: IKeysProps): JSX.Element => {
  const { keyboard } = useAppSelector((state) => state.guesses);
  const keyState = keyboard[letter];

  const onClick = (ev: React.MouseEvent<HTMLButtonElement>): void => {
    const letter: string = ev.currentTarget.textContent ?? "";
    if (letter !== null) {
      onButtonClick(letter);
    }
  };

  // refactor classnames e.g. separate function returning classnames
  return (
    <button
      onClick={(ev) => {
        onClick(ev);
      }}
      className={`min-w-fit px-2 w-10 sm:w-20 capitalize h-10 m-1 rounded-md grid place-items-center text-base  text-black cursor-pointer font-bold shadow-xl ${
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
