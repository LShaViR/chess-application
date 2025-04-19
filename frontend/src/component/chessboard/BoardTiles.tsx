import { WHITE } from "../../utils/constant";
import { BoardTilesProps } from "../../types/board";

const BoardTiles = ({ orientation, candidates }: BoardTilesProps) => {
  const size = 8;

  const renderBoard = () => {
    const squares = [];

    for (let row = 0; row < size; row++) {
      const rankNumber = orientation == WHITE ? size - row : row + 1;
      const isBlack = row % 2 != 0;
      squares.push(
        <div
          key={`rank-${row}`}
          className={`absolute font-medium text-sm z-10 ${
            isBlack ? "text-light-tile" : "text-dark-tile"
          }`}
          style={{
            left: "1px",
            top: `calc(${row} * 12.5%)`,
          }}
        >
          {rankNumber}
        </div>
      );

      // Chess squares for this row
      for (let col = 0; col < size; col++) {
        const isBlack = (row + col) % 2 === 1;

        const fileLabel = String.fromCharCode(
          97 + (orientation == WHITE ? col : size - col - 1)
        );
        const square = fileLabel + rankNumber;

        squares.push(
          <div
            key={`${row}-${col}`}
            className={`relative w-full h-full row-start-${row + 1} col-start-${
              col + 1
            } ${isBlack ? "bg-dark-tile" : "bg-light-tile"}
            `}
          >
            {candidates.reduce(
              (agg, current) => agg || current.to == square,
              false
            ) ? (
              candidates.reduce(
                (agg, current) =>
                  agg ||
                  (current.captured && current.to == square ? true : false),
                false
              ) ? (
                <div
                  className={` absolute w-[90%] h-[90%] ${
                    isBlack
                      ? "border-dark-tile-highlight"
                      : "border-light-tile-highlight"
                  } rounded-full border-8 border-solid left-[5%] top-[5%]`}
                ></div>
              ) : (
                <div
                  className={` absolute w-[30%] h-[30%] ${
                    isBlack
                      ? "bg-dark-tile-highlight"
                      : "bg-light-tile-highlight"
                  } rounded-full left-[35%] top-[35%]`}
                ></div>
              )
            ) : (
              <></>
            )}
          </div>
        );
      }
    }

    // Files (letters a-h) at the bottom
    for (let col = 0; col < size; col++) {
      const fileLabel = String.fromCharCode(
        97 + (orientation == WHITE ? col : size - col - 1)
      );
      const isBlack = col % 2 == 0;
      squares.push(
        <div
          key={`file-${col}`}
          className={`absolute font-medium text-sm text-gray ${
            isBlack ? "text-light-tile" : "text-dark-tile"
          }`}
          style={{
            left: `calc(${col} * 12.5% + 12.5%)`,
            bottom: "0px",
            transform: "translateX(-120%)",
          }}
        >
          {fileLabel}
        </div>
      );
    }

    return squares;
  };
  return (
    <div className="h-full w-full border border-dark-button relative bg-light-tile aspect-square grid grid-cols-8 grid-rows-8">
      {renderBoard()}
    </div>
  );
};
export default BoardTiles;
