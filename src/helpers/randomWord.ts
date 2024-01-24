import wordBank from "../api/wordBank.json";

export const getRandomWord = (): string => {
  return wordBank.valid[Math.floor(Math.random() * wordBank.valid.length)];
};

export const isWordValid = (word: string): boolean => {
  return wordBank.valid.concat(wordBank.invalid).includes(word);
};
