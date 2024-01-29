export interface IUseGuessProps {
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

export interface IUseGuessResult {
  guess: string
  setGuess: React.Dispatch<React.SetStateAction<string>>
  addGuessLetter: (letter: string) => void
}
