import React, { useEffect, useState } from "react";

import { Grid } from "./components/grid/Grid";
import { Keyboard } from "./components/keyboard/Keyboard";
import { useGuess } from "./hooks/useGuess";

function App() {
  const [error, setError] = useState<string>("");

  const { guess, setGuess, addGuessLetter } = useGuess({ setError });

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
          <Keyboard
            onButtonClick={(letter) => {
              addGuessLetter(letter);
            }}
          />
          {error && <p>{error}</p>}
        </main>
      </div>
    </>
  );
}

export default App;
