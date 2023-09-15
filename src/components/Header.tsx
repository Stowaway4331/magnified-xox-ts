import { useEffect, useState } from "react";
import { iconO, iconX } from "../utils/XO";

const Header = ({
  currPlayer,
  winnerExists,
}: {
  currPlayer: boolean | (() => boolean);
  winnerExists: true | false | undefined;
}) => {
  const [fillColor, setFillColor] = useState("black");
  useEffect(() => {
    setFillColor(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "white"
        : "black",
    );
  }, [fillColor]);
  return (
    <div className="mb-16 mt-10 flex flex-col items-center">
      <h1 className="text-4xl">Magnified X-O-X</h1>
      {winnerExists === undefined && (
        <>
          <span className="mt-4 text-gray-500">
            Directions: Green is playable area and Red is non-playable area
          </span>
          <h3 className="flex items-end mt-4">
            <span className={`w-8 h-8`}>
              {currPlayer
                ? iconX({ fill: fillColor })
                : iconO({ fill: fillColor })}
            </span>
            's turn
          </h3>
        </>
      )}
    </div>
  );
};

export default Header;
