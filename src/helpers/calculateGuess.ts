import { isWordValid } from "./randomWord";

interface IGuessProps {
  guessWord: string;
  answerWord: string;
}

// break up into smaller functions for maintainability/readability
export const calculateGuess = ({
  guessWord,
  answerWord,
}: IGuessProps): string[] => {
  const validWord: boolean = isWordValid(guessWord);

  if (!validWord) {
    return ["invalid"];
  }

  const markedLetters: string[] = new Array(answerWord.length).fill("miss");
  const matchedLetters: string[] = [];
  const presentLetters: string[] = [];
  const letterCount: Record<string, number> = {};

  // first loop - find exact matches
  for (let i = 0; i < answerWord.length; i++) {
    const currentLetter = guessWord[i];
    letterCount[answerWord[i]] = (letterCount[answerWord[i]] || 0) + 1;
    if (answerWord[i] === currentLetter) {
      markedLetters[i] = "match";
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
      // Check if the count of letter in answer is greater than match/present total
      if (
        letterCount[currentLetter] > matchCount + presentCount ||
        !letterCount[currentLetter]
      ) {
        // If so, mark as present and push to present list
        markedLetters[i] = "present";
        presentLetters.push(currentLetter);
      }
    }
  }
  // reseet count for next letter
  // letterCount = {};

  return markedLetters;
};
