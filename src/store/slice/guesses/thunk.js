import { setGuesses } from "./guessesSlice"
import { dataFetch } from "../../../helpers/fetch";
import { computeGuess } from "../../../helpers/computeGuess";
import { setValid } from "../validate/validSlice";


export const getGuesses = (guessWord, answer) => {
    //logic could be moved from thunk functionality to helper for cleanliness
    return async (dispatch, getState) => {
        let newState;
        let newKeyboard;
        let gameState = "playing"
        try {
            const currentState = getState();
            const currentGuesses = currentState.guesses.guesses

            //checkword exists
            const url = `https://wordlist.onrender.com/${guessWord}` //import.meta.env.VITE_CHECK_URL + guessWord
            const exists = await dataFetch(url)
            if (!exists.ok) {
                dispatch(setValid("Word not in list"))
                return
            }

            //compute guess result (matches, present or misses)
            const result = await computeGuess(guessWord, answer);

            const newGuessResult = {
                guessWord,
                result,
            };


            newState = [...currentGuesses, newGuessResult]

            //calculate game state: won, lost or playing (playing as initial state)
            const didWin = result.every((r) => r === "match")

            if (didWin) {
                gameState = "won"
            } else if (newState.length === 6) {
                gameState = "lost"
            }

            //calculate keyboard letter state
            const currentKeyboard = currentState.guesses.keyboard
            newKeyboard = { ...currentKeyboard }

            result.forEach((r, index) => {
                const letterInResult = guessWord[index];

                const currentLetterState = newKeyboard[letterInResult];
                switch (currentLetterState) {
                    case "match":
                        break;
                    case "present":
                        if (r === "miss") {
                            break;
                        }
                    default:
                        newKeyboard[letterInResult] = r;
                        break;
                }
            });

        } catch (error) {
            console.log('FAILED to compute guess', error)
            return error
        }

        dispatch(setGuesses({ guesses: newState, gameState, keyboard: newKeyboard }))
    }


}