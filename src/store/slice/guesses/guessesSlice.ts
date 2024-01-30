import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type IGuessState, type IGuessAction } from "../../../models/models";

const initialState: IGuessState = {
  guesses: [],
  keyboard: {},
  gameState: "playing"
};

export const guessesSlice = createSlice({
  name: "guesses",
  initialState,
  reducers: {
    setGuesses: (state, action: PayloadAction<IGuessAction>) => {
      const newState = [
        ...state.guesses,
        {
          guessWord: action.payload.guessWord,
          result: action.payload.result
        }
      ];
      state.guesses = newState;
      state.keyboard = action.payload.keyboard;
      state.gameState = action.payload.gameState;
    }
  }
});

export const { setGuesses } = guessesSlice.actions;
