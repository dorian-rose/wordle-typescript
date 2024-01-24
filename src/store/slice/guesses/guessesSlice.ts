import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyboardType } from "../../../helpers/formatKeyboard";

export interface IGuess {
  guessWord: string;
  result: string[];
}

interface IGuessState {
  guesses: IGuess[];
  keyboard: KeyboardType;
}

interface IGuessAction {
  guessWord: string;
  result: string[];
  keyboard: KeyboardType;
}

const initialState: IGuessState = { guesses: [], keyboard: {} };

export const guessesSlice = createSlice({
  name: "guesses",
  initialState,
  reducers: {
    setGuesses: (state, action: PayloadAction<IGuessAction>) => {
      console.log("inReducer");
      const newState = [
        ...state.guesses,
        {
          guessWord: action.payload.guessWord,
          result: action.payload.result,
        },
      ];
      state.guesses = newState;
      state.keyboard = action.payload.keyboard;
    },
  },
});

export const { setGuesses } = guessesSlice.actions;
