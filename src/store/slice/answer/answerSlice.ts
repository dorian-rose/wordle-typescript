import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAnswerState {
  answer: string;
}

const initialState: IAnswerState = {
  answer: "",
};

export const answerSlice = createSlice({
  name: "answer",
  initialState: { answer: "hello" },
  reducers: {
    setAnswer: (state, action: PayloadAction<IAnswerState>) => {
      state.answer = action.payload.answer;
    },
  },
});

export const { setAnswer } = answerSlice.actions;
