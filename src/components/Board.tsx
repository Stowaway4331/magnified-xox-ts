import { iconO, iconX } from "../utils/XO";
import { checkForWin } from "../utils/checkForWin";
import { generateMatrix } from "../utils/generateMatrix";
import { useState } from "react";

const size = 3;

const Board = ({
  position,
  isDisabled,
  setNextBoard,
  currPlayer,
  setCurrPlayer,
  winnerMatrix,
  setWinnerMatrix,
}: {
  position: [number, number];
  isDisabled: boolean;
  setNextBoard: (a: typeof position | (() => typeof position)) => void;
  currPlayer: boolean;
  setCurrPlayer: (a: boolean) => void;
  winnerMatrix: unknown[][];
  setWinnerMatrix: (a: [][]) => void;
}) => {
  const [board, setBoard] = useState(generateMatrix(size));

  const handleClick = (r: number, c: number) => {
    if (
      !isDisabled &&
      winnerMatrix[position[0]][position[1]] === undefined &&
      board[c][r] === undefined
    ) {
      setBoard((board) => {
        board[c][r] = currPlayer;
        return [...board];
      });

      if (checkForWin(board as [][])) {
        // console.log(winnerMatrix);
        winnerMatrix[position[0]][position[1]] = currPlayer;
        setWinnerMatrix([...winnerMatrix] as [][]);
      }
      setNextBoard(() => {
        // console.log("winnerMatrix: ", winnerMatrix);
        // console.log("clicked in position = " + c + ", " + r);

        if (winnerMatrix[r][c] !== undefined) return [-1, -1];
        else return [c, r];
      });
      setCurrPlayer(!currPlayer);
    } else {
      const reason = !isDisabled
        ? "disabled"
        : winnerMatrix[position[0]][position[1]] !== undefined
        ? "winner matrix"
        : board[c][r] === undefined
        ? "board"
        : "no fkn idea";
      console.log("Click is disabled in this box because " + reason);
    }
  };

  return (
    <div className="relative">
      <div
        style={{
          display:
            winnerMatrix[position[0]][position[1]] === undefined
              ? "hidden"
              : "block",
          backgroundColor: winnerMatrix[position[0]][position[1]]
            ? "rgb(59, 130, 246)"
            : "rgb(234, 179, 8)",
        }}
        className="hidden absolute w-full h-full"
      >
        {winnerMatrix[position[0]][position[1]] === undefined
          ? ""
          : winnerMatrix[position[0]][position[1]]
          ? iconX({ fill: undefined })
          : iconO({ fill: undefined })}
      </div>
      <div
        className="flex col-container"
        style={{
          cursor: `${isDisabled ? "not-allowed" : "default"}`,
        }}
      >
        {board.map((col, c) => {
          return (
            <div key={c}>
              {col.map((value, r) => {
                return (
                  <div
                    // id="box"
                    key={r}
                    className={`p-[2px] w-8 h-8 border-white border-r-2 border-b-2 flex justify-center items-center`}
                    onClick={() => handleClick(r, c)}
                  >
                    {value === undefined ||
                      (value === true
                        ? iconX({ fill: undefined })
                        : iconO({ fill: undefined }))}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
