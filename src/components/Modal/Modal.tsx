import { type IModalPropsTypes } from "./Modal.types";

export const Modal = ({
  show,
  close,
  message,
  setMessage
}: IModalPropsTypes): JSX.Element => {
  // to be implemented
  const handleNewGame = (): void => {
    // implement new game logic
    console.log(
      "implement new game logic - reset guesses state, message, guess usestate"
    );

    close();
  };

  return (
    <div
      className={`${
        show ? "fixed" : "hidden"
      }   left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 max-w-2xl w-10/12 sm:w-8/12 md:w-1/2`}
    >
      <button
        className="absolute right-5 top-4 bg-alert text-xs text-white px-1 rounded"
        onClick={() => {
          close();
          setMessage("");
        }}
      >
        X
      </button>

      <article className="bg-tertiary  m-2 border border-primary shadow-lg rounded-xl z-20 pb-4  ">
        {/* <h2 className="capitalize mt-7 mb-4 text-primary text-lg text-center sm:text-xl">
          Title
        </h2> */}

        {message === "won" || message === "lost"
          ? (
          <>
            <p className="text-center font-light bg-white w-10/12 m-auto mt-7 mb-5 py-3 px-4 block border border-1 rounded-3xl focus:outline-none focus:border-primary ">
              You {message}!
            </p>
            <button
              className="block mx-auto border border-green-500 rounded bg-green-500 p-2 mt-4 text-gray-800 shadow"
              onClick={handleNewGame}
            >
              Play New Game
            </button>
          </>
            )
          : (
          <p className="text-center font-light bg-white w-10/12 m-auto mt-7 mb-5 py-3 px-4 block border border-1 rounded-3xl focus:outline-none focus:border-primary ">
            {message}
          </p>
            )}
      </article>
    </div>
  );
};
