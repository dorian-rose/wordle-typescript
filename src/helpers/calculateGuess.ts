import { type ResultStates } from "../models";

interface IGuessProps {
  guessWord: string
  answerWord: string
}

// break up into smaller functions for maintainability/readability
export const calculateGuess = ({
  guessWord,
  answerWord
}: IGuessProps): ResultStates[] => {
  const markedLetters: ResultStates[] = new Array(answerWord.length).fill(
    "miss"
  );
  const matchedLetters: string[] = [];
  const presentLetters: string[] = [];
  const letterCount: Record<string, number> = {};

  // first loop - find exact matches
  for (let i = 0; i < answerWord.length; i++) {
    const currentLetter = guessWord[i];
    const answerLetter = answerWord[i];
    // increase by 1 the count of letter in answer at current index
    letterCount[answerLetter] = (letterCount[answerLetter] ?? 0) + 1;
    if (answerLetter === currentLetter) {
      // add to result array
      markedLetters[i] = "match";
      // add to list of matched letters
      matchedLetters.push(currentLetter);
    }
  }

  // second loop - find where present, excluding duplicates of match letters
  for (let i = 0; i < answerWord.length; i++) {
    const currentLetter = guessWord[i];
    // find number of match/present
    const matchCount = matchedLetters.filter(
      (letter) => letter === currentLetter
    ).length;
    const presentCount = presentLetters.filter(
      (letter) => letter === currentLetter
    ).length;
    // if answer includes guess letter but it is not exact match
    if (answerWord.includes(currentLetter) && answerWord[i] !== currentLetter) {
      // Check if the count of letter in answer is greater than match/present total.
      if ((letterCount[currentLetter] ?? 0) > matchCount + presentCount) {
        // If so, mark as present and push to present list
        markedLetters[i] = "present";
        presentLetters.push(currentLetter);
      }
    }
  }

  return markedLetters;
};
