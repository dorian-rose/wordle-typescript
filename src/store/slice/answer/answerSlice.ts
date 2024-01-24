import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAnswerState {
  answer: string;
}

const initialState: IAnswerState = {
  answer: "",
};

export const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<IAnswerState>) => {
      console.log(action.payload.answer);
      state.answer = action.payload.answer;
    },
  },
});

export const { setAnswer } = answerSlice.actions;
