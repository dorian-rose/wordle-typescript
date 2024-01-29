import { getAnswer } from "./store/slice/answer/thunk";
import { Keyboard, Grid, Modal } from "./components";
import { useAppDispatch } from "./store/store";
import { useEffect, useState } from "react";
import { useGuess } from "./hooks/useGuess";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const { guess, addGuessLetter } = useGuess({ setMessage });

  // on load, set new random word

  useEffect(() => {
    try {
      void dispatch(getAnswer()).catch(console.error);
    } catch (error) {
      setMessage("An error ocurred");
    }
  }, []);

  // when message present, modal is shown
  useEffect(() => {
    if (message !== "") {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [message]);

  const openCloseModal = (): void => {
    setShowModal(!showModal);
  };

  return (
    <div className="mx-auto w-96 relative  w-screen sm:max-w-screen-md sm:my-8">
      <header className="border-b border-gray-400 py-4 sm:max-w-md mx-auto">
        <h1 className="text-3xl text-red-600 sm:text-5xl font-bold text-center uppercase mt-4 ">
          Wordle
        </h1>
      </header>
      <main>
        <Grid guess={guess} />
        <Keyboard
          onButtonClick={(letter) => {
            addGuessLetter(letter);
          }}
        />
        <Modal
          show={showModal}
          close={openCloseModal}
          message={message}
          setMessage={setMessage}
        />
      </main>
    </div>
  );
}

export default App;
