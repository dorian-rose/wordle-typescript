import { configureStore } from "@reduxjs/toolkit";
import { guessesSlice } from "./slice/guesses/guessesSlice";
import { answerSlice } from "./slice/answer/answerSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    guesses: guessesSlice.reducer,
    answer: answerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
