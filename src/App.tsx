import "./App.css";
import { useState, useEffect } from "react";
import { checkForWin } from "./utils/checkForWin";
import { generateMatrix } from "./utils/generateMatrix";
// import { iconO, iconX } from "./utils/XO";
import Board from "./components/Board";
import Header from "./components/Header";

const size = 3;

function App() {
  // * X = true, O = false
  const bigBoard = generateMatrix(size);
  const [currPlayer, setCurrPlayer] = useState(true);
  const [winnerMatrix, setWinnerMatrix] = useState(generateMatrix(size));
  const [winnerExists, setWinnerExists] = useState<true | false | undefined>(
    undefined
  );
  const [nextBoard, setNextBoard] = useState<[number, number]>([-1, -1]);
  // const [disabledMatrix, setDisabledMatrix] = useState(generateMatrix(size));

  useEffect(() => {
    if (checkForWin(winnerMatrix as [][])) {
      // console.log("winner is " + currPlayer);

      setWinnerExists(!currPlayer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winnerMatrix]);

  return (
    <>
      {winnerExists === undefined && (
        <Header winnerExists={winnerExists} currPlayer={currPlayer} />
      )}
      <div className="flex justify-center col-container">
        {(winnerExists === undefined &&
          bigBoard.map((row, r) => (
            <div key={r} className="">
              {row.map((_, c) => (
                <div
                  key={size * r + c}
                  className="board-containers p-4 border-r-4 border-b-4 border-white"
                  style={{
                    backgroundColor:
                      [r, c].toString() === nextBoard.toString() ||
                      nextBoard[0] === -1
                        ? "green"
                        : "red",
                  }}
                >
                  <Board
                    isDisabled={
                      !(
                        nextBoard[0] === -1 ||
                        (nextBoard[0] === r && nextBoard[1] === c)
                      )
                    }
                    setNextBoard={setNextBoard}
                    position={[c, r]}
                    currPlayer={currPlayer}
                    setCurrPlayer={setCurrPlayer}
                    winnerMatrix={winnerMatrix}
                    setWinnerMatrix={setWinnerMatrix}
                  />
                </div>
              ))}
            </div>
          ))) || (
          <div>
            {winnerExists && (
              <Header winnerExists={winnerExists} currPlayer={currPlayer} />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
