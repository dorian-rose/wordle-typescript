import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGuess {
  guessWord: string;
  result: string[];
}

interface IGuessState {
  guesses: IGuess[];
}

const initialState: IGuessState = { guesses: [] };

export const guessesSlice = createSlice({
  name: "guesses",
  initialState,
  reducers: {
    setGuesses: (state, action: PayloadAction<IGuess>) => {
      state.guesses.push({
        guessWord: action.payload.guessWord,
        result: action.payload.result,
      });
    },
  },
});

export const { setGuesses } = guessesSlice.actions;
