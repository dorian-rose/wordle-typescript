import { Dispatch } from "@reduxjs/toolkit";
import { setAnswer } from "./answerSlice";
import { getRandomWord } from "../../../helpers/randomWord";

export const getAnswer = () => {
  return async (dispatch: Dispatch) => {
    const answer = getRandomWord();
    dispatch(setAnswer({ answer }));
  };
};
