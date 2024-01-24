import React, { useEffect } from "react";
import { useAppDispatch } from "./store/store";
import { getAnswer } from "./store/slice/answer/getAnswer";
import { Grid } from "./components/Grid";
import { useGuess } from "./hooks/useGuess";

function App() {
  const dispatch = useAppDispatch();
  const { guess, setGuess, addGuessLetter } = useGuess();

  //on load, get new random answer word
  useEffect(() => {
    dispatch(getAnswer());
  }, []);

  return (
    <>
      <div className="mx-auto w-96 relative  w-screen sm:max-w-screen-md sm:my-8">
        <header className="border-b border-gray-400 py-4 sm:max-w-md mx-auto">
          <h1 className="text-3xl text-red-600 sm:text-5xl font-bold text-center uppercase mt-4 ">
            Wordle
          </h1>
        </header>
        <main>
          <Grid guess={guess} setGuess={setGuess} />
        </main>
      </div>
    </>
  );
}

export default App;
