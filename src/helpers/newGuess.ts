import { type IKeyboard, type IGuess } from "../models";

export interface INewGuessProps extends IGuess {
  guesses: IGuess[];
  oldKeyboard: IKeyboard | null;
}

export interface INewGuessResult extends IGuess {
  keyboard: IKeyboard;
  gameState: string;
}

export const makeNewGuess = ({
  guessWord,
  result,
  guesses,
  oldKeyboard,
}: INewGuessProps): INewGuessResult => {
  // keyboard logic
  console.log("length", guesses.length);
  const keyboard: IKeyboard = { ...oldKeyboard };
  result.forEach((r, index) => {
    const letterInResult = guessWord[index];
    const currentLetterState = keyboard[letterInResult];
    switch (currentLetterState) {
      case "match":
        break;
      case "present":
        if (r === "miss") {
          break;
        } else {
          keyboard[letterInResult] = r;
          break;
        }
      // fall through to default
      default:
        keyboard[letterInResult] = r;
        break;
    }
  });
  // game state logic
  const didWin = result.every((r) => r === "match");
  let gameState = "playing";
  if (didWin) {
    gameState = "won";
  } else if (guesses.length === 5) {
    gameState = "lost";
  }
  return { guessWord, result, keyboard, gameState };
};
