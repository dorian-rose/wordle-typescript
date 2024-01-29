export type ResultStates = "miss" | "present" | "match" | "invalid";

export interface IGuess {
  guessWord: string
  result: ResultStates[]
}

export type IKeyboard = Record<string, ResultStates>;

export interface IGuessAction extends IGuess {
  keyboard: IKeyboard
  gameState: string
}

export interface IGuessState {
  guesses: IGuess[]
  keyboard: IKeyboard
  gameState: string
}
